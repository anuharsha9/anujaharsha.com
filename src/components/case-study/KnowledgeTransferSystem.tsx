'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface KnowledgeTransferSystemProps {
    isLightBackground?: boolean
}

const timeline = [
    {
        month: 'Month 1–8',
        label: 'Solo',
        description: 'Working alone on two projects simultaneously — RC + ML Functions',
        color: '#f59e0b',
        items: [
            'Mapping the entire system',
            'Designing core workflows',
            'Managing both projects with a 1-year-old at home',
        ],
    },
    {
        month: 'Month 9',
        label: 'First Hire',
        description: 'Borrowed first designer from another team',
        color: '#0ea5e9',
        items: [
            'Schedule dialog complete',
            'Distribution lists designed',
            'Access lists designed',
        ],
    },
    {
        month: 'Month 13',
        label: 'Second Hire',
        description: 'Onboarded second designer — architecture fully set',
        color: '#8b5cf6',
        items: [
            'Explorer architecture complete',
            'Admin architecture complete',
            'Full knowledge transfer ready',
        ],
    },
]

const handoffSystem = [
    { icon: '📝', label: 'Google Docs', description: 'One per subsystem' },
    { icon: '🎥', label: 'Zoom recordings', description: 'Every key session' },
    { icon: '🎨', label: 'Annotated Sketch files', description: 'Design decisions documented' },
    { icon: '📂', label: 'Google Drive folder', description: 'Single source of truth' },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
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

export default function KnowledgeTransferSystem({ isLightBackground = true }: KnowledgeTransferSystemProps) {
    return (
        <div className="w-full py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <ComponentHeading
                    variant="block"
                    tag="// SCALE_AND_HANDOFF"
                    title="From Solo to System"
                    description="3 other designers worked on 1 feature. I worked on 2 — that said something about the trust."
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
                    {/* Scale Context */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-lg">
                                🤝
                            </div>
                            <div>
                                <div className="text-[10px] font-mono text-amber-600 uppercase tracking-wider mb-1">Team Onboarding</div>
                                <p className="text-sm text-amber-900">
                                    ~20 people who had never seen ReportCaster end-to-end: lead architect, lead engineer, full engineering squad, new PM, QA, documentation
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Timeline */}
                    <div className="space-y-3">
                        {timeline.map((phase, idx) => (
                            <motion.div key={phase.month} variants={itemVariants}>
                                <motion.div
                                    className="rounded-xl border overflow-hidden"
                                    style={{ borderColor: `${phase.color}30` }}
                                    whileHover={{ y: -1, boxShadow: `0 4px 16px ${phase.color}12` }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex flex-col sm:flex-row">
                                        {/* Time Badge */}
                                        <div
                                            className="sm:w-36 px-4 py-3 flex sm:flex-col items-center sm:items-start justify-center gap-2 sm:gap-0 border-b sm:border-b-0 sm:border-r"
                                            style={{
                                                backgroundColor: `${phase.color}08`,
                                                borderColor: `${phase.color}20`,
                                            }}
                                        >
                                            <div className="text-sm font-bold" style={{ color: phase.color }}>
                                                {phase.month}
                                            </div>
                                            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                                                {phase.label}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-4 bg-white">
                                            <p className="text-sm text-slate-700 mb-2 font-medium">{phase.description}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {phase.items.map((item) => (
                                                    <span
                                                        key={item}
                                                        className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full"
                                                        style={{
                                                            color: phase.color,
                                                            backgroundColor: `${phase.color}10`,
                                                        }}
                                                    >
                                                        <span>✓</span> {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Connector */}
                                {idx < timeline.length - 1 && (
                                    <div className="flex justify-center py-1">
                                        <div className="w-px h-4 bg-gradient-to-b" style={{
                                            background: `linear-gradient(to bottom, ${phase.color}40, ${timeline[idx + 1].color}40)`
                                        }} />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Connector */}
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <div className="flex flex-col items-center gap-0.5">
                            <div className="w-px h-4 bg-gradient-to-b from-violet-300 to-teal-400" />
                            <span className="text-[9px] font-mono text-teal-600 uppercase tracking-wider">knowledge transfer system</span>
                            <div className="w-px h-3 bg-teal-400" />
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                <path d="M1 1L6 6L11 1" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Handoff System */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                                    The handoff kit
                                </div>
                                <div className="text-sm font-semibold text-slate-900 mt-1">Everything I Built for the Transition</div>
                            </div>
                            <div className="p-4 grid grid-cols-2 gap-3">
                                {handoffSystem.map((item) => (
                                    <div key={item.label} className="flex items-start gap-2 p-2 bg-slate-50 rounded-md">
                                        <span className="text-lg">{item.icon}</span>
                                        <div>
                                            <div className="text-xs font-semibold text-slate-700">{item.label}</div>
                                            <div className="text-[10px] text-slate-500">{item.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
                                <p className="text-[11px] text-slate-500">
                                    Weekly sessions for weeks — one aspect of RC per topic. Walkthroughs, legacy teardowns, design reviews — until each designer could navigate independently.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Legacy */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-slate-900 rounded-xl p-5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 pointer-events-none" />
                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex-1">
                                    <div className="text-[10px] font-mono text-teal-500 uppercase tracking-wider mb-2">The afterglow</div>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        Remained point of contact for <span className="text-white font-semibold">6 months after exit</span>. The other designers reached out regularly until they didn&apos;t need me anymore.
                                    </p>
                                </div>
                                <div className="flex gap-4 flex-shrink-0">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-teal-400">~20</div>
                                        <div className="text-[9px] text-slate-500 uppercase tracking-wider">People onboarded</div>
                                    </div>
                                    <div className="w-px bg-slate-700" />
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-teal-400">6mo</div>
                                        <div className="text-[9px] text-slate-500 uppercase tracking-wider">Post-exit support</div>
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
