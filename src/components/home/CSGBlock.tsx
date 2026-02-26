'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { Play } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─── Wireframe primitives (matching case study style) ─── */
function SkeletonLine({ w = '100%', h = 6, color = 'bg-white/[0.08]' }: { w?: string | number; h?: number; color?: string }) {
    return <div className={`rounded-full ${color}`} style={{ width: w, height: h }} />
}

function TitleBar({ label, accent = 'white' }: { label: string; accent?: string }) {
    return (
        <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${accent} 60%, transparent)` }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${accent} 40%, transparent)` }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${accent} 40%, transparent)` }} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider font-medium" style={{ color: `color-mix(in srgb, ${accent} 80%, transparent)` }}>
                {label}
            </span>
        </div>
    )
}

/* ─── RC: Enterprise Scheduler wireframe ─── */
function RCWireframe() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = [] }, [])
    const play = useCallback(() => {
        clear(); setPhase(-1)
        timers.current.push(setTimeout(() => setPhase(0), 300))
        timers.current.push(setTimeout(() => setPhase(1), 1200))
        timers.current.push(setTimeout(() => setPhase(2), 2200))
        timers.current.push(setTimeout(() => setPhase(3), 3200))
    }, [clear])

    useEffect(() => { if (isInView) play(); else { clear(); setPhase(-1) }; return clear }, [isInView, play, clear])

    const accent = '#f59e0b'

    return (
        <div ref={ref} className="absolute inset-0 flex items-center justify-center p-6">
            <div className="w-full max-w-xs space-y-3">
                {/* Nav bar */}
                <AnimatePresence>
                    {phase >= 0 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
                            className="rounded-lg border border-amber-400/25 bg-amber-500/[0.08] p-3">
                            <TitleBar label="ReportCaster" accent={accent} />
                            <div className="flex gap-2">
                                <SkeletonLine w="30%" color="bg-amber-400/35" />
                                <SkeletonLine w="25%" color="bg-amber-400/25" />
                                <SkeletonLine w="35%" color="bg-amber-400/25" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Table / data grid */}
                <AnimatePresence>
                    {phase >= 1 && (
                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
                            className="rounded-lg border border-amber-400/25 bg-amber-500/[0.08] p-3">
                            <TitleBar label="Schedule Explorer" accent={accent} />
                            <div className="space-y-1.5">
                                {[['65%', '35%'], ['80%', '20%'], ['50%', '40%'], ['70%', '30%']].map(([a, b], i) => (
                                    <motion.div key={i} className="flex gap-2"
                                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08, duration: 0.4 }}>
                                        <SkeletonLine w={a} color="bg-amber-400/25" h={5} />
                                        <SkeletonLine w={b} color="bg-amber-400/15" h={5} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Action bar */}
                <AnimatePresence>
                    {phase >= 2 && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
                            className="flex gap-2">
                            <div className="h-7 flex-1 rounded bg-amber-400/30 flex items-center justify-center">
                                <SkeletonLine w="60%" h={3} color="bg-amber-400/50" />
                            </div>
                            <div className="h-7 w-16 rounded bg-amber-400/15" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Glow pulse */}
                {phase >= 3 && (
                    <motion.div animate={{ opacity: [0, 0.25, 0] }} transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
                )}
            </div>
        </div>
    )
}

/* ─── ML: Train Model wireframe ─── */
function MLWireframe() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = [] }, [])
    const play = useCallback(() => {
        clear(); setPhase(-1)
        timers.current.push(setTimeout(() => setPhase(0), 400))
        timers.current.push(setTimeout(() => setPhase(1), 1500))
        timers.current.push(setTimeout(() => setPhase(2), 2500))
    }, [clear])

    useEffect(() => { if (isInView) play(); else { clear(); setPhase(-1) }; return clear }, [isInView, play, clear])

    const accent = '#2fc6d5'

    return (
        <div ref={ref} className="absolute inset-0 flex items-center justify-center p-5">
            <div className="w-full max-w-[200px] space-y-2.5">
                {/* Workflow header */}
                <AnimatePresence>
                    {phase >= 0 && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
                            className="rounded-lg border border-cyan-400/25 bg-cyan-500/[0.08] p-2.5">
                            <TitleBar label="ML Workflow" accent={accent} />
                            <SkeletonLine w="80%" color="bg-cyan-400/30" h={5} />
                            <div className="mt-1.5"><SkeletonLine w="55%" color="bg-cyan-400/20" h={5} /></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pipeline steps */}
                <AnimatePresence>
                    {phase >= 1 && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
                            className="space-y-2">
                            {['Data Prep', 'Train', 'Evaluate'].map((step, i) => (
                                <motion.div key={step} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.12, duration: 0.3 }}
                                    className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded border shrink-0 flex items-center justify-center"
                                        style={{ borderColor: `color-mix(in srgb, ${accent} 50%, transparent)` }}>
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${accent} 60%, transparent)` }} />
                                    </div>
                                    <span className="text-[10px] font-mono uppercase tracking-wider font-medium" style={{ color: `color-mix(in srgb, ${accent} 70%, transparent)` }}>
                                        {step}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Metrics */}
                <AnimatePresence>
                    {phase >= 2 && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease }}
                            className="rounded-lg border border-cyan-400/25 bg-cyan-500/[0.08] p-2.5">
                            <div className="flex gap-2">
                                <div className="flex-1 h-10 rounded bg-cyan-400/20 flex items-center justify-center">
                                    <span className="text-[10px] font-mono text-cyan-400/70 font-medium">Accuracy</span>
                                </div>
                                <div className="flex-1 h-10 rounded bg-cyan-400/12 flex items-center justify-center">
                                    <span className="text-[10px] font-mono text-cyan-400/50 font-medium">Loss</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ─── IQ: Discovery HUB wireframe ─── */
