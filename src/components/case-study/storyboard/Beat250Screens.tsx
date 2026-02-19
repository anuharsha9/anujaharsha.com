'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Search, AlertTriangle, Inbox } from 'lucide-react'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

// Simulated screen labels that cascade across the viewport
const SCREEN_LABELS = [
    'Schedule — Properties', 'Schedule — Tasks', 'Schedule — Recurrence',
    'Distribution List — Empty', 'Distribution List — Populated', 'Distribution List — Edit',
    'Access List — Empty', 'Access List — Members', 'Access List — Add',
    'Explorer — Grid View', 'Explorer — Filter View', 'Explorer — Context Menu',
    'Admin — Status', 'Admin — Configuration', 'Job Log — Dialog',
    'Task Dialog', 'Recurrence — Weekly', 'Recurrence — Monthly',
    'Recurrence — Yearly', 'Recurrence — Once', 'Recurrence — Validation',
    'Hub — Home', 'Hub — Create Schedule', 'Hub — Context Menu',
]

export default function Beat250Screens() {
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
        // Phase 1: Start cascade
        timers.current.push(setTimeout(() => setPhase(1), 1200))
        // Phase 2: Show counter
        timers.current.push(setTimeout(() => setPhase(2), 2000))
        // Phase 3: "Every edge case"
        timers.current.push(setTimeout(() => setPhase(3), 5000))
        // Phase 4: Statement
        timers.current.push(setTimeout(() => setPhase(4), 6500))
        // Phase 5: Narrator
        timers.current.push(setTimeout(() => setPhase(5), 8000))
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

                    {/* Presenter narration */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <PresenterBar>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                        Every interaction. Every loading state. Every error.
                                    </p>
                                    <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
                                        250+ screens. Nothing left to interpretation. 📐
                                    </p>
                                    <p className="text-sm md:text-base text-zinc-500 mt-2 italic">
                                        If a dev asked &quot;what happens when...&quot; — the answer was already documented.
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Screen cascade */}
                    <AnimatePresence>
                        {phase >= 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative h-48 md:h-56 overflow-hidden mb-6"
                            >
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 absolute inset-0">
                                    {SCREEN_LABELS.map((label, i) => (
                                        <motion.div
                                            key={label}
                                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                            animate={{ opacity: 0.6, y: 0, scale: 1 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: i * 0.08,
                                                ease,
                                            }}
                                            className="rounded-md border border-white/[0.04] bg-white/[0.015] p-1.5 h-fit"
                                        >
                                            <div className="w-full h-6 rounded-sm bg-white/[0.03] mb-1" />
                                            <div className="text-[7px] text-zinc-600 font-mono truncate">
                                                {label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Gradient fade at bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Counter */}
                    <AnimatePresence>
                        {phase >= 2 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease }}
                                className="text-center mb-8"
                            >
                                <motion.div
                                    className="text-6xl md:text-7xl font-bold text-white font-mono mb-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    250+
                                </motion.div>
                                <div className="text-xs text-zinc-500 font-mono uppercase tracking-[0.3em]">
                                    Screens designed
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Coverage stats */}
                    <AnimatePresence>
                        {phase >= 3 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                                    {[
                                        { label: 'Edge cases', Icon: Search },
                                        { label: 'Error states', Icon: AlertTriangle },
                                        { label: 'Empty states', Icon: Inbox },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: i * 0.2, ease }}
                                            className="text-center"
                                        >
                                            <div className="flex items-center justify-center mb-1">
                                                <item.Icon className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
                                            </div>
                                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                                                {item.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Closing */}
                    <AnimatePresence>
                        {phase >= 4 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="text-center"
                            >
                                <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
                                    Every. Single. Screen.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>



                </div>
            </div>
        </div>
    )
}
