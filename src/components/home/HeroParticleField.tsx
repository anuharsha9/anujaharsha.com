'use client'

/**
 * HeroParticleField — Vanilla Canvas 2D, lerp-based convergence.
 *
 * Uses simple lerp (not springs) so particles NEVER overshoot.
 * Each frame: position += (target - position) * speed
 * This always closes the gap without bouncing.
 */

import { useRef, useEffect, useCallback } from 'react'

const COUNT = 3000
const SCATTER = 800
const LERP_SPEED = 0.025        // fraction of gap closed per frame — no overshoot possible
const MOUSE_R = 120
const MOUSE_F = 8
const MIN_FRAMES = 60

// ── Text sampler ────────────────────────────────────────────────────
function sampleText(n: number, w: number, h: number) {
    const c = document.createElement('canvas')
    c.width = w; c.height = h
    const x = c.getContext('2d')!
    x.fillStyle = '#000'; x.fillRect(0, 0, w, h)
    x.fillStyle = '#fff'; x.textAlign = 'center'
    const cx = w / 2

    x.font = '600 12px Inter,sans-serif'
    x.fillText('SENIOR  PRODUCT  DESIGNER', cx, 55)
    x.font = '800 85px Inter,sans-serif'
    x.fillText("Hi, I'm Anuja", cx, 155)
    x.font = '300 18px Inter,sans-serif'
    x.fillText('13 years of experience specializing in B2B enterprise UX,', cx, 205)
    x.fillText('product strategy, and high-fidelity code prototyping.', cx, 230)

    const by = 280, bw = 220, bh = 40, g = 16
    x.fillStyle = '#fff'
    pill(x, cx - bw - g / 2, by, bw, bh, 20); x.fill()
    x.strokeStyle = '#fff'; x.lineWidth = 1.5
    pill(x, cx + g / 2, by, bw, bh, 20); x.stroke()
    x.fillStyle = '#000'; x.font = '700 10px Inter,sans-serif'
    x.fillText('FLAGSHIP CASE STUDY', cx - g / 2 - bw / 2, by + 24)
    x.fillStyle = '#fff'
    x.fillText('EXPLORE MY MIND', cx + g / 2 + bw / 2, by + 24)

    const d = x.getImageData(0, 0, w, h).data
    const pts: { x: number; y: number }[] = []
    for (let y = 0; y < h; y += 2)
        for (let xx = 0; xx < w; xx += 2)
            if (d[(y * w + xx) * 4] > 60) pts.push({ x: xx, y })

    const out: { x: number; y: number }[] = []
    for (let i = 0; i < n; i++)
        pts.length && out.push(pts[Math.floor(Math.random() * pts.length)])
    return out
}

function pill(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
}

