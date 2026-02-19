'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Mic, MicOff, Video, Monitor, MessageSquare, User, PhoneOff } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface ZoomParticipant {
    name: string
    role: string
    years: string
    initials: string
    bg: string
    accent: string
    me?: boolean
}

const PARTICIPANTS: ZoomParticipant[] = [
    { name: 'Dave', role: 'Head PM', years: '15 yrs', initials: 'DV', bg: '#1a2744', accent: '#3b82f6' },
    { name: 'Angie', role: 'Gold Support Lead', years: '20+ yrs', initials: 'AG', bg: '#2d1b4e', accent: '#8b5cf6' },
    { name: 'Yingchun', role: 'OG RC Engineer', years: '30+ yrs', initials: 'YC', bg: '#3d2b10', accent: '#f59e0b' },
    { name: 'Julian', role: 'Lead WF Architect', years: '40 yrs', initials: 'JL', bg: '#2a1a0a', accent: '#d97706' },
    { name: 'Chris', role: 'Support Team Lead', years: '10 yrs', initials: 'CH', bg: '#0d3328', accent: '#10b981' },
    { name: 'Alan', role: 'QA Lead', years: '12 yrs', initials: 'AL', bg: '#1a3344', accent: '#06b6d4' },
    { name: 'Anuja', role: 'Me', years: '3 weeks', initials: 'AH', bg: '#3d1520', accent: '#f43f5e', me: true },
]

const REVELATIONS = [
    'This system is 40+ years old.',
    'It runs 20 million jobs a week.',
    'There is no documentation.',
    'The last redesign attempt? Never happened.',
    'Only Yingchun truly knew the code. He wrote it in the \'80s.',
]

