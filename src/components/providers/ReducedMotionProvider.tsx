'use client'

import { MotionConfig } from 'framer-motion'

/**
 * Wraps the app in Framer Motion's MotionConfig with reducedMotion="user".
 * This makes ALL Framer Motion animations respect the OS-level
 * `prefers-reduced-motion: reduce` setting automatically.
 *
 * Combined with the CSS kill-switch in globals.css, this covers
 * both CSS and JS-driven animations.
 */
export default function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
    return (
        <MotionConfig reducedMotion="user">
            {children}
        </MotionConfig>
    )
}
