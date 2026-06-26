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
 * Work/Life segmented control — Dynamic-Island style.
 * Floats fixed at the top of the page, always the same size, always the same
 * glassy backdrop. No size morph on scroll, no full-width nav bar takeover.
 * Just persistently accessible — like the iPhone Dynamic Island.
 * Updates URL via history.pushState (?tab=work / ?tab=life) — back/forward + link-sharing work.
 */
export default function TabSwitcher() {
    const active = useActiveTab()

    const switchTo = useCallback((tab: Tab) => {
        if (tab === active) return
        const next = tab === 'life'
            ? `${window.location.pathname}?tab=life`
            : window.location.pathname
        window.history.pushState({ tab }, '', next)
        window.dispatchEvent(new PopStateEvent('popstate'))
        window.scrollTo({ top: 0, behavior: 'auto' })
    }, [active])

    return (
        <div
            className="fixed left-0 right-0 top-0 z-[10001] flex justify-center pointer-events-none"
            style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        >
            <div
                className="relative inline-flex items-center gap-1 rounded-full border border-white/[0.12] bg-black/55 p-1 shadow-[0_8px_32px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl pointer-events-auto"
                role="tablist"
                aria-label="Work or Life view"
            >
                {/* Animated active pill — slides between the two buttons */}
                <motion.div
                    className="absolute inset-y-1 w-[calc(50%-2px)] rounded-full bg-white/[0.10] ring-1 ring-white/[0.14]"
                    animate={{ left: active === 'work' ? '4px' : 'calc(50% - 2px)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    aria-hidden="true"
                />

                <button
                    onClick={() => switchTo('work')}
                    role="tab"
                    aria-selected={active === 'work'}
                    className={`relative z-[1] inline-flex items-center gap-2 rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                        active === 'work' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
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
                        active === 'life' ? 'text-[var(--accent-teal)]' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                    <Sparkles className="h-3.5 w-3.5" />
                    Life
                </button>
            </div>
        </div>
    )
}
