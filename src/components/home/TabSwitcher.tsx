'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Sparkles } from 'lucide-react'

export type Tab = 'work' | 'life'

/* Listen-to-URL hook that doesn't require Suspense (unlike useSearchParams).
 * Reads ?tab= directly from window.location and stays in sync with back/forward. */
export function useActiveTab(): Tab {
    const [tab, setTab] = useState<Tab>('work')
    useEffect(() => {
        const read = () => {
            const params = new URLSearchParams(window.location.search)
            setTab(params.get('tab') === 'life' ? 'life' : 'work')
        }
        read()
        window.addEventListener('popstate', read)
        return () => window.removeEventListener('popstate', read)
    }, [])
    return tab
}

/**
 * Two-pill segmented control at the top of the home page.
 * Updates URL via history.pushState (?tab=work / ?tab=life) — preserves
 * browser back/forward and link-sharing. Work is default; Life adds ?tab=life.
 * Renders server-side with Work as the visual default so there's no hydration jump.
 */
export default function TabSwitcher() {
    const active = useActiveTab()

    const switchTo = useCallback((tab: Tab) => {
        if (tab === active) return
        const next = tab === 'life'
            ? `${window.location.pathname}?tab=life`
            : window.location.pathname
        window.history.pushState({ tab }, '', next)
        // Force re-evaluation: dispatch popstate so listeners re-read the URL
        window.dispatchEvent(new PopStateEvent('popstate'))
        // Reset scroll so each tab feels like its own page
        window.scrollTo({ top: 0, behavior: 'auto' })
    }, [active])

    return (
        <div className="relative z-[60] flex justify-center pt-6 md:pt-8">
            <div
                className="relative inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-black/40 p-1 backdrop-blur-md"
                role="tablist"
                aria-label="Work or Life view"
            >
                {/* Animated active pill */}
                <motion.div
                    className="absolute inset-y-1 w-[calc(50%-2px)] rounded-full bg-white/[0.08] ring-1 ring-white/[0.12]"
                    animate={{ left: active === 'work' ? '4px' : 'calc(50% - 2px)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    aria-hidden="true"
                />

                <button
                    onClick={() => switchTo('work')}
                    role="tab"
                    aria-selected={active === 'work'}
                    className={`relative z-[1] inline-flex items-center gap-2 rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                        active === 'work' ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
                    }`}
                >
                    <Briefcase className="h-3.5 w-3.5" />
                    Work
                </button>
                <button
                    onClick={() => switchTo('life')}
                    role="tab"
                    aria-selected={active === 'life'}
                    className={`relative z-[1] inline-flex items-center gap-2 rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                        active === 'life' ? 'text-[var(--accent-teal)]' : 'text-zinc-500 hover:text-zinc-200'
                    }`}
                >
                    <Sparkles className="h-3.5 w-3.5" />
                    Life
                </button>
            </div>
        </div>
    )
}
