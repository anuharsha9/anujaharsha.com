'use client'

/**
 * DSMLMovieBeats — Animated motion-graphic beats for the DSML/IQ Hub case study.
 * 
 * Story arc: Invisible AI features → Strategic spark → Unified Hub
 * Updated to match the same structural pattern as RC and ML beats:
 * Container card → PresenterBar (avatar + speech bubble) → Animation content
 */

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Search, Eye, EyeOff, Layers3, Sparkles, Users, Target, Zap } from 'lucide-react'
import { withHexAlpha } from '@/lib/color-utils'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const BEAT_PACE = 1.22
const at = (ms: number) => Math.round(ms * BEAT_PACE)

/* ─────────────────────────────────────────────────
   SHARED: Motion graphics number counter
   ───────────────────────────────────────────────── */
function AnimNumber({ value, suffix = '', delay = 0 }: { value: number; suffix?: string; delay?: number }) {
    const [display, setDisplay] = useState(0)
    const raf = useRef<number>(0)

    useEffect(() => {
        const start = performance.now()
        const duration = 900
        const tick = () => {
            const elapsed = performance.now() - start - delay * 1000
            if (elapsed < 0) { raf.current = requestAnimationFrame(tick); return }
            const progress = Math.min(elapsed / duration, 1)
            setDisplay(Math.round(progress * value))
            if (progress < 1) raf.current = requestAnimationFrame(tick)
        }
        raf.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf.current)
    }, [value, delay])

    return <>{display}{suffix}</>
}


/* ═════════════════════════════════════════════════
   BEAT 1: "THE INVISIBLE FEATURE PROBLEM"
   Three powerful features nobody could find
   ═════════════════════════════════════════════════ */
