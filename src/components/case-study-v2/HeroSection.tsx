'use client'

import { motion } from 'framer-motion'
import { CalendarClock, ChartSpline, Bot } from 'lucide-react'
import { CaseStudyData } from '@/types/caseStudy'
import TextReveal from '@/components/ui/TextReveal'

/*  ─────────────────────────────────────────────
    HeroSection (v2)

    Full-bleed hero for case study pages.
    Shows: case study number → title → subtitle →
           role / timeline / status metadata.
    ───────────────────────────────────────────── */

const fadeUp = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

function getCaseStudyNumber(slug: string) {
    if (slug === 'reportcaster') return '001'
    if (slug === 'ml-functions') return '002'
    if (slug === 'iq-plugin') return '003'
    return '001'
}

function BackgroundIcon({ slug }: { slug: string }) {
    const iconClass = 'w-[600px] h-[600px] md:w-[800px] md:h-[800px] text-white'
    const Icon = slug === 'reportcaster' ? CalendarClock
        : slug === 'ml-functions' ? ChartSpline
            : Bot
    return <Icon strokeWidth={0.5} className={iconClass} />
}

interface HeroSectionProps {
    data: CaseStudyData
}

export default function HeroSection({ data }: HeroSectionProps) {
    const timeframeParts = data.timeframe.split('|')
    const timeframeLabel = timeframeParts[0].trim()
    const statusLabel = timeframeParts.length > 1 ? timeframeParts[1].trim() : data.status?.label

    return (
        <>
            <motion.header
                className="relative min-h-[45vh] flex items-center py-12 md:py-16 lg:py-20 bg-[var(--bg-primary)] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Background Icon */}
                <motion.div
                    className="absolute -right-[20%] md:-right-[10%] top-1/2 -translate-y-1/2 -z-0 select-none pointer-events-none opacity-[0.03]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.03, scale: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                >
                    <BackgroundIcon slug={data.slug} />
                </motion.div>

                <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
                    <div className="max-w-5xl space-y-8">
                        {/* Case study badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] text-white/50 text-sm font-medium border border-white/[0.06] rounded-full">
                                <span className="w-2 h-2 bg-[var(--accent-teal)]" />
                                <span>Case Study {getCaseStudyNumber(data.slug)}</span>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <TextReveal
                            as="h1"
                            className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-[var(--text-heading)] leading-[1.15] tracking-tight"
                            variant="slide-up"
                            stagger={0.06}
                            delay={0.2}
                            viewportAmount={0.3}
                            once={true}
                        >
                            {data.heroTitle}
                        </TextReveal>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="text-lg md:text-xl text-[var(--text-body)] leading-relaxed font-light max-w-2xl"
                        >
                            {data.heroSubtitle}
                        </motion.p>
                    </div>

                    {/* Metadata row */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 mt-10 border-t border-white/[0.06]"
                    >
                        {/* Role & Expertise */}
                        <motion.div className="space-y-3" variants={fadeUp}>
                            <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                                Role & Expertise
                            </h3>
                            <p className="font-medium text-[var(--text-heading)] text-lg">{data.role}</p>
                        </motion.div>

                        {/* Timeline */}
                        <motion.div className="space-y-3" variants={fadeUp}>
                            <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                                Timeline
                            </h3>
                            <p className="font-medium text-[var(--text-heading)] text-lg">{timeframeLabel}</p>
                            {statusLabel && (
                                <div className="inline-flex items-center gap-2 bg-[var(--accent-teal-soft)]/10 px-3 py-1 w-fit border border-[var(--accent-teal)]/20 rounded-full">
                                    <span className="w-2 h-2 bg-[var(--accent-teal)]" />
                                    <p className="text-sm text-[var(--accent-teal)] font-bold tracking-wide">
                                        {statusLabel.toUpperCase()}
                                    </p>
                                </div>
                            )}
                        </motion.div>

                        {/* Company */}
                        <motion.div className="space-y-3" variants={fadeUp}>
                            <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                                Company
                            </h3>
                            <p className="font-medium text-[var(--text-heading)] text-lg">{data.company}</p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.header>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </>
    )
}
