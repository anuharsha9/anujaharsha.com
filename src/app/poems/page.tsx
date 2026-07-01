'use client'

import { m } from 'framer-motion'
import { POEMS, type Poem } from '@/data/poems'
import { EASE_CINEMATIC as ease, DURATION } from '@/lib/motion'

/**
 * /poems — the full 14-poem reader.
 *
 * Long single-column scroll, Moleskine type, same aesthetic as the
 * Gifts-from-Life sheet that's already on the Life tab. Each poem gets a
 * generous title block + stanza-by-stanza render. Hinglish poems use a
 * slightly looser leading because Hindi phonetics in Roman script read better
 * with more breathing room.
 *
 * Routed as a "detour" page — SiteNav shows a single Back pill. No hero, no
 * fluff: this is for visitors who came here on purpose.
 */

function PoemBlock({ poem, index }: { poem: Poem; index: number }) {
    const isHinglish = poem.language === 'hinglish'
    return (
        <m.article
            id={poem.slug}
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: DURATION.reveal, ease, delay: Math.min(index * 0.04, 0.2) }}
            className="mx-auto max-w-2xl px-6 py-16 md:py-20"
        >
            {/* Title block */}
            <header className="mb-10 text-center md:mb-14">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/70 md:text-xs">
                    {`Poem ${String(poem.number).padStart(2, '0')}`}
                    {poem.language === 'hinglish' && (
                        <span className="ml-3 text-zinc-600">· Hinglish</span>
                    )}
                </p>
                <h2 className="font-serif text-3xl font-light leading-tight tracking-tight text-white md:text-5xl">
                    {poem.title}
                </h2>
                {poem.note && (
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                        {poem.note}
                    </p>
                )}
            </header>

            {/* Stanzas */}
            <div className={`space-y-8 md:space-y-10 ${isHinglish ? 'leading-[1.9]' : 'leading-relaxed'}`}>
                {poem.stanzas.map((stanza, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                        {stanza.map((line, lIdx) => (
                            <p
                                key={lIdx}
                                className="text-[15px] text-zinc-300 md:text-lg"
                            >
                                {line}
                            </p>
                        ))}
                    </div>
                ))}
            </div>

            {/* End marker */}
            <p className="mt-14 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                ·
            </p>
        </m.article>
    )
}

export default function PoemsPage() {
    const englishCount = POEMS.filter(p => p.language === 'en').length
    const hinglishCount = POEMS.length - englishCount
    return (
        <div className="relative z-[2] min-h-screen pb-24 pt-32 md:pt-40">
            {/* Page intro */}
            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.slow, ease }}
                className="mx-auto max-w-2xl px-6 text-center"
            >
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/70 md:text-xs">
                    Voice · {POEMS.length} poems
                </p>
                <h1 className="font-serif text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
                    Things I write
                </h1>
                <p className="mt-6 text-base font-light leading-relaxed text-zinc-400 md:text-lg">
                    {englishCount} in English, {hinglishCount} in Hinglish. About mothers, daughters,
                    sons, longing, distance, love. Kept in Apple Notes for years — here in print for
                    the first time. Read in any order.
                </p>

                {/* Quiet table of contents */}
                <nav aria-label="Poems index" className="mt-12 grid grid-cols-1 gap-1.5 text-left sm:grid-cols-2">
                    {POEMS.map(poem => (
                        <a
                            key={poem.slug}
                            href={`#${poem.slug}`}
                            className="group flex items-baseline gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-200 hover:bg-white/[0.04]"
                        >
                            <span className="w-8 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                                {String(poem.number).padStart(2, '0')}
                            </span>
                            <span className="font-serif text-base text-zinc-300 transition-colors group-hover:text-white">
                                {poem.title}
                            </span>
                        </a>
                    ))}
                </nav>
            </m.div>

            {/* Hairline divider */}
            <div className="mx-auto mt-16 h-px max-w-md bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* All poems, top to bottom */}
            <div className="divide-y divide-white/[0.05]">
                {POEMS.map((poem, i) => (
                    <PoemBlock key={poem.slug} poem={poem} index={i} />
                ))}
            </div>

            {/* End-of-page marker */}
            <p className="mt-16 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                — End of collection —
            </p>
        </div>
    )
}
