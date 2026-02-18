'use client'

import React, { useRef, useState } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
    MotionValue,
} from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Quote, Linkedin, Code2, Zap, Play } from 'lucide-react'
import { CAREER_DATA, CareerEra, WorkItem } from '@/data/career-data'
import { MotionWorkCard } from '@/components/work/MotionWorkCard'
import ImageLightbox from '@/components/case-study/ImageLightbox'
import { ARCHIVE_GALLERY_DATA } from '@/data/archive-gallery'
import FoundationsTerminal from '@/components/case-study/FoundationsTerminal'
import WordGameLightbox from '@/components/work/wordu/WordGameLightbox'

const TOTAL = CAREER_DATA.length

// ─── Icon map for skill badges ──────────────────────────────────────────────────
const SKILL_ICONS: Record<string, React.ElementType> = {
    code: Code2,
    zap: Zap,
}

// Tags per era for the cinematic tag pills
const ERA_TAGS: Record<string, string[]> = {
    'design-engineering': ['REACT', 'TYPESCRIPT', 'FRAMER MOTION', 'AI-ORCHESTRATED'],
    'csg-architect': ['ENTERPRISE UX', 'WEBFOCUS', 'DESIGN SYSTEMS', 'AI/ML'],
    'csg-testimonials': ['LEADERSHIP', 'ENGINEERING', 'PRODUCT', 'DATA SCIENCE', 'CUSTOMER'],
    'consultant-tech': ['0-TO-1 PRODUCTS', 'MOBILE', 'EDTECH', 'FIGMA'],
    'agency-startup': ['MOBILE UX', 'ENTERPRISE', 'GAME DESIGN', 'BRAND'],
    'origin-story': ['MS PAINT', 'CORELDRAW', 'PENCIL DRAWING', 'ANIMATION'],
}

