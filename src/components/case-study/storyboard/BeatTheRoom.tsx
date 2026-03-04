'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'
import { Mic, MicOff, Video, Monitor, MessageSquare, User, PhoneOff } from 'lucide-react'
import { withHexAlpha } from '@/lib/color-utils'

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
    { name: 'Dave', role: 'Head PM', years: '15 yrs', initials: 'DV', bg: 'var(--surface-navy-780)', accent: 'var(--semantic-blue-500)' },
    { name: 'Angie', role: 'Gold Support Lead', years: '20+ yrs', initials: 'AG', bg: 'var(--surface-purple-900)', accent: 'var(--accent-violet)' },
    { name: 'Yingchun', role: 'OG RC Engineer', years: '30+ yrs', initials: 'YC', bg: 'var(--surface-amber-900)', accent: 'var(--accent-amber)' },
    { name: 'Julian', role: 'Lead WF Architect', years: '40 yrs', initials: 'JL', bg: 'var(--surface-amber-950)', accent: 'var(--accent-amber-600)' },
    { name: 'Chris', role: 'Support TAM Lead', years: '20 yrs', initials: 'CH', bg: 'var(--surface-emerald-900)', accent: 'var(--semantic-emerald-500)' },
    { name: 'Alan', role: 'Backend Lead', years: '30+ yrs', initials: 'AL', bg: 'var(--semantic-navy-700)', accent: 'var(--semantic-cyan-500)' },
    { name: 'Anuja', role: 'Me', years: '3 weeks', initials: 'AH', bg: 'var(--surface-rose-900)', accent: 'var(--semantic-rose-500)', me: true },
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
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout)
        timers.current = []
    }, [])

    const startVisuals = useCallback(() => {
        // Phase 1-7: Each participant tile joins
        timers.current.push(setTimeout(() => setPhase(1), 300))
        PARTICIPANTS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 1), 600 + i * 500))
        })
        // Phase 8: Highlight the experience gap
        timers.current.push(setTimeout(() => setPhase(8), 4800))
        // Phase 9: My internal monologue
        timers.current.push(setTimeout(() => setPhase(9), 6300))
        // Phase 10: Revelations start
        timers.current.push(setTimeout(() => setPhase(10), 7800))
        // Phase 11-15: Each revelation
        REVELATIONS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(11 + i), 8400 + i * 800))
        })
        // Phase 16
        timers.current.push(setTimeout(() => setPhase(16), 12800))
    }, [])

    useEffect(() => {
        if (isInView) {
            timers.current.push(setTimeout(() => setPhase(0), 400))
        } else { clear(); setPhase(-1) }
        return clear
    }, [isInView, clear])

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-4 md:px-8 py-6 md:py-10">

                    {/* Presenter narration */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <PresenterBar onTypingComplete={startVisuals}>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                        Week 3. Monday. <span className="text-zinc-200 font-medium">First kickoff meeting.</span>{' '}
                                        A handful of people — the <span className="text-zinc-200">only ones who knew RC existed.</span>
                                    </p>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed mt-3">
                                        Everyone in the room had at least{' '}
                                        <span className="text-zinc-200 font-medium">a decade at the company</span> — some two, three —{' '}
                                        <span className="text-amber-400 font-bold">even four decades!</span> 😳
                                    </p>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed mt-3">
                                        And me? Sure, a decade of design experience —
                                    </p>
                                    <p className="text-lg md:text-xl text-white font-bold mt-2 tracking-tight">
                                        but with webFOCUS? <span className="text-rose-400">3 weeks.</span>
                                    </p>
                                </PresenterBar>
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
                                <div className="rounded-xl border border-white/[0.08] bg-[var(--surface-indigo-900)] overflow-hidden shadow-2xl shadow-black/40">
                                    {/* Title bar */}
                                    <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-violet-950)] border-b border-white/[0.04]">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-red)]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-yellow)]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-green-alt)]" />
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
                                                                    ? isMe ? p.accent : 'var(--overlay-white-08)'
                                                                    : withHexAlpha(p.accent, '50'),
                                                                background: isMe
                                                                    ? withHexAlpha(p.accent, '20')
                                                                    : 'var(--overlay-white-03)',
                                                            }}
                                                        >
                                                            <span
                                                                className="font-mono text-xs md:text-sm font-bold"
                                                                style={{
                                                                    color: isHighlight && !isMe
                                                                        ? 'var(--overlay-white-15)'
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
                                                                            color: isMe ? 'var(--semantic-rose-500)' : 'var(--overlay-white-20)',
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
                                    <div className="flex items-center justify-center gap-4 px-4 py-2.5 bg-[var(--surface-violet-950)] border-t border-white/[0.04]">
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

                    {/* Internal monologue — thought bubble */}
                    <AnimatePresence>
                        {phase >= 9 && phase < 10 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -8 }}
                                transition={{ duration: 0.8, ease }}
                                className="flex justify-center my-6"
                            >
                                <div className="relative">
                                    {/* Thought cloud bubbles */}
                                    <motion.div
                                        className="absolute -bottom-3 left-8 w-3 h-3 rounded-full bg-white/[0.06] border border-white/[0.08]"
                                        animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                    <motion.div
                                        className="absolute -bottom-5 left-4 w-2 h-2 rounded-full bg-white/[0.04] border border-white/[0.06]"
                                        animate={{ scale: [0.6, 1, 0.6], opacity: [0.2, 0.4, 0.2] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                    {/* Main bubble */}
                                    <motion.div
                                        className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-4 backdrop-blur-sm"
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        <p className="text-lg md:text-xl text-zinc-300/80 italic font-light tracking-tight text-center">
                                            &ldquo;What am I doing here?&rdquo;
                                        </p>
                                        <motion.div
                                            className="w-8 h-px mx-auto mt-2"
                                            style={{ background: 'linear-gradient(90deg, transparent, var(--overlay-rose-40), transparent)' }}
                                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                        />
                                    </motion.div>
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
                                className="max-w-2xl mx-auto mt-8"
                            >
                                <div className="text-[10px] md:text-xs tracking-[0.25em] text-zinc-500 uppercase text-center mb-8 font-medium">
                                    What I learned in that call
                                </div>
                                <div className="space-y-5 md:space-y-6">
                                    {/* Revelation 1 — Age */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={phase >= 11 ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, ease }}
                                        className="text-center"
                                    >
                                        <span className="text-xl md:text-2xl font-bold text-amber-400">40+ years old.</span>
                                        <span className="text-base md:text-lg text-zinc-500 ml-2">No redesign. Ever.</span>
                                    </motion.div>

                                    {/* Revelation 2 — Scale */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={phase >= 12 ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, ease }}
                                        className="text-center"
                                    >
                                        <span className="text-xl md:text-2xl font-bold text-blue-400">20 million</span>
                                        <span className="text-base md:text-lg text-zinc-400 ml-2">jobs a week.</span>
                                    </motion.div>

                                    {/* Revelation 3 — No docs */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={phase >= 13 ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, ease }}
                                        className="text-center"
                                    >
                                        <span className="text-lg md:text-xl font-semibold text-red-400/90">Zero documentation.</span>
                                    </motion.div>

                                    {/* Revelation 4 — No redesign */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={phase >= 14 ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, ease }}
                                        className="text-center"
                                    >
                                        <span className="text-base md:text-lg text-zinc-400">Last redesign attempt?</span>
                                        <span className="text-base md:text-lg text-zinc-200 font-medium ml-2 italic">Never happened.</span>
                                    </motion.div>

                                    {/* Revelation 5 — Yingchun */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={phase >= 15 ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, ease }}
                                        className="text-center"
                                    >
                                        <span className="text-base md:text-lg text-zinc-400">Only </span>
                                        <span className="text-base md:text-lg text-violet-400 font-semibold">Yingchun</span>
                                        <span className="text-base md:text-lg text-zinc-400"> truly knew the code.</span>
                                        <br />
                                        <span className="text-sm md:text-base text-zinc-500 italic">He wrote it in the &apos;80s.</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                </div>
            </div>
        </div>
    )
}
