'use client'

import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

export interface ImpactOutcome {
    tag: string
    headline: string
    body: string
    icon: LucideIcon
    accentColor: string
}

export interface ImpactOutcomesData {
    sectionTag?: string
    title: string
    description?: string
    outcomes: ImpactOutcome[]
}

interface ImpactOutcomesProps {
    data: ImpactOutcomesData
    isLightBackground?: boolean
}

export default function ImpactOutcomes({
    data,
}: ImpactOutcomesProps) {
    return (
        <div className="space-y-8">
            <ComponentHeading
                variant="block"
                align="center"
                title={data.title}
                color="teal"
                className="mb-0"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {data.outcomes.map((o, i) => {
                    const IconComponent = o.icon
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 flex items-start gap-4"
                        >
                            <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                                <IconComponent className="w-4.5 h-4.5 text-white/40" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-[15px] font-medium text-white/80 mb-1">
                                    {o.headline}
                                </h4>
                                <p className="text-white/30 text-[13px] font-light leading-relaxed">
                                    {o.body}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
