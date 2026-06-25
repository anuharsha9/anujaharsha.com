'use client'

import React, { useRef, useState, useEffect } from 'react'
import {
    motion,
    useScroll,
    useTransform,
} from 'framer-motion'
import { useTransition } from '@/components/transitions/TransitionContext'
import { ArrowDown } from 'lucide-react'

/**
 * Cinematic easing — extremely long deceleration tail.
 * Content drifts into its final position like it was always meant to be there.
 */
const ease = [0.05, 0.7, 0.1, 1] as [number, number, number, number]

export default function HeroLanding() {
    const containerRef = useRef<HTMLDivElement>(null)
    useTransition()
    const [isReady, setIsReady] = useState(true)

    /* Smooth-scroll to the case studies section just below the hero. */
    const scrollToWork = () => {
        const target = document.getElementById('work-overview')
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    /* ─── Scroll choreography — viewport-based ─── 
     * Use raw scrollY instead of container progress.
     * This gives a predictable pixel range for the exit,
     * regardless of container height.
     */
    const { scrollY } = useScroll()

    // Bio: opacity + drift on scroll exit (no blur — GPU-compositable only)
    const bioY = useTransform(scrollY, [0, 100, 400], [0, 0, -30])
    const bioOpacity = useTransform(scrollY, [0, 100, 400], [1, 1, 0])

    // Hero container: fade + gentle scale on scroll exit
    const heroScale = useTransform(scrollY, [150, 500], [1, 0.98])
    const heroOpacity = useTransform(scrollY, [150, 500], [1, 0])

    // CTA glow ring + sweep
    const glowRingScale = useTransform(scrollY, [30, 80], [0.8, 1.6])
    const glowRingOpacity = useTransform(scrollY, [30, 50, 80], [0, 0.6, 0])
    const lightSweepX = useTransform(scrollY, [50, 120], ['-120%', '120%'])

    return (
        <div ref={containerRef} className="relative w-full z-[2]" style={{ height: '100dvh' }}>
            {/* Bottom-edge cover — blocks CSG from peeking below hero,
                 transparent at top so fixed aurora waves show through */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: heroOpacity,
                    background: 'linear-gradient(to bottom, transparent 60%, #0a0a0f 95%)',
                }}
            />
            <motion.div
                className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center"
                style={{ scale: heroScale, opacity: heroOpacity }}
            >
                {/* ── RADIAL MASK — creates a dark spotlight behind the text ── */}
                <div 
                    className="absolute inset-0 z-[10] pointer-events-none" 
                    style={{ background: 'radial-gradient(circle at center, var(--bg-cinematic) 0%, transparent 55%)' }} 
                />

                {/* ── HERO TEXT — cinematic blur-to-focus entrance ── */}
                <motion.div
                    className="absolute inset-0 z-[15] flex flex-col items-center justify-center pointer-events-none"
                >
                    <motion.div
                        className="flex flex-col items-center justify-center px-6"
                        style={{ y: bioY, opacity: bioOpacity }}
                    >
                        <div className="flex flex-col items-center text-center max-w-4xl">
                            {/* STAFF PRODUCT DESIGNER — label */}
                            <motion.span
                                className="text-[var(--accent-teal)] font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] mb-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                                initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                            >
                                Staff Product Designer · Enterprise Data Platforms
                            </motion.span>

                            {/* MAIN HEADLINE — slowest, most dramatic reveal */}
                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-[-0.02em] font-sans mb-5"
                                initial={{ opacity: 0, y: 24, scale: 0.96, filter: 'blur(14px)' }}
                                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, delay: 0.1, ease }}
                            >
                                <span className="text-[var(--text-heading)] drop-shadow-md">Hi, I&apos;m </span>
                                <span className="bg-[linear-gradient(118deg,var(--text-heading)_0%,var(--accent-teal-bright)_45%,var(--accent-teal)_100%)] bg-clip-text text-transparent">Anuja.</span>
                            </motion.h1>

                            {/* SUBTITLE — positioning + credibility */}
                            <motion.p
                                className="text-base md:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-light max-w-3xl px-2 sm:px-0"
                                initial={{ opacity: 0, y: 16, filter: 'blur(12px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, delay: 0.2, ease }}
                            >
                                I make the most powerful tool in the building — the one nobody can use — obvious. 13 years modernizing legacy enterprise systems; most recently a ~50-year-old BI platform, where the work helped renew a multi-year, multi-million-dollar contract.
                            </motion.p>
                        </div>

                        {/* CTA — single primary, sends visitors straight into the work */}
                        <motion.div
                            className="mt-8 md:mt-10 flex justify-center pointer-events-auto"
                            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 1.2, delay: 0.3, ease }}
                        >
                            <div className="relative h-12 sm:h-14">
                                {/* Outer glow ring — scales out as the hero exits */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-white/60 pointer-events-none"
                                    style={{ scale: glowRingScale, opacity: glowRingOpacity }}
                                />
                                {/* Light sweep across the button on scroll-down */}
                                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                                    <motion.div
                                        className="absolute inset-y-0 w-[60%] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        style={{ left: lightSweepX }}
                                    />
                                </div>
                                <button
                                    onClick={scrollToWork}
                                    className="group relative z-10 inline-flex h-full items-center justify-center gap-3 rounded-full border border-white bg-white px-8 sm:px-10 py-3 sm:py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-500 hover:bg-black hover:text-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                                >
                                    <span>See the Work</span>
                                    <ArrowDown className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1" />
                                </button>
                            </div>
                        </motion.div>

                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

