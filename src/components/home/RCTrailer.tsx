'use client'

import { useState, useEffect, useRef } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw } from 'lucide-react'
import { EASE_CINEMATIC as ease, EASE_EXPO, DURATION, TRAILER_PACE } from '@/lib/motion'

/* ─── Word-by-word kinetic text ─── */
function KineticLine({
    children,
    className = '',
    delay = 0,
    emphasisWords = [] as string[],
    emphasisClass = 'text-[var(--semantic-rose)]',
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
                    <m.span
                        key={i}
                        initial={{ opacity: 0, y: 32, filter: 'blur(10px)', scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                        transition={{
                            duration: DURATION.slow,
                            delay: delay + i * 0.07,
                            ease,
                        }}
                        className={isEmphasis ? emphasisClass : ''}
                    >
                        {word}
                    </m.span>
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
                <m.span
                    key={i}
                    initial={{ opacity: 0, y: 80, scale: 1.6, filter: 'blur(16px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    transition={{
                        duration: DURATION.base,
                        delay: i * 0.035,
                        ease: EASE_EXPO,
                    }}
                    className="inline-block"
                >
                    {char}
                </m.span>
            ))}
        </span>
    )
}

/* ─── Fragment nodes config ─── */
const NODES = [
    { sx: 10, sy: 18, rgb: '244, 63, 94' },    // --semantic-rose
    { sx: 78, sy: 12, rgb: '249, 115, 22' },    // --semantic-orange
    { sx: 85, sy: 72, rgb: '6, 182, 212' },     // --semantic-cyan
    { sx: 15, sy: 75, rgb: '16, 185, 129' },    // --semantic-emerald
    { sx: 50, sy: 90, rgb: '168, 85, 247' },    // --semantic-purple
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
            [2200, 1],      // 20M+ Jobs | 5→1 Hub (scale/stakes)
            [4400, 2],      // "They wanted the product modernized."
            [6300, 3],      // "Competitors were closing in."
            [8200, 4],      // "Leadership said: it's time."
            [10500, 5],     // "I had just joined the team."
            [13000, 6],     // Fragmentation: 5 nodes scatter
            [16000, 7],     // Attempt 1: ✗
            [17200, 8],     // Attempt 2: ✗
            [18400, 9],     // Attempt 3: ✓ merge
            [20200, 10],    // 250 cascade
            [22600, 11],    // SHIPPED.
            [24400, 12],    // Yingchun quote
            [28700, 13],    // CTA or loop point
        ]

        timeline.forEach(([ms, s]) => {
            t.push(setTimeout(() => setStep(s), ms * TRAILER_PACE))
        })

        if (!showCTA) {
            t.push(setTimeout(() => {
                setStep(-1)
                setTimeout(() => setCycle(c => c + 1), 1000)
            }, 30700 * TRAILER_PACE))
        }

        return () => t.forEach(clearTimeout)
    }, [cycle, showCTA])

    /* shared exit transition */
    const textExit = { opacity: 0, y: -25, filter: 'blur(14px)' }
    const textExitT = { duration: DURATION.medium, ease }

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

            <AnimatePresence mode="wait">

                {/* ═══ LINE 0: "Customers were leaving." ═══ */}
                {step === 0 && (
                    <m.div
                        key="s0"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-zinc-300 tracking-tight leading-tight"
                            emphasisWords={['40-year-old', 'scheduling', 'system.']}
                            emphasisClass="text-zinc-100 font-medium"
                        >
                            A 40-year-old scheduling system.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ LINE 1: Scale — 20M+ Automated Jobs | 5→1 Hub ═══ */}
                {step === 1 && (
                    <m.div
                        key="s1-metrics"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <div className="flex items-center gap-6 sm:gap-10 md:gap-14">
                            {/* 20M+ Automated Jobs */}
                            <m.div
                                className="text-center"
                                initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: DURATION.slower, delay: 0.15, ease }}
                            >
                                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                                    20M<span className="text-[var(--semantic-cyan)]">+</span>
                                </div>
                                <div className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-[0.25em] mt-1.5">
                                    Automated Jobs
                                </div>
                            </m.div>

                            {/* Separator */}
                            <m.div
                                className="w-px h-12 sm:h-16 md:h-20 bg-zinc-700/50"
                                initial={{ scaleY: 0, opacity: 0 }}
                                animate={{ scaleY: 1, opacity: 1 }}
                                transition={{ duration: DURATION.medium, delay: 0.4, ease }}
                            />

                            {/* 5→1 Hub */}
                            <m.div
                                className="text-center"
                                initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: DURATION.slower, delay: 0.35, ease }}
                            >
                                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                                    5<span className="text-[var(--semantic-cyan)]">&thinsp;→&thinsp;</span>1
                                </div>
                                <div className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-[0.25em] mt-1.5">
                                    Hub
                                </div>
                            </m.div>
                        </div>
                    </m.div>
                )}

                {/* ═══ LINE 2: "They wanted the product modernized." ═══ */}
                {step === 2 && (
                    <m.div
                        key="s2"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-zinc-200 tracking-tight">
                            No documentation. 5 fragmented sub-products.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ LINE 3: "Competitors were closing in." ═══ */}
                {step === 3 && (
                    <m.div
                        key="s3"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-zinc-400 tracking-tight"
                            emphasisWords={['No', 'one']}
                            emphasisClass="text-[var(--semantic-orange)] font-medium"
                        >
                            No one wanted to touch it.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ LINE 4: "Leadership said: it's time." ═══ */}
                {step === 4 && (
                    <m.div
                        key="s4"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight"
                            emphasisWords={["leave", 'look', 'pretty.']}
                            emphasisClass="text-[var(--semantic-rose)] font-bold"
                        >
                            Customers threatened to leave unless we made it look pretty.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ LINE 5: "I had just joined the team." ═══ */}
                {step === 5 && (
                    <m.div
                        key="s5"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                        transition={{ duration: DURATION.slower, ease }}
                    >
                        <KineticLine
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-zinc-300 tracking-tight italic"
                            emphasisWords={['So', 'I', 'pushed', 'back.']}
                            emphasisClass="text-[var(--semantic-orange)] not-italic font-medium"
                            delay={0.25}
                        >
                            But a fresh coat of paint wouldn&apos;t fix the broken engine. So I pushed back.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ PHASE B: Fragmentation + Unification (steps 5-8) ═══ */}
                {step >= 6 && step <= 9 && (
                    <m.div
                        key="frag"
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.08, filter: 'blur(18px)' }}
                        transition={{ duration: DURATION.slower, ease }}
                    >
                        {/* Header text */}
                        <m.div
                            className="text-center mb-6 md:mb-10"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: DURATION.slow, delay: 0.2 }}
                        >
                            <p className="text-lg sm:text-xl md:text-2xl font-light text-zinc-400 max-w-lg mx-auto leading-snug">
                                {step < 9 ? (
                                    <>I sat with customer support, saw users <span className="text-[var(--semantic-rose)] font-medium">hacking</span> the system just to work...</>
                                ) : (
                                    <>...and rebuilt all 5 tools into <span className="text-[var(--semantic-emerald)] font-medium">one simple hub</span>.</>
                                )}
                            </p>
                        </m.div>

                        {/* Node visual */}
                        <div className="relative w-72 h-44 sm:w-80 sm:h-48 md:w-[28rem] md:h-60">
                            {/* Connection lines */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {LINES.map(([a, b], idx) => {
                                    const scattered = step < 9
                                    const n1 = NODES[a]
                                    const n2 = NODES[b]
                                    return (
                                        <m.line
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
                                            transition={{ duration: DURATION.deliberate }}
                                        />
                                    )
                                })}
                            </svg>

                            {/* Nodes */}
                            {NODES.map((node, i) => {
                                const merged = step >= 9
                                return (
                                    <m.div
                                        key={i}
                                        className="absolute rounded-lg border"
                                        style={{
                                            width: merged ? 20 : 56,
                                            height: merged ? 14 : 36,
                                            borderColor: `rgba(${node.rgb}, 0.8)`,
                                            background: `rgba(${node.rgb}, 0.3)`,
                                            boxShadow: merged
                                                ? `0 0 40px rgba(${node.rgb}, 0.5)`
                                                : `0 0 20px rgba(${node.rgb}, 0.3)`,
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
                                            duration: step === 6 ? 1.0 : 0.6,
                                            delay: step === 6 ? i * 0.08 : 0,
                                            ease,
                                        }}
                                    />
                                )
                            })}

                            {/* ✗ flash */}
                            <AnimatePresence>
                                {(step === 7 || step === 8) && (
                                    <m.div
                                        key={`x-${step}`}
                                        className="absolute inset-0 flex items-center justify-center z-10"
                                        initial={{ opacity: 0, scale: 0.3 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.3 }}
                                        transition={{ duration: DURATION.base, type: 'spring', damping: 12 }}
                                    >
                                        <span className="text-5xl md:text-7xl font-black text-[var(--semantic-rose)] drop-shadow-[0_0_30px_var(--semantic-rose)]">✗</span>
                                    </m.div>
                                )}
                            </AnimatePresence>

                            {/* ✓ glow */}
                            <AnimatePresence>
                                {step === 9 && (
                                    <m.div
                                        key="check"
                                        className="absolute inset-0 flex items-center justify-center z-10"
                                        initial={{ opacity: 0, scale: 0.3 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: DURATION.slow, type: 'spring', damping: 10 }}
                                    >
                                        <span className="text-5xl md:text-7xl font-black text-[var(--semantic-emerald)] drop-shadow-[0_0_40px_var(--semantic-emerald)]">✓</span>
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bottom label */}
                        <m.p
                            className="text-xs sm:text-sm font-mono text-[var(--semantic-cyan)] uppercase tracking-[0.25em] mt-6 md:mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            {step < 9 ? "5 fragmented sub-products" : "1 cohesive system"}
                        </m.p>
                    </m.div>
                )}

                {/* ═══ PHASE C: 250 Screen Cascade (step 9) ═══ */}
                {step === 10 && (
                    <m.div
                        key="cascade"
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(14px)' }}
                        transition={{ duration: DURATION.slow, ease }}
                    >
                        <div className="relative w-72 h-40 sm:w-80 sm:h-48 md:w-[30rem] md:h-56 mb-6">
                            {Array.from({ length: 35 }).map((_, i) => (
                                <m.div
                                    key={i}
                                    className="absolute rounded-[3px] border border-[var(--semantic-cyan)]/50 bg-[var(--semantic-cyan)]/[0.18]"
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
                                        duration: DURATION.fast,
                                        ease: EASE_EXPO,
                                    }}
                                />
                            ))}
                        </div>

                        <m.div
                            className="text-center"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: DURATION.slow }}
                        >
                            <div className="text-5xl md:text-7xl font-bold text-white font-mono tracking-tighter">
                                250<span className="text-[var(--semantic-cyan)]">+</span>
                            </div>
                            <div className="text-[10px] sm:text-xs font-mono text-[var(--semantic-cyan)]/70 uppercase tracking-[0.3em] mt-2">
                                screens simplified into 1 app
                            </div>
                        </m.div>
                    </m.div>
                )}

                {/* ═══ PHASE D: SHIPPED. (step 10) ═══ */}
                {step === 11 && (
                    <m.div
                        key="shipped"
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: DURATION.base }}
                    >
                        <SlamText className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter text-center leading-none drop-shadow-[0_0_20px_rgba(var(--white-rgb),0.2)]">
                            20M JOBS PROTECTED.
                        </SlamText>
                    </m.div>
                )}

                {/* ═══ PHASE E: Quote (step 11) ═══ */}
                {step === 12 && (
                    <m.div
                        key="quote"
                        className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: DURATION.slower, ease }}
                    >
                        {/* Faded SHIPPED behind */}
                        <m.div
                            className="absolute text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white/[0.04] tracking-tighter select-none pointer-events-none text-center leading-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            20M JOBS PROTECTED.
                        </m.div>

                        <m.blockquote
                            className="relative z-10 max-w-2xl text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: DURATION.slower, ease }}
                        >
                            <p className="text-sm sm:text-base md:text-lg text-zinc-200 italic leading-relaxed">
                                &ldquo;She impressed everyone with how quickly she grasped all aspects of a highly intricate system and translated that understanding into a clear, modern, and user-centered design.&rdquo;
                            </p>
                            <footer className="mt-4 font-mono text-[10px] sm:text-xs text-zinc-600 uppercase tracking-[0.2em]">
                                — Yingchun Chen · Principal System Software Engineer
                            </footer>
                        </m.blockquote>
                    </m.div>
                )}

                {/* ═══ PHASE F: CTA (step 12) ═══ */}
                {step === 13 && showCTA && (
                    <m.div
                        key="cta"
                        className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6"
                        initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: DURATION.deliberate, ease }}
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
                                    <m.div
                                        className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center"
                                        animate={{ scale: [1, 1.08, 1] }}
                                        transition={{ duration: DURATION.epic, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                                    </m.div>
                                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                                        Watch the full animated case study deck
                                    </span>
                                    <p className="text-zinc-100 text-base md:text-lg font-semibold leading-snug">
                                        Customer retention success for Enterprise Scheduling
                                    </p>
                                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--semantic-orange)]/60">
                                        ReportCaster · Cloud Software Group
                                    </span>
                                </div>
                            </div>
                        </button>

                        {/* Replay button */}
                        <m.button
                            onClick={onReplay}
                            className="flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.03] text-zinc-500 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-white/10 hover:text-zinc-200 hover:border-white/30 transition-all cursor-pointer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: DURATION.slow }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <RotateCcw className="w-3 h-3" />
                            Replay trailer
                        </m.button>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    )
}
