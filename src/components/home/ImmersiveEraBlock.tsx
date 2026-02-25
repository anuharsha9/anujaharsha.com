'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Quote, Linkedin, Code2, Zap, Play } from 'lucide-react'
import { CareerEra, WorkItem } from '@/data/career-data'
import { MotionWorkCard } from '@/components/work/MotionWorkCard'
import ImageLightbox from '@/components/case-study/ImageLightbox'
import { ARCHIVE_GALLERY_DATA } from '@/data/archive-gallery'
import FoundationsTerminal from '@/components/case-study/FoundationsTerminal'
import WordGameLightbox from '@/components/work/wordu/WordGameLightbox'

interface ImmersiveEraBlockProps {
    era: CareerEra
    index: number
    isLast?: boolean
}

// Icon map for skill badges
const SKILL_ICONS: Record<string, React.ElementType> = {
    code: Code2,
    zap: Zap,
}

// Archive Card Component - Same visual size as MotionWorkCard
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
            className="group/archive relative bg-slate-900/60 border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.15] hover:shadow-xl hover:shadow-black/30 transition-all duration-300 block h-full aspect-square cursor-pointer"
        >
            {work.image && (
                <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover object-top group-hover/archive:scale-105 transition-transform duration-500"
                />
            )}
            {!work.image && (
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <span className="font-mono text-xs text-white/20 uppercase tracking-widest">{work.tags[0]}</span>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-sans font-bold text-lg leading-tight mb-2">
                    {work.title}
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {work.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-white/70 font-mono bg-white/[0.08] px-2 py-1 rounded backdrop-blur-sm border border-white/[0.06]">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            {work.link.startsWith('http') && (
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/10 opacity-0 group-hover/archive:opacity-100 transition-opacity">
                    <ArrowRight className="w-3 h-3 text-white -rotate-45" />
                </div>
            )}
        </a>
    )
}

