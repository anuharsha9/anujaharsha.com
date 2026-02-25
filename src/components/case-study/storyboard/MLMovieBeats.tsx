'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Search, Users, Sparkles, Target, ServerCog, MousePointerClick } from 'lucide-react'
import { withHexAlpha } from '@/lib/color-utils'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const BEAT_PACE = 1.22
const at = (ms: number) => Math.round(ms * BEAT_PACE)

function AnimNumber({ value, suffix = '', delay = 0 }: { value: number; suffix?: string; delay?: number }) {
    const [display, setDisplay] = useState(0)
    const ref = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const start = Date.now()
        const duration = 1200
        const tick = () => {
            const elapsed = Date.now() - start - delay * 1000
            if (elapsed < 0) { ref.current = setTimeout(tick, 16); return }
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(Math.round(eased * value))
            if (progress < 1) ref.current = setTimeout(tick, 16)
        }
        tick()
        return () => { if (ref.current) clearTimeout(ref.current) }
    }, [value, delay])

    return <>{display}{suffix}</>
}

function WireMorphBackdrop() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <motion.path
                    d="M0,24 C18,18 34,31 50,24 C66,17 82,31 100,22"
                    fill="none"
                    stroke="var(--overlay-cyan-wire-26)"
                    strokeWidth="0.28"
                    strokeDasharray="2 2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.7, 0.25] }}
                    transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.svg>
            <motion.div
                className="absolute -left-[25%] top-0 h-full w-[36%] bg-[linear-gradient(90deg,transparent,var(--overlay-teal-18),transparent)] blur-xl"
                initial={{ x: '-20%', opacity: 0 }}
                animate={{ x: '150%', opacity: [0, 0.6, 0] }}
                transition={{ duration: 2.3, ease: [0.16, 1, 0.3, 1] }}
            />
        </div>
    )
}

