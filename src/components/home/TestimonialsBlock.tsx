'use client'

import { motion } from 'framer-motion'

interface Testimonial {
    id: string
    name: string
    role: string
    quote: string
    featured?: boolean
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 'vijay-raman',
        name: 'Vijay Raman',
        role: 'VP of Product Management',
        quote: 'She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams. Any team would be lucky to have her.',
        featured: true,
    },
    {
        id: 'dave-pfeiffer',
        name: 'Dave Pfeiffer',
        role: 'Director of Design',
        quote: 'She approaches her work with a fearless attitude and is never afraid to explore new ideas or directions. Anuja is willing to take on difficult problems and push for creative solutions, even under tight timelines.',
        featured: true,
    },
    {
        id: 'marcus-horbach',
        name: 'Marcus Horbach, Ph.D.',
        role: 'Principal Data Scientist',
        quote: 'The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive. Her design solutions are rooted in a deep understanding of the purpose of the product.',
        featured: true,
    },
    // — Additional endorsements (kept for reference; swap into the featured set anytime) —
    {
        id: 'yingchun-chen',
        name: 'Yingchun Chen',
        role: 'Principal System Software Engineer',
        quote: "From the start, she impressed everyone with how quickly she grasped all aspects of a highly intricate system. She's the kind of UX leader any team would be lucky to have.",
    },
    {
        id: 'karishma-khadge',
        name: 'Karishma Khadge',
        role: 'Senior Product Manager',
        quote: 'Her design thinking workshops and prototype walkthroughs often became the foundation for key product decisions, driving clarity and alignment across cross-functional teams.',
    },
    {
        id: 'anita-george',
        name: 'Anita George',
        role: 'Principal Account Technology Strategist',
        quote: 'Anticipating the next move of the user, that is next level UI! Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels.',
    },
]

const FEATURED = TESTIMONIALS.filter(t => t.featured)

function QuoteCard({ t, i }: { t: Testimonial; i: number }) {
    return (
        <motion.figure
            className="relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 md:p-7 flex flex-col h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
            <blockquote className="text-zinc-200 text-base md:text-lg font-light leading-relaxed mb-6 flex-1">
                <span className="text-[var(--accent-teal)]/60">&ldquo;</span>{t.quote}<span className="text-[var(--accent-teal)]/60">&rdquo;</span>
            </blockquote>
            <figcaption className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--accent-teal)]/12 flex items-center justify-center text-[var(--accent-teal)] text-sm font-bold shrink-0">
                    {t.name.charAt(0)}
                </div>
                <div>
                    <p className="text-zinc-100 text-sm font-semibold">{t.name}</p>
                    <p className="text-zinc-500 text-[11px] font-mono">{t.role}</p>
                </div>
            </figcaption>
        </motion.figure>
    )
}

export default function TestimonialsBlock() {
    return (
        <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto">
            {/* Header */}
            <motion.div
                className="mb-8 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-zinc-500 mb-3">
                    Social Proof
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                    What leaders say
                </h2>
            </motion.div>

            {/* Static featured quotes — no carousel, all readable at once */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
                {FEATURED.map((t, i) => (
                    <QuoteCard key={t.id} t={t} i={i} />
                ))}
            </div>
        </section>
    )
}
