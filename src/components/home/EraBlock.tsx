'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Lock, Quote, Linkedin } from 'lucide-react'
import { CareerEra, Testimonial, WorkItem } from '@/data/career-data'
import { getTheme, spacing } from '@/lib/design-system'
import HeroTerminal from '@/components/case-study/HeroTerminal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ImageLightbox from '@/components/case-study/ImageLightbox'
import { ARCHIVE_GALLERY_DATA } from '@/data/archive-gallery'
import ImageComparisonSlider from '@/components/ui/ImageComparisonSlider'
import TerminalInsight from '@/components/case-study/TerminalInsight'

interface EraBlockProps {
    era: CareerEra
    index: number
}

// ════════════════════════════════════════════════════════════════════
// 1. LEGACY TESTIMONIAL CARD (Restored from TestimonialsWall)
// ════════════════════════════════════════════════════════════════════
const LegacyTestimonialCard = ({ review }: { review: Testimonial }) => {
    // Split by sentence delimiters but keep them
    const parts = review.quote.split(/([.!?])/);
    const headline = parts[0] + (parts[1] || "");
    const body = parts.slice(2).join("").trim();

    return (
        <div className="py-8 border-b border-white/10 relative group/testimonial hover:bg-white/5 transition-colors duration-300 rounded-lg px-4 -mx-4">
            {/* Watermark Quote Icon - More subtle in dark mode */}
            <div className="absolute top-6 right-4 text-white/5 group-hover/testimonial:text-[var(--accent-teal)]/10 transition-colors pointer-events-none">
                <Quote className="w-10 h-10" />
            </div>

            {/* Pull Quote / Headline */}
            <div className="relative z-10 mb-6">
                <h3 className="font-serif text-white text-lg leading-relaxed mb-3">
                    &ldquo;{headline}&rdquo;
                </h3>
                {body && (
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 group-hover/testimonial:text-slate-300 transition-colors">
                        {body}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-3 relative z-10">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <p className="font-bold text-white text-sm">{review.name}</p>
                        {review.linkedInProfile && (
                            <Link href={review.linkedInProfile} target="_blank" className="text-slate-500 hover:text-[#0077b5] transition-colors">
                                <Linkedin className="w-3.5 h-3.5" />
                            </Link>
                        )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[var(--accent-teal)] text-[10px] uppercase tracking-wider font-semibold">
                            {review.role}
                        </span>
                        {review.relationship && (
                            <span className="text-slate-500 text-[10px]">• {review.relationship}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ════════════════════════════════════════════════════════════════════
// 2. HERO WORK CARD MOVED TO EXTERNAL COMPONENT
// See: src/components/work/MotionWorkCard.tsx
import { MotionWorkCard } from '@/components/work/MotionWorkCard'

// ════════════════════════════════════════════════════════════════════
// 3. ARCHIVE CARD (Restored from CollapsibleWorkArchive)
// Used for Startup/Consulting eras (Wordu, Kedazzle, etc.)
// ════════════════════════════════════════════════════════════════════
const ArchiveWorkCard = ({ work, onOpenLightbox }: { work: WorkItem; onOpenLightbox: (id: string) => void }) => {
    const hasGallery = !!ARCHIVE_GALLERY_DATA[work.id];

    const handleClick = (e: React.MouseEvent) => {
        if (hasGallery) {
            e.preventDefault();
            onOpenLightbox(work.id);
        }
    };

    return (
        <a
            href={work.link}
            onClick={handleClick}
            target={work.link.startsWith('http') ? "_blank" : "_self"}
            rel={work.link.startsWith('http') ? "noopener noreferrer" : ""}
            className="group/archive relative bg-slate-100 border border-slate-200 rounded-xl overflow-hidden hover:border-[#0BA2B5]/30 hover:shadow-lg transition-all duration-300 block h-full aspect-square cursor-pointer" // Changed to aspect-square
        >
            {/* Preview Image */}
            {work.image && (
                <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover object-top group-hover/archive:scale-105 transition-transform duration-500"
                />
            )}
            {/* Fallback pattern if no image */}
            {!work.image && (
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <span className="font-mono text-xs text-white/20 uppercase tracking-widest">{work.tags[0]}</span>
                </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

            {/* Title + Tags at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-serif text-lg leading-tight mb-2">
                    {work.title}
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {work.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-white/80 font-mono bg-white/10 px-2 py-1 rounded backdrop-blur-sm border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Icon for external links (Articles) */}
            {work.link.startsWith('http') && (
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/10 opacity-0 group-hover/archive:opacity-100 transition-opacity">
                    <ArrowRight className="w-3 h-3 text-white -rotate-45" />
                </div>
            )}
        </a>
    )
}

interface EraBlockProps {
    era: CareerEra
    index: number
    isLast?: boolean
}

export default function EraBlock({ era, index, isLast }: EraBlockProps) {
    // Extract Start Year for Watermark
    const startYear = era.period.split('—')[0].trim();

    // Timeline Interaction refs
    const sectionRef = React.useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Apple-style Micro-animations for Spine (REMOVED - Handled by UnifiedTimelineLayout)
    // const height = useTransform(scrollYProgress, [0, 0.8], ["0%", isLast ? "9rem" : "110%"]); 
    // const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    // Lightbox State
    const [lightboxOpen, setLightboxOpen] = React.useState(false);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [activeProjectImages, setActiveProjectImages] = React.useState<Array<{ src: string, alt: string }>>([]);

    const handleOpenLightbox = (workId: string) => {
        const images = ARCHIVE_GALLERY_DATA[workId];
        if (images && images.length > 0) {
            setActiveProjectImages(images);
            setCurrentImageIndex(0);
            setLightboxOpen(true);
        }
    };

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:pl-24 md:pr-8 border-b border-dashed border-white/5 last:border-0 group/section">

            {/* ════════════════════════════════════════════════════════════════
             TIMELINE SPINE (Apple Style)
            ════════════════════════════════════════════════════════════════ */}
            {/* ════════════════════════════════════════════════════════════════
             TIMELINE SPINE (Handled by UnifiedTimelineLayout)
             Only keeping the Node/Dot here.
            ════════════════════════════════════════════════════════════════ */}
            <div className="absolute left-4 md:left-[30px] top-0 bottom-0 w-1 hidden md:block z-0 pointer-events-none">
                {/* Era Node (Top) */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="absolute top-[8.5rem] -left-[6px] w-4 h-4 rounded-full bg-slate-900 border border-[var(--accent-teal)] shadow-[0_0_10px_rgba(45,212,191,0.6)] z-10 flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-[var(--accent-teal)] rounded-full animate-ping opacity-20" />
                    <div className="w-1.5 h-1.5 bg-[var(--accent-teal)] rounded-full" />
                </motion.div>
            </div>

            {/* Massive Year Watermark */}
            <div className="absolute top-10 right-0 md:right-20 text-[120px] md:text-[240px] font-bold text-white/[0.02] pointer-events-none select-none z-0 font-mono leading-none tracking-tighter mix-blend-overlay transition-opacity duration-700 group-hover/section:text-white/[0.04]">
                {startYear}
            </div>

            {/* ADAPTIVE LAYOUT LOGIC */}
            {/* If we have > 1 testimonial, use the Sidebar Layout (8/4 split). Otherwise, use Full Width Layout. */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">

                {/* ONE MAIN COLUMN for logic simplification, utilizing CSS grid for internal layout if needed */}
                {/* Actually, let's keep the split logic but cleaner */}
                {(() => {
                    const isSidebarLayout = era.testimonials.length > 1 && era.id !== 'csg-architect';

                    return (
                        <>
                            {/* MAIN CONTENT COLUMN */}
                            <div className={`${isSidebarLayout ? "lg:col-span-8" : "lg:col-span-12"} ${era.id === 'origin-story' ? "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start" : ""}`}>
                                {/* Header */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="mb-16 relative"
                                >
                                    {/* Apple Style: Date Badge */}
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-teal)] mr-2 animate-pulse" />
                                        <span className="font-mono text-[var(--accent-teal)] text-[10px] md:text-xs tracking-widest uppercase font-semibold">
                                            {era.period}
                                        </span>
                                    </div>

                                    {/* Apple Style: Clean Sans-Serif Typography */}
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-3 tracking-tight leading-[1.1]">
                                        {era.role}
                                    </h2>

                                    <div className="text-xl md:text-2xl text-slate-400 font-light mb-8 flex items-baseline gap-2">
                                        <span className="text-slate-600 font-normal text-lg">at</span>
                                        <span className="text-slate-200 font-medium">{era.company}</span>
                                    </div>

                                    <p className="text-lg md:text-xl text-slate-400/90 leading-relaxed max-w-2xl font-normal">
                                        {era.description}
                                    </p>
                                </motion.div>

                                {/* Work Items Display */}
                                {era.workItems.length > 0 && (
                                    <>
                                        {era.id === 'csg-architect' ? (
                                            <div className="flex flex-col gap-12 md:gap-16">
                                                {/* 1. Flagship: ReportCaster (Full Width) */}
                                                {era.workItems.filter(w => w.id === 'reportcaster').map((work) => (
                                                    <React.Fragment key={work.id}>
                                                        <motion.div
                                                            className="group/work w-full mb-12"
                                                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                                            viewport={{ once: true, margin: "-50px" }}
                                                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                                        >
                                                            {/* CONTENT (Moved Above Media) */}
                                                            <div className="mb-6 pl-1">
                                                                {/* Status Badge */}
                                                                {work.statusLabel && (
                                                                    <div className="mb-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-mono text-slate-400 group-hover/work:border-[var(--accent-teal)]/30 transition-colors">
                                                                        <span className={`w-1.5 h-1.5 rounded-full ${work.statusLabel?.includes('Live') ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-amber-500'}`} />
                                                                        {work.statusLabel}
                                                                    </div>
                                                                )}

                                                                <div className="flex items-end justify-between">
                                                                    <div>
                                                                        <Link href={work.link} className="block group/title">
                                                                            <h3 className="font-serif text-3xl md:text-4xl text-white group-hover/title:text-[var(--accent-teal)] transition-colors mb-2 leading-tight">
                                                                                {work.title}
                                                                            </h3>
                                                                        </Link>
                                                                        {/* Metric */}
                                                                        {work.metric && (
                                                                            <div className="inline-flex items-baseline gap-2 mt-1">
                                                                                <span className="font-sans text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-teal)] to-blue-400">
                                                                                    <AnimatedCounter value={work.metric} duration={1.2} />
                                                                                </span>
                                                                                <span className="font-medium text-sm text-slate-500 tracking-wide">
                                                                                    {work.metricLabel}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    {work.link !== '#' && (
                                                                        <Link href={work.link} className="mb-2 p-2 rounded-full bg-white/5 border border-white/10 group-hover/work:bg-[var(--accent-teal)]/10 group-hover/work:border-[var(--accent-teal)]/30 transition-all duration-300">
                                                                            <ArrowRight
                                                                                className="w-5 h-5 text-slate-400 group-hover/work:text-[var(--accent-teal)] transition-colors duration-300"
                                                                            />
                                                                        </Link>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* CUSTOM MEDIA: Transformation Slider */}
                                                            <div className="relative rounded-xl overflow-hidden bg-slate-900/50 shadow-sm group-hover/work:shadow-2xl group-hover/work:shadow-[var(--accent-teal)]/10 transition-all duration-500 border border-white/5 group-hover/work:border-[var(--accent-teal)]/20">
                                                                <ImageComparisonSlider
                                                                    beforeImage="/images/case-study/ReportCaster/Before.png"
                                                                    afterImage="/images/case-study/ReportCaster/After.png"
                                                                    beforeLabel="LEGACY"
                                                                    afterLabel="MODERN"
                                                                    beforeTitle="rc_legacy.exe"
                                                                    afterTitle="rc_modern.tsx"
                                                                    aspectRatio="aspect-video"
                                                                />

                                                                {/* Locked Badge (Just in case, though usually unlocked) */}
                                                                {work.locked && (
                                                                    <div className="absolute top-4 right-4 z-10">
                                                                        <div className="bg-black/60 backdrop-blur-md rounded-full p-2 border border-white/10">
                                                                            <Lock className="w-4 h-4 text-white/70" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    </React.Fragment>
                                                ))}

                                                {/* 2. Director's Quote (Dave Pfeiffer) */}
                                                {era.testimonials.filter(t => t.name.includes('Dave Pfeiffer')).map(review => (
                                                    <motion.div
                                                        key={review.id}
                                                        className="border-y border-dashed border-white/10 py-12"
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true, margin: "-50px" }}
                                                        transition={{ duration: 0.8, delay: 0.2 }}
                                                    >
                                                        <span className="text-slate-500 text-[10px] uppercase tracking-widest font-mono mb-8 block pl-1">Endorsement</span>
                                                        <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-2xl relative overflow-hidden group/quote">
                                                            <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover/quote:text-[var(--accent-teal)]/10 transition-colors" />
                                                            <blockquote className="relative z-10">
                                                                <p className="font-serif text-2xl md:text-3xl text-slate-200 leading-relaxed mb-6">
                                                                    &ldquo;{review.quote}&rdquo;
                                                                </p>
                                                                <cite className="not-italic flex items-center gap-4">
                                                                    <div className="flex flex-col">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-white font-bold text-lg">{review.name}</span>
                                                                            {review.linkedInProfile && (
                                                                                <Link href={review.linkedInProfile} target="_blank" className="text-slate-500 hover:text-[#0077b5] transition-colors">
                                                                                    <Linkedin className="w-4 h-4" />
                                                                                </Link>
                                                                            )}
                                                                        </div>
                                                                        <span className="text-[var(--accent-teal)] font-mono text-xs uppercase tracking-wider">{review.role}, {review.company}</span>
                                                                    </div>
                                                                </cite>
                                                            </blockquote>
                                                        </div>
                                                    </motion.div>
                                                ))}

                                                {/* 3. Secondary: ML & DSML (2 Columns) */}
                                                <motion.div
                                                    initial="hidden"
                                                    whileInView="show"
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    variants={{
                                                        hidden: {},
                                                        show: {
                                                            transition: {
                                                                staggerChildren: 0.2
                                                            }
                                                        }
                                                    }}
                                                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                                                >
                                                    {era.workItems.filter(w => w.id === 'ml-functions' || w.id === 'iq-plugin').map(work => (
                                                        <motion.div
                                                            key={work.id}
                                                            variants={{
                                                                hidden: { opacity: 0, y: 30, scale: 0.95 },
                                                                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                                                            }}
                                                        >
                                                            <MotionWorkCard
                                                                work={work.id === 'iq-plugin' ? { ...work, locked: false } : work}
                                                            />
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            </div>
                                        ) : (
                                            <motion.div
                                                initial="hidden"
                                                whileInView="show"
                                                viewport={{ once: true, margin: "-100px" }}
                                                variants={{
                                                    hidden: {},
                                                    show: {
                                                        transition: {
                                                            staggerChildren: 0.1
                                                        }
                                                    }
                                                }}
                                                className={
                                                    isSidebarLayout
                                                        ? "flex flex-col gap-12 md:gap-20"
                                                        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                                                }
                                            >
                                                {era.workItems.map((work) => (
                                                    <motion.div
                                                        key={work.id}
                                                        variants={{
                                                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                                                            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                                                        }}
                                                    >
                                                        {era.id === 'agency-startup' || era.id === 'consultant-tech' ? (
                                                            <ArchiveWorkCard work={work} onOpenLightbox={handleOpenLightbox} />
                                                        ) : (
                                                            <MotionWorkCard work={work} />
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </>
                                )}

                                {/* Single Testimonial (Full Mode Only - Standard Era) */}
                                {!isSidebarLayout && era.id !== 'csg-architect' && era.testimonials.length === 1 && (
                                    <motion.div
                                        className="mt-20 border-t border-white/5 pt-12"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <span className="text-slate-500 text-[10px] uppercase tracking-widest font-mono mb-8 block">Endorsement</span>
                                        <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-2xl relative overflow-hidden group/quote">
                                            <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover/quote:text-[var(--accent-teal)]/10 transition-colors" />
                                            <blockquote className="relative z-10">
                                                <p className="font-serif text-2xl md:text-3xl text-slate-200 leading-relaxed mb-6">
                                                    &ldquo;{era.testimonials[0].quote}&rdquo;
                                                </p>
                                                <cite className="not-italic flex items-center gap-4">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white font-bold text-lg">{era.testimonials[0].name}</span>
                                                            {era.testimonials[0].linkedInProfile && (
                                                                <Link href={era.testimonials[0].linkedInProfile} target="_blank" className="text-slate-500 hover:text-[#0077b5] transition-colors">
                                                                    <Linkedin className="w-4 h-4" />
                                                                </Link>
                                                            )}
                                                        </div>
                                                        <span className="text-[var(--accent-teal)] font-mono text-xs uppercase tracking-wider">{era.testimonials[0].role}, {era.testimonials[0].company}</span>
                                                    </div>
                                                </cite>
                                            </blockquote>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ORIGIN STORY: FOUNDATIONS TERMINAL */}
                                {era.id === 'origin-story' && era.foundations && (
                                    <div className="mt-8 lg:mt-0 w-full mx-auto lg:mx-0">
                                        <TerminalInsight
                                            title="kernel_init.sh"
                                            className="shadow-2xl"
                                        >
                                            <div className="relative z-10">
                                                <div className="text-[var(--accent-teal)] mb-6 typing-effect">
                                                    &gt; INITIALIZING_CREATIVE_KERNEL...
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-4 text-slate-400">
                                                    {era.foundations.map((tool, i) => (
                                                        <div key={i} className="flex items-center gap-3">
                                                            <div className="w-1.5 h-1.5 bg-[var(--accent-teal)] rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                                                            <span>LOADED_MODULE: <span className="text-white font-bold">{tool}</span></span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-6 text-[var(--accent-teal)] animate-blink text-lg">_</div>
                                            </div>
                                        </TerminalInsight>
                                    </div>
                                )}
                            </div>

                            {/* SIDEBAR COLUMN (Only for Sidebar Layout) */}
                            {isSidebarLayout && (
                                <div className="lg:col-span-4 flex flex-col gap-16 pt-10 md:pt-32">
                                    {/* Testimonials List */}
                                    {era.testimonials.length > 0 && (
                                        <div className="flex flex-col gap-6">
                                            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-mono mb-1 hidden lg:block">The Proof</span>
                                            <div className="grid grid-cols-1 gap-4">
                                                {era.testimonials.map((review, idx) => (
                                                    <motion.div
                                                        key={review.id}
                                                        initial={{ opacity: 0, y: 40 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: 0.2 + (idx * 0.1), duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                                                        className="h-full"
                                                    >
                                                        <LegacyTestimonialCard review={review} />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {/* Note: Articles removed from sidebar as requested */}
                                </div>
                            )}
                        </>
                    );
                })()}

            </div>

            {/* CSG Era: Articles (Horizontal Layout below everything - FULL WIDTH) */}
            {era.articles && era.articles.length > 0 && (
                <div className="mt-20 pt-12 border-t border-dashed border-white/5 w-full relative z-10">
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest font-mono mb-8 block pl-1 text-[var(--accent-teal)]">Selected Writing</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
                        {era.articles.map((article) => (
                            <Link key={article.id} href={article.link} target="_blank" className="group/article flex md:block lg:flex gap-6 items-start">
                                <div className="w-32 md:w-full lg:w-48 aspect-video relative rounded-lg overflow-hidden shrink-0 border border-white/5">
                                    <Image src={article.image} alt={article.title} fill className="object-cover transform transition-transform duration-500 group-hover/article:scale-105" />
                                </div>
                                <div>
                                    <h5 className="text-white font-serif text-xl leading-tight group-hover/article:text-[var(--accent-teal)] transition-colors mb-2 mt-1">{article.title}</h5>
                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">{article.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* CSG: OTHER TESTIMONIALS (Moved to bottom as requested) */}
            {era.id === 'csg-architect' && (
                <div className="w-full relative z-10 transition-opacity duration-1000">
                    {/* Filter out Dave Pfeiffer who is already shown above */}
                    {era.testimonials.filter(t => !t.name.includes('Dave Pfeiffer')).length > 0 && (
                        <div className="mt-24 pt-12 border-t border-white/5">
                            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-mono mb-8 block pl-1">Team Feedback</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {era.testimonials.filter(t => !t.name.includes('Dave Pfeiffer')).map((review, idx) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{
                                            duration: 0.8,
                                            delay: idx * 0.1,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                        className="h-full"
                                    >
                                        <LegacyTestimonialCard review={review} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ════════════════════════════════════════════════════════════════
             BOTTOM: LIFE TIMELINE (Horizontal)
             ════════════════════════════════════════════════════════════════ */}
            {era.milestones && era.milestones.length > 0 && (
                <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-dashed border-white/5 relative z-10">
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest font-mono mb-8 block pl-1">
                        {era.id === 'origin-story' ? 'Timeline' : 'Life Context'}
                    </span>

                    {/* TERMINATOR: For the last block, put a dot here and block the rest of the spine */}
                    {isLast && (
                        <div className="absolute -left-[22px] md:-left-[66px] top-12 pointer-events-none z-30 hidden md:block">
                            {/* The Terminal Dot - Animated to match others */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="relative w-4 h-4 rounded-full bg-[var(--accent-teal)] shadow-[0_0_12px_var(--accent-teal)]"
                            >
                                <div className="absolute inset-0 animate-ping rounded-full bg-[var(--accent-teal)] opacity-50"></div>
                            </motion.div>

                            {/* The Blocker (Hides spine below dot) */}
                            {/* Wide enough to cover spine glow, but narrow enough not to cover content */}
                            {/* Reduced from w-32 to w-12 to avoid covering "BA in Animation" */}
                            <div className="absolute top-3 -left-4 w-12 h-[500px] bg-[#020617]" />
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 md:overflow-x-auto pt-6 pb-8 md:-mx-8 md:px-8 md:scrollbar-hide md:mask-linear-fade">
                        {era.milestones.map((milestone, idx) => {
                            const IconComp = milestone.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (idx * 0.1), duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="flex flex-row md:flex-col gap-4 md:min-w-[240px] group/timeline relative cursor-pointer"
                                >
                                    {/* DESKTOP: Connection Line Visual */}
                                    <div className="absolute top-[19px] -left-16 w-16 h-px bg-white/5 hidden md:block" />

                                    {/* MOBILE: Vertical Line Visual */}
                                    {idx !== (era.milestones?.length || 0) - 1 && (
                                        <div className="absolute top-12 left-[19px] bottom-[-32px] w-px bg-white/10 md:hidden" />
                                    )}

                                    <div className="flex items-center gap-4 text-slate-500 group-hover/timeline:text-[var(--accent-teal)] transition-colors relative z-10">
                                        <div className="p-2 rounded-full border border-white/5 bg-slate-900/50 group-hover/timeline:border-[var(--accent-teal)]/50 group-hover/timeline:bg-[var(--accent-teal)]/10 group-hover/timeline:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300">
                                            {typeof IconComp === 'string' ? (
                                                <span className="text-xl">{IconComp}</span>
                                            ) : (
                                                IconComp && <IconComp className="w-5 h-5" />
                                            )}
                                        </div>
                                        {/* Dot on line - Desktop Only */}
                                        <div className="hidden md:block h-1.5 w-1.5 rounded-full bg-white/20 group-hover/timeline:bg-[var(--accent-teal)] transition-colors" />
                                    </div>

                                    <div>
                                        <span className="font-mono text-[var(--accent-teal)] text-[10px] uppercase tracking-wider block mb-1 opacity-80">
                                            {milestone.year}
                                        </span>
                                        <h4 className="text-white font-serif text-lg leading-tight mb-1 group-hover/timeline:text-white transition-colors">
                                            {milestone.title}
                                        </h4>
                                        {milestone.subtitle && (
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                {milestone.subtitle}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Lightbox Component */}
            <ImageLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                imageSrc={activeProjectImages[currentImageIndex]?.src || ''}
                imageAlt={activeProjectImages[currentImageIndex]?.alt || ''}
                images={activeProjectImages}
                currentIndex={currentImageIndex}
                onNavigate={setCurrentImageIndex}
            />
        </section >
    )
}
