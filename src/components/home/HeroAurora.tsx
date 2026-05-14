'use client'

/**
 * HeroAurora — Canvas 2D northern lights.
 *
 * Each aurora curtain is a wavy top-edge (glowing rope) with
 * vertical rays fading downward from it — like fabric hanging
 * from a luminous curve. This creates the authentic "curtain
 * of light" appearance of real aurora borealis.
 *
 * Interactive layer:
 *   - Mouse proximity gently displaces nearby rays (cursor ripple).
 *     Effect radius ~200px, max displacement ~12px. Felt, not seen.
 *   - Scroll-phase undulation: the page's scroll position is smoothly
 *     blended into the wave's phase, so scrolling gently pushes the
 *     aurora — like wind moving a curtain. Constant speed, constant
 *     amplitude, perfectly smooth.
 *   - Scroll-linked calm: base wave amplitude gently reduces (1 → 0.75)
 *     as the user scrolls past the hero fold.
 *
 * Colors from CSS custom properties (design tokens).
 */

import { useRef, useEffect, useCallback } from 'react'

interface AuroraCurtain {
    /** Base Y position of the curtain's top edge (fraction 0-1) */
    baseY: number
    /** How far the vertical rays extend downward (px) */
    rayLength: number
    /** Peak opacity of the brightest part */
    opacity: number
    /** Horizontal wave amplitude of the top edge */
    waveAmplitude: number
    /** Speed multiplier */
    speed: number
    /** Phase offset */
    phase: number
    /** Width of individual ray columns (px) */
    rayWidth: number
    /** Optional specific color for this curtain */
    colorRgb?: { r: number, g: number, b: number }
}

const CURTAINS: AuroraCurtain[] = [
    // Main curtain — brightest, below the CTAs (the "shoreline")
    { baseY: 0.68, rayLength: 220, opacity: 0.25, waveAmplitude: 60, speed: 0.04, phase: 0, rayWidth: 18, colorRgb: { r: 7, g: 139, b: 156 } }, // Deep Teal
    // Upper accent curtain — slower, emerald green
    { baseY: 0.60, rayLength: 180, opacity: 0.18, waveAmplitude: 50, speed: 0.03, phase: 2.0, rayWidth: 20, colorRgb: { r: 16, g: 185, b: 129 } }, // Emerald
    // Lower curtain — hypnotic lime/cyan mix
    { baseY: 0.78, rayLength: 150, opacity: 0.15, waveAmplitude: 45, speed: 0.05, phase: 4.0, rayWidth: 18, colorRgb: { r: 5, g: 150, b: 105 } }, // Sea Green
    // Deep background curtain — massive, slow wave
    { baseY: 0.85, rayLength: 250, opacity: 0.12, waveAmplitude: 70, speed: 0.02, phase: 1.0, rayWidth: 25, colorRgb: { r: 6, g: 182, b: 212 } }, // Cyan
]

// ── Cinematic Entrance Constants ──
// The ocean awakening: waves surge up from below viewport over ~3.5s
const ENTRANCE_DURATION = 3.5     // seconds — total surge-in duration
const ENTRANCE_OVERSHOOT_AT = 0.55 // normalized time — brief brightness flash
const ENTRANCE_OVERSHOOT = 1.4     // multiplier — how bright the flash peaks

// Cursor ripple constants — whisper-level
const RIPPLE_RADIUS = 200    // px — influence radius
const RIPPLE_STRENGTH = 12   // px — max displacement at epicenter

// Scroll-to-phase conversion: how many "wave cycles" per 1000px of scroll
// Lower = more subtle. 0.3 means ~1 full wave cycle per ~3300px of scroll.
const SCROLL_PHASE_SCALE = 0.3 / 1000

// Target native refresh rate for buttery smooth rendering
// No artificial frame throttling

/**
 * Attempt at a smooth ease-out curve for entrance progress.
 * t goes 0→1, output goes 0→1 with long deceleration tail.
 */
