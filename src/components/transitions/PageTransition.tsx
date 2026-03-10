'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useLayoutEffect, useState, useRef, useEffect, useCallback } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * PageTransition — "Tidal Wash"
 *
 * A wave-shaped mask sweeps UP from the bottom (70-75% viewport),
 * consuming the page with an organic double-ripple wave edge.
 * Content blurs at the wave front (the "foam zone").
 * At full tide, only the aurora ocean is visible.
 * The wave retreats downward, revealing the new page with a teal shimmer.
 *
 * Phases:
 *  1. SURGE  (500ms) — wave rises from shoreline to top, aurora to 100%
 *  2. HOLD   (200ms) — pure ocean, one breath
 *  3. RETREAT (600ms) — wave recedes, new content emerges "wet"
 */

// ── SVG wave path generator ──
// Creates an organic bezier curve at a given Y position
// offset shifts the curve's bumps for the undulation effect
function makeWavePath(
  y: number,
  amplitude: number,
  width: number,
  height: number,
  offset: number = 0,
): string {
  // 4 gentle roller crests across the viewport
  const a = amplitude
  const w = width
  const p = offset * 60 // undulation phase shift in px

  return [
    `M -10 ${y}`,
    `C ${w * 0.15 + p} ${y - a * 0.8}, ${w * 0.25 - p * 0.5} ${y + a}, ${w * 0.35} ${y - a * 0.3}`,
    `S ${w * 0.5 + p * 0.7} ${y + a * 0.9}, ${w * 0.65} ${y + a * 0.2}`,
    `S ${w * 0.8 - p * 0.4} ${y - a * 0.7}, ${w + 10} ${y}`,
    `L ${w + 10} ${height + 10}`,
    `L -10 ${height + 10}`,
    `Z`,
  ].join(' ')
}

// ── Wave visual component ──
function TidalWaveOverlay({
  phase,
  progress,
}: {
  phase: 'idle' | 'surge' | 'hold' | 'retreat' | 'shimmer'
  progress: number // 0 → 1 for surge/retreat
}) {
  const [dimensions, setDimensions] = useState({ w: 1440, h: 900 })
  const [time, setTime] = useState(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    setDimensions({ w: window.innerWidth, h: window.innerHeight })
    const onResize = () => setDimensions({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Animate wave undulation
  useEffect(() => {
    if (phase === 'idle') return
    const start = performance.now()
    const tick = (now: number) => {
      setTime((now - start) / 1000)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [phase])

  if (phase === 'idle') return null

  const { w, h } = dimensions
  const shorelineY = h * 0.72 // 72% down — the resting position
  const amplitude = 35 // gentle rollers

  // Compute wave Y based on phase & progress
  let waveY: number
  if (phase === 'surge') {
    // Rise from shoreline to above viewport
    waveY = shorelineY - progress * (shorelineY + amplitude + 50)
  } else if (phase === 'hold') {
    waveY = -amplitude - 50
  } else if (phase === 'retreat') {
    // Return from top back to shoreline
    waveY = -amplitude - 50 + progress * (shorelineY + amplitude + 50)
  } else {
    waveY = shorelineY
  }

  // Undulation offset oscillates with time
  const undulation = Math.sin(time * 3) * 0.4

  // Primary wave
  const primaryPath = makeWavePath(waveY, amplitude, w, h, undulation)
  // Trailing wash — follows ~40px behind, smaller amplitude
  const trailingPath = makeWavePath(waveY + 50, amplitude * 0.6, w, h, -undulation * 0.7)

  // Glow intensity — strongest during surge/retreat
  const glowOpacity = phase === 'hold' ? 0.5 : 0.7

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none" aria-hidden="true">
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        <defs>
          {/* Teal glow filter for the wave edge */}
          <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.24
                      0 0 0 0 0.78
                      0 0 0 0 0.8
                      0 0 0 1.5 0"
            />
          </filter>

          {/* Stronger glow for the primary edge line */}
          <filter id="edge-glow" x="-30%" y="-50%" width="160%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.24
                      0 0 0 0 0.78
                      0 0 0 0 0.8
                      0 0 0 2 0"
            />
          </filter>
        </defs>

        {/* Trailing wash — fainter, behind */}
        <path
          d={trailingPath}
          fill="rgba(15, 80, 82, 0.25)"
          opacity={glowOpacity * 0.5}
        />

        {/* Primary wave body — dark teal fill */}
        <path
          d={primaryPath}
          fill="rgba(10, 10, 15, 0.95)"
        />

        {/* Primary wave — teal glow aura */}
        <path
          d={primaryPath}
          fill="none"
          stroke="rgba(60, 200, 205, 0.15)"
          strokeWidth="80"
          filter="url(#wave-glow)"
          opacity={glowOpacity}
        />

        {/* Primary wave edge line — bright teal */}
        <path
          d={makeWavePath(waveY, amplitude, w, h, undulation)}
          fill="none"
          stroke="rgba(60, 200, 205, 0.4)"
          strokeWidth="2"
          filter="url(#edge-glow)"
        />

        {/* Second edge line — slightly offset for depth */}
        <path
          d={makeWavePath(waveY + 3, amplitude * 0.95, w, h, undulation * 1.1)}
          fill="none"
          stroke="rgba(60, 200, 205, 0.2)"
          strokeWidth="1"
        />

        {/* Trailing wash edge line */}
        <path
          d={makeWavePath(waveY + 50, amplitude * 0.6, w, h, -undulation * 0.7)}
          fill="none"
          stroke="rgba(60, 200, 205, 0.12)"
          strokeWidth="1.5"
          filter="url(#edge-glow)"
          opacity={glowOpacity * 0.6}
        />
      </svg>
    </div>
  )
}

// ── Teal shimmer overlay ("wet sand" effect) ──
function WetSandShimmer({ active }: { active: boolean }) {
  if (!active) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9997] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-hidden="true"
    >
      {/* Subtle teal tint */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(60, 200, 205, 0.03)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(60, 200, 205, 0.05) 50%, transparent 60%)',
        }}
      />
    </motion.div>
  )
}

