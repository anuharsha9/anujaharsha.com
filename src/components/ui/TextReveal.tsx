'use client'

import { useRef, useEffect, useState, CSSProperties, ReactNode } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface TextRevealProps {
    children: string
    className?: string
    /** Delay before the animation starts (in seconds) */
    delay?: number
    /** Duration per word animation (in seconds) */
    duration?: number
    /** Stagger delay between each word (in seconds) */
    stagger?: number
    /** Animation style */
    variant?: 'slide-up' | 'fade-up' | 'clip'
    /** Only animate once */
    once?: boolean
    /** Viewport amount (0-1) before triggering */
    viewportAmount?: number
    /** Tag to render as */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
    /** Style override */
    style?: CSSProperties
}

// Word animation variants
const slideUp: Variants = {
    hidden: {
        y: '100%',
        opacity: 0,
    },
    visible: (i: number) => ({
        y: '0%',
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.33, 1, 0.68, 1], // Custom easeOutCubic
        },
    }),
}

const fadeUp: Variants = {
    hidden: {
        y: 20,
        opacity: 0,
    },
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            delay: i * 0.06,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
}

const clipReveal: Variants = {
    hidden: {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
    },
    visible: (i: number) => ({
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        transition: {
            duration: 0.7,
            delay: i * 0.05,
            ease: [0.76, 0, 0.24, 1],
        },
    }),
}

const variantMap = {
    'slide-up': slideUp,
    'fade-up': fadeUp,
    'clip': clipReveal,
}

export default function TextReveal({
    children,
    className = '',
    delay = 0,
    duration,
    stagger,
    variant = 'slide-up',
    once = true,
    viewportAmount = 0.5,
    as: Tag = 'div',
    style,
}: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, {
        once,
        amount: viewportAmount,
    })

    // Split text into words, preserving spaces
    const words = children.split(' ')
    const selectedVariant = variantMap[variant]

    // Apply custom timing overrides if provided
    const getCustomVariant = (): Variants => {
        if (!duration && !stagger && !delay) return selectedVariant

        const base = selectedVariant
        return {
            hidden: base.hidden,
            visible: (i: number) => {
                const baseResult = (base.visible as (i: number) => any)(i)
                return {
                    ...baseResult,
                    transition: {
                        ...baseResult.transition,
                        ...(duration !== undefined && { duration }),
                        delay: (delay || 0) + i * (stagger || baseResult.transition.delay / (i || 1)),
                    },
                }
            },
        }
    }

    const activeVariant = (duration || stagger || delay) ? getCustomVariant() : selectedVariant

    return (
        <Tag
            ref={containerRef as any}
            className={className}
            style={style}
        >
            {words.map((word, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden"
                    style={{ marginRight: '0.25em' }}
                >
                    <motion.span
                        className="inline-block"
                        custom={i}
                        variants={activeVariant}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </Tag>
    )
}
