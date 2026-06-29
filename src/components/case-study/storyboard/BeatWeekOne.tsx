'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { m, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'
import { withHexAlpha } from '@/lib/color-utils'
import { EASE_CINEMATIC as ease, DURATION } from '@/lib/motion'

interface Fact {
 label: string
 value: string
 /** 0–1 progress for the ring (0 = empty gauge) */
 ring: number
 color: string
}

const FACTS: Fact[] = [
 { label: 'Days at the company', value: '7', ring: 0.019, color: 'var(--cs-accent)' },
 { label: 'BI tools used before', value: '0', ring: 0, color: 'var(--cs-accent)' },
 { label: 'Data analytics experience', value: 'Zero', ring: 0, color: 'var(--cs-accent)' },
 { label: 'Knowledge of ReportCaster', value: 'Zero', ring: 0, color: 'var(--cs-accent)' },
]

const RING_R = 38
const RING_C = 2 * Math.PI * RING_R // ~238.76

export default function BeatWeekOne() {
 const ref = useRef<HTMLDivElement>(null)
 const isInView = useInView(ref, { once: true, amount: 0.3 })
 const [step, setStep] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 const clear = useCallback(() => {
 timers.current.forEach(clearTimeout)
 timers.current = []
 }, [])

 // Start visual facts after typewriter finishes
 const startVisuals = useCallback(() => {
 FACTS.forEach((_, i) => {
 timers.current.push(setTimeout(() => setStep(i + 1), 300 + i * 700))
 })
 }, [])

 useEffect(() => {
 if (isInView) {
 timers.current.push(setTimeout(() => setStep(0), 400))
 } else {
 clear()
 setStep(-1)
 }
 return clear
 }, [isInView, clear])

 return (
 <div ref={ref} className="relative w-full max-w-4xl mx-auto">
 <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 overflow-hidden">
 <div className="px-6 md:px-10 py-8 md:py-12">

 {/* Speech bubble */}
 <m.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={step >= 0 ? { opacity: 1, scale: 1 } : {}}
 transition={{ duration: DURATION.deliberate, ease }}
 >
 <PresenterBar onTypingComplete={startVisuals}>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 One week in, my director mentioned a legacy scheduling tool in the pipeline. No designer had taken it. No engineer wanted to own it.
 </p>
 <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
 I raised my hand: &ldquo;I&apos;ll do it.&rdquo;
 </p>
 </PresenterBar>
 </m.div>

 {/* Motion-graphic gauge row */}
 <div className="flex items-center justify-center gap-2 md:gap-6 mt-10">
 {FACTS.map((fact, i) => {
 const isVisible = step >= i + 1
 const dashOffset = RING_C * (1 - fact.ring)
 return (
 <m.div
 key={fact.label}
 className="flex flex-col items-center"
 initial={{ opacity: 0, scale: 0.5 }}
 animate={
 isVisible
 ? { opacity: 1, scale: 1 }
 : { opacity: 0, scale: 0.5 }
 }
 transition={{ duration: DURATION.gentle, ease }}
 >
 {/* SVG ring gauge */}
 <div className="relative w-20 h-20 md:w-24 md:h-24">
 <svg
 viewBox="0 0 96 96"
 className="w-full h-full"
 style={{ transform: 'rotate(-90deg)' }}
 >
 {/* Background track */}
 <circle
 cx="48" cy="48" r={RING_R}
 fill="none"
 stroke="var(--overlay-white-04)"
 strokeWidth="3"
 />
 {/* Animated arc */}
 <m.circle
 cx="48" cy="48" r={RING_R}
 fill="none"
 stroke={fact.color}
 strokeWidth="3"
 strokeLinecap="round"
 strokeDasharray={RING_C}
 initial={{ strokeDashoffset: RING_C }}
 animate={
 isVisible
 ? { strokeDashoffset: dashOffset }
 : { strokeDashoffset: RING_C }
 }
 transition={{ duration: DURATION.cinematic, delay: 0.3, ease }}
 style={{ filter: `drop-shadow(0 0 6px ${fact.color})` }}
 />
 {/* Tick marks */}
 {Array.from({ length: 12 }).map((_, ti) => {
 const angle = (ti / 12) * 360
 const rad = (angle * Math.PI) / 180
 const x1 = +(48 + 33 * Math.cos(rad)).toFixed(3)
 const y1 = +(48 + 33 * Math.sin(rad)).toFixed(3)
 const x2 = +(48 + 36 * Math.cos(rad)).toFixed(3)
 const y2 = +(48 + 36 * Math.sin(rad)).toFixed(3)
 return (
 <m.line
 key={ti}
 x1={x1} y1={y1} x2={x2} y2={y2}
 stroke="var(--overlay-white-08)"
 strokeWidth="1"
 initial={{ opacity: 0 }}
 animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
 transition={{ duration: DURATION.fast, delay: 0.1 + ti * 0.04 }}
 />
 )
 })}
 </svg>

 {/* Center value */}
 <m.div
 className="absolute inset-0 flex items-center justify-center"
 initial={{ opacity: 0, scale: 0 }}
 animate={
 isVisible
 ? { opacity: 1, scale: 1 }
 : { opacity: 0, scale: 0 }
 }
 transition={{ duration: DURATION.slow, delay: 0.5, ease }}
 >
 <span
 className="text-xl md:text-2xl font-bold font-mono"
 style={{ color: fact.color }}
 >
 {fact.value}
 </span>
 </m.div>

 {/* Glow pulse */}
 {isVisible && (
 <m.div
 className="absolute inset-0 rounded-full pointer-events-none"
 initial={{ opacity: 0 }}
 animate={{ opacity: [0, 0.15, 0] }}
 transition={{ duration: DURATION.grand, repeat: Infinity, ease: 'easeInOut' }}
 style={{
 background: `radial-gradient(circle, ${withHexAlpha(fact.color, '22')} 0%, transparent 60%)`,
 }}
 />
 )}
 </div>

 {/* Label below gauge */}
 <m.div
 className="text-center mt-3 max-w-[100px]"
 initial={{ opacity: 0, y: 8 }}
 animate={
 isVisible
 ? { opacity: 1, y: 0 }
 : { opacity: 0, y: 8 }
 }
 transition={{ duration: DURATION.medium, delay: 0.7, ease }}
 >
 <div className="text-[11px] md:text-xs font-mono text-zinc-500 tracking-wider uppercase leading-snug">
 {fact.label}
 </div>
 </m.div>
 </m.div>
 )
 })}
 </div>

 {/* Connecting scan line across gauges */}
 <m.div
 className="relative h-px mt-6 overflow-hidden"
 initial={{ opacity: 0 }}
 animate={step >= 4 ? { opacity: 1 } : { opacity: 0 }}
 transition={{ duration: DURATION.slow }}
 >
 <m.div
 className="absolute h-full w-24"
 initial={{ left: '-10%' }}
 animate={step >= 4 ? { left: '110%' } : { left: '-10%' }}
 transition={{ duration: DURATION.reveal, ease: 'easeInOut' }}
 style={{
 background: 'linear-gradient(90deg, transparent, var(--overlay-white-15), transparent)',
 }}
 />
 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent" />
 </m.div>

 </div>
 </div>
 </div>
 )
}
