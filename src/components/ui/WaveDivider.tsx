'use client'

/**
 * FixedAurora — Full-viewport aurora for the fixed background layer.
 * Same Canvas 2D technique as HeroAurora but:
 *   - Uses window.innerWidth/Height (not getBoundingClientRect) to avoid
 *     sizing to the full page height instead of viewport.
 *   - Curtains spread across the entire viewport (not just hero region).
 *   - Hero area covered by HeroLanding's own opaque bg + HeroAurora.
 */

import { useRef, useEffect, useCallback } from 'react'

interface AuroraCurtain {
    baseY: number
    rayLength: number
    opacity: number
    waveAmplitude: number
    speed: number
    phase: number
    rayWidth: number
}

const CURTAINS: AuroraCurtain[] = [
    // ── Cluster 1: Upper region (matches hero's visual density) ──
    { baseY: 0.22, rayLength: 200, opacity: 0.18, waveAmplitude: 40, speed: 0.08, phase: 0, rayWidth: 12 },
    { baseY: 0.15, rayLength: 150, opacity: 0.10, waveAmplitude: 35, speed: 0.06, phase: 2.0, rayWidth: 14 },
    { baseY: 0.32, rayLength: 130, opacity: 0.08, waveAmplitude: 30, speed: 0.10, phase: 4.0, rayWidth: 12 },
    // ── Cluster 2: Mid-page ──
    { baseY: 0.52, rayLength: 200, opacity: 0.16, waveAmplitude: 38, speed: 0.07, phase: 1.5, rayWidth: 12 },
    { baseY: 0.45, rayLength: 150, opacity: 0.10, waveAmplitude: 33, speed: 0.05, phase: 3.2, rayWidth: 14 },
    { baseY: 0.60, rayLength: 130, opacity: 0.08, waveAmplitude: 28, speed: 0.09, phase: 5.5, rayWidth: 12 },
    // ── Cluster 3: Footer region ──
    { baseY: 0.78, rayLength: 180, opacity: 0.14, waveAmplitude: 36, speed: 0.08, phase: 0.8, rayWidth: 12 },
    { baseY: 0.72, rayLength: 140, opacity: 0.09, waveAmplitude: 30, speed: 0.06, phase: 2.5, rayWidth: 14 },
    { baseY: 0.86, rayLength: 120, opacity: 0.07, waveAmplitude: 25, speed: 0.10, phase: 4.5, rayWidth: 13 },
]

export default function FixedAurora() {
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

            // Gentle horizontal drift
            const drift = Math.sin(t * 0.15) * 8

            for (let x = 0; x < w; x += curtain.rayWidth) {
                const xFrac = x / w

                // Wavy edge position
                const edgeY = curtain.baseY * h + drift
                    + Math.sin(t + xFrac * 6) * curtain.waveAmplitude
                    + Math.sin(t * 0.5 + xFrac * 10) * curtain.waveAmplitude * 0.3

                // Shimmer intensity
                const rayIntensity = 0.5
                    + 0.3 * Math.sin(t * 0.3 + xFrac * 15)
                    + 0.2 * Math.sin(t * 0.2 + xFrac * 25)

                const rayOpacity = curtain.opacity * rayIntensity
                    * (0.7 + 0.3 * Math.sin(t * 0.15))

                // Vertical ray gradient
                const grad = ctx.createLinearGradient(x, edgeY - 10, x, edgeY + curtain.rayLength)
                grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
                grad.addColorStop(0.08, `rgba(${r}, ${g}, ${b}, ${rayOpacity * 0.4})`)
                grad.addColorStop(0.15, `rgba(${r}, ${g}, ${b}, ${rayOpacity})`)
                grad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${rayOpacity * 0.5})`)
                grad.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${rayOpacity * 0.15})`)
                grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

                ctx.fillStyle = grad
                ctx.fillRect(x, edgeY - 10, curtain.rayWidth, curtain.rayLength + 10)
            }

            // Glowing top-edge rope
            ctx.beginPath()
            ctx.moveTo(0, curtain.baseY * h + drift + Math.sin(t) * curtain.waveAmplitude)

            for (let x = 0; x <= w; x += 3) {
                const xFrac = x / w
                const y = curtain.baseY * h + drift
                    + Math.sin(t + xFrac * 6) * curtain.waveAmplitude
                    + Math.sin(t * 0.5 + xFrac * 10) * curtain.waveAmplitude * 0.3
                ctx.lineTo(x, y)
            }

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${curtain.opacity * 1.2})`
            ctx.lineWidth = 1
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${curtain.opacity * 0.6})`
            ctx.shadowBlur = 12
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

        // Read teal from CSS
        const rootStyle = getComputedStyle(document.documentElement)
        const tealRgb = rootStyle.getPropertyValue('--accent-teal-rgb').trim()
        if (tealRgb) {
            const parts = tealRgb.split(',').map(s => parseInt(s.trim(), 10))
            if (parts.length === 3 && parts.every(n => !isNaN(n))) {
                tealRef.current = { r: parts[0], g: parts[1], b: parts[2] }
            }
        }

        // Use viewport dimensions — NOT getBoundingClientRect
        // (fixed container's BoundingClientRect returns full page height, not viewport)
        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            const w = window.innerWidth
            const h = window.innerHeight
            canvas.width = w * dpr
            canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            sizeRef.current = { w, h }
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
            className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
            aria-hidden="true"
        />
    )
}
