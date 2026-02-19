'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ── Wireframe skeleton line ────────────────────── */
function SkeletonLine({ w = '100%', h = 6, className = '' }: { w?: string | number; h?: number; className?: string }) {
    return (
        <div
            className={`rounded-full ${className}`}
            style={{ width: w, height: h }}
        />
    )
}

/* ── Wireframe UI panel ─────────────────────────── */
function WireframePanel({
    label,
    children,
    borderColor = 'border-white/[0.08]',
    accentColor = 'bg-zinc-700/40',
    dimmed = false,
    strikethrough = false,
}: {
    label: string
    children: React.ReactNode
    borderColor?: string
    accentColor?: string
    dimmed?: boolean
    strikethrough?: boolean
}) {
    return (
        <div className={`rounded-xl border ${borderColor} bg-zinc-900/60 p-4 transition-opacity duration-700 ${dimmed ? 'opacity-30' : 'opacity-100'}`}>
            {/* Title bar */}
            <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-zinc-600" />
                    <div className="w-2 h-2 rounded-full bg-zinc-600" />
                    <div className="w-2 h-2 rounded-full bg-zinc-600" />
                </div>
                <span className={`text-[10px] font-mono uppercase tracking-wider ${strikethrough ? 'text-zinc-600 line-through' : 'text-zinc-400'}`}>
                    {label}
                </span>
            </div>
            {/* Skeleton content */}
            <div className="space-y-2">
                {children}
            </div>
            {/* Strike overlay */}
            {strikethrough && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80%] h-[1px] bg-red-500/30 rotate-[-8deg]" />
                </div>
            )}
        </div>
    )
}

