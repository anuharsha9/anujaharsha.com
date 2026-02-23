'use client'

import React from 'react'
import { CAREER_DATA, CareerEra } from '@/data/career-data'
import HeroSplit from '@/components/home/HeroSplit'
import { MotionWorkCard } from '@/components/work/MotionWorkCard'
import ArchiveWorkCard from './ArchiveWorkCard'
import WordUGameCard from './WordUGameCard'
import FoundationsTerminal from '@/components/case-study/FoundationsTerminal'
import TestimonialContent from './TestimonialContent'

import { ERA_TAGS } from './constants'
import { motion } from 'framer-motion'

interface MobileTimelineProps {
    onOpenLightbox: (id: string) => void
    onOpenGameLightbox: () => void
}

export default function MobileTimeline({ onOpenLightbox, onOpenGameLightbox }: MobileTimelineProps) {
    return (
        <div className="relative z-10 w-full px-4 pb-32 space-y-24 pt-24">
            {CAREER_DATA.map((era, index) => (
                <MobileEraBlock
                    key={era.id}
                    era={era}
                    onOpenLightbox={onOpenLightbox}
                    onOpenGameLightbox={onOpenGameLightbox}
                />
            ))}
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
    const isBrainSlide = era.isBrainSlide === true
    const isHeroIntro = era.isHeroIntro === true
    const isInterstitial = hasMilestones && !hasWorkItems && !hasTestimonials && !hasFoundations
    const isTestimonialSlide = hasTestimonials && !hasWorkItems && !hasFoundations

    // BRAIN SLIDE — on mobile, constrain the brain so it doesn't overflow
    if (isBrainSlide) {
        return (
            <div className="relative w-full h-[70vh] overflow-hidden flex flex-col items-center justify-center">
                <HeroSplit />
            </div>
        )
    }

    // HERO INTRO — modernized to match desktop aesthetic
    if (isHeroIntro) {
        return (
            <motion.div
                className="space-y-10 py-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="text-center space-y-5">
                    <h2 className="text-4xl xs:text-5xl font-extrabold text-white leading-[1.15] tracking-[-0.03em]">
                        <span className="block">13 Years.</span>
                        <span className="bg-gradient-to-r from-[var(--accent-teal)] via-cyan-400 to-white/80 bg-clip-text text-transparent pb-1">
                            One Mission.
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base font-light leading-relaxed max-w-sm mx-auto tracking-wide">
                        {era.description}
                    </p>
                </div>

                {/* Stats Grid — matching desktop layout */}
                <div className="grid grid-cols-2 gap-y-8 gap-x-4 border-t border-white/[0.06] pt-8">
                    {[
                        { value: '50+', label: 'Projects Shipped' },
                        { value: '25M+', label: 'Users on WebFOCUS' },
                        { value: 'Fortune 500', label: 'Clients' },
                        { value: 'Best-in-Class', label: '2025 Dresner Award' },
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center text-center">
                            <div className="text-xl font-black text-white/90 tracking-tight mb-1">{stat.value}</div>
                            <div className="text-[9px] font-mono uppercase tracking-[0.15em] text-slate-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        )
    }

    // INTERSTITIAL (Life Context Only)
    if (isInterstitial) {
        return (
            <motion.div
                className="py-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
            >
                {/* Re-using InterstitialContent but ensuring it fits mobile */}
                <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/[0.07] rounded-2xl p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#078B9C]/[0.06] via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10 mb-6">
                        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/25 mb-2">Life Context</p>
                        <div className="w-8 h-px bg-[#078B9C]/30" />
                    </div>

                    <div className="space-y-6">
                        {era.milestones?.map((milestone, i) => {
                            const IconComp = milestone.icon;
                            return (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50">
                                        {IconComp && (typeof IconComp === 'string' ? IconComp : <IconComp className="w-5 h-5" />)}
                                    </div>
                                    <div>
                                        <p className="font-mono text-[#078B9C] text-[10px] tracking-[0.2em] uppercase mb-1">{milestone.year}</p>
                                        <p className="text-white text-sm font-medium leading-tight mb-1">{milestone.title}</p>
                                        <p className="text-slate-500 text-xs">{milestone.subtitle}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </motion.div>
        )
    }

    // TESTIMONIAL SLIDE
    if (isTestimonialSlide) {
        return (
            <motion.div
                className="py-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
            >
                <TestimonialContent era={era} />
            </motion.div>
        )
    }

    // DEFAULT ERA BLOCK (Work + Context)
    return (
        <motion.div
            className="space-y-10 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Watermark Year (Background) */}
            <div className="absolute -top-12 -left-4 text-[6rem] font-bold text-white/[0.03] select-none font-mono pointer-events-none z-0">
                {startYear}
            </div>

            {/* Header */}
            <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-[#078B9C]" />
                    <span className="font-mono text-[#078B9C] text-xs tracking-widest">{era.period}</span>
                </div>

                <h2 className="text-3xl xs:text-4xl font-black text-white leading-none tracking-tight">
                    {era.role}
                </h2>
                <div className="text-sm font-mono text-white/40 uppercase tracking-wider">
                    {era.company}
                </div>

                {ERA_TAGS[era.id] && (
                    <div className="flex flex-wrap gap-2 pt-1">
                        {ERA_TAGS[era.id].map(tag => (
                            <span key={tag} className="text-[10px] font-mono text-[#078B9C] border border-[#078B9C]/30 px-2 py-1 rounded bg-[#078B9C]/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="pt-2 space-y-3">
                    <p className="text-slate-300 text-base leading-relaxed">
                        {era.description}
                    </p>
                    {era.secondaryDescription && (
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {era.secondaryDescription}
                        </p>
                    )}
                </div>

                {/* External Links */}
                {(era.platformUrl || (era.articles && era.articles.length > 0)) && (
                    <div className="flex flex-wrap gap-4 pt-2">
                        {era.platformUrl && (
                            <a href={era.platformUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-[#078B9C] transition-colors">
                                See Platform ↗
                            </a>
                        )}
                        {era.articles?.map(article => (
                            <a key={article.id} href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-[#078B9C] transition-colors">
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
                    <span className="text-xs font-mono text-white/30 uppercase tracking-widest block mb-4">Feedback</span>
                    {era.testimonials.map(testimonial => (
                        <div key={testimonial.id} className="bg-white/[0.03] p-5 rounded-xl border border-white/5 relative">
                            {/*<Quote className="absolute top-4 right-4 w-6 h-6 text-white/5" />*/}
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">&quot;{testimonial.quote}&quot;</p>
                            <div>
                                <div className="text-white text-sm font-bold">{testimonial.name}</div>
                                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{testimonial.role}</div>
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
        </motion.div>
    )
}
