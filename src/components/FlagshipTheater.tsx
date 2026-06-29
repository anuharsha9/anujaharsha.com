'use client'

/**
 * FlagshipTheater — Sequential case study movie experience.
 * 
 * Flow: RC auto-plays → shows ML tile → user clicks play → ML auto-plays →
 * shows IQ tile → user clicks play → IQ auto-plays → loops back to RC.
 * 
 * X button always visible in top-right to skip/exit current movie.
 */

import { useRef, useState, useCallback } from 'react'
import { m, AnimatePresence, useInView } from 'framer-motion'
import { Play, X } from 'lucide-react'
import TransitionLink from '@/components/transitions/TransitionLink'
import AutoPlayStory, { type MovieBeat } from './case-study/storyboard/AutoPlayStory'
import {
    MovieBeatAssignment,
    MovieBeatDiscovery,
    MovieBeatChaos,
    MovieBeatPivots,
    MovieBeatBreakthrough,
    MovieBeatExecution,
    MovieBeatScale,
    MovieBeatShipped,
} from './case-study/storyboard/RCMovieBeats'
import { ML_MOVIE_BEATS } from './case-study/storyboard/MLMovieBeats'
import { DSML_MOVIE_BEATS } from './case-study/storyboard/DSMLMovieBeats'
import { EASE_CINEMATIC as ease } from '@/lib/motion'

const MOVIE_PACE = 1.72
const d = (ms: number) => Math.round(ms * MOVIE_PACE)

/* ── RC movie beats ── */
const RC_MOVIE_BEATS: MovieBeat[] = [
    {
        id: 'assignment',
        duration: d(7600),
        label: 'The Business Problem',
        signal: 'CUSTOMER LOSS',
        narration: 'The platform\'s enterprise scheduler — powering 20M+ weekly jobs — hadn\'t been updated in 40 years.',
        narrationDelay: 0.1,
        component: <MovieBeatAssignment />,
    },
    {
        id: 'discovery',
        duration: d(7600),
        label: 'Discovery Arc',
        signal: 'SYSTEM ARCHAEOLOGY',
        narration: 'I volunteered one week in and mapped 5 undocumented subsystems from scratch.',
        narrationDelay: 0.1,
        component: <MovieBeatDiscovery />,
    },
    {
        id: 'chaos',
        duration: d(8600),
        label: 'The Chaos',
        signal: 'LEGACY DEBT',
        narration: '5 fragmented sub-products. Zero documentation. 4 clicks just to start a task.',
        narrationDelay: 0.05,
        component: <MovieBeatChaos />,
    },
    {
        id: 'pivots',
        duration: d(8400),
        label: 'Three Pivots',
        signal: 'ITERATION',
        narration: 'V1 rejected. V2 rejected. V3 — the breakthrough.',
        narrationDelay: 0.08,
        component: <MovieBeatPivots />,
    },
    {
        id: 'breakthrough',
        duration: d(9000),
        label: 'The Breakthrough',
        signal: 'UNIFIED HUB',
        narration: 'Three workflows. One button. Zero context switching.',
        narrationDelay: 0.06,
        component: <MovieBeatBreakthrough />,
    },
    {
        id: 'execution',
        duration: d(8400),
        label: 'Execution Arc',
        signal: 'RECURRENCE ENGINE',
        narration: 'Users memorized cryptic codes for 40 years. I made them human-readable.',
        narrationDelay: 0.06,
        component: <MovieBeatExecution />,
    },
    {
        id: 'scale',
        duration: d(7600),
        label: '250 Screens',
        signal: 'SCALE + HANDOFF',
        narration: 'I independently mapped the entire system and aligned a 20-person cross-functional team.',
        narrationDelay: 0.1,
        component: <MovieBeatScale />,
    },
    {
        id: 'shipped',
        duration: d(10400),
        label: 'Shipped + Impact',
        signal: 'OUTCOME',
        narration: 'Customers retained. Brand-new integrated system. Shipped April 2024.',
        narrationDelay: 0.08,
        component: <MovieBeatShipped />,
    },
]

/* ── Phase types ── */
type Phase =
    | 'rc-playing'
    | 'ml-prompt'
    | 'ml-playing'
    | 'iq-prompt'
    | 'iq-playing'

