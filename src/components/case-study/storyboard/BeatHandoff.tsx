'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FileText, Video, PenTool, Ticket, StickyNote, Map, FolderOpen, Check } from 'lucide-react'
import PresenterBar from './PresenterBar'
import { withHexAlpha } from '@/lib/color-utils'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface FolderItem {
    icon: React.ElementType
    label: string
    count: number
    displayCount: string
    color: string
}

const FOLDER_CONTENTS: FolderItem[] = [
    { icon: StickyNote, label: 'Research & findings', count: 40, displayCount: '40+', color: 'var(--accent-amber)' },
    { icon: Map, label: 'Pain point maps & flows', count: 25, displayCount: '25+', color: 'var(--semantic-blue-500)' },
    { icon: PenTool, label: 'Sketch files & prototypes', count: 80, displayCount: '80+', color: 'var(--semantic-purple-500)' },
    { icon: Video, label: 'Zoom demo recordings', count: 15, displayCount: '15+', color: 'var(--semantic-rose-500)' },
    { icon: FileText, label: 'Current-state docs & scratchpads', count: 30, displayCount: '30+', color: 'var(--semantic-green-500)' },
    { icon: Ticket, label: 'JIRA epics & ticket tracking', count: 60, displayCount: '60+', color: 'var(--semantic-cyan-500)' },
]

/* ── Animated file counter ── */
function FileCounter({ target, active, color }: { target: number; active: boolean; color: string }) {
    const [val, setVal] = useState(0)
    useEffect(() => {
        if (!active) { setVal(0); return }
        let frame = 0
        const step = Math.max(1, Math.floor(target / 20))
        const id = setInterval(() => {
            frame += step
            if (frame >= target) {
                setVal(target)
                clearInterval(id)
            } else {
                setVal(frame)
            }
        }, 40)
        return () => clearInterval(id)
    }, [active, target])
    return (
        <span className="text-lg font-bold font-mono tabular-nums" style={{ color }}>
            {val}+
        </span>
    )
}

