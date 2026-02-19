'use client'

import { useRef, useEffect, type ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import { X, ArrowDown } from 'lucide-react'

/* ─── types ───────────────────────────────────────── */
export interface StorySlide {
    type: string
    title: string
    content: string[]
    image?: string
    signal?: string
    notes?: string
    /** Optional custom React component to render instead of default layout */
    component?: ReactNode
}

interface StoryDeckProps {
    slides: StorySlide[]
    onExit: () => void
}

/* ─── shared easing ───────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const

/* ─── accent colors per type ──────────────────────── */
function getAccentColor(type: string): string {
    switch (type) {
        case 'problem': return '#f43f5e'
        case 'research': return '#8b5cf6'
        case 'decision': return '#3b82f6'
        case 'execution': return '#10b981'
        case 'impact': return '#f59e0b'
        case 'lesson': return '#6366f1'
        case 'title': return '#71717a'
        default: return '#71717a'
    }
}

function getAccentLabel(type: string): string {
    switch (type) {
        case 'problem': return 'The Problem'
        case 'research': return 'Research'
        case 'decision': return 'Decision'
        case 'execution': return 'Execution'
        case 'impact': return 'Impact'
        case 'lesson': return 'Looking Ahead'
        default: return ''
    }
}

/* ─── single deck (one viewport) ──────────────────── */
function Deck({
    slide,
    index,
    total,
}: {
    slide: StorySlide
    index: number
    total: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.25 })
    const isEven = index % 2 === 0
    const accent = getAccentColor(slide.type)
    const label = getAccentLabel(slide.type)
    const isHero = slide.type === 'title' && index === 0
    const hasImage = !!slide.image

    /* ── scroll-linked parallax ── */
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    // Smooth spring for parallax
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    // Text moves slower (parallax up), media moves faster
    const textY = useTransform(smoothProgress, [0, 1], [60, -30])
    const mediaY = useTransform(smoothProgress, [0, 1], [80, -40])
    const mediaScale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.96])

    // Hero-specific parallax (used by all slides but only matters for hero)
    const heroY = useTransform(smoothProgress, [0, 1], [0, -100])
    const heroOpacity = useTransform(smoothProgress, [0, 0.6, 1], [1, 1, 0])

    /* ── custom component deck ── */
    if (slide.component) {
        return (
            <section
                ref={ref}
                id={`deck-${index}`}
                className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-24 overflow-hidden"
                style={{ background: '#09090b' }}
            >
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 0.8, ease }}
                    className="text-center mb-10 md:mb-14"
                >
                    {label && (
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: accent }}>
                                {label}
                            </span>
                        </div>
                    )}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
                        {slide.title}
                    </h2>
                    {/* Subtitle removed — PresenterBar speech bubble provides narration */}
                </motion.div>

                {/* Embedded component */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ delay: 0.3, duration: 0.9, ease }}
                    className="w-full"
                >
                    {slide.component}
                </motion.div>

                {/* Deck counter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
                >
                    <span className="font-mono text-[9px] md:text-[10px] text-zinc-700 tracking-widest">
                        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                </motion.div>
            </section>
        )
    }

    /* ── hero deck ── */
    if (isHero) {

        return (
            <section
                ref={ref}
                className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden"
                style={{ background: '#09090b' }}
            >
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />

                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="relative z-10 text-center max-w-4xl px-4"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 0.9, ease }}
                        className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-zinc-600 uppercase mb-8 md:mb-10"
                    >
                        Case Study Presentation
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(12px)' }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 1, delay: 0.15, ease }}
                        className="text-3xl md:text-5xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.1] mb-6 md:mb-8"
                    >
                        {slide.title}
                    </motion.h1>

                    {slide.content.map((line, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                            transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease }}
                            className="text-base md:text-lg lg:text-xl text-zinc-500 leading-relaxed"
                        >
                            {line}
                        </motion.p>
                    ))}

                    {/* Animated wireframe mock — builds up piece by piece */}
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.88 }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ delay: 0.6, duration: 1.1, ease }}
                        className="mt-10 md:mt-14 relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40
                                    aspect-video max-w-3xl mx-auto ring-1 ring-white/[0.06] bg-zinc-950"
                    >
                        {/* Wireframe UI mock */}
                        <div className="absolute inset-0 p-3 md:p-4 flex gap-2 md:gap-3">
                            {/* Sidebar */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 1.0, duration: 0.6, ease }}
                                className="w-[14%] flex flex-col gap-2"
                            >
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/[0.06] mb-2" />
                                {[1, 2, 3, 4, 5].map(i => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={isInView ? { opacity: 1 } : {}}
                                        transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                                        className="h-2 rounded-full bg-white/[0.04]"
                                        style={{ width: `${60 + Math.random() * 40}%` }}
                                    />
                                ))}
                                <div className="flex-1" />
                                <div className="h-2 w-[70%] rounded-full bg-white/[0.03]" />
                            </motion.div>

                            {/* Main content area */}
                            <div className="flex-1 flex flex-col gap-2 md:gap-3">
                                {/* Top bar */}
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 1.3, duration: 0.5, ease }}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.04]"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 md:w-24 h-2 rounded-full bg-white/[0.08]" />
                                        <div className="w-8 md:w-12 h-2 rounded-full bg-white/[0.04]" />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-white/[0.04]" />
                                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-white/[0.04]" />
                                    </div>
                                </motion.div>

                                {/* Content cards grid */}
                                <div className="flex-1 grid grid-cols-3 gap-2 md:gap-2.5">
                                    {[0, 1, 2, 3, 4, 5].map(i => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                            transition={{ delay: 1.5 + i * 0.15, duration: 0.5, ease }}
                                            className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-2 md:p-3 flex flex-col gap-1.5"
                                        >
                                            <div className="h-1.5 w-[70%] rounded-full bg-white/[0.06]" />
                                            <div className="h-1 w-[50%] rounded-full bg-white/[0.03]" />
                                            <div className="flex-1 rounded-md bg-white/[0.015] mt-1" />
                                            <div className="flex gap-1">
                                                <div className="h-1 flex-1 rounded-full bg-white/[0.03]" />
                                                <div className="h-1 w-[30%] rounded-full bg-white/[0.02]" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* The + button — the breakthrough */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 2.6, duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
                                    className="absolute bottom-5 right-5 md:bottom-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10"
                                >
                                    <span className="text-emerald-400 text-lg md:text-xl font-light">+</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-2 text-zinc-600"
                >
                    <span className="text-[10px] tracking-[0.25em] uppercase font-mono">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    >
                        <ArrowDown className="w-4 h-4" />
                    </motion.div>
                </motion.div>
            </section>
        )
    }

    /* ── text slide direction — alternates left/right ── */
    const textSlideX = hasImage ? (isEven ? -40 : 40) : 0
    const mediaSlideX = hasImage ? (isEven ? 40 : -40) : 0

    /* ── content deck ── */
    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{ background: '#09090b' }}
        >
            {/* Accent glow — top corner, very subtle */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1.5 }}
                className="absolute top-0 w-full h-[300px] pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at ${isEven ? '10% 0%' : '90% 0%'}, ${accent}0a 0%, transparent 60%)`,
                }}
            />

            <div
                className={`w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-0 grid gap-8 md:gap-16 lg:gap-20 ${hasImage
                    ? 'grid-cols-1 md:grid-cols-2 items-center'
                    : 'grid-cols-1 max-w-3xl'
                    }`}
            >
                {/* ── TEXT COLUMN (parallax) ── */}
                <motion.div
                    style={{ y: textY }}
                    className={`${hasImage && !isEven ? 'md:order-2' : ''} ${!hasImage ? 'text-center' : ''}`}
                >
                    {/* Type label */}
                    {label && (
                        <motion.div
                            initial={{ opacity: 0, x: textSlideX * 0.5, filter: 'blur(6px)' }}
                            animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                            transition={{ delay: 0.05, duration: 0.7, ease }}
                            className="flex items-center gap-2.5 mb-4"
                            style={{ justifyContent: !hasImage ? 'center' : 'flex-start' }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 15 }}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: accent }}
                            />
                            <span
                                className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium"
                                style={{ color: accent }}
                            >
                                {label}
                            </span>
                        </motion.div>
                    )}

                    {/* Signal badge */}
                    {slide.signal && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.7, filter: 'blur(6px)' }}
                            animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                            className="inline-block text-[9px] md:text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border mb-4"
                            style={{
                                color: `${accent}cc`,
                                borderColor: `${accent}22`,
                                background: `${accent}08`,
                            }}
                        >
                            {slide.signal}
                        </motion.span>
                    )}

                    {/* Title — dramatic slide + blur reveal */}
                    <motion.h2
                        initial={{ opacity: 0, x: textSlideX, y: 20, filter: 'blur(10px)' }}
                        animate={isInView ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : {}}
                        transition={{ delay: 0.15, duration: 0.9, ease }}
                        className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.15] mb-5"
                    >
                        {slide.title}
                    </motion.h2>

                    {/* Divider — draw-on */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.3, duration: 0.8, ease }}
                        className="h-[2px] w-16 rounded-full mb-5"
                        style={{
                            background: `linear-gradient(90deg, ${accent}80, transparent)`,
                            transformOrigin: !hasImage ? 'center' : 'left',
                            margin: !hasImage ? '0 auto 1.25rem' : undefined,
                            marginBottom: '1.25rem',
                        }}
                    />

                    {/* Content lines — staggered cascade with slide */}
                    <div className={`space-y-3 ${!hasImage ? 'max-w-xl mx-auto' : ''}`}>
                        {slide.content.map((line, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 16, x: textSlideX * 0.3, filter: 'blur(4px)' }}
                                animate={isInView ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' } : {}}
                                transition={{
                                    delay: 0.35 + i * 0.1,
                                    duration: 0.7,
                                    ease,
                                }}
                                className="text-sm md:text-base lg:text-lg text-zinc-400 leading-relaxed"
                            >
                                {line}
                            </motion.p>
                        ))}
                    </div>

                    {/* Notes */}
                    {slide.notes && (
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={isInView ? { opacity: 0.7, y: 0 } : {}}
                            transition={{ delay: 0.8, duration: 0.6, ease }}
                            className="mt-5 text-xs md:text-sm text-zinc-600 italic leading-relaxed"
                        >
                            {slide.notes}
                        </motion.p>
                    )}
                </motion.div>

                {/* ── MEDIA COLUMN (parallax + scale) ── */}
                {hasImage && (
                    <motion.div
                        style={{ y: mediaY, scale: mediaScale }}
                        className={`relative ${!isEven ? 'md:order-1' : ''}`}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: mediaSlideX, filter: 'blur(12px)' }}
                            animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                            transition={{ delay: 0.2, duration: 1, ease }}
                        >
                            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-black/50
                                            ring-1 ring-white/[0.06]
                                            aspect-[4/3] md:aspect-auto md:h-[380px] lg:h-[440px]">
                                <Image
                                    src={slide.image!}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Vignette for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />
                            </div>

                            {/* Floating deck number */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{ delay: 0.6, type: 'spring', stiffness: 400, damping: 15 }}
                                className="absolute -bottom-2.5 -right-2.5 md:-bottom-3 md:-right-3
                                            w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center
                                            text-white text-[10px] md:text-xs font-mono font-bold shadow-lg
                                            ring-2 ring-black"
                                style={{ background: accent }}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            {/* Deck counter */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
            >
                <span className="font-mono text-[9px] md:text-[10px] text-zinc-700 tracking-widest">
                    {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
            </motion.div>
        </section>
    )
}

