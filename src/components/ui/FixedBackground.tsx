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
 */

import { useEffect, useState } from 'react'
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

    useEffect(() => {
        if (!isLanding) {
            setOpacity(DIMMED_OPACITY)
            return
        }

        // On landing page: dim aurora once user scrolls past the hero
        // Hero is 135vh — start dimming at 80vh, fully dim by 120vh
        const handleScroll = () => {
            const scrollY = window.scrollY
            const vh = window.innerHeight
            const fadeStart = vh * 0.8
            const fadeEnd = vh * 1.2

            if (scrollY <= fadeStart) {
                setOpacity(FULL_OPACITY)
            } else if (scrollY >= fadeEnd) {
                setOpacity(DIMMED_OPACITY)
            } else {
                // Lerp between full and dimmed
                const t = (scrollY - fadeStart) / (fadeEnd - fadeStart)
                setOpacity(FULL_OPACITY - t * (FULL_OPACITY - DIMMED_OPACITY))
            }
        }

        handleScroll() // Initial check
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isLanding])

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none"
            aria-hidden="true"
        >
            {/* Dark cinematic base */}
            <div className="absolute inset-0 bg-[var(--bg-cinematic)]" />

            {/* Aurora waves — full during hero, dimmed everywhere else */}
            <div
                className="absolute inset-0"
                style={{
                    opacity,
                    willChange: 'opacity',
                    transition: isLanding ? 'none' : 'opacity 0.7s ease',
                }}
            >
                <HeroAurora />
            </div>
        </div>
    )
}
