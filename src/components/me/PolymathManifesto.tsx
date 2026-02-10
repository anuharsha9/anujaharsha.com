'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Terminal, PenTool, Database, Zap, Layers, Cpu, Shield, Clock } from 'lucide-react'
import MotionSection from '@/components/ui/MotionSection'

export default function PolymathManifesto() {
    const pillars = [
        {
            id: 'origin',
            icon: PenTool,
            label: 'The Origin',
            title: 'Design is Inbuilt',
            content: (
                <>
                    <p className="mb-4">
                        <strong className="text-slate-900 block mb-1">Digital Native.</strong>
                        Mastered Pixel Logic (MS Paint) in Grade 2 and Vector Logic (CorelDRAW) in Grade 5.
                        Trained on Violin (London School of Music) for rhythm and discipline.
                    </p>
                    <p>
                        I didn&apos;t learn design to get a job; I learned it because it is my operating system.
                    </p>
                </>
            )
        },
        {
            id: 'career',
            icon: Layers,
            label: 'The Arc',
            title: 'Chaos to Architecture',
            content: (
                <>
                    <p className="mb-4">
                        <strong className="text-slate-900 block mb-1">Universalist.</strong>
                        From the iPhone 4S era hustle to modern Enterprise scale.
                    </p>
                    <p>
                        Joined Cloud Software Group and tackled &quot;unsexy&quot; hard problems:
                        modernizing 50-year-old legacy systems and unifying fragmented ML workflows for <strong className="text-slate-900">20 million users</strong>.
                    </p>
                </>
            )
        },
        {
            id: 'engineer',
            icon: Terminal,
            label: 'The Current',
            title: 'The Design Engineer',
            content: (
                <>
                    <p className="mb-4">
                        <strong className="text-slate-900 block mb-1">Vibe Coding.</strong>
                        Realized the gap between &quot;Designing&quot; and &quot;Building&quot; was slowing me down.
                    </p>
                    <p>
                        Built this portfolio in React/Next.js in weeks by treating AI as my engineering team.
                        I leverage 13 years of design intuition to direct the code.
                    </p>
                </>
            )
        },
        {
            id: 'force',
            icon: Zap, // Or Shield
            label: 'The Capacity',
            title: 'Force of Nature',
            content: (
                <>
                    <p className="mb-4">
                        <strong className="text-slate-900 block mb-1">Resilience.</strong>
                        Earned 2 Bachelor&apos;s degrees while working. Earned a Master&apos;s while scaling enterprise software.
                        Raising two children while shipping releases.
                    </p>
                    <p>
                        I do not break. Elite constraints breed elite focus.
                    </p>
                </>
            )
        }
    ]

    return (
        <div className="py-20 md:py-28 bg-slate-50/50 border-t border-slate-100">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">

                {/* Header - The Proposition */}
                <div className="max-w-4xl mb-16 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest mb-4 block"
                    >
                // THE_MANIFESTO
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-3xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.1] mb-8"
                    >
                        &quot;I don&apos;t need a manual.&quot;
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl"
                    >
                        Most companies hire for a linear path. I am a <strong>Fearless Adapter</strong>.
                        Drop me into ambiguity, legacy code, or a brand-new domain, and I will map the system, learn the language, and build the solution.
                    </motion.p>
                </div>

                {/* The Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 lg:gap-x-16 lg:gap-y-20">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="flex items-start gap-4 md:gap-6">
                                {/* Icon */}
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50 flex items-center justify-center text-[var(--accent-teal)] group-hover:scale-110 transition-transform duration-500">
                                    <pillar.icon strokeWidth={1.5} className="w-6 h-6" />
                                </div>

                                {/* Content */}
                                <div className="space-y-3">
                                    <div className="flex items-baseline gap-3">
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-[var(--accent-teal)] transition-colors">0{index + 1}</span>
                                        <h3 className="font-serif text-xl sm:text-2xl text-slate-900">{pillar.title}</h3>
                                    </div>

                                    <div className="text-slate-600 text-sm sm:text-base leading-relaxed border-l-2 border-slate-200 pl-4 py-1 group-hover:border-[var(--accent-teal)]/30 transition-colors">
                                        {pillar.content}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    )
}
