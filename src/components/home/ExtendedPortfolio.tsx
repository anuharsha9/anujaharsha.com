'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import SystemLightbox from '@/components/ui/SystemLightbox'

/* ─── Archive image maps — generated from public/images/archive/ ─── */
const ARCHIVE_IMAGES: Record<string, string[]> = {
    kedazzle: Array.from({ length: 16 }, (_, i) =>
        `/images/archive/kedazzle/Case Study Kedazzle_Page_${String(i + 1).padStart(2, '0')}.png`
    ),
    'infinite-analytics': Array.from({ length: 11 }, (_, i) =>
        `/images/archive/infinite-analytics/Infinite case study${i + 1}.png`
    ),
    'travel-portal': Array.from({ length: 6 }, (_, i) =>
        `/images/archive/travel-portal/Travel Portal${i + 1}.png`
    ),
    wordu: Array.from({ length: 9 }, (_, i) =>
        `/images/archive/wordu/Wordu case study${i + 1}.png`
    ),
    crbs: Array.from({ length: 10 }, (_, i) =>
        `/images/archive/crbs/CRBS case study${i + 1}.png`
    ),
    'graphic-design': Array.from({ length: 13 }, (_, i) =>
        `/images/archive/graphic-design/graphic design portfolio${i + 1}.png`
    ),
}

/* ─── Testimonial data ─── */
const TESTIMONIALS = {
    radhika: {
        quote: 'Smart and very attuned to user needs, she \u2018just gets it\u2019 and developed intuitive designs that were very well received by our end users.',
        name: 'Radhika Tekumalla',
        role: 'Founder · Kedazzle (EdTech)',
        initial: 'R',
    },
    vikram: {
        quote: 'She quickly became the designer we trusted for everything. By the time she moved on, she was operating at a level far beyond her experience, ready for enterprise-grade work.',
        name: 'Vikram Patel',
        role: 'Co-Founder & CEO · 9P Studioz',
        initial: 'V',
    },
}

/* ─── Slide types ─── */
type ProjectItem = {
    type: 'project'
    id: string
    title: string
    subtitle: string
    image: string
    archiveKey: string
    tags: string[]
}

type QuoteItem = {
    type: 'quote'
    id: string
    quote: string
    name: string
    role: string
    initial: string
}

type SlideItem = ProjectItem | QuoteItem

/* ─── Ordered slides: project + quote or project + project ─── */
const SLIDES: SlideItem[][] = [
    // Slide 1: Kedazzle + Radhika
    [
        {
            type: 'project',
            id: 'kedazzle',
            title: 'Kedazzle',
            subtitle: 'EdTech MVP · Concept to shipped product',
            image: '/images/Kedazzle-cover.png',
            archiveKey: 'kedazzle',
            tags: ['0-to-1', 'EdTech'],
        },
        { type: 'quote', id: 'radhika', ...TESTIMONIALS.radhika },
    ],
    // Slide 2: Infinite + Travel Portal
    [
        {
            type: 'project',
            id: 'infinite-analytics',
            title: 'Infinite',
            subtitle: 'All-in-one productivity app · Tasks, notes, goals',
            image: '/images/Infinite-Cover.png',
            archiveKey: 'infinite-analytics',
            tags: ['Productivity', 'Mobile App'],
        },
        {
            type: 'project',
            id: 'travel-portal',
            title: 'Travel Portal',
            subtitle: 'Corporate travel booking platform',
            image: '/images/travel-cover.png',
            archiveKey: 'travel-portal',
            tags: ['Enterprise', 'Travel'],
        },
    ],
    // Slide 3: WordU + Vikram
    [
        {
            type: 'project',
            id: 'wordu',
            title: 'WordU',
            subtitle: 'Viral word game · 12,000+ organic downloads in week one',
            image: '/images/wordu-cover.png',
            archiveKey: 'wordu',
            tags: ['Game Design', 'Viral Growth'],
        },
        { type: 'quote', id: 'vikram', ...TESTIMONIALS.vikram },
    ],
    // Slide 4: CRBS + Graphic Design
    [
        {
            type: 'project',
            id: 'crbs',
            title: 'CRBS',
            subtitle: 'Conference Room Booking · Tablet interface for enterprise',
            image: '/images/crbs-cover.png',
            archiveKey: 'crbs',
            tags: ['Enterprise UX', 'Tablet'],
        },
        {
            type: 'project',
            id: 'graphic-design',
            title: 'Early Graphic Design',
            subtitle: 'Logos, print, and brand identity from the early days',
            image: '/images/graphic-cover.png',
            archiveKey: 'graphic-design',
            tags: ['Visual Design', 'Brand Identity'],
        },
    ],
]

