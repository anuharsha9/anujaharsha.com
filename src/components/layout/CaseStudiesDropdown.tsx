'use client'

import { useState, useRef, useEffect, useId, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import TransitionLink from '@/components/transitions/TransitionLink'
import { usePathname } from 'next/navigation'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { EASE_CINEMATIC, DURATION } from '@/lib/motion'

interface CaseStudiesDropdownProps {
  className?: string
  onNavigate?: () => void
}

export default function CaseStudiesDropdown({ className = '', onNavigate }: CaseStudiesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const menuId = useId()

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

  const focusMenuItem = (selector: 'first' | 'last' = 'first') => {
    const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]')
    if (!items || items.length === 0) return
    const target = selector === 'last' ? items[items.length - 1] : items[0]
    target?.focus()
  }

  const handleTriggerClick = () => {
    setIsOpen((prev) => !prev)
  }

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen(true)
      requestAnimationFrame(() => focusMenuItem('first'))
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setIsOpen(true)
      requestAnimationFrame(() => focusMenuItem('last'))
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
      triggerRef.current?.focus()
    }
  }

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
      triggerRef.current?.focus()
    }
  }

  // Don't render until mounted on client
  if (!isMounted) {
    return (
      <TransitionLink
        href="/#work-overview"
        className={className}
      >
        Work
      </TransitionLink>
    )
  }

  const caseStudies = [
    { id: '001', label: 'ReportCaster', href: '/work/reportcaster', tag: 'LEGACY_MODERNIZATION' },
    { id: '002', label: 'Democratizing ML', href: '/work/ml-functions', tag: 'AI_UX' },
    { id: '003', label: 'Data Science Adoption', href: '/work/iq-plugin', tag: 'PLATFORM_UNIFICATION' },
    // College OS — hidden until deployed
    // { id: 'APP', label: 'College OS (App)', href: process.env.NEXT_PUBLIC_COLLEGE_OS_URL || 'http://localhost:3005', tag: 'AI_APP', isExternal: true },
  ]

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node)) {
          setIsOpen(false)
        }
      }}
    >
      {/* Trigger */}
      <button
        ref={triggerRef}
        className={`${className} inline-flex items-center gap-1`}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        type="button"
      >
        Work
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            id={menuId}
            ref={menuRef}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: DURATION.fast, ease: EASE_CINEMATIC }}
            style={{ backgroundColor: 'rgb(12, 12, 20)' }}
            className="absolute top-full left-0 mt-3 w-72 rounded-xl border border-white/[0.08] backdrop-blur-3xl shadow-2xl shadow-black/60 overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleMenuKeyDown}
            role="menu"
            aria-label="Case studies"
          >
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
                Case Studies
              </span>
            </div>

            {/* Case Study Links */}
            <nav className="py-1" aria-label="Case studies navigation">
              {/* View All Link */}
              <TransitionLink
                href="/#work-overview"
                onClick={handleClick}
                className="block px-4 py-2.5 text-zinc-500 text-sm hover:bg-white/[0.04] hover:text-zinc-200 transition-colors border-b border-white/[0.06]"
                role="menuitem"
              >
                <span className="font-medium">View All Work</span>
              </TransitionLink>

              {/* Individual Case Studies */}
              {caseStudies.map((item) => {
                const accentColors: Record<string, string> = {
                  '001': '#f59e0b',
                  '002': '#2fc6d5',
                  '003': '#a855f7',
                  'APP': '#10b981',
                }
                const accent = accentColors[item.id] || '#666'
                return (
                  <TransitionLink
                    key={item.href}
                    href={item.href}
                    onClick={handleClick}
                    className="group/item flex items-center gap-3 px-4 py-3 hover:bg-white/[0.04] transition-all duration-200"
                    role="menuitem"
                  >
                    {/* Accent dot */}
                    <div
                      className="w-2 h-2 rounded-full shrink-0 transition-transform duration-200 group-hover/item:scale-125"
                      style={{ backgroundColor: accent }}
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-zinc-400 group-hover/item:text-white transition-colors">
                          {item.label}
                        </span>
                        <span
                          className="font-mono text-[9px] tracking-wider opacity-40"
                          style={{ color: accent }}
                        >
                          {item.id}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 leading-snug mt-0.5">
                        {item.tag.replace(/_/g, ' ')}
                      </p>
                    </div>

                    {/* Arrow */}
                    <svg className="w-3.5 h-3.5 text-zinc-800 group-hover/item:text-zinc-500 transition-all duration-200 group-hover/item:translate-x-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </TransitionLink>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-white/[0.06]">
              <TransitionLink
                href="/me"
                onClick={handleClick}
                className="font-mono text-[10px] text-zinc-600 hover:text-zinc-400 uppercase tracking-wider transition-colors"
                role="menuitem"
              >
                → ABOUT ANUJA
              </TransitionLink>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
