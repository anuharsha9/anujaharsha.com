'use client'

import React, { useRef, useState, useEffect } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from 'framer-motion'
import { useTransition } from '@/components/transitions/TransitionContext'
import { Play, Cog } from 'lucide-react'

/**
 * Cinematic easing — extremely long deceleration tail.
 * Content drifts into its final position like it was always meant to be there.
 */
const ease = [0.05, 0.7, 0.1, 1] as [number, number, number, number]

/* ─── Typewriter: types text char-by-char with pauses at punctuation ─── */
const CHAIR_PHILOSOPHY = [
    `"When you look at a chair...`,
    `the only thing that comes to mind is to sit on it.`,
    ``,
    `It's the whole point of creating anything —`,
    `to achieve that obviousness. No?`,
    ``,
    `How does one achieve that?`,
    ``,
    `By obsessing over how humans experience things."`,
]

function PhilosophyTypewriter({ delay = 2000 }: { delay?: number }) {
    const fullText = CHAIR_PHILOSOPHY.join('\n')
    const [displayedChars, setDisplayedChars] = useState(0)
    const [started, setStarted] = useState(false)
    const [fading, setFading] = useState(false)

    useEffect(() => {
        const startTimer = setTimeout(() => setStarted(true), delay)
        return () => clearTimeout(startTimer)
    }, [delay])

    // Fade out 10s after typing finishes
    useEffect(() => {
        if (displayedChars < fullText.length) return
        const fadeTimer = setTimeout(() => setFading(true), 10000)
        return () => clearTimeout(fadeTimer)
    }, [displayedChars, fullText.length])

    useEffect(() => {
        if (!started || displayedChars >= fullText.length) return

        const char = fullText[displayedChars]
        let speed = 55
        if (char === '.' || char === '?') speed = 450
        else if (char === ',') speed = 200
        else if (char === '—') speed = 350
        else if (char === '\n') speed = 300

        // Extra pause at "..." sequences
        if (fullText.substring(displayedChars, displayedChars + 3) === '...') speed = 500

        const timer = setTimeout(() => setDisplayedChars(c => c + 1), speed)
        return () => clearTimeout(timer)
    }, [started, displayedChars, fullText])

    if (!started) return null

    return (
        <AnimatePresence>
            {!fading && (
                <motion.div
                    className="mt-8 max-w-xl mx-auto text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 1.2, ease }}
                >
                    <p className="font-mono text-[11px] sm:text-xs md:text-sm text-zinc-500/70 leading-relaxed italic whitespace-pre-line">
                        {fullText.slice(0, displayedChars)}
                        {displayedChars < fullText.length && (
                            <motion.span
                                className="inline-block w-[2px] h-[1em] bg-zinc-500/60 ml-[1px] align-middle"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                            />
                        )}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/* ─── Gear glyph icon ─── */
function InterlockedGearGlyph({ className = '' }: { className?: string }) {
    return (
        <span className={`relative block h-5 w-5 ${className}`}>
            <Cog className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-cyan-300" strokeWidth={2} />
            <Cog className="absolute left-[26%] top-[28%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 text-cyan-200/90" strokeWidth={2.2} />
            <Cog className="absolute left-[74%] top-[74%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 text-cyan-200/90" strokeWidth={2.2} />
        </span>
    )
}

export default function HeroLanding() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { navigateTo } = useTransition()
    const [isReady, setIsReady] = useState(false)

    // Trigger cinematic entrance after a dramatic 1-second pause, letting the waves form first
    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 1000)
        return () => clearTimeout(timer)
    }, [])

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
        <div ref={containerRef} className="relative w-full z-[2]" style={{ height: '100vh' }}>
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
                {/* ── HERO TEXT — cinematic blur-to-focus entrance ── */}
                <motion.div
                    className="absolute inset-0 z-[15] flex flex-col items-center justify-center pointer-events-none"
                >
                    <motion.div
                        className="flex flex-col items-center justify-center px-6"
                        style={{ y: bioY, opacity: bioOpacity }}
                    >
                        <div className="flex flex-col items-center text-center max-w-4xl">
                            {/* SENIOR PRODUCT DESIGNER — label */}
                            <motion.span
                                className="text-[var(--accent-teal)] font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.4em] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                                initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
                                animate={isReady
                                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                                    : { opacity: 0, y: 12, filter: 'blur(10px)' }
                                }
                                transition={{ duration: 3.2, delay: 0.1, ease }}
                            >
                                Senior Product Designer
                            </motion.span>

                            {/* MAIN HEADLINE — slowest, most dramatic reveal */}
                            <motion.h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-[-0.02em] font-sans mb-6"
                                initial={{ opacity: 0, y: 24, scale: 0.96, filter: 'blur(14px)' }}
                                animate={isReady
                                    ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                                    : { opacity: 0, y: 24, scale: 0.96, filter: 'blur(14px)' }
                                }
                                transition={{ duration: 3.8, delay: 0.6, ease }}
                            >
                                <span className="text-[var(--text-heading)] drop-shadow-md">Hi, I&apos;m </span>
                                <span className="bg-[linear-gradient(118deg,var(--text-heading)_0%,var(--accent-teal-bright)_45%,var(--accent-teal)_100%)] bg-clip-text text-transparent">Anuja</span>
                            </motion.h1>

                            {/* SUBTITLE — positioning + credibility */}
                            <motion.p
                                className="text-lg md:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-light max-w-3xl"
                                initial={{ opacity: 0, y: 16, filter: 'blur(12px)' }}
                                animate={isReady
                                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                                    : { opacity: 0, y: 16, filter: 'blur(12px)' }
                                }
                                transition={{ duration: 3.2, delay: 1.1, ease }}
                            >
                                I make complex enterprise products easier to understand, use, and adopt. 13 years across data-driven platforms, legacy modernization, and AI-native product experiences.
                            </motion.p>
                        </div>

                        {/* CTAs — last to resolve */}
                        <motion.div
                            className="mt-10 grid w-full max-w-[42rem] grid-cols-1 gap-4 sm:grid-cols-2"
                            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                            animate={isReady
                                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                                : { opacity: 0, y: 16, filter: 'blur(8px)' }
                            }
                            transition={{ duration: 2.8, delay: 1.5, ease }}
                        >
                            {/* PRIMARY CTA — Flagship Case Study */}
                            <div className="relative order-2 sm:order-1 w-full h-14 pointer-events-auto">
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-white/60"
                                    style={{ scale: glowRingScale, opacity: glowRingOpacity }}
                                />
                                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                                    <motion.div
                                        className="absolute inset-y-0 w-[60%] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        style={{ left: lightSweepX }}
                                    />
                                </div>
                                <button
                                    onClick={() => navigateTo('/work/reportcaster')}
                                    className="group relative z-10 inline-flex h-full w-full items-center justify-center gap-3 rounded-full border border-white bg-white px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-500 hover:bg-black hover:text-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                                >
                                    <Play className="w-4 h-4 fill-current transition-transform duration-500 group-hover:scale-110" />
                                    <span>Flagship Case Study</span>
                                </button>
                            </div>

                            {/* SECONDARY CTA — Explore My Mind */}
                            <div className="relative order-1 sm:order-2 w-full h-14 pointer-events-auto">
                                <button
                                    onClick={() => navigateTo('/quiz')}
                                    className="group relative z-10 inline-flex h-full w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-white/40 px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all duration-500 hover:bg-white/5 hover:border-white/80 backdrop-blur-sm"
                                >
                                    <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center">
                                        <div className="w-full h-full flex items-center justify-center group-hover:-rotate-90 transition-transform duration-500">
                                            <InterlockedGearGlyph />
                                        </div>
                                    </span>
                                    <span className="relative z-10">Explore My Mind</span>
                                </button>
                            </div>
                        </motion.div>

                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

