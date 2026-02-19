'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface Pivot {
    version: string
    title: string
    desc: string
    verdict: 'rejected' | 'accepted'
    reason: string
}

const PIVOTS: Pivot[] = [
    {
        version: 'V1',
        title: 'Independent Product',
        desc: 'I designed it as a standalone product — consistent with how the platform handled other complex tools.',
        verdict: 'rejected',
        reason: '"Leadership wants all workflows centralized in the Hub."',
    },
    {
        version: 'V2',
        title: 'Hub Plugin',
        desc: 'I embedded it as a plugin in the Hub, with its own icon on the side nav. I loved this version the most.',
        verdict: 'rejected',
        reason: '"Too much engineering effort. Too big of an addition this year."',
    },
]


export default function BeatThreePivots() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout)
        timers.current = []
    }, [])

    const play = useCallback(() => {
        clear()
        setPhase(-1)
        // Phase 0: Speech bubble
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1: V1 appears
        timers.current.push(setTimeout(() => setPhase(1), 1200))
        // Phase 2: V1 rejected
        timers.current.push(setTimeout(() => setPhase(2), 2400))
        // Phase 3: V2 appears
        timers.current.push(setTimeout(() => setPhase(3), 3600))
        // Phase 4: V2 rejected
        timers.current.push(setTimeout(() => setPhase(4), 4800))
        // Phase 5: Closer — "I failed twice fast."
        timers.current.push(setTimeout(() => setPhase(5), 6200))
    }, [clear])

    useEffect(() => {
        if (isInView) play()
        else {
            clear()
            setPhase(-1)
        }
        return clear
    }, [isInView, play, clear])

    const getPivotPhase = (i: number) => {
        // V1: appears at 1, verdict at 2
        // V2: appears at 3, verdict at 4
        const appearPhase = i * 2 + 1
        const verdictPhase = i * 2 + 2
        return { appearPhase, verdictPhase }
    }

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    {/* Presenter narration */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <PresenterBar>
                                    <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed">
                                        <span className="text-red-400 font-medium">V1 — rejected.</span>{' '}
                                        <span className="text-red-400 font-medium">V2 — rejected.</span>
                                    </p>
                                    <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed mt-2">
                                        Instead of fighting the decisions,{' '}
                                        <span className="text-zinc-200 font-medium">I reframed the problem from scratch.</span>
                                    </p>
                                    <p className="text-sm md:text-base text-zinc-400 mt-3">
                                        So I came up with a <span className="text-zinc-200 font-medium">V3</span>.
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Pivot cards */}
                    <div className="space-y-4">
                        {PIVOTS.map((pivot, i) => {
                            const { appearPhase, verdictPhase } = getPivotPhase(i)
                            const show = phase >= appearPhase
                            const showVerdict = phase >= verdictPhase
                            const isAccepted = pivot.verdict === 'accepted'

                            return (
                                <AnimatePresence key={pivot.version}>
                                    {show && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -30, scale: 0.95 }}
                                            animate={{
                                                opacity: showVerdict && !isAccepted ? 0.4 : 1,
                                                x: 0,
                                                scale: showVerdict && isAccepted ? 1.02 : 1,
                                            }}
                                            transition={{ duration: 0.7, ease }}
                                            className={`relative rounded-xl border p-5 md:p-6 ${showVerdict && isAccepted
                                                ? 'border-emerald-500/30 bg-emerald-500/[0.04]'
                                                : showVerdict && !isAccepted
                                                    ? 'border-white/[0.04] bg-white/[0.01]'
                                                    : 'border-white/[0.08] bg-white/[0.02]'
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Version badge */}
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-mono text-sm font-bold ${showVerdict && isAccepted
                                                    ? 'bg-emerald-500/20 text-emerald-400'
                                                    : showVerdict && !isAccepted
                                                        ? 'bg-zinc-800/50 text-zinc-600 line-through'
                                                        : 'bg-white/[0.06] text-white'
                                                    }`}>
                                                    {pivot.version}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className={`text-base font-semibold mb-1 ${showVerdict && !isAccepted
                                                        ? 'text-zinc-500 line-through decoration-zinc-700'
                                                        : 'text-white'
                                                        }`}>
                                                        {pivot.title}
                                                    </div>
                                                    <div className="text-xs text-zinc-400 mb-3">
                                                        {pivot.desc}
                                                    </div>

                                                    {/* Verdict */}
                                                    <AnimatePresence>
                                                        {showVerdict && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10, height: 0 }}
                                                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                                transition={{ duration: 0.5, ease }}
                                                                className={`flex items-center gap-2 text-xs font-mono ${isAccepted ? 'text-emerald-400' : 'text-rose-400/70'
                                                                    }`}
                                                            >
                                                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isAccepted
                                                                    ? 'bg-emerald-500/20'
                                                                    : 'bg-rose-500/10'
                                                                    }`}>
                                                                    {isAccepted ? '✓' : '✕'}
                                                                </span>
                                                                <span>{pivot.reason}</span>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            {/* Glow for accepted */}
                                            {showVerdict && isAccepted && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 1 }}
                                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/[0.03] to-transparent pointer-events-none"
                                                />
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )
                        })}
                    </div>

                    {/* Closing */}
                    <AnimatePresence>
                        {phase >= 5 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="text-center mt-10"
                            >
                                <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
                                    I failed twice fast.
                                </p>
                                <p className="text-zinc-500 text-sm mt-2 font-mono">
                                    But the third time? Something clicked.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
