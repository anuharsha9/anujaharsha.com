'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Calendar, Mail, Lock, FolderOpen, Settings, type LucideIcon } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface SystemNode {
    icon: LucideIcon
    label: string
    desc: string
}

const SYSTEMS: SystemNode[] = [
    { icon: Calendar, label: 'Schedules', desc: 'Buried under 4 clicks' },
    { icon: Mail, label: 'Distribution Lists', desc: 'Buried alongside schedules' },
    { icon: Lock, label: 'Access Lists', desc: 'Same depth. Same friction.' },
    { icon: FolderOpen, label: 'Explorer', desc: 'Hidden in a hamburger menu' },
    { icon: Settings, label: 'Admin Console', desc: 'Inside another admin panel' },
]

const PAIN_POINTS = [
    { stat: '5', label: 'Systems posing as one' },
    { stat: '0', label: 'Lines of documentation' },
    { stat: '4', label: 'Clicks just to start' },
    { stat: '3', label: 'Entry points. None obvious.' },
]

export default function BeatFragmentation() {
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
        // Each system node
        SYSTEMS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 1), 800 + i * 600))
        })
        // Phase 6: Show connections (chaos)
        timers.current.push(setTimeout(() => setPhase(6), 4200))
        // Phase 7: Pain points
        timers.current.push(setTimeout(() => setPhase(7), 5400))
        // Phase 8-11: Each pain point stat
        PAIN_POINTS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(8 + i), 6000 + i * 500))
        })
        // Phase 12: "Nobody had a map."
        timers.current.push(setTimeout(() => setPhase(12), 8500))
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
                                    What I discovered
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                                    5 Systems. 1 Product.
                                </h3>
                                <p className="text-sm text-zinc-500 max-w-md mx-auto">
                                    One product, fractured across five separate sub-applications. All scattered. All buried.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* System nodes */}
                    <div className="relative">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                            {SYSTEMS.map((sys, i) => {
                                const Icon = sys.icon
                                return (
                                    <motion.div
                                        key={sys.label}
                                        initial={{ opacity: 0, y: 30, scale: 0.85 }}
                                        animate={
                                            phase >= i + 1
                                                ? { opacity: 1, y: 0, scale: 1 }
                                                : { opacity: 0, y: 30, scale: 0.85 }
                                        }
                                        transition={{ duration: 0.5, ease }}
                                        className="relative rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center"
                                    >
                                        <div className="flex items-center justify-center mb-2">
                                            <Icon className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
                                        </div>
                                        <div className="text-xs font-medium text-white mb-0.5">
                                            {sys.label}
                                        </div>
                                        <div className="text-[10px] text-zinc-600 font-mono">
                                            {sys.desc}
                                        </div>
                                        {/* Chaos indicator */}
                                        {phase >= 6 && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500/60"
                                            />
                                        )}
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Chaos overlay - dashed connections */}
                        <AnimatePresence>
                            {phase >= 6 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0 pointer-events-none"
                                >
                                    <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <motion.line
                                            x1="15" y1="30" x2="85" y2="70"
                                            stroke="rgba(244,63,94,0.15)" strokeWidth="0.3" strokeDasharray="2 2"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1, ease }}
                                        />
                                        <motion.line
                                            x1="30" y1="20" x2="70" y2="80"
                                            stroke="rgba(244,63,94,0.12)" strokeWidth="0.3" strokeDasharray="2 2"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1, delay: 0.2, ease }}
                                        />
                                        <motion.line
                                            x1="50" y1="15" x2="50" y2="85"
                                            stroke="rgba(244,63,94,0.1)" strokeWidth="0.2" strokeDasharray="3 3"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1, delay: 0.4, ease }}
                                        />
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Divider */}
                    <AnimatePresence>
                        {phase >= 7 && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, ease }}
                                className="h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent my-8 origin-left"
                            />
                        )}
                    </AnimatePresence>

                    {/* Pain point stats */}
                    <AnimatePresence>
                        {phase >= 7 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="font-mono text-[10px] tracking-[0.3em] text-rose-500/60 uppercase text-center mb-6">
                                    The cost of fragmentation
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
                                    {PAIN_POINTS.map((pp, i) => (
                                        <motion.div
                                            key={pp.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={
                                                phase >= 8 + i
                                                    ? { opacity: 1, y: 0 }
                                                    : { opacity: 0, y: 20 }
                                            }
                                            transition={{ duration: 0.5, ease }}
                                            className="text-center"
                                        >
                                            <div className="text-3xl md:text-4xl font-bold text-rose-400 font-mono mb-1">
                                                {pp.stat}
                                            </div>
                                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                                                {pp.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Closing line */}
                    <AnimatePresence>
                        {phase >= 12 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="text-center mt-10"
                            >
                                <p className="text-white text-xl md:text-2xl font-semibold tracking-tight">
                                    Nobody had a map.
                                </p>
                                <p className="text-zinc-500 text-sm mt-2 font-mono">
                                    So I drew one.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
