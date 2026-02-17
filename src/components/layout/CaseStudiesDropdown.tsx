'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface CaseStudiesDropdownProps {
  className?: string
  onNavigate?: () => void
}

export default function CaseStudiesDropdown({ className = '', onNavigate }: CaseStudiesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Ensure component only renders on client to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close dropdown when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isMounted) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, isMounted])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    // Small delay to prevent flickering when moving to dropdown
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  const handleClick = () => {
    // Close dropdown when a link is clicked
    setIsOpen(false)
    if (onNavigate) {
      onNavigate()
    }
  }

  // Don't render until mounted on client
  if (!isMounted) {
    return (
      <Link
        href="/#work-overview"
        className={className}
      >
        Work
      </Link>
    )
  }

  const caseStudies = [
    { id: '001', label: 'ReportCaster', href: '/work/reportcaster', tag: 'LEGACY_MODERNIZATION' },
    { id: '002', label: 'Democratizing ML', href: '/work/ml-functions', tag: 'AI_UX' },
    { id: '003', label: 'Data Science Adoption', href: '/work/iq-plugin', tag: 'PLATFORM_UNIFICATION' },
  ]

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        className={`${className} inline-flex items-center gap-1`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Work
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-3 bg-white border border-slate-200 rounded-xl shadow-xl min-w-[280px] overflow-hidden"
            style={{ zIndex: 10001 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                {'// CASE_STUDIES'}
              </span>
            </div>

            {/* Case Study Links */}
            <nav className="py-2" aria-label="Case studies navigation">
              {/* View All Link */}
              <Link
                href="/#work-overview"
                onClick={handleClick}
                className="block px-4 py-2.5 text-slate-600 text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors border-b border-slate-100"
              >
                <span className="font-medium">View All Work</span>
              </Link>

              {/* Individual Case Studies */}
              {caseStudies.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleClick}
                  className="group block px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {/* System ID */}
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.id}
                    </span>

                    {/* Title */}
                    <span className="text-slate-900 text-sm font-medium group-hover:text-[var(--accent-teal)] transition-colors">
                      {item.label}
                    </span>
                  </div>

                  {/* Tag */}
                  <div className="mt-1 ml-10">
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50">
              <Link
                href="/#work-archive"
                onClick={handleClick}
                className="font-mono text-[10px] text-slate-500 hover:text-[var(--accent-teal)] uppercase tracking-wider transition-colors"
              >
                → SECONDARY CASE STUDIES
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
