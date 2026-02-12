'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface IQReflectionProps {
    isLightBackground?: boolean
}

export default function IQReflection({ isLightBackground = true }: IQReflectionProps) {
    return (
        <div className="space-y-8 mt-16">
            {/* Header */}
            <ComponentHeading
                variant="block"
                tag="// REFLECTION"
                title="Retrospective"
                color="teal"
                align="center"
                className="mb-8"
            />

            {/* Row 1: Testimonials (Moved from ML) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Karishma Khadge */}
                <div className="bg-white border border-slate-200 p-6 h-full hover:shadow-lg transition-all duration-300 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-mono font-bold">KK</div>
                        <div>
                            <div className="text-slate-900 text-sm font-bold">Karishma Khadge</div>
                            <div className="text-slate-400 text-xs uppercase tracking-wide">Senior Product Manager</div>
                        </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed italic">
                        &ldquo;Anuja led UX design initiatives with remarkable creativity, empathy, and precision. She consistently demonstrated a deep understanding of user-centered design and the ability to translate complex product requirements into intuitive and visually engaging experiences. What truly stands out is her collaborative spirit and problem-solving mindset.&rdquo;
                    </p>
                </div>

                {/* Vijay Raman */}
                <div className="bg-white border border-slate-200 p-6 h-full hover:shadow-lg transition-all duration-300 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-mono font-bold">VR</div>
                        <div>
                            <div className="text-slate-900 text-sm font-bold">Vijay Raman</div>
                            <div className="text-slate-400 text-xs uppercase tracking-wide">VP of Product Management</div>
                        </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed italic">
                        &ldquo;Anuja made a significant impact modernizing UX across our legacy enterprise products. She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams. Anuja is bold in her ideas and consistently proactive in turning complex problems into practical, user-centered solutions.&rdquo;
                    </p>
                </div>
            </div>

            {/* Row 2: Reflections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* What I'd push harder for */}
                <div className="bg-amber-50 border border-amber-200 p-6 h-full hover:shadow-lg transition-all duration-300 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-amber-500 text-xl">↩</span>
                        <span className="font-mono text-amber-700 text-xs uppercase tracking-wide font-bold">
                            What I&apos;d push harder for
                        </span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                        Proper tutorials and onboarding flows. I fought for a &quot;Get Started&quot; panel that got scrapped after significant effort. I wanted to scaffold the experience for first-time users more effectively.
                    </p>
                </div>

                {/* What I'd want to do next */}
                <div className="bg-[var(--accent-teal-50)] border border-[var(--accent-teal-200)] p-6 h-full hover:shadow-lg transition-all duration-300 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[var(--accent-teal)] text-xl">→</span>
                        <span className="font-mono text-[var(--accent-teal-700)] text-xs uppercase tracking-wide font-bold">
                            What I&apos;d do next
                        </span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                        Connect ReportCaster and IQ to schedule generated insights automatically. Envision NLQ as a chat interface for WebFOCUS itself, offering step-by-step workflow guidance beyond just data querying.
                    </p>
                </div>
            </div>
        </div>
    )
}