// ── Main component ──
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [phase, setPhase] = useState<'idle' | 'surge' | 'hold' | 'retreat' | 'shimmer'>('idle')
  const [waveProgress, setWaveProgress] = useState(0)
  const previousPathname = useRef(pathname)
  const isNavigating = useRef(false)
  const animRef = useRef<number>()

  // Animate wave progress (0→1) over a given duration
  const animateProgress = useCallback((durationMs: number, onComplete: () => void) => {
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / durationMs, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setWaveProgress(eased)
      if (t < 1) {
        animRef.current = requestAnimationFrame(tick)
      } else {
        onComplete()
      }
    }
    animRef.current = requestAnimationFrame(tick)
  }, [])

  useLayoutEffect(() => {
    if (pathname !== previousPathname.current && !isNavigating.current) {
      isNavigating.current = true
      previousPathname.current = pathname

      // Stop Lenis during transition
      const lenis = (window as any).__lenis
      if (lenis) lenis.stop()

      // Dispatch event to signal FixedBackground to surge aurora
      window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'surge' } }))

      // Phase 1: SURGE — wave rises
      setPhase('surge')
      setWaveProgress(0)
      animateProgress(500, () => {
        // Scroll to top while covered by wave
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })

        // Phase 2: HOLD
        setPhase('hold')
        window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'hold' } }))

        setTimeout(() => {
          // Phase 3: RETREAT — wave recedes
          setPhase('retreat')
          setWaveProgress(0)
          window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'retreat' } }))

          animateProgress(600, () => {
            // Phase 4: SHIMMER — wet sand effect
            setPhase('shimmer')
            window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'idle' } }))

            setTimeout(() => {
              setPhase('idle')
              isNavigating.current = false
              if (lenis) lenis.start()
            }, 500)
          })
        }, 200) // hold duration
      })

      return () => {
        if (animRef.current) cancelAnimationFrame(animRef.current)
      }
    }
  }, [pathname, animateProgress])

  // Content blur based on phase
  const getContentStyle = () => {
    switch (phase) {
      case 'surge':
        return {
          filter: `blur(${waveProgress * 20}px)`,
          opacity: 1 - waveProgress * 0.6,
          transform: `translateY(${waveProgress * 15}px) scale(${1 - waveProgress * 0.02})`,
        }
      case 'hold':
        return {
          filter: 'blur(20px)',
          opacity: 0.4,
          transform: 'translateY(15px) scale(0.98)',
        }
      case 'retreat':
        return {
          filter: `blur(${(1 - waveProgress) * 20}px)`,
          opacity: 0.4 + waveProgress * 0.6,
          transform: `translateY(${(1 - waveProgress) * 15}px) scale(${0.98 + waveProgress * 0.02})`,
        }
      default:
        return {
          filter: 'blur(0px)',
          opacity: 1,
          transform: 'translateY(0px) scale(1)',
        }
    }
  }

  return (
    <>
      {/* Tidal wave overlay */}
      <TidalWaveOverlay phase={phase} progress={waveProgress} />

      {/* Wet sand shimmer */}
      <AnimatePresence>
        {phase === 'shimmer' && <WetSandShimmer active={true} />}
      </AnimatePresence>

      {/* Page content — blur/drift synchronized with wave */}
      <div
        style={{
          ...getContentStyle(),
          willChange: phase !== 'idle' ? 'transform, opacity, filter' : 'auto',
          transition: phase === 'idle' ? 'filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease' : 'none',
        }}
      >
        {children}
      </div>
    </>
  )
}
