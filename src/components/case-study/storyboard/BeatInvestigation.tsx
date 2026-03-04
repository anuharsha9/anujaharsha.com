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
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout)
        timers.current = []
    }, [])

    const startVisuals = useCallback(() => {
        EVENTS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setStep(i), 300 + i * 1000))
        })
        timers.current.push(
            setTimeout(() => setStep(EVENTS.length), 300 + EVENTS.length * 1000 + 800)
        )
    }, [])

    useEffect(() => {
        if (isInView) {
            // PresenterBar shows via isInView directly (no phase gating)
        } else {
            clear()
            setStep(-1)
        }
        return clear
    }, [isInView, clear])

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
                        <PresenterBar onTypingComplete={startVisuals}>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                I interviewed customer reps, support leads, the <span className="text-zinc-200 font-medium">one engineer who wrote the original code in the &apos;80s</span> — anyone who&apos;d talk to me, <span className="text-zinc-200 font-medium">like crazy.</span>
                            </p>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed mt-2">
                                Joined <span className="text-zinc-200 font-medium">Chris&apos;s</span> — our customer support lead — meetings every week for a month. Took hundreds of screenshots. Mapped <span className="text-zinc-200">every single workflow</span> myself.
                            </p>
                        </PresenterBar>
                    </motion.div>

                    {/* ── Evidence Grid (compact) ── */}
                    <div className="max-w-2xl mx-auto">
                        {/* Board header with horizontal progress */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={step >= 0 ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-between mb-4"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                                <span className="text-[11px] font-mono tracking-widest uppercase text-teal-400">
                                    Investigation Timeline
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] font-mono text-zinc-400">
                                    {completedCount}/{EVENTS.length}
                                </span>
                                <div className="w-16 h-1 bg-white/[0.04] rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: 'linear-gradient(to right, var(--accent-teal-bright), var(--semantic-green-500))' }}
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${progressPct}%` }}
                                        transition={{ duration: 0.4, ease }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Compact evidence cards — icon + title only */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                            {EVENTS.map((event, i) => {
                                const Icon = event.icon
                                const isActive = step >= i
                                return (
                                    <motion.div
                                        key={event.label}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={
                                            isActive
                                                ? { opacity: 1, y: 0 }
                                                : { opacity: 0, y: 12 }
                                        }
                                        transition={{ duration: 0.4, ease }}
                                        className="rounded-lg border bg-white/[0.02] p-3 relative overflow-hidden"
                                        style={{
                                            borderColor: isActive ? withHexAlpha(event.color, '15') : 'var(--overlay-white-04)',
                                        }}
                                    >
                                        {/* Top accent */}
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                                            transition={{ duration: 0.4, delay: 0.1, ease }}
                                            className="absolute top-0 left-0 right-0 h-[1px] origin-left"
                                            style={{ background: withHexAlpha(event.color, '40') }}
                                        />
                                        <div className="flex items-center gap-2.5">
                                            <div
                                                className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                                                style={{
                                                    background: withHexAlpha(event.color, '10'),
                                                    border: `1px solid ${withHexAlpha(event.color, '15')}`,
                                                }}
                                            >
                                                <Icon
                                                    className="w-3.5 h-3.5"
                                                    style={{ color: event.color }}
                                                    strokeWidth={1.5}
                                                />
                                            </div>
                                            <span className="text-xs font-medium text-zinc-300">
                                                {event.label}
                                            </span>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Outcome — compact */}
                    <AnimatePresence>
                        {step >= EVENTS.length && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease }}
                                className="mt-6 flex items-center gap-4 max-w-2xl mx-auto"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                                    className="w-10 h-10 rounded-full border border-teal-500/30 flex items-center justify-center flex-shrink-0"
                                    style={{
                                        background: 'radial-gradient(circle, var(--overlay-teal-bright-15) 0%, transparent 70%)',
                                    }}
                                >
                                    <CheckCircle2 className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
                                </motion.div>
                                <div className="flex-1">
                                    <p className="text-sm text-teal-300/90 leading-relaxed font-medium">
                                        {OUTCOME}
                                    </p>
                                    <div className="flex items-center gap-3 mt-1.5 text-xs font-mono text-zinc-400">
                                        <span>4 months</span>
                                        <span className="text-zinc-800">·</span>
                                        <span>100s of screenshots</span>
                                        <span className="text-zinc-800">·</span>
                                        <span>Every workflow mapped</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}