export function DSMLBeatProblem() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(800)))
        t.push(setTimeout(() => setStep(2), at(2000)))
        t.push(setTimeout(() => setStep(3), at(3400)))
        return () => t.forEach(clearTimeout)
    }, [])

    const features = [
        { name: 'NLQ', label: 'Ask questions in plain English', menu: 'Hub → + Menu → Explore Data', color: 'var(--accent-violet)' },
        { name: 'Insights', label: 'Auto-generated visualizations', menu: 'Hub → + Menu → Explore Data', color: 'var(--accent-teal)' },
        { name: 'ML', label: 'Predictive model training', menu: 'Hub → App Dirs → Right-click', color: 'var(--accent-amber)' },
    ]

    return (
        <div className="relative w-full max-w-4xl mx-auto">
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
                                Three powerful AI features — <span className="text-zinc-200 font-medium">NLQ, Insights, ML</span> — sat buried in different menus. Significant engineering investment, <span className="text-rose-400 font-bold">near-zero adoption</span>. Nobody knew they existed.
                            </p>
                        </PresenterBar>
                    </motion.div>

                    {/* Three buried feature cards */}
                    <AnimatePresence>
                        {step >= 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease }}
                                className="flex flex-wrap items-stretch justify-center gap-3 md:gap-4 mt-6"
                            >
                                {features.map((feat, i) => (
                                    <motion.div
                                        key={feat.name}
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: i * 0.12, duration: 0.5, ease }}
                                        className="w-36 md:w-44 rounded-xl border p-3 text-left"
                                        style={{
                                            borderColor: withHexAlpha(feat.color, '30'),
                                            background: withHexAlpha(feat.color, '08'),
                                        }}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <EyeOff className="h-3.5 w-3.5 text-rose-400/70" />
                                            <span className="font-mono text-sm font-bold" style={{ color: feat.color }}>{feat.name}</span>
                                        </div>
                                        <p className="text-[11px] text-zinc-200 leading-snug mb-2">{feat.label}</p>
                                        <div className="text-[10px] font-mono text-rose-400/60 truncate">{feat.menu}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stats */}
                    <AnimatePresence>
                        {step >= 2 && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease }}
                                className="flex justify-center gap-8 mt-8"
                            >
                                {[
                                    { val: 'Low', label: 'Adoption' },
                                    { val: '3', label: 'Scattered Menus' },
                                    { val: '0', label: 'Discoverability' },
                                ].map((stat, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-rose-400 font-mono">{stat.val}</div>
                                        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 2: "THE STRATEGIC SPARK"
   How the Hub idea was born
   ═════════════════════════════════════════════════ */
export function DSMLBeatSpark() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1000)))
        t.push(setTimeout(() => setStep(2), at(2200)))
        t.push(setTimeout(() => setStep(3), at(3600)))
        t.push(setTimeout(() => setStep(4), at(5000)))
        return () => t.forEach(clearTimeout)
    }, [])

    const timeline = [
        { label: 'Team vision takes shape', icon: <Users className="h-4 w-4" />, color: 'var(--accent-teal)' },
        { label: 'I designed how it fits the Hub', icon: <Sparkles className="h-4 w-4" />, color: 'var(--accent-violet)' },
        { label: 'Dozens of concept mockups', icon: <Layers3 className="h-4 w-4" />, color: 'var(--accent-amber)' },
        { label: 'PM pitches. VP approves.', icon: <Target className="h-4 w-4" />, color: 'var(--semantic-emerald)' },
    ]

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease }}
                    >
                        <PresenterBar>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                The Hub concept was a <span className="text-zinc-200 font-medium">team effort</span> — my PM, Director of Design, and Head PM. I designed <span className="text-teal-400 font-bold">how it would fit into the existing Hub</span> — the architecture, the interactions, the visual design. PM pitched. VP approved.
                            </p>
                        </PresenterBar>
                    </motion.div>

                    {/* Timeline progression */}
                    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto mt-6">
                        {timeline.map((item, i) => (
                            <AnimatePresence key={item.label}>
                                {step >= i + 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        transition={{ duration: 0.5, ease }}
                                        className="w-full flex items-center gap-3 rounded-lg border px-4 py-3"
                                        style={{
                                            borderColor: withHexAlpha(item.color, '30'),
                                            background: withHexAlpha(item.color, '06'),
                                        }}
                                    >
                                        <span style={{ color: item.color }}>{item.icon}</span>
                                        <span className="text-sm text-zinc-200 text-left">{item.label}</span>
                                        {i === timeline.length - 1 && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                                                className="ml-auto text-emerald-400 text-xs font-mono font-bold"
                                            >
                                                ✓ GO
                                            </motion.span>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 3: "MODERNIZING THE BUILDING BLOCKS"
   Upgrading the Building Blocks
   ═════════════════════════════════════════════════ */
export function DSMLBeatModernize() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1200)))
        t.push(setTimeout(() => setStep(2), at(3000)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease }}
                    >
                        <PresenterBar>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                Before building the Hub, I modernized each feature. NLQ upgraded from simple SQL queries to <span className="text-emerald-400 font-bold">Microsoft&apos;s Phi-3 SLM</span> — question suggestions, chart switching, ambiguity correction.
                            </p>
                        </PresenterBar>
                    </motion.div>

                    {/* Before → After transition */}
                    <AnimatePresence mode="wait">
                        {step < 2 ? (
                            <motion.div
                                key="before"
                                initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -14, scale: 0.96, filter: 'blur(8px)' }}
                                transition={{ duration: 0.62, ease }}
                                className="w-full max-w-lg mx-auto text-center mt-6"
                            >
                                <p className="mb-4 font-mono text-xs tracking-[0.3em] text-rose-300/90 uppercase">Before — Simple SQL Queries</p>
                                <div className="mx-auto max-w-sm rounded-xl border border-rose-400/20 bg-rose-400/[0.04] p-4">
                                    <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 mb-3">
                                        <Search className="h-3.5 w-3.5 text-rose-300/40" />
                                        <span className="font-mono text-[10px] text-zinc-500">Enter a question...</span>
                                    </div>
                                    <motion.div
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="text-xs text-zinc-400 text-left space-y-2"
                                    >
                                        <div className="rounded bg-white/[0.03] px-3 py-2 font-mono text-[11px] text-zinc-500">show me sales data</div>
                                        <div className="text-rose-400/60 text-[10px] px-1">No suggestions. No chart options. No ambiguity handling.</div>
                                    </motion.div>
                                </div>
                                <p className="mt-4 font-mono text-xs text-zinc-400">Basic SQL queries. No intelligence. Limited results.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="after"
                                initial={{ opacity: 0, y: 14, scale: 0.94, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 0.75, ease }}
                                className="w-full max-w-lg mx-auto text-center mt-6"
                            >
                                <p className="mb-4 font-mono text-xs tracking-[0.3em] text-emerald-400/90 uppercase">After — Phi-3 SLM Powered</p>
                                <div className="mx-auto max-w-sm rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] p-4">
                                    <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 mb-3">
                                        <Search className="h-3.5 w-3.5 text-emerald-300/60" />
                                        <span className="font-mono text-[10px] text-zinc-200">Ask anything about your data...</span>
                                    </div>
                                    <div className="space-y-2">
                                        {['What were last month\'s top products?', 'Show revenue by region', 'Compare Q1 vs Q2 sales'].map((q, i) => (
                                            <motion.div
                                                key={q}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + i * 0.12, duration: 0.4, ease }}
                                                className="flex items-center gap-2 rounded-lg bg-emerald-300/[0.06] px-3 py-2 text-left"
                                            >
                                                <Sparkles className="h-3 w-3 text-emerald-300/50 flex-shrink-0" />
                                                <span className="text-[11px] text-zinc-200">{q}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                <p className="mt-4 font-mono text-xs text-emerald-300/70">Suggested queries. Conversational errors. Clear results.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 4: "ARCHITECTURE BEFORE TICKETS"
   Hub integration strategy
   ═════════════════════════════════════════════════ */
export function DSMLBeatArchitecture() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1000)))
        t.push(setTimeout(() => setStep(2), at(2400)))
        t.push(setTimeout(() => setStep(3), at(3800)))
        return () => t.forEach(clearTimeout)
    }, [])

    const features = [
        { name: 'NLQ', color: 'var(--accent-violet)', x: 10, y: 25 },
        { name: 'Insights', color: 'var(--accent-teal)', x: 75, y: 20 },
        { name: 'ML', color: 'var(--accent-amber)', x: 42, y: 70 },
    ]

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease }}
                    >
                        <PresenterBar>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                I defined the architecture <span className="text-zinc-200 font-medium">before any tickets existed</span>. PM wrote tickets after seeing my mockups. Three scattered tools became <span className="text-teal-400 font-bold">one unified DSML Hub</span> — no new infrastructure.
                            </p>
                        </PresenterBar>
                    </motion.div>

                    {/* Scattered → Unified animation */}
                    <AnimatePresence mode="wait">
                        {step < 2 ? (
                            <motion.div
                                key="scattered"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                                transition={{ duration: 0.5, ease }}
                                className="relative w-full max-w-md mx-auto h-44 mt-6"
                            >
                                <p className="absolute -top-1 left-0 right-0 font-mono text-xs text-rose-300/70 uppercase tracking-wider text-center">3 scattered tools</p>
                                {features.map((f, i) => (
                                    <motion.div
                                        key={f.name}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={step >= 1 ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: i * 0.15, duration: 0.5, type: 'spring', stiffness: 200 }}
                                        className="absolute px-4 py-2.5 rounded-xl border font-mono text-sm font-bold"
                                        style={{
                                            left: `${f.x}%`,
                                            top: `${f.y}%`,
                                            color: f.color,
                                            borderColor: withHexAlpha(f.color, '35'),
                                            background: withHexAlpha(f.color, '10'),
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    >
                                        {f.name}
                                    </motion.div>
                                ))}

                                <AnimatePresence>
                                    {step >= 1 && (
                                        <motion.svg
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.15 }}
                                            className="absolute inset-0 w-full h-full"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                        >
                                            {[[10, 25, 75, 20], [75, 20, 42, 70], [10, 25, 42, 70]].map(([x1, y1, x2, y2], idx) => (
                                                <motion.line
                                                    key={idx}
                                                    x1={x1} y1={y1} x2={x2} y2={y2}
                                                    stroke="var(--semantic-rose)"
                                                    strokeWidth="0.3"
                                                    strokeDasharray="2,2"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                                />
                                            ))}
                                        </motion.svg>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="unified"
                                initial={{ opacity: 0, scale: 0.86, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 0.75, ease }}
                                className="w-full max-w-md mx-auto text-center mt-6"
                            >
                                <p className="mb-4 font-mono text-xs text-emerald-400/90 uppercase tracking-wider">1 unified Hub</p>
                                <motion.div
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                    className="mx-auto rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-5 max-w-sm"
                                >
                                    <div className="text-lg font-bold text-emerald-300 mb-3 font-mono">DSML Hub</div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {features.map((f, i) => (
                                            <motion.div
                                                key={f.name}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 + i * 0.1, duration: 0.4, ease }}
                                                className="rounded-lg border p-3 text-center"
                                                style={{
                                                    borderColor: withHexAlpha(f.color, '30'),
                                                    background: withHexAlpha(f.color, '08'),
                                                }}
                                            >
                                                <div className="font-mono text-xs font-bold mb-1" style={{ color: f.color }}>{f.name}</div>
                                                <motion.div
                                                    className="h-1.5 rounded-full mx-auto w-8"
                                                    style={{ background: withHexAlpha(f.color, '40') }}
                                                    animate={{ scaleX: [0.4, 1, 0.7] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror' }}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {step >= 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease }}
                                        className="flex justify-center gap-8 mt-6"
                                    >
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-emerald-300 font-mono">0</div>
                                            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">New infra</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-emerald-300 font-mono">1</div>
                                            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Learning curve</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-emerald-300 font-mono">100%</div>
                                            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Responsive</div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 5: "FOUR ITERATIONS"
   V1 → V2 → V3 → V4 (Landed)
   ═════════════════════════════════════════════════ */
export function DSMLBeatIterations() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(300)))
        t.push(setTimeout(() => setStep(1), at(1200)))
        t.push(setTimeout(() => setStep(2), at(2200)))
        t.push(setTimeout(() => setStep(3), at(3200)))
        t.push(setTimeout(() => setStep(4), at(4200)))
        return () => t.forEach(clearTimeout)
    }, [])

    const iterations = [
        { version: 'V1', verdict: 'TOO DENSE', desc: 'Tabbed dashboard', color: 'var(--semantic-rose)' },
        { version: 'V2', verdict: 'TOO PASSIVE', desc: 'Educational layout', color: 'var(--accent-amber)' },
        { version: 'V3', verdict: 'COMPETING', desc: 'Sidebar navigation', color: 'var(--accent-amber)' },
        { version: 'V4', verdict: 'LANDED', desc: 'Icon tiles', color: 'var(--semantic-emerald)' },
    ]

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease }}
                    >
                        <PresenterBar>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                Four distinct iterations. V1 too dense. V2 too passive. V3 competed with Hub navigation. <span className="text-emerald-400 font-bold">V4 — clean icon tiles — landed.</span>
                            </p>
                        </PresenterBar>
                    </motion.div>

                    {/* Iteration cards */}
                    <div className="flex items-center justify-center gap-2 md:gap-4 mt-6">
                        {iterations.map((iter, i) => (
                            <motion.div
                                key={iter.version}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={step >= i + 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{ duration: 0.6, ease }}
                                className="relative"
                            >
                                <div
                                    className="w-20 md:w-28 h-28 md:h-36 rounded-xl border flex flex-col items-center justify-center text-center p-2"
                                    style={{
                                        borderColor: withHexAlpha(iter.color, '30'),
                                        background: withHexAlpha(iter.color, '08'),
                                    }}
                                >
                                    <span className="text-xl md:text-2xl font-bold font-mono" style={{ color: iter.color }}>
                                        {iter.version}
                                    </span>
                                    <span
                                        className="text-[9px] md:text-[10px] font-mono tracking-wider mt-1 uppercase font-bold"
                                        style={{ color: iter.color }}
                                    >
                                        {iter.verdict}
                                    </span>
                                    <span className="text-[10px] text-zinc-400 mt-1">{iter.desc}</span>
                                </div>

                                {i < iterations.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={step >= i + 2 ? { opacity: 0.3 } : {}}
                                        className="absolute -right-1.5 md:-right-2.5 top-1/2 -translate-y-1/2"
                                    >
                                        <ArrowRight className="w-2.5 h-2.5 text-zinc-200" />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 6: "THE NAVIGATION FIGHT"
   List views vs. Icon tiles — I won
   ═════════════════════════════════════════════════ */
export function DSMLBeatNavFight() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1000)))
        t.push(setTimeout(() => setStep(2), at(2600)))
        t.push(setTimeout(() => setStep(3), at(4200)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease }}
                    >
                        <PresenterBar>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                The biggest fight: <span className="text-zinc-200 font-medium">icon tiles vs. list views</span>. The veteran architects wanted traditional lists. My argument: list views caused the low adoption. <span className="text-emerald-400 font-bold">Large tiles gave immediate context. I won.</span>
                            </p>
                        </PresenterBar>
                    </motion.div>

                    {/* List → Tiles transition */}
                    <AnimatePresence mode="wait">
                        {step < 2 ? (
                            <motion.div
                                key="list-view"
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
                                transition={{ duration: 0.5, ease }}
                                className="w-full max-w-xs mx-auto text-center mt-6"
                            >
                                <p className="mb-3 font-mono text-[10px] text-rose-300/70 uppercase tracking-wider">Architects Wanted</p>
                                <div className="rounded-xl border border-rose-400/20 bg-rose-400/[0.04] p-3 space-y-2">
                                    {['NLQ', 'Insights', 'Predict Data'].map((item, i) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={step >= 1 ? { opacity: 1, x: 0 } : {}}
                                            transition={{ delay: i * 0.1, duration: 0.3 }}
                                            className="flex items-center gap-2 rounded bg-rose-300/[0.06] px-3 py-2 text-left"
                                        >
                                            <div className="h-1.5 w-1.5 rounded-full bg-rose-300/40" />
                                            <span className="text-xs text-zinc-200 font-mono">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <p className="mt-3 text-[10px] text-rose-400/60 font-mono">List items caused low adoption.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="tiles-view"
                                initial={{ opacity: 0, y: 14, scale: 0.94, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 0.75, ease }}
                                className="w-full max-w-sm mx-auto text-center mt-6"
                            >
                                <p className="mb-3 font-mono text-[10px] text-emerald-400/90 uppercase tracking-wider">What I Designed — &amp; Won</p>
                                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] p-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { name: 'Ask', icon: <Search className="h-6 w-6" />, color: 'var(--accent-violet)' },
                                            { name: 'Analyze', icon: <Eye className="h-6 w-6" />, color: 'var(--accent-teal)' },
                                            { name: 'Predict', icon: <Zap className="h-6 w-6" />, color: 'var(--accent-amber)' },
                                        ].map((tile, i) => (
                                            <motion.div
                                                key={tile.name}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.15 + i * 0.1, duration: 0.4, ease }}
                                                className="rounded-xl border p-4 flex flex-col items-center gap-2"
                                                style={{
                                                    borderColor: withHexAlpha(tile.color, '30'),
                                                    background: withHexAlpha(tile.color, '08'),
                                                }}
                                            >
                                                <span style={{ color: tile.color }}>{tile.icon}</span>
                                                <span className="font-mono text-xs font-bold text-zinc-200">{tile.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {step >= 3 && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease }}
                                        className="mt-4 text-xs text-emerald-300/70 font-mono"
                                    >
                                        Outcome-based labels. Immediate context. Zero learning curve.
                                    </motion.p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 7: "THE ROOM FULL OF VETERANS"
   ═════════════════════════════════════════════════ */
export function DSMLBeatVeterans() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(1000)))
        t.push(setTimeout(() => setStep(2), at(2600)))
        t.push(setTimeout(() => setStep(3), at(4000)))
        return () => t.forEach(clearTimeout)
    }, [])

    const people = [
        { role: 'Dir. of Engineering', veteran: true },
        { role: 'Principal Data Scientist', veteran: true },
        { role: 'Lead Architect (IQ)', veteran: true },
        { role: 'Lead Architect (WF)', veteran: true },
        { role: 'Dir. of QA', veteran: true },
        { role: 'My PM', veteran: false, note: 'Onboarded together' },
    ]

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease }}
                    >
                        <PresenterBar>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                Every meeting — a room full of <span className="text-amber-300 font-medium">20 to 30+ year WebFOCUS veterans</span>. The only other new person was my PM. We onboarded together. <span className="text-teal-400 font-bold">Two years in. I was driving the conversation.</span>
                            </p>
                        </PresenterBar>
                    </motion.div>

                    {/* People grid */}
                    <AnimatePresence>
                        {step >= 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease }}
                                className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto mt-6"
                            >
                                {people.map((p, i) => (
                                    <motion.div
                                        key={p.role}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1, duration: 0.4, ease }}
                                        className={`rounded-lg border px-3 py-2 text-center ${p.veteran ? 'border-amber-300/20 bg-amber-300/[0.06]' : 'border-teal-300/20 bg-teal-300/[0.06]'}`}
                                    >
                                        <div className="text-[10px] text-zinc-200 font-mono">{p.role}</div>
                                        <div className={`text-xs font-bold font-mono ${p.veteran ? 'text-amber-300' : 'text-teal-300'}`}>
                                            {p.veteran ? '20-30+ yrs' : p.note}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* "Me" card */}
                    <AnimatePresence>
                        {step >= 2 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 0.7, ease }}
                                className="mt-6 flex justify-center"
                            >
                                <div className="rounded-xl border border-teal-300/20 bg-teal-300/[0.06] px-6 py-3">
                                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">Me</div>
                                    <div className="text-lg font-bold text-teal-300 font-mono">2 years in</div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Outcome text */}
                    <AnimatePresence>
                        {step >= 3 && (
                            <motion.p
                                initial={{ opacity: 0, filter: 'blur(6px)' }}
                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 0.7, ease }}
                                className="text-sm text-zinc-200 mt-6 font-mono max-w-sm mx-auto text-center"
                            >
                                I wasn&apos;t just the designer in the room.<br />
                                <span className="text-teal-200/90">I was driving the conversation.</span>
                            </motion.p>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 8: "VISIBILITY WAS THE SOLUTION"
   Impact metrics
   ═════════════════════════════════════════════════ */
