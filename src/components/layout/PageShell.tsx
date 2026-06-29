'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import SkipToContent from '@/components/accessibility/SkipToContent'
import ReadingProgress from '@/components/case-study/ReadingProgress'
import BackToTop from '@/components/navigation/BackToTop'
import URLHashSync from '@/components/navigation/URLHashSync'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import PageTransition from '@/components/transitions/PageTransition'
import { TransitionProvider } from '@/components/transitions/TransitionContext'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import SiteNav from '@/components/layout/SiteNav'
import FloatingActions from '@/components/home/FloatingActions'

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

  // Mark that a real in-app navigation has happened, so detour "back" buttons
  // (BackToOrigin) can safely router.back() to the user's origin + scroll. On a
  // cold deep-link there's no in-app history, so back falls back to home instead.
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    try { sessionStorage.setItem('pf_inapp', '1') } catch { /* no-op */ }
  }, [pathname])

  /* Normalize trailing slash before matching. `trailingSlash: true` makes
     the real path `/manifesto/`, so a bare `=== '/manifesto'` check missed it
     and the old SiteHeader nav leaked onto the manifesto "trailer" (which is
     meant to show only its own Back-to-Portfolio exit button). */
  const normalizedPath = (pathname || '/').replace(/\/+$/, '') || '/'
  const isManifesto = normalizedPath === '/manifesto'
  const isLandingPage = normalizedPath === '/'

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
              <URLHashSync />
            </>
          )}
          {/* THE nav — one route-aware Dynamic Island (Work/Life · RC/ML/IQ · Back).
              Rendered at shell level so it escapes the smooth-scroll transform,
              which would otherwise break its fixed positioning. */}
          <SiteNav />
          {/* Résumé · Ask Anu actions — landing only. */}
          {isLandingPage && <FloatingActions />}
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
