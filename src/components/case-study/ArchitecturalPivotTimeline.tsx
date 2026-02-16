'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface ArchitecturalPivotTimelineProps {
    isLightBackground?: boolean
}

const pivots = [
    {
        id: 'v1',
        phase: 'V1',
        title: 'Independent Product',
        subtitle: 'Standalone RC environment',
        status: 'rejected' as const,
        reason: '"Leadership wants all workflows centralized in the hub."',
        reasonType: 'Strategy',
        duration: 'Months 1–4',
        effort: 'Full UI audit, competitor scoring, standalone mockups',
        color: '#ef4444',
        bgGradient: 'from-red-50 to-red-100/50',
        borderColor: 'border-red-200',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
    },
    {
        id: 'v2',
        phase: 'V2',
        title: 'Hub Plugin',
        subtitle: 'Integrated navigation, consolidated subsystems',
        status: 'rejected' as const,
        reason: '"Too much engineering effort this year."',
        reasonType: 'Resourcing',
        duration: 'Months 5–8',
        effort: 'Hub integration design, navigation, consolidated views',
        color: '#f59e0b',
        bgGradient: 'from-amber-50 to-amber-100/50',
        borderColor: 'border-amber-200',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
    },
    {
        id: 'v3',
        phase: 'V3',
        title: 'Platform-Native Modal',
        subtitle: 'The breakthrough: + menu → modal creation',
        status: 'shipped' as const,
        reason: '"When both UX and engineering won, leadership said yes."',
        reasonType: 'Breakthrough',
        duration: 'Months 9–14',
        effort: 'Modal workflows, progressive disclosure, natural language summaries',
        color: '#10b981',
        bgGradient: 'from-emerald-50 to-emerald-100/50',
        borderColor: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.25,
            delayChildren: 0.2,
        },
    },
}

const pivotVariants = {
    hidden: { opacity: 0, x: -30, filter: 'blur(8px)' },
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
}

const stampVariants = {
    hidden: { opacity: 0, scale: 2.5, rotate: -15 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: -12,
        transition: { type: 'spring', stiffness: 300, damping: 15, delay: 0.3 },
    },
}

const breakthroughVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
}

