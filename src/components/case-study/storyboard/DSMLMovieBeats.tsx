'use client'

/**
 * DSMLMovieBeats — Animated motion-graphic beats for the DSML/IQ Hub case study.
 * 
 * Story arc: Invisible AI features → Strategic spark → Unified Hub
 * Updated to match the same structural pattern as RC and ML beats:
 * Container card → PresenterBar (avatar + speech bubble) → Animation content
 */

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ArrowRight, Search, Eye, EyeOff, Layers3, Sparkles, Users, Target, Zap, MessageSquare, BarChart3, BrainCircuit, LayoutDashboard, BookOpen, PanelLeft, Grid3X3, Code2, FlaskConical, Shield, Bug, UserCircle2 } from 'lucide-react'
import { withHexAlpha } from '@/lib/color-utils'
import PresenterBar from './PresenterBar'
import { EASE_CINEMATIC as ease } from '@/lib/motion'

const BEAT_PACE = 1.58
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

/* Inline SVG illustrations for the three buried features */
function NLQIllustration() {
 return (
 <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
 {/* Chat bubble with question mark */}
 <rect x="10" y="16" width="60" height="40" rx="8" stroke="var(--cs-accent)" strokeWidth="1.5" opacity="0.4" />
 <path d="M26 48 L20 58 L32 48" stroke="var(--cs-accent)" strokeWidth="1.5" opacity="0.4" />
 {/* Question mark */}
 <text x="40" y="42" textAnchor="middle" fill="var(--cs-accent)" fontSize="22" fontFamily="monospace" opacity="0.7">?</text>
 {/* Tiny sparkles near top */}
 <circle cx="58" cy="20" r="1.5" fill="var(--cs-accent)" opacity="0.5" />
 <circle cx="62" cy="24" r="1" fill="var(--cs-accent)" opacity="0.3" />
 {/* Strike-through line — hidden */}
 <m.line x1="8" y1="70" x2="72" y2="70" stroke="var(--cs-accent)" strokeWidth="1" opacity="0.15" strokeDasharray="3,5" animate={{ x2: [60, 72, 60] }} transition={{ duration: 3, repeat: Infinity }} />
 </svg>
 )
}

function InsightsIllustration() {
 return (
 <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
 {/* Bar chart */}
 <rect x="14" y="50" width="10" height="18" rx="2" fill="var(--cs-accent)" opacity="0.25" />
 <rect x="28" y="38" width="10" height="30" rx="2" fill="var(--cs-accent)" opacity="0.35" />
 <rect x="42" y="28" width="10" height="40" rx="2" fill="var(--cs-accent)" opacity="0.45" />
 <rect x="56" y="20" width="10" height="48" rx="2" fill="var(--cs-accent)" opacity="0.55" />
 {/* Trend line */}
 <m.path d="M19 48 L33 36 L47 26 L61 18" stroke="var(--cs-accent)" strokeWidth="1.5" opacity="0.6" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} />
 {/* Eye icon at top */}
 <circle cx="40" cy="12" r="4" stroke="var(--cs-accent)" strokeWidth="1" opacity="0.3" fill="none" />
 <circle cx="40" cy="12" r="1.5" fill="var(--cs-accent)" opacity="0.3" />
 </svg>
 )
}

function MLIllustration() {
 return (
 <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
 {/* Brain/Neural network nodes */}
 <circle cx="40" cy="18" r="5" stroke="var(--cs-accent)" strokeWidth="1.2" opacity="0.5" fill="none" />
 <circle cx="22" cy="40" r="5" stroke="var(--cs-accent)" strokeWidth="1.2" opacity="0.4" fill="none" />
 <circle cx="58" cy="40" r="5" stroke="var(--cs-accent)" strokeWidth="1.2" opacity="0.4" fill="none" />
 <circle cx="30" cy="62" r="5" stroke="var(--cs-accent)" strokeWidth="1.2" opacity="0.35" fill="none" />
 <circle cx="50" cy="62" r="5" stroke="var(--cs-accent)" strokeWidth="1.2" opacity="0.35" fill="none" />
 {/* Connections */}
 <line x1="40" y1="23" x2="22" y2="35" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.25" />
 <line x1="40" y1="23" x2="58" y2="35" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.25" />
 <line x1="22" y1="45" x2="30" y2="57" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.25" />
 <line x1="58" y1="45" x2="50" y2="57" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.25" />
 <line x1="22" y1="45" x2="50" y2="57" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.15" />
 <line x1="58" y1="45" x2="30" y2="57" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.15" />
 {/* Pulse dot */}
 <m.circle cx="40" cy="18" r={2} fill="var(--cs-accent)" opacity={0.6} initial={{ r: 2, opacity: 0.6 }} animate={{ r: [2, 3.5, 2], opacity: [0.6, 0.2, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
 </svg>
 )
}

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
 { name: 'NLQ', label: 'Ask questions in plain English', icon: <NLQIllustration />, color: 'var(--cs-accent)' },
 { name: 'Insights', label: 'Auto-generated visualizations', icon: <InsightsIllustration />, color: 'var(--cs-accent)' },
 { name: 'ML', label: 'Predictive model training', icon: <MLIllustration />, color: 'var(--cs-accent)' },
 ]

 return (
 <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
 <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 overflow-hidden">
 <div className="px-6 md:px-10 py-8 md:py-12">

 {/* Speech bubble */}
 <m.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
 transition={{ duration: 0.8, ease }}
 >
 <PresenterBar>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 Three AI features — <span className="text-zinc-200 font-medium">NLQ, Insights, ML</span> — buried in different menus. All shipping. None legacy. <span className="text-zinc-300 font-bold">Near-zero adoption.</span> The problem wasn&apos;t quality — it was discoverability.
 </p>
 </PresenterBar>
 </m.div>

 {/* Three illustrated feature cards */}
 <AnimatePresence>
 {step >= 1 && (
 <m.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, ease }}
 className="flex flex-wrap items-stretch justify-center gap-4 md:gap-5 mt-8"
 >
 {features.map((feat, i) => (
 <m.div
 key={feat.name}
 initial={{ opacity: 0, y: 25, scale: 0.85 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 transition={{ delay: i * 0.15, duration: 0.6, ease }}
 className="w-44 md:w-56 rounded-xl border p-4 text-center relative overflow-hidden group"
 style={{
 borderColor: withHexAlpha(feat.color, '25'),
 background: withHexAlpha(feat.color, '05'),
 }}
 >
 {/* Large SVG illustration */}
 <div className="w-28 h-28 md:w-32 md:h-32 mx-auto mb-3">
 {feat.icon}
 </div>
 {/* Hidden eye overlay */}
 <m.div
 className="absolute inset-0 flex items-center justify-center bg-zinc-950/60 "
 initial={{ opacity: 0 }}
 animate={{ opacity: [0, 0.7, 0.5] }}
 transition={{ delay: 0.8 + i * 0.15, duration: 1, ease }}
 >
 <EyeOff className="h-6 w-6 text-zinc-400" strokeWidth={1.5} />
 </m.div>
 <span className="font-mono text-sm font-bold block" style={{ color: feat.color }}>{feat.name}</span>
 <p className="text-[11px] text-zinc-400 leading-snug mt-1">{feat.label}</p>
 </m.div>
 ))}
 </m.div>
 )}
 </AnimatePresence>

 {/* Stats */}
 <AnimatePresence>
 {step >= 2 && (
 <m.div
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
 <div className="text-2xl md:text-3xl font-bold text-[var(--cs-accent)] font-mono">{stat.val}</div>
 <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</div>
 </div>
 ))}
 </m.div>
 )}
 </AnimatePresence>

 </div>
 </div>
 </div>
 )
}


