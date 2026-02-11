'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface PdfLightboxProps {
    isOpen: boolean
    onClose: () => void
    pdfUrl: string
    title?: string
}

export default function PdfLightbox({
    isOpen,
    onClose,
    pdfUrl,
    title = 'Document Preview'
}: PdfLightboxProps) {
    const containerRef = useFocusTrap(isOpen)

    // Store scroll position in ref to persist across re-renders
    const scrollPositionRef = useRef<number>(0)
    // Track if scroll was locked
    const wasLockedRef = useRef(false)

    // Scroll lock styling (copied from ImageLightbox for consistency)
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
                window.scrollTo({
                    top: scrollY,
                    behavior: 'instant'
                })
            })
        }
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
            {isOpen && (
                <div className="fixed inset-0 z-[9999]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Top Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-slate-900/90 border-b border-white/10"
                    >
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest hidden sm:inline">
                                {'// PDF_VIEWER'}
                            </span>
                            <span className="font-sans text-sm text-slate-200 font-medium truncate max-w-[200px] sm:max-w-md">
                                {title}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <a
                                href={pdfUrl}
                                download
                                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-[var(--accent-teal)] text-slate-300 hover:text-white rounded text-xs font-medium transition-colors duration-200 group"
                            >
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">Download</span>
                            </a>

                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Main Content (Iframe) */}
                    <div
                        ref={containerRef as React.RefObject<HTMLDivElement>}
                        className="absolute inset-0 pt-16 pb-0 md:pb-4 px-0 md:px-4 lg:px-8 flex flex-col items-center justify-center h-full w-full pointer-events-none"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full h-full max-w-6xl mx-auto pointer-events-auto"
                        >
                            <iframe
                                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                className="w-full h-full rounded-none md:rounded-lg shadow-2xl bg-slate-800"
                                title="PDF Viewer"
                            />
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}
