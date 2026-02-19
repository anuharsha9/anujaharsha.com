'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Calendar, CheckCircle2, Shield, Rocket, type LucideIcon } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface MetricItem {
    value: string
    label: string
    icon: LucideIcon
}

const METRICS: MetricItem[] = [
    { value: '20M+', label: 'Weekly schedules', icon: Calendar },
    { value: '100%', label: 'Legacy parity', icon: CheckCircle2 },
    { value: '0', label: 'Regressions', icon: Shield },
    { value: 'Apr 2024', label: 'Ship date', icon: Rocket },
]

export default function BeatImpact() {
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
        // Phase 1: "Shipped" moment
        timers.current.push(setTimeout(() => setPhase(1), 1200))
        // Phase 2-5: Metrics
        METRICS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(2 + i), 2200 + i * 600))
        })
        // Phase 6: Quote
        timers.current.push(setTimeout(() => setPhase(6), 5000))
        // Phase 7: Attribution
        timers.current.push(setTimeout(() => setPhase(7), 6500))
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
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-6">
                                <div className="font-mono text-[10px] tracking-[0.3em] text-emerald-500/60 uppercase mb-4">Outcome</div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Big "SHIPPED" moment */}
                    <AnimatePresence>
                        {phase >= 1 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6, filter: 'blur(20px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, ease }}
                                className="text-center mb-10"
                            >
                                <div className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2">
                                    SHIPPED.
                                </div>
                                <div className="text-sm text-zinc-500 font-mono">
                                    Powering 20M+ schedules weekly
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {METRICS.map((m, i) => (
                            <motion.div
                                key={m.label}
                                initial={{ opacity: 0, y: 25, scale: 0.9 }}
                                animate={phase >= 2 + i ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 25, scale: 0.9 }}
                                transition={{ duration: 0.6, ease }}
                                className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] p-4 text-center"
                            >
                                <div className="flex items-center justify-center mb-2">
                                    {(() => { const Icon = m.icon; return <Icon className="w-5 h-5 text-emerald-400/60" strokeWidth={1.5} /> })()}
                                </div>
                                <div className="text-2xl font-bold text-emerald-400 font-mono mb-0.5">{m.value}</div>
                                <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{m.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonial quote */}
                    <AnimatePresence>
                        {phase >= 6 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease }}
                                className="max-w-xl mx-auto"
                            >
                                <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
                                    <div className="text-4xl text-zinc-800 absolute -top-3 left-4">&ldquo;</div>
                                    <p className="text-base md:text-lg text-zinc-300 leading-relaxed italic">
                                        She impressed everyone. She took a 50-year-old system and made it look like it was built yesterday.
                                    </p>
                                    <AnimatePresence>
                                        {phase >= 7 && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className="text-xs text-zinc-500 font-mono mt-4"
                                            >
                                                — Vijay Raman, Principal Engineer
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
