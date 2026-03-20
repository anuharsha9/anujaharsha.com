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
}

const CURTAINS: AuroraCurtain[] = [
    // Main curtain — brightest, below the CTAs (the "shoreline")
    { baseY: 0.68, rayLength: 200, opacity: 0.22, waveAmplitude: 40, speed: 0.08, phase: 0, rayWidth: 12 },
    // Upper accent curtain — just below CTAs
    { baseY: 0.60, rayLength: 150, opacity: 0.13, waveAmplitude: 35, speed: 0.06, phase: 2.0, rayWidth: 14 },
    // Lower curtain — closer to bottom
    { baseY: 0.78, rayLength: 130, opacity: 0.10, waveAmplitude: 30, speed: 0.10, phase: 4.0, rayWidth: 12 },
]

// Cursor ripple constants — whisper-level
const RIPPLE_RADIUS = 200    // px — influence radius
const RIPPLE_STRENGTH = 12   // px — max displacement at epicenter

// Scroll-to-phase conversion: how many "wave cycles" per 1000px of scroll
// Lower = more subtle. 0.3 means ~1 full wave cycle per ~3300px of scroll.
const SCROLL_PHASE_SCALE = 0.3 / 1000

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

        const { r, g, b } = tealRef.current
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const scrollCalm = scrollFactorRef.current // 1 → 0.75
        const scrollPhase = scrollPhaseCurrentRef.current // smoothly lerped scroll offset

        for (const curtain of CURTAINS) {
            // Constant speed and amplitude — no surges, no flickering
            const effectiveSpeed = curtain.speed * (0.5 + scrollCalm * 0.5)
            const effectiveAmp = curtain.waveAmplitude * (0.6 + scrollCalm * 0.4)

            // Time drives the animation, scroll phase is added as a gentle offset
            // This makes the waves flow continuously AND respond to scroll
            const t = time * effectiveSpeed + curtain.phase + scrollPhase

            // Vertical drift of the whole curtain
            const drift = Math.sin(t * 0.2) * 10 * scrollCalm

            // Draw vertical rays from the wavy top edge downward
            for (let x = 0; x < w; x += curtain.rayWidth) {
                const xFrac = x / w
                let edgeY = curtain.baseY * h + drift
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

                const rayOpacity = curtain.opacity * rayIntensity
                    * (0.7 + 0.3 * Math.sin(t * 0.25))

                // Vertical gradient ray: bright at top edge, fading downward
                const grad = ctx.createLinearGradient(x, edgeY - 15, x, edgeY + curtain.rayLength)
                grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
                grad.addColorStop(0.05, `rgba(${r}, ${g}, ${b}, ${rayOpacity * 0.5})`)
                grad.addColorStop(0.1, `rgba(${r}, ${g}, ${b}, ${rayOpacity})`)
                grad.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${rayOpacity * 0.7})`)
                grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${rayOpacity * 0.3})`)
                grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

                ctx.fillStyle = grad
                ctx.fillRect(x, edgeY - 15, curtain.rayWidth, curtain.rayLength + 15)
            }

            // Draw the bright top edge glow (the "rope")
            ctx.beginPath()
            const ropeStartY = curtain.baseY * h + drift + Math.sin(t) * effectiveAmp
            ctx.moveTo(0, ropeStartY)

            for (let x = 0; x <= w; x += 2) {
                const xFrac = x / w
                let y = curtain.baseY * h + drift
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

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${curtain.opacity * 1.5})`
            ctx.lineWidth = 2
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${curtain.opacity})`
            ctx.shadowBlur = 10
            ctx.stroke()
            ctx.shadowBlur = 0
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
        const animate = () => {
            const elapsed = (performance.now() - startTime) / 1000

            // Smoothly lerp scroll phase toward target — this is what makes
            // the undulation feel silky rather than jittery
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
