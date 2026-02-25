'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Calendar, Mail, Lock, type LucideIcon } from 'lucide-react'
import PresenterBar from './PresenterBar'
import { withHexAlpha } from '@/lib/color-utils'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface ConsolidationItem {
    from: string
    to: string
    icon: LucideIcon
    color: string
    angle: number // starting angle on the radial
}

const CONSOLIDATIONS: ConsolidationItem[] = [
    { from: 'Scheduler', to: '+ Menu', icon: Calendar, color: 'var(--semantic-emerald-400)', angle: 150 },
    { from: 'Distribution Lists', to: '+ Menu', icon: Mail, color: 'var(--semantic-blue-400)', angle: 30 },
    { from: 'Access Lists', to: '+ Menu', icon: Lock, color: 'var(--semantic-violet-400)', angle: 270 },
]

const METRICS = [
    { before: 4, after: 2, label: 'Clicks to create' },
    { before: 3, after: 1, label: 'Entry points' },
    { before: 5, after: 0, label: 'Context switches' },
]

/* ── Animated counter ──────────────────────────────── */
function AnimatedCounter({ from, to, active, color }: { from: number; to: number; active: boolean; color: string }) {
    const [val, setVal] = useState(from)

    useEffect(() => {
        if (!active) { setVal(from); return }
        let current = from
        const step = () => {
            if (current <= to) { setVal(to); return }
            current--
            setVal(current)
            setTimeout(step, 120)
        }
        const t = setTimeout(step, 300)
        return () => clearTimeout(t)
    }, [active, from, to])

    return (
        <span className="text-3xl md:text-4xl font-bold font-mono tabular-nums" style={{ color }}>
            {val}
        </span>
    )
}

/* ── Radial convergence path (SVG) ─────────────────── */
function ConvergencePath({ angle, color, active, delay }: { angle: number; color: string; active: boolean; delay: number }) {
    const radius = 130
    const cx = 180, cy = 180
    const startX = cx + radius * Math.cos((angle * Math.PI) / 180)
    const startY = cy + radius * Math.sin((angle * Math.PI) / 180)

    // Curved path from orbit position to center
    const midX = cx + (radius * 0.4) * Math.cos(((angle + 20) * Math.PI) / 180)
    const midY = cy + (radius * 0.4) * Math.sin(((angle + 20) * Math.PI) / 180)

    const pathD = `M ${startX} ${startY} Q ${midX} ${midY} ${cx} ${cy}`

    return (
        <g>
            {/* Trail glow */}
            <motion.path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeOpacity={0.15}
                initial={{ pathLength: 0 }}
                animate={active ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.8, delay, ease }}
            />
            {/* Animated dash flowing toward center */}
            <motion.path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray="8 16"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={active ? { pathLength: 1, opacity: [0, 1, 1, 0.3] } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.2, delay, ease }}
            />
            {/* Energy particle traveling along the path */}
            {active && (
                <motion.circle
                    r={3}
                    fill={color}
                    initial={{ offsetDistance: '0%', opacity: 0 }}
                    animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1, delay: delay + 0.2, ease: 'easeInOut' }}
                    style={{ offsetPath: `path("${pathD}")` }}
                >
                    <animate attributeName="r" values="3;5;3" dur="0.6s" repeatCount="indefinite" />
                </motion.circle>
            )}
        </g>
    )
}

