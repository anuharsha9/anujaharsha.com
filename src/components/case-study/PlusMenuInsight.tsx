'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'
import { withHexAlpha } from '@/lib/color-utils'

import { ChevronDown, BarChart2, RefreshCw, Search } from 'lucide-react'

interface PlusMenuInsightProps {
    isLightBackground?: boolean
}

const existingWorkflows = [
    { label: 'Create Visualization', icon: <BarChart2 className="w-4 h-4" /> },
    { label: 'Fetch Data', icon: <RefreshCw className="w-4 h-4" /> },
    { label: 'Explore Data', icon: <Search className="w-4 h-4" /> },
]

const newWorkflows = [
    { label: 'Create Schedule', color: 'var(--semantic-emerald-500)' },
    { label: 'Create Distribution List', color: 'var(--semantic-emerald-500)' },
    { label: 'Create Access List', color: 'var(--semantic-emerald-500)' },
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

export default function PlusMenuInsight({ isLightBackground = true }: PlusMenuInsightProps) {
    return (
        <div className="w-full py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <ComponentHeading
                    variant="block"
                    tag="// THE_REFRAME"
                    title="The Question That Changed Everything"
                    description="After two rejections, I stopped asking 'Where should RC live?' and started asking something different."
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
                    {/* The Wrong Question */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 relative">
                            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">Old question</div>
                            <p className="text-base text-slate-500 italic line-through decoration-slate-300">
                                &quot;Where should ReportCaster live?&quot;
                            </p>
                            <motion.div
                                className="absolute -right-1 -top-1 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, type: 'spring' }}
                            >
                                <span className="text-red-500 text-xs font-bold">✕</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Connector */}
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <div className="flex flex-col items-center gap-0.5">
                            <div className="w-px h-4 bg-gradient-to-b from-slate-300 to-emerald-400" />
                            <span className="text-[9px] font-mono text-emerald-600 uppercase tracking-wider">reframe</span>
                            <div className="w-px h-3 bg-emerald-400" />
                            <div className="w-px h-3 bg-emerald-400" />
                            <ChevronDown className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                        </div>
                    </motion.div>

                    {/* The Right Question */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-4 relative">
                            <div className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider mb-2">New question</div>
                            <p className="text-lg font-semibold text-emerald-800">
                                &quot;How does the platform <em>want</em> workflows to behave?&quot;
                            </p>
                        </div>
                    </motion.div>

                    {/* Connector */}
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <div className="flex flex-col items-center gap-0.5">
                            <div className="w-px h-4 bg-emerald-400" />
                            <span className="text-[9px] font-mono text-emerald-600 uppercase tracking-wider">observe the pattern</span>
                            <div className="w-px h-3 bg-emerald-400" />
                            <div className="w-px h-3 bg-emerald-400" />
                            <ChevronDown className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                        </div>
                    </motion.div>

                    {/* The Pattern Card */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                            {/* Header */}
                            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
                                    <span className="text-white font-black text-lg leading-none">+</span>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900">The + Menu</div>
                                    <div className="text-[10px] text-slate-500">Platform architecture, not just UI</div>
                                </div>
                            </div>

                            {/* Existing Workflows */}
                            <div className="p-4">
                                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3">
                                    Every major workflow starts here:
                                </div>
                                <div className="space-y-2 mb-4">
                                    {existingWorkflows.map((wf) => (
                                        <div key={wf.label} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-md">
                                            <span className="text-slate-500">{wf.icon}</span>
                                            <span className="text-sm text-slate-700">{wf.label}</span>
                                            <span className="ml-auto text-[10px] text-slate-400 font-mono">+ menu → action</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Divider with insight */}
                                <div className="flex items-center gap-3 my-5">
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
                                    <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider whitespace-nowrap">
                                        aha moment
                                    </span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
                                </div>

                                {/* The Insight */}
                                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                                    <p className="text-sm text-emerald-800 leading-relaxed">
                                        <span className="font-semibold">If ReportCaster is fundamentally a creation workflow, why isn&apos;t it initiated from the + menu?</span>
                                    </p>
                                </div>

                                {/* New RC Workflows */}
                                <div className="space-y-2">
                                    {newWorkflows.map((wf, i) => (
                                        <motion.div
                                            key={wf.label}
                                            className="flex items-center gap-2 px-3 py-2 rounded-md border"
                                            style={{
                                                backgroundColor: withHexAlpha(wf.color, '08'),
                                                borderColor: withHexAlpha(wf.color, '30'),
                                            }}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.8 + i * 0.15 }}
                                        >
                                            <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center">
                                                <span className="text-white font-black text-xs">+</span>
                                            </div>
                                            <span className="text-sm font-medium" style={{ color: wf.color }}>{wf.label}</span>
                                            <span className="ml-auto text-[10px] font-mono text-emerald-500">→ modal</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* The Win */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-slate-900 rounded-xl p-5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 pointer-events-none" />
                            <div className="relative z-10">
                                <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-wider mb-3">
                                    Why it won
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-emerald-400 text-xs">UX</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">Design wins</div>
                                            <p className="text-xs text-slate-400 mt-1">Modals from + menu match every other creation workflow in the platform</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-teal-400 text-xs">ENG</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">Engineering wins</div>
                                            <p className="text-xs text-slate-400 mt-1">Modal approach works within existing legacy code — no backend rewrite</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-700">
                                    <p className="text-xs text-slate-400 italic">
                                        &quot;When both UX and engineering won, leadership was absolutely thrilled and said yes.&quot;
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
