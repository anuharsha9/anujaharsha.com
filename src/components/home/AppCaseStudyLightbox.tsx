'use client'

import { useMemo } from 'react'
import { ExternalLink, Download, ArrowUpRight, Play } from 'lucide-react'
import SystemLightbox from '@/components/ui/SystemLightbox'
import VideoPlayer from '@/components/ui/VideoPlayer'
import LightboxCard from '@/components/ui/LightboxCard'
import Button from '@/components/ui/Button'
import PhoneFrame from '@/components/ui/PhoneFrame'
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

                    {/* ── Demo section ── (priority order)
                          A. phoneFrame → native app inside an iPhone PhoneFrame (Sous)
                          B. embed → iframe inline (Warden)
                          C. videoSrc OR demoUrl → walkthrough + Open Live Demo CTA
                          D. none → no section */}
                    {study.phoneFrame ? (
                        <div className="mt-12">
                            <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: study.accent, opacity: 0.7 }}>
                                See it run
                            </p>
                            <p className="mt-2 text-sm text-zinc-500">
                                Native iOS — shown in-device.
                            </p>
                            <div className="mt-6 flex justify-center">
                                <PhoneFrame>
                                    {study.videoSrc ? (
                                        <VideoPlayer
                                            src={study.videoSrc}
                                            autoPlay={false}
                                            ariaLabel={`${study.title} — app walkthrough`}
                                            className="h-full w-full"
                                            videoClassName="object-cover"
                                        />
                                    ) : (
                                        /* Themed placeholder until the screen recording lands. */
                                        <div
                                            className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center"
                                            style={{ background: `linear-gradient(to bottom, rgba(${rgb}, 0.12), #08070a)` }}
                                        >
                                            <div
                                                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                                                style={{ backgroundColor: `rgba(${rgb}, 0.14)`, color: study.accent }}
                                            >
                                                <Icon className="h-7 w-7" strokeWidth={1.5} />
                                            </div>
                                            <p className="font-sans text-base font-bold text-white">{study.title}</p>
                                            <p className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: study.accent }}>
                                                Listening…
                                            </p>
                                            <p className="mt-1 px-1 text-[11px] leading-relaxed text-zinc-500">
                                                Full walkthrough lands with TestFlight.
                                            </p>
                                        </div>
                                    )}
                                </PhoneFrame>
                            </div>

                            {/* App Store CTA — appears automatically once appStoreUrl
                                is set (dormant until the app ships). */}
                            {study.appStoreUrl && (
                                <div className="mt-6 flex justify-center">
                                    <Button
                                        variant="primary"
                                        href={study.appStoreUrl}
                                        external
                                        icon={
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25" />
                                            </svg>
                                        }
                                    >
                                        Download on the App Store
                                    </Button>
                                </div>
                            )}

                            <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                {study.statusLabel}
                            </p>
                        </div>
                    ) : embedUrl ? (
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
                    ) : study.playRoute ? (
                        <div className="mt-12">
                            <p
                                className="font-mono text-[10px] uppercase tracking-[0.3em]"
                                style={{ color: study.accent, opacity: 0.7 }}
                            >
                                See it run
                            </p>
                            <p className="mt-2 text-sm text-zinc-500">
                                It&apos;s playable — jump straight in.
                            </p>

                            {study.coverImage && (
                                <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={study.coverImage}
                                        alt={`${study.title} — game preview`}
                                        loading="lazy"
                                        className="block w-full"
                                    />
                                </div>
                            )}

                            <div className="mt-5">
                                <Button variant="primary" href={study.playRoute} icon={<Play className="h-4 w-4" />} className="w-full sm:w-auto">
                                    Play {study.title}
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
