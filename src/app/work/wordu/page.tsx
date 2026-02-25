'use client'

import React from 'react'
import WorduGame from '@/components/work/wordu/WorduGame'
import { motion } from 'framer-motion'

export default function WorduPage() {
  return (
    <section aria-label="Wordu game" className="w-full h-screen bg-zinc-50 relative overflow-hidden">
      <WorduGame />

      <motion.a
        href="/"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed top-4 left-4 z-50 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-zinc-200 rounded-full text-xs font-mono text-zinc-500 hover:text-zinc-900 shadow-sm transition-colors"
      >
        ← Back to Portfolio
      </motion.a>
    </section>
  )
}
