'use client'

import { motion } from 'framer-motion'
import { Target, Pencil, Handshake, Microscope } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface OwnershipScopeProps {
    isLightBackground?: boolean
}

const domains = [
    {
        icon: Target,
        title: 'Product Strategy',
        summary: '3 concepts explored → V3 modal shipped. Scoped MVP with PM to de-risk 9-month timeline.',
    },
    {
        icon: Pencil,
        title: 'Design Execution',
        summary: '50+ screens across 5 consolidated subsystems. Natural language recurrence summaries.',
    },
    {
        icon: Handshake,
        title: 'Engineering Partnership',
        summary: 'Onboarded 3 engineers. Living spec became the implementation reference.',
    },
    {
        icon: Microscope,
        title: 'Research & Validation',
        summary: 'Shadowed 1,000+ daily schedules. Usability studies with 8 enterprise admins.',
    },
]

export default function OwnershipScope({ isLightBackground = true }: OwnershipScopeProps) {
    return (
        <div className="space-y-8">
            <ComponentHeading
                variant="block"
                align="center"
                title="Sole Designer, Full Stack of Influence"
                color="amber"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {domains.map((d, i) => {
                    const Icon = d.icon
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="text-center py-8 px-5"
                        >
                            <div className="w-10 h-10 mx-auto rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
                                <Icon className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                            </div>
                            <h4 className="font-sans text-[15px] font-medium text-white/70 mb-2">
                                {d.title}
                            </h4>
                            <p className="text-white/30 text-[13px] font-light leading-relaxed">
                                {d.summary}
                            </p>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
