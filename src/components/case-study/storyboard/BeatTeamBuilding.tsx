'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ── 8 constellation nodes ── */
const NODES = [
    { label: '12 Engineers', color: '#60a5fa', x: 50, y: 12 },       // top center
    { label: '4 QA', color: '#a78bfa', x: 82, y: 28 },              // top right
    { label: '2 PMs', color: '#fb923c', x: 88, y: 58 },             // right
    { label: '2 Leads', color: '#34d399', x: 68, y: 82 },           // bottom right
    { label: 'Prototypes', color: '#f472b6', x: 32, y: 82 },        // bottom left
    { label: 'QA Sessions', color: '#facc15', x: 12, y: 58 },       // left
    { label: 'Zoom Demos', color: '#22d3ee', x: 18, y: 28 },        // top left
    { label: 'Old + New Workflows', color: '#c084fc', x: 50, y: 48 }, // center
]

/* Lines connecting nodes — forms a web */
const CONNECTIONS = [
    // Center (7) connects to everything
    [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6],
    // Outer ring
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
    // Cross connections
    [0, 3], [0, 4], [1, 5], [2, 6],
]

export default function BeatTeamBuilding() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout)
        timers.current = []
    }, [])

    const startVisuals = useCallback(() => {
        // Nodes appear one by one
        NODES.forEach((_, i) => {
            timers.current.push(setTimeout(() => setPhase(i + 1), 300 + i * 350))
        })
        // Phase 9: Lines start drawing
        timers.current.push(setTimeout(() => setPhase(9), 300 + NODES.length * 350 + 300))
        // Phase 10: Pulse / glow
        timers.current.push(setTimeout(() => setPhase(10), 300 + NODES.length * 350 + 1500))
        // Phase 11: Closing
        timers.current.push(setTimeout(() => setPhase(11), 300 + NODES.length * 350 + 2800))
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
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    {/* Presenter narration */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <PresenterBar onTypingComplete={startVisuals}>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                        Most of the engineers were new to WebFOCUS — and aside from me and the head PM,{' '}
                                        <span className="text-zinc-200 font-medium">nobody had worked on ReportCaster before.</span>
                                    </p>
                                    <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
                                        I onboarded everyone — group by group. 🫡
                                    </p>
                                    <p className="text-sm md:text-base text-zinc-400 mt-2 italic">
                                        New engineers, QA, leads & architects — each got tailored sessions.
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Constellation ── */}
                    <AnimatePresence>
                        {phase >= 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full aspect-[16/10] md:aspect-[16/8] max-w-2xl mx-auto"
                            >
                                <svg
                                    viewBox="0 0 100 95"
                                    className="absolute inset-0 w-full h-full"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    {/* Lines */}
                                    {CONNECTIONS.map(([a, b], i) => (
                                        <motion.line
                                            key={`line-${i}`}
                                            x1={NODES[a].x} y1={NODES[a].y}
                                            x2={NODES[b].x} y2={NODES[b].y}
                                            stroke="white"
                                            strokeOpacity={0.06}
                                            strokeWidth="0.3"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={phase >= 9
                                                ? { pathLength: 1, opacity: 1 }
                                                : { pathLength: 0, opacity: 0 }
                                            }
                                            transition={{ duration: 0.5, delay: i * 0.04, ease }}
                                        />
                                    ))}

                                    {/* Nodes */}
                                    {NODES.map((node, i) => {
                                        const isVisible = phase >= i + 1
                                        const isPulsing = phase >= 10
                                        const isTeamNode = i < 4 // first 4 are team, last 4 are methods

                                        return (
                                            <g key={node.label}>
                                                {/* Outer glow ring */}
                                                {isPulsing && (
                                                    <motion.circle
                                                        cx={node.x} cy={node.y}
                                                        r={isTeamNode ? 4.5 : 3.5}
                                                        fill="none"
                                                        stroke={node.color}
                                                        strokeWidth="0.3"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.5, 1.8] }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                                        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                                                    />
                                                )}

                                                {/* Main dot */}
                                                <motion.circle
                                                    cx={node.x} cy={node.y}
                                                    r={isTeamNode ? 3 : 2.2}
                                                    fill={node.color}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={isVisible
                                                        ? { opacity: 1, scale: 1 }
                                                        : { opacity: 0, scale: 0 }
                                                    }
                                                    transition={{
                                                        duration: 0.5,
                                                        ease: [0.34, 1.56, 0.64, 1],
                                                    }}
                                                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                                                />

                                                {/* Inner bright core */}
                                                <motion.circle
                                                    cx={node.x} cy={node.y}
                                                    r={isTeamNode ? 1.2 : 0.8}
                                                    fill="white"
                                                    initial={{ opacity: 0 }}
                                                    animate={isVisible ? { opacity: 0.6 } : { opacity: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.2 }}
                                                />

                                                {/* Label */}
                                                <motion.text
                                                    x={node.x}
                                                    y={node.y + (node.y < 50 ? -5 : 6)}
                                                    textAnchor="middle"
                                                    dominantBaseline={node.y < 50 ? 'auto' : 'hanging'}
                                                    fill={node.color}
                                                    className="text-[3px] font-mono uppercase tracking-wider"
                                                    initial={{ opacity: 0, y: node.y < 50 ? 2 : -2 }}
                                                    animate={isVisible
                                                        ? { opacity: 0.9, y: 0 }
                                                        : { opacity: 0 }
                                                    }
                                                    transition={{ duration: 0.4, delay: 0.15 }}
                                                >
                                                    {node.label}
                                                </motion.text>
                                            </g>
                                        )
                                    })}
                                </svg>
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
                                className="text-center mt-2"
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
