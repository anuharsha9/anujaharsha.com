"use client"

import { motion } from "framer-motion"
import WorduGame from "./wordu/WorduGame"
import { Code, Layers, Sparkles, Zap, Smartphone } from "lucide-react"

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
}

const floatAnimation = {
    animate: {
        y: [0, -15, 0],
        rotate: [0, 1, 0, -1, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
}

const glowPulse = {
    animate: {
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.1, 1],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
}

export default function DesignEngineerBlock() {
    return (
        <section className="py-24 md:py-32 w-full relative overflow-hidden bg-monitor">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-monitor via-monitor-alt to-monitor opacity-60 pointer-events-none -z-10" />

            {/* Animated Background Orbs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 right-20 w-[600px] h-[600px] bg-accent-teal/10 rounded-full blur-[120px] pointer-events-none -z-10"
            />
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    opacity: [0.05, 0.15, 0.05],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10"
            />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 md:mb-24"
                >
                    <div className="lg:col-span-8">
                        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 48 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-[2px] bg-accent-teal"
                            />
                            <span className="text-accent-teal uppercase tracking-widest text-sm font-bold">
                                Design Engineering
                            </span>
                        </motion.div>

                        <motion.h2
                            variants={fadeInUp}
                            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
                        >
                            Shipping front-end <br className="hidden md:block" />
                            <span className="relative inline-block">
                                <span className="absolute -inset-1 bg-gradient-to-r from-accent-teal/20 to-cyan-500/20 blur-lg opacity-50"></span>
                                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-accent-teal via-cyan-400 to-white">
                                    with code.
                                </span>
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed"
                        >
                            Bridging the gap between pixel-perfect design and production engineering. I don't just
                            prototype; I build <span className="text-white font-medium">production-ready interfaces</span>,
                            interactive games, and fluid experiences.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    {/* Project Info (Left) */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="lg:col-span-5 order-2 lg:order-1 space-y-10"
                    >
                        <motion.div variants={fadeInUp} className="space-y-6">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-teal/10 border border-accent-teal/20 text-accent-teal text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(7,139,156,0.1)] hover:shadow-[0_0_20px_rgba(7,139,156,0.3)] transition-all cursor-default"
                            >
                                <Sparkles size={14} className="animate-pulse" />
                                Featured Project
                            </motion.div>

                            <h3 className="text-4xl font-bold text-white">WordU</h3>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                A fast-paced, interactive word chain game built with <strong>Next.js</strong>,{" "}
                                <strong>Framer Motion</strong>, and <strong>Tailwind CSS</strong>. Designed to test
                                vocabulary and speed against a reactive AI opponent.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex flex-col gap-6">
                            <motion.div
                                whileHover={{ x: 10 }}
                                className="flex items-start gap-4 group p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                            >
                                <div className="mt-1 p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-accent-teal group-hover:bg-accent-teal group-hover:text-white group-hover:shadow-[0_0_15px_rgba(7,139,156,0.5)] transition-all duration-300">
                                    <Code size={22} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base group-hover:text-accent-teal transition-colors">
                                        Game Logic & State
                                    </h4>
                                    <p className="text-sm text-slate-500 mt-2 group-hover:text-slate-400 transition-colors">
                                        Complex state management for turn-based gameplay, extensive dictionary validation,
                                        and real-time scoring algorithms.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ x: 10 }}
                                className="flex items-start gap-4 group p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                            >
                                <div className="mt-1 p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300">
                                    <Zap size={22} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base group-hover:text-cyan-400 transition-colors">
                                        Fluid 60fps Animations
                                    </h4>
                                    <p className="text-sm text-slate-500 mt-2 group-hover:text-slate-400 transition-colors">
                                        Layout animations and spring physics using framer-motion to create a native app-like
                                        feel on the web.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="pt-6 border-t border-white/5">
                            <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-4">
                                Tech Stack
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {["React", "TypeScript", "Next.js 14", "Framer Motion", "Tailwind"].map(
                                    (tech, i) => (
                                        <motion.span
                                            key={tech}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                            whileHover={{
                                                y: -3,
                                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                borderColor: "rgba(255, 255, 255, 0.3)",
                                            }}
                                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 font-mono transition-colors cursor-default"
                                        >
                                            {tech}
                                        </motion.span>
                                    )
                                )}
                            </div>
                        </motion.div>

                        <motion.p
                            variants={fadeInUp}
                            className="flex items-center gap-2 text-sm text-slate-500 italic"
                        >
                            <Smartphone size={16} className="text-accent-teal" />
                            Play the live demo on the right (or below on mobile).
                        </motion.p>
                    </motion.div>

                    {/* Interactive Demo (Right) */}
                    <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-end xl:mr-12 perspective-1000">
                        <div className="relative group/phone">
                            {/* Floating Phone Container - iPhone 17 Pro Max Style */}
                            <motion.div
                                initial={{ y: 60, opacity: 0, rotateX: 10 }}
                                whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                viewport={{ once: true, amount: 0.2 }}
                                variants={floatAnimation}
                                animate="animate"
                                className="relative w-[360px] h-[780px] bg-zinc-900 rounded-[55px] shadow-2xl border-[6px] border-zinc-700 ring-1 ring-white/20 transform-gpu z-20"
                                style={{
                                    boxShadow: "0 0 0 2px #27272a, 0 20px 50px -10px rgba(0,0,0,0.5)",
                                }}
                            >
                                {/* Titanium Frame Gradient */}
                                <div className="absolute inset-0 rounded-[49px] border-[2px] border-white/10 pointer-events-none z-50"></div>

                                {/* Dynamic Island */}
                                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-40 flex items-center justify-between px-4 pointer-events-none">
                                    <div className="w-2 h-2 rounded-full bg-neutral-900"></div>
                                    <div className="w-2 h-2 rounded-full bg-neutral-900/50"></div>
                                </div>

                                {/* Side Buttons - Titanium Style */}
                                <div className="absolute top-28 -left-[8px] w-[4px] h-7 bg-zinc-800 rounded-l-sm shadow-sm"></div>
                                <div className="absolute top-40 -left-[8px] w-[4px] h-16 bg-zinc-800 rounded-l-sm shadow-sm"></div>
                                <div className="absolute top-80 -left-[8px] w-[4px] h-16 bg-zinc-800 rounded-l-sm shadow-sm"></div>
                                <div className="absolute top-44 -right-[8px] w-[4px] h-24 bg-zinc-800 rounded-r-sm shadow-sm"></div>

                                {/* Screen Container */}
                                <div className="w-full h-full rounded-[48px] overflow-hidden bg-zinc-50 relative z-10 select-none">
                                    {/* Status Bar Placeholder */}
                                    <div className="absolute top-0 w-full h-14 z-30 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>

                                    {/* Game Component */}
                                    <div className="w-full h-full pt-10 pb-4 px-2">
                                        <WorduGame />
                                    </div>

                                    {/* Home Indicator */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/20 rounded-full z-30 pointer-events-none"></div>
                                </div>
                            </motion.div>

                            {/* Back Glow */}
                            <motion.div
                                variants={glowPulse}
                                animate="animate"
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-accent-teal/15 blur-[90px] rounded-full pointer-events-none z-0"
                            />

                            {/* Floor Shadow */}
                            <motion.div
                                animate={{
                                    scale: [1, 0.9, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-black/50 blur-2xl rounded-[100%] z-0"
                            />
                        </div>
                    </div>
                </div>

                {/* More Projects Badge - Animated */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-24 text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/10 hover:border-accent-teal/30 hover:text-white transition-all group backdrop-blur-sm"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-teal"></span>
                        </span>
                        More design engineering experiments coming soon...
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}
