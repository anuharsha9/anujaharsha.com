'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface Pivot {
    version: string
    title: string
    desc: string
    verdict: 'rejected' | 'accepted'
    reason: string
    color: string
}

const PIVOTS: Pivot[] = [
    {
        version: 'V1',
        title: 'Independent Product',
        desc: 'Designed as a standalone product — consistent with how the platform handled other complex tools.',
        verdict: 'rejected',
        reason: '"Leadership wants all workflows centralized in the Hub."',
        color: 'var(--tone-red-400)',
    },
    {
        version: 'V2',
        title: 'Hub Plugin',
        desc: 'Embedded as a plugin in the Hub, with its own icon on the side nav. I loved this version the most.',
        verdict: 'rejected',
        reason: '"Too much engineering effort. Too big of an addition this year."',
        color: 'var(--tone-red-400)',
    },
    {
        version: 'V3',
        title: 'Hub Panel Integration',
        desc: 'Reframed. Redesigned. Built as a panel within the existing Hub — technically feasible, strategically aligned.',
        verdict: 'accepted',
        reason: '"This is the one. Ship it."',
        color: 'var(--semantic-emerald-400)',
    },
]

export default function BeatThreePivots() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.25 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout)
        timers.current = []
    }, [])

    const play = useCallback(() => {
        clear()
        setPhase(-1)
        // Phase 0: Narrator intro
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1: V1 draws in
        timers.current.push(setTimeout(() => setPhase(1), 1400))
        // Phase 2: V1 REJECTED — smash
        timers.current.push(setTimeout(() => setPhase(2), 3000))
        // Phase 3: V2 draws in
        timers.current.push(setTimeout(() => setPhase(3), 4400))
        // Phase 4: V2 REJECTED — smash
        timers.current.push(setTimeout(() => setPhase(4), 6000))
        // Phase 5: Pause beat — "I failed twice fast"
        timers.current.push(setTimeout(() => setPhase(5), 7600))
        // Phase 6: V3 emerges — triumphant
        timers.current.push(setTimeout(() => setPhase(6), 9200))
        // Phase 7: V3 accepted — glow
        timers.current.push(setTimeout(() => setPhase(7), 10800))
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
                                    <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed">
                                        <span className="text-red-400 font-medium">V1 — rejected.</span>{' '}
                                        <span className="text-red-400 font-medium">V2 — rejected.</span>
                                    </p>
                                    <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed mt-2">
                                        Instead of fighting the decisions,{' '}
                                        <span className="text-zinc-200 font-medium">I reframed the problem from scratch.</span>
                                    </p>
                                    <p className="text-sm md:text-base text-zinc-400 mt-3">
                                        So I came up with a <span className="text-zinc-200 font-medium">V3</span>.
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* === DRAMATIC TIMELINE === */}
                    <div className="relative mt-8 ml-6 md:ml-12 pl-10 md:pl-14 pb-4">

                        {/* Vertical spine SVG */}
                        <div className="absolute left-0 top-0 bottom-0 w-10 md:w-12">
                            <svg className="w-full h-full" preserveAspectRatio="none">
                                <motion.line
                                    x1="50%" y1="0" x2="50%" y2="100%"
                                    stroke="var(--overlay-white-06)"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={phase >= 1 ? { pathLength: 1 } : { pathLength: 0 }}
                                    transition={{ duration: 2, ease }}
                                />
                                {/* Scan pulse */}
                                {phase >= 1 && (
                                    <motion.circle
                                        cx="50%" r="3"
                                        fill="var(--overlay-white-15)"
                                        initial={{ cy: '0%' }}
                                        animate={{ cy: '100%' }}
                                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                    />
                                )}
                            </svg>
                        </div>

                        {/* === V1 === */}
                        <div className="relative mb-10 md:mb-14">
                            {/* Timeline node */}
                            <div className="absolute -left-10 md:-left-14 top-0 w-10 md:w-12 flex justify-center">
                                <motion.div
                                    className="relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={
                                        phase >= 1
                                            ? phase >= 2
                                                ? { scale: [1, 1.3, 0.9, 1], opacity: 1 }
                                                : { scale: 1, opacity: 1 }
                                            : { scale: 0, opacity: 0 }
                                    }
                                    transition={
                                        phase >= 2
                                            ? { duration: 0.4, ease: 'easeOut' }
                                            : { duration: 0.5, ease }
                                    }
                                    style={{
                                        background: phase >= 2
                                            ? 'var(--overlay-red-15)'
                                            : 'var(--overlay-white-06)',
                                        border: `2px solid ${phase >= 2 ? 'var(--overlay-red-40)' : 'var(--overlay-white-10)'}`,
                                        transition: 'background 0.4s, border-color 0.4s',
                                    }}
                                >
                                    <span className="font-mono text-xs font-bold" style={{
                                        color: phase >= 2 ? 'var(--semantic-red-500)' : 'var(--white)',
                                        transition: 'color 0.4s',
                                    }}>V1</span>

                                    {/* Rejection X overlay */}
                                    {phase >= 2 && (
                                        <motion.svg
                                            className="absolute inset-0 w-full h-full"
                                            viewBox="0 0 48 48"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                        >
                                            <motion.line
                                                x1="14" y1="14" x2="34" y2="34"
                                                stroke="var(--semantic-red-500)" strokeWidth="2.5" strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.25 }}
                                            />
                                            <motion.line
                                                x1="34" y1="14" x2="14" y2="34"
                                                stroke="var(--semantic-red-500)" strokeWidth="2.5" strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.25, delay: 0.1 }}
                                            />
                                        </motion.svg>
                                    )}

                                    {/* Shockwave ring */}
                                    {phase >= 2 && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full pointer-events-none"
                                            initial={{ scale: 1, opacity: 0.5 }}
                                            animate={{ scale: 2.5, opacity: 0 }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                            style={{ border: '2px solid var(--overlay-red-40)' }}
                                        />
                                    )}
                                </motion.div>
                            </div>

                            {/* Content */}
                            <AnimatePresence>
                                {phase >= 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
                                        animate={{
                                            opacity: phase >= 2 ? 0.35 : 1,
                                            x: 0,
                                            filter: 'blur(0px)',
                                        }}
                                        transition={{ duration: 0.6, ease }}
                                    >
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <span className={`text-lg md:text-xl font-bold tracking-tight ${phase >= 2 ? 'line-through decoration-red-500/60 text-zinc-500' : 'text-white'}`}
                                                style={{ transition: 'color 0.4s' }}>
                                                Independent Product
                                            </span>
                                        </div>
                                        <p className="text-sm text-zinc-400 leading-relaxed mb-3 max-w-lg">
                                            Designed as a standalone product — consistent with how the platform handled other complex tools.
                                        </p>

                                        {/* Rejection reason */}
                                        <AnimatePresence>
                                            {phase >= 2 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, height: 0 }}
                                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                    transition={{ duration: 0.5, ease }}
                                                    className="flex items-start gap-2 mt-2"
                                                >
                                                    <div className="w-1 h-full min-h-[24px] rounded-full bg-red-500/30 flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs md:text-sm font-mono text-red-400/80 italic leading-relaxed">
                                                        &ldquo;Leadership wants all workflows centralized in the Hub.&rdquo;
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* REJECTED stamp */}
                                        {phase >= 2 && (
                                            <motion.div
                                                className="mt-3"
                                                initial={{ opacity: 0, scale: 3, rotate: -15 }}
                                                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                            >
                                                <span className="inline-block font-mono text-[10px] tracking-[0.3em] text-red-500/60 border border-red-500/20 rounded px-3 py-1 uppercase">
                                                    Rejected
                                                </span>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* === V2 === */}
                        <div className="relative mb-10 md:mb-14">
                            {/* Timeline node */}
                            <div className="absolute -left-10 md:-left-14 top-0 w-10 md:w-12 flex justify-center">
                                <motion.div
                                    className="relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={
                                        phase >= 3
                                            ? phase >= 4
                                                ? { scale: [1, 1.3, 0.9, 1], opacity: 1 }
                                                : { scale: 1, opacity: 1 }
                                            : { scale: 0, opacity: 0 }
                                    }
                                    transition={
                                        phase >= 4
                                            ? { duration: 0.4, ease: 'easeOut' }
                                            : { duration: 0.5, ease }
                                    }
                                    style={{
                                        background: phase >= 4
                                            ? 'var(--overlay-red-15)'
                                            : 'var(--overlay-white-06)',
                                        border: `2px solid ${phase >= 4 ? 'var(--overlay-red-40)' : 'var(--overlay-white-10)'}`,
                                        transition: 'background 0.4s, border-color 0.4s',
                                    }}
                                >
                                    <span className="font-mono text-xs font-bold" style={{
                                        color: phase >= 4 ? 'var(--semantic-red-500)' : 'var(--white)',
                                        transition: 'color 0.4s',
                                    }}>V2</span>

                                    {/* Rejection X overlay */}
                                    {phase >= 4 && (
                                        <motion.svg
                                            className="absolute inset-0 w-full h-full"
                                            viewBox="0 0 48 48"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                        >
                                            <motion.line
                                                x1="14" y1="14" x2="34" y2="34"
                                                stroke="var(--semantic-red-500)" strokeWidth="2.5" strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.25 }}
                                            />
                                            <motion.line
                                                x1="34" y1="14" x2="14" y2="34"
                                                stroke="var(--semantic-red-500)" strokeWidth="2.5" strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.25, delay: 0.1 }}
                                            />
                                        </motion.svg>
                                    )}

                                    {/* Shockwave ring */}
                                    {phase >= 4 && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full pointer-events-none"
                                            initial={{ scale: 1, opacity: 0.5 }}
                                            animate={{ scale: 2.5, opacity: 0 }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                            style={{ border: '2px solid var(--overlay-red-40)' }}
                                        />
                                    )}
                                </motion.div>
                            </div>

                            {/* Content */}
                            <AnimatePresence>
                                {phase >= 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
                                        animate={{
                                            opacity: phase >= 4 ? 0.35 : 1,
                                            x: 0,
                                            filter: 'blur(0px)',
                                        }}
                                        transition={{ duration: 0.6, ease }}
                                    >
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <span className={`text-lg md:text-xl font-bold tracking-tight ${phase >= 4 ? 'line-through decoration-red-500/60 text-zinc-500' : 'text-white'}`}
                                                style={{ transition: 'color 0.4s' }}>
                                                Hub Plugin
                                            </span>
                                        </div>
                                        <p className="text-sm text-zinc-400 leading-relaxed mb-3 max-w-lg">
                                            Embedded as a plugin in the Hub, with its own icon on the side nav. I loved this version the most.
                                        </p>

                                        {/* Rejection reason */}
                                        <AnimatePresence>
                                            {phase >= 4 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, height: 0 }}
                                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                    transition={{ duration: 0.5, ease }}
                                                    className="flex items-start gap-2 mt-2"
                                                >
                                                    <div className="w-1 h-full min-h-[24px] rounded-full bg-red-500/30 flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs md:text-sm font-mono text-red-400/80 italic leading-relaxed">
                                                        &ldquo;Too much engineering effort. Too big of an addition this year.&rdquo;
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* REJECTED stamp */}
                                        {phase >= 4 && (
                                            <motion.div
                                                className="mt-3"
                                                initial={{ opacity: 0, scale: 3, rotate: -15 }}
                                                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                            >
                                                <span className="inline-block font-mono text-[10px] tracking-[0.3em] text-red-500/60 border border-red-500/20 rounded px-3 py-1 uppercase">
                                                    Rejected
                                                </span>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* === DRAMATIC PAUSE === */}
                        <AnimatePresence>
                            {phase >= 5 && phase < 6 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="text-center py-6 -ml-10 md:-ml-14"
                                >
                                    <motion.p
                                        className="text-white text-xl md:text-2xl font-bold tracking-tight"
                                        initial={{ y: 20, filter: 'blur(10px)' }}
                                        animate={{ y: 0, filter: 'blur(0px)' }}
                                        transition={{ duration: 0.8, ease }}
                                    >
                                        I failed twice fast.
                                    </motion.p>
                                    <motion.p
                                        className="text-zinc-500 text-sm mt-2 font-mono"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                    >
                                        But the third time?
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* === V3 — THE ONE === */}
                        <div className="relative">
                            {/* Timeline node — TRIUMPHANT */}
                            <div className="absolute -left-10 md:-left-14 top-0 w-10 md:w-12 flex justify-center">
                                <AnimatePresence>
                                    {phase >= 6 && (
                                        <motion.div
                                            className="relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.6, ease }}
                                            style={{
                                                background: phase >= 7
                                                    ? 'var(--overlay-emerald-light-20)'
                                                    : 'var(--overlay-white-06)',
                                                border: `2px solid ${phase >= 7 ? 'var(--overlay-emerald-light-50)' : 'var(--overlay-white-15)'}`,
                                                transition: 'background 0.6s, border-color 0.6s',
                                                boxShadow: phase >= 7
                                                    ? '0 0 20px var(--overlay-emerald-light-30), 0 0 40px var(--overlay-emerald-light-10)'
                                                    : 'none',
                                            }}
                                        >
                                            <span className="font-mono text-xs font-bold" style={{
                                                color: phase >= 7 ? 'var(--semantic-emerald-400)' : 'var(--white)',
                                                transition: 'color 0.6s',
                                            }}>V3</span>

                                            {/* Checkmark */}
                                            {phase >= 7 && (
                                                <motion.svg
                                                    className="absolute inset-0 w-full h-full"
                                                    viewBox="0 0 48 48"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    <motion.path
                                                        d="M 15 25 L 22 32 L 35 18"
                                                        fill="none"
                                                        stroke="var(--semantic-emerald-400)"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 0.4, delay: 0.1, ease }}
                                                    />
                                                </motion.svg>
                                            )}

                                            {/* Success pulse rings */}
                                            {phase >= 7 && [0, 1, 2].map((ri) => (
                                                <motion.div
                                                    key={ri}
                                                    className="absolute inset-0 rounded-full pointer-events-none"
                                                    initial={{ scale: 1, opacity: 0.3 }}
                                                    animate={{ scale: 3, opacity: 0 }}
                                                    transition={{
                                                        duration: 1.5,
                                                        delay: ri * 0.3,
                                                        repeat: Infinity,
                                                        repeatDelay: 1,
                                                        ease: 'easeOut',
                                                    }}
                                                    style={{ border: '1.5px solid var(--overlay-emerald-light-30)' }}
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* V3 content */}
                            <AnimatePresence>
                                {phase >= 6 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -30, filter: 'blur(12px)' }}
                                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        transition={{ duration: 0.8, ease }}
                                    >
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <span className="text-lg md:text-xl font-bold tracking-tight"
                                                style={{
                                                    color: phase >= 7 ? 'var(--semantic-emerald-400)' : 'var(--white)',
                                                    transition: 'color 0.6s',
                                                }}>
                                                Hub Panel Integration
                                            </span>
                                        </div>
                                        <p className="text-sm text-zinc-400 leading-relaxed mb-3 max-w-lg">
                                            Reframed. Redesigned. Built as a panel within the existing Hub — technically feasible, strategically aligned.
                                        </p>

                                        {/* Accepted reason */}
                                        <AnimatePresence>
                                            {phase >= 7 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, height: 0 }}
                                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                    transition={{ duration: 0.5, ease }}
                                                    className="flex items-start gap-2 mt-2"
                                                >
                                                    <div className="w-1 h-full min-h-[24px] rounded-full bg-emerald-500/40 flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs md:text-sm font-mono text-emerald-400/90 italic leading-relaxed">
                                                        &ldquo;This is the one. Ship it.&rdquo;
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* APPROVED stamp */}
                                        {phase >= 7 && (
                                            <motion.div
                                                className="mt-3"
                                                initial={{ opacity: 0, scale: 3, rotate: 15 }}
                                                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                            >
                                                <span className="inline-block font-mono text-[10px] tracking-[0.3em] text-emerald-400/80 border border-emerald-500/30 rounded px-3 py-1 uppercase"
                                                    style={{
                                                        boxShadow: '0 0 12px var(--overlay-emerald-light-15)',
                                                    }}>
                                                    Approved ✓
                                                </span>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Final closing — below the timeline */}
                    <AnimatePresence>
                        {phase >= 7 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1.2, ease }}
                                className="text-center mt-8"
                            >
                                <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mb-6" />
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                    Two rejections. Zero bitterness. Each &ldquo;no&rdquo; sharpened the final solution.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}