export function DSMLBeatImpact() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), at(200)))
        t.push(setTimeout(() => setStep(1), at(800)))
        t.push(setTimeout(() => setStep(2), at(2000)))
        t.push(setTimeout(() => setStep(3), at(3400)))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease }}
                    >
                        <PresenterBar>
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                NLQ redesign + Phi-3 model upgrade drove <span className="text-emerald-400 font-bold">+25% adoption</span>. Customers looked forward to NLQ the most. <span className="text-zinc-200 font-medium">The Hub brings all of it front and center.</span>
                            </p>
                        </PresenterBar>
                    </motion.div>

                    {/* Big stat */}
                    <AnimatePresence>
                        {step >= 1 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease }}
                                className="text-center mt-6 mb-6"
                            >
                                <div className="text-5xl md:text-7xl font-bold text-emerald-300 font-mono">
                                    +<AnimNumber value={25} />%
                                </div>
                                <div className="text-sm font-mono text-zinc-200 uppercase tracking-wider mt-2">
                                    NLQ Adoption
                                </div>
                                <div className="text-xs text-zinc-400 mt-1">
                                    From discoverability alone — no feature changes.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Secondary stats */}
                    <AnimatePresence>
                        {step >= 2 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease }}
                                className="flex justify-center gap-6 md:gap-10"
                            >
                                {[
                                    { val: '3 → 1', label: 'Hub Unified' },
                                    { val: '100%', label: 'Responsive' },
                                    { val: '2027', label: 'Hub Ships' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.4, ease }}
                                        className="text-center"
                                    >
                                        <div className="text-lg md:text-xl font-bold text-white font-mono">{stat.val}</div>
                                        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Closing line */}
                    <AnimatePresence>
                        {step >= 3 && (
                            <motion.p
                                initial={{ opacity: 0, filter: 'blur(6px)' }}
                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 0.7, ease }}
                                className="text-sm text-zinc-200 mt-6 max-w-md leading-relaxed text-center mx-auto"
                            >
                                The features didn&apos;t change. The visibility did. That was enough.
                            </motion.p>
                        )}
                    </AnimatePresence>

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

