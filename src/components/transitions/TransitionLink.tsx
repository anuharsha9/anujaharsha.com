'use client'

import { ReactNode, MouseEvent, useRef, useEffect } from 'react'
import { useTransition } from './TransitionContext'

interface TransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  [key: string]: unknown
}

/**
 * TransitionLink — drop-in replacement for next/link.
 * 
 * Uses a plain <a> tag instead of Next.js <Link> to avoid
 * internal click-handling conflicts. Navigation is handled
 * entirely by our TransitionContext's router.push().
 * 
 * Safety: if the transition system gets stuck in a non-idle
 * phase for more than 3s, we force a native navigation to
 * prevent the site from becoming un-navigable.
 * 
 * SEO/accessibility: renders a real <a> with href, so crawlers
 * and screen readers see a proper link.
 */
export default function TransitionLink({
  href,
  children,
  className,
  style,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const { navigateTo, phase } = useTransition()
  const stuckTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastPhaseChange = useRef<number>(Date.now())

  // Track when phase last changed
  useEffect(() => {
    lastPhaseChange.current = Date.now()
    // Clear stuck timer on any phase change
    if (stuckTimer.current) {
      clearTimeout(stuckTimer.current)
      stuckTimer.current = null
    }
  }, [phase])

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Allow modifier-key clicks to open in new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey) return

    // Don't intercept external links or anchors
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return

    e.preventDefault()
    if (onClick) onClick(e)

    // If transition is active, check if it's stuck
    if (phase !== 'idle') {
      const elapsed = Date.now() - lastPhaseChange.current
      if (elapsed > 3000) {
        // Phase has been stuck for 3+ seconds — force native navigation
        console.warn('[TransitionLink] Phase stuck for', elapsed, 'ms — forcing native navigation')
        window.location.href = href
        return
      }
      // Otherwise, just wait for the transition to finish
      return
    }

    navigateTo(href)
  }

  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  )
}
