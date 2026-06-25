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

/* True once the user has scrolled past the small threshold — used to morph the
 * tab switcher from a centered hero pill into a slim sticky nav bar. */
function useIsScrolled(threshold = 80) {
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [threshold])
    return scrolled
}

/**
 * Sticky Work/Life segmented control.
 * - At top of page: a centered pill with breathing room.
 * - On scroll: morphs into a slim nav-bar that hugs the top edge with a blurred backdrop.
 * - Updates URL via history.pushState (?tab=work / ?tab=life) — back/forward + link-sharing work.
 * Renders server-side with Work as the default so there's no hydration jump.
 */
export default function TabSwitcher() {
    const active = useActiveTab()
    const scrolled = useIsScrolled()

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
            className={`sticky top-0 z-[55] flex justify-center transition-all duration-500 ${
                scrolled
                    ? 'py-2 md:py-2.5 bg-black/70 backdrop-blur-xl border-b border-white/[0.06]'
                    : 'pt-6 md:pt-8 pb-2 bg-transparent border-b border-transparent'
            }`}
        >
            <div
                className={`relative inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-black/40 backdrop-blur-md transition-all duration-500 ${
                    scrolled ? 'p-0.5 md:p-1 scale-90' : 'p-1 scale-100'
                }`}
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
                    className={`relative z-[1] inline-flex items-center gap-1.5 md:gap-2 rounded-full font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${
                        scrolled ? 'px-3.5 md:px-4 py-1.5 text-[10px]' : 'px-5 py-2 text-[11px]'
                    } ${
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
                    className={`relative z-[1] inline-flex items-center gap-1.5 md:gap-2 rounded-full font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${
                        scrolled ? 'px-3.5 md:px-4 py-1.5 text-[10px]' : 'px-5 py-2 text-[11px]'
                    } ${
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
