'use client'

import React from 'react'
import { motion, useTransform, MotionValue } from 'framer-motion'
import Link from 'next/link'
import { Quote, Linkedin } from 'lucide-react'
import { MotionWorkCard } from '@/components/work/MotionWorkCard'
import { CAREER_DATA, CareerEra } from '@/data/career-data'
import FoundationsTerminal from '@/components/case-study/FoundationsTerminal'
import ArchiveWorkCard from './ArchiveWorkCard'
import WordUGameCard from './WordUGameCard'
import InterstitialContent from './InterstitialContent'
import TestimonialContent from './TestimonialContent'
import { ERA_TAGS } from './constants'

const TOTAL = CAREER_DATA.length

interface TimelineSlideProps {
    era: CareerEra
    index: number
    scrollYProgress: MotionValue<number>
    onOpenLightbox: (id: string) => void
    onOpenGameLightbox: () => void
}

export default function TimelineSlide({
    era,
    index,
    scrollYProgress,
    onOpenLightbox,
    onOpenGameLightbox,
}: TimelineSlideProps) {
    const total = TOTAL
    const rangeStart = index / total
    const rangeEnd = (index + 1) / total
    const transitionZone = 0.05 // increased for slower, more dramatic transitions

    const fadeIn = rangeStart + transitionZone
    const fadeOut = rangeEnd - transitionZone

    // ── Opacity (smoother ease-in-out for dramatic effect) ──
    const rawOpacity = useTransform(scrollYProgress, (v: number) => {
        if (index === 0) {
            if (v <= fadeOut) return 1
            if (v >= rangeEnd) return 0
            return 1 - (v - fadeOut) / (rangeEnd - fadeOut)
        }
        if (index === total - 1) {
            if (v <= rangeStart) return 0
            if (v >= fadeIn) return 1
            return (v - rangeStart) / (fadeIn - rangeStart)
        }
        if (v <= rangeStart) return 0
        if (v <= fadeIn) return (v - rangeStart) / (fadeIn - rangeStart)
        if (v <= fadeOut) return 1
        if (v <= rangeEnd) return 1 - (v - fadeOut) / (rangeEnd - fadeOut)
        return 0
    })

    const opacity = useTransform(rawOpacity, (v: number) => {
        // quadratic ease-in-out (smoother than cubic)
        return v < 0.5
            ? 2 * v * v
            : 1 - Math.pow(-2 * v + 2, 2) / 2
    })

    // ── Scale (aggressive zoom: 0.7 → 1 → 1.15) ──
    const scale = useTransform(scrollYProgress, (v: number) => {
        if (index === 0) {
            if (v <= fadeOut) return 1
            if (v >= rangeEnd) return 1.15
            const t = (v - fadeOut) / (rangeEnd - fadeOut)
            return 1 + 0.15 * t * t // quadratic ease-in for accelerating zoom
        }
        if (index === total - 1) {
            if (v <= rangeStart) return 0.7
            if (v >= fadeIn) return 1
            const t = (v - rangeStart) / (fadeIn - rangeStart)
            return 0.7 + 0.3 * (1 - Math.pow(1 - t, 2)) // quadratic ease-out (softer)
        }
        if (v <= rangeStart) return 0.7
        if (v <= fadeIn) {
            const t = (v - rangeStart) / (fadeIn - rangeStart)
            return 0.7 + 0.3 * (1 - Math.pow(1 - t, 2)) // quadratic ease-out — swoops in softer
        }
        if (v <= fadeOut) return 1
        if (v <= rangeEnd) {
            const t = (v - fadeOut) / (rangeEnd - fadeOut)
            return 1 + 0.15 * t * t // quadratic ease-in — accelerating push away
        }
        return 1.15
    })

    // ── Vertical sweep (slides rise from +80px, exit to -60px) ──
    const translateY = useTransform(scrollYProgress, (v: number) => {
        if (index === 0) {
            if (v <= fadeOut) return 0
            if (v >= rangeEnd) return -60
            const t = (v - fadeOut) / (rangeEnd - fadeOut)
            return -60 * t * t
        }
        if (index === total - 1) {
            if (v <= rangeStart) return 80
            if (v >= fadeIn) return 0
            const t = (v - rangeStart) / (fadeIn - rangeStart)
            return 80 * Math.pow(1 - t, 2) // soft landing (decelerate to 0)
        }
        if (v <= rangeStart) return 80
        if (v <= fadeIn) {
            const t = (v - rangeStart) / (fadeIn - rangeStart)
            return 80 * Math.pow(1 - t, 2) // soft landing (decelerate to 0)
        }
        if (v <= fadeOut) return 0
        if (v <= rangeEnd) {
            const t = (v - fadeOut) / (rangeEnd - fadeOut)
            return -60 * t * t // ease-in: pushes up on exit
        }
        return -60
    })

    // ── 3D Rotation (subtle rotateX for depth) ──
    const rotateX = useTransform(scrollYProgress, (v: number) => {
        if (index === 0) {
            if (v <= fadeOut) return 0
            if (v >= rangeEnd) return -4
            const t = (v - fadeOut) / (rangeEnd - fadeOut)
            return -4 * t
        }
        if (v <= rangeStart) return 6
        if (v <= fadeIn) {
            const t = (v - rangeStart) / (fadeIn - rangeStart)
            return 6 * (1 - t)
        }
        if (v <= fadeOut) return 0
        if (v <= rangeEnd) {
            const t = (v - fadeOut) / (rangeEnd - fadeOut)
            return -4 * t
        }
        return 0
    })

    // ── Cinematic filter (heavy blur + hue-rotate + skew on fade) ──
    const filter = useTransform(opacity, (v: number) => {
        if (v > 0.98) return 'none' // perf: skip filter at full opacity
        const intensity = 1 - v
        const blur = (intensity * 28).toFixed(1)
        const hue = (intensity * 90).toFixed(0)
        const skew = (intensity * 6).toFixed(1)
        const brightness = (1 + intensity * 0.3).toFixed(2) // slight overexpose on fade
        return `blur(${blur}px) hue-rotate(${hue}deg) skewX(${skew}deg) brightness(${brightness})`
    })

    // ── Pointer events ──
    const pointerEvents = useTransform(opacity, (v: number) =>
        v > 0.5 ? 'auto' : 'none'
    )

    // ── Line draw progress (for milestones) ──
    const lineProgress = useTransform(scrollYProgress, (v: number) => {
        if (v <= rangeStart) return 0
        if (v >= rangeEnd - 0.02) return 1
        return (v - rangeStart) / (rangeEnd - 0.02 - rangeStart)
    })

    // ── Dot opacities (pre-allocate 5 hooks — static count, no conditional) ──
    const milestones = era.milestones || []
    const dot0 = useTransform(lineProgress, (v: number) => Number(v > 0.12 ? 1 : 0.12))
    const dot1 = useTransform(lineProgress, (v: number) => Number(v > 0.30 ? 1 : 0.12))
    const dot2 = useTransform(lineProgress, (v: number) => Number(v > 0.50 ? 1 : 0.12))
    const dot3 = useTransform(lineProgress, (v: number) => Number(v > 0.70 ? 1 : 0.12))
    const dot4 = useTransform(lineProgress, (v: number) => Number(v > 0.85 ? 1 : 0.12))
    const dotOpacities: MotionValue<number>[] = [dot0, dot1, dot2, dot3, dot4]

    // ── Dot scales ──
    const ds0 = useTransform(lineProgress, [0, 0.10, 0.16, 0.24], [0.5, 0.5, 1.4, 1])
    const ds1 = useTransform(lineProgress, [0.24, 0.28, 0.34, 0.42], [0.5, 0.5, 1.4, 1])
    const ds2 = useTransform(lineProgress, [0.42, 0.48, 0.54, 0.62], [0.5, 0.5, 1.4, 1])
    const ds3 = useTransform(lineProgress, [0.62, 0.68, 0.74, 0.82], [0.5, 0.5, 1.4, 1])
    const ds4 = useTransform(lineProgress, [0.78, 0.83, 0.88, 0.96], [0.5, 0.5, 1.4, 1])
    const dotScales = [ds0, ds1, ds2, ds3, ds4]

    const startYear = era.period.split('—')[0].trim()
    const hasWorkItems = era.workItems.length > 0
    const hasTestimonials = era.testimonials.length > 0
    const hasFoundations = era.foundations && era.foundations.length > 0
    const hasMilestones = milestones.length > 0

    // ── Detect slide type ──
    const isInterstitial = hasMilestones && !hasWorkItems && !hasTestimonials && !hasFoundations
    const isTestimonialSlide = hasTestimonials && !hasWorkItems && !hasFoundations

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16"
            style={{
                opacity,
                scale,
                y: translateY,
                rotateX,
                filter,
                pointerEvents,
                perspective: 1200,
                transformStyle: 'preserve-3d' as const,
                willChange: 'transform, opacity, filter',
            }}
        >
            {/* Large watermark year removed to reduce text clutter */}
            <div className="relative w-full max-w-[1440px] mx-auto overflow-y-auto max-h-[85vh] scrollbar-hide">
                {isInterstitial ? (
                    /* ═══ INTERSTITIAL: Life Context ═══ */
                    <InterstitialContent
                        era={era}
                        lineProgress={lineProgress}
                        dotOpacities={dotOpacities}
                        dotScales={dotScales}
                    />
                ) : isTestimonialSlide ? (
                    /* ═══ TESTIMONIAL: Typography-driven layout ═══ */
                    <TestimonialContent era={era} />
                ) : (
                    /* ═══ DEFAULT: Work-focused layout ═══ */
                    <div className={`grid ${hasMilestones ? 'grid-cols-1 lg:grid-cols-[1fr_320px]' : 'grid-cols-1'} gap-8 lg:gap-12 items-start`}>
                        {/* ── LEFT: Main Content ── */}
                        <div className="space-y-8">
                            {/* Era label + role header */}
                            <div className="space-y-3">
                                {/* ERA — YEAR · Company */}
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-zinc-600 text-xs tracking-[0.3em] uppercase">ERA</span>
                                    <div className="w-6 h-px bg-[var(--accent-teal)]" />
                                    <span className="font-mono text-[var(--accent-teal)] text-xs sm:text-sm tracking-[0.2em]">
                                        {era.period}
                                    </span>
                                    <span className="font-mono text-zinc-800 text-xs">·</span>
                                    <span className="font-mono text-zinc-600 text-[11px] sm:text-xs tracking-[0.2em] uppercase">
                                        {era.company}
                                    </span>
                                </div>


                                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
                                    {era.role}
                                </h2>

                                {/* Era Tags */}
                                {ERA_TAGS[era.id] && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {ERA_TAGS[era.id].map(tag => (
                                            <span key={tag} className="text-[10px] font-mono text-[var(--accent-teal)] border border-[var(--accent-teal)]/30 px-2 py-1 rounded bg-[var(--accent-teal)]/5 tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                            </div>

                            {/* Description removed completely to reduce clutter */}
                            <div className="space-y-2 max-w-xl">
                                {/* Platform proof link + article links */}
                                {(era.platformUrl || (era.articles && era.articles.length > 0)) && (
                                    <div className="flex items-center gap-x-3 mt-2 flex-nowrap overflow-x-auto">
                                        {era.platformUrl && (
                                            <a
                                                href={era.platformUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-[var(--accent-teal)] transition-colors duration-300 whitespace-nowrap shrink-0"
                                            >
                                                See the platform
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        )}
                                        {era.articles && era.articles.map((article, i) => (
                                            <span key={article.id} className="inline-flex items-center gap-x-3 shrink-0">
                                                <span className="text-zinc-800 text-xs">·</span>
                                                <a
                                                    href={article.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-[var(--accent-teal)] transition-colors duration-300 whitespace-nowrap"
                                                >
                                                    {article.title}
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>


                            {/* ── WORK ITEMS (Project Cards) ── */}
                            {hasWorkItems && era.id === 'csg-architect' ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {era.workItems.map((work) => (
                                        <div key={work.id}>
                                            <MotionWorkCard work={work} variant="editorial" compact />
                                        </div>
                                    ))}
                                </div>
                            ) : hasWorkItems ? (
                                <div className={`grid gap-6 ${era.workItems.length === 1
                                    ? (era.workItems[0].id === 'portfolio-game' ? 'grid-cols-1 max-w-[28rem]' : 'grid-cols-1 max-w-sm')
                                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                    }`}>
                                    {era.workItems.map((work) => (
                                        <div key={work.id}>
                                            {era.id === 'agency-startup' || era.id === 'consultant-tech' ? (
                                                <ArchiveWorkCard work={work} onOpenLightbox={onOpenLightbox} />
                                            ) : work.id === 'portfolio-game' ? (
                                                <WordUGameCard work={work} onPlay={onOpenGameLightbox} />
                                            ) : (
                                                <MotionWorkCard work={work} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : null}



                            {/* ── TESTIMONIALS (inline, for eras that still have them) ── */}
                            {hasTestimonials && (
                                <div className="space-y-4 pt-4">
                                    {era.testimonials.length === 1 ? (
                                        <div className="relative overflow-hidden group/quote max-w-2xl">
                                            {/* Subtle left accent */}
                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-teal)]/40 via-[var(--accent-teal)]/20 to-transparent" />
                                            <div className="pl-6">
                                                <p className="font-sans text-lg md:text-xl text-zinc-200/90 leading-relaxed mb-5 font-light">
                                                    &ldquo;{era.testimonials[0].quote}&rdquo;
                                                </p>
                                                <cite className="not-italic flex items-center gap-3">
                                                    <div className="w-5 h-px bg-white/10" />
                                                    <span className="text-white font-semibold text-sm">{era.testimonials[0].name}</span>
                                                    {era.testimonials[0].linkedInProfile && (
                                                        <Link href={era.testimonials[0].linkedInProfile} target="_blank" className="text-zinc-500 hover:text-[var(--brand-linkedin)] transition-colors">
                                                            <Linkedin className="w-3.5 h-3.5" />
                                                        </Link>
                                                    )}
                                                </cite>
                                                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider ml-[30px] block mt-1">
                                                    {era.testimonials[0].role}, {era.testimonials[0].company}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {era.testimonials.map((testimonial) => (
                                                <div key={testimonial.id} className="bg-white/[0.02] border border-white/5 p-5 rounded-xl relative overflow-hidden group/quote">
                                                    <Quote className="absolute top-4 right-4 w-8 h-8 text-zinc-800 group-hover/quote:text-[var(--accent-teal)]/10 transition-colors" />
                                                    <blockquote className="relative z-10">
                                                        <p className="font-sans text-sm text-zinc-200 leading-relaxed mb-4">
                                                            &ldquo;{testimonial.quote}&rdquo;
                                                        </p>
                                                        <cite className="not-italic flex flex-col gap-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-white font-bold text-sm">{testimonial.name}</span>
                                                                {testimonial.linkedInProfile && (
                                                                    <Link href={testimonial.linkedInProfile} target="_blank" className="text-zinc-500 hover:text-[var(--brand-linkedin)] transition-colors">
                                                                        <Linkedin className="w-3 h-3" />
                                                                    </Link>
                                                                )}
                                                            </div>
                                                            <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-wider">
                                                                {testimonial.role}, {testimonial.company}
                                                            </span>
                                                        </cite>
                                                    </blockquote>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ── FOUNDATIONS TERMINAL (Origin Story) ── */}
                            {hasFoundations && (
                                <div className="pt-4">
                                    <FoundationsTerminal foundations={era.foundations} />
                                </div>
                            )}
                        </div>

                        {/* ── RIGHT SIDEBAR: Life Context (only for eras with milestones + work, e.g. origin) ── */}
                        {hasMilestones && (
                            <div className="relative lg:sticky lg:top-[15vh]">
                                <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/[0.07] rounded-2xl p-6 lg:p-8 overflow-hidden">
                                    {/* Gradient accent */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-teal)]/[0.06] via-transparent to-transparent rounded-2xl pointer-events-none" />

                                    {/* Card header */}
                                    <div className="relative z-10 mb-6">
                                        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-800 mb-2">
                                            Life Context
                                        </p>
                                        <div className="w-8 h-px bg-[var(--accent-teal)]/30" />
                                    </div>

                                    {/* Animated line + nodes */}
                                    <div className="relative z-10 pl-10">
                                        {/* Vertical line container */}
                                        <div className="absolute left-0 top-0 bottom-0 w-8 flex justify-center">
                                            <svg
                                                className="h-full w-[2px] overflow-visible"
                                                preserveAspectRatio="none"
                                            >
                                                {/* Background track */}
                                                <line
                                                    x1="1"
                                                    y1="0"
                                                    x2="1"
                                                    y2="100%"
                                                    stroke="var(--overlay-white-05)"
                                                    strokeWidth="1"
                                                />
                                                {/* Animated cyan line — neon glow */}
                                                <motion.line
                                                    x1="1"
                                                    y1="0"
                                                    x2="1"
                                                    y2="100%"
                                                    stroke="var(--accent-teal)"
                                                    strokeWidth="1.5"
                                                    className="neon-line-glow"
                                                    style={{ pathLength: lineProgress }}
                                                />
                                            </svg>

                                            {/* Pulsing dots */}
                                            {milestones.map((_, i) => {
                                                const yPct = ((i + 0.5) / milestones.length) * 100
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute rounded-full bg-[var(--accent-teal)]"
                                                        style={{
                                                            width: 10,
                                                            height: 10,
                                                            left: '50%',
                                                            top: `${yPct}%`,
                                                            x: '-50%',
                                                            y: '-50%',
                                                            opacity: dotOpacities[i],
                                                            scale: dotScales[i],
                                                            boxShadow: '0 0 14px var(--overlay-accent-70)',
                                                        }}
                                                    />
                                                )
                                            })}
                                        </div>

                                        {/* Milestone items */}
                                        <div className="space-y-7">
                                            {milestones.map((milestone, i) => {
                                                const IconComp = milestone.icon;
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        className="space-y-1 flex items-start gap-3"
                                                        style={{ opacity: dotOpacities[i] }}
                                                    >
                                                        {/* Icon */}
                                                        {IconComp && (
                                                            <div className="shrink-0 w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                                                                {typeof IconComp === 'string' ? (
                                                                    <span className="text-sm">{IconComp}</span>
                                                                ) : (
                                                                    <IconComp className="w-4 h-4 text-zinc-500" />
                                                                )}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="font-mono text-[var(--accent-teal)] text-[10px] tracking-[0.25em] uppercase">
                                                                {milestone.year}
                                                            </p>
                                                            <p className="text-zinc-200 text-sm font-medium leading-snug">
                                                                {milestone.title}
                                                            </p>
                                                            {milestone.subtitle && (
                                                                <p className="text-zinc-500 text-xs leading-relaxed">
                                                                    {milestone.subtitle}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div >
    )
}
