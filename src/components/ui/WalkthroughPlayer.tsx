'use client'

import { useEffect, useState, useCallback } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { Play, Pause, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react'

/**
 * Workflow-led walkthrough player — the primary "See it run" surface for Build
 * Lab apps. A self-advancing, captioned tour (no audio): each slide pairs ONE
 * visual with ONE caption, and Play tours through them on a timer.
 *
 * Motion: feature beats play a looping action clip (`video`); other screenshots
 * get a Ken Burns pan (`image`); branded beats (no asset) get a gentle drift.
 * Controls: Play/Pause auto-advance, prev/next, jump-to dots. All motion +
 * auto-advance respect prefers-reduced-motion (manual nav only).
 */

export interface WalkthroughSlide {
    id: string
    label: string
    caption: string
    image?: string
    video?: string
}

interface WalkthroughPlayerProps {
    slides: WalkthroughSlide[]
    title: string
    accent: string          // e.g. 'var(--semantic-purple)'
    accentRgbVar: string    // e.g. '--semantic-purple-rgb'
    Icon: LucideIcon
}

const SLIDE_MS = 7000 // dwell per slide when auto-playing the tour

export default function WalkthroughPlayer({ slides, title, accent, accentRgbVar, Icon }: WalkthroughPlayerProps) {
    const [index, setIndex] = useState(0)
    const [playing, setPlaying] = useState(false)
    const reduce = useReducedMotion()

    const rgb = `var(${accentRgbVar})`
    const slide = slides[index]
    const isLast = index === slides.length - 1

    const go = useCallback((next: number) => {
        setIndex(Math.max(0, Math.min(slides.length - 1, next)))
    }, [slides.length])

    /* Auto-advance while "playing": one timeout per slide flips to the next at
       SLIDE_MS. The dwell bar is a pure-CSS animation (below), so there's no
       per-tick state and nothing for background-tab interval throttling to
       starve. Restarts when the slide changes; off under reduced-motion. */
    useEffect(() => {
        if (!playing || reduce) return
        const id = setTimeout(() => {
            if (!isLast) setIndex(i => i + 1)
            else setPlaying(false)
        }, SLIDE_MS)
        return () => clearTimeout(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playing, index, reduce])

    const onPlayPause = () => {
        if (!playing && isLast) { go(0); setPlaying(true); return } // replay from the top
        setPlaying(p => !p)
    }

    const navBtn = 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-zinc-300 transition-colors hover:border-white/40 hover:text-white disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-zinc-300'

    return (
        <div>
            {/* ── Visual ── */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
                <m.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                >
                    {slide.video ? (
                        <video
                            src={slide.video}
                            poster={slide.image}
                            muted
                            loop
                            playsInline
                            autoPlay={!reduce}
                            preload="metadata"
                            aria-label={`${title} — ${slide.label}`}
                            className="h-full w-full object-cover"
                        />
                    ) : slide.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={slide.image}
                            alt={`${title} — ${slide.label}`}
                            className={`h-full w-full object-cover ${reduce ? '' : 'kenburns'}`}
                        />
                    ) : (
                        <div
                            className={`flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center ${reduce ? '' : 'drift-slow'}`}
                            style={{ background: `radial-gradient(circle at 50% 38%, rgba(${rgb},0.16), #08070a 72%)` }}
                        >
                            <Icon className="h-14 w-14" style={{ color: accent, opacity: 0.5 }} strokeWidth={1.25} />
                            <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: accent }}>
                                {slide.label}
                            </p>
                        </div>
                    )}
                </m.div>
            </div>

            {/* ── Beat label + caption ── */}
            <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: accent, opacity: 0.85 }}>
                    {slide.label} <span className="text-zinc-600">· {index + 1}/{slides.length}</span>
                </p>
                <m.p
                    key={slide.id + '-cap'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-2 text-[15px] leading-relaxed text-zinc-200"
                >
                    {slide.caption}
                </m.p>
            </div>

            {/* ── Dwell bar — CSS-animated fill while touring (restarts per slide) ── */}
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                <div
                    key={`${index}-${playing}`}
                    className="h-full rounded-full"
                    style={{
                        backgroundColor: accent,
                        width: playing && !reduce ? '100%' : '0%',
                        animation: playing && !reduce ? `dwell ${SLIDE_MS}ms linear forwards` : 'none',
                    }}
                />
            </div>

            {/* ── Controls ── */}
            <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button onClick={() => { setPlaying(false); go(index - 1) }} disabled={index === 0} aria-label="Previous slide" className={navBtn}>
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => { setPlaying(false); go(index + 1) }} disabled={isLast} aria-label="Next slide" className={navBtn}>
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>

                {/* jump-to dots */}
                <div className="flex items-center gap-1.5">
                    {slides.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => { setPlaying(false); go(i) }}
                            aria-label={`Go to ${s.label}`}
                            aria-current={i === index}
                            className="h-1.5 rounded-full transition-all"
                            style={{
                                width: i === index ? 20 : 6,
                                backgroundColor: i === index ? accent : 'rgba(255,255,255,0.2)',
                            }}
                        />
                    ))}
                </div>

                {/* Tour auto-play — hidden under reduced-motion (manual nav only) */}
                {!reduce ? (
                    <button
                        onClick={onPlayPause}
                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors"
                        style={{ borderColor: `rgba(${rgb},0.4)`, color: accent, backgroundColor: `rgba(${rgb},0.08)` }}
                    >
                        {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                        {playing ? 'Pause' : isLast ? 'Replay' : 'Play tour'}
                    </button>
                ) : (
                    <span className="w-9" />
                )}
            </div>
        </div>
    )
}
