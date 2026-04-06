'use client'

/**
 * PerspectiveReveal — Scroll-driven 3D perspective entrance.
 *
 * Creates the "rising card" effect seen on Apple product pages:
 * - Content starts slightly scaled down + tilted in 3D + blurred
 * - As it scrolls into center viewport, it flattens + sharpens + scales to 1.0
 * - Creates depth and dimensionality in the scroll experience
 *
 * Uses scroll-linked values (not whileInView) so it's bidirectional
 * and responds to scroll direction — respecting the "alive page" principle.
 */

import React, { useRef } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useMotionTemplate,
    useReducedMotion,
} from 'framer-motion'

interface PerspectiveRevealProps {
    children: React.ReactNode
    /** Max blur at edges. Default: 8 */
    maxBlur?: number
    /** Scale at edges. Default: 0.92 */
    minScale?: number
    /** rotateX tilt at edges in degrees. Default: 3 */
    tiltDeg?: number
    /** Y offset at edges in px. Default: 40 */
    yOffset?: number
    /** Custom className */
    className?: string
}

export default function PerspectiveReveal({
    children,
    maxBlur = 8,
    minScale = 0.92,
    tiltDeg = 3,
    yOffset = 40,
    className = '',
}: PerspectiveRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()

    // Track element through viewport
    // 0 = element top enters viewport bottom
    // 0.5 = element is centered
    // 1 = element bottom exits viewport top
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    // Blur curve: blurred → sharp → sharp (plateau) → sharp → blurred
    const blur = useTransform(
        scrollYProgress,
        [0, 0.2, 0.35, 0.65, 0.8, 1],
        prefersReducedMotion
            ? [0, 0, 0, 0, 0, 0]
            : [maxBlur, maxBlur * 0.3, 0, 0, maxBlur * 0.3, maxBlur]
    )

    // Scale: small → full → full → small
    const scale = useTransform(
        scrollYProgress,
        [0, 0.25, 0.4, 0.6, 0.75, 1],
        prefersReducedMotion
            ? [1, 1, 1, 1, 1, 1]
            : [minScale, minScale + 0.04, 1, 1, minScale + 0.04, minScale]
    )

    // RotateX: tilted → flat → flat → tilted
    const rotateX = useTransform(
        scrollYProgress,
        [0, 0.25, 0.4, 0.6, 0.75, 1],
        prefersReducedMotion
            ? [0, 0, 0, 0, 0, 0]
            : [tiltDeg, tiltDeg * 0.3, 0, 0, -tiltDeg * 0.3, -tiltDeg]
    )

    // Y offset: shifted down → center → center → shifted up
    const y = useTransform(
        scrollYProgress,
        [0, 0.25, 0.4, 0.6, 0.75, 1],
        prefersReducedMotion
            ? [0, 0, 0, 0, 0, 0]
            : [yOffset, yOffset * 0.3, 0, 0, -yOffset * 0.3, -yOffset]
    )

    const filterStr = useMotionTemplate`blur(${blur}px)`

    return (
        <div
            ref={ref}
            className={className}
            style={{ perspective: '1200px' }}
        >
            <motion.div
                style={{
                    scale,
                    rotateX,
                    y,
                    filter: filterStr,
                    willChange: 'transform, filter',
                    transformOrigin: 'center bottom',
                }}
            >
                {children}
            </motion.div>
        </div>
    )
}
