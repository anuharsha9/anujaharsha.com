'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface ViewModeToggleProps {
    viewMode: 'full' | 'presentation'
    setViewMode: (mode: 'full' | 'presentation') => void
    hasPresentation: boolean
}

export default function ViewModeToggle({ viewMode, setViewMode, hasPresentation }: ViewModeToggleProps) {
    if (!hasPresentation) return null

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[var(--bg-primary)]/80 border-b border-white/[0.06]"
        >
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between h-12 md:h-14">
                {/* Back to home */}
                <Link
                    href="/#work-overview"
                    className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-xs font-mono tracking-wider uppercase"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Portfolio</span>
                </Link>

                {/* Toggle */}
                <div className="flex items-center bg-white/[0.04] rounded-full p-0.5 border border-white/[0.06]">
                    <button
                        onClick={() => setViewMode('presentation')}
                        className={`relative px-3 md:px-4 py-1.5 rounded-full text-[11px] md:text-xs font-medium transition-all duration-300 cursor-pointer ${viewMode === 'presentation'
                                ? 'text-white'
                                : 'text-white/40 hover:text-white/60'
                            }`}
                    >
                        {viewMode === 'presentation' && (
                            <motion.div
                                layoutId="toggle-pill"
                                className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.08]"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">Presentation</span>
                    </button>
                    <button
                        onClick={() => setViewMode('full')}
                        className={`relative px-3 md:px-4 py-1.5 rounded-full text-[11px] md:text-xs font-medium transition-all duration-300 cursor-pointer ${viewMode === 'full'
                                ? 'text-white'
                                : 'text-white/40 hover:text-white/60'
                            }`}
                    >
                        {viewMode === 'full' && (
                            <motion.div
                                layoutId="toggle-pill"
                                className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.08]"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">Full Case Study</span>
                    </button>
                </div>

                {/* Spacer for symmetry */}
                <div className="w-16 sm:w-20" />
            </div>
        </motion.nav>
    )
}
