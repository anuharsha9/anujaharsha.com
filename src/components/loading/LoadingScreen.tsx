'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'

/**
 * LoadingScreen — "Surfacing"
 *
 * The entry experience uses the same wave/ocean visual language:
 * - A smaller version of the aurora waves animates in the background,
 *   starting heavily blurred and sharpening as loading progresses.
 * - A tide line (thin animated wave) shows loading progress.
 * - Status text uses ocean depth metaphors.
 * - The whole screen fades out as the aurora "surfaces" into the main site.
 *
 * No gears, no system boot, no hex markers. Pure ocean.
 */

/* ── Mini Aurora — compact loading-screen version ── */
function LoadingAurora({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const sizeRef = useRef({ w: 0, h: 0 })

  const draw = useCallback((ctx: CanvasRenderingContext2D, time: number, prog: number) => {
    const w = sizeRef.current.w
    const h = sizeRef.current.h
    if (w === 0 || h === 0) return

    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'

    const r = 7, g = 139, b = 156

    // Waves materialise as progress increases
    // At 0% — faint, slow, few. At 100% — vivid, full curtains forming.
    const intensityMult = 0.3 + prog * 0.7     // 0.3 → 1.0
    const speedMult = 0.5 + prog * 0.5         // Slow → normal speed
    const curtainCount = prog > 0.4 ? 3 : prog > 0.15 ? 2 : 1

    const curtains = [
      { baseY: 0.55, rayLen: 180, opacity: 0.18, waveAmp: 40, speed: 0.08, phase: 0, rayW: 12 },
      { baseY: 0.45, rayLen: 140, opacity: 0.12, waveAmp: 35, speed: 0.06, phase: 2.0, rayW: 14 },
      { baseY: 0.68, rayLen: 120, opacity: 0.09, waveAmp: 30, speed: 0.10, phase: 4.0, rayW: 12 },
    ]

    for (let ci = 0; ci < curtainCount; ci++) {
      const c = curtains[ci]
      const t = time * c.speed * speedMult + c.phase
      const drift = Math.sin(t * 0.2) * 10
      const op = c.opacity * intensityMult

      // Rays
      for (let x = 0; x < w; x += c.rayW) {
        const xFrac = x / w
        const edgeY = c.baseY * h + drift
          + Math.sin(t + xFrac * 8) * c.waveAmp
          + Math.sin(t * 0.7 + xFrac * 12) * c.waveAmp * 0.4

        const intensity = 0.5
          + 0.3 * Math.sin(t * 0.5 + xFrac * 20)
          + 0.2 * Math.sin(t * 0.3 + xFrac * 35)

        const rayOp = op * intensity * (0.7 + 0.3 * Math.sin(t * 0.25))

        const grad = ctx.createLinearGradient(x, edgeY - 15, x, edgeY + c.rayLen)
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
        grad.addColorStop(0.05, `rgba(${r}, ${g}, ${b}, ${rayOp * 0.5})`)
        grad.addColorStop(0.1, `rgba(${r}, ${g}, ${b}, ${rayOp})`)
        grad.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${rayOp * 0.7})`)
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${rayOp * 0.3})`)
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.fillStyle = grad
        ctx.fillRect(x, edgeY - 15, c.rayW, c.rayLen + 15)
      }

      // Glowing rope
      ctx.beginPath()
      ctx.moveTo(0, c.baseY * h + drift + Math.sin(t) * c.waveAmp)
      for (let x = 0; x <= w; x += 2) {
        const xFrac = x / w
        const y = c.baseY * h + drift
          + Math.sin(t + xFrac * 8) * c.waveAmp
          + Math.sin(t * 0.7 + xFrac * 12) * c.waveAmp * 0.4
        ctx.lineTo(x, y)
      }
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${op * 1.5})`
      ctx.lineWidth = 2
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${op})`
      ctx.shadowBlur = 20
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    ctx.globalCompositeOperation = 'source-over'
  }, [])

  // Store progress in a ref so the animation loop always has the latest
  const progressRef = useRef(progress)
  progressRef.current = progress

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

    const startTime = performance.now()
    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000
      draw(ctx, elapsed, progressRef.current / 100)
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

/* ── Tide Progress Line ── */
function TideProgress({ progress }: { progress: number }) {
  const width = `${progress}%`
  return (
    <div className="w-64 md:w-80 relative">
      {/* Track */}
      <div className="w-full h-[2px] bg-white/[0.06] rounded-full overflow-hidden relative">
        {/* Fill — teal gradient */}
        <div
          className="h-full rounded-full"
          style={{
            width,
            background: 'linear-gradient(90deg, rgba(7, 139, 156, 0.3) 0%, rgba(7, 139, 156, 0.9) 100%)',
            transition: 'width 0.15s ease-out',
            boxShadow: progress > 85
              ? '0 0 12px rgba(7, 139, 156, 0.6), 0 0 24px rgba(7, 139, 156, 0.2)'
              : '0 0 6px rgba(7, 139, 156, 0.3)',
          }}
        />
      </div>
    </div>
  )
}

