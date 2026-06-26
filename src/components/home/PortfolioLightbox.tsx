'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react'
import SystemLightbox from '@/components/ui/SystemLightbox'
import VideoPlayer from '@/components/ui/VideoPlayer'
import LightboxCard from '@/components/ui/LightboxCard'

/* ─── Portfolio case study — same shell + rhythm as AppCaseStudyLightbox,
 * but the "See it run" section is the 5-iteration evolution carousel
 * (multi-video) instead of a single demo video. The portfolio's unique
 * asset is the proof-of-progression — five real shipped artifacts, not a
 * single before/after — so the case study leads with the same hero/why-
 * what/highlights/stack rhythm as the AI apps and then opens up the
 * evolution videos as the closer. */

const EVOLUTION_VERSIONS = [
    {
        id: 'v1', label: 'Jan 2025', title: 'The Baseline',
        desc: 'Panic-built after team layoffs. Juggling a newborn and manual HTML/CSS.',
        tech: 'HTML · CSS · S3',
        video: '/videos/evolution/v1_web.mp4',
        keyLearning: '"Manual coding is too slow for modern iteration."',
        accent: 'var(--accent-teal)',
    },
    {
        id: 'v2', label: 'Nov 10', title: 'The Upgrade',
        desc: 'Post-layoff restart. Black/Pink design. Fighting for traction.',
        tech: 'HTML · CSS · ChatGPT',
        video: '/videos/evolution/v2_web.mp4',
        keyLearning: '"AI is an accelerator — but without architecture, it\'s just noise."',
        accent: 'var(--semantic-magenta-500)',
    },
    {
        id: 'v3', label: 'Nov 15', title: 'The Speedrun',
        desc: 'White/Pink redesign. Built in 24 hours. First glimpse of high velocity.',
        tech: 'HTML · CSS · AI v1',
        video: '/videos/evolution/v3_web.mp4',
        keyLearning: '"Frameworks aren\'t overhead. They\'re the scaffold for speed."',
        accent: 'var(--semantic-orange)',
    },
    {
        id: 'v4', label: 'Dec 1', title: 'The Architecture',
        desc: 'Next.js 14 + Git. Multi-agent orchestration for real scale.',
        tech: 'Next.js · Agents · AWS',
        video: '/videos/evolution/v4_web.mp4',
        keyLearning: '"Agents handle the build. The human focuses on soul."',
        accent: 'var(--semantic-cyan)',
    },
    {
        id: 'v5', label: 'Dec 8', title: 'The Polish',
        desc: 'Refining the interaction layer. Achieving portfolio-market fit.',
        tech: 'Framer Motion · Vibe · UX',
        video: '/videos/evolution/v5_web.mp4',
        keyLearning: '"The final 10% of polish takes 50% of the effort."',
        accent: 'var(--semantic-purple)',
    },
]

const HIGHLIGHTS = [
    {
        title: 'Five iterations, each shipped',
        description: 'Not drafts — each version was a real, live artifact at anujaharsha.com. The story is the progression, not a single before/after.',
    },
    {
        title: 'One designer, six AI agents',
        description: 'ChatGPT for strategy. Claude for architecture. Cursor + Agent for build. Gemini for polish. Antigravity for logic. AWS for scale. I made every product call.',
    },
    {
        title: 'No template, no Webflow',
        description: 'Every component, every transition, every hover state — designed, coded, and reviewed end-to-end. The Lenis scroll, dynamic-island UI, scroll-pinned hero, all hand-spec\'d.',
    },
    {
        title: 'Built through the chaos',
        description: 'Post-layoff. H-1B clock. Two kids. Final version uploaded at 2 AM. The process was the proof — I can ship the platform AND raise the human.',
    },
]

const STACK = [
    'Next.js 16',
    'Framer Motion',
    'Tailwind CSS',
    'TypeScript',
    'Claude Opus 4.8',
    'Cursor + Agent',
    'AWS S3 + CloudFront',
]

interface PortfolioLightboxProps {
    isOpen: boolean
    onClose: () => void
}

