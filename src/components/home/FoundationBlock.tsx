'use client'

import { motion } from 'framer-motion'

const FOUNDATIONS = [
    'MS Paint', 'CorelDRAW', 'Pencil Drawing',
    'Origami', 'Acrylic & Oil Painting', 'Embroidery',
]

export default function FoundationBlock() {
    return (
        <div className="px-4 md:px-8 lg:px-12 max-w-3xl mx-auto pb-12 md:pb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl bg-[var(--surface-obsidian-900)] border border-white/[0.06] overflow-hidden"
            >
                {/* Compact title bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.05]">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-red)]/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-yellow)]/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--terminal-green-alt)]/60" />
                    </div>
                    <span className="ml-2 text-[10px] font-mono text-white/20 tracking-wider uppercase">
                        the foundation · birth — 2012
                    </span>
                </div>

                {/* Compact terminal content */}
                <div className="px-4 py-3.5 md:px-5 font-mono text-xs md:text-sm flex flex-wrap items-center gap-2">
                    <span className="text-[var(--accent-teal)]/50 shrink-0">~</span>
                    <span className="text-white/15 shrink-0">$</span>
                    <span className="text-white/30 shrink-0 mr-1">ls ./creative-foundations/</span>
                    {FOUNDATIONS.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
                            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-400 text-[11px] tracking-wide hover:bg-[var(--accent-teal)]/10 hover:border-[var(--accent-teal)]/15 hover:text-[var(--accent-teal)] transition-all duration-300 cursor-default"
                        >
                            {skill}
                        </motion.span>
                    ))}
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + FOUNDATIONS.length * 0.08 + 0.1 }}
                        className="inline-block w-1.5 h-3.5 bg-white/30 animate-pulse ml-0.5"
                    />
                </div>
            </motion.div>
        </div>
    )
}
