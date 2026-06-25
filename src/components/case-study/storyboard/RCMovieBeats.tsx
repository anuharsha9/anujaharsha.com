'use client'

/**
 * RCMovieBeats — Condensed motion-graphic beats for the RC auto-play movie.
 * 
 * 8-15 second "title cards" for the landing page movie.
 * Think: Apple keynote transitions meets motion design reel.
 */

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Layers3, Sparkles } from 'lucide-react'
import { withHexAlpha } from '@/lib/color-utils'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const BEAT_PACE = 1.58
const at = (ms: number) => Math.round(ms * BEAT_PACE)

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
 const eased = 1 - Math.pow(1 - progress, 3)
 setDisplay(Math.round(eased * value))
 if (progress < 1) ref.current = setTimeout(tick, 16)
 }
 tick()
 return () => { if (ref.current) clearTimeout(ref.current) }
 }, [value, delay])

 return <>{display}{suffix}</>
}

/* ── Shared cinematic backdrop ── */
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
 transition={{ duration: 2.4, ease }}
 />
 <motion.path
 d="M0,74 C20,67 34,82 52,72 C67,64 82,79 100,70"
 fill="none"
 stroke="var(--overlay-cyan-wire-18)"
 strokeWidth="0.24"
 strokeDasharray="2 3"
 initial={{ pathLength: 0, opacity: 0 }}
 animate={{ pathLength: 1, opacity: [0, 0.56, 0.2] }}
 transition={{ duration: 2.5, delay: 0.1, ease }}
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

