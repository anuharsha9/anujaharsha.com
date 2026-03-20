'use client'

/**
 * FixedBackground — The universal ocean.
 *
 * Aurora intensity & position is context-aware:
 * - Landing hero:         full viewport, full intensity
 *   → On initial load, aurora enters with a blur-to-focus animation
 *     (~2.5s), as if the waves are forming from deep water.
 * - Landing after hero:   full viewport, dims to 35%
 * - Other pages (case studies, /me):
 *     Soft gradient mask — aurora fades in from ~15% viewport height,
 *     fully visible from ~35% down. Resting opacity 55% so waves are
 *     clearly felt as backdrop behind content.
 * - During transitions:   full viewport, surges to 100%
 */

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const HeroAurora = dynamic(() => import('@/components/home/HeroAurora'), { ssr: false })

const DIMMED_LANDING = 0.70   // Landing page scrolled past hero — waves clearly visible behind content
const DIMMED_OTHER = 0.55     // Case studies / other pages — visible enough to feel
const FULL = 1

export default function FixedBackground() {
  const pathname = usePathname()
  const isLanding = pathname === '/'
  const restingOpacity = isLanding ? FULL : DIMMED_OTHER
  const [opacity, setOpacity] = useState(restingOpacity)
  const [transitioning, setTransitioning] = useState(false)
  const scrollRef = useRef(restingOpacity)

  // ── Intro blur-to-focus: waves "forming" on landing page ──
  // Starts at 20px blur, sharpens to 0 over 2.5s
  const [introBlur, setIntroBlur] = useState(isLanding ? 20 : 0)
  const introStarted = useRef(false)

  useEffect(() => {
    if (!isLanding || introStarted.current) return
    introStarted.current = true

    // Small delay so the canvas has time to render its first frames
    const t1 = setTimeout(() => setIntroBlur(0), 100)

    return () => clearTimeout(t1)
  }, [isLanding])

  // Wave transition events
  useEffect(() => {
    const handler = (e: Event) => {
      const { phase } = (e as CustomEvent).detail
      if (phase === 'surge' || phase === 'hold') {
        setTransitioning(true)
        setOpacity(FULL)
      } else {
        setTransitioning(false)
        setOpacity(scrollRef.current)
      }
    }
    window.addEventListener('wave-transition', handler)
    return () => window.removeEventListener('wave-transition', handler)
  }, [])

  // Scroll-based dimming — ref-tracked to avoid re-renders on every scroll tick
  const lastOpacityRef = useRef(restingOpacity)
  useEffect(() => {
    if (transitioning) return
    if (!isLanding) {
      scrollRef.current = DIMMED_OTHER
      if (lastOpacityRef.current !== DIMMED_OTHER) {
        lastOpacityRef.current = DIMMED_OTHER
        setOpacity(DIMMED_OTHER)
      }
      return
    }
    const onScroll = () => {
      if (transitioning) return
      const y = window.scrollY, vh = window.innerHeight
      const s = vh * 0.8, e = vh * 1.2
      const o = y <= s ? FULL : y >= e ? DIMMED_LANDING : FULL - ((y - s) / (e - s)) * (FULL - DIMMED_LANDING)
      scrollRef.current = o
      // Only trigger re-render when opacity visually changes (2dp precision)
      const rounded = Math.round(o * 100) / 100
      if (rounded !== lastOpacityRef.current) {
        lastOpacityRef.current = rounded
        setOpacity(rounded)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isLanding, transitioning])

  // Aurora visible everywhere on landing or during transition;
  // On other pages: soft gradient mask — aurora fades in from top, fully present by ~35%
  const showFull = transitioning || isLanding

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[var(--bg-cinematic)]" />
      <div
        className="absolute inset-0"
        style={{
          opacity,
          filter: introBlur > 0 ? `blur(${introBlur}px)` : 'none',
          willChange: introBlur > 0 ? 'opacity, filter' : 'opacity',
          transition: introBlur > 0
            ? 'filter 2.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-in'
            : transitioning
              ? 'opacity 0.3s ease-in'
              : isLanding
                ? 'filter 2.5s cubic-bezier(0.16, 1, 0.3, 1)'
                : 'opacity 0.7s ease',
          maskImage: showFull
            ? 'none'
            : 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.7) 30%, black 45%, black 100%)',
          WebkitMaskImage: showFull
            ? 'none'
            : 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.7) 30%, black 45%, black 100%)',
        }}
      >
        <HeroAurora />
      </div>
    </div>
  )
}
