'use client'

import { ReactNode, useRef, useEffect, useCallback } from 'react'
import { useTransition } from './TransitionContext'

interface PageTransitionProps { children: ReactNode }

/**
 * PageTransition — "Tidal Wash"
 *
 * ZERO React re-renders during animation. A single rAF loop reads
 * phase + progressRef and:
 *   1. Draws the aurora canvas (wave curtains + dark fill)
 *   2. Applies blur/opacity/scale to the content wrapper via direct DOM style mutation
 *
 * React only re-renders on phase changes (4 per transition), which toggles
 * the canvas visibility and starts/stops the animation loop.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const { phase, progressRef } = useTransition()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const tealRef = useRef({ r: 7, g: 139, b: 156 })
  const sizeRef = useRef({ w: 0, h: 0 })
  const startTimeRef = useRef(0)
  const phaseRef = useRef<string>('idle')

  const isActive = phase !== 'idle'

  // Keep phase in a ref so the rAF loop always has the latest
  phaseRef.current = phase

  // ── Curtain definitions (static) ──
  const curtainsRef = useRef([
    { offset: 0, rayLength: 220, opacity: 0.28, waveAmplitude: 45, speed: 0.09, phase: 0, rayWidth: 16 },
    { offset: 55, rayLength: 170, opacity: 0.18, waveAmplitude: 38, speed: 0.07, phase: 2.2, rayWidth: 18 },
    { offset: 110, rayLength: 130, opacity: 0.11, waveAmplitude: 32, speed: 0.11, phase: 4.5, rayWidth: 20 },
  ])

  // ── Single draw function — reads all state from refs ──
  const draw = useCallback((ctx: CanvasRenderingContext2D, time: number, baseY: number) => {
    const w = sizeRef.current.w
    const h = sizeRef.current.h
    if (w === 0 || h === 0) return

    ctx.clearRect(0, 0, w, h)

    const { r, g, b } = tealRef.current
    const waveEdgePixelY = baseY * h

    // Dark fill behind the wave front
    ctx.fillStyle = 'rgba(3, 8, 12, 0.99)'
    const darkFillStart = waveEdgePixelY + 60
    if (darkFillStart < h) {
      ctx.fillRect(0, darkFillStart, w, h - darkFillStart)
    }

    ctx.globalCompositeOperation = 'source-over'
    const curtains = curtainsRef.current

    for (const curtain of curtains) {
      const t = time * curtain.speed + curtain.phase
      const curtainBaseY = waveEdgePixelY + curtain.offset
      const drift = Math.sin(t * 0.2) * 8

      // Vertical rays
      for (let x = 0; x < w; x += curtain.rayWidth) {
        const xFrac = x / w
        const edgeY = curtainBaseY + drift
          + Math.sin(t + xFrac * 8) * curtain.waveAmplitude
          + Math.sin(t * 0.7 + xFrac * 12) * curtain.waveAmplitude * 0.4
          + Math.sin(t * 0.4 + xFrac * 5) * curtain.waveAmplitude * 0.2

        const rayIntensity = 0.5
          + 0.3 * Math.sin(t * 0.5 + xFrac * 20)
          + 0.2 * Math.sin(t * 0.3 + xFrac * 35)
        const rayOpacity = curtain.opacity * rayIntensity * (0.7 + 0.3 * Math.sin(t * 0.25))

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

      // Glowing rope edge
      ctx.beginPath()
      ctx.moveTo(0, curtainBaseY + drift + Math.sin(t) * curtain.waveAmplitude)
      for (let x = 0; x <= w; x += 4) {
        const xFrac = x / w
        const y = curtainBaseY + drift
          + Math.sin(t + xFrac * 8) * curtain.waveAmplitude
          + Math.sin(t * 0.7 + xFrac * 12) * curtain.waveAmplitude * 0.4
          + Math.sin(t * 0.4 + xFrac * 5) * curtain.waveAmplitude * 0.2
        ctx.lineTo(x, y)
      }
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${curtain.opacity * 0.5})`
      ctx.lineWidth = 5
      ctx.stroke()
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${curtain.opacity * 1.5})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    // Solid dark fill behind lead curtain
    ctx.globalCompositeOperation = 'destination-over'
    ctx.beginPath()
    const leadT = time * curtains[0].speed + curtains[0].phase
    const leadDrift = Math.sin(leadT * 0.2) * 8
    ctx.moveTo(0, h + 10)
    for (let x = 0; x <= w; x += 4) {
      const xFrac = x / w
      const y = waveEdgePixelY + curtains[0].offset + leadDrift
        + Math.sin(leadT + xFrac * 8) * curtains[0].waveAmplitude
        + Math.sin(leadT * 0.7 + xFrac * 12) * curtains[0].waveAmplitude * 0.4
        + Math.sin(leadT * 0.4 + xFrac * 5) * curtains[0].waveAmplitude * 0.2
      ctx.lineTo(x, y)
    }
    ctx.lineTo(w, h + 10)
    ctx.closePath()
    ctx.fillStyle = 'rgba(3, 8, 12, 0.995)'
    ctx.fill()
    ctx.globalCompositeOperation = 'source-over'
  }, [])

  // ── Single rAF loop — handles BOTH canvas + content DOM updates ──
  useEffect(() => {
    if (!isActive) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      // Reset content styles when idle (clean state)
      const el = contentRef.current
      if (el) {
        el.style.opacity = '1'
        el.style.filter = 'none'
        el.style.transform = 'none'
        el.style.willChange = 'auto'
      }
      return
    }

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

    // Sizing
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { w, h }
    }
    resize()
    window.addEventListener('resize', resize)

    // Reset clock
    startTimeRef.current = performance.now()

    // Promote content to compositor layer
    const contentEl = contentRef.current
    if (contentEl) {
      contentEl.style.willChange = 'opacity, filter, transform'
    }

    const MAX_BLUR = 14

    // ── Master animation loop — all visual updates happen here,
    //    no React re-renders, no state updates, just raw DOM ──
    const animate = () => {
      const elapsed = (performance.now() - startTimeRef.current) / 1000
      const p = progressRef.current  // read from ref
      const currentPhase = phaseRef.current

      // ── Compute wave Y position ──
      let waveY: number
      if (currentPhase === 'submerge') waveY = 1.3 - p * 1.45
      else if (currentPhase === 'hold') waveY = -0.15
      else if (currentPhase === 'emerge') waveY = -0.15 + p * 1.45
      else waveY = 1.5

      // ── Draw the aurora canvas ──
      draw(ctx, elapsed, waveY)

      // ── Apply content effects directly to DOM (no React) ──
      if (contentEl) {
        let opacity: number, blur: number, scale: number

        if (currentPhase === 'submerge') {
          opacity = 1 - p * 0.85
          blur = p * MAX_BLUR
          scale = 1 - p * 0.02
        } else if (currentPhase === 'hold') {
          opacity = 0.15
          blur = MAX_BLUR
          scale = 0.98
        } else if (currentPhase === 'emerge') {
          opacity = 0.15 + p * 0.85
          blur = MAX_BLUR * (1 - p)
          scale = 0.98 + p * 0.02
        } else {
          opacity = 1
          blur = 0
          scale = 1
        }

        contentEl.style.opacity = String(opacity)
        contentEl.style.filter = blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : 'none'
        contentEl.style.transform = scale < 0.999 ? `scale(${scale.toFixed(4)})` : 'none'
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [isActive, draw, progressRef])

  return (
    <>
      {/* Canvas overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: isActive ? 9999 : -1,
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Content — styles applied via ref, not React render */}
      <div
        ref={contentRef}
        style={{ transformOrigin: 'center center' }}
      >
        {children}
      </div>
    </>
  )
}