// Special Game Card for WordU - Larger, interactive, "Play" focused
const WordUGameCard = ({ work, onPlay }: { work: WorkItem, onPlay: () => void }) => {
    return (
        <a
            href={work.link}
            onClick={(e) => {
                console.log('WordU Card Clicked');
                e.preventDefault();
                console.log('Calling onPlay');
                onPlay();
            }}
            className="group/game relative bg-slate-900/60 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[var(--accent-teal)]/50 hover:shadow-[0_0_30px_var(--overlay-teal-20)] transition-all duration-500 block aspect-[4/3] cursor-pointer"
        >
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 overflow-hidden">
                {work.image && (
                    <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/game:scale-110"
                    />
                )}
                <div className="absolute inset-0 bg-slate-900/40 group-hover/game:bg-slate-900/20 transition-colors duration-500" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
                {/* Play Button - Centered initially, moves or pulses on hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover/game:scale-125 group-hover/game:bg-[var(--accent-teal)] group-hover/game:border-[var(--accent-teal)] transition-all duration-300 shadow-2xl">
                        <Play className="w-6 h-6 text-white ml-1 fill-current" />
                    </div>
                </div>

                <div className="relative z-10 pointer-events-none">
                    <h3 className="text-3xl font-black text-white mb-2 drop-shadow-lg transform translate-y-2 group-hover/game:translate-y-0 transition-transform duration-300">
                        {work.title}
                    </h3>
                    <p className="text-lg text-slate-200 font-medium opacity-0 transform translate-y-4 group-hover/game:opacity-100 group-hover/game:translate-y-0 transition-all duration-300 delay-100">
                        {work.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 opacity-0 group-hover/game:opacity-100 transition-opacity duration-300 delay-200">
                        <span className="px-3 py-1 rounded-full bg-[var(--accent-teal)]/20 border border-[var(--accent-teal)]/30 text-[var(--accent-teal)] text-xs font-mono uppercase tracking-wider">
                            Click to Play
                        </span>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default function ImmersiveEraBlock({ era, index, isLast }: ImmersiveEraBlockProps) {
    const startYear = era.period.split('—')[0].trim();
    const containerRef = useRef<HTMLDivElement>(null);

    // CINEMATIC PINNING: Scroll area for morphing content in place
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // ═══════════════════════════════════════════════════════════════
    // SCROLL TIMING — "No blank screen" cinematic pacing
    //
    // Container: 150vh → 150vh of scroll travel per zone
    //
    // ENTRANCE  (0–28%)  =  ~42vh  — content stages in sequentially
    // HOLD      (28–88%) =  ~90vh  — everything fully visible, long read
    // EXIT      (88–98%) =  ~15vh  — rapid fade-out at the tail
    //
    // Gap between zones: zone N fades at 88-98%, zone N+1 enters at
    // 0-2%. Only ~3vh of near-zero opacity at the boundary → seamless.
    // ═══════════════════════════════════════════════════════════════

    // ACT 1: YEAR — Visible immediately (no blank screen), fades OUT as header arrives
    const yearOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const yearScale = useTransform(scrollYProgress, [0, 0.08], [1, 1.1]);

    // ACT 2: ROLE / COMPANY — stages in right after (4–10%)
    const headerOpacity = useTransform(scrollYProgress, [0.04, 0.10, 0.88, 0.98], [0, 1, 1, 0]);
    const headerY = useTransform(scrollYProgress, [0.04, 0.10], [24, 0]);
    const headerScale = useTransform(scrollYProgress, [0.04, 0.10], [0.97, 1]);

    // ACT 3: DESCRIPTION / BADGES — follows header (10–18%)
    const descOpacity = useTransform(scrollYProgress, [0.10, 0.18, 0.88, 0.98], [0, 1, 1, 0]);
    const descY = useTransform(scrollYProgress, [0.10, 0.18], [16, 0]);

    // ACT 4: WORK TILES — last to arrive (18–28%)
    const tilesOpacity = useTransform(scrollYProgress, [0.18, 0.28, 0.88, 0.98], [0, 1, 1, 0]);
    const tilesY = useTransform(scrollYProgress, [0.18, 0.28], [30, 0]);
    const tilesScale = useTransform(scrollYProgress, [0.18, 0.28], [0.96, 1]);

    // Lightbox State
    const [lightboxOpen, setLightboxOpen] = React.useState(false);
    const [gameLightboxOpen, setGameLightboxOpen] = React.useState(false); // New state for WordU Game Lightbox
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [activeProjectImages, setActiveProjectImages] = React.useState<Array<{ src: string, alt: string }>>([]);

    const handleOpenLightbox = (workId: string) => {
        if (workId === 'portfolio-game') {
            setGameLightboxOpen(true);
            return;
        }

        const images = ARCHIVE_GALLERY_DATA[workId];
        if (images && images.length > 0) {
            setActiveProjectImages(images);
            setCurrentImageIndex(0);
            setLightboxOpen(true);
        }
    };

    return (
        <>
            {/* SCROLL CONTAINER */}
            <div
                ref={containerRef}
                className="relative animated-grid-bg"
                style={{ height: '150vh' }}
            >
                {/* STICKY VIEWPORT: Stays centered while content morphs */}
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
                        {/* Year Watermark - Appears First */}
                        <motion.div
                            style={{ opacity: yearOpacity, scale: yearScale }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="text-[80px] md:text-[140px] lg:text-[220px] font-black text-white/[0.08] leading-none tracking-tighter font-mono">
                                {startYear}
                            </div>
                        </motion.div>

                        {/* ACT 2: Header - Role & Company */}
                        <motion.div
                            style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}
                            className="text-center mb-12 max-w-4xl mx-auto relative z-10"
                        >
                            {/* Hero Label (e.g. THE DISCIPLINE) — only if present */}
                            {era.heroLabel && (
                                <div className="font-mono text-[var(--accent-teal)] text-xs tracking-[0.3em] uppercase mb-6">
                                    {era.heroLabel}
                                </div>
                            )}

                            {/* Period Badge — shown when no heroLabel */}
                            {!era.heroLabel && (
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-8">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-teal)] mr-3 animate-pulse" />
                                    <span className="font-mono text-slate-400 text-xs tracking-[0.2em] uppercase">
                                        {era.period}
                                    </span>
                                </div>
                            )}

                            {/* Role */}
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.05]">
                                {era.role}
                            </h2>

                            {/* Company — shown when no heroLabel */}
                            {!era.heroLabel && (
                                <div className="text-xl md:text-2xl lg:text-3xl text-slate-400 font-light flex items-center justify-center gap-3">
                                    <span className="text-slate-600">at</span>
                                    <span className="text-white font-medium">{era.company}</span>
                                </div>
                            )}
                        </motion.div>

                        {/* ACT 3: Description + Optional Skill Badges */}
                        <motion.div
                            style={{ opacity: descOpacity, y: descY }}
                            className="text-center mb-16 md:mb-20 max-w-2xl mx-auto relative z-10"
                        >
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                                {era.description}
                            </p>
                            {era.secondaryDescription && (
                                <p className="text-lg md:text-xl text-slate-400 leading-relaxed mt-3">
                                    {era.secondaryDescription}
                                </p>
                            )}

                            {/* Platform Proof Link */}
                            {era.platformUrl && (
                                <a
                                    href={era.platformUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-mono text-slate-500 hover:text-[var(--accent-teal)] transition-colors duration-300"
                                >
                                    See the platform
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}

                            {/* Skill Badges — centered row */}
                            {era.skillBadges && era.skillBadges.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-6 mt-10">
                                    {era.skillBadges.map((badge) => {
                                        const IconComponent = SKILL_ICONS[badge.icon];
                                        return (
                                            <div key={badge.label} className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center shrink-0">
                                                    {IconComponent && <IconComponent className="w-4 h-4 text-white/70" />}
                                                </div>
                                                <div className="text-left">
                                                    <div className="text-white font-semibold text-sm">
                                                        {badge.label}
                                                    </div>
                                                    <div className="text-slate-500 text-xs font-mono">
                                                        {badge.sub}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.div>

                        {/* ACT 4: Work Items & Testimonials */}
                        <motion.div
                            style={{ opacity: tilesOpacity, y: tilesY, scale: tilesScale }}
                            className="w-full relative z-10"
                        >
                            {/* Work Items */}
                            {era.workItems.length > 0 && (
                                <div className={`grid gap-8 mb-16 ${era.workItems.length === 1
                                    ? (era.workItems[0].id === 'portfolio-game' ? 'grid-cols-1 max-w-[30rem] mx-auto' : 'grid-cols-1 max-w-sm mx-auto')
                                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                    }`}>
                                    {era.workItems.map((work, idx) => (
                                        <motion.div
                                            key={work.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: idx * 0.1,
                                                duration: 0.6,
                                                ease: [0.25, 0.1, 0.25, 1]
                                            }}
                                            viewport={{ once: true, margin: "-100px" }}
                                        >
                                            {era.id === 'agency-startup' || era.id === 'consultant-tech' ? (
                                                <ArchiveWorkCard work={work} onOpenLightbox={handleOpenLightbox} />
                                            ) : work.id === 'portfolio-game' ? (
                                                <WordUGameCard work={work} onPlay={() => handleOpenLightbox('portfolio-game')} />
                                            ) : (
                                                <MotionWorkCard work={work} />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Testimonials - Full Width */}
                            {era.testimonials.length > 0 && (
                                <div className="w-full">
                                    {era.testimonials.length === 1 ? (
                                        /* Single Testimonial - Full Width */
                                        <div className="w-full">
                                            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-2xl relative overflow-hidden group/quote">
                                                <Quote className="absolute top-8 right-8 w-16 h-16 text-white/5 group-hover/quote:text-[var(--accent-teal)]/10 transition-colors" />
                                                <blockquote className="relative z-10 text-center">
                                                    <p className="font-sans text-xl md:text-2xl text-slate-200 leading-relaxed mb-8">
                                                        &ldquo;{era.testimonials[0].quote}&rdquo;
                                                    </p>
                                                    <cite className="not-italic flex flex-col items-center gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white font-bold text-lg">{era.testimonials[0].name}</span>
                                                            {era.testimonials[0].linkedInProfile && (
                                                                <Link href={era.testimonials[0].linkedInProfile} target="_blank" className="text-slate-500 hover:text-[var(--brand-linkedin)] transition-colors">
                                                                    <Linkedin className="w-4 h-4" />
                                                                </Link>
                                                            )}
                                                        </div>
                                                        <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">
                                                            {era.testimonials[0].role}, {era.testimonials[0].company}
                                                        </span>
                                                    </cite>
                                                </blockquote>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Multiple Testimonials - Grid */
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {era.testimonials.map((testimonial) => (
                                                <div key={testimonial.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-xl relative overflow-hidden group/quote">
                                                    <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5 group-hover/quote:text-[var(--accent-teal)]/10 transition-colors" />
                                                    <blockquote className="relative z-10">
                                                        <p className="font-sans text-sm md:text-base text-slate-200 leading-relaxed mb-6 line-clamp-4">
                                                            &ldquo;{testimonial.quote}&rdquo;
                                                        </p>
                                                        <cite className="not-italic flex flex-col gap-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-white font-bold text-sm">{testimonial.name}</span>
                                                                {testimonial.linkedInProfile && (
                                                                    <Link href={testimonial.linkedInProfile} target="_blank" className="text-slate-500 hover:text-[var(--brand-linkedin)] transition-colors">
                                                                        <Linkedin className="w-3 h-3" />
                                                                    </Link>
                                                                )}
                                                            </div>
                                                            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                                                                {testimonial.role}
                                                            </span>
                                                        </cite>
                                                    </blockquote>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Foundations Terminal (Origin Story) */}
                            {era.foundations && era.foundations.length > 0 && (
                                <div className="mt-16">
                                    <FoundationsTerminal foundations={era.foundations} />
                                </div>
                            )}


                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <ImageLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                imageSrc={activeProjectImages[currentImageIndex]?.src || ''}
                imageAlt={activeProjectImages[currentImageIndex]?.alt || ''}
                images={activeProjectImages}
                currentIndex={currentImageIndex}
                onNavigate={setCurrentImageIndex}
            />

            {/* WordU Game Lightbox */}
            <WordGameLightbox
                isOpen={gameLightboxOpen}
                onClose={() => setGameLightboxOpen(false)}
            />
        </>
    )
}
