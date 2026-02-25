'use client'

import React, { useRef, useState, useEffect } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    AnimatePresence,
    animate as fmAnimate,
    useMotionTemplate,
} from 'framer-motion'
import HeroSplit from '@/components/home/HeroSplit'
import { SecondaryCaseStudies } from '@/components/timeline/SecondaryCaseStudies'
import { ArrowDown, X, Play, Cog } from 'lucide-react'
import AutoPlayStory, { type MovieBeat } from '@/components/case-study/storyboard/AutoPlayStory'
import {
    MovieBeatAssignment,
    MovieBeatDiscovery,
    MovieBeatChaos,
    MovieBeatPivots,
    MovieBeatBreakthrough,
    MovieBeatExecution,
    MovieBeatScale,
    MovieBeatShipped,
} from '@/components/case-study/storyboard/RCMovieBeats'

const RC_MOVIE_BEATS: MovieBeat[] = [
    {
        id: 'assignment',
        duration: 7600,
        label: 'The Business Problem',
        signal: 'CUSTOMER LOSS',
        narration: 'Week one: I inherited a 40-year-old mission-critical system that was actively losing customers.',
        narrationDelay: 0.1,
        component: <MovieBeatAssignment />,
    },
    {
        id: 'discovery',
        duration: 7600,
        label: 'Discovery Arc',
        signal: 'SYSTEM ARCHAEOLOGY',
        narration: 'I had zero domain context, so I built the mental model from scratch with SMEs and raw artifacts.',
        narrationDelay: 0.1,
        component: <MovieBeatDiscovery />,
    },
    {
        id: 'chaos',
        duration: 8600,
        label: 'The Chaos',
        signal: 'LEGACY DEBT',
        narration: 'What looked like one product was actually five disconnected tools, scattered across broken workflows.',
        narrationDelay: 0.05,
        component: <MovieBeatChaos />,
    },
    {
        id: 'pivots',
        duration: 8400,
        label: 'Three Pivots',
        signal: 'ITERATION',
        narration: 'V1 failed. V2 failed. The third pivot aligned engineering reality with customer outcomes.',
        narrationDelay: 0.08,
        component: <MovieBeatPivots />,
    },
    {
        id: 'breakthrough',
        duration: 9000,
        label: 'The Breakthrough',
        signal: 'UNIFIED HUB',
        narration: 'The + Menu became the strategic hinge: one command center replacing fragmented entry points.',
        narrationDelay: 0.06,
        component: <MovieBeatBreakthrough />,
    },
    {
        id: 'execution',
        duration: 8400,
        label: 'Execution Arc',
        signal: 'FEATURE SYSTEM',
        narration: 'Then I rebuilt Scheduler, Recurrence, and Job Logs as one coherent interaction system.',
        narrationDelay: 0.06,
        component: <MovieBeatExecution />,
    },
    {
        id: 'scale',
        duration: 7600,
        label: '250 Screens',
        signal: 'SCALE + HANDOFF',
        narration: '250-plus screens, every edge state documented, and a living handoff system for a 20-person team.',
        narrationDelay: 0.1,
        component: <MovieBeatScale />,
    },
    {
        id: 'shipped',
        duration: 10400,
        label: 'Shipped + Impact',
        signal: 'OUTCOME',
        narration: 'We shipped at enterprise scale with zero regressions and retained trust in a mission-critical product.',
        narrationDelay: 0.08,
        component: <MovieBeatShipped />,
    },
]

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

    const [isWatching, setIsWatching] = useState(false)
    const watchMode = useMotionValue(0)
    const [isExploringMind, setIsExploringMind] = useState(false)
    const exploreMode = useMotionValue(0)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    const overlayFade = useTransform(watchMode, [0, 1], [1, 0])
    const videoOpacity = useTransform(watchMode, [0, 1], [0.4, 1.0])
    const brainOverlayFade = useTransform(exploreMode, [0, 1], [0, 0.8])

    const videoScaleOnScroll = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])
    const videoYOnScroll = useTransform(scrollYProgress, [0, 1], [0, 200])
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

    // --- SCROLL CHOREOGRAPHY ---

    // Phase 1: Chair Philosophy (0% - 40%) — first line visible on load
    const chair1Opacity = useTransform(scrollYProgress, [0.0, 0.35, 0.40], [1, 1, 0])
    const chair1Y = useTransform(scrollYProgress, [0.0, 0.35, 0.40], [0, 0, -20])

    const chair2Opacity = useTransform(scrollYProgress, [0.08, 0.14, 0.35, 0.40], [0, 1, 1, 0])
    const chair2Y = useTransform(scrollYProgress, [0.08, 0.14, 0.35, 0.40], [20, 0, 0, -20])

    const chair3Opacity = useTransform(scrollYProgress, [0.18, 0.24, 0.35, 0.40], [0, 1, 1, 0])
    const chair3Y = useTransform(scrollYProgress, [0.18, 0.24, 0.35, 0.40], [20, 0, 0, -20])

    const chair4Opacity = useTransform(scrollYProgress, [0.28, 0.33, 0.38, 0.42], [0, 1, 1, 0])
    const chair4Scale = useTransform(scrollYProgress, [0.28, 0.33], [0.95, 1])
    const chair4Blur = useTransform(scrollYProgress, [0.28, 0.33], [4, 0])
    const chair4Filter = useMotionTemplate`blur(${chair4Blur}px)`

    // Phase 2: Introduction (45% - 95%)
    const introOpacity = useTransform(scrollYProgress, [0.45, 0.52, 0.90, 0.98], [0, 1, 1, 0])
    const introY = useTransform(scrollYProgress, [0.45, 0.52, 0.90, 0.98], [30, 0, 0, -30])

    // Phase 3: CTAs (58% - 95%) — spring scale + glow
    const buttonsOpacity = useTransform(scrollYProgress, [0.58, 0.64, 0.90, 0.98], [0, 1, 1, 0])
    const buttonsScale = useTransform(scrollYProgress, [0.58, 0.66], [0.85, 1])
    const buttonsY = useTransform(scrollYProgress, [0.58, 0.64, 0.90, 0.98], [30, 0, 0, -20])

    const buttonsPointerEvents = useTransform(buttonsOpacity, (v) => v > 0.8 ? 'auto' : 'none')

    // Glow ring on primary CTA — pulses once then fades  
    const glowRingScale = useTransform(scrollYProgress, [0.60, 0.68], [0.8, 1.6])
    const glowRingOpacity = useTransform(scrollYProgress, [0.60, 0.64, 0.68], [0, 0.6, 0])

    // Light sweep on primary CTA
    const lightSweepX = useTransform(scrollYProgress, [0.62, 0.72], ['-120%', '120%'])

    const heroExploreFade = useTransform(exploreMode, [0, 1], [1, 0])
    const heroWatchFade = useTransform(watchMode, [0, 1], [1, 0])
    const combinedHeroTextOpacity = useTransform(
        [heroExploreFade, heroWatchFade],
        ([exploreFade, watchFade]) => (exploreFade as number) * (watchFade as number)
    )

    const combinedBrainOpacity = useTransform(exploreMode, [0, 1], [0, 1])
    const brainExploreScale = useTransform(exploreMode, [0, 1], [0.8, 1])

    const enterWatchMode = () => {
        setIsWatching(true)
        fmAnimate(watchMode, 1, { duration: 0.6, ease: [0.4, 0, 0.2, 1] })
    }

    const exitWatchMode = () => {
        setIsWatching(false)
        fmAnimate(watchMode, 0, { duration: 0.6, ease: [0.4, 0, 0.2, 1] })
    }

    const enterExploreMode = () => {
        setIsExploringMind(true)
        fmAnimate(exploreMode, 1, { duration: 0.8, ease: [0.22, 1, 0.36, 1] })
    }

    const exitExploreMode = () => {
        setIsExploringMind(false)
        fmAnimate(exploreMode, 0, { duration: 0.6, ease: [0.22, 1, 0.36, 1] })
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isWatching) exitWatchMode()
                if (isExploringMind) exitExploreMode()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isWatching, isExploringMind])

    useEffect(() => {
        if (isWatching || isExploringMind) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isWatching, isExploringMind])

    const hideScrollPrompt = useTransform(scrollYProgress, [0, 0.05], [1, 0])

    return (
        <div ref={containerRef} className="relative w-full z-10" style={{ height: '300vh' }}>
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">

                <motion.div
                    className="absolute inset-0 z-0 bg-[#010204] flex items-center justify-center pointer-events-auto"
                    style={{ scale: videoScale, y: videoY, originY: 0, filter: videoFilterTemplate, opacity: videoOpacity }}
                >
                    <div className="w-full h-full transition-all duration-[1200ms]" style={{ padding: isWatching ? '4rem' : '0' }}>
                        <AutoPlayStory
                            beats={RC_MOVIE_BEATS}
                            isInView={true}
                            autoStart={true}
                            loop={true}
                            fullBleedBackground={true}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.8)_80%,rgba(0,0,0,0.95)_100%)]"
                    style={{ opacity: overlayFade }}
                />

                <motion.div
                    className="absolute inset-0 z-[2] pointer-events-none bg-black"
                    style={{ opacity: brainOverlayFade }}
                />

                <motion.div
                    className={`absolute inset-0 z-[15] flex flex-col items-center justify-center pointer-events-none`}
                    style={{ opacity: combinedHeroTextOpacity }}
                >
                    {/* PHASE 1: CHAIR QUOTE */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-6 md:px-12 space-y-8 md:space-y-12 text-center"
                    >
                        <motion.h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/50 will-change-transform" style={{ opacity: chair1Opacity, y: chair1Y }}>
                            &quot;When you look at a chair...
                        </motion.h3>
                        <motion.h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/70 will-change-transform" style={{ opacity: chair2Opacity, y: chair2Y }}>
                            ...the only thing that comes to mind is to sit on it.
                        </motion.h3>
                        <motion.h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/90 will-change-transform" style={{ opacity: chair3Opacity, y: chair3Y }}>
                            Good UX should feel exactly like that.
                        </motion.h3>
                        <motion.h3
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-300 to-slate-500 mt-8 will-change-transform"
                            style={{ opacity: chair4Opacity, scale: chair4Scale, filter: chair4Filter }}
                        >
                            Invisible.&quot;
                        </motion.h3>
                    </motion.div>

                    {/* PHASE 2 & 3: INTRODUCTION & CTAS */}
                    <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-6">
                        <motion.div
                            className="flex flex-col items-center text-center max-w-4xl will-change-transform"
                            style={{ opacity: introOpacity, y: introY }}
                        >
                            <span className="text-[var(--accent-teal)] font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.4em] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Senior Product Designer</span>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-[-0.02em] font-sans mb-6">
                                <span className="text-white drop-shadow-md">Hi, I&apos;m </span>
                                <span className="bg-[linear-gradient(118deg,#ffffff_0%,#eafcff_28%,#9ceaf2_56%,#2fc6d5_80%,var(--accent-teal)_100%)] bg-clip-text text-transparent">Anuja</span>
                            </h2>
                            <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-light max-w-2xl">
                                13 years of experience specializing in B2B enterprise UX, product strategy, and high-fidelity code prototyping.
                            </p>
                        </motion.div>

                        <motion.div
                            className="mt-12 grid w-full max-w-[42rem] grid-cols-1 gap-4 sm:grid-cols-2"
                            style={{
                                opacity: buttonsOpacity,
                                y: buttonsY,
                                scale: buttonsScale,
                                pointerEvents: buttonsPointerEvents
                            }}
                        >
                            {/* PRIMARY CTA — Flagship Case Study */}
                            <div className="relative order-2 sm:order-1 w-full h-14 pointer-events-auto">
                                {/* Expanding glow ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-white/60"
                                    style={{ scale: glowRingScale, opacity: glowRingOpacity }}
                                />
                                {/* Light sweep shimmer */}
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
                                    onClick={enterExploreMode}
                                    className="group relative z-10 inline-flex h-full w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-white/40 px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all duration-500 hover:bg-white/5 hover:border-white/80 backdrop-blur-sm"
                                >
                                    <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center">
                                        <div className="w-full h-full flex items-center justify-center group-hover:-rotate-90 transition-transform duration-500">
                                            <InterlockedGearGlyph />
                                        </div>
                                    </span>
                                    <span className="relative z-10">
                                        Explore My Mind
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* SCROLL INDICATOR */}
                    <motion.div
                        className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center gap-4 w-full"
                        style={{ opacity: hideScrollPrompt }}
                    >
                        <div className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-[0.4em] flex flex-wrap justify-center px-4">
                            SCROLL DOWN TO BEGIN
                        </div>
                        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                            <ArrowDown className="w-4 h-4 text-zinc-500" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* --- THE BRAIN (Interactive) - Only visible when Explore My Mind is active --- */}
                <motion.div
                    className={`absolute inset-0 z-[20] ${isExploringMind ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    style={{ opacity: combinedBrainOpacity, scale: brainExploreScale, originY: 0.5 }}
                >
                    <div className="absolute inset-0 w-full h-full -translate-y-[10vh]">
                        <HeroSplit forceQuiz={isExploringMind} />
                    </div>
                </motion.div>

                {/* --- CLOSE BUTTON FOR WATCH MODE OR EXPLORE MODE --- */}
                <AnimatePresence>
                    {(isWatching || isExploringMind) && (
                        <motion.button
                            className="absolute top-6 right-6 z-[50] w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer pointer-events-auto"
                            onClick={() => {
                                if (isWatching) exitWatchMode()
                                if (isExploringMind) exitExploreMode()
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>
                    )}
                </AnimatePresence>

            </div>
        </div >
    )
}
