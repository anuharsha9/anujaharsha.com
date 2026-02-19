'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Camera, Headphones, Network, User, Map, CheckCircle2, type LucideIcon } from 'lucide-react'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface TimelineEvent {
    month: string
    icon: LucideIcon
    label: string
    detail: string
}

const EVENTS: TimelineEvent[] = [
    {
        month: 'Month 1',
        icon: Camera,
        label: 'Sandbox Deep Dive',
        detail: 'I took hundreds of screenshots. Grouped them. Mapped them.',
    },
    {
        month: 'Month 1–2',
        icon: Headphones,
        label: 'Embedded in Support',
        detail: 'I joined Chris\'s CS team meetings every week for a month.',
    },
    {
        month: 'Month 2',
        icon: Network,
        label: 'Mind Maps',
        detail: 'I documented what nobody had. Built the understanding from scratch.',
    },
    {
        month: 'Month 2–3',
        icon: User,
        label: '1:1 Interviews',
        detail: 'Customer reps. Support leads. The ONE engineer from the \'80s.',
    },
    {
        month: 'Month 3',
        icon: Map,
        label: 'Full System Map',
        detail: 'I mapped every workflow. Every edge case. A-to-Z.',
    },
    {
        month: 'Month 3–4',
        icon: CheckCircle2,
        label: 'Validation',
        detail: 'I validated with support and customer reps. Over and over.',
    },
]

const OUTCOME = 'I knew this product\u2019s experience better than anyone. Not the code \u2014 the experience.'

export default function BeatInvestigation() {
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
        // Each event appears
        EVENTS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setStep(i), 800 + i * 1200))
        })
        // Outcome statement
        timers.current.push(
            setTimeout(() => setStep(EVENTS.length), 800 + EVENTS.length * 1200 + 800)
        )
        // Narrator bubble
        timers.current.push(
            setTimeout(() => setStep(EVENTS.length + 1), 800 + EVENTS.length * 1200 + 2400)
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

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    {/* Presenter narration */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <PresenterBar>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                I interviewed customer reps, support leads, the <span className="text-zinc-200 font-medium">one engineer who wrote the original code in the &apos;80s</span> — anyone who&apos;d talk to me, <span className="text-zinc-200 font-medium">like crazy.</span>
                            </p>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed mt-2">
                                Joined <span className="text-zinc-200 font-medium">Chris&apos;s</span> — our customer support lead — meetings every week for a month. Took hundreds of screenshots. Mapped <span className="text-zinc-200">every single workflow</span> myself.
                            </p>
                        </PresenterBar>
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative max-w-xl mx-auto">
                        {/* Vertical line */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={step >= 0 ? { scaleY: 1 } : { scaleY: 0 }}
                            transition={{ duration: 2, ease }}
                            className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-zinc-700 via-zinc-800 to-transparent origin-top"
                        />

                        <div className="space-y-6">
                            {EVENTS.map((event, i) => {
                                const Icon = event.icon
                                return (
                                    <motion.div
                                        key={event.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={
                                            step >= i
                                                ? { opacity: 1, x: 0 }
                                                : { opacity: 0, x: -20 }
                                        }
                                        transition={{ duration: 0.6, ease }}
                                        className="flex items-start gap-4 relative"
                                    >
                                        {/* Node */}
                                        <div className="w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/[0.08] bg-zinc-900 flex items-center justify-center flex-shrink-0 relative z-10">
                                            <Icon className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
                                        </div>

                                        {/* Content */}
                                        <div className="pt-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-mono text-[9px] tracking-wider text-teal-500/70 uppercase">
                                                    {event.month}
                                                </span>
                                            </div>
                                            <div className="text-sm font-medium text-white mb-0.5">
                                                {event.label}
                                            </div>
                                            <div className="text-xs text-zinc-500 leading-relaxed">
                                                {event.detail}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Outcome */}
                    <AnimatePresence>
                        {step >= EVENTS.length && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="mt-10 text-center"
                            >
                                <div className="inline-block rounded-xl border border-teal-500/20 bg-teal-500/5 px-6 py-4 max-w-lg">
                                    <p className="text-sm md:text-base text-teal-300/90 leading-relaxed font-medium">
                                        {OUTCOME}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>



                </div>
            </div>
        </div>
    )
}
