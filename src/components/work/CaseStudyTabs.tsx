'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useTransition } from '@/components/transitions/TransitionContext'
import { FileText, BrainCircuit, Search, ArrowLeft } from 'lucide-react'

/**
 * One pill per major case study. Mirrors the Work/Life Dynamic Island visual
 * language. Lives at the top of every case-study route — pathname determines
 * which pill is "active" (so the slider sits on the current study).
 *
 * Clicking a different pill triggers the existing wave page transition via
 * navigateTo() — same cinematic exit/enter the rest of the site uses.
 */
const CASE_STUDIES = [
    { id: 'reportcaster', label: 'ReportCaster', href: '/work/reportcaster', icon: FileText },
    { id: 'ml-functions', label: 'ML Functions', href: '/work/ml-functions', icon: BrainCircuit },
    { id: 'iq-plugin', label: 'IQ Plugin', href: '/work/iq-plugin', icon: Search },
] as const

type CaseStudyId = (typeof CASE_STUDIES)[number]['id']

function normalize(path: string): string {
    return path.replace(/\/+$/, '')
}

export default function CaseStudyTabs() {
    const pathname = usePathname()
    const { navigateTo } = useTransition()

    const activeIndex = CASE_STUDIES.findIndex(cs => normalize(pathname || '') === normalize(cs.href))
    if (activeIndex === -1) return null

    const onSwitch = (id: CaseStudyId, href: string) => {
        if (CASE_STUDIES[activeIndex].id === id) return
        navigateTo(href)
    }

    /* Three pills means the slider is 1/3 wide, positioned at activeIndex/3.
     * Use calc() so the active highlight slides smoothly between pills. */
    const pillCount = CASE_STUDIES.length
    const sliderLeft = activeIndex === 0
        ? '4px'
        : activeIndex === pillCount - 1
            ? `calc(100% - ${100 / pillCount}% + 0px)`
            : `calc(${(100 / pillCount) * activeIndex}% + 2px)`

    return (
        <div className="pointer-events-none fixed left-0 right-0 top-0 z-[10001] flex items-start justify-center gap-3 pt-4 md:pt-5">
            {/* Home pill — left, smaller Dynamic Island */}
            <button
                onClick={() => navigateTo('/')}
                aria-label="Back to home"
                title="Home"
                className="pointer-events-auto absolute left-4 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-black/55 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-300 shadow-[0_8px_32px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-black/75 hover:text-white md:left-6 md:text-[11px]"
            >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Home</span>
            </button>

            <div
                className="relative inline-flex items-center gap-1 rounded-full border border-white/[0.12] bg-black/55 p-1 shadow-[0_8px_32px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl pointer-events-auto"
                role="tablist"
                aria-label="Case study navigation"
            >
                {/* Active highlight slider */}
                <motion.div
                    className="absolute inset-y-1 rounded-full bg-white/[0.10] ring-1 ring-white/[0.14]"
                    style={{ width: `calc(${100 / pillCount}% - 4px)` }}
                    animate={{ left: sliderLeft }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    aria-hidden="true"
                />

                {CASE_STUDIES.map(cs => {
                    const Icon = cs.icon
                    const isActive = normalize(pathname || '') === normalize(cs.href)
                    return (
                        <button
                            key={cs.id}
                            onClick={() => onSwitch(cs.id, cs.href)}
                            role="tab"
                            aria-selected={isActive}
                            className={`relative z-[1] inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 md:text-[11px] md:px-5 ${
                                isActive ? 'text-[var(--accent-teal)]' : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                            title={cs.label}
                        >
                            <Icon className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">{cs.label}</span>
                            {/* On very narrow viewports, show only icon — saves the pills from getting too wide */}
                            <span className="sm:hidden">{cs.label.split(' ')[0].slice(0, 4)}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