/* ═════════════════════════════════════════════════
 BEAT 2: "THE STRATEGIC SPARK"
 How the Hub idea was born — with scene illustrations
 ═════════════════════════════════════════════════ */

/* SVG: Three silhouettes around a round table — co-creation */
function SceneTeamVision() {
 return (
 <svg viewBox="0 0 48 40" fill="none" className="w-full h-full">
 <ellipse cx="24" cy="28" rx="14" ry="5" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.3" />
 {/* Person left */}
 <circle cx="12" cy="16" r="3" fill="var(--cs-accent)" opacity="0.2" />
 <path d="M7 26 C7 22, 9 20, 12 20 C15 20, 17 22, 17 26" fill="var(--cs-accent)" opacity="0.15" />
 {/* Person center */}
 <circle cx="24" cy="14" r="3.5" fill="var(--cs-accent)" opacity="0.25" />
 <path d="M19 26 C19 21, 21 19, 24 19 C27 19, 29 21, 29 26" fill="var(--cs-accent)" opacity="0.2" />
 {/* Person right */}
 <circle cx="36" cy="16" r="3" fill="var(--cs-accent)" opacity="0.2" />
 <path d="M31 26 C31 22, 33 20, 36 20 C39 20, 41 22, 41 26" fill="var(--cs-accent)" opacity="0.15" />
 {/* Idea spark */}
 <m.circle cx="24" cy="8" r={1.5} fill="var(--cs-accent)" opacity={0.5} initial={{ r: 1.5, opacity: 0.5 }} animate={{ opacity: [0.5, 0.15, 0.5], r: [1.5, 2.5, 1.5] }} transition={{ duration: 2, repeat: Infinity }} />
 </svg>
 )
}

