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

import React, { useRef, useState, useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import type { StorySlide } from '@/components/case-study/StoryDeck'
import { withHexAlpha } from '@/lib/color-utils'

/* ─── shared easing ─── */
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─── scroll distance per scene (vh) ─── */
const SCROLL_PER_SCENE = 80

/* ─── accent colors per type ─── */
function getAccentColor(type: string): string {
    switch (type) {
        case 'problem': return 'var(--semantic-rose)'
        case 'research': return 'var(--accent-violet)'
        case 'decision': return 'var(--semantic-blue)'
        case 'execution': return 'var(--semantic-emerald)'
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
    const label = getAccentLabel(slide.type)
    const isHero = slide.type === 'title' && index === 0

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            initial={false}
            animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : direction === 'down' ? 40 : -40,
                filter: isActive ? 'blur(0px)' : 'blur(12px)',
                scale: isActive ? 1 : 0.97,
            }}
            transition={{
                duration: 0.8,
                ease,
                opacity: { duration: 0.6 },
            }}
            style={{
                pointerEvents: isActive ? 'auto' : 'none',
                zIndex: isActive ? 10 : 0,
                willChange: 'transform, opacity, filter',
            }}
        >
            {/* Accent glow per scene */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                style={{
                    background: `radial-gradient(ellipse at 50% 40%, ${accent}0a 0%, transparent 60%)`,
                    opacity: isActive ? 1 : 0,
                }}
            />

            {/* Scene content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                {slide.component ? (
                    <ComponentScene slide={slide} label={label} accent={accent} isActive={isActive} />
                ) : isHero ? (
                    <HeroScene slide={slide} isActive={isActive} />
                ) : (
                    <ContentScene slide={slide} label={label} accent={accent} isActive={isActive} />
                )}
            </div>
        </motion.div>
    )
}


/* ── Hero / title scene ── */
function HeroScene({ slide, isActive }: { slide: StorySlide; isActive: boolean }) {
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
                <motion.h2
                    initial={false}
                    animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 40,
                        scale: isActive ? 1 : 0.95,
                        filter: isActive ? 'blur(0px)' : 'blur(12px)',
                    }}
                    transition={{ duration: 1, delay: isActive ? 0.15 : 0, ease }}
                    className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1] mb-6 md:mb-8"
                >
                    {slide.title}
                </motion.h2>
                {slide.content.map((line, i) => (
                    <motion.p
                        key={i}
                        initial={false}
                        animate={{
                            opacity: isActive ? 1 : 0,
                            y: isActive ? 0 : 20,
                            filter: isActive ? 'blur(0px)' : 'blur(8px)',
                        }}
                        transition={{ delay: isActive ? 0.4 + i * 0.15 : 0, duration: 0.8, ease }}
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


/* ── Component scene ── */
function ComponentScene({
    slide, label, accent, isActive,
}: {
    slide: StorySlide; label: string; accent: string; isActive: boolean
}) {
    return (
        <div className="flex flex-col items-center w-full h-full px-6 md:px-12 overflow-hidden">
            <motion.div
                initial={false}
                animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 20,
                    filter: isActive ? 'blur(0px)' : 'blur(8px)',
                }}
                transition={{ duration: 0.8, ease }}
                className="text-center py-6 md:py-8 shrink-0"
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

            <motion.div
                initial={false}
                animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 30,
                    filter: isActive ? 'blur(0px)' : 'blur(6px)',
                }}
                transition={{ delay: isActive ? 0.3 : 0, duration: 0.9, ease }}
                className="w-full max-w-5xl flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
            >
                {slide.component}
            </motion.div>
        </div>
    )
}


/* ── Text + optional image scene ── */
function ContentScene({
    slide, label, accent, isActive,
}: {
    slide: StorySlide; label: string; accent: string; isActive: boolean
}) {
    const hasImage = !!slide.image

    return (
        <div className="flex items-center justify-center w-full h-full px-6 md:px-16 lg:px-24 py-12 md:py-16">
            <div className={`w-full max-w-6xl grid gap-8 md:gap-14 ${hasImage ? 'grid-cols-1 md:grid-cols-2 items-center' : 'grid-cols-1 max-w-3xl'}`}>
                <div className={!hasImage ? 'text-center' : ''}>
                    {label && (
                        <motion.div
                            initial={false}
                            animate={{
                                opacity: isActive ? 1 : 0,
                                filter: isActive ? 'blur(0px)' : 'blur(6px)',
                            }}
                            transition={{ delay: isActive ? 0.05 : 0, duration: 0.7, ease }}
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
                            initial={false}
                            animate={{
                                opacity: isActive ? 1 : 0,
                                scale: isActive ? 1 : 0.7,
                                filter: isActive ? 'blur(0px)' : 'blur(6px)',
                            }}
                            transition={{ delay: isActive ? 0.1 : 0, type: 'spring', stiffness: 300, damping: 20 }}
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

                    <motion.div
                        initial={false}
                        animate={{
                            scaleX: isActive ? 1 : 0,
                            opacity: isActive ? 1 : 0,
                        }}
                        transition={{ delay: isActive ? 0.3 : 0, duration: 0.8, ease }}
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
                                initial={false}
                                animate={{
                                    opacity: isActive ? 1 : 0,
                                    y: isActive ? 0 : 16,
                                    filter: isActive ? 'blur(0px)' : 'blur(4px)',
                                }}
                                transition={{ delay: isActive ? 0.35 + i * 0.1 : 0, duration: 0.7, ease }}
                                className="text-sm md:text-base lg:text-lg text-zinc-400 leading-relaxed"
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
            style={{ height: `${slides.length * SCROLL_PER_SCENE}vh` }}
        >
            {/* Sticky viewport — the "screen" */}
            <div className="sticky top-[56px] h-[calc(100vh-56px)] overflow-hidden bg-[var(--bg-primary)]">

                {/* Scene counter */}
                <div className="absolute top-4 left-6 z-20">
                    <span className="font-mono text-[11px] text-zinc-600 tracking-wider tabular-nums">
                        {String(activeScene + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </span>
                </div>

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

                {/* Bottom progress dots */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1">
                    {slides.map((s, i) => {
                        const dotAccent = getAccentColor(s.type)
                        const isActive = i === activeScene
                        const isPast = i < activeScene
                        return (
                            <div
                                key={i}
                                className="rounded-full transition-all duration-500"
                                style={{
                                    width: isActive ? '20px' : '4px',
                                    height: '4px',
                                    background: isPast ? dotAccent : isActive ? dotAccent : 'rgba(255,255,255,0.1)',
                                    opacity: isPast ? 0.4 : isActive ? 0.8 : 0.3,
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
