'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ImageLightbox from '@/components/case-study/ImageLightbox'

export interface FeatureCategory {
    title: string;
    description: string;
    images: { src: string; alt?: string; caption?: string }[];
}

export default function FeatureCategoryCarousel({ categories }: { categories: FeatureCategory[] }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    // Lightbox State
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)
    const [lightboxImages, setLightboxImages] = useState<{ src: string, alt: string, caption?: string }[]>([])

    if (!categories || categories.length === 0) return null

    const openLightbox = (images: any[], index: number) => {
        setLightboxImages(images)
        setLightboxIndex(index)
        setLightboxOpen(true)
    }

    const handleScroll = () => {
        if (!containerRef.current) return
        const container = containerRef.current
        const scrollLeft = container.scrollLeft
        // The width of a swipable item is 90vw on mobile, 80vw on md, 70vw on lg.
        // Let's use the padding (5vw/10vw) + gap as an approximation to find the center
        const itemWidth = container.clientWidth * (window.innerWidth >= 1024 ? 0.7 : window.innerWidth >= 768 ? 0.8 : 0.9)
        const newIndex = Math.round(scrollLeft / itemWidth)
        setActiveIndex(Math.min(Math.max(newIndex, 0), categories.length - 1))
    }

    const scrollTo = (index: number) => {
        if (!containerRef.current) return
        const container = containerRef.current
        // Calculate dynamic width based on current breakpoint
        const itemWidth = container.clientWidth * (window.innerWidth >= 1024 ? 0.7 : window.innerWidth >= 768 ? 0.8 : 0.9)
        // Add gap and padding approximations
        const scrollPosition = index * (itemWidth + (window.innerWidth >= 768 ? 40 : 24))

        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        })
    }

    return (
        <div className="w-full relative py-12">
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-[5vw] md:px-[10vw] gap-6 md:gap-10 pb-12 items-start"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        className="shrink-0 w-[90vw] md:w-[80vw] lg:w-[70vw] snap-center flex flex-col bg-zinc-900/50 rounded-3xl md:rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:bg-zinc-900"
                    >
                        {/* Header Area */}
                        <div className="p-8 md:p-12 lg:p-16 pb-8 md:pb-12 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/5 bg-zinc-900/40">
                            <div className="max-w-2xl">
                                <p className="text-[var(--accent-teal)] font-mono text-xs uppercase tracking-widest mb-4">
                                    0{i + 1} / {categories.length}
                                </p>
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">{cat.title}</h3>
                                <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">{cat.description}</p>
                            </div>
                        </div>

                        {/* Image Gallery Area */}
                        <div className="p-6 md:p-10 lg:p-12">
                            <div className={`grid gap-12 md:gap-16 ${cat.images.length === 1 ? 'grid-cols-1' :
                                cat.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                                    'grid-cols-1 sm:grid-cols-2'
                                }`}>
                                {cat.images.map((img, j) => (
                                    <div
                                        key={j}
                                        className={`w-full flex flex-col items-center group cursor-pointer ${cat.images.length === 3 && j === 2 ? 'sm:col-span-2' : '' // Center the 3rd image if odd
                                            }`}
                                        onClick={() => openLightbox(cat.images, j)}
                                    >
                                        <div className="relative w-full flex justify-center object-contain hover:scale-[1.02] transition-transform duration-500">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={img.src}
                                                alt={img.alt || cat.title}
                                                className="w-full h-auto object-contain drop-shadow-2xl"
                                                loading="lazy"
                                            />
                                            {/* Hover View Label */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
                                                    View Focus
                                                </span>
                                            </div>
                                        </div>

                                        {(img.caption || img.alt) && (
                                            <div className="mt-6 text-center max-w-sm">
                                                <p className="text-zinc-400 font-mono text-sm uppercase tracking-wide leading-relaxed">{img.caption || img.alt}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dotted Indicator */}
            <div className="flex justify-center mt-8 gap-3">
                {categories.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollTo(i)}
                        className={`transition-all duration-300 rounded-full h-2 ${i === activeIndex ? 'w-10 bg-[var(--accent-teal)]' : 'w-2 bg-white/20 hover:bg-white/40'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            <ImageLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                images={lightboxImages}
                currentIndex={lightboxIndex}
                imageSrc={lightboxImages[lightboxIndex]?.src || ''}
                imageAlt={lightboxImages[lightboxIndex]?.alt || ''}
                imageCaption={lightboxImages[lightboxIndex]?.caption}
                onNavigate={setLightboxIndex}
                autoPlayInterval={0}
            />

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}
