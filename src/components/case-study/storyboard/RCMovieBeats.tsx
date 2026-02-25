'use client'

/**
 * RCMovieBeats — Condensed motion-graphic beats for the RC auto-play movie.
 * 
 * These are NOT the full presentation beats. They're 8-15 second "title cards"
 * designed for the landing page movie — wireframe motion graphics style.
 * Think: Apple keynote transitions meets motion design reel.
 */

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight, Clock, Search, Layers3, Users, FolderKanban, FileText, BarChart3, Sparkles } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─────────────────────────────────────────────────
   SHARED: Motion graphics number counter
   ───────────────────────────────────────────────── */
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
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
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
                    stroke="rgba(80,230,245,0.26)"
                    strokeWidth="0.28"
                    strokeDasharray="2 2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.7, 0.25] }}
                    transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.path
                    d="M0,74 C20,67 34,82 52,72 C67,64 82,79 100,70"
                    fill="none"
                    stroke="rgba(80,230,245,0.18)"
                    strokeWidth="0.24"
                    strokeDasharray="2 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.56, 0.2] }}
                    transition={{ duration: 2.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.svg>
            <motion.div
                className="absolute -left-[25%] top-0 h-full w-[36%] bg-[linear-gradient(90deg,transparent,rgba(45,212,191,0.18),transparent)] blur-xl"
                initial={{ x: '-20%', opacity: 0 }}
                animate={{ x: '150%', opacity: [0, 0.6, 0] }}
                transition={{ duration: 2.3, ease: [0.16, 1, 0.3, 1] }}
            />
        </div>
    )
}

