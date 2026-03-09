'use client'

/**
 * HeroAurora — Canvas 2D northern lights.
 *
 * Each aurora curtain is a wavy top-edge (glowing rope) with
 * vertical rays fading downward from it — like fabric hanging
 * from a luminous curve. This creates the authentic "curtain
 * of light" appearance of real aurora borealis.
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
    // Main curtain — brightest, most prominent
    { baseY: 0.30, rayLength: 200, opacity: 0.22, waveAmplitude: 40, speed: 0.08, phase: 0, rayWidth: 12 },
    // Upper curtain — fainter, higher
    { baseY: 0.18, rayLength: 150, opacity: 0.13, waveAmplitude: 35, speed: 0.06, phase: 2.0, rayWidth: 14 },
    // Lower accent curtain
    { baseY: 0.40, rayLength: 130, opacity: 0.10, waveAmplitude: 30, speed: 0.10, phase: 4.0, rayWidth: 12 },
]

export default function HeroAurora() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rafRef = useRef<number>(0)
    const tealRef = useRef({ r: 7, g: 139, b: 156 })
    const sizeRef = useRef({ w: 0, h: 0 })

    const draw = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
        const w = sizeRef.current.w
        const h = sizeRef.current.h
        if (w === 0 || h === 0) return

        ctx.clearRect(0, 0, w, h)
        ctx.globalCompositeOperation = 'lighter'

        const { r, g, b } = tealRef.current

        for (const curtain of CURTAINS) {
            const t = time * curtain.speed + curtain.phase

            // Vertical drift of the whole curtain
            const drift = Math.sin(t * 0.2) * 10

            // Draw vertical rays from the wavy top edge downward
            // Step across the width in ray-width columns
            for (let x = 0; x < w; x += curtain.rayWidth) {
                // Calculate the wavy top edge Y at this x position
                const xFrac = x / w
                const edgeY = curtain.baseY * h + drift
                    + Math.sin(t + xFrac * 8) * curtain.waveAmplitude
                    + Math.sin(t * 0.7 + xFrac * 12) * curtain.waveAmplitude * 0.4
                    + Math.sin(t * 0.4 + xFrac * 5) * curtain.waveAmplitude * 0.2

                // Ray intensity varies along the width — creates the vertical streak pattern
                const rayIntensity = 0.5
                    + 0.3 * Math.sin(t * 0.5 + xFrac * 20)
                    + 0.2 * Math.sin(t * 0.3 + xFrac * 35)

                const rayOpacity = curtain.opacity * rayIntensity
                    * (0.7 + 0.3 * Math.sin(t * 0.25)) // gentle pulse

                // Draw vertical gradient ray: bright at top edge, fading downward
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
            ctx.moveTo(0, curtain.baseY * h + drift + Math.sin(t) * curtain.waveAmplitude)

            for (let x = 0; x <= w; x += 2) {
                const xFrac = x / w
                const y = curtain.baseY * h + drift
                    + Math.sin(t + xFrac * 8) * curtain.waveAmplitude
                    + Math.sin(t * 0.7 + xFrac * 12) * curtain.waveAmplitude * 0.4
                    + Math.sin(t * 0.4 + xFrac * 5) * curtain.waveAmplitude * 0.2
                ctx.lineTo(x, y)
            }

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${curtain.opacity * 1.5})`
            ctx.lineWidth = 2
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${curtain.opacity})`
            ctx.shadowBlur = 20
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
            const dpr = window.devicePixelRatio || 1
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            sizeRef.current = { w: rect.width, h: rect.height }
        }
        resize()
        window.addEventListener('resize', resize)

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const startTime = performance.now()
        const animate = () => {
            const elapsed = (performance.now() - startTime) / 1000
            draw(ctx, prefersReducedMotion ? 0 : elapsed)
            rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(rafRef.current)
            window.removeEventListener('resize', resize)
        }
    }, [draw])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
            aria-hidden="true"
        />
    )
}