/* SVG: A wireframe sheet with layout blocks — design work */
function SceneDesignFit() {
 return (
 <svg viewBox="0 0 48 40" fill="none" className="w-full h-full">
 <rect x="8" y="4" width="32" height="32" rx="3" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.3" />
 {/* Header bar */}
 <rect x="10" y="6" width="28" height="4" rx="1" fill="var(--cs-accent)" opacity="0.15" />
 {/* Sidebar */}
 <rect x="10" y="12" width="8" height="22" rx="1.5" fill="var(--cs-accent)" opacity="0.1" />
 {/* Content tiles — the IQ panel fitting in */}
 <rect x="20" y="12" width="18" height="10" rx="2" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.4" fill="var(--cs-accent)" fillOpacity="0.08" />
 <rect x="20" y="24" width="8" height="10" rx="1.5" fill="var(--cs-accent)" opacity="0.1" />
 <rect x="30" y="24" width="8" height="10" rx="1.5" fill="var(--cs-accent)" opacity="0.1" />
 {/* Arrow pointing to the fitted panel */}
 <m.path d="M42 17 L46 17" stroke="var(--cs-accent)" strokeWidth="1" opacity="0.5" animate={{ x: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
 </svg>
 )
}

/* SVG: Stack of mockup pages — dozens of concepts */
function SceneMockups() {
 return (
 <svg viewBox="0 0 48 40" fill="none" className="w-full h-full">
 {/* Stacked pages */}
 <rect x="14" y="8" width="24" height="28" rx="2" fill="var(--cs-accent)" fillOpacity="0.06" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.15" />
 <rect x="12" y="6" width="24" height="28" rx="2" fill="var(--cs-accent)" fillOpacity="0.08" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.2" />
 <rect x="10" y="4" width="24" height="28" rx="2" fill="var(--cs-accent)" fillOpacity="0.1" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.3" />
 {/* Content lines on top page */}
 <rect x="13" y="8" width="14" height="2" rx="0.5" fill="var(--cs-accent)" opacity="0.2" />
 <rect x="13" y="12" width="18" height="1.5" rx="0.5" fill="var(--cs-accent)" opacity="0.12" />
 <rect x="13" y="15" width="16" height="1.5" rx="0.5" fill="var(--cs-accent)" opacity="0.1" />
 {/* Mini wireframe blocks */}
 <rect x="13" y="19" width="8" height="6" rx="1" fill="var(--cs-accent)" opacity="0.12" />
 <rect x="23" y="19" width="8" height="6" rx="1" fill="var(--cs-accent)" opacity="0.1" />
 {/* Count badge */}
 <circle cx="38" cy="8" r="5" fill="var(--cs-accent)" opacity="0.2" />
 <text x="38" y="10" textAnchor="middle" fill="var(--cs-accent)" fontSize="6" fontFamily="monospace" opacity="0.6">24</text>
 </svg>
 )
}

/* SVG: VP stamp of approval — checkmark in a seal */
function SceneApproval() {
 return (
 <svg viewBox="0 0 48 40" fill="none" className="w-full h-full">
 {/* Approval seal circle */}
 <circle cx="24" cy="20" r="14" stroke="var(--cs-accent)" strokeWidth="1" opacity="0.3" />
 <circle cx="24" cy="20" r="11" stroke="var(--cs-accent)" strokeWidth="0.5" opacity="0.2" strokeDasharray="2,2" />
 {/* Checkmark */}
 <m.path d="M17 20 L22 25 L31 15" stroke="var(--cs-accent)" strokeWidth="2" opacity="0.6" fill="none" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }} />
 {/* VP text */}
 <text x="24" y="35" textAnchor="middle" fill="var(--cs-accent)" fontSize="5" fontFamily="monospace" opacity="0.4">APPROVED</text>
 </svg>
 )
}

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
 { label: 'Team vision takes shape', scene: <SceneTeamVision />, color: 'var(--cs-accent)' },
 { label: 'I designed how it fits the Hub', scene: <SceneDesignFit />, color: 'var(--cs-accent)' },
 { label: 'Dozens of concept mockups', scene: <SceneMockups />, color: 'var(--cs-accent)' },
 { label: 'PM pitches. VP approves.', scene: <SceneApproval />, color: 'var(--cs-accent)' },
 ]

 return (
 <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
 <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 overflow-hidden">
 <div className="px-6 md:px-10 py-8 md:py-12">

 <m.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
 transition={{ duration: 0.8, ease }}
 >
 <PresenterBar>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 The Hub was <span className="text-zinc-200 font-medium">co-created</span> — my PM, Director of Design, and Head PM. The <span className="text-[var(--cs-accent)] font-bold">entire IQ architecture was conceptualized by me</span> — how it fits the existing Hub, the interactions, the visual design. PM pitched. VP approved.
 </p>
 </PresenterBar>
 </m.div>

 {/* Timeline with scene illustrations */}
 <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto mt-6">
 {timeline.map((item, i) => (
 <AnimatePresence key={item.label}>
 {step >= i + 1 && (
 <m.div
 initial={{ opacity: 0, x: -20, scale: 0.9 }}
 animate={{ opacity: 1, x: 0, scale: 1 }}
 transition={{ duration: 0.5, ease }}
 className="w-full flex items-center gap-3 rounded-xl border px-4 py-3"
 style={{
 borderColor: withHexAlpha(item.color, '30'),
 background: withHexAlpha(item.color, '06'),
 }}
 >
 <div className="w-16 h-14 flex-shrink-0">
 {item.scene}
 </div>
 <span className="text-sm text-zinc-200 text-left">{item.label}</span>
 {i === timeline.length - 1 && (
 <m.span
 initial={{ scale: 0 }}
 animate={{ scale: 1 }}
 transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
 className="ml-auto text-[var(--cs-accent)] text-xs font-mono font-bold"
 >
 ✓ GO
 </m.span>
 )}
 </m.div>
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
 <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
 <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 overflow-hidden">
 <div className="px-6 md:px-10 py-8 md:py-12">

 <m.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
 transition={{ duration: 0.8, ease }}
 >
 <PresenterBar>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 Before building the Hub, I modernized each feature. NLQ upgraded from simple SQL queries to <span className="text-[var(--cs-accent)] font-bold">Microsoft&apos;s Phi-3 SLM</span> — question suggestions, chart switching, ambiguity correction.
 </p>
 </PresenterBar>
 </m.div>

 {/* Before → After transition */}
 <AnimatePresence mode="wait">
 {step < 2 ? (
 <m.div
 key="before"
 initial={{ opacity: 0, y: 18 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -14, scale: 0.96 }}
 transition={{ duration: 0.62, ease }}
 className="w-full max-w-lg mx-auto text-center mt-6"
 >
 <p className="mb-4 font-mono text-xs tracking-[0.3em] text-zinc-400 uppercase">Before — Simple SQL Queries</p>
 <div className="mx-auto max-w-sm rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
 <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 mb-3">
 <Search className="h-3.5 w-3.5 text-zinc-500" />
 <span className="font-mono text-[10px] text-zinc-500">Enter a question...</span>
 </div>
 <m.div
 animate={{ opacity: [0.4, 1, 0.4] }}
 transition={{ duration: 1.5, repeat: Infinity }}
 className="text-xs text-zinc-400 text-left space-y-2"
 >
 <div className="rounded bg-white/[0.03] px-3 py-2 font-mono text-[11px] text-zinc-500">show me sales data</div>
 <div className="text-zinc-500 text-[10px] px-1">No suggestions. No chart options. No ambiguity handling.</div>
 </m.div>
 </div>
 <p className="mt-4 font-mono text-xs text-zinc-400">Basic SQL queries. No intelligence. Limited results.</p>
 </m.div>
 ) : (
 <m.div
 key="after"
 initial={{ opacity: 0, y: 14, scale: 0.94 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 transition={{ duration: 0.75, ease }}
 className="w-full max-w-lg mx-auto text-center mt-6"
 >
 <p className="mb-4 font-mono text-xs tracking-[0.3em] text-[var(--cs-accent)] uppercase">After — Phi-3 SLM Powered</p>
 <div className="mx-auto max-w-sm rounded-xl border border-[color-mix(in_srgb,var(--cs-accent),transparent_80%)] bg-[color-mix(in_srgb,var(--cs-accent),transparent_96%)] p-4">
 <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 mb-3">
 <Search className="h-3.5 w-3.5 text-[var(--cs-accent)]" />
 <span className="font-mono text-[10px] text-zinc-200">Ask anything about your data...</span>
 </div>
 <div className="space-y-2">
 {['What were last month\'s top products?', 'Show revenue by region', 'Compare Q1 vs Q2 sales'].map((q, i) => (
 <m.div
 key={q}
 initial={{ opacity: 0, x: -10 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.2 + i * 0.12, duration: 0.4, ease }}
 className="flex items-center gap-2 rounded-lg bg-[color-mix(in_srgb,var(--cs-accent),transparent_94%)] px-3 py-2 text-left"
 >
 <Sparkles className="h-3 w-3 text-[var(--cs-accent)] flex-shrink-0" />
 <span className="text-[11px] text-zinc-200">{q}</span>
 </m.div>
 ))}
 </div>
 </div>
 <p className="mt-4 font-mono text-xs text-[var(--cs-accent)] opacity-70">Suggested queries. Conversational errors. Clear results.</p>
 </m.div>
 )}
 </AnimatePresence>

 </div>
 </div>
 </div>
 )
}


/* ═════════════════════════════════════════════════
 BEAT 4: "ARCHITECTURE BEFORE TICKETS"
 Hub integration — with architectural SVG diagrams
 ═════════════════════════════════════════════════ */

/* Mini app icon SVGs for scattered state */
function MiniNLQ() {
 return (
 <svg viewBox="0 0 32 32" fill="none" className="w-12 h-12 mx-auto mb-1">
 <rect x="4" y="6" width="24" height="16" rx="4" stroke="var(--cs-accent)" strokeWidth="1" opacity="0.4" />
 <path d="M10 20 L7 24 L14 20" stroke="var(--cs-accent)" strokeWidth="1" opacity="0.4" />
 <text x="16" y="17" textAnchor="middle" fill="var(--cs-accent)" fontSize="10" fontFamily="monospace" opacity="0.5">?</text>
 </svg>
 )
}

function MiniInsights() {
 return (
 <svg viewBox="0 0 32 32" fill="none" className="w-12 h-12 mx-auto mb-1">
 <rect x="6" y="18" width="5" height="8" rx="1" fill="var(--cs-accent)" opacity="0.2" />
 <rect x="13" y="12" width="5" height="14" rx="1" fill="var(--cs-accent)" opacity="0.3" />
 <rect x="20" y="8" width="5" height="18" rx="1" fill="var(--cs-accent)" opacity="0.4" />
 <circle cx="16" cy="6" r="2" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.3" fill="none" />
 </svg>
 )
}

function MiniML() {
 return (
 <svg viewBox="0 0 32 32" fill="none" className="w-12 h-12 mx-auto mb-1">
 <circle cx="16" cy="8" r="3" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.4" fill="none" />
 <circle cx="8" cy="20" r="3" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.3" fill="none" />
 <circle cx="24" cy="20" r="3" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.3" fill="none" />
 <line x1="16" y1="11" x2="8" y2="17" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.2" />
 <line x1="16" y1="11" x2="24" y2="17" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.2" />
 <line x1="8" y1="23" x2="24" y2="23" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.15" />
 </svg>
 )
}

/* Hub wireframe SVG for the unified state */
function HubDiagramSVG() {
 return (
 <svg viewBox="0 0 200 120" fill="none" className="w-full h-full max-w-md mx-auto">
 {/* Central hub node */}
 <rect x="65" y="35" width="70" height="50" rx="10" stroke="var(--cs-accent)" strokeWidth="1.2" opacity="0.5" />
 <text x="100" y="55" textAnchor="middle" fill="var(--cs-accent)" fontSize="10" fontFamily="monospace" opacity="0.6">DSML Hub</text>
 {/* Feature tiles inside hub */}
 <rect x="72" y="62" width="16" height="16" rx="3" fill="var(--cs-accent)" fillOpacity="0.12" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.4" />
 <rect x="92" y="62" width="16" height="16" rx="3" fill="var(--cs-accent)" fillOpacity="0.12" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.4" />
 <rect x="112" y="62" width="16" height="16" rx="3" fill="var(--cs-accent)" fillOpacity="0.12" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.4" />
 {/* Tiny icons inside tiles */}
 <text x="80" y="74" textAnchor="middle" fill="var(--cs-accent)" fontSize="7" fontFamily="monospace" opacity="0.5">?</text>
 <rect x="96" y="67" width="3" height="7" rx="0.5" fill="var(--cs-accent)" opacity="0.3" />
 <rect x="100" y="65" width="3" height="9" rx="0.5" fill="var(--cs-accent)" opacity="0.35" />
 <circle cx="120" cy="70" r="2.5" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.35" fill="none" />
 {/* Connection lines from outside to hub */}
 <m.line x1="20" y1="20" x2="65" y2="45" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.2" strokeDasharray="3,3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
 <m.line x1="180" y1="20" x2="135" y2="45" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.2" strokeDasharray="3,3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.15, duration: 0.8 }} />
 <m.line x1="100" y1="110" x2="100" y2="85" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.2" strokeDasharray="3,3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.8 }} />
 {/* Source labels */}
 <text x="16" y="16" textAnchor="middle" fill="var(--cs-accent)" fontSize="6" fontFamily="monospace" opacity="0.35">NLQ</text>
 <text x="184" y="16" textAnchor="middle" fill="var(--cs-accent)" fontSize="6" fontFamily="monospace" opacity="0.35">Insights</text>
 <text x="100" y="118" textAnchor="middle" fill="var(--cs-accent)" fontSize="6" fontFamily="monospace" opacity="0.35">ML</text>
 </svg>
 )
}

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
 { name: 'NLQ', color: 'var(--cs-accent)', x: 10, y: 25, icon: <MiniNLQ /> },
 { name: 'Insights', color: 'var(--cs-accent)', x: 75, y: 20, icon: <MiniInsights /> },
 { name: 'ML', color: 'var(--cs-accent)', x: 42, y: 70, icon: <MiniML /> },
 ]

 return (
 <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
 <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 overflow-hidden">
 <div className="px-6 md:px-10 py-8 md:py-12">

 <m.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
 transition={{ duration: 0.8, ease }}
 >
 <PresenterBar>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 I defined the architecture <span className="text-zinc-200 font-medium">before any tickets existed</span>. PM wrote tickets after seeing my mockups. Three scattered tools became <span className="text-[var(--cs-accent)] font-bold">one unified DSML Hub</span> — no new infrastructure.
 </p>
 </PresenterBar>
 </m.div>

 {/* Scattered → Unified animation */}
 <AnimatePresence mode="wait">
 {step < 2 ? (
 <m.div
 key="scattered"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0, scale: 0.9 }}
 transition={{ duration: 0.5, ease }}
 className="relative w-full max-w-md mx-auto h-44 mt-6"
 >
 <p className="absolute -top-1 left-0 right-0 font-mono text-xs text-zinc-400 uppercase tracking-wider text-center">3 scattered tools</p>
 {features.map((f, i) => (
 <m.div
 key={f.name}
 initial={{ opacity: 0, scale: 0 }}
 animate={step >= 1 ? { opacity: 1, scale: 1 } : {}}
 transition={{ delay: i * 0.15, duration: 0.5, type: 'spring', stiffness: 200 }}
 className="absolute rounded-xl border text-center p-2"
 style={{
 left: `${f.x}%`,
 top: `${f.y}%`,
 borderColor: withHexAlpha(f.color, '35'),
 background: withHexAlpha(f.color, '10'),
 transform: 'translate(-50%, -50%)',
 }}
 >
 {f.icon}
 <span className="font-mono text-xs font-bold block" style={{ color: f.color }}>{f.name}</span>
 </m.div>
 ))}

 <AnimatePresence>
 {step >= 1 && (
 <m.svg
 initial={{ opacity: 0 }}
 animate={{ opacity: 0.15 }}
 className="absolute inset-0 w-full h-full"
 viewBox="0 0 100 100"
 preserveAspectRatio="none"
 >
 {[[10, 25, 75, 20], [75, 20, 42, 70], [10, 25, 42, 70]].map(([x1, y1, x2, y2], idx) => (
 <m.line
 key={idx}
 x1={x1} y1={y1} x2={x2} y2={y2}
 stroke="var(--cs-accent)"
 strokeWidth="0.3"
 strokeDasharray="2,2"
 initial={{ pathLength: 0 }}
 animate={{ pathLength: 1 }}
 transition={{ delay: idx * 0.1, duration: 0.5 }}
 />
 ))}
 </m.svg>
 )}
 </AnimatePresence>
 </m.div>
 ) : (
 <m.div
 key="unified"
 initial={{ opacity: 0, scale: 0.86 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.75, ease }}
 className="w-full max-w-md mx-auto text-center mt-6"
 >
 <p className="mb-4 font-mono text-xs text-[var(--cs-accent)] uppercase tracking-wider">1 unified Hub</p>
 {/* Hub architecture diagram SVG */}
 <div className="h-32 mb-4">
 <HubDiagramSVG />
 </div>

 {step >= 3 && (
 <m.div
 initial={{ opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, ease }}
 className="flex justify-center gap-8 mt-2"
 >
 <div className="text-center">
 <div className="text-lg font-bold text-[var(--cs-accent)] font-mono">0</div>
 <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">New infra</div>
 </div>
 <div className="text-center">
 <div className="text-lg font-bold text-[var(--cs-accent)] font-mono">1</div>
 <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Learning curve</div>
 </div>
 <div className="text-center">
 <div className="text-lg font-bold text-[var(--cs-accent)] font-mono">100%</div>
 <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Responsive</div>
 </div>
 </m.div>
 )}
 </m.div>
 )}
 </AnimatePresence>

 </div>
 </div>
 </div>
 )
}


