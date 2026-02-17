'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CareerEra } from '@/data/career-data'
import FoundationsTerminal from '../case-study/FoundationsTerminal'
import DesignEngineerContent from './DesignEngineerContent'

interface CinematicEraBlockProps {
    era?: CareerEra
    customTitle?: string
    customSubtitle?: string
    customDescription?: string
    customYear?: string
    customContent?: React.ReactNode
    backgroundVideo?: string
}

export default function CinematicEraBlock({
    era,
    customTitle,
    customSubtitle,
    customDescription,
    customYear,
    customContent,
    backgroundVideo,
}: CinematicEraBlockProps) {
    const sectionRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    // Scroll-driven opacity animations
    const yearOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
    const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
    const contentOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.9, 1], [0, 1, 1, 0])
    const contentY = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [60, 0, 0, -60])

    // Data Resolution
    const yearDisplay = customYear || era?.period.split('—')[0].trim() || '2025'
    const titleDisplay = customTitle || era?.role || 'Role'
    const subtitleDisplay = customSubtitle || era?.company || 'Company'
    const descriptionDisplay = customDescription || era?.description || ''

    // ID Resolution
    const blockId = era ? `era-${era.id}` : undefined

    return (
        <section
            ref={sectionRef}
            id={blockId}
            className="relative min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
        >
            {/* OPTIONAL: Background Video (Vibe Coding) */}
            {backgroundVideo && (
                <div className="absolute inset-0 z-0 opacity-20">
                    <video
                        src={backgroundVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover grayscale opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                </div>
            )}

            <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 flex flex-col items-center justify-center">

                {/* YEAR WATERMARK */}
                <motion.div
                    style={{ opacity: yearOpacity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none"
                >
                    <span className="text-[25vw] font-bold text-white/[0.03] leading-none tracking-tighter">
                        {yearDisplay}
                    </span>
                </motion.div>

                {/* TEXT CONTENT */}
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="relative z-10 flex flex-col items-center text-center mb-12"
                >
                    <h3 className="text-[12vw] md:text-[8vw] font-bold text-white leading-[0.9] tracking-tighter">
                        {titleDisplay}
                    </h3>
                    <p className="mt-4 text-xl md:text-3xl text-slate-400 font-light tracking-wide uppercase">
                        {subtitleDisplay}
                    </p>
                </motion.div>

                {/* CUSTOM CONTENT (Work Grid, etc) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="w-full mt-8"
                >
                    {customContent ? (
                        customContent
                    ) : (
                        titleDisplay.includes('Foundations') ? (
                            <div className="w-full max-w-4xl mx-auto">
                                <FoundationsTerminal />
                            </div>
                        ) : (
                            <div className="mt-8 max-w-xl mx-auto text-center">
                                {/* Description */}
                                <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed text-center">
                                    {descriptionDisplay}
                                </p>
                            </div>
                        )
                    )}
                </motion.div>
            </div>
        </section>
    )
}
