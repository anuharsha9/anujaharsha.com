'use client'

import { lazy, Suspense } from 'react'
import { m } from 'framer-motion'
import { useActiveTab } from './TabSwitcher'

const LifeTab = lazy(() => import('./LifeTab'))

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/**
 * Tab content wrapper. Simple conditional render (no AnimatePresence with mode='wait'
 * — that was hanging the Work exit because the Work tab contains many motion components,
 * so the wrapper's exit animation never completed and the Life tab never mounted).
 * Each branch keys on the tab so React fully unmounts/mounts on switch.
 */
export default function HomeTabsWrapper({ children }: { children: React.ReactNode }) {
    const active = useActiveTab()
    return (
        <div>
            {active === 'life' ? (
                <m.div
                    key="life"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, ease }}
                >
                    <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-hidden="true" />}>
                        <LifeTab />
                    </Suspense>
                </m.div>
            ) : (
                /* Work is the default landing — render it immediately, with NO
                   opacity gate. A JS-driven fade here held the whole page (hero
                   included) invisible until hydration, which tanked mobile LCP.
                   The Life tab is reached by a deliberate click, so its fade stays. */
                <div key="work">{children}</div>
            )}
        </div>
    )
}
