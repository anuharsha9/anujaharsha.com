'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'
import ImageLightbox from './ImageLightbox'
import { Calendar, Mail, Lock, Folder, Settings, ArrowRight, Workflow, Cpu, ShieldAlert, Maximize2 } from 'lucide-react'

interface SystemConsolidationMapProps {
    isLightBackground?: boolean
}

const legacySubsystems = [
    { id: 'scheduling', label: 'Scheduling', icon: Calendar, pain: '4 clicks to create', entryPoint: 'Separate menu' },
    { id: 'distribution', label: 'Distribution Lists', icon: Mail, pain: 'Hacked by users', entryPoint: 'Hidden submenu' },
    { id: 'access', label: 'Access Lists', icon: Lock, pain: 'Undocumented rules', entryPoint: 'Admin panel' },
    { id: 'explorer', label: 'Explorer', icon: Folder, pain: '2 clicks + new tab', entryPoint: 'Separate view' },
    { id: 'admin', label: 'Admin / Status', icon: Settings, pain: 'Separate browser tab', entryPoint: 'Legacy console' },
]

const unifiedEntryPoints = [
    { label: '+ Menu → Create Schedule', icon: Calendar },
    { label: '+ Menu → Create Distribution List', icon: Mail },
    { label: '+ Menu → Create Access List', icon: Lock },
    { label: 'Home → Filtered Explorer View', icon: Folder },
    { label: 'Management Center → RC Admin', icon: Settings },
]

const scopeCategories = [
    {
        category: 'Workflows & Navigation',
        icon: Workflow,
        color: 'text-blue-400',
        bg: 'bg-blue-500/[0.10]',
        items: [
            { label: 'Every scheduling workflow', detail: 'From schedule creation to distribution to monitoring' },
            { label: 'Every entry point', detail: 'Where users could access RC features (inconsistent across product)' },
            { label: 'Every dialog and branching path', detail: 'Understanding when users saw what, and why' },
        ],
    },
    {
        category: 'System Capabilities',
        icon: Cpu,
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/[0.10]',
        items: [
            { label: 'Every admin capability', detail: 'System configuration, permissions, settings' },
            { label: 'Every explorer interaction', detail: 'How users viewed and filtered existing schedules' },
            { label: 'Every job-health pattern', detail: 'How users monitored scheduled jobs, failure states' },
        ],
    },
    {
        category: 'Reliability & Logic',
        icon: ShieldAlert,
        color: 'text-amber-400',
        bg: 'bg-amber-500/[0.10]',
        items: [
            { label: 'Every failure & recovery rule', detail: 'Critical for enterprise reliability' },
            { label: 'Burst, retention, blackout logic', detail: 'Undocumented rules users relied on' },
            { label: 'Invisible UI behaviors', detail: 'Rules in code that were never surfaced' },
        ],
    },
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

const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
}

const heroVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }
    }
}

