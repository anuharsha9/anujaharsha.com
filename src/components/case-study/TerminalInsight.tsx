'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TerminalInsightProps {
    title: string
    insightLabel?: string
    children: ReactNode
    className?: string
    initial?: any
    whileInView?: any
    viewport?: any
    transition?: any
}

export default function TerminalInsight({
    title,
    insightLabel,
    children,
    className = '',
    initial = { opacity: 0, y: 20 },
    whileInView = { opacity: 1, y: 0 },
    viewport = { once: true },
    transition = { duration: 0.6 }
}: TerminalInsightProps) {
    // Apple-style smooth easing
    const smoothEase = [0.22, 1, 0.36, 1]

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, scale: 0.95, y: 30 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 1.2, ease: smoothEase }
                }
            }}
            className={`w-full ${className}`}
        >
            <div className="rounded-xl bg-[var(--bg-ink-900)] shadow-2xl border border-white/10 overflow-hidden w-full">
                {/* Header - Simplified */}
                <div className="h-10 bg-slate-900/50 flex items-center px-4 relative border-b border-white/5 w-full">
                    {/* Title */}
                    <span className="font-mono text-xs text-slate-400/80 tracking-wide font-medium flex items-center gap-2 truncate">
                        {title}
                    </span>
                </div>

                {/* Terminal Body with Typing Reveal */}
                <div className="p-6 md:p-8 font-mono text-sm leading-relaxed text-slate-300 w-full">
                    {insightLabel && (
                        <span className="text-emerald-400/90 font-bold block mb-2 text-xs uppercase tracking-widest">
                            &gt; {insightLabel}
                        </span>
                    )}
                    <motion.div
                        className="w-full"
                        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                        whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: smoothEase, delay: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
