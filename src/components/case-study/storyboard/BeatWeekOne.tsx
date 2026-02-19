'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import NarratorBubble from './NarratorBubble'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const FACTS = [
    { label: 'Days at the company', value: '7' },
    { label: 'BI tools used before', value: '0' },
    { label: 'Enterprise design experience', value: 'None' },
    { label: 'Knowledge of ReportCaster', value: 'Zero' },
]

const STATEMENTS = [
    'One week into joining, my design director mentioned a legacy scheduling tool in the pipeline.',
    'Something old. Massive. Untouched for decades.',
    'No designer had taken it.',
    'No engineer wanted to own it.',
    'No PM had a roadmap for it.',
    '"Give me a chance."',
    'He didn\'t hesitate.',
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
        // Statements start after facts (at ~3s)
        STATEMENTS.forEach((_, i) => {
            timers.current.push(
                setTimeout(() => setStep(FACTS.length + i), 3200 + i * 1200)
            )
        })
        // Narrator bubble after all statements
        timers.current.push(
            setTimeout(() => setStep(FACTS.length + STATEMENTS.length), 3200 + STATEMENTS.length * 1200 + 800)
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
    const showStatement = (i: number) => step >= FACTS.length + i

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    {/* Week counter */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease }}
                        className="text-center mb-10"
                    >
                        <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                            Week 1 at the Company
                        </span>
                    </motion.div>

                    {/* Fact cards grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-14">
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

                    {/* Statement lines */}
                    <div className="space-y-4 max-w-2xl mx-auto">
                        {STATEMENTS.map((text, i) => {
                            const isCallout = i === 5 || i === 6 // "I'll do it" and "same day"
                            return (
                                <AnimatePresence key={i}>
                                    {showStatement(i) && (
                                        <motion.p
                                            initial={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
                                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.7, ease }}
                                            className={`text-sm md:text-base leading-relaxed ${isCallout
                                                ? 'text-white font-medium text-base md:text-lg'
                                                : i >= 2 && i <= 4
                                                    ? 'text-zinc-500 font-mono text-xs md:text-sm pl-4 border-l border-zinc-800'
                                                    : 'text-zinc-400'
                                                }`}
                                        >
                                            {text}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            )
                        })}
                    </div>

                    {/* Narrator aside */}
                    <AnimatePresence>
                        {step >= FACTS.length + STATEMENTS.length && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-8 max-w-lg mx-auto"
                            >
                                <NarratorBubble
                                    text="No clue what I signed up for :P"
                                    mood="excited"
                                    align="left"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
