'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

/* ─── Evolution log data (extracted from /me page) ─── */
const EVOLUTION_VERSIONS = [
    {
        id: 'v1', label: 'Jan 2025', title: 'The Baseline',
        desc: 'Panic-built after team layoffs. Juggling a newborn and manual HTML/CSS.',
        tech: 'HTML • CSS • S3',
        video: '/videos/evolution/v1_web.mp4',
        keyLearning: '"Manual coding is too slow for modern iteration."',
        accent: 'var(--accent-teal)',
    },
    {
        id: 'v2', label: 'Nov 10', title: 'The Upgrade',
        desc: 'Post-layoff restart. "Black Pink" design. Fighting for traction.',
        tech: 'HTML • CSS • ChatGPT',
        video: '/videos/evolution/v2_web.mp4',
        keyLearning: '"AI is an accelerator, but without Architecture, it\'s just noise."',
        accent: 'var(--semantic-magenta-500)',
    },
    {
        id: 'v3', label: 'Nov 15', title: 'The Speedrun',
        desc: 'White/Pink Redesign. Built in 24 hours. First glimpse of high velocity.',
        tech: 'HTML • CSS • AIv1',
        video: '/videos/evolution/v3_web.mp4',
        keyLearning: '"Frameworks are not overhead; they are the scaffold for speed."',
        accent: 'var(--semantic-orange-vivid)',
    },
    {
        id: 'v4', label: 'Dec 1', title: 'The Architecture',
        desc: 'Next.js 14 + Git. Multi-agent orchestration for enterprise scalability.',
        tech: 'Next.js • Agents • AWS',
        video: '/videos/evolution/v4_web.mp4',
        keyLearning: '"Agents handle the build. The human focuses on Soul."',
        accent: 'var(--semantic-cyan-vivid)',
    },
    {
        id: 'v5', label: 'Dec 8', title: 'The Polish',
        desc: 'Refining the interaction layer. Achieving portfolio-market fit.',
        tech: 'Framer Motion • Vibe • UX',
        video: '/videos/evolution/v5_web.mp4',
        keyLearning: '"The final 10% of polish takes 50% of the effort."',
        accent: 'var(--semantic-purple-vivid)',
    },
]

const ORCHESTRATION_STACK = [
    { name: 'ChatGPT', role: 'Strategy' },
    { name: 'Claude', role: 'Architecture' },
    { name: 'Gemini', role: 'Polish' },
    { name: 'Cursor', role: 'Build' },
    { name: 'Antigravity', role: 'Logic' },
    { name: 'AWS', role: 'Scale' },
    { name: 'Next.js 16', role: 'Framework' },
    { name: 'Framer Motion', role: 'Animation' },
    { name: 'Tailwind', role: 'Style' },
    { name: 'Figma', role: 'Design' },
    { name: 'Git', role: 'Version Control' },
    { name: 'TypeScript', role: 'Safety' },
]

interface PortfolioLightboxProps {
    isOpen: boolean
    onClose: () => void
}

export default function PortfolioLightbox({ isOpen, onClose }: PortfolioLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const videoRef = useRef<HTMLVideoElement>(null)

    const goNext = useCallback(() => {
        setCurrentIndex(prev => Math.min(prev + 1, EVOLUTION_VERSIONS.length - 1))
    }, [])

    const goPrev = useCallback(() => {
        setCurrentIndex(prev => Math.max(prev - 1, 0))
    }, [])

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowRight') goNext()
            if (e.key === 'ArrowLeft') goPrev()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [isOpen, onClose, goNext, goPrev])

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    // Reset index when opening
    useEffect(() => {
        if (isOpen) setCurrentIndex(0)
    }, [isOpen])

    const current = EVOLUTION_VERSIONS[currentIndex]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />

                    {/* Content */}
                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between py-4 shrink-0">
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                                    Portfolio Evolution Log
                                </span>
                                <span className="font-mono text-[10px] text-white/20">
                                    {currentIndex + 1}/{EVOLUTION_VERSIONS.length}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Main content grid */}
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 min-h-0 pb-4">
                            {/* Left: Video + version info */}
                            <div className="flex flex-col min-h-0">
                                {/* Version badge */}
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                                        {current.label}
                                    </span>
                                    <div className="flex-1 h-[1px] bg-white/10" />
                                    <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: current.accent }}>
                                        {current.tech}
                                    </span>
                                </div>

                                <h3 className="font-extrabold text-3xl md:text-4xl text-white mb-2 tracking-tight">
                                    {current.title}
                                </h3>
                                <p className="text-white/40 text-sm mb-4">{current.desc}</p>

                                {/* Video */}
                                <div className="relative flex-1 rounded-xl overflow-hidden border border-white/10 min-h-0">
                                    <AnimatePresence mode="wait">
                                        <motion.video
                                            key={current.id}
                                            ref={videoRef}
                                            src={current.video}
                                            autoPlay
                                            muted
                                            playsInline
                                            loop
                                            className="absolute inset-0 w-full h-full object-contain bg-black"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Key learning */}
                                <div className="flex items-start gap-3 mt-4">
                                    <div className="w-[2px] h-6 shrink-0 rounded-full" style={{ backgroundColor: current.accent }} />
                                    <p className="text-white/30 text-xs italic">{current.keyLearning}</p>
                                </div>

                                {/* Navigation */}
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        onClick={goPrev}
                                        disabled={currentIndex === 0}
                                        className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    {/* Dots */}
                                    <div className="flex gap-2">
                                        {EVOLUTION_VERSIONS.map((v, i) => (
                                            <button
                                                key={v.id}
                                                onClick={() => setCurrentIndex(i)}
                                                className="h-1.5 rounded-full transition-all duration-500"
                                                style={{
                                                    width: i === currentIndex ? 24 : 8,
                                                    backgroundColor: i === currentIndex ? current.accent : 'rgba(255,255,255,0.15)',
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={goNext}
                                        disabled={currentIndex === EVOLUTION_VERSIONS.length - 1}
                                        className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Right sidebar: Orchestration Stack */}
                            <div className="hidden lg:flex flex-col border-l border-white/8 pl-6">
                                <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20 mb-6">
                                    Orchestration Stack
                                </h4>
                                <p className="text-white/30 text-xs mb-6 leading-relaxed">
                                    1 Architect. 6 AI Agents. A relentless design-engineering bridge.
                                </p>
                                <div className="flex flex-col gap-2">
                                    {ORCHESTRATION_STACK.map((tool, i) => (
                                        <motion.div
                                            key={tool.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.04, duration: 0.4 }}
                                            className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition-colors"
                                        >
                                            <span className="text-white/70 text-sm font-medium">{tool.name}</span>
                                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">{tool.role}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
