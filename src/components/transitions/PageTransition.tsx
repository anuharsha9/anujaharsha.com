'use client'

import { ReactNode, useMemo } from 'react'
import { useTransition } from './TransitionContext'

interface PageTransitionProps { children: ReactNode }

/**
 * PageTransition — "Tidal Wash"
 *
 * A wave-shaped overlay rises from the aurora (bottom), sweeping content away
 * like ocean washing over sand. Uses backdrop-filter for the blur-foam zone
 * at the wave edge, and the aurora's own teal tint for the ocean body.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const { phase, progress } = useTransition()

  // Wave Y position (percentage from top of viewport)
  // Surge: 100% (off-screen bottom) → -5% (above viewport)
  // Retreat: -5% → 100% (recedes back down)
  const waveY = useMemo(() => {
    if (phase === 'submerge') return 100 - progress * 105
    if (phase === 'hold') return -5
    if (phase === 'emerge') return -5 + progress * 105
    return 105
  }, [phase, progress])

  const isActive = phase !== 'idle'

  // Generate organic wave curve for clip-path (percentage-based)
  const clipPath = useMemo(() => {
    // Wave curve with gentle undulation at the top edge
    // Using polygon with enough points to approximate a wave
    const points: string[] = []
    const segments = 20
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 100
      // Two gentle humps creating an organic wave shape
      const wave = Math.sin((i / segments) * Math.PI * 2) * 2.5
        + Math.sin((i / segments) * Math.PI * 3.5 + 0.5) * 1.5
      const y = waveY + wave
      points.push(`${x}% ${y}%`)
    }
    // Close the polygon at the bottom
    points.push('100% 100%')
    points.push('0% 100%')
    return `polygon(${points.join(', ')})`
  }, [waveY])

  // Content gets subtle fade during wave passage, not full blur
  const contentOpacity = phase === 'hold' ? 0.15
    : phase === 'submerge' ? Math.max(0.15, 1 - progress * 0.4)
    : phase === 'emerge' ? Math.min(1, 0.6 + progress * 0.4)
    : 1

  return (
    <>
      {/* Wave overlay — the ocean sweeping over the sand */}
      {isActive && (
        <div
          className="fixed inset-0 z-[9998] pointer-events-none"
          aria-hidden="true"
          style={{
            clipPath,
            WebkitClipPath: clipPath,
            willChange: 'clip-path',
          }}
        >
          {/* Ocean body — teal-tinted glass that lets aurora glow through */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(15, 60, 65, 0.55) 0%, rgba(10, 30, 35, 0.75) 30%, rgba(8, 12, 18, 0.92) 100%)',
              backdropFilter: 'blur(24px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
            }}
          />

          {/* Wave edge glow — teal luminance at the leading edge */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: 0,
              height: '4px',
              background: 'linear-gradient(90deg, transparent 5%, rgba(60, 200, 205, 0.4) 25%, rgba(60, 200, 205, 0.6) 50%, rgba(60, 200, 205, 0.4) 75%, transparent 95%)',
              boxShadow: '0 0 30px 8px rgba(60, 200, 205, 0.15), 0 0 60px 15px rgba(60, 200, 205, 0.08)',
              filter: 'blur(1px)',
            }}
          />

          {/* Secondary foam line — trailing wash */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: '40px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 10%, rgba(60, 200, 205, 0.15) 30%, rgba(60, 200, 205, 0.25) 50%, rgba(60, 200, 205, 0.15) 70%, transparent 90%)',
              boxShadow: '0 0 20px 4px rgba(60, 200, 205, 0.06)',
              opacity: 0.7,
            }}
          />
        </div>
      )}

      {/* Wet sand shimmer — teal flash when new content emerges */}
      {phase === 'emerge' && progress > 0.3 && progress < 0.9 && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'rgba(60, 200, 205, 0.025)',
            mixBlendMode: 'screen',
            opacity: Math.sin((progress - 0.3) / 0.6 * Math.PI),
          }}
        />
      )}

      {/* Content with subtle opacity during wave passage */}
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
