'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Monitor, FileText, Play, type LucideIcon } from 'lucide-react'
import PresenterBar from './PresenterBar'

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
        // Phase 0: Speech bubble
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1: "I had my work cut out..."
        timers.current.push(setTimeout(() => setPhase(1), 2400))
        // Phase 2-4: Each tile staggered
        GOT.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 2), 3600 + i * 700))
        })
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

                    {/* Speech bubble */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <PresenterBar>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                        These three things you see below?
                                    </p>
                                    <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
                                        That&apos;s it. That&apos;s all I had to work with.
                                    </p>
                                    <p className="text-sm md:text-base text-zinc-500 mt-2 italic">
                                        No documentation. No design files. No team. No nothing.
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Closer */}
                    <AnimatePresence>
                        {phase >= 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 0.9, ease }}
                                className="text-center mt-8 mb-8"
                            >
                                <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
                                    I had my work cut out for me — and so, I began.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tiles */}
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                        {GOT.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={
                                        phase >= i + 2
                                            ? { opacity: 1, y: 0, scale: 1 }
                                            : { opacity: 0, y: 20, scale: 0.95 }
                                    }
                                    transition={{ duration: 0.6, ease }}
                                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-5 text-center"
                                >
                                    <div className="flex items-center justify-center mb-3">
                                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-zinc-500" strokeWidth={1.5} />
                                    </div>
                                    <div className="text-sm font-medium text-white mb-1">
                                        {item.label}
                                    </div>
                                    <div className="text-[11px] text-zinc-600 font-mono leading-snug">
                                        {item.detail}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}