/* ═════════════════════════════════════════════════
 BEAT 5: "FOUR ITERATIONS"
 V1 → V2 → V3 → V4 (Landed) — with wireframe thumbnails
 ═════════════════════════════════════════════════ */

/* Miniature wireframe SVGs for each iteration layout */
function WireframeV1() {
 return (
 <svg viewBox="0 0 56 40" fill="none" className="w-full h-full">
 {/* Tabbed dashboard — dense tabs at top, crowded grid below */}
 <rect x="2" y="2" width="52" height="36" rx="3" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
 {/* Tabs */}
 <rect x="4" y="4" width="12" height="4" rx="1" fill="currentColor" opacity="0.25" />
 <rect x="18" y="4" width="12" height="4" rx="1" fill="currentColor" opacity="0.15" />
 <rect x="32" y="4" width="12" height="4" rx="1" fill="currentColor" opacity="0.15" />
 {/* Dense grid of cards */}
 <rect x="4" y="10" width="15" height="10" rx="1.5" fill="currentColor" opacity="0.12" />
 <rect x="21" y="10" width="15" height="10" rx="1.5" fill="currentColor" opacity="0.12" />
 <rect x="38" y="10" width="15" height="10" rx="1.5" fill="currentColor" opacity="0.12" />
 <rect x="4" y="22" width="15" height="10" rx="1.5" fill="currentColor" opacity="0.08" />
 <rect x="21" y="22" width="15" height="10" rx="1.5" fill="currentColor" opacity="0.08" />
 <rect x="38" y="22" width="15" height="10" rx="1.5" fill="currentColor" opacity="0.08" />
 {/* X mark for rejection */}
 <line x1="42" y1="30" x2="50" y2="36" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
 <line x1="50" y1="30" x2="42" y2="36" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
 </svg>
 )
}

