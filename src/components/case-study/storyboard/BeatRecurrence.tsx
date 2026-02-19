'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface RecurrenceExample {
    label: string
    before: string
    after: string
}

const EXAMPLES: RecurrenceExample[] = [
    {
        label: 'Weekly',
        before: 'RR=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20241231',
        after: 'Every Monday, Wednesday, and Friday until Dec 31',
    },
    {
        label: 'Monthly',
        before: 'RR=MONTHLY;BYMONTHDAY=15;INTERVAL=2',
        after: 'Every 2 months on the 15th',
    },
    {
        label: 'Yearly',
        before: 'RR=YEARLY;BYMONTH=3;BYDAY=2MO',
        after: 'Every March on the 2nd Monday',
    },
]

const PRINCIPLES = [
    { icon: '💬', label: 'Natural language summaries', desc: 'I wanted users to see what they mean, not codes.' },
    { icon: '🎚️', label: 'Progressive disclosure', desc: 'I kept it simple by default. Advanced when needed.' },
    { icon: '🛡️', label: 'Built-in error prevention', desc: 'I made it impossible to create invalid patterns.' },
]

export default function BeatRecurrence() {
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
        // Phase 1-3: Each example
        EXAMPLES.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 1), 1200 + i * 1800))
        })
        // Phase 4: Transform (show "after" versions)
        timers.current.push(setTimeout(() => setPhase(4), 6800))
        // Phase 5: Principles header
        timers.current.push(setTimeout(() => setPhase(5), 8000))
        // Phase 6-8: Each principle
        PRINCIPLES.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(6 + i), 8600 + i * 500))
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

                    {/* Presenter narration */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <PresenterBar>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                        Users had to memorize codes like{' '}
                                        <code className="text-amber-400 font-mono font-bold bg-amber-400/10 px-2 py-0.5 rounded">&apos;W1MO&apos;</code>{' '}
                                        for &quot;every Monday.&quot;
                                    </p>
                                    <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
                                        Nobody could read these. 🤯
                                    </p>
                                    <p className="text-sm md:text-base text-zinc-500 mt-2 italic">
                                        I added natural language summaries so humans could actually understand their schedules.
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Before → After examples */}
                    <div className="space-y-4 mb-8">
                        {EXAMPLES.map((ex, i) => (
                            <AnimatePresence key={ex.label}>
                                {phase >= i + 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease }}
                                        className="rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-hidden"
                                    >
                                        <div className="px-4 py-2 border-b border-white/[0.04]">
                                            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">{ex.label}</span>
                                        </div>
                                        <div className="p-4">
                                            {/* Before */}
                                            <motion.div
                                                animate={{
                                                    opacity: phase >= 4 ? 0.3 : 1,
                                                    height: phase >= 4 ? 'auto' : 'auto',
                                                }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="font-mono text-[9px] text-rose-500/40 uppercase tracking-wider mb-1">
                                                    Before
                                                </div>
                                                <code className={`text-xs font-mono block mb-3 ${phase >= 4
                                                    ? 'text-zinc-700 line-through decoration-zinc-800'
                                                    : 'text-rose-300/80'
                                                    }`}>
                                                    {ex.before}
                                                </code>
                                            </motion.div>

                                            {/* After */}
                                            <AnimatePresence>
                                                {phase >= 4 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, height: 0 }}
                                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                        transition={{ duration: 0.5, ease }}
                                                    >
                                                        <div className="font-mono text-[9px] text-emerald-500/40 uppercase tracking-wider mb-1">
                                                            After
                                                        </div>
                                                        <p className="text-sm text-emerald-300/90 font-medium">
                                                            {ex.after}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        ))}
                    </div>

                    {/* Design principles */}
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
                                    className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-6 origin-center"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {PRINCIPLES.map((p, i) => (
                                        <motion.div
                                            key={p.label}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={
                                                phase >= 6 + i
                                                    ? { opacity: 1, y: 0 }
                                                    : { opacity: 0, y: 15 }
                                            }
                                            transition={{ duration: 0.4, ease }}
                                            className="rounded-lg border border-white/[0.04] bg-white/[0.01] p-3 text-center"
                                        >
                                            <div className="text-xl mb-2">{p.icon}</div>
                                            <div className="text-xs font-medium text-white mb-0.5">{p.label}</div>
                                            <div className="text-[10px] text-zinc-500 font-mono">{p.desc}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
