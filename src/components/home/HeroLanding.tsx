'use client'

import React, { useRef, useState, useEffect } from 'react'
import {
    m,
    useScroll,
    useTransform,
} from 'framer-motion'
import { useTransition } from '@/components/transitions/TransitionContext'
import { ArrowDown, Play } from 'lucide-react'
import Button from '@/components/ui/Button'
import InterlockedGearGlyph from '@/components/ui/InterlockedGearGlyph'
import AnimatedSignatureLogo from '@/components/brand/AnimatedSignatureLogo'

export default function HeroLanding() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { navigateTo } = useTransition()
    const [isReady, setIsReady] = useState(true)

    /* Smooth-scroll to the case studies section just below the hero. */
    const scrollToWork = () => {
        const target = document.getElementById('work-overview')
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
            <m.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: heroOpacity,
                    background: 'linear-gradient(to bottom, transparent 60%, #0a0a0f 95%)',
                }}
            />
            <m.div
                className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center"
                style={{ scale: heroScale, opacity: heroOpacity }}
            >
                {/* ── RADIAL MASK — creates a dark spotlight behind the text ── */}
                <div 
                    className="absolute inset-0 z-[10] pointer-events-none" 
                    style={{ background: 'radial-gradient(circle at center, var(--bg-cinematic) 0%, transparent 55%)' }} 
                />

                {/* ── HERO TEXT — cinematic blur-to-focus entrance ── */}
                <m.div
                    className="absolute inset-0 z-[15] flex flex-col items-center justify-center pointer-events-none"
                >
                    <m.div
                        className="flex flex-col items-center justify-center px-6"
                        style={{ y: bioY, opacity: bioOpacity }}
                    >
                        <div className="flex flex-col items-center text-center max-w-4xl">
                            {/* ANIMATED SIGNATURE — brandmark, draws itself on load. Centered above the eyebrow. */}
                            <div
                                className="hero-enter mb-5 h-16 w-[3.4rem] text-white/90 sm:mb-6 md:h-20 md:w-[4.25rem]"
                                aria-hidden="true"
                            >
                                <AnimatedSignatureLogo
                                    className="h-full w-full"
                                    duration={3600}
                                    pauseDuration={3000}
                                />
                            </div>

                            {/* MAIN HEADLINE — slowest, most dramatic reveal. The name
                                leads; the role line sits directly under it (Anuja's call:
                                "it fits better visually"). */}
                            <h1
                                className="hero-enter text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-[-0.02em] font-sans mb-4"
                                style={{ animationDelay: '0.1s' }}
                            >
                                <span className="text-[var(--text-heading)] drop-shadow-md">Hi, I&apos;m </span>
                                {/* Easter-egg door — clicking the name opens the brain experience.
                                    aria-label leads with the visible name "Anuja" so it satisfies
                                    WCAG 2.5.3 (Label in Name) while keeping the curiosity hint. */}
                                <button
                                    onClick={() => navigateTo('/quiz')}
                                    aria-label="Anuja — explore my mind"
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
                            </h1>

                            {/* ROLE — title line, now sits directly under the name */}
                            <span
                                className="hero-enter block text-[var(--accent-teal)] font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] mb-6 drop-shadow-[0_1px_2px_rgba(var(--black-rgb),0.8)]"
                                style={{ animationDelay: '0.18s' }}
                            >
                                Staff Product Designer · Enterprise Data Platforms
                            </span>

                            {/* SUBTITLE — positioning + credibility. Hero is the
                                introduction: who I am, why the visitor should keep
                                scrolling. Leads with the philosophy that distinguishes
                                this work (signal-vs-noise refinement, not complexity
                                stripping), then anchors it in time-served + the most
                                recent shipping proof. The chair-test metaphor stays
                                at the bottom of the page where it has context. */}
                            <p
                                className="hero-enter text-base md:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-light max-w-3xl px-2 sm:px-0"
                                style={{ animationDelay: '0.2s' }}
                            >
                                I make complex enterprise products usable — not by stripping the complexity, but by refining what users need to <span className="text-zinc-200">see</span> from what they need to <span className="text-zinc-200">use</span>. 13 years of design thinking and architecting products, most recently leading the product modernization of an award-winning BI platform.
                            </p>
                        </div>

                        {/* CTAs — primary (work) + secondary (resume) */}
                        <div
                            className="hero-enter mt-8 md:mt-10 flex flex-col items-center gap-4 pointer-events-auto sm:flex-row sm:justify-center sm:gap-5"
                            style={{ animationDelay: '0.3s' }}
                        >
                            <div className="relative">
                                {/* Outer glow ring + light-sweep on scroll — decorative wrappers
                                    that animate around the canonical Button. The button itself
                                    is the same shape/states as every other CTA on the site. */}
                                <m.div
                                    className="absolute inset-0 rounded-full border-2 border-[rgba(var(--accent-teal-rgb),0.6)] pointer-events-none"
                                    style={{ scale: glowRingScale, opacity: glowRingOpacity }}
                                />
                                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                                    <m.div
                                        className="absolute inset-y-0 w-[60%] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        style={{ left: lightSweepX }}
                                    />
                                </div>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={scrollToWork}
                                    icon={<ArrowDown className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1" />}
                                >
                                    See the Work
                                </Button>
                            </div>

                            {/* 60-second intro — secondary. Plain Play icon at the
                                same w-4 h-4 as the primary's ArrowDown so the two
                                hero buttons are visually the same height. */}
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={() => navigateTo('/manifesto')}
                                icon={<Play className="w-4 h-4 fill-current" />}
                            >
                                60-sec intro
                            </Button>
                        </div>

                    </m.div>
                </m.div>
            </m.div>
        </div>
    )
}

