'use client'

/**
 * ViewModeToggle → now a simplified Case Study Nav bar.
 * Toggle removed — single scroll experience, no mode switching.
 * Keeps: Home (left), case study title + dropdown (right).
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import TransitionLink from '@/components/transitions/TransitionLink'
import { useTransition } from '@/components/transitions/TransitionContext'
import { useLenis } from '@/components/providers/SmoothScrollProvider'
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

    // Navigation state
    const [activeSection, setActiveSection] = useState<'trailer' | 'presentation' | 'deep-dive'>('trailer')
    const lenis = useLenis()

    // Track scroll to update active segment
    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY
            const t = document.getElementById('cs-trailer')
            const p = document.getElementById('cs-presentation')
            const d = document.getElementById('cs-deep-dive')
            
            let active: 'trailer' | 'presentation' | 'deep-dive' = 'trailer'
            const vh = window.innerHeight
            const offset = vh * 0.4

            // Use getBoundingClientRect to avoid offsetParent issues
            if (p) {
                const pTop = p.getBoundingClientRect().top
                if (pTop <= offset) active = 'presentation'
            }
            if (d) {
                const dTop = d.getBoundingClientRect().top
                if (dTop <= offset) active = 'deep-dive'
            }

            setActiveSection(active)
        }
        
        handleScroll() // Init
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = useCallback((id: string) => {
        if (lenis) {
            lenis.scrollTo(`#${id}`, { offset: -50, duration: 1.2 })
        } else {
            // Fallback for mobile where Lenis is disabled
            const el = document.getElementById(id)
            if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 50
                window.scrollTo({ top: y, behavior: 'smooth' })
            }
        }
    }, [lenis])

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
            className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[var(--bg-primary)]/80 border-b border-white/[0.06] pt-safe"
        >
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between py-2 sm:py-0 sm:h-14 gap-2 sm:gap-0 relative">
                {/* Mobile Top Row: Home & Dropdown */}
                <div className="w-full sm:w-auto flex items-center justify-between">
                    {/* Left: Home */}
                    <button
                        onClick={handleHomeClick}
                        className="flex items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-colors text-xs font-mono tracking-wider uppercase cursor-pointer shrink-0"
                        aria-label="Back to home"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Home</span>
                    </button>

                    {/* Right: Other Case Studies (Mobile only visible here) */}
                    <div className="relative shrink-0 sm:hidden" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-all duration-200 cursor-pointer group"
                        >
                            <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors max-w-[160px] truncate text-right">
                                {currentMeta?.title || currentSlug}
                            </span>
                            <motion.div
                                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-500 transition-colors" />
                            </motion.div>
                        </button>
                    </div>
                </div>

                {/* Center: Case Study Navigation (Segmented Control) */}
                <div className="w-full sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex justify-center order-last sm:order-none pb-1 sm:pb-0">
                    <div className="flex items-center p-1 bg-white/[0.02] border border-white/[0.05] rounded-full backdrop-blur-md w-full sm:w-auto justify-between sm:justify-start">
                        {[
                            { id: 'cs-trailer', label: 'Trailer', mobileLabel: 'Intro', value: 'trailer' as const },
                            { id: 'cs-presentation', label: 'Presentation', mobileLabel: 'Deck', value: 'presentation' as const },
                            { id: 'cs-deep-dive', label: 'Deep Dive', mobileLabel: 'Details', value: 'deep-dive' as const },
                        ].map((sec) => {
                            const isActive = activeSection === sec.value
                            return (
                                <button
                                    key={sec.id}
                                    onClick={() => scrollToSection(sec.id)}
                                    className={`relative px-4 sm:px-5 py-1.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex-1 sm:flex-none text-center ${
                                        isActive ? 'text-black' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeSegment"
                                            className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 hidden sm:inline">{sec.label}</span>
                                    <span className="relative z-10 sm:hidden">{sec.mobileLabel}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Right: Other Case Studies (Desktop) */}
                <div className="relative shrink-0 hidden sm:block" ref={dropdownRef}>
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
