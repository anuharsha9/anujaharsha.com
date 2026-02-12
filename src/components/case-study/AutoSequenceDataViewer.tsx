'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { getTheme } from '@/lib/design-system'
import { createPortal } from 'react-dom'

interface ImageItem {
    src: string
    alt: string
    videoSrc?: string  // Added support for video
    caption?: string
    fullWidth?: boolean
    sensitive?: boolean
}

interface AutoSequenceDataViewerProps {
    images: ImageItem[]
    title?: string
    externalIndex?: number
    onIndexChange?: (index: number) => void
}

export default function AutoSequenceDataViewer({ images, title, externalIndex, onIndexChange }: AutoSequenceDataViewerProps) {
    const [internalIndex, setInternalIndex] = useState(0)
    const isControlled = typeof externalIndex === 'number'

    const currentIndex = isControlled ? externalIndex : internalIndex

    const setCurrentIndex = useCallback((newIndex: number | ((prev: number) => number)) => {
        if (isControlled && onIndexChange) {
            const next = typeof newIndex === 'function' ? newIndex(externalIndex) : newIndex
            onIndexChange(next)
        } else {
            setInternalIndex(newIndex)
        }
    }, [isControlled, externalIndex, onIndexChange])

    const [isPlaying, setIsPlaying] = useState(true)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const t = getTheme(false)

    // Auto-advance logic
    useEffect(() => {
        if (!isPlaying || isLightboxOpen) return

        // If the current slide is a video, we might want to wait longer? 
        // For now, keeping the 2s rhythm unless interacted with, to match the "Seqeunce" feel.
        // Or specific logic: if video, maybe don't auto-advance? 
        // User asked for "Auto Sequence" behavior so we keep it simple.

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 3000) // Increased to 3s for better absorption

        return () => clearInterval(interval)
    }, [isPlaying, isLightboxOpen, images.length, setCurrentIndex])

    // Key navigation for lightbox
    useEffect(() => {
        if (!isLightboxOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % images.length)
            if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
            if (e.key === 'Escape') setIsLightboxOpen(false)
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isLightboxOpen, images.length, setCurrentIndex])

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isLightboxOpen])

    if (!images || images.length === 0) return null

    return (
        <div className="w-full my-8">
            {/* Viewer Window */}
            <div
                className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm group"
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center bg-black"
                    >
                        <div className="relative w-full h-full">
                            {images[currentIndex].videoSrc ? (
                                <video
                                    src={images[currentIndex].videoSrc}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Image
                                    src={images[currentIndex].src}
                                    alt={images[currentIndex].alt}
                                    fill
                                    className="object-contain" // Changed to contain to show full slide usually
                                    quality={90}
                                />
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Overlay Controls */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {/* Using pointer-events-auto for children so we can click them */}
                    <div className="flex gap-2 pointer-events-auto">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                                    }`}
                                aria-label={`Go to image ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <p className="text-white/80 text-xs font-mono pointer-events-auto">
                        {images[currentIndex].caption ? (
                            <span className="mr-2 font-bold text-white shadow-black drop-shadow-md">{images[currentIndex].caption}</span>
                        ) : null}
                        <span className="opacity-70">{currentIndex + 1} / {images.length}</span>
                    </p>
                </div>
            </div>

            {/* "View All" Button */}
            <div className="mt-3 flex justify-center">
                <button
                    onClick={() => setIsLightboxOpen(true)}
                    className={`
            group flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all
            bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-600
            dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 dark:text-slate-300
          `}
                >
                    <svg className="w-4 h-4 text-[var(--accent-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    View gallery
                </button>
            </div>

            {/* Lightbox Portal */}
            {isLightboxOpen && typeof window !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[10001] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 backdrop-blur-sm">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors z-50 hover:bg-white/10"
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white transition-colors hover:bg-white/10 z-50"
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white transition-colors hover:bg-white/10 z-50"
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Main Image/Video */}
                    <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center">
                        {images[currentIndex].videoSrc ? (
                            <video
                                src={images[currentIndex].videoSrc}
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <Image
                                src={images[currentIndex].src}
                                alt={images[currentIndex].alt}
                                fill
                                className="object-contain"
                                quality={100}
                                priority
                            />
                        )}
                    </div>

                    {/* Caption */}
                    <div className="mt-6 text-center">
                        <h3 className="text-white text-lg font-medium tracking-wide">
                            {title ? `${title} • ` : ''}Screen {currentIndex + 1} of {images.length}
                        </h3>
                        <p className="text-white/60 text-sm mt-1">{images[currentIndex].caption || images[currentIndex].alt}</p>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 transition-all ${idx === currentIndex ? 'bg-[var(--accent-teal)] w-6' : 'bg-white/30 hover:bg-white/60'
                                    }`}
                            />
                        ))}
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}
