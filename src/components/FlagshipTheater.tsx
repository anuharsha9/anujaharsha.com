'use client'

/**
 * FlagshipTheater — The RC auto-play movie on the landing page.
 * 
 * Full-viewport section that plays a condensed 90-second animated story
 * of the ReportCaster case study. Think: Netflix hero trailer.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'
import Link from 'next/link'
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

const ease = [0.22, 1, 0.36, 1] as const

/* ── The movie sequence ── */
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

export default function FlagshipTheater() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })

    return (
        <section
            ref={ref}
            className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black"
        >
            {/* Background cinematic loop */}
            <div className="absolute inset-0 z-0">
                <AutoPlayStory
                    beats={RC_MOVIE_BEATS}
                    isInView={isInView}
                    autoStart={true}
                    loop={true}
                    fullBleedBackground={true}
                />
            </div>

            {/* Dark gradient overlay so text is legible */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-zinc-950/40 pointer-events-none backdrop-blur-[2px]" />

            {/* Foreground Content */}
            <div className="relative z-20 flex flex-col items-center justify-center px-4 md:px-8 text-center mt-32">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                        <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-amber-400/90 uppercase">
                            Flagship Case Study
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-4">
                        ReportCaster
                    </h2>

                    <p className="text-base md:text-xl text-zinc-300 max-w-xl mx-auto font-light leading-relaxed">
                        Modernizing a 40-year-old mission-critical system to retain enterprise customers.
                    </p>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4, duration: 0.6, ease }}
                >
                    <Link
                        href="/work/reportcaster"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full
                                   bg-white text-black overflow-hidden
                                   hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                    >
                        {/* Hover glow inside button */}
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <Play className="w-4 h-4 text-black fill-black relative z-10" />
                        <span className="text-sm sm:text-base font-bold relative z-10">
                            Watch the Story
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
