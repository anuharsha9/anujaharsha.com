'use client'

import { motion } from 'framer-motion'
import { Ban, Target, User, ArrowDown, type LucideIcon } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

// ─── Data Types ───────────────────────────────────────────

export interface ResearchSource {
    id: string
    name: string
    role: string
    color: 'amber' | 'blue' | 'teal' | 'purple'
    insights: string[]
    method: string
}

export interface ResearchConstraintsData {
    tag?: string
    title: string
    description: string
    constraint: {
        label: string
        body: string
        blockedMethods?: string[]
    }
    strategy: {
        label: string
        body: string
        proxySources?: string[]
    }
    sources?: ResearchSource[]
    connectorLabel?: string
}

// ─── Animation Variants ──────────────────────────────────

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
}

// ─── Component ───────────────────────────────────────────

interface ResearchConstraintsProps {
    data: ResearchConstraintsData
    accentColor?: 'teal' | 'amber'
    isLightBackground?: boolean
}

export default function ResearchConstraints({
    data,
    accentColor = 'teal',
    isLightBackground = false,
}: ResearchConstraintsProps) {
    return (
        <div className="w-full py-10 md:py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <ComponentHeading
                    variant="block"
                    align="center"
                    tag={data.tag || 'RESEARCH STRATEGY'}
                    title={data.title}
                    description={data.description}
                    color={accentColor}
                    className="mb-14"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="space-y-8"
                >
                    {/* Constraint & Strategy — Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Constraint */}
                        <motion.div variants={itemVariants} className="h-full">
                            <div className="bg-red-500/[0.06] border border-red-500/[0.15] rounded-2xl p-6 md:p-8 h-full flex flex-col items-center md:items-start text-center md:text-left hover:border-red-500/[0.25] transition-colors">
                                <div className="w-10 h-10 rounded-full bg-red-500/[0.15] flex items-center justify-center text-red-400 mb-4 flex-shrink-0">
                                    <Ban className="w-5 h-5" strokeWidth={2} />
                                </div>
                                <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest block mb-2">
                                    {data.constraint.label}
                                </span>
                                <p className="text-[var(--text-body)] text-sm leading-relaxed font-light">
                                    {data.constraint.body}
                                </p>
                                {data.constraint.blockedMethods && (
                                    <div className="mt-4 pt-4 border-t border-red-500/[0.10] w-full space-y-1.5">
                                        <span className="font-mono text-[10px] text-red-400/70 uppercase tracking-widest block mb-2">
                                            {'// BLOCKED_METHODS'}
                                        </span>
                                        {data.constraint.blockedMethods.map((method, i) => (
                                            <div key={i} className="flex items-start gap-2 font-mono text-xs text-[var(--text-body)]">
                                                <span className="text-red-400 mt-px">×</span>
                                                <span>{method}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Strategy */}
                        <motion.div variants={itemVariants} className="h-full">
                            <div className="bg-emerald-500/[0.06] border border-emerald-500/[0.15] rounded-2xl p-6 md:p-8 h-full flex flex-col items-center md:items-start text-center md:text-left hover:border-emerald-500/[0.25] transition-colors">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/[0.15] flex items-center justify-center text-emerald-400 mb-4 flex-shrink-0">
                                    <Target className="w-5 h-5" strokeWidth={2} />
                                </div>
                                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block mb-2">
                                    {data.strategy.label}
                                </span>
                                <p className="text-[var(--text-body)] text-sm leading-relaxed font-light">
                                    {data.strategy.body}
                                </p>
                                {data.strategy.proxySources && (
                                    <div className="mt-4 pt-4 border-t border-emerald-500/[0.10] w-full space-y-1.5">
                                        <span className="font-mono text-[10px] text-emerald-400/70 uppercase tracking-widest block mb-2">
                                            {'// PROXY_SOURCES'}
                                        </span>
                                        {data.strategy.proxySources.map((source, i) => (
                                            <div key={i} className="flex items-start gap-2 font-mono text-xs text-[var(--text-body)]">
                                                <span className="text-emerald-400 mt-px">+</span>
                                                <span>{source}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Connector */}
                    {data.connectorLabel && (
                        <motion.div variants={itemVariants} className="flex justify-center py-2">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-px h-8 bg-white/[0.08]" />
                                <span className="bg-white/[0.05] px-3 py-1 text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest rounded-full border border-white/[0.08]">
                                    {data.connectorLabel}
                                </span>
                                <div className="w-px h-8 bg-white/[0.08]" />
                                <ArrowDown className="w-4 h-4 text-white/20" />
                            </div>
                        </motion.div>
                    )}

                    {/* Knowledge Sources — People Cards */}
                    {data.sources && data.sources.length > 0 && (
                        <div className={`grid grid-cols-1 ${data.sources.length === 1 ? 'max-w-lg mx-auto' : 'md:grid-cols-2'} gap-6`}>
                            {data.sources.map((source) => {
                                const colorMap = {
                                    amber: { bg: 'bg-amber-500/[0.08]', text: 'text-amber-400', hover: 'group-hover:border-amber-500/[0.25]', bullet: 'bg-amber-400' },
                                    blue: { bg: 'bg-blue-500/[0.08]', text: 'text-blue-400', hover: 'group-hover:border-blue-500/[0.25]', bullet: 'bg-blue-400' },
                                    teal: { bg: 'bg-teal-500/[0.08]', text: 'text-teal-400', hover: 'group-hover:border-teal-500/[0.25]', bullet: 'bg-teal-400' },
                                    purple: { bg: 'bg-purple-500/[0.08]', text: 'text-purple-400', hover: 'group-hover:border-purple-500/[0.25]', bullet: 'bg-purple-400' },
                                }
                                const c = colorMap[source.color] || colorMap.teal

                                return (
                                    <motion.div key={source.id} variants={itemVariants}>
                                        <div className={`bg-white/[0.03] border border-white/[0.06] p-8 h-full rounded-2xl hover:shadow-xl hover:shadow-black/20 ${c.hover} transition-all duration-300 group`}>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className={`w-12 h-12 rounded-full ${c.bg} flex items-center justify-center ${c.text} group-hover:scale-110 transition-transform duration-300`}>
                                                    <User className="w-6 h-6" strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[var(--text-heading)] font-bold text-lg">{source.name}</h4>
                                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-medium">{source.role}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest block mb-2">
                                                    {'// REVEALED_INSIGHTS'}
                                                </span>
                                                {source.insights.map((insight, idx) => (
                                                    <div key={idx} className="flex items-start gap-3">
                                                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.bullet}`} />
                                                        <span className="text-sm text-[var(--text-body)] leading-relaxed font-light">
                                                            {insight}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-6 pt-6 border-t border-white/[0.06]">
                                                <span className={`text-xs font-medium cursor-default ${c.text}`}>
                                                    Method: {source.method}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
