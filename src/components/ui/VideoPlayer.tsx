'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'

interface VideoPlayerProps {
    src: string
    poster?: string
    autoPlay?: boolean
    loop?: boolean
    /** Hide all custom controls — pure ambient background mode. */
    ambient?: boolean
    /** Outer wrapper className (size, positioning, rounded corners, etc.). */
    className?: string
    /** Inner <video> element className (object-cover etc.). */
    videoClassName?: string
    /** Accessible label for the video itself. */
    ariaLabel?: string
}

/**
 * Site-wide video player — consistent UX across the portfolio.
 *
 * Default behavior:
 * - Autoplays muted (browsers require this), looped on the hero use case
 * - Shows a "Tap for sound" pill until the visitor unmutes
 * - Center play/pause button when paused
 * - Bottom control bar (play/pause, scrub, time, mute) on hover or while paused
 * - Click the video itself to toggle play/pause
 *
 * Use `ambient={true}` for purely decorative background videos (no UI).
 */
export default function VideoPlayer({
    src,
    poster,
    autoPlay = true,
    loop = false,
    ambient = false,
    className = '',
    videoClassName = '',
    ariaLabel = 'Video',
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [isMuted, setIsMuted] = useState(true)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [showControls, setShowControls] = useState(false)
    const [unmutedOnce, setUnmutedOnce] = useState(false)

    /* Mirror native video state into React so the UI stays in sync if the
     * visitor uses keyboard controls or the browser pauses for any reason. */
    useEffect(() => {
        const v = videoRef.current
        if (!v) return
        const onPlay = () => setIsPlaying(true)
        const onPause = () => setIsPlaying(false)
        const onTime = () => setProgress(v.currentTime)
        const onMeta = () => setDuration(v.duration || 0)
        const onVolume = () => setIsMuted(v.muted)
        v.addEventListener('play', onPlay)
        v.addEventListener('pause', onPause)
        v.addEventListener('timeupdate', onTime)
        v.addEventListener('loadedmetadata', onMeta)
        v.addEventListener('volumechange', onVolume)
        return () => {
            v.removeEventListener('play', onPlay)
            v.removeEventListener('pause', onPause)
            v.removeEventListener('timeupdate', onTime)
            v.removeEventListener('loadedmetadata', onMeta)
            v.removeEventListener('volumechange', onVolume)
        }
    }, [])

    const togglePlay = useCallback(() => {
        const v = videoRef.current
        if (!v) return
        if (v.paused) v.play().catch(() => {})
        else v.pause()
    }, [])

    const toggleMute = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation()
        const v = videoRef.current
        if (!v) return
        v.muted = !v.muted
        // If unmuting, make sure the video is playing
        if (!v.muted) {
            setUnmutedOnce(true)
            if (v.paused) v.play().catch(() => {})
        }
    }, [])

    const scrub = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const v = videoRef.current
        if (!v) return
        v.currentTime = parseFloat(e.target.value)
    }, [])

    const fmt = (s: number): string => {
        if (!isFinite(s) || s < 0) return '0:00'
        const m = Math.floor(s / 60)
        const sec = Math.floor(s % 60)
        return `${m}:${sec.toString().padStart(2, '0')}`
    }

    return (
        <div
            className={`group relative ${className}`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <video
                ref={videoRef}
                src={src || undefined}
                poster={poster || undefined}
                autoPlay={autoPlay}
                muted
                loop={loop}
                playsInline
                preload="metadata"
                onClick={ambient ? undefined : togglePlay}
                className={`block h-full w-full object-cover ${ambient ? '' : 'cursor-pointer'} ${videoClassName}`}
                aria-label={ariaLabel}
            />

            {!ambient && (
                <>
                    {/* "Tap for sound" pill — only while playing + muted + visitor hasn't unmuted before */}
                    {isPlaying && isMuted && !unmutedOnce && (
                        <button
                            onClick={toggleMute}
                            className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white ring-1 ring-white/20 backdrop-blur-md transition-all duration-300 hover:bg-black/85 hover:ring-white/40"
                            aria-label="Unmute video"
                        >
                            <VolumeX className="h-3.5 w-3.5" />
                            Tap for sound
                        </button>
                    )}

                    {/* Centered play button — only when paused */}
                    {!isPlaying && (
                        <button
                            onClick={togglePlay}
                            className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity duration-300"
                            aria-label="Play video"
                        >
                            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform duration-300 hover:scale-105">
                                <Play className="ml-1 h-7 w-7 fill-current" />
                            </span>
                        </button>
                    )}

                    {/* Bottom control bar — fades in on hover or while paused */}
                    <div
                        className={`absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 bg-gradient-to-t from-black/85 to-transparent px-4 py-3 transition-opacity duration-300 ${
                            showControls || !isPlaying ? 'opacity-100' : 'pointer-events-none opacity-0'
                        }`}
                    >
                        <button
                            onClick={togglePlay}
                            className="text-white transition-colors hover:text-[var(--accent-teal)]"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                        </button>

                        <input
                            type="range"
                            min={0}
                            max={duration || 100}
                            value={progress}
                            onChange={scrub}
                            step="0.1"
                            className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-[var(--accent-teal)]"
                            aria-label="Video scrubber"
                        />

                        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                            {fmt(progress)} / {fmt(duration)}
                        </span>

                        <button
                            onClick={toggleMute}
                            className="text-white transition-colors hover:text-[var(--accent-teal)]"
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