function UIFrame({
    title,
    accent = 'sky',
    delay = 0,
    active = false,
}: {
    title: string
    accent?: 'sky' | 'emerald' | 'teal'
    delay?: number
    active?: boolean
}) {
    const accentMap = {
        sky: {
            border: 'border-sky-300/35',
            bg: 'bg-sky-300/[0.06]',
            chip: 'bg-sky-200/20 text-sky-100 border-sky-200/35',
            bar: 'bg-sky-200/70',
            faint: 'bg-sky-200/25',
        },
        emerald: {
            border: 'border-emerald-300/35',
            bg: 'bg-emerald-300/[0.06]',
            chip: 'bg-emerald-200/20 text-emerald-100 border-emerald-200/35',
            bar: 'bg-emerald-200/75',
            faint: 'bg-emerald-200/25',
        },
        teal: {
            border: 'border-teal-300/35',
            bg: 'bg-teal-300/[0.06]',
            chip: 'bg-teal-200/20 text-teal-100 border-teal-200/35',
            bar: 'bg-teal-200/75',
            faint: 'bg-teal-200/25',
        },
    } as const

    const tone = accentMap[accent]

    return (
        <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.94, filter: 'blur(10px)' }}
            animate={active ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.65, delay, ease }}
            className={`w-56 rounded-xl border ${tone.border} ${tone.bg} p-3 backdrop-blur-sm`}
        >
            <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-200">{title}</span>
                <span className={`rounded-full border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${tone.chip}`}>
                    Active
                </span>
            </div>
            <div className="space-y-2">
                <div className={`h-2 rounded-full ${tone.faint}`} />
                <motion.div
                    className={`h-2 rounded-full ${tone.bar} origin-left`}
                    initial={{ scaleX: 0 }}
                    animate={active ? { scaleX: [0.2, 1, 0.78] } : {}}
                    transition={{ duration: 1.6, delay: delay + 0.08, ease: [0.16, 1, 0.3, 1], times: [0, 0.6, 1] }}
                />
                <div className="grid grid-cols-6 gap-1.5 pt-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                            key={`${title}-bar-${i}`}
                            className={`rounded-sm ${tone.faint}`}
                            style={{ height: 16 + ((i * 7) % 18) }}
                            animate={active ? { opacity: [0.35, 0.9, 0.5], scaleY: [0.7, 1, 0.86] } : {}}
                            transition={{ duration: 1.3, delay: delay + 0.12 + i * 0.05, repeat: Infinity, repeatType: 'mirror' }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

function AbstractFlowBubbles({ active }: { active: boolean }) {
    const nodes = [
        { id: 'n1', x: 8, y: 55, color: '#d4d4d8', scale: 1.06 },
        { id: 'n2', x: 25, y: 24, color: '#fde68a', scale: 0.86 },
        { id: 'n3', x: 46, y: 62, color: '#bae6fd', scale: 0.94 },
        { id: 'n4', x: 66, y: 30, color: '#a5f3fc', scale: 0.88 },
        { id: 'n5', x: 85, y: 58, color: '#c4b5fd', scale: 1.02 },
    ]

    return (
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-20 w-[min(92vw,32rem)]">
            {nodes.map((node, index) => (
                <motion.span
                    key={node.id}
                    className="absolute block rounded-full"
                    style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        width: `${16 * node.scale}px`,
                        height: `${16 * node.scale}px`,
                        background: `radial-gradient(circle at 30% 28%, #ffffffaa, ${node.color}dd)`,
                        boxShadow: `0 0 16px ${node.color}55`,
                    }}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={active
                        ? {
                            opacity: [0.25, 0.95, 0.35],
                            y: [0, -10 - index * 0.6, 0],
                            x: [0, index % 2 ? -8 : 8, 0],
                            scale: [0.88, 1.08, 0.94],
                        }
                        : {}}
                    transition={{
                        duration: 3.2 + index * 0.22,
                        delay: index * 0.07,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 1: "THE BUSINESS PROBLEM" — Opening title card
   ═════════════════════════════════════════════════ */
export function MovieBeatAssignment() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), 200))
        t.push(setTimeout(() => setStep(1), 600))
        t.push(setTimeout(() => setStep(2), 1400))
        t.push(setTimeout(() => setStep(3), 2400))
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
                        className="font-mono text-xs tracking-[0.3em] text-rose-300/90 uppercase mb-6"
                    >
                        The Business Problem
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step >= 1 && (
                    <motion.h2
                        initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease }}
                        className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4"
                    >
                        Customers were leaving.<br />
                        <span className="text-zinc-300">40 years without updates.</span>
                    </motion.h2>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease }}
                        className="max-w-2xl"
                    >
                        <motion.p className="text-sm md:text-base text-zinc-300 max-w-md mx-auto leading-relaxed">
                            ReportCaster ran 20M+ jobs per week — mission-critical to the business.
                            But decades without modernization drove repeated customer complaints and churn.
                        </motion.p>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                            {[
                                { label: 'Files passed back and forth', icon: FileText },
                                { label: 'Plans gathered dust', icon: BarChart3 },
                            ].map((item, idx) => {
                                const Icon = item.icon
                                return (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: idx === 0 ? -20 : 20, filter: 'blur(6px)' }}
                                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        transition={{ duration: 0.45, delay: idx * 0.12, ease }}
                                        className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/[0.05] px-3 py-1.5"
                                    >
                                        <Icon className="h-3.5 w-3.5 text-sky-200" />
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-200">
                                            {item.label}
                                        </span>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease }}
                        className="flex gap-8 mt-8"
                    >
                        {[
                            { val: '40+', label: 'No Updates' },
                            { val: '20M+', label: 'Weekly Jobs' },
                            { val: '↓', label: 'Customer Retention' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-xl md:text-2xl font-bold text-white font-mono">{stat.val}</div>
                                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 2: "THE CHAOS" — Fragmentation visualization
   ═════════════════════════════════════════════════ */
const SYSTEMS = [
    { name: 'Schedule', color: '#f43f5e' },
    { name: 'Distribution', color: '#8b5cf6' },
    { name: 'Log Viewer', color: '#3b82f6' },
    { name: 'My Reports', color: '#10b981' },
    { name: 'Library', color: '#f59e0b' },
]

export function MovieBeatChaos() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), 200))
        t.push(setTimeout(() => setStep(1), 1000))
        t.push(setTimeout(() => setStep(2), 2200))
        t.push(setTimeout(() => setStep(3), 3400))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full py-6">
            {/* System nodes */}
            <div className="relative w-full max-w-lg h-48 md:h-56">
                {SYSTEMS.map((sys, i) => {
                    const angle = (i / SYSTEMS.length) * Math.PI * 2 - Math.PI / 2
                    const radiusX = 140
                    const radiusY = 80
                    const x = 50 + (Math.cos(angle) * radiusX / 3.2)
                    const y = 50 + (Math.sin(angle) * radiusY / 1.8)

                    return (
                        <motion.div
                            key={sys.name}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: i * 0.12, duration: 0.5, ease, type: 'spring', stiffness: 200 }}
                            className="absolute"
                            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                            <div
                                className="px-3 py-2 rounded-lg border text-[11px] font-mono font-medium whitespace-nowrap"
                                style={{
                                    borderColor: `${sys.color}40`,
                                    color: sys.color,
                                    background: `${sys.color}10`,
                                }}
                            >
                                {sys.name}
                            </div>
                        </motion.div>
                    )
                })}

                {/* Chaos connection lines (SVG) */}
                <AnimatePresence>
                    {step >= 1 && (
                        <motion.svg
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            {SYSTEMS.map((_, i) =>
                                SYSTEMS.map((_, j) => {
                                    if (j <= i) return null
                                    const a1 = (i / SYSTEMS.length) * Math.PI * 2 - Math.PI / 2
                                    const a2 = (j / SYSTEMS.length) * Math.PI * 2 - Math.PI / 2
                                    return (
                                        <motion.line
                                            key={`${i}-${j}`}
                                            x1={50 + Math.cos(a1) * 44}
                                            y1={50 + Math.sin(a1) * 44}
                                            x2={50 + Math.cos(a2) * 44}
                                            y2={50 + Math.sin(a2) * 44}
                                            stroke="#f43f5e"
                                            strokeWidth="0.3"
                                            strokeDasharray="2,2"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: (i + j) * 0.08, duration: 0.6 }}
                                        />
                                    )
                                })
                            )}
                        </motion.svg>
                    )}
                </AnimatePresence>
            </div>

            {/* Pain stats */}
            <AnimatePresence>
                {step >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease }}
                        className="flex gap-6 md:gap-10 mt-4"
                    >
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-rose-400 font-mono">
                                <AnimNumber value={4} />
                            </div>
                            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">clicks to start</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-rose-400 font-mono">
                                <AnimNumber value={5} delay={0.3} />
                            </div>
                            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">fragmented UIs</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step >= 3 && (
                    <motion.p
                        initial={{ opacity: 0, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.7, ease }}
                        className="text-sm text-zinc-300 mt-4 font-mono"
                    >
                        Customers demanded modernization. Zero documentation to work with.
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 3: "THE PIVOTS" — Quick rejection → resolution
   ═════════════════════════════════════════════════ */
