'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import SiteHeader from './SiteHeader'

import SkipToContent from '@/components/accessibility/SkipToContent'
import ReadingProgress from '@/components/case-study/ReadingProgress'
import BackToTop from '@/components/navigation/BackToTop'
import URLHashSync from '@/components/navigation/URLHashSync'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import PageTransition from '@/components/transitions/PageTransition'
import { TransitionProvider } from '@/components/transitions/TransitionContext'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'

/** Announces route changes to screen readers via aria-live */
function RouteAnnouncer() {
  const pathname = usePathname()
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    // Short delay to let the page title update first
    const timer = setTimeout(() => {
      const pageTitle = document.title || 'Page'
      setAnnouncement(`Navigated to ${pageTitle}`)
    }, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  )
}

interface PageShellProps {
  children: ReactNode
}

export default function PageShell({ children }: PageShellProps) {
  const pathname = usePathname()
  const isManifesto = pathname === '/manifesto'

  // Manifesto route: blank canvas — no nav, no scroll provider, no transitions
  if (isManifesto) {
    return (
      <ErrorBoundary>
        <CustomCursor />
        <RouteAnnouncer />
        <main id="main-content" role="main" className="relative z-[1]">
          {children}
        </main>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <SmoothScrollProvider>
        <TransitionProvider>
          {/* Custom cursor for desktop - instant movement, matches system speed */}
          <CustomCursor />
          <SkipToContent />
          <RouteAnnouncer />
          <ReadingProgress />
          <SiteHeader />
          <URLHashSync />
          <PageTransition>
            <main id="main-content" role="main" className="relative z-[1]">
              {children}
            </main>
          </PageTransition>
          <BackToTop />
        </TransitionProvider>
      </SmoothScrollProvider>
    </ErrorBoundary>
  )
}
