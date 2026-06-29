'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Sections to track for URL hash updates
const landingPageSections = [
  'work-overview',
  'lets-talk',
]

export default function URLHashSync() {
  const pathname = usePathname()

  useEffect(() => {
    // Only run on landing page
    if (pathname !== '/') return

    // Check if there's a hash in the URL (user navigated from another page)
    const hash = window.location.hash.slice(1) // Remove the #
    if (hash && landingPageSections.includes(hash)) {
      // User navigated from another page with a hash - scroll to that section
      setTimeout(() => {
        const section = document.getElementById(hash)
        if (section) {
          // Account for both main nav (60px) and section nav (60px) if visible
          const mainNavHeight = 72 // Main nav is now taller
          const sectionNavHeight = 48 // Section nav is now shorter
          const sectionNavVisible = document.querySelector('[aria-label="Landing page section navigation"]')?.getBoundingClientRect().height || 0
          const totalNavHeight = mainNavHeight + (sectionNavVisible > 0 ? sectionNavHeight : 0)
          const offset = totalNavHeight + 20 // Extra padding

          const elementPosition = section.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = Math.max(0, elementPosition - offset)

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      }, 500) // Wait for page to fully render
      return // Don't clear hash or scroll to top
    }

    // No hash - always start at top on initial load. Keep the query string
    // (e.g. ?tab=life) so deep-links to the Life tab survive — only clear the hash.
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    window.scrollTo({ top: 0, behavior: 'instant' })

    let scrollTimeout: NodeJS.Timeout | null = null
    let hasInitialized = false
    let userHasScrolled = false

    const updateHash = () => {
      if (!hasInitialized || !userHasScrolled) return

      // Don't update hash if we're at the top (hero section)
      if (window.scrollY < 100) {
        // If we're at the top, clear hash or set to empty
        if (window.location.hash) {
          // Keep the query string (e.g. ?tab=life) — only the section hash is cleared.
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
        }
        return
      }

      // Find which section is currently in view
      const scrollPosition = window.scrollY + window.innerHeight * 0.3

      for (const sectionId of landingPageSections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = window.scrollY + rect.top

          // Check if this section is in the viewport
          if (elementTop <= scrollPosition && elementTop + rect.height > scrollPosition) {
            const newHash = `#${sectionId}`
            if (window.location.hash !== newHash) {
              // Use replaceState to avoid adding to history
              window.history.replaceState(null, '', newHash)
            }
            break
          }
        }
      }
    }

    const handleScroll = () => {
      // Mark that user has scrolled
      if (!userHasScrolled) {
        userHasScrolled = true
      }

      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      scrollTimeout = setTimeout(() => {
        updateHash()
      }, 150) // Throttle updates
    }

    // Delay initial hash update to prevent scroll jump
    // Don't update hash on initial load - only on user scroll
    setTimeout(() => {
      hasInitialized = true
      window.addEventListener('scroll', handleScroll, { passive: true })
      // Don't call updateHash() on initial load - let user scroll first
    }, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [pathname])

  return null // This component doesn't render anything
}