function AbstractFlowBubbles({ active }: { active: boolean }) {
    const nodes = [
        { id: 'n1', x: 20, y: 50, color: 'var(--tone-cyan-200)', scale: 1.0 },
        { id: 'n2', x: 50, y: 30, color: 'var(--tone-sky-200)', scale: 0.8 },
        { id: 'n3', x: 80, y: 60, color: 'var(--tone-teal-200)', scale: 1.1 },
    ]

    return (
        <div className="pointer-events-none absolute inset-0 mx-auto">
            {nodes.map((node, index) => (
                <motion.span
                    key={node.id}
                    className="absolute block rounded-full"
                    style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        width: `${24 * node.scale}px`,
                        height: `${24 * node.scale}px`,
                        background: `radial-gradient(circle at 30% 28%, var(--overlay-white-67), ${withHexAlpha(node.color, 'dd')})`,
                        boxShadow: `0 0 20px ${withHexAlpha(node.color, '55')}`,
                    }}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={active
                        ? {
                            opacity: [0.2, 0.7, 0.3],
                            y: [0, -15, 0],
                            x: [0, index % 2 ? -10 : 10, 0],
                            scale: [0.9, 1.1, 0.95],
                        }
                        : {}}
                    transition={{
                        duration: 4.0 + index * 0.3,
                        delay: index * 0.1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}

/* ═════════════════════════════════════════════════
   BEAT 1: "THE BUSINESS PROBLEM"
   ═════════════════════════════════════════════════ */
export function MLBeatProblem() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(800)))
        t.push(setTimeout(() => setStep(2), at(1800)))
        t.push(setTimeout(() => setStep(3), at(3000)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="relative flex w-full flex-col items-center justify-center py-8 text-center">
            <WireMorphBackdrop />
            <AbstractFlowBubbles active={step >= 0} />

            <AnimatePresence>
                {step >= 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease }}
                        className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-cyan-400/90 uppercase mb-4"
                    >
                        The Business Problem
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step >= 1 && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease }}
                        className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6 shadow-black drop-shadow-lg"
                    >
                        Adoption was near zero.
                    </motion.h2>
                )}
            </AnimatePresence>

            {/* Visual Node Diagram representing the "buried" engine */}
            <AnimatePresence>
                {step >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease }}
                        className="relative w-full max-w-lg h-36 border border-white/5 bg-white/[0.02] rounded-2xl mb-6 overflow-hidden flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/10 to-transparent opacity-50"></div>

                        <div className="flex items-center gap-2 md:gap-4 relative z-10">
                            {/* Layer 1 */}
                            <div className="flex flex-col items-center gap-2 border border-white/10 p-2 rounded-lg bg-black/50">
                                <Search className="w-5 h-5 text-zinc-500" />
                                <div className="text-[9px] font-mono text-zinc-500">Menu</div>
                            </div>
                            <div className="w-4 h-px bg-zinc-700"></div>

                            {/* Layer 2 */}
                            <div className="flex flex-col items-center gap-2 border border-white/10 p-2 rounded-lg bg-black/50">
                                <Sparkles className="w-5 h-5 text-zinc-500" />
                                <div className="text-[9px] font-mono text-zinc-500">Tools</div>
                            </div>
                            <div className="w-4 h-px bg-zinc-700"></div>

                            {/* The Buried Engine */}
                            <motion.div
                                animate={{ boxShadow: ['0 0 0px rgba(244,63,94,0)', '0 0 20px rgba(244,63,94,0.5)', '0 0 0px rgba(244,63,94,0)'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="flex flex-col items-center gap-2 border border-rose-500/40 p-3 rounded-xl bg-rose-500/10"
                            >
                                <ServerCog className="w-8 h-8 text-rose-400" />
                                <div className="text-[10px] font-mono font-bold text-rose-300">ML Engine</div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <div className="flex flex-col items-center p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 backdrop-blur-sm min-w-[140px]">
                            <div className="text-3xl font-bold text-rose-300 font-mono"><AnimNumber value={5} /></div>
                            <div className="text-[10px] font-mono text-rose-200/70 uppercase tracking-widest mt-1">Clicks to Entry</div>
                        </div>
                        <div className="text-sm md:text-base text-zinc-300 max-w-sm text-center sm:text-left leading-relaxed">
                            A wildly powerful engine that required a treasure map. Only engineers could find it.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

/* ═════════════════════════════════════════════════
   BEAT 2: "THE GOAL"
   ═════════════════════════════════════════════════ */
export function MLBeatGoal() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(800)))
        t.push(setTimeout(() => setStep(2), at(2000)))
        t.push(setTimeout(() => setStep(3), at(3200)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full py-8 text-center">
            <WireMorphBackdrop />
            <motion.p
                initial={{ opacity: 0 }}
                animate={step >= 0 ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="font-mono text-xs tracking-[0.3em] text-emerald-400 uppercase mb-6"
            >
                The Goal: Discoverability & Ease
            </motion.p>

            <AnimatePresence>
                {step >= 1 && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.7, ease }}
                        className="text-2xl md:text-4xl font-light text-white tracking-tight leading-[1.2] max-w-2xl mb-12"
                    >
                        Increase adoption by making complex ML accessible to business users.
                    </motion.h2>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step >= 2 && (
                    <div className="flex items-center gap-6 md:gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col items-center text-zinc-500"
                        >
                            <div className="text-4xl font-mono mb-2 line-through decoration-rose-500/50">5</div>
                            <div className="text-xs font-mono uppercase tracking-widest">Old Path</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={step >= 3 ? { opacity: 1, scale: 1 } : {}}
                            className="text-zinc-600"
                        >
                            <ArrowRight className="w-6 h-6" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={step >= 3 ? { opacity: 1, x: 0 } : {}}
                            className="flex flex-col items-center text-emerald-300"
                        >
                            <div className="text-5xl font-mono font-bold mb-2 shadow-emerald-500/50 drop-shadow-lg flex items-center gap-2">
                                <AnimNumber value={2} delay={2.5} />
                                <MousePointerClick className="w-8 h-8 opacity-80" />
                            </div>
                            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/80">New Path</div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

/* ═════════════════════════════════════════════════
   BEAT 3: "DISCOVERY ARC"
   ═════════════════════════════════════════════════ */
export function MLBeatDiscovery() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1200)))
        t.push(setTimeout(() => setStep(2), at(2800)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="relative flex flex-col items-center justify-center w-full py-8 text-center">
            <AbstractFlowBubbles active={step >= 0} />

            <AnimatePresence>
                {step >= 0 && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-amber-500"
                    >
                        Domain Expertise
                    </motion.p>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-xl md:text-3xl font-light text-zinc-200 max-w-xl leading-relaxed mb-10"
                    >
                        I had zero background in machine learning. So I embedded with our Principal Data Scientist.
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-md"
                    >
                        <Target className="w-8 h-8 text-amber-400" />
                        <div className="text-left">
                            <div className="font-mono text-[10px] uppercase tracking-widest text-amber-500/80 mb-1">Certification</div>
                            <div className="font-bold text-amber-100 uppercase tracking-widest text-sm">MIT: AI & ML Product Design</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

/* ═════════════════════════════════════════════════
   BEAT 4: "THE ENTRY POINT"
   ═════════════════════════════════════════════════ */
export function MLBeatEntryPoint() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1200)))
        t.push(setTimeout(() => setStep(2), at(2600)))
        t.push(setTimeout(() => setStep(3), at(4200)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full py-8 text-center mt-12">
            <WireMorphBackdrop />
            <motion.p
                initial={{ opacity: 0 }}
                animate={step >= 0 ? { opacity: 1 } : {}}
                className="font-mono text-xs tracking-[0.3em] text-emerald-400 uppercase mb-8"
            >
                The Solution: Hub Integration
            </motion.p>

            <AnimatePresence>
                {step >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-lg md:text-xl text-zinc-300 max-w-2xl mb-12"
                    >
                        We brought machine learning directly to the data. Right-click any dataset, and you&apos;re ready to train.
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative w-72 h-40 flex flex-col items-center">
                <AnimatePresence>
                    {step >= 2 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="w-full p-4 rounded-xl border border-sky-500/30 bg-sky-500/10 backdrop-blur flex items-center gap-4"
                        >
                            <div className="w-10 h-10 rounded-lg bg-sky-400/20 flex items-center justify-center border border-sky-400/40">
                                <Search className="w-5 h-5 text-sky-300" />
                            </div>
                            <div className="text-left flex-1">
                                <div className="text-sm font-bold text-sky-100">Customer_Data.csv</div>
                                <div className="text-[10px] font-mono text-sky-300/80 uppercase">Asset</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {step >= 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: -10, y: -10 }}
                            animate={{ opacity: 1, x: 20, y: 20 }}
                            className="absolute top-1/2 left-1/2 w-48 rounded-lg border border-zinc-700 bg-[var(--bg-black)] shadow-2xl overflow-hidden z-10"
                        >
                            <div className="px-3 py-2 text-left text-xs text-zinc-400 border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer">Open</div>
                            <div className="px-3 py-2 text-left text-xs text-zinc-400 border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer">Edit</div>
                            <div className="px-3 py-2 text-left text-xs text-emerald-400 font-bold bg-emerald-500/10 border-b border-zinc-800 flex justify-between items-center group cursor-pointer">
                                <span>Predict Data</span>
                                <Sparkles className="w-3 h-3 group-hover:block" />
                            </div>
                            <div className="px-3 py-2 text-left text-xs text-rose-500 hover:bg-zinc-800/50 cursor-pointer">Delete</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {step >= 3 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 2 }}
                            animate={{ opacity: [0, 1, 0], scale: [2, 1, 1] }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="absolute top-[65%] left-[80%] z-20 pointer-events-none"
                        >
                            <MousePointerClick className="w-6 h-6 text-white drop-shadow-md" fill="white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ═════════════════════════════════════════════════
   BEAT 5: "THE PIVOT" 
   ═════════════════════════════════════════════════ */
export function MLBeatPivot() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1000)))
        t.push(setTimeout(() => setStep(2), at(2400)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full py-8">
            <WireMorphBackdrop />
            <motion.p
                initial={{ opacity: 0 }}
                animate={step >= 0 ? { opacity: 1 } : {}}
                className="font-mono text-xs tracking-[0.3em] text-zinc-300 uppercase mb-8"
            >
                Dual Persona Strategy
            </motion.p>

            <AnimatePresence>
                {step >= 1 && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-lg text-zinc-300 max-w-xl text-center mb-10"
                    >
                        One UI couldn&apos;t serve everyone.
                    </motion.p>
                )}
            </AnimatePresence>

            <div className="flex items-stretch gap-6 w-full max-w-2xl">
                <AnimatePresence>
                    {step >= 2 && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, x: -20, rotate: -2 }}
                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                className="flex-1 flex flex-col items-center text-center p-6 border border-sky-400/20 bg-sky-400/5 rounded-2xl"
                            >
                                <div className="text-sky-300 font-bold tracking-widest uppercase mb-2">Business Analysts</div>
                                <div className="text-sm text-zinc-400">Needed strict, visual guidance without writing code.</div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20, rotate: 2 }}
                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                className="flex-1 flex flex-col items-center text-center p-6 border border-emerald-400/20 bg-emerald-400/5 rounded-2xl"
                            >
                                <div className="text-emerald-300 font-bold tracking-widest uppercase mb-2">Data Scientists</div>
                                <div className="text-sm text-zinc-400">Needed deep architectural control over hyperparameters.</div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ═════════════════════════════════════════════════
   BEAT 6: "THE BREAKTHROUGH"
   ═════════════════════════════════════════════════ */
