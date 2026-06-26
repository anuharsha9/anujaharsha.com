'use client'

import { m } from 'framer-motion'
import type { CaseStudyData, HighlightMetric } from '@/types/caseStudy'

/**
 * 10-second case-study triage block. Renders RIGHT AFTER the cinematic hero
 * so a recruiter sees the four article-compliant signals before scrolling
 * into the deep dive:
 *
 *   1. Problem — what the system WAS (context-first framing)
 *   2. My role — explicit ownership signal
 *   3. Outcomes — 4 impact metrics
 *   4. Trade-offs — what I owned vs. what I didn't
 *
 * Content-length resilient. Each case study's data has very different
 * stylistic patterns (ML = paragraphs, RC = sentences, IQ = fragments,
 * metric values mix short numerics with long phrases). The component
 * normalizes the visual rhythm so all three case studies read as the
 * same kind of block.
 */
export default function QuickImpactOverview({ data }: { data: CaseStudyData }) {
    const overview = data.quickOverview
    if (!overview) return null

    const metrics = overview.impactMetrics?.slice(0, 4) ?? []
    const ownedAll = data.ownership?.ownedFeatures ?? []
    const excluded = data.ownership?.excludedFeatures ?? []
    const OWNED_VISIBLE = 5
    const ownedShown = ownedAll.slice(0, OWNED_VISIBLE)
    const ownedExtra = Math.max(0, ownedAll.length - OWNED_VISIBLE)

    const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

    return (
        <section
            id="quick-impact"
            aria-label="At a glance"
            className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-16 md:px-12 md:py-24"
        >
            <m.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease }}
            >
                {/* Section eyebrow — consistent across all 3 studies */}
                <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--cs-accent)]">
                    At a glance · 10-second read
                </p>

                {/* 1. Problem statement — context first.
                    text-xl on mobile / text-2xl md / text-3xl lg + max-w-3xl keeps the
                    longest content (ML: 8 lines) feeling like a paragraph, not a wall.
                    The fragmented copy (IQ) still reads punchy at this size. */}
                <h2 className="max-w-3xl text-xl font-extrabold leading-snug tracking-tight text-white md:text-2xl lg:text-3xl">
                    {overview.whatTheSystemWas}
                </h2>

                {/* 2 + 3. My role (left) + Metrics rail (right). Fixed grid so the
                    column widths don't shift based on content length. */}
                <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
                    {/* My role — fixed col span, small body text, max-w to prevent
                        skinny columns when paragraph is long. */}
                    <div className="md:col-span-6 lg:col-span-7">
                        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                            My role
                        </p>
                        <p className="max-w-[44ch] text-[15px] leading-relaxed text-zinc-200 md:text-base">
                            {overview.myRole}
                        </p>
                    </div>

                    {/* Metrics — each value goes through a smart renderer so a
                        long phrase doesn't masquerade as a big stat. */}
                    {metrics.length > 0 && (
                        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:col-span-6 md:grid-cols-2 md:gap-y-6 lg:col-span-5">
                            {metrics.map(m => (
                                <MetricCell key={m.label} metric={m} />
                            ))}
                        </dl>
                    )}
                </div>

                {/* 4. Trade-offs — owned vs. excluded */}
                {(ownedShown.length > 0 || excluded.length > 0) && (
                    <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/[0.06] pt-8 md:grid-cols-2 md:gap-10">
                        {ownedShown.length > 0 && (
                            <div>
                                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--cs-accent)]/80">
                                    I owned
                                </p>
                                <ul className="flex flex-wrap gap-2">
                                    {ownedShown.map(item => (
                                        <li
                                            key={item}
                                            className="rounded-full border border-[var(--cs-accent)]/25 bg-[var(--cs-accent)]/[0.06] px-3 py-1.5 text-xs text-zinc-200"
                                        >
                                            {item.trim()}
                                        </li>
                                    ))}
                                    {ownedExtra > 0 && (
                                        <li className="rounded-full border border-white/[0.08] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                                            +{ownedExtra} more
                                        </li>
                                    )}
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
            </m.div>
        </section>
    )
}

/**
 * Smart per-metric renderer.
 *
 * A "stat" like "5 → 1" or "+25%" needs to look BIG — that's the whole point.
 * A "stat" like "Data flow canvas → 4-step wizard" is really a phrase, and
 * rendering it in giant mono looks like a code dump.
 *
 * Rule: numeric / symbolic short values (<= 14 chars and no lowercase words)
 * get the headline treatment; everything else falls back to readable body text
 * still tinted in the case-study accent so it visually belongs to the stat rail.
 */
function MetricCell({ metric }: { metric: HighlightMetric }) {
    const value = metric.value?.trim() ?? ''
    const isCompactStat = value.length <= 14 && !/[a-z]{4,}/.test(value)

    return (
        <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                {metric.label}
            </dt>
            <dd
                className={
                    isCompactStat
                        ? 'mt-1 font-mono text-xl font-bold text-[var(--cs-accent)] md:text-3xl'
                        : 'mt-1.5 text-sm leading-snug text-[var(--cs-accent)]/90 md:text-base'
                }
            >
                {value}
            </dd>
        </div>
    )
}
