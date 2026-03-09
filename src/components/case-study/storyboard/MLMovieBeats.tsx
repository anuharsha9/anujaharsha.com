'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Search, Users, Sparkles, Target, MousePointerClick } from 'lucide-react'
import { withHexAlpha } from '@/lib/color-utils'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const BEAT_PACE = 1.58
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
        t.push(setTimeout(() => setStep(4), at(4200)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    {/* Speech bubble */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease }}
                    >
                        <PresenterBar>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                Our ML engine lived inside a <span className="text-zinc-200 font-medium">data flow canvas</span>. Users had to open a new tab, drag data pills, drag model pills, hit a hidden play button, then <span className="text-rose-400 font-bold">right-click for cascading context menus</span> just to set hyperparameters. <span className="text-zinc-200 font-medium">12+ clicks. Zero adoption.</span>
                            </p>
                        </PresenterBar>
                    </motion.div>

                    {/* ── Data Flow Canvas — the actual legacy workflow ── */}
                    <AnimatePresence>
                        {step >= 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3, ease }}
                                className="mt-8 rounded-xl border border-white/[0.08] bg-black/30 overflow-hidden shadow-xl"
                            >
                                {/* Window chrome */}
                                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.04]">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-red)]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-yellow)]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-green-alt)]" />
                                    <span className="ml-3 text-[9px] font-mono text-zinc-600">WebFOCUS — Data Flow Editor</span>
                                    {/* Play button — hidden, easy to miss */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={step >= 3 ? { opacity: 1 } : {}}
                                        transition={{ delay: 0.3 }}
                                        className="ml-auto flex items-center gap-1"
                                    >
                                        <div className="w-5 h-5 rounded-sm bg-white/[0.04] border border-white/[0.08] flex items-center justify-center cursor-pointer">
                                            <div className="w-0 h-0 border-l-[5px] border-l-zinc-500 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5" />
                                        </div>
                                        <span className="text-[7px] font-mono text-zinc-600">Run</span>
                                    </motion.div>
                                </div>

                                {/* Data flow canvas area */}
                                <div className="relative p-4 min-h-[240px]">
                                    {/* Grid background */}
                                    <div className="absolute inset-0 opacity-[0.03]" style={{
                                        backgroundImage: 'radial-gradient(circle, var(--overlay-white-30) 1px, transparent 1px)',
                                        backgroundSize: '20px 20px',
                                    }} />

                                    {/* Step 1: Data source pill */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={step >= 1 ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.4, ease }}
                                        className="absolute top-6 left-6 flex items-center gap-2"
                                    >
                                        <div className="px-3 py-2 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-sm bg-sky-400/40" />
                                            <span className="text-[9px] font-mono text-sky-300">Customer_Data.csv</span>
                                        </div>
                                        <span className="text-[7px] font-mono text-zinc-600 italic">← drag here</span>
                                    </motion.div>

                                    {/* Step 2: Train Model pill — dragged and connected */}
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.5, ease }}
                                        className="absolute top-6 right-6 flex items-center gap-2"
                                    >
                                        <span className="text-[7px] font-mono text-zinc-600 italic">drag model →</span>
                                        <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-sm bg-amber-400/40" />
                                            <span className="text-[9px] font-mono text-amber-300">Train Model</span>
                                        </div>
                                    </motion.div>

                                    {/* Connector line between pills */}
                                    <motion.svg
                                        className="absolute top-[38px] left-[180px] w-[120px] h-[12px]"
                                        initial={{ opacity: 0 }}
                                        animate={step >= 1 ? { opacity: 0.3 } : {}}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <line x1="0" y1="6" x2="120" y2="6" stroke="var(--overlay-white-15)" strokeWidth="1" strokeDasharray="4 3" />
                                        <circle cx="118" cy="6" r="2" fill="var(--overlay-white-15)" />
                                    </motion.svg>

                                    {/* Step 3: Config popups — target & predictors */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={step >= 2 ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ duration: 0.4, ease }}
                                        className="absolute top-[72px] left-[30%] -translate-x-1/2 w-[140px] rounded-lg border border-white/[0.08] bg-zinc-900/95 shadow-xl overflow-hidden"
                                    >
                                        <div className="px-2.5 py-1 border-b border-white/[0.04] bg-white/[0.02]">
                                            <span className="text-[8px] font-mono text-zinc-500">Configure Model</span>
                                        </div>
                                        <div className="p-2 space-y-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[7px] font-mono text-zinc-600 w-12">Target:</span>
                                                <div className="h-4 flex-1 rounded bg-white/[0.04] border border-white/[0.06]" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[7px] font-mono text-zinc-600 w-12">Predictors:</span>
                                                <div className="h-4 flex-1 rounded bg-white/[0.04] border border-white/[0.06]" />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Step 4: Error-looking "results not generated" screen */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={step >= 3 ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ duration: 0.5, ease }}
                                        className="absolute top-[72px] right-4 w-[160px] rounded-lg border border-rose-500/30 bg-rose-500/[0.06] p-2.5 shadow-[0_0_20px_rgba(244,63,94,0.1)]"
                                    >
                                        <div className="flex items-center gap-1.5 mb-1.5">
                                            <div className="w-3 h-3 rounded-full border border-rose-500/40 flex items-center justify-center">
                                                <span className="text-[6px] text-rose-400">!</span>
                                            </div>
                                            <span className="text-[8px] font-mono text-rose-300/80">Results Not Generated</span>
                                        </div>
                                        <div className="text-[7px] font-mono text-rose-400/40 leading-tight">
                                            Click ▶ Run to execute...
                                        </div>
                                    </motion.div>

                                    {/* Step 5: Right-click cascading context menus for hyperparameters */}
                                    <AnimatePresence>
                                        {step >= 4 && (
                                            <>
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.3, ease }}
                                                    className="absolute bottom-[52px] left-[25%] w-[100px] rounded-md border border-white/[0.1] bg-zinc-900/95 shadow-xl overflow-hidden z-10"
                                                >
                                                    {['Properties', 'Hyperparams ▸', 'Delete'].map((item, i) => (
                                                        <div key={item} className={`px-2.5 py-1 text-[8px] font-mono ${i === 1 ? 'bg-white/[0.06] text-zinc-200' : 'text-zinc-600'} border-b border-white/[0.03] last:border-0`}>{item}</div>
                                                    ))}
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -5 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2, duration: 0.3, ease }}
                                                    className="absolute bottom-[40px] left-[calc(25%+104px)] w-[120px] rounded-md border border-white/[0.1] bg-zinc-900/95 shadow-xl overflow-hidden z-20"
                                                >
                                                    {['Learning Rate: 0.01', 'Max Depth: 6', 'N Estimators: 100', 'Min Samples: 2'].map(p => (
                                                        <div key={p} className="px-2.5 py-1 text-[7px] font-mono text-zinc-500 border-b border-white/[0.03] last:border-0">{p}</div>
                                                    ))}
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>

                                    {/* Click counter: 12+ interactions */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={step >= 2 ? { opacity: 1 } : {}}
                                        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1"
                                    >
                                        {Array.from({ length: 12 }).map((_, n) => (
                                            <motion.div
                                                key={n}
                                                initial={{ scale: 0 }}
                                                animate={
                                                    (n < 4 && step >= 2) || (n < 8 && step >= 3) || (n < 12 && step >= 4)
                                                        ? { scale: 1 }
                                                        : {}
                                                }
                                                transition={{ duration: 0.2, delay: (n % 4) * 0.08 }}
                                                className={`w-2 h-2 rounded-full ${n >= 8 ? 'bg-rose-500/40' : 'bg-white/[0.08]'}`}
                                            />
                                        ))}
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={step >= 4 ? { opacity: 1 } : {}}
                                            className="text-[8px] font-mono text-rose-400/60 ml-1"
                                        >+</motion.span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
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
        <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12 flex flex-col items-center text-center">
                    <PresenterBar delay={0.1}>
                        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                            Drive adoption by <span className="text-zinc-200 font-medium">democratizing ML</span> for non-technical users. <span className="text-emerald-400 font-medium">No code, no confusion, no dead-ends.</span>
                        </p>
                    </PresenterBar>

                    {/* ── Before / After dual screenshot comparison ── */}
                    <AnimatePresence>
                        {step >= 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease }}
                                className="w-full max-w-4xl"
                            >
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    {/* Before: Chaotic data flow wireframe */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, ease }}
                                        className="rounded-xl border border-rose-500/20 bg-rose-500/[0.03] overflow-hidden"
                                    >
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/[0.05] border-b border-rose-500/10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500/60" />
                                            <span className="text-[8px] font-mono text-rose-400/60 uppercase tracking-wider">Before: Data Flow Canvas</span>
                                        </div>
                                        <div className="relative p-3 min-h-[120px]">
                                            {/* Scattered pills */}
                                            {['Data', 'Model', 'Target', 'Params'].map((pill, i) => (
                                                <motion.div
                                                    key={pill}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 0.5 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="absolute px-2 py-1 rounded bg-rose-500/10 border border-rose-500/15 text-[7px] font-mono text-rose-300/50"
                                                    style={{
                                                        left: `${12 + (i * 22) % 70}%`,
                                                        top: `${15 + ((i * 37) % 60)}%`,
                                                    }}
                                                >{pill}</motion.div>
                                            ))}
                                            {/* Messy connection lines */}
                                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                <line x1="20" y1="30" x2="55" y2="65" stroke="var(--semantic-rose)" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.2" />
                                                <line x1="35" y1="50" x2="78" y2="35" stroke="var(--semantic-rose)" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.15" />
                                                <line x1="55" y1="65" x2="80" y2="80" stroke="var(--semantic-rose)" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.2" />
                                            </svg>
                                            {/* Error badge */}
                                            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-rose-500/15 border border-rose-500/20">
                                                <span className="text-[6px] font-mono text-rose-400/50">⚠ Results Not Generated</span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* After: Clean 4-step wizard wireframe */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 15 }}
                                        animate={step >= 2 ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.6, ease }}
                                        className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] overflow-hidden"
                                    >
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/[0.05] border-b border-emerald-500/10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                                            <span className="text-[8px] font-mono text-emerald-400/60 uppercase tracking-wider">After: Guided Wizard</span>
                                        </div>
                                        <div className="p-3 space-y-1.5">
                                            {['Problem Type', 'Specify Target', 'Select Predictors', 'Configure'].map((label, i) => (
                                                <motion.div
                                                    key={label}
                                                    initial={{ opacity: 0, x: 8 }}
                                                    animate={step >= 2 ? { opacity: 1, x: 0 } : {}}
                                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div className="w-4 h-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-[7px] font-mono font-bold text-emerald-400">{i + 1}</span>
                                                    </div>
                                                    <div className="flex-1 h-5 rounded bg-emerald-500/[0.06] border border-emerald-500/10 flex items-center px-2">
                                                        <span className="text-[7px] font-mono text-emerald-300/50">{label}</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                            {/* Submit button wireframe */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={step >= 2 ? { opacity: 1 } : {}}
                                                transition={{ delay: 0.5 }}
                                                className="mt-1 flex justify-end"
                                            >
                                                <div className="px-3 py-1 rounded bg-emerald-500/20 border border-emerald-500/25">
                                                    <span className="text-[7px] font-mono text-emerald-300/70">Train Model →</span>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Metric bar */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center justify-center gap-6 mt-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-mono font-bold text-rose-400 line-through">12+</span>
                                        <span className="text-[9px] font-mono text-zinc-600 uppercase">clicks</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-zinc-600" />
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-mono font-bold text-emerald-400">4</span>
                                        <span className="text-[9px] font-mono text-emerald-400/60 uppercase">steps</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
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
        <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12 flex flex-col items-center text-center">
                    <PresenterBar delay={0.1}>
                        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                            I had <span className="text-zinc-200 font-medium">zero ML background</span>. Got <span className="text-amber-400 font-bold">MIT certified</span> in AI/ML Product Design, then embedded weekly with our Principal Data Scientist for months before touching design.
                        </p>
                    </PresenterBar>
                    {/* ── MIT Certificate Illustration ── */}
                    <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl">
                        <AnimatePresence>
                            {step >= 0 && (
                                <motion.div
                                    initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
                                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                                    transition={{ duration: 0.8, ease }}
                                    className="flex-1 relative"
                                >
                                    {/* Certificate frame */}
                                    <div className="relative rounded-xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-zinc-950 to-amber-950/20 p-6 md:p-8 shadow-[0_0_40px_rgba(245,158,11,0.1)]">
                                        {/* Decorative corners */}
                                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500/40 rounded-tl" />
                                        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500/40 rounded-tr" />
                                        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500/40 rounded-bl" />
                                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500/40 rounded-br" />

                                        <div className="text-center">
                                            <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-amber-500/60 mb-2">Professional Certificate</div>
                                            <div className="text-lg md:text-xl font-bold text-amber-200 tracking-wide mb-1">MIT</div>
                                            <div className="text-[11px] font-mono text-amber-300/70 tracking-wider">Product Design for AI & ML</div>

                                            {/* Gold seal */}
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={step >= 1 ? { scale: 1, rotate: 0 } : {}}
                                                transition={{ duration: 0.6, type: 'spring', damping: 15 }}
                                                className="mx-auto mt-4 w-12 h-12 rounded-full border-2 border-amber-400/60 bg-gradient-to-br from-amber-500/30 to-amber-700/20 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                                            >
                                                <Target className="w-5 h-5 text-amber-300" />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={step >= 1 ? { opacity: 1 } : {}}
                                                transition={{ delay: 0.3 }}
                                                className="mt-3 text-[10px] font-mono text-amber-500/50"
                                            >
                                                Anuja Harsha · Boston, MA
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* You + Data Scientist exchanging knowledge */}
                        <AnimatePresence>
                            {step >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, ease }}
                                    className="flex-1"
                                >
                                    <div className="rounded-xl border border-white/[0.08] bg-zinc-950/80 overflow-hidden p-5">
                                        <div className="flex items-start gap-6 justify-center">
                                            {/* Anu avatar */}
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-sky-500/20 border border-cyan-500/30 flex items-center justify-center">
                                                    <span className="text-[11px] font-mono font-bold text-cyan-300">AH</span>
                                                </div>
                                                <span className="text-[8px] font-mono text-cyan-400/60">Designer</span>
                                            </div>

                                            {/* Exchange arrows + knowledge bubbles */}
                                            <div className="flex flex-col items-center gap-2 pt-2">
                                                {/* DS → Anu: ML concepts */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                    className="flex items-center gap-1.5"
                                                >
                                                    <span className="text-[7px] font-mono text-amber-300/60">←</span>
                                                    <div className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/15">
                                                        <span className="text-[7px] font-mono text-amber-300/70">Confusion Matrix</span>
                                                    </div>
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.4 }}
                                                    className="flex items-center gap-1.5"
                                                >
                                                    <span className="text-[7px] font-mono text-amber-300/60">←</span>
                                                    <div className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/15">
                                                        <span className="text-[7px] font-mono text-amber-300/70">Hyperparameters</span>
                                                    </div>
                                                </motion.div>
                                                {/* Anu → DS: Design insights */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.6 }}
                                                    className="flex items-center gap-1.5"
                                                >
                                                    <div className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/15">
                                                        <span className="text-[7px] font-mono text-cyan-300/70">4-Step Wizard</span>
                                                    </div>
                                                    <span className="text-[7px] font-mono text-cyan-300/60">→</span>
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.8 }}
                                                    className="flex items-center gap-1.5"
                                                >
                                                    <div className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/15">
                                                        <span className="text-[7px] font-mono text-cyan-300/70">Visual Matrix</span>
                                                    </div>
                                                    <span className="text-[7px] font-mono text-cyan-300/60">→</span>
                                                </motion.div>
                                            </div>

                                            {/* DS avatar */}
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
                                                    <span className="text-[11px] font-mono font-bold text-amber-300">DS</span>
                                                </div>
                                                <span className="text-[8px] font-mono text-amber-400/60">Data Scientist</span>
                                            </div>
                                        </div>
                                        <div className="mt-3 text-center">
                                            <span className="text-[8px] font-mono text-zinc-600">Months of weekly sessions</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
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
        t.push(setTimeout(() => setStep(0), at(200)))   // Browser panel appears
        t.push(setTimeout(() => setStep(1), at(1200)))  // Cursor appears
        t.push(setTimeout(() => setStep(2), at(2200)))  // Right-click context menu
        t.push(setTimeout(() => setStep(3), at(3400)))  // Hover highlight on Predict Data
        t.push(setTimeout(() => setStep(4), at(4600)))  // Click + transition
        return () => t.forEach(clearTimeout)
    }, [])

    const datasets = [
        { name: 'Customer_Data.csv', rows: '12,847', type: 'CSV' },
        { name: 'Financial_QTR.xlsx', rows: '5,420', type: 'XLSX' },
        { name: 'Churn_History.csv', rows: '34,102', type: 'CSV' },
        { name: 'Revenue_2024.csv', rows: '8,956', type: 'CSV' },
    ]

    return (
        <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12 flex flex-col items-center text-center">
                    <PresenterBar delay={0.1}>
                        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                            There was <span className="text-zinc-200 font-medium">no entry point</span>. I designed the Predict Data landing page from scratch — right-click any dataset, select <span className="text-emerald-400 font-medium">Predict Data</span>, and you&apos;re ready to train.
                        </p>
                    </PresenterBar>
                    <WireMorphBackdrop />

                    {/* ── Full Data Browser Panel ── */}
                    <AnimatePresence>
                        {step >= 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.8, ease }}
                                className="relative w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-zinc-950/90 overflow-hidden shadow-2xl shadow-black/50 mt-4"
                            >
                                {/* Window chrome */}
                                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.04]">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-red)]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-yellow)]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-green-alt)]" />
                                    <span className="ml-3 text-[9px] font-mono text-zinc-600">WebFOCUS — Data Browser</span>
                                </div>

                                {/* Toolbar */}
                                <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.04] bg-white/[0.01]">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
                                        <Search className="w-3 h-3 text-zinc-600" />
                                        <span className="text-[8px] font-mono text-zinc-600">Search datasets...</span>
                                    </div>
                                    <div className="ml-auto flex gap-1">
                                        {['All', 'CSV', 'XLSX'].map(f => (
                                            <div key={f} className={`px-2 py-0.5 rounded text-[7px] font-mono ${f === 'All' ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20' : 'text-zinc-600'}`}>{f}</div>
                                        ))}
                                    </div>
                                </div>

                                {/* Table header */}
                                <div className="flex px-4 py-1.5 border-b border-white/[0.06] bg-white/[0.015]">
                                    {['Name', 'Rows', 'Type', ''].map(h => (
                                        <span key={h || 'actions'} className={`text-[7px] font-mono text-zinc-500 uppercase tracking-wider ${h === 'Name' ? 'flex-1' : h === '' ? 'w-8' : 'w-16 text-right'}`}>{h}</span>
                                    ))}
                                </div>

                                {/* Dataset rows */}
                                <div className="relative">
                                    {datasets.map((ds, i) => (
                                        <motion.div
                                            key={ds.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.08 }}
                                            className={`flex items-center px-4 py-2.5 border-b border-white/[0.03] cursor-pointer transition-colors ${i === 0 && step >= 1 ? 'bg-sky-500/[0.08] border-sky-500/15' : 'hover:bg-white/[0.02]'
                                                }`}
                                        >
                                            <div className="flex-1 flex items-center gap-2.5">
                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${i === 0 && step >= 1 ? 'bg-sky-500/20 border border-sky-500/30' : 'bg-white/[0.04] border border-white/[0.06]'
                                                    }`}>
                                                    <span className={`text-[8px] font-mono font-bold ${i === 0 && step >= 1 ? 'text-sky-300' : 'text-zinc-500'}`}>{ds.type === 'CSV' ? '📄' : '📊'}</span>
                                                </div>
                                                <div>
                                                    <div className={`text-xs font-mono ${i === 0 && step >= 1 ? 'text-sky-200 font-medium' : 'text-zinc-400'}`}>{ds.name}</div>
                                                    <div className="text-[7px] font-mono text-zinc-600">{ds.type} Dataset</div>
                                                </div>
                                            </div>
                                            <span className="w-16 text-right text-[9px] font-mono text-zinc-600">{ds.rows}</span>
                                            <span className="w-16 text-right text-[8px] font-mono text-zinc-600">{ds.type}</span>
                                            <div className="w-8 text-right text-zinc-600">⋯</div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Animated cursor */}
                                <AnimatePresence>
                                    {step >= 1 && step < 4 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: '80%', y: '60%' }}
                                            animate={step >= 2 ? { opacity: 1, x: '55%', y: '18%' } : { opacity: 1, x: '55%', y: '15%' }}
                                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                                            className="absolute z-30 pointer-events-none"
                                        >
                                            <MousePointerClick className="w-5 h-5 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]" fill="white" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Context menu */}
                                <AnimatePresence>
                                    {step >= 2 && step < 4 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: -5 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.25, ease: 'easeOut' }}
                                            className="absolute top-[28%] left-[48%] w-48 rounded-lg border border-zinc-700 bg-zinc-900/98 shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden z-20 backdrop-blur-md"
                                        >
                                            {[
                                                { label: 'Open', icon: '📂' },
                                                { label: 'Edit Properties', icon: '✏️' },
                                                { label: 'Predict Data', icon: '✨', highlight: true },
                                                { label: 'Export', icon: '📤' },
                                                { label: 'Delete', icon: '🗑️', danger: true },
                                            ].map((item, i) => (
                                                <motion.div
                                                    key={item.label}
                                                    initial={{ opacity: 0, x: -8 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className={`flex items-center gap-2.5 px-3 py-2 text-left text-xs border-b border-zinc-800/50 cursor-pointer transition-all ${item.highlight && step >= 3
                                                        ? 'bg-emerald-500/15 text-emerald-300 font-bold shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]'
                                                        : item.danger ? 'text-rose-400/60' : 'text-zinc-400 hover:bg-zinc-800/50'
                                                        }`}
                                                >
                                                    <span className="text-sm">{item.icon}</span>
                                                    <span>{item.label}</span>
                                                    {item.highlight && (
                                                        <motion.div
                                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                            className="ml-auto"
                                                        >
                                                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Click ripple + launch state */}
                                <AnimatePresence>
                                    {step >= 4 && (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0.8, scale: 0 }}
                                                animate={{ opacity: 0, scale: 3 }}
                                                transition={{ duration: 0.6 }}
                                                className="absolute top-[32%] left-[60%] w-8 h-8 rounded-full bg-emerald-400/30 z-30 pointer-events-none"
                                            />
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3, duration: 0.5 }}
                                                className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.08] to-transparent z-10 flex flex-col items-center justify-center"
                                            >
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5 }}
                                                    className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-sm"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                                            className="w-5 h-5 border-2 border-emerald-400/40 border-t-emerald-400 rounded-full"
                                                        />
                                                        <span className="text-sm font-mono text-emerald-300">Loading Predict Data...</span>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
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
            <PresenterBar delay={0.1}>
                <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                    One guided workflow — <span className="text-zinc-200 font-medium">slow enough for a beginner, detailed enough for an expert</span>. The complexity is there — it just waits for you to ask for it.
                </p>
            </PresenterBar>
            <WireMorphBackdrop />

            {/* Visual: Single unified wizard panel with expandable depth */}
            <AnimatePresence>
                {step >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease }}
                        className="w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-zinc-950/80 overflow-hidden shadow-2xl shadow-black/40"
                    >
                        {/* Wizard step header */}
                        <div className="flex items-center gap-1 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                            {['Type', 'Target', 'Predictors', 'Params'].map((s, i) => (
                                <div key={s} className={`flex-1 text-center py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider ${i === 3 ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-zinc-600'}`}>
                                    {s}
                                </div>
                            ))}
                        </div>

                        {/* Guided surface — what everyone sees */}
                        <div className="px-5 py-4 space-y-3">
                            <div className="h-2.5 w-3/4 rounded-full bg-white/[0.06]" />
                            <div className="h-2 w-1/2 rounded-full bg-white/[0.04]" />
                            <div className="flex gap-2 mt-3">
                                <div className="h-8 flex-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20" />
                                <div className="h-8 flex-1 rounded-lg bg-white/[0.03] border border-white/[0.06]" />
                            </div>
                        </div>

                        {/* Expandable advanced section — progressive disclosure */}
                        <AnimatePresence>
                            {step >= 2 && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    transition={{ duration: 0.6, ease }}
                                    className="border-t border-dashed border-cyan-500/20 overflow-hidden"
                                >
                                    <div className="px-5 py-3 bg-cyan-500/[0.03]">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="w-3 h-3 text-cyan-400" />
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80">Advanced Parameters</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['Learning Rate', 'Max Depth', 'Estimators', 'Threshold'].map(p => (
                                                <div key={p} className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.05]">
                                                    <span className="text-[9px] font-mono text-zinc-500">{p}</span>
                                                    <div className="w-8 h-1.5 rounded-full bg-cyan-500/30" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
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



    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        if (step >= 2) {
            const interval = setInterval(() => {
                setActiveStep(prev => (prev + 1) % 4)
            }, 2200)
            return () => clearInterval(interval)
        }
    }, [step])

    const stepLabels = ['Select Problem Type', 'Specify Problem', 'Select Predictors', 'Configure Hyperparameters']

    return (
        <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12 flex flex-col items-center">
                    <PresenterBar delay={0.1}>
                        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                            <span className="text-rose-400 font-medium line-through">12+ clicks</span> through data flows and menus &rarr; right-click, Predict Data, Train Model, and you&apos;re in. <span className="text-cyan-400 font-bold">~6 steps</span> &mdash; one guided flow for all users. Complexity is there, it just waits for you to ask for it.
                        </p>
                    </PresenterBar>

                    {/* ── Animated Guided Wizard — wireframe recreation ── */}
                    <AnimatePresence>
                        {step >= 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease }}
                                className="w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-zinc-950/80 overflow-hidden shadow-2xl shadow-black/40"
                            >
                                {/* Window chrome */}
                                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.04]">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-red)]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-yellow)]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-green-alt)]" />
                                    <span className="ml-3 text-[9px] font-mono text-zinc-600">Train Model</span>
                                </div>

                                {/* Stepper bar */}
                                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
                                    {stepLabels.map((label, i) => (
                                        <div key={label} className="flex items-center gap-1.5">
                                            <motion.div
                                                animate={{
                                                    backgroundColor: i <= activeStep ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.06)',
                                                    scale: i === activeStep ? 1.15 : 1,
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="w-4 h-4 rounded-full flex items-center justify-center border border-white/[0.1]"
                                            >
                                                <span className="text-[7px] font-mono font-bold text-white">{i + 1}</span>
                                            </motion.div>
                                            <span className={`text-[7px] font-mono tracking-wider hidden md:inline ${i === activeStep ? 'text-zinc-200' : 'text-zinc-600'}`}>{label}</span>
                                            {i < 3 && <div className="w-4 md:w-8 h-px bg-white/[0.06] mx-1" />}
                                        </div>
                                    ))}
                                </div>

                                {/* Step content — animated */}
                                <div className="relative min-h-[280px] p-6">
                                    <AnimatePresence mode="wait">
                                        {activeStep === 0 && (
                                            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                                {/* Step 1: Problem type cards */}
                                                <div className="grid grid-cols-3 gap-2">
                                                    {['Binary\nClassification', 'Anomaly\nDetection', 'Multi-class', 'Regression', 'Clustering', 'Time-series'].map((type, i) => (
                                                        <motion.div
                                                            key={type}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: i * 0.06 }}
                                                            className={`rounded-lg border p-3 text-center cursor-pointer ${i === 0 ? 'border-blue-500/30 bg-blue-500/10' : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                                                                }`}
                                                        >
                                                            <div className="w-5 h-5 mx-auto mb-1.5 rounded-full bg-white/[0.06] border border-white/[0.08]" />
                                                            <span className={`text-[8px] font-mono leading-tight ${i === 0 ? 'text-blue-300' : 'text-zinc-500'}`}>{type.replace('\n', ' ')}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                        {activeStep === 1 && (
                                            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                                {/* Step 2: Form fields */}
                                                <div className="space-y-3 max-w-sm mx-auto">
                                                    {['Target*', 'Positive Class*', 'Scoring*'].map((field, i) => (
                                                        <motion.div key={field} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                                            <div className="text-[8px] font-mono text-zinc-500 mb-1">{field}</div>
                                                            <div className="h-7 rounded-md border border-white/[0.08] bg-white/[0.03] flex items-center px-2.5 justify-between">
                                                                <span className="text-[8px] font-mono text-blue-400/60">{['Select Target', 'Select Positive Class', 'AUC'][i]}</span>
                                                                <div className="w-2 h-2 border-b border-r border-zinc-600 rotate-45 -mt-0.5" />
                                                            </div>
                                                            <div className="mt-1 text-[7px] font-mono text-zinc-600 px-2">{['The variable to predict', 'Default: minority class', 'Objective metric'][i]}</div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                        {activeStep === 2 && (
                                            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                                {/* Step 3: Data table with checkboxes */}
                                                <div className="rounded-lg border border-white/[0.06] overflow-hidden">
                                                    <div className="flex px-3 py-1.5 border-b border-white/[0.06] bg-white/[0.02]">
                                                        {['', 'Field', 'Count', 'Nulls'].map(h => (
                                                            <span key={h} className="flex-1 text-[7px] font-mono text-zinc-500 uppercase">{h}</span>
                                                        ))}
                                                    </div>
                                                    {['Date of Statement', 'Long Term Debt', 'Short Term Debt', 'Long Term Equity', 'Short Term Equity', 'CASH_QTR'].map((field, i) => (
                                                        <motion.div
                                                            key={field}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: i * 0.05 }}
                                                            className={`flex px-3 py-1.5 border-b border-white/[0.03] items-center ${[0, 2, 4].includes(i) ? 'bg-blue-500/[0.05]' : ''}`}
                                                        >
                                                            <div className="flex-1"><div className={`w-2.5 h-2.5 rounded-sm border ${[0, 2, 4].includes(i) ? 'border-blue-500/40 bg-blue-500/20' : 'border-white/[0.1]'}`} /></div>
                                                            <span className="flex-1 text-[7px] font-mono text-zinc-400">{field}</span>
                                                            <span className="flex-1 text-[7px] font-mono text-zinc-600">538</span>
                                                            <span className="flex-1 text-[7px] font-mono text-zinc-600">0.00%</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                        {activeStep === 3 && (
                                            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                                {/* Step 4: Algorithm chips + param fields */}
                                                <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
                                                    {['K-nearest', 'Logistic Regression', 'XGBoost', 'Random Forest', 'Neural Net'].map((algo, i) => (
                                                        <motion.div
                                                            key={algo}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: i * 0.06 }}
                                                            className={`px-2.5 py-1 rounded-full text-[8px] font-mono border ${i === 1 ? 'bg-blue-500/20 border-blue-500/30 text-blue-300' : 'border-white/[0.08] text-zinc-500 bg-white/[0.02]'}`}
                                                        >{algo}</motion.div>
                                                    ))}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {['L2 Regularization', 'Cross-Validation', 'Feature Importances', 'Training Ratio'].map(p => (
                                                        <div key={p} className="space-y-1">
                                                            <span className="text-[7px] font-mono text-zinc-600">{p}</span>
                                                            <div className="h-6 rounded-md border border-white/[0.06] bg-white/[0.02] flex items-center px-2">
                                                                <span className="text-[8px] font-mono text-blue-400/50">{['0.1, 1.0', '4', 'Yes', '0.8'][['L2 Regularization', 'Cross-Validation', 'Feature Importances', 'Training Ratio'].indexOf(p)]}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Footer — Back / Next */}
                                <div className="flex items-center justify-center gap-2 px-5 py-3 border-t border-white/[0.04]">
                                    <div className="px-3 py-1 rounded-md border border-white/[0.08] bg-white/[0.02]">
                                        <span className="text-[8px] font-mono text-zinc-500">Back</span>
                                    </div>
                                    <div className="px-3 py-1 rounded-md bg-blue-500/20 border border-blue-500/25">
                                        <span className="text-[8px] font-mono text-blue-300">{activeStep === 3 ? 'Apply and Train →' : 'Next →'}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

/* ═════════════════════════════════════════════════
   BEAT: "THE ORIGIN — EARNING TRUST"
   How explainability work earned the full ML revamp
   ═════════════════════════════════════════════════ */
export function MLBeatOrigin() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1200)))
        t.push(setTimeout(() => setStep(2), at(2800)))
        t.push(setTimeout(() => setStep(3), at(4200)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12 flex flex-col items-center text-center">
                    <PresenterBar delay={0.1}>
                        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                            Our DS handed me a screenshot and said: <span className="text-cyan-400 font-medium italic">&ldquo;Can you figure this out?&rdquo;</span> — I nailed it. That&apos;s what <span className="text-emerald-400 font-bold">earned the trust</span> to revamp the entire ML workflow.
                        </p>
                    </PresenterBar>

                    <div className="w-full max-w-4xl">
                        {/* Two wireframe panels: Reference → Solution */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* DS Challenge: External tool reference */}
                            <AnimatePresence>
                                {step >= 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, ease }}
                                        className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] overflow-hidden"
                                    >
                                        <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/[0.05] border-b border-amber-500/10">
                                            <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                                            <span className="text-[10px] font-mono text-amber-400/60 uppercase tracking-wider">DS&apos;s Reference</span>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            {/* Abstract external tool wireframe */}
                                            <div className="rounded-lg bg-amber-500/5 border border-amber-500/10 p-3">
                                                <div className="flex gap-1 mb-2">
                                                    {[1, 2, 3].map(n => (
                                                        <div key={n} className="flex-1 h-2 rounded-full bg-amber-500/15" />
                                                    ))}
                                                </div>
                                                {/* Mini chart lines */}
                                                <svg viewBox="0 0 100 40" className="w-full h-14" fill="none">
                                                    <motion.path
                                                        d="M5,30 Q25,5 50,20 T95,10"
                                                        stroke="rgba(245,158,11,0.3)"
                                                        strokeWidth="1.5"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ delay: 0.3, duration: 1 }}
                                                    />
                                                    <motion.path
                                                        d="M5,25 Q30,35 55,15 T95,20"
                                                        stroke="rgba(245,158,11,0.15)"
                                                        strokeWidth="1"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ delay: 0.5, duration: 1 }}
                                                    />
                                                </svg>
                                                <div className="flex gap-1 mt-1">
                                                    <div className="h-1 w-8 rounded-full bg-amber-500/10" />
                                                    <div className="h-1 w-6 rounded-full bg-amber-500/8" />
                                                </div>
                                            </div>
                                            <div className="text-[10px] font-mono text-amber-400/40 text-center mt-1">&ldquo;Can you figure this out?&rdquo;</div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* My Solution: WebFOCUS native */}
                            <AnimatePresence>
                                {step >= 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        transition={{ duration: 0.8, ease }}
                                        className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.08)]"
                                    >
                                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/[0.05] border-b border-emerald-500/10">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-wider">My Solution — Shipped</span>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            {/* Feature importance bars */}
                                            <div className="text-[9px] font-mono text-emerald-400/50 uppercase tracking-wide mb-2">Feature Importance</div>
                                            {[
                                                { name: 'Annual Income', w: '88%', delay: 0.2 },
                                                { name: 'Credit Score', w: '76%', delay: 0.3 },
                                                { name: 'Debt Ratio', w: '62%', delay: 0.4 },
                                                { name: 'Employment Yrs', w: '45%', delay: 0.5 },
                                                { name: 'Loan Amount', w: '30%', delay: 0.6 },
                                            ].map((f) => (
                                                <div key={f.name} className="flex items-center gap-2">
                                                    <span className="text-[8px] font-mono text-zinc-500 w-20 text-right shrink-0">{f.name}</span>
                                                    <div className="flex-1 h-4 bg-white/[0.03] rounded-sm overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-gradient-to-r from-emerald-500/40 to-emerald-400/20 rounded-sm"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: f.w }}
                                                            transition={{ delay: f.delay, duration: 0.6, ease: 'easeOut' }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Prediction explanation line */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.8 }}
                                                className="mt-2 py-2 px-3 rounded bg-emerald-500/[0.06] border border-emerald-500/10 text-center"
                                            >
                                                <span className="text-[9px] font-mono text-emerald-300/70">Prediction: <span className="text-emerald-300 font-bold">Approved</span> (87% confidence)</span>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* DS Trust Quote */}
                        <AnimatePresence>
                            {step >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-4 py-3 px-4 rounded-lg bg-emerald-500/[0.05] border border-emerald-500/15 text-center"
                                >
                                    <p className="text-sm md:text-base text-emerald-200/80 italic">
                                        &ldquo;The other designers just gave designs. You actually understood. That&apos;s why I trust you.&rdquo;
                                    </p>
                                    <p className="text-[10px] font-mono text-zinc-500 mt-1">&mdash; Marcus Horbach, Principal Data Scientist</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Arrow: Trust → Full Revamp */}
                        <AnimatePresence>
                            {step >= 3 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: 'spring', damping: 15 }}
                                    className="mt-4 py-2.5 px-4 rounded-lg bg-cyan-500/[0.08] border border-cyan-500/20 text-center"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-[9px] font-mono text-cyan-400/60 uppercase">Trust Earned</span>
                                        <ArrowRight className="w-3 h-3 text-cyan-400/60" />
                                        <span className="text-[9px] font-mono text-cyan-300 uppercase font-bold">Full ML UX Revamp</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 7: "CONFUSION MATRIX UX"
   ═════════════════════════════════════════════════ */
export function MLBeatConfusionMatrix() {
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
        <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12 flex flex-col items-center text-center">
                    <PresenterBar delay={0.1}>
                        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                            When I first saw the confusion matrix, I couldn&apos;t make sense of it. So I sat with the data scientist — a dozen sessions, paper and pen, sketching live inside my design software. I aligned the <span className="text-emerald-400 font-bold">threshold slider</span> exactly 90 degrees parallel to the chart point. As you drag it, the dot moves with it.
                        </p>
                    </PresenterBar>

                    {/* ── Before → After: Hidden interactivity vs clear interactive layout ── */}
                    <div className="w-full max-w-4xl">
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {/* BEFORE: Confusion matrix existed but no interaction affordance */}
                            <AnimatePresence>
                                {step >= 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 0.6, x: 0 }}
                                        transition={{ duration: 0.6, ease }}
                                        className="rounded-xl border border-rose-500/20 bg-rose-500/[0.03] overflow-hidden"
                                    >
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/[0.05] border-b border-rose-500/10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500/60" />
                                            <span className="text-[8px] font-mono text-rose-400/60 uppercase tracking-wider line-through">Before: Hidden Controls</span>
                                        </div>
                                        <div className="p-3">
                                            {/* Static-looking matrix with no interaction cues */}
                                            <div className="grid grid-cols-2 gap-1 mb-2">
                                                <div className="h-7 rounded bg-emerald-500/15 flex items-center justify-center">
                                                    <span className="text-[7px] font-mono text-emerald-400/40">TP</span>
                                                </div>
                                                <div className="h-7 rounded bg-rose-500/8 flex items-center justify-center">
                                                    <span className="text-[7px] font-mono text-rose-400/30">FP</span>
                                                </div>
                                                <div className="h-7 rounded bg-rose-500/8 flex items-center justify-center">
                                                    <span className="text-[7px] font-mono text-rose-400/30">FN</span>
                                                </div>
                                                <div className="h-7 rounded bg-emerald-500/15 flex items-center justify-center">
                                                    <span className="text-[7px] font-mono text-emerald-400/40">TN</span>
                                                </div>
                                            </div>
                                            {/* No slider, no affordance */}
                                            <div className="h-5 rounded bg-white/[0.02] border border-white/[0.03] flex items-center px-2">
                                                <span className="text-[5px] font-mono text-zinc-600">threshold: 0.50</span>
                                            </div>
                                            <div className="flex items-center gap-1 mt-1.5">
                                                <div className="w-3 h-3 rounded-sm border border-rose-500/15 bg-rose-500/5" />
                                                <span className="text-[5px] font-mono text-rose-400/30">← Where do I click?</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* AFTER: Clear interactive layout with slider + responsive graphs */}
                            <AnimatePresence>
                                {step >= 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        transition={{ duration: 0.8, ease }}
                                        className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.1)]"
                                    >
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/[0.05] border-b border-emerald-500/10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[8px] font-mono text-emerald-400/60 uppercase tracking-wider">After: Interactive Layout</span>
                                        </div>
                                        <div className="p-3 space-y-2">
                                            {/* Confusion matrix — cleaner */}
                                            <div className="grid grid-cols-2 gap-1">
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="h-8 rounded bg-emerald-500/25 border border-emerald-500/20 flex items-center justify-center">
                                                    <span className="text-[8px] font-mono font-bold text-emerald-300">94%</span>
                                                </motion.div>
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} className="h-8 rounded bg-rose-500/10 border border-rose-500/10 flex items-center justify-center">
                                                    <span className="text-[8px] font-mono text-rose-400/50">6%</span>
                                                </motion.div>
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.35, type: 'spring' }} className="h-8 rounded bg-rose-500/10 border border-rose-500/10 flex items-center justify-center">
                                                    <span className="text-[8px] font-mono text-rose-400/50">3%</span>
                                                </motion.div>
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: 'spring' }} className="h-8 rounded bg-emerald-500/25 border border-emerald-500/20 flex items-center justify-center">
                                                    <span className="text-[8px] font-mono font-bold text-emerald-300">97%</span>
                                                </motion.div>
                                            </div>
                                            {/* Threshold slider — prominent affordance */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="rounded-md bg-white/[0.03] border border-emerald-500/15 p-2"
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-[6px] font-mono text-emerald-400/60">Threshold</span>
                                                    <span className="text-[7px] font-mono font-bold text-emerald-300">0.65</span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-white/[0.06] relative">
                                                    <motion.div
                                                        className="absolute inset-y-0 left-0 rounded-full bg-emerald-500/50"
                                                        initial={{ width: '50%' }}
                                                        animate={{ width: ['50%', '65%', '45%', '65%'] }}
                                                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                                    />
                                                    <motion.div
                                                        className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-zinc-900 shadow-sm"
                                                        initial={{ left: '50%' }}
                                                        animate={{ left: ['50%', '65%', '45%', '65%'] }}
                                                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                                    />
                                                </div>
                                            </motion.div>
                                            {/* Responsive bar graphs */}
                                            <div className="flex gap-1.5">
                                                {['Precision', 'Recall', 'F1'].map((metric, i) => (
                                                    <div key={metric} className="flex-1">
                                                        <span className="text-[5px] font-mono text-zinc-600 block mb-0.5">{metric}</span>
                                                        <div className="h-6 bg-white/[0.02] rounded-sm overflow-hidden relative">
                                                            <motion.div
                                                                className="absolute bottom-0 left-0 right-0 bg-emerald-500/30 rounded-sm"
                                                                animate={{ height: [`${60 + i * 8}%`, `${75 + i * 5}%`, `${55 + i * 10}%`, `${75 + i * 5}%`] }}
                                                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Quote callout */}
                        <AnimatePresence>
                            {step >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-4 py-3 px-4 rounded-lg bg-emerald-500/[0.05] border border-emerald-500/15 text-center"
                                >
                                    <p className="text-sm md:text-base text-emerald-200/80 italic">
                                        &ldquo;The best screen in the entire UX revamp.&rdquo;
                                    </p>
                                    <p className="text-[10px] font-mono text-zinc-500 mt-1">— Principal Data Scientist, after 10+ iterations</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ═════════════════════════════════════════════════
   BEAT 8: "EXPLAINABILITY"
   Feature importance, SHAP values, model explanation
   ═════════════════════════════════════════════════ */
export function MLBeatExplainability() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1000)))
        t.push(setTimeout(() => setStep(2), at(2500)))
        t.push(setTimeout(() => setStep(3), at(4000)))
        return () => t.forEach(clearTimeout)
    }, [])

    const features = [
        { name: 'Revenue_QTR', importance: 0.34, color: 'bg-emerald-500' },
        { name: 'Debt_Ratio', importance: 0.22, color: 'bg-emerald-500/70' },
        { name: 'Cash_Flow', importance: 0.18, color: 'bg-emerald-500/50' },
        { name: 'Market_Cap', importance: 0.12, color: 'bg-cyan-500/50' },
        { name: 'Sector_Code', importance: 0.08, color: 'bg-cyan-500/30' },
        { name: 'Employee_Cnt', importance: 0.04, color: 'bg-white/[0.1]' },
        { name: 'Region', importance: 0.02, color: 'bg-white/[0.06]' },
    ]

    return (
        <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12 flex flex-col items-center text-center">
                    <PresenterBar delay={0.1}>
                        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                            The principal data scientist showed me a screenshot from a different software and said, <span className="text-cyan-400 font-medium italic">&ldquo;I want this for WebFOCUS.&rdquo;</span> I didn&apos;t just recreate it. I dug into why the popup was needed, how model predictions work, what <span className="text-emerald-400 font-bold">feature importances</span> actually mean.
                        </p>
                    </PresenterBar>

                    <div className="w-full max-w-3xl">
                        {/* Explainability popup wireframe */}
                        <AnimatePresence>
                            {step >= 1 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease }}
                                    className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 overflow-hidden shadow-2xl shadow-black/40"
                                >
                                    {/* Window chrome */}
                                    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.04]">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-red)]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-yellow)]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-green-alt)]" />
                                        <span className="ml-3 text-[10px] font-mono text-zinc-600">Model Explainability</span>
                                        <div className="ml-auto flex items-center gap-1.5">
                                            <Sparkles className="w-3 h-3 text-emerald-400/50" />
                                            <span className="text-[9px] font-mono text-emerald-400/40">Why this prediction?</span>
                                        </div>
                                    </div>

                                    <div className="p-5 space-y-5">
                                        {/* Feature importance header */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Feature Importance</span>
                                            <span className="text-[9px] font-mono text-zinc-600">7 features analyzed</span>
                                        </div>

                                        {/* Feature importance bars */}
                                        <div className="space-y-2">
                                            {features.map((feat, i) => (
                                                <motion.div
                                                    key={feat.name}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={step >= 2 ? { opacity: 1, x: 0 } : {}}
                                                    transition={{ delay: i * 0.08, duration: 0.4, ease }}
                                                    className="flex items-center gap-3"
                                                >
                                                    <span className="text-[10px] font-mono text-zinc-500 w-28 text-right shrink-0">{feat.name}</span>
                                                    <div className="flex-1 h-5 bg-white/[0.03] rounded-sm overflow-hidden relative">
                                                        <motion.div
                                                            className={`absolute inset-y-0 left-0 ${feat.color} rounded-sm`}
                                                            initial={{ width: 0 }}
                                                            animate={step >= 2 ? { width: `${feat.importance * 100}%` } : {}}
                                                            transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease }}
                                                        />
                                                    </div>
                                                    <motion.span
                                                        className="text-[10px] font-mono text-zinc-400 w-10 text-right"
                                                        initial={{ opacity: 0 }}
                                                        animate={step >= 2 ? { opacity: 1 } : {}}
                                                        transition={{ delay: 0.5 + i * 0.08 }}
                                                    >
                                                        {(feat.importance * 100).toFixed(0)}%
                                                    </motion.span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* SHAP-style contribution row */}
                                        <AnimatePresence>
                                            {step >= 3 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, ease }}
                                                    className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-4"
                                                >
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/80">Prediction Breakdown</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 h-6">
                                                        {/* SHAP-style waterfall */}
                                                        <div className="text-[8px] font-mono text-zinc-600 w-12">Base</div>
                                                        <motion.div
                                                            className="h-full bg-zinc-700/30 rounded-sm"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: '15%' }}
                                                            transition={{ delay: 0.2, duration: 0.4 }}
                                                        />
                                                        <motion.div
                                                            className="h-full bg-emerald-500/40 rounded-sm"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: '25%' }}
                                                            transition={{ delay: 0.4, duration: 0.4 }}
                                                        />
                                                        <motion.div
                                                            className="h-full bg-emerald-500/25 rounded-sm"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: '15%' }}
                                                            transition={{ delay: 0.5, duration: 0.4 }}
                                                        />
                                                        <motion.div
                                                            className="h-full bg-rose-500/20 rounded-sm"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: '8%' }}
                                                            transition={{ delay: 0.6, duration: 0.4 }}
                                                        />
                                                        <motion.div
                                                            className="h-full bg-emerald-500/15 rounded-sm"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: '10%' }}
                                                            transition={{ delay: 0.7, duration: 0.4 }}
                                                        />
                                                        <div className="text-[8px] font-mono text-emerald-400 w-16 text-right font-bold">→ 87.3%</div>
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <div className="flex items-center gap-1">
                                                            <div className="w-2 h-2 rounded-sm bg-emerald-500/40" />
                                                            <span className="text-[8px] font-mono text-zinc-600">Pushes up</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <div className="w-2 h-2 rounded-sm bg-rose-500/30" />
                                                            <span className="text-[8px] font-mono text-zinc-600">Pushes down</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ═════════════════════════════════════════════════
   BEAT 9: "VALIDATION"
   ═════════════════════════════════════════════════ */
