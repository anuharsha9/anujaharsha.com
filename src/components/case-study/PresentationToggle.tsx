import React from 'react';
import { LayoutTemplate, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';

interface PresentationToggleProps {
    mode: 'full' | 'presentation';
    setMode: (mode: 'full' | 'presentation') => void;
}

export const PresentationToggle: React.FC<PresentationToggleProps> = ({ mode, setMode }) => {
    return (
        <div className="flex items-center gap-2 p-1 bg-zinc-900/80 backdrop-blur-md border border-white/10 shadow-xl fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <button
                onClick={() => setMode('full')}
                className={`relative px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${mode === 'full' ? 'text-zinc-900' : 'text-zinc-400 hover:text-white'
                    }`}
            >
                {mode === 'full' && (
                    <motion.div
                        layoutId="toggle-active"
                        className="absolute inset-0 bg-white"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4" /> Full Case Study
                </span>
            </button>

            <button
                onClick={() => setMode('presentation')}
                className={`relative px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${mode === 'presentation' ? 'text-zinc-900' : 'text-zinc-400 hover:text-white'
                    }`}
            >
                {mode === 'presentation' && (
                    <motion.div
                        layoutId="toggle-active"
                        className="absolute inset-0 bg-emerald-400"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-2">
                    <MonitorPlay className="w-4 h-4" /> Presentation Mode
                </span>
            </button>
        </div>
    );
};
