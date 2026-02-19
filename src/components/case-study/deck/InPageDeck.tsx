'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react'
import { Slide } from '@/components/case-study/PresentationSlide'
import PresentationSlide from '@/components/case-study/PresentationSlide'

interface InPageDeckProps {
    slides: Slide[]
    onExit: () => void
    pdfUrl?: string
    accentColor?: string
}

export default function InPageDeck({
    slides,
    onExit,
    pdfUrl,
    accentColor = 'teal'
}: InPageDeckProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const nextSlide = useCallback(() => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(currentIndex + 1)
        }
    }, [currentIndex, slides.length])

    const prevSlide = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }, [currentIndex])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide()
            if (e.key === 'ArrowLeft') prevSlide()
            if (e.key === 'Escape') onExit()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [nextSlide, prevSlide, onExit])

    // Touch handling
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

    const handleTouchEnd = () => {
        if (touchStart === null || touchEnd === null) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe) nextSlide()
        if (isRightSwipe) prevSlide()

        setTouchStart(null)
        setTouchEnd(null)
    }

    return (
        <div
            className="relative w-full h-[calc(100vh-80px)] bg-slate-50 overflow-hidden flex flex-col"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Top Bar: Progress & Exit */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-400">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </span>
                    <div className="h-1 w-24 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-slate-800"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {pdfUrl && (
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                            aria-label="Download PDF"
                        >
                            <Download className="w-5 h-5" />
                        </a>
                    )}
                    <button
                        onClick={onExit}
                        className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                        aria-label="Exit Presentation"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Slide Area */}
            <div className="flex-1 relative flex items-center justify-center p-4 md:p-12">
                <div className="w-full h-full max-w-7xl mx-auto relative perspective-1000">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20, rotateY: -2 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: -20, rotateY: 2 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full h-full flex flex-col justify-center bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100"
                        >
                            <PresentationSlide data={slides[currentIndex]} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-6 z-20 pointer-events-none">
                <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-full px-4 py-2 flex items-center gap-4 shadow-sm pointer-events-auto">
                    <button
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest hidden md:inline-block">
                        Navigate
                    </span>

                    <button
                        onClick={nextSlide}
                        disabled={currentIndex === slides.length - 1}
                        className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
