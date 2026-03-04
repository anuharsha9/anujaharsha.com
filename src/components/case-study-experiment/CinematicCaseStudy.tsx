'use client'

/**
 * CinematicCaseStudy — Reusable case study shell.
 *
 * ZERO hardcoded content. Everything is prop-driven:
 * - slides: StorySlide[]           → presentation mode content
 * - theme: 'rc' | 'ml' | 'dsml'   → sets CSS --cs-* tokens via data-cs-theme
 * - heroStats: HeroStat[]          → the 3 stats in the hero
 * - actSections: ActSection[]      → scroll nav dots (full view)
 * - children: ReactNode            → full view content (Acts)
 *
 * Design tokens consumed: --cs-accent, --cs-accent-rgb, --cs-bg-radial, etc.
 */

import React, { useRef, useState, useCallback, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CaseStudyData } from '@/types/caseStudy'
import FloatingOrbs from '@/components/ui/FloatingOrbs'
import ViewModeToggle from '@/components/case-study/ViewModeToggle'
import StoryDeck, { StorySlide } from '@/components/case-study/StoryDeck'
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
    const router = useRouter()
    const hasFullView = !!children
    const [viewMode, setViewMode] = useState<'full' | 'presentation'>('presentation')

    // Scroll to top when switching view modes so content is visible
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [viewMode])

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

    const handlePresentationClose = useCallback(() => {
        router.push('/#work-overview')
    }, [router])

    return (
        <div data-cs-theme={theme}>
            <LightboxProvider>
                {/* ── Sticky Nav with View Mode Toggle ── */}
                <ViewModeToggle
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    hasPresentation={true}
                />

                {/* ── Presentation Mode — StoryDeck Carousel ── */}
                {viewMode === 'presentation' && (
                    <StoryDeck
                        slides={slides}
                        onExit={() => setViewMode('full')}
                        onClose={handlePresentationClose}
                        embedded
                    />
                )}

                {/* ── Full Cinematic Case Study ── */}
                <div style={{ display: viewMode === 'presentation' ? 'none' : 'contents' }}>
                    <div className="bg-[var(--bg-cinematic)] relative min-h-screen text-white overflow-hidden pb-48">
                        {/* Background */}
                        <div className="scanline-overlay" aria-hidden="true" />
                        <div className="fixed inset-0 z-0 pointer-events-none">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--cs-bg-radial),transparent)]" />
                            <div
                                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                    backgroundSize: '128px 128px',
                                }}
                            />
                        </div>
                        <FloatingOrbs />

                        {/* ═══ SCROLL PROGRESS DOTS ═══ */}
                        {actSections && actSections.length > 0 && (
                            <nav
                                className={`fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 transition-opacity duration-500 ${showProgress ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                aria-label="Case study navigation"
                            >
                                {actSections.map((act) => (
                                    <a
                                        key={act.id}
                                        href={`#${act.id}`}
                                        className="group flex items-center gap-2 transition-all duration-300"
                                        title={act.title}
                                    >
                                        <span className={`block rounded-full transition-all duration-300 ${activeAct === act.id
                                            ? 'w-2.5 h-2.5 bg-[var(--cs-accent)] shadow-[0_0_8px_var(--cs-accent-glow)]'
                                            : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/40'
                                            }`} />
                                        <span className={`text-[9px] font-mono tracking-widest uppercase transition-all duration-300 ${activeAct === act.id ? 'text-[var(--cs-accent)] opacity-100' : 'text-white/0 group-hover:text-white/50'}`}>
                                            {act.label}
                                        </span>
                                    </a>
                                ))}
                            </nav>
                        )}

                        {/* ═══ HERO ═══ */}
                        <motion.section
                            ref={heroRef}
                            className="relative z-10 min-h-[100vh] flex flex-col justify-center px-6 md:px-16 pt-20 sticky top-[56px]"
                            style={{ opacity, scale }}
                        >
                            <div className="max-w-[1440px] mx-auto w-full">
                                {/* Split layout: Title left, Wireframe right */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                                    {/* Left — Text */}
                                    <div>
                                        <span className="text-[var(--cs-accent)] font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] block">
                                            {data.role}
                                        </span>

                                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500 mb-6 pb-2">
                                            {data.heroTitle}
                                        </h1>

                                        <p className="text-lg md:text-2xl font-light text-zinc-400 max-w-2xl leading-relaxed">
                                            {data.heroSubheading}
                                        </p>

                                        <p className="text-xs font-mono text-zinc-600 mt-6 uppercase tracking-widest">
                                            {data.company} • {data.timeframe}
                                        </p>
                                    </div>

                                    {/* Right — Wireframe or Cover */}
                                    <div className="relative">
                                        {heroBackground ? (
                                            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 aspect-video relative" style={{ filter: 'brightness(1.8)' }}>
                                                {heroBackground}
                                            </div>
                                        ) : data.coverImage && (
                                            <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-black/50">
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
                                </div>

                                {/* Hero Stats — clean row below */}
                                <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/5 pt-10">
                                    {heroStats.map((stat, i) => (
                                        <div key={i}>
                                            <p className="text-[10px] uppercase font-mono tracking-widest text-[var(--cs-accent)] mb-2">{stat.label}</p>
                                            <h3 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">{stat.value}</h3>
                                            <p className="text-zinc-500 mt-2 font-light">{stat.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>

                        {/* ═══ CASE STUDY CONTENT (from children) ═══ */}
                        {children}
                    </div>
                </div>
            </LightboxProvider>
        </div>
    )
}
