'use client'

import { motion } from 'framer-motion'
import type { CaseStudyData } from '@/types/caseStudy'

/**
 * 10-second case-study triage block. Renders RIGHT AFTER the cinematic hero
 * so a recruiter sees the four article-compliant signals before scrolling
 * into the deep dive:
 *
 *   1. My role (explicit ownership — Superhive article failure #4)
 *   2. What the problem WAS (context-first framing — failure #1)
 *   3. Outcomes (4 impact metrics — failure #3)
 *   4. Trade-offs (what I owned vs. what I didn't — credibility checklist)
 *
 * All content is data-driven from the case-study data files. No invented
 * numbers, no fluff.
 */
export default function QuickImpactOverview({ data }: { data: CaseStudyData }) {
    const overview = data.quickOverview
    if (!overview) return null

    const metrics = overview.impactMetrics?.slice(0, 4) ?? []
    const owned = data.ownership?.ownedFeatures?.slice(0, 6) ?? []
    const excluded = data.ownership?.excludedFeatures ?? []

    const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

    return (
        <section
            id="quick-impact"
            aria-label="At a glance"
            className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-16 md:px-12 md:py-24"
        >
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease }}
            >
                {/* Section eyebrow */}
                <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--cs-accent)]">
                    At a glance · 10-second read
                </p>

                {/* 1. Problem — what the system WAS (context first, per article) */}
                <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                    {overview.whatTheSystemWas}
                </h2>

                {/* 2. My role — explicit ownership signal */}
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-start md:gap-12">
                    <div className="max-w-[640px]">
                        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                            My role
                        </p>
                        <p className="text-base leading-relaxed text-zinc-200 md:text-lg">
                            {overview.myRole}
                        </p>
                    </div>

                    {/* 3. Metrics rail — outcomes evidence */}
                    {metrics.length > 0 && (
                        <dl className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-1 md:gap-y-5">
                            {metrics.map(m => (
                                <div key={m.label}>
                                    <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                                        {m.label}
                                    </dt>
                                    <dd className="mt-1 font-mono text-lg font-bold text-[var(--cs-accent)] md:text-2xl">
                                        {m.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </div>

                {/* 4. Trade-offs — owned vs. excluded (the credibility separator) */}
                {(owned.length > 0 || excluded.length > 0) && (
                    <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/[0.06] pt-8 md:grid-cols-2 md:gap-12">
                        {owned.length > 0 && (
                            <div>
                                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--cs-accent)]/80">
                                    I owned
                                </p>
                                <ul className="flex flex-wrap gap-2">
                                    {owned.map(item => (
                                        <li
                                            key={item}
                                            className="rounded-full border border-[var(--cs-accent)]/25 bg-[var(--cs-accent)]/[0.06] px-3 py-1.5 text-xs text-zinc-200"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {excluded.length > 0 && (
                            <div>
                                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                                    Out of scope
                                </p>
                                <ul className="flex flex-wrap gap-2">
                                    {excluded.map(item => (
                                        <li
                                            key={item}
                                            className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-500"
                                        >
                                            {item.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </section>
    )
}
