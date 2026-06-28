'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { Play, Pause, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react'

/**
 * Narrated, workflow-led walkthrough player — the primary "See it run" surface
 * for Build Lab apps. Each slide pairs ONE visual with ONE voice snippet
 * (recorded separately by Anuja). It degrades gracefully:
 *   - no `image`  → a branded gradient slide (app icon + beat label)
 *   - no `audioSrc` → caption-only manual slideshow ("voice-over soon")
 *   - with audio  → play/pause, a progress bar, and auto-advance when a clip
 *     ends (the next clip autoplays, since the first Play was a user gesture)
 * The caption is always visible text — accessible + readable when muted.
 */

export interface WalkthroughSlide {
    id: string
    label: string
    caption: string
    audioSrc?: string
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

export default function WalkthroughPlayer({ slides, title, accent, accentRgbVar, Icon }: WalkthroughPlayerProps) {
    const [index, setIndex] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [progress, setProgress] = useState(0) // 0..1 of the current clip
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const reduce = useReducedMotion()

    const rgb = `var(${accentRgbVar})`
    const slide = slides[index]
    const isLast = index === slides.length - 1
    const hasAudio = slides.some(s => !!s.audioSrc)

    const go = useCallback((next: number) => {
        setIndex(Math.max(0, Math.min(slides.length - 1, next)))
        setProgress(0)
    }, [slides.length])

    /* On slide change: if we're in autoplay mode and this slide has a clip,
       play it from the top. (Allowed because the session began with a click.) */
    useEffect(() => {
        const a = audioRef.current
        if (!a) return
        setProgress(0)
        if (playing && slide.audioSrc) {
            a.currentTime = 0
            a.play().catch(() => setPlaying(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])

    const onPlayPause = () => {
        const a = audioRef.current
        if (!a || !slide.audioSrc) return
        if (playing) { a.pause(); setPlaying(false) }
        else { a.play().then(() => setPlaying(true)).catch(() => {}) }
    }

    const onEnded = () => {
        if (!isLast) go(index + 1)   // stays "playing" → effect autoplays the next clip
        else setPlaying(false)
    }

    const onTimeUpdate = () => {
        const a = audioRef.current
        if (a && a.duration) setProgress(a.currentTime / a.duration)
    }

    const btn = 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-zinc-300 transition-colors hover:border-white/40 hover:text-white disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-zinc-300'

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

            {/* ── Audio progress ── */}
            {slide.audioSrc && (
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                    <div className="h-full rounded-full transition-[width] duration-150" style={{ width: `${progress * 100}%`, backgroundColor: accent }} />
                </div>
            )}

            {/* ── Controls ── */}
            <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide" className={btn}>
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => go(index + 1)} disabled={isLast} aria-label="Next slide" className={btn}>
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>

                {/* progress dots */}
                <div className="flex items-center gap-1.5">
                    {slides.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => go(i)}
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

                {hasAudio ? (
                    <button
                        onClick={onPlayPause}
                        disabled={!slide.audioSrc}
                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors disabled:opacity-40"
                        style={{ borderColor: `rgba(${rgb},0.4)`, color: accent, backgroundColor: `rgba(${rgb},0.08)` }}
                    >
                        {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                        {playing ? 'Pause' : 'Play'}
                    </button>
                ) : (
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">Voice-over soon</span>
                )}
            </div>

            {/* one audio element, src swaps per slide */}
            <audio
                ref={audioRef}
                src={slide.audioSrc || undefined}
                onEnded={onEnded}
                onTimeUpdate={onTimeUpdate}
                preload="none"
            />
        </div>
    )
}
