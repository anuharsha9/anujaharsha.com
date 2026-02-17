'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Milestone } from '@/data/career-data'

export default function MilestoneConnector({ milestones }: { milestones: Milestone[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax or scroll-linked animations for the connector
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <div ref={containerRef} className="relative z-10 w-full py-24 md:py-32 flex flex-col items-center">
            {milestones.map((milestone, idx) => {
                const IconComp = milestone.icon;
                const isEven = idx % 2 === 0;

                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="relative flex items-center w-full max-w-4xl px-4 md:px-0 mb-16 last:mb-0 group/milestone"
                    >
                        {/* Center Dot on the Spine */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border border-white/20 z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover/milestone:border-[var(--accent-teal)] group-hover/milestone:scale-125 transition-all duration-300 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover/milestone:bg-[var(--accent-teal)] transition-colors" />
                        </div>

                        {/* Content Card - Alternating sides on desktop, straight list on mobile */}
                        <div className={`w-full flex ${isEven ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'} justify-center pl-12 md:pl-0`}>
                            <div className={`
                                relative p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm 
                                hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300
                                w-full md:max-w-sm flex items-start gap-4
                                group-hover/milestone:shadow-lg group-hover/milestone:shadow-black/20
                            `}>
                                {/* Icon Box */}
                                <div className="shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover/milestone:text-[var(--accent-teal)] group-hover/milestone:border-[var(--accent-teal)]/30 transition-colors">
                                    {typeof IconComp === 'string' ? (
                                        <span className="text-lg">{IconComp}</span>
                                    ) : (
                                        IconComp && <IconComp className="w-5 h-5" />
                                    )}
                                </div>

                                {/* Text Content */}
                                <div>
                                    <div className="font-mono text-[10px] text-[var(--accent-teal)] uppercase tracking-wider mb-1 opacity-80">
                                        {milestone.year}
                                    </div>
                                    <h4 className="text-white font-serif text-lg leading-tight mb-1">
                                        {milestone.title}
                                    </h4>
                                    {milestone.subtitle && (
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {milestone.subtitle}
                                        </p>
                                    )}
                                </div>

                                {/* Horizontal Connector Line (Visual only) - connects card to spine dot */}
                                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px w-12 bg-white/10 group-hover/milestone:bg-white/20 transition-colors ${isEven ? '-left-12' : '-right-12'}`} />
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
