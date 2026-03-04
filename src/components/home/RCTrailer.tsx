'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─── Word-by-word kinetic text ─── */
function KineticLine({
    children,
    className = '',
    delay = 0,
    emphasisWords = [] as string[],
    emphasisClass = 'text-rose-400',
}: {
    children: string
    className?: string
    delay?: number
    emphasisWords?: string[]
    emphasisClass?: string
}) {
    const words = children.split(' ')
    return (
        <span className={`inline-flex flex-wrap items-baseline justify-center gap-x-[0.32em] ${className}`}>
            {words.map((word, i) => {
                const clean = word.replace(/[.,!?'"]/g, '').toLowerCase()
                const isEmphasis = emphasisWords.some(w => clean === w.toLowerCase())
                return (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 32, filter: 'blur(10px)', scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                        transition={{
                            duration: 0.55,
                            delay: delay + i * 0.07,
                            ease,
                        }}
                        className={isEmphasis ? emphasisClass : ''}
                    >
                        {word}
                    </motion.span>
                )
            })}
        </span>
    )
}

/* ─── Character-level slam ─── */
function SlamText({ children, className = '' }: { children: string; className?: string }) {
    const chars = children.split('')
    return (
        <span className={className}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 80, scale: 1.6, filter: 'blur(16px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    transition={{
                        duration: 0.35,
                        delay: i * 0.035,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                >
                    {char}
                </motion.span>
            ))}
        </span>
    )
}

/* ─── Fragment nodes config ─── */
const NODES = [
    { sx: 10, sy: 18, color: '#f43f5e' },   // rose
    { sx: 78, sy: 12, color: '#f59e0b' },   // amber
    { sx: 85, sy: 72, color: '#38bdf8' },   // sky
    { sx: 15, sy: 75, color: '#34d399' },   // emerald
    { sx: 50, sy: 90, color: '#a78bfa' },   // violet
]

const LINES = [
    [0, 1], [0, 3], [0, 4], [1, 2], [1, 4], [2, 3], [2, 4], [3, 4],
]

interface RCTrailerProps {
    onWatchPresentation?: () => void
    onReplay?: () => void
    showCTA?: boolean
}

