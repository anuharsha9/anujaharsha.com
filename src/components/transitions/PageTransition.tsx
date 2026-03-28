'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { useTransition } from './TransitionContext'

interface PageTransitionProps { children: ReactNode }

/**
 * PageTransition — "Tidal Wash" v16: Aurora-Matched Rolling Surge
 *
 * Uses the SAME sine-based wave math and visual language as HeroAurora.tsx:
 *   - Edge profile: 3-octave sine composition (not Gerstner trochoids)
 *   - Visual: vertical rays hanging from a glowing rope edge
 *   - Double-stroke rope glow (wide dim + narrow bright)
 *   - Same ray gradient stops as HeroAurora
 *
 * Transition mechanics preserved:
 *   - Independent layer timing (surgeLead / retreatLead)
 *   - Diagonal sweep propagation
 *   - 3 wave layers with staggered timing
 *   - Spray particles from crests during surge
 */

interface SprayParticle {
  x: number; y: number; vx: number; vy: number
  opacity: number; size: number; life: number; maxLife: number
}

// Aurora-matched wave layers — same parameters as HeroAurora curtains
// but with transition-specific timing fields
interface WaveLayer {
  opacity: number
  rayLength: number
  rayWidth: number
  waveAmplitude: number
  speed: number
  phase: number
  // Transition timing
  surgeLead: number
  retreatLead: number
  sweepAngle: number
}

const WAVE_LAYERS: WaveLayer[] = [
  // Background curtain — arrives first, retreats last (matches HeroAurora main curtain)
  {
    opacity: 0.20, rayLength: 200, rayWidth: 18,
    waveAmplitude: 40, speed: 0.08, phase: 0,
    surgeLead: 0, retreatLead: 0.35, sweepAngle: 0.18,
  },
  // Primary curtain — main visual mass (matches HeroAurora upper accent)
  {
    opacity: 0.32, rayLength: 180, rayWidth: 16,
    waveAmplitude: 35, speed: 0.06, phase: 2.0,
    surgeLead: 0.12, retreatLead: 0.15, sweepAngle: 0.12,
  },
  // Foreground curtain — arrives last, retreats first (matches HeroAurora lower curtain)
  {
    opacity: 0.14, rayLength: 150, rayWidth: 20,
    waveAmplitude: 30, speed: 0.10, phase: 4.0,
    surgeLead: 0.25, retreatLead: 0, sweepAngle: 0.08,
  },
]

const MAX_SPRAY = 40
const SPRAY_PER_FRAME = 2