function IQWireframe() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = [] }, [])
    const play = useCallback(() => {
        clear(); setPhase(-1)
        timers.current.push(setTimeout(() => setPhase(0), 400))
        timers.current.push(setTimeout(() => setPhase(1), 1400))
        timers.current.push(setTimeout(() => setPhase(2), 2400))
    }, [clear])

    useEffect(() => { if (isInView) play(); else { clear(); setPhase(-1) }; return clear }, [isInView, play, clear])

    const accent = '#a855f7'

    return (
        <div ref={ref} className="absolute inset-0 flex items-center justify-center p-5">
            <div className="w-full max-w-[200px] space-y-2.5">
                {/* Search bar */}
                <AnimatePresence>
                    {phase >= 0 && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
                            className="rounded-lg border border-purple-400/25 bg-purple-500/[0.08] p-2.5">
                            <TitleBar label="Discovery HUB" accent={accent} />
                            <div className="h-7 rounded-full border border-purple-400/30 bg-purple-500/[0.08] flex items-center px-2.5 gap-1.5">
                                <div className="w-3 h-3 rounded-full border border-purple-400/40" />
                                <SkeletonLine w="60%" h={3} color="bg-purple-400/25" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Result cards */}
                <AnimatePresence>
                    {phase >= 1 && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
                            className="space-y-2">
                            {[0, 1, 2].map(i => (
                                <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.3 }}
                                    className="rounded-lg border border-purple-400/20 bg-purple-500/[0.06] p-2.5 flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded bg-purple-400/20 shrink-0" />
                                    <div className="flex-1 space-y-1.5">
                                        <SkeletonLine w="70%" h={4} color="bg-purple-400/25" />
                                        <SkeletonLine w="50%" h={3} color="bg-purple-400/15" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* AI suggestion */}
                <AnimatePresence>
                    {phase >= 2 && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                            className="rounded-lg border border-purple-400/30 bg-purple-500/[0.1] p-2.5 flex items-center gap-2.5">
                            <div className="w-5 h-5 rounded-full bg-purple-400/30 flex items-center justify-center shrink-0">
                                <span className="text-[9px] text-purple-300">✦</span>
                            </div>
                            <span className="text-[10px] font-mono text-purple-300/70 uppercase tracking-wider font-medium">AI Recommended</span>
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
        video: '/videos/ml-prototype-walkthrough.mp4',
        link: '/work/ml-functions',
        Wireframe: MLWireframe,
    },
    {
        id: 'iq-plugin',
        title: 'AI powered HUB to meet business needs',
        video: '/videos/iq-prototype-walkthrough.mp4',
        link: '/work/iq-plugin',
        Wireframe: IQWireframe,
    },
    {
        id: 'reportcaster',
        title: 'Customer retention success for Enterprise Scheduling',
        video: '/videos/rc-prototype-walkthrough.mp4',
        link: '/work/reportcaster',
        flagship: true,
        Wireframe: RCWireframe,
    },
]

/* ─── single tile ─── */
function BentoTile({ tile, delay }: { tile: typeof TILES[0]; delay: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const WireframeComponent = tile.Wireframe

    const handleMouseEnter = () => {
        setIsHovered(true)
        if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(() => { })
        }
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
        if (videoRef.current) {
            videoRef.current.pause()
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay, ease }}
        >
            <Link href={tile.link}>
                <div
                    className="group relative w-full h-full overflow-hidden rounded-2xl bg-black/60 cursor-pointer transition-all duration-500 hover:shadow-[0_0_60px_rgba(47,198,213,0.06)]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ minHeight: tile.flagship ? '420px' : '200px' }}
                >
                    {/* Animated wireframe background */}
                    <div className={`transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                        <WireframeComponent />
                    </div>

                    {/* Video (revealed on hover) */}
                    <video
                        ref={videoRef}
                        src={tile.video}
                        muted
                        playsInline
                        loop
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

                    {/* Play button + Watch text — hover only */}
                    <div className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <Play className="w-6 h-6 text-white fill-white ml-1" />
                            </div>
                            <span className="text-xs font-mono uppercase tracking-[0.15em] text-white/70">
                                Watch Case Study
                            </span>
                        </div>
                    </div>

                    {/* Title — always visible */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6">
                        <p className="text-white text-base md:text-lg font-semibold leading-snug max-w-md">
                            {tile.title}
                        </p>
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
        <section ref={ref} className="relative py-20 md:py-32 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto">
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

            {/* Bento Grid: 35% left (stacked) / 65% right (flagship) */}
            <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-4 md:gap-5">
                {/* Left column — ML + DSML stacked */}
                <div className="flex flex-col gap-4 md:gap-5">
                    {leftTiles.map((tile, i) => (
                        <BentoTile key={tile.id} tile={tile} delay={0.1 + i * 0.15} />
                    ))}
                </div>

                {/* Right column — RC flagship */}
                <BentoTile tile={rightTile} delay={0.25} />
            </div>
        </section>
    )
}
