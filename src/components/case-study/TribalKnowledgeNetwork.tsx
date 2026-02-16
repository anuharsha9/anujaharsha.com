'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface TribalKnowledgeNetworkProps {
    isLightBackground?: boolean
}

const sources = [
    {
        id: 'chris',
        name: 'Chris Kaplan',
        role: 'Gold Support Lead',
        initials: 'CK',
        color: '#f59e0b',
        insights: [
            'Which issues take longest to resolve',
            'What users hack around daily',
            'Real-world pain points from support tickets',
        ],
        method: 'Embedded in team meetings',
    },
    {
        id: 'yingchun',
        name: 'Yingchun Chen',
        role: 'Original RC Engineer',
        initials: 'YC',
        color: '#0ea5e9',
        insights: [
            'Decades of undocumented logic',
            'Why legacy decisions were made',
            'What code can and cannot change',
        ],
        method: 'Deep technical sessions',
    },
]

const artifacts = [
    { label: 'Hundreds of screenshots', icon: '📸' },
    { label: 'Mind maps & IA diagrams', icon: '🗺️' },
    { label: 'Pain point analyses', icon: '📊' },
    { label: 'Validated with support reps', icon: '✓' },
]

const revelation = {
    label: 'THE REVELATION',
    title: 'ReportCaster wasn\'t a "feature"',
    subtitle: 'It was a product inside a product',
    stats: [
        { value: '5', label: 'Independent subsystems' },
        { value: '13M', label: 'Schedules / day' },
        { value: '0', label: 'Documentation pages' },
    ],
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
}

export default function TribalKnowledgeNetwork({ isLightBackground = true }: TribalKnowledgeNetworkProps) {
    return (
        <div className="w-full py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <ComponentHeading
                    variant="block"
                    tag="// RESEARCH_NETWORK"
                    title="Building the Knowledge Map"
                    description="No user access. No documentation. I built my own intelligence network."
                    color="teal"
                    align="center"
                    className="mb-14"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="space-y-6"
                >
                    {/* The Constraint Banner */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-mono text-red-500 uppercase tracking-wider">Access Blocked</div>
                                <p className="text-sm text-red-800">Enterprise security policies blocked direct access to end users. No interviews. No usability tests. No direct feedback.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Connector */}
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <div className="flex flex-col items-center gap-0.5">
                            <div className="w-px h-6 bg-gradient-to-b from-red-300 to-amber-400" />
                            <span className="text-[9px] font-mono text-amber-500 uppercase tracking-wider">so I built my own network</span>
                            <div className="w-px h-3 bg-amber-400" />
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                <path d="M1 1L6 6L11 1" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Knowledge Sources */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sources.map((source) => (
                            <motion.div key={source.id} variants={itemVariants}>
                                <motion.div
                                    className="rounded-xl border overflow-hidden h-full"
                                    style={{ borderColor: `${source.color}30` }}
                                    whileHover={{ y: -2, boxShadow: `0 8px 24px ${source.color}15` }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Source Header */}
                                    <div
                                        className="px-4 py-3 flex items-center gap-3 border-b"
                                        style={{ borderColor: `${source.color}20`, backgroundColor: `${source.color}08` }}
                                    >
                                        <div
                                            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                            style={{ backgroundColor: source.color }}
                                        >
                                            {source.initials}
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-900">{source.name}</div>
                                            <div className="text-[11px] text-slate-500">{source.role}</div>
                                        </div>
                                    </div>

                                    {/* Insights */}
                                    <div className="p-4 bg-white space-y-2">
                                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                                            What they revealed
                                        </div>
                                        {source.insights.map((insight) => (
                                            <div key={insight} className="flex items-start gap-2">
                                                <span className="text-[10px] mt-0.5" style={{ color: source.color }}>→</span>
                                                <span className="text-xs text-slate-600 leading-relaxed">{insight}</span>
                                            </div>
                                        ))}
                                        <div className="pt-2 mt-2 border-t border-slate-100">
                                            <span className="text-[10px] font-mono" style={{ color: source.color }}>
                                                {source.method}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Connector */}
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <div className="flex flex-col items-center gap-0.5">
                            <div className="w-px h-4 bg-gradient-to-b from-amber-300 to-slate-400" />
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                <path d="M1 1L6 6L11 1" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Research Artifacts Row */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3">
                                Research artifacts produced
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {artifacts.map((artifact) => (
                                    <div key={artifact.label} className="flex items-center gap-2 text-xs text-slate-600">
                                        <span className="text-base">{artifact.icon}</span>
                                        <span>{artifact.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Connector */}
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <div className="flex flex-col items-center gap-0.5">
                            <div className="w-px h-4 bg-gradient-to-b from-slate-300 to-emerald-400" />
                            <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-wider">revealed the truth</span>
                            <div className="w-px h-3 bg-emerald-400" />
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                <path d="M1 1L6 6L11 1" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* The Revelation */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-slate-900 rounded-xl p-5 md:p-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 pointer-events-none" />
                            <div className="relative z-10">
                                <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-wider mb-3">
                                    {revelation.label}
                                </div>
                                <p className="text-lg md:text-xl font-bold text-white mb-1">
                                    {revelation.title}
                                </p>
                                <p className="text-sm text-emerald-400 mb-5 font-medium">
                                    {revelation.subtitle}
                                </p>

                                {/* Stats */}
                                <div className="flex gap-6">
                                    {revelation.stats.map((stat, i) => (
                                        <div key={stat.label}>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-teal-400">{stat.value}</span>
                                                {i < revelation.stats.length - 1 && (
                                                    <span className="hidden" />
                                                )}
                                            </div>
                                            <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
