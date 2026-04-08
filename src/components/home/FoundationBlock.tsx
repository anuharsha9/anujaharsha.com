'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const ease = [0.05, 0.7, 0.1, 1] as [number, number, number, number]

const PHILOSOPHY_LINES = [
    `"When you look at a chair...`,
    `the only thing that comes to mind is to sit on it.`,
    ``,
    `It's the whole point of creating anything —`,
    `to achieve that obviousness. No?`,
    ``,
    `How does one achieve that?`,
    ``,
    `By obsessing over how humans experience things."`,
]

export default function FoundationBlock() {
    const fullText = PHILOSOPHY_LINES.join('\n')
    const [displayedChars, setDisplayedChars] = useState(0)
    const [started, setStarted] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.4 })

    // Start typing when scrolled into view
    useEffect(() => {
        if (!isInView) return
        const timer = setTimeout(() => setStarted(true), 600)
        return () => clearTimeout(timer)
    }, [isInView])

    // Typewriter effect — char by char with punctuation pauses
    useEffect(() => {
        if (!started || displayedChars >= fullText.length) return

        const char = fullText[displayedChars]
        let speed = 55
        if (char === '.' || char === '?') speed = 450
        else if (char === ',') speed = 200
        else if (char === '—') speed = 350
        else if (char === '\n') speed = 300

        // Extra pause at "..." sequences
        if (fullText.substring(displayedChars, displayedChars + 3) === '...') speed = 500

        const timer = setTimeout(() => setDisplayedChars(c => c + 1), speed)
        return () => clearTimeout(timer)
    }, [started, displayedChars, fullText])

    return (
        <section
            ref={ref}
            className="relative w-full py-24 md:py-32 overflow-hidden border-y border-white/[0.04] bg-transparent"
        >
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-teal)]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center text-center">
                <blockquote className="relative flex flex-col items-center min-h-[280px] md:min-h-[320px]">
                    {/* Large decorative quote mark */}
                    <AnimatePresence>
                        {started && (
                            <motion.span
                                className="absolute -top-12 text-7xl text-white/[0.04] font-serif leading-none select-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, ease }}
                            >
                                &ldquo;
                            </motion.span>
                        )}
                    </AnimatePresence>

                    {/* Typewriter text */}
                    <p className="relative z-10 font-sans italic text-2xl md:text-3xl lg:text-4xl text-white leading-[1.6] whitespace-pre-line">
                        {fullText.slice(0, displayedChars)}
                        {started && displayedChars < fullText.length && (
                            <motion.span
                                className="inline-block w-[2px] h-[0.9em] bg-zinc-400/60 ml-[2px] align-middle"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                            />
                        )}
                    </p>
                </blockquote>
            </div>
        </section>
    )
}
