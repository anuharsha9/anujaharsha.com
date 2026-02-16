'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { articleLinks } from '@/data/home'

// ─── Poem Data ────────────────────────────────────────────────────────────────
interface Stanza {
    lines: string[]
    gift: string
    giftLine: number
}

const stanzas: Stanza[] = [
    {
        lines: [
            'Opening my eyes to this beautiful world',
            'I see the creator of my life,',
            'Life gave me the gift of mother;',
            'To be loved, nurtured, and cared for,',
        ],
        gift: 'mother',
        giftLine: 2,
    },
    {
        lines: [
            'In the struggle to get up after a fall',
            'I see the person who lifts me up,',
            'Life gave me the gift of a father;',
            'To be loved and feel secure,',
        ],
        gift: 'father',
        giftLine: 2,
    },
    {
        lines: [
            "When I'm a blank canvas and lost",
            'I see what helps me build my existence,',
            'Life gave me the gift of a teacher;',
            "To guide me through it's path,",
        ],
        gift: 'teacher',
        giftLine: 2,
    },
    {
        lines: [
            'Try to cope with the ups and downs of life',
            "I see the person who's always with me,",
            'Life gave me the gift of a sister;',
            'To share my happiness and sadness,',
        ],
        gift: 'sister',
        giftLine: 2,
    },
    {
        lines: [
            "When love loses its meaning, and I'm fading",
            'I see what helps me to hold on to it,',
            'Life gave me the gift of motherhood;',
            'To teach me the meaning of love,',
        ],
        gift: 'motherhood',
        giftLine: 2,
    },
    {
        lines: [
            'In a world where everyone comes and goes alone',
            'I see what helps me through this forsaken journey,',
            'Life gave me the gift of a husband;',
            'To have someone to belong to,',
        ],
        gift: 'husband',
        giftLine: 2,
    },
    {
        lines: [
            'In the moments when I feel nothing is right',
            'I see what brings me comfort,',
            'Life gave me the gift of a friend;',
            'To have a shoulder to cry on,',
        ],
        gift: 'friend',
        giftLine: 2,
    },
    {
        lines: [
            'In the midst of all that is happening',
            'I see a smile on my face, trying to push through,',
            'Life gave me the gift of joy;',
            "To enjoy it's beauty and gifts,",
        ],
        gift: 'joy',
        giftLine: 2,
    },
    {
        lines: [
            'When I start becoming scornful',
            'I see what teaches me a lesson,',
            'Life gave me the gift of pain;',
            'To make me grounded and grateful,',
        ],
        gift: 'pain',
        giftLine: 2,
    },
    {
        lines: [
            'When I go blind with my fantasies',
            'I see what opens my eyes,',
            'Life gave me the gift of loss;',
            'To enlighten me of the world,',
        ],
        gift: 'loss',
        giftLine: 2,
    },
    {
        lines: [
            'When agony and grief overwhelm me',
            'I see what cuts through my bitterness,',
            'Life gave me the gift of love;',
            'To make me kind and benevolent,',
        ],
        gift: 'love',
        giftLine: 2,
    },
    {
        lines: [
            'Where everything and everyone is just temporary',
            'I see what helps me treasure the evanescent,',
            'Life gave me the gift of art;',
            'To be able to express myself.',
        ],
        gift: 'art',
        giftLine: 2,
    },
]

// ─── Single Stanza — cinematic blur/focus ─────────────────────────────────────
function PoemStanza({ stanza, index }: { stanza: Stanza; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { amount: 0.8 })

    return (
        <div
            ref={ref}
            className="py-4 transition-all duration-700 ease-out"
            style={{
                opacity: isInView ? 1 : 0.15,
                filter: isInView ? 'blur(0px)' : 'blur(2.5px)',
                transform: isInView ? 'scale(1)' : 'scale(0.97)',
            }}
        >
            {stanza.lines.map((line, lineIndex) => (
                <p
                    key={lineIndex}
                    className={`leading-[1.9] transition-colors duration-500 ${lineIndex === stanza.giftLine
                        ? isInView
                            ? 'text-[var(--accent-teal)] font-medium text-[15px] md:text-base'
                            : 'text-slate-300 text-[15px] md:text-base'
                        : isInView
                            ? 'text-slate-500 text-[13px] md:text-sm'
                            : 'text-slate-200 text-[13px] md:text-sm'
                        }`}
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                    {line}
                </p>
            ))}
        </div>
    )
}

// ─── Main Component: Combined Writing Section ─────────────────────────────────
export default function PoemExperience() {
    return (
        <section className="py-20 md:py-32">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">

                {/* Section header */}
                <motion.div
                    className="mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-tight">
                        Writing
                    </h2>
                    <p className="mt-4 text-slate-400 text-base md:text-lg max-w-lg" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                        Articles on Medium and a poem close to my heart.
                    </p>
                </motion.div>

                {/* Side-by-side: Poem left, Articles right */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">

                    {/* ─── LEFT: Poem — two-column stanza grid ─── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Poem header */}
                        <div className="mb-8">
                            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 block mb-1">Poetry</span>
                            <h3
                                className="text-slate-900 text-xl md:text-2xl font-serif tracking-tight"
                            >
                                Gifts from Life
                            </h3>
                        </div>

                        {/* Two-column stanza layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
                            {stanzas.map((stanza, i) => (
                                <PoemStanza key={i} stanza={stanza} index={i} />
                            ))}
                        </div>

                        {/* Closing attribution */}
                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <p className="font-mono text-[11px] text-slate-300 uppercase tracking-widest">
                                — Anuja Harsha
                            </p>
                        </div>
                    </motion.div>

                    {/* ─── RIGHT: Articles stacked ─── */}
                    <div className="flex flex-col gap-0">
                        {/* Articles header — mirrors poem header */}
                        <div className="mb-8">
                            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 block mb-1">Thought Leadership</span>
                            <a
                                href="https://medium.com/@anu.anuja"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-900 text-xl md:text-2xl font-serif tracking-tight hover:text-[var(--accent-teal)] transition-colors duration-300"
                            >
                                Articles on Medium
                            </a>
                        </div>

                        {articleLinks.map((article, i) => (
                            <motion.a
                                key={article.title}
                                href={article.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="group relative flex items-start gap-5 py-7 border-b border-slate-100 last:border-b-0 transition-colors duration-300 hover:bg-slate-50/50 -mx-3 px-3 rounded-xl"
                            >
                                {/* Index */}
                                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-[11px] text-slate-300 font-mono mt-0.5 group-hover:bg-[var(--accent-teal)]/10 group-hover:text-[var(--accent-teal)] transition-colors duration-300">
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 mb-1.5 block">
                                        {article.topic}
                                    </span>
                                    <h3
                                        className="text-slate-900 text-sm md:text-base font-medium leading-snug group-hover:text-[var(--accent-teal)] transition-colors duration-300 line-clamp-2"
                                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                                    >
                                        {article.title}
                                    </h3>
                                    <span className="mt-2 text-[10px] text-slate-300 font-mono uppercase tracking-wider block">
                                        {article.readTime || '5 min'} read
                                    </span>
                                </div>

                                {/* Arrow */}
                                <div className="flex-shrink-0 mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                                    <svg className="w-3.5 h-3.5 text-[var(--accent-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                    </svg>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
