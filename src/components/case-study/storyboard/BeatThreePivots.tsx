'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { m, AnimatePresence, useInView } from 'framer-motion'
import { X, Check } from 'lucide-react'
import PresenterBar from './PresenterBar'
import { EASE_CINEMATIC as ease } from '@/lib/motion'

interface Pivot {
 version: string
 title: string
 reason: string
 verdict: 'rejected' | 'accepted'
}

const PIVOTS: Pivot[] = [
 {
 version: 'V1',
 title: 'Independent Product',
 reason: '"Leadership wants all workflows centralized in the Hub."',
 verdict: 'rejected',
 },
 {
 version: 'V2',
 title: 'Hub Plugin',
 reason: '"Too much engineering effort. Too big of an addition this year."',
 verdict: 'rejected',
 },
 {
 version: 'V3',
 title: 'Hub Panel Integration',
 reason: '"This is the one. Ship it."',
 verdict: 'accepted',
 },
]

export default function BeatThreePivots() {
 const ref = useRef<HTMLDivElement>(null)
 const isInView = useInView(ref, { once: true, amount: 0.25 })
 const [phase, setPhase] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 const clear = useCallback(() => {
 timers.current.forEach(clearTimeout)
 timers.current = []
 }, [])

 const startVisuals = useCallback(() => {
 // Phase 1: V1 card appears
 timers.current.push(setTimeout(() => setPhase(1), 300))
 // Phase 2: V1 rejected
 timers.current.push(setTimeout(() => setPhase(2), 1800))
 // Phase 3: V2 card appears
 timers.current.push(setTimeout(() => setPhase(3), 3000))
 // Phase 4: V2 rejected
 timers.current.push(setTimeout(() => setPhase(4), 4500))
 // Phase 5: Dramatic pause
 timers.current.push(setTimeout(() => setPhase(5), 5800))
 // Phase 6: V3 card appears
 timers.current.push(setTimeout(() => setPhase(6), 7200))
 // Phase 7: V3 approved
 timers.current.push(setTimeout(() => setPhase(7), 8600))
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
 <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 <PresenterBar onTypingComplete={startVisuals}>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
 <span className="text-zinc-300 font-medium">V1 — rejected.</span>{' '}
 <span className="text-zinc-300 font-medium">V2 — rejected.</span>
 </p>
 <p className="text-base md:text-lg text-zinc-400 leading-relaxed mt-2">
 Instead of fighting it,{' '}
 <span className="text-zinc-200 font-medium">I reframed the problem from scratch.</span>
 </p>
 </PresenterBar>
 </m.div>
 )}
 </AnimatePresence>

 {/* === Compact 3-card horizontal layout === */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
 {PIVOTS.map((pivot, i) => {
 const cardPhase = i * 2 + 1 // 1, 3, 5→6
 const verdictPhase = i * 2 + 2 // 2, 4, 7
 const isVisible = i < 2 ? phase >= cardPhase : phase >= 6
 const isJudged = i < 2 ? phase >= verdictPhase : phase >= 7
 const isRejected = pivot.verdict === 'rejected'
 const isAccepted = pivot.verdict === 'accepted'

 return (
 <m.div
 key={pivot.version}
 initial={{ opacity: 0, y: 20, scale: 0.95 }}
 animate={
 isVisible
 ? { opacity: isJudged && isRejected ? 0.65 : 1, y: 0, scale: 1 }
 : { opacity: 0, y: 20, scale: 0.95 }
 }
 transition={{ duration: 0.6, ease }}
 className="relative rounded-xl border overflow-hidden"
 style={{
 borderColor: isJudged
 ? isAccepted
 ? 'color-mix(in srgb, var(--cs-accent) 25%, transparent)'
 : 'var(--overlay-white-08)'
 : 'var(--overlay-white-08)',
 background: isJudged && isAccepted
 ? 'color-mix(in srgb, var(--cs-accent) 4%, transparent)'
 : 'var(--overlay-white-02)',
 transition: 'border-color 0.5s, background 0.5s, opacity 0.5s',
 boxShadow: isJudged && isAccepted
 ? '0 0 24px color-mix(in srgb, var(--cs-accent) 8%, transparent)'
 : 'none',
 }}
 >
 {/* Top accent bar */}
 <m.div
 initial={{ scaleX: 0 }}
 animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
 transition={{ duration: 0.5, delay: 0.1, ease }}
 className="h-[2px] origin-left"
 style={{
 background: isJudged
 ? isAccepted
 ? 'var(--cs-accent)'
 : 'var(--overlay-white-15)'
 : 'var(--overlay-white-10)',
 transition: 'background 0.5s',
 }}
 />

 <div className="p-4">
 {/* Version badge + title */}
 <div className="flex items-center gap-2.5 mb-2">
 <m.div
 className="w-8 h-8 rounded-full flex items-center justify-center relative"
 style={{
 background: isJudged
 ? isAccepted
 ? 'color-mix(in srgb, var(--cs-accent) 15%, transparent)'
 : 'var(--overlay-white-06)'
 : 'var(--overlay-white-06)',
 border: `2px solid ${isJudged
 ? isAccepted
 ? 'color-mix(in srgb, var(--cs-accent) 40%, transparent)'
 : 'var(--overlay-white-10)'
 : 'var(--overlay-white-10)'
 }`,
 transition: 'all 0.4s',
 }}
 >
 <span className="font-mono text-[11px] font-bold" style={{
 color: isJudged && isRejected
 ? isAccepted ? 'var(--cs-accent)' : 'var(--zinc-400)'
 : 'var(--white)',
 transition: 'color 0.4s',
 }}>
 {pivot.version}
 </span>
 </m.div>
 <span className={`text-sm font-semibold tracking-tight ${isJudged && isRejected ? 'line-through decoration-zinc-500/50 text-zinc-400' : 'text-white'
 }`} style={{ transition: 'color 0.4s' }}>
 {pivot.title}
 </span>
 </div>

 {/* Verdict reason */}
 <AnimatePresence>
 {isJudged && (
 <m.div
 initial={{ opacity: 0, y: 6 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.4, ease }}
 className="flex items-start gap-2 mt-2"
 >
 <div className={`w-0.5 min-h-[20px] rounded-full flex-shrink-0 mt-0.5 ${isAccepted ? 'bg-[color-mix(in_srgb,var(--cs-accent)_40%,transparent)]' : 'bg-zinc-600/30'
 }`} />
 <p className={`text-xs font-mono italic leading-relaxed ${isAccepted ? '' : 'text-zinc-400'
 }`} style={isAccepted ? { color: 'var(--cs-accent)' } : {}}>
 {pivot.reason}
 </p>
 </m.div>
 )}
 </AnimatePresence>

 {/* Stamp */}
 <AnimatePresence>
 {isJudged && (
 <m.div
 initial={{ opacity: 0, scale: 2.5 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.2, ease: 'easeOut' }}
 className="mt-3 flex items-center gap-1.5"
 >
 {isAccepted ? (
 <Check className="w-3.5 h-3.5" style={{ color: 'var(--cs-accent)' }} strokeWidth={2.5} />
 ) : (
 <X className="w-3.5 h-3.5 text-zinc-400" strokeWidth={2.5} />
 )}
 <span className={`font-mono text-[11px] tracking-[0.2em] uppercase ${isAccepted ? '' : 'text-zinc-400'
 }`} style={isAccepted ? { color: 'var(--cs-accent)' } : {}}>
 {isAccepted ? 'Approved' : 'Rejected'}
 </span>
 </m.div>
 )}
 </AnimatePresence>
 </div>
 </m.div>
 )
 })}
 </div>

 {/* Closing line */}
 <AnimatePresence>
 {phase >= 7 && (
 <m.div
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease }}
 className="text-center mt-6"
 >
 <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-4" />
 <p className="text-zinc-400 text-sm leading-relaxed">
 Two rejections. Zero bitterness. Each &ldquo;no&rdquo; sharpened the final solution.
 </p>
 </m.div>
 )}
 </AnimatePresence>

 </div>
 </div>
 </div>
 )
}
