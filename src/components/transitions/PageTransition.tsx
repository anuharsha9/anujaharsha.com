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
  startBaseY: number
  peakBaseY: number
  // Transition timing
  surgeLead: number
  retreatLead: number
  sweepAngle: number
  colorRgb?: { r: number, g: number, b: number }
}

const WAVE_LAYERS: WaveLayer[] = [
  // Deep background curtain — massive, slow wave (Cyan)
  {
    opacity: 0.12, rayLength: 250, rayWidth: 25,
    waveAmplitude: 70, speed: 0.02, phase: 1.0,
    startBaseY: 1.35, peakBaseY: 0.45,
    surgeLead: 0.4, retreatLead: 0.0, sweepAngle: 0.15,
    colorRgb: { r: 6, g: 182, b: 212 }
  },
  // Main curtain — brightest (Deep Teal)
  {
    opacity: 0.25, rayLength: 220, rayWidth: 18,
    waveAmplitude: 60, speed: 0.04, phase: 0,
    startBaseY: 1.18, peakBaseY: 0.28,
    surgeLead: 0.15, retreatLead: 0.25, sweepAngle: 0.15,
    colorRgb: { r: 7, g: 139, b: 156 }
  },
  // Upper accent curtain — slower (Emerald)
  {
    opacity: 0.18, rayLength: 180, rayWidth: 20,
    waveAmplitude: 50, speed: 0.03, phase: 2.0,
    startBaseY: 1.10, peakBaseY: 0.20,
    surgeLead: 0.0, retreatLead: 0.5, sweepAngle: 0.15,
    colorRgb: { r: 16, g: 185, b: 129 }
  },
  // Lower curtain — hypnotic mix (Sea Green)
  {
    opacity: 0.15, rayLength: 150, rayWidth: 18,
    waveAmplitude: 45, speed: 0.05, phase: 4.0,
    startBaseY: 1.28, peakBaseY: 0.38,
    surgeLead: 0.1, retreatLead: 0.1, sweepAngle: 0.15,
    colorRgb: { r: 5, g: 150, b: 105 }
  },
]

const MAX_SPRAY = 120
const SPRAY_PER_FRAME = 6

