'use client'

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, RefreshCw } from 'lucide-react'
import WorduGame from './wordu/WorduGame'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface GameLightboxProps {
    isOpen: boolean
    onClose: () => void
}

export default function GameLightbox({ isOpen, onClose }: GameLightboxProps) {
    const containerRef = useFocusTrap(isOpen)
    const wasLockedRef = useRef(false)
    const scrollPositionRef = useRef(0)

    // Scroll lock logic
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
            window.scrollTo(0, scrollY)
        }
        return () => {
            if (wasLockedRef.current) {
                document.body.style.position = ''
                document.body.style.top = ''
                document.body.style.width = ''
                document.body.style.overflow = ''
                wasLockedRef.current = false
            }
        }
    }, [isOpen])

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
                    onClick={onClose}
                />

                {/* Game Container */}
                <motion.div
                    ref={containerRef as React.RefObject<HTMLDivElement>}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full max-w-md h-[800px] max-h-[90vh] mx-4 z-10 pointer-events-auto flex flex-col"
                >
                    {/* Close Button - Outside Top Right */}
                    <button
                        onClick={onClose}
                        className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm"
                        aria-label="Close game"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Game Frame - Mimicking Phone */}
                    <div className="w-full h-full bg-zinc-900 rounded-[55px] shadow-2xl border-[6px] border-zinc-800 ring-1 ring-white/10 overflow-hidden relative">
                        {/* Dynamic Island */}
                        <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-40 flex items-center justify-between px-4 pointer-events-none">
                            <div className="w-2 h-2 rounded-full bg-neutral-900"></div>
                            <div className="w-2 h-2 rounded-full bg-neutral-900/50"></div>
                        </div>

                        {/* Screen Content */}
                        <div className="w-full h-full bg-zinc-50 pt-12 pb-4 px-0 overflow-hidden">
                            <WorduGame />
                        </div>

                        {/* Home Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/20 rounded-full z-30 pointer-events-none mix-blend-multiply"></div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
