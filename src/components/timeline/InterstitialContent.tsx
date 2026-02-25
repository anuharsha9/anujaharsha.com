import React from 'react'
import { motion, MotionValue } from 'framer-motion'
import { CareerEra } from '@/data/career-data'

interface InterstitialContentProps {
    era: CareerEra
    lineProgress: MotionValue<number>
    dotOpacities: MotionValue<number>[]
    dotScales: MotionValue<number>[]
}

export default function InterstitialContent({
    era,
    lineProgress,
    dotOpacities,
    dotScales,
}: InterstitialContentProps) {
    const milestones = era.milestones || []

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/20 mb-3">
                    Life Context
                </p>
                <div className="w-10 h-px bg-[var(--accent-teal)]/40 mx-auto mb-4" />
                <p className="font-mono text-[var(--accent-teal)]/60 text-xs tracking-[0.2em] uppercase">
                    {era.period}
                </p>
            </div>

            {/* Centered vertical timeline */}
            <div className="relative w-full max-w-md">
                {/* Background track line */}
                <div className="absolute left-6 sm:left-1/2 sm:-translate-x-[0.5px] top-0 bottom-0 w-px bg-white/[0.06]" />

                {/* Animated cyan line */}
                <div className="absolute left-6 sm:left-1/2 sm:-translate-x-[0.5px] top-0 bottom-0 w-px overflow-hidden neon-line-glow">
                    <motion.div
                        className="w-full bg-gradient-to-b from-[var(--accent-teal)] to-[var(--accent-teal)]/30 origin-top"
                        style={{ height: '100%', scaleY: lineProgress }}
                    />
                </div>

                {/* Milestone items */}
                <div className="space-y-10">
                    {milestones.map((milestone, i) => {
                        const IconComp = milestone.icon;
                        return (
                            <motion.div
                                key={i}
                                className="relative pl-16 sm:pl-0 sm:flex sm:items-center sm:gap-8"
                                style={{ opacity: dotOpacities[i] }}
                            >
                                {/* Glowing dot */}
                                <motion.div
                                    className="absolute left-[18px] sm:left-1/2 sm:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-[var(--accent-teal)] bg-slate-950 z-10"
                                    style={{
                                        scale: dotScales[i],
                                        boxShadow: '0 0 16px var(--overlay-accent-50)',
                                    }}
                                >
                                    <div className="absolute inset-[3px] rounded-full bg-[var(--accent-teal)]" />
                                </motion.div>

                                {/* Year — left side on desktop */}
                                <div className="hidden sm:block sm:w-1/2 sm:text-right sm:pr-10">
                                    <span className="font-mono text-[var(--accent-teal)] text-sm tracking-[0.15em] uppercase">
                                        {milestone.year}
                                    </span>
                                </div>

                                {/* Content — right side on desktop, below on mobile */}
                                <div className="sm:w-1/2 sm:pl-10">
                                    <span className="sm:hidden font-mono text-[var(--accent-teal)] text-[10px] tracking-[0.2em] uppercase block mb-1">
                                        {milestone.year}
                                    </span>
                                    <div className="flex items-center gap-2.5 mb-0.5">
                                        {IconComp && (
                                            <div className="shrink-0 w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                                                {typeof IconComp === 'string' ? (
                                                    <span className="text-sm">{IconComp}</span>
                                                ) : (
                                                    <IconComp className="w-3.5 h-3.5 text-white/40" />
                                                )}
                                            </div>
                                        )}
                                        <span className="text-white font-semibold text-base leading-snug">
                                            {milestone.title}
                                        </span>
                                    </div>
                                    {milestone.subtitle && (
                                        <p className="text-slate-500 text-sm mt-0.5 ml-[38px] sm:ml-[38px]">
                                            {milestone.subtitle}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
