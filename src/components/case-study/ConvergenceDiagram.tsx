'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface ConvergenceDiagramProps {
    isLightBackground?: boolean
}

const tools = [
    {
        id: 'nlq',
        label: 'NLQ',
        subtitle: 'Ask a Question',
        icon: '💬',
        color: '#6366f1', // indigo
        gradient: 'from-indigo-500/20 to-indigo-600/5',
        borderColor: 'border-indigo-200',
        textColor: 'text-indigo-600',
        glowColor: 'shadow-indigo-500/20',
    },
    {
        id: 'insights',
        label: 'Insights',
        subtitle: 'Auto Analyze',
        icon: '✨',
        color: '#f59e0b', // amber
        gradient: 'from-amber-500/20 to-amber-600/5',
        borderColor: 'border-amber-200',
        textColor: 'text-amber-600',
        glowColor: 'shadow-amber-500/20',
    },
    {
        id: 'ml',
        label: 'ML Functions',
        subtitle: 'Predict Data',
        icon: '🧠',
        color: '#10b981', // emerald
        gradient: 'from-emerald-500/20 to-emerald-600/5',
        borderColor: 'border-emerald-200',
        textColor: 'text-emerald-600',
        glowColor: 'shadow-emerald-500/20',
    },
]

export default function ConvergenceDiagram({ isLightBackground = true }: ConvergenceDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.85', 'end 0.3'],
    })

    // Phase 1: Cards spread apart (0 → 0.3)
    // Phase 2: Cards converge toward center (0.3 → 0.7)
    // Phase 3: Unified hub appears (0.7 → 1.0)

    // Tool card horizontal offsets (spread → converge)
    const x0 = useTransform(scrollYProgress, [0, 0.15, 0.55, 0.75], [-180, -180, 0, 0])
    const x1 = useTransform(scrollYProgress, [0, 0.15, 0.55, 0.75], [0, 0, 0, 0])
    const x2 = useTransform(scrollYProgress, [0, 0.15, 0.55, 0.75], [180, 180, 0, 0])

    // Vertical offsets
    const y0 = useTransform(scrollYProgress, [0, 0.15, 0.55, 0.75], [-20, -20, 0, 0])
    const y1 = useTransform(scrollYProgress, [0, 0.15, 0.55, 0.75], [40, 40, 0, 0])
    const y2 = useTransform(scrollYProgress, [0, 0.15, 0.55, 0.75], [-20, -20, 0, 0])

    // Scale down old cards as they merge
    const cardScale = useTransform(scrollYProgress, [0.55, 0.75], [1, 0])
    const cardOpacity = useTransform(scrollYProgress, [0.55, 0.75], [1, 0])

    // Hub reveal
    const hubScale = useTransform(scrollYProgress, [0.6, 0.8, 0.9], [0.5, 1, 1])
    const hubOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1])
    const hubGlow = useTransform(scrollYProgress, [0.75, 0.95], [0, 30])

    // Connection lines opacity
    const lineOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [0, 0.6, 0.6, 0])

    // Label animations
    const beforeOpacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.65], [0, 1, 1, 0])
    const afterOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1])

    // Particle effects during merge
    const particleOpacity = useTransform(scrollYProgress, [0.6, 0.7, 0.85], [0, 1, 0])
    const particleScale = useTransform(scrollYProgress, [0.6, 0.85], [0.5, 2.5])

    const xOffsets = [x0, x1, x2]
    const yOffsets = [y0, y1, y2]

    return (
        <div className="w-full py-12 md:py-16" ref={containerRef}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <ComponentHeading
                    variant="block"
                    tag="// CONVERGENCE"
                    title="Three Tools → One Hub"
                    description="Watch the fragmented experience unify into a single, discoverable entry point."
                    color="teal"
                    align="center"
                    className="mb-12"
                />

                {/* The Animation Stage */}
                <div className="relative h-[420px] md:h-[480px] flex items-center justify-center overflow-hidden">
                    {/* Background Grid Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `radial-gradient(circle, #64748b 1px, transparent 1px)`,
                            backgroundSize: '24px 24px',
                        }}
                    />

                    {/* Connection Lines SVG */}
                    <motion.svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ opacity: lineOpacity }}
                    >
                        {/* Animated dashed lines connecting tools to center */}
                        <motion.line
                            x1="25%" y1="40%" x2="50%" y2="50%"
                            stroke="#6366f1"
                            strokeWidth="1.5"
                            strokeDasharray="6 4"
                            opacity={0.5}
                        />
                        <motion.line
                            x1="50%" y1="35%" x2="50%" y2="50%"
                            stroke="#f59e0b"
                            strokeWidth="1.5"
                            strokeDasharray="6 4"
                            opacity={0.5}
                        />
                        <motion.line
                            x1="75%" y1="40%" x2="50%" y2="50%"
                            stroke="#10b981"
                            strokeWidth="1.5"
                            strokeDasharray="6 4"
                            opacity={0.5}
                        />
                    </motion.svg>

                    {/* "BEFORE" Label */}
                    <motion.div
                        className="absolute top-4 left-1/2 -translate-x-1/2"
                        style={{ opacity: beforeOpacity }}
                    >
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200">
                            Before: Scattered across platform
                        </span>
                    </motion.div>

                    {/* "AFTER" Label */}
                    <motion.div
                        className="absolute top-4 left-1/2 -translate-x-1/2"
                        style={{ opacity: afterOpacity }}
                    >
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-teal)] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[var(--accent-teal)]/30">
                            After: One unified hub
                        </span>
                    </motion.div>

                    {/* Tool Cards */}
                    {tools.map((tool, index) => (
                        <motion.div
                            key={tool.id}
                            className={`absolute bg-gradient-to-br ${tool.gradient} border ${tool.borderColor} backdrop-blur-sm rounded-xl p-5 w-[140px] md:w-[160px] text-center shadow-lg ${tool.glowColor}`}
                            style={{
                                x: xOffsets[index],
                                y: yOffsets[index],
                                scale: cardScale,
                                opacity: cardOpacity,
                            }}
                        >
                            <div className="text-3xl mb-2">{tool.icon}</div>
                            <div className={`font-semibold text-sm ${tool.textColor}`}>{tool.label}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{tool.subtitle}</div>
                            <div className="mt-3 h-1 rounded-full bg-slate-100 overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: tool.color, width: '100%' }}
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.15, duration: 0.8, ease: 'easeOut' }}
                                />
                            </div>
                            <div className="font-mono text-[9px] text-slate-400 mt-2 uppercase tracking-wider">
                                &lt;5% adoption
                            </div>
                        </motion.div>
                    ))}

                    {/* Merge Particles */}
                    <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ opacity: particleOpacity, scale: particleScale }}
                    >
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-[var(--accent-teal)]/30"
                                style={{
                                    left: `${Math.cos((i * Math.PI * 2) / 8) * 40}px`,
                                    top: `${Math.sin((i * Math.PI * 2) / 8) * 40}px`,
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Unified Hub */}
                    <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                        style={{
                            scale: hubScale,
                            opacity: hubOpacity,
                        }}
                    >
                        <motion.div
                            className="relative bg-white border-2 border-[var(--accent-teal)]/40 rounded-2xl p-8 w-[280px] md:w-[340px] text-center"
                            style={{
                                boxShadow: useTransform(hubGlow, (v) => `0 0 ${v}px rgba(20, 184, 166, 0.15), 0 8px 32px rgba(0, 0, 0, 0.06)`),
                            }}
                        >
                            {/* Hub Header */}
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-teal)] to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[var(--accent-teal)]/20">
                                    IQ
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-slate-900 text-sm leading-none">DSML Hub</div>
                                    <div className="text-[10px] text-slate-500">Unified Entry Point</div>
                                </div>
                            </div>

                            {/* Mini Tool Tiles */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {tools.map((tool) => (
                                    <motion.div
                                        key={tool.id}
                                        className={`flex flex-col items-center p-2.5 rounded-lg border ${tool.borderColor} bg-gradient-to-br ${tool.gradient}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <span className="text-lg">{tool.icon}</span>
                                        <span className={`text-[9px] font-medium ${tool.textColor} mt-0.5`}>{tool.subtitle}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Impact Metric */}
                            <div className="bg-slate-50 rounded-lg py-2.5 px-3 border border-slate-100">
                                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Impact</div>
                                <div className="flex items-baseline justify-center gap-1.5">
                                    <span className="text-xl font-bold text-[var(--accent-teal)]">+25%</span>
                                    <span className="text-xs text-slate-500">adoption</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom Caption */}
                <motion.div
                    className="text-center mt-8"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                        <span className="text-slate-700 font-medium">Visibility was the problem. Visibility was the solution.</span>
                        {' '}Three powerful features became one cohesive experience — without changing any underlying functionality.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
