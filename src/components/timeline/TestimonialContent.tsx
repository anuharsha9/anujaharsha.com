import React, { useRef } from 'react'
import Link from 'next/link'
import { Linkedin, Quote } from 'lucide-react'
import { m, useInView } from 'framer-motion'
import { CareerEra } from '@/data/career-data'
import { EASE_CINEMATIC } from '@/lib/motion'

interface TestimonialContentProps {
    era: CareerEra
}

export default function TestimonialContent({ era }: TestimonialContentProps) {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-10%" })

    const testimonials = era.testimonials || []
    if (testimonials.length === 0) return null

    const primary = testimonials.find(t => t.isPrimary) || testimonials[0]
    const secondary = testimonials.filter(t => t.id !== primary.id)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EASE_CINEMATIC }
        }
    }

    return (
        <m.div
            ref={containerRef}
            className="w-full max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {/* Header */}
            <m.div variants={itemVariants} className="mb-12">
                <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-zinc-600 text-xs tracking-[0.3em] uppercase">Era</span>
                    <div className="w-6 h-px bg-[var(--accent-teal)]" />
                    <span className="font-mono text-[var(--accent-teal)] text-xs sm:text-sm tracking-[0.2em]">
                        {era.period.split('—')[0].trim()}
                    </span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05] mb-2">
                    {era.role}
                </h2>
                <div className="flex items-center gap-4">
                    <p className="font-mono text-zinc-600 text-[11px] sm:text-xs tracking-[0.25em] uppercase">
                        {era.company}
                    </p>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
            </m.div>

            {/* ── Hero Quote ── */}
            <m.div variants={itemVariants} className="relative mb-16">
                {/* Giant decorative quote mark - Animated */}
                <m.div
                    className="absolute -top-8 -left-4 sm:-left-8 pointer-events-none select-none opacity-[0.03]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 0.04 } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <Quote size={180} fill="currentColor" stroke="none" />
                </m.div>

                <blockquote className="relative z-10 pl-2 sm:pl-6 border-l-2 border-[var(--accent-teal)]/30 py-2">
                    <p className="font-sans text-2xl sm:text-3xl md:text-4xl text-zinc-100 leading-[1.4] sm:leading-[1.35] font-light tracking-[-0.01em] max-w-3xl drop-shadow-lg">
                        {primary.quote}
                    </p>
                    <cite className="not-italic mt-10 block">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-px bg-[var(--accent-teal)]" />
                            <span className="text-white font-bold text-lg tracking-wide">
                                {primary.name}
                            </span>
                            {primary.linkedInProfile && (
                                <Link
                                    href={primary.linkedInProfile}
                                    target="_blank"
                                    className="text-zinc-500 hover:text-[var(--brand-linkedin)] hover:scale-110 transition-all duration-300 bg-white/5 p-1.5 rounded-full"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </Link>
                            )}
                        </div>
                        <div className="pl-[64px]">
                            <span className="text-[var(--accent-teal)] font-mono text-xs uppercase tracking-[0.15em] block mt-2 font-medium">
                                {primary.role}, {primary.company}
                            </span>
                            <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.1em] block mt-1">
                                {primary.relationship}
                            </span>
                        </div>
                    </cite>
                </blockquote>
            </m.div>

            {/* ── Secondary Quotes — flowing editorial grid ── */}
            {secondary.length > 0 && (
                <m.div
                    variants={itemVariants}
                    className="border-t border-white/[0.06] pt-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                        {secondary.map((testimonial, i) => (
                            <m.div
                                key={testimonial.id}
                                className="group/q relative p-6 -mx-6 rounded-2xl hover:bg-white/[0.03] transition-colors duration-500"
                                variants={itemVariants}
                                whileHover={{ x: 10, transition: { duration: 0.3 } }}
                            >
                                <div className="absolute top-6 left-0 opacity-0 group-hover/q:opacity-100 transition-opacity duration-500 text-[var(--accent-teal)]">
                                    <Quote size={16} fill="currentColor" stroke="none" className="rotate-180" />
                                </div>
                                <p className={`font-sans text-zinc-200 group-hover/q:text-zinc-200 leading-[1.6] mb-6 transition-colors duration-300 ${i === 0 ? 'text-lg' : 'text-base'}`}>
                                    {testimonial.quote}
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-px bg-white/10 group-hover/q:bg-[var(--accent-teal)] transition-colors duration-300" />
                                    <span className="text-zinc-200 group-hover/q:text-white font-semibold text-sm transition-colors duration-300">
                                        {testimonial.name}
                                    </span>
                                    {testimonial.linkedInProfile && (
                                        <Link href={testimonial.linkedInProfile} target="_blank" className="text-zinc-600 hover:text-[var(--brand-linkedin)] transition-colors hover:scale-110">
                                            <Linkedin className="w-3.5 h-3.5" />
                                        </Link>
                                    )}
                                </div>
                                <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.1em] ml-[36px] block mt-1 group-hover/q:text-[var(--accent-teal)]/70 transition-colors duration-300">
                                    {testimonial.role}
                                </span>
                            </m.div>
                        ))}
                    </div>
                </m.div>
            )}
        </m.div>
    )
}