// ─── ARCHIVE CARD ───────────────────────────────────────────────────────────────
const ArchiveWorkCard = ({ work, onOpenLightbox }: { work: WorkItem; onOpenLightbox: (id: string) => void }) => {
    const hasGallery = !!ARCHIVE_GALLERY_DATA[work.id];

    const handleClick = (e: React.MouseEvent) => {
        if (hasGallery) {
            e.preventDefault();
            onOpenLightbox(work.id);
        }
    };

    return (
        <a
            href={work.link}
            onClick={handleClick}
            target={work.link.startsWith('http') ? "_blank" : "_self"}
            rel={work.link.startsWith('http') ? "noopener noreferrer" : ""}
            className="group/archive relative bg-slate-900/60 border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.15] hover:shadow-xl hover:shadow-black/30 transition-all duration-300 block h-full aspect-square cursor-pointer"
        >
            {work.image && (
                <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover object-top group-hover/archive:scale-105 transition-transform duration-500"
                />
            )}
            {!work.image && (
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <span className="font-mono text-xs text-white/20 uppercase tracking-widest">{work.tags[0]}</span>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-sans text-lg leading-tight mb-2">
                    {work.title}
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {work.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-white/70 font-mono bg-white/[0.08] px-2 py-1 rounded backdrop-blur-sm border border-white/[0.06]">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            {work.link.startsWith('http') && (
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/10 opacity-0 group-hover/archive:opacity-100 transition-opacity">
                    <ArrowRight className="w-3 h-3 text-white -rotate-45" />
                </div>
            )}
        </a>
    )
}

// ─── WORDU GAME CARD ────────────────────────────────────────────────────────────
const WordUGameCard = ({ work, onPlay }: { work: WorkItem, onPlay: () => void }) => {
    return (
        <a
            href={work.link}
            onClick={(e) => {
                e.preventDefault();
                onPlay();
            }}
            className="group/game relative bg-slate-900/60 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[var(--accent-teal)]/50 hover:shadow-[0_0_30px_rgba(45,212,191,0.2)] transition-all duration-500 block aspect-[4/3] cursor-pointer"
        >
            <div className="absolute inset-0 overflow-hidden">
                {work.image && (
                    <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/game:scale-110"
                    />
                )}
                <div className="absolute inset-0 bg-slate-900/40 group-hover/game:bg-slate-900/20 transition-colors duration-500" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover/game:scale-125 group-hover/game:bg-[var(--accent-teal)] group-hover/game:border-[var(--accent-teal)] transition-all duration-300 shadow-2xl mb-5">
                    <Play className="w-6 h-6 text-white ml-1 fill-current" />
                </div>

                <div className="relative z-10 pointer-events-none">
                    <h3 className="text-3xl font-black text-white mb-2 drop-shadow-lg transform translate-y-2 group-hover/game:translate-y-0 transition-transform duration-300">
                        {work.title}
                    </h3>
                    <p className="text-lg text-slate-200 font-medium opacity-0 transform translate-y-4 group-hover/game:opacity-100 group-hover/game:translate-y-0 transition-all duration-300 delay-100">
                        {work.description}
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 opacity-0 group-hover/game:opacity-100 transition-opacity duration-300 delay-200">
                        <span className="px-3 py-1 rounded-full bg-[var(--accent-teal)]/20 border border-[var(--accent-teal)]/30 text-[var(--accent-teal)] text-xs font-mono uppercase tracking-wider">
                            Click to Play
                        </span>
                    </div>
                </div>
            </div>
        </a>
    )
}

// ─── INTERSTITIAL: Life Context Slide ───────────────────────────────────────────
function InterstitialContent({
    era,
    lineProgress,
    dotOpacities,
    dotScales,
}: {
    era: CareerEra
    lineProgress: MotionValue<number>
    dotOpacities: MotionValue<number>[]
    dotScales: MotionValue<number>[]
}) {
    const milestones = era.milestones || []

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/20 mb-3">
                    Life Context
                </p>
                <div className="w-10 h-px bg-[#078B9C]/40 mx-auto mb-4" />
                <p className="font-mono text-[#078B9C]/60 text-xs tracking-[0.2em] uppercase">
                    {era.period}
                </p>
            </div>

            {/* Centered vertical timeline */}
            <div className="relative w-full max-w-md">
                {/* Background track line */}
                <div className="absolute left-6 sm:left-1/2 sm:-translate-x-[0.5px] top-0 bottom-0 w-px bg-white/[0.06]" />

                {/* Animated cyan line */}
                <div className="absolute left-6 sm:left-1/2 sm:-translate-x-[0.5px] top-0 bottom-0 w-px overflow-hidden">
                    <motion.div
                        className="w-full bg-gradient-to-b from-[#078B9C] to-[#078B9C]/30 origin-top"
                        style={{ height: '100%', scaleY: lineProgress }}
                    />
                </div>

                {/* Milestone items */}
                <div className="space-y-10">
                    {milestones.map((milestone, i) => {
                        const IconComp = milestone.icon;
                        return (
                            <motion.div
                                key={i}
                                className="relative pl-16 sm:pl-0 sm:flex sm:items-center sm:gap-8"
                                style={{ opacity: dotOpacities[i] }}
                            >
                                {/* Glowing dot */}
                                <motion.div
                                    className="absolute left-[18px] sm:left-1/2 sm:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#078B9C] bg-slate-950 z-10"
                                    style={{
                                        scale: dotScales[i],
                                        boxShadow: '0 0 16px rgba(7,139,156,0.5)',
                                    }}
                                >
                                    <div className="absolute inset-[3px] rounded-full bg-[#078B9C]" />
                                </motion.div>

                                {/* Year — left side on desktop */}
                                <div className="hidden sm:block sm:w-1/2 sm:text-right sm:pr-10">
                                    <span className="font-mono text-[#078B9C] text-sm tracking-[0.15em] uppercase">
                                        {milestone.year}
                                    </span>
                                </div>

                                {/* Content — right side on desktop, below on mobile */}
                                <div className="sm:w-1/2 sm:pl-10">
                                    <span className="sm:hidden font-mono text-[#078B9C] text-[10px] tracking-[0.2em] uppercase block mb-1">
                                        {milestone.year}
                                    </span>
                                    <div className="flex items-center gap-2.5 mb-0.5">
                                        {IconComp && (
                                            <div className="shrink-0 w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                                                {typeof IconComp === 'string' ? (
                                                    <span className="text-sm">{IconComp}</span>
                                                ) : (
                                                    <IconComp className="w-3.5 h-3.5 text-white/40" />
                                                )}
                                            </div>
                                        )}
                                        <span className="text-white font-semibold text-base leading-snug">
                                            {milestone.title}
                                        </span>
                                    </div>
                                    {milestone.subtitle && (
                                        <p className="text-slate-500 text-sm mt-0.5 ml-[38px] sm:ml-[38px]">
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
    )
}

// ─── TESTIMONIAL: Typography-driven editorial layout ────────────────────────────
function TestimonialContent({ era }: { era: CareerEra }) {
    const testimonials = era.testimonials
    const primary = testimonials.find(t => t.isPrimary) || testimonials[0]
    const secondary = testimonials.filter(t => t.id !== primary.id)

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-white/40 text-xs tracking-[0.3em] uppercase">Era</span>
                    <div className="w-6 h-px bg-[#078B9C]" />
                    <span className="font-mono text-[#078B9C] text-xs sm:text-sm tracking-[0.2em]">
                        {era.period.split('—')[0].trim()}
                    </span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05] mb-2">
                    {era.role}
                </h2>
                <p className="font-mono text-white/30 text-[11px] sm:text-xs tracking-[0.25em] uppercase">
                    {era.company}
                </p>
            </div>

            {/* ── Hero Quote ── */}
            <div className="relative mb-14">
                {/* Giant decorative quote mark */}
                <div className="absolute -top-6 -left-2 sm:-left-6 pointer-events-none select-none">
                    <span className="text-[120px] sm:text-[160px] leading-none font-serif text-white/[0.04] font-bold">
                        &ldquo;
                    </span>
                </div>

                <blockquote className="relative z-10 pl-1 sm:pl-4">
                    <p className="font-sans text-2xl sm:text-3xl md:text-4xl text-white/90 leading-[1.4] sm:leading-[1.35] font-light tracking-[-0.01em] max-w-3xl">
                        {primary.quote}
                    </p>
                    <cite className="not-italic mt-8 block">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-px bg-[#078B9C]/50" />
                            <span className="text-white font-bold text-base tracking-wide">
                                {primary.name}
                            </span>
                            {primary.linkedInProfile && (
                                <Link href={primary.linkedInProfile} target="_blank" className="text-slate-500 hover:text-[#0077b5] transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                        <span className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em] ml-[52px] block mt-1">
                            {primary.role}, {primary.company}
                        </span>
                        <span className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.15em] ml-[52px] block mt-0.5">
                            {primary.relationship}
                        </span>
                    </cite>
                </blockquote>
            </div>

            {/* ── Secondary Quotes — flowing editorial grid ── */}
            {secondary.length > 0 && (
                <div className="border-t border-white/[0.06] pt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {secondary.map((testimonial, i) => (
                            <div key={testimonial.id} className="group/q">
                                <p className={`font-sans text-slate-300 leading-[1.6] mb-4 ${i === 0 ? 'text-lg' : 'text-base'}`}>
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-5 h-px bg-white/10 group-hover/q:bg-[#078B9C]/50 transition-colors" />
                                    <span className="text-white/80 font-semibold text-sm">
                                        {testimonial.name}
                                    </span>
                                    {testimonial.linkedInProfile && (
                                        <Link href={testimonial.linkedInProfile} target="_blank" className="text-slate-600 hover:text-[#0077b5] transition-colors">
                                            <Linkedin className="w-3 h-3" />
                                        </Link>
                                    )}
                                </div>
                                <span className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.15em] ml-[30px] block mt-0.5">
                                    {testimonial.role}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

// ─── INDIVIDUAL SLIDE ──────────────────────────────────────────────────────────

function TimelineSlide({
    era,
    index,
    scrollYProgress,
    onOpenLightbox,
    onOpenGameLightbox,
}: {
    era: CareerEra
    index: number
    scrollYProgress: MotionValue<number>
    onOpenLightbox: (id: string) => void
    onOpenGameLightbox: () => void
}) {
    const total = TOTAL
    const rangeStart = index / total
    const rangeEnd = (index + 1) / total
    const transitionZone = 0.02

    const fadeIn = rangeStart + transitionZone
    const fadeOut = rangeEnd - transitionZone

    // ── Opacity ──
    const opacity = useTransform(scrollYProgress, (v: number) => {
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

    // ── Scale ──
    const scale = useTransform(scrollYProgress, (v: number) => {
        if (index === 0) {
            if (v <= fadeOut) return 1
            if (v >= rangeEnd) return 0.95
            return 1 - 0.05 * ((v - fadeOut) / (rangeEnd - fadeOut))
        }
        if (index === total - 1) {
            if (v <= rangeStart) return 1.05
            if (v >= fadeIn) return 1
            return 1.05 - 0.05 * ((v - rangeStart) / (fadeIn - rangeStart))
        }
        if (v <= rangeStart) return 1.05
        if (v <= fadeIn) return 1.05 - 0.05 * ((v - rangeStart) / (fadeIn - rangeStart))
        if (v <= fadeOut) return 1
        if (v <= rangeEnd) return 1 - 0.05 * ((v - fadeOut) / (rangeEnd - fadeOut))
        return 0.95
    })

    // ── Blur ──
    const filter = useTransform(opacity, (v: number) =>
        `blur(${((1 - v) * 12).toFixed(1)}px)`
    )

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
            style={{ opacity, scale, filter, pointerEvents }}
        >
            {/* Large watermark year */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                aria-hidden
            >
                <span className="text-[18vw] lg:text-[16vw] font-bold text-white/[0.03] tracking-tighter leading-none font-mono">
                    {startYear}
                </span>
            </div>

            <div className="relative w-full max-w-[1440px] mx-auto overflow-y-auto max-h-[85vh] scrollbar-hide">
                {/* ═══ INTERSTITIAL: Life Context ═══ */}
                {isInterstitial ? (
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
                                    <span className="font-mono text-white/40 text-xs tracking-[0.3em] uppercase">ERA</span>
                                    <div className="w-6 h-px bg-[#078B9C]" />
                                    <span className="font-mono text-[#078B9C] text-xs sm:text-sm tracking-[0.2em]">
                                        {era.period}
                                    </span>
                                    <span className="font-mono text-white/20 text-xs">·</span>
                                    <span className="font-mono text-white/30 text-[11px] sm:text-xs tracking-[0.2em] uppercase">
                                        {era.company}
                                    </span>
                                </div>

                                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
                                    {era.role}
                                </h2>
                            </div>

                            {/* Description */}
                            <div className="space-y-2 max-w-xl">
                                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                                    {era.description}
                                </p>
                                {era.secondaryDescription && (
                                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                                        {era.secondaryDescription}
                                    </p>
                                )}

                                {/* Platform proof link + article links */}
                                {(era.platformUrl || (era.articles && era.articles.length > 0)) && (
                                    <div className="flex items-center gap-x-3 mt-2 flex-nowrap overflow-x-auto">
                                        {era.platformUrl && (
                                            <a
                                                href={era.platformUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-[#078B9C] transition-colors duration-300 whitespace-nowrap shrink-0"
                                            >
                                                See the platform
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        )}
                                        {era.articles && era.articles.map((article, i) => (
                                            <span key={article.id} className="inline-flex items-center gap-x-3 shrink-0">
                                                <span className="text-white/15 text-xs">·</span>
                                                <a
                                                    href={article.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-[#078B9C] transition-colors duration-300 whitespace-nowrap"
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
                                <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4">
                                    <div className="md:row-span-2">
                                        <MotionWorkCard work={era.workItems[0]} fillHeight />
                                    </div>
                                    <div>
                                        <MotionWorkCard work={era.workItems[1]} compact />
                                    </div>
                                    <div>
                                        <MotionWorkCard work={era.workItems[2]} compact />
                                    </div>
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
                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#078B9C]/40 via-[#078B9C]/20 to-transparent" />
                                            <div className="pl-6">
                                                <p className="font-sans text-lg md:text-xl text-slate-200/90 leading-relaxed mb-5 font-light">
                                                    &ldquo;{era.testimonials[0].quote}&rdquo;
                                                </p>
                                                <cite className="not-italic flex items-center gap-3">
                                                    <div className="w-5 h-px bg-white/10" />
                                                    <span className="text-white font-semibold text-sm">{era.testimonials[0].name}</span>
                                                    {era.testimonials[0].linkedInProfile && (
                                                        <Link href={era.testimonials[0].linkedInProfile} target="_blank" className="text-slate-500 hover:text-[#0077b5] transition-colors">
                                                            <Linkedin className="w-3.5 h-3.5" />
                                                        </Link>
                                                    )}
                                                </cite>
                                                <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider ml-[30px] block mt-1">
                                                    {era.testimonials[0].role}, {era.testimonials[0].company}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {era.testimonials.map((testimonial) => (
                                                <div key={testimonial.id} className="bg-white/[0.02] border border-white/5 p-5 rounded-xl relative overflow-hidden group/quote">
                                                    <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5 group-hover/quote:text-[#078B9C]/10 transition-colors" />
                                                    <blockquote className="relative z-10">
                                                        <p className="font-sans text-sm text-slate-200 leading-relaxed mb-4">
                                                            &ldquo;{testimonial.quote}&rdquo;
                                                        </p>
                                                        <cite className="not-italic flex flex-col gap-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-white font-bold text-sm">{testimonial.name}</span>
                                                                {testimonial.linkedInProfile && (
                                                                    <Link href={testimonial.linkedInProfile} target="_blank" className="text-slate-500 hover:text-[#0077b5] transition-colors">
                                                                        <Linkedin className="w-3 h-3" />
                                                                    </Link>
                                                                )}
                                                            </div>
                                                            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">
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
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#078B9C]/[0.06] via-transparent to-transparent rounded-2xl pointer-events-none" />

                                    {/* Card header */}
                                    <div className="relative z-10 mb-6">
                                        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/25 mb-2">
                                            Life Context
                                        </p>
                                        <div className="w-8 h-px bg-[#078B9C]/30" />
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
                                                    stroke="rgba(255,255,255,0.05)"
                                                    strokeWidth="1"
                                                />
                                                {/* Animated cyan line */}
                                                <motion.line
                                                    x1="1"
                                                    y1="0"
                                                    x2="1"
                                                    y2="100%"
                                                    stroke="#078B9C"
                                                    strokeWidth="1.5"
                                                    style={{ pathLength: lineProgress }}
                                                />
                                            </svg>

                                            {/* Pulsing dots */}
                                            {milestones.map((_, i) => {
                                                const yPct = ((i + 0.5) / milestones.length) * 100
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute rounded-full bg-[#078B9C]"
                                                        style={{
                                                            width: 10,
                                                            height: 10,
                                                            left: '50%',
                                                            top: `${yPct}%`,
                                                            x: '-50%',
                                                            y: '-50%',
                                                            opacity: dotOpacities[i],
                                                            scale: dotScales[i],
                                                            boxShadow: '0 0 14px rgba(7,139,156,0.7)',
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
                                                                    <IconComp className="w-4 h-4 text-white/50" />
                                                                )}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="font-mono text-[#078B9C] text-[10px] tracking-[0.25em] uppercase">
                                                                {milestone.year}
                                                            </p>
                                                            <p className="text-white/80 text-sm font-medium leading-snug">
                                                                {milestone.title}
                                                            </p>
                                                            {milestone.subtitle && (
                                                                <p className="text-slate-500 text-xs leading-relaxed">
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

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function CinematicTimeline() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    // Lightbox State
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [gameLightboxOpen, setGameLightboxOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [activeProjectImages, setActiveProjectImages] = useState<Array<{ src: string, alt: string }>>([])

    const handleOpenLightbox = (workId: string) => {
        if (workId === 'portfolio-game') {
            setGameLightboxOpen(true)
            return
        }
        const images = ARCHIVE_GALLERY_DATA[workId]
        if (images && images.length > 0) {
            setActiveProjectImages(images)
            setCurrentImageIndex(0)
            setLightboxOpen(true)
        }
    }

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        setCurrentIndex(Math.min(Math.floor(v * TOTAL), TOTAL - 1))
    })

    return (
        <>
            <div
                ref={containerRef}
                id="work-overview"
                className="relative"
                style={{ height: `${(TOTAL + 1) * 100}vh` }}
            >
                {/* ── Sticky Stage ── */}
                <div className="sticky top-0 h-screen overflow-hidden">
                    {/* Subtle radial gradient for depth */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(7,139,156,0.08),transparent)]" />

                    {/* All slides (absolutely positioned, one visible at a time) */}
                    {CAREER_DATA.map((era, i) => (
                        <TimelineSlide
                            key={era.id}
                            era={era}
                            index={i}
                            scrollYProgress={scrollYProgress}
                            onOpenLightbox={handleOpenLightbox}
                            onOpenGameLightbox={() => setGameLightboxOpen(true)}
                        />
                    ))}

                    {/* ── Slide counter (bottom-right) ── */}
                    <div className="absolute bottom-8 right-8 z-30 font-mono text-sm tracking-wider select-none">
                        <span className="text-white/50">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-white/15 mx-1">/</span>
                        <span className="text-white/15">
                            {String(TOTAL).padStart(2, '0')}
                        </span>
                    </div>

                    {/* ── Scroll prompt (first slide only) ── */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
                        animate={{ opacity: currentIndex === 0 ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="text-white/25 text-[11px] font-mono uppercase tracking-[0.2em]">
                            Scroll to explore
                        </span>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <svg
                                className="w-5 h-5 text-white/20"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M19 14l-7 7-7-7"
                                />
                            </svg>
                        </motion.div>
                    </motion.div>

                    {/* ── Side progress dots ── */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
                        {CAREER_DATA.map((_, i) => (
                            <div
                                key={i}
                                className={`rounded-full transition-all duration-500 ${i === currentIndex
                                    ? 'w-2 h-2 bg-[#078B9C] shadow-[0_0_10px_rgba(7,139,156,0.6)]'
                                    : i < currentIndex
                                        ? 'w-1.5 h-1.5 bg-white/20'
                                        : 'w-1.5 h-1.5 bg-white/8'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <ImageLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                imageSrc={activeProjectImages[currentImageIndex]?.src || ''}
                imageAlt={activeProjectImages[currentImageIndex]?.alt || ''}
                images={activeProjectImages}
                currentIndex={currentImageIndex}
                onNavigate={setCurrentImageIndex}
            />

            {/* WordU Game Lightbox */}
            <WordGameLightbox
                isOpen={gameLightboxOpen}
                onClose={() => setGameLightboxOpen(false)}
            />
        </>
    )
}
