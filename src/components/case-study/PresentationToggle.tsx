import React from 'react';
import { LayoutTemplate, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';

interface PresentationToggleProps {
    mode: 'full' | 'presentation';
    setMode: (mode: 'full' | 'presentation') => void;
    className?: string;
    variant?: 'fixed' | 'inline';
}

export const PresentationToggle: React.FC<PresentationToggleProps> = ({ mode, setMode, className = '', variant = 'fixed' }) => {
    const baseClasses = "flex items-center gap-1 p-1 bg-zinc-900/5 backdrop-blur-md border border-zinc-200/50 shadow-sm rounded-full transition-all duration-300 hover:shadow-md hover:border-zinc-300 transform-gpu";
    const fixedClasses = "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/90 border-white/10 text-white shadow-2xl";
    const inlineClasses = "inline-flex scale-90 origin-left"; // Scale down slightly to fit eyebrow

    return (
        <div className={`${variant === 'fixed' ? baseClasses + " " + fixedClasses : baseClasses + " " + inlineClasses} ${className}`}>
            <button
                onClick={() => setMode('full')}
                className={`relative px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full flex items-center gap-1.5 ${mode === 'full'
                    ? (variant === 'fixed' ? 'text-zinc-900' : 'text-zinc-900 shadow-sm')
                    : (variant === 'fixed' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900')
                    }`}
            >
                {mode === 'full' && (
                    <motion.div
                        layoutId="toggle-active"
                        className={`absolute inset-0 rounded-full ${variant === 'fixed' ? 'bg-white' : 'bg-white shadow-sm ring-1 ring-black/5'}`}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                    <LayoutTemplate className="w-3.5 h-3.5" /> Case Study
                </span>
            </button>

            <button
                onClick={() => setMode('presentation')}
                className={`relative px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full flex items-center gap-1.5 ${mode === 'presentation'
                    ? (variant === 'fixed' ? 'text-zinc-900' : 'text-zinc-900 shadow-sm')
                    : (variant === 'fixed' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900')
                    }`}
            >
                {mode === 'presentation' && (
                    <motion.div
                        layoutId="toggle-active"
                        className={`absolute inset-0 rounded-full ${variant === 'fixed' ? 'bg-emerald-400' : 'bg-[var(--accent-teal)] shadow-sm ring-1 ring-black/5 text-white'}`}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                )}
                <span className={`relative z-10 flex items-center gap-1.5 ${mode === 'presentation' && variant !== 'fixed' ? 'text-white' : ''}`}>
                    <MonitorPlay className="w-3.5 h-3.5" /> Presentation
                </span>
            </button>
        </div>
    );
};
