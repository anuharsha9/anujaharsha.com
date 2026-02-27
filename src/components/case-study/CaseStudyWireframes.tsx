'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

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
export function RCWireframe() {
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
        loopRef.current = setTimeout(() => play(), 5000)
    }, [clear])

    useEffect(() => { if (isInView) play(); else { clear(); setPhase(-1) }; return clear }, [isInView, play, clear])

    const a = '#f59e0b'

    return (
        <div ref={ref} className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
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

            {phase >= 3 && (
                <motion.div animate={{ opacity: [0, 0.2, 0] }} transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, ${a}15, transparent 70%)` }} />
            )}
        </div>
    )
}

/* ─── ML: Workflow pipeline — HORIZONTAL layout ─── */
export function MLWireframe() {
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
        <div ref={ref} className="absolute inset-0 flex items-center justify-center p-3 md:p-4">
            <div className="w-full max-w-[260px] space-y-3">
                <AnimatePresence>
                    {phase >= 0 && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
                            className="flex gap-3 md:gap-2 items-center justify-center flex-wrap">
                            {steps.map((step, i) => (
                                <motion.div key={step}
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                                    className="flex flex-col items-center gap-1">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg border flex items-center justify-center"
                                        style={{ borderColor: `${a}50`, backgroundColor: `${a}15` }}>
                                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: `${a}60` }} />
                                    </div>
                                    <span className="text-[7px] md:text-[8px] font-mono uppercase tracking-wider font-medium" style={{ color: `${a}90` }}>
                                        {step}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

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
export function IQWireframe() {
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
