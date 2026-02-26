'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface NaturalLanguageInsightProps {
    isLightBackground?: boolean
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
}

export default function NaturalLanguageInsight({ isLightBackground = true }: NaturalLanguageInsightProps) {
    return (
        <div className="w-full py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <ComponentHeading
                    variant="block"
                    align="center"
                    tag="MICRO DETAIL"
                    title="One Detail I'm Proud Of"
                    description="The best UX is often the simplest insight."
                    color="teal"
                    className="mb-14"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="space-y-6"
                >

                    {/* The Before - Cryptic Settings */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden">
                            <div className="px-4 py-2 bg-white/[0.04] border-b border-white/[0.06] flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                                    Legacy recurrence settings
                                </span>
                            </div>
                            <div className="p-4 space-y-2">
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="bg-white/[0.04] border border-white/[0.06] rounded px-3 py-2">
                                        <span className="text-[var(--text-muted)]">Freq:</span> <span className="font-mono text-[var(--text-body)]">WEEKLY</span>
                                    </div>
                                    <div className="bg-white/[0.04] border border-white/[0.06] rounded px-3 py-2">
                                        <span className="text-[var(--text-muted)]">Interval:</span> <span className="font-mono text-[var(--text-body)]">1</span>
                                    </div>
                                    <div className="bg-white/[0.04] border border-white/[0.06] rounded px-3 py-2">
                                        <span className="text-[var(--text-muted)]">BYDAY:</span> <span className="font-mono text-[var(--text-body)]">MO,TU,WE,TH,FR</span>
                                    </div>
                                    <div className="bg-white/[0.04] border border-white/[0.06] rounded px-3 py-2">
                                        <span className="text-[var(--text-muted)]">Time:</span> <span className="font-mono text-[var(--text-body)]">18:00:00</span>
                                    </div>
                                </div>
                                <p className="text-xs text-[var(--text-muted)] italic mt-2">Users had to mentally decode what their schedule actually did.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* The Moment */}
                    <motion.div variants={itemVariants}>
                        <div className="flex justify-center">
                            <div className="bg-amber-500/[0.08] border border-amber-500/[0.20] rounded-lg px-5 py-3 max-w-md">
                                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-1">The moment</div>
                                <p className="text-sm text-amber-300 leading-relaxed">
                                    I was configuring a recurrence pattern and tried to <strong>read the schedule out loud</strong>...
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Connector */}
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <div className="flex flex-col items-center gap-0.5">
                            <div className="w-px h-4 bg-gradient-to-b from-amber-400/40 to-emerald-400/50" />
                            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">why not just show that?</span>
                            <div className="w-px h-3 bg-emerald-400/50" />
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                <path d="M1 1L6 6L11 1" stroke="var(--semantic-emerald-500)" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* The After - Natural Language */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-emerald-500/[0.06] border-2 border-emerald-500/[0.25] rounded-xl overflow-hidden shadow-sm shadow-emerald-500/5">
                            <div className="px-4 py-2 bg-emerald-500/[0.08] border-b border-emerald-500/[0.15] flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                                    Natural language summary
                                </span>
                            </div>
                            <div className="p-5">
                                <motion.p
                                    className="text-lg md:text-xl text-[var(--text-heading)] leading-relaxed font-medium"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                >
                                    &quot;Runs <span className="text-emerald-400 font-semibold">Monday to Friday</span> at <span className="text-emerald-400 font-semibold">6:00 PM</span>, recurring <span className="text-emerald-400 font-semibold">every week</span>.&quot;
                                </motion.p>
                                <motion.p
                                    className="text-xs text-[var(--text-muted)] mt-3 italic"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.9 }}
                                >
                                    Users read their schedule like a sentence, not a settings panel.
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>

                    {/* The Reaction */}
                    <motion.div variants={itemVariants}>
                        <div className="bg-[var(--bg-ink-900)] rounded-xl p-5 relative overflow-hidden border border-white/[0.06]">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 pointer-events-none" />
                            <div className="relative z-10 space-y-3">
                                <div className="text-[10px] font-mono text-teal-500 uppercase tracking-wider">The response</div>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs text-amber-400">PM</span>
                                        </div>
                                        <p className="text-sm text-slate-300">Product management gave <span className="text-white font-semibold">instant approval</span>.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-[10px] text-emerald-400">ENG</span>
                                        </div>
                                        <p className="text-sm text-slate-300">Lead engineer said <span className="text-white font-semibold">&quot;YEAH&quot;</span> — and from that moment, became her biggest cheerleader on the RC team.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