function WireframeV2() {
 return (
 <svg viewBox="0 0 56 40" fill="none" className="w-full h-full">
 {/* Educational layout — big text, step-by-step */}
 <rect x="2" y="2" width="52" height="36" rx="3" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
 {/* Large heading area */}
 <rect x="8" y="6" width="28" height="3" rx="1" fill="currentColor" opacity="0.2" />
 <rect x="8" y="11" width="40" height="2" rx="0.5" fill="currentColor" opacity="0.1" />
 <rect x="8" y="14" width="36" height="2" rx="0.5" fill="currentColor" opacity="0.1" />
 {/* Step indicators */}
 <circle cx="12" cy="22" r="3" fill="currentColor" opacity="0.15" />
 <rect x="18" y="21" width="20" height="2" rx="0.5" fill="currentColor" opacity="0.1" />
 <circle cx="12" cy="29" r="3" fill="currentColor" opacity="0.1" />
 <rect x="18" y="28" width="18" height="2" rx="0.5" fill="currentColor" opacity="0.08" />
 {/* X for rejection */}
 <line x1="42" y1="30" x2="50" y2="36" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
 <line x1="50" y1="30" x2="42" y2="36" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
 </svg>
 )
}

function WireframeV3() {
 return (
 <svg viewBox="0 0 56 40" fill="none" className="w-full h-full">
 {/* Sidebar navigation — sidebar + content area */}
 <rect x="2" y="2" width="52" height="36" rx="3" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
 {/* Sidebar */}
 <rect x="3" y="3" width="14" height="34" rx="2" fill="currentColor" opacity="0.1" />
 <rect x="5" y="7" width="10" height="2" rx="0.5" fill="currentColor" opacity="0.2" />
 <rect x="5" y="12" width="10" height="2" rx="0.5" fill="currentColor" opacity="0.15" />
 <rect x="5" y="17" width="10" height="2" rx="0.5" fill="currentColor" opacity="0.12" />
 <rect x="5" y="22" width="10" height="2" rx="0.5" fill="currentColor" opacity="0.1" />
 {/* Content */}
 <rect x="20" y="6" width="30" height="12" rx="2" fill="currentColor" opacity="0.08" />
 <rect x="20" y="20" width="30" height="12" rx="2" fill="currentColor" opacity="0.06" />
 {/* X for rejection */}
 <line x1="42" y1="30" x2="50" y2="36" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
 <line x1="50" y1="30" x2="42" y2="36" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
 </svg>
 )
}

function WireframeV4() {
 return (
 <svg viewBox="0 0 56 40" fill="none" className="w-full h-full">
 {/* Icon tiles — clean 3-tile grid */}
 <rect x="2" y="2" width="52" height="36" rx="3" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
 {/* Three beautiful icon tiles */}
 <rect x="5" y="8" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="0.8" opacity="0.5" fill="currentColor" fillOpacity="0.08" />
 <rect x="21" y="8" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="0.8" opacity="0.5" fill="currentColor" fillOpacity="0.08" />
 <rect x="37" y="8" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="0.8" opacity="0.5" fill="currentColor" fillOpacity="0.08" />
 {/* Icons inside tiles */}
 <circle cx="12" cy="15" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.6" fill="none" />
 <circle cx="28" cy="15" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.6" fill="none" />
 <circle cx="44" cy="15" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.6" fill="none" />
 {/* Labels under icons */}
 <rect x="7" y="21" width="10" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
 <rect x="23" y="21" width="10" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
 <rect x="39" y="21" width="10" height="2" rx="0.5" fill="currentColor" opacity="0.3" />
 {/* Checkmark */}
 <m.path d="M40 30 L44 34 L52 26" stroke="currentColor" strokeWidth="1.5" opacity="0.7" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }} />
 </svg>
 )
}

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
 { version: 'V1', verdict: 'TOO DENSE', desc: 'Tabbed dashboard', color: 'var(--overlay-white-40)', wireframe: <WireframeV1 />, rejected: true },
 { version: 'V2', verdict: 'TOO PASSIVE', desc: 'Educational layout', color: 'var(--overlay-white-40)', wireframe: <WireframeV2 />, rejected: true },
 { version: 'V3', verdict: 'COMPETING', desc: 'Sidebar navigation', color: 'var(--overlay-white-40)', wireframe: <WireframeV3 />, rejected: true },
 { version: 'V4', verdict: 'LANDED', desc: 'Icon tiles', color: 'var(--cs-accent)', wireframe: <WireframeV4 />, rejected: false },
 ]

 return (
 <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
 <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 overflow-hidden">
 <div className="px-6 md:px-10 py-8 md:py-12">

 <m.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
 transition={{ duration: 0.8, ease }}
 >
 <PresenterBar>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 Four distinct iterations. V1 too dense. V2 too passive. V3 competed with Hub navigation. <span className="text-[var(--cs-accent)] font-bold">V4 — clean icon tiles — landed.</span>
 </p>
 </PresenterBar>
 </m.div>

 {/* Iteration cards with wireframe thumbnails */}
 <div className="flex items-center justify-center gap-2 md:gap-4 mt-6">
 {iterations.map((iter, i) => (
 <m.div
 key={iter.version}
 initial={{ opacity: 0, y: 30, scale: 0.9 }}
 animate={step >= i + 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
 transition={{ duration: 0.6, ease }}
 className="relative"
 >
 <div
 className="w-28 md:w-36 rounded-xl border flex flex-col items-center text-center p-2 pt-3"
 style={{
 borderColor: withHexAlpha(iter.color, '30'),
 background: withHexAlpha(iter.color, '08'),
 }}
 >
 {/* Wireframe thumbnail */}
 <div className="w-full h-20 md:h-24 mb-2" style={{ color: iter.color }}>
 {iter.wireframe}
 </div>
 <span className="text-base md:text-lg font-bold font-mono" style={{ color: iter.color }}>
 {iter.version}
 </span>
 <span
 className="text-[9px] md:text-[10px] font-mono tracking-wider mt-0.5 uppercase font-bold"
 style={{ color: iter.color }}
 >
 {iter.verdict}
 </span>
 <span className="text-[10px] text-zinc-400 mt-0.5 mb-1">{iter.desc}</span>
 </div>

 {i < iterations.length - 1 && (
 <m.div
 initial={{ opacity: 0 }}
 animate={step >= i + 2 ? { opacity: 0.3 } : {}}
 className="absolute -right-1.5 md:-right-2.5 top-1/2 -translate-y-1/2"
 >
 <ArrowRight className="w-2.5 h-2.5 text-zinc-200" />
 </m.div>
 )}
 </m.div>
 ))}
 </div>

 </div>
 </div>
 </div>
 )
}


