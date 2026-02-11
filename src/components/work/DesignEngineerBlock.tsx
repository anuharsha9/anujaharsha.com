'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Zap, Smartphone, Sparkles, Play } from 'lucide-react'
import GameLightbox from './GameLightbox'

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

    return (
        <section className="py-16 md:py-24 w-full relative overflow-hidden bg-monitor border-t border-white/5">
            {/* Ambient Background Elements - Toned down */}
            <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-monitor via-monitor-alt to-monitor opacity-40 pointer-events-none -z-10" />

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text Content */}
                    <div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <motion.span
                                variants={{ hidden: { width: 0 }, visible: { width: 32 } }}
                                className="h-[2px] bg-accent-teal"
                            />
                            <span className="text-accent-teal uppercase tracking-widest text-xs font-bold">
                                Design Engineering
                            </span>
                        </motion.div>

                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                        >
                            Frontend logic meets <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal via-cyan-400 to-white">
                                pixel-perfect UI.
                            </span>
                        </motion.h2>

                        <motion.p
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                        >
                            I don't just mock interactions—I build them. Bridging the gap between
                            Figma prototyping and production-ready React code.
                        </motion.p>

                        {/* Feature Points - Compact */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                            className="flex flex-col gap-4 mb-8"
                        >
                            <motion.div variants={fadeInUp} className="flex items-center gap-4 group">
                                <div className="p-2 rounded-lg bg-white/5 text-accent-teal border border-white/10 group-hover:bg-accent-teal group-hover:text-white transition-colors">
                                    <Code size={18} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-sm">Production-Grade React</h4>
                                    <p className="text-slate-500 text-xs">TypeScript, Next.js, and clean component architecture.</p>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex items-center gap-4 group">
                                <div className="p-2 rounded-lg bg-white/5 text-cyan-400 border border-white/10 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                    <Zap size={18} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-sm">60fps Animations</h4>
                                    <p className="text-slate-500 text-xs">Complex physics and gestures powered by Framer Motion.</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.button
                            onClick={() => setIsGameOpen(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="hidden lg:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-teal text-white font-bold text-sm shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all"
                        >
                            <Smartphone size={16} />
                            <span>Launch WordU Demo</span>
                        </motion.button>
                    </div>

                    {/* Right Column: Game Preview Card */}
                    <div className="relative flex justify-center lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative group cursor-pointer"
                            onClick={() => setIsGameOpen(true)}
                        >
                            {/* Card Container */}
                            <div className="relative w-[300px] sm:w-[340px] aspect-[4/5] bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                                {/* Gradient Bg */}
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-50" />

                                {/* Game UI Mockup (Abstracted) */}
                                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center">
                                    <div className="mb-6 relative">
                                        <div className="absolute inset-0 bg-accent-teal/20 blur-xl rounded-full animate-pulse" />
                                        <div className="relative w-24 h-24 bg-zinc-950 rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl">
                                            <div className="flex font-black text-2xl tracking-tighter">
                                                <span className="text-white">W</span>
                                                <span className="text-[#00ADEE]">U</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">WordU</h3>
                                    <p className="text-slate-400 text-sm mb-6 max-w-[200px]">
                                        A fast-paced word chain game with AI opponents.
                                    </p>

                                    {/* Play Button Visual */}
                                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <Play fill="currentColor" className="ml-1" size={24} />
                                    </div>
                                    <p className="mt-4 text-[10px] text-slate-500 font-mono tracking-widest uppercase">Click to Play</p>
                                </div>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-4 -right-4 bg-accent-teal text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-zinc-950 animate-bounce">
                                EXPERIMENT
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

