'use client'

import { ReactNode, useMemo } from 'react'
import { useTransition } from './TransitionContext'

interface PageTransitionProps { children: ReactNode }

/**
 * PageTransition — "Tidal Wash" (Double Ripple)
 *
 * Design spec (from wave-page-transition.md brainstorm v3):
 *
 *   80-20 Rule:
 *     The wave rises from the BOTTOM and covers ~80% of the viewport.
 *     It does NOT go to 100% — a sliver of dark sky/content remains
 *     at the very top, giving the feeling of depth rather than a screen wipe.
 *
 *   Organic Horizontal Undulation:
 *     The wave edge is an organic bezier curve that WOBBLES horizontally as
 *     the wave rises — the sine control points shift ±px over time, creating
 *     the feeling of living water, not a rigid shape.
 *
 *   Double Ripple:
 *     PRIMARY wave — the main crest. Does the heavy lifting.
 *     TRAILING wash — a softer, smaller wave that follows ~60px behind.
 *     Like the secondary foam after a wave crashes.
 *
 *   Foam Zone:
 *     A blur-gradient band above the wave edge where content dissolves.
 *     40px band: progressive blur (0→30px) + opacity fade.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const { phase, progress } = useTransition()

  const isActive = phase !== 'idle'

  // ── Wave edge Y position (percent from viewport TOP) ──
  // At rest (progress=0): edge is at 100% (off-screen bottom)
  // At peak (progress=1): edge is at 20% (covers bottom 80% = "80-20 rule")
  //
  // So edgeBaseY goes from 100% → 20% during submerge.
  const edgeBaseY = useMemo(() => {
    if (phase === 'submerge') return 100 - progress * 80 // 100 → 20
    if (phase === 'hold') return 20
    if (phase === 'emerge') return 20 + progress * 80   // 20 → 100
    return 100 // idle: off-screen
  }, [phase, progress])

  // ── Wave phase — horizontal travel over time ──
  const horizontalPhase = useMemo(() => {
    if (phase === 'submerge') return progress * Math.PI * 3
    if (phase === 'hold') return Math.PI * 3
    if (phase === 'emerge') return Math.PI * 3 + progress * Math.PI * 2
    return 0
  }, [phase, progress])

  // ── Wave amplitude — bell curve for organic swell ──
  const waveAmplitude = useMemo(() => {
    if (phase === 'submerge') {
      const bell = Math.sin(progress * Math.PI)
      return 1.5 + bell * 3.5  // 1.5 → 5 → 1.5
    }
    if (phase === 'hold') return 1.0
    if (phase === 'emerge') {
      const bell = Math.sin(progress * Math.PI)
      return 1.5 + bell * 3.5
    }
    return 0
  }, [phase, progress])

  // ── Generate wave polygon points ──
  const generateWavePolygon = useMemo(() => {
    return (baseY: number, amp: number, phaseOffset: number, freqOffset: number) => {
      const points: string[] = []
      const segments = 48 // high resolution

      for (let i = 0; i <= segments; i++) {
        const t = i / segments
        const x = t * 100

        // Three layered sine waves for organic feel + horizontal drift
        const wave1 = Math.sin(t * Math.PI * (1.8 + freqOffset) + phaseOffset) * amp
        const wave2 = Math.sin(t * Math.PI * (3.2 + freqOffset) + phaseOffset * 1.3) * (amp * 0.35)
        const wave3 = Math.sin(t * Math.PI * (5.0 + freqOffset) + phaseOffset * 0.7) * (amp * 0.12)

        const y = baseY + wave1 + wave2 + wave3
        points.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`)
      }

      // Close: bottom-right → bottom-left
      points.push('100% 100%')
      points.push('0% 100%')
      return `polygon(${points.join(', ')})`
    }
  }, [])

  // ── PRIMARY wave clip-path ──
  const primaryClipPath = useMemo(() => {
    if (!isActive) return 'none'
    return generateWavePolygon(edgeBaseY, waveAmplitude, horizontalPhase, 0)
  }, [edgeBaseY, waveAmplitude, horizontalPhase, isActive, generateWavePolygon])

  // ── TRAILING wash clip-path — follows behind by ~6% ──
  const trailingClipPath = useMemo(() => {
    if (!isActive) return 'none'
    const trailBaseY = Math.min(100, edgeBaseY + 6) // 6% behind
    const trailAmp = waveAmplitude * 0.55
    return generateWavePolygon(trailBaseY, trailAmp, horizontalPhase * 0.8 + 1.0, 0.3)
  }, [edgeBaseY, waveAmplitude, horizontalPhase, isActive, generateWavePolygon])

  // ── SVG for the crest glow effect — follows the wave edge shape ──
  const svgGlow = useMemo(() => {
    if (!isActive) return null

    const width = 1440
    const height = 900
    const segments = 48
    const pathPoints: string[] = []

    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const x = t * width

      const wave1 = Math.sin(t * Math.PI * 1.8 + horizontalPhase) * waveAmplitude
      const wave2 = Math.sin(t * Math.PI * 3.2 + horizontalPhase * 1.3) * (waveAmplitude * 0.35)
      const wave3 = Math.sin(t * Math.PI * 5.0 + horizontalPhase * 0.7) * (waveAmplitude * 0.12)

      const yPercent = edgeBaseY + wave1 + wave2 + wave3
      const y = (yPercent / 100) * height

      pathPoints.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)
    }

    return pathPoints.join(' ')
  }, [edgeBaseY, waveAmplitude, horizontalPhase, isActive])

  // ── Content effects — blur/opacity/scale as the wave passes ──
  const maxBlur = 12

  const contentBlur = phase === 'submerge'
    ? progress * maxBlur
    : phase === 'hold'
    ? maxBlur
    : phase === 'emerge'
    ? maxBlur * (1 - progress)
    : 0

  const contentOpacity = phase === 'hold' ? 0.15
    : phase === 'submerge' ? 1 - progress * 0.85
    : phase === 'emerge' ? 0.15 + progress * 0.85
    : 1

  const contentScale = phase === 'submerge'
    ? 1 - progress * 0.02
    : phase === 'hold'
    ? 0.98
    : phase === 'emerge'
    ? 0.98 + progress * 0.02
    : 1

  // ── Glow intensity — teal aurora light at the wave crest ──
  const glowOpacity = phase === 'submerge'
    ? 0.2 + progress * 0.5
    : phase === 'hold' ? 0.65
    : phase === 'emerge'
    ? 0.65 * (1 - progress * 0.8)
    : 0

  return (
    <>
      {/* ── TRAILING WASH — secondary foam behind the primary wave ── */}
      {isActive && (
        <div
          className="fixed inset-0 z-[9998] pointer-events-none"
          aria-hidden="true"
          suppressHydrationWarning
          style={{
            clipPath: trailingClipPath,
            WebkitClipPath: trailingClipPath,
            willChange: 'clip-path',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgb(4, 7, 10) 0%, rgb(6, 10, 15) 40%, rgb(8, 14, 22) 100%)',
              opacity: 0.85,
            }}
          />
        </div>
      )}

      {/* ── PRIMARY WAVE — main crest that does the heavy lifting ── */}
      {isActive && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none"
          aria-hidden="true"
          suppressHydrationWarning
          style={{
            clipPath: primaryClipPath,
            WebkitClipPath: primaryClipPath,
            willChange: 'clip-path',
          }}
        >
          {/* Body — opaque dark wash (the mass of the wave) */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgb(5, 8, 12) 0%, rgb(3, 6, 10) 50%, rgb(6, 10, 16) 100%)',
            }}
          />
        </div>
      )}

      {/* ── CREST GLOW — SVG line that follows the wave edge ── */}
      {isActive && svgGlow && (
        <svg
          className="fixed inset-0 z-[10000] pointer-events-none"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          aria-hidden="true"
          suppressHydrationWarning
          style={{ willChange: 'contents' }}
        >
          <defs>
            {/* Glow filter for the crest line */}
            <filter id="crest-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="18" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Wide atmospheric glow — aurora light above the crest */}
          <path
            d={svgGlow}
            fill="none"
            stroke={`rgba(7, 139, 156, ${(glowOpacity * 0.25).toFixed(3)})`}
            strokeWidth="60"
            filter="url(#crest-glow)"
          />

          {/* Medium glow layer */}
          <path
            d={svgGlow}
            fill="none"
            stroke={`rgba(20, 184, 166, ${(glowOpacity * 0.4).toFixed(3)})`}
            strokeWidth="12"
            filter="url(#crest-glow)"
          />

          {/* Sharp crest line — the foam at the leading wave edge */}
          <path
            d={svgGlow}
            fill="none"
            stroke={`rgba(45, 212, 191, ${glowOpacity.toFixed(3)})`}
            strokeWidth="2"
          />
        </svg>
      )}

      {/* Content with blur-to-focus + opacity + subtle scale */}
      <div style={{
        opacity: contentOpacity,
        filter: contentBlur > 0.1 ? `blur(${contentBlur.toFixed(1)}px)` : 'none',
        transform: contentScale < 0.999 ? `scale(${contentScale.toFixed(4)})` : 'none',
        transformOrigin: 'center center',
        willChange: phase !== 'idle' ? 'opacity, filter, transform' : 'auto',
        transition: phase === 'idle' ? 'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease' : 'none',
      }}>
        {children}
      </div>
    </>
  )
}