export function MLBeatValidation() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1200)))
        t.push(setTimeout(() => setStep(2), at(2200)))
        t.push(setTimeout(() => setStep(3), at(3400)))
        t.push(setTimeout(() => setStep(4), at(5000)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12 flex flex-col items-center text-center">
                    <PresenterBar delay={0.1}>
                        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                            Four SMEs. Separate sessions. I told them one thing: &ldquo;It starts from the dataset.&rdquo; They right-clicked, saw Predict Data, clicked it — and <span className="text-emerald-400 font-bold">just blazed through it</span>. Because it was that obvious.
                        </p>
                    </PresenterBar>

                    <div className="w-full max-w-4xl">
                        {/* ── Zoom Testing Scene ── */}
                        <AnimatePresence>
                            {step >= 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease }}
                                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden mb-4"
                                >
                                    {/* Zoom toolbar */}
                                    <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-white/[0.06]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-[10px] font-mono text-red-400/70">REC</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-zinc-600">User Testing Session</span>
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 p-4">
                                        {/* Screen share: the wizard workflow */}
                                        <div className="flex-[3] rounded-lg bg-black/30 border border-white/[0.06] p-4">
                                            <div className="flex items-center gap-1.5 mb-3">
                                                <span className="text-[10px] font-mono text-zinc-500">Predict Data — Train Model</span>
                                            </div>
                                            {/* 4 wizard steps animating through */}
                                            <div className="flex gap-1.5 mb-3">
                                                {['Type', 'Target', 'Predict', 'Params'].map((s, i) => (
                                                    <motion.div
                                                        key={s}
                                                        className="flex-1 h-8 rounded flex items-center justify-center border"
                                                        animate={{
                                                            background: step >= 2 && i <= Math.min(step - 1, 3)
                                                                ? 'rgba(16,185,129,0.15)'
                                                                : 'rgba(255,255,255,0.02)',
                                                            borderColor: step >= 2 && i <= Math.min(step - 1, 3)
                                                                ? 'rgba(16,185,129,0.3)'
                                                                : 'rgba(255,255,255,0.06)',
                                                        }}
                                                        transition={{ duration: 0.4 }}
                                                    >
                                                        <span className="text-[10px] font-mono text-zinc-500">{s}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            {/* Wireframe content area */}
                                            <div className="space-y-1.5">
                                                <div className="h-2 w-3/4 rounded-full bg-white/[0.04]" />
                                                <div className="h-2 w-1/2 rounded-full bg-white/[0.03]" />
                                                <div className="flex gap-1.5 mt-2">
                                                    <div className="h-5 flex-1 rounded bg-white/[0.03]" />
                                                    <div className="h-5 flex-1 rounded bg-white/[0.03]" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Participant + Observer */}
                                        <div className="flex-1 flex flex-col gap-2">
                                            {/* Participant video */}
                                            <div className="flex-1 rounded-lg bg-zinc-800/50 border border-white/[0.06] flex flex-col items-center justify-center p-3 gap-1.5">
                                                <div className="w-10 h-10 rounded-full bg-zinc-700 border border-zinc-600" />
                                                <span className="text-[9px] font-mono text-zinc-500">SME</span>
                                            </div>
                                            {/* Observer (you) */}
                                            <div className="h-10 rounded-lg bg-cyan-500/[0.05] border border-cyan-500/10 flex items-center justify-center gap-1.5">
                                                <div className="w-6 h-6 rounded-full bg-cyan-900/50 border border-cyan-500/20" />
                                                <span className="text-[9px] font-mono text-cyan-400/50">Observing</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ── 5 Test Sessions Results ── */}
                        <AnimatePresence>
                            {step >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="grid grid-cols-4 gap-2.5 mb-5"
                                >
                                    {[1, 2, 3, 4].map((n, i) => (
                                        <motion.div
                                            key={n}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.25, duration: 0.4 }}
                                            className="rounded-lg border border-emerald-500/15 bg-emerald-500/[0.03] p-3 text-center"
                                        >
                                            <div className="text-[10px] font-mono text-zinc-500 mb-1.5">SME {n}</div>
                                            {/* Mini progress bar */}
                                            <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden mb-2">
                                                <motion.div
                                                    className="h-full rounded-full bg-emerald-500/60"
                                                    initial={{ width: '0%' }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ delay: i * 0.25 + 0.2, duration: 0.6, ease: 'easeOut' }}
                                                />
                                            </div>
                                            {/* Checkmark */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: i * 0.25 + 0.6, type: 'spring', damping: 12 }}
                                            >
                                                <svg className="w-6 h-6 mx-auto text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ── Big 5/5 Counter ── */}
                        <AnimatePresence>
                            {step >= 4 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: 'spring', damping: 15 }}
                                    className="py-5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 flex items-center justify-center gap-4"
                                >
                                    <span className="text-4xl font-mono font-bold text-emerald-400">4/4</span>
                                    <span className="text-sm font-mono text-emerald-400/60">blazed through without help</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
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
        signal: 'ZERO ADOPTION',
        presenter: true,
        narration: 'It was really shitty. Click the plus menu, open a data flow, drag a dataset, drag a model pill. Hit a hidden play button. Right-click for cascading context menus. ~15 clicks minimum. Nobody used it.',
        narrationDelay: 0.1,
        component: <MLBeatProblem />,
    },
    {
        id: 'ml-origin',
        duration: d(9000),
        label: 'The Side Project',
        signal: 'TRUST EARNED',
        presenter: true,
        narration: 'The principal data scientist showed me a screenshot from a different software and said, "I want this for WebFOCUS." I didn\'t just recreate it. I dug into why the popup was needed, how model predictions work, what feature importances mean. That\'s what got me the entire ML Functions redesign.',
        narrationDelay: 0.1,
        component: <MLBeatOrigin />,
    },
    {
        id: 'ml-goal',
        duration: d(8000),
        label: 'The Full Revamp',
        signal: 'FULL OWNERSHIP',
        presenter: true,
        narration: 'It was also something I had proposed — because after I found out about the explainability popup, I realized the entire machine learning workflow was not great. I earned the trust to own the whole thing.',
        narrationDelay: 0.1,
        component: <MLBeatGoal />,
    },
    {
        id: 'ml-discovery',
        duration: d(8000),
        label: 'MIT Certified',
        signal: 'DOMAIN MASTERY',
        presenter: true,
        narration: 'I paid for the MIT course myself because the work had outgrown surface-level understanding. I thought it would help me converse with the data scientist better. I was terrified of making something look nice while technically meaning the wrong thing.',
        narrationDelay: 0.1,
        component: <MLBeatDiscovery />,
    },
    {
        id: 'ml-entry-point',
        duration: d(9000),
        label: 'Why No Landing Page?',
        signal: 'RIGHT-CLICK ENTRY',
        presenter: true,
        narration: 'No Predict Data landing page existed. My first instinct was — why can\'t users select data themselves? In WebFOCUS, right-click is like religion. So putting "Predict Data" in the right-click menu was capitalizing on the most common user behavior in the product.',
        narrationDelay: 0.1,
        component: <MLBeatEntryPoint />,
    },
    {
        id: 'ml-breakthrough',
        duration: d(8000),
        label: 'One Path, Dual Purpose',
        signal: 'DUAL PURPOSE',
        presenter: true,
        narration: 'We did not have two experiences. We had one path that serves a dual purpose. Not easy enough that data scientists would say "this is spoon feeding," but clear enough that someone like me could use it. The sophistication was there; it just waited for you to ask for it.',
        narrationDelay: 0.1,
        component: <MLBeatPivot />,
    },
    {
        id: 'ml-popup',
        duration: d(8000),
        label: 'The Popup Won',
        signal: 'WIZARD FLOW',
        presenter: true,
        narration: 'I tried full-screen views, side-step layouts, two-column layouts. The popup wizard won because WebFOCUS loved modals — all engineers lived in popups. It gave me breathing room for helper text and definitions. Each step existed cleanly without the whole screen jumping.',
        narrationDelay: 0.1,
        component: <MLBeatBreakthrough />,
    },
    {
        id: 'ml-confusion-matrix',
        duration: d(9000),
        label: 'The Most Complex Screen',
        signal: 'BEST SCREEN',
        presenter: true,
        narration: 'When I first saw the confusion matrix, I couldn\'t make sense of it. So I sat with the data scientist — a dozen sessions, paper and pen. I aligned the threshold slider exactly 90 degrees parallel to the chart point. As you drag it, the dot moves with it. He called it "the best screen in the entire UX revamp."',
        narrationDelay: 0.1,
        component: <MLBeatConfusionMatrix />,
    },
    {
        id: 'ml-explainability',
        duration: d(9000),
        label: 'Understanding Feature Importances',
        signal: 'DEEP LEARNING',
        presenter: true,
        narration: 'I dug into how model predictions work, what feature importances actually mean, how SHAP values break down a prediction. I could explain it to somebody else — that\'s when I knew I understood it. That depth is what made the explainability popup real, not decorative.',
        narrationDelay: 0.1,
        component: <MLBeatExplainability />,
    },
    {
        id: 'ml-validation',
        duration: d(8600),
        label: 'They Just Blazed Through It',
        signal: '4/4 VALIDATED',
        presenter: true,
        narration: 'Four SMEs. Separate sessions. I told them one thing: "It starts from the dataset." They right-clicked, saw "Predict Data," clicked it — and just blazed through the whole workflow. Because it was that obvious.',
        narrationDelay: 0.1,
        component: <MLBeatValidation />,
    },
]
