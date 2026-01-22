'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [isClicking, setIsClicking] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  // Use motion values for better performance
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for the trailing gear
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only enable on desktop with fine pointer (mouse)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const hasFineMouse = window.matchMedia('(pointer: fine)').matches

    if (isTouchDevice || !hasFineMouse) {
      setIsEnabled(false)
      return
    }

    setIsEnabled(true)

    // Update cursor position
    const updatePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsHidden(false)

      // Check what element is under cursor
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY)
      if (hoveredElement) {
        const isClickable =
          hoveredElement.tagName === 'A' ||
          hoveredElement.tagName === 'BUTTON' ||
          hoveredElement.closest('a') ||
          hoveredElement.closest('button') ||
          (hoveredElement as HTMLElement).style.cursor === 'pointer'
        setIsPointer(!!isClickable)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener('mousemove', updatePosition, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY])

  // Don't render anything until we know if cursor should be enabled
  if (!isEnabled) {
    return null
  }

  // Gear Path Data (simplified 8-tooth gear)
  // M 12,0 L 14,4 L 18,4 L 19,8 L 23,9 L 21,13 L 23,17 L 19,18 L 18,22 L 14,22 L 12,26 L 10,22 L 6,22 L 5,18 L 1,17 L 3,13 L 1,9 L 5,8 L 6,4 L 10,4 Z
  // Center hole: M 12,10 A 3,3 0 1,0 12,16 A 3,3 0 1,0 12,10 Z

  return (
    <>
      {/* Hide default cursor via CSS */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main Cursor (Exact Position) - Small Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHidden ? 0 : 1,
        }}
      >
        <div
          className={`w-2 h-2 bg-[var(--accent-teal)] rounded-full transition-transform duration-300 ${isClicking ? 'scale-75' : isPointer ? 'scale-150' : 'scale-100'
            }`}
        />
      </motion.div>

      {/* Trailing Gear (Smooth Follow) */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHidden ? 0 : 0.6,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            rotate: isPointer ? 90 : 0,
            scale: isClicking ? 0.8 : isPointer ? 1.2 : 1,
          }}
          transition={{
            rotate: { duration: 0.8, ease: "backOut" },
            scale: { duration: 0.2 }
          }}
        >
          {/* Gear SVG */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`transition-colors duration-300 ${isPointer ? 'text-[var(--accent-teal)]' : 'text-slate-400'
              }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  )
}
