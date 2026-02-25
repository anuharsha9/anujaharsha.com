'use client'

import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PresenterBar from './PresenterBar'

/* ─── types ─────────────────────────────────────────── */
export interface MovieBeat {
    /** Unique identifier */
    id: string
    /** Duration this beat is shown (ms) */
    duration: number
    /** The Beat component to render */
    component: ReactNode
    /** Label shown in the progress bar */
    label?: string
    /** Signal text (e.g. "CONSTRAINT: FRAGMENTATION") */
    signal?: string
    /** Optional narrator line for cinematic full-bleed mode */
    narration?: string
    /** Optional delay before narration appears (seconds) */
    narrationDelay?: number
    /** Whether to show the presenter avatar */
    presenter?: boolean
}

interface AutoPlayStoryProps {
    beats: MovieBeat[]
    /** Called when the movie finishes all beats */
    onComplete?: () => void
    /** Start playing immediately or wait */
    autoStart?: boolean
    /** Whether to loop the movie */
    loop?: boolean
    /** Whether the component is in viewport (controls play/pause) */
    isInView?: boolean
    /** Compact mode for smaller viewports */
    compact?: boolean
    /** True if acting as a full-bleed ambient background */
    fullBleedBackground?: boolean
}

/* ─── easing ────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const

/* ─── main component ─────────────────────────────────── */
export default function AutoPlayStory({
    beats,
    onComplete,
    autoStart = true,
    loop = true,
    isInView = true,
    compact = false,
    fullBleedBackground = false,
}: AutoPlayStoryProps) {
    const [currentBeat, setCurrentBeat] = useState(0)
    const [isPlaying, setIsPlaying] = useState(autoStart)
    const [progress, setProgress] = useState(0)
    const [totalElapsed, setTotalElapsed] = useState(0)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const progressRef = useRef<NodeJS.Timeout | null>(null)
    const startTimeRef = useRef<number>(0)

    const totalDuration = beats.reduce((sum, b) => sum + b.duration, 0)

    // Calculate elapsed time up to current beat
    const elapsedBefore = beats.slice(0, currentBeat).reduce((sum, b) => sum + b.duration, 0)

    /* ── advance to next beat ── */
    const advanceBeat = useCallback(() => {
        setCurrentBeat((prev) => {
            const next = prev + 1
            if (next >= beats.length) {
                if (loop) {
                    setTotalElapsed(0)
                    return 0
                }
                setIsPlaying(false)
                onComplete?.()
                return prev
            }
            return next
        })
    }, [beats.length, loop, onComplete])

    /* ── beat timer ── */
    useEffect(() => {
        if (!isPlaying || !isInView) return

        const beat = beats[currentBeat]
        if (!beat) return

        startTimeRef.current = Date.now()

        // Set timer to advance after beat duration
        timerRef.current = setTimeout(advanceBeat, beat.duration)

        // Progress ticker (60fps-ish)
        const tick = () => {
            const elapsed = Date.now() - startTimeRef.current
            const beatProgress = Math.min(elapsed / beat.duration, 1)
            setProgress(beatProgress)
            setTotalElapsed(elapsedBefore + elapsed)

            if (beatProgress < 1) {
                progressRef.current = setTimeout(tick, 16)
            }
        }
        tick()

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
            if (progressRef.current) clearTimeout(progressRef.current)
        }
    }, [currentBeat, isPlaying, isInView, beats, advanceBeat, elapsedBefore])

    /* ── pause when out of view ── */
    useEffect(() => {
        if (!isInView && isPlaying) {
            if (timerRef.current) clearTimeout(timerRef.current)
            if (progressRef.current) clearTimeout(progressRef.current)
        }
    }, [isInView, isPlaying])

    /* ── manual controls ── */
    const togglePlay = useCallback(() => {
        setIsPlaying((prev) => !prev)
    }, [])

    const jumpToBeat = useCallback((index: number) => {
        setCurrentBeat(index)
        setIsPlaying(true)
    }, [])

    const currentBeatData = beats[currentBeat]
    const overallProgress = totalDuration > 0 ? totalElapsed / totalDuration : 0

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000)
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        return `${minutes}:${String(seconds).padStart(2, '0')}`
    }

    return (
        <div className={`relative w-full ${fullBleedBackground ? 'h-full' : compact ? 'max-w-3xl mx-auto' : 'max-w-5xl mx-auto'}`}>
            {/* ── Beat Container ── */}
            <div className={`
                relative w-full overflow-hidden
                ${fullBleedBackground ? 'absolute inset-0 h-full' : `${compact ? 'min-h-[400px]' : 'min-h-[500px] md:min-h-[600px]'} rounded-2xl border border-white/[0.06] bg-zinc-950/90 backdrop-blur-sm`}
                `}>

                {/* Wireframe morph sweep between beats for cinematic continuity */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={`morph-overlay-${currentBeat}`}
                        className="pointer-events-none absolute inset-0 z-[12]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.55, ease }}
                    >
                        <motion.div
                            className="absolute -left-[18%] top-0 h-full w-[40%] bg-[linear-gradient(90deg,transparent,var(--overlay-cyan-electric-15),transparent)] blur-2xl"
                            initial={{ x: '-18%', opacity: 0 }}
                            animate={{ x: '138%', opacity: [0, 0.75, 0] }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], times: [0, 0.48, 1] }}
                        />
                        <motion.svg
                            className="absolute inset-0 h-full w-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.22, 0] }}
                            transition={{ duration: 0.9, ease, times: [0, 0.45, 1] }}
                            aria-hidden="true"
                        >
                            <motion.path
                                d="M0,34 C20,26 36,42 50,36 C64,30 78,42 100,32"
                                fill="none"
                                stroke="var(--overlay-cyan-neon-38)"
                                strokeWidth="0.35"
                                strokeDasharray="2 2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <motion.path
                                d="M0,66 C22,58 37,74 52,67 C70,59 82,70 100,63"
                                fill="none"
                                stroke="var(--overlay-cyan-neon-26)"
                                strokeWidth="0.3"
                                strokeDasharray="2 2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.82, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </motion.svg>
                    </motion.div>
                </AnimatePresence>

                {/* Signal badge */}
                <AnimatePresence mode="wait">
                    {currentBeatData?.signal && (
                        <motion.div
                            key={`signal-${currentBeat}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease }}
                            className="absolute top-4 left-4 md:top-6 md:left-6 z-20"
                        >
                            <span className="font-mono text-[11px] tracking-[0.2em] text-teal-300/90 uppercase bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                                {currentBeatData.signal}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Beat content with morph-style overlap transition */}
                <div className="relative h-full w-full">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={`beat-${currentBeat}`}
                            initial={{
                                opacity: 0,
                                y: 22,
                                scale: 1.035,
                                filter: 'blur(14px)',
                                clipPath: 'inset(3% 1.5% 4% 1.5% round 14px)',
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: 'blur(0px)',
                                clipPath: 'inset(0% 0% 0% 0% round 0px)',
                            }}
                            exit={{
                                opacity: 0,
                                y: -14,
                                scale: 0.985,
                                filter: 'blur(12px)',
                                clipPath: 'inset(4% 2% 3% 2% round 16px)',
                            }}
                            transition={{ duration: 1.02, ease: [0.18, 1, 0.28, 1] }}
                            className="absolute inset-0 flex h-full w-full items-center justify-center p-4 md:p-8"
                        >
                            {currentBeatData?.component}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Graphic-novel narrator layer for full-bleed mode */}
                {fullBleedBackground && currentBeatData?.narration && (
                    <div className="pointer-events-none absolute left-1/2 top-16 z-[25] w-[min(94vw,58rem)] -translate-x-1/2 sm:top-8">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={`narration-${currentBeat}`}
                                initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                                transition={{ duration: 0.45, ease }}
                            >
                                <PresenterBar
                                    narration={currentBeatData.narration}
                                    delay={currentBeatData.narrationDelay ?? 0}
                                    showAvatar={currentBeatData.presenter}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {/* Beat counter (top right) - hide if background */}
                {!fullBleedBackground && (
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
                        <span className="font-mono text-[10px] text-zinc-600 tracking-wider">
                            {String(currentBeat + 1).padStart(2, '0')} / {String(beats.length).padStart(2, '0')}
                        </span>
                    </div>
                )}
            </div>

            {/* ── Controls Bar (Hide if background Mode) ── */}
            {!fullBleedBackground && (
                <div className="mt-4 space-y-3">
                    {/* Per-beat progress segments */}
                    <div className="flex gap-0.5 h-1 rounded-full overflow-hidden">
                        {beats.map((beat, i) => {
                            const beatWidthPercent = (beat.duration / totalDuration) * 100
                            let beatFill = 0
                            if (i < currentBeat) beatFill = 1
                            else if (i === currentBeat) beatFill = progress

                            return (
                                <button
                                    key={beat.id}
                                    onClick={() => jumpToBeat(i)}
                                    className="relative h-full cursor-pointer group"
                                    style={{ width: `${beatWidthPercent}%` }}
                                    title={beat.label || `Beat ${i + 1}`}
                                >
                                    <div className="absolute inset-0 bg-white/[0.06] rounded-sm" />
                                    <motion.div
                                        className="absolute inset-0 bg-teal-500/70 rounded-sm origin-left"
                                        style={{ scaleX: beatFill }}
                                        transition={{ duration: 0.1 }}
                                    />
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 rounded-sm transition-opacity" />
                                </button>
                            )
                        })}
                    </div>

                    {/* Time + controls */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Play/Pause */}
                            <button
                                onClick={togglePlay}
                                className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.1] transition-all cursor-pointer"
                            >
                                {isPlaying ? (
                                    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                                        <rect x="0" y="0" width="3" height="12" rx="1" />
                                        <rect x="7" y="0" width="3" height="12" rx="1" />
                                    </svg>
                                ) : (
                                    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                                        <path d="M0 0 L10 6 L0 12Z" />
                                    </svg>
                                )}
                            </button>

                            {/* Time */}
                            <span className="font-mono text-[11px] text-zinc-500 tabular-nums">
                                {formatTime(totalElapsed)} / {formatTime(totalDuration)}
                            </span>
                        </div>

                        {/* Current beat label */}
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentBeat}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                className="font-mono text-[10px] text-zinc-600 tracking-wider truncate max-w-[200px]"
                            >
                                {currentBeatData?.label}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    )
}
