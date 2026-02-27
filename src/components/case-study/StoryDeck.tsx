'use client'

import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { withHexAlpha } from '@/lib/color-utils'

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
    /** Optional background component for title slides (e.g. animated wireframe) */
    backgroundComponent?: ReactNode
}

interface StoryDeckProps {
    slides: StorySlide[]
    onExit: () => void
    /** Called when user clicks X or presses ESC — navigates away from case study */
    onClose?: () => void
}

/* ─── shared easing ───────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─── Beat duration per slide (ms) ─── */
const SLIDE_DURATION = 12000

/* ─── accent colors per type ──────────────────────── */
function getAccentColor(type: string): string {
    switch (type) {
        case 'problem': return 'var(--semantic-rose-500)'
        case 'research': return 'var(--accent-violet)'
        case 'decision': return 'var(--semantic-blue-500)'
        case 'execution': return 'var(--semantic-emerald-500)'
        case 'impact': return 'var(--accent-amber)'
        case 'lesson': return 'var(--tone-indigo-500)'
        case 'title': return 'var(--neutral-zinc-500)'
        default: return 'var(--neutral-zinc-500)'
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

/* ─── Slide Content Renderer ──────────────────────── */
function SlideContent({ slide, index, total }: { slide: StorySlide; index: number; total: number }) {
    const accent = getAccentColor(slide.type)
    const label = getAccentLabel(slide.type)
    const isHero = slide.type === 'title' && index === 0

    /* ── Custom component slide ── */
    if (slide.component) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full px-6 md:px-12 py-8 md:py-12">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease }}
                    className="text-center mb-6 md:mb-10"
                >
                    {label && (
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: accent }}>
                                {label}
                            </span>
                        </div>
                    )}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white tracking-tight">
                        {slide.title}
                    </h2>
                </motion.div>

                {/* Component */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.3, duration: 0.9, ease }}
                    className="w-full max-w-5xl"
                >
                    {slide.component}
                </motion.div>
            </div>
        )
    }

    /* ── Hero/title slide ── */
    if (isHero) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full px-6 md:px-12 text-center relative">
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'linear-gradient(var(--overlay-white-15) 1px, transparent 1px), linear-gradient(90deg, var(--overlay-white-15) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />

                {/* Text content — positioned in upper portion */}
                <div className="relative z-10 max-w-4xl mb-4">
                    <motion.p
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.9, ease }}
                        className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-zinc-600 uppercase mb-8 md:mb-10"
                    >
                        Case Study Presentation
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(12px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1, delay: 0.15, ease }}
                        className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1] mb-6 md:mb-8"
                    >
                        {slide.title}
                    </motion.h1>

                    {slide.content.map((line, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease }}
                            className="text-base md:text-lg lg:text-xl text-zinc-500 leading-relaxed"
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>

                {/* Wireframe showcase — below the text */}
                {slide.backgroundComponent && (
                    <motion.div
                        className="relative w-full max-w-2xl h-32 md:h-44 mt-2 overflow-hidden pointer-events-none"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 0.7, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.6, ease }}
                    >
                        {/* Fade-out edges */}
                        <div className="absolute inset-0 z-10 pointer-events-none" style={{
                            background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 20%, transparent 80%, var(--bg-primary) 100%), linear-gradient(to right, var(--bg-primary) 0%, transparent 15%, transparent 85%, var(--bg-primary) 100%)',
                        }} />
                        <div className="w-full h-full scale-110">
                            {slide.backgroundComponent}
                        </div>
                    </motion.div>
                )}
            </div>
        )
    }

    /* ── Content slide (text + optional image) ── */
    const hasImage = !!slide.image

    return (
        <div className={`flex items-center justify-center w-full h-full px-6 md:px-16 lg:px-24 py-12 md:py-16`}>
            <div className={`w-full max-w-6xl grid gap-8 md:gap-14 ${hasImage ? 'grid-cols-1 md:grid-cols-2 items-center' : 'grid-cols-1 max-w-3xl'}`}>
                {/* Text */}
                <div className={`${!hasImage ? 'text-center' : ''}`}>
                    {label && (
                        <motion.div
                            initial={{ opacity: 0, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{ delay: 0.05, duration: 0.7, ease }}
                            className="flex items-center gap-2.5 mb-4"
                            style={{ justifyContent: !hasImage ? 'center' : 'flex-start' }}
                        >
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: accent }}>
                                {label}
                            </span>
                        </motion.div>
                    )}

                    {slide.signal && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.7, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                            className="inline-block text-[9px] md:text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border mb-4"
                            style={{
                                color: withHexAlpha(accent, 'cc'),
                                borderColor: withHexAlpha(accent, '22'),
                                background: withHexAlpha(accent, '08'),
                            }}
                        >
                            {slide.signal}
                        </motion.span>
                    )}

                    <motion.h2
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.15, duration: 0.9, ease }}
                        className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.15] mb-5"
                    >
                        {slide.title}
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, ease }}
                        className="h-[2px] w-16 rounded-full mb-5"
                        style={{
                            background: `linear-gradient(90deg, ${withHexAlpha(accent, '80')}, transparent)`,
                            transformOrigin: !hasImage ? 'center' : 'left',
                            margin: !hasImage ? '0 auto 1.25rem' : undefined,
                            marginBottom: '1.25rem',
                        }}
                    />

                    <div className={`space-y-3 ${!hasImage ? 'max-w-xl mx-auto' : ''}`}>
                        {slide.content.map((line, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ delay: 0.35 + i * 0.1, duration: 0.7, ease }}
                                className="text-sm md:text-base lg:text-lg text-zinc-400 leading-relaxed"
                            >
                                {line}
                            </motion.p>
                        ))}
                    </div>

                    {slide.notes && (
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 0.7, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6, ease }}
                            className="mt-5 text-xs md:text-sm text-zinc-600 italic leading-relaxed"
                        >
                            {slide.notes}
                        </motion.p>
                    )}
                </div>

                {/* Image */}
                {hasImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ delay: 0.2, duration: 1, ease }}
                    >
                        <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/[0.06] aspect-[4/3] md:aspect-auto md:h-[380px] lg:h-[440px]">
                            <Image
                                src={slide.image!}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}