export default function BeatBreakthrough() {
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
        // Phase 0: Narrator
        timers.current.push(setTimeout(() => setPhase(0), 400))
        // Phase 1: Orbit nodes appear
        timers.current.push(setTimeout(() => setPhase(1), 1600))
        // Phase 2: Convergence begins (paths draw + nodes start moving)
        timers.current.push(setTimeout(() => setPhase(2), 3000))
        // Phase 3: Impact — shockwave, + button bloom
        timers.current.push(setTimeout(() => setPhase(3), 4500))
        // Phase 4: Metrics reveal
        timers.current.push(setTimeout(() => setPhase(4), 5800))
        // Phase 5: Counters animate
        timers.current.push(setTimeout(() => setPhase(5), 6600))
        // Phase 6: Closing line
        timers.current.push(setTimeout(() => setPhase(6), 8200))
    }, [clear])

    useEffect(() => {
        if (isInView) play()
        else { clear(); setPhase(-1) }
        return clear
    }, [isInView, play, clear])

    const radius = 130
    const cx = 180, cy = 180

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
                                        The Hub already had a <span className="text-zinc-200 font-medium">+ menu</span>. What if RC workflows just… lived there? No new tabs. No new plugins.
                                    </p>
                                    <p className="text-lg md:text-xl text-white font-bold mt-3 tracking-tight">
                                        Users never leave their context. Everything comes to them. ✨
                                    </p>
                                    <p className="text-lg md:text-xl text-emerald-400 font-semibold mt-4 tracking-tight">
                                        I was like a child with candy. 🍬
                                    </p>
                                    <p className="text-sm md:text-base text-zinc-500 mt-2 italic">
                                        I was literally dreaming about RC workflows at night. That&apos;s how deep I was in it.
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Convergence Diagram ─────────────────── */}
                    <div className="relative flex items-center justify-center my-6" style={{ minHeight: 360 }}>
                        <svg
                            viewBox="0 0 360 360"
                            className="w-[320px] h-[320px] md:w-[360px] md:h-[360px]"
                            style={{ overflow: 'visible' }}
                        >
                            {/* Subtle orbit ring */}
                            <AnimatePresence>
                                {phase >= 1 && (
                                    <motion.circle
                                        cx={cx} cy={cy} r={radius}
                                        fill="none"
                                        stroke="var(--overlay-white-04)"
                                        strokeWidth={1}
                                        strokeDasharray="4 8"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1, ease }}
                                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Convergence paths */}
                            {CONSOLIDATIONS.map((item, i) => (
                                <ConvergencePath
                                    key={item.from}
                                    angle={item.angle}
                                    color={item.color}
                                    active={phase >= 2}
                                    delay={i * 0.25}
                                />
                            ))}

                            {/* Shockwave rings on impact */}
                            <AnimatePresence>
                                {phase >= 3 && (
                                    <>
                                        {[0, 1, 2].map(ring => (
                                            <motion.circle
                                                key={`shock-${ring}`}
                                                cx={cx} cy={cy}
                                                fill="none"
                                                stroke="var(--overlay-emerald-30)"
                                                strokeWidth={1.5}
                                                initial={{ r: 20, opacity: 0.6 }}
                                                animate={{ r: 120 + ring * 30, opacity: 0 }}
                                                transition={{
                                                    duration: 1.2,
                                                    delay: ring * 0.2,
                                                    ease: 'easeOut',
                                                }}
                                            />
                                        ))}
                                    </>
                                )}
                            </AnimatePresence>
                        </svg>

                        {/* Orbit nodes — workflow items */}
                        {CONSOLIDATIONS.map((item, i) => {
                            const nodeX = cx + radius * Math.cos((item.angle * Math.PI) / 180)
                            const nodeY = cy + radius * Math.sin((item.angle * Math.PI) / 180)

                            // offset from SVG center in the absolutely-positioned container
                            const offsetX = nodeX - cx
                            const offsetY = nodeY - cy

                            return (
                                <AnimatePresence key={item.from}>
                                    {phase >= 1 && phase < 3 && (
                                        <motion.div
                                            className="absolute flex items-center gap-2 pointer-events-none"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.5,
                                                x: offsetX,
                                                y: offsetY,
                                            }}
                                            animate={phase >= 2
                                                ? { opacity: [1, 1, 0], scale: [1, 0.8, 0.3], x: 0, y: 0 }
                                                : { opacity: 1, scale: 1, x: offsetX, y: offsetY }
                                            }
                                            exit={{ opacity: 0, scale: 0 }}
                                            transition={phase >= 2
                                                ? { duration: 1.2, delay: i * 0.25, ease }
                                                : { duration: 0.6, delay: i * 0.15, ease }
                                            }
                                        >
                                            <div
                                                className="rounded-xl px-4 py-2.5 border backdrop-blur-sm flex items-center gap-2.5"
                                                style={{
                                                    borderColor: withHexAlpha(item.color, '30'),
                                                    background: withHexAlpha(item.color, '08'),
                                                }}
                                            >
                                                {(() => { const Icon = item.icon; return <Icon className="w-4 h-4" style={{ color: item.color }} strokeWidth={1.5} /> })()}
                                                <span className="text-xs font-mono whitespace-nowrap" style={{ color: item.color }}>
                                                    {item.from}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )
                        })}

                        {/* Center "+" icon */}
                        <motion.div
                            className="absolute flex items-center justify-center"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={
                                phase >= 3
                                    ? { scale: 1, opacity: 1 }
                                    : phase >= 1
                                        ? { scale: 0.6, opacity: 0.3 }
                                        : { scale: 0, opacity: 0 }
                            }
                            transition={{ duration: phase >= 3 ? 0.8 : 0.5, ease }}
                        >
                            {/* Glow layers */}
                            {phase >= 3 && (
                                <>
                                    <motion.div
                                        className="absolute rounded-full"
                                        style={{
                                            width: 120, height: 120,
                                            background: 'radial-gradient(circle, var(--overlay-emerald-15) 0%, transparent 70%)',
                                        }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.5, 1.2] }}
                                        transition={{ duration: 1, ease }}
                                    />
                                    <motion.div
                                        className="absolute rounded-full"
                                        style={{
                                            width: 80, height: 80,
                                            background: 'radial-gradient(circle, var(--overlay-emerald-20) 0%, transparent 70%)',
                                        }}
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.6, 1, 0.6],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                </>
                            )}
                            <div
                                className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border transition-all duration-700"
                                style={{
                                    borderColor: phase >= 3 ? 'var(--overlay-emerald-50)' : 'var(--overlay-white-06)',
                                    background: phase >= 3
                                        ? 'linear-gradient(135deg, var(--overlay-emerald-15), var(--overlay-teal-bright-10))'
                                        : 'var(--overlay-white-02)',
                                    boxShadow: phase >= 3
                                        ? '0 0 40px var(--overlay-emerald-20), 0 0 80px var(--overlay-emerald-10)'
                                        : 'none',
                                }}
                            >
                                <motion.span
                                    className="font-light"
                                    style={{
                                        fontSize: phase >= 3 ? 40 : 28,
                                        color: phase >= 3 ? 'var(--semantic-emerald-400)' : 'var(--overlay-white-15)',
                                    }}
                                    animate={phase >= 3 ? {
                                        textShadow: [
                                            '0 0 10px var(--overlay-emerald-light-50)',
                                            '0 0 30px var(--overlay-emerald-light-80)',
                                            '0 0 10px var(--overlay-emerald-light-50)',
                                        ],
                                    } : {}}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    +
                                </motion.span>
                            </div>

                            {/* Labels orbiting the + after impact */}
                            {phase >= 3 && (
                                <>
                                    {CONSOLIDATIONS.map((item, i) => {
                                        const labelAngle = -90 + i * 120 // evenly spaced
                                        const labelR = 60
                                        const lx = labelR * Math.cos((labelAngle * Math.PI) / 180)
                                        const ly = labelR * Math.sin((labelAngle * Math.PI) / 180)
                                        return (
                                            <motion.div
                                                key={`label-${item.from}`}
                                                className="absolute"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1, x: lx, y: ly }}
                                                transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease }}
                                            >
                                                <div
                                                    className="rounded-full px-2.5 py-1 text-[9px] font-mono font-bold tracking-wide whitespace-nowrap border"
                                                    style={{
                                                        color: item.color,
                                                        borderColor: withHexAlpha(item.color, '30'),
                                                        background: withHexAlpha(item.color, '10'),
                                                    }}
                                                >
                                                    {item.from.split(' ')[0]}
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* ── Metrics ──────────────────────────────── */}
                    <AnimatePresence>
                        {phase >= 4 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease }}
                            >
                                {/* Divider */}
                                <motion.div
                                    className="h-px mb-8 mx-auto max-w-sm"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent, var(--overlay-emerald-30), transparent)',
                                    }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.6, ease }}
                                />

                                <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                                    {METRICS.map((m, i) => (
                                        <motion.div
                                            key={m.label}
                                            className="text-center"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: i * 0.15, ease }}
                                        >
                                            {/* Before value — struck through */}
                                            <div className="flex items-center justify-center gap-1.5 mb-2">
                                                <span className="text-base font-mono text-zinc-600 line-through decoration-red-500/50 decoration-2">
                                                    {m.before}
                                                </span>
                                                <svg width="16" height="8" viewBox="0 0 16 8" className="text-zinc-700">
                                                    <path d="M0 4h12M10 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2" fill="none" />
                                                </svg>
                                            </div>

                                            {/* Animated counter */}
                                            <AnimatedCounter
                                                from={m.before}
                                                to={m.after}
                                                active={phase >= 5}
                                                color="var(--semantic-emerald-400)"
                                            />

                                            {/* Label */}
                                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-1.5">
                                                {m.label}
                                            </div>

                                            {/* Progress bar draining */}
                                            <div className="mt-3 mx-auto max-w-[60px] h-1 rounded-full bg-white/[0.04] overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{ background: 'var(--semantic-emerald-400)' }}
                                                    initial={{ width: '100%' }}
                                                    animate={phase >= 5
                                                        ? { width: `${(m.after / m.before) * 100}%` }
                                                        : { width: '100%' }
                                                    }
                                                    transition={{ duration: 1.5, delay: 0.5 + i * 0.15, ease }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Closing ──────────────────────────────── */}
                    <AnimatePresence>
                        {phase >= 6 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease }}
                                className="text-center mt-10"
                            >
                                <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
                                    Users never leave the Hub.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}
