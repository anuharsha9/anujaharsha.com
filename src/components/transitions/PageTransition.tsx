'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useLayoutEffect, useState, useRef, useEffect } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

// Global click position tracker — captures where the user clicked to trigger navigation
// This allows the radial reveal to originate from the exact click point
let lastClickX = typeof window !== 'undefined' ? window.innerWidth / 2 : 960
let lastClickY = typeof window !== 'undefined' ? window.innerHeight / 2 : 540

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [showOverlay, setShowOverlay] = useState(false)
  const [phase, setPhase] = useState<'cover' | 'reveal'>('cover')
  const [clickPos, setClickPos] = useState({ x: 960, y: 540 })
  const previousPathname = useRef(pathname)
  const isNavigating = useRef(false)

  // Capture click position globally for any navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      lastClickX = e.clientX
      lastClickY = e.clientY
    }

    // Capture on the capture phase so we get it before navigation starts
    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [])

  useLayoutEffect(() => {
    if (pathname !== previousPathname.current && !isNavigating.current) {
      isNavigating.current = true
      previousPathname.current = pathname

      // Freeze click position at the moment of navigation
      setClickPos({ x: lastClickX, y: lastClickY })

      // Stop Lenis during transition
      const lenis = (window as any).__lenis
      if (lenis) lenis.stop()

      // Phase 1: Cover — circle expands from click point to cover entire screen
      setPhase('cover')
      setShowOverlay(true)

      // Scroll to top while covered
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })

      // Phase 2: Reveal — after cover is complete, reverse to reveal new page
      const revealTimer = setTimeout(() => {
        setPhase('reveal')
      }, 850)

      // Phase 3: Done — remove overlay
      const doneTimer = setTimeout(() => {
        setShowOverlay(false)
        isNavigating.current = false

        // Re-enable Lenis
        if (lenis) lenis.start()
      }, 1500)

      return () => {
        clearTimeout(revealTimer)
        clearTimeout(doneTimer)
      }
    }
  }, [pathname])

  // Calculate the maximum radius needed to cover the entire viewport from the click point
  // Use the diagonal distance to the farthest corner
  const getMaxRadius = () => {
    if (typeof window === 'undefined') return 2000
    const w = window.innerWidth
    const h = window.innerHeight
    const { x, y } = clickPos

    // Distance to each corner, take the max
    const distances = [
      Math.hypot(x, y),              // top-left
      Math.hypot(w - x, y),          // top-right
      Math.hypot(x, h - y),          // bottom-left
      Math.hypot(w - x, h - y),      // bottom-right
    ]
    return Math.max(...distances) + 50 // small buffer
  }

  return (
    <>
      {/* Radial Reveal Transition */}
      <AnimatePresence>
        {showOverlay && (
          <>
            {/* Main radial overlay — expands from click point */}
            <motion.div
              key="radial-overlay"
              className="fixed inset-0 z-[9998]"
              style={{
                backgroundColor: 'var(--bg-dark, var(--surface-indigo-950))',
              }}
              initial={{
                clipPath: `circle(0px at ${clickPos.x}px ${clickPos.y}px)`,
                opacity: 0.85,
              }}
              animate={{
                clipPath: phase === 'cover'
                  ? `circle(${getMaxRadius()}px at ${clickPos.x}px ${clickPos.y}px)`
                  : `circle(${getMaxRadius()}px at ${clickPos.x}px ${clickPos.y}px)`,
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              transition={{
                clipPath: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
                opacity: { duration: 0.4, ease: 'easeOut' },
              }}
            />

            {/* Teal accent ring — slightly delayed, semi-transparent for depth */}
            <motion.div
              key="radial-accent"
              className="fixed inset-0 z-[9999]"
              style={{
                backgroundColor: 'var(--accent-teal, var(--tone-teal-muted))',
              }}
              initial={{
                clipPath: `circle(0px at ${clickPos.x}px ${clickPos.y}px)`,
                opacity: 0.7,
              }}
              animate={{
                clipPath: phase === 'cover'
                  ? `circle(${getMaxRadius()}px at ${clickPos.x}px ${clickPos.y}px)`
                  : `circle(0px at 50% 0%)`,
                opacity: phase === 'cover' ? 0.85 : 0,
              }}
              exit={{
                clipPath: `circle(0px at 50% 0%)`,
                opacity: 0,
                transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
              }}
              transition={{
                clipPath: {
                  duration: phase === 'cover' ? 0.65 : 0.55,
                  delay: phase === 'cover' ? 0.1 : 0,
                  ease: [0.76, 0, 0.24, 1],
                },
                opacity: {
                  duration: 0.35,
                  ease: 'easeOut',
                },
              }}
            />

            {/* Gear icon — spins during transition */}
            <motion.div
              key="transition-gear"
              className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.3, filter: 'blur(4px)' }}
              animate={{
                opacity: phase === 'cover' ? 0.9 : 0,
                scale: phase === 'cover' ? 1 : 0.5,
                rotate: 180,
                filter: phase === 'cover' ? 'blur(0px)' : 'blur(4px)',
              }}
              exit={{ opacity: 0, scale: 0.3, filter: 'blur(4px)' }}
              transition={{
                opacity: { duration: 0.3, delay: phase === 'cover' ? 0.3 : 0 },
                scale: { duration: 0.5, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] },
                rotate: { duration: 1.0, delay: 0.15, ease: 'easeInOut' },
                filter: { duration: 0.3, delay: phase === 'cover' ? 0.25 : 0 },
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.8 }}
              >
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page content — fades during transitions */}
      <motion.div
        animate={{
          opacity: showOverlay ? 0 : 1,
          scale: showOverlay ? 0.97 : 1,
          filter: showOverlay ? 'blur(6px)' : 'blur(0px)',
        }}
        transition={{
          duration: showOverlay ? 0.35 : 0.5,
          ease: [0.22, 1, 0.36, 1],
          delay: showOverlay ? 0 : 0.1,
        }}
      >
        {children}
      </motion.div>
    </>
  )
}
