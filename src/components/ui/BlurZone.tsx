'use client'

/**
 * BlurZone — Scroll-driven blur morph wrapper.
 *
 * Desktop: Creates the "ocean boat" experience:
 * - Content pins to the viewport (sticky)
 * - As you scroll, content transitions: blurred → sharp → blurred
 * - Content STAYS IN PLACE during the transition — it morphs through blur
 * - Generous focus plateau for reading
 * - Bidirectional — scrolling up reverses everything
 *
 * Mobile: Lightweight mode — no sticky (prevents content clipping),
 * reduced container heights, gentler blur for scroll-triggered reveal.
 *
 * Structure:
 *   <outer div>  — tall container (containerHeight), creates scroll distance
 *     <sticky div>  — pinned to viewport top, h-screen (desktop only)
 *       <motion.div>  — blur + parallax applied here
 *         {children}  — section content, renders naturally
 *       </motion.div>
 *     </sticky div>
 *   </outer div>
 */

import React, { useRef, useState, useEffect } from 'react'
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

/** Check if viewport is mobile-sized */
function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [breakpoint])
    return isMobile
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
    const isMobile = useIsMobile()

    // Mobile: much gentler blur (12px vs 40px) and no scroll-pinning
    const effectiveMaxBlur = isMobile ? 12 : maxBlur
    const effectiveParallax = isMobile ? 0 : parallaxOffset

    // Track scroll through the tall outer container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    })

    // ── Blur curve ──
    // Mobile: faster resolve (0.10 → 0.20), no exit blur (stays sharp once revealed)
    // Desktop: full cinematic morph
    const contentBlur = useTransform(
        scrollYProgress,
        isMobile
            ? [0, 0.10, 0.20, 1]
            : [0, 0.15, 0.30, 0.70, 0.85, 1],
        prefersReducedMotion || isMobile
            ? (isMobile
                ? [effectiveMaxBlur, effectiveMaxBlur, 0, 0]
                : [0, 0, 0, 0, 0, 0])
            : [effectiveMaxBlur, effectiveMaxBlur, 0, 0, effectiveMaxBlur, effectiveMaxBlur]
    )

    // Watermark resolves faster
    const watermarkBlur = useTransform(
        scrollYProgress,
        isMobile
            ? [0, 0.08, 0.15, 1]
            : [0, 0.10, 0.22, 0.70, 0.85, 1],
        prefersReducedMotion || isMobile
            ? (isMobile
                ? [effectiveMaxBlur, effectiveMaxBlur, 0, 0]
                : [0, 0, 0, 0, 0, 0])
            : [effectiveMaxBlur, effectiveMaxBlur, 0, 0, effectiveMaxBlur, effectiveMaxBlur]
    )

    // ── Parallax — gentle float (disabled on mobile) ──
    const contentY = useTransform(
        scrollYProgress,
        [0, 1],
        prefersReducedMotion
            ? [0, 0]
            : [effectiveParallax, -effectiveParallax]
    )

    // Build CSS filter strings
    const contentFilter = useMotionTemplate`blur(${contentBlur}px)`
    const watermarkFilter = useMotionTemplate`blur(${watermarkBlur}px)`

    // ── Mobile: auto-fit height, no sticky ──
    // Desktop: full cinematic scroll with sticky pinning
    if (isMobile) {
        return (
            <div
                ref={containerRef}
                id={id}
                className="relative w-full"
            >
                {/* Watermark layer */}
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

                {/* Main content — gentle blur reveal, no sticky, no clipping */}
                <motion.div
                    className={`relative z-[2] w-full ${className}`}
                    style={{
                        filter: contentFilter,
                        willChange: 'filter',
                    }}
                >
                    {children}
                </motion.div>
            </div>
        )
    }

    // ── Desktop: full cinematic sticky blur-morph ──
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
