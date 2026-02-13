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
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: smoothEase }}
            className={`w-full ${className}`}
        >
            <div className="rounded-xl bg-[#0F172A] shadow-2xl border border-white/10 overflow-hidden w-full">
                {/* macOS Terminal Header */}
                <div className="h-10 bg-[#1E293B] flex items-center px-4 relative border-b border-black/40 w-full">
                    {/* Traffic Lights */}
                    <div className="flex gap-2 shrink-0">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-inner" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-inner" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-inner" />
                    </div>
                    {/* Title - Left aligned for these insights */}
                    <span className="ml-4 font-mono text-xs text-slate-400/80 tracking-wide font-medium flex items-center gap-2 truncate">
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
