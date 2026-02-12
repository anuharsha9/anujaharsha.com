import React from 'react';
import { motion } from 'framer-motion';

interface SlideData {
    type: 'title' | 'problem' | 'research' | 'decision' | 'execution' | 'collaboration' | 'impact' | 'lesson' | 'component';
    title: string;
    content: string[];
    image?: string;
    notes?: string;
    component?: React.ReactNode;
}

interface PresentationSlideProps {
    data: SlideData;
}

// Helper function for type colors
function getTypeColor(type: string) {
    switch (type) {
        case 'problem': return 'bg-red-500';
        case 'research': return 'bg-purple-500';
        case 'decision': return 'bg-blue-500';
        case 'execution': return 'bg-emerald-500';
        case 'impact': return 'bg-amber-500';
        default: return 'bg-zinc-500';
    }
}

export const PresentationSlide: React.FC<PresentationSlideProps> = ({ data }) => {
    // Determine layout based on type
    const isTitle = data.type === 'title';
    const isVisualHeavy = ['execution', 'research', 'bonus'].includes(data.type);

    if (isTitle) {
        return (
            <div className="flex flex-col items-center justify-center text-center h-full space-y-8">
                {data.image && (
                    <motion.img
                        src={data.image}
                        alt={data.title}
                        className="w-full max-w-3xl shadow-2xl border border-zinc-800"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    />
                )}
                <div>
                    <span className="inline-block px-3 py-1 mb-4 bg-emerald-500/10 text-emerald-400 text-sm font-mono uppercase tracking-widest border border-emerald-500/20">
                        {data.content[1] || 'Case Study'}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-light text-white mb-6">
                        {data.title}
                    </h1>
                    <p className="text-xl text-zinc-400">
                        {data.content[0]}
                    </p>
                </div>
            </div>
        );
    }

    if (data.type === 'component' && data.component) {
        return (
            <div className="w-full h-full flex flex-col justify-center">
                {data.component}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-center">
            <div className="space-y-8 order-2 md:order-1">
                <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 ${getTypeColor(data.type)}`} />
                    <span className="text-zinc-500 text-sm uppercase tracking-widest font-bold">
                        {data.type} phase
                    </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
                    {data.title}
                </h2>

                <ul className="space-y-6">
                    {data.content.map((point, idx) => (
                        <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 + 0.2 }}
                            className="flex items-start gap-4 text-xl md:text-2xl font-light text-zinc-300 leading-relaxed"
                        >
                            <span className="mt-2.5 w-2 h-2 bg-zinc-600 shrink-0" />
                            {point}
                        </motion.li>
                    ))}
                </ul>

                {data.notes && (
                    <div className="mt-8 p-4 bg-yellow-900/10 border border-yellow-500/20 text-yellow-200/60 text-sm italic">
                        speaker note: {data.notes}
                    </div>
                )}
            </div>

            <div className="order-1 md:order-2 h-full max-h-[60vh] md:max-h-full flex items-center justify-center">
                {data.image ? (
                    <img
                        src={data.image}
                        alt={data.title}
                        className="max-h-full w-auto max-w-full shadow-2xl border border-zinc-800 object-contain"
                    />
                ) : (
                    <div className="w-full h-64 md:h-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-700">
                        No visual asset
                    </div>
                )}
            </div>
        </div>
    );
};