// ── Component ───────────────────────────────────────────────────────
export default function HeroParticleField({
    onFormed,
    formed,
}: {
    onFormed?: () => void
    formed?: boolean
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: -9999, y: -9999 })

    const onMove = useCallback((e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY }
    }, [])
    const onLeave = useCallback(() => {
        mouseRef.current = { x: -9999, y: -9999 }
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseleave', onLeave)
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseleave', onLeave)
        }
    }, [onMove, onLeave])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')!
        const dpr = Math.min(window.devicePixelRatio, 2)
        const vw = window.innerWidth
        const vh = window.innerHeight

        canvas.width = vw * dpr
        canvas.height = vh * dpr
        canvas.style.width = `${vw}px`
        canvas.style.height = `${vh}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        // Sample and map text positions to viewport
        const TW = 900, TH = 340
        const textPts = sampleText(COUNT, TW, TH)
        const scale = Math.min(vw / TW, vh / TH) * 0.7
        const offX = (vw - TW * scale) / 2
        const offY = (vh - TH * scale) / 2

        // Particle data
        const px = new Float32Array(COUNT)
        const py = new Float32Array(COUNT)
        const tx = new Float32Array(COUNT)
        const ty = new Float32Array(COUNT)
        const sizes = new Float32Array(COUNT)
        const teal = new Uint8Array(COUNT)

        for (let i = 0; i < COUNT; i++) {
            const a = Math.random() * Math.PI * 2
            const r = SCATTER * (0.1 + Math.random() * 0.9)
            px[i] = vw / 2 + Math.cos(a) * r
            py[i] = vh / 2 + Math.sin(a) * r

            if (textPts[i]) {
                tx[i] = offX + textPts[i].x * scale
                ty[i] = offY + textPts[i].y * scale
            } else {
                tx[i] = Math.random() * vw
                ty[i] = Math.random() * vh
            }

            sizes[i] = 0.5 + Math.random() * 1.0
            teal[i] = Math.random() < 0.35 ? 1 : 0
        }

        let frozen = false
        let frame = 0
        let raf = 0

        function loop() {
            if (frozen) return
            frame++

            ctx.clearRect(0, 0, vw, vh)

            const mx = mouseRef.current.x
            const my = mouseRef.current.y
            let maxGap = 0

            for (let i = 0; i < COUNT; i++) {
                // Lerp toward target — CANNOT overshoot
                let targetX = tx[i]
                let targetY = ty[i]

                // Mouse push — temporarily offset the target
                if (mx > -1000) {
                    const ddx = px[i] - mx
                    const ddy = py[i] - my
                    const dist = Math.sqrt(ddx * ddx + ddy * ddy)
                    if (dist < MOUSE_R && dist > 1) {
                        const push = (1 - dist / MOUSE_R) * MOUSE_F
                        targetX += (ddx / dist) * push
                        targetY += (ddy / dist) * push
                    }
                }

                px[i] += (targetX - px[i]) * LERP_SPEED
                py[i] += (targetY - py[i]) * LERP_SPEED

                const gap = Math.abs(tx[i] - px[i]) + Math.abs(ty[i] - py[i])
                if (gap > maxGap) maxGap = gap
            }

            // Batch render by color to minimize fillStyle switches
            ctx.fillStyle = '#ffffff'
            ctx.globalAlpha = 0.65
            for (let i = 0; i < COUNT; i++) {
                if (teal[i]) continue
                const s = sizes[i]
                ctx.fillRect(px[i] - s / 2, py[i] - s / 2, s, s)
            }
            ctx.fillStyle = '#00D2D3'
            for (let i = 0; i < COUNT; i++) {
                if (!teal[i]) continue
                const s = sizes[i]
                ctx.fillRect(px[i] - s / 2, py[i] - s / 2, s, s)
            }

            ctx.globalAlpha = 1

            // Settled? (max gap < 1px and enough frames elapsed)
            if (maxGap < 1 && frame > MIN_FRAMES) {
                // Snap to exact targets
                for (let i = 0; i < COUNT; i++) {
                    px[i] = tx[i]; py[i] = ty[i]
                }
                // Final draw
                ctx.clearRect(0, 0, vw, vh)
                for (let i = 0; i < COUNT; i++) {
                    ctx.fillStyle = teal[i] ? '#00D2D3' : '#ffffff'
                    ctx.globalAlpha = 0.65
                    const s = sizes[i]
                    ctx.fillRect(px[i] - s / 2, py[i] - s / 2, s, s)
                }
                ctx.globalAlpha = 1
                frozen = true
                onFormed?.()
                return
            }

            raf = requestAnimationFrame(loop)
        }

        raf = requestAnimationFrame(loop)

        return () => cancelAnimationFrame(raf)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{
                filter: formed ? 'blur(40px)' : 'blur(0px)',
                opacity: formed ? 0 : 1,
                transition:
                    'filter 1.8s cubic-bezier(0.22,1,0.36,1), opacity 2.2s cubic-bezier(0.22,1,0.36,1) 0.5s',
            }}
        />
    )
}
