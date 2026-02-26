'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ComponentHeading from '@/components/ui/ComponentHeading';

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

const accentMap = {
    teal: {
        css: 'var(--accent-teal)',
        glow: 'bg-teal-500/[0.08]',
        pulse: 'bg-teal-400',
        tag: 'text-teal-400',
    },
    amber: {
        css: '#f59e0b',
        glow: 'bg-amber-500/[0.08]',
        pulse: 'bg-amber-400',
        tag: 'text-amber-400',
    },
    violet: {
        css: '#8b5cf6',
        glow: 'bg-violet-500/[0.08]',
        pulse: 'bg-violet-400',
        tag: 'text-violet-400',
    },
}

// ─── Animated Counter ────────────────────────────────────

function AnimatedMetric({ value, color, delay }: { value: string; color: string; delay: number }) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })
    const [displayValue, setDisplayValue] = useState(value)

    useEffect(() => {
        if (!isInView) return

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

        const duration = 1200
        const startTime = performance.now() + delay
        let animationFrame: number

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            if (elapsed < 0) {
                animationFrame = requestAnimationFrame(animate)
                return
            }

            const progress = Math.min(elapsed / duration, 1)
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
            className="text-3xl md:text-4xl font-extralight tracking-tighter tabular-nums"
            style={{ color, fontVariantNumeric: 'tabular-nums' }}
        >
            {isInView ? displayValue : '0'}
        </span>
    )
}

// ─── Component ───────────────────────────────────────────

export const ScaleAndResponsibility: React.FC<ScaleAndResponsibilityProps> = ({ data, accentColor = 'teal' }) => {
    const accent = accentMap[accentColor];

    return (
        <section className="w-full">
            <ComponentHeading
                variant="block"
                align="center"
                tag="SCALE & RESPONSIBILITY"
                title="System at Scale"
                color={accentColor}
                className="mb-10"
            />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: { staggerChildren: 0.12 }
                    }
                }}
                className="space-y-8"
            >
                {/* Metrics — Glass Cards */}
                <div className={`grid grid-cols-1 ${data.metrics.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-5`}>
                    {data.metrics.map((metric, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden: { opacity: 0, y: 20, scale: 0.97 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        duration: 0.6,
                                        ease: [0.22, 1, 0.36, 1]
                                    }
                                }
                            }}
                            className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 flex flex-col items-center text-center hover:border-white/[0.10] transition-all duration-300 overflow-hidden group"
                        >
                            {/* Glow */}
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full blur-3xl opacity-[0.05] group-hover:opacity-[0.10] transition-opacity duration-500 pointer-events-none"
                                style={{ backgroundColor: accent.css }}
                            />

                            <AnimatedMetric value={metric.value} color={accent.css} delay={idx * 150} />

                            <motion.span
                                className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em] font-medium mt-3"
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

                {/* Status + Description */}
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
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full">
                        <div
                            className={`w-2 h-2 rounded-full animate-pulse ${accent.pulse}`}
                        />
                        <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em] font-medium">{data.status}</span>
                    </div>

                    <p className="text-[var(--text-body)] text-base md:text-lg leading-relaxed font-light text-balance">
                        {data.description}
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};
