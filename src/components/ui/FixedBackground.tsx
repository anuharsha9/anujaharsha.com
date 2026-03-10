'use client'

/**
 * FixedBackground — The universal ocean.
 *
 * A single fixed-position layer sized to the viewport (100vw × 100vh).
 * Contains: dark cinematic background + HeroAurora canvas.
 * Sits behind ALL content on every page (rendered from layout.tsx).
 *
 * Aurora intensity is context-aware:
 * - Landing hero (scroll < ~100vh):  full intensity — the aurora IS the hero
 * - Landing after hero:              dims to 35% — content takes focus
 * - All other pages:                 always 35% — a whisper, not a distraction
 * - During page transitions:         surges to 100% — the wave is the ocean
 */

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const HeroAurora = dynamic(
    () => import('@/components/home/HeroAurora'),
    { ssr: false }
)

const DIMMED_OPACITY = 0.35
const FULL_OPACITY = 1

export default function FixedBackground() {
    const pathname = usePathname()
    const isLanding = pathname === '/'
    const [opacity, setOpacity] = useState(isLanding ? FULL_OPACITY : DIMMED_OPACITY)
    const [transitioning, setTransitioning] = useState(false)
    const scrollOpacityRef = useRef(isLanding ? FULL_OPACITY : DIMMED_OPACITY)

    // Listen for wave-transition events from PageTransition
    useEffect(() => {
        const handleWaveTransition = (e: Event) => {
            const { phase } = (e as CustomEvent).detail
            if (phase === 'surge' || phase === 'hold') {
                setTransitioning(true)
                setOpacity(FULL_OPACITY)
            } else {
                setTransitioning(false)
                // Return to scroll-based opacity
                setOpacity(scrollOpacityRef.current)
            }
        }

        window.addEventListener('wave-transition', handleWaveTransition)
        return () => window.removeEventListener('wave-transition', handleWaveTransition)
    }, [])

    useEffect(() => {
        if (transitioning) return // Don't interfere during wave transition

        if (!isLanding) {
            scrollOpacityRef.current = DIMMED_OPACITY
            setOpacity(DIMMED_OPACITY)
            return
        }

        // On landing page: dim aurora once user scrolls past the hero
        const handleScroll = () => {
            if (transitioning) return
            const scrollY = window.scrollY
            const vh = window.innerHeight
            const fadeStart = vh * 0.8
            const fadeEnd = vh * 1.2

            let newOpacity: number
            if (scrollY <= fadeStart) {
                newOpacity = FULL_OPACITY
            } else if (scrollY >= fadeEnd) {
                newOpacity = DIMMED_OPACITY
            } else {
                const t = (scrollY - fadeStart) / (fadeEnd - fadeStart)
                newOpacity = FULL_OPACITY - t * (FULL_OPACITY - DIMMED_OPACITY)
            }

            scrollOpacityRef.current = newOpacity
            setOpacity(newOpacity)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isLanding, transitioning])

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none"
            aria-hidden="true"
        >
            {/* Dark cinematic base */}
            <div className="absolute inset-0 bg-[var(--bg-cinematic)]" />

            {/* Aurora waves — intensity controlled by scroll + wave transitions */}
            <div
                className="absolute inset-0"
                style={{
                    opacity,
                    willChange: 'opacity',
                    transition: transitioning ? 'opacity 0.3s ease-in' : (isLanding ? 'none' : 'opacity 0.7s ease'),
                }}
            >
                <HeroAurora />
            </div>
        </div>
    )
}
