'use client'

import React, { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    AnimatePresence,
    animate as fmAnimate,
    useMotionTemplate,
    useReducedMotion
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

type IntroPhase = 'void' | 'anchor' | 'pull' | 'form' | 'settled'

type AmbientGear = {
    id: string
    size: number
    direction: 1 | -1
    void: { x: number, y: number }
    anchor: { x: number, y: number }
    cluster: { x: number, y: number }
    drift: { x: number, y: number, duration: number }
}

const INTRO_MILESTONES = {
    anchor: 1000,
    pull: 1800,
    form: 2200,
    settled: 2400,
} as const

const AMBIENT_GEARS: AmbientGear[] = [
    {
        id: 'g-alpha',
        size: 84,
        direction: 1,
        void: { x: -70, y: -48 },
        anchor: { x: -224, y: -74 },
        cluster: { x: -14, y: -10 },
        drift: { x: 9, y: 8, duration: 7.8 },
    },
    {
        id: 'g-beta',
        size: 68,
        direction: -1,
        void: { x: 42, y: -62 },
        anchor: { x: 214, y: -60 },
        cluster: { x: 14, y: -8 },
        drift: { x: 7, y: 10, duration: 7.2 },
    },
    {
        id: 'g-gamma',
        size: 72,
        direction: 1,
        void: { x: -26, y: 44 },
        anchor: { x: -174, y: 88 },
        cluster: { x: -8, y: 14 },
        drift: { x: 8, y: 7, duration: 8.1 },
    },
    {
        id: 'g-delta',
        size: 62,
        direction: -1,
        void: { x: 78, y: 30 },
        anchor: { x: 182, y: 92 },
        cluster: { x: 11, y: 11 },
        drift: { x: 6, y: 8, duration: 6.9 },
    },
]

const HERO_KICKER = ['Senior', 'Product', 'Designer'] as const

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
    const heroOverlayRef = useRef<HTMLDivElement>(null)
    const exploreIconAnchorRef = useRef<HTMLSpanElement>(null)

    const [isWatching, setIsWatching] = useState(false)
    const watchMode = useMotionValue(0) // 0 = normal, 1 = watching
    const [isExploringMind, setIsExploringMind] = useState(false)
    const exploreMode = useMotionValue(0) // 0 = normal, 1 = exploring

    const [introPhase, setIntroPhase] = useState<IntroPhase>('void')
    const [assemblyTarget, setAssemblyTarget] = useState({ x: 156, y: 112 })
    const [spreadScale, setSpreadScale] = useState(1)

    const prefersReducedMotion = useReducedMotion()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    })

    // We fade the brain in only when exploreMode is active
    const combinedBrainOpacity = useTransform(exploreMode, [0, 1], [0, 1])
    const brainExploreScale = useTransform(exploreMode, [0, 1], [0.8, 1])

    // Content fade in (Stats + Case Studies)
    const scrollContentOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1])
    const contentY = useTransform(scrollYProgress, [0.25, 0.45], [40, 0])
    const watchContentFade = useTransform(watchMode, [0, 1], [1, 0])
    const watchContentLift = useTransform(watchMode, [0, 1], [0, -36])
    const combinedScrollContentOpacity = useTransform(
        [scrollContentOpacity, watchContentFade],
        ([scrollOpacity, watchFade]) => (scrollOpacity as number) * (watchFade as number)
    )
    const combinedScrollContentY = useTransform(
        [contentY, watchContentLift],
        ([scrollYOffset, watchLift]) => (scrollYOffset as number) + (watchLift as number)
    )
    const secondaryPointerEvents = useTransform(
        [scrollYProgress, watchMode, exploreMode],
        ([scrollProgress, watchProgress, exploreProgress]) =>
            ((scrollProgress as number) > 0.28 && (watchProgress as number) < 0.01 && (exploreProgress as number) < 0.01)
                ? 'auto'
                : 'none'
    )

    const overlayFade = useTransform(watchMode, [0, 1], [1, 0])
    const videoOpacity = useTransform(watchMode, [0, 1], [0.4, 1.0])
    const heroTextScale = useTransform(watchMode, [0, 1], [1, 0.92])
    const heroTextY = useTransform(watchMode, [0, 1], [0, -72])
    const heroTextBlur = useTransform(watchMode, [0, 1], [0, 9])
    const heroTextFilterTemplate = useMotionTemplate`blur(${heroTextBlur}px)`

    // Additional overlay when exploring the brain to dim the background further
    const brainOverlayFade = useTransform(exploreMode, [0, 1], [0, 0.8])

    // Video parallax/scale effect on scroll with cinematic watch-mode recentering.
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

    // The background video is normally blurred. But when watching, it comes to focus.
    const videoBlur = useTransform(watchMode, [0, 1], [28, 0])
    const videoBrightness = useTransform(watchMode, [0, 1], [0.42, 1])
    const videoSaturation = useTransform(watchMode, [0, 1], [0.72, 1])
    const videoContrast = useTransform(watchMode, [0, 1], [0.9, 1.04])
    const videoFilterTemplate = useMotionTemplate`blur(${videoBlur}px) brightness(${videoBrightness}) saturate(${videoSaturation}) contrast(${videoContrast})`

    const heroScrollOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
    const heroExploreFade = useTransform(exploreMode, [0, 1], [1, 0])
    const heroWatchFade = useTransform(watchMode, [0, 1], [1, 0])

    const combinedHeroTextOpacity = useTransform(
        // The hero text fades out on scroll, and completely in watch/explore modes.
        [heroScrollOpacity, heroExploreFade, heroWatchFade],
        ([scrollFade, exploreFade, watchFade]) => (scrollFade as number) * (exploreFade as number) * (watchFade as number)
    )

    const syncAssemblyGeometry = useCallback(() => {
        const stage = heroOverlayRef.current
        const iconAnchor = exploreIconAnchorRef.current
        if (!stage || !iconAnchor) return

        const stageRect = stage.getBoundingClientRect()
        const anchorRect = iconAnchor.getBoundingClientRect()

        const nextTarget = {
            x: anchorRect.left + anchorRect.width / 2 - (stageRect.left + stageRect.width / 2),
            y: anchorRect.top + anchorRect.height / 2 - (stageRect.top + stageRect.height / 2),
        }

        const nextSpread = Math.max(0.56, Math.min(1, stageRect.width / 1280))

        setAssemblyTarget((prev) => (
            Math.abs(prev.x - nextTarget.x) < 0.5 && Math.abs(prev.y - nextTarget.y) < 0.5
                ? prev
                : nextTarget
        ))

        setSpreadScale((prev) => (Math.abs(prev - nextSpread) < 0.01 ? prev : nextSpread))
    }, [])

    const enterWatchMode = useCallback(() => {
        setIsWatching(true)
        fmAnimate(watchMode, 1, { duration: 0.6, ease: [0.4, 0, 0.2, 1] })
    }, [watchMode])

    const exitWatchMode = useCallback(() => {
        setIsWatching(false)
        fmAnimate(watchMode, 0, { duration: 0.6, ease: [0.4, 0, 0.2, 1] })
    }, [watchMode])

    const enterExploreMode = useCallback(() => {
        setIsExploringMind(true)
        fmAnimate(exploreMode, 1, { duration: 0.8, ease: [0.22, 1, 0.36, 1] })
    }, [exploreMode])

    const exitExploreMode = useCallback(() => {
        setIsExploringMind(false)
        fmAnimate(exploreMode, 0, { duration: 0.6, ease: [0.22, 1, 0.36, 1] })
    }, [exploreMode])

    useEffect(() => {
        if (prefersReducedMotion) {
            setIntroPhase('settled')
            return
        }

        setIntroPhase('void')

        const timers = [
            window.setTimeout(() => setIntroPhase('anchor'), INTRO_MILESTONES.anchor),
            window.setTimeout(() => setIntroPhase('pull'), INTRO_MILESTONES.pull),
            window.setTimeout(() => setIntroPhase('form'), INTRO_MILESTONES.form),
            window.setTimeout(() => setIntroPhase('settled'), INTRO_MILESTONES.settled),
        ]

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer))
        }
    }, [prefersReducedMotion])

    useLayoutEffect(() => {
        syncAssemblyGeometry()

        const observer = typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(() => syncAssemblyGeometry())
            : null

        if (observer && heroOverlayRef.current) observer.observe(heroOverlayRef.current)
        if (observer && exploreIconAnchorRef.current) observer.observe(exploreIconAnchorRef.current)

        window.addEventListener('resize', syncAssemblyGeometry)
        return () => {
            observer?.disconnect()
            window.removeEventListener('resize', syncAssemblyGeometry)
        }
    }, [syncAssemblyGeometry])

    useEffect(() => {
        syncAssemblyGeometry()
    }, [syncAssemblyGeometry, introPhase])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isWatching) exitWatchMode()
                if (isExploringMind) exitExploreMode()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isWatching, exitWatchMode, isExploringMind, exitExploreMode])

    useEffect(() => {
        if (isWatching || isExploringMind) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isWatching, isExploringMind])

    const isTextVisible = prefersReducedMotion || introPhase !== 'void'
    const isConverging = introPhase === 'pull' || introPhase === 'form' || introPhase === 'settled'
    const isRightButtonReady = prefersReducedMotion || introPhase === 'form' || introPhase === 'settled'
    const isLeftButtonReady = prefersReducedMotion || introPhase === 'settled'
    const isMorphing = introPhase === 'form'
    const showMatchSweep = !prefersReducedMotion && (introPhase === 'pull' || introPhase === 'form')

    return (
        <div ref={containerRef} className="relative w-full z-10" style={{ height: '300vh' }}>
            {/* STICKY STAGE */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">

                {/* --- BACKGROUND ANIMATED MOVIE --- */}
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

                {/* Dark overlay that dims the video and fades out on watchMode (Allows Hero text to be readable) */}
                <motion.div
                    className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.8)_80%,rgba(0,0,0,0.95)_100%)]"
                    style={{
                        opacity: overlayFade,
                    }}
                />

                {/* Additional deep dark overlay specifically for the interactive Brain mode */}
                <motion.div
                    className="absolute inset-0 z-[2] pointer-events-none bg-black"
                    style={{
                        opacity: brainOverlayFade,
                    }}
                />

                {/* --- HERO TEXT (Fades out quickly on scroll, and on watch OR explore) --- */}
                <motion.div
                    ref={heroOverlayRef}
                    className={`absolute inset-0 z-[15] flex flex-col items-center justify-center pt-[10vh] ${isWatching ? 'pointer-events-none' : 'pointer-events-auto'}`}
                    style={{ opacity: combinedHeroTextOpacity, scale: heroTextScale, y: heroTextY, filter: heroTextFilterTemplate }}
                >
                    {/* Ambient gears that become the Explore CTA icon */}
                    <div className="pointer-events-none absolute inset-0">
                        {AMBIENT_GEARS.map((gear, index) => {
                            const clusterScale = spreadScale < 0.72 ? 0.84 : 1

                            const pose = introPhase === 'void'
                                ? { x: gear.void.x * spreadScale, y: gear.void.y * spreadScale }
                                : introPhase === 'anchor'
                                    ? { x: gear.anchor.x * spreadScale, y: gear.anchor.y * spreadScale }
                                    : {
                                        x: assemblyTarget.x + gear.cluster.x * clusterScale,
                                        y: assemblyTarget.y + gear.cluster.y * clusterScale,
                                    }

                            const shouldDrift = !prefersReducedMotion && (introPhase === 'void' || introPhase === 'anchor')

                            return (
                                <motion.div
                                    key={gear.id}
                                    className="absolute left-1/2 top-1/2 will-change-transform"
                                    animate={{
                                        x: pose.x,
                                        y: pose.y,
                                        scale: isConverging ? 0.78 : 1,
                                        opacity: isRightButtonReady ? 0 : 0.92,
                                        filter: isConverging ? 'blur(0px)' : 'blur(1.5px)',
                                    }}
                                    transition={{
                                        duration: isConverging ? 0.62 : 1.05,
                                        ease: isConverging ? [0.16, 1, 0.3, 1] : [0.22, 1, 0.36, 1],
                                        delay: isConverging ? index * 0.04 : index * 0.08,
                                    }}
                                >
                                    <motion.div
                                        animate={shouldDrift
                                            ? {
                                                x: [0, gear.drift.x, -gear.drift.x * 0.85, 0],
                                                y: [0, -gear.drift.y, gear.drift.y * 0.7, 0],
                                                rotate: [0, gear.direction * 90, gear.direction * 180, gear.direction * 270],
                                            }
                                            : {
                                                x: 0,
                                                y: 0,
                                                rotate: isConverging ? gear.direction * 120 : 0,
                                            }
                                        }
                                        transition={shouldDrift
                                            ? {
                                                duration: gear.drift.duration,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            }
                                            : {
                                                duration: 0.45,
                                                ease: [0.22, 1, 0.36, 1],
                                            }
                                        }
                                        className="will-change-transform"
                                    >
                                        <div
                                            className="relative flex items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-400/[0.08] backdrop-blur-sm shadow-[0_0_24px_rgba(0,229,255,0.22)]"
                                            style={{ width: gear.size, height: gear.size }}
                                        >
                                            <Cog className="h-[62%] w-[62%] text-cyan-300/95" strokeWidth={1.8} />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </div>

                    <motion.div
                        className="relative z-10 flex flex-col items-center text-center space-y-6 px-4"
                        initial={false}
                        animate={isTextVisible
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 12 }
                        }
                        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="relative flex flex-wrap justify-center items-center gap-3 sm:gap-4 px-4 overflow-hidden">
                            {HERO_KICKER.map((word, index) => (
                                <motion.p
                                    key={word}
                                    className="text-[var(--accent-teal)] font-sans font-bold text-[10px] sm:text-xs md:text-sm lg:text-base uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                                    initial={false}
                                    animate={isTextVisible
                                        ? {
                                            y: 0,
                                            opacity: 1,
                                            filter: 'blur(0px)',
                                            letterSpacing: '0.34em',
                                        }
                                        : {
                                            y: 16,
                                            opacity: 0,
                                            filter: 'blur(8px)',
                                            letterSpacing: '0.52em',
                                        }
                                    }
                                    transition={{
                                        duration: 0.58,
                                        ease: [0.16, 1, 0.3, 1],
                                        delay: isTextVisible ? 0.06 + index * 0.08 : 0
                                    }}
                                >
                                    {word}
                                </motion.p>
                            ))}
                        </div>

                        <h2 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-extrabold text-white leading-[1.1] tracking-[-0.03em] font-sans flex flex-col sm:flex-row items-center justify-center gap-x-3 sm:gap-x-4 lg:gap-x-6 mt-4">
                            <span className="overflow-hidden pb-1">
                                <motion.span
                                    className="block text-white drop-shadow-md"
                                    initial={false}
                                    animate={isTextVisible
                                        ? { y: '0%', x: 0, opacity: 1, filter: 'blur(0px)' }
                                        : { y: '112%', x: '-8%', opacity: 0, filter: 'blur(8px)' }
                                    }
                                    transition={{ duration: 0.86, ease: [0.16, 1, 0.3, 1], delay: isTextVisible ? 0.12 : 0 }}
                                >
                                    13 Years.
                                </motion.span>
                            </span>
                            <span className="overflow-hidden pb-1">
                                <motion.span
                                    className="inline-block bg-[linear-gradient(118deg,#ffffff_0%,#eafcff_28%,#9ceaf2_56%,#2fc6d5_80%,#078B9C_100%)] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(20,184,200,0.22)]"
                                    initial={false}
                                    animate={isTextVisible
                                        ? { y: '0%', x: 0, opacity: 1, filter: 'blur(0px)' }
                                        : { y: '112%', x: '8%', opacity: 0, filter: 'blur(8px)' }
                                    }
                                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: isTextVisible ? 0.22 : 0 }}
                                >
                                    One Goal.
                                </motion.span>
                            </span>

                            <AnimatePresence mode="wait">
                                {showMatchSweep && (
                                    <motion.span
                                        key={`match-sweep-${introPhase}`}
                                        className="pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-[17rem] sm:w-[20rem] md:w-[24rem] rounded-full bg-[linear-gradient(90deg,transparent,rgba(232,252,255,0.96),rgba(7,139,156,0.86),transparent)] blur-[0.3px]"
                                        initial={{ opacity: 0, scaleX: 0.2, x: '-65%', y: '28px' }}
                                        animate={{ opacity: [0, 1, 0], scaleX: [0.2, 1, 0.25], x: ['-65%', '34%', '68%'], y: '28px' }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1], times: [0, 0.45, 1] }}
                                        aria-hidden="true"
                                    />
                                )}
                            </AnimatePresence>
                        </h2>

                        <motion.div
                            className="mt-8 grid w-full max-w-[42rem] grid-cols-1 gap-4 sm:grid-cols-2 pointer-events-auto"
                            initial={false}
                            animate={isTextVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                            transition={{ duration: 0.48, delay: isTextVisible ? 0.26 : 0, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.button
                                onClick={enterWatchMode}
                                className="group order-2 sm:order-1 relative inline-flex h-14 w-full items-center justify-center gap-3 rounded-full border border-white bg-white px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-500 hover:bg-black hover:text-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] sm:w-auto sm:min-w-[17.5rem]"
                                initial={false}
                                animate={{
                                    opacity: isLeftButtonReady ? 1 : 0,
                                    x: isLeftButtonReady ? 0 : -28,
                                    y: isLeftButtonReady ? 0 : 22,
                                }}
                                transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                                style={{ pointerEvents: isLeftButtonReady ? 'auto' : 'none' }}
                            >
                                <Play className="w-4 h-4 fill-current transition-transform duration-500 group-hover:scale-110" />
                                <span>Flagship Case Study</span>
                            </motion.button>

                            <motion.button
                                onClick={enterExploreMode}
                                className="group order-1 sm:order-2 relative inline-flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-transparent px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] sm:w-auto sm:min-w-[17.5rem]"
                                initial={false}
                                animate={{
                                    y: isRightButtonReady ? 0 : 12,
                                    opacity: isRightButtonReady ? 1 : 0,
                                }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                style={{ pointerEvents: isRightButtonReady ? 'auto' : 'none' }}
                            >
                                <motion.span
                                    className="absolute inset-0 rounded-full bg-white/[0.03] backdrop-blur-md"
                                    initial={false}
                                    animate={{ opacity: isRightButtonReady ? 1 : 0 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                />

                                <svg viewBox="0 0 332 56" preserveAspectRatio="none" className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true">
                                    <motion.rect
                                        x="0.75"
                                        y="0.75"
                                        width="330.5"
                                        height="54.5"
                                        rx="27.25"
                                        fill="transparent"
                                        stroke="rgba(255,255,255,0.46)"
                                        strokeWidth="1"
                                        vectorEffect="non-scaling-stroke"
                                        strokeLinecap="round"
                                        initial={false}
                                        animate={{
                                            pathLength: isRightButtonReady ? 1 : 0,
                                            opacity: isRightButtonReady ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                </svg>

                                <span ref={exploreIconAnchorRef} className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center">
                                    <motion.span
                                        className="absolute inset-0 flex items-center justify-center"
                                        initial={false}
                                        animate={isRightButtonReady
                                            ? {
                                                opacity: 1,
                                                scale: isMorphing ? [0.65, 1.12, 1] : 1,
                                                rotate: isMorphing ? [0, 24, 0] : 0,
                                            }
                                            : {
                                                opacity: 0,
                                                scale: 0.2,
                                                rotate: -18,
                                            }
                                        }
                                        transition={{ duration: isMorphing ? 0.46 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <InterlockedGearGlyph className="group-hover:[animation:gear-spin_1.8s_linear_infinite]" />
                                    </motion.span>
                                </span>

                                <motion.span
                                    className="relative z-10"
                                    initial={false}
                                    animate={{
                                        opacity: isRightButtonReady ? 1 : 0,
                                        x: isRightButtonReady ? 0 : 10,
                                    }}
                                    transition={{ duration: 0.36, delay: isRightButtonReady ? 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    Explore My Mind
                                </motion.span>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* SCROLL INDICATOR */}
                    <motion.div
                        className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center gap-4 w-full"
                        initial={false}
                        animate={{
                            opacity: isLeftButtonReady ? 1 : 0,
                            y: isLeftButtonReady ? 0 : 12,
                        }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-[0.4em] flex flex-wrap justify-center px-4">
                            SCROLL TO FIND OUT THE GOAL.
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


                {/* --- SECONDARY CASE STUDIES & STATS (Fades in on scroll) --- */}
                <motion.div
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
                    style={{ opacity: combinedScrollContentOpacity, y: combinedScrollContentY }}
                >
                    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 space-y-12">

                        {/* Secondary Case Studies */}
                        <motion.div
                            className="w-full max-w-6xl mx-auto"
                            style={{ pointerEvents: secondaryPointerEvents }}
                        >
                            <SecondaryCaseStudies />
                        </motion.div>
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
