'use client'

import { m } from 'framer-motion'
import { Play } from 'lucide-react'
import { useTransition } from '@/components/transitions/TransitionContext'
import { EASE_CINEMATIC } from '@/lib/motion'

/**
 * Trailer Teaser — a closer for warm visitors who just finished the 3 case studies.
 * Compact band that links to the full `/manifesto` cinematic experience.
 * (Replaces the hero "Watch: Why Hire Me" CTA so the hero leads with shipped work.)
 */
export default function TrailerTeaser() {
    const { navigateTo } = useTransition()

    return (
        <section
            id="trailer-teaser"
            className="relative mx-auto max-w-[1100px] px-4 py-16 md:px-8 md:py-24 lg:px-12"
        >
            {/* ambient teal glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(var(--accent-teal-glow-rgb),0.05)] blur-[120px]" />

            <m.div
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
            >
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.35em] text-[var(--accent-teal)]/70 md:text-xs">
                    The 60-second version
                </p>
                <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                    Want the trailer?
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                    How I think, what I&apos;ve shipped, and why hire me — in a minute.
                </p>

                <m.button
                    onClick={() => navigateTo('/manifesto')}
                    className="group relative mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-500 hover:border-white/60 hover:bg-white hover:text-black sm:text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-teal)]/15 text-[var(--accent-teal)] transition-colors duration-500 group-hover:bg-black/10 group-hover:text-black">
                        <Play className="h-3 w-3 fill-current" />
                    </span>
                    <span>Watch: Why Hire Me</span>
                </m.button>
            </m.div>
        </section>
    )
}