/* ─── main carousel component ──────────────────────── */
export default function StoryDeck({ slides, onExit, onClose }: StoryDeckProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [progress, setProgress] = useState(0)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const progressRef = useRef<NodeJS.Timeout | null>(null)
    const startTimeRef = useRef<number>(0)

    // Hide site header and ScrollGear on mount; restore on exit
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
        document.body.style.overflow = 'hidden'

        const header = document.querySelector('header')
        const gear = document.getElementById('scroll-gear')
        const backToTop = document.getElementById('back-to-top')

        if (header) header.style.display = 'none'
        if (gear) gear.style.display = 'none'
        if (backToTop) backToTop.style.display = 'none'

        return () => {
            document.body.style.overflow = ''
            if (header) header.style.display = ''
            if (gear) gear.style.display = ''
            if (backToTop) backToTop.style.display = ''
        }
    }, [])

    /* ── advance to next slide ── */
    const advanceSlide = useCallback(() => {
        setCurrentSlide((prev) => {
            const next = prev + 1
            if (next >= slides.length) {
                return 0 // loop
            }
            return next
        })
        setProgress(0)
    }, [slides.length])

    /* ── autoplay timer ── */
    useEffect(() => {
        if (!isPlaying) return

        startTimeRef.current = Date.now()

        timerRef.current = setTimeout(advanceSlide, SLIDE_DURATION)

        const tick = () => {
            const elapsed = Date.now() - startTimeRef.current
            const beatProgress = Math.min(elapsed / SLIDE_DURATION, 1)
            setProgress(beatProgress)

            if (beatProgress < 1) {
                progressRef.current = setTimeout(tick, 32)
            }
        }
        tick()

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
            if (progressRef.current) clearTimeout(progressRef.current)
        }
    }, [currentSlide, isPlaying, advanceSlide])

    /* ── manual navigation ── */
    const goToSlide = useCallback((index: number) => {
        if (timerRef.current) clearTimeout(timerRef.current)
        if (progressRef.current) clearTimeout(progressRef.current)
        setCurrentSlide(index)
        setProgress(0)
        // Keep autoplay going after manual navigation
    }, [])

    const goNext = useCallback(() => {
        goToSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0)
    }, [currentSlide, slides.length, goToSlide])

    const goPrev = useCallback(() => {
        goToSlide(currentSlide > 0 ? currentSlide - 1 : slides.length - 1)
    }, [currentSlide, slides.length, goToSlide])

    const togglePlay = useCallback(() => {
        setIsPlaying(prev => !prev)
    }, [])

    /* ── keyboard navigation ── */
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault()
                goNext()
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault()
                goPrev()
            } else if (e.key === 'Escape') {
                onClose ? onClose() : onExit()
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [goNext, goPrev, onExit])

    const currentSlideData = slides[currentSlide]
    const accent = getAccentColor(currentSlideData.type)

    return (
        <div className="fixed inset-0 z-50 bg-[var(--bg-primary)] flex flex-col">
            {/* ── Top right: Full case study link + X close ── */}
            <div className="absolute top-5 right-5 z-50 flex items-center gap-2">
                <button
                    onClick={onExit}
                    className="h-10 px-4 rounded-full bg-white/[0.06] backdrop-blur-md
                               flex items-center gap-2 hover:bg-white/[0.12] transition-colors cursor-pointer
                               border border-white/[0.08] text-zinc-400 hover:text-white"
                    aria-label="Read full case study"
                >
                    <span className="font-mono text-[10px] tracking-wider uppercase">Full Case Study</span>
                </button>
                <button
                    onClick={onClose || onExit}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md
                               flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer
                               border border-white/10"
                    aria-label="Exit presentation"
                >
                    <X className="w-4 h-4 text-white" />
                </button>
            </div>

            {/* ── Slide counter — top left ── */}
            <div className="absolute top-5 left-5 z-50">
                <span className="font-mono text-[11px] text-zinc-500 tracking-wider tabular-nums">
                    {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>
            </div>

            {/* ── Main carousel area ── */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden">
                {/* Accent glow — very subtle background */}
                <motion.div
                    key={`glow-${currentSlide}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at 50% 40%, ${accent}08 0%, transparent 60%)`,
                    }}
                />

                {/* Slide transitions */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={`slide-${currentSlide}`}
                        initial={{
                            opacity: 0,
                            y: 20,
                            scale: 1.02,
                            filter: 'blur(12px)',
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: 'blur(0px)',
                        }}
                        exit={{
                            opacity: 0,
                            y: -15,
                            scale: 0.98,
                            filter: 'blur(10px)',
                        }}
                        transition={{ duration: 0.65, ease }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <SlideContent
                            slide={currentSlideData}
                            index={currentSlide}
                            total={slides.length}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* ── Arrow navigation — sides ── */}
                <button
                    onClick={goPrev}
                    className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full
                               bg-white/[0.06] border border-white/[0.08] flex items-center justify-center
                               text-zinc-500 hover:text-white hover:bg-white/[0.12] transition-all cursor-pointer"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={goNext}
                    className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full
                               bg-white/[0.06] border border-white/[0.08] flex items-center justify-center
                               text-zinc-500 hover:text-white hover:bg-white/[0.12] transition-all cursor-pointer"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* ── Bottom controls bar ── */}
            <div className="relative z-40 px-4 md:px-8 pb-5 pt-3">
                {/* Play/Pause + dots + label row */}
                <div className="flex items-center justify-center gap-4">
                    {/* Play/Pause button */}
                    <button
                        onClick={togglePlay}
                        className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center
                                   text-zinc-400 hover:text-white hover:bg-white/[0.1] transition-all cursor-pointer shrink-0"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <Pause className="w-3 h-3" />
                        ) : (
                            <Play className="w-3 h-3 ml-0.5" />
                        )}
                    </button>

                    {/* ── Carousel dots with progress ── */}
                    <div className="flex items-center gap-1.5 md:gap-2">
                        {slides.map((slide, i) => {
                            const isActive = i === currentSlide
                            const isPast = i < currentSlide
                            const dotAccent = getAccentColor(slide.type)

                            return (
                                <button
                                    key={i}
                                    onClick={() => goToSlide(i)}
                                    className="group relative cursor-pointer"
                                    title={slide.title}
                                    aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                                >
                                    {/* Dot with progress fill */}
                                    <div
                                        className="relative overflow-hidden rounded-full transition-all duration-500"
                                        style={{
                                            width: isActive ? '28px' : '8px',
                                            height: '8px',
                                            background: isPast
                                                ? dotAccent
                                                : isActive
                                                    ? 'rgba(255,255,255,0.08)'
                                                    : 'rgba(255,255,255,0.08)',
                                            opacity: isPast ? 0.5 : isActive ? 1 : 0.4,
                                        }}
                                    >
                                        {/* Active progress fill */}
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-y-0 left-0 rounded-full"
                                                style={{
                                                    width: `${progress * 100}%`,
                                                    background: dotAccent,
                                                }}
                                            />
                                        )}
                                    </div>

                                    {/* Hover tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none
                                                    opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <div className="whitespace-nowrap text-[9px] font-mono text-zinc-400
                                                        bg-zinc-900/90 backdrop-blur-sm px-2 py-1 rounded border border-white/[0.06]">
                                            {slide.title.length > 28 ? slide.title.slice(0, 28) + '…' : slide.title}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    {/* Current slide label */}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentSlide}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="hidden md:block font-mono text-[10px] text-zinc-600 tracking-wider truncate max-w-[200px] shrink-0"
                        >
                            {currentSlideData.title}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {/* Full-width thin progress bar */}
                <div className="mt-3 h-[2px] w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{
                            width: `${((currentSlide + progress) / slides.length) * 100}%`,
                            background: accent,
                            opacity: 0.5,
                        }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
            </div>
        </div>
    )
}
