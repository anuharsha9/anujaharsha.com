'use client'

import { useRef } from 'react'
import { m, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { EASE_CINEMATIC as ease, DURATION } from '@/lib/motion'

/**
 * Design philosophy section. The text is structured as STANZAS so the reveal
 * can pause between thoughts; each word fades + un-blurs in sequence; and the
 * four emphasis anchors (chair / sit / obviousness / obsessing) light up in
 * the case-study accent as they land.
 *
 * After the words finish, a hand-drawn linework chair self-draws and the
 * signature line appears — the metaphor finally has a payoff.
 */
type Word = { text: string; emphasis?: boolean }
type Stanza = Word[]

const STANZAS: Stanza[] = [
    [
        { text: '"When' }, { text: 'you' }, { text: 'look' }, { text: 'at' }, { text: 'a' },
        { text: 'chair', emphasis: true }, { text: '—' }, { text: 'the' }, { text: 'only' },
        { text: 'thing' }, { text: 'that' }, { text: 'comes' }, { text: 'to' }, { text: 'mind' },
        { text: 'is' }, { text: 'to' }, { text: 'sit', emphasis: true }, { text: 'on' }, { text: 'it.' },
    ],
    [
        { text: "It's" }, { text: 'the' }, { text: 'whole' }, { text: 'point' }, { text: 'of' },
        { text: 'creating' }, { text: 'anything' }, { text: '—' }, { text: 'to' }, { text: 'achieve' },
        { text: 'that' }, { text: 'obviousness', emphasis: true }, { text: '.' }, { text: 'No?' },
    ],
    [
        { text: 'How?' }, { text: 'By' },
        { text: 'obsessing', emphasis: true }, { text: 'over' }, { text: 'how' }, { text: 'humans' },
        { text: 'experience' }, { text: 'things."' },
    ],
]

/* Per-word stagger so the eye flows across the line. We compute a global word
 * index across all stanzas, then add a small extra dwell between stanzas so
 * each beat lands separately. */
const WORD_STAGGER = 0.08
const STANZA_GAP = 0.45
const TEXT_START_DELAY = 0.35

function totalWordCount(stanzas: Stanza[]): number {
    return stanzas.reduce((acc, s) => acc + s.length, 0)
}

function delayForWord(stanzaIdx: number, wordIdx: number): number {
    const wordsBefore = STANZAS.slice(0, stanzaIdx).reduce((acc, s) => acc + s.length, 0)
    return TEXT_START_DELAY + stanzaIdx * STANZA_GAP + (wordsBefore + wordIdx) * WORD_STAGGER
}

const TOTAL_WORDS = totalWordCount(STANZAS)
const TEXT_DURATION =
    TEXT_START_DELAY + (STANZAS.length - 1) * STANZA_GAP + TOTAL_WORDS * WORD_STAGGER + 0.6

/* Linework chair — front-view, recognizable in two seconds.
 * Uses m.path with pathLength (the framer-motion docs guarantee path
 * support; line elements get a fragile keyframe-resolver race in dev mode).
 * Each stroke is geometry-as-path so the same draw API works for them all. */
function ChairLineDrawing({ play }: { play: boolean }) {
    const strokeBase = {
        stroke: 'currentColor',
        strokeWidth: 1.25,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        fill: 'none' as const,
    }
    const drawAt = (delay: number) => ({
        initial: { pathLength: 0, opacity: 0 },
        animate: play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
        transition: { duration: DURATION.reveal, delay, ease },
    })

    return (
        <svg
            viewBox="0 0 200 220"
            className="h-32 w-32 text-[var(--accent-teal)]/60 md:h-40 md:w-40"
            aria-hidden="true"
        >
            {/* Back uprights */}
            <m.path d="M 70 20 L 70 120" {...strokeBase} {...drawAt(0)} />
            <m.path d="M 130 20 L 130 120" {...strokeBase} {...drawAt(0.15)} />
            {/* Top rail of back (gently curved) */}
            <m.path d="M 65 22 Q 100 12 135 22" {...strokeBase} {...drawAt(0.35)} />
            {/* Back slats */}
            <m.path d="M 78 50 L 122 50" {...strokeBase} strokeWidth={0.9} opacity={0.7} {...drawAt(0.55)} />
            <m.path d="M 78 75 L 122 75" {...strokeBase} strokeWidth={0.9} opacity={0.5} {...drawAt(0.68)} />
            {/* Seat — top edge */}
            <m.path d="M 55 120 L 155 120" {...strokeBase} {...drawAt(0.85)} />
            {/* Seat — front edge (depth) */}
            <m.path d="M 55 127 L 155 127" {...strokeBase} strokeWidth={1} opacity={0.65} {...drawAt(1.0)} />
            {/* Front legs */}
            <m.path d="M 60 127 L 60 200" {...strokeBase} {...drawAt(1.15)} />
            <m.path d="M 150 127 L 150 200" {...strokeBase} {...drawAt(1.28)} />
            {/* Soft floor line */}
            <m.path d="M 40 202 L 170 202" {...strokeBase} strokeWidth={0.8} opacity={0.4} {...drawAt(1.5)} />
        </svg>
    )
}

export default function FoundationBlock() {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.25 })

    return (
        <section
            ref={ref}
            className="relative w-full overflow-hidden border-y border-white/[0.04] bg-transparent py-24 md:py-32"
        >
            {/* Ambient glow — single soft accent, no longer generic */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(var(--accent-teal-glow-rgb),0.05)] blur-[140px]" />

            <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center md:px-8 lg:px-12">
                {/* Large decorative quote mark */}
                <m.span
                    className="pointer-events-none mb-4 select-none font-serif text-7xl leading-none text-white/[0.05] md:text-8xl"
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: DURATION.drift, ease }}
                >
                    &ldquo;
                </m.span>

                {/* Stanzas — word-by-word reveal */}
                <blockquote className="space-y-6 md:space-y-8">
                    {/* Readable text for screen readers + search crawlers. The visible copy
                        below is split into per-word spans (spaces come from a flex gap), so its
                        DOM text has no spaces ("Whenyoulookatachair…"). Expose the real sentence
                        here and hide the animated version from assistive tech. */}
                    <p className="sr-only">
                        {"When you look at a chair — the only thing that comes to mind is to sit on it. It's the whole point of creating anything — to achieve that obviousness. No? How? By obsessing over how humans experience things."}
                    </p>
                    {STANZAS.map((stanza, sIdx) => (
                        <p
                            key={sIdx}
                            aria-hidden="true"
                            className="flex flex-wrap items-baseline justify-center gap-x-[0.35em] gap-y-1 font-sans text-2xl italic leading-[1.55] text-white md:text-3xl lg:text-4xl"
                        >
                            {stanza.map((word, wIdx) => (
                                <m.span
                                    key={`${sIdx}-${wIdx}`}
                                    className={word.emphasis ? 'text-[var(--accent-teal)]' : ''}
                                    initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                                    animate={
                                        isInView
                                            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                                            : {}
                                    }
                                    transition={{
                                        duration: DURATION.gentle,
                                        delay: delayForWord(sIdx, wIdx),
                                        ease,
                                    }}
                                >
                                    {word.text}
                                </m.span>
                            ))}
                        </p>
                    ))}
                </blockquote>

                {/* Payoff — the chair appears after the philosophy lands */}
                <m.div
                    className="mt-14 md:mt-16"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: DURATION.medium, delay: TEXT_DURATION }}
                >
                    <ChairLineDrawing play={isInView} />
                </m.div>

                {/* Signature line */}
                <m.p
                    className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/70 md:text-xs"
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: DURATION.deliberate, delay: TEXT_DURATION + 1.8, ease }}
                >
                    — How I design
                </m.p>

                {/* The curious can go deep — the full written philosophy.
                    Promoted from a quiet mono-link to the primary glass button
                    (teal-glow halo + light-sweep) so it actually invites a
                    click — the previous treatment was too easy to miss. */}
                <m.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: DURATION.deliberate, delay: TEXT_DURATION + 2.1, ease }}
                >
                    <Button
                        variant="primary"
                        href="/philosophy"
                        icon={<ArrowRight className="h-4 w-4" />}
                    >
                        Read my design philosophy
                    </Button>
                </m.div>
            </div>
        </section>
    )
}
