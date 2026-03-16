'use client'

import { ReactNode, useMemo } from 'react'
import { useTransition } from './TransitionContext'

interface PageTransitionProps { children: ReactNode }

/**
 * PageTransition — "Tidal Wash"
 *
 * A dark overlay sweeps upward with a curved edge, covering old content
 * before the new page is revealed as the wash recedes.
 *
 * Blur-to-focus / Focus-to-blur:
 *   SUBMERGE: Content progressively blurs — like sinking underwater.
 *   HOLD:     Maximum blur — fully submerged.
 *   EMERGE:   Content sharpens from blur — eyes refocusing after surfacing.
 *
 * The blur is driven by wave progress, not a separate animation,
 * so it feels physically connected to the water motion.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const { phase, progress } = useTransition()

  // Wave Y position (percentage from top of viewport)
  // Surge: starts at 105% (off-screen) → -8% (above viewport)
  // Retreat: -8% → 105% (recedes back down)
  const waveY = useMemo(() => {
    if (phase === 'submerge') return 105 - progress * 113
    if (phase === 'hold') return -8
    if (phase === 'emerge') return -8 + progress * 113
    return 110
  }, [phase, progress])

  const isActive = phase !== 'idle'

  // Gentle organic curve — a single soft crest
  const clipPath = useMemo(() => {
    if (!isActive) return 'none'

    const shift = phase === 'submerge' ? progress * 1.5 : phase === 'emerge' ? (1 - progress) * 1.5 : 0.8
    const points: string[] = []
    const segments = 24

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 100
      const t = i / segments
      const wave = Math.sin(t * Math.PI) * 2.8 * shift
        + Math.sin(t * Math.PI * 2 + shift) * 0.8
      points.push(`${x}% ${waveY + wave}%`)
    }
    points.push('100% 110%')
    points.push('0% 110%')
    return `polygon(${points.join(', ')})`
  }, [waveY, isActive, phase, progress])

  // ── Content blur + opacity ──
  // Submerge: focus → blur (old content dissolves into water)
  // Hold: max blur
  // Emerge: blur → focus (new content materializes)
  const maxBlur = 12 // px — enough to feel submersion, not disorienting

  const contentBlur = phase === 'submerge'
    ? progress * maxBlur                    // 0 → 12px
    : phase === 'hold'
    ? maxBlur                               // 12px
    : phase === 'emerge'
    ? maxBlur * (1 - progress)              // 12px → 0
    : 0

  const contentOpacity = phase === 'hold' ? 0.2
    : phase === 'submerge' ? 1 - progress * 0.8
    : phase === 'emerge' ? 0.2 + progress * 0.8
    : 1

  // Subtle scale — content shrinks slightly during submersion (depth perception)
  const contentScale = phase === 'submerge'
    ? 1 - progress * 0.015                  // 1 → 0.985
    : phase === 'hold'
    ? 0.985
    : phase === 'emerge'
    ? 0.985 + progress * 0.015              // 0.985 → 1
    : 1

  return (
    <>
      {/* Wave overlay — dark wash */}
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
          {/* Ocean body — dark wash, slightly translucent so aurora surges through */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(8, 14, 18, 0.78) 0%, rgba(10, 12, 16, 0.84) 40%, rgba(8, 10, 14, 0.88) 100%)',
              backdropFilter: 'blur(12px) saturate(1.15)',
              WebkitBackdropFilter: 'blur(12px) saturate(1.15)',
            }}
          />

          {/* Feathered leading edge */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: 0,
              height: '60px',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(8, 14, 18, 0.3) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
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
