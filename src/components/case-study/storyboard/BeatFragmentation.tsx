'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { m, AnimatePresence, useInView } from 'framer-motion'
import { Calendar, Mail, Lock, FolderOpen, Settings, type LucideIcon } from 'lucide-react'
import PresenterBar from './PresenterBar'
import { EASE_CINEMATIC as ease } from '@/lib/motion'

interface SystemNode {
 icon: LucideIcon
 label: string
 desc: string
 wireframe: string[] // wireframe skeleton lines
}

const SYSTEMS: SystemNode[] = [
 {
 icon: Calendar, label: 'Schedules', desc: 'Buried under 4 clicks',
 wireframe: ['▬▬▬▬▬▬', '├─ ▬▬▬', '├─ ▬▬▬', '└─ ▬▬▬'],
 },
 {
 icon: Mail, label: 'Distribution Lists', desc: 'Buried alongside schedules',
 wireframe: ['◻ ▬▬▬▬', '◻ ▬▬▬▬', '◻ ▬▬▬▬', '+ Add...'],
 },
 {
 icon: Lock, label: 'Access Lists', desc: 'Same depth. Same friction.',
 wireframe: ['🔒 ▬▬▬', '├─ ◻ ▬', '├─ ◻ ▬', '└─ ◻ ▬'],
 },
 {
 icon: FolderOpen, label: 'Explorer', desc: 'Hidden in a hamburger menu',
 wireframe: ['📁 Root/', '├─ 📁 /', '│ └─ 📄', '└─ 📁 /'],
 },
 {
 icon: Settings, label: 'Admin Console', desc: 'Inside another admin panel',
 wireframe: ['⚙ Config', '├─ ▬▬▬', '├─ ▬▬▬', '└─ ▬▬▬'],
 },
]

const PAIN_POINTS = [
 { stat: '5', label: 'Systems posing as one' },
 { stat: '40+', label: 'Years without a redesign' },
 { stat: '4', label: 'Clicks just to start' },
 { stat: '0', label: 'Competitive parity with Power BI' },
]

// SVG connection paths between nodes (chaos wiring)
const CHAOS_PATHS = [
 'M 10,50 C 30,20 70,80 90,50',
 'M 20,30 C 40,70 60,10 80,60',
 'M 15,70 C 35,30 65,90 85,40',
 'M 30,20 C 50,60 50,40 70,80',
 'M 5,40 C 25,80 75,20 95,60',
]