/* ── Total counter ── */
function TotalCounter({ active }: { active: boolean }) {
    const [val, setVal] = useState(0)
    useEffect(() => {
        if (!active) { setVal(0); return }
        let frame = 0
        const id = setInterval(() => {
            frame += 7
            if (frame >= 250) {
                setVal(250)
                clearInterval(id)
            } else {
                setVal(frame)
            }
        }, 30)
        return () => clearInterval(id)
    }, [active])
    return (
        <span className="text-4xl md:text-5xl font-black font-mono tabular-nums text-white">
            {val}<span className="text-emerald-400">+</span>
        </span>
    )
}

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
        // 0: Speech
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // 1: Folder opens
        timers.current.push(setTimeout(() => setPhase(1), 1200))
        // 2-7: Each file category drops in with counter
        FOLDER_CONTENTS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(2 + i), 1800 + i * 600))
        })
        // 8: Total reveal
        timers.current.push(setTimeout(() => setPhase(8), 5700))
        // 9: Closer
        timers.current.push(setTimeout(() => setPhase(9), 7200))
    }, [clear])

    useEffect(() => {
        if (isInView) play()
        else { clear(); setPhase(-1) }
        return clear
    }, [isInView, play, clear])

    // Progressive total
    const activeItems = FOLDER_CONTENTS.slice(0, Math.max(0, phase - 1))
    const runningTotal = activeItems.reduce((sum, item) => sum + item.count, 0)

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    {/* Speech */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <PresenterBar>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                        I didn&apos;t just hand off files.
                                    </p>
                                    <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
                                        I built a living system. 📂
                                    </p>
                                    <p className="text-sm md:text-base text-zinc-500 mt-2 italic">
                                        A Google Drive folder — the single source of truth for the entire project. Every spec, every decision, every edge case.
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Folder visualization ── */}
                    <div className="max-w-2xl mx-auto">
                        {/* Folder header — opens with animation */}
                        <AnimatePresence>
                            {phase >= 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease }}
                                    className="relative mb-5"
                                >
                                    <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
                                        <motion.div
                                            initial={{ scale: 0, rotate: -20 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                                            className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center"
                                        >
                                            <FolderOpen className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                                        </motion.div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-white">RC Project Folder</div>
                                            <div className="text-[10px] font-mono text-zinc-500 tracking-wide">GOOGLE DRIVE · SHARED</div>
                                        </div>
                                        <div className="text-right">
                                            <motion.div
                                                className="text-xl font-bold font-mono tabular-nums text-zinc-400"
                                                key={runningTotal}
                                            >
                                                {phase >= 8 ? '250+' : `${runningTotal}+`}
                                            </motion.div>
                                            <div className="text-[9px] font-mono text-zinc-600 tracking-wide">FILES</div>
                                        </div>
                                    </div>

                                    {/* Loading bar */}
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.03]">
                                        <motion.div
                                            initial={{ width: '0%' }}
                                            animate={{ width: phase >= 8 ? '100%' : `${((phase - 1) / 7) * 100}%` }}
                                            transition={{ duration: 0.4, ease }}
                                            className="h-full rounded-full"
                                            style={{
                                                background: 'linear-gradient(90deg, var(--semantic-blue-500), var(--semantic-green-500))',
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* File categories — cascade in */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {FOLDER_CONTENTS.map((item, i) => {
                                const Icon = item.icon
                                const isVisible = phase >= i + 2
                                return (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                        animate={
                                            isVisible
                                                ? { opacity: 1, y: 0, scale: 1 }
                                                : { opacity: 0, y: 30, scale: 0.8 }
                                        }
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.34, 1.56, 0.64, 1],
                                        }}
                                        className="relative rounded-xl border bg-white/[0.02] p-4 overflow-hidden group"
                                        style={{
                                            borderColor: isVisible ? withHexAlpha(item.color, '20') : 'var(--overlay-white-04)',
                                        }}
                                    >
                                        {/* Top accent */}
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2, ease }}
                                            className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                                            style={{ background: item.color }}
                                        />

                                        {/* Icon + counter row */}
                                        <div className="flex items-center justify-between mb-3">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={isVisible ? { scale: 1 } : { scale: 0 }}
                                                transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                                                className="w-9 h-9 rounded-lg flex items-center justify-center"
                                                style={{
                                                    background: withHexAlpha(item.color, '15'),
                                                    border: `1px solid ${withHexAlpha(item.color, '25')}`,
                                                }}
                                            >
                                                <Icon className="w-4 h-4" style={{ color: item.color }} strokeWidth={1.5} />
                                            </motion.div>
                                            <FileCounter target={item.count} active={isVisible} color={item.color} />
                                        </div>

                                        {/* Label */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                            transition={{ duration: 0.4, delay: 0.3 }}
                                            className="text-[11px] text-zinc-400 leading-snug"
                                        >
                                            {item.label}
                                        </motion.div>

                                        {/* Shimmer sweep */}
                                        {isVisible && (
                                            <motion.div
                                                initial={{ x: '-100%' }}
                                                animate={{ x: '200%' }}
                                                transition={{ duration: 1, delay: 0.1, ease: 'easeInOut' }}
                                                className="absolute inset-0 pointer-events-none"
                                                style={{
                                                    background: 'linear-gradient(90deg, transparent 0%, var(--overlay-white-04) 50%, transparent 100%)',
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* ── Grand total reveal ── */}
                        <AnimatePresence>
                            {phase >= 8 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.8, ease }}
                                    className="mt-8 text-center"
                                >
                                    <div className="inline-flex flex-col items-center gap-3 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] px-10 py-6 relative overflow-hidden">
                                        {/* Glow */}
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: 'radial-gradient(ellipse at center, var(--overlay-green-08) 0%, transparent 70%)',
                                            }}
                                        />

                                        <TotalCounter active={phase >= 8} />
                                        <div className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest">
                                            files organized and handed off
                                        </div>

                                        {/* Checkmark seal */}
                                        <motion.div
                                            initial={{ scale: 0, rotate: -30 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ duration: 0.5, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                                            className="w-10 h-10 rounded-full border-2 border-emerald-400/30 flex items-center justify-center mt-1"
                                        >
                                            <Check className="w-5 h-5 text-emerald-400" strokeWidth={2.5} />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Closer */}
                    <AnimatePresence>
                        {phase >= 9 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="text-center mt-8"
                            >
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
