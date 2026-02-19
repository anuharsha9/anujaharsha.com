'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const FACTS = [
    { label: 'Days at the company', value: '7' },
    { label: 'BI tools used before', value: '0' },
    { label: 'Data analytics experience', value: 'Zero' },
    { label: 'Knowledge of ReportCaster', value: 'Zero' },
]

export default function BeatWeekOne() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout)
        timers.current = []
    }, [])

    const play = useCallback(() => {
        clear()
        setStep(-1)
        // Facts appear at 0.5s intervals
        FACTS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setStep(i), 600 + i * 500))
        })
        // Speech bubble after facts
        timers.current.push(
            setTimeout(() => setStep(FACTS.length), 3200)
        )
        // Closing reflection
        timers.current.push(
            setTimeout(() => setStep(FACTS.length + 1), 5000)
        )
    }, [clear])

    useEffect(() => {
        if (isInView) play()
        else {
            clear()
            setStep(-1)
        }
        return clear
    }, [isInView, play, clear])

    const showFact = (i: number) => step >= i

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    {/* Speech bubble — all first-person narration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease }}
                    >
                        <PresenterBar>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                One week in, my director mentioned{' '}
                                <span className="text-zinc-200 font-medium">a project in the pipeline</span> — waiting to be assigned to the design team.
                            </p>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed mt-2">
                                He was deciding which designer would lead it. I had zero domain knowledge. Never heard of BI tools.
                            </p>
                            <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
                                I volunteered anyway. 🙋‍♂️
                            </p>
                            <p className="text-sm md:text-base text-zinc-500 mt-2 italic">
                                Not because I was careless — because I trust my ability to figure things out.
                            </p>
                        </PresenterBar>
                    </motion.div>

                    {/* Fact cards grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {FACTS.map((fact, i) => (
                            <motion.div
                                key={fact.label}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={
                                    showFact(i)
                                        ? { opacity: 1, y: 0, scale: 1 }
                                        : { opacity: 0, y: 20, scale: 0.95 }
                                }
                                transition={{ duration: 0.6, ease }}
                                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center"
                            >
                                <div className="text-2xl md:text-3xl font-semibold text-white mb-1.5 tracking-tight">
                                    {fact.value}
                                </div>
                                <div className="text-[10px] md:text-[11px] font-mono text-zinc-500 tracking-wide uppercase">
                                    {fact.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}
