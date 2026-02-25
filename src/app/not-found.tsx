'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getTheme } from '@/lib/design-system'
import Magnetic from '@/components/ui/Magnetic'

// Custom 404 Page - "The Void" Concept
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--surface-night)] flex flex-col items-center justify-center relative overflow-hidden text-center px-4 selection:bg-[var(--accent-teal)] selection:text-white">
      {/* Background: Subtle animated noise/grain could be good here if we had the asset, but CSS grid is safe */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--overlay-white-03)_1px,transparent_1px),linear-gradient(90deg,var(--overlay-white-03)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-teal)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">

        {/* The "404" Graphic */}
        <div className="relative font-mono font-bold text-[12rem] md:text-[16rem] leading-none tracking-tighter text-transparent select-none">
          <span className="bg-clip-text bg-gradient-to-b from-white/20 to-white/0" style={{ WebkitTextStroke: '1px var(--overlay-white-10)' }}>404</span>

          {/* Floating Element in the center */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 border border-[var(--accent-teal)] rounded-full flex items-center justify-center"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 20, ease: "linear", repeat: Infinity },
              scale: { duration: 4, ease: "easeInOut", repeat: Infinity }
            }}
          >
            <div className="w-2 h-2 bg-[var(--accent-teal)] rounded-full shadow-[0_0_20px_var(--accent-teal)]" />
            {/* Orbiting element */}
            <motion.div
              className="absolute w-full h-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 border border-white/50 rounded-full bg-[var(--surface-night)]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Narrative Text */}
        <div className="space-y-6 mt-[-40px] md:mt-[-60px]">
          <h2 className="font-sans text-3xl md:text-4xl text-white">
            System coordinates invalid.
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
            The page you requested has been moved, deleted, or never existed in this dimension.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Magnetic strength={0.3}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent-teal)] text-white rounded-full font-medium text-sm transition-all hover:bg-[var(--accent-teal-dark)] hover:shadow-[0_0_30px_var(--overlay-accent-30)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Return to Base
            </Link>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Link
              href="/#work-overview"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium text-sm transition-all hover:bg-white/10 backdrop-blur-sm"
            >
              Explore Case Studies
            </Link>
          </Magnetic>
        </div>

        {/* Technical Footer */}
        <div className="absolute bottom-12 left-0 w-full text-center">
          <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
            ERROR_CODE: 404_NOT_FOUND // PATH: {typeof window !== 'undefined' ? window.location.pathname : 'UNKNOWN'}
          </p>
        </div>

      </div>
    </div>
  )
}