export function MovieBeatPivots() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), 300))
        t.push(setTimeout(() => setStep(1), 1500))
        t.push(setTimeout(() => setStep(2), 2800))
        t.push(setTimeout(() => setStep(3), 4200))
        return () => t.forEach(clearTimeout)
    }, [])

    const pivots = [
        { version: 'V1', verdict: 'REJECTED', reason: 'Too disruptive', color: '#f43f5e' },
        { version: 'V2', verdict: 'REJECTED', reason: 'Too safe', color: '#f59e0b' },
        { version: 'V3', verdict: 'SHIPPED', reason: 'The breakthrough', color: '#10b981' },
    ]

    return (
        <div className="flex flex-col items-center justify-center w-full py-8">
            <motion.p
                initial={{ opacity: 0 }}
                animate={step >= 0 ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="font-mono text-xs tracking-[0.3em] text-zinc-400 uppercase mb-8"
            >
                Three Pivots to Clarity
            </motion.p>

            <div className="flex items-center gap-4 md:gap-6">
                {pivots.map((pivot, i) => (
                    <motion.div
                        key={pivot.version}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={step >= i + 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 0.6, ease }}
                        className="relative"
                    >
                        <div
                            className="w-24 md:w-32 h-32 md:h-40 rounded-xl border flex flex-col items-center justify-center text-center p-3"
                            style={{
                                borderColor: `${pivot.color}30`,
                                background: `${pivot.color}08`,
                            }}
                        >
                            <span className="text-2xl md:text-3xl font-bold font-mono" style={{ color: pivot.color }}>
                                {pivot.version}
                            </span>
                            <span
                                className="text-[11px] font-mono tracking-wider mt-2 uppercase font-bold"
                                style={{ color: pivot.color }}
                            >
                                {pivot.verdict}
                            </span>
                            <span className="text-xs text-zinc-400 mt-1">{pivot.reason}</span>
                        </div>

                        {/* Connection arrow */}
                        {i < pivots.length - 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={step >= i + 2 ? { opacity: 0.3 } : {}}
                                className="absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2"
                            >
                                <ArrowRight className="w-3 h-3 text-zinc-400" />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 4: "THE BREAKTHROUGH" — + Menu consolidation
   ═════════════════════════════════════════════════ */
export function MovieBeatBreakthrough() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), 200))
        t.push(setTimeout(() => setStep(1), 1200))
        t.push(setTimeout(() => setStep(2), 2500))
        t.push(setTimeout(() => setStep(3), 3800))
        return () => t.forEach(clearTimeout)
    }, [])

    return (
        <div className="relative flex w-full flex-col items-center justify-center py-8">
            <WireMorphBackdrop />
            <motion.p
                initial={{ opacity: 0 }}
                animate={step >= 0 ? { opacity: 1 } : {}}
                transition={{ duration: 0.45 }}
                className="mb-6 font-mono text-xs tracking-[0.3em] text-zinc-400 uppercase"
            >
                Screen Transition: Fragmented to Unified
            </motion.p>

            <AnimatePresence mode="wait">
                {step < 2 ? (
                    <motion.div
                        key="before-breakthrough"
                        initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -14, scale: 0.96, filter: 'blur(8px)' }}
                        transition={{ duration: 0.62, ease }}
                        className="w-full max-w-4xl text-center"
                    >
                        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-rose-300/90 uppercase">Before</p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {['Scheduler', 'Distribution', 'Job Log'].map((title, idx) => (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, x: idx === 1 ? 0 : idx === 0 ? -26 : 26, y: 12 }}
                                    animate={step >= 1 ? { opacity: 1, x: 0, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: idx * 0.1, ease }}
                                >
                                    <UIFrame title={title} accent="sky" active={step >= 1} />
                                </motion.div>
                            ))}
                        </div>
                        <p className="mt-4 font-mono text-xs text-zinc-400">3 separate entry points. 3 disconnected flows.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="after-breakthrough"
                        initial={{ opacity: 0, y: 14, scale: 0.94, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.75, ease }}
                        className="w-full max-w-4xl text-center"
                    >
                        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-emerald-400/90 uppercase">After</p>
                        <motion.div
                            initial={{ scale: 0.86, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 210, damping: 22 }}
                            className="mx-auto mb-5 w-fit rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-8 py-4"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-emerald-300 mb-1">+ Menu</div>
                            <div className="text-xs font-mono text-zinc-300">One command center. Cohesive product narrative.</div>
                        </motion.div>

                        <div className="mx-auto flex w-fit items-center gap-3">
                            <UIFrame title="Unified RC Hub" accent="emerald" active={step >= 2} />
                            <motion.div
                                initial={{ opacity: 0, x: 14 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.45, delay: 0.2, ease }}
                                className="hidden h-40 w-56 rounded-xl border border-emerald-300/35 bg-emerald-300/[0.06] p-3 md:block"
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-100">Outcome Feed</span>
                                    <Sparkles className="h-3.5 w-3.5 text-emerald-200" />
                                </div>
                                <div className="space-y-2">
                                    {[0, 1, 2].map((row) => (
                                        <motion.div
                                            key={`outcome-${row}`}
                                            className="h-2 rounded-full bg-emerald-200/25"
                                            animate={{ scaleX: [0.4, 1, 0.7], opacity: [0.4, 0.95, 0.6] }}
                                            transition={{ duration: 1.5, delay: 0.35 + row * 0.08, repeat: Infinity, repeatType: 'mirror' }}
                                            style={{ transformOrigin: '0 50%' }}
                                        />
                                    ))}
                                </div>
                                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-100/90">
                                    Interaction confidence rising
                                </div>
                            </motion.div>
                        </div>

                        {step >= 3 && (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.48, ease }}
                                className="mt-6 flex justify-center gap-8"
                            >
                                <div className="text-center">
                                    <div className="text-xl font-bold text-emerald-300 font-mono">75%</div>
                                    <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">fewer clicks</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-emerald-300 font-mono">0</div>
                                    <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">context switches</div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 5: "THE SCALE" — 250 screens cascade
   ═════════════════════════════════════════════════ */
