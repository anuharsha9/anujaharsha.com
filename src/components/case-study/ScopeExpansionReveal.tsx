'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface ScopeExpansionRevealProps {
    isLightBackground?: boolean
}

const layers = [
    {
        id: 'surface',
        label: 'What they asked for',
        title: 'UI Makeover',
        description: '"Make it look better"',
        items: ['Update colors', 'Clean up typography', 'Modern buttons'],
        depth: 0,
        color: '#94a3b8',     // slate-400
        accent: '#cbd5e1',    // slate-300
        bg: 'bg-slate-100',
    },
    {
        id: 'pattern',
        label: 'What I found at the surface',
        title: '5 Fragmented Subsystems',
        description: 'Schedules • Distribution Lists • Access Lists • Explorer • Admin',
        items: ['Zero documentation', 'Undiscoverable features', 'Context switching chaos'],
        depth: 1,
        color: '#f59e0b',     // amber-500
        accent: '#fbbf24',    // amber-400
        bg: 'bg-amber-50',
    },
    {
        id: 'system',
        label: 'What I uncovered underneath',
        title: 'Tribal Knowledge System',
        description: '40+ years of undocumented logic, hacks, and workarounds',
        items: ['Users hacking the UI daily', 'Support team as documentation', 'One engineer with all context'],
        depth: 2,
        color: '#ef4444',     // red-500
        accent: '#f87171',    // red-400
        bg: 'bg-red-50',
    },
    {
        id: 'architecture',
        label: 'What I delivered',
        title: 'Foundational System Architecture',
        description: 'A unified mental model. Documented. Future-proofed. Shipped.',
        items: ['1 unified hub', '2-click creation', '20M+ schedules/week', 'Zero regression'],
        depth: 3,
        color: '#10b981',     // emerald-500
        accent: '#34d399',    // emerald-400
        bg: 'bg-emerald-50',
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.1,
        },
    },
}

const layerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(6px)' },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
}

export default function ScopeExpansionReveal({ isLightBackground = true }: ScopeExpansionRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.9', 'end 0.4'],
    })

    // Arrow opacity — fade in as user scrolls
    const arrowOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

    return (
        <div className="w-full py-12 md:py-16" ref={containerRef}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <ComponentHeading
                    variant="block"
                    tag="// SCOPE_EVOLUTION"
                    title="The Project Beneath the Project"
                    description="They asked for a UI makeover. Each layer I peeled back revealed something bigger."
                    color="teal"
                    align="center"
                    className="mb-14"
                />

                <motion.div
                    className="relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Layer Stack */}
                    <div className="space-y-4">
                        {layers.map((layer, index) => (
                            <motion.div key={layer.id} variants={layerVariants}>
                                {/* Depth Arrow Connector */}
                                {index > 0 && (
                                    <motion.div
                                        className="flex items-center justify-center py-2"
                                        style={{ opacity: arrowOpacity }}
                                    >
                                        <div className="flex flex-col items-center gap-0.5">
                                            <div className="w-px h-4 bg-gradient-to-b from-transparent" style={{ '--tw-gradient-to': layer.color } as React.CSSProperties} />
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                                <path d="M1 1L6 6L11 1" stroke={layer.color} strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            <span className="text-[9px] font-mono uppercase tracking-wider mt-0.5" style={{ color: layer.color }}>
                                                {index === 1 ? 'dig deeper' : index === 2 ? 'keep going' : 'reframe'}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Layer Card */}
                                <motion.div
                                    className={`relative rounded-xl border overflow-hidden transition-shadow duration-300`}
                                    style={{
                                        borderColor: layer.depth === 3 ? layer.color : `${layer.color}40`,
                                        // Each layer shifts slightly right to create depth effect
                                        marginLeft: layer.depth * 8,
                                        marginRight: layer.depth === 3 ? 0 : (3 - layer.depth) * 8,
                                    }}
                                    whileHover={{
                                        y: -2,
                                        boxShadow: `0 8px 24px ${layer.color}15`,
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Layer Header */}
                                    <div
                                        className="px-4 py-2 flex items-center gap-2 border-b"
                                        style={{
                                            borderColor: `${layer.color}30`,
                                            backgroundColor: `${layer.color}08`,
                                        }}
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: layer.color }}
                                        />
                                        <span
                                            className="text-[10px] font-mono uppercase tracking-wider"
                                            style={{ color: layer.color }}
                                        >
                                            {layer.label}
                                        </span>
                                        {/* Depth indicator dots */}
                                        <div className="ml-auto flex gap-1">
                                            {Array.from({ length: layer.depth + 1 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1.5 h-1.5 rounded-full"
                                                    style={{ backgroundColor: `${layer.color}${i <= layer.depth ? '80' : '30'}` }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Layer Content */}
                                    <div className={`p-4 md:p-5 ${layer.bg}`}>
                                        <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-6">
                                            {/* Title Area */}
                                            <div className="flex-1 min-w-0">
                                                <h4
                                                    className={`text-lg font-bold ${layer.depth === 3 ? 'text-emerald-700' : 'text-slate-900'}`}
                                                >
                                                    {layer.title}
                                                </h4>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    {layer.description}
                                                </p>
                                            </div>

                                            {/* Items */}
                                            <div className="flex flex-wrap gap-1.5 md:flex-col md:gap-1">
                                                {layer.items.map((item) => (
                                                    <span
                                                        key={item}
                                                        className="inline-flex items-center gap-1 text-[11px] font-mono"
                                                        style={{ color: `${layer.color}cc` }}
                                                    >
                                                        <span style={{ color: layer.color }}>
                                                            {layer.depth === 3 ? '✓' : '•'}
                                                        </span>
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Strike-through for the first layer (what they asked for) */}
                                    {layer.depth === 0 && (
                                        <motion.div
                                            className="absolute inset-0 pointer-events-none flex items-center"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 1.5 }}
                                        >
                                            <div className="w-full px-4">
                                                <div className="w-full h-[1px] bg-slate-400/30" />
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA Block */}
                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="bg-slate-900 rounded-lg p-4 md:p-5 relative overflow-hidden">
                            {/* Subtle glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none" />

                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 relative z-10">
                                <div className="flex-1">
                                    <div className="text-[10px] font-mono text-teal-500 uppercase tracking-wider mb-1">Scope delta</div>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        <span className="text-slate-500 line-through">Requested: UI makeover</span>
                                        <span className="mx-2 text-slate-600">→</span>
                                        <span className="text-white font-medium">Delivered: Foundational system architecture</span>
                                    </p>
                                </div>
                                <div className="flex gap-4 text-center flex-shrink-0">
                                    <div>
                                        <div className="text-lg font-bold text-teal-400">14</div>
                                        <div className="text-[9px] text-slate-500 uppercase tracking-wider">Months</div>
                                    </div>
                                    <div className="w-px bg-slate-700" />
                                    <div>
                                        <div className="text-lg font-bold text-teal-400">5→1</div>
                                        <div className="text-[9px] text-slate-500 uppercase tracking-wider">Systems</div>
                                    </div>
                                    <div className="w-px bg-slate-700" />
                                    <div>
                                        <div className="text-lg font-bold text-teal-400">20M+</div>
                                        <div className="text-[9px] text-slate-500 uppercase tracking-wider">Weekly</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