/* ═════════════════════════════════════════════════
 BEAT 6: "THE NAVIGATION FIGHT"
 List views vs. Icon tiles — with SVG wireframes
 ═════════════════════════════════════════════════ */

/* SVG wireframe: Traditional list view — items buried in a sidebar */
function ListViewWireframe() {
 return (
 <svg viewBox="0 0 160 120" fill="none" className="w-full h-full">
 {/* App shell */}
 <rect x="4" y="4" width="152" height="112" rx="6" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
 {/* Top nav bar */}
 <rect x="6" y="6" width="148" height="12" rx="3" fill="currentColor" opacity="0.06" />
 <rect x="10" y="10" width="24" height="4" rx="1" fill="currentColor" opacity="0.12" />
 {/* Sidebar */}
 <rect x="6" y="20" width="38" height="94" rx="3" fill="currentColor" opacity="0.04" />
 {/* Nav items — small, buried, barely visible */}
 {[28, 38, 48, 58, 68, 78, 88, 98].map((y, i) => (
 <g key={y} opacity={i < 3 ? 0.2 : 0.08}>
 <circle cx="14" cy={y} r="2" fill="currentColor" />
 <rect x="20" y={y - 2} width={18 + (i % 3) * 4} height="3" rx="0.5" fill="currentColor" />
 </g>
 ))}
 {/* The 3 AI features buried as tiny items */}
 <rect x="9" y="44" width="32" height="12" rx="2" stroke="currentColor" strokeWidth="0.5" opacity="0.15" strokeDasharray="2,2" />
 {/* Content area — mostly empty */}
 <rect x="48" y="20" width="106" height="94" rx="3" fill="currentColor" opacity="0.02" />
 <rect x="60" y="50" width="80" height="4" rx="1" fill="currentColor" opacity="0.05" />
 <rect x="60" y="58" width="60" height="4" rx="1" fill="currentColor" opacity="0.04" />
 {/* "Buried" annotation */}
 <text x="80" y="84" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.15">Features buried here</text>
 {/* X mark */}
 <line x1="130" y1="96" x2="142" y2="108" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
 <line x1="142" y1="96" x2="130" y2="108" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
 </svg>
 )
}

/* SVG wireframe: Icon tiles — large, prominent, immediate context */
function TileViewWireframe() {
 return (
 <svg viewBox="0 0 160 120" fill="none" className="w-full h-full">
 {/* App shell */}
 <rect x="4" y="4" width="152" height="112" rx="6" stroke="var(--cs-accent)" strokeWidth="1" opacity="0.35" />
 {/* Top nav bar */}
 <rect x="6" y="6" width="148" height="12" rx="3" fill="var(--cs-accent)" fillOpacity="0.06" />
 <rect x="10" y="10" width="24" height="4" rx="1" fill="var(--cs-accent)" opacity="0.15" />
 {/* Three large icon tiles — prominent and clear */}
 <rect x="12" y="28" width="42" height="56" rx="6" stroke="var(--cs-accent)" strokeWidth="1" opacity="0.45" fill="var(--cs-accent)" fillOpacity="0.06" />
 <rect x="59" y="28" width="42" height="56" rx="6" stroke="var(--cs-accent)" strokeWidth="1" opacity="0.45" fill="var(--cs-accent)" fillOpacity="0.06" />
 <rect x="106" y="28" width="42" height="56" rx="6" stroke="var(--cs-accent)" strokeWidth="1" opacity="0.45" fill="var(--cs-accent)" fillOpacity="0.06" />
 {/* Icons inside tiles — chat, chart, brain */}
 {/* Ask tile */}
 <rect x="24" y="40" width="18" height="12" rx="3" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.4" />
 <text x="33" y="50" textAnchor="middle" fill="var(--cs-accent)" fontSize="8" fontFamily="monospace" opacity="0.5">?</text>
 <rect x="22" y="58" width="22" height="3" rx="1" fill="var(--cs-accent)" opacity="0.25" />
 <text x="33" y="68" textAnchor="middle" fill="var(--cs-accent)" fontSize="6" fontFamily="monospace" opacity="0.35">Ask</text>
 {/* Analyze tile */}
 <rect x="67" y="44" width="4" height="8" rx="0.5" fill="var(--cs-accent)" opacity="0.2" />
 <rect x="73" y="40" width="4" height="12" rx="0.5" fill="var(--cs-accent)" opacity="0.3" />
 <rect x="79" y="36" width="4" height="16" rx="0.5" fill="var(--cs-accent)" opacity="0.4" />
 <rect x="69" y="58" width="22" height="3" rx="1" fill="var(--cs-accent)" opacity="0.25" />
 <text x="80" y="68" textAnchor="middle" fill="var(--cs-accent)" fontSize="6" fontFamily="monospace" opacity="0.35">Analyze</text>
 {/* Predict tile */}
 <circle cx="127" cy="44" r="5" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.35" fill="none" />
 <circle cx="120" cy="48" r="3" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.25" fill="none" />
 <line x1="121" y1="46" x2="126" y2="42" stroke="var(--cs-accent)" strokeWidth="0.5" opacity="0.2" />
 <rect x="116" y="58" width="22" height="3" rx="1" fill="var(--cs-accent)" opacity="0.25" />
 <text x="127" y="68" textAnchor="middle" fill="var(--cs-accent)" fontSize="6" fontFamily="monospace" opacity="0.35">Predict</text>
 {/* Subtitle */}
 <text x="80" y="100" textAnchor="middle" fill="var(--cs-accent)" fontSize="6" fontFamily="monospace" opacity="0.3">Immediate context. Zero learning curve.</text>
 {/* Checkmark */}
 <m.path d="M134 96 L140 102 L150 90" stroke="var(--cs-accent)" strokeWidth="1.5" opacity="0.5" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.6 }} />
 </svg>
 )
}

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
 <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
 <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 overflow-hidden">
 <div className="px-6 md:px-10 py-8 md:py-12">

 <m.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
 transition={{ duration: 0.8, ease }}
 >
 <PresenterBar>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 <span className="text-zinc-200 font-medium">Icon tiles vs. list views.</span> Veteran architects wanted traditional lists. My argument: buried list items are exactly what caused poor adoption. <span className="text-[var(--cs-accent)] font-bold">Large tiles give immediate context. I won.</span>
 </p>
 </PresenterBar>
 </m.div>

 {/* List → Tiles transition with SVG wireframes */}
 <AnimatePresence mode="wait">
 {step < 2 ? (
 <m.div
 key="list-view"
 initial={{ opacity: 0, y: 18 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.96 }}
 transition={{ duration: 0.5, ease }}
 className="w-full max-w-lg mx-auto text-center mt-6"
 >
 <p className="mb-3 font-mono text-[10px] text-zinc-400 uppercase tracking-wider">Architects Wanted</p>
 <m.div
 initial={{ opacity: 0 }}
 animate={step >= 1 ? { opacity: 1 } : {}}
 transition={{ duration: 0.6, ease }}
 className="text-zinc-400"
 >
 <ListViewWireframe />
 </m.div>
 </m.div>
 ) : (
 <m.div
 key="tiles-view"
 initial={{ opacity: 0, y: 14, scale: 0.94 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 transition={{ duration: 0.75, ease }}
 className="w-full max-w-lg mx-auto text-center mt-6"
 >
 <p className="mb-3 font-mono text-[10px] text-[var(--cs-accent)] uppercase tracking-wider">What I Designed — &amp; Won</p>
 <TileViewWireframe />

 {step >= 3 && (
 <m.p
 initial={{ opacity: 0, y: 8 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, ease }}
 className="mt-4 text-xs text-[var(--cs-accent)] font-mono opacity-70"
 >
 Outcome-based labels. Immediate context. Zero learning curve.
 </m.p>
 )}
 </m.div>
 )}
 </AnimatePresence>

 </div>
 </div>
 </div>
 )
}


