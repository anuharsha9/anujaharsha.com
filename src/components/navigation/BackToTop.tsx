'use client'

import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (about 100vh)
      setIsVisible(window.scrollY > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              scrollToTop()
            }
          }}
          className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[60] w-12 h-12 rounded-full bg-[var(--accent-teal)] text-white shadow-lg hover:bg-[var(--accent-teal)]/90 transition-colors duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:ring-offset-2 focus:ring-offset-[var(--bg-dark)]"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6 transition-transform duration-200 group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </m.button>
      )}
    </AnimatePresence>
  )
}

