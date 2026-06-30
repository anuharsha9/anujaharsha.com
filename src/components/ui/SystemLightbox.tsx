'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { m, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, ZoomIn, ArrowRight, ArrowLeft } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { DURATION } from '@/lib/motion'
import IconButton from '@/components/ui/IconButton'
import { GLASS_PILL } from '@/lib/surfaces'

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

    /* Mobile-native chrome: at narrow widths the cinematic terminal header
     * (// SYSTEM_PREVIEW: long-title-here [ INDEX ] + Action buttons + X) overflows,
     * clips, and reads as broken. On mobile we drop all of it for a clean
     * native-app sheet: a single safe-area-aware close button and the children
     * fill the viewport. Consumers (PdfLightbox etc.) handle their own primary
     * actions in the body content, so this stays useful without API changes. */
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 639px)')
        const update = () => setIsMobile(mq.matches)
        update()
        mq.addEventListener('change', update)
        return () => mq.removeEventListener('change', update)
    }, [])

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

    // Removed lightbox-open class logic to keep custom cursor visible

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
                <div
                    ref={containerRef as React.RefObject<HTMLDivElement>}
                    className="fixed inset-0 z-[99999] flex flex-col"
                    role="dialog"
                    aria-modal="true"
                    aria-label={title}
                >

                    {/* 1. Backdrop */}
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: DURATION.base }}
                        className="absolute inset-0 bg-black"
                        onClick={onClose}
                    />

                    {/* 2. Header — desktop terminal vs mobile-native */}
                    {isMobile ? (
                        /* Mobile: floating close button at top-right with safe-area padding.
                           No title, no index, no header actions (consumers put primary
                           actions in body content), no shortcuts (no keyboard on mobile). */
                        <m.div
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: DURATION.fast, delay: 0.1 }}
                            className="relative z-20 flex justify-end pointer-events-none"
                            style={{
                                paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
                                paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
                            }}
                        >
                            <IconButton icon={X} label="Close" onClick={onClose} size="md" />
                        </m.div>
                    ) : (
                        /* Desktop: cinematic terminal chrome */
                        <m.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: DURATION.base, delay: 0.1 }}
                            className="relative z-20 flex items-center justify-between px-6 py-5 md:px-8 md:py-6 w-full pointer-events-none"
                        >
                            {/* Left: Title + Index — in the shared glass pill so the
                                lightbox header reads as the same system as the nav island. */}
                            <div className={`${GLASS_PILL} pointer-events-auto inline-flex items-center gap-3 px-4 py-2 font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase`}>
                                <span className="text-zinc-300">{"//"} {title}</span>
                                <span className="text-zinc-500">{indexString}</span>
                            </div>

                            {/* Right: Controls — all on the canonical glass IconButton. */}
                            <div className="flex items-center gap-2.5 md:gap-3 pointer-events-auto">
                                {headerActions}
                                {onPlay && (
                                    <IconButton
                                        icon={isPlaying ? Pause : Play}
                                        label={isPlaying ? 'Pause' : 'Play'}
                                        onClick={onPlay}
                                        fill
                                    />
                                )}
                                {onZoom && <IconButton icon={ZoomIn} label="Zoom" onClick={onZoom} />}
                                <IconButton icon={X} label="Close" onClick={onClose} />
                            </div>
                        </m.div>
                    )}

                    {/* 3. Main Content Area
                        data-lenis-prevent — without this, Lenis (smooth-scroll)
                        intercepts wheel events globally and the inner scroller
                        never receives them, so case-study content can't scroll
                        even though its scrollHeight > clientHeight. */}
                    <m.div
                        data-lenis-prevent
                        className={`relative z-10 flex-1 min-h-0 flex items-center justify-center p-4 md:p-8 w-full max-w-[1800px] mx-auto ${className}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        {children}

                        {/* Navigation Arrows — the canonical glass IconButton, large thumb targets. */}
                        {showArrows && (onNext || onPrev) && (
                            <>
                                {onPrev && (
                                    <IconButton
                                        icon={ArrowLeft}
                                        label="Previous"
                                        onClick={onPrev}
                                        size="lg"
                                        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2"
                                    />
                                )}
                                {onNext && (
                                    <IconButton
                                        icon={ArrowRight}
                                        label="Next"
                                        onClick={onNext}
                                        size="lg"
                                        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2"
                                    />
                                )}
                            </>
                        )}
                    </m.div>

                    {/* 4. Footer — keyboard shortcuts only on desktop (no keyboard on mobile) */}
                    {!isMobile && (
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: DURATION.base, delay: 0.1 }}
                            className="relative z-20 w-full py-8 flex items-center justify-center gap-10 md:gap-12 pointer-events-none"
                        >
                            {shortcuts.map((shortcut, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <kbd className="hidden md:inline-flex h-8 px-2.5 items-center justify-center bg-[var(--overlay-white-05)] border border-[var(--overlay-white-10)] rounded-md text-sm font-mono text-zinc-400 min-w-[32px] backdrop-blur-md">
                                        {shortcut.key}
                                    </kbd>
                                    <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
                                        {shortcut.label}
                                    </span>
                                </div>
                            ))}
                        </m.div>
                    )}

                </div>
            )}
        </AnimatePresence>
    )

    return createPortal(content, document.body)
}
