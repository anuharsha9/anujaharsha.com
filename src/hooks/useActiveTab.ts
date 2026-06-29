'use client'

import { useEffect, useState } from 'react'

export type Tab = 'work' | 'life'

/**
 * Reads the active Work/Life tab from the URL (?tab=life) without Suspense.
 * Stays in sync with back/forward + programmatic switches via the popstate event.
 * Shared by the SiteNav island and HomeTabsWrapper — one source of truth.
 */
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

/** Switch the Work/Life tab: updates the URL (?tab=) so it's shareable + back/forward works. */
export function setActiveTab(tab: Tab) {
    const next = tab === 'life' ? `${window.location.pathname}?tab=life` : window.location.pathname
    window.history.pushState({ tab }, '', next)
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo({ top: 0, behavior: 'auto' })
}
