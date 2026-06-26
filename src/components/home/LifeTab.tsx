'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SystemLightbox from '@/components/ui/SystemLightbox'
import VideoPlayer from '@/components/ui/VideoPlayer'
import InterlockedGearGlyph from '@/components/ui/InterlockedGearGlyph'
import TalkSection from '@/components/home/TalkSection'
import { useTransition } from '@/components/transitions/TransitionContext'
import { ALL_MILESTONES, FAMILY_PHOTO, MAKES_GALLERIES, SAME_TIME_PAIRS, type MakeGallery } from '@/data/life-content'
import { POEM_STANZAS } from '@/data/poem'
import { articleLinks } from '@/data/home'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─── Small reusable section header (mono label + h2 + rule) ─── */
function RoomHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
    return (
        <motion.div
            className="mb-8 md:mb-10"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
        >
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/70 md:text-xs">
                {label}
            </p>
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
                    {subtitle}
                </p>
            )}
            <div className="mt-6 h-px w-full bg-white/[0.06]" />
        </motion.div>
    )
}

/* ─── Hero strip ─── */
function LifeHero() {
    const { navigateTo } = useTransition()
    return (
        <section className="relative mx-auto max-w-[1200px] px-4 pt-12 pb-12 md:px-8 md:pt-20 md:pb-16 lg:px-12">
            <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[rgba(var(--accent-teal-glow-rgb),0.06)] blur-[120px]" />
            <motion.div
                className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-8"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease }}
            >
                <div className="md:col-span-7">
                    <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-teal)]/70 md:text-sm">
                        Life · the other half
                    </p>
                    <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white md:text-5xl lg:text-6xl">
                        Outside the{' '}
                        {/* Easter-egg door — same hidden brain-experience hook as the Work hero's "Anuja." */}
                        <button
                            onClick={() => navigateTo('/quiz')}
                            aria-label="Hidden — explore my mind"
                            title="There is more here…"
                            className="group relative inline-block pointer-events-auto cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                        >
                            <span className="transition-[filter] duration-500 group-hover:brightness-110">terminal.</span>
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100"
                            >
                                <InterlockedGearGlyph size={28} />
                            </span>
                        </button>
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg">
                        Parent. Baker. Painter. Poet. Reader. Migrant. The capacity behind the work — and where the work begins.
                    </p>
                </div>
                <VideoPlayer
                    src="/videos/intro-video.mp4"
                    autoPlay
                    loop
                    ariaLabel="Anuja’s intro — outside the terminal"
                    className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.06] md:col-span-5 md:aspect-square"
                />
            </motion.div>
        </section>
    )
}

/* ─── Room 1: What I'm holding now ─── */
function HoldingNow() {
    return (
        <section className="relative mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-20 lg:px-12">
            <RoomHeader
                label="Right now"
                title="What I’m holding"
                subtitle="Present tense. Family, current chapter, what’s alive today."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8">
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] aspect-[4/3] md:col-span-3 md:aspect-auto md:min-h-[360px]">
                    <Image
                        src={FAMILY_PHOTO.src}
                        alt={FAMILY_PHOTO.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover"
                        priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
                </div>
                <motion.div
                    className="flex flex-col justify-center md:col-span-2"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease, delay: 0.15 }}
                >
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">2026 — Now</p>
                    <p className="mt-4 text-base leading-relaxed text-zinc-300 md:text-lg">
                        Two kids and a husband I built a life with. Staff-level work at Cloud Software Group on the WebFOCUS platform.
                        Just finished a Master’s in English Literature & Critical Theory. Vibe-coding a few side projects —
                        WealthEngine, Sous, this site.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

