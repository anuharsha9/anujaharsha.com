'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ── Wireframe skeleton line ────────────────────── */
function SkeletonLine({ w = '100%', h = 6, className = '' }: { w?: string | number; h?: number; className?: string }) {
 return (
 <div
 className={`rounded-full ${className}`}
 style={{ width: w, height: h }}
 />
 )
}

/* ── Wireframe UI panel ─────────────────────────── */
function WireframePanel({
 label,
 children,
 borderColor = 'border-white/[0.08]',
 accentColor = 'bg-zinc-700/40',
 dimmed = false,
 strikethrough = false,
}: {
 label: string
 children: React.ReactNode
 borderColor?: string
 accentColor?: string
 dimmed?: boolean
 strikethrough?: boolean
}) {
 return (
 <div className={`rounded-xl border ${borderColor} bg-zinc-900/60 p-4 transition-opacity duration-700 ${dimmed ? 'opacity-30' : 'opacity-100'}`}>
 {/* Title bar */}
 <div className="flex items-center gap-2 mb-3">
 <div className="flex gap-1">
 <div className="w-2 h-2 rounded-full bg-zinc-600" />
 <div className="w-2 h-2 rounded-full bg-zinc-600" />
 <div className="w-2 h-2 rounded-full bg-zinc-600" />
 </div>
 <span className={`text-[10px] font-mono uppercase tracking-wider ${strikethrough ? 'text-zinc-600 line-through' : 'text-zinc-400'}`}>
 {label}
 </span>
 </div>
 {/* Skeleton content */}
 <div className="space-y-2">
 {children}
 </div>
 {/* Strike overlay */}
 {strikethrough && (
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="w-[80%] h-[1px] bg-zinc-500/30 rotate-[-8deg]" />
 </div>
 )}
 </div>
 )
}