/* ─── main component ──────────────────────────────── */
export default function StoryDeck({ slides, onExit }: StoryDeckProps) {

    // Hide site header, ScrollGear, and back-to-top on mount; restore on exit
    useEffect(() => {
        // Scroll to top when entering presentation
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })

        const header = document.querySelector('header')
        const gear = document.getElementById('scroll-gear')
        const backToTop = document.getElementById('back-to-top')

        if (header) header.style.display = 'none'
        if (gear) gear.style.display = 'none'
        if (backToTop) backToTop.style.display = 'none'

        return () => {
            if (header) header.style.display = ''
            if (gear) gear.style.display = ''
            if (backToTop) backToTop.style.display = ''
        }
    }, [])

    return (
        <div className="relative w-full bg-[#09090b]">

            {/* Sticky exit button */}
            <motion.button
                onClick={onExit}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                className="fixed top-4 right-4 md:top-6 md:right-6 z-50
                           w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 backdrop-blur-md
                           text-zinc-400 hover:text-white flex items-center justify-center
                           shadow-lg border border-white/10 hover:border-white/20
                           transition-colors cursor-pointer"
                aria-label="Back to Case Study"
            >
                <X className="w-4 h-4" />
            </motion.button>

            {/* Sticky progress dots — right edge, desktop only */}
            <nav className="fixed right-5 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1.5">
                {slides.map((slide, i) => (
                    <a
                        key={i}
                        href={`#deck-${i}`}
                        className="group relative flex items-center justify-end"
                    >
                        {/* Hover tooltip */}
                        <span className="absolute right-6 whitespace-nowrap text-[10px] font-mono text-zinc-500
                                         opacity-0 group-hover:opacity-100 transition-opacity duration-200 pr-1
                                         bg-zinc-900/80 backdrop-blur-sm px-2 py-0.5 rounded">
                            {slide.title.length > 22 ? slide.title.slice(0, 22) + '…' : slide.title}
                        </span>
                        <div
                            className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-2 group-hover:h-2"
                            style={{
                                background: getAccentColor(slide.type),
                                opacity: 0.5,
                            }}
                        />
                    </a>
                ))}
            </nav>

            {/* Decks */}
            {slides.map((slide, i) => (
                <div key={i} id={`deck-${i}`}>
                    <Deck
                        slide={slide}
                        index={i}
                        total={slides.length}
                    />
                </div>
            ))}

            {/* End card */}
            <section className="min-h-[40vh] flex flex-col items-center justify-center bg-[#09090b] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <p className="text-zinc-600 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6">
                        End of Presentation
                    </p>
                    <button
                        onClick={onExit}
                        className="text-zinc-300 hover:text-white text-sm font-medium px-6 py-3 rounded-full
                                   border border-white/10 hover:border-white/20 hover:bg-white/5
                                   transition-all duration-300 cursor-pointer"
                    >
                        ← Back to Full Case Study
                    </button>
                </motion.div>
            </section>
        </div>
    )
}
