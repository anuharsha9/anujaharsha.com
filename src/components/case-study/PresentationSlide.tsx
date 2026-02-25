import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export interface Slide {
    type: 'title' | 'problem' | 'research' | 'decision' | 'execution' | 'collaboration' | 'impact' | 'lesson' | 'component';
    layout?: 'split' | 'center' | 'full' | 'quote' | 'grid';
    title: string;
    content: string[];
    image?: string;
    notes?: string;
    component?: React.ReactNode;
    signal?: string;
}

interface SlideData extends Slide { }

interface PresentationSlideProps {
    data: SlideData;
    slideIndex?: number;
    totalSlides?: number;
}

// Helper function for type colors
function getTypeColor(type: string) {
    switch (type) {
        case 'problem': return 'bg-rose-500';
        case 'research': return 'bg-violet-500';
        case 'decision': return 'bg-blue-500';
        case 'execution': return 'bg-emerald-500';
        case 'impact': return 'bg-amber-500';
        case 'lesson': return 'bg-indigo-500';
        default: return 'bg-zinc-500';
    }
}

function getTextColor(type: string) {
    switch (type) {
        case 'problem': return 'text-rose-500';
        case 'research': return 'text-violet-500';
        case 'decision': return 'text-blue-500';
        case 'execution': return 'text-emerald-500';
        case 'impact': return 'text-amber-500';
        case 'lesson': return 'text-indigo-500';
        default: return 'text-zinc-500';
    }
}

function getBorderColor(type: string) {
    switch (type) {
        case 'problem': return 'border-rose-500';
        case 'research': return 'border-violet-500';
        case 'decision': return 'border-blue-500';
        case 'execution': return 'border-emerald-500';
        case 'impact': return 'border-amber-500';
        case 'lesson': return 'border-indigo-500';
        default: return 'border-zinc-500';
    }
}

// Type-aware gradient accent colors (CSS string)
function getAccentGradient(type: string): string {
    switch (type) {
        case 'problem': return 'radial-gradient(ellipse at top left, var(--overlay-rose-08) 0%, transparent 60%)';
        case 'research': return 'radial-gradient(ellipse at top left, var(--overlay-violet-08) 0%, transparent 60%)';
        case 'decision': return 'radial-gradient(ellipse at top left, var(--overlay-blue-08) 0%, transparent 60%)';
        case 'execution': return 'radial-gradient(ellipse at top left, var(--overlay-emerald-08) 0%, transparent 60%)';
        case 'impact': return 'radial-gradient(ellipse at top left, var(--overlay-amber-08) 0%, transparent 60%)';
        case 'lesson': return 'radial-gradient(ellipse at top left, var(--overlay-indigo-08) 0%, transparent 60%)';
        case 'collaboration': return 'radial-gradient(ellipse at top left, var(--overlay-sky-08) 0%, transparent 60%)';
        default: return 'radial-gradient(ellipse at top left, var(--overlay-zinc-05) 0%, transparent 60%)';
    }
}

// Signal badge component (reused across layouts)
function SignalBadge({ signal }: { signal?: string }) {
    if (!signal) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="absolute bottom-6 right-6 md:bottom-10 md:right-12 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm z-20"
        >
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                {signal}
            </span>
        </motion.div>
    );
}

