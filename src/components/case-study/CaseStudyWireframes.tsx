'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { m, AnimatePresence, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ═══════════════════════════════════════════════════════════════
 SHARED PRIMITIVES & ANIMATION HARNESS
 All wireframes share the same phase-based loop engine.
 ═══════════════════════════════════════════════════════════════ */

function Skel({ w = '100%', h = 6, color = 'bg-white/[0.15]' }: { w?: string | number; h?: number; color?: string }) {
 return <div className={`rounded-full ${color}`} style={{ width: w, height: h }} />
}

function Bar({ label, rgb }: { label: string; rgb: string }) {
 return (
 <div className="flex items-center gap-1.5 mb-2">
 <div className="flex gap-0.5">
 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `rgba(${rgb}, 0.5)` }} />
 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `rgba(${rgb}, 0.3)` }} />
 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `rgba(${rgb}, 0.3)` }} />
 </div>
 <span className="text-[9px] font-mono uppercase tracking-wider font-medium" style={{ color: `rgba(${rgb}, 0.7)` }}>
 {label}
 </span>
 </div>
 )
}

/** Reusable phase-based animation harness */
function useWireframePhases(phaseTimes: number[], loopAfter: number) {
 const ref = useRef<HTMLDivElement>(null)
 const isInView = useInView(ref, { once: false, amount: 0.3 })
 const [phase, setPhase] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])
 const loopRef = useRef<NodeJS.Timeout | null>(null)
 const configRef = useRef({ phaseTimes, loopAfter })
 configRef.current = { phaseTimes, loopAfter }

 const clear = useCallback(() => {
 timers.current.forEach(clearTimeout)
 timers.current = []
 if (loopRef.current) clearTimeout(loopRef.current)
 }, [])

 const play = useCallback(() => {
 clear(); setPhase(-1)
 const { phaseTimes: pt, loopAfter: la } = configRef.current
 pt.forEach((ms, i) => {
 timers.current.push(setTimeout(() => setPhase(i), ms))
 })
 loopRef.current = setTimeout(() => play(), la)
 }, [clear])

 useEffect(() => {
 if (isInView) play(); else { clear(); setPhase(-1) }
 return clear
 }, [isInView, play, clear])

 return { ref, phase }
}

/* ═══════════════════════════════════════════════════════════════
 RC: Enterprise Scheduler — sidebar + content grid
 Accent: amber (--accent-amber-rgb)
 ═══════════════════════════════════════════════════════════════ */

