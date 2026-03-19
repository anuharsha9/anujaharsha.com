'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

/**
 * Page transition: Cinematic slow-born reveal.
 *
 * On initial load (/), skips the transition so the loading screen →
 * hero entrance is the ONLY entrance animation — no stacking.
 *
 * On navigation between pages, content gently fades up from below
 * with a subtle scale shift. Uses ONLY GPU-compositable properties
 * (opacity, transform) to avoid paint-per-frame jank.
 */

const cinematicEase = [0.05, 0.7, 0.1, 1] as const

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isInitialLoad = useRef(true)

    // On the very first render (initial page load), skip the template
    // transition — the loading screen + hero entrance handle it.
    // After that, every route change gets the cinematic reveal.
    if (isInitialLoad.current) {
        isInitialLoad.current = false
        return (
            <div className="min-h-screen w-full relative">
                {children}
            </div>
        )
    }

    return (
        <motion.div
            className="min-h-screen w-full relative"
            initial={{
                opacity: 0,
                y: 12,
                scale: 1.008,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 1.4,
                delay: 0.05,
                ease: cinematicEase,
            }}
            style={{ willChange: 'opacity, transform' }}
        >
            {children}
        </motion.div>
    )
}