export default function PresentationSlide({ data, slideIndex, totalSlides }: PresentationSlideProps) {
    // Determine layout 
    const layout = data.layout || (data.type === 'title' ? 'center' : 'split');

    const containerClasses = "w-full h-full md:max-h-[80vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden";

    if (data.type === 'component' && data.component) {
        return (
            <div className={`${containerClasses} p-8 md:p-12 overflow-y-auto custom-scrollbar`}>
                {/* Type accent */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: getAccentGradient(data.type) }} />
                <div className="w-full min-h-full flex flex-col justify-center relative z-10">
                    {data.component}
                </div>
            </div>
        );
    }

    // Title / Center Layout
    if (layout === 'center') {
        return (
            <div className={containerClasses}>
                {/* Type-aware gradient accent */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: getAccentGradient(data.type) }} />

                {/* Background slide number watermark (for non-title slides without images) */}
                {data.type !== 'title' && !data.image && slideIndex !== undefined && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                        <span className="text-[20vw] md:text-[16rem] font-black text-white/[0.025] leading-none tabular-nums">
                            {String((slideIndex ?? 0) + 1).padStart(2, '0')}
                        </span>
                    </div>
                )}

                {/* Spotlight gradient behind title (for non-image center slides) */}
                {!data.image && (
                    <div className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse 60% 40% at 50% 45%, var(--overlay-white-03) 0%, transparent 70%)',
                        }}
                    />
                )}

                <div className="flex flex-col items-center justify-center text-center h-full space-y-8 relative z-10 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                    {data.image && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            className="relative mb-8 shrink-0"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-full" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-auto max-h-[30vh] max-w-4xl shadow-2xl rounded-lg border border-white/10 relative z-10"
                                loading="eager"
                            />
                        </motion.div>
                    )}
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <span className={`inline-block px-3 py-1 mb-6 ${getTypeColor(data.type).replace('bg-', 'bg-')}/10 ${getTextColor(data.type)} text-sm font-mono uppercase tracking-widest border ${getBorderColor(data.type)}/20 rounded-full`}>
                                {data.type === 'title' ? 'Case Study' : data.type}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                                {data.title}
                            </h1>
                        </motion.div>

                        {/* Animated divider */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.35, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-transparent mx-auto mb-8 rounded-full origin-center"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.4 }}
                            className="space-y-4"
                        >
                            {data.content.map((line, idx) => (
                                <motion.p
                                    key={idx}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + idx * 0.08, duration: 0.35 }}
                                    className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed"
                                >
                                    {line}
                                </motion.p>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <SignalBadge signal={data.signal} />
            </div>
        );
    }

    // Quote Layout
    if (layout === 'quote') {
        return (
            <div className={containerClasses}>
                {/* Type accent */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: getAccentGradient(data.type) }} />

                <div className="flex flex-col items-center justify-center text-center h-full max-w-5xl mx-auto p-8 md:p-12 overflow-y-auto custom-scrollbar">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-6xl md:text-8xl text-blue-500/20 font-sans mb-8"
                    >
                        &ldquo;
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-3xl md:text-5xl font-light text-white leading-tight mb-12 font-sans italic"
                    >
                        {data.title}
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.35 }}
                        className="flex flex-col items-center gap-4"
                    >
                        {data.image && (
                            <Image width={64} height={64} src={data.image} alt="Speaker" className="rounded-full border-2 border-white/10" unoptimized priority />
                        )}
                        <div className="space-y-1">
                            {data.content.map((line, idx) => (
                                <p key={idx} className={`text-lg ${idx === 0 ? 'text-white font-medium' : 'text-zinc-500'}`}>
                                    {line}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                </div>
                <SignalBadge signal={data.signal} />
            </div>
        );
    }

    // Full Image Layout
    if (layout === 'full') {
        return (
            <div className={containerClasses}>
                {/* Type accent */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: getAccentGradient(data.type) }} />

                <div className="relative w-full h-full flex flex-col justify-end p-8 md:p-12">
                    {data.image && (
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={data.image}
                                alt={data.title}
                                fill
                                className="object-cover opacity-40 mix-blend-overlay"
                                unoptimized
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                        </div>
                    )}
                    <div className="relative z-10 max-w-4xl overflow-y-auto custom-scrollbar max-h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.35 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <span className={`w-2 h-2 rounded-full ${getTypeColor(data.type)}`} />
                            <span className="text-zinc-400 text-xs uppercase tracking-widest font-bold">
                                {data.type}
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                            className="text-3xl md:text-5xl font-bold text-white mb-6"
                        >
                            {data.title}
                        </motion.h2>
                        <div className="space-y-2">
                            {data.content.map((point, idx) => (
                                <motion.p
                                    key={idx}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.08, duration: 0.3 }}
                                    className="text-lg md:text-xl text-zinc-300 max-w-2xl"
                                >
                                    {point}
                                </motion.p>
                            ))}
                        </div>
                    </div>
                </div>
                <SignalBadge signal={data.signal} />
            </div>
        )
    }

    // Default Split Layout
    const hasImage = !!data.image;

    return (
        <div className={containerClasses}>
            {/* Type-aware gradient accent */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: getAccentGradient(data.type) }} />

            <div className={`grid grid-cols-1 ${hasImage ? 'lg:grid-cols-2' : ''} gap-8 md:gap-12 h-full items-center p-8 md:p-12 overflow-y-auto custom-scrollbar relative z-10`}>
                <div className={`space-y-8 md:space-y-10 ${hasImage ? 'order-2 lg:order-1' : 'max-w-5xl mx-auto w-full'}`}>
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.35 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className={`w-2 h-2 rounded-full ${getTypeColor(data.type)}`} />
                            <span className={`${getTextColor(data.type)} text-xs uppercase tracking-widest font-bold`}>
                                {data.type} phase
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
                        >
                            {data.title}
                        </motion.h2>

                        {/* Animated divider */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.35, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            className="h-1 w-20 bg-zinc-800 rounded-full origin-left"
                        />
                    </div>

                    <ul className="space-y-6">
                        {data.content.map((point, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10, y: 4 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 0.45 + idx * 0.08, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                className="flex items-start gap-4"
                            >
                                <span className={`mt-2.5 w-1.5 h-1.5 rounded-full ${getTypeColor(data.type)} shrink-0 opacity-60`} />
                                <span className="text-lg md:text-xl font-light text-zinc-300 leading-relaxed">
                                    {point}
                                </span>
                            </motion.li>
                        ))}
                    </ul>

                    {data.notes && (
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65, duration: 0.3 }}
                            className="pt-8 mt-8 border-t border-white/5"
                        >
                            <p className="text-zinc-500 text-sm font-mono leading-relaxed">
                                <span className="text-zinc-400 uppercase tracking-wider mr-2">Context:</span>
                                {data.notes}
                            </p>
                        </motion.div>
                    )}
                </div>

                {hasImage && (
                    <div className="order-1 lg:order-2 h-full max-h-[40vh] lg:max-h-full flex items-center justify-center relative group">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            className="relative rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 w-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-full h-auto max-h-[60vh] object-contain"
                                loading="eager"
                            />
                        </motion.div>
                    </div>
                )}
            </div>

            <SignalBadge signal={data.signal} />
        </div>
    );
}
