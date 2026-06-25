'use client'

import { lazy, Suspense } from 'react'
import TabSwitcher, { useActiveTab } from './TabSwitcher'

/**
 * Lazy-load the Life tab so it only ships when a visitor requests it.
 * The default Work tab keeps the home page lean for the recruiter at `/`.
 */
const LifeTab = lazy(() => import('./LifeTab'))

/**
 * Wraps the home page: TabSwitcher at top, then either the Work children
 * (passed in by page.tsx) or the lazy-loaded Life tab. No Suspense around
 * TabSwitcher itself — it uses pop-state to avoid hydration jumps.
 */
export default function HomeTabsWrapper({ children }: { children: React.ReactNode }) {
    const active = useActiveTab()
    return (
        <>
            <TabSwitcher />
            {active === 'life' ? (
                <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-hidden="true" />}>
                    <LifeTab />
                </Suspense>
            ) : (
                children
            )}
        </>
    )
}
