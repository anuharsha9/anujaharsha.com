'use client'

import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

// ─── Data Types ───────────────────────────────────────────

export interface ImpactOutcome {
    tag: string
    headline: string
    body: string
    icon: LucideIcon
    accentColor: string   // e.g. 'teal', 'emerald', 'purple', 'amber'
}

export interface ImpactOutcomesData {
    sectionTag?: string
    title: string
    description?: string
    outcomes: ImpactOutcome[]
}

// ─── Accent Color Map ────────────────────────────────────

const accentColors: Record<string, { tagText: string; iconBg: string; iconText: string }> = {
    teal: { tagText: 'text-teal-400', iconBg: 'bg-teal-500/[0.10]', iconText: 'text-teal-400' },
    emerald: { tagText: 'text-emerald-400', iconBg: 'bg-emerald-500/[0.10]', iconText: 'text-emerald-400' },
    purple: { tagText: 'text-purple-400', iconBg: 'bg-purple-500/[0.10]', iconText: 'text-purple-400' },
    amber: { tagText: 'text-amber-400', iconBg: 'bg-amber-500/[0.10]', iconText: 'text-amber-400' },
    blue: { tagText: 'text-blue-400', iconBg: 'bg-blue-500/[0.10]', iconText: 'text-blue-400' },
}

// ─── Component ───────────────────────────────────────────

interface ImpactOutcomesProps {
    data: ImpactOutcomesData
    isLightBackground?: boolean
}

export default function ImpactOutcomes({
    data,
    isLightBackground = false,
}: ImpactOutcomesProps) {
    return (
        <div className="space-y-8">
            <ComponentHeading
                variant="block"
                align="center"
                tag={data.sectionTag || 'IMPACT METRICS'}
                title={data.title}
                description={data.description}
                color="teal"
                className="mb-0"
            />

            {/* 2x2 Outcome Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.outcomes.map((o, i) => {
                    const IconComponent = o.icon
                    const colors = accentColors[o.accentColor] || accentColors.teal

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white/[0.03] border border-white/[0.06] p-6 md:p-8 h-full flex flex-col hover:shadow-lg hover:border-white/[0.08] transition-all duration-300 rounded-2xl"
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 ${colors.iconBg} flex items-center justify-center mb-4 rounded-xl`}>
                                <IconComponent className={`w-6 h-6 ${colors.iconText}`} />
                            </div>

                            {/* Tag */}
                            <span className={`font-mono text-[10px] ${colors.tagText} uppercase tracking-widest mb-3`}>
                                {'// '}{o.tag}
                            </span>

                            {/* Headline */}
                            <h4 className="text-[var(--text-heading)] text-lg font-sans font-semibold mb-3">
                                {o.headline}
                            </h4>

                            {/* Body */}
                            <p className="text-[var(--text-body)] text-sm leading-relaxed">
                                {o.body}
                            </p>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