/* ═════════════════════════════════════════════════
 BEAT 7: "THE ROOM FULL OF VETERANS"
 Now with SVG avatar silhouettes for each role
 ═════════════════════════════════════════════════ */

/* SVG avatar silhouette — a generic head/shoulders used for all roles */
function AvatarSilhouette({ accent = false }: { accent?: boolean }) {
 const col = accent ? 'var(--cs-accent)' : 'currentColor'
 return (
 <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
 {/* Head */}
 <circle cx="18" cy="12" r="6" fill={col} opacity={accent ? 0.35 : 0.18} />
 {/* Shoulders */}
 <path d="M6 32 C6 24, 12 20, 18 20 C24 20, 30 24, 30 32" fill={col} opacity={accent ? 0.25 : 0.12} />
 </svg>
 )
}

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
 { role: 'Dir. of Engineering', veteran: true, icon: <Code2 className="h-4 w-4" /> },
 { role: 'Principal Data Scientist', veteran: true, icon: <FlaskConical className="h-4 w-4" /> },
 { role: 'Lead Architect (IQ)', veteran: true, icon: <BrainCircuit className="h-4 w-4" /> },
 { role: 'Lead Architect (WF)', veteran: true, icon: <Layers3 className="h-4 w-4" /> },
 { role: 'Dir. of QA', veteran: true, icon: <Shield className="h-4 w-4" /> },
 { role: 'My PM', veteran: false, note: 'Onboarded together', icon: <UserCircle2 className="h-4 w-4" /> },
 ]

 return (
 <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
 <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 overflow-hidden">
 <div className="px-6 md:px-10 py-8 md:py-12">

 <m.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
 transition={{ duration: 0.8, ease }}
 >
 <PresenterBar>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 Director of Engineering. Principal Data Scientist. Head PM. Lead Architect. <span className="text-zinc-200 font-medium">All decades of tenure.</span> It hit me later — I was 2 years in, and <span className="text-[var(--cs-accent)] font-bold">I was driving the conversation.</span>
 </p>
 </PresenterBar>
 </m.div>

 {/* People grid with avatars */}
 <AnimatePresence>
 {step >= 1 && (
 <m.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, ease }}
 className="grid grid-cols-3 gap-3 max-w-md mx-auto mt-8"
 >
 {people.map((p, i) => (
 <m.div
 key={p.role}
 initial={{ opacity: 0, scale: 0.7, y: 15 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 transition={{ delay: i * 0.12, duration: 0.5, ease }}
 className="rounded-xl border px-3 py-3 text-center flex flex-col items-center gap-1.5"
 style={{
 borderColor: p.veteran
 ? 'color-mix(in srgb, var(--cs-accent), transparent 80%)'
 : 'color-mix(in srgb, var(--cs-accent), transparent 60%)',
 background: p.veteran
 ? 'color-mix(in srgb, var(--cs-accent), transparent 96%)'
 : 'color-mix(in srgb, var(--cs-accent), transparent 92%)',
 }}
 >
 {/* Avatar silhouette */}
 <div className="w-14 h-14 md:w-16 md:h-16">
 <AvatarSilhouette accent={!p.veteran} />
 </div>
 {/* Role icon badge */}
 <span className={`${p.veteran ? 'text-zinc-400' : 'text-[var(--cs-accent)]'}`}>
 {p.icon}
 </span>
 <div className="text-[10px] text-zinc-200 font-mono leading-tight">{p.role}</div>
 <div className={`text-[9px] font-bold font-mono ${p.veteran ? 'text-zinc-400' : 'text-[var(--cs-accent)]'}`}>
 {p.veteran ? '20-30+ yrs' : p.note}
 </div>
 </m.div>
 ))}
 </m.div>
 )}
 </AnimatePresence>

 {/* "Me" card — with accent avatar */}
 <AnimatePresence>
 {step >= 2 && (
 <m.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7, ease }}
 className="mt-6 flex justify-center"
 >
 <div className="rounded-xl border border-[var(--cs-accent)]/30 bg-[var(--cs-accent)]/[0.08] px-6 py-4 flex items-center gap-4">
 <div className="w-16 h-16">
 <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
 <circle cx="18" cy="12" r="6" fill="var(--cs-accent)" opacity="0.5" />
 <path d="M6 32 C6 24, 12 20, 18 20 C24 20, 30 24, 30 32" fill="var(--cs-accent)" opacity="0.35" />
 {/* Glow ring */}
 <m.circle cx="18" cy="18" r={16} stroke="var(--cs-accent)" strokeWidth="0.8" fill="none" opacity={0.3} initial={{ r: 15, opacity: 0.3 }} animate={{ r: [15, 17, 15], opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
 </svg>
 </div>
 <div>
 <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">Me</div>
 <div className="text-lg font-bold text-[var(--cs-accent)] font-mono">2 years in</div>
 </div>
 </div>
 </m.div>
 )}
 </AnimatePresence>

 {/* Outcome text */}
 <AnimatePresence>
 {step >= 3 && (
 <m.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.7, ease }}
 className="text-sm text-zinc-200 mt-6 font-mono max-w-sm mx-auto text-center"
 >
 I wasn&apos;t just the designer in the room.<br />
 <span className="text-[var(--cs-accent)]">I was driving the conversation.</span>
 </m.p>
 )}
 </AnimatePresence>

 </div>
 </div>
 </div>
 )
}


