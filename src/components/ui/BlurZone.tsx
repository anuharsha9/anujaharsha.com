'use client'

/**
 * BlurZone — Scroll-driven blur morph wrapper.
 *
 * Creates the "ocean boat" experience:
 * - Content pins to the viewport (sticky)
 * - As you scroll, content transitions: blurred → sharp → blurred
 * - Content STAYS IN PLACE during the transition — it morphs through blur
 * - Generous focus plateau for reading
 * - Bidirectional — scrolling up reverses everything
 *
 * Structure:
 *   <outer div>  — tall container (containerHeight), creates scroll distance
 *     <sticky div>  — pinned to viewport top, h-screen
 *       <motion.div>  — blur + parallax applied here
 *         {children}  — section content, renders naturally
 *       </motion.div>
 *     </sticky div>
 *   </outer div>
 */

import React, { useRef } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useMotionTemplate,
    useReducedMotion,
} from 'framer-motion'

interface BlurZoneProps {
    children: React.ReactNode
    /** Ghosted watermark content — resolves before main content */
    watermark?: React.ReactNode
    /** Maximum blur in pixels. Default: 40 */
    maxBlur?: number
    /** Outer container height — controls scroll distance for the morph.
     *  Taller = more scroll time in focus. Default: "200vh" */
    containerHeight?: string
    /** Parallax Y travel in px. Default: 20 */
    parallaxOffset?: number
    /** Custom className for the sticky inner content */
    className?: string
    /** Unique ID for the section */
    id?: string
}

export default function BlurZone({
    children,
    watermark,
    maxBlur = 40,
    containerHeight = '200vh',
    parallaxOffset = 20,
    className = '',
    id,
}: BlurZoneProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()

    // Track scroll through the tall outer container
    // 0 = outer container's top reaches viewport bottom
    // 1 = outer container's bottom reaches viewport top
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    })

    // ── Blur curve ──
    // The morph: blurred → sharp → hold → sharp → blurred
    //
    // 0.00       section far below viewport — fully blurred
    // 0.15       section entering viewport — still blurred
    // 0.30       content resolves to sharp
    // 0.30-0.70  FOCUS PLATEAU — content is sharp, user reads
    // 0.70       content starts blurring out
    // 0.85       fully blurred again
    // 1.00       section above viewport — fully blurred
    const contentBlur = useTransform(
        scrollYProgress,
        [0, 0.15, 0.30, 0.70, 0.85, 1],
        prefersReducedMotion
            ? [0, 0, 0, 0, 0, 0]
            : [maxBlur, maxBlur, 0, 0, maxBlur, maxBlur]
    )

    // Watermark resolves faster — starts at 0.10, sharp by 0.22
    const watermarkBlur = useTransform(
        scrollYProgress,
        [0, 0.10, 0.22, 0.70, 0.85, 1],
        prefersReducedMotion
            ? [0, 0, 0, 0, 0, 0]
            : [maxBlur, maxBlur, 0, 0, maxBlur, maxBlur]
    )

    // ── Parallax — gentle float ──
    const contentY = useTransform(
        scrollYProgress,
        [0, 1],
        prefersReducedMotion
            ? [0, 0]
            : [parallaxOffset, -parallaxOffset]
    )

    // Build CSS filter strings
    const contentFilter = useMotionTemplate`blur(${contentBlur}px)`
    const watermarkFilter = useMotionTemplate`blur(${watermarkBlur}px)`

    return (
        <div
            ref={containerRef}
            id={id}
            className="relative w-full"
            style={{ height: containerHeight }}
        >
            {/* Sticky inner — pins content to viewport during scroll */}
            <div className={`sticky top-0 w-full h-screen flex flex-col justify-center ${className}`}>
                {/* Watermark layer — resolves faster than content */}
                {watermark && (
                    <motion.div
                        className="absolute inset-0 z-[1] pointer-events-none"
                        style={{
                            filter: watermarkFilter,
                            willChange: 'filter',
                        }}
                    >
                        {watermark}
                    </motion.div>
                )}

                {/* Main content — blur morph + parallax */}
                <motion.div
                    className="relative z-[2] w-full"
                    style={{
                        filter: contentFilter,
                        y: contentY,
                        willChange: 'filter, transform',
                    }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    )
}
