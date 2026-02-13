'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { getTheme } from '@/lib/design-system'
import ImageLightbox from '@/components/case-study/ImageLightbox'

interface CarouselImage {
    src: string
    alt: string
    caption?: string
    videoSrc?: string
}

interface AutoSequenceDataViewerProps {
    images: CarouselImage[]
    title?: string
    className?: string
    aspectRatio?: string // e.g. "aspect-video" or "aspect-[16/10]"
    autoPlay?: boolean
    autoPlayInterval?: number
    onIndexChange?: (index: number) => void
    currentIndex?: number
}

export default function AutoSequenceDataViewer({
    images,
    title = 'gallery_view',
    className = '',
    aspectRatio = 'aspect-video',
    autoPlay = true,
    autoPlayInterval = 3000,
    onIndexChange,
    currentIndex: externalIndex
}: AutoSequenceDataViewerProps) {
    const [internalIndex, setInternalIndex] = useState(0)
    const isControlled = typeof externalIndex === 'number'
    const currentIndex = isControlled ? externalIndex : internalIndex

    const handleIndexChange = (newIndex: number) => {
        if (!isControlled) {
            setInternalIndex(newIndex)
        }
        onIndexChange?.(newIndex)
    }

    const [direction, setDirection] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [isPlaying, setIsPlaying] = useState(autoPlay)

    // Reset to image index 0 when images change
    useEffect(() => {
        if (!isControlled) setInternalIndex(0)
        setIsPlaying(autoPlay)
    }, [images, autoPlay, isControlled])

    // Auto-advance logic
    useEffect(() => {
        if (!isPlaying || isHovered || lightboxOpen || images.length <= 1) return

        const timer = setInterval(() => {
            setDirection(1)
            const nextIndex = (currentIndex + 1) % images.length
            handleIndexChange(nextIndex)
        }, autoPlayInterval)

        return () => clearInterval(timer)
    }, [isPlaying, isHovered, lightboxOpen, images.length, autoPlayInterval, currentIndex, isControlled])

    const paginate = (newDirection: number) => {
        setDirection(newDirection)
        let newIndex = currentIndex + newDirection
        if (newIndex < 0) newIndex = images.length - 1
        if (newIndex >= images.length) newIndex = 0
        handleIndexChange(newIndex)
    }

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    }

    return (
        <>
            <div
                className={`w-full ${aspectRatio} relative overflow-hidden rounded-xl border border-slate-200 shadow-md select-none bg-slate-50 group/carousel ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Content Area - No Chrome Header */}
                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute inset-0 w-full h-full cursor-pointer bg-white"
                            onClick={() => setLightboxOpen(true)}
                        >
                            {images[currentIndex].videoSrc ? (
                                <video
                                    src={images[currentIndex].videoSrc}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <Image
                                    src={images[currentIndex].src}
                                    alt={images[currentIndex].alt}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 1200px) 100vw, 1200px"
                                    priority={currentIndex === 0}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    {images.length > 1 && (
                        <>
                            <button
                                className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:bg-white shadow-sm transition-all z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                                onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:bg-white shadow-sm transition-all z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            {/* Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setDirection(idx > currentIndex ? 1 : -1)
                                            handleIndexChange(idx)
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all shadow-sm ${idx === currentIndex ? 'bg-[var(--accent-teal)] w-6' : 'bg-white/60 hover:bg-white/80'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Caption Overlay */}
                    {images[currentIndex].caption && (
                        <div className={`absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-3 transition-transform duration-300 transform ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
                            <p className="text-slate-700 text-xs md:text-sm font-medium text-center font-mono">
                                {images[currentIndex].caption}
                            </p>
                        </div>
                    )}

                    {/* Expand Button */}
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                        <button
                            onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                            className="p-2 bg-white/80 hover:bg-white rounded-full text-slate-700 shadow-sm transition-colors"
                            aria-label="Open fullscreen"
                        >
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <ImageLightbox
                    isOpen={lightboxOpen}
                    onClose={() => setLightboxOpen(false)}
                    imageSrc={images[currentIndex].videoSrc || images[currentIndex].src}
                    imageAlt={images[currentIndex].alt}
                    imageCaption={images[currentIndex].caption}
                    images={images.map(img => ({
                        src: img.videoSrc || img.src,
                        alt: img.alt,
                        caption: img.caption,
                        type: img.videoSrc ? 'video' : 'image',
                        poster: img.videoSrc ? img.src : undefined
                    }))}
                    currentIndex={currentIndex}
                    onNavigate={(index) => {
                        handleIndexChange(index)
                    }}
                />
            )}
        </>
    )
}
