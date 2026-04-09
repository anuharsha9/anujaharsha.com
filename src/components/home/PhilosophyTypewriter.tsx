'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const ease = [0.05, 0.7, 0.1, 1] as [number, number, number, number]

const CHAIR_PHILOSOPHY = [
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

export default function PhilosophyTypewriter() {
    const fullText = CHAIR_PHILOSOPHY.join('\n')
    const [displayedChars, setDisplayedChars] = useState(0)
    const [started, setStarted] = useState(false)
    const [fading, setFading] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    // Start typing when the section scrolls into view
    useEffect(() => {
        if (!isInView) return
        const startTimer = setTimeout(() => setStarted(true), 600)
        return () => clearTimeout(startTimer)
    }, [isInView])

    // Never fade out — it stays as a permanent closing statement
    useEffect(() => {
        if (displayedChars < fullText.length) return
        // Optional: fade out after a long time if desired
        // const fadeTimer = setTimeout(() => setFading(true), 30000)
        // return () => clearTimeout(fadeTimer)
    }, [displayedChars, fullText.length])

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
        <div
            ref={ref}
            className="relative py-20 md:py-32 flex items-center justify-center"
        >
            <AnimatePresence>
                {started && !fading && (
                    <motion.div
                        className="max-w-xl mx-auto text-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 1.2, ease }}
                    >
                        <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-500/70 leading-relaxed italic whitespace-pre-line">
                            {fullText.slice(0, displayedChars)}
                            {displayedChars < fullText.length && (
                                <motion.span
                                    className="inline-block w-[2px] h-[1em] bg-zinc-500/60 ml-[1px] align-middle"
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                                />
                            )}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
