'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { useTransition } from './TransitionContext'

interface PageTransitionProps { children: ReactNode }

/**
 * PageTransition — "Tidal Wash" v4: Canvas Ocean Waves
 *
 * Uses the same Canvas 2D wave engine as HeroAurora to draw organic,
 * undulating horizontal waves that sweep upward to mask content during
 * navigation, then retreat to reveal the new page.
 *
 * Visual DNA: Identical to landing page HeroAurora curtains.
 *   - Layered sin() wave edges (3 curtains)
 *   - Double-stroke teal ropes on crest edges
 *   - Solid dark fill below wave edges
 *   - NO extra glow, gradients, or box-shadows
 *
 * 80-20 rule: waves cover ~80% of viewport at peak, never 100%.
 * No pause at top — continuous crash-and-retreat like real ocean.
 */

interface WaveCurtain {
  baseYOffset: number
  opacity: number
  waveAmplitude: number
  speed: number
  phase: number
}

// 3 curtains — same count and aesthetic as HeroAurora landing page
const WAVE_CURTAINS: WaveCurtain[] = [
  // Trailing wave (lowest, drawn first)
  { baseYOffset: 0.05, opacity: 0.10, waveAmplitude: 28, speed: 1.4, phase: 4.0 },
  // Primary wave (the dominant edge)
  { baseYOffset: 0, opacity: 0.20, waveAmplitude: 40, speed: 1.0, phase: 0 },
  // Leading wave (highest, drawn last — defines visible boundary)
  { baseYOffset: -0.06, opacity: 0.14, waveAmplitude: 34, speed: 0.8, phase: 2.0 },
]

export default function PageTransition({ children }: PageTransitionProps) {
  const { phase, progress } = useTransition()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tealRef = useRef({ r: 7, g: 139, b: 156 })
  const sizeRef = useRef({ w: 0, h: 0 })
  const rafRef = useRef(0)
  const startTimeRef = useRef(0)
  const coverageRef = useRef(0)
  const phaseRef = useRef<string>('idle')

  const isActive = phase !== 'idle'

  // Update coverage ref so canvas loop reads latest value
  useEffect(() => {
    phaseRef.current = phase
    if (phase === 'submerge') coverageRef.current = progress
    else if (phase === 'hold') coverageRef.current = 1
    else if (phase === 'emerge') coverageRef.current = 1 - progress
    else coverageRef.current = 0
  }, [phase, progress])

  // Content opacity — stays visible during early surge so waves visibly sweep over it
  const contentOpacity =
    phase === 'submerge'
      ? (progress < 0.4 ? 1 : 1 - ((progress - 0.4) / 0.6) * 0.85)
      : phase === 'hold' ? 0.15
      : phase === 'emerge'
        ? (progress < 0.15 ? 0.15 : 0.15 + ((progress - 0.15) / 0.85) * 0.85)
      : 1

  // Canvas animation loop — runs only during transition
  useEffect(() => {
    if (!isActive) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Read teal from CSS design tokens
    const rootStyle = getComputedStyle(document.documentElement)
    const tealRgb = rootStyle.getPropertyValue('--accent-teal-rgb').trim()
    if (tealRgb) {
      const parts = tealRgb.split(',').map(s => parseInt(s.trim(), 10))
      if (parts.length === 3 && parts.every(n => !isNaN(n))) {
        tealRef.current = { r: parts[0], g: parts[1], b: parts[2] }
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { w: window.innerWidth, h: window.innerHeight }
    }
    resize()
    window.addEventListener('resize', resize)
    startTimeRef.current = performance.now()

    const step = 3 // px per sample point along x-axis

    const animate = () => {
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) { rafRef.current = requestAnimationFrame(animate); return }

      const time = (performance.now() - startTimeRef.current) / 1000
      const coverage = coverageRef.current
      const { r, g, b } = tealRef.current

      ctx.clearRect(0, 0, w, h)

      // Primary wave Y: coverage 0→fully below viewport, 1→80% coverage (20% from top)
      // Rest position at 1.20 (20% below viewport) ensures wave crests with
      // their full amplitude (~46px) are completely off-screen at start/end.
      const primaryBaseY = 1.20 - coverage * 1.00

      // Phase-aware motion: waves are more energetic during crash,
      // slower and heavier during retreat
      const currentPhase = phaseRef.current
      const speedMult = currentPhase === 'submerge' ? 1.3
                       : currentPhase === 'emerge' ? 0.6
                       : 0.4  // hold: gentle idle ripple
      const ampMult = currentPhase === 'submerge' ? 1.15
                    : currentPhase === 'emerge' ? 0.85
                    : 1.0

      // Pre-compute edge-Y arrays for each curtain (reused for fill + rope)
      const curtainEdges: number[][] = WAVE_CURTAINS.map(curtain => {
        const t = time * curtain.speed * speedMult + curtain.phase
        const amp = curtain.waveAmplitude * ampMult
        const curtainBaseY = (primaryBaseY + curtain.baseYOffset) * h
        const edges: number[] = []
        for (let x = 0; x <= w; x += step) {
          const xFrac = x / w
          // Same layered sin() formula as HeroAurora
          edges.push(
            curtainBaseY
            + Math.sin(t + xFrac * 8) * amp
            + Math.sin(t * 0.7 + xFrac * 12) * amp * 0.4
            + Math.sin(t * 0.4 + xFrac * 5) * amp * 0.2
          )
        }
        return edges
      })

      // Step 1: Fill dark below each wave edge
      for (let ci = 0; ci < WAVE_CURTAINS.length; ci++) {
        const edges = curtainEdges[ci]
        ctx.beginPath()
        ctx.moveTo(-10, h + 10)
        edges.forEach((y, i) => ctx.lineTo(i * step, y))
        ctx.lineTo(w + 10, h + 10)
        ctx.closePath()
        ctx.fillStyle = 'rgb(1, 2, 4)'
        ctx.fill()
      }

      // Step 2: Draw rope strokes — same double-stroke as HeroAurora
      for (let ci = 0; ci < WAVE_CURTAINS.length; ci++) {
        const curtain = WAVE_CURTAINS[ci]
        const edges = curtainEdges[ci]
        ctx.beginPath()
        edges.forEach((y, i) => {
          if (i === 0) ctx.moveTo(0, y)
          else ctx.lineTo(i * step, y)
        })
        // Dim outer stroke
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${curtain.opacity * 0.5})`
        ctx.lineWidth = 5
        ctx.stroke()
        // Bright inner stroke
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${curtain.opacity * 1.5})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [isActive])

  return (
    <>
      {isActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-[9997] pointer-events-none"
          style={{ width: '100vw', height: '100vh' }}
          aria-hidden="true"
        />
      )}
      <div style={{
        opacity: contentOpacity,
        willChange: phase !== 'idle' ? 'opacity' : 'auto',
        transition: phase === 'idle' ? 'opacity 0.3s ease' : 'none',
      }}>
        {children}
      </div>
    </>
  )
}
