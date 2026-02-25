'use client'

import { type ReactNode, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface PresenterBarProps {
    /** Plain narration string — used when no children are passed */
    narration?: string
    /** Rich JSX content inside the speech bubble — overrides narration */
    children?: ReactNode
    /** Optional delay before appearing */
    delay?: number
}

/* ── Typing indicator (three pulsing dots) ──────── */
function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-1 py-1">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-zinc-500"
                    animate={{
                        y: [0, -4, 0],
                        opacity: [0.4, 0.9, 0.4],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}

export default function PresenterBar({ narration, children, delay = 0 }: PresenterBarProps) {
    const [phase, setPhase] = useState<'typing' | 'content'>('typing')

    useEffect(() => {
        // Show typing dots briefly, then reveal content
        setPhase('typing')
        const timer = setTimeout(() => setPhase('content'), (delay * 1000) + 600)
        return () => clearTimeout(timer)
    }, [delay])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay, ease }}
            className="flex items-start gap-4 md:gap-5 mb-8 md:mb-10"
        >
            {/* Avatar — large, prominent */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.1, ease }}
                className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl border border-white/[0.08] overflow-hidden shadow-lg shadow-black/20"
            >
                <Image
                    src="/images/presenter-avatar.png"
                    alt="Anuja"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Speech bubble with typing → reveal animation */}
            <motion.div
                initial={{ opacity: 0, x: -8, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                    duration: 0.5,
                    delay: delay + 0.15,
                    ease: [0.34, 1.56, 0.64, 1], // spring overshoot for iMessage pop
                }}
                className="relative flex-1 bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-tl-md px-5 py-4 md:px-6 md:py-5 overflow-hidden"
            >
                {/* Speech bubble pointer */}
                <div
                    className="absolute left-0 top-8 -translate-x-full w-0 h-0"
                    style={{
                        borderTop: '6px solid transparent',
                        borderBottom: '6px solid transparent',
                        borderRight: '6px solid rgba(255,255,255,0.08)',
                    }}
                />

                {/* Shimmer sweep after content lands */}
                <AnimatePresence>
                    {phase === 'content' && (
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
                        >
                            <div
                                className="w-1/3 h-full"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Phase: Typing dots → Content */}
                <AnimatePresence mode="wait">
                    {phase === 'typing' ? (
                        <motion.div
                            key="typing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <TypingDots />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease }}
                        >
                            {children || (
                                <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed">
                                    {narration}
                                </p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}
