'use client'

import React, { useRef, useState } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
} from 'framer-motion'
import { CAREER_DATA } from '@/data/career-data'
import ImageLightbox from '@/components/case-study/ImageLightbox'
import { ARCHIVE_GALLERY_DATA } from '@/data/archive-gallery'
import WordGameLightbox from '@/components/work/wordu/WordGameLightbox'
import TimelineSlide from './timeline/TimelineSlide'

const TOTAL = CAREER_DATA.length

import MobileTimeline from './timeline/MobileTimeline'

export default function CinematicTimeline() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    // Lightbox State
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [gameLightboxOpen, setGameLightboxOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [activeProjectImages, setActiveProjectImages] = useState<Array<{ src: string, alt: string }>>([])

    const handleOpenLightbox = (workId: string) => {
        if (workId === 'portfolio-game') {
            setGameLightboxOpen(true)
            return
        }
        const images = ARCHIVE_GALLERY_DATA[workId]
        if (images && images.length > 0) {
            setActiveProjectImages(images)
            setCurrentImageIndex(0)
            setLightboxOpen(true)
        }
    }

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        setCurrentIndex(Math.min(Math.floor(v * TOTAL), TOTAL - 1))
    })

    // ── Cinematic overlay hooks (must be outside JSX) ──
    const transitionGlowOpacity = useTransform(scrollYProgress, (v: number) => {
        const segmentSize = 1 / TOTAL
        const posInSegment = (v % segmentSize) / segmentSize
        const distFromEdge = Math.min(posInSegment, 1 - posInSegment)
        if (distFromEdge > 0.15) return 0
        return (1 - distFromEdge / 0.15) * 0.15
    })

    return (
        <>
            {/* ── MOBILE LAYOUT (Vertical Stack) ── */}
            <div className="lg:hidden relative">
                <MobileTimeline
                    onOpenLightbox={handleOpenLightbox}
                    onOpenGameLightbox={() => setGameLightboxOpen(true)}
                />
            </div>

            {/* ── DESKTOP LAYOUT (Cinematic Scroll) ── */}
            <div className="hidden lg:block relative">
                <div
                    ref={containerRef}
                    id="work-overview"
                    className="relative"
                    style={{ height: `${(TOTAL + 1) * 100}vh` }}
                >
                    {/* ── Sticky Stage ── */}
                    <div className="sticky top-0 h-screen overflow-hidden">
                        {/* ── Cinematic transition flash (fires during crossfade) ── */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none z-20"
                            style={{
                                opacity: transitionGlowOpacity,
                                background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(7,139,156,0.3), transparent 70%)',
                            }}
                        />

                        {/* All slides (absolutely positioned, one visible at a time) */}
                        {CAREER_DATA.map((era, i) => (
                            <TimelineSlide
                                key={era.id}
                                era={era}
                                index={i}
                                scrollYProgress={scrollYProgress}
                                onOpenLightbox={handleOpenLightbox}
                                onOpenGameLightbox={() => setGameLightboxOpen(true)}
                            />
                        ))}

                        {/* ── Slide counter (bottom-right) ── */}
                        <div className="absolute bottom-8 right-8 z-30 font-mono text-sm tracking-wider select-none">
                            <span className="text-white/50">
                                {String(currentIndex + 1).padStart(2, '0')}
                            </span>
                            <span className="text-white/15 mx-1">/</span>
                            <span className="text-white/15">
                                {String(TOTAL).padStart(2, '0')}
                            </span>
                        </div>

                        {/* ── Side progress dots ── */}
                        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
                            {CAREER_DATA.map((_, i) => (
                                <div
                                    key={i}
                                    className={`rounded-full transition-all duration-500 ${i === currentIndex
                                        ? 'w-2 h-2 bg-[#078B9C] shadow-[0_0_10px_rgba(7,139,156,0.6)]'
                                        : i < currentIndex
                                            ? 'w-1.5 h-1.5 bg-white/20'
                                            : 'w-1.5 h-1.5 bg-white/8'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <ImageLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                imageSrc={activeProjectImages[currentImageIndex]?.src || ''}
                imageAlt={activeProjectImages[currentImageIndex]?.alt || ''}
                images={activeProjectImages}
                currentIndex={currentImageIndex}
                onNavigate={setCurrentImageIndex}
            />

            {/* WordU Game Lightbox */}
            <WordGameLightbox
                isOpen={gameLightboxOpen}
                onClose={() => setGameLightboxOpen(false)}
            />
        </>
    )
}
