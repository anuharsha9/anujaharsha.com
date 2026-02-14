import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PresentationSlide } from './PresentationSlide';
import { BonusSlides } from './BonusSlides';
import { useFocusTrap } from '@/hooks/useFocusTrap';

export interface Slide {
    type: 'title' | 'problem' | 'research' | 'decision' | 'execution' | 'collaboration' | 'impact' | 'lesson' | 'component';
    layout?: 'split' | 'center' | 'full' | 'quote' | 'grid';
    title: string;
    content: string[];
    image?: string;
    notes?: string;
    component?: React.ReactNode;
}

interface PresentationFlowProps {
    slides: Slide[];
    bonusSlides?: {
        title: string;
        slides: { title: string; image: string; description: string }[];
    };
    onExit: () => void;
}

export const PresentationFlow: React.FC<PresentationFlowProps> = ({ slides, bonusSlides, onExit }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const nextSlide = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Focus Trap setup
    const containerRef = useFocusTrap(true);

    // Simple touch handling
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

        if (isLeftSwipe) {
            nextSlide()
        }
        if (isRightSwipe) {
            prevSlide()
        }
        // Reset
        setTouchStart(null)
        setTouchEnd(null)
    }

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Scroll lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') onExit();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    return (
        <div ref={containerRef as React.RefObject<HTMLDivElement>} className="fixed inset-0 z-[9999]" tabIndex={-1}>
            {/* Backdrop - Dark with blur to match ImageLightbox */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-slate-950"
                onClick={onExit} // Click backdrop to close
            />

            {/* Top Bar - Technical Header matching ImageLightbox */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-gradient-to-b from-slate-950/90 to-transparent"
            >
                {/* Technical Label */}
                <div className="flex items-center gap-4">
                    <span className="hidden md:inline font-mono text-[11px] text-slate-500 uppercase tracking-widest">
                        {'// PRESENTATION_MODE'}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                        [{String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}]
                    </span>
                </div>

                {/* Close Button */}
                <button
                    onClick={onExit}
                    className="p-3 md:p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
                    aria-label="Close presentation"
                >
                    <X className="w-6 h-6 md:w-5 md:h-5" />
                </button>
            </motion.div>

            {/* Main Content Area */}
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12 pointer-events-none">
                <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-center pointer-events-auto">
                    <AnimatePresence mode="sync">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, position: 'absolute' as const }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="w-full h-full flex flex-col justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <PresentationSlide data={slides[currentIndex]} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Arrows - Floating Style matching ImageLightbox */}
                {currentIndex > 0 && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="absolute left-4 md:left-8 z-20 p-3 md:p-4 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 backdrop-blur-sm transition-all duration-200 group pointer-events-auto"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-x-0.5 transition-transform" />
                    </motion.button>
                )}

                {currentIndex < slides.length - 1 && (
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="absolute right-4 md:right-8 z-20 p-3 md:p-4 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 backdrop-blur-sm transition-all duration-200 group pointer-events-auto"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-0.5 transition-transform" />
                    </motion.button>
                )}
            </div>

            {/* Bottom Hint Bar - Matching ImageLightbox */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center px-4 md:px-6 py-3 md:py-4 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none"
            >
                {/* Mobile hints */}
                {isMobile ? (
                    <div className="flex items-center gap-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <span className="text-slate-400">Tap X</span>
                            Close
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="text-slate-400">←→</span>
                            Swipe
                        </span>
                    </div>
                ) : (
                    /* Desktop hints */
                    <div className="flex items-center gap-6 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-400">ESC</kbd>
                            Close
                        </span>
                        <span className="flex items-center gap-2">
                            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-400">←</kbd>
                            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-400">→</kbd>
                            Navigate
                        </span>
                    </div>
                )}
            </motion.div>

            {/* Bonus Slides - Adapted to new style */}
            {currentIndex === slides.length - 1 && bonusSlides && (
                <div className="absolute bottom-20 right-8 z-30 pointer-events-auto">
                    <div className="bg-slate-900 border border-slate-700 p-4 shadow-xl max-w-sm rounded-lg backdrop-blur-md bg-slate-900/90">
                        <h4 className="text-sm font-bold text-white mb-2 font-mono uppercase tracking-widest text-[10px] text-emerald-400">Deep Dives Available</h4>
                        <BonusSlides data={bonusSlides} />
                    </div>
                </div>
            )}
        </div>
    );
};