export default function BeatScheduler() {
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
 timers.current.push(setTimeout(() => setPhase(2), 1900))
 timers.current.push(setTimeout(() => setPhase(3), 2700))
 timers.current.push(setTimeout(() => setPhase(4), 3500))
 timers.current.push(setTimeout(() => setPhase(5), 4300))
 timers.current.push(setTimeout(() => setPhase(6), 5100))
 timers.current.push(setTimeout(() => setPhase(7), 6100))
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
 The scheduler hadn&apos;t been redesigned in{' '}
 <span className="text-zinc-200 font-bold">40+ years.</span>{' '}
 Two entry points. Two completely different UIs —{' '}
 <span className="text-zinc-200 font-medium">Basic</span> and{' '}
 <span className="text-zinc-200 font-medium">Advanced</span> — doing the same thing, differently.
 </p>
 </PresenterBar>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Wireframe visualization */}
 <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center mt-2">

 {/* ── BEFORE: Two separate panels ────── */}
 <div>
 <AnimatePresence>
 {phase >= 1 && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, ease }}
 className="space-y-3"
 >
 <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase mb-3">
 Before
 </div>

 {/* Basic panel */}
 <motion.div
 animate={phase >= 2 ? { opacity: 0.3, scale: 0.97 } : { opacity: 1, scale: 1 }}
 transition={{ duration: 0.8, ease }}
 className="relative"
 >
 <WireframePanel
 label="Basic Mode"
 borderColor="border-white/[0.06]"
 strikethrough={phase >= 2}
 >
 <SkeletonLine w="60%" className="bg-zinc-700/50" />
 <SkeletonLine w="80%" className="bg-zinc-700/30" />
 <SkeletonLine w="45%" className="bg-zinc-700/30" />
 <div className="flex gap-2 mt-2">
 <div className="w-14 h-5 rounded bg-zinc-700/30" />
 <div className="w-14 h-5 rounded bg-zinc-700/20" />
 </div>
 </WireframePanel>
 {phase >= 2 && (
 <motion.div
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ duration: 0.4, ease }}
 className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-zinc-500/40 origin-left"
 />
 )}
 </motion.div>

 {/* Advanced panel */}
 <motion.div
 animate={phase >= 2 ? { opacity: 0.3, scale: 0.97 } : { opacity: 1, scale: 1 }}
 transition={{ duration: 0.8, ease, delay: 0.1 }}
 className="relative"
 >
 <WireframePanel
 label="Advanced Mode"
 borderColor="border-white/[0.06]"
 strikethrough={phase >= 2}
 >
 <SkeletonLine w="70%" className="bg-zinc-700/50" />
 <SkeletonLine w="90%" className="bg-zinc-700/30" />
 <SkeletonLine w="55%" className="bg-zinc-700/30" />
 <SkeletonLine w="75%" className="bg-zinc-700/30" />
 <div className="flex gap-2 mt-2">
 <div className="w-14 h-5 rounded bg-zinc-700/30" />
 <div className="w-14 h-5 rounded bg-zinc-700/20" />
 <div className="w-14 h-5 rounded bg-zinc-700/20" />
 </div>
 </WireframePanel>
 {phase >= 2 && (
 <motion.div
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ duration: 0.4, ease, delay: 0.15 }}
 className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-zinc-500/40 origin-left"
 />
 )}
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 {/* ── Arrow / transformation ────────── */}
 <AnimatePresence>
 {phase >= 3 && (
 <motion.div
 initial={{ opacity: 0, scale: 0 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ type: 'spring', damping: 15, stiffness: 200 }}
 className="hidden md:flex flex-col items-center gap-2"
 >
 <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: '1px solid color-mix(in srgb, var(--cs-accent) 20%, transparent)', background: 'color-mix(in srgb, var(--cs-accent) 5%, transparent)' }}>
 <span className="text-sm" style={{ color: 'var(--cs-accent)' }}>→</span>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 {/* ── AFTER: One unified modal ───────── */}
 <div>
 <AnimatePresence>
 {phase >= 4 && (
 <motion.div
 initial={{ opacity: 0, y: 20, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 transition={{ duration: 0.7, ease }}
 >
 <div className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--cs-accent)', opacity: 0.6 }}>
 After
 </div>

 {/* Unified modal wireframe */}
 <div className="rounded-xl border p-4 relative overflow-hidden" style={{ borderColor: 'color-mix(in srgb, var(--cs-accent) 20%, transparent)', background: 'color-mix(in srgb, var(--cs-accent) 2%, transparent)' }}>
 {/* Modal title bar */}
 <div className="flex items-center gap-2 mb-4">
 <div className="flex gap-1">
 <div className="w-2 h-2 rounded-full" style={{ background: 'color-mix(in srgb, var(--cs-accent) 30%, transparent)' }} />
 <div className="w-2 h-2 rounded-full" style={{ background: 'color-mix(in srgb, var(--cs-accent) 20%, transparent)' }} />
 <div className="w-2 h-2 rounded-full" style={{ background: 'color-mix(in srgb, var(--cs-accent) 20%, transparent)' }} />
 </div>
 <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--cs-accent)', opacity: 0.7 }}>
 Unified Scheduler
 </span>
 </div>

 {/* Top section — always visible */}
 <div className="space-y-2 mb-3">
 <SkeletonLine w="50%" className="bg-[color-mix(in_srgb,var(--cs-accent)_20%,transparent)]" />
 <SkeletonLine w="70%" className="bg-[color-mix(in_srgb,var(--cs-accent)_10%,transparent)]" />
 </div>

 {/* Progressive disclosure layers */}
 <AnimatePresence>
 {phase >= 5 && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: 'auto', opacity: 1 }}
 transition={{ duration: 0.6, ease }}
 className="overflow-hidden"
 >
 <div className="border-t pt-3 mt-1 space-y-2" style={{ borderColor: 'color-mix(in srgb, var(--cs-accent) 10%, transparent)' }}>
 <div className="flex items-center gap-2">
 <div className="w-3 h-3 rounded flex items-center justify-center" style={{ border: '1px solid color-mix(in srgb, var(--cs-accent) 30%, transparent)' }}>
 <motion.span
 initial={{ scale: 0 }}
 animate={{ scale: 1 }}
 transition={{ delay: 0.3 }}
 className="text-[6px]" style={{ color: 'var(--cs-accent)' }}
 >
 ▾
 </motion.span>
 </div>
 <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--cs-accent)', opacity: 0.5 }}>
 Advanced options
 </span>
 </div>
 <SkeletonLine w="65%" className="bg-[color-mix(in_srgb,var(--cs-accent)_10%,transparent)]" />
 <SkeletonLine w="80%" className="bg-[color-mix(in_srgb,var(--cs-accent)_10%,transparent)]" />
 <SkeletonLine w="40%" className="bg-[color-mix(in_srgb,var(--cs-accent)_10%,transparent)]" />
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Contextual launch indicator */}
 <AnimatePresence>
 {phase >= 6 && (
 <motion.div
 initial={{ opacity: 0, y: 8 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, ease }}
 className="mt-3 pt-3" style={{ borderTop: '1px solid color-mix(in srgb, var(--cs-accent) 10%, transparent)' }}
 >
 <div className="flex items-center gap-2">
 <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--cs-accent) 10%, transparent)' }}>
 <span className="text-[9px]" style={{ color: 'var(--cs-accent)' }}>+</span>
 </div>
 <span className="text-[10px] font-mono" style={{ color: 'var(--cs-accent)', opacity: 0.4 }}>
 Launch from anywhere
 </span>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Subtle glow pulse */}
 <motion.div
 animate={{ opacity: [0, 0.15, 0] }}
 transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
 className="absolute inset-0 rounded-xl pointer-events-none" style={{ background: 'linear-gradient(to bottom right, color-mix(in srgb, var(--cs-accent) 5%, transparent), transparent)' }}
 />
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>

 {/* Closing */}
 <AnimatePresence>
 {phase >= 7 && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, ease }}
 className="text-center mt-8"
 >
 <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
 One modal. Any complexity level.
 </p>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>
 </div>
 )
}