export function RCWireframe() {
 const { ref, phase } = useWireframePhases([300, 1000, 1800, 2600], 5000)
 const rgb = '245, 158, 11' // --accent-amber-rgb

 return (
 <div ref={ref} className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
 <div className="flex gap-3 w-full max-w-md items-stretch">
 {/* Left sidebar */}
 <AnimatePresence>
 {phase >= 0 && (
 <m.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease }}
 className="w-24 shrink-0 rounded-lg border p-2" style={{ borderColor: `rgba(${rgb}, 0.25)`, backgroundColor: `rgba(${rgb}, 0.07)` }}>
 <Bar label="Nav" rgb={rgb} />
 <div className="space-y-1.5 mt-1">
 {['Views', 'Shared', 'Favorites'].map((s, i) => (
 <m.div key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }}>
 <Skel w="85%" h={4} color={i === 2 ? `bg-[var(--accent-amber)]/40` : `bg-[var(--accent-amber)]/15`} />
 </m.div>
 ))}
 </div>
 </m.div>
 )}
 </AnimatePresence>

 {/* Right content */}
 <div className="flex-1 flex flex-col gap-2">
 <AnimatePresence>
 {phase >= 1 && (
 <m.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}
 className="rounded-lg border p-2" style={{ borderColor: `rgba(${rgb}, 0.19)`, backgroundColor: `rgba(${rgb}, 0.05)` }}>
 <Bar label="Schedule Explorer" rgb={rgb} />
 <div className="flex gap-1.5">
 <Skel w="25%" h={4} color="bg-[var(--accent-amber)]/30" />
 <Skel w="20%" h={4} color="bg-[var(--accent-amber)]/20" />
 <Skel w="30%" h={4} color="bg-[var(--accent-amber)]/20" />
 </div>
 </m.div>
 )}
 </AnimatePresence>

 <AnimatePresence>
 {phase >= 2 && (
 <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }}
 className="rounded-lg border p-2 flex-1" style={{ borderColor: `rgba(${rgb}, 0.15)`, backgroundColor: `rgba(${rgb}, 0.04)` }}>
 <div className="space-y-1.5">
 {[['55%', '25%', '15%'], ['70%', '15%', '10%'], ['45%', '30%', '20%'], ['60%', '20%', '15%']].map((widths, i) => (
 <m.div key={i} className="flex gap-1.5"
 initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
 transition={{ delay: i * 0.08 }}>
 {widths.map((w, j) => (
 <Skel key={j} w={w} h={4} color={j === 0 ? 'bg-[var(--accent-amber)]/30' : 'bg-[var(--accent-amber)]/15'} />
 ))}
 </m.div>
 ))}
 </div>
 </m.div>
 )}
 </AnimatePresence>

 <AnimatePresence>
 {phase >= 3 && (
 <m.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }}
 className="flex gap-2">
 <div className="h-5 flex-1 rounded" style={{ backgroundColor: `rgba(${rgb}, 0.25)` }} />
 <div className="h-5 w-12 rounded" style={{ backgroundColor: `rgba(${rgb}, 0.12)` }} />
 </m.div>
 )}
 </AnimatePresence>
 </div>
 </div>

 {phase >= 3 && (
 <m.div animate={{ opacity: [0, 0.2, 0] }} transition={{ duration: 3, repeat: Infinity }}
 className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(${rgb}, 0.08), transparent 70%)` }} />
 )}
 </div>
 )
}

/* ═══════════════════════════════════════════════════════════════
 ML: Workflow pipeline — steps + progress + metrics
 Accent: cyan (--semantic-cyan-rgb)
 ═══════════════════════════════════════════════════════════════ */

export function MLWireframe() {
 const { ref, phase } = useWireframePhases([400, 1200, 2000], 4500)
 const rgb = '6, 182, 212' // --semantic-cyan-rgb
 const steps = ['Data Prep', 'Train', 'Evaluate']

 return (
 <div ref={ref} className="absolute inset-0 flex items-center justify-center p-3 md:p-4">
 <div className="w-full max-w-[260px] space-y-3">
 <AnimatePresence>
 {phase >= 0 && (
 <m.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
 className="flex gap-3 md:gap-2 items-center justify-center flex-wrap">
 {steps.map((step, i) => (
 <m.div key={step}
 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
 className="flex flex-col items-center gap-1">
 <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg border flex items-center justify-center"
 style={{ borderColor: `rgba(${rgb}, 0.3)`, backgroundColor: `rgba(${rgb}, 0.08)` }}>
 <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: `rgba(${rgb}, 0.4)` }} />
 </div>
 <span className="text-[7px] md:text-[8px] font-mono uppercase tracking-wider font-medium" style={{ color: `rgba(${rgb}, 0.6)` }}>
 {step}
 </span>
 </m.div>
 ))}
 </m.div>
 )}
 </AnimatePresence>

 <AnimatePresence>
 {phase >= 1 && (
 <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
 className="rounded-full h-2 overflow-hidden" style={{ backgroundColor: `rgba(${rgb}, 0.08)` }}>
 <m.div className="h-full rounded-full" style={{ backgroundColor: `rgba(${rgb}, 0.3)` }}
 initial={{ width: '0%' }} animate={{ width: '75%' }}
 transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} />
 </m.div>
 )}
 </AnimatePresence>

 <AnimatePresence>
 {phase >= 2 && (
 <m.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}
 className="flex gap-2">
 <div className="flex-1 h-8 rounded-lg border flex items-center justify-center"
 style={{ borderColor: `rgba(${rgb}, 0.19)`, backgroundColor: `rgba(${rgb}, 0.07)` }}>
 <span className="text-[9px] font-mono font-medium" style={{ color: `rgba(${rgb}, 0.5)` }}>94.2%</span>
 </div>
 <div className="flex-1 h-8 rounded-lg border flex items-center justify-center"
 style={{ borderColor: `rgba(${rgb}, 0.12)`, backgroundColor: `rgba(${rgb}, 0.04)` }}>
 <span className="text-[9px] font-mono font-medium" style={{ color: `rgba(${rgb}, 0.4)` }}>0.031</span>
 </div>
 </m.div>
 )}
 </AnimatePresence>
 </div>
 </div>
 )
}

/* ═══════════════════════════════════════════════════════════════
 IQ: Discovery HUB — search + cards + AI pill
 Accent: purple (--semantic-purple-rgb)
 ═══════════════════════════════════════════════════════════════ */

export function IQWireframe() {
 const { ref, phase } = useWireframePhases([400, 1200, 2200], 5000)
 const rgb = '168, 85, 247' // --semantic-purple-rgb

 return (
 <div ref={ref} className="absolute inset-0 flex items-center justify-center p-4">
 <div className="w-full max-w-[260px] space-y-2.5">
 <AnimatePresence>
 {phase >= 0 && (
 <m.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}
 className="rounded-full h-8 border flex items-center px-3 gap-2"
 style={{ borderColor: `rgba(${rgb}, 0.25)`, backgroundColor: `rgba(${rgb}, 0.07)` }}>
 <div className="w-3.5 h-3.5 rounded-full border" style={{ borderColor: `rgba(${rgb}, 0.3)` }} />
 <Skel w="60%" h={3} color="bg-[var(--semantic-purple)]/30" />
 </m.div>
 )}
 </AnimatePresence>

 <AnimatePresence>
 {phase >= 1 && (
 <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
 className="flex gap-2">
 {[0, 1, 2].map(i => (
 <m.div key={i}
 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
 transition={{ delay: i * 0.1, duration: 0.3 }}
 className="flex-1 rounded-lg border p-2 flex flex-col items-center gap-1.5"
 style={{ borderColor: `rgba(${rgb}, 0.15)`, backgroundColor: `rgba(${rgb}, 0.05)` }}>
 <div className="w-6 h-6 rounded" style={{ backgroundColor: `rgba(${rgb}, 0.15)` }} />
 <Skel w="80%" h={3} color="bg-[var(--semantic-purple)]/25" />
 <Skel w="55%" h={2} color="bg-[var(--semantic-purple)]/12" />
 </m.div>
 ))}
 </m.div>
 )}
 </AnimatePresence>

 <AnimatePresence>
 {phase >= 2 && (
 <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
 transition={{ type: 'spring', damping: 15, stiffness: 200 }}
 className="rounded-full h-7 border flex items-center justify-center gap-2"
 style={{ borderColor: `rgba(${rgb}, 0.25)`, backgroundColor: `rgba(${rgb}, 0.08)` }}>
 <span className="text-[10px]" style={{ color: `rgba(${rgb}, 1)` }}>✦</span>
 <span className="text-[9px] font-mono uppercase tracking-wider font-medium" style={{ color: `rgba(${rgb}, 0.6)` }}>
 AI Recommended
 </span>
 </m.div>
 )}
 </AnimatePresence>
 </div>
 </div>
 )
}
