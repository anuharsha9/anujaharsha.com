'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useLayoutEffect, useState, useRef } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * PageTransition — Cinematic rack-focus camera effect.
 * 
 * On navigate:
 *  1. OUT: Content defocuses heavily (like a camera pulling focus away)
 *     with a warm vignette closing in.
 *  2. HOLD: Fully blurred + dark. Scroll resets. New content loads.
 *  3. IN: Rack focus back — blur clears, scale settles, vignette lifts.
 *     Like a film camera snapping to sharp focus.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [showOverlay, setShowOverlay] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'out' | 'hold' | 'in'>('idle')
  const previousPathname = useRef(pathname)
  const isNavigating = useRef(false)

  useLayoutEffect(() => {
    if (pathname !== previousPathname.current && !isNavigating.current) {
      isNavigating.current = true
      previousPathname.current = pathname

      // Stop Lenis during transition
      const lenis = (window as any).__lenis
      if (lenis) lenis.stop()

      // Phase 1: Rack OUT — defocus the current page
      setPhase('out')
      setShowOverlay(true)

      // Scroll to top while covered
      const scrollTimer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }, 500)

      // Phase 2: Hold — fully defocused, dark
      const holdTimer = setTimeout(() => {
        setPhase('hold')
      }, 700)

      // Phase 3: Rack IN — snap into focus on new page
      const inTimer = setTimeout(() => {
        setPhase('in')
      }, 1100)

      // Phase 4: Done — clean up
      const doneTimer = setTimeout(() => {
        setShowOverlay(false)
        setPhase('idle')
        isNavigating.current = false

        // Re-enable Lenis
        if (lenis) lenis.start()
      }, 1900)

      return () => {
        clearTimeout(scrollTimer)
        clearTimeout(holdTimer)
        clearTimeout(inTimer)
        clearTimeout(doneTimer)
      }
    }
  }, [pathname])

  // Compute content styles based on phase
  const getContentStyle = () => {
    switch (phase) {
      case 'out':
        return {
          opacity: 0.15,
          scale: 1.04,
          filter: 'blur(28px) saturate(0.5)',
        }
      case 'hold':
        return {
          opacity: 0,
          scale: 1.06,
          filter: 'blur(40px) saturate(0.3)',
        }
      case 'in':
        return {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px) saturate(1)',
        }
      default: // idle
        return {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px) saturate(1)',
        }
    }
  }

  return (
    <>
      {/* Dark vignette overlay — simulates camera iris */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="camera-iris"
            className="fixed inset-0 z-[9998] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 12, 0.85) 60%, rgba(5, 5, 12, 1) 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === 'out' ? 1 : phase === 'hold' ? 1 : 0,
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{
              duration: phase === 'out' ? 0.6 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )}
      </AnimatePresence>

      {/* Page content — rack focus animation */}
      <motion.div
        animate={getContentStyle()}
        transition={{
          duration: phase === 'in' ? 0.8 : phase === 'out' ? 0.55 : 0.4,
          ease: phase === 'in'
            ? [0.16, 1, 0.3, 1]   // Smooth ease-out for rack-in (the satisfying snap)
            : [0.22, 1, 0.36, 1], // Standard ease for rack-out
        }}
        style={{ willChange: phase !== 'idle' ? 'transform, opacity, filter' : 'auto' }}
      >
        {children}
      </motion.div>
    </>
  )
}