export default function PageTransition({ children }: PageTransitionProps) {
  const { phase, progress } = useTransition()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tealRef = useRef({ r: 7, g: 139, b: 156 })
  const sizeRef = useRef({ w: 0, h: 0 })
  const rafRef = useRef(0)
  const startTimeRef = useRef(0)
  const phaseRef = useRef<string>('idle')
  const progressRef = useRef(0)
  const sprayRef = useRef<SprayParticle[]>([])
  const prevTimeRef = useRef(0)

  const isActive = phase !== 'idle'
  const MAX_COVERAGE = 0.82

  useEffect(() => {
    phaseRef.current = phase
    progressRef.current = progress
  }, [phase, progress])

  // Content styling — content submerges and surfaces
  const contentOpacity =
    phase === 'submerge' ? Math.max(0, 1 - progress * 1.5)
    : phase === 'hold' ? 0
    : phase === 'emerge' ? Math.min(1, progress * 1.5)
    : 1

  const contentBlur =
    phase === 'submerge' ? progress * 12
    : phase === 'hold' ? 12
    : phase === 'emerge' ? Math.max(0, (1 - progress * 3) * 6)
    : 0

  const contentTranslateY =
    phase === 'emerge' ? Math.max(0, (1 - progress * 2)) * 20 : 0

  useEffect(() => {
    if (!isActive) {
      sprayRef.current = []
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const rootStyle = getComputedStyle(document.documentElement)
    const tealRgb = rootStyle.getPropertyValue('--accent-teal-rgb').trim()
    if (tealRgb) {
      const parts = tealRgb.split(',').map(s => parseInt(s.trim(), 10))
      if (parts.length === 3 && parts.every(n => !isNaN(n)))
        tealRef.current = { r: parts[0], g: parts[1], b: parts[2] }
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
    prevTimeRef.current = performance.now()

    /**
     * Aurora edge Y — EXACT same formula as HeroAurora.tsx line 109-111:
     *   Math.sin(t + xFrac * 8) * amplitude
     *   + Math.sin(t * 0.7 + xFrac * 12) * amplitude * 0.4
     *   + Math.sin(t * 0.4 + xFrac * 5) * amplitude * 0.2
     *
     * This is the key to visual matching: same wave shape, same frequencies.
     */
    const auroraEdgeY = (
      xFrac: number, t: number, amplitude: number
    ): number => {
      return Math.sin(t + xFrac * 8) * amplitude
        + Math.sin(t * 0.7 + xFrac * 12) * amplitude * 0.4
        + Math.sin(t * 0.4 + xFrac * 5) * amplitude * 0.2
    }

    /**
     * Coverage: how far up the wave has swept at a given x-position.
     * Diagonal propagation — left side leads during surge.
     */
    const getLayerCoverage = (
      layer: WaveLayer, xNorm: number,
      globalProgress: number, curPhase: string
    ): number => {
      if (curPhase === 'idle') return 0
      if (curPhase === 'hold') return MAX_COVERAGE

      if (curPhase === 'submerge') {
        const layerProgress = Math.max(0, (globalProgress - layer.surgeLead) / (1 - layer.surgeLead))
        const sweepDelay = xNorm * Math.sin(layer.sweepAngle) * 0.3
        const localProgress = Math.max(0, Math.min(1, layerProgress - sweepDelay))
        const eased = localProgress * localProgress * (3 - 2 * localProgress)
        return eased * MAX_COVERAGE
      }

      if (curPhase === 'emerge') {
        const layerProgress = Math.max(0, (globalProgress - layer.retreatLead) / (1 - layer.retreatLead))
        const sweepDelay = (1 - xNorm) * Math.sin(layer.sweepAngle) * 0.25
        const localProgress = Math.max(0, Math.min(1, layerProgress - sweepDelay))
        const eased = localProgress * localProgress * (3 - 2 * localProgress)
        return MAX_COVERAGE * (1 - eased)
      }

      return 0
    }

    // Spray particles — lighter, more mist-like to match aurora aesthetic
    const emitSpray = (x: number, y: number, vxBias: number) => {
      if (sprayRef.current.length >= MAX_SPRAY) return
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2
      const speed = 30 + Math.random() * 60
      sprayRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed + vxBias * 20,
        vy: Math.sin(angle) * speed - 20,
        opacity: 0.2 + Math.random() * 0.3,
        size: 1 + Math.random() * 2,
        life: 0, maxLife: 0.4 + Math.random() * 0.6,
      })
    }

    const drawSpray = (dt: number) => {
      const { r, g, b } = tealRef.current
      const alive: SprayParticle[] = []
      for (const p of sprayRef.current) {
        p.life += dt
        if (p.life >= p.maxLife) continue
        p.x += p.vx * dt
        p.vy += 180 * dt // gentler gravity
        p.y += p.vy * dt
        const fade = 1 - p.life / p.maxLife
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * fade, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)}, ${p.opacity * fade * fade})`
        ctx.fill()
        alive.push(p)
      }
      sprayRef.current = alive
    }

    const animate = (now: number) => {
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) { rafRef.current = requestAnimationFrame(animate); return }

      const dt = Math.min((now - prevTimeRef.current) / 1000, 0.05)
      prevTimeRef.current = now
      const time = (now - startTimeRef.current) / 1000
      const curPhase = phaseRef.current
      const globalProgress = progressRef.current
      const { r, g, b } = tealRef.current

      const isSurge = curPhase === 'submerge'

      ctx.clearRect(0, 0, w, h)

      const step = 4 // match HeroAurora's rope step (line 151)
      const ptCount = Math.ceil(w / step) + 1

      // Slow ambient drift — same as HeroAurora (line 103)
      const drift = Math.sin(time * 0.15) * 8

      // Coverage range
      const startY = h + 60
      const endY = h * (1 - MAX_COVERAGE) - 30

      for (let li = 0; li < WAVE_LAYERS.length; li++) {
        const layer = WAVE_LAYERS[li]
        const edgeYs = new Float32Array(ptCount)

        // Time factor — same formula as HeroAurora (line 100)
        const t = time * layer.speed + layer.phase

        let hasAnyVisible = false

        for (let i = 0; i < ptCount; i++) {
          const x = i * step
          const xNorm = x / w

          const localCoverage = getLayerCoverage(layer, xNorm, globalProgress, curPhase)

          if (localCoverage < 0.003) {
            edgeYs[i] = h + 100
            continue
          }

          hasAnyVisible = true
          const covFrac = localCoverage / MAX_COVERAGE

          // Base Y — how far up this layer has reached at this x
          const baseY = startY - covFrac * (startY - endY) + drift

          // Progressive amplitude — small at leading edge, full at coverage
          const ampScale = 0.4 + covFrac * 0.6
          const amp = layer.waveAmplitude * ampScale

          // Aurora edge calculation — SAME formula as HeroAurora
          const waveY = auroraEdgeY(xNorm, t, amp)

          edgeYs[i] = baseY + waveY
        }

        if (!hasAnyVisible) continue

        // ── Dark fill beneath the wave edge ──
        // Use a subtle gradient instead of flat solid for softer look
        ctx.beginPath()
        ctx.moveTo(-10, h + 10)
        ctx.lineTo(w + 10, h + 10)
        ctx.lineTo(w + 10, edgeYs[ptCount - 1])
        // Smooth curve through wave points (same quadratic as HeroAurora rope)
        for (let i = ptCount - 1; i > 0; i--) {
          const x1 = i * step, x0 = (i - 1) * step
          const midX = (x1 + x0) / 2
          ctx.quadraticCurveTo(x1, edgeYs[i], midX, (edgeYs[i] + edgeYs[i - 1]) / 2)
        }
        ctx.lineTo(-10, edgeYs[0])
        ctx.lineTo(-10, h + 10)
        ctx.closePath()

        // Gradient fill — deep dark at bottom, slightly transparent near edge
        const fillGrad = ctx.createLinearGradient(0, h, 0, endY - 50)
        fillGrad.addColorStop(0, 'rgba(1, 2, 4, 1)')
        fillGrad.addColorStop(0.6, 'rgba(1, 2, 4, 0.98)')
        fillGrad.addColorStop(1, 'rgba(1, 2, 4, 0.92)')
        ctx.fillStyle = fillGrad
        ctx.fill()

        // ── Vertical rays hanging from edge — SAME style as HeroAurora ──
        // (HeroAurora lines 106-143)
        ctx.globalCompositeOperation = 'lighter'
        for (let x = 0; x < w; x += layer.rayWidth) {
          const idx = x / step
          const i0 = Math.floor(idx)
          const fr = idx - i0
          const ey = i0 < ptCount - 1
            ? edgeYs[i0] * (1 - fr) + edgeYs[i0 + 1] * fr
            : edgeYs[ptCount - 1]
          if (ey > h + 50) continue

          const xf = x / w
          // Ray intensity — SAME formula as HeroAurora (lines 126-128)
          const ri = 0.5
            + 0.3 * Math.sin(t * 0.5 + xf * 20)
            + 0.2 * Math.sin(t * 0.3 + xf * 35)
          const ro = layer.opacity * ri * (0.7 + 0.3 * Math.sin(t * 0.25))

          // Ray gradient — SAME stops as HeroAurora (lines 134-140)
          const g2 = ctx.createLinearGradient(x, ey - 15, x, ey + layer.rayLength)
          g2.addColorStop(0, `rgba(${r},${g},${b},0)`)
          g2.addColorStop(0.05, `rgba(${r},${g},${b},${ro * 0.5})`)
          g2.addColorStop(0.1, `rgba(${r},${g},${b},${ro})`)
          g2.addColorStop(0.2, `rgba(${r},${g},${b},${ro * 0.7})`)
          g2.addColorStop(0.5, `rgba(${r},${g},${b},${ro * 0.3})`)
          g2.addColorStop(1, `rgba(${r},${g},${b},0)`)
          ctx.fillStyle = g2
          ctx.fillRect(x, ey - 15, layer.rayWidth, layer.rayLength + 15)
        }
        ctx.globalCompositeOperation = 'source-over'

        // ── Glowing rope edge — SAME double-stroke as HeroAurora (lines 170-176) ──
        ctx.beginPath()
        ctx.moveTo(0, edgeYs[0])
        for (let i = 1; i < ptCount; i++) {
          ctx.lineTo(i * step, edgeYs[i])
        }

        // Outer glow — wider, dimmer
        ctx.strokeStyle = `rgba(${r},${g},${b},${layer.opacity * 0.5})`
        ctx.lineWidth = 5
        ctx.stroke()
        // Inner bright line
        ctx.strokeStyle = `rgba(${r},${g},${b},${layer.opacity * 1.5})`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // ── Spray from crests — primary layer during surge ──
        if (li === 1 && (isSurge || curPhase === 'hold') && globalProgress > 0.3) {
          for (let e = 0; e < SPRAY_PER_FRAME; e++) {
            const ri2 = Math.floor(Math.random() * ptCount)
            if (ri2 > 2 && ri2 < ptCount - 2) {
              const ey = edgeYs[ri2]
              if (ey < h && ey < edgeYs[ri2 - 1] && ey < edgeYs[ri2 + 1]) {
                const xNorm = (ri2 * step) / w
                emitSpray(ri2 * step, ey, isSurge ? (1 - xNorm) : 0)
              }
            }
          }
        }
      }

      // Draw spray
      if (sprayRef.current.length > 0) {
        ctx.globalCompositeOperation = 'lighter'
        drawSpray(dt)
        ctx.globalCompositeOperation = 'source-over'
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
        <canvas ref={canvasRef} className="fixed inset-0 z-[9997] pointer-events-none"
          style={{ width: '100vw', height: '100vh' }} aria-hidden="true" />
      )}
      <div style={{
        opacity: contentOpacity,
        filter: contentBlur > 0.1 ? `blur(${contentBlur}px)` : 'none',
        transform: contentTranslateY > 0.5 ? `translateY(${contentTranslateY}px)` : 'none',
        willChange: phase !== 'idle' ? 'opacity, filter, transform' : 'auto',
        transition: phase === 'idle' ? 'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease' : 'none',
      }}>
        {children}
      </div>
    </>
  )
}
