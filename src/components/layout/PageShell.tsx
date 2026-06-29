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
import TabSwitcher from '@/components/home/TabSwitcher'
import FloatingActions from '@/components/home/FloatingActions'
import CaseStudyTabs from '@/components/work/CaseStudyTabs'

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
  /* Normalize trailing slash before matching. `trailingSlash: true` makes
     the real path `/manifesto/`, so a bare `=== '/manifesto'` check missed it
     and the old SiteHeader nav leaked onto the manifesto "trailer" (which is
     meant to show only its own Back-to-Portfolio exit button). */
  const normalizedPath = (pathname || '/').replace(/\/+$/, '') || '/'
  const isManifesto = normalizedPath === '/manifesto'
  const isLandingPage = normalizedPath === '/'
  const isCaseStudyPage = normalizedPath.startsWith('/work/')

  return (
    <ErrorBoundary>
      {/* NOTE: LazyMotion (framer-motion features for `m` components) now lives
          in the root layout via <MotionFeaturesProvider>, ABOVE PdfProvider /
          LightboxProvider — so overlays those providers render (e.g. the Resume
          PdfLightbox) also get animation features. It used to be here inside
          PageShell, which left those out-of-PageShell overlays stuck at
          opacity 0 (invisible modal). */}
      <SmoothScrollProvider>
        <TransitionProvider>
          {/* Custom cursor for desktop - instant movement, matches system speed */}
          <CustomCursor />
          <RouteAnnouncer />
          {!isManifesto && (
            <>
              <SkipToContent />
              <ReadingProgress />
              <SiteHeader />
              <URLHashSync />
            </>
          )}
          {/* Work/Life tab switcher — only on the landing page. Rendered here at
              shell level (sibling to SiteHeader) so it escapes the smooth-scroll
              wrapper's transform, which would otherwise break fixed positioning. */}
          {isLandingPage && (
            <>
              <TabSwitcher />
              <FloatingActions />
            </>
          )}
          {isCaseStudyPage && <CaseStudyTabs />}
          <PageTransition>
            <main id="main-content" role="main" className="relative z-[1]">
              {children}
            </main>
          </PageTransition>
          {!isManifesto && <BackToTop />}
        </TransitionProvider>
      </SmoothScrollProvider>
    </ErrorBoundary>
  )
}
