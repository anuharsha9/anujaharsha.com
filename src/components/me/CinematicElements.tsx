'use client'

import React, { useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════
// AMBIENT ORBS — Floating gradient blobs for atmospheric depth
// ═══════════════════════════════════════════════════════════════════
export function AmbientOrbs() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 600, height: 600, left: '5%', top: '15%',
                    background: 'radial-gradient(circle, rgba(7,139,156,0.06) 0%, rgba(7,139,156,0.02) 40%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
                animate={{ x: [0, 40, -20, 30, 0], y: [0, -50, 30, -20, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 500, height: 500, right: '5%', bottom: '20%',
                    background: 'radial-gradient(circle, rgba(7,139,156,0.05) 0%, rgba(7,139,156,0.015) 40%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
                animate={{ x: [0, -30, 20, -10, 0], y: [0, 30, -40, 15, 0] }}
                transition={{ duration: 25, delay: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 400, height: 400, left: '45%', top: '55%',
                    background: 'radial-gradient(circle, rgba(0,113,227,0.03) 0%, transparent 60%)',
                    filter: 'blur(80px)',
                }}
                animate={{ x: [0, 20, -30, 10, 0], y: [0, -20, 10, -30, 0], scale: [1, 1.1, 0.9, 1.05, 1] }}
                transition={{ duration: 35, delay: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════
// SECTION DIVIDER — Animated transitional element between acts
// ═══════════════════════════════════════════════════════════════════
export function SectionDivider({ label, className = '' }: { label?: string; className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    return (
        <div ref={ref} className={`relative py-12 md:py-20 flex items-center justify-center ${className}`}>
            <motion.div
                className="absolute h-[1px]"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, var(--accent-teal) 30%, var(--accent-teal) 70%, transparent 100%)',
                    left: '15%', right: '15%',
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 0.3 } : {}}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
                className="relative z-10 bg-white px-4 flex items-center gap-3"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="w-1.5 h-1.5 bg-[var(--accent-teal)] rotate-45 opacity-40" />
                {label && (
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.3em]">{label}</span>
                )}
                <div className="w-1.5 h-1.5 bg-[var(--accent-teal)] rotate-45 opacity-40" />
            </motion.div>
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════
// PHILOSOPHY MARQUEE — Infinite horizontal scrolling text
// ═══════════════════════════════════════════════════════════════════
export function PhilosophyMarquee({
    texts = ['Complexity → Clarity → Delight'],
    speed = 35,
    direction = 'left'
}: {
    texts?: string[]
    speed?: number
    direction?: 'left' | 'right'
}) {
    const items = Array(6).fill(texts).flat()

    return (
        <div className="overflow-hidden py-10 md:py-14 border-y border-slate-100/50 relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
                transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
            >
                {items.map((text, i) => (
                    <span key={i} className="flex items-center mx-8 md:mx-16">
                        <span className="text-4xl md:text-6xl lg:text-7xl font-serif text-slate-100 select-none whitespace-nowrap">
                            {text}
                        </span>
                        <span className="text-[var(--accent-teal)] opacity-20 mx-8 md:mx-16 text-2xl">✦</span>
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════
// SCROLL CUE — Animated scroll-down indicator at hero bottom
// ═══════════════════════════════════════════════════════════════════
export function ScrollCue() {
    return (
        <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
        >
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.2em]">Scroll</span>
            <motion.div
                className="w-[1px] h-8 bg-gradient-to-b from-[var(--accent-teal)] to-transparent origin-top"
                animate={{ scaleY: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
        </motion.div>
    )
}

// ═══════════════════════════════════════════════════════════════════
// CHAPTER HEADING — Cinematic section intro with text reveal
// ═══════════════════════════════════════════════════════════════════
export function ChapterHeading({
    title,
    subtitle
}: {
    title: string
    subtitle?: string
}) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    return (
        <motion.div
            ref={ref}
            className="mb-10 md:mb-16"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            {/* Decorative accent */}
            <motion.div
                className="flex items-center gap-3 mb-5"
                variants={{
                    hidden: { opacity: 0, scaleX: 0 },
                    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                }}
                style={{ transformOrigin: 'left' }}
            >
                <div className="w-8 h-[2px] bg-[var(--accent-teal)] opacity-60" />
                <div className="w-2 h-2 bg-[var(--accent-teal)] rotate-45 opacity-30" />
            </motion.div>
            <div className="overflow-hidden">
                <motion.h2
                    className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-tight"
                    variants={{
                        hidden: { y: '100%' },
                        visible: { y: 0, transition: { duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] } }
                    }}
                >
                    {title}
                </motion.h2>
            </div>
            {subtitle && (
                <motion.p
                    className="text-slate-500 text-base md:text-lg mt-4 max-w-xl leading-relaxed"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }
                    }}
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    )
}

// ═══════════════════════════════════════════════════════════════════
// ANIMATED COUNTER — Number counting up on scroll
// ═══════════════════════════════════════════════════════════════════
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!isInView) return
        let start = 0
        const step = target / (2 * 60)
        const timer = setInterval(() => {
            start += step
            if (start >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 1000 / 60)
        return () => clearInterval(timer)
    }, [isInView, target])

    return <span ref={ref}>{prefix}{count}{suffix}</span>
}

// ═══════════════════════════════════════════════════════════════════
// HORIZONTAL STATS RIBBON — Animated stat counters
// ═══════════════════════════════════════════════════════════════════
export function HorizontalStatsRibbon() {
    const stats = [
        { value: 13, suffix: '+', label: 'Years in Design' },
        { value: 5, suffix: '', label: 'Portfolio Versions' },
        { value: 6, suffix: '', label: 'Weeks to Ship' },
        { value: 20, suffix: 'M+', label: 'Users Impacted' },
    ]

    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    return (
        <div ref={ref} className="py-12 md:py-16">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-5xl mx-auto px-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="font-serif text-4xl md:text-5xl text-slate-900 mb-1">
                            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════
// TILT CARD — 3D perspective tilt on hover
// ═══════════════════════════════════════════════════════════════════
export function TiltCard({
    children,
    className = '',
    intensity = 8
}: {
    children: React.ReactNode
    className?: string
    intensity?: number
}) {
    const ref = useRef<HTMLDivElement>(null)

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        ref.current.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02, 1.02, 1.02)`
    }, [intensity])

    const handleMouseLeave = useCallback(() => {
        if (!ref.current) return
        ref.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)'
    }, [])

    return (
        <div
            ref={ref}
            className={`transition-transform duration-500 ease-out will-change-transform ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {children}
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════
// STAGGER REVEAL — Scroll-triggered entrance with blur
// ═══════════════════════════════════════════════════════════════════
export function StaggerReveal({
    children,
    className = '',
    delay = 0,
}: {
    children: React.ReactNode
    className?: string
    delay?: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}
