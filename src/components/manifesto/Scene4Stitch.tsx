import { motion, useTransform, MotionValue } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

const easeCinematic = [0.16, 1, 0.3, 1]

// Grid configuration
const COLS = 6
const ROWS = 4
const CELL_STEP = 64 // 56px (w-14) + 8px gap
const TOTAL_NODES = COLS * ROWS

// Define the critical nodes to be inspected
const ACTIONS = {
  REMOVE: 7, // index 7
  ENHANCE: 14, // index 14
  REPLACE: 21, // index 21
}

export function Scene4Stitch({ progress }: { progress: number }) {
  // Phase 1 (0-0.1): Grid fades in
  // Phase 2 (0.1-0.7): Lens inspection (Remove, Enhance, Replace)
  // Phase 3 (0.7-1.0): Snap together

  const isInspecting = progress > 0.1 && progress < 0.7
  const isSnapping = progress >= 0.7

  // Calculate Lens position based on progress
  // Lens moves from node 7 -> 14 -> 21
  let lensX = 0
  let lensY = 0
  let activeAction = ''
  
  if (isInspecting) {
    const inspectP = (progress - 0.1) / 0.6 // 0 to 1
    if (inspectP < 0.33) {
      // Hovering near 7
      lensX = (ACTIONS.REMOVE % COLS) * CELL_STEP - ((COLS * CELL_STEP) / 2) + (CELL_STEP / 2)
      lensY = Math.floor(ACTIONS.REMOVE / COLS) * CELL_STEP - ((ROWS * CELL_STEP) / 2) + (CELL_STEP / 2)
      if (inspectP > 0.15) activeAction = 'REMOVE'
    } else if (inspectP < 0.66) {
      // Hovering near 14
      lensX = (ACTIONS.ENHANCE % COLS) * CELL_STEP - ((COLS * CELL_STEP) / 2) + (CELL_STEP / 2)
      lensY = Math.floor(ACTIONS.ENHANCE / COLS) * CELL_STEP - ((ROWS * CELL_STEP) / 2) + (CELL_STEP / 2)
      if (inspectP > 0.48) activeAction = 'ENHANCE'
    } else {
      // Hovering near 21
      lensX = (ACTIONS.REPLACE % COLS) * CELL_STEP - ((COLS * CELL_STEP) / 2) + (CELL_STEP / 2)
      lensY = Math.floor(ACTIONS.REPLACE / COLS) * CELL_STEP - ((ROWS * CELL_STEP) / 2) + (CELL_STEP / 2)
      if (inspectP > 0.8) activeAction = 'REPLACE'
    }
  }

  // Smooth lens movement (CSS transition for simplicity, but we can rely on React state since it updates fast)
  // Wait, transition-all causes stutter if updated 60fps. We should just calculate exact X/Y if we want smooth, 
  // but for a "snapping" microscope, instant jumps or lerp is fine. 
  // Let's use Framer Motion's spring for the lens in a real app, but absolute calculation here is safe.

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 overflow-hidden">
      
      <motion.div
        className="text-center mb-16 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeCinematic }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-zinc-300 tracking-tight leading-tight max-w-3xl">
          <span className="text-zinc-500">UI is muscle memory.</span><br />
          My superpower is <span className="text-[var(--accent-teal-bright)] font-medium">Engineering Empathy.</span>
        </h2>
        
        <motion.p
          className="mt-6 text-sm sm:text-base md:text-lg text-zinc-400 font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isSnapping ? 1 : 0, y: isSnapping ? 0 : 10 }}
          transition={{ duration: 0.8, ease: easeCinematic }}
        >
          Stitching together a better, more efficient workflow by removing points of friction.
        </motion.p>
      </motion.div>

      <div className="relative flex items-center justify-center" style={{ width: COLS * CELL_STEP, height: ROWS * CELL_STEP }}>
        {/* Grid Nodes */}
        <div 
          className="absolute inset-0 grid gap-2 place-content-center"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: TOTAL_NODES }).map((_, i) => {
            
            // Determine state based on progress and action
            let isRemoved = false
            let isEnhanced = false
            let isReplaced = false

            if (i === ACTIONS.REMOVE && progress > 0.1 + (0.6 * 0.15)) isRemoved = true
            if (i === ACTIONS.ENHANCE && progress > 0.1 + (0.6 * 0.48)) isEnhanced = true
            if (i === ACTIONS.REPLACE && progress > 0.1 + (0.6 * 0.8)) isReplaced = true

            // When snapping, calculate final positions
            let x = 0
            let y = 0
            if (isSnapping && !isRemoved) {
              // Flatten into a single straight line
              const rowCenter = (ROWS * CELL_STEP) / 2
              y = -Math.floor(i / COLS) * CELL_STEP + rowCenter - (CELL_STEP / 2) // move to center Y
            }

            return (
              <motion.div
                key={i}
                className="w-14 h-14 border border-white/10 flex items-center justify-center relative"
                style={{
                  borderRadius: isReplaced ? '50%' : '8px',
                  background: isEnhanced ? 'var(--accent-teal)' : 'rgba(255,255,255,0.02)',
                  borderColor: isEnhanced ? 'var(--accent-teal-bright)' : 'rgba(255,255,255,0.1)',
                  boxShadow: isEnhanced ? '0 0 20px var(--accent-teal)' : 'none',
                  zIndex: (activeAction === 'REMOVE' && i === ACTIONS.REMOVE) || 
                          (activeAction === 'ENHANCE' && i === ACTIONS.ENHANCE) || 
                          (activeAction === 'REPLACE' && i === ACTIONS.REPLACE) ? 30 : 
                          (i === ACTIONS.REMOVE || i === ACTIONS.ENHANCE || i === ACTIONS.REPLACE) ? 10 : 1
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: isRemoved ? 0 : 1,
                  scale: isRemoved ? 0 : (isSnapping ? 0.8 : 1),
                  x: isSnapping ? x : 0,
                  y: isSnapping ? y : 0,
                }}
                transition={{ 
                  duration: isSnapping ? 0.8 : 0.4, 
                  ease: easeCinematic,
                  delay: isSnapping ? 0 : i * 0.01 // stagger intro
                }}
              >
                {/* Node inner dot */}
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </motion.div>
            )
          })}
        </div>

        {/* The Microscope Lens */}
        <motion.div
          className="absolute w-32 h-32 rounded-full border border-white/20 flex items-center justify-center z-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
            backdropFilter: 'blur(4px) brightness(1.2)',
            WebkitBackdropFilter: 'blur(4px) brightness(1.2)',
            boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.1)',
            x: lensX,
            y: lensY,
          }}
          initial={{ opacity: 0, scale: 2 }}
          animate={{ 
            opacity: isInspecting ? 1 : 0, 
            scale: isInspecting ? 1 : (isSnapping ? 0 : 2) 
          }}
          transition={{ duration: 0.6, ease: easeCinematic }}
        >
          <Search className="w-6 h-6 text-white/30 absolute top-3 right-3" aria-hidden="true" />
          
          {/* Action tags on the lens itself */}
          {activeAction === 'REMOVE' && (
            <div className="absolute -top-10 bg-red-500/20 text-red-400 text-xs font-mono px-3 py-1 rounded border border-red-500/30 whitespace-nowrap drop-shadow-md">
              [REMOVE]
            </div>
          )}
          {activeAction === 'ENHANCE' && (
            <div className="absolute -top-10 bg-teal-500/20 text-teal-400 text-xs font-mono px-3 py-1 rounded border border-teal-500/30 whitespace-nowrap drop-shadow-md">
              [ENHANCE]
            </div>
          )}
          {activeAction === 'REPLACE' && (
            <div className="absolute -top-10 bg-purple-500/20 text-purple-400 text-xs font-mono px-3 py-1 rounded border border-purple-500/30 whitespace-nowrap drop-shadow-md">
              [REPLACE]
            </div>
          )}
          
          {/* Crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-white/10" />
            <div className="h-full w-[1px] bg-white/10 absolute" />
          </div>
        </motion.div>
        
      </div>
      
    </div>
  )
}
