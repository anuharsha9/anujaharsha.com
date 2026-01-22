'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Version Data - accurately reflecting the user's manual-to-AI journey
const versions = [
    {
        id: 'v1',
        label: 'Jan 2025',
        title: 'The Baseline',
        desc: 'Manual HTML/CSS. Direct S3 uploads. Took months to iterate. The "before" snapshot.',
        tech: 'HTML • CSS • S3',
        video: '/videos/evolution/v1_web.mp4',
        keyLearning: '"Manual coding is too slow for modern iteration."'
    },
    {
        id: 'v2',
        label: 'Nov 14',
        title: 'The Upgrade',
        desc: 'Upgraded "Black Pink" design. Still manual HTML/CSS using ChatGPT. No Git yet, just raw file editing.',
        tech: 'HTML • CSS • ChatGPT',
        video: '/videos/evolution/v2_web.mp4',
        keyLearning: '"AI is an accelerator, but without Architecture, it\'s just noise."'
    },
    {
        id: 'v3',
        label: 'Nov 17',
        title: 'The Speedrun',
        desc: 'White/Pink Redesign. Built in 24 hours using AI assistance. The first glimpse of high velocity.',
        tech: 'HTML • CSS • AIv1',
        video: '/videos/evolution/v3_web.mp4',
        keyLearning: '"Frameworks (Next.js) are not overhead; they are the scaffold for speed."'
    },
    {
        id: 'v4',
        label: 'Nov 20',
        title: 'The Architecture',
        desc: 'The Pivot & The System. Switched to Next.js 14 and Git. Architected the multi-agent orchestration for enterprise scalability.',
        tech: 'Next.js • Agents • AWS',
        video: '/videos/evolution/v4_web.mp4',
        keyLearning: '"Agents can handle the build, allowing the human to focus on \'Soul\'."'
    },
    {
        id: 'v5',
        label: 'Dec 2025',
        title: 'The Polish',
        desc: 'Refining the interaction layer. "Vibe Code" implementation. Achieving portfolio-market fit with the final V5 design.',
        tech: 'Framer Motion • Vibe • UX',
        image: '/images/evolution/v5_polish.svg',
        video: '/videos/evolution/v5_web.mp4',
        keyLearning: '"The final 10% of polish takes 50% of the effort. But it\'s what sells."'
    }
]

export default function PersistenceGallery() {
    const [activeTabId, setActiveTabId] = useState(versions[0].id)
    const [isPlaying, setIsPlaying] = useState(true)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const activeVersion = versions.find(v => v.id === activeTabId) || versions[0]
    const activeIndex = versions.findIndex(v => v.id === activeTabId)

    // Auto-advance logic
    useEffect(() => {
        if (!isPlaying) return

        intervalRef.current = setInterval(() => {
            const nextIndex = (activeIndex + 1) % versions.length
            setActiveTabId(versions[nextIndex].id)
        }, 5000) // 5 seconds per slide for reading time

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isPlaying, activeIndex])

    const handleTabClick = (id: string) => {
        setActiveTabId(id)
        setIsPlaying(false) // Stop auto-play if user interacts
    }

    return (
        <section className="py-10 border-t border-slate-100 bg-slate-50/50">

            <motion.div
                className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >



                {/* Header - Always Visible */}
                <div className="text-center mb-10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-teal)] mb-2 block">
                        Evidence of Velocity //
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-slate-900">
                        Portfolio Evolution Log
                    </h3>
                </div>

                <div
                    className="group"
                    onMouseEnter={() => setIsPlaying(false)}
                    onMouseLeave={() => setIsPlaying(true)}
                >
                    {/* 1. Timeline / Tabs - Simplified with micro-interactions */}
                    <div className="flex items-center gap-1 md:gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar justify-start lg:justify-center">
                        {versions.map((v) => (
                            <motion.button
                                key={v.id}
                                onClick={() => handleTabClick(v.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    relative flex-shrink-0 px-4 py-2.5 rounded-full text-left transition-all duration-300
                                    ${activeTabId === v.id
                                        ? 'bg-slate-900 text-white shadow-lg'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`font-mono text-[10px] uppercase tracking-wider ${activeTabId === v.id ? 'text-[var(--accent-teal)]' : 'text-slate-400'}`}>
                                        {v.label}
                                    </span>
                                    <span className={`font-medium text-sm ${activeTabId === v.id ? 'text-white' : 'text-slate-700'}`}>
                                        {v.title}
                                    </span>
                                </div>

                                {/* Progress indicator for active tab when auto-playing */}
                                {activeTabId === v.id && isPlaying && (
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 5, ease: "linear" }}
                                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-[var(--accent-teal)] rounded-full origin-left"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* 2. Content Display */}
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

                        {/* Context Area - ABOVE the video now */}
                        <div className="p-6 md:p-8 border-b border-slate-100">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTabId}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col md:flex-row md:items-start gap-6"
                                >
                                    {/* Left: Tech & Description */}
                                    <div className="flex-1">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-slate-600 font-mono text-xs mb-3">
                                            <span>{activeVersion.tech}</span>
                                        </div>
                                        <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                                            {activeVersion.desc}
                                        </p>
                                    </div>

                                    {/* Right: Key Insight */}
                                    <div className="md:w-[360px] p-4 bg-[var(--accent-teal)]/5 border border-[var(--accent-teal)]/20 rounded-xl">
                                        <div className="flex gap-3">
                                            <div className="w-0.5 bg-[var(--accent-teal)] rounded-full opacity-60 shrink-0" />
                                            <div>
                                                <span className="uppercase font-bold block mb-1 text-[10px] tracking-wider text-[var(--accent-teal)]">Key Learning</span>
                                                <p className="text-slate-700 font-serif italic text-sm leading-snug">
                                                    {activeVersion.keyLearning}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Image/Video Area - Full Width */}
                        <div className="relative aspect-video bg-slate-900">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTabId}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full h-full flex items-center justify-center bg-black"
                                >
                                    {activeVersion.video ? (
                                        <video
                                            src={activeVersion.video}
                                            autoPlay
                                            muted
                                            playsInline
                                            controls={false}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : activeVersion.image ? (
                                        <div className="relative w-full h-full bg-slate-100">
                                            <Image
                                                src={activeVersion.image}
                                                alt={`Portfolio version: ${activeVersion.title}`}
                                                fill
                                                className="object-contain p-8"
                                            />
                                            {activeTabId === 'v5' && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-slate-200">
                                                        <span className="font-serif text-slate-900 text-lg">You are here 📍</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-900">
                                            <span className="mb-2 block text-4xl">⏳</span>
                                            <p className="text-sm font-mono">Loading Archive...</p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>

                    <div className="text-center mt-6">
                        <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">
                            {isPlaying ? "Auto-playing Evolution Log..." : "Timeline Paused"}
                        </p>
                    </div>

                </div>

            </motion.div>
        </section>
    )
}