/* ─── Room 2: Same time — featured pairs + expandable full list ─── */
function SameTime() {
    const [expanded, setExpanded] = useState(false)
    return (
        <section className="relative mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-20 lg:px-12">
            <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-[rgba(var(--accent-teal-glow-rgb),0.04)] blur-[130px]" />
            <RoomHeader
                label="Same time"
                title="Where the two lives ran together"
                subtitle="Four hand-picked simultaneity stories — the moments when work and life were both at peak intensity. Career on the left, life on the right."
            />

            {/* Featured pairs */}
            <div className="relative">
                {/* Vertical spine — visible only on desktop */}
                <div className="pointer-events-none absolute left-1/2 top-4 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--accent-teal)]/20 to-transparent md:block" />

                <div className="space-y-10 md:space-y-14">
                    {SAME_TIME_PAIRS.map((pair, i) => {
                        const CareerIcon = pair.career.icon
                        const LifeIcon = pair.life.icon
                        return (
                            <motion.div
                                key={pair.year}
                                className="relative grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-6"
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ duration: 0.7, ease, delay: i * 0.05 }}
                            >
                                {/* Mobile year label (above) */}
                                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/80 md:hidden">
                                    {pair.year} · {pair.title}
                                </p>

                                {/* Career card */}
                                <div className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 transition-colors duration-500 hover:border-white/[0.12] md:p-6">
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] text-zinc-400">
                                            <CareerIcon className="h-3.5 w-3.5" />
                                        </span>
                                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                                            Career
                                        </span>
                                    </div>
                                    <h3 className="text-base font-semibold text-zinc-100 md:text-lg">{pair.career.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{pair.career.description}</p>
                                </div>

                                {/* Year marker (center, desktop only) */}
                                <div className="relative hidden flex-col items-center justify-center md:flex">
                                    <div className="h-3 w-3 rounded-full bg-[var(--accent-teal)] shadow-[0_0_0_4px_rgba(var(--accent-teal-glow-rgb),0.15)]" />
                                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-teal)]">{pair.year}</p>
                                    <p className="mt-1 max-w-[160px] text-center text-[11px] leading-tight text-zinc-500">{pair.title}</p>
                                </div>

                                {/* Life card */}
                                <div className="relative rounded-2xl border border-[var(--accent-teal)]/15 bg-gradient-to-b from-[rgba(var(--accent-teal-glow-rgb),0.05)] to-white/[0.01] p-5 transition-colors duration-500 hover:border-[var(--accent-teal)]/35 md:p-6">
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-teal)]/15 text-[var(--accent-teal)]">
                                            <LifeIcon className="h-3.5 w-3.5" />
                                        </span>
                                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-teal)]/80">
                                            Life
                                        </span>
                                    </div>
                                    <h3 className="text-base font-semibold text-zinc-100 md:text-lg">{pair.life.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{pair.life.description}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Full milestone list (collapsed by default) */}
            <div className="mt-12 md:mt-16">
                <div className="flex justify-center">
                    <button
                        onClick={() => setExpanded(v => !v)}
                        aria-expanded={expanded}
                        className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--accent-teal)]/25 bg-[var(--accent-teal)]/[0.06] px-7 py-3 text-sm font-medium tracking-wide text-[var(--accent-teal)] transition-all duration-300 hover:border-[var(--accent-teal)]/45 hover:bg-[var(--accent-teal)]/[0.12]"
                    >
                        {expanded ? 'Show fewer' : `See all ${ALL_MILESTONES.length} life milestones`}
                        <span className={`transition-transform duration-300 ${expanded ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} aria-hidden="true">↓</span>
                    </button>
                </div>

                {expanded && (
                    <motion.div
                        className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease }}
                    >
                        {ALL_MILESTONES.map((m) => {
                            const Icon = m.icon
                            return (
                                <div
                                    key={`${m.title}-${m.year}`}
                                    className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 transition-colors duration-300 hover:border-[var(--accent-teal)]/20 hover:bg-white/[0.05]"
                                >
                                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-zinc-500">
                                        <Icon className="h-3.5 w-3.5" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-[13px] font-medium leading-tight text-zinc-200">{m.title}</p>
                                        <p className="mt-0.5 font-mono text-[10px] leading-tight text-zinc-500">
                                            {m.subtitle} · {m.year}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </motion.div>
                )}
            </div>
        </section>
    )
}

/* ─── Room 3: Things I make ─── */
function Makes() {
    const [openId, setOpenId] = useState<string | null>(null)
    const [index, setIndex] = useState(0)
    const active: MakeGallery | undefined = MAKES_GALLERIES.find(g => g.id === openId)

    const open = (g: MakeGallery) => { setOpenId(g.id); setIndex(0) }
    const close = () => setOpenId(null)
    const next = () => active && setIndex(i => Math.min(i + 1, active.images.length - 1))
    const prev = () => setIndex(i => Math.max(i - 1, 0))

    return (
        <section className="relative mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-20 lg:px-12">
            <RoomHeader
                label="Beyond the screen"
                title="Things I make"
                subtitle="Hands. Canvas. Sugar. Print. Each opens to its own gallery."
            />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                {MAKES_GALLERIES.map((g, i) => {
                    const Icon = g.icon
                    return (
                        <motion.button
                            key={g.id}
                            onClick={() => open(g)}
                            className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/[0.07] transition-colors duration-500 hover:border-[var(--accent-teal)]/30"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: i * 0.07, ease }}
                            aria-label={`Open ${g.label} gallery — ${g.images.length} image${g.images.length === 1 ? '' : 's'}`}
                        >
                            <div className="absolute inset-0 grayscale-[0.5] brightness-[0.7] transition-[filter] duration-700 group-hover:grayscale-0 group-hover:brightness-100">
                                <Image
                                    src={g.cover}
                                    alt={g.label}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
                                    <Icon className="h-3.5 w-3.5" />
                                </div>
                                <p className="text-sm font-semibold text-white md:text-base">{g.label}</p>
                                <p className="mt-0.5 text-[11px] text-zinc-300 md:text-xs">
                                    {g.subtitle} · {g.images.length} {g.images.length === 1 ? 'piece' : 'pieces'}
                                </p>
                            </div>
                        </motion.button>
                    )
                })}
            </div>

            {active && (
                <SystemLightbox
                    isOpen={true}
                    onClose={close}
                    title={`${active.label} — ${index + 1} / ${active.images.length}`}
                    onNext={index < active.images.length - 1 ? next : undefined}
                    onPrev={index > 0 ? prev : undefined}
                >
                    <div className="flex h-full min-h-[50vh] w-full items-center justify-center">
                        <Image
                            src={active.images[index]}
                            alt={`${active.label} — piece ${index + 1}`}
                            width={1200}
                            height={900}
                            className="max-h-[75vh] max-w-full rounded-lg object-contain"
                        />
                    </div>
                </SystemLightbox>
            )}
        </section>
    )
}

/* ─── Room 4: Things I write ─── */
function Writes() {
    const firstStanza = POEM_STANZAS[0]
    const featuredArticles = articleLinks.slice(0, 3)
    const [poemOpen, setPoemOpen] = useState(false)

    return (
        <section className="relative mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-20 lg:px-12">
            <RoomHeader
                label="Voice"
                title="Things I write"
                subtitle="A poem and a set of essays. Expression, not chronology."
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                {/* Poem teaser — opens an inline reader so visitors stay on the Life tab */}
                <button
                    type="button"
                    onClick={() => setPoemOpen(true)}
                    aria-label="Read the full poem — Gifts from Life"
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 text-left transition-colors duration-500 hover:border-[var(--accent-teal)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/60"
                >
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/70">
                        The poem · 12 stanzas
                    </p>
                    <h3 className="font-serif text-2xl font-light leading-tight tracking-tight text-white md:text-3xl">
                        Gifts from Life
                    </h3>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">— Anuja Harsha</p>
                    <div className="mt-6 space-y-1.5 text-[15px] leading-relaxed text-zinc-300">
                        {firstStanza.lines.map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                    <p className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--accent-teal)] transition-transform duration-300 group-hover:translate-x-1">
                        Read all 12 stanzas <span aria-hidden="true">→</span>
                    </p>
                </button>

                {/* Full-poem reader sheet — stays inside the Life tab, no bounce to /me */}
                <SystemLightbox
                    isOpen={poemOpen}
                    onClose={() => setPoemOpen(false)}
                    title="GIFTS_FROM_LIFE.poem"
                    indexString={`[ 12 / 12 ]`}
                    showArrows={false}
                    shortcuts={[{ key: 'ESC', label: 'CLOSE' }]}
                    className="!p-0 !max-w-3xl"
                >
                    <div className="h-full w-full overflow-y-auto px-6 py-8 md:px-10 md:py-12">
                        <div className="mx-auto max-w-2xl">
                            <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/70">
                                A poem in 12 stanzas
                            </p>
                            <h2 className="text-center font-serif text-3xl font-light leading-tight tracking-tight text-white md:text-5xl">
                                Gifts from Life
                            </h2>
                            <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">— Anuja Harsha</p>

                            <div className="mt-10 space-y-8 md:mt-14 md:space-y-10">
                                {POEM_STANZAS.map((stanza, sIdx) => (
                                    <div key={sIdx} className="space-y-1.5">
                                        {stanza.lines.map((line, lIdx) => {
                                            const isGift = lIdx === stanza.giftLine
                                            return (
                                                <p
                                                    key={lIdx}
                                                    className={`text-[15px] leading-relaxed md:text-lg ${isGift ? 'text-[var(--accent-teal)]' : 'text-zinc-300'}`}
                                                >
                                                    {line}
                                                </p>
                                            )
                                        })}
                                    </div>
                                ))}
                            </div>

                            <p className="mt-14 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                                — End of poem —
                            </p>
                        </div>
                    </div>
                </SystemLightbox>

                {/* Articles list */}
                <div className="flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/70">
                        Essays · @anu.anuja on Medium
                    </p>
                    <h3 className="text-xl font-extrabold leading-tight text-white md:text-2xl">Articles I’ve written</h3>

                    <ul className="mt-5 space-y-3">
                        {featuredArticles.map(article => (
                            <li key={article.title}>
                                <a
                                    href={article.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-colors duration-300 hover:border-white/[0.08] hover:bg-white/[0.03]"
                                >
                                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-teal)]/60 transition-colors duration-300 group-hover:bg-[var(--accent-teal)]" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium leading-snug text-zinc-200 group-hover:text-white md:text-[15px]">
                                            {article.title}
                                        </p>
                                        {article.readTime && (
                                            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                                                {article.readTime} read
                                            </p>
                                        )}
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <a
                        href="https://medium.com/@anu.anuja"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 self-start text-sm text-[var(--accent-teal)] transition-transform duration-300 hover:translate-x-1"
                    >
                        Read more on Medium <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

/* ─── Root: the whole Life tab ─── */
export default function LifeTab() {
    return (
        <div className="relative">
            <LifeHero />
            <HoldingNow />
            <SameTime />
            <Makes />
            <Writes />
            <TalkSection />
        </div>
    )
}
