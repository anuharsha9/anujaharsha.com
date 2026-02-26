'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const ARCHIVE_ITEMS = [
    {
        id: 'kedazzle',
        title: 'Kedazzle',
        subtitle: 'EdTech MVP · Concept to shipped product',
        image: '/images/Kedazzle-cover.png',
        link: '/archive/kedazzle',
        tags: ['0-to-1', 'EdTech'],
    },
    {
        id: 'infinite-analytics',
        title: 'Infinite',
        subtitle: 'All-in-one productivity app · Tasks, notes, goals',
        image: '/images/Infinite-Cover.png',
        link: '/archive/infinite-analytics',
        tags: ['Productivity', 'Mobile App'],
    },
    {
        id: 'travel-portal',
        title: 'Travel Portal',
        subtitle: 'Corporate travel booking platform',
        image: '/images/travel-cover.png',
        link: '/archive/travel-portal',
        tags: ['Enterprise', 'Travel'],
    },
    {
        id: 'crbs',
        title: 'CRBS',
        subtitle: 'Conference Room Booking · Tablet interface for enterprise',
        image: '/images/crbs-cover.png',
        link: '/archive/crbs',
        tags: ['Enterprise UX', 'Tablet'],
    },
    {
        id: 'wordu',
        title: 'WordU',
        subtitle: 'Viral word game · 12,000+ organic downloads in week one',
        image: '/images/wordu-cover.png',
        link: '/archive/wordu',
        tags: ['Game Design', 'Viral Growth'],
    },
    {
        id: 'graphic-design',
        title: 'Early Graphic Design',
        subtitle: 'Logos, print, and brand identity from the early days',
        image: '/images/graphic-cover.png',
        link: '/archive/graphic-design',
        tags: ['Visual Design', 'Brand Identity'],
    },
]

// Group into pairs for slides
const SLIDES = ARCHIVE_ITEMS.reduce<typeof ARCHIVE_ITEMS[]>((acc, item, i) => {
    if (i % 2 === 0) acc.push([item])
    else acc[acc.length - 1].push(item)
    return acc
}, [])

export default function ExtendedPortfolio() {
    const ref = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [activeSlide, setActiveSlide] = useState(0)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const headingY = useTransform(scrollYProgress, [0, 0.3], [80, 0])
    const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
    const headingScale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1])

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget
        const slideWidth = el.offsetWidth
        const idx = Math.round(el.scrollLeft / slideWidth)
        setActiveSlide(Math.min(idx, SLIDES.length - 1))
    }, [])

    const scrollToSlide = useCallback((idx: number) => {
        if (!scrollContainerRef.current) return
        const el = scrollContainerRef.current
        el.scrollTo({ left: idx * el.offsetWidth, behavior: 'smooth' })
    }, [])

    return (
        <section ref={ref} className="relative py-20 md:py-32 overflow-hidden">
            {/* Header */}
            <motion.div
                className="mb-12 md:mb-16 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto"
                style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
            >
                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-white/50 mb-3">
                    2012 — 2022
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                    Extended Portfolio
                </h2>
            </motion.div>

            {/* Apple-style horizontal snap carousel */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {SLIDES.map((pair, slideIdx) => (
                        <div
                            key={slideIdx}
                            className="flex-shrink-0 w-full snap-center px-4 md:px-8 lg:px-12"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-[1440px] mx-auto">
                                {pair.map((item, i) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 40, scale: 0.92 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.8, delay: i * 0.15 }}
                                    >
                                        <Link href={item.link}>
                                            <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/[0.03] cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(47,198,213,0.06)]">
                                                {/* Image with parallax */}
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />

                                                {/* Gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                                                {/* Content */}
                                                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6">
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {item.tags.map(tag => (
                                                            <span
                                                                key={tag}
                                                                className="text-[10px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-white/50 text-sm">
                                                        {item.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-8">
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToSlide(i)}
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{
                            width: i === activeSlide ? 28 : 8,
                            backgroundColor: i === activeSlide ? 'var(--accent-teal)' : 'rgba(255,255,255,0.12)',
                        }}
                    />
                ))}
            </div>
        </section>
    )
}
