'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate, useSpring, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
    {
        id: 'vijay-raman',
        name: 'Vijay Raman',
        role: 'VP of Product Management',
        quote: 'She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams. Any team would be lucky to have her.',
        isPrimary: true,
    },
    {
        id: 'dave-pfeiffer',
        name: 'Dave Pfeiffer',
        role: 'Director of Design',
        quote: "She approaches her work with a fearless attitude and is never afraid to explore new ideas or directions. Anuja is willing to take on difficult problems and push for creative solutions, even under tight timelines.",
        isPrimary: true,
    },
    {
        id: 'marcus-horbach',
        name: 'Marcus Horbach, Ph.D.',
        role: 'Principal Data Scientist',
        quote: 'The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive. Her design solutions are rooted in a deep understanding of the purpose of the product.',
    },
    {
        id: 'yingchun-chen',
        name: 'Yingchun Chen',
        role: 'Principal System Software Engineer',
        quote: "From the start, she impressed everyone with how quickly she grasped all aspects of a highly intricate system. She's the kind of UX leader any team would be lucky to have.",
    },
    {
        id: 'karishma-khadge',
        name: 'Karishma Khadge',
        role: 'Senior Product Manager',
        quote: 'Her design thinking workshops and prototype walkthroughs often became the foundation for key product decisions, driving clarity and alignment across cross-functional teams.',
    },
    {
        id: 'anita-george',
        name: 'Anita George',
        role: 'Principal Account Technology Strategist',
        quote: 'Anticipating the next move of the user, that is next level UI! Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels.',
    },
]

const CYCLE_DURATION = 6000 // ms per testimonial

export default function TestimonialsBlock() {
    const ref = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const headingY = useTransform(scrollYProgress, [0, 0.3], [30, 0])
    const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
    const headingScale = useTransform(scrollYProgress, [0, 0.3], [0.98, 1])

    // Blur-to-focus entrance
    const rawSectionBlur = useTransform(scrollYProgress, [0, 0.12], [12, 0])
    const sectionBlur = useSpring(rawSectionBlur, { stiffness: 100, damping: 20, mass: 0.5 })
    const sectionFilter = useMotionTemplate`blur(${sectionBlur}px)`

    // Auto-cycle
    useEffect(() => {
        if (isPaused) return
        const timer = setInterval(() => {
            setActive(prev => (prev + 1) % TESTIMONIALS.length)
        }, CYCLE_DURATION)
        return () => clearInterval(timer)
    }, [isPaused])

    const goTo = useCallback((idx: number) => {
        setActive(idx)
        setIsPaused(true)
        // Resume auto-cycle after 10s of inactivity
        const timer = setTimeout(() => setIsPaused(false), 10000)
        return () => clearTimeout(timer)
    }, [])

    const t = TESTIMONIALS[active]

    return (
        <motion.section ref={ref} className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-hidden" style={{ filter: sectionFilter }}>
            {/* Era label — decorative */}
            <motion.div
                className="mb-6 md:mb-8 pointer-events-none select-none"
                aria-hidden="true"
                initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="font-extrabold text-[clamp(2rem,6vw,7rem)] text-white/[0.03] uppercase tracking-tighter leading-none block">
                    SOCIAL PROOF
                </span>
            </motion.div>

            {/* Header */}
            <motion.div
                className="mb-10 md:mb-14"
                style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
            >
                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-white/50 mb-3">
                    Social Proof
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                    What they say
                    <span className="text-white/40 font-normal"> — CSG colleagues</span>
                </h2>
            </motion.div>

            {/* Cinematic single-quote display */}
            <div
                className="relative min-h-[200px] md:min-h-[180px]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-4xl"
                    >
                        {/* Quote — hero typography */}
                        <blockquote className="text-xl md:text-2xl lg:text-[28px] font-light leading-relaxed text-white/85 tracking-tight mb-8">
                            <span className="text-[var(--accent-teal)]/60">&ldquo;</span>
                            {t.quote}
                            <span className="text-[var(--accent-teal)]/60">&rdquo;</span>
                        </blockquote>

                        {/* Attribution */}
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                                ${t.isPrimary
                                    ? 'bg-[var(--accent-teal)]/15 text-[var(--accent-teal)]'
                                    : 'bg-white/[0.06] text-white/50'
                                }`}>
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-white/90 text-sm font-semibold">{t.name}</p>
                                <p className="text-white/40 text-xs font-mono">{t.role}</p>
                            </div>
                            {t.isPrimary && (
                                <span className="ml-2 text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--accent-teal)]/50 bg-[var(--accent-teal)]/[0.06] px-2 py-0.5 rounded-full">
                                    Featured
                                </span>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress dots — interactive */}
            <div className="flex items-center gap-2 mt-8">
                {TESTIMONIALS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="relative h-1.5 rounded-full transition-all duration-500 overflow-hidden"
                        style={{
                            width: i === active ? 32 : 8,
                            backgroundColor: i === active ? 'transparent' : 'rgba(255,255,255,0.1)',
                        }}
                        aria-label={`Go to testimonial ${i + 1}`}
                    >
                        {i === active && (
                            <>
                                {/* Background track */}
                                <div className="absolute inset-0 bg-white/10 rounded-full" />
                                {/* Animated fill — represents time remaining */}
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-[var(--accent-teal)] rounded-full"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: CYCLE_DURATION / 1000, ease: 'linear' }}
                                    key={`fill-${active}`}
                                />
                            </>
                        )}
                    </button>
                ))}
                <span className="ml-3 text-[10px] font-mono text-white/25">
                    {active + 1} / {TESTIMONIALS.length}
                </span>
            </div>
        </motion.section>
    )
}
