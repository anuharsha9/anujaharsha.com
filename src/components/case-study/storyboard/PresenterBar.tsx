'use client'

import { type ReactNode, useState, useEffect, useRef, isValidElement, cloneElement, Fragment } from 'react'
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
    /** Whether to show the presenter avatar and speech bubble pointer (default: true) */
    showAvatar?: boolean
    /** Typewriter speed in characters per second (default: 40) */
    typewriterSpeed?: number
    /** Called when typewriter finishes — use to trigger visual animations */
    onTypingComplete?: () => void
    /** On mobile, fade out the bar after typing completes to save vertical space (default: true) */
    hideOnMobileAfterTyping?: boolean
}

/* ── Count all text characters in a ReactNode tree ── */
function countTextChars(node: ReactNode): number {
    if (node == null || typeof node === 'boolean') return 0
    if (typeof node === 'string') return Array.from(node).length
    if (typeof node === 'number') return String(node).length
    if (Array.isArray(node)) return node.reduce((sum, child) => sum + countTextChars(child), 0)
    if (isValidElement(node)) return countTextChars((node.props as Record<string, unknown>).children as ReactNode)
    return 0
}

/* ── Render children with character-by-character visibility ── */
function applyTypewriter(
    node: ReactNode,
    visibleCount: number,
    counter: { value: number },
): ReactNode {
    if (node == null || typeof node === 'boolean') return node

    if (typeof node === 'string') {
        const chars = Array.from(node)
        return (
            <>
                {chars.map((char, i) => {
                    const idx = counter.value++
                    return (
                        <span
                            key={i}
                            style={{ visibility: idx < visibleCount ? 'visible' : 'hidden' }}
                        >
                            {char}
                        </span>
                    )
                })}
            </>
        )
    }

    if (typeof node === 'number') {
        return applyTypewriter(String(node), visibleCount, counter)
    }

    if (Array.isArray(node)) {
        return node.map((child, i) => (
            <Fragment key={i}>{applyTypewriter(child, visibleCount, counter)}</Fragment>
        ))
    }

    if (isValidElement(node)) {
        const props = node.props as Record<string, unknown>
        return cloneElement(node, {}, applyTypewriter(props.children as ReactNode, visibleCount, counter))
    }

    return node
}

/* ── Typing indicator (three pulsing dots) ──────── */
function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-1 py-1">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-zinc-500"
                    animate={{ y: [0, -4, 0], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                />
            ))}
        </div>
    )
}

export default function PresenterBar({
    narration,
    children,
    delay = 0,
    showAvatar = true,
    typewriterSpeed = 40,
    onTypingComplete,
    hideOnMobileAfterTyping = false,
}: PresenterBarProps) {
    const [phase, setPhase] = useState<'typing' | 'revealing' | 'done'>('typing')
    const [visibleChars, setVisibleChars] = useState(0)
    const [hiddenOnMobile, setHiddenOnMobile] = useState(false)
    const contentRef = useRef<ReactNode>(null)
    const hasFiredComplete = useRef(false)

    const content = children || (
        <p className="text-sm md:text-[15px] text-zinc-200 leading-relaxed">{narration}</p>
    )
    contentRef.current = content

    // Phase 1: typing dots → revealing
    useEffect(() => {
        setPhase('typing')
        setVisibleChars(0)
        const timer = setTimeout(() => setPhase('revealing'), (delay * 1000) + 600)
        return () => clearTimeout(timer)
    }, [delay])

    // Phase 2: character-by-character reveal via rAF
    useEffect(() => {
        if (phase !== 'revealing') return
        const total = countTextChars(contentRef.current)
        if (total === 0) { setPhase('done'); return }

        setVisibleChars(0)
        let startTime: number | null = null
        let rafId: number

        const tick = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const elapsed = timestamp - startTime
            const count = Math.min(Math.floor((elapsed / 1000) * typewriterSpeed), total)
            setVisibleChars(count)
            if (count < total) { rafId = requestAnimationFrame(tick) }
            else {
                setPhase('done')
                if (!hasFiredComplete.current) {
                    hasFiredComplete.current = true
                    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
                    if (isMobile && hideOnMobileAfterTyping) {
                        // On mobile: wait a beat, fade out, then fire callback
                        setTimeout(() => {
                            setHiddenOnMobile(true)
                            setTimeout(() => onTypingComplete?.(), 500)
                        }, 800)
                    } else {
                        onTypingComplete?.()
                    }
                }
            }
        }

        rafId = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafId)
    }, [phase, typewriterSpeed, onTypingComplete, hideOnMobileAfterTyping])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={hiddenOnMobile ? { opacity: 0, height: 0, marginBottom: 0 } : { opacity: 1 }}
            transition={hiddenOnMobile ? { duration: 0.4, ease } : { duration: 0.6, delay, ease }}
            className="flex items-start gap-4 md:gap-5 mb-8 md:mb-10 overflow-hidden"
        >
            {showAvatar && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: delay + 0.1, ease }}
                    className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg shadow-black/20"
                    style={{ border: '1px solid color-mix(in srgb, var(--cs-accent) 20%, transparent)' }}
                >
                    <Image
                        src="/images/presenter-avatar.png"
                        alt="Anuja"
                        width={96}
                        height={96}
                        priority
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, x: -8, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                className={`relative flex-1 bg-white/[0.04] rounded-2xl ${showAvatar ? 'rounded-tl-md' : ''} px-5 py-4 md:px-6 md:py-5 overflow-hidden`}
                style={{ border: '1px solid color-mix(in srgb, var(--cs-accent) 12%, transparent)' }}
            >
                {showAvatar && (
                    <div
                        className="absolute left-0 top-8 -translate-x-full w-0 h-0"
                        style={{
                            borderTop: '6px solid transparent',
                            borderBottom: '6px solid transparent',
                            borderRight: '6px solid var(--overlay-white-08)',
                        }}
                    />
                )}

                {/* Shimmer sweep after typewriter completes */}
                <AnimatePresence>
                    {phase === 'done' && (
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
                        >
                            <div
                                className="w-1/3 h-full"
                                style={{ background: 'linear-gradient(90deg, transparent, var(--overlay-white-04), transparent)' }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

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
                            {phase === 'done'
                                ? content
                                : applyTypewriter(content, visibleChars, { value: 0 })
                            }
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}
