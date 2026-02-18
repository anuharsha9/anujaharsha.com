'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useStoryMode, STORY_CHAPTERS } from './StoryModeContext'

export default function StoryModeBar() {
    const {
        isActive,
        isPaused,
        currentChapter,
        progress,
        stopStoryMode,
        pauseStoryMode,
        resumeStoryMode,
    } = useStoryMode()

    const chapter = STORY_CHAPTERS[currentChapter]

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-[60] pointer-events-auto"
                >
                    {/* Progress bar — thin line at the very top of the bar */}
                    <div className="h-[2px] bg-white/5 relative">
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-teal-400 to-cyan-400"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: 'linear' }}
                        />
                    </div>

                    {/* Content area */}
                    <div className="bg-[#0a0f1e]/90 backdrop-blur-xl border-t border-white/5">
                        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-6">
                            {/* Chapter indicator */}
                            <div className="hidden sm:flex items-center gap-2 shrink-0">
                                {STORY_CHAPTERS.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentChapter
                                            ? 'bg-teal-400 scale-125'
                                            : i < currentChapter
                                                ? 'bg-white/30'
                                                : 'bg-white/10'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="hidden sm:block w-px h-8 bg-white/10 shrink-0" />

                            {/* Chapter title + narration */}
                            <div className="flex-1 min-w-0">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={chapter?.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-teal-400/70 mb-0.5">
                                            Chapter {currentChapter + 1} — {chapter?.title}
                                        </p>
                                        <p className="text-white/60 text-sm font-sans italic leading-relaxed truncate">
                                            {chapter?.narration}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-2 shrink-0">
                                {/* Pause / Resume */}
                                {isPaused ? (
                                    <button
                                        onClick={resumeStoryMode}
                                        className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/30 transition-all duration-300 cursor-pointer"
                                        aria-label="Resume story"
                                    >
                                        <svg className="w-3 h-3 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 group-hover:text-white/70">
                                            Resume
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={pauseStoryMode}
                                        className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                                        aria-label="Pause story"
                                    >
                                        <svg className="w-3 h-3 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                                        </svg>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 group-hover:text-white/70">
                                            Pause
                                        </span>
                                    </button>
                                )}

                                {/* Exit */}
                                <button
                                    onClick={stopStoryMode}
                                    className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-400/30 transition-all duration-300 cursor-pointer"
                                    aria-label="Exit story mode"
                                >
                                    <svg className="w-3 h-3 text-white/40 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 group-hover:text-red-300">
                                        Exit
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
