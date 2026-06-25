'use client'

import { lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TabSwitcher, { useActiveTab } from './TabSwitcher'

/**
 * Lazy-load the Life tab so it only ships when a visitor requests it.
 * The default Work tab keeps the home page lean for the recruiter at `/`.
 */
const LifeTab = lazy(() => import('./LifeTab'))

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/**
 * Wraps the home page: sticky TabSwitcher at top, then either the Work children
 * (passed in by page.tsx) or the lazy-loaded Life tab. Tab swap is animated by
 * AnimatePresence — fade + tiny scale + brief overlay wash so it reads as a
 * "moment", not a hard re-render. Also fixes framer-motion unmount warnings.
 */
export default function HomeTabsWrapper({ children }: { children: React.ReactNode }) {
    const active = useActiveTab()
    return (
        <>
            <TabSwitcher />
            <AnimatePresence mode="wait" initial={false}>
                {active === 'life' ? (
                    <motion.div
                        key="life"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.55, ease }}
                    >
                        <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-hidden="true" />}>
                            <LifeTab />
                        </Suspense>
                    </motion.div>
                ) : (
                    <motion.div
                        key="work"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.55, ease }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