function easeOutExpo(t: number): number {
    return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export default function HeroAurora() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rafRef = useRef<number>(0)
    const tealRef = useRef({ r: 7, g: 139, b: 156 })
    const sizeRef = useRef({ w: 0, h: 0 })

    // Interactive refs — updated outside React render cycle for perf
    const mouseRef = useRef({ x: -1000, y: -1000 }) // Off-canvas by default
    const scrollFactorRef = useRef(1) // 1 = full intensity, 0.75 = calmed

    // Scroll-phase: smoothly lerped scroll position → wave phase offset
    // Target is set by scroll events, current is lerped toward target each frame
    const scrollPhaseTargetRef = useRef(0)
    const scrollPhaseCurrentRef = useRef(0)

    const draw = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
        const w = sizeRef.current.w
        const h = sizeRef.current.h
        if (w === 0 || h === 0) return

        ctx.clearRect(0, 0, w, h)
        ctx.globalCompositeOperation = 'lighter'

        const defaultTeal = tealRef.current
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const scrollCalm = scrollFactorRef.current // 1 → 0.75
        const scrollPhase = scrollPhaseCurrentRef.current // smoothly lerped scroll offset

        // ── Cinematic Entrance Progress ──
        // Raw 0→1 over ENTRANCE_DURATION, eased for organic feel
        const rawProgress = Math.min(time / ENTRANCE_DURATION, 1)
        const progress = easeOutExpo(rawProgress)

        // Surge factor: curtains rise from below viewport to resting position
        // 0.5 = start 50% of viewport height below resting pos
        const surgeOffset = (1 - progress) * 0.5

        // Amplitude builds from near-zero to full
        const ampScale = progress

        // Opacity crescendo with brief overshoot flash at ~55%
        let opacityScale = progress
        if (rawProgress > 0.3 && rawProgress < 0.8) {
            // Overshoot pulse: peaks at ENTRANCE_OVERSHOOT_AT
            const pulseT = (rawProgress - 0.3) / 0.5 // 0→1 within the pulse window
            const pulse = Math.sin(pulseT * Math.PI) // 0→1→0
            opacityScale = progress + pulse * (ENTRANCE_OVERSHOOT - 1) * progress
        }

        // Ray length grows from 30% stubs to full
        const rayLengthScale = 0.3 + 0.7 * progress

        // Speed surge: starts 2.5x faster, decelerates to resting
        const speedMultiplier = 1 + (1 - progress) * 1.5

        for (const curtain of CURTAINS) {
            const { r, g, b } = curtain.colorRgb || defaultTeal

            // Entrance-modulated speed and amplitude
            const effectiveSpeed = curtain.speed * (0.5 + scrollCalm * 0.5) * speedMultiplier
            const effectiveAmp = curtain.waveAmplitude * (0.6 + scrollCalm * 0.4) * ampScale

            // Time drives the animation, scroll phase is added as a gentle offset
            // This makes the waves flow continuously AND respond to scroll
            const t = time * effectiveSpeed + curtain.phase + scrollPhase

            // Vertical drift of the whole curtain
            // Vertical drift + entrance surge (curtains rise from below)
            const drift = Math.sin(t * 0.2) * 10 * scrollCalm
            const entranceY = surgeOffset * h

            // Draw vertical rays from the wavy top edge downward
            // We step by a small amount but draw wide rays so they heavily overlap horizontally
            const stepX = 12
            const rayDrawWidth = 80 // wide rays for volumetric overlap
            for (let x = 0; x < w; x += stepX) {
                const xFrac = x / w
                let edgeY = curtain.baseY * h + drift + entranceY
                    + Math.sin(t + xFrac * 8) * effectiveAmp
                    + Math.sin(t * 0.7 + xFrac * 12) * effectiveAmp * 0.4
                    + Math.sin(t * 0.4 + xFrac * 5) * effectiveAmp * 0.2

                // ── Cursor ripple: gently push nearby rays ──
                const dx = x - mx
                const dy = edgeY - my
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < RIPPLE_RADIUS && dist > 0) {
                    // Smooth falloff: cos² curve (1 at center, 0 at edge)
                    const falloff = Math.cos((dist / RIPPLE_RADIUS) * Math.PI * 0.5)
                    const push = falloff * falloff * RIPPLE_STRENGTH
                    // Push ray away from cursor (directional)
                    edgeY += (dy / dist) * push
                }

                // Ray intensity varies along the width
                const rayIntensity = 0.5
                    + 0.3 * Math.sin(t * 0.5 + xFrac * 20)
                    + 0.2 * Math.sin(t * 0.3 + xFrac * 35)

                const rayOpacity = curtain.opacity * rayIntensity * opacityScale
                    * (0.7 + 0.3 * Math.sin(t * 0.25))

                // Vertical gradient ray: bright at top edge, fading downward
                // Ray length grows during entrance
                const effectiveRayLen = curtain.rayLength * rayLengthScale

                // We want the ray to fade out horizontally as well as vertically,
                // but a linear gradient only goes one direction. Instead, we'll draw
                // multiple overlapping passes or just let the dense overlap of low-opacity
                // rays create the volumetric blur. We scale down the opacity because we 
                // are drawing many overlapping rays now.
                const overlapFactor = rayDrawWidth / stepX
                const adjustedOpacity = rayOpacity / (overlapFactor * 0.6) // Boost overall brightness slightly

                const grad = ctx.createLinearGradient(0, edgeY - 15, 0, edgeY + effectiveRayLen)
                grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
                grad.addColorStop(0.05, `rgba(${r}, ${g}, ${b}, ${adjustedOpacity * 0.5})`)
                grad.addColorStop(0.1, `rgba(${r}, ${g}, ${b}, ${adjustedOpacity})`)
                grad.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${adjustedOpacity * 0.7})`)
                grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${adjustedOpacity * 0.3})`)
                grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

                ctx.fillStyle = grad
                // Draw centered on x
                ctx.fillRect(x - rayDrawWidth / 2, edgeY - 15, rayDrawWidth, effectiveRayLen + 15)
            }

            // After volumetric rays, we add a massive soft ambient glow to the entire curtain edge
            ctx.beginPath()
            ctx.moveTo(0, h)
            for (let x = 0; x <= w; x += 10) {
                const xFrac = x / w
                let y = curtain.baseY * h + drift + entranceY
                    + Math.sin(t + xFrac * 8) * effectiveAmp
                    + Math.sin(t * 0.7 + xFrac * 12) * effectiveAmp * 0.4
                    + Math.sin(t * 0.4 + xFrac * 5) * effectiveAmp * 0.2
                ctx.lineTo(x, y)
            }
            ctx.lineTo(w, h)
            ctx.closePath()
            const ambientGrad = ctx.createLinearGradient(0, curtain.baseY * h - effectiveAmp, 0, h)
            ambientGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${curtain.opacity * opacityScale * 0.15})`)
            ambientGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
            ctx.fillStyle = ambientGrad
            ctx.fill()

            // Draw the bright top edge glow (the "rope") — no shadowBlur for perf
            ctx.beginPath()
            const ropeStartY = curtain.baseY * h + drift + entranceY + Math.sin(t) * effectiveAmp
            ctx.moveTo(0, ropeStartY)

            for (let x = 0; x <= w; x += 4) {
                const xFrac = x / w
                let y = curtain.baseY * h + drift + entranceY
                    + Math.sin(t + xFrac * 8) * effectiveAmp
                    + Math.sin(t * 0.7 + xFrac * 12) * effectiveAmp * 0.4
                    + Math.sin(t * 0.4 + xFrac * 5) * effectiveAmp * 0.2

                // Apply same cursor ripple to the rope
                const dx = x - mx
                const dy = y - my
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < RIPPLE_RADIUS && dist > 0) {
                    const falloff = Math.cos((dist / RIPPLE_RADIUS) * Math.PI * 0.5)
                    y += (dy / dist) * falloff * falloff * RIPPLE_STRENGTH
                }

                ctx.lineTo(x, y)
            }

            // Double-stroke fake glow (much cheaper than shadowBlur)
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${curtain.opacity * 0.5 * opacityScale})`
            ctx.lineWidth = 5
            ctx.stroke()
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${curtain.opacity * 1.5 * opacityScale})`
            ctx.lineWidth = 1.5
            ctx.stroke()
        }

        ctx.globalCompositeOperation = 'source-over'
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        // Read teal from CSS custom property
        const rootStyle = getComputedStyle(document.documentElement)
        const tealRgb = rootStyle.getPropertyValue('--accent-teal-rgb').trim()
        if (tealRgb) {
            const parts = tealRgb.split(',').map(s => parseInt(s.trim(), 10))
            if (parts.length === 3 && parts.every(n => !isNaN(n))) {
                tealRef.current = { r: parts[0], g: parts[1], b: parts[2] }
            }
        }

        // Resize handler
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5) // Cap DPR — aurora doesn't need retina clarity
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            sizeRef.current = { w: rect.width, h: rect.height }
        }
        resize()
        window.addEventListener('resize', resize)

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        // ── Mouse tracking (throttled via rAF — no extra events) ──
        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            }
        }

        const onMouseLeave = () => {
            // Move cursor influence off-canvas so it has no effect
            mouseRef.current = { x: -1000, y: -1000 }
        }

        // ── Scroll → phase offset (smooth, no velocity tracking) ──
        // Simply converts scroll position to a target phase offset.
        // The animation loop lerps toward this target each frame,
        // creating buttery smooth undulation without any speed changes.
        const onScroll = () => {
            const vh = window.innerHeight

            // Scroll-linked calm: eases from 1.0 → 0.75 over first 2 viewports
            const progress = Math.min(window.scrollY / (vh * 2), 1)
            scrollFactorRef.current = 1 - progress * 0.25

            // Scroll position → wave phase offset
            // scrollY * SCROLL_PHASE_SCALE gives a smooth, continuous phase shift
            scrollPhaseTargetRef.current = window.scrollY * SCROLL_PHASE_SCALE
        }

        // Only attach mouse listeners on non-touch devices
        const isTouch = window.matchMedia('(pointer: coarse)').matches
        if (!isTouch && !prefersReducedMotion) {
            window.addEventListener('mousemove', onMouseMove, { passive: true })
            window.addEventListener('mouseleave', onMouseLeave)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll() // Initial value
        scrollPhaseCurrentRef.current = scrollPhaseTargetRef.current // Sync on mount

        const startTime = performance.now()
        const animate = (now: number) => {
            const elapsed = (now - startTime) / 1000

            // Smoothly lerp scroll phase toward target
            const current = scrollPhaseCurrentRef.current
            const target = scrollPhaseTargetRef.current
            scrollPhaseCurrentRef.current = current + (target - current) * 0.08

            draw(ctx, prefersReducedMotion ? 0 : elapsed)
            rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(rafRef.current)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseleave', onMouseLeave)
            window.removeEventListener('scroll', onScroll)
        }
    }, [draw])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
        />
    )
}
