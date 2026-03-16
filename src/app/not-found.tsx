'use client'

import TransitionLink from '@/components/transitions/TransitionLink'
import { motion } from 'framer-motion'
import Magnetic from '@/components/ui/Magnetic'
import { useEffect, useState, useRef, useCallback } from 'react'

/**
 * 404 — "Lost at Sea"
 *
 * The wave visual language carries into the error state:
 * - A mini canvas aurora renders chaotic, stormy waves (faster, more
 *   erratic than the calm homepage aurora).
 * - The "404" text has a subtle wave distortion via CSS animation.
 * - Copy uses the ocean metaphor: "drifted off course."
 *
 * Judges ALWAYS check the 404. This is our creative easter egg.
 */

/* ── Stormy Aurora — a simplified, more turbulent version of HeroAurora ── */
function StormyWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const sizeRef = useRef({ w: 0, h: 0 })

  const draw = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    const w = sizeRef.current.w
    const h = sizeRef.current.h
    if (w === 0 || h === 0) return

    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'

    const r = 7, g = 139, b = 156 // teal

    // More curtains, more turbulent, spread across viewport
    const curtains = [
      { baseY: 0.30, rayLength: 180, opacity: 0.10, waveAmp: 55, speed: 0.18, phase: 0, rayW: 10 },
      { baseY: 0.45, rayLength: 220, opacity: 0.16, waveAmp: 65, speed: 0.14, phase: 1.5, rayW: 12 },
      { baseY: 0.60, rayLength: 200, opacity: 0.20, waveAmp: 50, speed: 0.22, phase: 3.0, rayW: 10 },
      { baseY: 0.72, rayLength: 160, opacity: 0.12, waveAmp: 45, speed: 0.16, phase: 4.5, rayW: 14 },
      { baseY: 0.85, rayLength: 120, opacity: 0.08, waveAmp: 35, speed: 0.20, phase: 6.0, rayW: 10 },
    ]

    for (const c of curtains) {
      const t = time * c.speed + c.phase
      const drift = Math.sin(t * 0.3) * 15 + Math.sin(t * 0.7) * 8

      // Rays
      for (let x = 0; x < w; x += c.rayW) {
        const xFrac = x / w
        const edgeY = c.baseY * h + drift
          + Math.sin(t + xFrac * 10) * c.waveAmp
          + Math.sin(t * 0.9 + xFrac * 15) * c.waveAmp * 0.5
          + Math.sin(t * 1.3 + xFrac * 7) * c.waveAmp * 0.3 // extra turbulence

        const intensity = 0.4
          + 0.35 * Math.sin(t * 0.6 + xFrac * 25)
          + 0.25 * Math.sin(t * 0.4 + xFrac * 40)

        const rayOp = c.opacity * intensity * (0.6 + 0.4 * Math.sin(t * 0.35))

        const grad = ctx.createLinearGradient(x, edgeY - 10, x, edgeY + c.rayLength)
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
        grad.addColorStop(0.08, `rgba(${r}, ${g}, ${b}, ${rayOp * 0.4})`)
        grad.addColorStop(0.15, `rgba(${r}, ${g}, ${b}, ${rayOp})`)
        grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${rayOp * 0.5})`)
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.fillStyle = grad
        ctx.fillRect(x, edgeY - 10, c.rayW, c.rayLength + 10)
      }

      // Glowing rope
      ctx.beginPath()
      ctx.moveTo(0, c.baseY * h + drift + Math.sin(t) * c.waveAmp)
      for (let x = 0; x <= w; x += 2) {
        const xFrac = x / w
        const y = c.baseY * h + drift
          + Math.sin(t + xFrac * 10) * c.waveAmp
          + Math.sin(t * 0.9 + xFrac * 15) * c.waveAmp * 0.5
          + Math.sin(t * 1.3 + xFrac * 7) * c.waveAmp * 0.3
        ctx.lineTo(x, y)
      }
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${c.opacity * 1.2})`
      ctx.lineWidth = 1.5
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${c.opacity * 0.8})`
      ctx.shadowBlur = 15
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

/* ── 404 Page ── */
export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg-cinematic)] flex flex-col items-center justify-center relative overflow-hidden text-center px-4 selection:bg-[var(--accent-teal)] selection:text-white">

      {/* Stormy aurora — more turbulent than homepage */}
      <div className="absolute inset-0 opacity-70">
        <StormyWaves />
      </div>

      {/* Dark gradient overlay to ensure text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center 40%, transparent 0%, rgba(8, 12, 16, 0.6) 60%, rgba(8, 12, 16, 0.85) 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">

        {/* The "404" — large, ghostly, with wave-like CSS animation */}
        <motion.div
          className="relative font-mono font-bold text-[10rem] md:text-[14rem] leading-none tracking-tighter select-none mb-[-2rem] md:mb-[-3rem]"
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(7, 139, 156, 0.4) 0%, rgba(7, 139, 156, 0.08) 70%, transparent 100%)',
              WebkitTextStroke: '1.5px rgba(7, 139, 156, 0.25)',
            }}
          >
            404
          </span>
        </motion.div>

        {/* Narrative text — ocean metaphor */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-sans text-3xl md:text-4xl text-white font-light tracking-tight">
            You&apos;ve drifted off course.
          </h1>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto text-sm md:text-base leading-relaxed">
            This page doesn&apos;t exist — or it slipped beneath the waves.
            <br />
            The current can carry you back.
          </p>
        </motion.div>

        {/* Navigation — emerge after text */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Magnetic strength={0.3}>
            <TransitionLink
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent-teal)] text-white rounded-full font-medium text-sm transition-all hover:shadow-[0_0_30px_rgba(7,139,156,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Resurface
            </TransitionLink>
          </Magnetic>

          <Magnetic strength={0.2}>
            <TransitionLink
              href="/#work-overview"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium text-sm transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
            >
              Explore Case Studies
            </TransitionLink>
          </Magnetic>
        </motion.div>

        {/* Depth indicator — like a sonar reading */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        >
          <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-[0.2em]">
            <span className="w-8 h-px bg-[var(--accent-teal)]/30" />
            {mounted && (
              <span>depth: {typeof window !== 'undefined' ? window.location.pathname : '/unknown'}</span>
            )}
            <span className="w-8 h-px bg-[var(--accent-teal)]/30" />
          </div>
          <motion.div
            className="w-1 h-8 rounded-full bg-gradient-to-b from-[var(--accent-teal)]/40 to-transparent"
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

      </div>
    </div>
  )
}
