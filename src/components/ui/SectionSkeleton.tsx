'use client'

import { motion } from 'framer-motion'

export default function SectionSkeleton({ height = '100dvh', text = 'LOADING MODULE' }: { height?: string, text?: string }) {
  return (
    <div 
      className="w-full relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: height, backgroundColor: 'rgba(1, 2, 4, 0.4)' }}
      aria-hidden="true"
    >
      {/* Structural wireframe grid to give a "technical/system" vibe */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Subtle scanning gradient to simulate data loading without layout shift */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--semantic-cyan)]/5 to-transparent opacity-0"
        animate={{ 
          opacity: [0, 0.7, 0],
          y: ['-100%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Central loading indicator */}
      <div className="flex flex-col items-center gap-6 z-10 p-8 rounded-2xl bg-white/[0.01] border border-white/[0.05] backdrop-blur-sm">
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Outer ring */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-[var(--semantic-cyan)]/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner spinner */}
          <motion.div 
            className="absolute inset-2 rounded-full border-t border-l border-[var(--semantic-cyan)]/60"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          {/* Core dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--semantic-cyan)]/80 animate-pulse" />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">{text}</span>
          <motion.div 
            className="flex gap-1"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-1 rounded-full bg-[var(--semantic-cyan)]/50" />
            <div className="w-1 h-1 rounded-full bg-[var(--semantic-cyan)]/50" />
            <div className="w-1 h-1 rounded-full bg-[var(--semantic-cyan)]/50" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
