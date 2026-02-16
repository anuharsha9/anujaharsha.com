'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Metric {
    value: string;
    label: string;
}

interface ScaleAndResponsibilityProps {
    data: {
        metrics: Metric[];
        status: string;
        description: string;
    };
    accentColor?: 'teal' | 'amber' | 'violet';
}

// Animated counter component
function AnimatedMetric({ value, color, delay }: { value: string; color: string; delay: number }) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })
    const [displayValue, setDisplayValue] = useState(value)

    useEffect(() => {
        if (!isInView) return

        // Extract numeric part for animation
        const numericMatch = value.match(/^([\d,.]+)(.*)$/)
        if (!numericMatch) {
            setDisplayValue(value)
            return
        }

        const targetNum = parseFloat(numericMatch[1].replace(/,/g, ''))
        const suffix = numericMatch[2] || ''
        const hasCommas = numericMatch[1].includes(',')
        const hasDecimal = numericMatch[1].includes('.')
        const decimalPlaces = hasDecimal ? numericMatch[1].split('.')[1]?.length || 0 : 0

        if (isNaN(targetNum)) {
            setDisplayValue(value)
            return
        }

        const duration = 1200 // ms
        const startTime = performance.now() + delay
        let animationFrame: number

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            if (elapsed < 0) {
                animationFrame = requestAnimationFrame(animate)
                return
            }

            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const currentValue = targetNum * eased

            let formatted: string
            if (hasDecimal) {
                formatted = currentValue.toFixed(decimalPlaces)
            } else if (hasCommas) {
                formatted = Math.round(currentValue).toLocaleString()
            } else {
                formatted = Math.round(currentValue).toString()
            }

            setDisplayValue(formatted + suffix)

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [isInView, value, delay])

    return (
        <span
            ref={ref}
            className="text-5xl md:text-6xl font-extralight mb-2 tracking-tighter number-font tabular-nums"
            style={{ color, fontVariantNumeric: 'tabular-nums' }}
        >
            {isInView ? displayValue : '0'}
        </span>
    )
}

export const ScaleAndResponsibility: React.FC<ScaleAndResponsibilityProps> = ({ data, accentColor = 'teal' }) => {
    const accentVar = accentColor === 'teal' ? 'var(--accent-teal)'
        : accentColor === 'amber' ? 'var(--accent-amber)'
            : 'var(--accent-violet)';

    return (
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.15,
                        }
                    }
                }}
                className="py-12 md:py-16"
            >
                {/* Metrics Grid — Minimal & Large Type with counting animation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 mb-16 items-center">
                    {data.metrics.map((metric, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden: { opacity: 0, y: 24, scale: 0.95 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        duration: 0.7,
                                        ease: [0.22, 1, 0.36, 1]
                                    }
                                }
                            }}
                            className={`
                                flex flex-col items-center justify-center text-center
                                ${idx !== data.metrics.length - 1 ? 'md:border-r border-slate-100' : ''}
                            `}
                        >
                            <AnimatedMetric value={metric.value} color={accentVar} delay={idx * 150} />
                            <motion.span
                                className="text-slate-400 text-[11px] uppercase tracking-[0.2em] font-medium"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } }
                                }}
                            >
                                {metric.label}
                            </motion.span>
                        </motion.div>
                    ))}
                </div>

                {/* Status + Description — Clean Text */}
                <motion.div
                    className="text-center max-w-3xl mx-auto space-y-4"
                    variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1]
                            }
                        }
                    }}
                >
                    <div className="inline-flex items-center gap-2 mb-2">
                        <div
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: accentVar }}
                        />
                        <span className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-medium">{data.status}</span>
                    </div>

                    <p className="text-slate-700 text-lg md:text-xl leading-relaxed font-light text-balance">
                        {data.description}
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};
