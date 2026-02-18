'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface ExecutiveSummaryArcProps {
    isLightBackground?: boolean
}

const versions = [
    {
        id: 'v1',
        version: 'V1',
        title: 'Independent Product',
        status: 'REJECTED' as const,
        oneLiner: 'Standalone RC environment — matching industry patterns like Control-M and Tableau Prep.',
        reason: 'Leadership wanted all workflows centralized in the hub.',
        constraintType: 'Strategy',
        thumbnail: '/images/case-study/ReportCaster/RC - V1.3 - Independent version - Home.png',
        thumbnailAlt: 'V1 Independent Product Concept',
        sensitive: true,
        duration: '3 months',
    },
    {
        id: 'v2',
        version: 'V2',
        title: 'Hub Plugin',
        status: 'REJECTED' as const,
        oneLiner: 'RC as a hub plugin with integrated navigation and consolidated subsystems.',
        reason: 'Too much engineering effort for the release cycle.',
        constraintType: 'Resourcing',
        thumbnail: '/images/case-study/ReportCaster/RC Hub Integration V2.1 - Home - Create new schedule.png',
        thumbnailAlt: 'V2 Plugin Integration Concept',
        sensitive: true,
        duration: '2 months',
    },
    {
        id: 'v3',
        version: 'V3',
        title: 'Platform-Native',
        status: 'SHIPPED' as const,
        oneLiner: 'Modal-based creation from + menu — working WITH platform architecture instead of against it.',
        reason: 'Constraint became advantage. Modals worked within legacy code without a rewrite.',
        constraintType: 'Breakthrough',
        thumbnail: '/images/case-study/ReportCaster/Initiating ReportCaster from the HUB.png',
        thumbnailAlt: 'V3 Platform Native — Shipped',
        sensitive: true,
        duration: '9 months',
        insight: 'I stopped asking "Where should RC live?" and started asking: "How does the platform WANT workflows to behave?"',
    },
]

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
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
}

export default function ExecutiveSummaryArc({ isLightBackground = true }: ExecutiveSummaryArcProps) {
    const [expandedVersion, setExpandedVersion] = useState<string | null>(null)

    return (
        <div className="space-y-8">
            <ComponentHeading
                variant="block"
                tag="THE JOURNEY"
                title="Three Architectures. Two Rejections. One Breakthrough."
                description="Most case studies show the final design. This is the story of getting there — navigating organizational constraints, reframing the problem, and finding the solution that made both UX and engineering win."
                color="amber"
            />

            {/* The Arc — 3 Version Cards */}
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                {versions.map((v, index) => {
                    const isShipped = v.status === 'SHIPPED'
                    const isExpanded = expandedVersion === v.id

                    return (
                        <motion.div
                            key={v.id}
                            variants={itemVariants}
                            className="relative group"
                        >
                            {/* Connector Arrow (between cards) */}
                            {index < versions.length - 1 && (
                                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                                    <ChevronRight className="w-6 h-6 text-slate-300" />
                                </div>
                            )}

                            <div
                                className={`
                  relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500
                  ${isShipped
                                        ? 'ring-2 ring-amber-400/60 bg-gradient-to-b from-amber-50/80 to-white shadow-lg shadow-amber-100/40'
                                        : 'bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm'
                                    }
                `}
                                onClick={() => setExpandedVersion(isExpanded ? null : v.id)}
                            >
                                {/* Status Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span
                                        className={`
                      inline-flex items-center px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase rounded-full
                      ${isShipped
                                                ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
                                                : 'bg-red-50 text-red-500 border border-red-200'
                                            }
                    `}
                                    >
                                        {isShipped ? '✓ Shipped' : '✗ Rejected'}
                                    </span>
                                </div>

                                {/* Thumbnail */}
                                <div className={`relative h-40 overflow-hidden ${v.sensitive ? 'select-none' : ''}`}>
                                    <Image
                                        src={v.thumbnail}
                                        alt={v.thumbnailAlt}
                                        fill
                                        className={`object-cover object-top transition-transform duration-500 group-hover:scale-105 ${v.sensitive ? 'blur-[6px]' : ''}`}
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-5 pt-2 space-y-3">
                                    {/* Version + Title */}
                                    <div>
                                        <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isShipped ? 'text-amber-600' : 'text-slate-400'}`}>
                                            {v.version} · {v.duration}
                                        </span>
                                        <h3 className="text-lg font-sans text-slate-900 mt-1">
                                            {v.title}
                                        </h3>
                                    </div>

                                    {/* One-liner */}
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {v.oneLiner}
                                    </p>

                                    {/* Reason */}
                                    <div className={`
                    flex items-start gap-2 p-3 rounded-lg text-sm
                    ${isShipped
                                            ? 'bg-amber-50 text-amber-800 border border-amber-200/50'
                                            : 'bg-slate-50 text-slate-600 border border-slate-100'
                                        }
                  `}>
                                        <span className="font-semibold text-[10px] uppercase tracking-wider mt-0.5 shrink-0">
                                            {v.constraintType}:
                                        </span>
                                        <span className="leading-relaxed">{v.reason}</span>
                                    </div>

                                    {/* V3 Breakthrough Insight */}
                                    {v.insight && (
                                        <div className="mt-2 pt-3 border-t border-amber-200/50">
                                            <p className="text-sm italic text-amber-700/90 leading-relaxed">
                                                &ldquo;{v.insight}&rdquo;
                                            </p>
                                        </div>
                                    )}

                                    {/* Expand hint */}
                                    <div className="text-[10px] text-slate-400 uppercase tracking-wider pt-1">
                                        Click to {isExpanded ? 'collapse' : 'explore'} →
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Connector */}
                            {index < versions.length - 1 && (
                                <div className="flex lg:hidden justify-center py-3">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-px h-4 bg-slate-200" />
                                        <ChevronRight className="w-4 h-4 text-slate-300 rotate-90" />
                                        <div className="w-px h-4 bg-slate-200" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* Bottom insight — The Meta-Narrative */}
            <motion.div
                className="text-center pt-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Each rejection narrowed the constraint space. V1 clarified <em>where</em> (centralized).
                    V2 clarified <em>when</em> (this release). V3 emerged from asking the right question:
                    <span className="font-medium text-slate-700"> &ldquo;How does the platform itself want workflows to behave?&rdquo;</span>
                </p>
            </motion.div>
        </div>
    )
}
