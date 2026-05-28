'use client'

/**
 * ScrollDeck — Scroll-driven scene viewer.
 *
 * Takes the same StorySlide[] data as StoryDeck but renders each slide
 * as a scroll-triggered scene instead of a paginated carousel.
 * The scroll IS the playhead — no arrows, no autoplay, no decisions.
 *
 * Animation philosophy: match the trailer's cinematic transitions.
 * - Scenes crossfade (no wait-for-exit gaps)
 * - Text animates blur→focus like the trailer title cards
 * - Images parallax-drift in
 * - Subtle radial glow shifts per scene type
 */

import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { StorySlide } from '@/components/case-study/StoryDeck'
import { playWaveCrash, playOceanSwoosh } from '@/lib/audio'
import { withAlpha } from '@/lib/color-utils'

/* ─── shared easing ─── */
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─── scroll distance per scene (vh) ─── */
const SCROLL_PER_SCENE_DESKTOP = 150
const SCROLL_PER_SCENE_MOBILE = 100

/* ─── mobile detection hook ─── */
function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [breakpoint])
    return isMobile
}

/* ─── accent colors per type ─── 
   Whispering Intensity: use the case-study accent for ALL types.
   Scene typing is communicated through labels, not through
   screaming color changes. The deck should feel near-monochrome
   with just a whisper of accent color. */
function getAccentColor(_type: string): string {
    return 'var(--cs-accent)'
}




/* ─── Word-by-word kinetic text (trailer DNA, Whispering Intensity) ─── */
function KineticTitle({
    children,
    isActive,
    className = '',
}: {
    children: string
    isActive: boolean
    className?: string
}) {
    const words = children.split(' ')
    return (
        <span className={`inline-flex flex-wrap items-baseline justify-center gap-x-[0.3em] ${className}`}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={false}
                    animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 14,
                        filter: isActive ? 'blur(0px)' : 'blur(6px)',
                    }}
                    transition={{
                        duration: 0.55,
                        delay: isActive ? 0.1 + i * 0.055 : 0,
                        ease,
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    )
}


/* ═══════════════════════════════════════════════════
   Individual Scene — rendered absolutely, crossfades
   ═══════════════════════════════════════════════════ */

