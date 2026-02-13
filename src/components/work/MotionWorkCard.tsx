'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'
import { WorkItem } from '@/data/career-data'
import HeroTerminal from '@/components/case-study/HeroTerminal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export function MotionWorkCard({ work }: { work: WorkItem }) {
    const ref = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)
    const isExternal = work.link === '#'

    // Scroll-linked Parallax Zoom (Apple/iPhone Style)
    // 1. Use a larger offset to start earlier and end later
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // 2. Add Physics (Mass/Spring) to the scroll value
    // This creates the "momentum" feel where the animation lags slightly behind the scroll
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    })

    // 3. Deeper Transformations
    const imageScale = useTransform(smoothProgress, [0, 1], [1.15, 1.0]) // Start zoomed in 15%
    const imageY = useTransform(smoothProgress, [0, 1], ["-8%", "8%"]) // Move vertically 16% total
    const imageOpacity = useTransform(smoothProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]) // Fade in/out at edges

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
            className={`block group/work relative ${isExternal ? 'cursor-default pointer-events-none' : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* TEXT CONTENT - Moved ABOVE Media for Apple-style Hierarchy */}
            <div className="mb-6 pl-1">
                {/* Status Badge - Minimalist */}
                {work?.statusLabel && (
                    <div className="mb-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-mono text-slate-400 group-hover/work:border-[var(--accent-teal)]/30 transition-colors">
                        <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-amber-500'}`} />
                        {work.statusLabel}
                    </div>
                )}

                <div className="flex items-end justify-between">
                    <div>
                        <h3 className="font-serif text-3xl md:text-4xl text-white group-hover/work:text-[var(--accent-teal)] transition-colors duration-300 mb-2 leading-tight">
                            {work.title}
                        </h3>
                        {/* Metric - Clean & Bold */}
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

                    {!isExternal && (
                        <div className="mb-2 p-2 rounded-full bg-white/5 border border-white/10 group-hover/work:bg-[var(--accent-teal)]/10 group-hover/work:border-[var(--accent-teal)]/30 transition-all duration-300">
                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover/work:text-[var(--accent-teal)] transition-colors duration-300" />
                        </div>
                    )}
                </div>
            </div>

            {/* 
              MEDIA CONTAINER 
              - Apple-style "bento" feel
              - Spotlight effect on border
              - 3D lift
            */}
            <div
                onMouseMove={handleMouseMove}
                className="relative group rounded-xl"
            >
                {/* Spotlight Gradient Background (Border Glow) */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(45, 212, 191, 0.15),
                transparent 80%
              )
            `,
                    }}
                />

                {/* Main Card Content */}
                <motion.div
                    ref={ref}
                    whileHover={{ y: -4, scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative aspect-video rounded-xl overflow-hidden bg-slate-900/50 shadow-sm border border-white/5 group-hover:border-[var(--accent-teal)]/20 transition-colors duration-300"
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
                    ) : (
                        /* HeroTerminal fallback with PARALLAX SCALE */
                        <div className="w-full h-full bg-slate-800/50 pt-6 pl-6">
                            <motion.div
                                className="w-full h-full"
                                style={{ scale: imageScale, y: imageY, opacity: imageOpacity }}
                                animate={{
                                    y: hovered ? -8 : 0,
                                    x: hovered ? -8 : 0
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <HeroTerminal
                                    imageSrc={work.image}
                                    fileName={work.fileName || 'app.tsx'}
                                    accentColor={work.accentColor || '#64748b'}
                                    alt={work.title}
                                />
                            </motion.div>
                        </div>
                    )}

                    {/* Overlay: Subtle shine on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

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
