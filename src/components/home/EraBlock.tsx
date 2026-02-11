'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Lock, Quote, Linkedin } from 'lucide-react'
import { CareerEra, Testimonial, WorkItem } from '@/data/career-data'
import { getTheme, spacing } from '@/lib/design-system'
import HeroTerminal from '@/components/case-study/HeroTerminal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ImageLightbox from '@/components/case-study/ImageLightbox'
import { ARCHIVE_GALLERY_DATA } from '@/data/archive-gallery'
import TransformationShowcase from '@/components/home/TransformationShowcase'

interface EraBlockProps {
    era: CareerEra
    index: number
}

// ════════════════════════════════════════════════════════════════════
// 1. LEGACY TESTIMONIAL CARD (Restored from TestimonialsWall)
// ════════════════════════════════════════════════════════════════════
const LegacyTestimonialCard = ({ review }: { review: Testimonial }) => {
    return (
        <div className="py-8 border-b border-white/10 relative group/testimonial hover:bg-white/5 transition-colors duration-300 rounded-lg px-4 -mx-4">
            {/* Watermark Quote Icon - More subtle in dark mode */}
            <div className="absolute top-6 right-4 text-white/5 group-hover/testimonial:text-[var(--accent-teal)]/10 transition-colors pointer-events-none">
                <Quote className="w-10 h-10" />
            </div>

            {/* Pull Quote / Headline */}
            <div className="relative z-10 mb-6">
                <h3 className="font-serif text-white text-lg leading-relaxed mb-3">
                    &ldquo;{review.quote.split('.')[0]}.&rdquo;
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 group-hover/testimonial:text-slate-300 transition-colors">
                    {review.quote}
                </p>
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
// 2. HERO WORK CARD (Restored from WorkGrid)
// Used for CSG Era items (ReportCaster, ML Functions, etc.)
// ════════════════════════════════════════════════════════════════════
const HeroWorkCard = ({ work }: { work: WorkItem }) => {
    const isExternal = work.link === '#'
    const [hovered, setHovered] = React.useState(false)

    return (
        <React.Fragment>
            <Link
                href={work.link}
                className={`block group/work ${isExternal ? 'cursor-default pointer-events-none' : ''}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Media Container - Floating, no card borders */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900/50 shadow-sm group-hover/work:shadow-2xl group-hover/work:shadow-[var(--accent-teal)]/10 transition-all duration-500 border border-white/5 group-hover/work:border-[var(--accent-teal)]/20">

                    {/* VIDEO Support (ReportCaster) */}
                    {work.video ? (
                        <video
                            src={work.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/work:opacity-100 transition-opacity duration-500"
                        />
                    ) : (
                        /* HeroTerminal fallback for others */
                        <div className="w-full h-full bg-slate-800/50 pt-6 pl-6">
                            <div className="w-full h-full transform transition-transform duration-500 group-hover/work:-translate-y-2 group-hover/work:-translate-x-2">
                                <HeroTerminal
                                    imageSrc={work.image}
                                    fileName={work.fileName || 'app.tsx'}
                                    accentColor={work.accentColor || '#64748b'}
                                    alt={work.title}
                                />
                            </div>
                        </div>
                    )}

                    {/* Locked Badge */}
                    {work.locked && (
                        <div className="absolute top-4 right-4 z-10">
                            <div className="bg-black/60 backdrop-blur-md rounded-full p-2 border border-white/10">
                                <Lock className="w-4 h-4 text-white/70" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Content - Below Media (No Card) */}
                <div className="mt-6 pl-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-serif text-2xl text-white group-hover/work:text-[var(--accent-teal)] transition-colors mb-2">
                                {work.title}
                            </h3>
                            {/* Metric - Floating next to title or below */}
                            {work.metric && (
                                <div className="inline-flex items-baseline gap-2 mb-3">
                                    <span className="font-mono text-lg font-bold text-[var(--accent-teal)]">
                                        <AnimatedCounter value={work.metric} duration={1.2} />
                                    </span>
                                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider border-l border-white/10 pl-2">
                                        {work.metricLabel}
                                    </span>
                                </div>
                            )}
                        </div>

                        {!isExternal && (
                            <ArrowRight
                                className={`w-5 h-5 text-slate-500 group-hover/work:text-[var(--accent-teal)] transition-all duration-300 mt-1 ${hovered ? 'translate-x-1' : ''
                                    }`}
                            />
                        )}
                    </div>

                    <p className="text-slate-400 text-base leading-relaxed max-w-xl group-hover/work:text-slate-300 transition-colors">
                        {work.description}
                    </p>
                </div>
            </Link>
        </React.Fragment>
    )
}

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


export default function EraBlock({ era, index }: EraBlockProps) {
    // Extract Start Year for Watermark
    const startYear = era.period.split('—')[0].trim();

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
        <section className="relative py-24 md:py-32 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 border-b border-dashed border-white/5 last:border-0 group/section">
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
                    const isSidebarLayout = era.testimonials.length > 1;

                    return (
                        <>
                            {/* MAIN CONTENT COLUMN */}
                            <div className={`${isSidebarLayout ? "lg:col-span-8" : "lg:col-span-12"} ${era.id === 'origin-story' ? "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start" : ""}`}>
                                {/* Header */}
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="mb-16 relative"
                                >
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <div className="h-px w-8 bg-[var(--accent-teal)]/50 hidden md:block" />
                                        <span className="font-mono text-[var(--accent-teal)] text-sm tracking-widest uppercase">
                                            {era.period}
                                        </span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
                                        {era.role} <span className="text-slate-600 block text-2xl md:text-3xl mt-2 italic">@ {era.company}</span>
                                    </h2>
                                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6">
                                        {era.description}
                                    </p>
                                </motion.div>

                                {/* Work Items Display */}
                                {era.workItems.length > 0 && (
                                    <div className={
                                        isSidebarLayout
                                            ? "flex flex-col gap-12 md:gap-20"
                                            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                                    }>
                                        {era.workItems.map((work) => (
                                            era.id === 'agency-startup' || era.id === 'consultant-tech' ? (
                                                <ArchiveWorkCard key={work.id} work={work} onOpenLightbox={handleOpenLightbox} />
                                            ) : (
                                                <HeroWorkCard key={work.id} work={work} />
                                            )
                                        ))}
                                    </div>
                                )}

                                {/* Single Testimonial (Full Mode Only) */}
                                {!isSidebarLayout && era.testimonials.length === 1 && (
                                    <div className="mt-20 border-t border-white/5 pt-12">
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
                                    </div>
                                )}

                                {/* ORIGIN STORY: FOUNDATIONS TERMINAL */}
                                {era.id === 'origin-story' && era.foundations && (
                                    <div className="mt-8 lg:mt-0 p-8 border border-white/10 bg-black/40 rounded-sm font-mono text-sm w-full backdrop-blur-sm relative overflow-hidden group/terminal mx-auto lg:mx-0">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent bg-[length:100%_4px] pointer-events-none" />
                                        <div className="flex gap-2 mb-6 border-b border-white/10 pb-4 relative z-10">
                                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                        </div>
                                        <div className="text-[var(--accent-teal)] mb-6 typing-effect relative z-10">
                                            &gt; INITIALIZING_CREATIVE_KERNEL...
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-4 text-slate-400 relative z-10">
                                            {era.foundations.map((tool, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 bg-[var(--accent-teal)] rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                                                    <span>LOADED_MODULE: <span className="text-white font-bold">{tool}</span></span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 text-[var(--accent-teal)] animate-blink text-lg">_</div>
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

            {/* Transformation Showcase - CSG Era Only (FULL WIDTH) */}
            {era.id === 'csg-architect' && (
                <div className="mt-20 mb-20 md:mt-28 md:mb-28 w-full relative z-10 transition-opacity duration-1000">
                    <TransformationShowcase />
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
