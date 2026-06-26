'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { m, AnimatePresence, useInView } from 'framer-motion'
import { Monitor, FileText, Play, X, type LucideIcon } from 'lucide-react'
import PresenterBar from './PresenterBar'
import { withHexAlpha } from '@/lib/color-utils'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface Item {
 icon: LucideIcon
 label: string
 detail: string
 color: string
}

const GOT: Item[] = [
 { icon: Monitor, label: 'A sandbox', detail: 'One login. No guide.', color: 'var(--cs-accent)' },
 { icon: FileText, label: 'A presentation', detail: 'From the support lead. My bible.', color: 'var(--cs-accent)' },
 { icon: Play, label: 'A 30-min demo', detail: 'Tribal knowledge. Unrecorded.', color: 'var(--cs-accent)' },
]

const MISSING = [
 'No documentation',
 'No design files',
 'No team',
 'No design system',
]

/* ── Animated counter for the sparse "3 items" ── */
function SparseCounter({ active }: { active: boolean }) {
 const [val, setVal] = useState(0)
 useEffect(() => {
 if (!active) { setVal(0); return }
 let frame = 0
 const id = setInterval(() => {
 frame++
 if (frame <= 3) setVal(frame)
 else clearInterval(id)
 }, 400)
 return () => clearInterval(id)
 }, [active])
 return (
 <span className="text-5xl md:text-7xl font-black tabular-nums font-mono" style={{ color: 'var(--cs-accent)' }}>
 {val}
 </span>
 )
}

