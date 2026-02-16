'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Chapter {
    id: string
    label: string
    target: string // CSS selector or element ID to scroll to
}

const CHAPTERS: Chapter[] = [
    { id: 'promise', label: 'The Promise', target: 'hero' },
    { id: 'craft', label: 'The Craft', target: 'work-overview' },
    { id: 'proof', label: 'The Proof', target: 'era-csg-architect' },
    { id: 'connect', label: "Let's Go", target: 'lets-talk' },
]

export default function ChapterProgress() {
    const [activeChapter, setActiveChapter] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const updateActiveChapter = useCallback(() => {
        const scrollY = window.scrollY
        const viewportHeight = window.innerHeight

        // Don't show until user has scrolled past initial hero viewport
        if (scrollY < viewportHeight * 0.5) {
            setIsVisible(false)
            return
        }
        setIsVisible(true)

        // Find the active chapter by checking which target is closest to viewport center
        let closest = 0
        let closestDistance = Infinity

        for (let i = 0; i < CHAPTERS.length; i++) {
            const el = document.getElementById(CHAPTERS[i].target)
            if (el) {
                const rect = el.getBoundingClientRect()
                const distance = Math.abs(rect.top - viewportHeight * 0.3)
                if (distance < closestDistance) {
                    closestDistance = distance
                    closest = i
                }
            }
        }

        // Special case: if we're near the bottom, activate the last chapter
        if (scrollY + viewportHeight >= document.documentElement.scrollHeight - 200) {
            closest = CHAPTERS.length - 1
        }

        setActiveChapter(closest)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', updateActiveChapter, { passive: true })
        updateActiveChapter()
        return () => window.removeEventListener('scroll', updateActiveChapter)
    }, [updateActiveChapter])

    const scrollToChapter = (target: string) => {
        const el = document.getElementById(target)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-4"
                    aria-label="Page chapter navigation"
                >
                    {CHAPTERS.map((chapter, i) => {
                        const isActive = i === activeChapter
                        const isHovered = i === hoveredIndex
                        const isPast = i < activeChapter

                        return (
                            <button
                                key={chapter.id}
                                onClick={() => scrollToChapter(chapter.target)}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="group flex items-center gap-3 py-1 cursor-pointer bg-transparent border-none outline-none"
                                aria-label={`Navigate to ${chapter.label}`}
                                aria-current={isActive ? 'step' : undefined}
                            >
                                {/* Label — appears on hover or when active */}
                                <AnimatePresence>
                                    {(isHovered || isActive) && (
                                        <motion.span
                                            initial={{ opacity: 0, x: 8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 8 }}
                                            transition={{ duration: 0.2 }}
                                            className={`text-[11px] font-mono uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-300 ${isActive
                                                ? 'text-white/70'
                                                : 'text-white/40'
                                                }`}
                                        >
                                            {chapter.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Dot */}
                                <div className="relative flex items-center justify-center">
                                    {/* Active glow ring */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="chapter-glow"
                                            className="absolute w-4 h-4 rounded-full border border-[var(--accent-teal)]/40"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    {/* The dot itself */}
                                    <motion.div
                                        className={`rounded-full transition-all duration-300 ${isActive
                                            ? 'w-2.5 h-2.5 bg-[var(--accent-teal)] shadow-[0_0_8px_rgba(45,212,191,0.5)]'
                                            : isPast
                                                ? 'w-1.5 h-1.5 bg-white/30'
                                                : 'w-1.5 h-1.5 bg-white/15'
                                            }`}
                                        animate={{
                                            scale: isHovered ? 1.5 : 1,
                                        }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </div>
                            </button>
                        )
                    })}
                </motion.nav>
            )}
        </AnimatePresence>
    )
}
