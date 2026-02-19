'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const BEFORE = {
    title: 'Before',
    items: [
        { label: '"Basic" mode', desc: 'Limited options. Separate entry.' },
        { label: '"Advanced" mode', desc: 'Full options. Different UI entirely.' },
        { label: 'Two workflows', desc: 'You had to know which one you needed.' },
    ],
}

const AFTER = {
    title: 'After',
    items: [
        { label: 'One unified modal', desc: 'Start anywhere along the complexity spectrum.' },
        { label: 'Progressive disclosure', desc: 'Complexity on demand, not upfront.' },
        { label: 'Contextual launch', desc: 'Trigger from wherever you already are.' },
    ],
}

export default function BeatScheduler() {
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
        // Phase 0: Header
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1: "Before" column
        timers.current.push(setTimeout(() => setPhase(1), 1200))
        // Phase 2-4: Before items
        BEFORE.items.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(2 + i), 1800 + i * 600))
        })
        // Phase 5: Arrow / transformation
        timers.current.push(setTimeout(() => setPhase(5), 3800))
        // Phase 6: "After" column
        timers.current.push(setTimeout(() => setPhase(6), 4600))
        // Phase 7-9: After items
        AFTER.items.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(7 + i), 5200 + i * 600))
        })
        // Phase 10: "One modal to rule them all."
        timers.current.push(setTimeout(() => setPhase(10), 7200))
    }, [clear])

    useEffect(() => {
        if (isInView) play()
        else {
            clear()
            setPhase(-1)
        }
        return clear
    }, [isInView, play, clear])

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    {/* Header */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center mb-10"
                            >
                                <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-4">
                                    Core feature redesign
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                    Scheduler Redesign
                                </h3>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Before / After split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {/* Before column */}
                        <div>
                            <AnimatePresence>
                                {phase >= 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: phase >= 5 ? 0.4 : 1, x: 0 }}
                                        transition={{ duration: 0.5, ease }}
                                    >
                                        <div className="font-mono text-[10px] tracking-[0.3em] text-rose-500/60 uppercase mb-4">
                                            Before
                                        </div>
                                        <div className="space-y-3">
                                            {BEFORE.items.map((item, i) => (
                                                <motion.div
                                                    key={item.label}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={
                                                        phase >= 2 + i
                                                            ? { opacity: 1, y: 0 }
                                                            : { opacity: 0, y: 15 }
                                                    }
                                                    transition={{ duration: 0.4, ease }}
                                                    className="rounded-lg border border-white/[0.04] bg-white/[0.01] p-3"
                                                >
                                                    <div className={`text-sm font-medium mb-0.5 ${phase >= 5
                                                            ? 'text-zinc-600 line-through decoration-zinc-700'
                                                            : 'text-white'
                                                        }`}>
                                                        {item.label}
                                                    </div>
                                                    <div className="text-[11px] text-zinc-600 font-mono">
                                                        {item.desc}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* After column */}
                        <div>
                            <AnimatePresence>
                                {phase >= 6 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, ease }}
                                    >
                                        <div className="font-mono text-[10px] tracking-[0.3em] text-emerald-500/60 uppercase mb-4">
                                            After
                                        </div>
                                        <div className="space-y-3">
                                            {AFTER.items.map((item, i) => (
                                                <motion.div
                                                    key={item.label}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={
                                                        phase >= 7 + i
                                                            ? { opacity: 1, y: 0 }
                                                            : { opacity: 0, y: 15 }
                                                    }
                                                    transition={{ duration: 0.4, ease }}
                                                    className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.02] p-3"
                                                >
                                                    <div className="text-sm font-medium text-white mb-0.5">
                                                        {item.label}
                                                    </div>
                                                    <div className="text-[11px] text-emerald-400/60 font-mono">
                                                        {item.desc}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Divider + arrow in center */}
                    <AnimatePresence>
                        {phase >= 5 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex"
                            >
                                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/[0.1] flex items-center justify-center">
                                    <span className="text-zinc-500 text-xs">→</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Closing */}
                    <AnimatePresence>
                        {phase >= 10 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="text-center mt-8"
                            >
                                <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
                                    One modal. Any complexity level.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