export default function BeatWhatIGot() {
 const ref = useRef<HTMLDivElement>(null)
 const isInView = useInView(ref, { once: true, amount: 0.3 })
 const [phase, setPhase] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 const clear = useCallback(() => {
 timers.current.forEach(clearTimeout)
 timers.current = []
 }, [])

 const startVisuals = useCallback(() => {
 // 1: Shelf appears + counter starts
 timers.current.push(setTimeout(() => setPhase(1), 300))
 // 2-4: Each item drops onto shelf
 GOT.forEach((_, i) => {
 timers.current.push(setTimeout(() => setPhase(2 + i), 1100 + i * 1000))
 })
 // 5: Missing items strike
 timers.current.push(setTimeout(() => setPhase(5), 4500))
 // 6-9: Each missing item appears
 MISSING.forEach((_, i) => {
 timers.current.push(setTimeout(() => setPhase(6 + i), 4900 + i * 500))
 })
 // 10: Closer
 timers.current.push(setTimeout(() => setPhase(10), 7300))
 }, [])

 useEffect(() => {
 if (isInView) {
 timers.current.push(setTimeout(() => setPhase(0), 400))
 } else { clear(); setPhase(-1) }
 return clear
 }, [isInView, clear])

 return (
 <div ref={ref} className="relative w-full max-w-4xl mx-auto">
 <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 overflow-hidden">
 <div className="px-6 md:px-10 py-8 md:py-12">

 {/* Speech bubble */}
 <AnimatePresence>
 {phase >= 0 && (
 <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 <PresenterBar onTypingComplete={startVisuals}>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 No documentation. No design files. No team.
 </p>
 <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
 A sandbox. And that was it.
 </p>
 </PresenterBar>
 </m.div>
 )}
 </AnimatePresence>

 {/* ── Evidence shelf ─ */}
 <AnimatePresence>
 {phase >= 1 && (
 <m.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease }}
 className="relative"
 >
 {/* "What I received" header + counter */}
 <div className="flex items-center justify-between mb-6">
 <div className="flex items-baseline gap-3">
 <SparseCounter active={phase >= 2} />
 <div>
 <div className="text-sm font-mono text-zinc-500 uppercase tracking-widest">
 items received
 </div>
 <div className="text-xs text-zinc-600 mt-0.5">
 for a 40+ year-old enterprise system
 </div>
 </div>
 </div>
 </div>

 {/* Shelf — the 3 items */}
 <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
 {GOT.map((item, i) => {
 const Icon = item.icon
 const isVisible = phase >= i + 2
 return (
 <m.div
 key={item.label}
 initial={{ opacity: 0, y: -60, scale: 0.7 }}
 animate={
 isVisible
 ? { opacity: 1, y: 0, scale: 1 }
 : { opacity: 0, y: -60, scale: 0.7 }
 }
 transition={{
 duration: 0.7,
 ease: [0.34, 1.56, 0.64, 1], // spring-like
 }}
 className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 text-center overflow-hidden"
 >
 {/* Colored top accent bar */}
 <m.div
 initial={{ scaleX: 0 }}
 animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
 transition={{ duration: 0.6, delay: 0.3, ease }}
 className="absolute top-0 left-0 right-0 h-[2px] origin-left"
 style={{ background: item.color }}
 />

 {/* Glow */}
 <m.div
 initial={{ opacity: 0, scale: 0 }}
 animate={isVisible ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0 }}
 transition={{ duration: 0.8, delay: 0.2, ease }}
 className="absolute left-1/2 top-8 -translate-x-1/2 w-16 h-16 rounded-full"
 style={{
 background: `radial-gradient(circle, ${withHexAlpha(item.color, '40')} 0%, transparent 70%)`,
 }}
 />

 {/* Icon with drop-in bounce */}
 <m.div
 initial={{ opacity: 0, y: -30, scale: 0 }}
 animate={
 isVisible
 ? { opacity: 1, y: 0, scale: 1 }
 : { opacity: 0, y: -30, scale: 0 }
 }
 transition={{
 duration: 0.5,
 delay: 0.15,
 ease: [0.34, 1.56, 0.64, 1],
 }}
 className="relative flex items-center justify-center mb-3"
 >
 <div
 className="w-12 h-12 rounded-full flex items-center justify-center"
 style={{
 background: withHexAlpha(item.color, '15'),
 border: `1px solid ${withHexAlpha(item.color, '30')}`,
 }}
 >
 <Icon className="w-5 h-5" style={{ color: item.color }} strokeWidth={1.5} />
 </div>
 </m.div>

 {/* Label */}
 <m.div
 initial={{ opacity: 0, y: 8 }}
 animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
 transition={{ duration: 0.5, delay: 0.35, ease }}
 className="text-sm font-medium text-white mb-1"
 >
 {item.label}
 </m.div>

 {/* Detail */}
 <m.div
 initial={{ opacity: 0 }}
 animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
 transition={{ duration: 0.5, delay: 0.5, ease }}
 className="text-[11px] text-zinc-500 font-mono leading-snug"
 >
 {item.detail}
 </m.div>

 {/* Impact ring on drop */}
 {isVisible && (
 <m.div
 initial={{ opacity: 0.5, scale: 0.5 }}
 animate={{ opacity: 0, scale: 2 }}
 transition={{ duration: 0.8, ease: 'easeOut' }}
 className="absolute inset-0 rounded-xl pointer-events-none"
 style={{ border: `1px solid ${withHexAlpha(item.color, '40')}` }}
 />
 )}
 </m.div>
 )
 })}
 </div>

 {/* ── MISSING section — what was NOT provided ── */}
 <AnimatePresence>
 {phase >= 5 && (
 <m.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, ease }}
 >
 <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6" />
 <div className="text-center mb-4">
 <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--cs-accent)', opacity: 0.4 }}>
 What was NOT provided
 </span>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
 {MISSING.map((item, i) => (
 <m.div
 key={item}
 initial={{ opacity: 0, scale: 0.8 }}
 animate={
 phase >= 6 + i
 ? { opacity: 1, scale: 1 }
 : { opacity: 0, scale: 0.8 }
 }
 transition={{
 duration: 0.4,
 ease: [0.34, 1.56, 0.64, 1],
 }}
 className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
 >
 <X className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--cs-accent)', opacity: 0.4 }} strokeWidth={2.5} />
 <span className="text-[11px] text-zinc-500 font-mono">
 {item}
 </span>
 </m.div>
 ))}
 </div>
 </m.div>
 )}
 </AnimatePresence>
 </m.div>
 )}
 </AnimatePresence>

 {/* Closer */}
 <AnimatePresence>
 {phase >= 10 && (
 <m.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1.2, ease }}
 className="text-center mt-10"
 >
 <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent mb-8" />
 <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
 I had my work cut out for me — and so, I began.
 </p>
 </m.div>
 )}
 </AnimatePresence>

 </div>
 </div>
 </div>
 )
}
