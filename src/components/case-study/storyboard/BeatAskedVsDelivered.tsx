'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const ASKED = [
    'A visual refresh',
    'Updated screens',
    'Make it look modern',
]

const DELIVERED = [
    'A brand new integrated ReportCaster within the platform',
    '250+ screens covering every edge case',
    '5 fragmented subsystems unified into 1 Hub',
    'New features to address 40 years of customer complaints',
    'Complete documentation written from scratch',
    'A team of ~20 onboarded and trained personally',
]

export default function BeatAskedVsDelivered() {
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
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1: Scale appears
        timers.current.push(setTimeout(() => setPhase(1), 1400))
        // Phase 2-4: Asked items drop in (left side)
        ASKED.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(2 + i), 2200 + i * 600))
        })
        // Phase 5: Pause — "is that all?"
        timers.current.push(setTimeout(() => setPhase(5), 4400))
        // Phase 6: "But actually..." — delivered header
        timers.current.push(setTimeout(() => setPhase(6), 5200))
        // Phase 7-12: Delivered items stack (right side) — scale tips
        DELIVERED.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(7 + i), 5800 + i * 500))
        })
        // Phase 13: Scale fully tipped — closing
        timers.current.push(setTimeout(() => setPhase(13), 9200))
    }, [clear])

    useEffect(() => {
        if (isInView) play()
        else { clear(); setPhase(-1) }
        return clear
    }, [isInView, play, clear])

    // The scale tilts as delivered items accumulate
    const deliveredCount = Math.max(0, Math.min(phase - 6, DELIVERED.length))
    const tiltDeg = phase >= 13 ? -8 : phase >= 6 ? -(deliveredCount * 1.3) : 0

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <PresenterBar>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                        Customers were leaving. The brief said{' '}
                                        <span className="text-zinc-300 font-medium">&quot;visual refresh.&quot;</span>{' '}
                                        But a fresh coat of paint wouldn&apos;t bring them back.
                                    </p>
                                    <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
                                        So I rebuilt the entire product. 🏗️
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── The Scale ───────────────────────────── */}
                    <AnimatePresence>
                        {phase >= 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease }}
                                className="relative my-6"
                            >
                                {/* SVG Scale */}
                                <div className="flex justify-center mb-6">
                                    <svg viewBox="0 0 500 200" className="w-full max-w-xl" style={{ overflow: 'visible' }}>
                                        {/* Fulcrum */}
                                        <motion.g
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <polygon points="250,200 235,170 265,170" fill="var(--overlay-white-05)" stroke="var(--overlay-white-10)" strokeWidth="1" />
                                            <circle cx="250" cy="165" r="4" fill="var(--overlay-white-15)" />
                                        </motion.g>

                                        {/* Beam — tilts! */}
                                        <motion.g
                                            animate={{ rotate: tiltDeg }}
                                            transition={{ duration: 0.6, ease }}
                                            style={{ transformOrigin: '250px 165px' }}
                                        >
                                            {/* Beam bar */}
                                            <motion.rect
                                                x="60" y="162" width="380" height="6" rx="3"
                                                fill="var(--overlay-white-06)"
                                                stroke="var(--overlay-white-10)"
                                                strokeWidth="0.5"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 0.6, ease }}
                                                style={{ transformOrigin: '250px 165px' }}
                                            />

                                            {/* Left pan — "ASKED" */}
                                            <line x1="110" y1="168" x2="110" y2="130" stroke="var(--overlay-white-08)" strokeWidth="1" />
                                            <line x1="70" y1="130" x2="150" y2="130" stroke="var(--overlay-white-10)" strokeWidth="1.5" />
                                            {/* Pan arc */}
                                            <path d="M 70 130 Q 110 145 150 130" fill="none" stroke="var(--overlay-white-06)" strokeWidth="1" />

                                            {/* Stacked "asked" blocks */}
                                            {ASKED.map((_, i) => (
                                                <AnimatePresence key={`asked-block-${i}`}>
                                                    {phase >= 2 + i && (
                                                        <motion.rect
                                                            x={85 + i * 5}
                                                            y={118 - i * 12}
                                                            width={50 - i * 10}
                                                            height={10}
                                                            rx={2}
                                                            fill="var(--overlay-red-15)"
                                                            stroke="var(--overlay-red-30)"
                                                            strokeWidth={0.5}
                                                            initial={{ opacity: 0, y: -30 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{
                                                                duration: 0.5,
                                                                type: 'spring',
                                                                stiffness: 200,
                                                                damping: 15,
                                                            }}
                                                        />
                                                    )}
                                                </AnimatePresence>
                                            ))}

                                            {/* Left label */}
                                            <text x="110" y="155" textAnchor="middle" className="text-[8px] font-mono uppercase" fill="var(--overlay-red-40)">
                                                Asked
                                            </text>

                                            {/* Right pan — "DELIVERED" */}
                                            <line x1="390" y1="168" x2="390" y2="130" stroke="var(--overlay-white-08)" strokeWidth="1" />
                                            <line x1="340" y1="130" x2="440" y2="130" stroke="var(--overlay-white-10)" strokeWidth="1.5" />
                                            <path d="M 340 130 Q 390 145 440 130" fill="none" stroke="var(--overlay-white-06)" strokeWidth="1" />

                                            {/* Stacked "delivered" blocks */}
                                            {DELIVERED.map((_, i) => (
                                                <AnimatePresence key={`del-block-${i}`}>
                                                    {phase >= 7 + i && (
                                                        <motion.rect
                                                            x={355}
                                                            y={118 - i * 12}
                                                            width={70}
                                                            height={10}
                                                            rx={2}
                                                            fill="var(--overlay-emerald-light-15)"
                                                            stroke="var(--overlay-emerald-light-30)"
                                                            strokeWidth={0.5}
                                                            initial={{ opacity: 0, y: -40 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{
                                                                duration: 0.4,
                                                                type: 'spring',
                                                                stiffness: 250,
                                                                damping: 12,
                                                            }}
                                                        />
                                                    )}
                                                </AnimatePresence>
                                            ))}

                                            {/* Right label */}
                                            <text x="390" y="155" textAnchor="middle" className="text-[8px] font-mono uppercase" fill="var(--overlay-emerald-light-40)">
                                                Delivered
                                            </text>
                                        </motion.g>
                                    </svg>
                                </div>

                                {/* ── Text columns below scale ─────────── */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                    {/* Asked column */}
                                    <div>
                                        <AnimatePresence>
                                            {phase >= 1 && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: phase >= 5 ? 0.3 : 1 }}
                                                    transition={{ duration: 0.5, ease }}
                                                >
                                                    <div className="font-mono text-[10px] tracking-[0.3em] text-red-400/40 uppercase mb-4">
                                                        What they asked for
                                                    </div>
                                                    <div className="space-y-3">
                                                        {ASKED.map((item, i) => (
                                                            <motion.div key={item}
                                                                initial={{ opacity: 0, x: -15 }}
                                                                animate={phase >= 2 + i ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                                                                transition={{ duration: 0.4, ease }}
                                                                className="flex items-center gap-3"
                                                            >
                                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500/30 flex-shrink-0" />
                                                                <span className={`text-sm transition-all duration-500 ${phase >= 5 ? 'text-zinc-700 line-through decoration-red-500/30 decoration-2' : 'text-zinc-300'}`}>
                                                                    {item}
                                                                </span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                    {/* "Is that all?" micro-text */}
                                                    <AnimatePresence>
                                                        {phase >= 5 && phase < 6 && (
                                                            <motion.p
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 0.5 }}
                                                                exit={{ opacity: 0 }}
                                                                className="text-[10px] text-zinc-600 font-mono mt-3 italic"
                                                            >
                                                                ...is that all?
                                                            </motion.p>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Delivered column */}
                                    <div>
                                        <AnimatePresence>
                                            {phase >= 6 && (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }}>
                                                    <div className="font-mono text-[10px] tracking-[0.3em] text-emerald-400/60 uppercase mb-4">
                                                        What I actually delivered
                                                    </div>
                                                    <div className="space-y-3">
                                                        {DELIVERED.map((item, i) => (
                                                            <motion.div key={item}
                                                                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                                                animate={phase >= 7 + i ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 20, scale: 0.95 }}
                                                                transition={{ duration: 0.5, ease }}
                                                                className="flex items-start gap-3"
                                                            >
                                                                <motion.span
                                                                    className="flex-shrink-0 mt-1.5"
                                                                    initial={{ scale: 0 }}
                                                                    animate={phase >= 7 + i ? { scale: 1 } : { scale: 0 }}
                                                                    transition={{ type: 'spring', stiffness: 400 }}
                                                                >
                                                                    <svg width="12" height="12" viewBox="0 0 12 12">
                                                                        <circle cx="6" cy="6" r="5.5" fill="none" stroke="var(--overlay-emerald-light-40)" strokeWidth="1" />
                                                                        <motion.path
                                                                            d="M3.5 6l2 2 3-3.5"
                                                                            fill="none"
                                                                            stroke="var(--semantic-emerald-400)"
                                                                            strokeWidth="1.2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            initial={{ pathLength: 0 }}
                                                                            animate={phase >= 7 + i ? { pathLength: 1 } : { pathLength: 0 }}
                                                                            transition={{ duration: 0.3, delay: 0.15 }}
                                                                        />
                                                                    </svg>
                                                                </motion.span>
                                                                <span className="text-sm text-emerald-300/90">{item}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Score comparison */}
                                <AnimatePresence>
                                    {phase >= 13 && (
                                        <motion.div
                                            initial={{ opacity: 0, scaleX: 0 }}
                                            animate={{ opacity: 1, scaleX: 1 }}
                                            transition={{ duration: 0.6, ease }}
                                            className="mt-8 flex items-center justify-center gap-6"
                                        >
                                            <div className="text-center">
                                                <div className="text-3xl font-bold font-mono text-red-400/40">3</div>
                                                <div className="text-[9px] font-mono text-red-400/30 uppercase tracking-wider">asked</div>
                                            </div>
                                            <div className="text-zinc-700 text-lg font-light">vs</div>
                                            <div className="text-center">
                                                <motion.div
                                                    className="text-4xl font-bold font-mono text-emerald-400"
                                                    initial={{ scale: 0.5 }}
                                                    animate={{ scale: [0.5, 1.15, 1] }}
                                                    transition={{ duration: 0.5, ease }}
                                                >
                                                    6
                                                </motion.div>
                                                <div className="text-[9px] font-mono text-emerald-400/60 uppercase tracking-wider">delivered</div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Closing */}
                    <AnimatePresence>
                        {phase >= 13 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, ease }}
                                className="text-center mt-8"
                            >
                                <p className="text-white text-xl md:text-2xl font-semibold tracking-tight">
                                    They asked for a makeover. I delivered a brand new product.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}
