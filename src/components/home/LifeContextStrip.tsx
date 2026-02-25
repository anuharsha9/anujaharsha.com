'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    Bot, Mountain, GraduationCap, Award, Baby, MapPin, Heart, Palette
} from 'lucide-react'

/* ─── Milestone data per era ─── */
export interface LifeMilestone {
    title: string
    subtitle: string
    year: string
    icon: React.ElementType
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
        <div ref={ref} className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-20">
            {/* Decorative line */}
            <div className="relative mb-8">
                <div className="h-[1px] bg-white/[0.06] w-full" />
                <motion.div
                    className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-[var(--accent-teal)]/40 to-transparent"
                    style={{ width: lineWidth }}
                />
            </div>

            {/* Label */}
            <motion.p
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20 mb-8"
                style={{ opacity: labelOpacity }}
            >
                {label}
            </motion.p>

            {/* Milestones — flowing horizontal strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-4 md:gap-x-10">
                {milestones.map((m, i) => {
                    const Icon = m.icon
                    return (
                        <motion.div
                            key={m.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-3 group"
                        >
                            {/* Icon */}
                            <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center shrink-0 group-hover:bg-white/[0.08] transition-colors duration-300">
                                <Icon className="w-3.5 h-3.5 text-white/25 group-hover:text-white/50 transition-colors duration-300" />
                            </div>

                            {/* Text */}
                            <div>
                                <p className="text-white/50 text-xs font-medium leading-tight">
                                    {m.title}
                                </p>
                                <p className="text-white/20 text-[10px] font-mono">
                                    {m.subtitle} · {m.year}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Bottom decorative line */}
            <div className="mt-8">
                <div className="h-[1px] bg-white/[0.06] w-full" />
            </div>
        </div>
    )
}
