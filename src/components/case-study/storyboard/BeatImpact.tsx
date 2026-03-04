'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Calendar, CheckCircle2, Shield, Rocket, type LucideIcon } from 'lucide-react'
import PresenterBar from './PresenterBar'
import { withHexAlpha } from '@/lib/color-utils'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface MetricItem {
    value: string
    numericTarget?: number
    suffix?: string
    label: string
    icon: LucideIcon
    color: string
}

const METRICS: MetricItem[] = [
    { value: '20M+', numericTarget: 20, suffix: 'M+', label: 'Weekly schedules', icon: Calendar, color: 'var(--semantic-blue-500)' },
    { value: '100%', numericTarget: 100, suffix: '%', label: 'Legacy parity', icon: CheckCircle2, color: 'var(--semantic-green-500)' },
    { value: '0', numericTarget: 0, label: 'Regressions', icon: Shield, color: 'var(--accent-amber)' },
    { value: 'Apr 2024', label: 'Ship date', icon: Rocket, color: 'var(--semantic-pink-500)' },
]

/* ── Animated metric counter ── */
function MetricCounter({ item, active }: { item: MetricItem; active: boolean }) {
    const [val, setVal] = useState(0)
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (!active) { setVal(0); setDone(false); return }
        if (item.numericTarget === undefined) { setDone(true); return }
        if (item.numericTarget === 0) { setVal(0); setDone(true); return }

        let frame = 0
        const target = item.numericTarget
        const step = Math.max(1, Math.floor(target / 25))
        const id = setInterval(() => {
            frame += step
            if (frame >= target) {
                setVal(target)
                setDone(true)
                clearInterval(id)
            } else {
                setVal(frame)
            }
        }, 40)
        return () => clearInterval(id)
    }, [active, item.numericTarget])

    if (item.numericTarget === undefined) {
        // Non-numeric (date)
        return (
            <motion.span
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={active ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.8, ease }}
                className="text-2xl md:text-3xl font-bold font-mono tabular-nums"
                style={{ color: item.color }}
            >
                {item.value}
            </motion.span>
        )
    }

    return (
        <motion.span
            className="text-2xl md:text-3xl font-bold font-mono tabular-nums"
            style={{ color: item.color }}
            animate={done ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.3, ease }}
        >
            {val}{item.suffix || ''}
        </motion.span>
    )
}

