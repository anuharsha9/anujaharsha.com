'use client'

import { useRef, useCallback, useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Code2, FlaskConical, ClipboardList, Headphones, type LucideIcon } from 'lucide-react'
import PresenterBar from './PresenterBar'
import { withHexAlpha } from '@/lib/color-utils'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface TeamMember {
    role: string
    count: number
    icon: LucideIcon
    color: string
}

const TEAM: TeamMember[] = [
    { role: 'Engineers', count: 12, icon: Code2, color: 'var(--semantic-blue-400)' },
    { role: 'QA', count: 4, icon: FlaskConical, color: 'var(--semantic-violet-400)' },
    { role: 'PMs', count: 2, icon: ClipboardList, color: 'var(--semantic-orange-500)' },
    { role: 'Support', count: 2, icon: Headphones, color: 'var(--semantic-emerald-400)' },
]

const ONBOARDING_STEPS = [
    'Full walkthrough — old RC, new RC — for every person',
    'Design discussions finalized with lead architect and engineer',
    'Dozens of demos. Every workflow. Every edge case.',
    'Async Q&A channel — I answered every question',
]

/* ── Generate node positions for constellation ────── */
function generateNodes(teamMembers: TeamMember[]) {
    const nodes: { x: number; y: number; role: string; color: string; size: number; delay: number }[] = []
    const cx = 180, cy = 180
    let nodeIndex = 0

    teamMembers.forEach((member, groupIdx) => {
        const groupAngle = (groupIdx * 90) - 45 // Four quadrants
        const memberCount = Math.min(member.count, 6) // Cap visual nodes at 6

        for (let j = 0; j < memberCount; j++) {
            const radius = 65 + (j % 3) * 35 + Math.random() * 15
            const angleSpread = 55
            const angle = groupAngle + (j / memberCount) * angleSpread - angleSpread / 2
            const rad = (angle * Math.PI) / 180
            nodes.push({
                x: cx + radius * Math.cos(rad),
                y: cy + radius * Math.sin(rad),
                role: member.role,
                color: member.color,
                size: j < 2 ? 6 : 4, // First nodes slightly bigger
                delay: nodeIndex * 0.06,
            })
            nodeIndex++
        }
    })
    return nodes
}

/* ── Connection line ──────────────────────────────── */
function ConnectionLine({ x1, y1, x2, y2, color, delay, active }: {
    x1: number; y1: number; x2: number; y2: number; color: string; delay: number; active: boolean
}) {
    return (
        <motion.line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color}
            strokeWidth={0.8}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={active ? { pathLength: 1, opacity: 0.25 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay, ease }}
        />
    )
}

/* ── Animated team counter ────────────────────────── */
function TeamCounter({ target, active, color }: { target: number; active: boolean; color: string }) {
    const [val, setVal] = useState(0)

    useEffect(() => {
        if (!active) { setVal(0); return }
        let current = 0
        const step = () => {
            current++
            setVal(current)
            if (current < target) setTimeout(step, 80)
        }
        setTimeout(step, 200)
    }, [active, target])

    return (
        <span className="text-2xl md:text-3xl font-bold font-mono tabular-nums" style={{ color }}>
            {val}
        </span>
    )
}

