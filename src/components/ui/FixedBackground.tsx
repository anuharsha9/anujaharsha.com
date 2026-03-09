'use client'

/**
 * FixedBackground — The universal ocean.
 *
 * A single fixed-position layer sized to the viewport (100vw × 100vh).
 * Contains: dark cinematic background + HeroAurora canvas.
 * Sits behind ALL content on every page (rendered from layout.tsx).
 *
 * The aurora never moves. Content scrolls over it like scenery passing a boat.
 */

import dynamic from 'next/dynamic'

const HeroAurora = dynamic(
    () => import('@/components/home/HeroAurora'),
    { ssr: false }
)

export default function FixedBackground() {
    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none"
            aria-hidden="true"
        >
            {/* Dark cinematic base */}
            <div className="absolute inset-0 bg-[var(--bg-cinematic)]" />

            {/* Aurora waves — same 3-curtain HeroAurora, viewport-sized */}
            <HeroAurora />
        </div>
    )
}