export default function BeatFragmentation() {
 const ref = useRef<HTMLDivElement>(null)
 const isInView = useInView(ref, { once: true, amount: 0.3 })
 const [phase, setPhase] = useState(-1)
 const timers = useRef<NodeJS.Timeout[]>([])

 const clear = useCallback(() => {
 timers.current.forEach(clearTimeout)
 timers.current = []
 }, [])

 const startVisuals = useCallback(() => {
 // Phase 1-3: Competitor comparison
 timers.current.push(setTimeout(() => setPhase(1), 300))
 timers.current.push(setTimeout(() => setPhase(2), 1600))
 timers.current.push(setTimeout(() => setPhase(3), 2800))
 // Phase 4-5: System chips appear
 timers.current.push(setTimeout(() => setPhase(4), 4200))
 timers.current.push(setTimeout(() => setPhase(5), 5000))
 // Phase 6-7: Chaos wiring + red tinting
 timers.current.push(setTimeout(() => setPhase(6), 6200))
 timers.current.push(setTimeout(() => setPhase(7), 7500))
 // Phase 8: Pain points section
 timers.current.push(setTimeout(() => setPhase(8), 9000))
 // Phase 9-12: Individual pain points
 PAIN_POINTS.forEach((_, i) => {
 timers.current.push(setTimeout(() => setPhase(9 + i), 9800 + i * 700))
 })
 // Phase 13-14: Closing
 timers.current.push(setTimeout(() => setPhase(13), 12800))
 timers.current.push(setTimeout(() => setPhase(14), 14500))
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
 Not a feature.{' '}
 <span className="text-zinc-200 font-medium">A product inside a product</span> — 40+ years old, zero documentation, five independent subsystems. Customers running 13 million schedules a day on a tool nobody on the team truly understood.
 </p>
 </PresenterBar>
 </m.div>
 )}
 </AnimatePresence>

 {/* ── Visual: Competitor vs RC ── */}
 <AnimatePresence>
 {phase >= 1 && (
 <m.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease }}
 className="mt-6 mb-8"
 >
 <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
 {/* Modern competitor (Power BI style) */}
 <m.div
 initial={{ opacity: 0, x: -20 }}
 animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
 transition={{ duration: 0.6, delay: 0.2, ease }}
 className="rounded-xl border bg-gradient-to-br from-zinc-900/40 to-zinc-950/60 p-4 relative overflow-hidden"
 style={{ borderColor: 'color-mix(in srgb, var(--cs-accent) 15%, transparent)' }}
 >
 <div className="text-[11px] font-mono tracking-widest uppercase mb-3" style={{ color: 'var(--cs-accent)', opacity: 0.7 }}>Modern BI tools</div>
 {/* Mini dashboard mockup */}
 <div className="space-y-2">
 <div className="flex gap-2">
 <div className="flex-1 h-12 rounded-lg border border-white/[0.06]" style={{ background: 'color-mix(in srgb, var(--cs-accent) 10%, transparent)' }} />
 <div className="flex-1 h-12 rounded-lg border border-white/[0.06]" style={{ background: 'color-mix(in srgb, var(--cs-accent) 6%, transparent)' }} />
 </div>
 <div className="h-16 rounded-lg border border-white/[0.06] flex items-end p-2 gap-1" style={{ background: 'color-mix(in srgb, var(--cs-accent) 5%, transparent)' }}>
 {[65, 45, 80, 55, 70, 90, 60, 75, 85].map((h, i) => (
 <m.div
 key={i}
 className="flex-1 rounded-sm"
 style={{ background: 'color-mix(in srgb, var(--cs-accent) 30%, transparent)' }}
 initial={{ height: 0 }}
 animate={phase >= 2 ? { height: `${h}%` } : { height: 0 }}
 transition={{ duration: 0.5, delay: 0.3 + i * 0.05, ease }}
 />
 ))}
 </div>
 <div className="flex gap-2">
 <div className="h-3 flex-[2] rounded-full" style={{ background: 'color-mix(in srgb, var(--cs-accent) 12%, transparent)' }} />
 <div className="h-3 flex-1 rounded-full" style={{ background: 'color-mix(in srgb, var(--cs-accent) 10%, transparent)' }} />
 </div>
 </div>
 {/* Glow */}
 <m.div
 initial={{ opacity: 0 }}
 animate={phase >= 2 ? { opacity: 1 } : {}}
 transition={{ duration: 1 }}
 className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl pointer-events-none"
 style={{ background: 'color-mix(in srgb, var(--cs-accent) 8%, transparent)' }}
 />
 <div className="mt-3 text-[11px] font-mono" style={{ color: 'var(--cs-accent)', opacity: 0.6 }}>✓ Unified · Modern · Intuitive</div>
 </m.div>

 {/* ReportCaster (dated) */}
 <m.div
 initial={{ opacity: 0, x: 20 }}
 animate={phase >= 2 ? { opacity: 1, x: 0 } : {}}
 transition={{ duration: 0.6, delay: 0.4, ease }}
 className="rounded-xl border border-zinc-700/40 bg-zinc-900/60 p-4 relative overflow-hidden"
 >
 <div className="text-[11px] font-mono text-zinc-400 tracking-widest uppercase mb-3">ReportCaster</div>
 {/* Dated UI mockup — gray boxes, no polish */}
 <div className="space-y-2">
 <div className="h-5 bg-zinc-800/80 rounded-sm border border-zinc-700/30 flex items-center px-2">
 <div className="flex gap-1">
 <div className="w-6 h-2.5 bg-zinc-700/60 rounded-sm" />
 <div className="w-8 h-2.5 bg-zinc-700/60 rounded-sm" />
 <div className="w-5 h-2.5 bg-zinc-700/60 rounded-sm" />
 </div>
 </div>
 <div className="flex gap-1.5">
 <div className="w-16 space-y-1">
 {[1, 2, 3, 4].map(i => (
 <div key={i} className="h-3 bg-zinc-800/60 rounded-sm border border-zinc-700/20" />
 ))}
 </div>
 <div className="flex-1 h-[60px] bg-zinc-800/40 rounded-sm border border-zinc-700/20 grid grid-cols-3 gap-px p-1">
 {[1, 2, 3, 4, 5, 6].map(i => (
 <div key={i} className="bg-zinc-700/20 rounded-sm" />
 ))}
 </div>
 </div>
 <div className="h-3 bg-zinc-800/50 rounded-sm border border-zinc-700/20" />
 </div>
 {/* Outdated stamp */}
 <m.div
 initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
 animate={phase >= 3 ? { opacity: 1, scale: 1, rotate: -5 } : {}}
 transition={{ duration: 0.4, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
 className="absolute top-3 right-3 px-2 py-0.5 rounded border border-zinc-500/30 bg-zinc-500/10"
 >
 <span className="text-[11px] font-mono text-zinc-400 tracking-wider uppercase">Outdated</span>
 </m.div>
 <div className="mt-3 text-[11px] text-zinc-400 font-mono">✗ Fragmented · Dated · Buried</div>
 </m.div>
 </div>
 </m.div>
 )}
 </AnimatePresence>

 {/* ── Fragmented systems row ── */}
 <AnimatePresence>
 {phase >= 4 && (
 <m.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.5 }}
 className="mb-6"
 >
 <div className="text-[11px] font-mono text-zinc-400 tracking-widest uppercase text-center mb-3">
 5 systems pretending to be one product
 </div>
 <div className="relative">
 <div className="flex flex-wrap justify-center gap-2">
 {SYSTEMS.map((sys, i) => {
 const Icon = sys.icon
 const isVisible = phase >= 4 + i * 0.5
 const isChaos = phase >= 7
 return (
 <m.div
 key={sys.label}
 initial={{ opacity: 0, scale: 0.8 }}
 animate={isVisible ? { opacity: 1, scale: 1 } : {}}
 transition={{ duration: 0.4, delay: i * 0.15, ease }}
 className="flex items-center gap-2 px-3 py-2 rounded-lg border"
 style={{
 borderColor: isChaos ? 'var(--overlay-white-08)' : 'var(--overlay-white-08)',
 background: isChaos ? 'var(--overlay-white-03)' : 'var(--overlay-white-02)',
 transition: 'border-color 0.6s, background 0.6s',
 }}
 >
 <Icon className="w-3.5 h-3.5" strokeWidth={1.5} style={{
 color: isChaos ? 'var(--overlay-zinc-400)' : 'var(--overlay-zinc-400)',
 transition: 'color 0.6s',
 }} />
 <span className="text-xs text-zinc-200 font-medium">{sys.label}</span>
 </m.div>
 )
 })}
 </div>

 {/* Chaos connections overlay */}
 {phase >= 6 && (
 <m.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.6 }}
 className="absolute inset-0 pointer-events-none"
 >
 <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
 {CHAOS_PATHS.map((d, i) => (
 <m.path
 key={i}
 d={d}
 fill="none"
 stroke="var(--overlay-white-10)"
 strokeWidth="0.4"
 strokeDasharray="2 2"
 initial={{ pathLength: 0 }}
 animate={{ pathLength: 1 }}
 transition={{ duration: 0.8, delay: i * 0.1, ease }}
 />
 ))}
 </svg>
 </m.div>
 )}
 </div>
 </m.div>
 )}
 </AnimatePresence>

 {/* Divider */}
 <AnimatePresence>
 {phase >= 8 && (
 <m.div
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ duration: 0.6, ease }}
 className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-8 origin-left"
 />
 )}
 </AnimatePresence>

 {/* Pain point stats */}
 <AnimatePresence>
 {phase >= 8 && (
 <m.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 >
 <div className="font-mono text-xs tracking-[0.25em] uppercase text-center mb-6" style={{ color: 'var(--cs-accent)', opacity: 0.5 }}>
 Why customers were leaving
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
 {PAIN_POINTS.map((pp, i) => (
 <m.div
 key={pp.label}
 initial={{ opacity: 0, y: 20, scale: 0.9 }}
 animate={
 phase >= 9 + i
 ? { opacity: 1, y: 0, scale: 1 }
 : { opacity: 0, y: 20, scale: 0.9 }
 }
 transition={{ duration: 0.5, ease }}
 className="text-center"
 >
 <m.div
 className="text-3xl md:text-4xl font-bold font-mono mb-1"
 style={{ color: 'var(--cs-accent)' }}
 initial={{ scale: 1 }}
 animate={
 phase >= 9 + i
 ? { scale: [1, 1.2, 1] }
 : { scale: 1 }
 }
 transition={{ duration: 0.4, delay: 0.1 }}
 >
 {pp.stat}
 </m.div>
 <div className="text-[11px] text-zinc-400 font-mono uppercase tracking-wider leading-snug">
 {pp.label}
 </div>
 </m.div>
 ))}
 </div>
 </m.div>
 )}
 </AnimatePresence>

 {/* Closing line */}
 <AnimatePresence>
 {phase >= 13 && (
 <m.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, ease }}
 className="text-center mt-10"
 >
 <p className="text-white text-xl md:text-2xl font-semibold tracking-tight">
 Nobody had a map.
 </p>
 <p className="text-zinc-400 text-sm mt-2 font-mono">
 So I drew one.
 </p>
 </m.div>
 )}
 </AnimatePresence>



 </div>
 </div>
 </div>
 )
}
