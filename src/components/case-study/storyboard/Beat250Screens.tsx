'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Search, AlertTriangle, Inbox } from 'lucide-react'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

// Simulated screen labels that cascade across the viewport
const SCREEN_LABELS = [
 'Schedule — Properties', 'Schedule — Tasks', 'Schedule — Recurrence',
 'Distribution List — Empty', 'Distribution List — Populated', 'Distribution List — Edit',
 'Access List — Empty', 'Access List — Members', 'Access List — Add',
 'Explorer — Grid View', 'Explorer — Filter View', 'Explorer — Context Menu',
 'Admin — Status', 'Admin — Configuration', 'Job Log — Dialog',
 'Task Dialog', 'Recurrence — Weekly', 'Recurrence — Monthly',
 'Recurrence — Yearly', 'Recurrence — Once', 'Recurrence — Validation',
 'Hub — Home', 'Hub — Create Schedule', 'Hub — Context Menu',
]

/* ── Animated 250+ counter ─────────────────────────── */
function AnimatedCounter({ active }: { active: boolean }) {
 const [count, setCount] = useState(0)
 const [finished, setFinished] = useState(false)

 useEffect(() => {
 if (!active) { setCount(0); setFinished(false); return }
 let frame = 0
 const totalFrames = 60
 const target = 250
 const interval = setInterval(() => {
 frame++
 // Easing — fast start, slow finish
 const progress = 1 - Math.pow(1 - frame / totalFrames, 3)
 setCount(Math.min(Math.floor(progress * target), target))
 if (frame >= totalFrames) {
 setCount(target)
 setFinished(true)
 clearInterval(interval)
 }
 }, 30)
 return () => clearInterval(interval)
 }, [active])

 return (
 <div className="relative">
 {/* Glow behind number */}
 {finished && (
 <motion.div
 className="absolute inset-0 flex items-center justify-center pointer-events-none"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.5 }}
 >
 <div
 className="w-48 h-32 rounded-full"
 style={{
 background: 'radial-gradient(ellipse, var(--overlay-white-06) 0%, transparent 70%)',
 }}
 />
 </motion.div>
 )}
 <div className="relative text-center">
 <motion.div
 className="text-7xl md:text-8xl font-bold text-white font-mono tabular-nums"
 animate={finished ? { scale: [1, 1.05, 1] } : {}}
 transition={{ duration: 0.4, ease }}
 >
 {count}<span style={{ color: 'var(--cs-accent)' }}>+</span>
 </motion.div>
 {/* Flash ring on finish */}
 {finished && (
 <motion.div
 className="absolute inset-0 flex items-center justify-center pointer-events-none"
 initial={{ opacity: 0.8 }}
 animate={{ opacity: 0, scale: 2 }}
 transition={{ duration: 0.8, ease: 'easeOut' }}
 >
 <div
 className="w-32 h-32 rounded-full border"
 style={{ borderColor: 'var(--overlay-white-20)' }}
 />
 </motion.div>
 )}
 </div>
 <motion.div
 className="text-xs text-zinc-400 font-mono uppercase tracking-[0.3em] text-center mt-2"
 initial={{ opacity: 0 }}
 animate={finished ? { opacity: 1 } : {}}
 transition={{ delay: 0.3 }}
 >
 Screens designed
 </motion.div>
 </div>
 )
}

export default function Beat250Screens() {
 const ref = useRef<HTMLDivElement>(null)
 const isInView = useInView(ref, { once: true, amount: 0.3 })
 const [phase, setPhase] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 const clear = useCallback(() => {
 timers.current.forEach(clearTimeout)
 timers.current = []
 }, [])


 const startVisuals = useCallback(() => {
 // Phase 1: Start cascade
 timers.current.push(setTimeout(() => setPhase(1), 300))
 // Phase 2: Show counter
 timers.current.push(setTimeout(() => setPhase(2), 1100))
 // Phase 3: "Every edge case"
 timers.current.push(setTimeout(() => setPhase(3), 4100))
 // Phase 4: Statement
 timers.current.push(setTimeout(() => setPhase(4), 5600))
 }, [])

 useEffect(() => {
 if (isInView) {
 timers.current.push(setTimeout(() => setPhase(0), 400))
 } else {
 clear()
 setPhase(-1)
 }
 return clear
 }, [isInView, clear])

 return (
 <div ref={ref} className="relative w-full max-w-4xl mx-auto">
 <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 overflow-hidden">
 <div className="px-6 md:px-10 py-8 md:py-12">

 {/* Presenter narration */}
 <AnimatePresence>
 {phase >= 0 && (
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 <PresenterBar onTypingComplete={startVisuals}>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 Every interaction. Every loading state. Every error.
 </p>
 <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
 250+ screens. Nothing left to interpretation.
 </p>
 </PresenterBar>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Screen cascade */}
 <AnimatePresence>
 {phase >= 1 && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="relative h-48 md:h-56 overflow-hidden mb-6"
 >
 <div className="grid grid-cols-3 md:grid-cols-6 gap-2 absolute inset-0">
 {SCREEN_LABELS.map((label, i) => (
 <motion.div
 key={label}
 initial={{ opacity: 0, y: 30, scale: 0.8 }}
 animate={{ opacity: 0.6, y: 0, scale: 1 }}
 transition={{
 duration: 0.3,
 delay: i * 0.08,
 ease,
 }}
 className="rounded-md border border-white/[0.04] bg-white/[0.015] p-1.5 h-fit"
 >
 <div className="w-full h-6 rounded-sm bg-white/[0.03] mb-1" />
 <div className="text-[11px] text-zinc-400 font-mono truncate">
 {label}
 </div>
 </motion.div>
 ))}
 </div>

 {/* Gradient fade at bottom */}
 <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
 </motion.div>
 )}
 </AnimatePresence>

 {/* Counter + coverage stats — side by side */}
 <AnimatePresence>
 {phase >= 2 && (
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.8, ease }}
 className="mb-6"
 >
 <div className="flex items-center justify-center gap-8 md:gap-12">
 {/* 250+ counter */}
 <AnimatedCounter active={phase >= 2} />

 {/* Divider */}
 <div className="w-px h-20 bg-white/[0.06]" />

 {/* Coverage stats */}
 <AnimatePresence>
 {phase >= 3 && (
 <motion.div
 initial={{ opacity: 0, x: 10 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.5 }}
 className="flex flex-col gap-4"
 >
 {[
 { label: 'Edge cases', Icon: Search },
 { label: 'Error states', Icon: AlertTriangle },
 { label: 'Empty states', Icon: Inbox },
 ].map((item, i) => (
 <motion.div
 key={item.label}
 initial={{ opacity: 0, x: 8 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.4, delay: i * 0.15, ease }}
 className="flex items-center gap-2.5"
 >
 <item.Icon className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
 <span className="text-[11px] text-zinc-400 font-mono uppercase tracking-wider">
 {item.label}
 </span>
 </motion.div>
 ))}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Closing — full width below */}
 <AnimatePresence>
 {phase >= 4 && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, ease }}
 className="text-center"
 >
 <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
 Every. Single. Screen.
 </p>
 </motion.div>
 )}
 </AnimatePresence>

 </div>
 </div>
 </div>
 )
}