export function MovieBeatScale() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), 200))
        t.push(setTimeout(() => setStep(1), 1500))
        t.push(setTimeout(() => setStep(2), 3000))
        return () => t.forEach(clearTimeout)
    }, [])

    // Generate mini screen rectangles
    const screens = Array.from({ length: 30 }, (_, i) => ({
        x: 10 + (i % 6) * 15,
        y: 5 + Math.floor(i / 6) * 18,
        delay: i * 0.05,
    }))

    return (
        <div className="flex flex-col items-center justify-center w-full py-8">
            {/* Screen cascade */}
            <div className="relative w-full max-w-md h-40 mb-6">
                {screens.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={step >= 0 ? { opacity: 0.6, scale: 1 } : {}}
                        transition={{ delay: s.delay, duration: 0.3, ease }}
                        className="absolute w-[13%] h-[16%] rounded-sm border border-white/[0.08] bg-white/[0.03]"
                        style={{ left: `${s.x}%`, top: `${s.y}%` }}
                    />
                ))}
            </div>

            {/* Counter */}
            <AnimatePresence>
                {step >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease }}
                        className="text-center"
                    >
                        <div className="text-5xl md:text-7xl font-bold text-white font-mono">
                            <AnimNumber value={250} suffix="+" />
                        </div>
                        <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mt-2">
                            Screens designed
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {step >= 2 && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-sm text-zinc-300 mt-4 text-center max-w-md leading-relaxed"
                    >
                        Every edge case. Every state. Every error path.
                        <br />
                        <span className="text-zinc-400">Packaged into a living handoff system for a 20-person team.</span>
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT X: "DISCOVERY ARC" — Week 1 + room + investigation
   ═════════════════════════════════════════════════ */
export function MovieBeatDiscovery() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), 180))
        t.push(setTimeout(() => setStep(1), 1100))
        t.push(setTimeout(() => setStep(2), 2600))
        t.push(setTimeout(() => setStep(3), 4300))
        return () => t.forEach(clearTimeout)
    }, [])

    const cards = [
        { icon: <Search className="h-4 w-4" />, title: 'Week 1', meta: 'Zero domain knowledge', x: '14%', y: '28%' },
        { icon: <Users className="h-4 w-4" />, title: 'The Room', meta: '130+ years of SME context', x: '50%', y: '16%' },
        { icon: <FolderKanban className="h-4 w-4" />, title: 'Artifacts', meta: '3 sources. No docs.', x: '78%', y: '34%' },
    ]

    return (
        <div className="relative flex w-full flex-col items-center justify-center py-8">
            <WireMorphBackdrop />
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={step >= 0 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease }}
                className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-sky-300/90"
            >
                Discovery Arc
            </motion.p>

            <div className="relative h-52 w-full max-w-3xl">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-sky-300/30 bg-sky-300/[0.05] px-4 py-3 text-left backdrop-blur-sm"
                        style={{ left: card.x, top: card.y }}
                        initial={{ opacity: 0, y: 26, scale: 0.9, filter: 'blur(10px)' }}
                        animate={step >= 1
                            ? (step >= 3
                                ? {
                                    left: '50%',
                                    top: '50%',
                                    opacity: index === 0 ? 0 : 1,
                                    scale: index === 1 ? 1.06 : 0.88,
                                    filter: 'blur(0px)',
                                }
                                : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' })
                            : {}}
                        transition={{ duration: step >= 3 ? 0.8 : 0.55, delay: index * 0.12, ease }}
                    >
                        <div className="mb-1 flex items-center gap-2 text-sky-300">
                            {card.icon}
                            <span className="font-mono text-[11px] uppercase tracking-[0.2em]">{card.title}</span>
                        </div>
                        <p className="text-sm text-zinc-200">{card.meta}</p>
                    </motion.div>
                ))}

                <AnimatePresence>
                    {step >= 2 && (
                        <motion.svg
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.42 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 h-full w-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            {['14 28 50 16', '50 16 78 34', '14 28 78 34'].map((coords, idx) => {
                                const [x1, y1, x2, y2] = coords.split(' ')
                                return (
                                    <motion.line
                                        key={coords}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke="rgba(125,211,252,0.7)"
                                        strokeWidth="0.28"
                                        strokeDasharray="2 2"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.6, delay: idx * 0.12, ease }}
                                    />
                                )
                            })}
                        </motion.svg>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {step >= 3 && (
                    <motion.p
                        initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.6, ease }}
                        className="mt-3 max-w-xl text-center text-sm text-zinc-300"
                    >
                        4 months of system archaeology before drawing the first real production flow.
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT X: "EXECUTION ARC" — Scheduler + Recurrence + Job Log
   ═════════════════════════════════════════════════ */
