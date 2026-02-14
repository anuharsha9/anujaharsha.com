import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BonusSlidesProps {
    data: {
        title: string;
        slides: {
            title: string;
            image: string;
            description: string;
        }[];
    };
}

export const BonusSlides: React.FC<BonusSlidesProps> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full text-left px-4 py-3 bg-zinc-800 hover:bg-zinc-700 transition-colors text-white text-sm flex justify-between items-center group"
            >
                <span>View {data.title} ({data.slides.length})</span>
                <span className="text-zinc-500 group-hover:text-white">→</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[20050] bg-black/90 backdrop-blur-xl flex items-center justify-center p-8"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 p-3 bg-zinc-800 text-white hover:bg-red-500 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 h-[80vh]">
                            <div className="md:col-span-1 space-y-4 overflow-y-auto pr-2">
                                <h2 className="text-2xl font-bold text-white mb-6">{data.title}</h2>
                                {data.slides.map((slide, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveSlide(idx)}
                                        className={`w-full text-left p-4 border transition-all ${activeSlide === idx
                                            ? 'bg-blue-900/20 border-blue-500/50 text-white'
                                            : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                                            }`}
                                    >
                                        <h4 className="font-semibold mb-1">{slide.title}</h4>
                                        <p className="text-xs line-clamp-2 opacity-70">{slide.description}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 p-8 flex flex-col items-center justify-center relative">
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Image
                                        src={data.slides[activeSlide].image}
                                        alt={data.slides[activeSlide].title}
                                        fill
                                        className="object-contain shadow-2xl"
                                        unoptimized
                                        priority
                                    />
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 border border-white/10">
                                    <p className="text-white text-sm md:text-base text-center">
                                        {data.slides[activeSlide].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
