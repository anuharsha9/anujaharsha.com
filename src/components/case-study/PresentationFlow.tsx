import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import PresentationSlide, { Slide } from './PresentationSlide';
import { BonusSlides } from './BonusSlides';
import { useFocusTrap } from '@/hooks/useFocusTrap';

export type { Slide };

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
    const [direction, setDirection] = useState(0); // -1 = prev, +1 = next
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    // SSR safety: only render portal after mount
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const nextSlide = useCallback(() => {
        if (currentIndex < slides.length - 1) {
            setDirection(1);
            setCurrentIndex(prev => prev + 1);
        }
    }, [currentIndex, slides.length]);

    const prevSlide = useCallback(() => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(prev => prev - 1);
        }
    }, [currentIndex]);

    const goToSlide = useCallback((index: number) => {
        if (index === currentIndex) return;
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    }, [currentIndex]);

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
    }, [nextSlide, prevSlide, onExit]);

    // Slide transition variants — directional motion + blur
    const slideVariants = {
        enter: (dir: number) => ({
            opacity: 0,
            x: dir * 60,
            filter: 'blur(6px)',
        }),
        center: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
        },
        exit: (dir: number) => ({
            opacity: 0,
            x: dir * -60,
            filter: 'blur(4px)',
            position: 'absolute' as const,
        }),
    };

    const slideTransition = {
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1],
    };

    // Render via Portal to escape any parent CSS filters that create
    // new containing blocks (which break position:fixed overlays)
    if (!mounted) return null;

    const content = (
        <div
            ref={containerRef as React.RefObject<HTMLDivElement>}
            className="fixed inset-0 z-[9999]"
            tabIndex={-1}
            data-presentation-mode
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-slate-950"
                onClick={onExit}
            />

            {/* Top Bar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute top-0 left-0 right-0 z-10 px-4 md:px-6 pt-3 md:pt-4 pb-6 bg-gradient-to-b from-slate-950/90 to-transparent"
            >
                <div className="flex items-center justify-between">
                    {/* Left: Technical Label + Counter */}
                    <div className="flex items-center gap-4">
                        <span className="hidden md:inline font-mono text-[11px] text-slate-500 uppercase tracking-widest">
                            {'// PRESENTATION_MODE'}
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                            [{String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}]
                        </span>
                    </div>

                    {/* Close Button — rotate on hover */}
                    <motion.button
                        onClick={onExit}
                        className="p-3 md:p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors duration-200 rounded-lg"
                        aria-label="Close presentation"
                        whileHover={{ rotate: 90, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <X className="w-6 h-6 md:w-5 md:h-5" />
                    </motion.button>
                </div>

                {/* Segmented Progress Bar */}
                <div className="mt-3 max-w-md mx-auto flex items-center gap-1">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className="relative flex-1 h-[3px] rounded-full overflow-hidden group cursor-pointer"
                            aria-label={`Go to slide ${idx + 1}`}
                        >
                            {/* Background track */}
                            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-200 rounded-full" />
                            {/* Fill */}
                            {idx <= currentIndex && (
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: idx === currentIndex
                                            ? 'linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.5))'
                                            : 'rgba(255,255,255,0.35)',
                                    }}
                                    layoutId={idx === currentIndex ? 'progress-active' : undefined}
                                    initial={idx === currentIndex ? { scaleX: 0, originX: 0 } : false}
                                    animate={{ scaleX: 1, originX: 0 }}
                                    transition={idx === currentIndex
                                        ? { type: 'spring', stiffness: 200, damping: 30 }
                                        : { duration: 0.2 }
                                    }
                                />
                            )}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12 pointer-events-none">
                <div className="w-full h-full max-w-7xl mx-auto flex flex-col justify-center pointer-events-auto">
                    <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={slideTransition}
                            className="w-full h-full flex flex-col justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <PresentationSlide data={slides[currentIndex]} slideIndex={currentIndex} totalSlides={slides.length} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Arrows — springs */}
                {currentIndex > 0 && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.08, x: -2 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="absolute left-4 md:left-8 z-20 p-3 md:p-4 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 backdrop-blur-sm transition-colors duration-200 rounded-xl pointer-events-auto"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                    </motion.button>
                )}

                {currentIndex < slides.length - 1 && (
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.08, x: 2 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="absolute right-4 md:right-8 z-20 p-3 md:p-4 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 backdrop-blur-sm transition-colors duration-200 rounded-xl pointer-events-auto"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                    </motion.button>
                )}
            </div>

            {/* Bottom Hint Bar — polished pills */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center px-4 md:px-6 py-3 md:py-4 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none"
            >
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
                    <div className="flex items-center gap-5 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <kbd className="px-2 py-1 bg-slate-800/80 border border-slate-700/60 text-slate-400 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">ESC</kbd>
                            Close
                        </span>
                        <span className="flex items-center gap-2">
                            <kbd className="px-2 py-1 bg-slate-800/80 border border-slate-700/60 text-slate-400 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">←</kbd>
                            <kbd className="px-2 py-1 bg-slate-800/80 border border-slate-700/60 text-slate-400 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">→</kbd>
                            Navigate
                        </span>
                    </div>
                )}
            </motion.div>

            {/* Bonus Slides */}
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

    return createPortal(content, document.body);
};
