'use client'

import { useState, useEffect, useRef } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { playAdeleChord } from '@/lib/audio'
import { EASE_CINEMATIC as ease, EASE_EXPO, DURATION } from '@/lib/motion'

/* ─── Word-by-word kinetic text ─── */
function KineticLine({
    children,
    className = '',
    delay = 0,
    emphasisWords = [] as string[],
    emphasisClass = 'text-[var(--accent-teal)]',
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

/* ─── Three AI features config ─── */
const FEATURES = [
    { label: 'NLQ', color: '6, 182, 212', desc: 'Natural Language Queries' },       // cyan
    { label: 'Insights', color: '139, 92, 246', desc: 'Auto-Generated Analysis' },  // violet
    { label: 'ML', color: '245, 158, 11', desc: 'Machine Learning Models' },        // amber
]

export default function DSMLTrailer() {
    const [step, setStep] = useState(-1)
    const [cycle, setCycle] = useState(0)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.forEach(clearTimeout)
        t.length = 0

        const timeline: [number, number][] = [
            [300, 0],       // "We built the intelligence."
            [2200, 1],      // "Nobody knew it existed."
            [4100, 2],      // "Three powerful features. Buried."
            [6200, 3],      // Scattered features visualization
            [9200, 4],      // "Team vision. My architecture."
            [11500, 5],     // 3 → 1 Hub merge animation
            [14500, 6],     // "+25% NLQ Adoption"
            [16800, 7],     // "The features didn't change."
            [19000, 8],     // "The visibility did."
            [21200, 9],     // Quote
            [25000, 10],    // Loop
        ]

        timeline.forEach(([ms, s]) => {
            t.push(setTimeout(() => setStep(s), ms))
        })

        // Auto-loop
        t.push(setTimeout(() => {
            setStep(-1)
            setTimeout(() => setCycle(c => c + 1), 1000)
        }, 27000))

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

                {/* ═══ LINE 0: "We built the intelligence." ═══ */}
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
                            emphasisWords={['intelligence.']}
                            emphasisClass="text-[var(--accent-teal)] font-extrabold"
                        >
                            We built the intelligence.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ LINE 1: "Nobody knew it existed." ═══ */}
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
                            emphasisWords={['nobody']}
                            emphasisClass="text-[var(--semantic-rose)] font-medium"
                        >
                            Nobody knew it existed.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ LINE 2: "Three powerful features. Buried." ═══ */}
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
                            emphasisWords={['buried.']}
                            emphasisClass="text-zinc-200 font-semibold"
                        >
                            Three powerful features. Buried.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ PHASE B: Scattered features (step 3) ═══ */}
                {step === 3 && (
                    <m.div
                        key="scattered"
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
                            <span className="text-white font-medium">Millions</span> invested. <span className="text-[var(--semantic-rose)]">Near-zero</span> adoption.
                        </m.p>

                        {/* Three scattered feature boxes */}
                        <div className="relative w-full max-w-[18rem] h-56 sm:max-w-sm sm:h-64 md:max-w-lg md:h-72">
                            {FEATURES.map((feat, i) => {
                                const positions = [
                                    { left: '0%', top: '5%' },
                                    { right: '0%', top: '25%' },
                                    { left: '20%', bottom: '5%' },
                                ]
                                return (
                                    <m.div
                                        key={feat.label}
                                        className="absolute rounded-xl border px-4 py-3 sm:px-5 sm:py-4"
                                        style={{
                                            ...positions[i],
                                            borderColor: `rgba(${feat.color}, 0.4)`,
                                            background: `rgba(${feat.color}, 0.08)`,
                                            boxShadow: `0 0 25px rgba(${feat.color}, 0.15)`,
                                        }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 0.8, scale: 1 }}
                                        transition={{ delay: 0.2 + i * 0.2, duration: DURATION.slow, ease }}
                                    >
                                        <span className="text-sm sm:text-base font-bold tracking-wide" style={{ color: `rgba(${feat.color}, 0.9)` }}>
                                            {feat.label}
                                        </span>
                                        <p className="text-[9px] sm:text-[10px] text-zinc-500 mt-0.5">{feat.desc}</p>
                                    </m.div>
                                )
                            })}

                            {/* "?" marks between them */}
                            <m.span
                                className="absolute left-[42%] top-[30%] text-3xl text-zinc-700/50 font-light"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                ?
                            </m.span>
                            <m.span
                                className="absolute left-[55%] top-[55%] text-2xl text-zinc-700/50 font-light"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.0 }}
                            >
                                ?
                            </m.span>
                        </div>

                        <m.p
                            className="text-xs font-mono text-zinc-500 uppercase tracking-[0.25em] mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            3 tools · 3 different menus · 0 visibility
                        </m.p>
                    </m.div>
                )}

                {/* ═══ LINE 4: "Team vision. My architecture." ═══ */}
                {step === 4 && (
                    <m.div
                        key="s4"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                        transition={{ duration: DURATION.slower, ease }}
                    >
                        <KineticLine
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight"
                            emphasisWords={['team', 'my']}
                            emphasisClass="bg-gradient-to-r from-[var(--accent-teal)] to-[var(--semantic-cyan)] bg-clip-text text-transparent"
                            delay={0.15}
                        >
                            Team vision. My architecture.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ PHASE C: 3 → 1 Hub merge (step 5) ═══ */}
                {step === 5 && (
                    <m.div
                        key="merge"
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(14px)' }}
                        transition={{ duration: DURATION.slow, ease }}
                    >
                        {/* Three features merging into one */}
                        <div className="relative w-full max-w-[16rem] h-48 sm:max-w-sm sm:h-56 md:max-w-lg md:h-64 mb-6">
                            {FEATURES.map((feat, i) => (
                                <m.div
                                    key={feat.label}
                                    className="absolute rounded-lg border px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap"
                                    style={{
                                        borderColor: `rgba(${feat.color}, 0.6)`,
                                        background: `rgba(${feat.color}, 0.15)`,
                                        boxShadow: `0 0 30px rgba(${feat.color}, 0.25)`,
                                    }}
                                    initial={{
                                        left: `${15 + i * 35}%`,
                                        top: `${15 + (i === 1 ? 0 : 25)}%`,
                                        x: '-50%',
                                        y: '-50%',
                                        opacity: 0.8,
                                    }}
                                    animate={{
                                        left: '50%',
                                        top: '50%',
                                        x: '-50%',
                                        y: '-50%',
                                        opacity: 0.9,
                                        scale: 0.85,
                                    }}
                                    transition={{
                                        duration: DURATION.cinematic,
                                        delay: i * 0.15,
                                        ease,
                                    }}
                                >
                                    <span className="text-xs sm:text-sm font-bold" style={{ color: `rgba(${feat.color}, 0.9)` }}>
                                        {feat.label}
                                    </span>
                                </m.div>
                            ))}

                            {/* Central hub glow */}
                            <m.div
                                className="absolute left-1/2 top-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-2 border-[var(--accent-teal)]/50 bg-[var(--accent-teal)]/[0.06]"
                                initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
                                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                                transition={{ delay: 1.0, duration: DURATION.deliberate, ease }}
                                style={{ boxShadow: '0 0 60px rgba(0, 210, 211, 0.2)' }}
                            />
                        </div>

                        <m.div
                            className="text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: DURATION.slow }}
                        >
                            <div className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                                3 <span className="text-zinc-500 font-light">→</span> <span className="text-[var(--accent-teal)]">1</span>
                            </div>
                            <div className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2">
                                One unified DSML Hub
                            </div>
                        </m.div>
                    </m.div>
                )}

                {/* ═══ PHASE D: +25% (step 6) ═══ */}
                {step === 6 && (
                    <m.div
                        key="adoption"
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: DURATION.base }}
                    >
                        <div className="text-center">
                            <SlamText className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-[var(--accent-teal)] tracking-tighter">
                                +25%
                            </SlamText>
                            <m.p
                                className="text-sm sm:text-base md:text-lg font-mono text-zinc-400 uppercase tracking-[0.3em] mt-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: DURATION.medium }}
                            >
                                NLQ Adoption
                            </m.p>
                        </div>
                    </m.div>
                )}

                {/* ═══ LINE 7: "The features didn't change." ═══ */}
                {step === 7 && (
                    <m.div
                        key="s7"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-zinc-400 tracking-tight"
                        >
                            The features didn&apos;t change.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ LINE 8: "The visibility did." ═══ */}
                {step === 8 && (
                    <m.div
                        key="s8"
                        className="absolute inset-0 flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={textExit}
                        transition={textExitT}
                    >
                        <KineticLine
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight"
                            emphasisWords={['visibility']}
                            emphasisClass="text-[var(--accent-teal)] font-extrabold"
                        >
                            The visibility did.
                        </KineticLine>
                    </m.div>
                )}

                {/* ═══ PHASE H: Quote (step 9) ═══ */}
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
                            +25%
                        </m.div>

                        <m.blockquote
                            className="relative z-10 max-w-2xl text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: DURATION.slower, ease }}
                        >
                            <p className="text-sm sm:text-base md:text-lg text-zinc-200 italic leading-relaxed">
                                &ldquo;Anu is bold and fearless in her design pursuits. She pushes boundaries and explores new design territory without hesitation.&rdquo;
                            </p>
                            <footer className="mt-4 font-mono text-[10px] sm:text-xs text-zinc-600 uppercase tracking-[0.2em]">
                                — Dave Pfeiffer · Director of Design
                            </footer>
                        </m.blockquote>
                    </m.div>
                )}

            </AnimatePresence>
        </div>
    )
}
