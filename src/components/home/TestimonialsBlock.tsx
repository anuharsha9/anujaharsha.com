'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const TESTIMONIALS = [
    {
        id: 'vijay-raman',
        name: 'Vijay Raman',
        role: 'VP of Product Management',
        company: 'Cloud Software Group',
        quote: 'She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams. Any team would be lucky to have her.',
        relationship: 'Leadership',
        isPrimary: true,
    },
    {
        id: 'dave-pfeiffer',
        name: 'Dave Pfeiffer',
        role: 'Director of Design',
        company: 'Cloud Software Group',
        quote: "She approaches her work with a fearless attitude and is never afraid to explore new ideas or directions. Anuja is willing to take on difficult problems and push for creative solutions, even under tight timelines.",
        relationship: 'Direct Manager · 3+ years',
        isPrimary: true,
    },
    {
        id: 'marcus-horbach',
        name: 'Marcus Horbach, Ph.D.',
        role: 'Principal Data Scientist',
        company: 'Cloud Software Group',
        quote: 'The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive. Her design solutions are rooted in a deep understanding of the purpose of the product.',
        relationship: 'Cross-functional Collaborator',
    },
    {
        id: 'yingchun-chen',
        name: 'Yingchun Chen',
        role: 'Principal System Software Engineer',
        company: 'Cloud Software Group',
        quote: "From the start, she impressed everyone with how quickly she grasped all aspects of a highly intricate system. She's the kind of UX leader any team would be lucky to have.",
        relationship: 'Engineering Partner',
    },
    {
        id: 'karishma-khadge',
        name: 'Karishma Khadge',
        role: 'Senior Product Manager',
        company: 'Cloud Software Group',
        quote: 'Her design thinking workshops and prototype walkthroughs often became the foundation for key product decisions, driving clarity and alignment across cross-functional teams.',
        relationship: 'Product Partner',
    },
    {
        id: 'anita-george',
        name: 'Anita George',
        role: 'Principal Account Technology Strategist',
        company: 'Cloud Software Group',
        quote: 'Anticipating the next move of the user, that is next level UI! Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels.',
        relationship: 'Customer / SME',
    },
]

function TestimonialCard({ t, index }: { t: typeof TESTIMONIALS[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300
                ${t.isPrimary
                    ? 'bg-[var(--accent-teal)]/[0.06] shadow-[0_0_30px_rgba(47,198,213,0.06)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.05]'
                }`}
        >
            {/* Quote */}
            <p className={`text-sm md:text-[15px] leading-relaxed mb-6 ${t.isPrimary ? 'text-white/90' : 'text-white/70'}`}>
                &ldquo;{t.quote}&rdquo;
            </p>

            {/* Attribution */}
            <div className="flex items-center gap-3">
                {/* Avatar initial */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                    ${t.isPrimary
                        ? 'bg-[var(--accent-teal)]/20 text-[var(--accent-teal)]'
                        : 'bg-white/10 text-white/50'
                    }`}>
                    {t.name.charAt(0)}
                </div>
                <div>
                    <p className={`text-sm font-semibold ${t.isPrimary ? 'text-white' : 'text-white/80'}`}>
                        {t.name}
                    </p>
                    <p className="text-xs text-white/40 font-mono">
                        {t.role}
                    </p>
                </div>
            </div>

            {/* Primary badge */}
            {t.isPrimary && (
                <div className="absolute top-4 right-4">
                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[var(--accent-teal)]/70 bg-[var(--accent-teal)]/10 px-2 py-1 rounded-full">
                        Featured
                    </span>
                </div>
            )}
        </motion.div>
    )
}

export default function TestimonialsBlock() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const headingY = useTransform(scrollYProgress, [0, 0.3], [80, 0])
    const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
    const headingScale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1])

    // Separate primary and secondary
    const primary = TESTIMONIALS.filter(t => t.isPrimary)
    const secondary = TESTIMONIALS.filter(t => !t.isPrimary)

    return (
        <section ref={ref} className="relative py-20 md:py-32 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-hidden">
            {/* Era label — decorative, above content */}
            <motion.div
                className="mb-6 md:mb-8 pointer-events-none select-none"
                aria-hidden="true"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="font-extrabold text-[clamp(3rem,8vw,7rem)] text-white/[0.03] uppercase tracking-tighter leading-none block">
                    SOCIAL PROOF
                </span>
            </motion.div>

            {/* Header */}
            <motion.div
                className="mb-12 md:mb-16"
                style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
            >
                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-white/50 mb-3">
                    Social Proof
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                    What they say
                    <span className="text-white/40 font-normal"> — CSG colleagues</span>
                </h2>
            </motion.div>

            {/* Primary testimonials — full width */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
                {primary.map((t, i) => (
                    <TestimonialCard key={t.id} t={t} index={i} />
                ))}
            </div>

            {/* Secondary testimonials — 4-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {secondary.map((t, i) => (
                    <TestimonialCard key={t.id} t={t} index={i + 2} />
                ))}
            </div>
        </section>
    )
}
