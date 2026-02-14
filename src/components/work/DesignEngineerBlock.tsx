'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Code, Zap, Smartphone, Sparkles, Play } from 'lucide-react'
import GameLightbox from './GameLightbox'
import { getTheme } from '@/lib/design-system'

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
}

export default function DesignEngineerBlock() {
    const [isGameOpen, setIsGameOpen] = useState(false)
    const t = getTheme(false)

    // Spine Logic (Start Node)
    // We want the line to start from the node and go down.

    return (
        <section className="py-24 md:py-32 w-full relative border-t border-white/5 group">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">

                {/* ════════════════════════════════════════════════════════════════════
                   TIMELINE SPINE (START NODE)
                   Matches EraBlock positioning: left-4 md:left-8
                ════════════════════════════════════════════════════════════════════ */}
                {/* ════════════════════════════════════════════════════════════════
                   TIMELINE SPINE (START NODE)
                   Matches EraBlock positioning: Line at left-[30px] (4px wide), Node centered at 32px.
                ════════════════════════════════════════════════════════════════ */}
                <div className="absolute left-0 top-0 bottom-0 pointer-events-none hidden md:block z-0">
                    {/* The Node (Origin) - Centered at 32px (left-24px + 8px) */}
                    <div className="absolute left-[24px] top-[8.5rem] w-4 h-4 rounded-full bg-[var(--accent-teal)] shadow-[0_0_12px_var(--accent-teal)] z-20">
                        <div className="absolute inset-0 animate-ping rounded-full bg-[var(--accent-teal)] opacity-50"></div>
                    </div>

                    {/* The Line (Track) - REMOVED (Handled by UnifiedTimelineLayout) */}
                </div>

                {/* Massive Year Watermark (2026) */}
                <div className="absolute top-10 right-0 md:right-20 text-[120px] md:text-[240px] font-bold text-white/[0.02] pointer-events-none select-none z-0 font-mono leading-none tracking-tighter mix-blend-overlay transition-opacity duration-700 group-hover:text-white/[0.04]">
                    2026
                </div>

                {/* ════════════════════════════════════════════════════════════════════
                   CONTENT (Updated to Single Column Layout)
                ════════════════════════════════════════════════════════════════════ */}
                <div className="flex flex-col lg:flex-row gap-16 items-start pl-8 md:pl-16">

                    {/* Content Column */}
                    <div className="flex-1">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <span className="font-mono text-[var(--accent-teal)] text-xs tracking-widest uppercase font-semibold mb-6 block">
                                The Discipline
                            </span>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-6 tracking-tight leading-[1.1]">
                                Design Engineering.
                            </h2>

                            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg mb-10 font-light">
                                Connecting the structural integrity of code with the emotional resonance of design.
                                <span className="text-slate-300 block mt-4">
                                    I don&apos;t just mock interactions—I build them.
                                </span>
                            </p>
                        </motion.div>

                        {/* Feature Points - Minimalist */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                            className="flex flex-col gap-6 mb-10"
                        >
                            <motion.div variants={fadeInUp} className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white group-hover:bg-white/10 transition-colors">
                                    <Code size={18} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-sm">Production-Grade React</h4>
                                    <p className="text-slate-500 text-xs mt-0.5">TypeScript, Next.js, Architecture</p>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white group-hover:bg-white/10 transition-colors">
                                    <Zap size={18} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-sm">60fps Interaction</h4>
                                    <p className="text-slate-500 text-xs mt-0.5">Framer Motion, Physics, Gestures</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Game Preview Card (Moved here to replace button) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative group cursor-pointer inline-block"
                            onClick={() => setIsGameOpen(true)}
                        >
                            <div className="relative w-[300px] sm:w-[340px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10 group-hover:-translate-y-2 transition-transform duration-500">
                                <Image
                                    src="/images/wordu-cover.png"
                                    alt="WordU Game Design"
                                    fill
                                    className="object-cover"
                                />

                                {/* Hover State: "Play" Overlay */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                            <Play fill="currentColor" className="ml-1" size={24} />
                                        </div>
                                        <span className="text-white text-xs font-mono tracking-widest uppercase font-semibold">Play Demo</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Lightbox for the Game */}
            <GameLightbox isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
        </section>
    )
}

