'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TESTIMONIALS, type Testimonial } from '@/data/testimonials'

const VISIBLE_COUNT = 3

function QuoteCard({ t, i }: { t: Testimonial; i: number }) {
    return (
        <motion.figure
            className="relative rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 md:p-7 flex flex-col h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: Math.min(i, VISIBLE_COUNT) * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
    const [expanded, setExpanded] = useState(false)
    const shown = expanded ? TESTIMONIALS : TESTIMONIALS.slice(0, VISIBLE_COUNT)
    const hiddenCount = TESTIMONIALS.length - VISIBLE_COUNT

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

            {/* Static quote wall — 3 by default, expands to all */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
                {shown.map((t, i) => (
                    <QuoteCard key={t.id} t={t} i={i} />
                ))}
            </div>

            {/* Show-all toggle */}
            {hiddenCount > 0 && (
                <div className="flex justify-center mt-8 md:mt-10">
                    <button
                        onClick={() => setExpanded(v => !v)}
                        aria-expanded={expanded}
                        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/[0.1] bg-white/[0.04] text-zinc-300 text-sm font-medium tracking-wide hover:bg-white/[0.08] hover:text-white hover:border-white/[0.2] transition-all duration-400"
                    >
                        {expanded ? 'Show fewer' : `Read all ${TESTIMONIALS.length} endorsements`}
                        <span className={`text-[var(--accent-teal)] transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} aria-hidden="true">
                            ↓
                        </span>
                    </button>
                </div>
            )}
        </section>
    )
}
