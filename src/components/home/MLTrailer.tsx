'use client'

import { useState, useEffect, useRef } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { playAdeleChord } from '@/lib/audio'
import { EASE_CINEMATIC as ease, EASE_EXPO, DURATION, TRAILER_PACE } from '@/lib/motion'

/* ─── Word-by-word kinetic text ─── */
function KineticLine({
    children,
    className = '',
    delay = 0,
    emphasisWords = [] as string[],
    emphasisClass = 'text-[var(--semantic-purple)]',
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
                const clean = word.replace(/[.,!?'"~]/g, '').toLowerCase()
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

/* ─── Wizard step boxes ─── */
const WIZARD_STEPS = [
    { label: 'Dataset', color: '139, 92, 246' },     // violet
    { label: 'Target', color: '6, 182, 212' },        // cyan
    { label: 'Algorithms', color: '245, 158, 11' },   // amber
    { label: 'Train', color: '16, 185, 129' },        // emerald
]

export default function MLTrailer() {
    const [step, setStep] = useState(-1)
    const [cycle, setCycle] = useState(0)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.forEach(clearTimeout)
        t.length = 0

        const timeline: [number, number][] = [
            [300, 0],       // "It was really shitty."
            [2200, 1],      // "~15 clicks to train a model."
            [4100, 2],      // "Nobody used it."
            [6000, 3],      // "A side project earned me the whole thing."
            [8500, 4],      // Old flow: scattered nodes
            [11000, 5],     // New flow: wizard steps
            [14000, 6],     // Confusion matrix moment
            [16500, 7],     // 4/4 SMEs
            [18500, 8],     // "They just blazed through it."
            [21000, 9],     // Quote
            [25000, 10],    // Loop
        ]

        timeline.forEach(([ms, s]) => {
            t.push(setTimeout(() => setStep(s), ms * TRAILER_PACE))
        })

        // Auto-loop
        t.push(setTimeout(() => {
            setStep(-1)
            setTimeout(() => setCycle(c => c + 1), 1000)
        }, 27000 * TRAILER_PACE))

        return () => t.forEach(clearTimeout)
    }, [cycle])

    useEffect(() => {
        if (step >= 0) {
            playAdeleChord(step, 0.4)
        }
    }, [step])

    const textExit = { opacity: 0, y: -25, filter: 'blur(14px)' }
    const textExitT = { duration: DURATION.medium, ease }

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">

                {/* ═══ LINE 0: "It was really shitty." ═══ */}
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
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
                            emphasisWords={['shitty.']}
                            emphasisClass="text-[var(--semantic-rose)] font-extrabold"
                        >
                            It was really shitty.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ LINE 1: "~15 clicks to train a model." ═══ */}
                {step === 1 && (
                    <m.div
                        key="s1"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-zinc-200 tracking-tight"
                            emphasisWords={['~15']}
                            emphasisClass="text-[var(--semantic-orange)] font-bold tabular-nums"
                        >
                            ~15 clicks to train a model.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ LINE 2: "Nobody used it." ═══ */}
                {step === 2 && (
                    <m.div
                        key="s2"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-zinc-400 tracking-tight"
                            emphasisWords={['nobody']}
                            emphasisClass="text-zinc-200 font-medium"
                        >
                            Nobody used it.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ LINE 3: "A side project earned me the whole thing." ═══ */}
                {step === 3 && (
                    <m.div
                        key="s3"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                        transition={{ duration: DURATION.slower, ease }}
                    >
                        <KineticLine
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight"
                            emphasisWords={['side', 'project']}
                            emphasisClass="bg-gradient-to-r from-[var(--semantic-purple)] to-[var(--semantic-cyan)] bg-clip-text text-transparent"
                            delay={0.15}
                        >
                            A side project earned me the whole thing.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ PHASE B: Old flow — scattered mess (step 4) ═══ */}
                {step === 4 && (
                    <m.div
                        key="old-flow"
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(14px)' }}
                        transition={{ duration: DURATION.slow, ease }}
                    >
                        <m.p
                            className="text-lg sm:text-xl md:text-2xl font-light text-zinc-400 mb-8"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: DURATION.slow, delay: 0.2 }}
                        >
                            Right-click. Drag. Context menus. <span className="text-[var(--semantic-rose)] font-medium">Pray.</span>
                        </m.p>

                        {/* Scattered UI fragments */}
                        <div className="relative w-72 h-40 sm:w-80 sm:h-48 md:w-[28rem] md:h-56">
                            {['+ Menu', 'Data Flow', 'Drag Model', 'Right Click', 'Run', 'Results'].map((label, i) => (
                                <m.div
                                    key={label}
                                    className="absolute rounded-md border border-rose-400/40 bg-rose-400/[0.08] px-3 py-1.5"
                                    style={{
                                        left: `${10 + (i % 3) * 32}%`,
                                        top: `${10 + Math.floor(i / 3) * 45}%`,
                                    }}
                                    initial={{ opacity: 0, scale: 0, rotate: -10 + Math.random() * 20 }}
                                    animate={{ opacity: 0.7, scale: 1, rotate: -5 + Math.random() * 10 }}
                                    transition={{ delay: i * 0.1, duration: DURATION.medium, ease }}
                                >
                                    <span className="text-[10px] sm:text-xs font-mono text-rose-300/80">{label}</span>
                                </m.div>
                            ))}
                            {/* Tangled lines between */}
                            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                                <m.path d="M15,20 Q60,5 80,25 T90,70 Q50,90 20,75 T15,20" fill="none" stroke="rgb(244,63,94)" strokeWidth="0.5" strokeDasharray="3 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: DURATION.epic, ease }} />
                            </svg>
                        </div>

                        <m.p
                            className="text-xs font-mono text-zinc-500 uppercase tracking-[0.25em] mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            The old workflow · ~15 clicks minimum
                        </m.p>
                    </m.div>
                )}

                {/* ═══ PHASE C: New flow — wizard steps (step 5) ═══ */}
                {step === 5 && (
                    <m.div
                        key="new-flow"
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(14px)' }}
                        transition={{ duration: DURATION.slow, ease }}
                    >
                        <m.p
                            className="text-lg sm:text-xl md:text-2xl font-light text-zinc-400 mb-8"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: DURATION.slow, delay: 0.2 }}
                        >
                            One path. <span className="text-emerald-400 font-medium">Two clicks.</span>
                        </m.p>

                        {/* Wizard step progression */}
                        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-0">
                            {WIZARD_STEPS.map((ws, i) => (
                                <m.div
                                    key={ws.label}
                                    className="flex items-center gap-2 sm:gap-3"
                                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ delay: 0.3 + i * 0.25, duration: DURATION.slow, ease }}
                                >
                                    <div
                                        className="rounded-lg border px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4"
                                        style={{
                                            borderColor: `rgba(${ws.color}, 0.5)`,
                                            background: `rgba(${ws.color}, 0.1)`,
                                            boxShadow: `0 0 20px rgba(${ws.color}, 0.15)`,
                                        }}
                                    >
                                        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider" style={{ color: `rgba(${ws.color}, 0.9)` }}>
                                            {ws.label}
                                        </span>
                                    </div>
                                    {i < WIZARD_STEPS.length - 1 && (
                                        <m.span
                                            className="text-zinc-600"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 + i * 0.25 }}
                                        >
                                            →
                                        </m.span>
                                    )}
                                </m.div>
                            ))}
                        </div>

                        <m.p
                            className="text-xs font-mono text-zinc-500 uppercase tracking-[0.25em] mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8 }}
                        >
                            Right-click → Predict Data → Done
                        </m.p>
                    </m.div>
                )}

                {/* ═══ PHASE D: Confusion matrix moment (step 6) ═══ */}
                {step === 6 && (
                    <m.div
                        key="matrix"
                        className="absolute inset-0 flex flex-col items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(14px)' }}
                        transition={{ duration: DURATION.slow, ease }}
                    >
                        <m.p
                            className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-light mb-6"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            The <span className="text-white font-medium">most complex screen</span> I ever designed.
                        </m.p>

                        {/* Mini confusion matrix grid */}
                        <div className="grid grid-cols-3 gap-1 sm:gap-1.5 mx-auto">
                            {[
                                { v: '', c: 'transparent' },
                                { v: 'Predicted +', c: 'transparent' },
                                { v: 'Predicted −', c: 'transparent' },
                                { v: 'Actual +', c: 'transparent' },
                                { v: 'TP', c: '16, 185, 129' },
                                { v: 'FN', c: '244, 63, 94' },
                                { v: 'Actual −', c: 'transparent' },
                                { v: 'FP', c: '244, 63, 94' },
                                { v: 'TN', c: '16, 185, 129' },
                            ].map((cell, i) => (
                                <m.div
                                    key={i}
                                    className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 rounded-md flex items-center justify-center"
                                    style={{
                                        border: cell.c !== 'transparent' ? `1px solid rgba(${cell.c}, 0.4)` : '1px solid transparent',
                                        background: cell.c !== 'transparent' ? `rgba(${cell.c}, 0.1)` : 'transparent',
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + i * 0.06, duration: DURATION.base }}
                                >
                                    <span className={`text-[9px] sm:text-[10px] md:text-xs font-mono ${cell.c !== 'transparent' ? 'font-bold' : 'text-zinc-500'}`}
                                        style={cell.c !== 'transparent' ? { color: `rgba(${cell.c}, 0.9)` } : undefined}
                                    >
                                        {cell.v}
                                    </span>
                                </m.div>
                            ))}
                        </div>

                        <m.p
                            className="text-xs font-mono text-zinc-600 mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            A dozen sessions with the data scientist. Paper and pen.
                        </m.p>
                    </m.div>
                )}

                {/* ═══ PHASE E: 4/4 SMEs (step 7) ═══ */}
                {step === 7 && (
                    <m.div
                        key="smes"
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: DURATION.base }}
                    >
                        <div className="text-center">
                            <SlamText className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter">
                                4/4
                            </SlamText>
                            <m.p
                                className="text-sm sm:text-base md:text-lg font-mono text-[var(--semantic-emerald)] uppercase tracking-[0.3em] mt-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: DURATION.medium }}
                            >
                                SMEs Validated
                            </m.p>
                        </div>
                    </m.div>
                )}

                {/* ═══ PHASE F: "They just blazed through it." (step 8) ═══ */}
                {step === 8 && (
                    <m.div
                        key="blazed"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight"
                            emphasisWords={['blazed']}
                            emphasisClass="bg-gradient-to-r from-[var(--semantic-emerald)] to-[var(--semantic-cyan)] bg-clip-text text-transparent font-extrabold"
                        >
                            They just blazed through it.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ PHASE G: Quote (step 9) ═══ */}
                {step === 9 && (
                    <m.div
                        key="quote"
                        className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: DURATION.slower, ease }}
                    >
                        <m.div
                            className="absolute text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white/[0.04] tracking-tighter select-none pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            4/4
                        </m.div>

                        <m.blockquote
                            className="relative z-10 max-w-2xl text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: DURATION.slower, ease }}
                        >
                            <p className="text-sm sm:text-base md:text-lg text-zinc-200 italic leading-relaxed">
                                &ldquo;The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive and has greatly contributed to the success of our products.&rdquo;
                            </p>
                            <footer className="mt-4 font-mono text-[10px] sm:text-xs text-zinc-600 uppercase tracking-[0.2em]">
                                — Marcus Horbach · Principal Data Scientist
                            </footer>
                        </m.blockquote>
                    </m.div>
                )}

            </AnimatePresence>
        </div>
    )
}
