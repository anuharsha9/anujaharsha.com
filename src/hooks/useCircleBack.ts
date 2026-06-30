'use client'

import { usePathname, useRouter } from 'next/navigation'

/**
 * "Circle back to where you came from." Returns a handler that sends the user
 * back to the exact spot (page + scroll) they launched a detour from. The
 * router restores scroll on back(). `pf_inapp` (set on the first in-app route
 * change in PageShell) guards the deep-link case: with no in-app history we go
 * home instead of leaving the site via the browser's back. One behavior,
 * everywhere — used by the SiteNav "Back" pill.
 *
 * Full-screen-takeover exception: /manifesto renders as `fixed inset-0` with
 * continuous rAF + timeline state. router.back() from there updates the URL
 * but the App Router cache leaves the manifesto's overlay mounted in place
 * of the landing — visitor sees an empty page with no nav island and no
 * hero. A real router.push('/') forces a clean route swap. Scroll
 * restoration isn't a real loss: the visitor opens the trailer from the
 * hero (top of page), so '/' reloads at top either way.
 */
const FULL_SCREEN_DETOURS = new Set(['/manifesto'])
const normalize = (p: string) => (p || '/').replace(/\/+$/, '') || '/'

export function useCircleBack() {
    const router = useRouter()
    const pathname = normalize(usePathname() || '/')
    return () => {
        if (FULL_SCREEN_DETOURS.has(pathname)) {
            router.push('/')
            return
        }
        let cameFromInApp = false
        try {
            cameFromInApp = sessionStorage.getItem('pf_inapp') === '1'
        } catch { /* sessionStorage unavailable — fall back to home */ }
        if (cameFromInApp) router.back()
        else router.push('/')
    }
}