export default function SystemConsolidationMap({ isLightBackground = true }: SystemConsolidationMapProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false)

    return (
        <div className="space-y-12">
            {/* ─── Heading ─── */}
            <ComponentHeading
                variant="block"
                align="center"
                tag="SYSTEMS THINKING"
                title="5 Fragmented Subsystems → 1 Unified Hub"
                description="The legacy system wasn't a feature — it was a product inside a product. I mapped every workflow, entry point, and hidden rule across five disconnected tools, then unified them into predictable platform entry points."
                color="teal"
            />

            {/* ─── Before / After Consolidation ─── */}
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
                            className="flex items-center gap-3 p-3 rounded-lg bg-red-500/[0.06] border border-red-500/[0.12] border-dashed"
                        >
                            <span className="text-red-400 shrink-0">
                                <sub.icon className="w-5 h-5" strokeWidth={1.5} />
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-[var(--text-heading)]">{sub.label}</span>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/[0.15] text-red-400 font-medium uppercase tracking-wider">
                                        {sub.entryPoint}
                                    </span>
                                </div>
                                <p className="text-xs text-red-400/70 mt-0.5">{sub.pain}</p>
                            </div>
                            <div className="w-6 h-px bg-red-500/20 hidden sm:block" />
                            <div className="w-2 h-2 rounded-full border-2 border-red-400/40 hidden sm:block" />
                        </motion.div>
                    ))}

                    <div className="pt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-red-500/[0.08] text-red-400 border border-red-500/[0.15]">
                            5+ browser tabs
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-red-500/[0.08] text-red-400 border border-red-500/[0.15]">
                            4 clicks to start
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-red-500/[0.08] text-red-400 border border-red-500/[0.15]">
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
                    <div className="hidden lg:flex flex-col items-center gap-2">
                        <div className="w-px h-8 bg-gradient-to-b from-red-400/30 to-amber-400/30" />
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <ArrowRight className="text-white w-6 h-6" strokeWidth={2.5} />
                        </div>
                        <div className="w-px h-8 bg-gradient-to-b from-amber-400/30 to-emerald-400/30" />
                    </div>
                    <div className="flex lg:hidden items-center gap-2">
                        <div className="h-px w-8 bg-gradient-to-r from-red-400/30 to-amber-400/30" />
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <ArrowRight className="text-white w-5 h-5 rotate-90" strokeWidth={2.5} />
                        </div>
                        <div className="h-px w-8 bg-gradient-to-r from-amber-400/30 to-emerald-400/30" />
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-amber-400 mt-2">Redesign</span>
                </motion.div>

                {/* RIGHT: Unified Hub */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400">After: Unified Hub</span>
                    </div>
                    {unifiedEntryPoints.map((entry, index) => (
                        <motion.div
                            key={index}
                            variants={rightItemVariants}
                            className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/[0.12]"
                        >
                            <div className="w-2 h-2 rounded-full bg-emerald-400 hidden sm:block" />
                            <div className="w-6 h-px bg-emerald-500/20 hidden sm:block" />
                            <span className="text-emerald-400 shrink-0">
                                <entry.icon className="w-5 h-5" strokeWidth={1.5} />
                            </span>
                            <span className="text-sm font-medium text-[var(--text-heading)]">{entry.label}</span>
                        </motion.div>
                    ))}

                    <div className="pt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/[0.08] text-emerald-400 border border-emerald-500/[0.15]">
                            0 extra tabs
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/[0.08] text-emerald-400 border border-emerald-500/[0.15]">
                            2 clicks to start
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/[0.08] text-emerald-400 border border-emerald-500/[0.15]">
                            Fully documented
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* ─── System Map — the scope of what was mapped ─── */}
            <motion.div
                className="space-y-8 pt-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                {/* Hero Map Image */}
                <motion.div
                    variants={heroVariants}
                    className="relative w-full h-[500px] md:h-[600px] bg-white/[0.03] rounded-2xl border border-white/[0.06] shadow-xl overflow-hidden group cursor-zoom-in"
                    onClick={() => setLightboxOpen(true)}
                >
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-white/80 shadow-sm flex items-center gap-2 border border-white/[0.10]">
                            <Maximize2 className="w-3 h-3" /> Expand Map
                        </span>
                    </div>

                    <Image
                        src="/images/case-study/ReportCaster/ReportCaster Basic Map Workflow.png"
                        alt="RC mental-model map: Complete system diagram"
                        fill
                        className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                        sizes="100vw"
                        priority
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </motion.div>

                {/* Scope Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {scopeCategories.map((cat, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInVariants}
                            className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-6 hover:shadow-lg hover:shadow-black/10 transition-all duration-300 group hover:-translate-y-1 hover:border-white/[0.10]"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-10 h-10 rounded-full ${cat.bg} flex items-center justify-center`}>
                                    <cat.icon className={`w-5 h-5 ${cat.color}`} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--text-heading)] group-hover:text-[var(--accent-teal)] transition-colors">
                                    {cat.category}
                                </h4>
                            </div>

                            <ul className="space-y-4">
                                {cat.items.map((item, j) => (
                                    <li key={j} className="group/item">
                                        <div className="flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/[0.15] mt-2 shrink-0 group-hover/item:bg-[var(--accent-teal)] transition-colors" />
                                            <div>
                                                <p className="text-[var(--text-heading)] text-sm font-medium leading-snug">
                                                    {item.label}
                                                </p>
                                                <p className="text-[var(--text-muted)] text-xs mt-1 leading-relaxed font-light">
                                                    {item.detail}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Lightbox */}
            <ImageLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                imageSrc="/images/case-study/ReportCaster/ReportCaster Basic Map Workflow.png"
                imageAlt="RC mental-model map: Complete system diagram"
                imageCaption="The complete system diagram showing the unified workflow that replaced five independent subsystems with one coherent mental model."
            />
        </div>
    )
}