function Scene({
    slide,
    index,
    isActive,
    direction,
}: {
    slide: StorySlide
    index: number
    isActive: boolean
    direction: 'up' | 'down'
}) {
    const accent = getAccentColor(slide.type)
    const isHero = slide.type === 'title' && index === 0

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            initial={false}
            animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : direction === 'down' ? 30 : -30,
                filter: isActive ? 'blur(0px)' : 'blur(10px)',
                scale: isActive ? 1 : 0.97,
            }}
            transition={{
                duration: 0.85,
                ease,
                opacity: { duration: 0.65 },
            }}
            style={{
                pointerEvents: isActive ? 'auto' : 'none',
                zIndex: isActive ? 10 : 0,
                willChange: 'transform, opacity, filter',
            }}
        >
            {/* Accent glow — barely perceptible atmospheric wash */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                style={{
                    background: `radial-gradient(ellipse at 50% 40%, ${withAlpha(accent, 0.03)} 0%, transparent 65%)`,
                    opacity: isActive ? 1 : 0,
                }}
            />

            {/* Scene content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                {slide.component ? (
                    <ComponentScene slide={slide} isActive={isActive} />
                ) : isHero ? (
                    <HeroScene slide={slide} isActive={isActive} />
                ) : (
                    <ContentScene slide={slide} accent={accent} isActive={isActive} />
                )}
            </div>
        </motion.div>
    )
}

function playTransitionSound(type: 'hero' | 'component' | 'content') {
    if (type === 'hero') playWaveCrash(0.2)
    else playOceanSwoosh(0.1)
}


/* ── Hero / title scene ── */
function HeroScene({ slide, isActive }: { slide: StorySlide; isActive: boolean }) {
    useEffect(() => {
        if (isActive) playTransitionSound('hero')
    }, [isActive])

    return (
        <div className="flex flex-col items-center justify-center w-full h-full px-6 md:px-12 text-center relative">
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'linear-gradient(var(--overlay-white-15) 1px, transparent 1px), linear-gradient(90deg, var(--overlay-white-15) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />
            <div className="relative z-10 max-w-4xl mb-4">
                <motion.p
                    initial={false}
                    animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 20,
                        filter: isActive ? 'blur(0px)' : 'blur(10px)',
                    }}
                    transition={{ duration: 0.9, ease }}
                    className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-zinc-600 uppercase mb-8 md:mb-10"
                >
                    Case Study
                </motion.p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1] mb-6 md:mb-8">
                    <KineticTitle isActive={isActive}>
                        {slide.title}
                    </KineticTitle>
                </h2>
                {slide.content.map((line, i) => (
                    <motion.p
                        key={i}
                        initial={false}
                        animate={{
                            opacity: isActive ? 1 : 0,
                            y: isActive ? 0 : 20,
                            filter: isActive ? 'blur(0px)' : 'blur(8px)',
                        }}
                        transition={{ delay: isActive ? 0.5 + i * 0.15 : 0, duration: 0.8, ease }}
                        className="text-base md:text-lg lg:text-xl text-zinc-500 leading-relaxed"
                    >
                        {line}
                    </motion.p>
                ))}
            </div>
            {slide.backgroundComponent && (
                <motion.div
                    className="relative w-full max-w-2xl h-32 md:h-44 mt-2 overflow-hidden pointer-events-none"
                    initial={false}
                    animate={{
                        opacity: isActive ? 0.7 : 0,
                        y: isActive ? 0 : 30,
                    }}
                    transition={{ duration: 1.2, delay: isActive ? 0.6 : 0, ease }}
                >
                    <div className="absolute inset-0 z-10 pointer-events-none" style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.8) 100%), linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.8) 100%)',
                    }} />
                    <div className="w-full h-full scale-110">
                        {slide.backgroundComponent}
                    </div>
                </motion.div>
            )}
        </div>
    )
}


function ComponentScene({
    slide, isActive,
}: {
    slide: StorySlide; isActive: boolean
}) {
    const [renderKey, setRenderKey] = useState(0)
    const [prevActive, setPrevActive] = useState(isActive)
    const [hasMounted, setHasMounted] = useState(isActive)

    if (isActive && !prevActive) {
        setRenderKey(k => k + 1)
        setHasMounted(true)
        setPrevActive(true)
    } else if (!isActive && prevActive) {
        setPrevActive(false)
    }

    useEffect(() => {
        if (isActive) playTransitionSound('component')
    }, [isActive])

    return (
        <div className="flex flex-col items-center w-full h-full px-6 md:px-12 overflow-hidden">
            {/* Component body — parallax drift in with scale */}
            <motion.div
                initial={false}
                animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 24,
                    filter: isActive ? 'blur(0px)' : 'blur(5px)',
                }}
                transition={{
                    delay: isActive ? 0.15 : 0,
                    duration: 0.85,
                    ease,
                }}
                className="w-full max-w-5xl flex-1 min-h-0 flex items-center justify-center overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
            >
                {hasMounted ? (
                    <React.Fragment key={renderKey}>
                        {slide.component}
                    </React.Fragment>
                ) : null}
            </motion.div>
        </div>
    )
}


