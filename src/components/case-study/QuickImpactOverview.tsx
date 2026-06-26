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
/* Unified band-label treatment — every section eyebrow uses the same mono
   spec so the block reads as one structured sheet. Accent for the active
   bands, muted for "out of scope". */
const LABEL = 'font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--cs-accent)]'
const LABEL_MUTED = 'font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500'

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

                {/* 1. Problem statement — context first, the hero line. */}
                <h2 className="max-w-4xl text-xl font-extrabold leading-snug tracking-tight text-white md:text-2xl lg:text-3xl">
                    {overview.whatTheSystemWas}
                </h2>

                {/* The rest is organized into labelled BANDS separated by hairline
                    dividers, so the three studies (very different content shapes) all
                    read as the same structured spec sheet instead of floating blocks. */}

                {/* BAND — How I led (the Staff signal; previously-hidden leadershipSummary) */}
                {overview.leadershipSummary && (
                    <div className="mt-10 border-t border-white/[0.06] pt-8">
                        <p className={LABEL}>How I led</p>
                        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-zinc-200 md:text-base">
                            {overview.leadershipSummary}
                        </p>
                    </div>
                )}

                {/* BAND — My role (left) + By the numbers (right, bordered grid) */}
                <div className="mt-10 grid grid-cols-1 gap-y-10 border-t border-white/[0.06] pt-8 md:grid-cols-12 md:gap-x-12">
                    <div className="md:col-span-5">
                        <p className={LABEL}>My role</p>
                        <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-zinc-200 md:text-base">
                            {overview.myRole}
                        </p>
                    </div>

                    {metrics.length > 0 && (
                        <div className="md:col-span-7">
                            <p className={`${LABEL} mb-4`}>By the numbers</p>
                            {/* Bordered 2×2 data grid — equal cells + hairline dividers
                                keep the metrics aligned no matter the value shape. */}
                            <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-white/[0.07]">
                                {metrics.map((metric, i) => (
                                    <MetricCell key={metric.label} metric={metric} index={i} />
                                ))}
                            </dl>
                        </div>
                    )}
                </div>

                {/* BAND — Trade-offs: owned vs. excluded */}
                {(ownedShown.length > 0 || excluded.length > 0) && (
                    <div className="mt-10 grid grid-cols-1 gap-8 border-t border-white/[0.06] pt-8 md:grid-cols-2 md:gap-10">
                        {ownedShown.length > 0 && (
                            <div>
                                <p className={LABEL}>I owned</p>
                                <ul className="mt-3 flex flex-wrap gap-2">
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
                                <p className={LABEL_MUTED}>Out of scope</p>
                                <ul className="mt-3 flex flex-wrap gap-2">
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
function MetricCell({ metric, index }: { metric: HighlightMetric; index: number }) {
    const value = metric.value?.trim() ?? ''
    const isCompactStat = value.length <= 14 && !/[a-z]{4,}/.test(value)
    /* 2-col grid: left cells (even index) get a right divider; bottom row
       (index ≥ 2) gets a top divider — yields clean internal hairlines. */
    const border = `${index % 2 === 0 ? 'border-r ' : ''}${index >= 2 ? 'border-t ' : ''}border-white/[0.06]`

    return (
        <div className={`min-h-[88px] p-4 md:p-5 ${border}`}>
            <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                {metric.label}
            </dt>
            <dd
                className={
                    isCompactStat
                        ? 'mt-1.5 font-mono text-2xl font-bold text-[var(--cs-accent)] md:text-3xl'
                        : 'mt-1.5 text-sm font-semibold leading-snug text-[var(--cs-accent)]/90 md:text-base'
                }
            >
                {value}
            </dd>
        </div>
    )
}
