'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface ShippedImpactSummaryProps {
    isLightBackground?: boolean
}

const whatShipped = [
    { before: '5 subsystems', after: '1 unified mental model', icon: '🔗' },
    { before: '4 clicks to create', after: '2 clicks to create', icon: '⚡' },
    { before: '2 clicks for Explorer', after: '1 click for Explorer', icon: '🎯' },
    { before: 'Browser tab per asset', after: 'Everything in the hub', icon: '🪟' },
]

const wouldDoDifferently = [
    {
        label: 'Push harder for embedded Explorer view',
        detail: 'Would have expanded the filtered-view pattern to Designer, Reporting Server — everything.',
        impact: 'Biggest regret',
        color: '#f59e0b',
    },
    {
        label: 'Document architectural decisions in real-time',
        detail: 'Not retrospectively — capture rationale as it happens.',
        impact: 'Process improvement',
        color: '#94a3b8',
    },
    {
        label: 'Build design system components as I go',
        detail: 'Not after — reduces handoff friction.',
        impact: 'Efficiency gain',
        color: '#94a3b8',
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
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

export default function ShippedImpactSummary({ isLightBackground = true }: ShippedImpactSummaryProps) {
    return (
        <div className="w-full py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <ComponentHeading
                    variant="block"
                    tag="// SHIPPED_APRIL_2024"
                    title="Requested vs. Delivered"
                    description="They asked for a UI makeover. I delivered a system."
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
                    {/* Scope Contrast */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 bg-slate-100 border-b border-r border-slate-200">
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Before</span>
                                </div>
                                <div className="px-4 py-2 bg-emerald-50 border-b border-slate-200">
                                    <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider">After</span>
                                </div>
                            </div>
                            {whatShipped.map((item, idx) => (
                                <motion.div
                                    key={item.before}
                                    className={`grid grid-cols-2 ${idx < whatShipped.length - 1 ? 'border-b border-slate-100' : ''}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                >
                                    <div className="px-4 py-3 border-r border-slate-100 flex items-center gap-2">
                                        <span className="text-sm text-slate-400 line-through">{item.before}</span>
                                    </div>
                                    <div className="px-4 py-3 flex items-center gap-2">
                                        <span className="text-sm">{item.icon}</span>
                                        <span className="text-sm text-slate-900 font-medium">{item.after}</span>
                                    </div>
                                </motion.div>
                            ))}
                            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                                <span className="text-xs text-slate-500">Designed for the future — room for additional features PM added after launch</span>
                                <span className="text-[10px] font-mono text-emerald-600">20M+ / week</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Customer Validation */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                            <div className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider mb-3">Customer Validation</div>
                            <p className="text-sm text-emerald-900 leading-relaxed italic">
                                In a Virtual User Group session, a long-time customer praised the redesign directly and said he was excited for what was coming next.
                            </p>
                            <p className="text-xs text-emerald-700 mt-3">
                                That moment mattered — because I had seen RC users hack their way around a broken UI for years, and now they finally had a system that worked <em>with</em> them.
                            </p>
                        </div>
                    </motion.div>

                    {/* What I'd Do Differently */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Git_Diff: What I&apos;d do differently</div>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {wouldDoDifferently.map((item) => (
                                    <div key={item.label} className="px-4 py-3 flex items-start gap-3">
                                        <div
                                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm text-slate-800 font-medium">{item.label}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                                        </div>
                                        <span
                                            className="text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                                            style={{
                                                color: item.color,
                                                backgroundColor: `${item.color}15`,
                                            }}
                                        >
                                            {item.impact}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* The Coda */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-slate-900 rounded-xl p-5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 pointer-events-none" />
                            <div className="relative z-10">
                                <div className="text-[10px] font-mono text-teal-500 uppercase tracking-wider mb-3">The turning point</div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    This was not just a redesign. Through RC, I learned to <span className="text-white font-semibold">think in platform patterns</span>, redesign at <span className="text-white font-semibold">architecture scale</span>, interpret <span className="text-white font-semibold">undocumented logic</span>, and operate like a <span className="text-white font-semibold">product owner</span> when needed.
                                </p>
                                <p className="text-sm text-teal-400 font-medium mt-3">
                                    RC made me the design leader I am today.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
