/**
 * Ambient audio — generative, on-brand for Anuja's "aurora + ocean + dark"
 * aesthetic. Built entirely from Web Audio nodes (no audio files), so it
 * adds zero bundle weight and loops infinitely without seams.
 *
 * The sound: a deep ocean fundamental (warm sub bass) + an aurora shimmer
 * layer (two detuned high sines, slowly LFO-panned), all run through a
 * low-pass filter for warmth — never harsh, never bright. Master sits at
 * −40 dB so it's *felt* more than heard. Like the sound aurora would make
 * if you could hear it.
 *
 * Hard guarantees:
 *   - Default OFF (the React toggle owns persistence).
 *   - iOS-safe: AudioContext is created on first user gesture and resumed
 *     on every play() call (Safari suspends contexts aggressively).
 *   - prefers-reduced-motion → audio host should skip mounting entirely.
 *   - Smooth fade-in (3s) on enable, smooth fade-out (1.5s) on disable so
 *     it never clicks or pops.
 *   - Idempotent: start()/stop() can be called repeatedly.
 */

const MASTER_GAIN_DB = -40
const FADE_IN_SECONDS = 3
const FADE_OUT_SECONDS = 1.5

function dbToLinear(db: number) {
    return Math.pow(10, db / 20)
}

export class AmbientAudio {
    private ctx: AudioContext | null = null
    private master: GainNode | null = null
    private nodes: AudioNode[] = []
    private oscillators: OscillatorNode[] = []
    private running = false

    /** Wire the full graph + start every oscillator. Idempotent. */
    start() {
        if (typeof window === 'undefined') return
        if (this.running) return

        // Lazy-create the AudioContext on first start (must be after a user
        // gesture or Safari will throw NotAllowedError).
        if (!this.ctx) {
            const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
            if (!AC) return
            this.ctx = new AC()
        }

        // iOS suspends contexts when the tab loses focus — always resume.
        if (this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => { /* user gesture required; will be retried */ })
        }

        const ctx = this.ctx
        const now = ctx.currentTime

        // ── Master gain (controls fade in/out + final level) ─────────────
        const master = ctx.createGain()
        master.gain.setValueAtTime(0.0001, now)
        master.gain.exponentialRampToValueAtTime(dbToLinear(MASTER_GAIN_DB), now + FADE_IN_SECONDS)
        master.connect(ctx.destination)
        this.master = master

        // ── Low-pass filter — keeps everything warm, dark, never bright ──
        const lpf = ctx.createBiquadFilter()
        lpf.type = 'lowpass'
        lpf.frequency.value = 700
        lpf.Q.value = 0.5
        lpf.connect(master)

        // ── Slow stereo panner — the "ocean wash" left/right drift ───────
        const panner = ctx.createStereoPanner()
        panner.connect(lpf)
        const panLfo = ctx.createOscillator()
        panLfo.frequency.value = 0.06 // ~17s cycle, slow as the tide
        const panLfoDepth = ctx.createGain()
        panLfoDepth.gain.value = 0.4 // ±0.4 = subtle stereo movement
        panLfo.connect(panLfoDepth)
        panLfoDepth.connect(panner.pan)
        panLfo.start(now)
        this.oscillators.push(panLfo)

        // ── Aurora shimmer layer — slow LFO modulating gain ──────────────
        // Two slightly-detuned high sines = chorus-like shimmer, breathing
        // in and out the way northern-light curtains drift.
        const shimmerGain = ctx.createGain()
        shimmerGain.gain.value = 0.35
        shimmerGain.connect(panner)

        const shimmerLfo = ctx.createOscillator()
        shimmerLfo.frequency.value = 0.09 // ~11s breath cycle
        const shimmerLfoDepth = ctx.createGain()
        shimmerLfoDepth.gain.value = 0.18 // modulates gain ±0.18
        shimmerLfo.connect(shimmerLfoDepth)
        shimmerLfoDepth.connect(shimmerGain.gain)
        shimmerLfo.start(now)
        this.oscillators.push(shimmerLfo)