const glowPulse = {
    animate: {
        boxShadow: [
            '0 0 0 0 rgba(16, 185, 129, 0)',
            '0 0 20px 4px rgba(16, 185, 129, 0.15)',
            '0 0 0 0 rgba(16, 185, 129, 0)',
        ],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
}

export default function ArchitecturalPivotTimeline({ isLightBackground = true }: ArchitecturalPivotTimelineProps) {
    return (
        <div className="w-full py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <ComponentHeading
                    variant="block"
                    tag="// ARCHITECTURAL_PIVOTS"
                    title="Three Tries to Get It Right"
                    description="Two rejections. One reframe. The third direction wasn't a compromise — it was better than either rejected version."
                    color="teal"
                    align="center"
                    className="mb-14"
                />

                <motion.div
                    className="relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px">
                        <motion.div
                            className="w-full h-full"
                            style={{
                                background: 'linear-gradient(to bottom, #ef4444, #f59e0b, #10b981)',
                            }}
                            initial={{ scaleY: 0, transformOrigin: 'top' }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        />
                    </div>

                    {/* Pivot Nodes */}
                    <div className="space-y-8 md:space-y-12">
                        {pivots.map((pivot, index) => (
                            <motion.div
                                key={pivot.id}
                                className="relative pl-16 md:pl-20"
                                variants={pivotVariants}
                            >
                                {/* Timeline Node */}
                                <motion.div
                                    className={`absolute left-3 md:left-5 w-6 h-6 md:w-7 md:h-7 rounded-full border-[3px] border-white shadow-md flex items-center justify-center z-10`}
                                    style={{ backgroundColor: pivot.color }}
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                >
                                    {pivot.status === 'rejected' ? (
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white">
                                            <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    ) : (
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white">
                                            <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </motion.div>

                                {/* Content Card */}
                                {pivot.status === 'shipped' ? (
                                    <motion.div
                                        className={`bg-gradient-to-br ${pivot.bgGradient} border-2 ${pivot.borderColor} rounded-xl p-5 md:p-7 relative overflow-hidden`}
                                        variants={breakthroughVariants}
                                        {...glowPulse}
                                    >
                                        {/* Shipped glow background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

                                        {/* Header Row */}
                                        <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-mono text-xs font-bold text-emerald-600 tracking-wider">{pivot.phase}</span>
                                                    <span className="text-[10px] font-mono text-emerald-500/70 uppercase tracking-wider">{pivot.duration}</span>
                                                </div>
                                                <h4 className="text-lg md:text-xl font-bold text-slate-900">{pivot.title}</h4>
                                                <p className="text-sm text-slate-600 mt-0.5">{pivot.subtitle}</p>
                                            </div>
                                            {/* Shipped Badge */}
                                            <motion.div
                                                className="flex-shrink-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-emerald-500/25"
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ type: 'spring', stiffness: 300, delay: 0.6 }}
                                            >
                                                ✓ Shipped
                                            </motion.div>
                                        </div>

                                        {/* Effort */}
                                        <div className="text-xs text-slate-500 mb-3 relative z-10">
                                            <span className="font-mono text-emerald-500/60 mr-1">&gt;</span>
                                            {pivot.effort}
                                        </div>

                                        {/* Quote */}
                                        <div className="border-l-2 border-emerald-400 pl-3 py-1 relative z-10">
                                            <p className="text-sm text-emerald-700 italic">{pivot.reason}</p>
                                        </div>

                                        {/* Impact Metrics */}
                                        <motion.div
                                            className="grid grid-cols-3 gap-3 mt-5 relative z-10"
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.8 }}
                                        >
                                            {[
                                                { value: '5 → 1', label: 'Subsystems' },
                                                { value: '4 → 2', label: 'Clicks' },
                                                { value: '20M+', label: 'Weekly' },
                                            ].map((metric) => (
                                                <div key={metric.label} className="bg-white/60 backdrop-blur-sm rounded-lg p-2.5 text-center border border-emerald-200/50">
                                                    <div className="text-base font-bold text-emerald-700">{metric.value}</div>
                                                    <div className="text-[9px] text-emerald-600/60 uppercase tracking-wider">{metric.label}</div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        className={`bg-gradient-to-br ${pivot.bgGradient} border ${pivot.borderColor} rounded-xl p-5 md:p-6 relative overflow-hidden`}
                                        whileHover={{ y: -2 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {/* Header Row */}
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`font-mono text-xs font-bold ${pivot.iconColor} tracking-wider`}>{pivot.phase}</span>
                                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{pivot.duration}</span>
                                                </div>
                                                <h4 className="text-lg font-semibold text-slate-900">{pivot.title}</h4>
                                                <p className="text-sm text-slate-500 mt-0.5">{pivot.subtitle}</p>
                                            </div>
                                            {/* Rejected Stamp */}
                                            <motion.div
                                                className="flex-shrink-0"
                                                variants={stampVariants}
                                            >
                                                <div
                                                    className="border-2 border-red-400/60 text-red-500/70 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider"
                                                    style={{ transform: 'rotate(-12deg)' }}
                                                >
                                                    Rejected
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Effort */}
                                        <div className="text-xs text-slate-500 mb-3">
                                            <span className="font-mono text-slate-400 mr-1">&gt;</span>
                                            {pivot.effort}
                                        </div>

                                        {/* Quote with Reason */}
                                        <div className="border-l-2 border-slate-300 pl-3 py-1">
                                            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                                                Constraint: {pivot.reasonType}
                                            </div>
                                            <p className="text-sm text-slate-600 italic">{pivot.reason}</p>
                                        </div>

                                        {/* Strike-through decoration */}
                                        <motion.div
                                            className="absolute inset-0 pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 0.03 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <div className="absolute inset-y-0 left-1/4 right-1/4 flex items-center">
                                                <div className="w-full h-0.5 bg-red-500 rotate-[-2deg]" />
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Connection Arrow to Next */}
                                {index < pivots.length - 1 && (
                                    <motion.div
                                        className="flex items-center gap-2 mt-4 ml-2"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <div className="w-4 h-px bg-slate-300" />
                                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                                            {index === 0 ? 'Reframe: scope → architecture' : 'Reframe: where → how'}
                                        </span>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Insight */}
                    <motion.div
                        className="mt-10 ml-16 md:ml-20"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="bg-slate-900 rounded-lg p-4 max-w-lg">
                            <div className="flex items-start gap-2.5">
                                <span className="font-mono text-sm text-[var(--accent-teal)] flex-shrink-0">&gt;</span>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    The key insight: I stopped asking <span className="text-white font-medium">&ldquo;Where should RC live?&rdquo;</span> and started asking <span className="text-[var(--accent-teal)] font-medium">&ldquo;How does the platform WANT workflows to behave?&rdquo;</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
