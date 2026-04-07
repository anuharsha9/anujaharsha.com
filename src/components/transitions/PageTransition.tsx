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
  // Background curtain — reaches highest, pushes far ahead
  {
    opacity: 0.20, rayLength: 250, rayWidth: 18,
    waveAmplitude: 60, speed: 0.10, phase: 0,
    surgeLead: 0.4, retreatLead: 0.0, sweepAngle: 0.15,
  },
  // Primary curtain — main visual mass
  {
    opacity: 0.32, rayLength: 220, rayWidth: 16,
    waveAmplitude: 45, speed: 0.08, phase: 2.5,
    surgeLead: 0.15, retreatLead: 0.25, sweepAngle: 0.15,
  },
  // Foreground curtain — heavy bottom layer, lags behind
  {
    opacity: 0.14, rayLength: 180, rayWidth: 20,
    waveAmplitude: 50, speed: 0.05, phase: 4.5,
    surgeLead: 0.0, retreatLead: 0.5, sweepAngle: 0.15,
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
  const timeRef = useRef(0)

  const isActive = phase !== 'idle'
  const MAX_COVERAGE = 0.82

  useEffect(() => {
    phaseRef.current = phase
    progressRef.current = progress
  }, [phase, progress])

  // Content styling — tightly tracking the physical wave edge for a cinematic "wipe"
  // Submerge: Stay fully visible until the wave crashes over (progress > 0.4), then plummet.
  // Emerge: Stay completely invisible while wave holds, then aggressively reveal as it drops.
  const easeInOutSine = (t: number) => -(Math.cos(Math.PI * Math.max(0, Math.min(1, t))) - 1) / 2;

  const contentOpacity =
    phase === 'submerge' ? Math.max(0, 1 - easeInOutSine(progress * 1.4)) // Fades natively matching the wave height
    : phase === 'hold' ? 0
    : phase === 'emerge' ? easeInOutSine(progress) // Graceful, breath-like fade-in
    : 1

  const contentBlur = 0

  const contentTranslateY =
    phase === 'submerge' ? easeInOutSine(progress) * 70 // Graceful deep sink
    : phase === 'emerge' ? easeInOutSine(1 - progress) * 70 // Rises organically into place
    : 0

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
    timeRef.current = 0

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
      globalProgress: number, curPhase: string,
      time: number
    ): number => {
      if (curPhase === 'idle') return 0

      // Calculate continuous wave coverage logic with simple sweep delay
      if (curPhase === 'submerge' || curPhase === 'hold') {
        const effectiveProgress = curPhase === 'hold' ? 1.0 : globalProgress
        const sweepDelay = xNorm * Math.sin(layer.sweepAngle) * 0.25
        
        // Critical fix: Scale localProgress so the entire wave hits 1.0 continuously
        let localProgress = Math.max(0, Math.min(1, (effectiveProgress - sweepDelay) / (1 - sweepDelay)))

        // Ultra-smooth S-curve for surge: eases gently into the motion, flies through the middle, safely cushions at the crest
        localProgress = -(Math.cos(Math.PI * localProgress) - 1) / 2

        return Math.max(0, Math.min(MAX_COVERAGE + 0.05, localProgress * MAX_COVERAGE))
      }

      if (curPhase === 'emerge') {
        const sweepDelay = (1 - xNorm) * Math.sin(layer.sweepAngle) * 0.25
        let localProgress = Math.max(0, Math.min(1, (globalProgress - sweepDelay) / (1 - sweepDelay)))

        // Ultra-smooth S-curve for retreat: delicately un-sticks from the top, rapidly pulls away, softly glides to rest at the bottom
        localProgress = -(Math.cos(Math.PI * localProgress) - 1) / 2

        const drain = localProgress
        const base = 1 - drain

        return Math.max(0, Math.min(MAX_COVERAGE + 0.05, base * MAX_COVERAGE))
      }

      return 0
    }

    // Spray particles — mist-like but physically reactive (explosive crash, gravity fall)
    const emitSpray = (x: number, y: number, vxBias: number) => {
      if (sprayRef.current.length >= MAX_SPRAY) return
      // Spread angle mostly upwards, blowing slightly left/right based on wind/bias
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.4
      const speed = 50 + Math.random() * 90 // Explosive kinetic burst
      sprayRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed + vxBias * 40,
        vy: Math.sin(angle) * speed - 50, // Harder initial vertical jet
        opacity: 0.2 + Math.random() * 0.4, // Richer mist
        size: 1 + Math.random() * 3, // Thicker water droplets
        life: 0, maxLife: 0.5 + Math.random() * 1.0,
      })
    }

    const drawSpray = (dt: number) => {
      const { r, g, b } = tealRef.current
      const alive: SprayParticle[] = []
      for (const p of sprayRef.current) {
        p.life += dt
        if (p.life >= p.maxLife) continue
        
        // True mist physics: sharp aerodynamic drag horizontally, heavy gravity vertically
        p.vx *= (1 - 3.5 * dt)
        p.vy += 120 * dt // Aggressive gravity arc pulling mist back down into the ocean
        p.x += p.vx * dt
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
      // CRITICAL FIX: Accumulate clamped delta-time. If Next.js blocks the thread for 500ms,
      // the wave will not instantly teleport forward by half a second. It will resume seamlessly.
      timeRef.current += dt
      const time = timeRef.current
      const curPhase = phaseRef.current
      const globalProgress = progressRef.current
      const { r, g, b } = tealRef.current

      const isSurge = curPhase === 'submerge'

      ctx.clearRect(0, 0, w, h)

      const step = 4 // match HeroAurora's rope step (line 151)
      const ptCount = Math.ceil(w / step) + 1

      // Ambient drift — smooth sinusoidal sway during transition
      const driftBase = Math.sin(time * 0.15) * 8
      // Use eased progress so drift intensifies/fades naturally
      const easedSurge = 0.5 - 0.5 * Math.cos(globalProgress * Math.PI)
      const easedProgress = isSurge
        ? easedSurge
        : curPhase === 'emerge'
          ? 0.5 + 0.5 * Math.cos(globalProgress * Math.PI)
          : 1.0
      const driftTransition = Math.sin(time * 0.5) * 10 * easedProgress
      const drift = driftBase + driftTransition

      // Coverage range
      const startY = h + 60
      const endY = h * (1 - MAX_COVERAGE) - 30

      for (let li = 0; li < WAVE_LAYERS.length; li++) {
        const layer = WAVE_LAYERS[li]
        const edgeYs = new Float32Array(ptCount)

        // CRITICAL FIX: To guarantee the wave NEVER stops undulating horizontally,
        // we completely decouple its horizontal phase from the 'progress' state.
        // Ambient time alone drives the wave sideways at a continuous, steady pace.
        // Slower base time multiplier gives the vertical undulation massive, majestic weight (from 18.0 to 9.0)
        const tBase = time * layer.speed * 9.0 + layer.phase

        let hasAnyVisible = false

        for (let i = 0; i < ptCount; i++) {
          const x = i * step
          const xNorm = x / w

          const localCoverage = getLayerCoverage(layer, xNorm, globalProgress, curPhase, time)

          if (localCoverage < 0.003) {
            edgeYs[i] = h + 100
            continue
          }

          hasAnyVisible = true
          const covFrac = localCoverage / MAX_COVERAGE

          // Base Y — how far up this layer has reached at this x
          const baseY = startY - covFrac * (startY - endY) + drift

          // Physicsy Amplitude: Waves gather height as they surge up, peak at the crest,
          // and aggressively flatten out as they retreat like real backwash gravity.
          let dynamicAmp = layer.waveAmplitude
          if (isSurge) {
            // Surges from base up to 1.6x height
            dynamicAmp *= (1.0 + easedSurge * 0.6)
          } else if (curPhase === 'hold') {
            dynamicAmp *= 1.6 // Maintain chaotic peak height
          } else if (curPhase === 'emerge') {
            // Flattens out heavily as it sheets backward
            dynamicAmp *= Math.max(0.3, 1.6 - globalProgress * 1.3)
          }

          // Traveling wave — per-point phase offset makes crests visibly
          // slide across the screen, like real waves rolling onto shore.
          // By linking travel directly to 'time', we guarantee the sideways slide
          // NEVER pauses or freezes, even if Next.js holds the transition at the peak!
          let travelMult = time * 0.15 // Very slow, majestic baseline oceanic drift
          
          if (isSurge) {
            travelMult += easedSurge * 0.4  // Gentle momentum push during crash
          } else if (curPhase === 'hold') {
            travelMult += 0.4  // Maintain exact extra momentum
          } else if (curPhase === 'emerge') {
            // Accelerate as gravity rips it back down into the ocean
            const retreatEase = 0.5 - 0.5 * Math.cos(globalProgress * Math.PI)
            travelMult += 0.4 + retreatEase * 0.8
          }
          
          const travelPhase = travelMult * 2.0 

          const waveY = auroraEdgeY(xNorm, tBase + travelPhase, dynamicAmp)

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
            + 0.3 * Math.sin(tBase * 0.5 + xf * 20)
            + 0.2 * Math.sin(tBase * 0.3 + xf * 35)
          const ro = layer.opacity * ri * (0.7 + 0.3 * Math.sin(tBase * 0.25))

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

        // ── Spray from crests — turbulent sea foam ──
        // Emit during surge, hold, AND emerge to prevent the exit from looking flat/dull
        if (li === 1) {
          const isChurning = (isSurge && globalProgress > 0.3) 
                          || curPhase === 'hold' 
                          || (curPhase === 'emerge' && globalProgress < 0.9)
          
          if (isChurning) {
            // Emits more spray during the aggressive emerge drain for froth
            const sprayCount = curPhase === 'emerge' ? SPRAY_PER_FRAME * 2 : SPRAY_PER_FRAME
            for (let e = 0; e < sprayCount; e++) {
              const ri2 = Math.floor(Math.random() * ptCount)
              if (ri2 > 2 && ri2 < ptCount - 2) {
                const ey = edgeYs[ri2]
                if (ey < h && ey < edgeYs[ri2 - 1] && ey < edgeYs[ri2 + 1]) {
                  const xNorm = (ri2 * step) / w
                  // Spray drifts left during surge, backwards/right during backwash
                  const vxBias = isSurge ? (1 - xNorm) : (curPhase === 'emerge' ? -0.5 : 0)
                  emitSpray(ri2 * step, ey, vxBias)
                }
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
        transition: phase === 'idle' ? 'opacity 0.6s ease, filter 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
      }}>
        {children}
      </div>
    </>
  )
}
