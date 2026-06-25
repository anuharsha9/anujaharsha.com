'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SystemLightbox from '@/components/ui/SystemLightbox'

/* ─── Archive image maps — generated from public/images/archive/ ─── */
const ARCHIVE_IMAGES: Record<string, string[]> = {
    kedazzle: Array.from({ length: 16 }, (_, i) =>
        `/images/archive/kedazzle/Case Study Kedazzle_Page_${String(i + 1).padStart(2, '0')}.png`
    ),    'travel-portal': Array.from({ length: 6 }, (_, i) =>
        `/images/archive/travel-portal/Travel Portal${i + 1}.png`
    ),
    wordu: Array.from({ length: 9 }, (_, i) =>
        `/images/archive/wordu/Wordu case study${i + 1}.png`
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
    { id: 'wordu', title: 'WordU', subtitle: 'Consumer game · 12K+ downloads wk 1', image: '/images/wordu-cover.png', archiveKey: 'wordu' },
    { id: 'crbs', title: 'CRBS', subtitle: 'Enterprise IoT interfaces', image: '/images/crbs-cover.png', archiveKey: 'crbs' },
]

/* ─── Compact archive thumbnail ─── */
function ArchiveCard({ item, onOpen }: { item: ProjectItem; onOpen: (archiveKey: string, title: string) => void }) {
    return (
        <button onClick={() => onOpen(item.archiveKey, item.title)} className="text-left w-full group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/[0.03] cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(47,198,213,0.05)]">
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

/* ─── Main component — quiet "earlier work" band ─── */
export default function ExtendedPortfolio() {
    const [lightbox, setLightbox] = useState<{ images: string[]; title: string; index: number } | null>(null)

    const openSlideshow = useCallback((archiveKey: string, title: string) => {
        const images = ARCHIVE_IMAGES[archiveKey]
        if (images) setLightbox({ images, title, index: 0 })
    }, [])

    const closeLightbox = useCallback(() => setLightbox(null), [])
    const goNext = useCallback(() => setLightbox(prev => prev ? { ...prev, index: Math.min(prev.index + 1, prev.images.length - 1) } : null), [])
    const goPrev = useCallback(() => setLightbox(prev => prev ? { ...prev, index: Math.max(prev.index - 1, 0) } : null), [])

    return (
        <section id="extended-portfolio" className="relative pt-10 pb-16 md:pt-12 md:pb-20">
            <div className="px-4 md:px-8 lg:px-12 max-w-[1200px] mx-auto">
                {/* Quiet section label */}
                <motion.div
                    className="mb-6 md:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-zinc-600 mb-2">
                        Earlier Work · 2012 — 2022
                    </p>
                    <p className="text-zinc-500 text-sm md:text-base font-light max-w-2xl">
                        Fractional and zero-to-one work for early-stage teams — across EdTech, consumer, B2B, and enterprise IoT.
                    </p>
                </motion.div>

                {/* Compact thumbnail grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    {PROJECTS.map((item) => (
                        <ArchiveCard key={item.id} item={item} onOpen={openSlideshow} />
                    ))}
                </motion.div>
            </div>

            {/* ── Archive slideshow lightbox ── */}
            {lightbox && (
                <SystemLightbox
                    isOpen={true}
                    onClose={closeLightbox}
                    title={`${lightbox.title} — ${lightbox.index + 1} / ${lightbox.images.length}`}
                    onNext={lightbox.index < lightbox.images.length - 1 ? goNext : undefined}
                    onPrev={lightbox.index > 0 ? goPrev : undefined}
                >
                    <div className="flex items-center justify-center w-full h-full min-h-[50vh]">
                        <Image
                            src={lightbox.images[lightbox.index]}
                            alt={`${lightbox.title} — slide ${lightbox.index + 1}`}
                            width={1200}
                            height={800}
                            className="max-w-full max-h-[75vh] object-contain rounded-lg"
                        />
                    </div>
                </SystemLightbox>
            )}
        </section>
    )
}
