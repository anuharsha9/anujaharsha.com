'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface WhisperNarrationProps {
    text: string
    className?: string
}

/**
 * WhisperNarration — Ghost-like transitional text between sections.
 * 
 * Fades in as the user scrolls into the gap between two sections,
 * holds briefly, then fades out as the next section overtakes it.
 * Max opacity is intentionally low (~45%) to keep it atmospheric.
 */
export default function WhisperNarration({ text, className = '' }: WhisperNarrationProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    })

    // Fade in as we enter → peak in the middle → fade out as we leave
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.5, 0.7, 1],
        [0, 0.45, 0.45, 0.45, 0]
    )

    // Gentle upward drift as it appears
    const y = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [30, 0, 0, -20]
    )

    return (
        <div
            ref={containerRef}
            className={`relative flex items-center justify-center py-20 sm:py-28 md:py-36 overflow-hidden ${className}`}
        >
            <motion.p
                style={{ opacity, y }}
                className="text-white font-sans font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center italic tracking-wide max-w-2xl mx-auto px-6 select-none pointer-events-none leading-relaxed"
            >
                {text}
            </motion.p>
        </div>
    )
}
