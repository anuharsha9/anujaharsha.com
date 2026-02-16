'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface SystemConsolidationMapProps {
    isLightBackground?: boolean
}

const legacySubsystems = [
    { id: 'scheduling', label: 'Scheduling', icon: '📅', pain: '4 clicks to create', entryPoint: 'Separate menu' },
    { id: 'distribution', label: 'Distribution Lists', icon: '📧', pain: 'Hacked by users', entryPoint: 'Hidden submenu' },
    { id: 'access', label: 'Access Lists', icon: '🔐', pain: 'Undocumented rules', entryPoint: 'Admin panel' },
    { id: 'explorer', label: 'Explorer', icon: '📁', pain: '2 clicks + new tab', entryPoint: 'Separate view' },
    { id: 'admin', label: 'Admin / Status', icon: '⚙️', pain: 'Separate browser tab', entryPoint: 'Legacy console' },
]

const unifiedEntryPoints = [
    { label: '+ Menu → Create Schedule', icon: '📅' },
    { label: '+ Menu → Create Distribution List', icon: '📧' },
    { label: '+ Menu → Create Access List', icon: '🔐' },
    { label: 'Home → Filtered Explorer View', icon: '📁' },
    { label: 'Management Center → RC Admin', icon: '⚙️' },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, x: -12, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
}

const rightItemVariants = {
    hidden: { opacity: 0, x: 12, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
}

export default function SystemConsolidationMap({ isLightBackground = true }: SystemConsolidationMapProps) {
    return (
        <div className="space-y-8">
            <ComponentHeading
                variant="block"
                tag="SYSTEMS THINKING"
                title="5 Fragmented Subsystems → 1 Unified Hub"
                description="The legacy system wasn't a feature — it was a product inside a product. Users managed five disconnected tools across separate browser tabs. The redesign unified everything into predictable platform entry points."
                color="amber"
            />

            <motion.div
                className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                {/* LEFT: Fragmented Legacy */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-400">Before: Fragmented</span>
                    </div>
                    {legacySubsystems.map((sub) => (
                        <motion.div
                            key={sub.id}
                            variants={itemVariants}
                            className="flex items-center gap-3 p-3 rounded-lg bg-red-50/60 border border-red-100/80 border-dashed"
                        >
                            <span className="text-lg shrink-0">{sub.icon}</span>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-slate-800">{sub.label}</span>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-100 text-red-500 font-medium uppercase tracking-wider">
                                        {sub.entryPoint}
                                    </span>
                                </div>
                                <p className="text-xs text-red-400 mt-0.5">{sub.pain}</p>
                            </div>
                            {/* Broken connection */}
                            <div className="w-6 h-px bg-red-200 hidden sm:block" />
                            <div className="w-2 h-2 rounded-full border-2 border-red-300 hidden sm:block" />
                        </motion.div>
                    ))}

                    {/* Pain summary */}
                    <div className="pt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-red-50 text-red-500 border border-red-100">
                            5+ browser tabs
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-red-50 text-red-500 border border-red-100">
                            4 clicks to start
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-red-50 text-red-500 border border-red-100">
                            Zero documentation
                        </span>
                    </div>
                </div>

                {/* CENTER: Transformation Arrow */}
                <motion.div
                    className="flex flex-col items-center justify-center py-4 lg:py-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* Desktop arrow */}
                    <div className="hidden lg:flex flex-col items-center gap-2">
                        <div className="w-px h-8 bg-gradient-to-b from-red-200 to-amber-200" />
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-200/50">
                            <span className="text-white text-lg font-bold">→</span>
                        </div>
                        <div className="w-px h-8 bg-gradient-to-b from-amber-200 to-emerald-200" />
                    </div>
                    {/* Mobile arrow */}
                    <div className="flex lg:hidden items-center gap-2">
                        <div className="h-px w-8 bg-gradient-to-r from-red-200 to-amber-200" />
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-200/50">
                            <span className="text-white text-base font-bold">↓</span>
                        </div>
                        <div className="h-px w-8 bg-gradient-to-r from-amber-200 to-emerald-200" />
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-amber-500 mt-2">Redesign</span>
                </motion.div>

                {/* RIGHT: Unified Hub */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-500">After: Unified Hub</span>
                    </div>
                    {unifiedEntryPoints.map((entry, index) => (
                        <motion.div
                            key={index}
                            variants={rightItemVariants}
                            className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100/80"
                        >
                            <div className="w-2 h-2 rounded-full bg-emerald-400 hidden sm:block" />
                            <div className="w-6 h-px bg-emerald-200 hidden sm:block" />
                            <span className="text-lg shrink-0">{entry.icon}</span>
                            <span className="text-sm font-medium text-slate-800">{entry.label}</span>
                        </motion.div>
                    ))}

                    {/* Impact summary */}
                    <div className="pt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                            0 extra tabs
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                            2 clicks to start
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                            Fully documented
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Complexity Badge */}
            <motion.div
                className="flex justify-center pt-4"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400">Scale & Complexity</span>
                    <div className="w-px h-4 bg-slate-200" />
                    <span className="text-xs text-slate-600">Enterprise B2B</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-600">20M+ weekly jobs</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-600">Zero-downtime migration</span>
                    <span className="text-slate-300 hidden sm:inline">·</span>
                    <span className="text-xs text-slate-600 hidden sm:inline">50-year-old codebase</span>
                </div>
            </motion.div>
        </div>
    )
}
