'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface FANGTestimonialsProps {
    isLightBackground?: boolean
}

const testimonials = [
    {
        quote: "Anuja volunteered for a project no one else would touch — a 50-year-old scheduling tool with no documentation, no prior UX, and millions of users. She turned it into one of our most polished products.",
        name: 'Design Director',
        role: 'Head of UX, Enterprise Division',
        context: 'On project ownership',
        highlight: 'volunteered for a project no one else would touch',
    },
    {
        quote: "Her approach to onboarding engineers was exceptional. She created living documentation that our dev team actually used — not the usual spec that gets ignored after sprint 1.",
        name: 'Lead Engineer',
        role: 'ReportCaster Engineering Team',
        context: 'On cross-functional impact',
        highlight: 'living documentation that our dev team actually used',
    },
]

export default function FANGTestimonials({ isLightBackground = true }: FANGTestimonialsProps) {
    return (
        <div className="space-y-8">
            <ComponentHeading
                variant="block"
                tag="STAKEHOLDER FEEDBACK"
                title="What They Said"
                color="amber"
            />

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
                }}
            >
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        variants={{
                            hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                        }}
                        className="relative"
                    >
                        <div className="relative rounded-xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                            {/* Decorative Quote Mark */}
                            <div className="absolute -top-3 left-6">
                                <span className="text-5xl font-sans text-amber-300/80 leading-none select-none">&ldquo;</span>
                            </div>

                            {/* Context badge */}
                            <div className="pt-2">
                                <span className="inline-flex items-center px-2.5 py-1 text-[9px] font-bold tracking-[0.15em] uppercase rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                                    {t.context}
                                </span>
                            </div>

                            {/* Quote with highlighted portion */}
                            <blockquote className="text-sm text-slate-600 leading-relaxed">
                                {t.quote.split(t.highlight).map((part, j) => (
                                    <span key={j}>
                                        {part}
                                        {j === 0 && (
                                            <span className="bg-amber-100/60 text-amber-900 px-0.5 rounded font-medium">
                                                {t.highlight}
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </blockquote>

                            {/* Attribution */}
                            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                    <span className="text-xs font-bold text-slate-500">{t.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-slate-800 block">{t.name}</span>
                                    <span className="text-xs text-slate-400">{t.role}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