/* ── Case study info for interstitial cards ── */
const CASE_STUDIES = {
    ml: {
        title: 'ML Functions',
        subtitle: 'Democratizing machine learning for non-technical users',
        accent: '#2fc6d5',
        accentRgb: 'var(--accent-teal-glow-rgb)',
        link: '/work/ml-functions',
        eyebrow: 'Up Next',
    },
    iq: {
        title: 'IQ Discovery Hub',
        subtitle: 'Making invisible AI features visible through a unified hub',
        accent: '#a855f7',
        accentRgb: 'var(--semantic-purple-rgb)',
        link: '/work/iq-plugin',
        eyebrow: 'Up Next',
    },
}

/* ── Interstitial "Up Next" card ── */
function UpNextCard({
    study,
    onPlay,
}: {
    study: typeof CASE_STUDIES.ml
    onPlay: () => void
}) {
    return (
        <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease }}
            className="relative z-20 flex flex-col items-center justify-center text-center px-4 md:px-8"
        >
            {/* Eyebrow */}
            <m.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease }}
                className="flex items-center justify-center gap-2 mb-6"
            >
                <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: study.accent, boxShadow: `0 0 10px ${study.accent}50` }}
                />
                <span
                    className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase"
                    style={{ color: `${study.accent}dd` }}
                >
                    {study.eyebrow}
                </span>
            </m.div>

            {/* Title */}
            <m.h2
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.3, duration: 0.7, ease }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-4"
            >
                {study.title}
            </m.h2>

            {/* Subtitle */}
            <m.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease }}
                className="text-base md:text-lg text-zinc-400 max-w-lg mx-auto font-light leading-relaxed mb-8"
            >
                {study.subtitle}
            </m.p>

            {/* Play button */}
            <m.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5, ease }}
                onClick={onPlay}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden
                           hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{
                    backgroundColor: study.accent,
                    color: '#000',
                    boxShadow: `0 0 40px ${study.accent}30`,
                }}
            >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Play className="w-4 h-4 fill-current relative z-10" />
                <span className="text-sm sm:text-base font-bold relative z-10">
                    Watch the Story
                </span>
            </m.button>

            {/* Or skip to case study */}
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-4"
            >
                <TransitionLink
                    href={study.link}
                    className="text-xs font-mono text-zinc-500 hover:text-zinc-200 transition-colors underline underline-offset-4"
                >
                    or skip to full case study →
                </TransitionLink>
            </m.div>
        </m.div>
    )
}