export const DSML_MOVIE_BEATS: MovieBeat[] = [
    {
        id: 'dsml-problem',
        duration: d(9000),
        label: 'The Invisible Feature Problem',
        signal: 'LOW ADOPTION',
        presenter: true,
        narration: 'Three powerful AI features — NLQ, Insights, ML — sat buried in different menus. Significant engineering investment, near-zero adoption. Nobody knew they existed.',
        narrationDelay: 0.1,
        component: <DSMLBeatProblem />,
    },
    {
        id: 'dsml-spark',
        duration: d(8500),
        label: 'The Strategic Spark',
        signal: 'VP APPROVED',
        presenter: true,
        narration: 'The Hub concept was a team effort — my PM, Director of Design, and Head PM shaped the vision together. I designed how it would fit into the existing Hub. PM pitched. VP approved.',
        narrationDelay: 0.1,
        component: <DSMLBeatSpark />,
    },
    {
        id: 'dsml-modernize',
        duration: d(8000),
        label: 'Terminal → Apple UI',
        signal: 'MODERNIZED',
        presenter: true,
        narration: 'Before building the Hub, I modernized the building blocks I already owned. NLQ, Insights, ML — same PM, same engineers. IQ would be the culmination of all this work.',
        narrationDelay: 0.1,
        component: <DSMLBeatModernize />,
    },
    {
        id: 'dsml-architecture',
        duration: d(9000),
        label: 'Architecture Before Tickets',
        signal: '3 → 1 HUB',
        presenter: true,
        narration: 'I pushed for things never done in the org. Defined the architecture before any tickets existed. PM wrote tickets after seeing my mockups. Three scattered tools became one unified DSML Hub.',
        narrationDelay: 0.1,
        component: <DSMLBeatArchitecture />,
    },
    {
        id: 'dsml-iterations',
        duration: d(8500),
        label: 'Four Iterations',
        signal: 'V4 LANDED',
        presenter: true,
        narration: 'Four distinct iterations. V1 too dense. V2 too passive. V3 competed with Hub navigation. V4 — clean icon tiles — landed.',
        narrationDelay: 0.1,
        component: <DSMLBeatIterations />,
    },
    {
        id: 'dsml-nav-fight',
        duration: d(9000),
        label: 'The Navigation Fight',
        signal: 'I WON',
        presenter: true,
        narration: 'The biggest fight: icon tiles vs. list views. The veteran architects wanted traditional lists. My argument: list views caused the low adoption. Large tiles gave immediate context. I won.',
        narrationDelay: 0.1,
        component: <DSMLBeatNavFight />,
    },
    {
        id: 'dsml-veterans',
        duration: d(8500),
        label: 'The Room Full of Veterans',
        signal: '2 YEARS IN',
        presenter: true,
        narration: 'Every meeting — a room full of 20 to 30+ year WebFOCUS veterans. The only other new person was my PM. We onboarded together. Two years in. I was driving the conversation.',
        narrationDelay: 0.1,
        component: <DSMLBeatVeterans />,
    },
    {
        id: 'dsml-impact',
        duration: d(9000),
        label: 'Visibility Was the Solution',
        signal: '+25% ADOPTION',
        presenter: true,
        narration: 'NLQ redesign plus Phi-3 model upgrade drove +25% adoption. Customers looked forward to NLQ the most. The Hub brings all of it front and center.',
        narrationDelay: 0.1,
        component: <DSMLBeatImpact />,
    },
]
