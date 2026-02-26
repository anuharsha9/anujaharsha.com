'use client'

import { motion } from 'framer-motion'
import { QuickOverview } from '@/types/caseStudy'

/*  ─────────────────────────────────────────────
    QuickOverviewSection
    
    Data-driven Quick Overview section.
    Consumes QuickOverview from any case study
    and renders: header → metrics → narrative + STAR → achievements.
    
    Visual language established in /work/experiment.
    ───────────────────────────────────────────── */

// ─── Animation presets ──────────────────────────
const stagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
}

const fadeUp = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

// ─── Sub-components ─────────────────────────────

function MetricCard({
    value,
    label,
    accent,
    index,
}: {
    value: string
    label: string
    accent?: boolean
    index: number
}) {
    return (
        <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]"
        >
            {accent && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-teal)]/30 to-transparent" />
            )}
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-dim)] mb-3">
                {String(index + 1).padStart(2, '0')}
            </p>
            <p
                className={`text-3xl md:text-4xl font-sans font-bold tracking-tight mb-2 ${accent ? 'text-[var(--accent-teal)]' : 'text-[var(--text-heading)]'
                    }`}
            >
                {value}
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{label}</p>
        </motion.div>
    )
}

function STARBlock({
    label,
    content,
    accentColor,
}: {
    label: string
    content: string
    accentColor: string
}) {
    return (
        <motion.div variants={fadeUp} className="space-y-2">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: accentColor }}>
                {label}
            </p>
            <p className="text-[var(--text-body)] text-[15px] leading-[1.7]">{content}</p>
        </motion.div>
    )
}

function AchievementCard({ metric, context }: { metric: string; context: string }) {
    return (
        <motion.div
            variants={fadeUp}
            className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04] overflow-hidden"
        >
            <div
                className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-opacity"
                style={{ backgroundColor: 'rgba(var(--accent-teal-rgb), 0.4)' }}
            />
            <div className="pl-4">
                <p className="text-xl md:text-2xl font-sans font-bold text-[var(--text-heading)] mb-1 tracking-tight">
                    {metric}
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {context}
                </p>
            </div>
        </motion.div>
    )
}

// ─── STAR accent colors ─────────────────────────
const starColors = {
    situation: 'var(--accent-teal)',
    task: '#f59e0b',
    action: '#8b5cf6',
    result: '#10b981',
}

// ─── Main Component ─────────────────────────────

interface QuickOverviewSectionProps {
    data: QuickOverview
    /** Title override (falls back to data.title) */
    title?: string
    /** Subtitle override (falls back to data.subtitle) */
    subtitle?: string
    /** Narrative override (falls back to data.leadershipSummary) */
    narrative?: string
    /** Structured achievements (metric + context). If not provided, falls back to data.keyAchievements as flat strings. */
    achievements?: { metric: string; context: string }[]
    /** STAR override (falls back to data.star) */
    star?: { situation: string; task: string; action: string; result: string }
}

export default function QuickOverviewSection({
    data,
    title,
    subtitle,
    narrative,
    achievements,
    star,
}: QuickOverviewSectionProps) {
    const displayTitle = title || data.title?.replace(/—.*$/, '').trim() || ''
    const displaySubtitle = subtitle || data.subtitle
    const displayNarrative = narrative || data.leadershipSummary || ''

    // Metrics: map from data format { label, value } → render format
    const metrics = data.impactMetrics.map((m, i) => ({
        value: m.value,
        label: m.label,
        // Accent every other card for visual rhythm
        accent: i % 2 === 0,
    }))

    // Achievements: prefer structured prop, fall back to flat keyAchievements
    const displayAchievements = achievements || (data.keyAchievements || []).map(text => ({
        metric: text,
        context: '',
    }))

    return (
        <section className="relative bg-[var(--bg-primary)] py-12 md:py-16 lg:py-20">
            {/* Top divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            <motion.div
                className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={stagger}
            >
                {/* ── Section eyebrow ────────────────── */}
                <motion.p
                    variants={fadeUp}
                    className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-[var(--accent-teal)] mb-8 md:mb-10"
                >
                    Quick Impact Overview
                </motion.p>

                {/* ── Metrics Grid ───────────────────── */}
                <motion.div
                    variants={stagger}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-16"
                >
                    {metrics.map((m, i) => (
                        <MetricCard key={i} index={i} {...m} />
                    ))}
                </motion.div>

                {/* ── STAR Framework ─────────────────── */}
                {(star || data.star) && (() => {
                    const s = star || data.star!
                    return (
                        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
                            <STARBlock label="Situation" content={s.situation} accentColor={starColors.situation} />
                            <STARBlock label="Task" content={s.task} accentColor={starColors.task} />
                            <STARBlock label="Action" content={s.action} accentColor={starColors.action} />
                            <STARBlock label="Result" content={s.result} accentColor={starColors.result} />
                        </motion.div>
                    )
                })()}

                {/* ── Key Achievements ────────────────── */}
                {displayAchievements.length > 0 && (
                    <>
                        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-12 md:mb-16" />

                        <motion.div variants={stagger} className="space-y-8">
                            <motion.p
                                variants={fadeUp}
                                className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent-teal)]"
                            >
                                Key Achievements
                            </motion.p>
                            <motion.div
                                variants={stagger}
                                className={`grid gap-4 ${displayAchievements.length <= 3
                                    ? 'grid-cols-1 md:grid-cols-3'
                                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                    }`}
                            >
                                {displayAchievements.map((a, i) => (
                                    <AchievementCard key={i} metric={a.metric} context={a.context} />
                                ))}
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </motion.div>
        </section>
    )
}