export function MLBeatBreakthrough() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1000)))
        t.push(setTimeout(() => setStep(2), at(2200)))
        return () => t.forEach(clearTimeout)
    }, [])

    const steps = ['Type', 'Target', 'Predictors', 'Parameters']

    return (
        <div className="flex flex-col items-center justify-center w-full py-8">
            <motion.p
                initial={{ opacity: 0 }}
                animate={step >= 0 ? { opacity: 1 } : {}}
                className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase mb-8"
            >
                Unified Workflow
            </motion.p>

            <AnimatePresence>
                {step >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-2xl md:text-3xl text-white font-light text-center mb-12"
                    >
                        Distilled <span className="text-rose-400 font-mono font-bold line-through">12 Cryptic Steps</span><br />
                        into a linear, 4-step visual wizard.
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center justify-center gap-4">
                <AnimatePresence>
                    {step >= 2 && steps.map((s, i) => (
                        <motion.div
                            key={s}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15, type: 'spring' }}
                            className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-cyan-100 font-mono text-xs uppercase tracking-widest"
                        >
                            <span className="text-cyan-500 mr-2">{i + 1}.</span> {s}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ═════════════════════════════════════════════════
   BEAT 7: "EXPLAINABILITY"
   ═════════════════════════════════════════════════ */
export function MLBeatExplainability() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1000)))
        t.push(setTimeout(() => setStep(2), at(2500)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full py-8 text-center">
            <WireMorphBackdrop />
            <motion.p
                initial={{ opacity: 0 }}
                animate={step >= 0 ? { opacity: 1 } : {}}
                className="font-mono text-xs tracking-[0.3em] text-emerald-400 uppercase mb-6"
            >
                Human Explainability
            </motion.p>

            <AnimatePresence>
                {step >= 1 && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-3xl font-light text-white tracking-tight leading-[1.2] max-w-2xl mb-12"
                    >
                        We redesigned model evaluation so you didn&apos;t need a statistics degree.
                    </motion.h2>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-8 md:gap-16 relative w-full justify-center">
                <AnimatePresence>
                    {step >= 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-32 h-24 border border-rose-500/20 bg-rose-500/5 rounded-lg flex flex-col justify-center p-2 opacity-60">
                                <div className="h-1 bg-rose-500/20 w-full mb-2"></div>
                                <div className="h-1 bg-rose-500/20 w-3/4 mb-2"></div>
                                <div className="h-1 bg-rose-500/20 w-5/6 mb-2"></div>
                                <div className="h-1 bg-rose-500/20 w-1/2"></div>
                            </div>
                            <div className="text-[10px] font-mono uppercase tracking-widest mt-4 text-zinc-500">Data Grid</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {step >= 2 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <ArrowRight className="w-6 h-6 text-zinc-500" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {step >= 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-40 h-32 border border-emerald-500/40 bg-emerald-500/10 rounded-xl flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                                <div className="grid grid-cols-2 gap-1 w-full h-full p-2">
                                    <div className="bg-emerald-400/20 rounded-tl-lg flex items-center justify-center text-emerald-300 font-mono text-xs">TP</div>
                                    <div className="bg-rose-400/10 rounded-tr-lg flex items-center justify-center text-rose-300 font-mono text-xs">FP</div>
                                    <div className="bg-rose-400/10 rounded-bl-lg flex items-center justify-center text-rose-300 font-mono text-xs">FN</div>
                                    <div className="bg-emerald-400/20 rounded-br-lg flex items-center justify-center text-emerald-300 font-mono text-xs">TN</div>
                                </div>
                            </div>
                            <div className="text-[10px] font-mono uppercase tracking-widest mt-4 text-emerald-400/80">Visual Confusion Matrix</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ═════════════════════════════════════════════════
   BEAT 8: "VALIDATION"
   ═════════════════════════════════════════════════ */
export function MLBeatValidation() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1000)))
        t.push(setTimeout(() => setStep(2), at(2500)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full py-8 text-center">
            <AbstractFlowBubbles active={step >= 0} />
            <motion.p
                initial={{ opacity: 0 }}
                animate={step >= 0 ? { opacity: 1 } : {}}
                className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase mb-8"
            >
                Validation & Impact
            </motion.p>

            <AnimatePresence>
                {step >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center mb-10"
                    >
                        <div className="text-5xl md:text-7xl font-bold text-white font-mono flex items-center justify-center gap-2">
                            <AnimNumber value={5} />/<AnimNumber value={5} />
                        </div>
                        <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mt-3">
                            Users completed unassisted
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-6 py-3">
                            <Sparkles className="w-5 h-5 text-amber-400" />
                            <span className="text-sm text-zinc-300">&quot;The best screen in the entire UX revamp.&quot; &mdash; Principal Data Scientist</span>
                        </div>
                        <div className="flex items-center justify-center gap-6 opacity-70">
                            <span className="font-mono text-xs text-rose-300 line-through">20 Minutes</span>
                            <ArrowRight className="w-4 h-4 text-zinc-500" />
                            <span className="font-mono text-xs text-emerald-300 font-bold">5 Minutes</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

/* ═════════════════════════════════════════════════
   THE BEATS ARRAY
   ═════════════════════════════════════════════════ */
export interface MovieBeat {
    id: string
    duration: number
    component: ReactNode
    label?: string
    signal?: string
    narration?: string
    narrationDelay?: number
    presenter?: boolean
}

const d = (ms: number) => Math.round(ms * BEAT_PACE)

export const ML_MOVIE_BEATS: MovieBeat[] = [
    {
        id: 'ml-problem',
        duration: d(9000),
        label: 'The Business Problem',
        signal: '0% ADOPTION',
        presenter: true,
        narration: 'We had this wildly powerful ML engine... that absolutely nobody was using. Five clicks deep in a settings menu? Yeah, no.',
        narrationDelay: 0.1,
        component: <MLBeatProblem />,
    },
    {
        id: 'ml-goal',
        duration: d(8000),
        label: 'The Goal',
        signal: 'DISCOVERABILITY',
        presenter: true,
        narration: 'We had to democratize it. Make it obvious, accessible, and totally bulletproof for business users.',
        narrationDelay: 0.1,
        component: <MLBeatGoal />,
    },
    {
        id: 'ml-discovery',
        duration: d(8000),
        label: 'Domain Expertise',
        signal: 'IMPOSTER SYNDROME: CURED',
        presenter: true,
        narration: 'Slight problem: I didn\'t know jack about ML. So I went to MIT to get certified and basically lived with our Principal Data Scientist.',
        narrationDelay: 0.1,
        component: <MLBeatDiscovery />,
    },
    {
        id: 'ml-entry-point',
        duration: d(9000),
        label: 'Hub Integration',
        signal: 'RIGHT CLICK MAGIC',
        presenter: true,
        narration: 'The fix was obvious... Bring ML to the data, not the other way around. Select predict data and voila you\'re on the Predict data landing page—ready to start training a model.',
        narrationDelay: 0.1,
        component: <MLBeatEntryPoint />,
    },
    {
        id: 'ml-pivot',
        duration: d(8600),
        label: 'Dual Persona',
        signal: 'COMPROMISE',
        presenter: true,
        narration: 'Experts wanted all the knobs. Absolute novices wanted a big "Do It" button. We had to build two tracks that felt like one system.',
        narrationDelay: 0.1,
        component: <MLBeatPivot />,
    },
    {
        id: 'ml-breakthrough',
        duration: d(8000),
        label: '4-Step Wizard',
        signal: 'SIMPLICITY',
        presenter: true,
        narration: 'I took 12 chaotic, error-prone steps and snapped them into a sleek, linear 4-step wizard.',
        narrationDelay: 0.1,
        component: <MLBeatBreakthrough />,
    },
    {
        id: 'ml-explainability',
        duration: d(9000),
        label: 'Explainability',
        signal: 'TRANSLATION',
        presenter: true,
        narration: 'We ditched the dense stats tables for a visual confusion matrix. You shouldn\'t need a PhD to know if your model is hallucinating.',
        narrationDelay: 0.1,
        component: <MLBeatExplainability />,
    },
    {
        id: 'ml-validation',
        duration: d(8600),
        label: 'Validation',
        signal: '5/5 SUCCESS',
        presenter: true,
        narration: '5 for 5 in usability testing. Even our toughest Data Scientist was blown away. Next up: shipping it platform-wide.',
        narrationDelay: 0.1,
        component: <MLBeatValidation />,
    },
]
