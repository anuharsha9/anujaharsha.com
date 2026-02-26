'use client'

import { cn } from "@/lib/design-system"
import { motion } from 'framer-motion'

type HeadingVariant = 'section' | 'block' | 'detail'
type HeadingColor = 'teal' | 'blue' | 'indigo' | 'slate' | 'red' | 'amber' | 'marketing'

interface ComponentHeadingProps {
    tag?: string
    title: string
    description?: string | React.ReactNode
    variant?: HeadingVariant
    color?: HeadingColor | string // semantic color or raw tailwind class (for backward compat)
    className?: string
    align?: 'left' | 'center' // Strict alignment options
    animate?: boolean // Enable/disable scroll animations
}

// Staggered reveal variants
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        }
    }
}

const childVariants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

export default function ComponentHeading({
    tag,
    title,
    description,
    variant = 'block',
    color = 'teal',
    className,
    align = 'left',
    animate = true
}: ComponentHeadingProps) {

    // 1. Resolve Semantic Colors
    const getColorClass = (c: string) => {
        const colors: Record<string, string> = {
            teal: "text-[var(--accent-teal)]",
            blue: "text-blue-400",
            indigo: "text-indigo-400",
            slate: "text-[var(--text-muted)]",
            red: "text-red-400",
            amber: "text-amber-400",
            marketing: "text-[var(--text-heading)]"
        }
        return colors[c] || c // Fallback to raw class if not found
    }
    const colorClass = getColorClass(color)

    // 2. Define Typography & Spacing based on Variant
    const styles = {
        section: {
            container: "mb-6 md:mb-10",
            tag: "text-xs font-bold tracking-wider mb-4 text-[var(--text-muted)] uppercase",
            title: "text-3xl md:text-4xl lg:text-5xl font-sans font-bold leading-[1.1] tracking-tight mb-4 text-[var(--text-heading)]",
            desc: "text-lg md:text-xl font-normal text-[var(--text-muted)] leading-relaxed max-w-3xl",
        },
        block: {
            container: "mb-8 md:mb-12",
            tag: "text-xs font-bold tracking-wider mb-3 text-[var(--text-muted)] uppercase",
            title: "text-2xl md:text-3xl font-sans font-bold leading-tight mb-3 text-[var(--text-heading)]",
            desc: "text-base md:text-lg font-normal text-[var(--text-muted)] leading-relaxed max-w-3xl",
        },
        detail: {
            container: "mb-6 md:mb-8",
            tag: "text-[10px] font-bold tracking-wider mb-2 text-[var(--text-dim)] uppercase",
            title: "text-xl md:text-2xl font-sans font-bold leading-snug mb-2 text-[var(--text-heading)]",
            desc: "text-base font-normal text-[var(--text-muted)] leading-relaxed max-w-2xl",
        }
    }

    const currentStyle = styles[variant]

    // Non-animated fallback
    if (!animate) {
        return (
            <div className={cn(
                "flex flex-col group relative",
                currentStyle.container,
                align === 'center' ? "items-center text-center mx-auto" : "items-start text-left",
                className
            )}>

                <h2 className={cn(
                    "text-[var(--text-heading)] text-balance",
                    currentStyle.title
                )}>
                    {title}
                </h2>
                {description && (
                    <div className={cn(
                        currentStyle.desc,
                        "text-balance"
                    )}>
                        {typeof description === 'string' ? <p>{description}</p> : description}
                    </div>
                )}
            </div>
        )
    }

    return (
        <motion.div
            className={cn(
                "flex flex-col group relative",
                currentStyle.container,
                align === 'center' ? "items-center text-center mx-auto" : "items-start text-left",
                className
            )}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >


            {/* Main Title */}
            <motion.h2
                className={cn(
                    "text-[var(--text-heading)] text-balance",
                    currentStyle.title
                )}
                variants={childVariants}
            >
                {title}
            </motion.h2>

            {/* Description */}
            {description && (
                <motion.div
                    className={cn(
                        currentStyle.desc,
                        "text-balance" // Nice wrapping
                    )}
                    variants={childVariants}
                >
                    {typeof description === 'string' ? <p>{description}</p> : description}
                </motion.div>
            )}
        </motion.div>
    )
}