export default function BeatTeamBuilding() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])
    const nodes = useMemo(() => generateNodes(TEAM), [])
    const cx = 180, cy = 180

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout)
        timers.current = []
    }, [])

    const play = useCallback(() => {
        clear()
        setPhase(-1)
        // Phase 0: Header
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1: Center node (you) appears
        timers.current.push(setTimeout(() => setPhase(1), 1600))
        // Phase 2: Team nodes start appearing
        timers.current.push(setTimeout(() => setPhase(2), 2400))
        // Phase 3: Connections draw
        timers.current.push(setTimeout(() => setPhase(3), 3600))
        // Phase 4: Role cards with counts
        timers.current.push(setTimeout(() => setPhase(4), 5000))
        // Phase 5: Divider
        timers.current.push(setTimeout(() => setPhase(5), 6400))
        // Phase 6: Onboarding header
        timers.current.push(setTimeout(() => setPhase(6), 7000))
        // Phase 7-10: Onboarding steps
        ONBOARDING_STEPS.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(7 + i), 7600 + i * 600))
        })
        // Phase 11: Closing
        timers.current.push(setTimeout(() => setPhase(11), 10400))
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

                    {/* ── Network Constellation ──────────────── */}
                    <div className="relative flex items-center justify-center my-4" style={{ minHeight: 360 }}>
                        <svg
                            viewBox="0 0 360 360"
                            className="w-[300px] h-[300px] md:w-[360px] md:h-[360px]"
                            style={{ overflow: 'visible' }}
                        >
                            {/* Subtle grid rings */}
                            {[60, 100, 140].map((r, i) => (
                                <motion.circle
                                    key={`ring-${r}`}
                                    cx={cx} cy={cy} r={r}
                                    fill="none"
                                    stroke="var(--overlay-white-02)"
                                    strokeWidth={0.5}
                                    strokeDasharray="3 6"
                                    initial={{ opacity: 0 }}
                                    animate={phase >= 1 ? { opacity: 1 } : {}}
                                    transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                                />
                            ))}

                            {/* Connection lines from center to each node */}
                            {nodes.map((node, i) => (
                                <ConnectionLine
                                    key={`conn-${i}`}
                                    x1={cx} y1={cy}
                                    x2={node.x} y2={node.y}
                                    color={node.color}
                                    delay={node.delay}
                                    active={phase >= 3}
                                />
                            ))}

                            {/* Team member nodes */}
                            {nodes.map((node, i) => (
                                <AnimatePresence key={`node-${i}`}>
                                    {phase >= 2 && (
                                        <motion.g
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: node.delay, duration: 0.3, type: 'spring', stiffness: 300 }}
                                            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                                        >
                                            {/* Glow */}
                                            <circle
                                                cx={node.x} cy={node.y} r={node.size + 4}
                                                fill={node.color}
                                                opacity={0.1}
                                            />
                                            {/* Node */}
                                            <circle
                                                cx={node.x} cy={node.y} r={node.size}
                                                fill={node.color}
                                                opacity={0.7}
                                            />
                                            {/* Core */}
                                            <circle
                                                cx={node.x} cy={node.y} r={node.size * 0.4}
                                                fill={node.color}
                                                opacity={1}
                                            />
                                        </motion.g>
                                    )}
                                </AnimatePresence>
                            ))}

                            {/* Center node — YOU */}
                            <AnimatePresence>
                                {phase >= 1 && (
                                    <motion.g
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, type: 'spring' }}
                                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                                    >
                                        {/* Outer pulse */}
                                        <motion.circle
                                            cx={cx} cy={cy} r={20}
                                            fill="none"
                                            stroke="var(--overlay-white-15)"
                                            strokeWidth={1}
                                            animate={{
                                                r: [20, 28, 20],
                                                opacity: [0.15, 0.05, 0.15],
                                            }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                        />
                                        {/* Main circle */}
                                        <circle cx={cx} cy={cy} r={14} fill="var(--overlay-white-08)" stroke="var(--overlay-white-20)" strokeWidth={1.5} />
                                        <circle cx={cx} cy={cy} r={5} fill="white" opacity={0.9} />
                                        {/* Label */}
                                        <text
                                            x={cx} y={cy + 30}
                                            textAnchor="middle"
                                            className="text-[8px] font-mono uppercase tracking-widest"
                                            fill="var(--overlay-white-40)"
                                        >
                                            YOU
                                        </text>
                                    </motion.g>
                                )}
                            </AnimatePresence>

                            {/* Role group labels */}
                            {phase >= 3 && TEAM.map((member, i) => {
                                const angle = (i * 90 - 45) * Math.PI / 180
                                const labelR = 155
                                const lx = cx + labelR * Math.cos(angle)
                                const ly = cy + labelR * Math.sin(angle)
                                return (
                                    <motion.text
                                        key={`label-${member.role}`}
                                        x={lx} y={ly}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="text-[8px] font-mono uppercase tracking-wider"
                                        fill={withHexAlpha(member.color, '80')}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                    >
                                        {member.role}
                                    </motion.text>
                                )
                            })}
                        </svg>
                    </div>

                    {/* ── Role cards with animated counters ──── */}
                    <AnimatePresence>
                        {phase >= 4 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease }}
                            >
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                                    {TEAM.map((member, i) => {
                                        const Icon = member.icon
                                        return (
                                            <motion.div
                                                key={member.role}
                                                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ duration: 0.4, delay: i * 0.12, ease }}
                                                className="rounded-xl border p-4 text-center"
                                                style={{
                                                    borderColor: withHexAlpha(member.color, '20'),
                                                    background: withHexAlpha(member.color, '05'),
                                                }}
                                            >
                                                <div className="flex items-center justify-center mb-2">
                                                    <Icon className="w-5 h-5" style={{ color: member.color }} strokeWidth={1.5} />
                                                </div>
                                                <TeamCounter target={member.count} active={phase >= 4} color={member.color} />
                                                <div className="text-[10px] font-mono uppercase tracking-wider mt-0.5" style={{ color: withHexAlpha(member.color, '80') }}>
                                                    {member.role}
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Divider */}
                    <AnimatePresence>
                        {phase >= 5 && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, ease }}
                                className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-8 origin-left"
                            />
                        )}
                    </AnimatePresence>

                    {/* Onboarding */}
                    <AnimatePresence>
                        {phase >= 6 && (
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
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={
                                                phase >= 7 + i
                                                    ? { opacity: 1, x: 0 }
                                                    : { opacity: 0, x: -20 }
                                            }
                                            transition={{ duration: 0.4, ease }}
                                            className="flex items-start gap-3"
                                        >
                                            <motion.span
                                                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono mt-0.5"
                                                style={{
                                                    background: 'var(--overlay-emerald-light-10)',
                                                    color: 'var(--semantic-emerald-400)',
                                                    border: '1px solid var(--overlay-emerald-light-20)',
                                                }}
                                                initial={{ scale: 0 }}
                                                animate={phase >= 7 + i ? { scale: 1 } : { scale: 0 }}
                                                transition={{ type: 'spring', stiffness: 400, delay: i * 0.05 }}
                                            >
                                                {i + 1}
                                            </motion.span>
                                            <span className="text-sm text-zinc-300">{step}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Closing */}
                    <AnimatePresence>
                        {phase >= 11 && (
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
