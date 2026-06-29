'use client'

import { useMemo } from 'react'
import { ExternalLink, Play, Smartphone } from 'lucide-react'
import SystemLightbox from '@/components/ui/SystemLightbox'
import VideoPlayer from '@/components/ui/VideoPlayer'
import LightboxCard from '@/components/ui/LightboxCard'
import Button from '@/components/ui/Button'
import WalkthroughPlayer from '@/components/ui/WalkthroughPlayer'
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

    if (!study) return null

    const Icon = study.icon
    const rgb = `var(${study.accentRgbVar})`

    const openLiveDemoBtn = demoUrl ? (
        <Button variant="primary" href={demoUrl} external icon={<ExternalLink className="h-4 w-4" />} className="w-full sm:w-auto">
            Open Live Demo
        </Button>
    ) : null

    /* "See it run" — the demo surface. Per Anuja it sits UP TOP (right under the
       hero), with the written detail below. Priority:
         A. walkthrough → narrated WalkthroughPlayer + Open Live Demo below
         B. requestDemo → demo reel (or "reel soon") + Request-demo CTA (Sous)
         C. playRoute → cover + Play button (WordU)
         D. demoUrl → Open Live Demo button
         E. none → nothing */
    const seeItRun = study.walkthrough?.length ? (
        <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: study.accent, opacity: 0.7 }}>
                See it run
            </p>
            <p className="mt-2 text-sm text-zinc-500">
                A short, workflow-led walkthrough — how I built it, in my words.
            </p>
            <div className="mt-5">
                <WalkthroughPlayer
                    slides={study.walkthrough}
                    title={study.title}
                    accent={study.accent}
                    accentRgbVar={study.accentRgbVar}
                    Icon={Icon}
                />
            </div>

            {/* Open Live Demo beneath the walkthrough */}
            {openLiveDemoBtn ? <div className="mt-5">{openLiveDemoBtn}</div> : null}
        </div>
    ) : study.requestDemo ? (
        <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: study.accent, opacity: 0.7 }}>
                See it run
            </p>

            {study.videoSrc ? (
                <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
                    <VideoPlayer
                        src={study.videoSrc}
                        autoPlay={false}
                        ariaLabel={`${study.title} — demo reel`}
                        className="aspect-video w-full"
                        videoClassName="object-cover"
                    />
                </div>
            ) : (
                <div
                    className="mt-4 flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/[0.08] text-center"
                    style={{ background: `radial-gradient(circle at 50% 40%, rgba(${rgb}, 0.14), #08070a 72%)` }}
                >
                    <Icon className="h-12 w-12" style={{ color: study.accent, opacity: 0.5 }} strokeWidth={1.25} />
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: study.accent }}>
                        Demo reel dropping soon
                    </p>
                </div>
            )}

            {study.requestDemo.note && (
                <p className="mt-3 text-sm text-zinc-500">{study.requestDemo.note}</p>
            )}

            <div className="mt-5">
                <Button
                    variant="primary"
                    href={study.requestDemo.testflightUrl || 'mailto:anu.anuja@outlook.com?subject=Sous%20TestFlight%20access'}
                    external
                    icon={<Smartphone className="h-4 w-4" />}
                    className="w-full sm:w-auto"
                >
                    {study.requestDemo.testflightUrl ? 'Get it on TestFlight' : 'Request a demo'}
                </Button>
            </div>
        </div>
    ) : study.playRoute ? (
        <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: study.accent, opacity: 0.7 }}>
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
    ) : demoUrl ? (
        <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: study.accent, opacity: 0.7 }}>
                See it run
            </p>
            <div className="mt-5">{openLiveDemoBtn}</div>
        </div>
    ) : null

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

                    {/* ── See it run — UP TOP (demo first), detail below ── */}
                    {seeItRun && <div className="mt-10 md:mt-12">{seeItRun}</div>}

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

                </div>
            </div>
        </SystemLightbox>
    )
}