export default function BeatTheRoom() {
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
        // Phase 0: Show the zoom window frame
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1-7: Each participant tile joins (7 people)
        PARTICIPANTS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 1), 1000 + i * 500))
        })
        // Phase 8: Highlight the experience gap
        timers.current.push(setTimeout(() => setPhase(8), 5200))
        // Phase 9: My internal monologue
        timers.current.push(setTimeout(() => setPhase(9), 6700))
        // Phase 10: Revelations start
        timers.current.push(setTimeout(() => setPhase(10), 8200))
        // Phase 11-15: Each revelation
        REVELATIONS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(11 + i), 8800 + i * 800))
        })
        // Phase 16: "I volunteered anyway."
        timers.current.push(setTimeout(() => setPhase(16), 13200))
    }, [clear])

    useEffect(() => {
        if (isInView) play()
        else { clear(); setPhase(-1) }
        return clear
    }, [isInView, play, clear])

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-4 md:px-8 py-6 md:py-10">

                    {/* Scene setting */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center mb-6"
                            >
                                <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                                    Week 3 · First Kickoff Meeting
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ═══════ ZOOM WINDOW ═══════ */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.8, ease }}
                                className="relative"
                            >
                                {/* Window chrome */}
                                <div className="rounded-xl border border-white/[0.08] bg-[#1a1a2e] overflow-hidden shadow-2xl shadow-black/40">
                                    {/* Title bar */}
                                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0d1a] border-b border-white/[0.04]">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                        </div>
                                        <div className="font-mono text-[9px] text-zinc-500 tracking-wider">
                                            ReportCaster Kickoff — Zoom
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-sm bg-white/[0.06]" />
                                            <div className="font-mono text-[8px] text-rose-400/60">REC ●</div>
                                        </div>
                                    </div>

                                    {/* Participant grid */}
                                    <div className="grid grid-cols-4 gap-1 p-1.5">
                                        {PARTICIPANTS.map((p, i) => {
                                            const show = phase >= i + 1
                                            const isHighlight = phase >= 8
                                            const isMe = p.me

                                            return (
                                                <motion.div
                                                    key={p.initials}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={
                                                        show
                                                            ? { opacity: 1, scale: 1 }
                                                            : { opacity: 0, scale: 0.9 }
                                                    }
                                                    transition={{ duration: 0.5, ease }}
                                                    className="relative aspect-video rounded-lg overflow-hidden"
                                                    style={{ background: p.bg }}
                                                >
                                                    {/* Avatar silhouette */}
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <motion.div
                                                            animate={
                                                                isHighlight && isMe
                                                                    ? { scale: [1, 1.05, 1], borderColor: p.accent }
                                                                    : {}
                                                            }
                                                            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                                                            className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2"
                                                            style={{
                                                                borderColor: isHighlight
                                                                    ? isMe ? p.accent : 'rgba(255,255,255,0.08)'
                                                                    : `${p.accent}50`,
                                                                background: isMe
                                                                    ? `${p.accent}20`
                                                                    : 'rgba(255,255,255,0.03)',
                                                            }}
                                                        >
                                                            <span
                                                                className="font-mono text-xs md:text-sm font-bold"
                                                                style={{
                                                                    color: isHighlight && !isMe
                                                                        ? 'rgba(255,255,255,0.15)'
                                                                        : p.accent,
                                                                }}
                                                            >
                                                                {p.initials}
                                                            </span>
                                                        </motion.div>
                                                    </div>

                                                    {/* Name badge */}
                                                    <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/60 to-transparent">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[9px] md:text-[10px] text-white/70 font-medium truncate">
                                                                {p.name}
                                                            </span>
                                                            <motion.span
                                                                animate={
                                                                    isHighlight
                                                                        ? {
                                                                            color: isMe ? '#f43f5e' : 'rgba(255,255,255,0.2)',
                                                                            scale: isMe ? 1.1 : 1,
                                                                        }
                                                                        : {}
                                                                }
                                                                className="text-[8px] font-mono text-zinc-500"
                                                            >
                                                                {p.years}
                                                            </motion.span>
                                                        </div>
                                                    </div>

                                                    {/* Mute indicator for non-me */}
                                                    {!isMe && show && (
                                                        <div className="absolute top-1.5 right-1.5">
                                                            <div className="w-4 h-4 rounded-full bg-black/40 flex items-center justify-center">
                                                                <MicOff className="w-2.5 h-2.5 text-zinc-500" strokeWidth={1.5} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* "Speaking" indicator for me */}
                                                    {isMe && isHighlight && (
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                            className="absolute inset-0 rounded-lg border-2"
                                                            style={{ borderColor: p.accent }}
                                                        />
                                                    )}
                                                </motion.div>
                                            )
                                        })}
                                    </div>

                                    {/* Zoom toolbar */}
                                    <div className="flex items-center justify-center gap-4 px-4 py-2.5 bg-[#0d0d1a] border-t border-white/[0.04]">
                                        {[Mic, Video, Monitor, MessageSquare, User].map((ToolbarIcon, i) => (
                                            <div key={i} className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center">
                                                <ToolbarIcon className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
                                            </div>
                                        ))}
                                        <div className="w-7 h-7 rounded-full bg-rose-500/20 flex items-center justify-center">
                                            <PhoneOff className="w-3.5 h-3.5 text-rose-400" strokeWidth={1.5} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Experience gap callout */}
                    <AnimatePresence>
                        {phase >= 8 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease }}
                                className="text-center mt-6 mb-4"
                            >
                                <p className="text-sm text-zinc-400">
                                    Combined experience in the room:{' '}
                                    <span className="text-white font-semibold">130+ years</span>
                                </p>
                                <p className="text-sm text-zinc-500 mt-1">
                                    Mine:{' '}
                                    <span className="text-rose-400 font-semibold">3 weeks</span>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Internal monologue — graphic novel thought bubble */}
                    <AnimatePresence>
                        {phase >= 9 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease }}
                                className="max-w-md mx-auto mt-4 mb-6"
                            >
                                <div className="relative rounded-xl bg-white/[0.03] border border-white/[0.06] px-5 py-4">
                                    {/* Thought bubble tail */}
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white/[0.03] border-l border-t border-white/[0.06]" />
                                    <p className="text-sm text-zinc-400 italic text-center relative z-10">
                                        I had no idea what I was getting into.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Revelations — what I learned in that call */}
                    <AnimatePresence>
                        {phase >= 10 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="max-w-md mx-auto"
                            >
                                <div className="font-mono text-[9px] tracking-[0.2em] text-zinc-600 uppercase text-center mb-4">
                                    What I learned in that call
                                </div>
                                <div className="space-y-2">
                                    {REVELATIONS.map((rev, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -15 }}
                                            animate={
                                                phase >= 11 + i
                                                    ? { opacity: 1, x: 0 }
                                                    : { opacity: 0, x: -15 }
                                            }
                                            transition={{ duration: 0.4, ease }}
                                            className="flex items-start gap-2.5"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                                            <span className="text-xs md:text-sm text-zinc-400">
                                                {rev}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Closing — dry, factual */}
                    <AnimatePresence>
                        {phase >= 16 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="text-center mt-8"
                            >
                                <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
                                    I volunteered anyway.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
