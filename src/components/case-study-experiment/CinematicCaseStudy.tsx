'use client'

/**
 * CinematicCaseStudy — Reusable case study shell.
 *
 * Single-scroll experience:  Trailer → ScrollDeck → Full Case Study
 * No toggles. No mode switching. Just scroll.
 *
 * Props:
 * - slides: StorySlide[]           → scroll-driven deck scenes
 * - theme: 'rc' | 'ml' | 'dsml'   → sets CSS --cs-* tokens via data-cs-theme
 * - heroStats: HeroStat[]          → impact metrics below the trailer
 * - actSections: ActSection[]      → scroll nav dots (full view)
 * - children: ReactNode            → full case study content (Acts)
 */

import React, { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { CaseStudyData } from '@/types/caseStudy'
import ViewModeToggle from '@/components/case-study/ViewModeToggle'
import ScrollDeck from '@/components/case-study/ScrollDeck'
import { StorySlide } from '@/components/case-study/StoryDeck'
import { LightboxProvider } from './BentoGrid'


/* ─── Types ─── */

export interface HeroStat {
    label: string
    value: string
    description: string
}

export interface ActSection {
    id: string
    label: string
    title: string
}

export interface CinematicCaseStudyProps {
    data: CaseStudyData
    slides: StorySlide[]
    theme: 'rc' | 'ml' | 'dsml' | 'wordu'
    heroStats: HeroStat[]
    heroBackground?: ReactNode
    actSections?: ActSection[]
    children?: ReactNode
}


/* ─── Component ─── */

export default function CinematicCaseStudy({
    data,
    slides,
    theme,
    heroStats,
    heroBackground,
    actSections,
    children,
}: CinematicCaseStudyProps) {
    const heroRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })
    const opacity = useTransform(heroProgress, [0, 0.6], [1, 0])
    const scale = useTransform(heroProgress, [0, 0.6], [1, 0.96])

    const [activeAct, setActiveAct] = React.useState(actSections?.[0]?.id ?? '')
    const [showProgress, setShowProgress] = React.useState(false)

    React.useEffect(() => {
        if (!actSections?.length) return
        const handleScroll = () => {
            const scrollY = window.scrollY
            setShowProgress(scrollY > window.innerHeight * 0.5)

            // Find current act
            for (let i = actSections.length - 1; i >= 0; i--) {
                const el = document.getElementById(actSections[i].id)
                if (el && el.offsetTop <= scrollY + window.innerHeight / 3) {
                    setActiveAct(actSections[i].id)
                    break
                }
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [actSections])

    return (
        <div data-cs-theme={theme}>
            <LightboxProvider>
                {/* ── Nav Bar (Home + Case Study Dropdown) ── */}
                <ViewModeToggle />

                {/* ── Single Scroll Experience ── */}

                {/* Scroll progress dots removed — cinematic presentation, no deck nav */}

                {/* Scanline overlay */}
                <div className="scanline-overlay fixed inset-0 z-[1] pointer-events-none" aria-hidden="true" />

                {/* ═══ HERO — Trailer + Metadata ═══ */}
                <div className="relative text-white">
                    <motion.section
                        ref={heroRef}
                        className="relative z-10 min-h-[100vh] flex flex-col justify-center px-6 md:px-16 pt-20"
                        style={{ opacity, scale }}
                    >
                        <div className="max-w-[1440px] mx-auto w-full">
                            <h1 className="sr-only">{data.heroTitle}</h1>

                            {/* Trailer — full width, clean and undistracted */}
                            <div className="relative w-full">
                                {heroBackground ? (
                                    <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 aspect-video relative aurora-border">
                                        {heroBackground}
                                    </div>
                                ) : data.coverImage && (
                                    <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-black/50 relative">
                                        <Image
                                            src={data.coverImage.src}
                                            alt={data.coverImage.alt}
                                            width={1920}
                                            height={1080}
                                            priority
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Info bar — metadata left, impact stats right */}
                            <div className="flex items-center justify-between mt-4 md:mt-5">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <span className="text-[var(--cs-accent)] font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
                                        {data.role}
                                    </span>
                                    <span className="text-zinc-600 font-mono text-xs sm:text-sm">•</span>
                                    <span className="text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-widest">
                                        {data.company} • {data.timeframe}
                                    </span>
                                </div>

                                {heroStats.filter(s => s.label !== 'Timeline').length > 0 && (
                                    <div className="flex items-center gap-3 md:gap-5">
                                        {heroStats
                                            .filter(s => s.label !== 'Timeline')
                                            .map((stat, i, arr) => (
                                                <React.Fragment key={i}>
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-white font-bold text-sm md:text-lg lg:text-xl leading-none tracking-tight whitespace-nowrap">
                                                            {stat.value}
                                                        </span>
                                                        <span className="text-[9px] md:text-[10px] uppercase font-mono tracking-widest text-white/40 mt-1">
                                                            {stat.label}
                                                        </span>
                                                    </div>
                                                    {i < arr.length - 1 && (
                                                        <div className="w-px h-6 md:h-8 bg-white/10" />
                                                    )}
                                                </React.Fragment>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.section>
                </div>

                {/* ═══ SCROLL DECK — Story scenes driven by scroll ═══ */}
                <ScrollDeck slides={slides} />

                {/* ═══ FULL CASE STUDY CONTENT ═══ */}
                <div className="relative text-white pb-48">
                    {children}
                </div>
            </LightboxProvider>
        </div>
    )
}
