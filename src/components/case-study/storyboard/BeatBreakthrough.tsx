'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Calendar, Mail, Lock, type LucideIcon } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface ConsolidationItem {
    from: string
    to: string
    icon: LucideIcon
}

const CONSOLIDATIONS: ConsolidationItem[] = [
    { from: 'Scheduler', to: '+ Menu', icon: Calendar },
    { from: 'Distribution Lists', to: '+ Menu', icon: Mail },
    { from: 'Access Lists', to: '+ Menu', icon: Lock },
]

const METRICS = [
    { before: '4', after: '2', label: 'Clicks to create' },
    { before: '3', after: '1', label: 'Entry points' },
    { before: '5', after: '0', label: 'Context switches' },
]

export default function BeatBreakthrough() {
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
        // Phase 1-3: Each consolidation line
        CONSOLIDATIONS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 1), 1200 + i * 800))
        })
        // Phase 4: "+" button reveal
        timers.current.push(setTimeout(() => setPhase(4), 4000))
        // Phase 5: Metrics header
        timers.current.push(setTimeout(() => setPhase(5), 5200))
        // Phase 6-8: Each metric
        METRICS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(6 + i), 5800 + i * 600))
        })
        // Phase 9: "Zero context switching."
        timers.current.push(setTimeout(() => setPhase(9), 8000))
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
                                <div className="font-mono text-[10px] tracking-[0.3em] text-emerald-500/60 uppercase mb-4">
                                    The solution
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                                    The + Menu
                                </h3>
                                <p className="text-sm text-zinc-500 max-w-md mx-auto">
                                    Three separate workflows. One single entry point.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Consolidation visualization */}
                    <div className="max-w-lg mx-auto mb-8">
                        {CONSOLIDATIONS.map((item, i) => (
                            <AnimatePresence key={item.from}>
                                {phase >= i + 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, ease }}
                                        className="flex items-center gap-3 mb-3"
                                    >
                                        {/* From */}
                                        <div className="flex items-center gap-2 flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                                            {(() => { const Icon = item.icon; return <Icon className="w-4 h-4 text-zinc-400" strokeWidth={1.5} /> })()}
                                            <span className="text-xs text-zinc-400 font-mono">{item.from}</span>
                                        </div>

                                        {/* Arrow */}
                                        <motion.div
                                            initial={{ scaleX: 0, opacity: 0 }}
                                            animate={{ scaleX: 1, opacity: 1 }}
                                            transition={{ duration: 0.4, delay: 0.3, ease }}
                                            className="flex-shrink-0"
                                        >
                                            <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                                                <path d="M0 6h28M24 1l6 5-6 5" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
                                            </svg>
                                        </motion.div>

                                        {/* To  */}
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.4, delay: 0.5, ease }}
                                            className={`flex-shrink-0 rounded-lg border px-3 py-2.5 ${phase >= 4
                                                ? 'border-emerald-500/30 bg-emerald-500/[0.06]'
                                                : 'border-white/[0.08] bg-white/[0.03]'
                                                }`}
                                        >
                                            <span className="text-xs text-emerald-400 font-mono font-bold">+ Menu</span>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        ))}
                    </div>

                    {/* Big + button reveal */}
                    <AnimatePresence>
                        {phase >= 4 && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, ease }}
                                className="flex justify-center mb-8"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                                    <span className="text-3xl text-emerald-400 font-light">+</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Metrics */}
                    <AnimatePresence>
                        {phase >= 5 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.5, ease }}
                                    className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mb-6 origin-center"
                                />
                                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                                    {METRICS.map((m, i) => (
                                        <motion.div
                                            key={m.label}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={
                                                phase >= 6 + i
                                                    ? { opacity: 1, y: 0 }
                                                    : { opacity: 0, y: 15 }
                                            }
                                            transition={{ duration: 0.5, ease }}
                                            className="text-center"
                                        >
                                            <div className="flex items-center justify-center gap-2 mb-1">
                                                <span className="text-lg font-mono text-zinc-600 line-through">{m.before}</span>
                                                <span className="text-xs text-zinc-700">→</span>
                                                <span className="text-2xl font-bold font-mono text-emerald-400">{m.after}</span>
                                            </div>
                                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                                                {m.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Closing */}
                    <AnimatePresence>
                        {phase >= 9 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="text-center mt-8"
                            >
                                <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
                                    Users never leave the Hub.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
