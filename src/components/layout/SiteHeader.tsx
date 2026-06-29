'use client'

import TransitionLink from '@/components/transitions/TransitionLink'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import AnimatedSignatureLogo from '@/components/brand/AnimatedSignatureLogo'
import EasterEgg from '@/components/ui/EasterEgg'
import { trackResumeDownload } from '@/components/analytics/GoogleAnalytics'
import { useScrollManager } from '@/hooks/useScrollManager'
import MobileMenu from './MobileMenu'
import CaseStudiesDropdown from './CaseStudiesDropdown'
import Magnetic from '@/components/ui/Magnetic'
import { getTheme, spacing } from '@/lib/design-system'
import { usePdf } from '@/contexts/PdfContext'

export default function SiteHeader() {
  const pathname = usePathname()
  const { openPdf } = usePdf()
  const isLandingPage = pathname === '/'

  const isCaseStudyPage = pathname?.startsWith('/work/') ?? false

  // Always visible off the landing page, otherwise start hidden.
  const [isVisible, setIsVisible] = useState(!isLandingPage)
  const [isPresentationMode, setIsPresentationMode] = useState(false)

  // Keep track of whether we're on mobile to control visibility behavior
  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateVisibilityForViewport = () => {
      // Landing page (EVERY breakpoint): no SiteHeader. The Work/Life TabSwitcher
      // is the nav; Resume is reached via the hero button + the floating Resume
      // pill on scroll. This removes the mobile logo+hamburger bar that competed
      // with the centered toggle.
      if (isLandingPage) {
        setIsVisible(false)
        return
      }
      // Non-landing pages: header always visible (mobile gets logo + hamburger;
      // desktop gets the full nav).
      setIsVisible(true)
    }

    updateVisibilityForViewport()
    window.addEventListener('resize', updateVisibilityForViewport)

    return () => {
      window.removeEventListener('resize', updateVisibilityForViewport)
    }
  }, [isLandingPage])

  // Detect presentation mode (case study presentation overlay)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const observer = new MutationObserver(() => {
      // PresentationFlow renders a fixed div with z-[9999]
      const presentationOverlay = document.querySelector('[data-presentation-mode]')
      setIsPresentationMode(!!presentationOverlay)
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  // Use centralized scroll manager
  useScrollManager(() => {
    // Landing page (every breakpoint): TabSwitcher is the nav, no SiteHeader.
    if (isLandingPage) {
      setIsVisible(false)
      return
    }
    // Non-landing pages: always visible.
    setIsVisible(true)
  }, [isLandingPage])

  const t = getTheme(!isLandingPage)

  // Hide header on case study pages (they have their own CaseStudyNav)
  if (isCaseStudyPage) {
    return null
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full backdrop-blur-xl transition-all duration-500 ${(isVisible && !isPresentationMode)
        ? 'opacity-100 translate-y-0 h-auto'
        : 'opacity-0 -translate-y-full pointer-events-none invisible h-0 overflow-hidden'
        }`}
      style={{
        zIndex: 10000,
        isolation: 'isolate',
        position: 'fixed',
        background: isLandingPage ? 'var(--overlay-ink-60)' : 'color-mix(in srgb, var(--bg-secondary) 90%, transparent)',
      }}
    >
      <nav className={`${spacing.containerFull} py-space-4 flex items-center justify-center relative min-h-[56px] sm:min-h-[60px]`}>
        {/* Logo - positioned absolutely on the left */}
        <div className="absolute left-4 xs:left-5 sm:left-6 md:left-8 lg:left-12 xl:left-16">
          <EasterEgg clicksRequired={5}>
            <TransitionLink
              href="/"
              aria-label="Go to homepage"
              className="flex items-center transition-colors group"
            >
              <div className={`w-10 h-10 sm:w-11 sm:h-11 ${isLandingPage ? 'text-white' : t.text} group-hover:text-[var(--accent-teal)] transition-all duration-300`}>
                <AnimatedSignatureLogo
                  className="w-full h-full"
                  duration={16000}
                  pauseDuration={2000}
                />
              </div>
            </TransitionLink>
          </EasterEgg>
        </div>

        {/* Centered Navigation Links */}
        <div className="flex items-center gap-space-4 md:gap-space-6">
          {/* Desktop Navigation - Work, Me */}
          <div className="hidden lg:flex items-center gap-space-6">
            {/* Work - with dropdown */}
            <CaseStudiesDropdown
              className={`font-mono text-[13px] uppercase tracking-[0.12em] font-normal transition-colors ${isLandingPage
                ? 'text-zinc-400 hover:text-[var(--accent-teal)]'
                : `${t.textMuted} hover:${t.text}`
                }`}
            />

            {/* Me */}
            <Magnetic>
              <TransitionLink
                href="/?tab=life"
                className={`block font-mono text-[13px] uppercase tracking-[0.12em] font-normal transition-colors relative px-2 py-1 ${isLandingPage ? 'text-zinc-400 hover:text-[var(--accent-teal)]' : `${t.textMuted} hover:${t.text}`}`}
              >
                Me
              </TransitionLink>
            </Magnetic>
          </div>
        </div>

        {/* Right Side CTAs */}
        <div className="absolute right-4 xs:right-5 sm:right-6 md:right-8 lg:right-12 xl:right-16 hidden lg:flex items-center gap-space-3">
          {/* Resume - Primary CTA */}
          <Magnetic strength={0.2}>
            <button
              onClick={() => {
                trackResumeDownload()
                openPdf('/assets/Anuja%20Harsha%20Nimmagadda%20-%20Staff%20Product%20Designer.pdf', 'Anuja Harsha Nimmagadda - Staff Product Designer')
              }}
              className={`inline-flex items-center gap-space-1.5 px-space-4 py-space-2 rounded-full ${isLandingPage ? 'text-zinc-500 hover:text-[var(--accent-teal)]' : `${t.textMuted} hover:${t.text}`} font-mono text-[13px] uppercase tracking-[0.1em] font-normal transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-teal)]`}
              aria-label="View Resume PDF"
            >
              <span>Resume</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </Magnetic>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden absolute right-4 xs:right-5 sm:right-6 md:right-8 z-[60]">
          <MobileMenu isLightBackground={!isLandingPage} />
        </div>
      </nav>
    </header>
  )
}
