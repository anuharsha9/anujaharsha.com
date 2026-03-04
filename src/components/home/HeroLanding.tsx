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
import { SecondaryCaseStudies } from '@/components/timeline/SecondaryCaseStudies'
import { ArrowDown, X, Play, Cog } from 'lucide-react'
import RCTrailer from '@/components/home/RCTrailer'

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

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    const overlayFade = useTransform(watchMode, [0, 1], [1, 0])
    const videoOpacity = useTransform(watchMode, [0, 1], [0.4, 1.0])


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
    // Container: 340vh → scrollable range ≈ 240vh (~2800px on 1168px viewport)
    // Each phase: fade-in → HOLD at full opacity → fade-out

    // Phase 1: Chair Philosophy (0% → 50%) — extended hold, blur-to-focus / focus-to-blur transitions
    const chair1Opacity = useTransform(scrollYProgress, [0.0, 0.38, 0.46], [1, 1, 0])
    const chair1Y = useTransform(scrollYProgress, [0.0, 0.38, 0.46], [0, 0, -40])
    const chair1Blur = useTransform(scrollYProgress, [0.0, 0.38, 0.46], [0, 0, 12])
    const chair1Filter = useMotionTemplate`blur(${chair1Blur}px)`

    const chair2Opacity = useTransform(scrollYProgress, [0.05, 0.10, 0.38, 0.46], [0, 1, 1, 0])
    const chair2Y = useTransform(scrollYProgress, [0.05, 0.10, 0.38, 0.46], [40, 0, 0, -40])
    const chair2Blur = useTransform(scrollYProgress, [0.05, 0.10, 0.38, 0.46], [10, 0, 0, 12])
    const chair2Filter = useMotionTemplate`blur(${chair2Blur}px)`

    const chair3Opacity = useTransform(scrollYProgress, [0.12, 0.18, 0.38, 0.46], [0, 1, 1, 0])
    const chair3Y = useTransform(scrollYProgress, [0.12, 0.18, 0.38, 0.46], [40, 0, 0, -40])
    const chair3Blur = useTransform(scrollYProgress, [0.12, 0.18, 0.38, 0.46], [10, 0, 0, 12])
    const chair3Filter = useMotionTemplate`blur(${chair3Blur}px)`

    const chair4Opacity = useTransform(scrollYProgress, [0.20, 0.26, 0.42, 0.50], [0, 1, 1, 0])
    const chair4Scale = useTransform(scrollYProgress, [0.20, 0.26, 0.42, 0.50], [0.95, 1, 1, 0.97])
    const chair4Blur = useTransform(scrollYProgress, [0.20, 0.26, 0.42, 0.50], [10, 0, 0, 14])
    const chair4Filter = useMotionTemplate`blur(${chair4Blur}px)`

    // Phase 2: Introduction (44% → 98%) — blur-to-focus entry, focus-to-blur exit
    const introOpacity = useTransform(scrollYProgress, [0.44, 0.52, 0.90, 0.98], [0, 1, 1, 0])
    const introY = useTransform(scrollYProgress, [0.44, 0.52, 0.90, 0.98], [50, 0, 0, -40])
    const introBlur = useTransform(scrollYProgress, [0.44, 0.52, 0.90, 0.98], [12, 0, 0, 14])
    const introFilter = useMotionTemplate`blur(${introBlur}px)`

    // Phase 3: CTAs (54% → 98%) — blur-to-focus entry, focus-to-blur exit
    const buttonsOpacity = useTransform(scrollYProgress, [0.54, 0.62, 0.90, 0.98], [0, 1, 1, 0])
    const buttonsScale = useTransform(scrollYProgress, [0.54, 0.62, 0.90, 0.98], [0.85, 1, 1, 0.95])
    const buttonsY = useTransform(scrollYProgress, [0.54, 0.62, 0.90, 0.98], [40, 0, 0, -30])
    const buttonsBlur = useTransform(scrollYProgress, [0.54, 0.62, 0.90, 0.98], [8, 0, 0, 12])
    const buttonsFilterTemplate = useMotionTemplate`blur(${buttonsBlur}px)`

    const buttonsPointerEvents = useTransform(buttonsOpacity, (v) => v > 0.8 ? 'auto' : 'none')

    // Phase 4: Hero container fade-out — reveals CSG block scrolling underneath (same crossfade pattern as chair→bio)
    const heroContainerOpacity = useTransform(scrollYProgress, [0.90, 1.0], [1, 0])

    // Glow ring on primary CTA — pulses once then fades  
    const glowRingScale = useTransform(scrollYProgress, [0.66, 0.74], [0.8, 1.6])
    const glowRingOpacity = useTransform(scrollYProgress, [0.66, 0.70, 0.74], [0, 0.6, 0])

    // Light sweep on primary CTA
    const lightSweepX = useTransform(scrollYProgress, [0.68, 0.78], ['-120%', '120%'])

    const combinedHeroTextOpacity = useTransform(watchMode, [0, 1], [1, 0])

    const enterWatchMode = () => {
        setIsWatching(true)
        setMovieKey(k => k + 1) // Force trailer remount → restart
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

    const enterExploreMode = () => {
        router.push('/quiz')
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isWatching) exitWatchMode()
            }
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

    const hideScrollPrompt = useTransform(scrollYProgress, [0, 0.05], [1, 0])

    return (
        <div ref={containerRef} className="relative w-full z-10" style={{ height: '340vh' }}>
            <motion.div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center" style={{ opacity: heroContainerOpacity }}>

                <motion.div
                    className="absolute inset-0 z-0 bg-[var(--bg-cinematic)] flex items-center justify-center pointer-events-auto"
                    style={{ scale: videoScale, y: videoY, originY: 0, filter: videoFilterTemplate, opacity: videoOpacity }}
                >
                    <div className="w-full h-full">
                        <RCTrailer
                            key={movieKey}
                            showCTA={isWatching}
                            onWatchPresentation={handleWatchPresentation}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.8)_80%,rgba(0,0,0,0.95)_100%)]"
                    style={{ opacity: overlayFade }}
                />



                <motion.div
                    className={`absolute inset-0 z-[15] flex flex-col items-center justify-center pointer-events-none`}
                    style={{ opacity: combinedHeroTextOpacity }}
                >
                    {/* PHASE 1: CHAIR QUOTE */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-6 md:px-12 space-y-8 md:space-y-12 text-center"
                    >
                        <motion.h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/50 will-change-transform" style={{ opacity: chair1Opacity, y: chair1Y, filter: chair1Filter }}>
                            &quot;When you look at a chair...
                        </motion.h3>
                        <motion.h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/70 will-change-transform" style={{ opacity: chair2Opacity, y: chair2Y, filter: chair2Filter }}>
                            ...the only thing that comes to mind is to sit on it.
                        </motion.h3>
                        <motion.h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/90 will-change-transform" style={{ opacity: chair3Opacity, y: chair3Y, filter: chair3Filter }}>
                            Good UX should feel exactly like that.
                        </motion.h3>
                        <motion.h3
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-300 to-slate-500 mt-8 will-change-transform"
                            style={{ opacity: chair4Opacity, scale: chair4Scale, filter: chair4Filter }}
                        >
                            Effortless.&quot;
                        </motion.h3>
                    </motion.div>

                    {/* PHASE 2 & 3: INTRODUCTION & CTAS */}
                    <div id="bio" className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-6">
                        <motion.div
                            className="flex flex-col items-center text-center max-w-4xl will-change-transform"
                            style={{ opacity: introOpacity, y: introY, filter: introFilter }}
                        >
                            <span className="text-[var(--accent-teal)] font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.4em] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Senior Product Designer</span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-[-0.02em] font-sans mb-6">
                                <span className="text-white drop-shadow-md">Hi, I&apos;m </span>
                                <span className="bg-[linear-gradient(118deg,#ffffff_0%,#eafcff_28%,#9ceaf2_56%,#2fc6d5_80%,var(--accent-teal)_100%)] bg-clip-text text-transparent">Anuja</span>
                            </h1>
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
                                filter: buttonsFilterTemplate,
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

                {/* --- CLOSE BUTTON FOR WATCH MODE --- */}
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
        </div >
    )
}