/* ── Main Loading Screen ── */
export default function LoadingScreen() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [depthText, setDepthText] = useState('descending')
  const animationRef = useRef<number | null>(null)
  const fadeTimeoutRef = useRef<number | null>(null)
  const hideTimeoutRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const progressRef = useRef<number>(0)

  const LOADING_DURATION = 2000

  useEffect(() => {
    const dispatchReady = () => {
      window.dispatchEvent(new Event('app-ready'))
    }

    const clearScheduledWork = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current)
        fadeTimeoutRef.current = null
      }
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current)
        hideTimeoutRef.current = null
      }
    }

    clearScheduledWork()

    if (pathname !== '/') {
      setIsVisible(false)
      dispatchReady()
      return
    }

    // Skip loading screen for returning visitors
    const hasSession = localStorage.getItem('portfolio_entry_completed') === 'true'
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (hasSession || prefersReducedMotion) {
      setIsVisible(false)
      dispatchReady()
      return
    }

    setIsVisible(true)
    setIsFading(false)
    setProgress(0)
    setDepthText('descending')
    startTimeRef.current = performance.now()

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current
      const rawProgress = Math.min(elapsed / LOADING_DURATION, 1)

      // Asymmetric easing — matches the wave physics elsewhere
      // Slow descent, then accelerates as you surface
      let easedProgress: number
      if (rawProgress < 0.3) {
        easedProgress = rawProgress * 0.6          // Slow descent
      } else if (rawProgress < 0.7) {
        easedProgress = 0.18 + (rawProgress - 0.3) * 1.3  // Rising
      } else {
        easedProgress = 0.7 + (rawProgress - 0.7) * 1.0   // Surfacing
      }
      const currentProgress = Math.min(Math.round(easedProgress * 100), 100)

      // Only re-render when the displayed integer changes
      if (currentProgress !== progressRef.current) {
        progressRef.current = currentProgress
        setProgress(currentProgress)
      }

      // Depth metaphor status text
      if (currentProgress < 20) {
        setDepthText('descending')
      } else if (currentProgress < 45) {
        setDepthText('reaching the floor')
      } else if (currentProgress < 65) {
        setDepthText('waves forming')
      } else if (currentProgress < 85) {
        setDepthText('rising')
      } else if (currentProgress < 98) {
        setDepthText('surfacing')
      } else {
        setDepthText('surface')
      }

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animateProgress)
      } else {
        fadeTimeoutRef.current = window.setTimeout(() => {
          setIsFading(true)

          // Dispatch app-ready 200ms into the 1.4s fade, so hero entrance
          // begins while loading screen is still partially visible — crossfade overlap.
          // The loading overlay lingers as a shroud that the hero "pushes through."
          window.setTimeout(() => dispatchReady(), 200)

          hideTimeoutRef.current = window.setTimeout(() => {
            setIsVisible(false)
          }, 1400)
        }, 150)
      }
    }

    animationRef.current = requestAnimationFrame(animateProgress)

    return () => {
      clearScheduledWork()
    }
  }, [pathname])

  if (!isVisible) return null

  // Blur goes from 16px → 0 as progress increases (waves resolving)
  const auroraBlur = Math.max(0, 16 - (progress / 100) * 16)
  const isSurfacing = progress > 85

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 60%, rgb(10, 16, 22) 0%, rgb(4, 6, 10) 100%)',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'scale(1.05)' : 'scale(1)',
        filter: isFading ? 'blur(8px)' : 'none',
        transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      {/* Aurora waves — blur resolves with loading progress */}
      <div
        className="absolute inset-0"
        style={{
          filter: `blur(${auroraBlur.toFixed(1)}px)`,
          transition: 'filter 0.3s ease-out',
          opacity: 0.3 + (progress / 100) * 0.7,
        }}
      >
        <LoadingAurora progress={progress} />
      </div>

      {/* Radial vignette — keeps center readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(4, 6, 10, 0.7) 80%)',
        }}
      />

      {/* Main content — fades out faster than the background for a layered dissolve */}
      <div
        className="relative z-10 flex flex-col items-center justify-center gap-8"
        style={{
          opacity: isFading ? 0 : 1,
          transform: isFading ? 'translateY(-20px)' : 'translateY(0)',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >

        {/* Depth counter — the primary visual */}
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-5xl md:text-7xl font-mono font-light tabular-nums tracking-tighter"
            style={{
              color: isSurfacing ? 'rgba(7, 139, 156, 0.9)' : 'rgba(255, 255, 255, 0.12)',
              transition: 'color 0.6s ease',
              textShadow: isSurfacing ? '0 0 40px rgba(7, 139, 156, 0.3)' : 'none',
            }}
          >
            {String(progress).padStart(3, '0')}
          </span>
        </div>

        {/* Tide progress bar */}
        <TideProgress progress={progress} />

        {/* Depth status — ocean metaphor */}
        <p
          className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase"
          style={{
            color: isSurfacing ? 'rgba(7, 139, 156, 0.7)' : 'rgba(148, 163, 184, 0.4)',
            transition: 'color 0.5s ease',
          }}
        >
          {depthText}
        </p>
      </div>
    </div>
  )
}
