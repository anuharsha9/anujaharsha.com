'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface OwnershipScopeProps {
    isLightBackground?: boolean
}

const ownershipDomains = [
    {
        domain: 'Product Strategy',
        items: [
            'Drove the architectural decision that led to V3 (modal-based approach)',
            'Created 3 full end-to-end concepts before finding the shippable one',
            'Scoped MVP feature set with PM to de-risk 9-month timeline',
        ],
        icon: '🎯',
        accent: 'amber',
    },
    {
        domain: 'Design Execution',
        items: [
            'All UX/UI for 5 consolidated subsystems (Scheduling, Distribution, Access, Explorer, Admin)',
            'Created 50+ high-fidelity screens across web and mobile breakpoints',
            'Designed real-time natural language recurrence summaries',
        ],
        icon: '✏️',
        accent: 'teal',
    },
    {
        domain: 'Engineering Partnership',
        items: [
            'Onboarded 3 engineers to design system and interaction patterns',
            'Created living spec documentation engineers used as implementation reference',
            'Negotiated technical constraints that shaped V3 architecture',
        ],
        icon: '🤝',
        accent: 'blue',
    },
    {
        domain: 'Research & Validation',
        items: [
            'Shadowed users processing 1,000+ daily schedules to map existing workflows',
            'Ran moderated usability studies with 8 enterprise admins',
            'Validated natural language approach through A/B comparison with legacy UI',
        ],
        icon: '🔬',
        accent: 'indigo',
    },
]

const accentColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
    amber: { bg: 'bg-amber-500/[0.06]', border: 'border-amber-500/[0.15]', text: 'text-amber-400', dot: 'bg-amber-400' },
    teal: { bg: 'bg-teal-500/[0.06]', border: 'border-teal-500/[0.15]', text: 'text-teal-400', dot: 'bg-teal-400' },
    blue: { bg: 'bg-blue-500/[0.06]', border: 'border-blue-500/[0.15]', text: 'text-blue-400', dot: 'bg-blue-400' },
    indigo: { bg: 'bg-indigo-500/[0.06]', border: 'border-indigo-500/[0.15]', text: 'text-indigo-400', dot: 'bg-indigo-400' },
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
}

export default function OwnershipScope({ isLightBackground = true }: OwnershipScopeProps) {
    return (
        <div className="space-y-8">
            <ComponentHeading
                variant="block"
                align="center"
                tag="SCOPE OF OWNERSHIP"
                title="Sole Designer, Full Stack of Influence"
                description="I was the only designer on this project for 12 months. This wasn't just craft — it was leadership across product, engineering, and research."
                color="amber"
            />

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
            >
                {ownershipDomains.map((domain) => {
                    const colors = accentColors[domain.accent]
                    return (
                        <motion.div
                            key={domain.domain}
                            variants={cardVariants}
                            className={`rounded-xl p-5 border ${colors.bg} ${colors.border} space-y-3`}
                        >
                            <div className="flex items-center gap-2.5">
                                <span className="text-xl">{domain.icon}</span>
                                <h4 className="text-base font-sans font-medium text-[var(--text-heading)]">{domain.domain}</h4>
                            </div>
                            <ul className="space-y-2">
                                {domain.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-body)] leading-relaxed">
                                        <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} mt-1.5 shrink-0`} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* Timeline Context */}
            <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-2"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                {[
                    { value: '12', unit: 'months', label: 'project duration' },
                    { value: '1', unit: 'designer', label: 'sole designer' },
                    { value: '5', unit: 'subsystems', label: 'consolidated' },
                    { value: '50+', unit: 'screens', label: 'delivered' },
                ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[var(--text-heading)]">{stat.value}</span>
                        <div className="flex flex-col">
                            <span className="text-xs text-[var(--text-body)]">{stat.unit}</span>
                            <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</span>
                        </div>
                        {i < 3 && <div className="hidden sm:block w-px h-6 bg-white/[0.08] ml-4" />}
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
