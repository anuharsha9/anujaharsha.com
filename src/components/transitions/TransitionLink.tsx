'use client'

import { ReactNode, MouseEvent } from 'react'
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

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Allow modifier-key clicks to open in new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey) return

    // Don't intercept external links or anchors
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return

    e.preventDefault()
    if (onClick) onClick(e)

    // Don't double-trigger during transition
    if (phase !== 'idle') return

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
