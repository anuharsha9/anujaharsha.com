'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

export interface CinematicSceneProps {
    eyebrow?: string
    title: string
    body?: React.ReactNode
    bullets?: string[]
    children?: React.ReactNode // For putting BentoGallery inside
    alignment?: 'left' | 'center'
}

export default function CinematicScene({ eyebrow, title, body, bullets, children, alignment = 'left' }: CinematicSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Create a scroll trigger range to fade this scene in and out
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 60%', 'start 20%']
    })

    const { scrollYProgress: exitProgress } = useScroll({
        target: containerRef,
        // When the top of this section reaches 0, we start fading out the text if it's tall
        // Or we simply use whileInView for simpler setup that works better on long pages.
    })

    const textAlign = alignment === 'center' ? 'text-center items-center' : 'text-left items-start'

    return (
        <section ref={containerRef} className="relative min-h-[50vh] py-24 sm:py-32 flex flex-col justify-center">

            {/* 
        The Narrative Block (Sticky or just inline fading) 
        Here we use Framer motion whileInView for a simple, Apple-like smooth fade-in
      */}
            <motion.div
                className={`w-full max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col ${textAlign} mb-12 lg:mb-24`}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
                {eyebrow && (
                    <span className="text-[var(--accent-teal)] font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.4em] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {eyebrow}
                    </span>
                )}

                {/* Massive Apple-style Title -> Allowed to span wider */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold leading-[1.1] tracking-[-0.02em] text-white mb-8 max-w-[1200px] text-wrap-balance">
                    {title}
                </h2>

                {/* Paragraphs - Expanded width significantly */}
                {body && (
                    <div className="text-xl md:text-2xl lg:text-3xl text-zinc-200 font-light max-w-[1200px] leading-[1.5] md:leading-[1.4] space-y-6">
                        {body}
                    </div>
                )}

                {/* Minimalist Bullets replacing heavy "cards" */}
                {bullets && bullets.length > 0 && (
                    <ul className="mt-12 space-y-6 max-w-3xl text-left">
                        {bullets.map((b, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                                className="flex items-start gap-4"
                            >
                                <span className="text-[var(--accent-teal)] font-mono text-xl leading-none mt-1">0{i + 1}</span>
                                <p className="text-lg md:text-xl text-zinc-200 font-light leading-relaxed">{b}</p>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </motion.div>

            {/* 
        Visual Payload (Bento grids, Carousels, Custom interactive elements)
      */}
            {children && (
                <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16">
                    {children}
                </div>
            )}

        </section>
    )
}
