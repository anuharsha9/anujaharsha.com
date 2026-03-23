'use client'

/**
 * ViewModeToggle → now a simplified Case Study Nav bar.
 * Toggle removed — single scroll experience, no mode switching.
 * Keeps: Home (left), case study title + dropdown (right).
 */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import TransitionLink from '@/components/transitions/TransitionLink'
import { useTransition } from '@/components/transitions/TransitionContext'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { featuredCaseStudies } from '@/data/home'

interface ViewModeToggleProps {
    /* Legacy props — kept for backward compat but ignored */
    viewMode?: 'full' | 'presentation'
    setViewMode?: (mode: 'full' | 'presentation') => void
    hasPresentation?: boolean
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─── Case study metadata ─── */
const caseStudyMeta: Record<string, { title: string; shortTitle: string; accent: string; tag: string }> = {
    reportcaster: {
        title: 'ReportCaster',
        shortTitle: 'RC',
        accent: '#f59e0b',
        tag: '001',
    },
    'ml-functions': {
        title: 'ML Functions',
        shortTitle: 'ML',
        accent: '#2fc6d5',
        tag: '002',
    },
    'iq-plugin': {
        title: 'IQ Plugin',
        shortTitle: 'IQ',
        accent: '#a855f7',
        tag: '003',
    },
}

export default function ViewModeToggle({ }: ViewModeToggleProps) {
    const { navigateTo } = useTransition()
    const pathname = usePathname()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Derive current slug from path
    const pathParts = pathname.split('/').filter(Boolean)
    const currentSlug = pathParts[pathParts.length - 1]
    const currentMeta = caseStudyMeta[currentSlug]

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleHomeClick = () => {
        navigateTo('/')
        setTimeout(() => {
            const heroHeight = window.innerHeight * 3
            const bioScrollPosition = heroHeight * 0.52
            window.scrollTo({ top: bioScrollPosition, behavior: 'instant' as ScrollBehavior })
        }, 100)
    }

    const otherCaseStudies = featuredCaseStudies.filter((cs) => cs.slug !== currentSlug)

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[var(--bg-primary)]/80 border-b border-white/[0.06]"
        >
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between h-12 md:h-14">
                {/* Left: Home */}
                <button
                    onClick={handleHomeClick}
                    className="flex items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-colors text-xs font-mono tracking-wider uppercase cursor-pointer shrink-0"
                    aria-label="Back to home"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Home</span>
                </button>

                {/* Center: intentionally empty — clean and minimal */}
                <div />

                {/* Right: Case study title with dropdown */}
                <div className="relative shrink-0" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-all duration-200 cursor-pointer group"
                    >
                        {currentMeta && (
                            <span
                                className="hidden md:inline font-mono text-[10px] tracking-wider opacity-50"
                                style={{ color: currentMeta.accent }}
                            >
                                {currentMeta.tag}
                            </span>
                        )}
                        <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                            {currentMeta?.title || currentSlug}
                        </span>
                        <motion.div
                            animate={{ rotate: dropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-500 transition-colors" />
                        </motion.div>
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                transition={{ duration: 0.2, ease }}
                                style={{ backgroundColor: 'rgb(12, 12, 20)' }}
                                className="absolute top-full right-0 mt-2 w-72 rounded-xl border border-white/[0.08] backdrop-blur-3xl shadow-2xl shadow-black/60 overflow-hidden"
                            >
                                <div className="px-4 py-2.5 border-b border-white/[0.06]">
                                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
                                        Currently viewing
                                    </span>
                                </div>

                                <div className="py-1">
                                    {otherCaseStudies.map((cs) => {
                                        const meta = caseStudyMeta[cs.slug]
                                        return (
                                            <TransitionLink
                                                key={cs.slug}
                                                href={`/work/${cs.slug}`}
                                                onClick={() => setDropdownOpen(false)}
                                                className="group/item flex items-center gap-3 px-4 py-3 hover:bg-white/[0.04] transition-all duration-200"
                                            >
                                                <div
                                                    className="w-2 h-2 rounded-full shrink-0 transition-transform duration-200 group-hover/item:scale-125"
                                                    style={{ backgroundColor: meta?.accent || '#666' }}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-zinc-400 group-hover/item:text-white transition-colors">
                                                            {meta?.title || cs.slug}
                                                        </span>
                                                        <span className="font-mono text-[9px] tracking-wider opacity-40" style={{ color: meta?.accent }}>
                                                            {meta?.tag}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-zinc-600 leading-snug mt-0.5 truncate">
                                                        {cs.summary.split('—')[0]?.trim() || cs.summary.slice(0, 60)}
                                                    </p>
                                                </div>
                                                <ArrowLeft className="w-3.5 h-3.5 text-zinc-800 group-hover/item:text-zinc-500 rotate-180 transition-all duration-200 group-hover/item:translate-x-0.5 shrink-0" />
                                            </TransitionLink>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    )
}