export function MovieBeatExecution() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), 220))
        t.push(setTimeout(() => setStep(1), 1200))
        t.push(setTimeout(() => setStep(2), 2800))
        t.push(setTimeout(() => setStep(3), 4400))
        return () => t.forEach(clearTimeout)
    }, [])

    const modules = [
        { name: 'Scheduler', x: '-120%' },
        { name: 'Recurrence', x: '0%' },
        { name: 'Job Logs', x: '120%' },
    ]

    return (
        <div className="relative flex w-full flex-col items-center justify-center py-8">
            <WireMorphBackdrop />
            <motion.p
                initial={{ opacity: 0 }}
                animate={step >= 0 ? { opacity: 1 } : {}}
                transition={{ duration: 0.45 }}
                className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/90"
            >
                Execution Arc
            </motion.p>

            <div className="relative h-64 w-full max-w-4xl">
                <AnimatePresence mode="wait">
                    {step < 2 && step >= 1 ? (
                        <motion.div
                            key="execution-before"
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10, scale: 0.94, filter: 'blur(6px)' }}
                            transition={{ duration: 0.55, ease }}
                        >
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                {modules.map((module, idx) => (
                                    <motion.div
                                        key={module.name}
                                        initial={{ opacity: 0, x: module.x, scale: 0.9 }}
                                        animate={{ opacity: 1, x: '0%', scale: 1 }}
                                        transition={{ duration: 0.55, delay: idx * 0.12, ease }}
                                    >
                                        <UIFrame title={module.name} accent="teal" active={step >= 1} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="execution-after"
                            className="absolute left-1/2 top-1/2 h-[13.5rem] w-[min(92vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-emerald-300/35 bg-emerald-300/[0.06] p-4 backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.75, ease }}
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-emerald-200">
                                    <Layers3 className="h-4 w-4" />
                                    Unified Operational Layer
                                </div>
                                <div className="rounded-full border border-emerald-200/30 bg-emerald-200/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-200">
                                    V3 Shipped
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {['Scheduler', 'Recurrence', 'Job Logs'].map((name, idx) => (
                                    <motion.div
                                        key={name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.15 + idx * 0.08, ease }}
                                        className="rounded-md border border-emerald-200/25 bg-emerald-200/[0.06] px-2 py-3 text-center"
                                    >
                                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-100">{name}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-3 grid grid-cols-10 gap-1">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <motion.div
                                        key={`metric-${i}`}
                                        className="rounded-sm bg-emerald-200/30"
                                        style={{ height: 10 + ((i * 5) % 22) }}
                                        animate={{
                                            scaleY: [0.5, 1, 0.72],
                                            opacity: [0.35, 0.9, 0.55],
                                        }}
                                        transition={{
                                            duration: 1.4,
                                            delay: 0.32 + i * 0.04,
                                            repeat: Infinity,
                                            repeatType: 'mirror',
                                            ease: 'easeInOut',
                                        }}
                                    />
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={step >= 3 ? { opacity: 1 } : {}}
                                transition={{ duration: 0.4, delay: 0.18 }}
                                className="mt-3 flex items-center justify-between"
                            >
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/30 bg-emerald-200/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-100">
                                    <Sparkles className="h-3 w-3" />
                                    responsive feedback loops
                                </div>
                                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-200">
                                    5 entry points <span className="text-emerald-300">→</span> 1 unified flow
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}


/* ═════════════════════════════════════════════════
   BEAT 6: "THE IMPACT" — Shipped + metrics
   ═════════════════════════════════════════════════ */
export function MovieBeatShipped() {
    const [step, setStep] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(0), 200))
        t.push(setTimeout(() => setStep(1), 1500))
        t.push(setTimeout(() => setStep(2), 3000))
        t.push(setTimeout(() => setStep(3), 4500))
        return () => t.forEach(clearTimeout)
    }, [])

    const metrics = [
        { value: '20M+', label: 'Weekly Schedules', icon: Clock },
        { value: '100%', label: 'Legacy Parity', icon: CheckCircle2 },
        { value: '0', label: 'Regressions', icon: CheckCircle2 },
    ]

    return (
        <div className="flex flex-col items-center justify-center w-full py-8">
            {/* SHIPPED */}
            <AnimatePresence>
                {step >= 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1, ease }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                            SHIPPED.
                        </h2>
                        <p className="font-mono text-xs text-zinc-400 tracking-[0.2em] uppercase mt-2">
                            Customers retained · Mission-critical · Zero regressions
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Metrics */}
            <div className="flex gap-6 md:gap-10">
                {metrics.map((metric, i) => {
                    const Icon = metric.icon
                    return (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.2, duration: 0.6, ease }}
                            className="text-center"
                        >
                            <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-2">
                                <Icon className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-white font-mono">{metric.value}</div>
                            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">{metric.label}</div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Quote */}
            <AnimatePresence>
                {step >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease }}
                        className="mt-8 max-w-md text-center"
                    >
                        <p className="text-sm text-zinc-400 italic leading-relaxed">
                            &ldquo;She grasped all aspects of a highly intricate system. She&rsquo;s the kind of UX leader any team would be lucky to have.&rdquo;
                        </p>
                        <p className="text-xs font-mono text-zinc-400 mt-2 uppercase tracking-wider">
                            — Yingchun Chen, Principal Engineer
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Asked vs Delivered */}
            <AnimatePresence>
                {step >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease }}
                        className="mt-8 flex gap-6 items-center"
                    >
                        <div className="text-center">
                            <div className="text-xs font-mono text-rose-300/90 uppercase tracking-wider mb-1">Asked for</div>
                            <div className="text-sm text-zinc-300 line-through">UI refresh</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-700" />
                        <div className="text-center">
                            <div className="text-xs font-mono text-emerald-400/90 uppercase tracking-wider mb-1">Delivered</div>
                            <div className="text-sm text-white font-medium">Brand new integrated RC</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
