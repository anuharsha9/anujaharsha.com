'use client'

import { useCallback, useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { getAmbientAudio } from '@/lib/audio'

/**
 * Floating glass-pill toggle for the ambient audio layer. Mounted as a
 * sibling to the Resume + Ask Anu chips in FloatingActions.
 *
 * Behavior:
 *   - ALWAYS defaults OFF on every page load. No localStorage persistence.
 *     A portfolio shouldn't surprise a recruiter with audio just because
 *     they enabled it on a previous visit. Opt-in is per-session, period.
 *   - prefers-reduced-motion → the toggle never mounts at all (no audio
 *     for users who've explicitly asked for less stimulation).
 *   - AudioContext is created lazily on the first click (iOS requires a
 *     user gesture, and we honor that).
 *   - Smooth fade-in / fade-out is handled inside the audio engine.
 *
 * One legacy cleanup on mount: we delete the old localStorage key from
 * any visitor who had it persisted from the previous behavior, so they
 * don't keep auto-starting on returns.
 */
const LEGACY_STORAGE_KEY = 'ambient_audio_enabled_v1'

export default function AmbientAudioToggle() {
    const [enabled, setEnabled] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Reduced-motion users → never mount. Run this BEFORE we touch state so
    // SSR + first-paint match and we don't render an opt-in they can't use.
    useEffect(() => {
        if (typeof window === 'undefined') return
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) return
        // Clear any persisted "ON" from the previous (preference-persisting)
        // behavior — visitors who'd opted in once shouldn't keep getting
        // sound on every return without re-opting-in.
        try { localStorage.removeItem(LEGACY_STORAGE_KEY) } catch { /* no-op */ }
        setMounted(true)
    }, [])

    // Whenever `enabled` changes, drive the audio engine accordingly.
    useEffect(() => {
        if (!mounted) return
        const audio = getAmbientAudio()
        if (enabled) audio.start()
        else audio.stop()
    }, [enabled, mounted])

    const toggle = useCallback(() => {
        setEnabled((prev) => !prev)
    }, [])

    if (!mounted) return null

    return (
        <button
            onClick={toggle}
            aria-label={enabled ? 'Mute ambient audio' : 'Play ambient audio'}
            aria-pressed={enabled}
            title={enabled ? 'Mute ambient audio' : 'Play ambient audio'}
            className="pointer-events-auto inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/[0.12] bg-black/55 p-2.5 font-mono text-white shadow-[0_8px_32px_-10px_rgba(var(--black-rgb),0.6)] backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-black/75 active:scale-[0.98]"
        >
            {enabled
                ? <Volume2 className="h-3.5 w-3.5 text-[var(--accent-teal)]" />
                : <VolumeX className="h-3.5 w-3.5 text-zinc-400" />}
        </button>
    )
}