export default function PortfolioLightbox({ isOpen, onClose }: PortfolioLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const goNext = useCallback(() => {
        setCurrentIndex(prev => Math.min(prev + 1, EVOLUTION_VERSIONS.length - 1))
    }, [])
    const goPrev = useCallback(() => {
        setCurrentIndex(prev => Math.max(prev - 1, 0))
    }, [])

    /* Reset to v1 on each open. */
    useEffect(() => {
        if (isOpen) setCurrentIndex(0)
    }, [isOpen])

    const current = EVOLUTION_VERSIONS[currentIndex]

    /* Swipe handler for the video carousel only — doesn't fight outer scroll. */
    const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50
        if (info.offset.x < -threshold) goNext()
        else if (info.offset.x > threshold) goPrev()
    }, [goNext, goPrev])

    /* Brand color for the case study chrome — matches the BrowserWireframeCover
     * tile in Build Lab so the click-to-open transition stays visually coherent. */
    const accent = 'var(--accent-teal)'
    const rgb = '--accent-teal-rgb'

    return (
        <SystemLightbox
            isOpen={isOpen}
            onClose={onClose}
            title="LAB_CASE_STUDY: This Portfolio"
            indexString="[ LIVE · 5 ITERATIONS ]"
            showArrows={false}
            shortcuts={[{ key: 'ESC', label: 'CLOSE' }]}
            className="!p-0 !max-w-5xl"
        >
            <div className="h-full w-full overflow-y-auto">
                <div className="mx-auto max-w-3xl px-6 py-10 md:px-10 md:py-14">

                    {/* ── Hero ── */}
                    <div className="flex items-start gap-5">
                        <div
                            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border md:h-16 md:w-16"
                            style={{
                                borderColor: `rgba(var(${rgb}), 0.35)`,
                                backgroundColor: `rgba(var(${rgb}), 0.10)`,
                                color: accent,
                            }}
                        >
                            <Sparkles className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                            <p
                                className="font-mono text-[10px] uppercase tracking-[0.3em]"
                                style={{ color: accent, opacity: 0.7 }}
                            >
                                Live · Five iterations · You&apos;re on it
                            </p>
                            <h2 className="mt-1.5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                                This Portfolio
                            </h2>
                            <p className="mt-2 text-base text-zinc-400 md:text-lg">
                                Five iterations, six AI agents, one designer — proof that I can ship the platform around the work.
                            </p>
                        </div>
                    </div>

                    {/* ── Why / What — two beats, side by side on desktop ── */}
                    <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
                        <div>
                            <p
                                className="font-mono text-[10px] uppercase tracking-[0.25em]"
                                style={{ color: accent, opacity: 0.7 }}
                            >
                                Why I built it
                            </p>
                            <p className="mt-2 text-[15px] leading-relaxed text-zinc-200">
                                I got laid off mid-sprint. H-1B clock started at 60 days. My portfolio was five years stale and I&apos;d never shipped anything in Next.js. So I taught myself — by orchestrating Claude as my engineering team instead of writing every line.
                            </p>
                        </div>
                        <div>
                            <p
                                className="font-mono text-[10px] uppercase tracking-[0.25em]"
                                style={{ color: accent, opacity: 0.7 }}
                            >
                                What it solves
                            </p>
                            <p className="mt-2 text-[15px] leading-relaxed text-zinc-200">
                                A designer who orchestrates code scales differently than one who hand-writes every component. The case studies prove the work. This site is the proof I can ship the platform around the work — solo, fast, polished.
                            </p>
                        </div>
                    </div>

                    {/* ── Highlights ── */}
                    <div className="mt-12">
                        <p
                            className="font-mono text-[10px] uppercase tracking-[0.3em]"
                            style={{ color: accent, opacity: 0.7 }}
                        >
                            What makes it unique
                        </p>
                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                            {HIGHLIGHTS.map(h => (
                                <LightboxCard key={h.title} accentRgb={rgb}>
                                    <h3 className="text-sm font-semibold text-zinc-100 md:text-base">
                                        {h.title}
                                    </h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                                        {h.description}
                                    </p>
                                </LightboxCard>
                            ))}
                        </div>
                    </div>

                    {/* ── Stack pills ── */}
                    <div className="mt-10">
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                            Stack
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {STACK.map(item => (
                                <li
                                    key={item}
                                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-300"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── See it run — the five-iteration evolution carousel ── */}
                    <div className="mt-12">
                        <p
                            className="font-mono text-[10px] uppercase tracking-[0.3em]"
                            style={{ color: accent, opacity: 0.7 }}
                        >
                            See it evolve — five iterations
                        </p>
                        <p className="mt-2 text-sm text-zinc-500">
                            Each version was a real shipped artifact. Swipe the video, click a dot, or use the arrows to flip through.
                        </p>

                        {/* Video — drag/swipe horizontally to advance */}
                        <motion.div
                            className="relative mt-5 rounded-2xl border border-white/[0.08] bg-black overflow-hidden cursor-grab active:cursor-grabbing"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.15}
                            onDragEnd={handleDragEnd}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="pointer-events-none"
                                >
                                    <VideoPlayer
                                        src={current.video}
                                        autoPlay={true}
                                        ariaLabel={`${current.title} — portfolio iteration ${currentIndex + 1}`}
                                        className="aspect-video w-full"
                                        videoClassName="object-contain"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* Version meta + key learning */}
                        <div className="mt-5">
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: current.accent }}>
                                    {current.label}
                                </span>
                                <span className="text-xs text-zinc-600 font-mono tracking-wider">{current.tech}</span>
                            </div>
                            <h4 className="mt-1.5 text-lg md:text-xl font-bold text-white tracking-tight">
                                {current.title}
                            </h4>
                            <p className="mt-1 text-sm text-zinc-400">{current.desc}</p>
                            <p
                                className="mt-3 text-sm italic text-zinc-500 border-l-2 pl-3"
                                style={{ borderColor: current.accent }}
                            >
                                {current.keyLearning}
                            </p>
                        </div>

                        {/* Navigation: prev arrow · dots · next arrow */}
                        <div className="mt-5 flex items-center justify-center gap-2">
                            <button
                                onClick={goPrev}
                                disabled={currentIndex === 0}
                                aria-label="Previous iteration"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-400 transition-colors duration-200 hover:border-white/25 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/[0.08] disabled:hover:text-zinc-400"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </button>
                            <div className="flex items-center gap-1 px-2">
                                {EVOLUTION_VERSIONS.map((v, i) => (
                                    <button
                                        key={v.id}
                                        onClick={() => setCurrentIndex(i)}
                                        aria-label={`Go to ${v.title}`}
                                        className="relative flex items-center justify-center min-h-[36px] min-w-[24px]"
                                    >
                                        <span
                                            className="h-1.5 rounded-full transition-all duration-500 block"
                                            style={{
                                                width: i === currentIndex ? 24 : 8,
                                                backgroundColor: i === currentIndex ? current.accent : 'rgba(255,255,255,0.15)',
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={goNext}
                                disabled={currentIndex === EVOLUTION_VERSIONS.length - 1}
                                aria-label="Next iteration"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-400 transition-colors duration-200 hover:border-white/25 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/[0.08] disabled:hover:text-zinc-400"
                            >
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </SystemLightbox>
    )
}
