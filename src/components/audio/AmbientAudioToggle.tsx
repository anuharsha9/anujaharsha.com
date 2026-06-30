'use client'

import { useCallback, useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { getAmbientAudio } from '@/lib/audio'

/**
 * Floating glass-pill toggle for the ambient audio layer. Mounted as a
 * sibling to the Resume + Ask Anu chips in FloatingActions.
 *
 * Behavior:
 *   - Default OFF. Visitor opts in by clicking the chip.
 *   - State persisted via localStorage so it survives reloads.
 *   - prefers-reduced-motion → the toggle never mounts at all (no audio
 *     for users who've explicitly asked for less stimulation).
 *   - AudioContext is created lazily on the first click (iOS requires a
 *     user gesture, and we honor that).
 *   - Smooth fade-in / fade-out is handled inside the audio engine.
 */
const STORAGE_KEY = 'ambient_audio_enabled_v1'

export default function AmbientAudioToggle() {
    const [enabled, setEnabled] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Reduced-motion users → never mount. Run this BEFORE we touch state so
    // SSR + first-paint match and we don't render an opt-in they can't use.
    useEffect(() => {
        if (typeof window === 'undefined') return
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) return
        // Restore previous preference (if they'd turned it ON before).
        let restored = false
        try {
            restored = localStorage.getItem(STORAGE_KEY) === '1'
        } catch { /* localStorage blocked → fall back to OFF */ }
        setEnabled(restored)
        setMounted(true)
    }, [])

    // Whenever `enabled` changes, drive the audio engine accordingly.
    // (We deliberately do NOT auto-start on mount even if restored=true —
    // browsers require a user gesture to create/resume an AudioContext;
    // the engine will silently no-op until the user clicks again.)
    useEffect(() => {
        if (!mounted) return
        const audio = getAmbientAudio()
        if (enabled) audio.start()
        else audio.stop()
    }, [enabled, mounted])

    const toggle = useCallback(() => {
        setEnabled((prev) => {
            const next = !prev
            try { localStorage.setItem(STORAGE_KEY, next ? '1' : '0') } catch { /* */ }
            return next
        })
    }, [])

    if (!mounted) return null

    return (
        <button
            onClick={toggle}
            aria-label={enabled ? 'Mute ambient audio' : 'Play ambient audio'}
            aria-pressed={enabled}
            title={enabled ? 'Mute' : 'Sound on'}
            className="pointer-events-auto inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.12] bg-black/55 p-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white shadow-[0_8px_32px_-10px_rgba(var(--black-rgb),0.6)] backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-black/75 active:scale-[0.98] sm:px-4 sm:py-2 md:text-[11px]"
        >
            {enabled
                ? <Volume2 className="h-3.5 w-3.5 text-[var(--accent-teal)]" />
                : <VolumeX className="h-3.5 w-3.5 text-zinc-400" />}
            <span className="hidden sm:inline">{enabled ? 'Sound on' : 'Sound off'}</span>
        </button>
    )
}
