'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Ruler, Link, FolderOpen, BookOpen, Target, type LucideIcon } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface Deliverable {
    icon: LucideIcon
    label: string
    desc: string
}

const DELIVERABLES: Deliverable[] = [
    { icon: Ruler, label: 'Complete design system', desc: 'Component library with tokens, spacing, and theming' },
    { icon: Link, label: 'Annotated prototypes', desc: 'Every flow mapped with developer annotations' },
    { icon: FolderOpen, label: 'Living Google Drive folder', desc: '250+ organized files — specs, flows, assets' },
    { icon: BookOpen, label: 'Component documentation', desc: 'Behavior specs for every interactive element' },
    { icon: Target, label: 'QA test matrices', desc: 'Edge cases and expected states per screen' },
]

export default function BeatHandoff() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout)
        timers.current = []
    }, [])

    const play = useCallback(() => {
        clear()
        setPhase(-1)
        timers.current.push(setTimeout(() => setPhase(0), 400))
        DELIVERABLES.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 1), 1200 + i * 700))
        })
        timers.current.push(setTimeout(() => setPhase(6), 5200))
    }, [clear])

    useEffect(() => {
        if (isInView) play()
        else { clear(); setPhase(-1) }
        return clear
    }, [isInView, play, clear])

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-10">
                                <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-4">Documentation</div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">The Handoff</h3>
                                <p className="text-sm text-zinc-500">Not just files — a system that could survive without me.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="space-y-3 max-w-xl mx-auto">
                        {DELIVERABLES.map((item, i) => (
                            <motion.div key={item.label} initial={{ opacity: 0, x: -25 }}
                                animate={phase >= i + 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -25 }}
                                transition={{ duration: 0.5, ease }}
                                className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center">
                                    {(() => { const Icon = item.icon; return <Icon className="w-5 h-5 text-zinc-400" strokeWidth={1.5} /> })()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white mb-0.5">{item.label}</div>
                                    <div className="text-[11px] text-zinc-500 font-mono">{item.desc}</div>
                                </div>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: 0.3, ease }}
                                    className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                                    <span className="text-[10px] text-emerald-400">✓</span>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                    <AnimatePresence>
                        {phase >= 6 && (
                            <motion.div initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }} className="text-center mt-8">
                                <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
                                    Everything they needed to build without me.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
