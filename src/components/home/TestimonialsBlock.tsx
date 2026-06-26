'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import { TESTIMONIALS, type Testimonial } from '@/data/testimonials'

const VISIBLE_COUNT = 3

/* Decorative quotation-mark glyph */
function QuoteMark({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
        </svg>
    )
}

function QuoteCard({ t, i }: { t: Testimonial; i: number }) {
    return (
        <m.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: Math.min(i, VISIBLE_COUNT) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 md:p-7 transition-[border-color,box-shadow] duration-500 hover:border-[var(--accent-teal)]/30 hover:shadow-[0_12px_44px_-14px_rgba(var(--accent-teal-glow-rgb),0.28)]"
        >
            {/* hover sheen */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(var(--accent-teal-glow-rgb),0.10),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* big watermark quote mark */}
            <QuoteMark className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 text-white/[0.03] transition-colors duration-500 group-hover:text-[var(--accent-teal)]/[0.06]" />

            {/* foreground quote mark */}
            <QuoteMark className="relative mb-4 h-6 w-6 text-[var(--accent-teal)]/45 transition-colors duration-500 group-hover:text-[var(--accent-teal)]/80" />

            <blockquote className="relative text-[15px] md:text-base font-light leading-relaxed text-zinc-200">
                {t.quote}
            </blockquote>

            <figcaption className="relative mt-6 flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-[var(--accent-teal)] to-[var(--accent-teal-bright)] p-[1.5px]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0b0b11] text-sm font-bold text-[var(--accent-teal)]">
                        {t.name.charAt(0)}
                    </div>
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-100">{t.name}</p>
                    <p className="truncate text-[11px] font-mono text-zinc-500">{t.role}</p>
                </div>
            </figcaption>
        </m.figure>
    )
}

export default function TestimonialsBlock() {
    const [expanded, setExpanded] = useState(false)
    const shown = expanded ? TESTIMONIALS : TESTIMONIALS.slice(0, VISIBLE_COUNT)
    const hiddenCount = TESTIMONIALS.length - VISIBLE_COUNT

    return (
        <section className="relative mx-auto max-w-[1280px] px-4 pt-12 pb-20 md:px-8 md:pt-20 md:pb-28 lg:px-12">
            {/* ambient teal glow */}
            <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[rgba(var(--accent-teal-glow-rgb),0.05)] blur-[130px]" />
            {/* oversized ghost quote watermark */}
            <QuoteMark className="pointer-events-none absolute -top-4 right-2 h-24 w-24 select-none text-white/[0.025] md:right-6 md:h-32 md:w-32" />

            {/* Header */}
            <m.div
                className="relative mb-10 md:mb-14"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-teal)]/70 md:text-sm">
                    Social Proof · {TESTIMONIALS.length} endorsements
                </p>
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                    What leaders say
                </h2>
            </m.div>

            {/* Masonry wall — organic, not a rigid grid */}
            <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
                {shown.map((t, i) => (
                    <QuoteCard key={t.id} t={t} i={i} />
                ))}
            </div>

            {/* Expand toggle */}
            {hiddenCount > 0 && (
                <div className="mt-6 flex justify-center md:mt-8">
                    <button
                        onClick={() => setExpanded(v => !v)}
                        aria-expanded={expanded}
                        className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--accent-teal)]/25 bg-[var(--accent-teal)]/[0.06] px-7 py-3 text-sm font-medium tracking-wide text-[var(--accent-teal)] transition-all duration-300 hover:border-[var(--accent-teal)]/45 hover:bg-[var(--accent-teal)]/[0.12]"
                    >
                        {expanded ? 'Show fewer' : `Read all ${TESTIMONIALS.length} endorsements`}
                        <span className={`transition-transform duration-300 ${expanded ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} aria-hidden="true">
                            ↓
                        </span>
                    </button>
                </div>
            )}
        </section>
    )
}
