'use client'

import { motion } from 'framer-motion'
import { ReflectionData } from '@/types/caseStudy'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface CaseStudyReflectionProps {
    data: ReflectionData
    isLightBackground?: boolean
}

const smoothEase = [0.22, 1, 0.36, 1]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.05,
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: smoothEase }
    }
}

export default function CaseStudyReflection({ data, isLightBackground = true }: CaseStudyReflectionProps) {
    if (!data) return null;

    return (
        <motion.div
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
        >
            {/* ── TESTIMONIALS — Horizontal, editorial ── */}
            <motion.div variants={itemVariants}>
                <ComponentHeading
                    variant="block"
                    align="center"
                    tag="// TESTIMONIALS"
                    title="Voice of the Team"
                    color="teal"
                    className="mb-10"
                />

                {/* Side-by-side quotes on desktop */}
                <div className={`grid gap-8 lg:gap-12 ${data.people.length === 1 ? 'grid-cols-1 max-w-2xl' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {data.people.map((person) => (
                        <motion.div
                            key={person.id}
                            variants={itemVariants}
                            className="relative"
                        >
                            {/* Accent border */}
                            <div className="pl-5 border-l-2 border-white/[0.08]">
                                <p className="text-[var(--text-body)] text-base md:text-[17px] leading-[1.75] font-light italic">
                                    &ldquo;{person.quote}&rdquo;
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    <span className="text-[var(--text-heading)] text-sm font-semibold">
                                        {person.name}
                                    </span>
                                    <span className="text-[var(--text-muted)] text-xs">&mdash;</span>
                                    <span className="text-[var(--text-muted)] text-xs uppercase tracking-wider">
                                        {person.role}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ── RETROSPECTIVE — Two-column, tight ── */}
            <motion.div variants={itemVariants}>
                <ComponentHeading
                    variant="block"
                    align="center"
                    tag="// RETROSPECTIVE"
                    title="Honest Reflection"
                    color="teal"
                    className="mb-10"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Push Harder */}
                    <motion.div
                        variants={itemVariants}
                        className="py-6 md:pr-10 md:border-r border-white/[0.06]"
                    >
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span className="font-mono text-[10px] text-amber-400/80 uppercase tracking-[0.15em] font-medium">
                                What I&apos;d Push Harder For
                            </span>
                        </div>
                        <h4 className="text-[var(--text-heading)] text-lg font-semibold tracking-tight mb-3">
                            {data.retrospective.pushHarder.title}
                        </h4>
                        <p className="text-[var(--text-muted)] text-sm leading-[1.75] font-light"
                            dangerouslySetInnerHTML={{
                                __html: data.retrospective.pushHarder.content
                                    .replace(/<span[^>]*>/g, '<span class="text-amber-400 font-medium">')
                            }}
                        />
                    </motion.div>

                    {/* Mobile divider */}
                    <div className="h-px bg-white/[0.06] md:hidden my-2" />

                    {/* Do Next */}
                    <motion.div
                        variants={itemVariants}
                        className="py-6 md:pl-10"
                    >
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                            <span className="font-mono text-[10px] text-teal-400/80 uppercase tracking-[0.15em] font-medium">
                                Where I&apos;d Take It Next
                            </span>
                        </div>
                        <h4 className="text-[var(--text-heading)] text-lg font-semibold tracking-tight mb-3">
                            {data.retrospective.doNext.title}
                        </h4>
                        <p className="text-[var(--text-muted)] text-sm leading-[1.75] font-light"
                            dangerouslySetInnerHTML={{
                                __html: data.retrospective.doNext.content
                                    .replace(/<span[^>]*>/g, '<span class="text-teal-400 font-medium">')
                            }}
                        />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}
