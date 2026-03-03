'use client'

import React, { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export interface CarouselStep {
    src: string
    alt: string
    caption: string
}

interface AppleCarouselProps {
    steps: CarouselStep[]
    title?: string
    description?: string
}

export default function AppleCarousel({ steps, title, description }: AppleCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [activeSlide, setActiveSlide] = useState(0)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    })

    // Subtle parallax effect on the title
    const y = useTransform(scrollYProgress, [0, 1], [0, 50])

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget
        const elements = Array.from(el.children) as HTMLElement[]

        let minDistance = Infinity
        let closestIndex = 0

        const containerCenter = el.scrollLeft + el.offsetWidth / 2

        elements.forEach((child, idx) => {
            // Ignore the spacer div
            if (idx === steps.length) return

            const childCenter = child.offsetLeft + child.offsetWidth / 2
            const distance = Math.abs(containerCenter - childCenter)

            if (distance < minDistance) {
                minDistance = distance
                closestIndex = idx
            }
        })

        setActiveSlide(closestIndex)
    }, [steps.length])

    const scrollToSlide = useCallback((idx: number) => {
        if (!scrollContainerRef.current) return
        const el = scrollContainerRef.current
        const elements = Array.from(el.children) as HTMLElement[]
        const targetElement = elements[idx]

        if (targetElement) {
            // Center the selected item
            const scrollLeft = targetElement.offsetLeft - el.offsetWidth / 2 + targetElement.offsetWidth / 2
            el.scrollTo({ left: scrollLeft, behavior: 'smooth' })
        }
    }, [])

    if (!steps || steps.length === 0) return null

    return (
        <div ref={containerRef} className="py-24 sm:py-32 overflow-hidden w-full relative">
            <motion.div style={{ y }} className="max-w-[1440px] mx-auto px-6 md:px-16 mb-12">
                {title && (
                    <h3 className="text-2xl md:text-4xl font-sans font-bold text-white mb-4">
                        {title}
                    </h3>
                )}
                {description && (
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl">
                        {description}
                    </p>
                )}
            </motion.div>

            {/* Horizontal snapping carousel */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-16 pb-6 disable-scrollbars"
            >
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="snap-center shrink-0 w-[85vw] md:w-[60vw] max-w-4xl rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 relative group"
                        style={{ scrollSnapAlign: 'center' }}
                    >
                        <div className="relative aspect-[16/9] w-full">
                            <Image
                                src={step.src}
                                alt={step.alt}
                                fill
                                className="object-contain bg-black/40 p-4"
                                sizes="(max-width: 768px) 85vw, 60vw"
                            />
                        </div>

                        {/* Caption Area (always visible, cleanly separated below the image like Apple's gallery) */}
                        <div className="p-8 bg-zinc-900/80 backdrop-blur-xl border-t border-white/5">
                            <div className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-bold font-mono">
                                    {i + 1}
                                </span>
                                <p className="text-white/80 text-base md:text-lg leading-relaxed pt-1">
                                    {step.caption}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Spacer to allow the last item to be centered */}
                <div className="shrink-0 w-[8vw] md:w-[20vw]" />
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4 mb-4">
                {steps.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToSlide(i)}
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{
                            width: i === activeSlide ? 28 : 8,
                            backgroundColor: i === activeSlide ? 'var(--accent-teal)' : 'rgba(255,255,255,0.12)',
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
        .disable-scrollbars::-webkit-scrollbar {
          display: none;
        }
        .disable-scrollbars {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
        </div>
    )
}
