'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { Play } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─── Wireframe primitives ─── */
function Skel({ w = '100%', h = 6, color = 'bg-white/[0.15]' }: { w?: string | number; h?: number; color?: string }) {
    return <div className={`rounded-full ${color}`} style={{ width: w, height: h }} />
}

function Bar({ label, accent }: { label: string; accent: string }) {
    return (
        <div className="flex items-center gap-1.5 mb-2">
            <div className="flex gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, opacity: 0.5 }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, opacity: 0.3 }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, opacity: 0.3 }} />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider font-medium" style={{ color: accent, opacity: 0.7 }}>
                {label}
            </span>
        </div>
    )
}

/* ─── RC: Enterprise Scheduler — HORIZONTAL layout ─── */
function RCWireframe() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])
    const loopRef = useRef<NodeJS.Timeout | null>(null)

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout)
        timers.current = []
        if (loopRef.current) clearTimeout(loopRef.current)
    }, [])

    const play = useCallback(() => {
        clear(); setPhase(-1)
        timers.current.push(setTimeout(() => setPhase(0), 300))
        timers.current.push(setTimeout(() => setPhase(1), 1000))
        timers.current.push(setTimeout(() => setPhase(2), 1800))
        timers.current.push(setTimeout(() => setPhase(3), 2600))
        // Loop: reset after full animation and replay
        loopRef.current = setTimeout(() => play(), 5000)
    }, [clear])

    useEffect(() => { if (isInView) play(); else { clear(); setPhase(-1) }; return clear }, [isInView, play, clear])

    const a = '#f59e0b'

    return (
        <div ref={ref} className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
            {/* Horizontal split layout */}
            <div className="flex gap-3 w-full max-w-md items-stretch">
                {/* Left sidebar */}
                <AnimatePresence>
                    {phase >= 0 && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease }}
                            className="w-24 shrink-0 rounded-lg border p-2" style={{ borderColor: `${a}40`, backgroundColor: `${a}12` }}>
                            <Bar label="Nav" accent={a} />
                            <div className="space-y-1.5 mt-1">
                                {['Views', 'Shared', 'Favorites'].map((s, i) => (
                                    <motion.div key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }}>
                                        <Skel w="85%" h={4} color={i === 2 ? `bg-amber-400/40` : `bg-amber-400/15`} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Right content */}
                <div className="flex-1 flex flex-col gap-2">
                    {/* Header bar */}
                    <AnimatePresence>
                        {phase >= 1 && (
                            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}
                                className="rounded-lg border p-2" style={{ borderColor: `${a}30`, backgroundColor: `${a}0D` }}>
                                <Bar label="Schedule Explorer" accent={a} />
                                <div className="flex gap-1.5">
                                    <Skel w="25%" h={4} color="bg-amber-400/30" />
                                    <Skel w="20%" h={4} color="bg-amber-400/20" />
                                    <Skel w="30%" h={4} color="bg-amber-400/20" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Data grid rows */}
                    <AnimatePresence>
                        {phase >= 2 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }}
                                className="rounded-lg border p-2 flex-1" style={{ borderColor: `${a}25`, backgroundColor: `${a}0A` }}>
                                <div className="space-y-1.5">
                                    {[['55%', '25%', '15%'], ['70%', '15%', '10%'], ['45%', '30%', '20%'], ['60%', '20%', '15%']].map((widths, i) => (
                                        <motion.div key={i} className="flex gap-1.5"
                                            initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 }}>
                                            {widths.map((w, j) => (
                                                <Skel key={j} w={w} h={4} color={j === 0 ? 'bg-amber-400/30' : 'bg-amber-400/15'} />
                                            ))}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action buttons */}
                    <AnimatePresence>
                        {phase >= 3 && (
                            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }}
                                className="flex gap-2">
                                <div className="h-5 flex-1 rounded" style={{ backgroundColor: `${a}40` }} />
                                <div className="h-5 w-12 rounded" style={{ backgroundColor: `${a}20` }} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Glow pulse */}
            {phase >= 3 && (
                <motion.div animate={{ opacity: [0, 0.2, 0] }} transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, ${a}15, transparent 70%)` }} />
            )}
        </div>
    )
}

/* ─── ML: Workflow pipeline — HORIZONTAL layout ─── */
function MLWireframe() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])
    const loopRef = useRef<NodeJS.Timeout | null>(null)

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout); timers.current = []
        if (loopRef.current) clearTimeout(loopRef.current)
    }, [])
    const play = useCallback(() => {
        clear(); setPhase(-1)
        timers.current.push(setTimeout(() => setPhase(0), 400))
        timers.current.push(setTimeout(() => setPhase(1), 1200))
        timers.current.push(setTimeout(() => setPhase(2), 2000))
        loopRef.current = setTimeout(() => play(), 4500)
    }, [clear])

    useEffect(() => { if (isInView) play(); else { clear(); setPhase(-1) }; return clear }, [isInView, play, clear])

    const a = '#2fc6d5'
    const steps = ['Data Prep', 'Train', 'Evaluate']

    return (
        <div ref={ref} className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-[260px] space-y-3">
                {/* Pipeline steps — horizontal row */}
                <AnimatePresence>
                    {phase >= 0 && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
                            className="flex gap-2 items-center justify-center">
                            {steps.map((step, i) => (
                                <motion.div key={step}
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                                    className="flex flex-col items-center gap-1.5">
                                    <div className="w-10 h-10 rounded-lg border flex items-center justify-center"
                                        style={{ borderColor: `${a}50`, backgroundColor: `${a}15` }}>
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `${a}60` }} />
                                    </div>
                                    <span className="text-[8px] font-mono uppercase tracking-wider font-medium" style={{ color: `${a}90` }}>
                                        {step}
                                    </span>
                                    {/* Connector arrow */}
                                    {i < steps.length - 1 && (
                                        <motion.div className="absolute" style={{ left: `${33 + i * 33}%`, top: '42%' }}
                                            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
                                            transition={{ delay: 0.3 + i * 0.15 }}>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Progress bar */}
                <AnimatePresence>
                    {phase >= 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                            className="rounded-full h-2 overflow-hidden" style={{ backgroundColor: `${a}15` }}>
                            <motion.div className="h-full rounded-full" style={{ backgroundColor: `${a}50` }}
                                initial={{ width: '0%' }} animate={{ width: '75%' }}
                                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Metrics row */}
                <AnimatePresence>
                    {phase >= 2 && (
                        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}
                            className="flex gap-2">
                            <div className="flex-1 h-8 rounded-lg border flex items-center justify-center"
                                style={{ borderColor: `${a}30`, backgroundColor: `${a}12` }}>
                                <span className="text-[9px] font-mono font-medium" style={{ color: `${a}80` }}>94.2%</span>
                            </div>
                            <div className="flex-1 h-8 rounded-lg border flex items-center justify-center"
                                style={{ borderColor: `${a}20`, backgroundColor: `${a}0A` }}>
                                <span className="text-[9px] font-mono font-medium" style={{ color: `${a}60` }}>0.031</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ─── IQ: Discovery HUB — HORIZONTAL layout ─── */
function IQWireframe() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])
    const loopRef = useRef<NodeJS.Timeout | null>(null)

    const clear = useCallback(() => {
        timers.current.forEach(clearTimeout); timers.current = []
        if (loopRef.current) clearTimeout(loopRef.current)
    }, [])
    const play = useCallback(() => {
        clear(); setPhase(-1)
        timers.current.push(setTimeout(() => setPhase(0), 400))
        timers.current.push(setTimeout(() => setPhase(1), 1200))
        timers.current.push(setTimeout(() => setPhase(2), 2200))
        loopRef.current = setTimeout(() => play(), 5000)
    }, [clear])

    useEffect(() => { if (isInView) play(); else { clear(); setPhase(-1) }; return clear }, [isInView, play, clear])

    const a = '#a855f7'

    return (
        <div ref={ref} className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-[260px] space-y-2.5">
                {/* Search bar */}
                <AnimatePresence>
                    {phase >= 0 && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}
                            className="rounded-full h-8 border flex items-center px-3 gap-2"
                            style={{ borderColor: `${a}40`, backgroundColor: `${a}12` }}>
                            <div className="w-3.5 h-3.5 rounded-full border" style={{ borderColor: `${a}50` }} />
                            <Skel w="60%" h={3} color="bg-purple-400/30" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Result cards — horizontal row */}
                <AnimatePresence>
                    {phase >= 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                            className="flex gap-2">
                            {[0, 1, 2].map(i => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.3 }}
                                    className="flex-1 rounded-lg border p-2 flex flex-col items-center gap-1.5"
                                    style={{ borderColor: `${a}25`, backgroundColor: `${a}0D` }}>
                                    <div className="w-6 h-6 rounded" style={{ backgroundColor: `${a}25` }} />
                                    <Skel w="80%" h={3} color="bg-purple-400/25" />
                                    <Skel w="55%" h={2} color="bg-purple-400/12" />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* AI suggestion badge */}
                <AnimatePresence>
                    {phase >= 2 && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                            className="rounded-full h-7 border flex items-center justify-center gap-2"
                            style={{ borderColor: `${a}40`, backgroundColor: `${a}15` }}>
                            <span className="text-[10px]" style={{ color: `${a}` }}>✦</span>
                            <span className="text-[9px] font-mono uppercase tracking-wider font-medium" style={{ color: `${a}90` }}>
                                AI Recommended
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ─── tile data ─── */
const TILES = [
    {
        id: 'ml-functions',
        title: 'Feature adoption/simplification for Machine Learning workflows',
        link: '/work/ml-functions',
        Wireframe: MLWireframe,
        accentVar: '--semantic-cyan-vivid-rgb',
    },
    {
        id: 'iq-plugin',
        title: 'AI powered HUB to meet business needs',
        link: '/work/iq-plugin',
        Wireframe: IQWireframe,
        accentVar: '--semantic-purple-vivid-rgb',
    },
    {
        id: 'reportcaster',
        title: 'Customer retention success for Enterprise Scheduling',
        link: '/work/reportcaster',
        flagship: true,
        Wireframe: RCWireframe,
        accentVar: '--accent-amber-rgb',
    },
]

/* ─── single tile ─── */
function BentoTile({ tile, delay }: { tile: typeof TILES[0]; delay: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const WireframeComponent = tile.Wireframe
    const rgb = `var(${tile.accentVar})`

    return (
        <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay, ease }}
        >
            <Link href={tile.link} className="group block">
                <div
                    className="relative w-full overflow-hidden rounded-2xl cursor-pointer transition-all duration-500"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        minHeight: tile.flagship ? '420px' : '200px',
                        border: `1px solid rgba(${rgb}, 0.09)`,
                        backgroundColor: `rgba(${rgb}, 0.03)`,
                        boxShadow: isHovered
                            ? `0 0 40px rgba(${rgb}, 0.08), inset 0 0 0 1px rgba(${rgb}, 0.15)`
                            : `0 0 0px transparent, inset 0 0 0 1px rgba(${rgb}, 0.06)`,
                    }}
                >
                    {/* Wireframe — always visible, blurs on hover */}
                    <div
                        className="absolute inset-0 transition-all duration-500"
                        style={{
                            filter: isHovered ? 'blur(8px)' : 'blur(0px)',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                    >
                        <WireframeComponent />
                    </div>

                    {/* Hover overlay: scrim + play + title */}
                    <div
                        className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-500"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            backgroundColor: isHovered ? 'var(--overlay-black-50)' : 'transparent',
                        }}
                    >
                        <div className="flex flex-col items-center gap-3 max-w-xs text-center px-4">
                            <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                            </div>
                            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/70">
                                Watch Case Study
                            </span>
                            <p className="text-white/90 text-sm md:text-base font-semibold leading-snug mt-1">
                                {tile.title}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

/* ─── main block ─── */
export default function CSGBlock() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const headingY = useTransform(scrollYProgress, [0, 0.3], [100, 0])
    const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
    const headingScale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1])

    const leftTiles = TILES.filter(t => !t.flagship)
    const rightTile = TILES.find(t => t.flagship)!

    return (
        <section ref={ref} className="relative py-20 md:py-32 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-hidden">
            {/* Era label — decorative, above content */}
            <motion.div
                className="mb-6 md:mb-8 pointer-events-none select-none"
                aria-hidden="true"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="font-extrabold text-[clamp(3rem,8vw,7rem)] text-white/[0.03] uppercase tracking-tighter leading-none block">
                    2022 — 2025
                </span>
            </motion.div>

            {/* Section header */}
            <motion.div
                className="mb-12 md:mb-16"
                style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
            >
                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-white/50 mb-3">
                    2022 — 2025
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                    Senior Product Designer
                    <span className="text-white/40 font-normal"> at Cloud Software Group</span>
                </h2>
            </motion.div>

            {/* Bento Grid: RC flagship left (65%) / ML + IQ stacked right (35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_35%] gap-4 md:gap-5">
                {/* Left column — RC flagship */}
                <BentoTile tile={rightTile} delay={0.1} />

                {/* Right column — ML + IQ stacked */}
                <div className="flex flex-col gap-4 md:gap-5">
                    {leftTiles.map((tile, i) => (
                        <BentoTile key={tile.id} tile={tile} delay={0.15 + i * 0.15} />
                    ))}
                </div>
            </div>
        </section>
    )
}
