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
        video: '/videos/evolution/v1_web.mp4'
    },
    {
        id: 'v2',
        label: 'Nov 14',
        title: 'The Upgrade',
        desc: 'Upgraded "Black Pink" design. Still manual HTML/CSS using ChatGPT. No Git yet, just raw file editing.',
        tech: 'HTML • CSS • ChatGPT',
        video: '/videos/evolution/v2_web.mp4'
    },
    {
        id: 'v3',
        label: 'Nov 17',
        title: 'The Speedrun',
        desc: 'White/Pink Redesign. Built in 24 hours using AI assistance. The first glimpse of high velocity.',
        tech: 'HTML • CSS • AIv1',
        video: '/videos/evolution/v3_web.mp4'
    },
    {
        id: 'v4',
        label: 'Nov 20',
        title: 'The Architecture',
        desc: 'The Pivot & The System. Switched to Next.js 14 and Git. Architected the multi-agent orchestration for enterprise scalability.',
        tech: 'Next.js • Agents • AWS',
        video: '/videos/evolution/v4_web.mp4'
    },
    {
        id: 'v5',
        label: 'Dec 2025',
        title: 'The Polish',
        desc: 'Refining the interaction layer. "Vibe Code" implementation. Achieving portfolio-market fit with the final V5 design.',
        tech: 'Framer Motion • Vibe • UX',
        image: '/images/evolution/v5_polish.svg',
        video: '/videos/evolution/v5_web.mp4'
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
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">



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
                    {/* 1. Timeline / Tabs */}
                    <div className="flex items-center gap-2 md:gap-4 mb-8 overflow-x-auto pb-4 hide-scrollbar justify-start lg:justify-center">
                        {versions.map((v, idx) => (
                            <button
                                key={v.id}
                                onClick={() => handleTabClick(v.id)}
                                className={`
                    relative flex-shrink-0 px-4 py-3 rounded-xl border text-left transition-all duration-300 min-w-[160px]
                    ${activeTabId === v.id
                                        ? 'bg-white border-[var(--accent-teal)] shadow-md scale-105 z-10'
                                        : 'bg-white/50 border-slate-200 text-slate-500 hover:bg-white hover:border-slate-300'
                                    }
                  `}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`font-mono text-[10px] uppercase tracking-wider ${activeTabId === v.id ? 'text-[var(--accent-teal)]' : 'text-slate-400'}`}>
                                        {v.label}
                                    </span>
                                    {/* Progress Bar for active tab */}
                                    {activeTabId === v.id && isPlaying && (
                                        <motion.div
                                            initial={{ width: '0%' }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 5, ease: "linear" }}
                                            className="h-1 bg-[var(--accent-teal)]/20 absolute bottom-0 left-0 right-0"
                                        />
                                    )}
                                </div>
                                <span className={`block font-serif text-sm font-medium ${activeTabId === v.id ? 'text-slate-900' : 'text-slate-600'}`}>
                                    {v.title}
                                </span>

                                {/* Active Indicator Line */}
                                {activeTabId === v.id && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent-teal)] rounded-b-xl overflow-hidden"
                                    >
                                        {/* The loader is the whole bar effectively */}
                                    </motion.div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* 2. Content Display */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-2 md:p-3 shadow-sm">

                        {/* Image/Video Area - Full Width */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-900 group">
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

                        {/* Context Area - Underneath (2-col grid) */}
                        <div className="p-6 md:p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTabId}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid md:grid-cols-[1fr,1.2fr] gap-8 items-start"
                                >
                                    {/* Left: Description & Tech */}
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-slate-600 font-mono text-xs mb-4">
                                            <span>{activeVersion.tech}</span>
                                        </div>
                                        <p className="text-slate-700 text-lg leading-relaxed font-medium">
                                            {activeVersion.desc}
                                        </p>
                                    </div>

                                    {/* Right: Key Insight */}
                                    <div className="p-6 bg-[var(--accent-teal)]/5 border border-[var(--accent-teal)]/20 rounded-2xl relative">
                                        <div className="flex gap-4">
                                            <div className="w-1 bg-[var(--accent-teal)] rounded-full opacity-40 shrink-0" />
                                            <div>
                                                <span className="uppercase font-bold block mb-2 text-xs tracking-wider text-[var(--accent-teal-dark)] opacity-80">Key Learning //</span>
                                                <p className="text-slate-700 font-serif italic text-lg leading-snug">
                                                    {activeTabId === 'v1' && "\"Manual coding is too slow for modern iteration.\""}
                                                    {activeTabId === 'v2' && "\"AI is an accelerator, but without Architecture, it's just noise.\""}
                                                    {activeTabId === 'v3' && "\"Frameworks (Next.js) are not overhead; they are the scaffold for speed.\""}
                                                    {activeTabId === 'v4' && "\"Agents can handle the build, allowing the human to focus on 'Soul'.\""}
                                                    {activeTabId === 'v5' && "\"The final 10% of polish takes 50% of the effort. But it's what sells.\""}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
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

            </div>
        </section>
    )
}
