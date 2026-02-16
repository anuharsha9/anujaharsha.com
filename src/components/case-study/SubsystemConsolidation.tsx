'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface SubsystemConsolidationProps {
    isLightBackground?: boolean
}

const subsystems = [
    {
        id: 'schedules',
        label: 'Schedules',
        icon: '📅',
        description: 'Create & manage automated jobs',
        painPoint: 'Separate app, 4 clicks to start',
        color: '#6366f1',
    },
    {
        id: 'distributions',
        label: 'Distribution Lists',
        icon: '📨',
        description: 'Who receives scheduled output',
        painPoint: 'Users hacked the UI to manage',
        color: '#8b5cf6',
    },
    {
        id: 'access',
        label: 'Access Lists',
        icon: '🔐',
        description: 'Permission groups',
        painPoint: 'Hidden in legacy menus',
        color: '#a855f7',
    },
    {
        id: 'explorer',
        label: 'Explorer',
        icon: '📂',
        description: 'Browse & manage assets',
        painPoint: '2 clicks, separate view',
        color: '#d946ef',
    },
    {
        id: 'admin',
        label: 'Admin',
        icon: '⚙️',
        description: 'System configuration',
        painPoint: 'Disconnected dashboard',
        color: '#ec4899',
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
}

const fragmentVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
}

const hubVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 },
    },
}

const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 0.4,
        transition: { duration: 0.8, ease: 'easeOut', delay: 0.8 },
    },
}

export default function SubsystemConsolidation({ isLightBackground = true }: SubsystemConsolidationProps) {
    return (
        <div className="w-full py-12 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <ComponentHeading
                    variant="block"
                    tag="// SYSTEM_UNIFICATION"
                    title="Five Islands, One Hub"
                    description="Each subsystem was its own world. Users jumped between five disconnected interfaces to do one conceptual job: schedule and distribute reports."
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
                    {/* Before State: Fragmented */}
                    <div className="mb-6">
                        <motion.div
                            className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            Before: 5 fragmented subsystems
                        </motion.div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                            {subsystems.map((sys) => (
                                <motion.div
                                    key={sys.id}
                                    className="bg-white border border-slate-200 rounded-lg p-3 relative overflow-hidden group"
                                    variants={fragmentVariants}
                                    whileHover={{ y: -3, scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Color top bar */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-0.5"
                                        style={{ backgroundColor: sys.color }}
                                    />

                                    <div className="text-xl mb-1.5">{sys.icon}</div>
                                    <div className="text-xs font-semibold text-slate-800 mb-0.5">{sys.label}</div>
                                    <div className="text-[10px] text-slate-400 leading-snug mb-2">{sys.description}</div>

                                    {/* Pain Point */}
                                    <div className="flex items-start gap-1 pt-2 border-t border-slate-100">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0 mt-0.5">
                                            <path d="M5 1V6M5 8V8.01" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <span className="text-[9px] text-red-400 leading-snug">{sys.painPoint}</span>
                                    </div>

                                    {/* Disconnected indicator */}
                                    <motion.div
                                        className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-400/60 border border-white"
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.6, 1, 0.6],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Convergence Arrow */}
                    <motion.div
                        className="flex justify-center py-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex flex-col items-center">
                            {/* Connection Lines SVG */}
                            <svg width="300" height="50" viewBox="0 0 300 50" fill="none" className="w-full max-w-sm">
                                {subsystems.map((sys, i) => {
                                    const startX = (i / (subsystems.length - 1)) * 280 + 10
                                    return (
                                        <motion.path
                                            key={sys.id}
                                            d={`M${startX},0 Q${startX},25 150,48`}
                                            stroke={sys.color}
                                            strokeWidth="1"
                                            strokeOpacity="0.3"
                                            fill="none"
                                            variants={lineVariants}
                                        />
                                    )
                                })}
                                {/* Center convergence dot */}
                                <motion.circle
                                    cx="150"
                                    cy="48"
                                    r="3"
                                    fill="#10b981"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1.2, type: 'spring' }}
                                />
                            </svg>
                        </div>
                    </motion.div>

                    {/* After State: Unified Hub */}
                    <motion.div
                        className="mb-4"
                        variants={hubVariants}
                    >
                        <motion.div
                            className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 mb-4 flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            After: 1 unified hub
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-200 rounded-xl p-5 md:p-7 relative overflow-hidden"
                            animate={{
                                boxShadow: [
                                    '0 0 0 0 rgba(16, 185, 129, 0)',
                                    '0 0 30px 4px rgba(16, 185, 129, 0.08)',
                                    '0 0 0 0 rgba(16, 185, 129, 0)',
                                ],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            {/* Background pattern */}
                            <div className="absolute inset-0 opacity-[0.03]" style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 0.5px, transparent 0)`,
                                backgroundSize: '20px 20px',
                            }} />

                            {/* Hub Header */}
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                                    <span className="text-lg">➕</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">The + Menu Pattern</h4>
                                    <p className="text-sm text-slate-500">Every workflow starts from one entry point</p>
                                </div>
                            </div>

                            {/* Unified Workflow Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
                                {[
                                    {
                                        action: '+ Create Schedule',
                                        method: 'Modal from + menu',
                                        clicks: '2 clicks',
                                        from: 'Schedules',
                                    },
                                    {
                                        action: '+ Create List',
                                        method: 'Same modal pattern',
                                        clicks: '2 clicks',
                                        from: 'Distribution + Access',
                                    },
                                    {
                                        action: 'Browse Assets',
                                        method: 'Filtered view in Home',
                                        clicks: '1 click',
                                        from: 'Explorer + Admin',
                                    },
                                ].map((workflow, i) => (
                                    <motion.div
                                        key={workflow.action}
                                        className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-lg p-3"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1 + i * 0.15 }}
                                    >
                                        <div className="text-xs font-semibold text-emerald-700 mb-1">{workflow.action}</div>
                                        <div className="text-[10px] text-slate-500 mb-2">{workflow.method}</div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-mono text-emerald-500 font-bold">{workflow.clicks}</span>
                                            <span className="text-[9px] text-slate-400">{workflow.from}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Result banner */}
                            <motion.div
                                className="mt-5 bg-slate-900 rounded-lg p-3 flex items-center gap-3 relative z-10"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.3 }}
                            >
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <p className="text-xs text-slate-300 flex-1">
                                    Constraint became advantage: modals worked within legacy FOCUS code <span className="text-emerald-400 font-medium">without a backend rewrite</span>
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
