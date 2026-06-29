'use client'

import { useRouter } from 'next/navigation'

/**
 * "Circle back to where you came from." Returns a handler that sends the user
 * back to the exact spot (page + scroll) they launched a detour from. The
 * router restores scroll on back(). `pf_inapp` (set on the first in-app route
 * change in PageShell) guards the deep-link case: with no in-app history we go
 * home instead of leaving the site via the browser's back. One behavior,
 * everywhere — used by the SiteNav "Back" pill.
 */
export function useCircleBack() {
    const router = useRouter()
    return () => {
        let cameFromInApp = false
        try {
            cameFromInApp = sessionStorage.getItem('pf_inapp') === '1'
        } catch { /* sessionStorage unavailable — fall back to home */ }
        if (cameFromInApp) router.back()
        else router.push('/')
    }
}
