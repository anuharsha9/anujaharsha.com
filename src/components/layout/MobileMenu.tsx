'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSignatureLogo from '@/components/brand/AnimatedSignatureLogo'
import { trackResumeDownload } from '@/components/analytics/GoogleAnalytics'
import { usePdf } from '@/contexts/PdfContext'

import { getCaseStudyData } from '@/lib/getCaseStudyData'

import { getTheme, spacing } from '@/lib/design-system'

interface MobileMenuProps {
  isLandingPage?: boolean
  isLightBackground?: boolean
}

export default function MobileMenu({ isLandingPage = false, isLightBackground = false }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const t = getTheme(isLightBackground)
  const { openPdf } = usePdf()

  // Simple scroll prevention - just overflow hidden, no position changes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Check if we're on a case study page and get sections
  const caseStudySections = useMemo(() => {
    if (!pathname?.startsWith('/work/')) return null

    const slug = pathname.split('/work/')[1]?.split('/')[0]?.replace(/\/$/, '')
    if (!slug) return null

    const caseStudyData = getCaseStudyData(slug)
    if (!caseStudyData?.sections) return null

    // Clean up pathname to ensure proper format (remove trailing slash)
    const basePath = pathname.replace(/\/$/, '')

    return caseStudyData.sections.map((section) => ({
      label: section.title,
      href: `${basePath}#${section.id}`,
    }))
  }, [pathname])

  const isOnCaseStudyPage = !!caseStudySections

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Hamburger Button - Hide when menu is open */}
      <div suppressHydrationWarning>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              onClick={toggleMenu}
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 relative pointer-events-auto -mr-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)] focus-visible:ring-offset-2 rounded-md"
              style={{ zIndex: 10003 }}
              aria-label="Open menu"
              aria-expanded={isOpen}
              type="button"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className={`w-6 h-[2.5px] rounded-full ${isLightBackground ? 'bg-slate-900' : 'bg-white'}`} />
              <span className={`w-6 h-[2.5px] rounded-full ${isLightBackground ? 'bg-slate-900' : 'bg-white'}`} />
              <span className={`w-6 h-[2.5px] rounded-full ${isLightBackground ? 'bg-slate-900' : 'bg-white'}`} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10001,
                isolation: 'isolate'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel - Full Screen Overlay - above header */}
            <motion.div
              className={`fixed inset-0 lg:hidden flex flex-col ${t.bg} ${t.text}`}
              style={{
                height: '100vh',
                maxHeight: '100vh',
                zIndex: 10002,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                isolation: 'isolate',
                overflow: 'hidden'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Centered */}
              <div className={`p-8 flex-shrink-0 text-center border-b ${t.borderSubtle}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1"></div>
                  <div className="w-12 h-12 mx-auto">
                    <AnimatedSignatureLogo
                      className={`w-full h-full ${t.text}`}
                      duration={16000}
                      pauseDuration={2000}
                    />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`w-8 h-8 flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${t.textSecondary} hover:${t.text} focus-visible:outline-slate-900`}
                    aria-label="Close menu"
                  >
                    <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-sans font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${t.text} hover:text-[var(--accent-teal)] focus-visible:outline-slate-900`}
                >
                  Anuja Harsha Nimmagadda
                </Link>
                <p className={`${t.textSecondary} text-sm mt-2`}>Senior Product Designer</p>
              </div>

              {/* Navigation Links - Scrollable */}
              <nav className="flex-1 overflow-y-auto overflow-x-hidden p-8 space-y-2" style={{ minHeight: 0 }} aria-label="Main navigation">
                {/* Main Navigation */}
                <div className="mb-8">
                  <p className={`${t.textDim} text-xs uppercase tracking-wider mb-4 px-2`}>
                    Navigation
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                      // Small delay to let menu close animation start
                      setTimeout(() => {
                        const el = document.getElementById('work-overview')
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        } else {
                          // Fallback: navigate to home with hash
                          window.location.href = '/#work-overview'
                        }
                      }, 200)
                    }}
                    className={`block w-full text-left px-6 py-4 rounded-lg text-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${t.text} hover:${t.bgAccent} hover:text-[var(--accent-teal)] focus-visible:outline-slate-900`}
                  >
                    Work
                  </button>

                  <Link
                    href="/me"
                    onClick={() => setIsOpen(false)}
                    className={`block px-6 py-4 rounded-lg text-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${t.text} hover:${t.bgAccent} hover:text-[var(--accent-teal)] focus-visible:outline-slate-900`}
                  >
                    Me
                  </Link>

                  <button
                    onClick={() => {
                      trackResumeDownload()
                      setIsOpen(false)
                      openPdf('/assets/Anuja Harsha Nimmagadda - Senior Product Designer.pdf', 'Anuja Harsha - Senior Product Designer')
                    }}
                    className={`block w-full text-left px-6 py-4 rounded-lg text-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 border-2 mt-4 ${t.textAccent} border-[var(--accent-teal)]/50 bg-[var(--accent-teal)]/5 hover:bg-[var(--accent-teal)]/10 focus-visible:outline-[var(--accent-teal)]`}
                    aria-label="View Resume PDF"
                  >
                    Resume (PDF)
                  </button>
                </div>

                {/* Case Study Sections - only show on case study pages */}
                {isOnCaseStudyPage && caseStudySections && (
                  <div>
                    <p className={`${t.textDim} text-xs uppercase tracking-wider mb-4 px-2`}>
                      Case Study Sections
                    </p>
                    {caseStudySections.map((section) => (
                      <Link
                        key={section.href}
                        href={section.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-6 py-3 rounded-lg text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${t.textSecondary} hover:${t.bgAccent} hover:text-[var(--accent-teal)] focus-visible:outline-slate-900`}
                      >
                        {section.label}
                      </Link>
                    ))}
                  </div>
                )}
              </nav>

              {/* Footer */}
              <div className={`p-6 border-t flex-shrink-0 ${t.borderSubtle}`}>
                <p className={`${t.textDim} text-xs text-center`} suppressHydrationWarning>
                  © {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}


