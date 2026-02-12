import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PresentationSlide } from './PresentationSlide';
import { BonusSlides } from './BonusSlides';

export interface Slide {
    type: 'title' | 'problem' | 'research' | 'decision' | 'execution' | 'collaboration' | 'impact' | 'lesson' | 'component';
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

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') onExit();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

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

    return (
        <div className="fixed inset-0 z-[20000] bg-black text-white flex flex-col">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-8 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <div className="bg-zinc-800 text-xs font-mono px-3 py-1 text-zinc-400">
                    Slide {currentIndex + 1} / {slides.length}
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-zinc-500 text-xs uppercase tracking-widest hidden md:block">
                        Presentation Mode
                    </span>
                    <button
                        onClick={onExit}
                        className="p-2 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Slide Area */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4 md:p-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full max-w-7xl mx-auto flex flex-col justify-center"
                    >
                        <PresentationSlide data={slides[currentIndex]} />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 bg-zinc-900/50 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white backdrop-blur-sm border border-white/10"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                    onClick={nextSlide}
                    disabled={currentIndex === slides.length - 1}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 bg-zinc-900/50 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-emerald-400 backdrop-blur-sm border border-white/10"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>

            {/* Footer / Progress */}
            <div className="h-2 bg-zinc-900">
                <motion.div
                    className="h-full bg-emerald-500 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: (currentIndex + 1) / slides.length }}
                    transition={{ duration: 0.2 }}
                />
            </div>

            {/* Bonus Slides (Only shown at the end or via specific trigger - for now, I'll append them or show below? Plan implies they are part of flow or separate. I'll include a way to access them if at the last slide maybe?) */}
            {currentIndex === slides.length - 1 && bonusSlides && (
                <div className="absolute bottom-20 right-8">
                    <div className="bg-zinc-900 border border-zinc-700 p-4 shadow-xl max-w-sm">
                        <h4 className="text-sm font-bold text-white mb-2">Deep Dives Available</h4>
                        <BonusSlides data={bonusSlides} />
                    </div>
                </div>
            )}
        </div>
    );
};
