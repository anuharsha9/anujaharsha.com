'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface RecurrenceExample {
    label: string
    before: string
    after: string
    color: string
}

const EXAMPLES: RecurrenceExample[] = [
    {
        label: 'Weekly',
        before: 'RR=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20241231',
        after: 'Every Monday, Wednesday, and Friday until Dec 31',
        color: '#f97316',
    },
    {
        label: 'Monthly',
        before: 'RR=MONTHLY;BYMONTHDAY=15;INTERVAL=2',
        after: 'Every 2 months on the 15th',
        color: '#a78bfa',
    },
    {
        label: 'Yearly',
        before: 'RR=YEARLY;BYMONTH=3;BYDAY=2MO',
        after: 'Every March on the 2nd Monday',
        color: '#60a5fa',
    },
]

const PRINCIPLES = [
    { icon: '💬', label: 'Natural language summaries', desc: 'I wanted users to see what they mean, not codes.' },
    { icon: '🎚️', label: 'Progressive disclosure', desc: 'I kept it simple by default. Advanced when needed.' },
    { icon: '🛡️', label: 'Built-in error prevention', desc: 'I made it impossible to create invalid patterns.' },
]

/* ── Decoding text — randomizes then resolves ───── */
function DecodingText({
    text,
    active,
    color,
    className = '',
}: {
    text: string
    active: boolean
    color: string
    className?: string
}) {
    const [display, setDisplay] = useState(text)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*;:='

    useEffect(() => {
        if (!active) {
            setDisplay(text)
            return
        }
        let frame = 0
        const totalFrames = text.length * 2
        const interval = setInterval(() => {
            frame++
            const resolved = Math.floor(frame / 2)
            const result = text
                .split('')
                .map((char, i) => {
                    if (char === ' ') return ' '
                    if (i < resolved) return char
                    return chars[Math.floor(Math.random() * chars.length)]
                })
                .join('')
            setDisplay(result)
            if (frame >= totalFrames) clearInterval(interval)
        }, 30)
        return () => clearInterval(interval)
    }, [active, text])

    return (
        <span className={className} style={{ color }}>
            {display}
        </span>
    )
}

/* ── Single example row — before → scan → after ─── */
function ExampleRow({
    example,
    active,
    decoded,
    index,
}: {
    example: RecurrenceExample
    active: boolean
    decoded: boolean
    index: number
}) {
    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease }}
                    className="relative"
                >
                    {/* Terminal-style panel */}
                    <div
                        className="rounded-xl overflow-hidden border"
                        style={{
                            borderColor: decoded ? `${example.color}30` : 'rgba(255,255,255,0.04)',
                            background: decoded ? `${example.color}04` : 'rgba(255,255,255,0.01)',
                        }}
                    >
                        {/* Top bar */}
                        <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full" style={{ background: `${example.color}40` }} />
                                <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                                <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                            </div>
                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: `${example.color}80` }}>
                                {example.label}
                            </span>
                        </div>

                        <div className="p-4 md:p-5">
                            {/* Before — cryptic code */}
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        opacity: decoded ? 0.2 : 1,
                                        y: decoded ? -4 : 0,
                                        filter: decoded ? 'blur(2px)' : 'blur(0px)',
                                    }}
                                    transition={{ duration: 0.6, ease }}
                                    className="relative"
                                >
                                    <div className="font-mono text-[9px] text-rose-400/30 uppercase tracking-wider mb-1.5">
                                        INPUT
                                    </div>
                                    <code className={`text-sm md:text-base font-mono block transition-all duration-500 ${decoded ? 'line-through decoration-red-500/40 decoration-2 text-zinc-700' : 'text-rose-300/70'}`}>
                                        {example.before}
                                    </code>
                                </motion.div>

                                {/* Scan line sweeping across */}
                                {decoded && (
                                    <motion.div
                                        className="absolute inset-0 pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <motion.div
                                            className="absolute top-0 h-full w-1"
                                            style={{
                                                background: `linear-gradient(180deg, transparent, ${example.color}, transparent)`,
                                                boxShadow: `0 0 20px ${example.color}60`,
                                            }}
                                            initial={{ left: '0%' }}
                                            animate={{ left: '100%' }}
                                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                                        />
                                    </motion.div>
                                )}
                            </div>

                            {/* Arrow + After — decoded human text */}
                            <AnimatePresence>
                                {decoded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: 10 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3, ease }}
                                        className="mt-3 pt-3 border-t"
                                        style={{ borderColor: `${example.color}15` }}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.3, delay: 0.4, type: 'spring' }}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20">
                                                    <circle cx="10" cy="10" r="9" fill="none" stroke={`${example.color}40`} strokeWidth="1.5" />
                                                    <motion.path
                                                        d="M6 10l3 3 5-6"
                                                        fill="none"
                                                        stroke={example.color}
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 0.4, delay: 0.5 }}
                                                    />
                                                </svg>
                                            </motion.div>
                                            <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: `${example.color}60` }}>
                                                DECODED
                                            </span>
                                        </div>
                                        <p className="text-base md:text-lg font-medium pl-7" style={{ color: example.color }}>
                                            <DecodingText
                                                text={example.after}
                                                active={decoded}
                                                color={example.color}
                                            />
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

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
        // Phase 0: Narrator
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1-3: Code examples appear one by one
        EXAMPLES.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 1), 1400 + i * 1200))
        })
        // Phase 4: Scan + decode all
        timers.current.push(setTimeout(() => setPhase(4), 5600))
        // Phase 5: Decode example 2
        timers.current.push(setTimeout(() => setPhase(5), 6400))
        // Phase 6: Decode example 3
        timers.current.push(setTimeout(() => setPhase(6), 7200))
        // Phase 7: Principles
        timers.current.push(setTimeout(() => setPhase(7), 8500))
        // Phase 8-10: Each principle
        PRINCIPLES.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(8 + i), 9100 + i * 400))
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

                    {/* Before → After decoder panels */}
                    <div className="space-y-4 mb-8">
                        {EXAMPLES.map((ex, i) => (
                            <ExampleRow
                                key={ex.label}
                                example={ex}
                                active={phase >= i + 1}
                                decoded={phase >= 4 + i}
                                index={i}
                            />
                        ))}
                    </div>

                    {/* Design principles */}
                    <AnimatePresence>
                        {phase >= 7 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.5, ease }}
                                    className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-6 origin-center"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {PRINCIPLES.map((p, i) => (
                                        <motion.div
                                            key={p.label}
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={
                                                phase >= 8 + i
                                                    ? { opacity: 1, y: 0, scale: 1 }
                                                    : { opacity: 0, y: 15, scale: 0.95 }
                                            }
                                            transition={{ duration: 0.5, ease }}
                                            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center"
                                        >
                                            <div className="text-2xl mb-2">{p.icon}</div>
                                            <div className="text-xs font-semibold text-white mb-1">{p.label}</div>
                                            <div className="text-[10px] text-zinc-500 font-mono leading-relaxed">{p.desc}</div>
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
