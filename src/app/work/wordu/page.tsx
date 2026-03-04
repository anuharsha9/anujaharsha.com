'use client'

import React from 'react'
import WorduGame from '@/components/work/wordu/WorduGame'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function WorduPage() {
  return (
    <section
      aria-label="WordU – A word game by Anuja"
      className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg-ink-950, #0a0a1a)' }}
    >
      <h1 className="sr-only">WordU — A Word Game by Anuja Harsha</h1>
      {/* ── Navigation ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      >
        {/* Left: Back to portfolio */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase text-slate-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Portfolio
        </Link>

        {/* Center: System title */}
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.2em] uppercase">
          <span className="text-slate-500">{'//'}  SYSTEM_GAME_MODE: WORDU</span>
        </div>

        {/* Right: Placeholder for symmetry */}
        <div className="w-[140px]" />
      </motion.div>

      {/* ── iPhone Mockup Container ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.15 }}
        className="relative w-[340px] md:w-[400px] aspect-[9/19.5] bg-black rounded-[55px] border-[8px] shadow-2xl overflow-hidden ring-1 ring-white/10"
        style={{ borderColor: 'var(--surface-charcoal-900, #1a1a2e)' }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[20px] z-50 flex items-center justify-center gap-2">
          <div
            className="w-3 h-3 rounded-full ring-1 ring-white/5"
            style={{ background: 'var(--surface-charcoal-950, #0d0d1a)' }}
          />
        </div>

        {/* Screen Content */}
        <div className="w-full h-full bg-white relative overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="w-full h-[40px] flex items-center justify-between px-6 pt-2 z-40 text-black font-medium text-xs">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-2.5 bg-black rounded-[2px]" />
              <div className="w-4 h-2.5 bg-black rounded-[2px]" />
              <div className="w-6 h-2.5 border border-black rounded-[4px] relative">
                <div className="absolute inset-[1px] right-2 bg-black rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Game Content */}
          <div className="flex-1 w-full relative">
            <WorduGame />
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black/20 rounded-full z-50" />
        </div>

        {/* Side Buttons (Visual Only) */}
        <div
          className="absolute top-[100px] -left-[10px] w-[3px] h-[26px] rounded-l-md"
          style={{ background: 'var(--surface-charcoal-800, #2a2a3e)' }}
        />
        <div
          className="absolute top-[140px] -left-[10px] w-[3px] h-[50px] rounded-l-md"
          style={{ background: 'var(--surface-charcoal-800, #2a2a3e)' }}
        />
        <div
          className="absolute top-[200px] -left-[10px] w-[3px] h-[50px] rounded-l-md"
          style={{ background: 'var(--surface-charcoal-800, #2a2a3e)' }}
        />
        <div
          className="absolute top-[180px] -right-[10px] w-[3px] h-[80px] rounded-r-md"
          style={{ background: 'var(--surface-charcoal-800, #2a2a3e)' }}
        />
      </motion.div>

      {/* ── Footer Shortcuts ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-10 flex items-center gap-10 md:gap-12"
      >
        {[
          { key: 'TAP', label: 'SELECT MODE' },
          { key: '🎯', label: 'BUILD WORDS' },
          { key: '⏱', label: '180 SECONDS' },
        ].map((shortcut, i) => (
          <div key={i} className="flex items-center gap-3">
            <kbd className="hidden md:inline-flex h-8 px-2.5 items-center justify-center rounded-md text-sm font-mono text-slate-400 min-w-[32px]"
              style={{ background: 'var(--surface-slate-800, #1e293b)', border: '1px solid rgba(100,116,139,0.3)' }}
            >
              {shortcut.key}
            </kbd>
            <span className="font-mono text-xs tracking-[0.2em] text-slate-500 uppercase">
              {shortcut.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── Background ambient glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }}
      />
    </section>
  )
}
