'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Camera, Headphones, Network, User, Map, CheckCircle2, type LucideIcon } from 'lucide-react'
import PresenterBar from './PresenterBar'
import { withHexAlpha } from '@/lib/color-utils'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface TimelineEvent {
    month: string
    icon: LucideIcon
    label: string
    detail: string
    color: string
}

const EVENTS: TimelineEvent[] = [
    {
        month: 'Month 1',
        icon: Camera,
        label: 'Sandbox Deep Dive',
        detail: 'I took hundreds of screenshots. Grouped them. Mapped them.',
        color: 'var(--semantic-orange-500)',
    },
    {
        month: 'Month 1–2',
        icon: Headphones,
        label: 'Embedded in Support',
        detail: "I joined Chris's CS team meetings every week for a month.",
        color: 'var(--semantic-blue-500)',
    },
    {
        month: 'Month 2',
        icon: Network,
        label: 'Mind Maps',
        detail: 'I documented what nobody had. Built the understanding from scratch.',
        color: 'var(--semantic-purple-500)',
    },
    {
        month: 'Month 2–3',
        icon: User,
        label: '1:1 Interviews',
        detail: "Customer reps. Support leads. The ONE engineer from the '80s.",
        color: 'var(--semantic-pink-500)',
    },
    {
        month: 'Month 3',
        icon: Map,
        label: 'Full System Map',
        detail: 'I mapped every workflow. Every edge case. A-to-Z.',
        color: 'var(--accent-teal-bright)',
    },
    {
        month: 'Month 3–4',
        icon: CheckCircle2,
        label: 'Validation',
        detail: 'I validated with support and customer reps. Over and over.',
        color: 'var(--semantic-green-500)',
    },
]

/* ── Animated evidence progress bar ── */
function ProgressFill({ progress }: { progress: number }) {
    return (
        <motion.div
            className="absolute left-0 top-0 w-full origin-top rounded-full"
            style={{ background: 'linear-gradient(to bottom, var(--accent-teal-bright), var(--semantic-green-500))' }}
            initial={{ height: '0%' }}
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.6, ease }}
        />
    )
}

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
        // Each event appears staggered
        EVENTS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setStep(i), 800 + i * 1000))
        })
        // Outcome statement
        timers.current.push(
            setTimeout(() => setStep(EVENTS.length), 800 + EVENTS.length * 1000 + 800)
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

    const completedCount = Math.max(0, Math.min(step + 1, EVENTS.length))
    const progressPct = (completedCount / EVENTS.length) * 100

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

                    {/* ── Evidence Board ── */}
                    <div className="relative max-w-2xl mx-auto">
                        {/* Board header */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={step >= 0 ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-between mb-5"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                                <span className="text-[10px] font-mono tracking-widest uppercase text-teal-400/70">
                                    Investigation Timeline
                                </span>
                            </div>
                            <span className="text-[10px] font-mono text-zinc-600">
                                {completedCount}/{EVENTS.length} phases complete
                            </span>
                        </motion.div>

                        {/* Progress rail */}
                        <div className="absolute left-[19px] md:left-[23px] top-14 bottom-4 w-[3px] bg-white/[0.04] rounded-full overflow-hidden">
                            <ProgressFill progress={progressPct} />
                        </div>

                        {/* Evidence cards */}
                        <div className="space-y-4">
                            {EVENTS.map((event, i) => {
                                const Icon = event.icon
                                const isActive = step >= i
                                const isComplete = step > i
                                return (
                                    <motion.div
                                        key={event.label}
                                        initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                                        animate={
                                            isActive
                                                ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                                                : { opacity: 0, x: -30, filter: 'blur(6px)' }
                                        }
                                        transition={{ duration: 0.7, ease }}
                                        className="flex items-start gap-4 relative"
                                    >
                                        {/* Timeline node */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={isActive ? { scale: 1 } : { scale: 0 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: 0.1,
                                                ease: [0.34, 1.56, 0.64, 1],
                                            }}
                                            className="w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                                            style={{
                                                background: isComplete
                                                    ? withHexAlpha(event.color, '20')
                                                    : 'var(--overlay-zinc-900)',
                                                border: `2px solid ${isComplete ? event.color : 'var(--overlay-white-08)'}`,
                                            }}
                                        >
                                            <Icon
                                                className="w-4 h-4 md:w-5 md:h-5"
                                                style={{ color: isActive ? event.color : 'var(--overlay-zinc-100)' }}
                                                strokeWidth={1.5}
                                            />
                                            {/* Pulse ring on active */}
                                            {isActive && !isComplete && (
                                                <motion.div
                                                    initial={{ opacity: 0.6, scale: 1 }}
                                                    animate={{ opacity: 0, scale: 2 }}
                                                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                                                    className="absolute inset-0 rounded-full"
                                                    style={{ border: `2px solid ${event.color}` }}
                                                />
                                            )}
                                        </motion.div>

                                        {/* Card content */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                            transition={{ duration: 0.5, delay: 0.15, ease }}
                                            className="flex-1 rounded-xl border bg-white/[0.02] p-4 relative overflow-hidden"
                                            style={{
                                                borderColor: isActive ? withHexAlpha(event.color, '20') : 'var(--overlay-white-04)',
                                            }}
                                        >
                                            {/* Top color accent */}
                                            <motion.div
                                                initial={{ scaleX: 0 }}
                                                animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                                                transition={{ duration: 0.6, delay: 0.2, ease }}
                                                className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                                                style={{ background: event.color }}
                                            />

                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span
                                                    className="font-mono text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded"
                                                    style={{
                                                        color: event.color,
                                                        background: withHexAlpha(event.color, '15'),
                                                    }}
                                                >
                                                    {event.month}
                                                </span>
                                                {isComplete && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                                                    >
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2} />
                                                    </motion.div>
                                                )}
                                            </div>
                                            <div className="text-sm font-medium text-white mb-1">
                                                {event.label}
                                            </div>
                                            <div className="text-xs text-zinc-500 leading-relaxed">
                                                {event.detail}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Outcome — Case Closed seal */}
                    <AnimatePresence>
                        {step >= EVENTS.length && (
                            <motion.div
                                initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, ease }}
                                className="mt-10 text-center"
                            >
                                <div className="inline-flex flex-col items-center gap-4">
                                    {/* Seal */}
                                    <motion.div
                                        initial={{ scale: 0, rotate: -20 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.3,
                                            ease: [0.34, 1.56, 0.64, 1],
                                        }}
                                        className="w-16 h-16 rounded-full border-2 border-teal-500/40 flex items-center justify-center"
                                        style={{
                                            background: 'radial-gradient(circle, var(--overlay-teal-bright-15) 0%, transparent 70%)',
                                        }}
                                    >
                                        <CheckCircle2 className="w-8 h-8 text-teal-400" strokeWidth={1.5} />
                                    </motion.div>

                                    {/* Statement */}
                                    <div className="max-w-lg">
                                        <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 px-6 py-4">
                                            <p className="text-sm md:text-base text-teal-300/90 leading-relaxed font-medium">
                                                {OUTCOME}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress summary */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex items-center gap-4 text-[10px] font-mono text-zinc-600"
                                    >
                                        <span>4 months</span>
                                        <span className="text-zinc-800">·</span>
                                        <span>100s of screenshots</span>
                                        <span className="text-zinc-800">·</span>
                                        <span>Every workflow mapped</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}
