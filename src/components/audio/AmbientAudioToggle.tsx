'use client'

import { useCallback, useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { getAmbientAudio } from '@/lib/audio'

/* One-time "this site has sound" coachmark.
 *
 * The ambient audio is a creativity-score asset that's invisible by
 * default — a muted icon a juror may never click. This mirrors the ⌘K
 * hint pattern in FloatingActions: fires once per visitor, quiet glass
 * tag with a caret, dismisses on scroll or click. Two rules keep the
 * corner calm:
 *   1. One coachmark at a time — we poll for the Ask Anu hint's
 *      localStorage key and only appear after that hint is gone.
 *   2. Clicking the hint IS the action: it enables sound (chair test —
 *      words that say "sound" should make sound), not just dismiss.
 * Desktop only (md+): the jury's primary surface; mobile stays clean. */
const AUDIO_HINT_KEY = 'audio_hint_seen_v1'
const ASK_HINT_KEY = 'ask_anu_hint_seen_v1'

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
    const [hintVisible, setHintVisible] = useState(false)

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

    const dismissHint = useCallback(() => {
        setHintVisible(false)
        try { localStorage.setItem(AUDIO_HINT_KEY, '1') } catch { /* no-op */ }
    }, [])

    const toggle = useCallback(() => {
        setEnabled((prev) => !prev)
        dismissHint()
    }, [dismissHint])

    /* Schedule the hint: wait for the Ask Anu hint's turn to be over.
     * Poll its localStorage key every 3s (it's written when that hint is
     * dismissed — or was set on a past visit). Give up after ~30s so an
     * idle visitor parked on the hero never sees two tags stack. */
    useEffect(() => {
        if (!mounted) return
        try {
            if (localStorage.getItem(AUDIO_HINT_KEY)) return
        } catch { return }

        let attempts = 0
        const iv = window.setInterval(() => {
            attempts += 1
            let askHintDone = false
            try {
                askHintDone = !!localStorage.getItem(ASK_HINT_KEY)
            } catch { /* treat as not done */ }
            if (askHintDone) {
                window.clearInterval(iv)
                // Small beat after the ask hint clears so the corner never
                // swaps one tag for another in the same instant.
                window.setTimeout(() => setHintVisible(true), 2000)
            } else if (attempts >= 10) {
                window.clearInterval(iv)
            }
        }, 3000)
        return () => window.clearInterval(iv)
    }, [mounted])

    /* Auto-dismiss on first scroll — or after 5s on its own. A coachmark
     * is a whisper, not a sticker; it makes its point and leaves. */
    useEffect(() => {
        if (!hintVisible) return
        const onScroll = () => dismissHint()
        window.addEventListener('scroll', onScroll, { passive: true, once: true })
        const t = window.setTimeout(dismissHint, 5000)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.clearTimeout(t)
        }
    }, [hintVisible, dismissHint])

    if (!mounted) return null

    return (
        <div className="relative">
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

            {/* One-time coachmark — clicking it turns the sound ON (not just
                dismiss). Desktop only; caret points up at the chip. */}
            {hintVisible && !enabled && (
                <div
                    role="status"
                    aria-live="polite"
                    className="pointer-events-auto absolute right-0 top-[calc(100%+10px)] hidden md:block"
                    style={{ animation: 'fadeIn 600ms cubic-bezier(0.22, 1, 0.36, 1)' }}
                >
                    <span
                        aria-hidden="true"
                        className="absolute -top-1 right-3 h-2 w-2 rotate-45 border-t border-l border-white/[0.12] bg-black/70"
                    />
                    <button
                        onClick={toggle}
                        className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-white/[0.12] bg-black/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-zinc-300 shadow-[0_8px_32px_-10px_rgba(var(--black-rgb),0.6)] backdrop-blur-xl transition-colors hover:text-white"
                    >
                        <Volume2 className="h-3 w-3 text-[var(--accent-teal)]" aria-hidden="true" />
                        <span>This site has sound</span>
                    </button>
                </div>
            )}
        </div>
    )
}
