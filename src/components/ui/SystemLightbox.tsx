'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, ZoomIn, ZoomOut, ArrowRight, ArrowLeft } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface SystemLightboxProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode

    // System Inspection Props
    title?: string       // e.g. "SYSTEM_INSPECTION"
    indexString?: string // e.g. "[ 03 / 16 ]" 

    // Interactive Callbacks
    onZoom?: () => void
    onPlay?: () => void
    isPlaying?: boolean // For toggling Play/Pause icon
    onNext?: () => void
    onPrev?: () => void

    // Footer Props
    shortcuts?: { key: string, label: string }[]

    // Layout Props
    className?: string
    showArrows?: boolean

    // Custom Actions
    headerActions?: React.ReactNode
}

/**
 * A reusable, system-styled lightbox component.
 * Features:
 * - React Portal execution (fixes CSS stacking context bugs)
 * - Deep navy "System Inspection" aesthetic
 * - Keyboard shortcuts & interactive controls home
 */
export default function SystemLightbox({
    isOpen,
    onClose,
    children,
    title = "SYSTEM_INSPECTION",
    indexString = "[ 01 / 01 ]",
    onZoom,
    onPlay,
    isPlaying = false,
    onNext,
    onPrev,
    shortcuts = [
        { key: "ESC", label: "CLOSE" },
        { key: "Z", label: "ZOOM" },
        { key: "SPACE", label: "PLAY" },
        { key: "← →", label: "NAVIGATE" }
    ],
    className = '',
    showArrows = true,
    headerActions
}: SystemLightboxProps) {
    const containerRef = useFocusTrap(isOpen)
    const [mounted, setMounted] = useState(false)

    // Store scroll position
    const scrollPositionRef = useRef<number>(0)
    const wasLockedRef = useRef(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    // Scroll Lock Logic
    useEffect(() => {
        if (isOpen && !wasLockedRef.current) {
            scrollPositionRef.current = window.scrollY
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollPositionRef.current}px`
            document.body.style.width = '100%'
            document.body.style.overflow = 'hidden'
            wasLockedRef.current = true
        } else if (!isOpen && wasLockedRef.current) {
            const scrollY = scrollPositionRef.current
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
            document.body.style.overflow = ''
            wasLockedRef.current = false
            requestAnimationFrame(() => {
                window.scrollTo({ top: scrollY, behavior: 'instant' })
            })
        }
        // Cleanup function not needed for portal unmount as state drives it, 
        // but safe to keep for strict ScrollLock hygiene
        return () => {
            if (wasLockedRef.current) {
                const scrollY = scrollPositionRef.current
                document.body.style.position = ''
                document.body.style.top = ''
                document.body.style.width = ''
                document.body.style.overflow = ''
                wasLockedRef.current = false
                window.scrollTo({ top: scrollY, behavior: 'instant' })
            }
        }
    }, [isOpen])

    // Keyboard Navigation
    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowRight' && onNext) onNext()
            if (e.key === 'ArrowLeft' && onPrev) onPrev()
            if (e.key === ' ' && onPlay) {
                e.preventDefault() // Prevent scrolling
                onPlay()
            }
            if (e.key === 'z' && onZoom) onZoom()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose, onNext, onPrev, onPlay, onZoom])

    if (!mounted) return null

    const content = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex flex-col" role="dialog" aria-modal="true">

                    {/* 1. Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-[var(--bg-ink-950)]"
                        onClick={onClose}
                    />

                    {/* 2. Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="relative z-20 flex items-center justify-between px-8 py-6 w-full pointer-events-none"
                    >
                        {/* Left: Title + Index */}
                        <div className="flex items-center gap-4 font-mono text-sm md:text-base tracking-widest uppercase">
                            <span className="text-zinc-500">{"//"} {title}</span>
                            <span className="text-zinc-600">{indexString}</span>
                        </div>

                        {/* Right: Controls */}
                        <div className="flex items-center gap-5 md:gap-8 text-zinc-500 pointer-events-auto">
                            {headerActions}
                            {onPlay && (
                                <button onClick={onPlay} className="hover:text-white transition-colors p-2" aria-label={isPlaying ? "Pause" : "Play"}>
                                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                                </button>
                            )}
                            {onZoom && (
                                <button onClick={onZoom} className="hover:text-white transition-colors p-2" aria-label="Zoom">
                                    <ZoomIn size={28} />
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="hover:text-white transition-colors p-2"
                                aria-label="Close"
                            >
                                <X size={32} />
                            </button>
                        </div>
                    </motion.div>

                    {/* 3. Main Content Area */}
                    <motion.div
                        ref={containerRef as React.RefObject<HTMLDivElement>}
                        className={`relative z-10 flex-1 flex items-center justify-center p-4 md:p-8 w-full max-w-[1800px] mx-auto ${className}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        {children}

                        {/* Navigation Arrows */}
                        {showArrows && (onNext || onPrev) && (
                            <>
                                <button
                                    onClick={onPrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-[var(--bg-ink-900)] border border-slate-800 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:border-slate-600 transition-all hidden md:flex hover:scale-105 active:scale-95 shadow-xl"
                                >
                                    <ArrowLeft size={32} />
                                </button>
                                <button
                                    onClick={onNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-[var(--bg-ink-900)] border border-slate-800 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:border-slate-600 transition-all hidden md:flex hover:scale-105 active:scale-95 shadow-xl"
                                >
                                    <ArrowRight size={32} />
                                </button>
                            </>
                        )}
                    </motion.div>

                    {/* 4. Footer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="relative z-20 w-full py-8 flex items-center justify-center gap-10 md:gap-12 pointer-events-none"
                    >
                        {shortcuts.map((shortcut, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <kbd className="hidden md:inline-flex h-8 px-2.5 items-center justify-center bg-[var(--surface-slate-800)] border border-slate-700/50 rounded-md text-sm font-mono text-zinc-400 min-w-[32px]">
                                    {shortcut.key}
                                </kbd>
                                <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
                                    {shortcut.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    )

    return createPortal(content, document.body)
}