/* ── Main Theater ── */
export default function FlagshipTheater() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const [phase, setPhase] = useState<Phase>('rc-playing')

    const handleRCComplete = useCallback(() => {
        setPhase('ml-prompt')
    }, [])

    const handleMLPlay = useCallback(() => {
        setPhase('ml-playing')
    }, [])

    const handleMLComplete = useCallback(() => {
        setPhase('iq-prompt')
    }, [])

    const handleIQPlay = useCallback(() => {
        setPhase('iq-playing')
    }, [])

    const handleIQComplete = useCallback(() => {
        // Loop back to RC
        setPhase('rc-playing')
    }, [])

    const handleClose = useCallback(() => {
        // Reset to RC
        setPhase('rc-playing')
    }, [])

    const isPlaying = phase === 'rc-playing' || phase === 'ml-playing' || phase === 'iq-playing'
    const isPrompt = phase === 'ml-prompt' || phase === 'iq-prompt'

    // Determine which beats + callbacks to use
    const currentBeats = phase === 'ml-playing' ? ML_MOVIE_BEATS
        : phase === 'iq-playing' ? DSML_MOVIE_BEATS
            : RC_MOVIE_BEATS

    const currentComplete = phase === 'ml-playing' ? handleMLComplete
        : phase === 'iq-playing' ? handleIQComplete
            : handleRCComplete

    // Determine accent for active movie background glow
    const activeAccent = phase === 'ml-playing' ? 'var(--accent-teal-glow-rgb)'
        : phase === 'iq-playing' ? 'var(--semantic-purple-rgb)'
            : '245, 158, 11'

    return (
        <section
            ref={ref}
            className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
        >
            {/* ── X Close Button — always visible ── */}
            <AnimatePresence>
                {(phase !== 'rc-playing') && (
                    <m.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease }}
                        onClick={handleClose}
                        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md
                                   flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer
                                   border border-white/10"
                        aria-label="Close and return to ReportCaster"
                    >
                        <X className="w-4 h-4 text-white" />
                    </m.button>
                )}
            </AnimatePresence>

            {/* ── Background movie (plays during playing phases) ── */}
            <AnimatePresence mode="wait">
                {isPlaying && (
                    <m.div
                        key={phase}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-0"
                    >
                        <AutoPlayStory
                            beats={currentBeats}
                            isInView={isInView}
                            autoStart={true}
                            loop={false}
                            onComplete={currentComplete}
                            fullBleedBackground={true}
                        />
                    </m.div>
                )}
            </AnimatePresence>

            {/* ── Subtle ambient glow for prompt states ── */}
            {isPrompt && (
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: phase === 'ml-prompt'
                            ? `radial-gradient(ellipse at 50% 60%, rgba(${CASE_STUDIES.ml.accentRgb}, 0.06) 0%, transparent 70%)`
                            : `radial-gradient(ellipse at 50% 60%, rgba(${CASE_STUDIES.iq.accentRgb}, 0.06) 0%, transparent 70%)`,
                    }}
                />
            )}

            {/* ── Dark gradient overlay for legibility during play ── */}
            {isPlaying && (
                <>
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 z-10 bg-zinc-950/40 pointer-events-none backdrop-blur-[2px]" />
                </>
            )}

            {/* ── Foreground Content ── */}
            <AnimatePresence mode="wait">
                {/* RC Playing — show RC card */}
                {phase === 'rc-playing' && (
                    <m.div
                        key="rc-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease }}
                        className="relative z-20 flex flex-col items-center justify-center px-4 md:px-8 text-center mt-32"
                    >
                        <div className="mb-8">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_var(--overlay-amber-50)]" />
                                <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-amber-400/90 uppercase">
                                    Flagship Case Study
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-4">
                                ReportCaster
                            </h2>

                            <p className="text-base md:text-xl text-zinc-200 max-w-xl mx-auto font-light leading-relaxed">
                                Modernizing a 40-year-old mission-critical system to retain enterprise customers.
                            </p>
                        </div>

                        {/* CTA */}
                        <div>
                            <TransitionLink
                                href="/work/reportcaster"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full
                                           bg-white text-black overflow-hidden
                                           hover:scale-105 transition-all duration-300 shadow-[0_0_40px_var(--overlay-white-20)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Play className="w-4 h-4 text-black fill-black relative z-10" />
                                <span className="text-sm sm:text-base font-bold relative z-10">
                                    Watch the Story
                                </span>
                            </TransitionLink>
                        </div>
                    </m.div>
                )}

                {/* ML Prompt */}
                {phase === 'ml-prompt' && (
                    <m.div key="ml-prompt" className="relative z-20">
                        <UpNextCard study={CASE_STUDIES.ml} onPlay={handleMLPlay} />
                    </m.div>
                )}

                {/* ML Playing — show ML title overlay */}
                {phase === 'ml-playing' && (
                    <m.div
                        key="ml-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease }}
                        className="relative z-20 flex flex-col items-center justify-center px-4 md:px-8 text-center mt-32"
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: CASE_STUDIES.ml.accent }} />
                            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase" style={{ color: `${CASE_STUDIES.ml.accent}dd` }}>
                                Now Playing
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-4">
                            {CASE_STUDIES.ml.title}
                        </h2>
                        <p className="text-base md:text-xl text-zinc-200 max-w-xl mx-auto font-light leading-relaxed">
                            {CASE_STUDIES.ml.subtitle}
                        </p>
                    </m.div>
                )}

                {/* IQ Prompt */}
                {phase === 'iq-prompt' && (
                    <m.div key="iq-prompt" className="relative z-20">
                        <UpNextCard study={CASE_STUDIES.iq} onPlay={handleIQPlay} />
                    </m.div>
                )}

                {/* IQ Playing — show IQ title overlay */}
                {phase === 'iq-playing' && (
                    <m.div
                        key="iq-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease }}
                        className="relative z-20 flex flex-col items-center justify-center px-4 md:px-8 text-center mt-32"
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: CASE_STUDIES.iq.accent }} />
                            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase" style={{ color: `${CASE_STUDIES.iq.accent}dd` }}>
                                Now Playing
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-4">
                            {CASE_STUDIES.iq.title}
                        </h2>
                        <p className="text-base md:text-xl text-zinc-200 max-w-xl mx-auto font-light leading-relaxed">
                            {CASE_STUDIES.iq.subtitle}
                        </p>
                    </m.div>
                )}
            </AnimatePresence>

            {/* ── Accent glow border during non-RC movies ── */}
            {(phase === 'ml-playing' || phase === 'iq-playing') && (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        boxShadow: `inset 0 0 80px rgba(${activeAccent}, 0.04)`,
                    }}
                />
            )}
        </section>
    )
}