export default function BeatImpact() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout)
        timers.current = []
    }, [])

    const startVisuals = useCallback(() => {
        // 1: "SHIPPED" impact
        timers.current.push(setTimeout(() => setPhase(1), 300))
        // 2-5: Metrics staggered
        METRICS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(2 + i), 1500 + i * 700))
        })
        // 6: Quote
        timers.current.push(setTimeout(() => setPhase(6), 4500))
        // 7: Attribution
        timers.current.push(setTimeout(() => setPhase(7), 5900))
        // 8: Customer validation
        timers.current.push(setTimeout(() => setPhase(8), 8100))
    }, [])

    useEffect(() => {
        if (isInView) {
            timers.current.push(setTimeout(() => setPhase(0), 400))
        } else { clear(); setPhase(-1) }
        return clear
    }, [isInView, clear])

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    {/* Speech */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <PresenterBar onTypingComplete={startVisuals}>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                        The business needed to retain customers. That was the mission.
                                    </p>
                                    <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
                                        Customers retained. System rebuilt. Zero regressions. 🚀
                                    </p>
                                    <p className="text-sm md:text-base text-zinc-500 mt-2 italic">
                                        Two years of work. 250+ screens. A brand-new integrated product.
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Big "SHIPPED." moment ── */}
                    <AnimatePresence>
                        {phase >= 1 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 3, filter: 'blur(30px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, ease }}
                                className="text-center mb-10 relative"
                            >
                                {/* Shockwave rings */}
                                <motion.div
                                    initial={{ opacity: 0.6, scale: 0.5 }}
                                    animate={{ opacity: 0, scale: 3 }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="w-40 h-40 rounded-full border border-emerald-400/30" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0.4, scale: 0.5 }}
                                    animate={{ opacity: 0, scale: 4 }}
                                    transition={{ duration: 2, delay: 0.2, ease: 'easeOut' }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="w-32 h-32 rounded-full border border-emerald-400/20" />
                                </motion.div>

                                {/* Glow behind */}
                                <div
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-24 pointer-events-none"
                                    style={{
                                        background: 'radial-gradient(ellipse, var(--overlay-green-15) 0%, transparent 70%)',
                                        filter: 'blur(20px)',
                                    }}
                                />

                                <motion.div
                                    className="text-5xl md:text-7xl font-black tracking-tighter mb-2 relative"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--white) 0%, var(--semantic-green-500) 50%, var(--accent-teal-bright) 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                    animate={{
                                        textShadow: [
                                            '0 0 20px var(--overlay-green-30)',
                                            '0 0 60px var(--overlay-green-10)',
                                            '0 0 20px var(--overlay-green-30)',
                                        ],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    SHIPPED.
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5, ease }}
                                    className="text-sm text-zinc-500 font-mono"
                                >
                                    Customers retained · Mission-critical · Zero regressions
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Metric cards with animated counters ── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
                        {METRICS.map((m, i) => {
                            const Icon = m.icon
                            const isActive = phase >= 2 + i
                            return (
                                <motion.div
                                    key={m.label}
                                    initial={{ opacity: 0, y: 30, scale: 0.85 }}
                                    animate={
                                        isActive
                                            ? { opacity: 1, y: 0, scale: 1 }
                                            : { opacity: 0, y: 30, scale: 0.85 }
                                    }
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.34, 1.56, 0.64, 1],
                                    }}
                                    className="relative rounded-xl border bg-white/[0.02] p-4 md:p-5 text-center overflow-hidden"
                                    style={{
                                        borderColor: isActive ? withHexAlpha(m.color, '20') : 'var(--overlay-white-04)',
                                    }}
                                >
                                    {/* Top accent */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2, ease }}
                                        className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                                        style={{ background: m.color }}
                                    />

                                    {/* Icon */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={isActive ? { scale: 1 } : { scale: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                                        className="flex items-center justify-center mb-3"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center"
                                            style={{
                                                background: withHexAlpha(m.color, '15'),
                                                border: `1px solid ${withHexAlpha(m.color, '25')}`,
                                            }}
                                        >
                                            <Icon className="w-5 h-5" style={{ color: withHexAlpha(m.color, '99') }} strokeWidth={1.5} />
                                        </div>
                                    </motion.div>

                                    {/* Counter */}
                                    <div className="mb-1">
                                        <MetricCounter item={m} active={isActive} />
                                    </div>

                                    {/* Label */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                                        transition={{ duration: 0.4, delay: 0.3 }}
                                        className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider"
                                    >
                                        {m.label}
                                    </motion.div>

                                    {/* Shimmer */}
                                    {isActive && (
                                        <motion.div
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '200%' }}
                                            transition={{ duration: 1, delay: 0.2, ease: 'easeInOut' }}
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: 'linear-gradient(90deg, transparent 0%, var(--overlay-white-04) 50%, transparent 100%)',
                                            }}
                                        />
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* ── Testimonial ── */}
                    <AnimatePresence>
                        {phase >= 6 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 0.8, ease }}
                                className="max-w-xl mx-auto"
                            >
                                <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 overflow-hidden">
                                    {/* Accent line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400" />

                                    <div className="text-4xl text-zinc-800 absolute -top-1 left-4">&ldquo;</div>
                                    <p className="text-base md:text-lg text-zinc-300 leading-relaxed italic pl-2">
                                        From the start, she impressed everyone with how quickly she grasped all aspects of a highly intricate system. She&apos;s the kind of UX leader any team would be lucky to have.
                                    </p>
                                    <AnimatePresence>
                                        {phase >= 7 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, ease }}
                                                className="flex items-center gap-3 mt-5 pl-2"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-white/80">YC</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-zinc-400 font-medium">
                                                        Yingchun Chen
                                                    </p>
                                                    <p className="text-[10px] text-zinc-600 font-mono">
                                                        Principal System Software Engineer
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Customer validation ── */}
                    <AnimatePresence>
                        {phase >= 8 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 2, ease }}
                                className="mt-14 md:mt-16 text-center max-w-2xl mx-auto"
                            >
                                <div className="border-t border-white/[0.06] pt-10">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 mb-5"
                                    >
                                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                                            Customer Feedback
                                        </span>
                                    </motion.div>
                                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed italic tracking-wide">
                                        During a Virtual User Group I hosted, a long-time customer said: &ldquo;RC looks great now &mdash; what are you planning next?&rdquo;
                                    </p>
                                    <p className="text-zinc-500 text-sm mt-4 font-mono uppercase tracking-wider">
                                        Customer retention validated. Satisfaction confirmed.
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
