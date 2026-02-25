'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Calendar, Mail, Lock, FolderOpen, Settings, type LucideIcon } from 'lucide-react'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

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
        wireframe: ['📁 Root/', '├─ 📁 /', '│  └─ 📄', '└─ 📁 /'],
    },
    {
        icon: Settings, label: 'Admin Console', desc: 'Inside another admin panel',
        wireframe: ['⚙ Config', '├─ ▬▬▬', '├─ ▬▬▬', '└─ ▬▬▬'],
    },
]

const PAIN_POINTS = [
    { stat: '5', label: 'Systems posing as one' },
    { stat: '0', label: 'Lines of documentation' },
    { stat: '4', label: 'Clicks just to start' },
    { stat: '3', label: 'Entry points. None obvious.' },
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
        // Each system node staggered
        SYSTEMS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 1), 800 + i * 700))
        })
        // Phase 6: Show chaos connections
        timers.current.push(setTimeout(() => setPhase(6), 4500))
        // Phase 7: Pulse all nodes red
        timers.current.push(setTimeout(() => setPhase(7), 5800))
        // Phase 8: Pain points header
        timers.current.push(setTimeout(() => setPhase(8), 7000))
        // Phase 9-12: Each pain point stat
        PAIN_POINTS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(9 + i), 7600 + i * 500))
        })
        // Phase 13: "Nobody had a map."
        timers.current.push(setTimeout(() => setPhase(13), 10000))
        // Phase 14: Narrator
        timers.current.push(setTimeout(() => setPhase(14), 11800))
    }, [clear])

    useEffect(() => {
        if (isInView) play()
        else {
            clear()
            setPhase(-1)
        }
        return clear
    }, [isInView, play, clear])

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    {/* Presenter narration */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <PresenterBar>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                        Explorer in a new tab. Admin two clicks deep.{' '}
                                        <span className="text-zinc-200 font-medium">Schedules, DLs, ALs — all opened in separate browser tabs.</span>
                                    </p>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed mt-2">
                                        Users were jumping between tabs, losing context constantly.{' '}
                                        <span className="text-zinc-200">Everything was buried.</span>
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* System nodes — wireframe style */}
                    <div className="relative mt-6">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                            {SYSTEMS.map((sys, i) => {
                                const Icon = sys.icon
                                const isVisible = phase >= i + 1
                                const isChaos = phase >= 7
                                return (
                                    <motion.div
                                        key={sys.label}
                                        initial={{ opacity: 0, y: 30, scale: 0.85 }}
                                        animate={
                                            isVisible
                                                ? { opacity: 1, y: 0, scale: 1 }
                                                : { opacity: 0, y: 30, scale: 0.85 }
                                        }
                                        transition={{ duration: 0.5, ease }}
                                        className="relative rounded-xl border bg-white/[0.02] overflow-hidden"
                                        style={{
                                            borderColor: isChaos ? 'var(--overlay-rose-25)' : 'var(--overlay-white-08)',
                                            transition: 'border-color 0.8s ease',
                                        }}
                                    >
                                        {/* Wireframe header bar */}
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                                            transition={{ duration: 0.4, delay: 0.2, ease }}
                                            className="h-1 origin-left"
                                            style={{
                                                background: isChaos
                                                    ? 'linear-gradient(90deg, var(--overlay-rose-40), var(--overlay-rose-10))'
                                                    : 'linear-gradient(90deg, var(--overlay-white-10), transparent)',
                                                transition: 'background 0.8s ease',
                                            }}
                                        />

                                        <div className="p-3 md:p-4">
                                            {/* Icon + label row */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                                    animate={
                                                        isVisible
                                                            ? { opacity: 1, scale: 1, rotate: 0 }
                                                            : { opacity: 0, scale: 0, rotate: -45 }
                                                    }
                                                    transition={{ duration: 0.4, delay: 0.3, ease }}
                                                >
                                                    <Icon className="w-4 h-4 text-zinc-400" strokeWidth={1.5} style={{
                                                        color: isChaos ? 'var(--overlay-rose-70)' : undefined,
                                                        transition: 'color 0.8s ease',
                                                    }} />
                                                </motion.div>
                                                <motion.span
                                                    initial={{ opacity: 0, x: -8 }}
                                                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                                                    transition={{ duration: 0.4, delay: 0.4, ease }}
                                                    className="text-xs font-medium text-white"
                                                >
                                                    {sys.label}
                                                </motion.span>
                                            </div>

                                            {/* Wireframe skeleton lines */}
                                            <div className="space-y-1">
                                                {sys.wireframe.map((line, li) => (
                                                    <motion.div
                                                        key={li}
                                                        initial={{ opacity: 0, width: 0 }}
                                                        animate={
                                                            isVisible
                                                                ? { opacity: 0.5, width: '100%' }
                                                                : { opacity: 0, width: 0 }
                                                        }
                                                        transition={{
                                                            duration: 0.3,
                                                            delay: 0.5 + li * 0.12,
                                                            ease,
                                                        }}
                                                        className="text-[9px] font-mono text-zinc-600 leading-tight overflow-hidden whitespace-nowrap"
                                                    >
                                                        {line}
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* Description */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                                transition={{ duration: 0.4, delay: 0.9, ease }}
                                                className="text-[10px] text-zinc-500 font-mono mt-2 leading-snug"
                                                style={{
                                                    color: isChaos ? 'var(--overlay-rose-60)' : undefined,
                                                    transition: 'color 0.8s ease',
                                                }}
                                            >
                                                {sys.desc}
                                            </motion.div>
                                        </div>

                                        {/* Chaos pulse overlay */}
                                        {isChaos && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0, 0.15, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                                className="absolute inset-0 pointer-events-none rounded-xl"
                                                style={{
                                                    background: 'radial-gradient(circle at center, var(--overlay-rose-20) 0%, transparent 70%)',
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Chaos wiring SVG overlay */}
                        <AnimatePresence>
                            {phase >= 6 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0 pointer-events-none"
                                >
                                    <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        {CHAOS_PATHS.map((d, i) => (
                                            <motion.path
                                                key={i}
                                                d={d}
                                                fill="none"
                                                stroke="var(--overlay-rose-20)"
                                                strokeWidth="0.3"
                                                strokeDasharray="2 2"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                transition={{
                                                    pathLength: { duration: 1.2, delay: i * 0.15, ease },
                                                    opacity: { duration: 0.3, delay: i * 0.15 },
                                                }}
                                            />
                                        ))}

                                        {/* Traveling dots along paths */}
                                        {phase >= 7 && CHAOS_PATHS.slice(0, 3).map((d, i) => (
                                            <motion.circle
                                                key={`dot-${i}`}
                                                r="0.8"
                                                fill="var(--overlay-rose-50)"
                                            >
                                                <animateMotion
                                                    dur={`${3 + i * 0.5}s`}
                                                    repeatCount="indefinite"
                                                    path={d}
                                                />
                                            </motion.circle>
                                        ))}
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Divider */}
                    <AnimatePresence>
                        {phase >= 8 && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, ease }}
                                className="h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent my-8 origin-left"
                            />
                        )}
                    </AnimatePresence>

                    {/* Pain point stats */}
                    <AnimatePresence>
                        {phase >= 8 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="font-mono text-xs tracking-[0.25em] text-rose-400/70 uppercase text-center mb-6">
                                    Why customers were leaving
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
                                    {PAIN_POINTS.map((pp, i) => (
                                        <motion.div
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
                                            <motion.div
                                                className="text-3xl md:text-4xl font-bold text-rose-400 font-mono mb-1"
                                                initial={{ scale: 1 }}
                                                animate={
                                                    phase >= 9 + i
                                                        ? { scale: [1, 1.2, 1] }
                                                        : { scale: 1 }
                                                }
                                                transition={{ duration: 0.4, delay: 0.1 }}
                                            >
                                                {pp.stat}
                                            </motion.div>
                                            <div className="text-[11px] text-zinc-400 font-mono uppercase tracking-wider leading-snug">
                                                {pp.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Closing line */}
                    <AnimatePresence>
                        {phase >= 13 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="text-center mt-10"
                            >
                                <p className="text-white text-xl md:text-2xl font-semibold tracking-tight">
                                    Nobody had a map.
                                </p>
                                <p className="text-zinc-500 text-sm mt-2 font-mono">
                                    So I drew one.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>



                </div>
            </div>
        </div>
    )
}