export default function RCTrailer({ onWatchPresentation, onReplay, showCTA = false }: RCTrailerProps) {
    const [step, setStep] = useState(-1)
    const [cycle, setCycle] = useState(0)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.forEach(clearTimeout)
        t.length = 0

        const timeline: [number, number][] = [
            [300, 0],       // "Customers were leaving."
            [2200, 1],      // "They wanted the product modernized."
            [4100, 2],      // "Competitors were closing in."
            [6000, 3],      // "Leadership said: it's time."
            [8300, 4],      // "I had just joined the team."
            [10800, 5],     // Fragmentation: 5 nodes scatter
            [13800, 6],     // Attempt 1: ✗
            [15000, 7],     // Attempt 2: ✗
            [16200, 8],     // Attempt 3: ✓ merge
            [18000, 9],     // 250 cascade
            [20400, 10],    // SHIPPED.
            [22200, 11],    // Yingchun quote
            [26500, 12],    // CTA or loop point
        ]

        timeline.forEach(([ms, s]) => {
            t.push(setTimeout(() => setStep(s), ms))
        })

        if (!showCTA) {
            t.push(setTimeout(() => {
                setStep(-1)
                setTimeout(() => setCycle(c => c + 1), 1000)
            }, 28500))
        }

        return () => t.forEach(clearTimeout)
    }, [cycle, showCTA])

    /* shared exit transition */
    const textExit = { opacity: 0, y: -25, filter: 'blur(14px)' }
    const textExitT = { duration: 0.45, ease }

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

            <AnimatePresence mode="wait">

                {/* ═══ LINE 0: "Customers were leaving." ═══ */}
                {step === 0 && (
                    <motion.div
                        key="s0"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
                            emphasisWords={['leaving.']}
                            emphasisClass="text-rose-400 font-extrabold"
                        >
                            Customers were leaving.
                        </KineticLine>
                    </motion.div>
                )}

                {/* ═══ LINE 1: "They wanted the product modernized." ═══ */}
                {step === 1 && (
                    <motion.div
                        key="s1"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-zinc-300 tracking-tight">
                            They wanted the product modernized.
                        </KineticLine>
                    </motion.div>
                )}

                {/* ═══ LINE 2: "Competitors were closing in." ═══ */}
                {step === 2 && (
                    <motion.div
                        key="s2"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-zinc-400 tracking-tight"
                            emphasisWords={['closing', 'in.']}
                            emphasisClass="text-amber-400 font-medium"
                        >
                            Competitors were closing in.
                        </KineticLine>
                    </motion.div>
                )}

                {/* ═══ LINE 3: "Leadership said: it's time." ═══ */}
                {step === 3 && (
                    <motion.div
                        key="s3"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight"
                            emphasisWords={["it's", 'time.']}
                            emphasisClass="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent"
                        >
                            Leadership said: it&apos;s time.
                        </KineticLine>
                    </motion.div>
                )}

                {/* ═══ LINE 4: "I had just joined the team." ═══ */}
                {step === 4 && (
                    <motion.div
                        key="s4"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                        transition={{ duration: 0.6, ease }}
                    >
                        <KineticLine
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-zinc-500 tracking-tight italic"
                            delay={0.25}
                        >
                            I had just joined the team.
                        </KineticLine>
                    </motion.div>
                )}

                {/* ═══ PHASE B: Fragmentation + Unification (steps 5-8) ═══ */}
                {step >= 5 && step <= 8 && (
                    <motion.div
                        key="frag"
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.08, filter: 'blur(18px)' }}
                        transition={{ duration: 0.6, ease }}
                    >
                        {/* Header text */}
                        <motion.div
                            className="text-center mb-6 md:mb-10"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <p className="text-lg sm:text-xl md:text-2xl font-light text-zinc-400">
                                A <span className="text-white font-medium">50-year-old</span> system.
                            </p>
                            <motion.p
                                className="text-sm md:text-base text-zinc-600 mt-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                No designer had touched it.
                            </motion.p>
                        </motion.div>

                        {/* Node visual */}
                        <div className="relative w-72 h-44 sm:w-80 sm:h-48 md:w-[28rem] md:h-60">
                            {/* Connection lines */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {LINES.map(([a, b], idx) => {
                                    const scattered = step < 8
                                    const n1 = NODES[a]
                                    const n2 = NODES[b]
                                    return (
                                        <motion.line
                                            key={idx}
                                            x1={scattered ? n1.sx : 50}
                                            y1={scattered ? n1.sy : 50}
                                            x2={scattered ? n2.sx : 50}
                                            y2={scattered ? n2.sy : 50}
                                            stroke="white"
                                            strokeWidth="0.3"
                                            strokeDasharray="2 2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: scattered ? 0.35 : 0 }}
                                            transition={{ duration: 0.8 }}
                                        />
                                    )
                                })}
                            </svg>

                            {/* Nodes */}
                            {NODES.map((node, i) => {
                                const merged = step >= 8
                                return (
                                    <motion.div
                                        key={i}
                                        className="absolute rounded-lg border"
                                        style={{
                                            width: merged ? 20 : 56,
                                            height: merged ? 14 : 36,
                                            borderColor: `${node.color}cc`,
                                            background: `${node.color}4d`,
                                            boxShadow: merged
                                                ? `0 0 40px ${node.color}80`
                                                : `0 0 20px ${node.color}50`,
                                        }}
                                        initial={{
                                            left: '50%',
                                            top: '50%',
                                            x: '-50%',
                                            y: '-50%',
                                            opacity: 0,
                                            scale: 0,
                                        }}
                                        animate={{
                                            left: `${merged ? 50 : node.sx}%`,
                                            top: `${merged ? 50 : node.sy}%`,
                                            opacity: merged ? 0.9 : 0.7,
                                            scale: merged ? 0.5 : 1,
                                            x: '-50%',
                                            y: '-50%',
                                        }}
                                        transition={{
                                            duration: step === 5 ? 1.0 : 0.6,
                                            delay: step === 5 ? i * 0.08 : 0,
                                            ease,
                                        }}
                                    />
                                )
                            })}

                            {/* ✗ flash */}
                            <AnimatePresence>
                                {(step === 6 || step === 7) && (
                                    <motion.div
                                        key={`x-${step}`}
                                        className="absolute inset-0 flex items-center justify-center z-10"
                                        initial={{ opacity: 0, scale: 0.3 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.3 }}
                                        transition={{ duration: 0.35, type: 'spring', damping: 12 }}
                                    >
                                        <span className="text-5xl md:text-7xl font-black text-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,0.5)]">✗</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* ✓ glow */}
                            <AnimatePresence>
                                {step === 8 && (
                                    <motion.div
                                        key="check"
                                        className="absolute inset-0 flex items-center justify-center z-10"
                                        initial={{ opacity: 0, scale: 0.3 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, type: 'spring', damping: 10 }}
                                    >
                                        <span className="text-5xl md:text-7xl font-black text-emerald-400 drop-shadow-[0_0_40px_rgba(52,211,153,0.6)]">✓</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bottom label */}
                        <motion.p
                            className="text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-[0.25em] mt-6 md:mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            5 disconnected tools · One product
                        </motion.p>
                    </motion.div>
                )}

                {/* ═══ PHASE C: 250 Screen Cascade (step 9) ═══ */}
                {step === 9 && (
                    <motion.div
                        key="cascade"
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(14px)' }}
                        transition={{ duration: 0.5, ease }}
                    >
                        <div className="relative w-72 h-40 sm:w-80 sm:h-48 md:w-[30rem] md:h-56 mb-6">
                            {Array.from({ length: 35 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-[3px] border border-cyan-400/50 bg-cyan-400/[0.18]"
                                    style={{
                                        width: '12.5%',
                                        height: '17%',
                                        left: `${3 + (i % 7) * 13.5}%`,
                                        top: `${3 + Math.floor(i / 7) * 19}%`,
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: i * 0.018,
                                        duration: 0.25,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                />
                            ))}
                        </div>

                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <div className="text-5xl md:text-7xl font-bold text-white font-mono tracking-tighter">
                                250<span className="text-cyan-400">+</span>
                            </div>
                            <div className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2">
                                screens designed
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* ═══ PHASE D: SHIPPED. (step 10) ═══ */}
                {step === 10 && (
                    <motion.div
                        key="shipped"
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SlamText className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter">
                            SHIPPED.
                        </SlamText>
                    </motion.div>
                )}

                {/* ═══ PHASE E: Quote (step 11) ═══ */}
                {step === 11 && (
                    <motion.div
                        key="quote"
                        className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease }}
                    >
                        {/* Faded SHIPPED behind */}
                        <motion.div
                            className="absolute text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white/[0.06] tracking-tighter select-none pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            SHIPPED.
                        </motion.div>

                        <motion.blockquote
                            className="relative z-10 max-w-2xl text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6, ease }}
                        >
                            <p className="text-sm sm:text-base md:text-lg text-zinc-300 italic leading-relaxed">
                                &ldquo;She impressed everyone with how quickly she grasped all aspects of a highly intricate system and translated that understanding into a clear, modern, and user-centered design.&rdquo;
                            </p>
                            <footer className="mt-4 font-mono text-[10px] sm:text-xs text-zinc-600 uppercase tracking-[0.2em]">
                                — Yingchun Chen · Principal Systems Engineer
                            </footer>
                        </motion.blockquote>
                    </motion.div>
                )}

                {/* ═══ PHASE F: CTA (step 12) ═══ */}
                {step === 12 && showCTA && (
                    <motion.div
                        key="cta"
                        className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6"
                        initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease }}
                    >
                        {/* RC Case Study Tile */}
                        <button
                            onClick={onWatchPresentation}
                            className="group relative w-full max-w-2xl overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                            style={{
                                minHeight: '280px',
                                border: '1px solid rgba(var(--accent-amber-rgb, 245,158,11), 0.2)',
                                backgroundColor: 'rgba(var(--accent-amber-rgb, 245,158,11), 0.06)',
                                boxShadow: '0 0 60px rgba(var(--accent-amber-rgb, 245,158,11), 0.08)',
                            }}
                        >
                            {/* Dot pattern */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, hsl(40, 50%, 25%) 0.8px, transparent 0.8px)',
                                    backgroundSize: '24px 24px',
                                    opacity: 0.15,
                                }}
                            />

                            {/* Center CTA overlay */}
                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                                <div className="flex flex-col items-center gap-4 max-w-md text-center px-6">
                                    <motion.div
                                        className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center"
                                        animate={{ scale: [1, 1.08, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                                    </motion.div>
                                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/60">
                                        Watch the full animated case study deck
                                    </span>
                                    <p className="text-white/90 text-base md:text-lg font-semibold leading-snug">
                                        Customer retention success for Enterprise Scheduling
                                    </p>
                                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-amber-400/60">
                                        ReportCaster · Cloud Software Group
                                    </span>
                                </div>
                            </div>
                        </button>

                        {/* Replay button */}
                        <motion.button
                            onClick={onReplay}
                            className="flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.03] text-white/50 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white/80 hover:border-white/30 transition-all cursor-pointer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <RotateCcw className="w-3 h-3" />
                            Replay trailer
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
