'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Version Data - accurately reflecting the user's manual-to-AI journey
const versions = [
    {
        id: 'v1',
        label: 'Jan 2025',
        title: 'The Baseline',
        desc: 'Panic-built after team layoffs. Juggling a newborn and manual HTML/CSS. Slow, painful progress.',
        tech: 'HTML • CSS • S3',
        video: '/videos/evolution/v1_web.mp4',
        keyLearning: '"Manual coding is too slow for modern iteration."'
    },
    {
        id: 'v2',
        label: 'Nov 10',
        title: 'The Upgrade',
        desc: 'Post-layoff restart. "Black Pink" design. Fighting for traction with manual code and ChatGPT.',
        tech: 'HTML • CSS • ChatGPT',
        video: '/videos/evolution/v2_web.mp4',
        keyLearning: '"AI is an accelerator, but without Architecture, it\'s just noise."'
    },
    {
        id: 'v3',
        label: 'Nov 15',
        title: 'The Speedrun',
        desc: 'White/Pink Redesign. Built in 24 hours using Agentic AI. The first glimpse of high velocity.',
        tech: 'HTML • CSS • AIv1',
        video: '/videos/evolution/v3_web.mp4',
        keyLearning: '"Frameworks (Next.js) are not overhead; they are the scaffold for speed."'
    },
    {
        id: 'v4',
        label: 'Dec 1',
        title: 'The Architecture',
        desc: 'Switched to Next.js 14 and Git. Architected the multi-agent orchestration for enterprise scalability.',
        tech: 'Next.js • Agents • AWS',
        video: '/videos/evolution/v4_web.mp4',
        keyLearning: '"Agents can handle the build, allowing the human to focus on \'Soul\'."'
    },
    {
        id: 'v5',
        label: 'Dec 8',
        title: 'The Polish',
        desc: 'Refining the interaction layer. "Vibe Code" implementation. Achieving portfolio-market fit.',
        tech: 'Framer Motion • Vibe • UX',
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
        }, 5000)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isPlaying, activeIndex])

    const handleTabClick = (id: string) => {
        setActiveTabId(id)
        setIsPlaying(false)
    }

    return (
        <section className="py-12 md:py-16">

            <motion.div
                className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Header — clean Apple typography */}
                <div className="mb-10 md:mb-12">
                    <h3
                        className="font-sans font-black text-3xl md:text-4xl text-slate-900 tracking-tight"
                    >
                        Portfolio Evolution
                    </h3>
                    <p
                        className="text-slate-400 text-base mt-3 max-w-md"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                    >
                        5 distinct portfolio websites. 30 days. One relentless drive.
                    </p>
                </div>

                <div
                    className="group"
                    onMouseEnter={() => setIsPlaying(false)}
                    onMouseLeave={() => setIsPlaying(true)}
                >
                    {/* Timeline tabs — pill style, clean */}
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar">
                        {versions.map((v, i) => (
                            <button
                                key={v.id}
                                onClick={() => handleTabClick(v.id)}
                                className={`
                                    relative flex-shrink-0 px-4 py-2.5 rounded-full text-left transition-all duration-300
                                    ${activeTabId === v.id
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`font-mono text-[10px] uppercase tracking-wider ${activeTabId === v.id ? 'text-[var(--accent-teal)]' : 'text-slate-300'}`}>
                                        {v.label}
                                    </span>
                                    <span className={`font-medium text-sm ${activeTabId === v.id ? 'text-white' : 'text-slate-600'}`}>
                                        {v.title}
                                    </span>
                                </div>

                                {/* Progress bar for auto-play */}
                                {activeTabId === v.id && isPlaying && (
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 5, ease: "linear" }}
                                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--accent-teal)] rounded-full origin-left"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content card — clean white with subtle border */}
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                        {/* Context area */}
                        <div className="p-6 md:p-8 border-b border-slate-100">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTabId}
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col md:flex-row md:items-start gap-6"
                                >
                                    {/* Left: Tech & Description */}
                                    <div className="flex-1">
                                        <span className="inline-flex items-center px-3 py-1 bg-slate-50 rounded-full text-slate-500 font-mono text-[11px] tracking-wider mb-3">
                                            {activeVersion.tech}
                                        </span>
                                        <p
                                            className="text-slate-700 text-base leading-relaxed"
                                            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                                        >
                                            {activeVersion.desc}
                                        </p>
                                    </div>

                                    {/* Right: Key Insight */}
                                    <div className="md:w-[340px] p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                        <div className="flex gap-3">
                                            <div className="w-[2px] bg-[var(--accent-teal)] rounded-full opacity-50 shrink-0" />
                                            <div>
                                                <span className="uppercase font-medium block mb-1 text-[10px] tracking-wider text-slate-400">Key Learning</span>
                                                <p
                                                    className="text-slate-600 font-sans italic text-sm leading-snug"
                                                >
                                                    {activeVersion.keyLearning}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Video area */}
                        <div className="relative aspect-video bg-slate-50">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTabId}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full h-full flex items-center justify-center"
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
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                            <span className="mb-2 block text-4xl">⏳</span>
                                            <p className="text-sm font-mono">Loading Archive...</p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

            </motion.div>
        </section>
    )
}
