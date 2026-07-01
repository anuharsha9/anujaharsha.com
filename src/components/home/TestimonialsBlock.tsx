'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import { Play } from 'lucide-react'
import Button from '@/components/ui/Button'
import SystemLightbox from '@/components/ui/SystemLightbox'
import { useTransition } from '@/components/transitions/TransitionContext'
import { TESTIMONIALS, type Testimonial } from '@/data/testimonials'
import { EASE_CINEMATIC, DURATION } from '@/lib/motion'

/* Edge fade so cards dissolve at the strip's left/right edges. */
const EDGE_MASK = 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)'

/* Split into two rows (alternating) for the opposing-direction marquee. */
const ROW_A = TESTIMONIALS.filter((_, i) => i % 2 === 0)
const ROW_B = TESTIMONIALS.filter((_, i) => i % 2 === 1)

/* Decorative quotation glyph. */
function QuoteMark({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
        </svg>
    )
}

/* Compact endorsement card — shows the pull-quote; click opens the full note. */
function Card({ t, onOpen }: { t: Testimonial; onOpen: (t: Testimonial) => void }) {
    return (
        /* No aria-label — the visible quote + name IS the accessible name.
           An override here failed WCAG 2.5.3 (Label in Name): voice-control
           users say what they see ("A rare combination of…"), and a label
           that doesn't contain the visible text breaks that command. */
        <button
            onClick={() => onOpen(t)}
            className="group/card mx-6 flex max-w-md shrink-0 items-start gap-3 text-left sm:mx-9"
        >
            <QuoteMark className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-teal)]/40 transition-colors duration-500 group-hover/card:text-[var(--accent-teal)]/75" />
            <span className="leading-snug">
                <span className="text-base font-light text-zinc-300 transition-colors duration-500 group-hover/card:text-white md:text-lg">
                    {t.pull}
                </span>
                <span className="mt-1 block font-mono text-[11px] uppercase tracking-wide">
                    <span className="text-[var(--accent-teal-bright)]">{t.name}</span>
                    <span className="text-zinc-500"> · {t.role}</span>
                </span>
            </span>
        </button>
    )
}

/* One marquee row — auto-scrolls; pauses on hover/focus; manually scrollable under reduced-motion. */
function MarqueeRow({ items, direction, onOpen }: { items: Testimonial[]; direction: 'left' | 'right'; onOpen: (t: Testimonial) => void }) {
    return (
        <div
            className="marquee-row relative overflow-hidden py-1 motion-reduce:overflow-x-auto"
            style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
        >
            {/* Cards rendered twice for a seamless -50% loop. */}
            <div className={`marquee-track items-center ${direction === 'left' ? 'marquee-track--left' : 'marquee-track--right'}`}>
                {[...items, ...items].map((t, i) => (
                    <Card key={`${t.id}-${i}`} t={t} onOpen={onOpen} />
                ))}
            </div>
        </div>
    )
}

export default function TestimonialsBlock() {
    const [active, setActive] = useState<Testimonial | null>(null)
    const { navigateTo } = useTransition()

    return (
        <section className="relative mx-auto max-w-[1400px] pt-12 pb-20 md:pt-20 md:pb-28">
            {/* ambient teal glow */}
            <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[rgba(var(--accent-teal-glow-rgb),0.05)] blur-[130px]" />

            {/* Header */}
            <m.div
                className="relative mb-8 px-4 text-center md:mb-12 md:px-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: DURATION.gentle, ease: EASE_CINEMATIC }}
            >
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-teal)]/70 md:text-sm">
                    Social Proof · {TESTIMONIALS.length} endorsements
                </p>
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                    What leaders say
                </h2>
            </m.div>

            {/* Two opposing marquee rows */}
            <div className="space-y-8 md:space-y-12">
                <MarqueeRow items={ROW_A} direction="left" onOpen={setActive} />
                <MarqueeRow items={ROW_B} direction="right" onOpen={setActive} />
            </div>

            <p className="mt-8 px-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                Hover to pause · tap a quote to read the full note
            </p>

            {/* Why Hire Me — canonical primary. Plain Play icon at w-4 h-4 to
                match every other CTA on the page; no extra wrapper. */}
            <div className="mt-10 flex justify-center">
                <Button
                    variant="primary"
                    onClick={() => navigateTo('/manifesto')}
                    icon={<Play className="w-4 h-4 fill-current" />}
                >
                    Why hire me — in 60 seconds
                </Button>
            </div>

            {/* Full endorsement */}
            {active && (
                <SystemLightbox
                    isOpen
                    onClose={() => setActive(null)}
                    title={active.name}
                    showArrows={false}
                >
                    <div className="mx-auto max-w-2xl px-6 py-12 md:px-10 md:py-16">
                        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-teal)]/80">
                            {active.role}
                        </p>
                        <blockquote className="whitespace-pre-line text-lg font-light leading-relaxed text-zinc-100 md:text-2xl">
                            “{active.full ?? active.quote}”
                        </blockquote>
                        <p className="mt-6 text-sm font-semibold text-zinc-300">— {active.name}</p>
                    </div>
                </SystemLightbox>
            )}
        </section>
    )
}
