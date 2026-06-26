'use client'

import React from 'react'
import { CAREER_DATA, CareerEra } from '@/data/career-data'
import ImmersiveBrainExperience from '@/components/home/ImmersiveBrainExperience'
import { MotionWorkCard } from '@/components/work/MotionWorkCard'
import ArchiveWorkCard from './ArchiveWorkCard'
import WordUGameCard from './WordUGameCard'
import FoundationsTerminal from '@/components/case-study/FoundationsTerminal'
import TestimonialContent from './TestimonialContent'
import FlagshipTheater from '@/components/FlagshipTheater'

import { ERA_TAGS } from './constants'
import { m } from 'framer-motion'
import { Play, ArrowDown } from 'lucide-react'

interface MobileTimelineProps {
    onOpenLightbox: (id: string) => void
    onOpenGameLightbox: () => void
}

export default function MobileTimeline({ onOpenLightbox, onOpenGameLightbox }: MobileTimelineProps) {
    return (
        <div className="relative z-10 w-full pb-32 pt-12">
            {/* ── ACT 2: Full Timeline ── */}
            <div className="px-4 space-y-24">
                {CAREER_DATA.map((era) => (
                    <MobileEraBlock
                        key={era.id}
                        era={era}
                        onOpenLightbox={onOpenLightbox}
                        onOpenGameLightbox={onOpenGameLightbox}
                    />
                ))}
            </div>
        </div>
    )
}

function MobileEraBlock({ era, onOpenLightbox, onOpenGameLightbox }: { era: CareerEra, onOpenLightbox: (id: string) => void, onOpenGameLightbox: () => void }) {
    const startYear = era.period.split('—')[0].trim()
    const hasWorkItems = era.workItems.length > 0
    const hasTestimonials = era.testimonials.length > 0
    const hasFoundations = era.foundations && era.foundations.length > 0
    const hasMilestones = era.milestones && era.milestones.length > 0

    // Detect slide type
    const isInterstitial = hasMilestones && !hasWorkItems && !hasTestimonials && !hasFoundations
    const isTestimonialSlide = hasTestimonials && !hasWorkItems && !hasFoundations

    // INTERSTITIAL — Life Context Only)
    if (isInterstitial) {
        return (
            <m.div
                className="py-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
            >
                {/* Re-using InterstitialContent but ensuring it fits mobile */}
                <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/[0.07] rounded-2xl p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-teal)]/[0.06] via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10 mb-6">
                        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-800 mb-2">Life Context</p>
                        <div className="w-8 h-px bg-[var(--accent-teal)]/30" />
                    </div>

                    <div className="space-y-6">
                        {era.milestones?.map((milestone, i) => {
                            const IconComp = milestone.icon;
                            return (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-zinc-500">
                                        {IconComp && (typeof IconComp === 'string' ? IconComp : <IconComp className="w-5 h-5" />)}
                                    </div>
                                    <div>
                                        <p className="font-mono text-[var(--accent-teal)] text-[10px] tracking-[0.2em] uppercase mb-1">{milestone.year}</p>
                                        <p className="text-white text-sm font-medium leading-tight mb-1">{milestone.title}</p>
                                        <p className="text-zinc-500 text-xs">{milestone.subtitle}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </m.div>
        )
    }

    // TESTIMONIAL SLIDE
    if (isTestimonialSlide) {
        return (
            <m.div
                className="py-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
            >
                <TestimonialContent era={era} />
            </m.div>
        )
    }

    // DEFAULT ERA BLOCK (Work + Context)
    return (
        <m.div
            className="space-y-10 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Watermark Year (Removed to reduce text clutter) */}

            {/* Header */}
            <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-[var(--accent-teal)]" />
                    <span className="font-mono text-[var(--accent-teal)] text-xs tracking-widest">{era.period}</span>
                </div>

                <h2 className="text-3xl xs:text-4xl font-black text-white leading-none tracking-tight">
                    {era.role}
                </h2>
                <div className="text-sm font-mono text-zinc-600 uppercase tracking-wider">
                    {era.company}
                </div>

                {ERA_TAGS[era.id] && (
                    <div className="flex flex-wrap gap-2 pt-1">
                        {ERA_TAGS[era.id].map(tag => (
                            <span key={tag} className="text-[10px] font-mono text-[var(--accent-teal)] border border-[var(--accent-teal)]/30 px-2 py-1 rounded bg-[var(--accent-teal)]/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="pt-2 space-y-3">
                    <p className="text-zinc-200 text-base leading-relaxed">
                        {era.description}
                    </p>
                    {era.secondaryDescription && (
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            {era.secondaryDescription}
                        </p>
                    )}
                </div>

                {/* External Links */}
                {(era.platformUrl || (era.articles && era.articles.length > 0)) && (
                    <div className="flex flex-wrap gap-4 pt-2">
                        {era.platformUrl && (
                            <a href={era.platformUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-[var(--accent-teal)] transition-colors">
                                See Platform ↗
                            </a>
                        )}
                        {era.articles?.map(article => (
                            <a key={article.id} href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-[var(--accent-teal)] transition-colors">
                                {article.title} ↗
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* Work Items */}
            {hasWorkItems && (
                <div className="space-y-8">
                    {era.workItems.map((work) => (
                        <div key={work.id} className="w-full">
                            {era.id === 'agency-startup' || era.id === 'consultant-tech' ? (
                                <div className="aspect-video w-full">
                                    <ArchiveWorkCard work={work} onOpenLightbox={onOpenLightbox} />
                                </div>
                            ) : work.id === 'portfolio-game' ? (
                                <WordUGameCard work={work} onPlay={onOpenGameLightbox} />
                            ) : (
                                <MotionWorkCard work={work} />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Inline Testimonials */}
            {hasTestimonials && (
                <div className="space-y-6 pt-4 border-t border-white/5">
                    <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest block mb-4">SOCIAL PROOF :</span>
                    {era.testimonials.map(testimonial => (
                        <div key={testimonial.id} className="bg-white/[0.03] p-5 rounded-xl border border-white/5 relative">
                            {/*<Quote className="absolute top-4 right-4 w-6 h-6 text-zinc-800" />*/}
                            <p className="text-zinc-200 text-sm leading-relaxed mb-4">&quot;{testimonial.quote}&quot;</p>
                            <div>
                                <div className="text-white text-sm font-bold">{testimonial.name}</div>
                                <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{testimonial.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Foundations Terminal */}
            {hasFoundations && (
                <div className="pt-4">
                    <FoundationsTerminal foundations={era.foundations} />
                </div>
            )}
        </m.div>
    )
}
