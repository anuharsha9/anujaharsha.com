'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Monitor, FileText, Play, Users, type LucideIcon } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface Item {
    icon: LucideIcon
    label: string
    detail: string
}

const GOT: Item[] = [
    { icon: Monitor, label: 'A sandbox', detail: 'One login. No guide.' },
    { icon: FileText, label: 'A presentation', detail: 'From the support lead. My bible.' },
    { icon: Play, label: 'A 30-min demo', detail: 'Tribal knowledge. Unrecorded.' },
    { icon: Users, label: 'User personas', detail: 'From UX research. Generic.' },
]

const MISSING = [
    'No documentation',
    'No specs',
    'No roadmap',
    'No design files',
    'No user research',
    'No analytics',
    'No stakeholder alignment',
    'No previous design attempts',
]

export default function BeatWhatIGot() {
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
        // Phase 0: Title
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1-4: Each "got" item
        GOT.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 1), 1000 + i * 900))
        })
        // Phase 5: "That was it"
        timers.current.push(setTimeout(() => setPhase(5), 5100))
        // Phase 6: Missing items start
        timers.current.push(setTimeout(() => setPhase(6), 6400))
        // Phase 7-14: Each missing item strikethrough
        MISSING.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(7 + i), 7100 + i * 400))
        })
        // Phase 15: "So I started."
        timers.current.push(setTimeout(() => setPhase(15), 11000))
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

                    {/* "What I got" section */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mb-10"
                            >
                                <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase text-center mb-8">
                                    Everything I was given
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {GOT.map((item, i) => {
                                        const Icon = item.icon
                                        return (
                                            <motion.div
                                                key={item.label}
                                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                animate={
                                                    phase >= i + 1
                                                        ? { opacity: 1, y: 0, scale: 1 }
                                                        : { opacity: 0, y: 20, scale: 0.95 }
                                                }
                                                transition={{ duration: 0.6, ease }}
                                                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center"
                                            >
                                                <div className="flex items-center justify-center mb-3">
                                                    <Icon className="w-6 h-6 text-zinc-400" strokeWidth={1.5} />
                                                </div>
                                                <div className="text-sm font-medium text-white mb-1">
                                                    {item.label}
                                                </div>
                                                <div className="text-[11px] text-zinc-500 font-mono">
                                                    {item.detail}
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>

                                {/* "That was it." */}
                                <AnimatePresence>
                                    {phase >= 5 && (
                                        <motion.p
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.8, ease }}
                                            className="text-center text-white text-lg md:text-xl font-semibold tracking-tight mt-6"
                                        >
                                            That was it.
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Divider */}
                    <AnimatePresence>
                        {phase >= 6 && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, ease }}
                                className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-8 origin-left"
                            />
                        )}
                    </AnimatePresence>

                    {/* Missing items with strikethrough */}
                    <AnimatePresence>
                        {phase >= 6 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="font-mono text-[10px] tracking-[0.3em] text-rose-500/60 uppercase text-center mb-6">
                                    What I didn&apos;t have
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2.5 max-w-2xl mx-auto">
                                    {MISSING.map((item, i) => {
                                        const show = phase >= 7 + i
                                        return (
                                            <motion.div
                                                key={item}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={
                                                    show
                                                        ? { opacity: 1, x: 0 }
                                                        : { opacity: 0, x: -10 }
                                                }
                                                transition={{ duration: 0.3, ease }}
                                                className="flex items-center gap-2"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500/40 flex-shrink-0" />
                                                <span className="text-xs text-rose-400/70 font-mono line-through decoration-rose-500/30">
                                                    {item}
                                                </span>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* "So I started." */}
                    <AnimatePresence>
                        {phase >= 15 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="text-center mt-10"
                            >
                                <p className="text-white text-xl md:text-2xl font-semibold tracking-tight">
                                    So I started.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
