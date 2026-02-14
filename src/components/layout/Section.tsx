'use client'

import { ReactNode } from 'react'
import MotionSection from '@/components/ui/MotionSection'
import { getTheme, spacing } from '@/lib/design-system'

interface SectionProps {
    id?: string
    className?: string
    children: ReactNode
    background?: 'light' | 'dark' | 'alt' | string
    animate?: boolean
    variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale'
    delay?: number
    fullWidth?: boolean
}

/**
 * Section - A standardized layout component for case study sections.
 * Enforces design system vertical rhythm and horizontal container consistency.
 */
export default function Section({
    id,
    className = '',
    children,
    background = 'light',
    animate = true,
    variant = 'fade-up',
    delay = 0,
    fullWidth = false
}: SectionProps) {
    const t = getTheme(true)

    // Map background aliases to design system classes
    const backgroundClasses: Record<string, string> = {
        light: t.bg,
        secondary: t.bgAlt,
        alt: t.bgAlt,
        monitor: t.monitor.bg,
    }

    const bgClass = backgroundClasses[background] || background

    // Standard container classes
    const containerClasses = fullWidth
        ? ''
        : spacing.containerMax + ' ' + spacing.container

    // Standard vertical padding using the new tokens
    const paddingClasses = 'py-section-mobile md:py-section-tablet lg:py-section-desktop'

    return (
        <MotionSection
            id={id}
            className={`${bgClass} ${paddingClasses} ${className}`}
            animate={animate}
            delay={delay}
        >
            <div className={containerClasses}>
                {children}
            </div>
        </MotionSection>
    )
}
