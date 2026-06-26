'use client'

import { useMemo } from 'react'
import { ExternalLink, Download, ArrowUpRight } from 'lucide-react'
import SystemLightbox from '@/components/ui/SystemLightbox'
import VideoPlayer from '@/components/ui/VideoPlayer'
import LightboxCard from '@/components/ui/LightboxCard'
import Button from '@/components/ui/Button'
import { APP_CASE_STUDIES, type AppCaseStudyId } from '@/data/app-case-studies'

/**
 * Short-snapshot lightbox shown when a Build Lab tile is clicked. ~10-second
 * read: tagline, why I built it, what it solves, 3-4 highlights, tech stack,
 * demo video + Open Live Demo button. Reuses the now-mobile-native
 * SystemLightbox shell so this works as well on phone as on desktop.
 */
export default function AppCaseStudyLightbox({
    appId,
    isOpen,
    onClose,
}: {
    appId: AppCaseStudyId | null
    isOpen: boolean
    onClose: () => void
}) {
    const study = appId ? APP_CASE_STUDIES[appId] : null

    /* Demo URL resolution (in order):
     *   1. env var override → lets us swap the URL without a code change
     *   2. productionUrl → the source-of-truth public demo URL, baked into the data file
     *   3. devFallbackUrl → localhost, dev mode only */
    const isProd = process.env.NODE_ENV === 'production'
    const demoUrl = useMemo(() => {
        if (!study) return ''
        const fromEnv = study.demoUrlEnvVar ? process.env[study.demoUrlEnvVar] : undefined
        if (fromEnv) return fromEnv
        if (study.productionUrl) return study.productionUrl
        if (!isProd && study.devFallbackUrl) return study.devFallbackUrl
        return ''
    }, [study, isProd])

    /* Embedded iframe URL — same resolution order, but lives under `embed`.
     * When this resolves to a URL, the "See it run" section renders the live
     * app inline in an iframe instead of the video + Open Live Demo CTA. */
    const embedUrl = useMemo(() => {
        if (!study?.embed) return ''
        const fromEnv = study.embed.urlEnvVar ? process.env[study.embed.urlEnvVar] : undefined
        if (fromEnv) return fromEnv
        if (study.embed.productionUrl) return study.embed.productionUrl
        if (!isProd && study.embed.devFallbackUrl) return study.embed.devFallbackUrl
        return ''
    }, [study, isProd])

    if (!study) return null

    const Icon = study.icon
    const rgb = `var(${study.accentRgbVar})`

    return (
        <SystemLightbox
            isOpen={isOpen}
            onClose={onClose}
            title={`LAB_CASE_STUDY: ${study.title}`}
            indexString={`[ ${study.status.toUpperCase()} ]`}
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
                                borderColor: `rgba(${rgb}, 0.35)`,
                                backgroundColor: `rgba(${rgb}, 0.10)`,
                                color: study.accent,
                            }}
                        >
                            <Icon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                            <p
                                className="font-mono text-[10px] uppercase tracking-[0.3em]"
                                style={{ color: study.accent, opacity: 0.7 }}
                            >
                                {study.statusLabel}
                            </p>
                            <h2 className="mt-1.5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                                {study.title}
                            </h2>
                            <p className="mt-2 text-base text-zinc-400 md:text-lg">
                                {study.tagline}
                            </p>
                        </div>
                    </div>

                    {/* ── Why / What — two beats, side by side on desktop ── */}
                    <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
                        <div>
                            <p
                                className="font-mono text-[10px] uppercase tracking-[0.25em]"
                                style={{ color: study.accent, opacity: 0.7 }}
                            >
                                Why I built it
                            </p>
                            <p className="mt-2 text-[15px] leading-relaxed text-zinc-200">
                                {study.why}
                            </p>
                        </div>
                        <div>
                            <p
                                className="font-mono text-[10px] uppercase tracking-[0.25em]"
                                style={{ color: study.accent, opacity: 0.7 }}
                            >
                                What it solves
                            </p>
                            <p className="mt-2 text-[15px] leading-relaxed text-zinc-200">
                                {study.whatItSolves}
                            </p>
                        </div>
                    </div>

                    {/* ── Highlights — what makes it unique ── */}
                    <div className="mt-12">
                        <p
                            className="font-mono text-[10px] uppercase tracking-[0.3em]"
                            style={{ color: study.accent, opacity: 0.7 }}
                        >
                            What makes it unique
                        </p>
                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                            {study.highlights.map(h => (
                                <LightboxCard key={h.title} accentRgb={study.accentRgbVar}>
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
                            {study.stack.map(item => (
                                <li
                                    key={item}
                                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-300"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Demo section ──
                        Three modes (in priority order):
                          A. `embed` resolves → render iframe inline (Warden)
                          B. videoSrc OR demoUrl → video walkthrough + Open Live Demo CTA
                          C. neither → no section */}
                    {embedUrl ? (
                        <div className="mt-12">
                            <p
                                className="font-mono text-[10px] uppercase tracking-[0.3em]"
                                style={{ color: study.accent, opacity: 0.7 }}
                            >
                                Try it live — embedded here
                            </p>
                            <p className="mt-2 text-sm text-zinc-500">
                                Running in an iframe. Interact with it the same way you would the standalone app.
                            </p>

                            <div
                                className={`mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-black ${study.embed?.aspectClass ?? 'aspect-[16/10]'}`}
                            >
                                <iframe
                                    src={embedUrl}
                                    title={`${study.title} — embedded live demo`}
                                    loading="lazy"
                                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                    referrerPolicy="no-referrer"
                                    allow="clipboard-write"
                                    className="block h-full w-full"
                                />
                            </div>

                            {/* Subtle "open in new tab" fallback for users who want full screen. */}
                            <div className="mt-3 flex items-center justify-end">
                                <Button variant="ghost" size="sm" href={embedUrl} external className="text-zinc-500 hover:text-zinc-300">
                                    Open in a new tab
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    ) : (study.videoSrc || demoUrl) && (
                        <div className="mt-12">
                            <p
                                className="font-mono text-[10px] uppercase tracking-[0.3em]"
                                style={{ color: study.accent, opacity: 0.7 }}
                            >
                                See it run
                            </p>

                            {/* Optional video. Falls back gracefully if the file isn't there yet. */}
                            {study.videoSrc && (
                                <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
                                    <VideoPlayer
                                        src={study.videoSrc}
                                        autoPlay={false}
                                        ariaLabel={`${study.title} demo walkthrough`}
                                        className="aspect-video w-full"
                                        videoClassName="object-contain"
                                    />
                                </div>
                            )}

                            {/* CTAs */}
                            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                {demoUrl ? (
                                    <Button variant="primary" href={demoUrl} external icon={<ExternalLink className="h-4 w-4" />} className="flex-1">
                                        Open Live Demo
                                    </Button>
                                ) : (
                                    <span
                                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold"
                                        style={{
                                            borderColor: `rgba(${rgb}, 0.35)`,
                                            backgroundColor: `rgba(${rgb}, 0.06)`,
                                            color: study.accent,
                                        }}
                                    >
                                        <Download className="h-4 w-4" /> Demo coming soon
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </SystemLightbox>
    )
}
