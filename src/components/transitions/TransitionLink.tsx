'use client'

import { ReactNode, MouseEvent } from 'react'
import Link from 'next/link'
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
 * Intercepts clicks to play the submerge/emerge transition before navigating.
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
    <Link
      href={href}
      className={className}
      style={style}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  )
}
