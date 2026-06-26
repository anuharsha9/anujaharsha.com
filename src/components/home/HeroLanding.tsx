'use client'

import React, { useRef, useState, useEffect } from 'react'
import {
    motion,
    useScroll,
    useTransform,
} from 'framer-motion'
import { useTransition } from '@/components/transitions/TransitionContext'
import { ArrowDown, FileText } from 'lucide-react'
import InterlockedGearGlyph from '@/components/ui/InterlockedGearGlyph'
import AnimatedSignatureLogo from '@/components/brand/AnimatedSignatureLogo'
import { usePdf } from '@/contexts/PdfContext'
import { trackResumeDownload } from '@/components/analytics/GoogleAnalytics'

/**
 * Cinematic easing — extremely long deceleration tail.
 * Content drifts into its final position like it was always meant to be there.
 */
const ease = [0.05, 0.7, 0.1, 1] as [number, number, number, number]

export default function HeroLanding() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { navigateTo } = useTransition()
    const { openPdf } = usePdf()
    const [isReady, setIsReady] = useState(true)

    /* Smooth-scroll to the case studies section just below the hero. */
    const scrollToWork = () => {
        const target = document.getElementById('work-overview')
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const openResume = () => {
        trackResumeDownload()
        openPdf(
            '/assets/Anuja%20Harsha%20Nimmagadda%20-%20Staff%20Product%20Designer.pdf',
            'Anuja Harsha Nimmagadda - Staff Product Designer',
        )
    }

    /* ─── Scroll choreography — viewport-based ───
     * Use raw scrollY instead of container progress so the exit timing
     * stays predictable regardless of container height. All breakpoints
     * named so the curves are legible side-by-side. */
    const { scrollY } = useScroll()

    // Bio: hold for 100px, then drift up + fade out by 400px scroll.
    const BIO_HOLD_PX = 100
    const BIO_EXIT_PX = 400
    const bioY = useTransform(scrollY, [0, BIO_HOLD_PX, BIO_EXIT_PX], [0, 0, -30])
    const bioOpacity = useTransform(scrollY, [0, BIO_HOLD_PX, BIO_EXIT_PX], [1, 1, 0])

    // Hero container: start exit at 150px, fully gone by 500px.
    const HERO_EXIT_START_PX = 150
    const HERO_EXIT_END_PX = 500
    const heroScale = useTransform(scrollY, [HERO_EXIT_START_PX, HERO_EXIT_END_PX], [1, 0.98])
    const heroOpacity = useTransform(scrollY, [HERO_EXIT_START_PX, HERO_EXIT_END_PX], [1, 0])

    // CTA glow ring + light sweep — short on-scroll flourish.
    const CTA_GLOW_START_PX = 30
    const CTA_GLOW_PEAK_PX = 50
    const CTA_GLOW_END_PX = 80
    const glowRingScale = useTransform(scrollY, [CTA_GLOW_START_PX, CTA_GLOW_END_PX], [0.8, 1.6])
    const glowRingOpacity = useTransform(scrollY, [CTA_GLOW_START_PX, CTA_GLOW_PEAK_PX, CTA_GLOW_END_PX], [0, 0.6, 0])
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
                            {/* ANIMATED SIGNATURE — brandmark, draws itself on load. Centered above the eyebrow. */}
                            <motion.div
                                className="mb-5 h-16 w-[3.4rem] text-white/90 sm:mb-6 md:h-20 md:w-[4.25rem]"
                                initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                aria-hidden="true"
                            >
                                <AnimatedSignatureLogo
                                    className="h-full w-full"
                                    duration={3600}
                                    pauseDuration={3000}
                                />
                            </motion.div>

                            {/* STAFF PRODUCT DESIGNER — label */}
                            <motion.span
                                className="text-[var(--accent-teal)] font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] mb-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                                initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, delay: 0.15, ease }}
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
                                {/* Easter-egg door — clicking the name opens the brain experience. No label; reward for curiosity. */}
                                <button
                                    onClick={() => navigateTo('/quiz')}
                                    aria-label="Hidden — explore my mind"
                                    title="There is more here…"
                                    className="group relative inline-block pointer-events-auto cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                                >
                                    <span className="bg-[linear-gradient(118deg,var(--text-heading)_0%,var(--accent-teal-bright)_45%,var(--accent-teal)_100%)] bg-clip-text text-transparent transition-[filter] duration-500 group-hover:brightness-110">Anuja.</span>
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100"
                                    >
                                        <InterlockedGearGlyph size={28} />
                                    </span>
                                </button>
                            </motion.h1>

                            {/* SUBTITLE — positioning + credibility */}
                            <motion.p
                                className="text-base md:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-light max-w-3xl px-2 sm:px-0"
                                initial={{ opacity: 0, y: 16, filter: 'blur(12px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, delay: 0.2, ease }}
                            >
                                I make the most powerful tool in the building — the one nobody likes to use — obvious. 12 years of product design in enterprise systems, most recently leading the UX modernization of a 50-year-old BI platform, where the team&apos;s work helped renew a multi-year, multi-million-dollar contract.
                            </motion.p>
                        </div>

                        {/* CTAs — primary (work) + secondary (resume) */}
                        <motion.div
                            className="mt-8 md:mt-10 flex flex-col items-center gap-4 pointer-events-auto sm:flex-row sm:justify-center sm:gap-5"
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

                            {/* Resume — secondary outline button */}
                            <button
                                onClick={openResume}
                                aria-label="View Resume PDF"
                                className="group inline-flex h-12 sm:h-14 items-center justify-center gap-2.5 rounded-full border border-white/40 bg-white/[0.04] px-7 sm:px-8 font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-500 hover:border-white/80 hover:bg-white/[0.08]"
                            >
                                <FileText className="w-4 h-4" />
                                <span>Resume</span>
                            </button>
                        </motion.div>

                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

