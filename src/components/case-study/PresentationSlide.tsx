import React from 'react';
import { motion } from 'framer-motion';

interface SlideData {
    type: 'title' | 'problem' | 'research' | 'decision' | 'execution' | 'collaboration' | 'impact' | 'lesson' | 'component';
    layout?: 'split' | 'center' | 'full' | 'quote' | 'grid';
    title: string;
    content: string[];
    image?: string;
    notes?: string;
    component?: React.ReactNode;
    signal?: string;
}

interface PresentationSlideProps {
    data: SlideData;
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

export const PresentationSlide: React.FC<PresentationSlideProps> = ({ data }) => {
    // Determine layout 
    const layout = data.layout || (data.type === 'title' ? 'center' : 'split');

    const containerClasses = "w-full h-full md:max-h-[80vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden";

    if (data.type === 'component' && data.component) {
        return (
            <div className={`${containerClasses} p-8 md:p-12 overflow-y-auto custom-scrollbar`}>
                <div className="w-full min-h-full flex flex-col justify-center">
                    {data.component}
                </div>
            </div>
        );
    }

    // Title / Center Layout
    if (layout === 'center') {
        return (
            <div className={containerClasses}>
                <div className="flex flex-col items-center justify-center text-center h-full space-y-8 relative z-10 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                    {data.image && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative mb-8 shrink-0"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-full" />
                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-auto max-h-[30vh] max-w-4xl shadow-2xl rounded-lg border border-white/10 relative z-10"
                            />
                        </motion.div>
                    )}
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className={`inline-block px-3 py-1 mb-6 ${getTypeColor(data.type).replace('bg-', 'bg-')}/10 ${getTextColor(data.type)} text-sm font-mono uppercase tracking-widest border ${getBorderColor(data.type)}/20 rounded-full`}>
                                {data.type === 'title' ? 'Case Study' : data.type}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                                {data.title}
                            </h1>
                            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-transparent mx-auto mb-8 rounded-full" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4"
                        >
                            {data.content.map((line, idx) => (
                                <p key={idx} className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                                    {line}
                                </p>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {data.signal && (
                    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-12 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm z-20">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                            {data.signal}
                        </span>
                    </div>
                )}
            </div>
        );
    }

    // Quote Layout
    if (layout === 'quote') {
        return (
            <div className={containerClasses}>
                <div className="flex flex-col items-center justify-center text-center h-full max-w-5xl mx-auto p-8 md:p-12 overflow-y-auto custom-scrollbar">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-8xl text-blue-500/20 font-serif mb-8"
                    >
                        &ldquo;
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-light text-white leading-tight mb-12 font-serif italic"
                    >
                        {data.title}
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-4"
                    >
                        {data.image && (
                            <img src={data.image} alt="Speaker" className="w-16 h-16 rounded-full border-2 border-white/10" />
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
                {data.signal && (
                    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-12 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm z-20">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                            {data.signal}
                        </span>
                    </div>
                )}
            </div>
        );
    }

    // Full Image Layout
    if (layout === 'full') {
        return (
            <div className={containerClasses}>
                <div className="relative w-full h-full flex flex-col justify-end p-8 md:p-12">
                    {data.image && (
                        <div className="absolute inset-0 z-0">
                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                        </div>
                    )}
                    <div className="relative z-10 max-w-4xl overflow-y-auto custom-scrollbar max-h-full">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`w-2 h-2 rounded-full ${getTypeColor(data.type)}`} />
                            <span className="text-zinc-400 text-xs uppercase tracking-widest font-bold">
                                {data.type}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            {data.title}
                        </h2>
                        <div className="space-y-2">
                            {data.content.map((point, idx) => (
                                <p key={idx} className="text-lg md:text-xl text-zinc-300 max-w-2xl">
                                    {point}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                {data.signal && (
                    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-12 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm z-20">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                            {data.signal}
                        </span>
                    </div>
                )}
            </div>
        )
    }

    // Default Split Layout
    const hasImage = !!data.image;

    return (
        <div className={containerClasses}>
            <div className={`grid grid-cols-1 ${hasImage ? 'lg:grid-cols-2' : ''} gap-8 md:gap-12 h-full items-center p-8 md:p-12 overflow-y-auto custom-scrollbar`}>
                <div className={`space-y-8 md:space-y-10 ${hasImage ? 'order-2 lg:order-1' : 'max-w-5xl mx-auto w-full'}`}>
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`w-2 h-2 rounded-full ${getTypeColor(data.type)}`} />
                            <span className={`${getTextColor(data.type)} text-xs uppercase tracking-widest font-bold`}>
                                {data.type} phase
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                            {data.title}
                        </h2>

                        <div className="h-1 w-20 bg-zinc-800 rounded-full" />
                    </div>

                    <ul className="space-y-6">
                        {data.content.map((point, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 + 0.2 }}
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
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
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
                            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 w-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-full h-auto max-h-[60vh] object-contain"
                            />
                        </motion.div>
                    </div>
                )}
            </div>

            {data.signal && (
                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-12 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm z-20">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                        {data.signal}
                    </span>
                </div>
            )}
        </div>
    );
};
