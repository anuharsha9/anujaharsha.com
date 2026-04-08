'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    Bot, Mountain, GraduationCap, Award, Baby, MapPin, Heart, Palette, LucideIcon
} from 'lucide-react'

/* ─── Milestone data per era ─── */
export interface LifeMilestone {
    title: string
    subtitle: string
    year: string
    icon: any
}

export const CSG_MILESTONES: LifeMilestone[] = [
    { title: 'Vibe Coding & AI Orchestration', subtitle: 'Built this portfolio', year: 'Nov 2025', icon: Bot },
    { title: 'Salt Lake City', subtitle: 'Home Base', year: 'Since 2019', icon: Mountain },
    { title: 'Masters in English', subtitle: 'Literature & Critical Theory', year: '2024 — 2025', icon: GraduationCap },
    { title: 'MITx Pro Certificate', subtitle: 'Product Design for AI and ML', year: 'Apr 2024', icon: Award },
    { title: 'Second Child', subtitle: 'The greatest production release', year: 'Sep 2024', icon: Baby },
]

export const CONSULTANT_MILESTONES: LifeMilestone[] = [
    { title: 'First Child', subtitle: 'Becoming a mother', year: '2021', icon: Baby },
    { title: 'HCI Certificate', subtitle: 'Georgia Tech', year: 'Jan 2021', icon: Award },
    { title: 'Salt Lake City', subtitle: 'Moved to Utah', year: 'Aug 2019', icon: Mountain },
    { title: 'Denver', subtitle: 'Moved to Colorado', year: 'Feb 2019', icon: Mountain },
]

export const AGENCY_MILESTONES: LifeMilestone[] = [
    { title: 'Moved to Boston', subtitle: 'The American Dream', year: 'Mar 2017', icon: MapPin },
    { title: "Bachelor's in English", subtitle: 'Literature', year: 'Jan 2017', icon: GraduationCap },
    { title: 'Got Married', subtitle: 'New Chapter', year: 'Aug 2016', icon: Heart },
    { title: 'BA in Animation & VFX', subtitle: 'Enrolled', year: 'Jun 2012', icon: Palette },
    { title: 'High School Graduation', subtitle: 'Hyderabad', year: '2012', icon: GraduationCap },
]

/* ─── Stagger container ─── */
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.09, delayChildren: 0.15 },
    },
}

const pillVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.88, x: -8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        x: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
}

/* ─── Life context strip ─── */
interface LifeContextStripProps {
    milestones: LifeMilestone[]
    label?: string
}

export default function LifeContextStrip({ milestones, label = 'Meanwhile, in life...' }: LifeContextStripProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%'])
    const labelOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1])

    return (
        <div ref={ref} className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-14">
            {/* Decorative line — teal gradient pulse grows with scroll */}
            <div className="relative mb-6">
                <div className="h-[1px] bg-white/[0.06] w-full" />
                <motion.div
                    className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-[var(--accent-teal)]/50 via-[var(--accent-teal)]/20 to-transparent"
                    style={{ width: lineWidth }}
                />
            </div>

            {/* Label */}
            <motion.p
                className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-600 mb-5"
                style={{ opacity: labelOpacity }}
            >
                {label}
            </motion.p>

            {/* Milestones — staggered entrance, interactive pills */}
            <motion.div
                className="flex flex-wrap gap-3 md:gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {milestones.map((m) => {
                    const Icon = m.icon
                    return (
                        <motion.div
                            key={m.title}
                            variants={pillVariants}
                            whileHover={{
                                scale: 1.04,
                                y: -2,
                                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg
                                       bg-white/[0.03] border border-white/[0.06]
                                       hover:bg-white/[0.06] hover:border-[var(--accent-teal)]/20
                                       hover:shadow-[0_0_20px_rgba(108,200,203,0.08)]
                                       transition-[background,border-color,box-shadow] duration-300 cursor-default
                                       overflow-hidden"
                        >
                            {/* Shimmer sweep on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(105deg, transparent 40%, rgba(108,200,203,0.06) 50%, transparent 60%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer-sweep 1.5s ease-in-out',
                                }}
                            />

                            {/* Icon with glow */}
                            <div className="relative w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0
                                            group-hover:bg-[var(--accent-teal)]/10
                                            group-hover:shadow-[0_0_12px_rgba(108,200,203,0.2)]
                                            transition-all duration-300">
                                <Icon className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[var(--accent-teal)] transition-colors duration-300" />
                            </div>

                            {/* Text */}
                            <div className="relative">
                                <p className="text-zinc-400 text-[13px] font-medium leading-tight group-hover:text-zinc-200 transition-colors duration-300">
                                    {m.title}
                                </p>
                                <p className="text-zinc-600 text-[10px] font-mono leading-tight mt-0.5">
                                    {m.subtitle} · {m.year}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* Bottom decorative line */}
            <div className="mt-6">
                <div className="h-[1px] bg-white/[0.06] w-full" />
            </div>
        </div>
    )
}