/* ─── Quote card component ─── */
function QuoteCard({ item }: { item: QuoteItem }) {
    return (
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--accent-teal)]/[0.08] bg-[var(--accent-teal)]/[0.03] flex flex-col justify-center p-6 md:p-8">
            <p className="text-zinc-200 text-sm md:text-[15px] leading-relaxed mb-5 italic">
                &ldquo;{item.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--accent-teal)]/15 flex items-center justify-center text-[var(--accent-teal)] text-xs font-bold shrink-0">
                    {item.initial}
                </div>
                <div>
                    <p className="text-zinc-100 text-sm font-semibold">{item.name}</p>
                    <p className="text-zinc-600 text-[11px] font-mono">{item.role}</p>
                </div>
            </div>
        </div>
    )
}

/* ─── Project card component ─── */
function ProjectCard({ item, onOpen }: { item: ProjectItem; onOpen: (archiveKey: string, title: string) => void }) {
    return (
        <button onClick={() => onOpen(item.archiveKey, item.title)} className="text-left w-full">
            <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/[0.03] cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(47,198,213,0.06)]">
                {/* Image with cinematic desaturation — restores on hover */}
                <div className="absolute inset-0 transition-[filter] duration-700 grayscale-[0.3] brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-[10px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-500"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-white text-lg md:text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-zinc-500 text-sm">{item.subtitle}</p>
                </div>
            </div>
        </button>
    )
}

/* ─── Main component ─── */
export default function ExtendedPortfolio() {
    const ref = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [activeSlide, setActiveSlide] = useState(0)

    /* ── Image slideshow lightbox state ── */
    const [lightbox, setLightbox] = useState<{ images: string[]; title: string; index: number } | null>(null)

    const openSlideshow = useCallback((archiveKey: string, title: string) => {
        const images = ARCHIVE_IMAGES[archiveKey]
        if (images) setLightbox({ images, title, index: 0 })
    }, [])

    const closeLightbox = useCallback(() => setLightbox(null), [])
    const goNext = useCallback(() => setLightbox(prev => prev ? { ...prev, index: Math.min(prev.index + 1, prev.images.length - 1) } : null), [])
    const goPrev = useCallback(() => setLightbox(prev => prev ? { ...prev, index: Math.max(prev.index - 1, 0) } : null), [])

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
        <motion.section ref={ref} id="extended-portfolio" className="relative pt-10 pb-20 md:pt-16 md:pb-32 overflow-hidden">
            {/* Era label — decorative, above content */}
            <motion.div
                className="mb-6 md:mb-8 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto pointer-events-none select-none"
                aria-hidden="true"
                initial={{ opacity: 0, x: -40, filter: 'blur(20px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="font-extrabold text-[clamp(2rem,6vw,7rem)] text-white/[0.03] uppercase tracking-tighter leading-none block">
                    2012 — 2022
                </span>
            </motion.div>

            {/* Header */}
            <motion.div
                className="mb-12 md:mb-16 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto"
                style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
            >
                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-zinc-500 mb-3">
                    2012 — 2022
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                    Extended Portfolio
                </h2>
            </motion.div>

            {/* Carousel */}
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
                                        initial={{ opacity: 0, y: 40, scale: 0.92, filter: 'blur(16px)' }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 1.2, delay: i * 0.2 }}
                                    >
                                        {item.type === 'project' ? (
                                            <ProjectCard item={item} onOpen={openSlideshow} />
                                        ) : (
                                            <QuoteCard item={item} />
                                        )}
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
                        aria-label={`Go to slide ${i + 1} of ${SLIDES.length}`}
                        className="relative flex items-center justify-center min-w-[44px] min-h-[44px]"
                    >
                        <span
                            className="h-1.5 rounded-full transition-all duration-500 block"
                            style={{
                                width: i === activeSlide ? 28 : 8,
                                backgroundColor: i === activeSlide ? 'var(--accent-teal)' : 'rgba(255,255,255,0.12)',
                            }}
                        />
                    </button>
                ))}
            </div>

            {/* ── Archive slideshow lightbox ── */}
            {lightbox && (
                <SystemLightbox
                    isOpen={true}
                    onClose={closeLightbox}
                    title={`${lightbox.title} — ${lightbox.index + 1} / ${lightbox.images.length}`}
                    onNext={lightbox.index < lightbox.images.length - 1 ? goNext : undefined}
                    onPrev={lightbox.index > 0 ? goPrev : undefined}
                >
                    <div className="flex items-center justify-center w-full h-full min-h-[50vh]">
                        <Image
                            src={lightbox.images[lightbox.index]}
                            alt={`${lightbox.title} — slide ${lightbox.index + 1}`}
                            width={1200}
                            height={800}
                            className="max-w-full max-h-[75vh] object-contain rounded-lg"
                        />
                    </div>
                </SystemLightbox>
            )}
        </motion.section>
    )
}
