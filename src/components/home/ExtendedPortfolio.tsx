'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import SystemLightbox from '@/components/ui/SystemLightbox'

/* ─── Archive image maps — generated from public/images/archive/ ─── */
const ARCHIVE_IMAGES: Record<string, string[]> = {
    kedazzle: Array.from({ length: 16 }, (_, i) =>
        `/images/archive/kedazzle/Case Study Kedazzle_Page_${String(i + 1).padStart(2, '0')}.png`
    ),    'travel-portal': Array.from({ length: 6 }, (_, i) =>
        `/images/archive/travel-portal/Travel Portal${i + 1}.png`
    ),
    crbs: Array.from({ length: 10 }, (_, i) =>
        `/images/archive/crbs/CRBS case study${i + 1}.png`
    ),}

/* ─── Earlier-work projects (2012–2022) ─── */
interface ProjectItem {
    id: string
    title: string
    subtitle: string
    image: string
    archiveKey: string
}

const PROJECTS: ProjectItem[] = [
    { id: 'kedazzle', title: 'Kedazzle', subtitle: '0-to-1 EdTech platform', image: '/images/Kedazzle-cover.png', archiveKey: 'kedazzle' },
    { id: 'travel-portal', title: 'Travel Portal', subtitle: 'B2B enterprise booking', image: '/images/travel-cover.png', archiveKey: 'travel-portal' },
    { id: 'crbs', title: 'CRBS', subtitle: 'Enterprise IoT interfaces', image: '/images/crbs-cover.png', archiveKey: 'crbs' },
]

/* ─── Compact archive thumbnail ─── */
function ArchiveCard({ item, onOpen }: { item: ProjectItem; onOpen: (archiveKey: string, title: string) => void }) {
    return (
        <button onClick={() => onOpen(item.archiveKey, item.title)} className="text-left w-full group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/[0.03] cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--accent-teal-glow-rgb),0.05)]">
                {/* Desaturated at rest — restores on hover */}
                <div className="absolute inset-0 transition-[filter] duration-700 grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-3 md:p-4">
                    <h3 className="text-white text-sm md:text-base font-semibold leading-tight">{item.title}</h3>
                    <p className="text-zinc-400 text-[11px] md:text-xs mt-0.5">{item.subtitle}</p>
                </div>
            </div>
        </button>
    )
}

/* ─── Quiet "earlier work" link — lives in the footer, opens a lightbox drawer ───
   Earlier work no longer occupies its own scroll zone. A single quiet link reveals
   the project grid in a lightbox; clicking a project opens its slideshow. Closing the
   slideshow returns to the grid. Keeps id="extended-portfolio" so the case-study
   SystemIndex anchor (/#extended-portfolio) still lands here. */
export default function ExtendedPortfolio() {
    const [gridOpen, setGridOpen] = useState(false)
    const [slideshow, setSlideshow] = useState<{ images: string[]; title: string; index: number } | null>(null)

    const openSlideshow = useCallback((archiveKey: string, title: string) => {
        const images = ARCHIVE_IMAGES[archiveKey]
        if (images) setSlideshow({ images, title, index: 0 })
    }, [])

    const closeSlideshow = useCallback(() => setSlideshow(null), []) // back to the grid
    const goNext = useCallback(() => setSlideshow(prev => prev ? { ...prev, index: Math.min(prev.index + 1, prev.images.length - 1) } : null), [])
    const goPrev = useCallback(() => setSlideshow(prev => prev ? { ...prev, index: Math.max(prev.index - 1, 0) } : null), [])

    return (
        <>
            {/* The quiet footer trigger */}
            <button
                id="extended-portfolio"
                onClick={() => setGridOpen(true)}
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-600 transition-colors duration-500 hover:text-zinc-300"
            >
                Earlier work · 2012 — 2022
                <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </button>

            {/* ── Project grid (lightbox drawer) — hidden while a slideshow is open ── */}
            {gridOpen && !slideshow && (
                <SystemLightbox
                    isOpen
                    onClose={() => setGridOpen(false)}
                    title="Earlier Work · 2012 — 2022"
                    showArrows={false}
                >
                    <div className="mx-auto max-w-5xl px-5 py-12 md:px-10 md:py-16">
                        <p className="mb-8 max-w-2xl font-light text-zinc-400 md:text-lg">
                            Fractional and zero-to-one work for early-stage teams — across EdTech, consumer, B2B, and enterprise IoT.
                        </p>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                            {PROJECTS.map((item) => (
                                <ArchiveCard key={item.id} item={item} onOpen={openSlideshow} />
                            ))}
                        </div>
                    </div>
                </SystemLightbox>
            )}

            {/* ── Archive slideshow lightbox ── */}
            {slideshow && (
                <SystemLightbox
                    isOpen
                    onClose={closeSlideshow}
                    title={`${slideshow.title} — ${slideshow.index + 1} / ${slideshow.images.length}`}
                    onNext={slideshow.index < slideshow.images.length - 1 ? goNext : undefined}
                    onPrev={slideshow.index > 0 ? goPrev : undefined}
                >
                    <div className="flex items-center justify-center w-full h-full min-h-[50vh]">
                        <Image
                            src={slideshow.images[slideshow.index]}
                            alt={`${slideshow.title} — slide ${slideshow.index + 1}`}
                            width={1200}
                            height={800}
                            className="max-w-full max-h-[75vh] object-contain rounded-lg"
                        />
                    </div>
                </SystemLightbox>
            )}
        </>
    )
}
