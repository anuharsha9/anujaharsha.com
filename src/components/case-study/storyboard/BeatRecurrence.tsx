'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'
import { withHexAlpha } from '@/lib/color-utils'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface RecurrenceExample {
    label: string
    beforeUI: string[]  // represents the cluttered settings
    after: string
    color: string
}

const EXAMPLES: RecurrenceExample[] = [
    {
        label: 'Weekly',
        beforeUI: ['☐ Mon ☑ Tue ☐ Wed ☑ Thu ☐ Fri', 'End: ☐ Never ☑ Date [12/31/24]', 'Repeat: [1] week(s)'],
        after: 'Every Tuesday and Thursday until Dec 31',
        color: 'var(--semantic-orange)',
    },
    {
        label: 'Monthly',
        beforeUI: ['Day: [15] ▾', 'Interval: [2] month(s)', 'On: ☐ First ☐ Last ☑ Exact'],
        after: 'Every 2 months on the 15th',
        color: 'var(--semantic-purple)',
    },
    {
        label: 'Yearly',
        beforeUI: ['Month: [March] ▾', 'Week: [2nd] ▾  Day: [Monday] ▾', 'End: ☐ After [—] occ.'],
        after: 'Every March on the 2nd Monday',
        color: 'var(--semantic-blue)',
    },
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

export default function BeatRecurrence() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout)
        timers.current = []
    }, [])

    const startVisuals = useCallback(() => {
        // All 3 examples appear
        EXAMPLES.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 1), 300 + i * 1000))
        })
        // Decode all 3 sequentially
        timers.current.push(setTimeout(() => setPhase(4), 4200))
        timers.current.push(setTimeout(() => setPhase(5), 5200))
        timers.current.push(setTimeout(() => setPhase(6), 6200))
    }, [])

    useEffect(() => {
        if (isInView) {
            timers.current.push(setTimeout(() => setPhase(0), 400))
        } else {
            clear()
            setPhase(-1)
        }
        return clear
    }, [isInView, clear])

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    {/* Presenter narration */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <PresenterBar onTypingComplete={startVisuals}>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                        The recurrence settings were{' '}
                                        <span className="text-zinc-200 font-medium">outdated, cluttered, and confusing.</span>{' '}
                                        Too many options crammed together — hard to tell what you&apos;d actually configured.
                                    </p>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed mt-2">
                                        I added a{' '}
                                        <span className="text-zinc-200 font-medium">natural language sentence</span>{' '}
                                        that renders after selecting your settings — so you instantly see what your schedule means. Pure UX.
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Before → After — 3-column horizontal layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                        {EXAMPLES.map((ex, i) => {
                            const isVisible = phase >= i + 1
                            const isDecoded = phase >= 4 + i
                            return (
                                <AnimatePresence key={ex.label}>
                                    {isVisible && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, ease }}
                                            className="rounded-xl border overflow-hidden relative"
                                            style={{
                                                borderColor: isDecoded ? withHexAlpha(ex.color, '25') : 'var(--overlay-white-06)',
                                                background: isDecoded ? withHexAlpha(ex.color, '04') : 'var(--overlay-white-02)',
                                                transition: 'border-color 0.5s, background 0.5s',
                                            }}
                                        >
                                            {/* Header with window chrome */}
                                            <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: 'var(--overlay-white-04)' }}>
                                                <div className="flex gap-1.5">
                                                    <div className="w-2 h-2 rounded-full" style={{ background: withHexAlpha(ex.color, '50') }} />
                                                    <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                                                    <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                                                </div>
                                                <span className="font-mono text-[11px] tracking-[0.15em] uppercase" style={{ color: ex.color }}>
                                                    {ex.label}
                                                </span>
                                            </div>

                                            <div className="p-3 relative">
                                                {/* Before — cluttered settings UI */}
                                                <motion.div
                                                    animate={{
                                                        opacity: isDecoded ? 0.2 : 1,
                                                        y: isDecoded ? -2 : 0,
                                                        filter: isDecoded ? 'blur(1.5px)' : 'blur(0px)',
                                                    }}
                                                    transition={{ duration: 0.5, ease }}
                                                >
                                                    {ex.beforeUI.map((line, li) => (
                                                        <div key={li} className="text-[11px] font-mono text-zinc-400 leading-relaxed">
                                                            {line}
                                                        </div>
                                                    ))}
                                                </motion.div>

                                                {/* Scan line sweep */}
                                                {isDecoded && (
                                                    <motion.div
                                                        className="absolute inset-0 pointer-events-none"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ duration: 0.7 }}
                                                    >
                                                        <motion.div
                                                            className="absolute top-0 h-full w-0.5"
                                                            style={{
                                                                background: `linear-gradient(180deg, transparent, ${ex.color}, transparent)`,
                                                                boxShadow: `0 0 16px ${withHexAlpha(ex.color, '50')}`,
                                                            }}
                                                            initial={{ left: '0%' }}
                                                            animate={{ left: '100%' }}
                                                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                                                        />
                                                    </motion.div>
                                                )}

                                                {/* After — natural language with checkmark */}
                                                <AnimatePresence>
                                                    {isDecoded && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            transition={{ duration: 0.5, delay: 0.25, ease }}
                                                            className="mt-2 pt-2 border-t"
                                                            style={{ borderColor: withHexAlpha(ex.color, '15') }}
                                                        >
                                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                                <motion.div
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    transition={{ duration: 0.3, delay: 0.3, type: 'spring' }}
                                                                >
                                                                    <svg width="16" height="16" viewBox="0 0 16 16">
                                                                        <circle cx="8" cy="8" r="7" fill="none" stroke={withHexAlpha(ex.color, '40')} strokeWidth="1.5" />
                                                                        <motion.path
                                                                            d="M5 8l2 2 4-4.5"
                                                                            fill="none"
                                                                            stroke={ex.color}
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            initial={{ pathLength: 0 }}
                                                                            animate={{ pathLength: 1 }}
                                                                            transition={{ duration: 0.3, delay: 0.4 }}
                                                                        />
                                                                    </svg>
                                                                </motion.div>
                                                                <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: ex.color }}>
                                                                    Plain English
                                                                </span>
                                                            </div>
                                                            <p className="text-sm font-medium pl-5" style={{ color: ex.color }}>
                                                                <DecodingText
                                                                    text={ex.after}
                                                                    active={isDecoded}
                                                                    color={ex.color}
                                                                />
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}
