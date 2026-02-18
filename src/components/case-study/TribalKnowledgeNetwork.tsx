'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'
import { Lock, User, FileText, Map, BarChart3, CheckCircle2, ArrowDown, Ban, Target, Search, Users, Cpu } from 'lucide-react'

interface TribalKnowledgeNetworkProps {
    isLightBackground?: boolean
}

const sources = [
    {
        id: 'chris',
        name: 'Chris Kaplan',
        role: 'Gold Support Lead',
        initials: 'CK',
        color: 'amber',
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
        color: 'blue',
        insights: [
            'Decades of undocumented logic',
            'Why legacy decisions were made',
            'What code can and cannot change',
        ],
        method: 'Deep technical sessions',
    },
]

const artifacts = [
    { label: 'Hundreds of screenshots', icon: FileText },
    { label: 'Mind maps & IA diagrams', icon: Map },
    { label: 'Pain point analyses', icon: BarChart3 },
    { label: 'Validated with support reps', icon: CheckCircle2 },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
}

export default function TribalKnowledgeNetwork({ isLightBackground = true }: TribalKnowledgeNetworkProps) {
    return (
        <div className="w-full py-12 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <ComponentHeading
                    variant="block"
                    tag="RESEARCH_STRATEGY"
                    title="Navigating Enterprise Research Constraints"
                    description="How I reconstructed an undocumented 50-year-old system when direct user research wasn't possible."
                    color="teal"
                    align="center"
                    className="mb-14"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="space-y-8"
                >
                    {/* Constraints & Strategy Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        {/* Constraint Block */}
                        <motion.div variants={itemVariants} className="h-full">
                            <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6 md:p-8 h-full flex flex-col items-center md:items-start text-center md:text-left hover:border-rose-200 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-4 flex-shrink-0">
                                    <Ban className="w-5 h-5" strokeWidth={2} />
                                </div>
                                <span className="font-mono text-[10px] text-rose-600 uppercase tracking-widest block mb-2">
                                    CONSTRAINT: NO_DIRECT_USER_ACCESS
                                </span>
                                <p className="text-slate-700 text-sm leading-relaxed font-light">
                                    Enterprise security policy blocked direct access to end users. No interviews, no usability tests, no direct feedback loops.
                                </p>
                            </div>
                        </motion.div>

                        {/* Strategy Block */}
                        <motion.div variants={itemVariants} className="h-full">
                            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 md:p-8 h-full flex flex-col items-center md:items-start text-center md:text-left hover:border-emerald-200 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 flex-shrink-0">
                                    <Target className="w-5 h-5" strokeWidth={2} />
                                </div>
                                <span className="font-mono text-[10px] text-emerald-600 uppercase tracking-widest block mb-2">
                                    STRATEGY: THE_PROXY_NETWORK
                                </span>
                                <p className="text-slate-700 text-sm leading-relaxed font-light">
                                    Leveraged Support Agents and Customer Reps as high-fidelity proxies for user pain points. Built ecosystem understanding through indirect channels.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Connector */}
                    <motion.div variants={itemVariants} className="flex justify-center py-2">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-px h-8 bg-slate-200" />
                            <span className="bg-slate-100 px-3 py-1 text-[9px] font-mono text-slate-500 uppercase tracking-widest rounded-full border border-slate-200">
                                SO I BUILT MY OWN NETWORK
                            </span>
                            <div className="w-px h-8 bg-slate-200" />
                            <ArrowDown className="w-4 h-4 text-slate-300" />
                        </div>
                    </motion.div>

                    {/* Knowledge Sources - Premium Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sources.map((source) => {
                            const isAmber = source.color === 'amber';
                            // Dynamic classes for styling
                            const bgClass = isAmber ? 'bg-amber-50' : 'bg-blue-50';
                            const textClass = isAmber ? 'text-amber-600' : 'text-blue-600';
                            const borderHoverClass = isAmber ? 'group-hover:border-amber-200' : 'group-hover:border-blue-200';
                            const bulletClass = isAmber ? 'bg-amber-400' : 'bg-blue-400';

                            return (
                                <motion.div key={source.id} variants={itemVariants}>
                                    <div className={`bg-white border border-slate-200 p-8 h-full rounded-2xl hover:shadow-xl ${borderHoverClass} transition-all duration-300 group`}>
                                        {/* Header */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-12 h-12 rounded-full ${bgClass} flex items-center justify-center ${textClass} group-hover:scale-110 transition-transform duration-300`}>
                                                <User className="w-6 h-6" strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <h4 className="text-slate-900 font-bold text-lg">{source.name}</h4>
                                                <p className="text-slate-500 text-xs uppercase tracking-wider font-medium">{source.role}</p>
                                            </div>
                                        </div>

                                        {/* Insights */}
                                        <div className="space-y-3">
                                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                                                {'// REVEALED_INSIGHTS'}
                                            </span>
                                            {source.insights.map((insight, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${bulletClass}`} />
                                                    <span className="text-sm text-slate-600 leading-relaxed font-light">
                                                        {insight}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-slate-100">
                                            <span className={`text-xs font-medium cursor-default ${textClass}`}>
                                                Method: {source.method}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Connector */}
                    <motion.div variants={itemVariants} className="flex justify-center py-2">
                        <div className="flex flex-col items-center gap-0">
                            <div className="w-px h-8 bg-slate-200" />
                            <ArrowDown className="w-5 h-5 text-slate-300 animate-bounce mt-1" />
                        </div>
                    </motion.div>

                    {/* Research Artifacts Row */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-slate-300 transition-colors duration-300">
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-6 text-center">
                                {'// RESEARCH_ARTIFACTS_PRODUCED'}
                            </span>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {artifacts.map((artifact) => (
                                    <div key={artifact.label} className="flex flex-col items-center text-center gap-3 p-2 group hover:-translate-y-1 transition-transform duration-300">
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-teal-600 group-hover:border-teal-200 transition-all shadow-sm group-hover:shadow-md">
                                            <artifact.icon className="w-6 h-6" strokeWidth={1.5} />
                                        </div>
                                        <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors font-medium max-w-[120px] leading-tight">
                                            {artifact.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Connector */}
                    <motion.div variants={itemVariants} className="flex justify-center py-2">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-px h-8 bg-slate-200" />
                            <span className="bg-emerald-50 px-3 py-1 text-[9px] font-mono text-emerald-600 uppercase tracking-widest rounded-full border border-emerald-100">
                                REVEALED THE TRUTH
                            </span>
                            <div className="w-px h-8 bg-slate-200" />
                            <ArrowDown className="w-4 h-4 text-emerald-400" />
                        </div>
                    </motion.div>

                    {/* The Revelation - Terminal Style */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 md:p-10 relative overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500 shadow-2xl">
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500 pointer-events-none" />

                            <div className="relative z-10 text-center md:text-left">
                                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block mb-4">
                                    {revelation.label}
                                </span>
                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight tracking-tight">
                                    {revelation.title}
                                </h3>
                                <p className="text-base md:text-lg text-emerald-400/80 mb-8 font-light border-b border-white/10 pb-8">
                                    {revelation.subtitle}
                                </p>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {revelation.stats.map((stat, i) => (
                                        <div key={stat.label} className="group/stat">
                                            <div className="text-3xl md:text-5xl font-bold text-white mb-2 group-hover/stat:text-emerald-400 transition-colors tracking-tighter">
                                                {stat.value}
                                            </div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
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
