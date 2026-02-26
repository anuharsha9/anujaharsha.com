'use client'

import { motion } from 'framer-motion'
import React from 'react'

/**
 * CaseStudySection — Reusable wrapper for every Act in a case study.
 *
 * Each Act renders inside a contained card with rounded corners and
 * a subtle elevated surface, so content feels grounded rather than
 * floating in a void.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  ┌─ Card (rounded-2xl, subtle border + bg) ─────────────────┐  │
 * │  │  [eyebrow]  ·  small mono label                           │  │
 * │  │  [title]    ·  large bold heading                         │  │
 * │  │  ─────────────────────────── (thin rule)                  │  │
 * │  │  [subtitle] ·  summary paragraph                         │  │
 * │  │                                                           │  │
 * │  │  {children} ·  narrative + components                     │  │
 * │  └───────────────────────────────────────────────────────────┘  │
 * └─────────────────────────────────────────────────────────────────┘
 */

interface CaseStudySectionProps {
    /** HTML id for scroll-to anchor */
    id?: string
    /** Small mono eyebrow label (e.g. "Act I") */
    eyebrow?: string
    /** Large heading — the section title */
    title?: string
    /** Optional subtitle / summary paragraph */
    subtitle?: string
    /** Section content */
    children: React.ReactNode
    /** Extra className on the outer section */
    className?: string
    /** Whether to show the top divider line (default: true) */
    divider?: boolean
    /** Whether to remove default content padding (for full-bleed children) */
    noPadding?: boolean
    /** Disable scroll-triggered entrance animation */
    noAnimation?: boolean
}

// Staggered reveal variants
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        }
    }
}

const childVariants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

export default function CaseStudySection({
    id,
    eyebrow,
    title,
    subtitle,
    children,
    className = '',
    divider = true,
    noPadding = false,
    noAnimation = false,
}: CaseStudySectionProps) {
    const hasHeader = eyebrow || title || subtitle
    const Content = noAnimation ? 'div' : motion.div

    return (
        <section
            id={id}
            className={`relative py-8 md:py-10 lg:py-12 ${className}`}
        >
            {/* Content container — max-width + card */}
            <div className="max-w-[1440px] mx-auto w-full px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <Content
                    className={`
                        relative
                        rounded-2xl
                        border border-white/[0.08]
                        ${noPadding ? '' : 'px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-10 md:py-14 lg:py-16'}
                    `}
                    {...(!noAnimation && {
                        initial: 'hidden',
                        whileInView: 'visible',
                        viewport: { once: true, amount: 0.02 },
                        variants: containerVariants,
                    })}
                >

                    {/* Section header */}
                    {hasHeader && (
                        <div className="mb-10 md:mb-12">
                            {eyebrow && (
                                <motion.p
                                    className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-[var(--accent-teal)] mb-4"
                                    {...(!noAnimation && { variants: childVariants })}
                                >
                                    {eyebrow}
                                </motion.p>
                            )}
                            {title && (
                                <motion.h2
                                    className="text-2xl md:text-3xl lg:text-[2.25rem] font-sans font-bold leading-[1.15] tracking-tight text-[var(--text-heading)] mb-0"
                                    {...(!noAnimation && { variants: childVariants })}
                                >
                                    {title}
                                </motion.h2>
                            )}
                            {subtitle && (
                                <>
                                    <div className="w-12 h-px bg-white/[0.1] my-5" />
                                    <motion.p
                                        className="text-base md:text-lg text-[var(--text-body)] leading-relaxed font-light max-w-3xl"
                                        {...(!noAnimation && { variants: childVariants })}
                                    >
                                        {subtitle}
                                    </motion.p>
                                </>
                            )}
                        </div>
                    )}

                    {/* Section body */}
                    <motion.div
                        {...(!noAnimation && { variants: childVariants })}
                    >
                        {children}
                    </motion.div>
                </Content>
            </div>
        </section>
    )
}
