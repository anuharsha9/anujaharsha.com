'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'
import { WorkItem } from '@/data/career-data'
import HeroTerminal from '@/components/case-study/HeroTerminal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

// Full-bleed magazine-style card with shared layout transitions

export function MotionWorkCard({ work, fillHeight = false, compact = false }: { work: WorkItem; fillHeight?: boolean; compact?: boolean }) {
    const ref = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)
    const isExternal = work.link === '#'

    // Scroll-linked Parallax Zoom (Apple/iPhone Style)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // Physics-based smoothing
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    })

    // Deeper Transformations
    const imageScale = useTransform(smoothProgress, [0, 1], [1.15, 1.0])
    const imageY = useTransform(smoothProgress, [0, 1], ["-8%", "8%"])
    const imageOpacity = useTransform(smoothProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

    // Mouse tracking for Spotlight
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    // Status Badge Logic
    const isLive = work.statusLabel?.includes('Live') || work.statusLabel?.includes('Shipped')

    return (
        <Link
            href={work.link}
            className={`block group/work relative w-full ${fillHeight ? 'h-full' : ''} ${isExternal ? 'cursor-default pointer-events-none' : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* 
              FULL-BLEED COVER CARD — Magazine Style
              - 80vw width for cinematic full-bleed presence
              - 16/9 aspect ratio for dramatic cover feel
              - Text overlays the bottom with gradient scrim
              - Mouse-tracking spotlight on border
              - layoutId for shared layout transitions to case study pages
            */}
            <div
                onMouseMove={handleMouseMove}
                className={`relative group rounded-2xl ${fillHeight ? 'h-full' : ''}`}
            >
                {/* Spotlight Gradient Background (Border Glow) */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.08),
                transparent 80%
              )
            `,
                    }}
                />

                {/* Main Card — Full-Bleed Cover with shared layout */}
                <motion.div
                    ref={ref}
                    layoutId={`project-cover-${work.id}`}
                    whileHover={{ y: -6, scale: 1.008 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
                    className={`relative ${fillHeight ? 'h-full min-h-[320px]' : compact ? 'aspect-video' : 'aspect-[4/3]'} rounded-2xl overflow-hidden bg-slate-900/50 shadow-lg shadow-black/20 border border-white/[0.04] group-hover/work:border-white/[0.1] transition-colors duration-500`}
                >

                    {/* VIDEO Support with PARALLAX SCALE */}
                    {work.video ? (
                        <motion.div style={{ scale: imageScale, y: imageY, opacity: imageOpacity }} className="w-full h-full">
                            <video
                                src={work.video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/work:opacity-100 transition-opacity duration-500"
                            />
                        </motion.div>
                    ) : work.image ? (
                        /* Clean Image Display with PARALLAX SCALE */
                        <motion.div
                            style={{ scale: imageScale, y: imageY, opacity: imageOpacity }}
                            className="w-full h-full"
                        >
                            <img
                                src={work.image}
                                alt={work.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/work:opacity-100 transition-opacity duration-500"
                            />
                        </motion.div>
                    ) : null}

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-0 group-hover/work:opacity-100 transition-opacity duration-500" />

                    {/* Overlay: Subtle shine on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                    {/* TEXT CONTENT — Overlaid on cover */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 md:p-12 z-10">
                        {/* Status Badge - Minimal, gray-only */}
                        {work?.statusLabel && (
                            <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] text-[9px] uppercase tracking-[0.15em] font-mono text-white/50">
                                <span className="w-1 h-1 rounded-full bg-white/40" />
                                {work.statusLabel}
                            </div>
                        )}

                        <div className="flex items-end justify-between gap-6">
                            <div className="max-w-[80%]">
                                <h3 className="font-sans text-xl sm:text-2xl font-bold text-white leading-snug mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                                    {work.title}
                                </h3>
                                {/* Metric */}
                                {work.metric && (
                                    <div className="inline-flex items-baseline gap-2.5">
                                        <span className="font-sans text-2xl sm:text-3xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                                            <AnimatedCounter value={work.metric} duration={1.2} />
                                        </span>
                                        <span className="font-normal text-sm text-white/50 tracking-wide">
                                            {work.metricLabel}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {!isExternal && (
                                <div className="mb-1 p-2.5 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] group-hover/work:bg-white/[0.15] group-hover/work:border-white/20 transition-all duration-300 shrink-0">
                                    <ArrowRight className="w-4 h-4 text-white/70 group-hover/work:text-white transition-colors duration-300" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Locked Badge */}
                    {work.locked && (
                        <div className="absolute top-4 right-4 z-10">
                            <div className="bg-black/60 backdrop-blur-md rounded-full p-2 border border-white/10">
                                <Lock className="w-4 h-4 text-white/70" />
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </Link>
    )
}