        const aurora1 = ctx.createOscillator()
        aurora1.type = 'sine'
        aurora1.frequency.value = 220 // A3
        aurora1.detune.value = -7
        aurora1.connect(shimmerGain)
        aurora1.start(now)
        this.oscillators.push(aurora1)

        const aurora2 = ctx.createOscillator()
        aurora2.type = 'sine'
        aurora2.frequency.value = 330 // E4 — a perfect fifth above; subtle harmonic
        aurora2.detune.value = +7
        aurora2.connect(shimmerGain)
        aurora2.start(now)
        this.oscillators.push(aurora2)

        // ── Ocean depth layer — warm sub bass ─────────────────────────────
        // The frequency that's *felt* not heard. Anchors the whole texture.
        const depth = ctx.createGain()
        depth.gain.value = 0.6
        depth.connect(panner)

        const sub = ctx.createOscillator()
        sub.type = 'sine'
        sub.frequency.value = 82.5 // ≈ E2
        sub.connect(depth)
        sub.start(now)
        this.oscillators.push(sub)

        const subHarmonic = ctx.createOscillator()
        subHarmonic.type = 'sine'
        subHarmonic.frequency.value = 110 // A2 — a perfect fourth above
        subHarmonic.detune.value = +5
        const subHarmonicGain = ctx.createGain()
        subHarmonicGain.gain.value = 0.5
        subHarmonic.connect(subHarmonicGain)
        subHarmonicGain.connect(depth)
        subHarmonic.start(now)
        this.oscillators.push(subHarmonic)

        this.nodes.push(lpf, panner, shimmerGain, depth, panLfoDepth, shimmerLfoDepth, subHarmonicGain)
        this.running = true
    }

    /** Smooth fade-out then teardown. Idempotent. */
    stop() {
        if (!this.running || !this.ctx || !this.master) return
        const ctx = this.ctx
        const now = ctx.currentTime
        const fadeEnd = now + FADE_OUT_SECONDS

        try {
            this.master.gain.cancelScheduledValues(now)
            this.master.gain.setValueAtTime(this.master.gain.value, now)
            this.master.gain.exponentialRampToValueAtTime(0.0001, fadeEnd)
        } catch { /* node may already be disposed */ }

        // After the fade, stop + disconnect every node. Save refs in closure
        // so calling start() again rebuilds cleanly.
        const oscs = this.oscillators
        const nodes = this.nodes
        const master = this.master
        window.setTimeout(() => {
            oscs.forEach((o) => { try { o.stop(); o.disconnect() } catch { /* */ } })
            nodes.forEach((n) => { try { n.disconnect() } catch { /* */ } })
            try { master.disconnect() } catch { /* */ }
        }, FADE_OUT_SECONDS * 1000 + 100)

        this.oscillators = []
        this.nodes = []
        this.master = null
        this.running = false
    }

    /** True once the AudioContext has been created (i.e. user has interacted). */
    get isReady() { return !!this.ctx }
}

// ─────────────────────────────────────────────────────────────────────────────
// Singleton — there's only ever one ambient instance per page.
let _ambient: AmbientAudio | null = null
export function getAmbientAudio(): AmbientAudio {
    if (!_ambient) _ambient = new AmbientAudio()
    return _ambient
}

// ─────────────────────────────────────────────────────────────────────────────
// Legacy no-op shims. The trailer components (RC/ML/DSML) still import the
// previous interactive-sound API (wave crashes, cinematic impacts, an "Adele
// chord" beat). We never shipped that audio, so the imports always invoked
// no-ops — keep them no-ops here so the trailers compile while the ambient
// engine above is the only audio that actually plays.
export function initAudio() { return null }
export function isAudioMuted() { return true }
export function toggleAudioMute() { return true }
export function playWaveCrash(_volume = 0.2) {}
export function playOceanSwoosh(_volume = 0.1) {}
export function playCinematicImpact(_volume = 0.25) {}
export function startTrailerMusic(_volume = 0.4) { return () => {} }
export function playAdeleChord(_stepIndex: number, _volume = 0.4) {}
