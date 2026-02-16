'use client'

import { ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'

interface ScrollRevealTextProps {
    children: ReactNode
    className?: string
    delay?: number
    /** 'paragraph' = subtle fade-up, 'heading' = more dramatic slide-up with deblur */
    variant?: 'paragraph' | 'heading' | 'subtle'
    /** Whether to use staggered children animation */
    stagger?: boolean
    staggerDelay?: number
}

const paragraphVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 16,
        filter: 'blur(2px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

const headingVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 28,
        filter: 'blur(4px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

const subtleVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 8,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
}

/**
 * ScrollRevealText — Premium scroll-triggered text reveal.
 * Text fades up with a subtle deblur as it enters the viewport.
 * Use 'heading' variant for section titles, 'paragraph' for body text.
 */
export default function ScrollRevealText({
    children,
    className = '',
    delay = 0,
    variant = 'paragraph',
    stagger = false,
    staggerDelay = 0.08,
}: ScrollRevealTextProps) {
    const variantMap = {
        paragraph: paragraphVariants,
        heading: headingVariants,
        subtle: subtleVariants,
    }

    if (stagger) {
        return (
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -60px 0px', amount: 0.1 }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: staggerDelay,
                            delayChildren: delay,
                        },
                    },
                }}
                className={className}
            >
                {children}
            </motion.div>
        )
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -60px 0px', amount: 0.15 }}
            variants={variantMap[variant]}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

/**
 * ScrollRevealItem — Child of a staggered ScrollRevealText container.
 * Must be used inside a ScrollRevealText with stagger={true}.
 */
export function ScrollRevealItem({
    children,
    className = '',
    variant = 'paragraph',
}: {
    children: ReactNode
    className?: string
    variant?: 'paragraph' | 'heading' | 'subtle'
}) {
    const variantMap = {
        paragraph: paragraphVariants,
        heading: headingVariants,
        subtle: subtleVariants,
    }

    return (
        <motion.div variants={variantMap[variant]} className={className}>
            {children}
        </motion.div>
    )
}
