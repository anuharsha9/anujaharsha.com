'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface MLReflectionProps {
    isLightBackground?: boolean
}

export default function MLReflection({ isLightBackground = true }: MLReflectionProps) {
    return (
        <div className="space-y-8">
            {/* Header */}
            <ComponentHeading
                variant="block"
                tag="// REFLECTION"
                title="Retrospective"
                color="teal"
                align="center"
                className="mb-8"
            />

            {/* Row 1: Testimonials (Marcus & Anita) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Marcus Horbach */}
                <div className="bg-white border border-slate-200 p-6 h-full hover:shadow-lg transition-all duration-300 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-mono font-bold">MH</div>
                        <div>
                            <div className="text-slate-900 text-sm font-bold">Marcus Horbach</div>
                            <div className="text-slate-400 text-xs uppercase tracking-wide">Principal Data Scientist</div>
                        </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed italic">
                        &ldquo;The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive and has greatly contributed to the success of our products. Her design solutions are rooted in a deep understanding of the purpose of the product.&rdquo;
                    </p>
                </div>

                {/* Anita George */}
                <div className="bg-white border border-slate-200 p-6 h-full hover:shadow-lg transition-all duration-300 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-mono font-bold">AG</div>
                        <div>
                            <div className="text-slate-900 text-sm font-bold">Anita George</div>
                            <div className="text-slate-400 text-xs uppercase tracking-wide">Principal Account Tech Strategist</div>
                        </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed italic">
                        &ldquo;During a User Acceptance Test session, Anuja observed me navigating the screen. I was highly impressed with Anuja&apos;s approach. Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels.&rdquo;
                    </p>
                </div>
            </div>

            {/* Row 2: Reflections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* What I'd do differently */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-amber-50 border border-amber-200 p-6 h-full hover:shadow-lg transition-all duration-300 rounded-2xl"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-amber-500 text-xl">↩</span>
                        <span className="font-mono text-amber-700 text-xs uppercase tracking-wide font-bold">
                            What I&apos;d do differently
                        </span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                        Earlier, cleaner alignment with our Data Scientist. He surfaced insights late in the process that were harder to incorporate — some we did, but it cost us time.
                    </p>
                </motion.div>

                {/* What I'd do next */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-[var(--accent-teal-50)] border border-[var(--accent-teal-200)] p-6 h-full hover:shadow-lg transition-all duration-300 rounded-2xl"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[var(--accent-teal)] text-xl">→</span>
                        <span className="font-mono text-[var(--accent-teal-700)] text-xs uppercase tracking-wide font-bold">
                            What I&apos;d do next
                        </span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                        Integrate results directly into core WebFOCUS reporting. Enable users to visualize model outputs in real-time charts immediately after training. Make ML feel like a true part of the BI workflow.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
