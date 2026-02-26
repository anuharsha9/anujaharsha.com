'use client'

import { motion } from 'framer-motion'
import { ReflectionData } from '@/types/caseStudy'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface CaseStudyReflectionProps {
    data: ReflectionData
    isLightBackground?: boolean
}

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
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
}

export default function CaseStudyReflection({ data }: CaseStudyReflectionProps) {
    if (!data) return null;

    return (
        <motion.div
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
        >
            {/* Testimonials */}
            <motion.div variants={itemVariants}>
                <ComponentHeading
                    variant="block"
                    align="center"
                    title="Voice of the Team"
                    color="teal"
                    className="mb-10"
                />

                <div className={`grid gap-8 lg:gap-12 ${data.people.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {data.people.map((person) => (
                        <motion.div
                            key={person.id}
                            variants={itemVariants}
                            className="relative"
                        >
                            <div className="pl-5 border-l border-white/[0.08]">
                                <p className="text-white/50 text-base md:text-[17px] leading-[1.75] font-light italic">
                                    &ldquo;{person.quote}&rdquo;
                                </p>
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="text-white/70 text-sm font-medium">
                                        {person.name}
                                    </span>
                                    <span className="text-white/20 text-xs">&mdash;</span>
                                    <span className="text-white/30 text-xs">
                                        {person.role}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Retrospective */}
            <motion.div variants={itemVariants}>
                <ComponentHeading
                    variant="block"
                    align="center"
                    title="Honest Reflection"
                    color="teal"
                    className="mb-10"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <motion.div
                        variants={itemVariants}
                        className="py-6 md:pr-10 md:border-r border-white/[0.06]"
                    >
                        <h4 className="text-white/70 text-[15px] font-medium mb-3">
                            What I&apos;d Push Harder For
                        </h4>
                        <p className="text-white/30 text-sm leading-[1.75] font-light"
                            dangerouslySetInnerHTML={{
                                __html: data.retrospective.pushHarder.content
                                    .replace(/<span[^>]*>/g, '<span class="text-white/50 font-medium">')
                            }}
                        />
                    </motion.div>

                    <div className="h-px bg-white/[0.06] md:hidden my-2" />

                    <motion.div
                        variants={itemVariants}
                        className="py-6 md:pl-10"
                    >
                        <h4 className="text-white/70 text-[15px] font-medium mb-3">
                            Where I&apos;d Take It Next
                        </h4>
                        <p className="text-white/30 text-sm leading-[1.75] font-light"
                            dangerouslySetInnerHTML={{
                                __html: data.retrospective.doNext.content
                                    .replace(/<span[^>]*>/g, '<span class="text-white/50 font-medium">')
                            }}
                        />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}
