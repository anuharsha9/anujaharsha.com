'use client'

import React, { useRef, useState, useEffect } from 'react'
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
 *
 * Hydration-safe: first client render always matches server HTML (plain div).
 * motion.div only activates after mount + on subsequent navigations.
 */

const cinematicEase = [0.05, 0.7, 0.1, 1] as const

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isInitialLoad = useRef(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Before mount (SSR + first hydration pass) OR on initial page load:
    // render a plain div — no motion styles, no hydration mismatch.
    if (!mounted || isInitialLoad.current) {
        if (mounted) isInitialLoad.current = false
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
