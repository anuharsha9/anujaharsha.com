'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { m, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'
import { EASE_CINEMATIC as ease, DURATION } from '@/lib/motion'

const ASKED = [
 'A visual refresh',
 'Updated screens',
 'Make it look modern',
]

const DELIVERED = [
 'A brand new integrated ReportCaster within the platform',
 '250+ screens covering every edge case',
 '5 fragmented subsystems unified into 1 Hub',
 'New features to address 40 years of customer complaints',
 'Complete documentation written from scratch',
 'A team of ~20 onboarded and trained personally',
]

export default function BeatAskedVsDelivered() {
 const ref = useRef<HTMLDivElement>(null)
 const isInView = useInView(ref, { once: true, amount: 0.3 })
 const [phase, setPhase] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 const clear = useCallback(() => {
 timers.current.forEach(clearTimeout)
 timers.current = []
 }, [])

 const startVisuals = useCallback(() => {
 timers.current.push(setTimeout(() => setPhase(1), 300))
 ASKED.forEach((_, i) => {
 timers.current.push(setTimeout(() => setPhase(2 + i), 1100 + i * 600))
 })
 timers.current.push(setTimeout(() => setPhase(5), 3300))
 timers.current.push(setTimeout(() => setPhase(6), 4100))
 DELIVERED.forEach((_, i) => {
 timers.current.push(setTimeout(() => setPhase(7 + i), 4700 + i * 500))
 })
 timers.current.push(setTimeout(() => setPhase(13), 8100))
 }, [])

 useEffect(() => {
 if (isInView) {
 timers.current.push(setTimeout(() => setPhase(0), 400))
 } else { clear(); setPhase(-1) }
 return clear
 }, [isInView, clear])

 // The scale tilts as delivered items accumulate
 const deliveredCount = Math.max(0, Math.min(phase - 6, DELIVERED.length))
 const tiltDeg = phase >= 13 ? -8 : phase >= 6 ? -(deliveredCount * 1.3) : 0

 return (
 <div ref={ref} className="relative w-full max-w-4xl mx-auto">
 <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 overflow-hidden">
 <div className="px-6 md:px-10 py-8 md:py-12">

 <AnimatePresence>
 {phase >= 0 && (
 <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 <PresenterBar onTypingComplete={startVisuals}>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 The brief said{' '}
 <span className="text-zinc-200 font-medium">&quot;UI makeover.&quot;</span>{' '}
 But this needed a structural redesign, not a UI facelift.
 </p>
 </PresenterBar>
 </m.div>
 )}
 </AnimatePresence>

 {/* ── The Scale ───────────────────────────── */}
 <AnimatePresence>
 {phase >= 1 && (
 <m.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: DURATION.deliberate, ease }}
 className="relative my-6"
 >
 {/* SVG Scale */}
 <div className="flex justify-center mb-6">
 <svg viewBox="0 0 500 200" className="w-full max-w-xl" style={{ overflow: 'visible' }}>
 {/* Fulcrum */}
 <m.g
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: DURATION.slow }}
 >
 <polygon points="250,200 235,170 265,170" fill="var(--overlay-white-05)" stroke="var(--overlay-white-10)" strokeWidth="1" />
 <circle cx="250" cy="165" r="4" fill="var(--overlay-white-15)" />
 </m.g>

 {/* Beam — tilts! */}
 <m.g
 animate={{ rotate: tiltDeg }}
 transition={{ duration: DURATION.slower, ease }}
 style={{ transformOrigin: '250px 165px' }}
 >
 {/* Beam bar */}
 <m.rect
 x="60" y="162" width="380" height="6" rx="3"
 fill="var(--overlay-white-06)"
 stroke="var(--overlay-white-10)"
 strokeWidth="0.5"
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ duration: DURATION.slower, ease }}
 style={{ transformOrigin: '250px 165px' }}
 />

 {/* Left pan — "ASKED" */}
 <line x1="110" y1="168" x2="110" y2="130" stroke="var(--overlay-white-08)" strokeWidth="1" />
 <line x1="70" y1="130" x2="150" y2="130" stroke="var(--overlay-white-10)" strokeWidth="1.5" />
 {/* Pan arc */}
 <path d="M 70 130 Q 110 145 150 130" fill="none" stroke="var(--overlay-white-06)" strokeWidth="1" />

 {/* Stacked "asked" blocks */}
 {ASKED.map((_, i) => (
 <AnimatePresence key={`asked-block-${i}`}>
 {phase >= 2 + i && (
 <m.rect
 x={85 + i * 5}
 y={118 - i * 12}
 width={50 - i * 10}
 height={10}
 rx={2}
 fill="var(--overlay-white-10)"
 stroke="var(--overlay-white-15)"
 strokeWidth={0.5}
 initial={{ opacity: 0, y: -30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{
 duration: DURATION.slow,
 type: 'spring',
 stiffness: 200,
 damping: 15,
 }}
 />
 )}
 </AnimatePresence>
 ))}

 {/* Left label */}
 <text x="110" y="155" textAnchor="middle" className="text-[8px] font-mono uppercase" fill="var(--overlay-white-20)">
 Asked
 </text>

 {/* Right pan — "DELIVERED" */}
 <line x1="390" y1="168" x2="390" y2="130" stroke="var(--overlay-white-08)" strokeWidth="1" />
 <line x1="340" y1="130" x2="440" y2="130" stroke="var(--overlay-white-10)" strokeWidth="1.5" />
 <path d="M 340 130 Q 390 145 440 130" fill="none" stroke="var(--overlay-white-06)" strokeWidth="1" />

 {/* Stacked "delivered" blocks */}
 {DELIVERED.map((_, i) => (
 <AnimatePresence key={`del-block-${i}`}>
 {phase >= 7 + i && (
 <m.rect
 x={355}
 y={118 - i * 12}
 width={70}
 height={10}
 rx={2}
 fill="color-mix(in srgb, var(--cs-accent) 12%, transparent)"
 stroke="color-mix(in srgb, var(--cs-accent) 25%, transparent)"
 strokeWidth={0.5}
 initial={{ opacity: 0, y: -40 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{
 duration: DURATION.medium,
 type: 'spring',
 stiffness: 250,
 damping: 12,
 }}
 />
 )}
 </AnimatePresence>
 ))}

 {/* Right label */}
 <text x="390" y="155" textAnchor="middle" className="text-[8px] font-mono uppercase" fill="color-mix(in srgb, var(--cs-accent) 35%, transparent)">
 Delivered
 </text>
 </m.g>
 </svg>
 </div>

 {/* ── Text columns below scale ─────────── */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
 {/* Asked column */}
 <div>
 <AnimatePresence>
 {phase >= 1 && (
 <m.div
 initial={{ opacity: 0 }}
 animate={{ opacity: phase >= 5 ? 0.3 : 1 }}
 transition={{ duration: DURATION.slow, ease }}
 >
 <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-4">
 What they asked for
 </div>
 <div className="space-y-3">
 {ASKED.map((item, i) => (
 <m.div key={item}
 initial={{ opacity: 0, x: -15 }}
 animate={phase >= 2 + i ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
 transition={{ duration: DURATION.medium, ease }}
 className="flex items-center gap-3"
 >
 <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 flex-shrink-0" />
 <span className={`text-sm transition-all duration-500 ${phase >= 5 ? 'text-zinc-600 line-through decoration-zinc-500/30 decoration-2' : 'text-zinc-200'}`}>
 {item}
 </span>
 </m.div>
 ))}
 </div>
 {/* "Is that all?" micro-text */}
 <AnimatePresence>
 {phase >= 5 && phase < 6 && (
 <m.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 0.5 }}
 exit={{ opacity: 0 }}
 className="text-[10px] text-zinc-600 font-mono mt-3 italic"
 >
 ...is that all?
 </m.p>
 )}
 </AnimatePresence>
 </m.div>
 )}
 </AnimatePresence>
 </div>

 {/* Delivered column */}
 <div>
 <AnimatePresence>
 {phase >= 6 && (
 <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: DURATION.slow, ease }}>
 <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--cs-accent)', opacity: 0.5 }}>
 What I actually delivered
 </div>
 <div className="space-y-3">
 {DELIVERED.map((item, i) => (
 <m.div key={item}
 initial={{ opacity: 0, x: 20, scale: 0.95 }}
 animate={phase >= 7 + i ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 20, scale: 0.95 }}
 transition={{ duration: DURATION.slow, ease }}
 className="flex items-start gap-3"
 >
 <m.span
 className="flex-shrink-0 mt-1.5"
 initial={{ scale: 0 }}
 animate={phase >= 7 + i ? { scale: 1 } : { scale: 0 }}
 transition={{ type: 'spring', stiffness: 400 }}
 >
 <svg width="12" height="12" viewBox="0 0 12 12">
 <circle cx="6" cy="6" r="5.5" fill="none" stroke="color-mix(in srgb, var(--cs-accent) 35%, transparent)" strokeWidth="1" />
 <m.path
 d="M3.5 6l2 2 3-3.5"
 fill="none"
 stroke="var(--cs-accent)"
 strokeWidth="1.2"
 strokeLinecap="round"
 strokeLinejoin="round"
 initial={{ pathLength: 0 }}
 animate={phase >= 7 + i ? { pathLength: 1 } : { pathLength: 0 }}
 transition={{ duration: DURATION.base, delay: 0.15 }}
 />
 </svg>
 </m.span>
 <span className="text-sm" style={{ color: 'var(--cs-accent)', opacity: 0.8 }}>{item}</span>
 </m.div>
 ))}
 </div>
 </m.div>
 )}
 </AnimatePresence>
 </div>
 </div>

 {/* Score comparison */}
 <AnimatePresence>
 {phase >= 13 && (
 <m.div
 initial={{ opacity: 0, scaleX: 0 }}
 animate={{ opacity: 1, scaleX: 1 }}
 transition={{ duration: DURATION.slower, ease }}
 className="mt-8 flex items-center justify-center gap-6"
 >
 <div className="text-center">
 <div className="text-3xl font-bold font-mono text-zinc-500">3</div>
 <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">asked</div>
 </div>
 <div className="text-zinc-600 text-lg font-light">vs</div>
 <div className="text-center">
 <m.div
 className="text-4xl font-bold font-mono"
 style={{ color: 'var(--cs-accent)' }}
 initial={{ scale: 0.5 }}
 animate={{ scale: [0.5, 1.15, 1] }}
 transition={{ duration: DURATION.slow, ease }}
 >
 6
 </m.div>
 <div className="text-[9px] font-mono uppercase tracking-wider" style={{ color: 'var(--cs-accent)', opacity: 0.5 }}>delivered</div>
 </div>
 </m.div>
 )}
 </AnimatePresence>
 </m.div>
 )}
 </AnimatePresence>

 {/* Closing */}
 <AnimatePresence>
 {phase >= 13 && (
 <m.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: DURATION.cinematic, ease }}
 className="text-center mt-8"
 >
 <p className="text-white text-xl md:text-2xl font-semibold tracking-tight">
 They asked for a makeover. I delivered a brand new product.
 </p>
 </m.div>
 )}
 </AnimatePresence>

 </div>
 </div>
 </div>
 )
}