/* ═════════════════════════════════════════════════
 BEAT 8: "VISIBILITY WAS THE SOLUTION"
 Impact metrics — with adoption curve SVG
 ═════════════════════════════════════════════════ */

/* SVG: Adoption curve — shows the rise from redesign */
function AdoptionCurveSVG() {
 return (
 <svg viewBox="0 0 200 80" fill="none" className="w-full h-full">
 {/* Grid lines */}
 {[20, 40, 60].map(y => (
 <line key={y} x1="10" y1={y} x2="190" y2={y} stroke="var(--cs-accent)" strokeWidth="0.3" opacity="0.08" />
 ))}
 {/* Baseline flat adoption */}
 <line x1="10" y1="60" x2="80" y2="60" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.2" strokeDasharray="3,3" />
 {/* The redesign moment — vertical marker */}
 <line x1="80" y1="10" x2="80" y2="72" stroke="var(--cs-accent)" strokeWidth="0.5" opacity="0.15" strokeDasharray="2,4" />
 <text x="80" y="78" textAnchor="middle" fill="var(--cs-accent)" fontSize="5" fontFamily="monospace" opacity="0.25">redesign</text>
 {/* Rising adoption curve */}
 <m.path
 d="M10 60 L40 60 L60 59 L80 58 L100 48 L120 38 L140 30 L160 24 L180 20 L190 18"
 stroke="var(--cs-accent)"
 strokeWidth="1.5"
 opacity="0.5"
 fill="none"
 initial={{ pathLength: 0 }}
 animate={{ pathLength: 1 }}
 transition={{ duration: 2, ease: 'easeOut' }}
 />
 {/* Shaded area under curve */}
 <path
 d="M10 60 L40 60 L60 59 L80 58 L100 48 L120 38 L140 30 L160 24 L180 20 L190 18 L190 60 L10 60 Z"
 fill="var(--cs-accent)"
 opacity="0.06"
 />
 {/* +25% annotation at peak */}
 <m.circle cx="190" cy="18" r="3" fill="var(--cs-accent)" opacity="0.4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8, duration: 0.3, type: 'spring' }} />
 </svg>
 )
}

/* Small SVG icons for secondary stats */
function StatIconHub() {
 return (
 <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 mx-auto mb-1">
 <circle cx="6" cy="6" r="3" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.3" />
 <circle cx="18" cy="6" r="3" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.3" />
 <circle cx="12" cy="18" r="3" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.3" />
 <line x1="8" y1="8" x2="11" y2="16" stroke="var(--cs-accent)" strokeWidth="0.5" opacity="0.2" />
 <line x1="16" y1="8" x2="13" y2="16" stroke="var(--cs-accent)" strokeWidth="0.5" opacity="0.2" />
 <rect x="8" y="14" width="8" height="8" rx="2" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.5" fill="var(--cs-accent)" fillOpacity="0.1" />
 </svg>
 )
}

function StatIconResponsive() {
 return (
 <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 mx-auto mb-1">
 {/* Desktop */}
 <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.3" />
 <line x1="5" y1="14" x2="13" y2="14" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.2" />
 {/* Phone */}
 <rect x="16" y="6" width="6" height="12" rx="1" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.4" />
 <circle cx="19" cy="16" r="0.5" fill="var(--cs-accent)" opacity="0.3" />
 </svg>
 )
}

function StatIconShip() {
 return (
 <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 mx-auto mb-1">
 {/* Rocket shape */}
 <path d="M12 2 L15 10 L12 22 L9 10 Z" stroke="var(--cs-accent)" strokeWidth="0.8" opacity="0.4" fill="var(--cs-accent)" fillOpacity="0.1" />
 {/* Fins */}
 <path d="M9 10 L5 14 L9 14" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.25" />
 <path d="M15 10 L19 14 L15 14" stroke="var(--cs-accent)" strokeWidth="0.6" opacity="0.25" />
 {/* Exhaust */}
 <m.circle cx="12" cy="22" r={1} fill="var(--cs-accent)" opacity={0.3} initial={{ r: 1, opacity: 0.3 }} animate={{ r: [1, 2, 1], opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
 </svg>
 )
}

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
 <div className="relative w-full max-w-4xl mx-auto beat-wireframe">
 <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 overflow-hidden">
 <div className="px-6 md:px-10 py-8 md:py-12">

 <m.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
 transition={{ duration: 0.8, ease }}
 >
 <PresenterBar>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 NLQ redesign + Phi-3 model upgrade drove <span className="text-[var(--cs-accent)] font-bold">+25% adoption</span>. Customers looked forward to NLQ the most. <span className="text-zinc-200 font-medium">The Hub brings all of it front and center.</span>
 </p>
 </PresenterBar>
 </m.div>

 {/* Big stat with adoption curve behind */}
 <AnimatePresence>
 {step >= 1 && (
 <m.div
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.8, ease }}
 className="relative text-center mt-6 mb-6"
 >
 {/* SVG curve behind the number */}
 <div className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-60">
 <div className="w-full max-w-md h-32">
 <AdoptionCurveSVG />
 </div>
 </div>
 <div className="relative z-10">
 <div className="text-5xl md:text-7xl font-bold text-[var(--cs-accent)] font-mono">
 +<AnimNumber value={25} />%
 </div>
 <div className="text-sm font-mono text-zinc-200 uppercase tracking-wider mt-2">
 NLQ Adoption
 </div>
 <div className="text-xs text-zinc-400 mt-1">
 From discoverability alone — no feature changes.
 </div>
 </div>
 </m.div>
 )}
 </AnimatePresence>

 {/* Secondary stats with icons */}
 <AnimatePresence>
 {step >= 2 && (
 <m.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, ease }}
 className="flex justify-center gap-6 md:gap-10"
 >
 {[
 { val: '3 → 1', label: 'Hub Unified', icon: <StatIconHub /> },
 { val: '100%', label: 'Responsive', icon: <StatIconResponsive /> },
 { val: '2027', label: 'Hub Ships', icon: <StatIconShip /> },
 ].map((stat, i) => (
 <m.div
 key={stat.label}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: i * 0.1, duration: 0.4, ease }}
 className="text-center"
 >
 {stat.icon}
 <div className="text-lg md:text-xl font-bold text-white font-mono">{stat.val}</div>
 <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</div>
 </m.div>
 ))}
 </m.div>
 )}
 </AnimatePresence>

 {/* Closing line */}
 <AnimatePresence>
 {step >= 3 && (
 <m.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.7, ease }}
 className="text-sm text-zinc-200 mt-6 max-w-md leading-relaxed text-center mx-auto"
 >
 The features didn&apos;t change. The visibility did. That was enough.
 </m.p>
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
