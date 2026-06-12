'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface FoundationsTerminalProps {
 foundations?: string[]
}

export default function FoundationsTerminal({ foundations = [] }: FoundationsTerminalProps) {
 return (
 <div className="w-full max-w-2xl mx-auto">
 {/* Terminal Window */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
 className="rounded-xl bg-[var(--surface-obsidian-900)] border border-white/[0.08] overflow-hidden shadow-2xl"
 >
 {/* Title Bar */}
 <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
 <div className="flex gap-1.5">
 <div className="w-3 h-3 rounded-full bg-[var(--terminal-red)]/80" />
 <div className="w-3 h-3 rounded-full bg-[var(--terminal-yellow)]/80" />
 <div className="w-3 h-3 rounded-full bg-[var(--terminal-green-alt)]/80" />
 </div>
 <span className="ml-2 text-[11px] font-mono text-zinc-800 tracking-wider uppercase">foundations.sh</span>
 </div>

 {/* Terminal Content */}
 <div className="p-5 md:p-6 font-mono text-sm">
 {/* Prompt */}
 <div className="text-zinc-600 mb-4">
 <span className="text-[var(--accent-teal)]/60">~</span> <span className="text-zinc-800">$</span> <span className="text-zinc-600">ls ./creative-foundations/</span>
 </div>

 {/* Skills as terminal output */}
 <div className="flex flex-wrap gap-2.5">
 {foundations.map((skill, i) => (
 <motion.span
 key={skill}
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true }}
 transition={{
 delay: 0.3 + i * 0.1,
 duration: 0.4,
 ease: 'easeOut'
 }}
 className="px-3.5 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-200 text-[13px] tracking-wide hover:bg-[var(--accent-teal)]/10 hover:border-[var(--accent-teal)]/20 hover:text-[var(--accent-teal)] transition-all duration-300 cursor-default"
 >
 {skill}
 </motion.span>
 ))}
 </div>

 {/* Blinking cursor */}
 <motion.div
 className="mt-4 text-zinc-600"
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true }}
 transition={{ delay: 0.3 + foundations.length * 0.1 + 0.2 }}
 >
 <span className="text-[var(--accent-teal)]/60">~</span> <span className="text-zinc-800">$</span> <span className="inline-block w-2 h-4 bg-white/40 animate-pulse ml-1 -mb-0.5" />
 </motion.div>
 </div>
 </motion.div>
 </div>
 )
}
