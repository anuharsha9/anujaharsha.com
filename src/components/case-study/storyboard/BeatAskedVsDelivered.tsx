'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import NarratorBubble from './NarratorBubble'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const ASKED = [
    'A UI refresh',
    'Some updated screens',
    'Make it look modern',
]

const DELIVERED = [
    'Full system architecture redesign',
    '250+ screens covering every edge case',
    '5 subsystems unified into 1 Hub',
    'Complete documentation from scratch',
    'Team of ~20 onboarded personally',
    '6 months of post-exit support',
]

export default function BeatAskedVsDelivered() {
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
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1: "Asked" header
        timers.current.push(setTimeout(() => setPhase(1), 1200))
        // Phase 2-4: Asked items
        ASKED.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(2 + i), 1800 + i * 500))
        })
        // Phase 5: Pause + dim
        timers.current.push(setTimeout(() => setPhase(5), 3800))
        // Phase 6: "Delivered" header
        timers.current.push(setTimeout(() => setPhase(6), 4600))
        // Phase 7-12: Delivered items
        DELIVERED.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(7 + i), 5200 + i * 500))
        })
        // Phase 13: Closing
        timers.current.push(setTimeout(() => setPhase(13), 8500))
        // Phase 14: Narrator
        timers.current.push(setTimeout(() => setPhase(14), 10500))
    }, [clear])

    useEffect(() => {
        if (isInView) play()
        else { clear(); setPhase(-1) }
        return clear
    }, [isInView, play, clear])

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-10">
                                <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-4">Retrospective</div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Asked vs. Delivered</h3>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Asked column */}
                        <div>
                            <AnimatePresence>
                                {phase >= 1 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: phase >= 5 ? 0.35 : 1 }}
                                        transition={{ duration: 0.5, ease }}
                                    >
                                        <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-4">
                                            What they asked for
                                        </div>
                                        <div className="space-y-3">
                                            {ASKED.map((item, i) => (
                                                <motion.div key={item}
                                                    initial={{ opacity: 0, x: -15 }}
                                                    animate={phase >= 2 + i ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                                                    transition={{ duration: 0.4, ease }}
                                                    className="flex items-center gap-3"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 flex-shrink-0" />
                                                    <span className={`text-sm ${phase >= 5 ? 'text-zinc-600 line-through decoration-zinc-700' : 'text-zinc-300'}`}>
                                                        {item}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Delivered column */}
                        <div>
                            <AnimatePresence>
                                {phase >= 6 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }}>
                                        <div className="font-mono text-[10px] tracking-[0.3em] text-emerald-500/60 uppercase mb-4">
                                            What I actually delivered
                                        </div>
                                        <div className="space-y-3">
                                            {DELIVERED.map((item, i) => (
                                                <motion.div key={item}
                                                    initial={{ opacity: 0, x: 15 }}
                                                    animate={phase >= 7 + i ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
                                                    transition={{ duration: 0.4, ease }}
                                                    className="flex items-center gap-3"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 flex-shrink-0" />
                                                    <span className="text-sm text-emerald-300/90">{item}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Closing — the realization */}
                    <AnimatePresence>
                        {phase >= 13 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, ease }}
                                className="text-center mt-12"
                            >
                                <p className="text-zinc-500 text-sm font-mono mb-3 italic">
                                    I only realized the full scope of what I&apos;d done after I was laid off — when I sat down to write this case study.
                                </p>
                                <p className="text-white text-xl md:text-2xl font-semibold tracking-tight">
                                    They asked for a makeover. I rebuilt the engine.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Narrator aside */}
                    <AnimatePresence>
                        {phase >= 14 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-6 max-w-lg mx-auto"
                            >
                                <NarratorBubble
                                    text="I live this stuff. It's never just a job."
                                    mood="reflective"
                                    align="right"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
