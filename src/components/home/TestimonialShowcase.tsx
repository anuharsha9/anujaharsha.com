'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Linkedin } from 'lucide-react'

interface Testimonial {
    name: string
    role: string
    company: string
    quote: string
    relationship: string
    linkedInProfile?: string
    isPrimary?: boolean
}

const CSG_TESTIMONIALS: Testimonial[] = [
    {
        name: 'Dave Pfeiffer',
        role: 'Director of Design',
        company: 'Cloud Software Group',
        quote: 'She approaches her work with a fearless attitude and is never afraid to explore new ideas or directions. Anuja is willing to take on difficult problems and push for creative solutions, even under tight timelines.',
        relationship: 'Direct Manager · 3+ years',
        linkedInProfile: 'https://www.linkedin.com/in/davepfeiffer/',
        isPrimary: true,
    },
    {
        name: 'Vijay Raman',
        role: 'VP of Product Management',
        company: 'Cloud Software Group',
        quote: 'She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams. Any team would be lucky to have her.',
        relationship: 'Leadership',
        linkedInProfile: 'https://www.linkedin.com/in/vijayraman/',
    },
    {
        name: 'Marcus Horbach, Ph.D.',
        role: 'Principal Data Scientist',
        company: 'Cloud Software Group',
        quote: 'The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive. Her design solutions are rooted in a deep understanding of the purpose of the product.',
        relationship: 'Cross-functional Collaborator',
    },
    {
        name: 'Yingchun Chen',
        role: 'Principal System Software Engineer',
        company: 'Cloud Software Group',
        quote: "From the start, she impressed everyone with how quickly she grasped all aspects of a highly intricate system. She's the kind of UX leader any team would be lucky to have.",
        relationship: 'Engineering Partner',
    },
    {
        name: 'Karishma Khadge',
        role: 'Senior Product Manager',
        company: 'Cloud Software Group',
        quote: 'Her design thinking workshops and prototype walkthroughs often became the foundation for key product decisions, driving clarity and alignment across cross-functional teams.',
        relationship: 'Product Partner',
    },
    {
        name: 'Anita George',
        role: 'Principal Account Technology Strategist',
        company: 'Cloud Software Group',
        quote: 'Anticipating the next move of the user, that is next level UI! Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels.',
        relationship: 'Customer / SME',
    },
]

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full"
        >
            <div className={`
                relative h-full rounded-2xl overflow-hidden
                bg-white/[0.02] border border-white/[0.06]
                hover:border-white/[0.12] hover:bg-white/[0.04]
                transition-all duration-500 group/card
                ${testimonial.isPrimary ? 'md:col-span-2 p-8 md:p-10' : 'p-6 md:p-8'}
            `}>
                {/* Decorative quote mark */}
                <Quote className={`
                    absolute top-6 right-6 text-white/[0.04] group-hover/card:text-[var(--accent-teal)]/10 transition-colors duration-500
                    ${testimonial.isPrimary ? 'w-16 h-16' : 'w-10 h-10'}
                `} />

                {/* Quote */}
                <blockquote className="relative z-10 mb-6">
                    <p className={`
                        font-sans text-slate-300 leading-relaxed
                        ${testimonial.isPrimary ? 'text-lg md:text-xl' : 'text-sm md:text-base'}
                    `}>
                        &ldquo;{testimonial.quote}&rdquo;
                    </p>
                </blockquote>

                {/* Attribution */}
                <div className="relative z-10 flex items-center justify-between gap-4 pt-4 border-t border-white/5">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className={`font-sans font-bold text-white ${testimonial.isPrimary ? 'text-base' : 'text-sm'}`}>
                                {testimonial.name}
                            </span>
                            {testimonial.linkedInProfile && (
                                <a
                                    href={testimonial.linkedInProfile}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/30 hover:text-[#0A66C2] transition-colors"
                                    aria-label={`${testimonial.name} LinkedIn`}
                                >
                                    <Linkedin className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>
                        <p className="text-slate-500 text-xs mt-0.5">{testimonial.role}</p>
                        <p className="text-slate-600 text-[10px] uppercase tracking-widest font-mono mt-1">{testimonial.relationship}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function TestimonialShowcase() {
    const primary = CSG_TESTIMONIALS.filter(t => t.isPrimary)
    const others = CSG_TESTIMONIALS.filter(t => !t.isPrimary)

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Section label */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-mono">
                    Cloud Software Group · 2022 — 2025
                </span>
            </motion.div>

            {/* Primary testimonial (full-width) */}
            {primary.map((t, i) => (
                <div key={t.name} className="mb-6">
                    <TestimonialCard testimonial={t} index={i} />
                </div>
            ))}

            {/* Grid of other testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                {others.map((t, i) => (
                    <TestimonialCard key={t.name} testimonial={t} index={i + 1} />
                ))}
            </div>
        </div>
    )
}