/* ── Floating ambient dots ── */
function AbstractFlowBubbles({ active }: { active: boolean }) {
 const nodes = [
 { id: 'n1', x: 8, y: 55, color: 'var(--cs-accent)', scale: 1.06 },
 { id: 'n2', x: 25, y: 24, color: 'var(--cs-accent)', scale: 0.86 },
 { id: 'n3', x: 46, y: 62, color: 'var(--cs-accent)', scale: 0.94 },
 { id: 'n4', x: 66, y: 30, color: 'var(--cs-accent)', scale: 0.88 },
 { id: 'n5', x: 85, y: 58, color: 'var(--cs-accent)', scale: 1.02 },
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
 background: `radial-gradient(circle at 30% 28%, var(--overlay-white-67), ${withHexAlpha(node.color, 'dd')})`,
 boxShadow: `0 0 16px ${withHexAlpha(node.color, '55')}`,
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
 BEAT 1: "THE BUSINESS PROBLEM"
 ═════════════════════════════════════════════════ */
export function MovieBeatAssignment() {
 const [step, setStep] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 useEffect(() => {
 const t = timers.current
 t.push(setTimeout(() => setStep(0), at(200)))
 t.push(setTimeout(() => setStep(1), at(600)))
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
 className="font-mono text-xs tracking-[0.3em] text-[var(--cs-accent)] uppercase mb-6"
 >
 The Business Problem
 </motion.div>
 )}
 </AnimatePresence>

 <AnimatePresence>
 {step >= 1 && (
 <motion.h2
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease }}
 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4 px-4"
 >
 Customers were leaving.<br />
 <span className="text-zinc-100">40 years without updates.</span>
 </motion.h2>
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
 { val: '50+', label: 'Years Old' },
 { val: '20M+', label: 'Weekly Jobs' },
 { val: '0', label: 'Documentation' },
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
 BEAT 2: "DISCOVERY ARC" — Week 1 volunteer
 ═════════════════════════════════════════════════ */
export function MovieBeatDiscovery() {
 const [step, setStep] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 useEffect(() => {
 const t = timers.current
 t.push(setTimeout(() => setStep(0), at(180)))
 t.push(setTimeout(() => setStep(1), at(1100)))
 t.push(setTimeout(() => setStep(2), at(2800)))
 t.push(setTimeout(() => setStep(3), at(4300)))
 return () => t.forEach(clearTimeout)
 }, [])

 return (
 <div className="relative flex w-full flex-col items-center justify-center py-8 text-center">
 <WireMorphBackdrop />

 <motion.p
 initial={{ opacity: 0, y: 12 }}
 animate={step >= 0 ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.5, ease }}
 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-[var(--cs-accent)]"
 >
 Discovery Arc
 </motion.p>

 {/* Timeline cards — horizontally centered */}
 <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-3xl px-4">
 {[
 { title: 'Week 1', meta: 'Volunteered. Zero domain knowledge.', delay: 0 },
 { title: 'The Room', meta: '130+ years of combined SME context.', delay: 0.12 },
 { title: 'The Map', meta: '5 undocumented subsystems found.', delay: 0.24 },
 ].map((card, index) => (
 <motion.div
 key={card.title}
 className="w-full md:w-52 rounded-xl border border-[color-mix(in_srgb,var(--cs-accent),transparent_75%)] bg-[color-mix(in_srgb,var(--cs-accent),transparent_95%)] px-5 py-4 text-center "
 initial={{ opacity: 0, y: 20, scale: 0.9 }}
 animate={step >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
 transition={{ duration: 0.55, delay: card.delay, ease }}
 >
 <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--cs-accent)] mb-1.5">{card.title}</div>
 <p className="text-sm text-zinc-200 leading-snug">{card.meta}</p>
 </motion.div>
 ))}
 </div>

 {/* Connecting line */}
 <AnimatePresence>
 {step >= 2 && (
 <motion.div
 initial={{ scaleX: 0, opacity: 0 }}
 animate={{ scaleX: 1, opacity: 0.3 }}
 transition={{ duration: 0.8, ease }}
 className="hidden md:block w-full max-w-lg h-px bg-gradient-to-r from-transparent via-[var(--cs-accent)] to-transparent mt-4 origin-center"
 />
 )}
 </AnimatePresence>

 <AnimatePresence>
 {step >= 3 && (
 <motion.p
 initial={{ opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, ease }}
 className="mt-6 max-w-md text-center text-sm text-zinc-200 leading-relaxed px-4"
 >
 4 months of research that nobody expected — and nobody had ever done.
 </motion.p>
 )}
 </AnimatePresence>
 </div>
 )
}


/* ═════════════════════════════════════════════════
 BEAT 3: "THE CHAOS" — Fragmentation
 ═════════════════════════════════════════════════ */
const SYSTEMS = [
 { name: 'Schedule', color: 'var(--cs-accent)' },
 { name: 'Distribution', color: 'var(--cs-accent)' },
 { name: 'Log Viewer', color: 'var(--cs-accent)' },
 { name: 'My Reports', color: 'var(--cs-accent)' },
 { name: 'Library', color: 'var(--cs-accent)' },
]

export function MovieBeatChaos() {
 const [step, setStep] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 useEffect(() => {
 const t = timers.current
 t.push(setTimeout(() => setStep(0), at(200)))
 t.push(setTimeout(() => setStep(1), at(1000)))
 t.push(setTimeout(() => setStep(2), at(2200)))
 t.push(setTimeout(() => setStep(3), at(3400)))
 return () => t.forEach(clearTimeout)
 }, [])

 return (
 <div className="flex flex-col items-center justify-center w-full py-6 text-center">
 {/* System nodes — centered ring */}
 <div className="relative w-full max-w-md mx-auto h-56 md:h-64">
 {SYSTEMS.map((sys, i) => {
 const angle = (i / SYSTEMS.length) * Math.PI * 2 - Math.PI / 2
 const radiusX = 38
 const radiusY = 38
 const x = 50 + Math.cos(angle) * radiusX
 const y = 50 + Math.sin(angle) * radiusY

 return (
 <motion.div
 key={sys.name}
 initial={{ opacity: 0, scale: 0 }}
 animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
 transition={{ delay: i * 0.12, duration: 0.5, ease, type: 'spring', stiffness: 200 }}
 className="absolute -translate-x-1/2 -translate-y-1/2"
 style={{ left: `${x}%`, top: `${y}%` }}
 >
 <div
 className="px-3 py-2 rounded-lg border text-[11px] font-mono font-medium whitespace-nowrap"
 style={{
 borderColor: withHexAlpha(sys.color, '40'),
 color: sys.color,
 background: withHexAlpha(sys.color, '10'),
 }}
 >
 {sys.name}
 </div>
 </motion.div>
 )
 })}

 {/* Chaos connection lines */}
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
 x1={50 + Math.cos(a1) * 38}
 y1={50 + Math.sin(a1) * 38}
 x2={50 + Math.cos(a2) * 38}
 y2={50 + Math.sin(a2) * 38}
 stroke="var(--cs-accent)"
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
 className="flex gap-8 md:gap-12 mt-4"
 >
 <div className="text-center">
 <div className="text-2xl md:text-3xl font-bold text-[var(--cs-accent)] font-mono">
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


 </div>
 )
}


/* ═════════════════════════════════════════════════
 BEAT 4: "THREE PIVOTS" — V1 → V2 → V3
 ═════════════════════════════════════════════════ */
export function MovieBeatPivots() {
 const [step, setStep] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 useEffect(() => {
 const t = timers.current
 t.push(setTimeout(() => setStep(0), at(300)))
 t.push(setTimeout(() => setStep(1), at(1500)))
 t.push(setTimeout(() => setStep(2), at(2800)))
 t.push(setTimeout(() => setStep(3), at(4200)))
 return () => t.forEach(clearTimeout)
 }, [])

 const pivots = [
 { version: 'V1', verdict: 'REJECTED', reason: 'Siloed Product', color: 'var(--overlay-white-40)' },
 { version: 'V2', verdict: 'REJECTED', reason: 'Plugin Approach', color: 'var(--overlay-white-40)' },
 { version: 'V3', verdict: 'WINNER', reason: 'Unified Hub', color: 'var(--cs-accent)' },
 ]

 return (
 <div className="flex flex-col items-center justify-center w-full py-8 text-center">
 <motion.p
 initial={{ opacity: 0 }}
 animate={step >= 0 ? { opacity: 1 } : {}}
 transition={{ duration: 0.5 }}
 className="font-mono text-xs tracking-[0.3em] text-zinc-200 uppercase mb-8"
 >
 Three Pivots to Clarity
 </motion.p>

 <div className="flex items-center justify-center gap-3 md:gap-6 px-4">
 {pivots.map((pivot, i) => (
 <motion.div
 key={pivot.version}
 initial={{ opacity: 0, y: 30, scale: 0.9 }}
 animate={step >= i + 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
 transition={{ duration: 0.6, ease }}
 className="relative"
 >
 <div
 className="w-28 md:w-36 h-36 md:h-44 rounded-xl border flex flex-col items-center justify-center text-center p-3"
 style={{
 borderColor: withHexAlpha(pivot.color, '30'),
 background: withHexAlpha(pivot.color, '08'),
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
 <span className="text-[11px] text-zinc-400 mt-1">{pivot.reason}</span>
 </div>

 {/* Connection arrow */}
 {i < pivots.length - 1 && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={step >= i + 2 ? { opacity: 0.4 } : {}}
 className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10"
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
 BEAT 5: "THE BREAKTHROUGH" — Before → After + Unified Hub
 Merged from previous Breakthrough + Execution beats
 ═════════════════════════════════════════════════ */
export function MovieBeatBreakthrough() {
 const [step, setStep] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 useEffect(() => {
 const t = timers.current
 t.push(setTimeout(() => setStep(0), at(200)))
 t.push(setTimeout(() => setStep(1), at(1200)))
 t.push(setTimeout(() => setStep(2), at(3000)))
 t.push(setTimeout(() => setStep(3), at(4800)))
 return () => t.forEach(clearTimeout)
 }, [])

 return (
 <div className="relative flex w-full flex-col items-center justify-center py-8 text-center">
 <WireMorphBackdrop />
 <motion.p
 initial={{ opacity: 0 }}
 animate={step >= 0 ? { opacity: 1 } : {}}
 transition={{ duration: 0.45 }}
 className="mb-8 font-mono text-xs tracking-[0.3em] text-zinc-200 uppercase"
 >
 The Solution
 </motion.p>

 <AnimatePresence mode="wait">
 {step < 2 ? (
 /* ── BEFORE state ── */
 <motion.div
 key="before"
 initial={{ opacity: 0, y: 18 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -14, scale: 0.96 }}
 transition={{ duration: 0.62, ease }}
 className="w-full max-w-lg text-center"
 >
 <p className="mb-5 font-mono text-[11px] tracking-[0.3em] text-zinc-400 uppercase">Before</p>
 <div className="flex items-center justify-center gap-3">
 {['Scheduler', 'Distribution', 'Job Log'].map((title, idx) => (
 <motion.div
 key={title}
 initial={{ opacity: 0, y: 12 }}
 animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.5, delay: idx * 0.1, ease }}
 className="px-4 py-3 rounded-lg border border-white/[0.08] bg-white/[0.03] text-center"
 >
 <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-300">{title}</span>
 </motion.div>
 ))}
 </div>
 <p className="mt-4 font-mono text-xs text-zinc-400">3 separate entry points. 4 clicks to start.</p>
 </motion.div>
 ) : (
 /* ── AFTER state ── */
 <motion.div
 key="after"
 initial={{ opacity: 0, y: 14, scale: 0.94 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 transition={{ duration: 0.75, ease }}
 className="w-full max-w-lg text-center"
 >
 <p className="mb-5 font-mono text-[11px] tracking-[0.3em] text-[var(--cs-accent)] uppercase">After</p>
 <motion.div
 initial={{ scale: 0.86, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 transition={{ delay: 0.1, type: 'spring', stiffness: 210, damping: 22 }}
 className="mx-auto mb-5 rounded-xl border border-[color-mix(in_srgb,var(--cs-accent),transparent_75%)] bg-[color-mix(in_srgb,var(--cs-accent),transparent_94%)] px-8 py-5"
 >
 <div className="flex items-center justify-center gap-2 mb-3">
 <Layers3 className="h-4 w-4 text-[var(--cs-accent)]" />
 <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--cs-accent)]">
 Unified Hub Architecture
 </span>
 </div>
 <div className="grid grid-cols-3 gap-2 mb-3">
 {['Scheduler', 'Recurrence', 'Job Logs'].map((name, idx) => (
 <motion.div
 key={name}
 initial={{ opacity: 0, y: 8 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.4, delay: 0.15 + idx * 0.08, ease }}
 className="rounded-md border border-[color-mix(in_srgb,var(--cs-accent),transparent_80%)] bg-[color-mix(in_srgb,var(--cs-accent),transparent_95%)] px-2 py-2 text-center"
 >
 <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-200">{name}</span>
 </motion.div>
 ))}
 </div>
 <div className="flex items-center justify-center gap-2">
 <Sparkles className="h-3 w-3 text-[var(--cs-accent)]" />
 <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-300">
 One &quot;+&quot; menu. 2 clicks. Zero context switching.
 </span>
 </div>
 </motion.div>


 </motion.div>
 )}
 </AnimatePresence>
 </div>
 )
}


/* ═════════════════════════════════════════════════
 BEAT 6: "EXECUTION" — Recurrence: Confusing UI → Natural Language
 ═════════════════════════════════════════════════ */
export function MovieBeatExecution() {
 const [step, setStep] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 useEffect(() => {
 const t = timers.current
 t.push(setTimeout(() => setStep(0), at(220)))
 t.push(setTimeout(() => setStep(1), at(1200)))
 t.push(setTimeout(() => setStep(2), at(3200)))
 t.push(setTimeout(() => setStep(3), at(4800)))
 return () => t.forEach(clearTimeout)
 }, [])

 return (
 <div className="relative flex w-full flex-col items-center justify-center py-8 text-center">
 <WireMorphBackdrop />
 <motion.p
 initial={{ opacity: 0 }}
 animate={step >= 0 ? { opacity: 1 } : {}}
 transition={{ duration: 0.45 }}
 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-[var(--cs-accent)]"
 >
 Execution: Recurrence Engine
 </motion.p>

 <AnimatePresence mode="wait">
 {step < 2 ? (
 /* ── BEFORE: Confusing old UI ── */
 <motion.div
 key="before"
 initial={{ opacity: 0, y: 14 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.94 }}
 transition={{ duration: 0.6, ease }}
 className="w-full max-w-sm mx-auto"
 >
 <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 uppercase mb-4">Before</p>

 {/* Mock old UI — cluttered controls */}
 <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-left space-y-3">
 {/* Fake dropdowns */}
 {[
 { label: 'Frequency', value: 'WEEKLY' },
 { label: 'Day(s)', value: 'MO, WE, FR' },
 { label: 'Interval', value: '1' },
 { label: 'End Date', value: 'NONE' },
 ].map((field, i) => (
 <motion.div
 key={field.label}
 initial={{ opacity: 0, x: -8 }}
 animate={step >= 1 ? { opacity: 1, x: 0 } : {}}
 transition={{ delay: i * 0.1, duration: 0.3 }}
 className="flex items-center justify-between"
 >
 <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">{field.label}</span>
 <div className="flex items-center gap-1 px-2.5 py-1 rounded border border-white/[0.06] bg-white/[0.03]">
 <span className="text-[11px] font-mono text-zinc-400">{field.value}</span>
 <span className="text-zinc-600 text-[10px]">▼</span>
 </div>
 </motion.div>
 ))}
 {/* Confusion indicator */}
 <motion.p
 initial={{ opacity: 0 }}
 animate={step >= 1 ? { opacity: 1 } : {}}
 transition={{ delay: 0.5, duration: 0.4 }}
 className="text-[11px] text-zinc-400 font-mono text-center pt-2 border-t border-white/[0.04]"
 >
 Outdated. Confusing. Too many steps.
 </motion.p>
 </div>
 </motion.div>
 ) : (
 /* ── AFTER: Clean natural language ── */
 <motion.div
 key="after"
 initial={{ opacity: 0, y: 14, scale: 0.94 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 transition={{ duration: 0.7, ease }}
 className="w-full max-w-sm mx-auto"
 >
 <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--cs-accent)] uppercase mb-4">After</p>

 <div className="rounded-xl border border-[color-mix(in_srgb,var(--cs-accent),transparent_80%)] bg-[color-mix(in_srgb,var(--cs-accent),transparent_96%)] p-6 text-center">
 <motion.p
 initial={{ opacity: 0, y: 8 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2, duration: 0.5, ease }}
 className="text-lg md:text-xl text-white font-medium leading-relaxed"
 >
 Every <span className="text-[var(--cs-accent)]">Mon, Wed, Fri</span>
 </motion.p>
 <motion.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.4, duration: 0.4 }}
 className="text-[11px] text-[var(--cs-accent)] font-mono mt-3 uppercase tracking-wider opacity-70"
 >
 Natural language. One sentence. Pure UX.
 </motion.p>
 </div>

 {step >= 3 && (
 <motion.p
 initial={{ opacity: 0, y: 8 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 className="text-sm text-zinc-400 mt-4 font-mono"
 >
 Select settings → see a clear sentence.
 </motion.p>
 )}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 )
}


/* ═════════════════════════════════════════════════
 BEAT 7: "250 SCREENS" — Scale cascade
 ═════════════════════════════════════════════════ */
export function MovieBeatScale() {
 const [step, setStep] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 useEffect(() => {
 const t = timers.current
 t.push(setTimeout(() => setStep(0), at(200)))
 t.push(setTimeout(() => setStep(1), at(1500)))
 t.push(setTimeout(() => setStep(2), at(3000)))
 return () => t.forEach(clearTimeout)
 }, [])

 const screens = Array.from({ length: 30 }, (_, i) => ({
 x: 10 + (i % 6) * 14,
 y: 8 + Math.floor(i / 6) * 17,
 delay: i * 0.04,
 }))

 return (
 <div className="flex flex-col items-center justify-center w-full py-8 text-center">
 {/* Screen cascade */}
 <div className="relative w-full max-w-md mx-auto h-48 mb-6">
 {screens.map((s, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, scale: 0 }}
 animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
 transition={{ delay: s.delay, duration: 0.3, ease }}
 className="absolute w-[13%] h-[16%] rounded-sm border border-[color-mix(in_srgb,var(--cs-accent),transparent_75%)] bg-[color-mix(in_srgb,var(--cs-accent),transparent_92%)]"
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


 </div>
 )
}


/* ═════════════════════════════════════════════════
 BEAT 8: "SHIPPED + IMPACT"
 ═════════════════════════════════════════════════ */
export function MovieBeatShipped() {
 const [step, setStep] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 useEffect(() => {
 const t = timers.current
 t.push(setTimeout(() => setStep(0), at(200)))
 t.push(setTimeout(() => setStep(1), at(2000)))
 return () => t.forEach(clearTimeout)
 }, [])

 return (
 <div className="flex flex-col items-center justify-center w-full py-8 text-center">
 {/* SHIPPED */}
 <AnimatePresence>
 {step >= 0 && (
 <motion.div
 initial={{ opacity: 0, scale: 0.5 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 1, ease }}
 className="text-center mb-10"
 >
 <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
 SHIPPED.
 </h2>
 <p className="font-mono text-xs text-zinc-200 tracking-[0.2em] uppercase mt-3">
 Customers retained · Mission-critical · Zero regressions
 </p>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Quote */}
 <AnimatePresence>
 {step >= 1 && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease }}
 className="max-w-md text-center px-4"
 >
 <p className="text-sm text-zinc-200 italic leading-relaxed">
 &ldquo;She impressed everyone. She took a 40-year-old system and made it look like it was built yesterday.&rdquo;
 </p>
 <p className="text-xs font-mono text-zinc-400 mt-2 uppercase tracking-wider">
 — Principal Engineer
 </p>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 )
}
