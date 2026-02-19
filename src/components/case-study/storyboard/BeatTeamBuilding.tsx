'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Code2, FlaskConical, ClipboardList, Headphones, type LucideIcon } from 'lucide-react'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface TeamMember {
    role: string
    count: number
    icon: LucideIcon
}

const TEAM: TeamMember[] = [
    { role: 'Engineers', count: 12, icon: Code2 },
    { role: 'QA', count: 4, icon: FlaskConical },
    { role: 'PMs', count: 2, icon: ClipboardList },
    { role: 'Support', count: 2, icon: Headphones },
]

const ONBOARDING_STEPS = [
    'Full walkthrough — old RC, new RC — for every person',
    'Design discussions finalized with lead architect and engineer',
    'Dozens of demos. Every workflow. Every edge case.',
    'Async Q&A channel — I answered every question',
]

export default function BeatTeamBuilding() {
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
        // Phase 0: Header
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1: "~20 people" counter
        timers.current.push(setTimeout(() => setPhase(1), 1200))
        // Phase 2-5: Team role cards
        TEAM.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(2 + i), 2000 + i * 500))
        })
        // Phase 6: Divider
        timers.current.push(setTimeout(() => setPhase(6), 4200))
        // Phase 7: Onboarding header
        timers.current.push(setTimeout(() => setPhase(7), 4800))
        // Phase 8-11: Onboarding steps
        ONBOARDING_STEPS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(8 + i), 5400 + i * 600))
        })
        // Phase 12: Narrator aside
        timers.current.push(setTimeout(() => setPhase(12), 8200))
        // Phase 13: "By the time I left"
        timers.current.push(setTimeout(() => setPhase(13), 10000))
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
                                        Devs, QA, PMs, BAs — most had{' '}
                                        <span className="text-zinc-200 font-medium">never worked on a modern UI before.</span>
                                    </p>
                                    <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
                                        I brought everyone up to speed.
                                    </p>
                                    <p className="text-sm md:text-base text-zinc-500 mt-2 italic">
                                        One person at a time, over 8 months. 🫡
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Big counter */}
                    <AnimatePresence>
                        {phase >= 1 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease }}
                                className="text-center mb-8"
                            >
                                <div className="text-5xl md:text-6xl font-bold text-white font-mono">
                                    ~20
                                </div>
                                <div className="text-xs text-zinc-500 font-mono uppercase tracking-[0.2em] mt-1">
                                    People assembled after design was finalized
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Team role cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        {TEAM.map((member, i) => {
                            const Icon = member.icon
                            return (
                                <motion.div
                                    key={member.role}
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={
                                        phase >= 2 + i
                                            ? { opacity: 1, y: 0, scale: 1 }
                                            : { opacity: 0, y: 20, scale: 0.9 }
                                    }
                                    transition={{ duration: 0.5, ease }}
                                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center"
                                >
                                    <div className="flex items-center justify-center mb-2">
                                        <Icon className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
                                    </div>
                                    <div className="text-2xl font-bold text-white font-mono mb-0.5">
                                        {member.count}
                                    </div>
                                    <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                                        {member.role}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Divider */}
                    <AnimatePresence>
                        {phase >= 6 && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, ease }}
                                className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-8 origin-left"
                            />
                        )}
                    </AnimatePresence>

                    {/* Onboarding */}
                    <AnimatePresence>
                        {phase >= 7 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase text-center mb-5">
                                    I onboarded every single person
                                </div>

                                <div className="space-y-2.5 max-w-lg mx-auto">
                                    {ONBOARDING_STEPS.map((step, i) => (
                                        <motion.div
                                            key={step}
                                            initial={{ opacity: 0, x: -15 }}
                                            animate={
                                                phase >= 8 + i
                                                    ? { opacity: 1, x: 0 }
                                                    : { opacity: 0, x: -15 }
                                            }
                                            transition={{ duration: 0.4, ease }}
                                            className="flex items-start gap-3"
                                        >
                                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center text-[9px] text-zinc-400 font-mono mt-0.5">
                                                {i + 1}
                                            </span>
                                            <span className="text-sm text-zinc-300">{step}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>




                    {/* Closing */}
                    <AnimatePresence>
                        {phase >= 13 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="text-center mt-8"
                            >
                                <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
                                    By the time I left, they&apos;d become my family.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
