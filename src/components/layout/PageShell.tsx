'use client'

import { ReactNode } from 'react'
import { LayoutGroup } from 'framer-motion'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import SkipToContent from '@/components/accessibility/SkipToContent'
import ReadingProgress from '@/components/case-study/ReadingProgress'
import BackToTop from '@/components/navigation/BackToTop'
import URLHashSync from '@/components/navigation/URLHashSync'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import PageTransition from '@/components/transitions/PageTransition'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'

interface PageShellProps {
  children: ReactNode
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <ErrorBoundary>
      <SmoothScrollProvider>
        {/* Custom cursor for desktop - instant movement, matches system speed */}
        <CustomCursor />
        <SkipToContent />
        <ReadingProgress />
        <SiteHeader />
        <URLHashSync />
        <PageTransition>
          <LayoutGroup>
            <main id="main-content" className="relative">
              {children}
            </main>
          </LayoutGroup>
        </PageTransition>
        <BackToTop />
        <SiteFooter />
      </SmoothScrollProvider>
    </ErrorBoundary>
  )
}
