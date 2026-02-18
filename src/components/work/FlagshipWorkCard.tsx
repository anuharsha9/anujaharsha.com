'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Lock, ExternalLink } from 'lucide-react'
import { WorkItem } from '@/data/career-data'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

/**
 * FlagshipWorkCard — Premium, cinematic card for flagship case studies.
 * Full-width hero with dramatic gradient treatment, bold metrics, and elevated hover.
 */
export function FlagshipWorkCard({ work, index = 0 }: { work: WorkItem; index?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)
    const isExternal = work.link === '#'
    const isLocked = work.locked

    // Scroll-linked parallax
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    })

    const imageScale = useTransform(smoothProgress, [0, 1], [1.12, 1.0])
    const imageY = useTransform(smoothProgress, [0, 1], ["-5%", "5%"])

    // Mouse spotlight
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    // Accent color from data
    const accent = work.accentColor || '#078B9C'

    return (
        <Link
            href={work.link}
            className={`block group/flagship relative w-full ${isExternal || isLocked ? 'cursor-default' : ''}`}
            onClick={(e) => { if (isExternal || isLocked) e.preventDefault() }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden"
            >
                {/* Spotlight border glow */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover/flagship:opacity-100 z-20"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                500px circle at ${mouseX}px ${mouseY}px,
                                ${accent}22,
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* Card body */}
                <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900/60 border border-white/[0.06] group-hover/flagship:border-white/[0.12] transition-all duration-500"
                >
                    {/* Hero media with parallax */}
                    {work.video ? (
                        <motion.div
                            style={{ scale: imageScale, y: imageY }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <video
                                src={work.video}
                                autoPlay muted loop playsInline
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    ) : work.image ? (
                        <motion.div
                            style={{ scale: imageScale, y: imageY }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={work.image}
                                alt={work.title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    ) : null}

                    {/* Cinematic gradient scrim — deeper, more dramatic */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

                    {/* Hover shine */}
                    <div className="absolute inset-0 opacity-0 group-hover/flagship:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/[0.03] to-transparent pointer-events-none" />

                    {/* Status badge — top left */}
                    {work.statusLabel && (
                        <div className="absolute top-5 left-5 z-10">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.08]">
                                <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: work.statusLabel.includes('Live') ? '#22c55e' : accent }}
                                />
                                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/60">
                                    {work.statusLabel}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Lock icon */}
                    {isLocked && (
                        <div className="absolute top-5 right-5 z-10">
                            <div className="bg-black/50 backdrop-blur-md rounded-full p-2 border border-white/10">
                                <Lock className="w-4 h-4 text-white/60" />
                            </div>
                        </div>
                    )}

                    {/* Content overlay — bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                        {/* Title — bold, cinematic */}
                        <h3 className="font-sans text-xl sm:text-2xl font-bold text-white leading-snug mb-3 max-w-[85%] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                            {work.title}
                        </h3>

                        {/* Metric + arrow row */}
                        <div className="flex items-end justify-between gap-4">
                            {work.metric ? (
                                <div className="flex items-baseline gap-2.5">
                                    <span
                                        className="font-sans text-3xl sm:text-4xl font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                                        style={{ color: accent }}
                                    >
                                        <AnimatedCounter value={work.metric} duration={1.5} />
                                    </span>
                                    <span className="text-sm text-white/50 font-light tracking-wide">
                                        {work.metricLabel}
                                    </span>
                                </div>
                            ) : (
                                <div />
                            )}

                            {/* CTA arrow */}
                            {!isExternal && !isLocked && (
                                <motion.div
                                    animate={hovered ? { x: 3, scale: 1.05 } : { x: 0, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="p-3 rounded-full border border-white/[0.1] bg-white/[0.06] backdrop-blur-sm group-hover/flagship:bg-white/[0.12] group-hover/flagship:border-white/20 transition-all duration-300 shrink-0"
                                >
                                    <ArrowRight className="w-4 h-4 text-white/60 group-hover/flagship:text-white transition-colors duration-300" />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </Link>
    )
}
