'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    AnimatePresence,
    animate as fmAnimate,
    useMotionTemplate,
} from 'framer-motion'
import { useRouter } from 'next/navigation'
import { X, Play, Cog } from 'lucide-react'
import RCTrailer from '@/components/home/RCTrailer'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

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
    const router = useRouter()

    const [isWatching, setIsWatching] = useState(false)
    const [movieKey, setMovieKey] = useState(0)
    const watchMode = useMotionValue(0)

    /* ─── Scroll choreography (200vh) ─── */
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    const overlayFade = useTransform(watchMode, [0, 1], [1, 0])
    const videoOpacity = useTransform(watchMode, [0, 1], [0.4, 1.0])

    const videoScaleOnScroll = useTransform(scrollYProgress, [0, 1], [1.05, 1.15])
    const videoYOnScroll = useTransform(scrollYProgress, [0, 1], [0, 120])
    const videoScale = useTransform(
        [videoScaleOnScroll, watchMode],
        ([scrollScale, watchProgress]) => {
            const base = scrollScale as number
            const watch = watchProgress as number
            return base + (1.02 - base) * watch
        }
    )
    const videoY = useTransform(
        [videoYOnScroll, watchMode],
        ([scrollYpx, watchProgress]) => (scrollYpx as number) * (1 - (watchProgress as number))
    )

    const videoBlur = useTransform(watchMode, [0, 1], [28, 0])
    const videoBrightness = useTransform(watchMode, [0, 1], [0.42, 1])
    const videoSaturation = useTransform(watchMode, [0, 1], [0.72, 1])
    const videoContrast = useTransform(watchMode, [0, 1], [0.9, 1.04])
    const videoFilterTemplate = useMotionTemplate`blur(${videoBlur}px) brightness(${videoBrightness}) saturate(${videoSaturation}) contrast(${videoContrast})`

    // Bio: visible from start, blur-out on exit
    const bioOpacity = useTransform(scrollYProgress, [0, 0.80, 0.95], [1, 1, 0])
    const bioY = useTransform(scrollYProgress, [0, 0.80, 0.95], [0, 0, -40])
    const bioBlur = useTransform(scrollYProgress, [0, 0.80, 0.95], [0, 0, 16])
    const bioFilter = useMotionTemplate`blur(${bioBlur}px)`

    // Hero container fade-out
    const heroContainerOpacity = useTransform(scrollYProgress, [0.88, 1.0], [1, 0])

    // CTA glow ring + sweep
    const glowRingScale = useTransform(scrollYProgress, [0.15, 0.25], [0.8, 1.6])
    const glowRingOpacity = useTransform(scrollYProgress, [0.15, 0.20, 0.25], [0, 0.6, 0])
    const lightSweepX = useTransform(scrollYProgress, [0.20, 0.35], ['-120%', '120%'])

    const combinedHeroTextOpacity = useTransform(watchMode, [0, 1], [1, 0])

    /* ─── Watch mode controls ─── */
    const enterWatchMode = () => {
        setIsWatching(true)
        setMovieKey(k => k + 1)
        fmAnimate(watchMode, 1, { duration: 0.6, ease: [0.4, 0, 0.2, 1] })
    }

    const handleWatchPresentation = () => {
        exitWatchMode()
        router.push('/work/reportcaster')
    }

    const exitWatchMode = useCallback(() => {
        setIsWatching(false)
        fmAnimate(watchMode, 0, { duration: 0.6, ease: [0.4, 0, 0.2, 1] })
    }, [watchMode])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isWatching) exitWatchMode()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isWatching, exitWatchMode])

    useEffect(() => {
        if (isWatching) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isWatching])

    return (
        <div ref={containerRef} className="relative w-full z-10" style={{ height: '200vh' }}>
            <motion.div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center" style={{ opacity: heroContainerOpacity }}>

                {/* ── TRAILER BACKGROUND ── */}
                <motion.div
                    className="absolute inset-0 z-0 bg-[var(--bg-cinematic)] flex items-center justify-center pointer-events-auto"
                    style={{ scale: videoScale, y: videoY, originY: 0, filter: videoFilterTemplate, opacity: videoOpacity }}
                >
                    <div className="w-full h-full">
                        <RCTrailer
                            key={movieKey}
                            showCTA={isWatching}
                            onWatchPresentation={handleWatchPresentation}
                            onReplay={() => setMovieKey(k => k + 1)}
                        />
                    </div>
                </motion.div>

                {/* ── DARK VIGNETTE OVERLAY ── */}
                <motion.div
                    className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.8)_80%,rgba(0,0,0,0.95)_100%)]"
                    style={{ opacity: overlayFade }}
                />

                {/* ── HERO TEXT CONTENT ── */}
                <motion.div
                    className="absolute inset-0 z-[15] flex flex-col items-center justify-center pointer-events-none"
                    style={{ opacity: combinedHeroTextOpacity }}
                >
                    {/* BIO + CTAs — load instantly */}
                    <motion.div
                        className="flex flex-col items-center justify-center px-6"
                        style={{ opacity: bioOpacity, y: bioY, filter: bioFilter }}
                    >
                        <div className="flex flex-col items-center text-center max-w-4xl">
                            <motion.span
                                className="text-[var(--accent-teal)] font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.4em] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                                initial={{ opacity: 0, filter: 'blur(16px)' }}
                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 2.5, delay: 0.2, ease }}
                            >
                                Senior Product Designer
                            </motion.span>
                            <motion.h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-[-0.02em] font-sans mb-6"
                                initial={{ opacity: 0, y: 20, filter: 'blur(18px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 3, delay: 0.1, ease }}
                            >
                                <span className="text-white drop-shadow-md">Hi, I&apos;m </span>
                                <span className="bg-[linear-gradient(118deg,#ffffff_0%,#eafcff_28%,#9ceaf2_56%,#2fc6d5_80%,var(--accent-teal)_100%)] bg-clip-text text-transparent">Anuja</span>
                            </motion.h1>
                            <motion.p
                                className="text-lg md:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-light max-w-3xl"
                                initial={{ opacity: 0, y: 15, filter: 'blur(14px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 2.8, delay: 0.4, ease }}
                            >
                                13 years of experience specializing in B2B enterprise UX, product strategy, and high-fidelity code prototyping.
                            </motion.p>
                        </div>

                        {/* CTAs */}
                        <motion.div
                            className="mt-10 grid w-full max-w-[42rem] grid-cols-1 gap-4 sm:grid-cols-2"
                            initial={{ opacity: 0, y: 15, filter: 'blur(12px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 2.5, delay: 0.8, ease }}
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
                                    onClick={enterWatchMode}
                                    className="group relative z-10 inline-flex h-full w-full items-center justify-center gap-3 rounded-full border border-white bg-white px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-500 hover:bg-black hover:text-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                                >
                                    <Play className="w-4 h-4 fill-current transition-transform duration-500 group-hover:scale-110" />
                                    <span>Flagship Case Study</span>
                                </button>
                            </div>

                            {/* SECONDARY CTA — Explore My Mind */}
                            <div className="relative order-1 sm:order-2 w-full h-14 pointer-events-auto">
                                <button
                                    onClick={() => router.push('/quiz')}
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

                        {/* CHAIR PHILOSOPHY — typewriter under bio */}
                        <PhilosophyTypewriter delay={1800} />
                    </motion.div>
                </motion.div>

                {/* ── CLOSE BUTTON FOR WATCH MODE ── */}
                <AnimatePresence>
                    {isWatching && (
                        <motion.button
                            aria-label="Exit movie mode"
                            className="absolute top-6 right-6 z-[50] w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer pointer-events-auto"
                            onClick={exitWatchMode}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    )
}