/* ── Text + optional image scene ── */
function ContentScene({ slide, accent, isActive }: { slide: StorySlide; accent: string; isActive: boolean }) {
    useEffect(() => {
        if (isActive) playTransitionSound('content')
    }, [isActive])

    const hasImage = !!slide.image

    return (
        <div className="flex items-center justify-center w-full h-full px-6 md:px-16 lg:px-24 py-12 md:py-16">
            <div className={`w-full max-w-6xl grid gap-8 md:gap-14 ${hasImage ? 'grid-cols-1 md:grid-cols-2 items-center' : 'grid-cols-1 max-w-3xl'}`}>
                <div className={!hasImage ? 'text-center' : ''}>
                    <motion.h2
                        initial={false}
                        animate={{
                            opacity: isActive ? 1 : 0,
                            y: isActive ? 0 : 20,
                            filter: isActive ? 'blur(0px)' : 'blur(10px)',
                        }}
                        transition={{ delay: isActive ? 0.15 : 0, duration: 0.9, ease }}
                        className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.15] mb-5"
                    >
                        {slide.title}
                    </motion.h2>

                    <div className={`space-y-3 ${!hasImage ? 'max-w-xl mx-auto' : ''}`}>
                        {slide.content.map((line, i) => (
                            <motion.p
                                key={i}
                                initial={false}
                                animate={{
                                    opacity: isActive ? 1 : 0,
                                    y: isActive ? 0 : 16,
                                    filter: isActive ? 'blur(0px)' : 'blur(4px)',
                                }}
                                transition={{ delay: isActive ? 0.35 + i * 0.1 : 0, duration: 0.7, ease }}
                                className="text-base md:text-lg lg:text-xl text-zinc-400 leading-relaxed"
                            >
                                {line}
                            </motion.p>
                        ))}
                    </div>

                    {slide.notes && (
                        <motion.p
                            initial={false}
                            animate={{
                                opacity: isActive ? 0.7 : 0,
                                y: isActive ? 0 : 8,
                            }}
                            transition={{ delay: isActive ? 0.8 : 0, duration: 0.6, ease }}
                            className="mt-5 text-xs md:text-sm text-zinc-600 italic leading-relaxed"
                        >
                            {slide.notes}
                        </motion.p>
                    )}
                </div>

                {hasImage && (
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: isActive ? 1 : 0,
                            scale: isActive ? 1 : 0.95,
                            x: isActive ? 0 : 30,
                            filter: isActive ? 'blur(0px)' : 'blur(12px)',
                        }}
                        transition={{ delay: isActive ? 0.2 : 0, duration: 1, ease }}
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


/* ═══════════════════════════════════════════════════
   ScrollDeck — Main Component
   ═══════════════════════════════════════════════════ */

interface ScrollDeckProps {
    slides: StorySlide[]
}

export default function ScrollDeck({ slides }: ScrollDeckProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeScene, setActiveScene] = useState(0)
    const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down')
    const prevProgress = useRef(0)
    const isMobile = useIsMobile()
    const scrollPerScene = isMobile ? SCROLL_PER_SCENE_MOBILE : SCROLL_PER_SCENE_DESKTOP

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        // Track scroll direction
        if (v > prevProgress.current) setScrollDir('down')
        else if (v < prevProgress.current) setScrollDir('up')
        prevProgress.current = v

        const idx = Math.min(Math.floor(v * slides.length), slides.length - 1)
        if (idx >= 0 && idx !== activeScene) setActiveScene(idx)
    })

    // Only render nearby scenes for performance (current ± 1)
    const visibleRange = useMemo(() => {
        const min = Math.max(0, activeScene - 1)
        const max = Math.min(slides.length - 1, activeScene + 1)
        return { min, max }
    }, [activeScene, slides.length])

    return (
        <section
            ref={containerRef}
            className="relative"
            style={{ height: `${slides.length * scrollPerScene}vh` }}
        >
            {/* Sticky viewport — the "screen" */}
            <div className="sticky top-[56px] h-[calc(100dvh-56px)] overflow-hidden bg-black/40 backdrop-blur-sm">



                {/* All nearby scenes — crossfade approach (no AnimatePresence gaps) */}
                {slides.map((slide, i) => {
                    if (i < visibleRange.min || i > visibleRange.max) return null
                    return (
                        <Scene
                            key={i}
                            slide={slide}
                            index={i}
                            isActive={i === activeScene}
                            direction={scrollDir}
                        />
                    )
                })}


            </div>
        </section>
    )
}
