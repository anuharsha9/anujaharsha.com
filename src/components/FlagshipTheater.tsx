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
const MOVIE_PACE = 1.28
const d = (ms: number) => Math.round(ms * MOVIE_PACE)

/* ── The movie sequence ── */
const RC_MOVIE_BEATS: MovieBeat[] = [
    {
        id: 'assignment',
        duration: d(7600),
        label: 'The Business Problem',
        signal: 'CUSTOMER LOSS',
        narration: 'The platform\'s enterprise scheduler — powering 20M+ weekly jobs — was losing customers.',
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
        signal: 'FEATURE SYSTEM',
        narration: 'Consolidated 3 workflows into one "+" menu. Reduced creation clicks from 4 to 2.',
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
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_var(--overlay-amber-50)]" />
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
                                   hover:scale-105 transition-all duration-300 shadow-[0_0_40px_var(--overlay-white-20)]"
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
