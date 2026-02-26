'use client'

/**
 * ArchitectureBlueprint — Clean gallery for process artifacts
 * and architecture diagrams across all case studies.
 *
 * Replaces: ProcessArtifactViewer + SystemTopologyBlueprint + IQArchitectureBlueprint
 *
 * Design: Minimal, gallery-like. Let the images breathe.
 */

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Download, ZoomIn, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import ImageLightbox from './ImageLightbox'
import TerminalInsight from './TerminalInsight'
import { useLightbox } from '@/contexts/LightboxContext'
import type { ArchitectureBlueprintData, SketchArtifact } from '@/types/architectureBlueprint'

interface Props {
    data: ArchitectureBlueprintData
}

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
}

/* ─────────────────────────────────
   Sketch Carousel — clean horizontal scroll
   ───────────────────────────────── */
function SketchCarousel({
    artifacts,
    pdfUrl,
    onOpenLightbox,
}: {
    artifacts: SketchArtifact[]
    pdfUrl?: string
    onOpenLightbox: (index: number) => void
}) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const updateScrollState = useCallback(() => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 10)
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
    }, [])

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        el.addEventListener('scroll', updateScrollState, { passive: true })
        updateScrollState()
        return () => el.removeEventListener('scroll', updateScrollState)
    }, [updateScrollState])

    const scroll = (direction: 'left' | 'right') => {
        const el = scrollRef.current
        if (!el) return
        const amount = el.clientWidth * 0.6
        el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
    }

    return (
        <div className="space-y-5">
            {/* Minimal header: just nav arrows + PDF link */}
            <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                    Sketches · {artifacts.length} pages
                </span>

                <div className="flex items-center gap-2">
                    {pdfUrl && (
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 text-white/40 hover:text-white/70 transition-colors text-xs"
                        >
                            <FileText className="w-3 h-3" />
                            <span>PDF</span>
                            <Download className="w-2.5 h-2.5" />
                        </a>
                    )}
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className="p-1.5 rounded-full hover:bg-white/[0.08] transition-colors disabled:opacity-15 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-4 h-4 text-white/50" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className="p-1.5 rounded-full hover:bg-white/[0.08] transition-colors disabled:opacity-15 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-4 h-4 text-white/50" />
                    </button>
                </div>
            </div>

            {/* Horizontal scroll */}
            <div className="relative -mx-4 sm:-mx-6 md:-mx-8">
                {/* Fade edges */}
                {canScrollLeft && (
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
                )}
                {canScrollRight && (
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />
                )}

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-4 sm:px-6 md:px-8 py-1"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {artifacts.map((artifact, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 group cursor-pointer"
                            style={{ width: 'clamp(240px, 38%, 360px)', scrollSnapAlign: 'start' }}
                            onClick={() => onOpenLightbox(index)}
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/[0.02] border border-white/[0.06] transition-all duration-500 group-hover:border-white/[0.12] group-hover:-translate-y-0.5">
                                <Image
                                    src={artifact.src}
                                    alt={artifact.alt}
                                    fill
                                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${artifact.needsRotation ? '-rotate-90 scale-[1.35]' : ''} ${artifact.needsScale ? 'scale-[1.10]' : ''}`}
                                    sizes="(max-width: 768px) 70vw, 38vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="bg-black/40 backdrop-blur-sm rounded-full p-2.5">
                                        <ZoomIn className="w-4 h-4 text-white/90" strokeWidth={1.5} />
                                    </div>
                                </div>
                            </div>
                            {artifact.caption && (
                                <p className="mt-2 text-[11px] text-white/30 leading-relaxed line-clamp-1 px-0.5">
                                    {artifact.caption}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ─────────────────────────────────
   Main Component
   ───────────────────────────────── */
export default function ArchitectureBlueprint({ data }: Props) {
    const { heading, sketches, diagrams, footer } = data
    const { openLightbox } = useLightbox()

    const [sketchLightboxOpen, setSketchLightboxOpen] = useState(false)
    const [currentSketchIndex, setCurrentSketchIndex] = useState(0)
    const allSketches = sketches?.artifacts ?? []

    const diagramLightboxImages = diagrams.map((d) => ({
        src: d.src,
        alt: d.alt,
        caption: d.caption,
    }))

    return (
        <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.12 }}
        >
            {/* Section Header */}
            <motion.div variants={itemVariants}>
                <ComponentHeading
                    variant="block"
                    align="center"
                    title={heading.title}
                    description={heading.description}
                    color={heading.color}
                    className="mb-0"
                />
            </motion.div>

            {/* ── SKETCHES ── */}
            {sketches && allSketches.length > 0 && (
                <motion.div variants={itemVariants}>
                    <SketchCarousel
                        artifacts={allSketches}
                        pdfUrl={sketches.pdfUrl}
                        onOpenLightbox={(i) => {
                            setCurrentSketchIndex(i)
                            setSketchLightboxOpen(true)
                        }}
                    />
                </motion.div>
            )}

            {/* ── DIAGRAMS ── */}
            {diagrams.length > 0 && (
                <motion.div variants={itemVariants}>
                    {/* Subtle label */}
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-6">
                        Architecture Diagrams
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {diagrams.map((diagram, index) => (
                            <div
                                key={index}
                                className={`group bg-white/[0.02] border border-white/[0.06] overflow-hidden rounded-xl transition-all duration-300 hover:border-white/[0.10] cursor-zoom-in ${diagram.size === 'full' ? 'md:col-span-2' : ''
                                    }`}
                                onClick={() =>
                                    openLightbox(
                                        { src: diagram.src, alt: diagram.alt, caption: diagram.caption },
                                        diagramLightboxImages,
                                        index
                                    )
                                }
                            >
                                {/* Image */}
                                <div
                                    className="relative w-full"
                                    style={{ aspectRatio: diagram.size === 'full' ? '21/9' : '16/10' }}
                                >
                                    <Image
                                        src={diagram.src}
                                        alt={diagram.alt}
                                        fill
                                        className="object-contain p-4 group-hover:scale-[1.01] transition-transform duration-500"
                                        sizes={diagram.size === 'full' ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.06] transition-colors duration-300" />
                                </div>

                                {/* Caption */}
                                <div className="px-4 py-3 border-t border-white/[0.04]">
                                    <p className="text-[13px] text-white/30 leading-relaxed">{diagram.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}



            {/* Sketch Lightbox */}
            {allSketches.length > 0 && (
                <ImageLightbox
                    isOpen={sketchLightboxOpen}
                    onClose={() => setSketchLightboxOpen(false)}
                    imageSrc={allSketches[currentSketchIndex]?.src}
                    imageAlt={allSketches[currentSketchIndex]?.alt}
                    imageCaption={allSketches[currentSketchIndex]?.caption}
                    images={allSketches.map((a) => ({ src: a.src, alt: a.alt, caption: a.caption }))}
                    currentIndex={currentSketchIndex}
                    onNavigate={setCurrentSketchIndex}
                />
            )}
        </motion.div>
    )
}
