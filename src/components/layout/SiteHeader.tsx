'use client'

import Link from 'next/link'
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
  const isAboutPage = pathname === '/me' || pathname === '/me/'

  // Always visible on case study pages, otherwise start hidden (desktop only)
  const [isVisible, setIsVisible] = useState(isCaseStudyPage)

  // Keep track of whether we're on mobile to control visibility behavior
  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateVisibilityForViewport = () => {
      const isMobile = window.innerWidth < 1024 // lg breakpoint
      if (isMobile) {
        // On mobile, header should always be visible for hamburger access
        setIsVisible(true)
      } else {
        // On desktop, start hidden and let scroll manager handle visibility
        setIsVisible(false)
      }
    }

    updateVisibilityForViewport()
    window.addEventListener('resize', updateVisibilityForViewport)

    return () => {
      window.removeEventListener('resize', updateVisibilityForViewport)
    }
  }, [])

  const [hasShadow, setHasShadow] = useState(false)

  // Use centralized scroll manager
  useScrollManager((scrollY) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      // On mobile: header always visible, only toggle shadow
      setIsVisible(true)
      setHasShadow(scrollY > 0)
      return
    }

    // On desktop: show header only after scrolling
    const hasScrolled = scrollY > 0
    setIsVisible(hasScrolled)
    setHasShadow(hasScrolled)
  }, [isLandingPage, isCaseStudyPage])

  const t = getTheme(!isLandingPage)

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full ${t.bgAlt}/95 backdrop-blur-md border-b ${isLandingPage ? 'border-transparent' : t.border} transition-all duration-500 ${isVisible
        ? 'opacity-100 translate-y-0 h-auto'
        : 'opacity-0 -translate-y-full pointer-events-none invisible h-0 overflow-hidden'
        } ${hasShadow ? 'shadow-sm' : ''}`}
      style={{
        zIndex: 10000,
        isolation: 'isolate',
        position: 'fixed',
      }}
    >
      <nav className={`${spacing.containerFull} py-space-4 flex items-center justify-center relative min-h-[56px] sm:min-h-[60px]`}>
        {/* Logo - positioned absolutely on the left */}
        <div className="absolute left-4 xs:left-5 sm:left-6 md:left-8 lg:left-12 xl:left-16">
          <EasterEgg clicksRequired={5}>
            <Link
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
            </Link>
          </EasterEgg>
        </div>

        {/* Centered Navigation Links */}
        <div className="flex items-center gap-space-4 md:gap-space-6">
          {/* Desktop Navigation - Work, Me */}
          <div className="hidden lg:flex items-center gap-space-6">
            {/* Work - with dropdown */}
            <CaseStudiesDropdown
              className={`font-sans font-medium transition-colors ${isLandingPage
                ? t.text
                : `${t.textMuted} hover:${t.text}`
                }`}
            />

            {/* Me */}
            <Magnetic>
              <Link
                href="/me"
                className={`block font-sans font-medium transition-colors relative px-2 py-1 ${isAboutPage
                  ? t.text
                  : `${t.textMuted} hover:${t.text}`
                  }`}
              >
                Me
                {/* Active indicator dot */}
                {isAboutPage && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-teal)]" />
                )}
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Right Side CTAs */}
        <div className="absolute right-4 xs:right-5 sm:right-6 md:right-8 lg:right-12 xl:right-16 hidden lg:flex items-center gap-space-3">
          {/* Let's Talk - Primary CTA */}
          <Magnetic strength={0.4}>
            <Link
              href="/#lets-talk"
              className="inline-flex items-center gap-space-2 px-space-4 py-space-2 rounded-full bg-[var(--accent-teal-800)] text-white text-sm font-medium transition-[background-color] duration-300 hover:bg-[var(--accent-teal-900)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-teal)] shadow-sm"
            >
              <span>Let&apos;s Talk</span>
            </Link>
          </Magnetic>

          {/* Resume - Secondary CTA */}
          <Magnetic strength={0.2}>
            <button
              onClick={() => {
                trackResumeDownload()
                openPdf('/assets/Anuja_Harsha_Resume.pdf', 'Anuja Harsha - Senior Product Designer')
              }}
              className={`inline-flex items-center gap-space-1.5 px-space-4 py-space-2 rounded-full border ${t.borderSecondary} ${t.textMuted} text-sm font-medium transition-[background-color,border-color,color] duration-300 hover:border-slate-400 hover:${t.bgAccent} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-teal)]`}
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
          <MobileMenu isLandingPage={isLandingPage} isLightBackground={!isLandingPage} />
        </div>
      </nav>
    </header>
  )
}