export default function BeatScheduler() {
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
        // Phase 0: Speech bubble
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1: Before wireframes appear
        timers.current.push(setTimeout(() => setPhase(1), 1400))
        // Phase 2: Before wireframes get dimmed/struck
        timers.current.push(setTimeout(() => setPhase(2), 3000))
        // Phase 3: Arrow + transformation
        timers.current.push(setTimeout(() => setPhase(3), 3800))
        // Phase 4: After unified modal wireframe
        timers.current.push(setTimeout(() => setPhase(4), 4600))
        // Phase 5: Progressive layers inside modal
        timers.current.push(setTimeout(() => setPhase(5), 5400))
        // Phase 6: Contextual launch indicator
        timers.current.push(setTimeout(() => setPhase(6), 6200))
        // Phase 7: Closer
        timers.current.push(setTimeout(() => setPhase(7), 7200))
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
                                        The scheduler hadn&apos;t been redesigned in{' '}
                                        <span className="text-amber-400 font-bold">40+ years.</span>
                                    </p>
                                    <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed mt-2">
                                        Two entry points. Two completely different UIs.{' '}
                                        <span className="text-zinc-200 font-medium">Basic</span> and{' '}
                                        <span className="text-zinc-200 font-medium">Advanced</span> — doing the same thing, differently.
                                    </p>
                                    <p className="text-sm md:text-base text-red-400/80 font-semibold mt-3 tracking-tight">
                                        BIG NO NO. 🚫
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Wireframe visualization */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center mt-2">

                        {/* ── BEFORE: Two separate panels ────── */}
                        <div>
                            <AnimatePresence>
                                {phase >= 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease }}
                                        className="space-y-3"
                                    >
                                        <div className="font-mono text-[10px] tracking-[0.25em] text-rose-400/60 uppercase mb-3">
                                            Before
                                        </div>

                                        {/* Basic panel */}
                                        <motion.div
                                            animate={phase >= 2 ? { opacity: 0.3, scale: 0.97 } : { opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.8, ease }}
                                            className="relative"
                                        >
                                            <WireframePanel
                                                label="Basic Mode"
                                                borderColor="border-white/[0.06]"
                                                strikethrough={phase >= 2}
                                            >
                                                <SkeletonLine w="60%" className="bg-zinc-700/50" />
                                                <SkeletonLine w="80%" className="bg-zinc-700/30" />
                                                <SkeletonLine w="45%" className="bg-zinc-700/30" />
                                                <div className="flex gap-2 mt-2">
                                                    <div className="w-14 h-5 rounded bg-zinc-700/30" />
                                                    <div className="w-14 h-5 rounded bg-zinc-700/20" />
                                                </div>
                                            </WireframePanel>
                                            {phase >= 2 && (
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: 0.4, ease }}
                                                    className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-red-500/40 origin-left"
                                                />
                                            )}
                                        </motion.div>

                                        {/* Advanced panel */}
                                        <motion.div
                                            animate={phase >= 2 ? { opacity: 0.3, scale: 0.97 } : { opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.8, ease, delay: 0.1 }}
                                            className="relative"
                                        >
                                            <WireframePanel
                                                label="Advanced Mode"
                                                borderColor="border-white/[0.06]"
                                                strikethrough={phase >= 2}
                                            >
                                                <SkeletonLine w="70%" className="bg-zinc-700/50" />
                                                <SkeletonLine w="90%" className="bg-zinc-700/30" />
                                                <SkeletonLine w="55%" className="bg-zinc-700/30" />
                                                <SkeletonLine w="75%" className="bg-zinc-700/30" />
                                                <div className="flex gap-2 mt-2">
                                                    <div className="w-14 h-5 rounded bg-zinc-700/30" />
                                                    <div className="w-14 h-5 rounded bg-zinc-700/20" />
                                                    <div className="w-14 h-5 rounded bg-zinc-700/20" />
                                                </div>
                                            </WireframePanel>
                                            {phase >= 2 && (
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: 0.4, ease, delay: 0.15 }}
                                                    className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-red-500/40 origin-left"
                                                />
                                            )}
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ── Arrow / transformation ────────── */}
                        <AnimatePresence>
                            {phase >= 3 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                                    className="hidden md:flex flex-col items-center gap-2"
                                >
                                    <div className="w-10 h-10 rounded-full border border-emerald-500/20 bg-emerald-500/[0.05] flex items-center justify-center">
                                        <span className="text-emerald-400 text-sm">→</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ── AFTER: One unified modal ───────── */}
                        <div>
                            <AnimatePresence>
                                {phase >= 4 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.7, ease }}
                                    >
                                        <div className="font-mono text-[10px] tracking-[0.25em] text-emerald-400/60 uppercase mb-3">
                                            After
                                        </div>

                                        {/* Unified modal wireframe */}
                                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02] p-4 relative overflow-hidden">
                                            {/* Modal title bar */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500/30" />
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                                                </div>
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/70">
                                                    Unified Scheduler
                                                </span>
                                            </div>

                                            {/* Top section — always visible */}
                                            <div className="space-y-2 mb-3">
                                                <SkeletonLine w="50%" className="bg-emerald-500/20" />
                                                <SkeletonLine w="70%" className="bg-emerald-500/10" />
                                            </div>

                                            {/* Progressive disclosure layers */}
                                            <AnimatePresence>
                                                {phase >= 5 && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        transition={{ duration: 0.6, ease }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="border-t border-emerald-500/10 pt-3 mt-1 space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded border border-emerald-500/30 flex items-center justify-center">
                                                                    <motion.span
                                                                        initial={{ scale: 0 }}
                                                                        animate={{ scale: 1 }}
                                                                        transition={{ delay: 0.3 }}
                                                                        className="text-[6px] text-emerald-400"
                                                                    >
                                                                        ▾
                                                                    </motion.span>
                                                                </div>
                                                                <span className="text-[10px] font-mono text-emerald-400/50 uppercase tracking-wider">
                                                                    Advanced options
                                                                </span>
                                                            </div>
                                                            <SkeletonLine w="65%" className="bg-emerald-500/10" />
                                                            <SkeletonLine w="80%" className="bg-emerald-500/10" />
                                                            <SkeletonLine w="40%" className="bg-emerald-500/10" />
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Contextual launch indicator */}
                                            <AnimatePresence>
                                                {phase >= 6 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.5, ease }}
                                                        className="mt-3 pt-3 border-t border-emerald-500/10"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center">
                                                                <span className="text-[9px] text-emerald-400">+</span>
                                                            </div>
                                                            <span className="text-[10px] font-mono text-emerald-400/40">
                                                                Launch from anywhere
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Subtle glow pulse */}
                                            <motion.div
                                                animate={{ opacity: [0, 0.15, 0] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                                className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Closing */}
                    <AnimatePresence>
                        {phase >= 7 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="text-center mt-8"
                            >
                                <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
                                    One modal. Any complexity level.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