export default function PageTransition({ children }: PageTransitionProps) {
  const { phase } = useTransition()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const tealRef = useRef({ r: 7, g: 139, b: 156 })
  const sizeRef = useRef({ w: 0, h: 0 })
  const rafRef = useRef(0)
  const startTimeRef = useRef(0)
  const phaseRef = useRef<string>('idle')
  const progressRef = useRef(0)
  const rawProgressRef = useRef(0)
  const sprayRef = useRef<SprayParticle[]>([])
  const prevTimeRef = useRef(0)
  const timeRef = useRef(0)
  const layerPhasesRef = useRef<number[]>([0, 0, 0, 0])

  const isActive = phase !== 'idle'
  const MAX_COVERAGE = 0.80

  phaseRef.current = phase

  useEffect(() => {
    const handleProgress = (e: CustomEvent<number | { progress: number; raw: number }>) => {
      if (typeof e.detail === 'number') {
        progressRef.current = e.detail
        rawProgressRef.current = e.detail
      } else if (e.detail && typeof e.detail === 'object') {
        progressRef.current = e.detail.progress
        rawProgressRef.current = e.detail.raw
      }
    }
    const handleTransition = (e: CustomEvent<{ phase: string }>) => {
      if (e.detail && typeof e.detail.phase === 'string') {
        phaseRef.current = e.detail.phase
      }
    }
    window.addEventListener('wave-progress', handleProgress as EventListener)
    window.addEventListener('wave-transition', handleTransition as EventListener)
    return () => {
      window.removeEventListener('wave-progress', handleProgress as EventListener)
      window.removeEventListener('wave-transition', handleTransition as EventListener)
    }
  }, [])

  useEffect(() => {
    if (!isActive) {
      sprayRef.current = []
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const contentEl = contentRef.current

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
    layerPhasesRef.current = WAVE_LAYERS.map(l => l.phase)

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
     * getLayerProgress: computes the eased, staggered column-by-column progress for each layer.
     */
    const getLayerProgress = (
      layer: WaveLayer, xNorm: number,
      rawProgress: number, curPhase: string
    ): number => {
      if (curPhase === 'idle') return 0
      if (curPhase === 'hold') return 1.0

      const sweepAngle = layer.sweepAngle
      const xOffset = xNorm * sweepAngle

      if (curPhase === 'submerge') {
        const surgeLead = layer.surgeLead
        const divisor = 1.0 + surgeLead - sweepAngle
        const p = (rawProgress + surgeLead - xOffset) / divisor
        const clamped = Math.max(0, Math.min(1, p))
        // easeInOutCubic for organic swell
        return clamped < 0.5 ? 4 * clamped * clamped * clamped : 1 - Math.pow(-2 * clamped + 2, 3) / 2
      }

      if (curPhase === 'emerge') {
        const retreatLead = layer.retreatLead
        const divisor = 1.0 + retreatLead - sweepAngle
        const p = ((1 - rawProgress) * (1.0 + retreatLead) - xOffset) / divisor
        const clamped = Math.max(0, Math.min(1, p))
        // easeOutCubic for smooth retreat deceleration back into the ocean
        return 1 - Math.pow(1 - clamped, 3)
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
        vx: Math.cos(angle) * speed + vxBias * 50,
        vy: Math.sin(angle) * speed - 80, // Harder initial vertical jet
        opacity: 0.3 + Math.random() * 0.5, // Richer mist
        size: 2 + Math.random() * 5, // Thicker water droplets
        life: 0, maxLife: 0.8 + Math.random() * 1.5,
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
      
      timeRef.current += dt
      const time = timeRef.current
      const curPhase = phaseRef.current
      const globalRaw = rawProgressRef.current
      const { r, g, b } = tealRef.current

      const isSurge = curPhase === 'submerge'

      // Update DOM directly for content container to prevent React render lag
      if (contentRef.current && curPhase !== 'idle') {
        const easeInOutSine = (t: number) => -(Math.cos(Math.PI * Math.max(0, Math.min(1, t))) - 1) / 2
        
        let opacity = 1
        let translateY = 0
        
        if (curPhase === 'submerge') {
          // Content fades out and moves down over the first 70% of the surge
          const contentProgress = Math.min(1, globalRaw / 0.7)
          const easedContent = easeInOutSine(contentProgress)
          opacity = Math.max(0, 1 - easedContent)
          translateY = easedContent * 40
        } else if (curPhase === 'hold') {
          opacity = 0
          translateY = 40
        } else if (curPhase === 'emerge') {
          // Content fades in and moves up over the emerge duration
          const easedContent = easeInOutSine(globalRaw)
          opacity = easedContent
          translateY = (1 - easedContent) * 40
        }
        
        contentRef.current.style.opacity = opacity.toString()
        contentRef.current.style.transform = `translateY(${translateY}px)`
        contentRef.current.style.willChange = 'opacity, transform'
        contentRef.current.style.transition = 'none'
      }

      ctx.clearRect(0, 0, w, h)

      const step = 4 // match HeroAurora's rope step
      const ptCount = Math.ceil(w / step) + 1

      // Ambient drift — smooth sinusoidal sway during transition
      const driftBase = Math.sin(time * 0.15) * 8
      // Use eased progress so drift intensifies/fades naturally
      const easedSurge = 0.5 - 0.5 * Math.cos(globalRaw * Math.PI)
      const easedProgress = isSurge
        ? easedSurge
        : curPhase === 'emerge'
          ? 0.5 + 0.5 * Math.cos(globalRaw * Math.PI)
          : 1.0
      const driftTransition = Math.sin(time * 0.5) * 10 * easedProgress
      const drift = driftBase + driftTransition

      // 1. Precompute edgeYs and layer-specific metrics
      const allEdgeYs = WAVE_LAYERS.map(() => new Float32Array(ptCount))
      let hasAnyVisible = false

      for (let li = 0; li < WAVE_LAYERS.length; li++) {
        const layer = WAVE_LAYERS[li]
        
        // Calculate speedMultiplier per layer using the center progress to prevent backward flow
        const centerLp = getLayerProgress(layer, 0.5, globalRaw, curPhase)
        const speedMultiplier = 1 + (1 - centerLp) * 1.5

        // Accumulate phase to avoid integration math traps (backward waves)
        layerPhasesRef.current[li] += dt * layer.speed * speedMultiplier

        for (let i = 0; i < ptCount; i++) {
          const x = i * step
          const xNorm = x / w
          const lp = getLayerProgress(layer, xNorm, globalRaw, curPhase)

          // If the layer is not active yet/anymore, put it below screen
          if (lp <= 0) {
            allEdgeYs[li][i] = h + 100
            continue
          }

          hasAnyVisible = true
          
          // Spaced-out vertical transition exactly matching HeroAurora curtains spacing:
          // baseY interpolates between startBaseY and peakBaseY
          const baseY = (layer.startBaseY - (layer.startBaseY - layer.peakBaseY) * lp) * h + drift
          
          // Amplitude builds up organically from zero
          const effectiveAmp = layer.waveAmplitude * lp
          
          // Wave undulation offset
          const waveY = auroraEdgeY(xNorm, layerPhasesRef.current[li], effectiveAmp)
          allEdgeYs[li][i] = baseY + waveY
        }
      }

      if (hasAnyVisible) {
        // 2. Compute composite "highest" wave edge at each point (closest to top, i.e., min Y)
        const compositeEdgeYs = new Float32Array(ptCount)
        for (let i = 0; i < ptCount; i++) {
          let minY = h + 100
          for (let li = 0; li < WAVE_LAYERS.length; li++) {
            if (allEdgeYs[li][i] < minY) {
              minY = allEdgeYs[li][i]
            }
          }
          compositeEdgeYs[i] = minY
        }

        // 3. Draw solid dark fill under the composite edge
        ctx.beginPath()
        ctx.moveTo(-10, h + 10)
        ctx.lineTo(w + 10, h + 10)
        ctx.lineTo(w + 10, compositeEdgeYs[ptCount - 1])
        for (let i = ptCount - 1; i > 0; i--) {
          const x1 = i * step, x0 = (i - 1) * step
          const midX = (x1 + x0) / 2
          ctx.quadraticCurveTo(x1, compositeEdgeYs[i], midX, (compositeEdgeYs[i] + compositeEdgeYs[i - 1]) / 2)
        }
        ctx.lineTo(-10, compositeEdgeYs[0])
        ctx.lineTo(-10, h + 10)
        ctx.closePath()

        // Peak endY for the solid fill is determined by the highest possible peak (0.20 * h)
        const endY = 0.20 * h
        const fillGrad = ctx.createLinearGradient(0, h, 0, endY - 50)
        fillGrad.addColorStop(0, 'rgba(1, 2, 4, 1)')
        fillGrad.addColorStop(0.6, 'rgba(1, 2, 4, 0.98)')
        fillGrad.addColorStop(1, 'rgba(1, 2, 4, 0.92)')
        ctx.fillStyle = fillGrad
        ctx.fill()

        // 4. Draw overlapping layers with globalCompositeOperation = 'lighter'
        ctx.globalCompositeOperation = 'lighter'

        for (let li = 0; li < WAVE_LAYERS.length; li++) {
          const layer = WAVE_LAYERS[li]
          const lr = layer.colorRgb ? layer.colorRgb.r : r
          const lg = layer.colorRgb ? layer.colorRgb.g : g
          const lb = layer.colorRgb ? layer.colorRgb.b : b
          const edgeYs = allEdgeYs[li]
          
          const centerLp = getLayerProgress(layer, 0.5, globalRaw, curPhase)
          const centerAmp = layer.waveAmplitude * centerLp
          
          // Calculate center opacity and center Y for rope/glow strokes
          let centerOpacityScale = centerLp
          if (curPhase === 'submerge' && centerLp > 0.3 && centerLp < 0.8) {
            const pulseT = (centerLp - 0.3) / 0.5
            const pulse = Math.sin(pulseT * Math.PI)
            centerOpacityScale = centerLp + pulse * 0.4 * centerLp
          }

          // ── Vertical rays hanging from edge — SAME style as HeroAurora ──
          const stepX = 12
          const rayDrawWidth = 80 // wide rays for volumetric overlap
          for (let x = 0; x < w; x += stepX) {
            const idx = x / step
            const i0 = Math.floor(idx)
            const fr = idx - i0
            const ey = i0 < ptCount - 1
              ? edgeYs[i0] * (1 - fr) + edgeYs[i0 + 1] * fr
              : edgeYs[ptCount - 1]
            if (ey > h + 50) continue

            const xf = x / w
            const lp = getLayerProgress(layer, xf, globalRaw, curPhase)
            
            // Local ray parameters to make curtains flash and sweep dynamically
            let localOpacityScale = lp
            if (curPhase === 'submerge' && lp > 0.3 && lp < 0.8) {
              const pulseT = (lp - 0.3) / 0.5
              const pulse = Math.sin(pulseT * Math.PI)
              localOpacityScale = lp + pulse * 0.4 * lp
            }

            const ri = 0.5
              + 0.3 * Math.sin(layerPhasesRef.current[li] * 0.5 + xf * 20)
              + 0.2 * Math.sin(layerPhasesRef.current[li] * 0.3 + xf * 35)
            
            const ro = layer.opacity * ri * localOpacityScale * (0.7 + 0.3 * Math.sin(layerPhasesRef.current[li] * 0.25))

            const overlapFactor = rayDrawWidth / stepX
            const adjustedOpacity = ro / (overlapFactor * 0.6)

            // Ray length scales with progress
            const localRayLengthScale = 0.3 + 0.7 * lp
            const effectiveRayLen = layer.rayLength * localRayLengthScale

            const g2 = ctx.createLinearGradient(0, ey - 15, 0, ey + effectiveRayLen)
            g2.addColorStop(0, `rgba(${lr},${lg},${lb},0)`)
            g2.addColorStop(0.05, `rgba(${lr},${lg},${lb},${adjustedOpacity * 0.5})`)
            g2.addColorStop(0.1, `rgba(${lr},${lg},${lb},${adjustedOpacity})`)
            g2.addColorStop(0.2, `rgba(${lr},${lg},${lb},${adjustedOpacity * 0.7})`)
            g2.addColorStop(0.5, `rgba(${lr},${lg},${lb},${adjustedOpacity * 0.3})`)
            g2.addColorStop(1, `rgba(${lr},${lg},${lb},0)`)
            ctx.fillStyle = g2
            ctx.fillRect(x - rayDrawWidth / 2, ey - 15, rayDrawWidth, effectiveRayLen + 15)
          }
          
          // Massive soft ambient glow to the entire curtain edge (modulated by effectiveAmp and opacityScale)
          const centerBaseY = (layer.startBaseY - (layer.startBaseY - layer.peakBaseY) * centerLp) * h + drift
          const ambientGrad = ctx.createLinearGradient(0, centerBaseY - centerAmp * 2, 0, h)
          ambientGrad.addColorStop(0, `rgba(${lr}, ${lg}, ${lb}, ${layer.opacity * centerOpacityScale * 0.2})`)
          ambientGrad.addColorStop(1, `rgba(${lr}, ${lg}, ${lb}, 0)`)
          ctx.fillStyle = ambientGrad
          
          ctx.beginPath()
          ctx.moveTo(0, h + 50)
          for (let i = 0; i < ptCount; i++) {
            ctx.lineTo(i * step, edgeYs[i])
          }
          ctx.lineTo(w, h + 50)
          ctx.closePath()
          ctx.fill()

          // ── Glowing rope edge — SAME double-stroke as HeroAurora ──
          ctx.beginPath()
          ctx.moveTo(0, edgeYs[0])
          for (let i = 1; i < ptCount; i++) {
            ctx.lineTo(i * step, edgeYs[i])
          }

          // Outer glow — wider, dimmer
          ctx.strokeStyle = `rgba(${lr},${lg},${lb},${layer.opacity * centerOpacityScale * 0.5})`
          ctx.lineWidth = 5
          ctx.stroke()
          // Inner bright line
          ctx.strokeStyle = `rgba(${lr},${lg},${lb},${layer.opacity * centerOpacityScale * 1.5})`
          ctx.lineWidth = 1.5
          ctx.stroke()

          // ── Spray from crests — turbulent sea foam ──
          if (li === 1) {
            const isChurning = (isSurge && globalRaw > 0.3) 
                            || curPhase === 'hold' 
                            || (curPhase === 'emerge' && globalRaw < 0.9)
            
            if (isChurning) {
              const sprayCount = curPhase === 'emerge' ? SPRAY_PER_FRAME * 2 : SPRAY_PER_FRAME
              for (let e = 0; e < sprayCount; e++) {
                const ri2 = Math.floor(Math.random() * ptCount)
                if (ri2 > 2 && ri2 < ptCount - 2) {
                  const ey = edgeYs[ri2]
                  if (ey < h && ey < edgeYs[ri2 - 1] && ey < edgeYs[ri2 + 1]) {
                    const xNorm = (ri2 * step) / w
                    const vxBias = isSurge ? (1 - xNorm) : (curPhase === 'emerge' ? -0.5 : 0)
                    emitSpray(ri2 * step, ey, vxBias)
                  }
                }
              }
            }
          }
        }

        ctx.globalCompositeOperation = 'source-over'
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
      if (contentEl) {
        contentEl.style.opacity = ''
        contentEl.style.transform = ''
        contentEl.style.willChange = ''
        contentEl.style.transition = ''
      }
    }
  }, [isActive])

  return (
    <>
      {isActive && (
        <canvas ref={canvasRef} className="fixed inset-0 z-[9997] pointer-events-none"
          style={{ width: '100vw', height: '100dvh' }} aria-hidden="true" />
      )}
      <div 
        ref={contentRef}
        style={phase === 'idle' ? {
          opacity: 1,
          transform: 'translateY(0px)',
          willChange: 'auto'
        } : undefined}
      >
        {children}
      </div>
    </>
  )
}
