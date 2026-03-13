'use client'

/**
 * FixedBackground — The universal ocean.
 *
 * Aurora intensity & position is context-aware:
 * - Landing hero:         full viewport, full intensity
 * - Landing after hero:   full viewport, dims to 35%
 * - Other pages at rest:  masked to lower ~40% of viewport, dimmed to 35%
 * - During transitions:   full viewport, surges to 100% (the wave IS the ocean)
 */

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const HeroAurora = dynamic(() => import('@/components/home/HeroAurora'), { ssr: false })

const DIMMED = 0.35
const FULL = 1

export default function FixedBackground() {
  const pathname = usePathname()
  const isLanding = pathname === '/'
  const [opacity, setOpacity] = useState(isLanding ? FULL : DIMMED)
  const [transitioning, setTransitioning] = useState(false)
  const scrollRef = useRef(isLanding ? FULL : DIMMED)

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

  // Scroll-based dimming
  useEffect(() => {
    if (transitioning) return
    if (!isLanding) {
      scrollRef.current = DIMMED
      setOpacity(DIMMED)
      return
    }
    const onScroll = () => {
      if (transitioning) return
      const y = window.scrollY, vh = window.innerHeight
      const s = vh * 0.8, e = vh * 1.2
      const o = y <= s ? FULL : y >= e ? DIMMED : FULL - ((y - s) / (e - s)) * (FULL - DIMMED)
      scrollRef.current = o
      setOpacity(o)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isLanding, transitioning])

  // Aurora visible everywhere on landing or during transition; masked to lower viewport otherwise
  const showFull = transitioning || isLanding

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[var(--bg-cinematic)]" />
      <div
        className="absolute inset-0"
        style={{
          opacity,
          willChange: 'opacity',
          transition: transitioning ? 'opacity 0.3s ease-in' : isLanding ? 'none' : 'opacity 0.7s ease',
          maskImage: showFull
            ? 'none'
            : 'linear-gradient(to bottom, transparent 0%, transparent 50%, black 72%, black 100%)',
          WebkitMaskImage: showFull
            ? 'none'
            : 'linear-gradient(to bottom, transparent 0%, transparent 50%, black 72%, black 100%)',
        }}
      >
        <HeroAurora />
      </div>
    </div>
  )
}
