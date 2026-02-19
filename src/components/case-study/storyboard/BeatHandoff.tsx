'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FileText, Video, PenTool, Ticket, StickyNote, Map, FolderOpen } from 'lucide-react'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface FolderItem {
    icon: React.ElementType
    label: string
    count?: string
    color: string
}

const FOLDER_CONTENTS: FolderItem[] = [
    { icon: StickyNote, label: 'Research & findings', count: '40+', color: 'text-amber-400' },
    { icon: Map, label: 'Pain point maps & flows', count: '25+', color: 'text-blue-400' },
    { icon: PenTool, label: 'Sketch files & prototypes', count: '80+', color: 'text-purple-400' },
    { icon: Video, label: 'Zoom demo recordings', count: '15+', color: 'text-rose-400' },
    { icon: FileText, label: 'Current-state docs & scratchpads', count: '30+', color: 'text-emerald-400' },
    { icon: Ticket, label: 'JIRA epics & ticket tracking', count: '60+', color: 'text-cyan-400' },
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
        FOLDER_CONTENTS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 1), 1000 + i * 500))
        })
        timers.current.push(setTimeout(() => setPhase(FOLDER_CONTENTS.length + 1), 4500))
    }, [clear])

    useEffect(() => {
        if (isInView) play()
        else { clear(); setPhase(-1) }
        return clear
    }, [isInView, play, clear])

    const totalFiles = phase >= FOLDER_CONTENTS.length + 1 ? '250+' :
        FOLDER_CONTENTS.slice(0, Math.max(0, phase)).reduce((sum, item) => {
            const num = parseInt(item.count || '0')
            return sum + num
        }, 0).toString()

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">
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

                    {/* Google Drive folder visualization */}
                    <div className="max-w-2xl mx-auto">
                        {/* Folder header */}
                        <AnimatePresence>
                            {phase >= 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease }}
                                    className="flex items-center gap-3 mb-4 pb-3 border-b border-white/[0.06]"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                                        <FolderOpen className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-white">RC Project Folder</div>
                                        <div className="text-[10px] font-mono text-zinc-500 tracking-wide">GOOGLE DRIVE · SHARED</div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-xs font-mono text-zinc-500"
                                    >
                                        {totalFiles} files
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* File grid — visual folder contents */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                            {FOLDER_CONTENTS.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={phase >= i + 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, ease }}
                                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 flex flex-col gap-2.5 hover:bg-white/[0.04] transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className={`w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center`}>
                                            {(() => { const Icon = item.icon; return <Icon className={`w-4 h-4 ${item.color}`} strokeWidth={1.5} /> })()}
                                        </div>
                                        <span className="text-[10px] font-mono text-zinc-600">{item.count}</span>
                                    </div>
                                    <div className="text-[11px] text-zinc-400 leading-snug">{item.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Closing line */}
                    <AnimatePresence>
                        {phase >= FOLDER_CONTENTS.length + 1 && (
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
