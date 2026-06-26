'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [isClicking, setIsClicking] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Use motion values for better performance
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for the trailing gear
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  // Detect if element or any ancestor is interactive
  const isClickable = useCallback((el: Element | null): boolean => {
    if (!el) return false
    const tag = el.tagName
    if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return true
    const role = el.getAttribute('role')
    if (role === 'button' || role === 'link' || role === 'tab' || role === 'menuitem') return true
    if ((el as HTMLElement).dataset?.cursor === 'pointer') return true
    try {
      if (window.getComputedStyle(el).cursor === 'pointer') return true
    } catch { /* ignore */ }
    let parent = el.parentElement
    let depth = 0
    while (parent && depth < 5) {
      const parentTag = parent.tagName
      if (parentTag === 'A' || parentTag === 'BUTTON') return true
      if (parent.getAttribute('role') === 'button' || parent.getAttribute('role') === 'link') return true
      try {
        if (window.getComputedStyle(parent).cursor === 'pointer') return true
      } catch { /* ignore */ }
      parent = parent.parentElement
      depth++
    }
    return false
  }, [])

  useEffect(() => {
    // Only enable on desktop with fine pointer (mouse)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const hasFineMouse = window.matchMedia('(pointer: fine)').matches

    if (isTouchDevice || !hasFineMouse) {
      setIsEnabled(false)
      return
    }

    setIsEnabled(true)

    // Hide native cursor
    document.documentElement.classList.add('has-custom-cursor')
    document.documentElement.style.cursor = 'none'

    // Update cursor position
    let lastHitTest = 0
    const updatePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsHidden(false)

      // Throttle expensive hit-testing to ~10fps (100ms)
      const now = performance.now()
      if (now - lastHitTest > 100) {
        lastHitTest = now
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY)
        setIsPointer(isClickable(hoveredElement))
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

    const scrollTimeout = scrollTimeoutRef.current
    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.classList.remove('has-custom-cursor')
      document.documentElement.style.cursor = ''
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [mouseX, mouseY, isClickable])

  // Don't render anything until we know if cursor should be enabled
  if (!isEnabled) return null
  if (typeof document === 'undefined') return null

  /* Portal to <body> so the cursor escapes any PageShell stacking context
   * and reliably renders ON TOP of modals (SystemLightbox is z-[99999],
   * also portaled to body). Cursor z values stay well above any modal. */
  const cursorNodes = (
    <>
      {/* Main Cursor (Exact Position) - Small Teal Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[2147483647] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHidden ? 0 : 1,
        }}
        aria-hidden="true"
      >
        <div
          className={`w-2 h-2 bg-[var(--accent-teal)] rounded-full transition-transform duration-300 ${isClicking ? 'scale-75' : isPointer ? 'scale-150' : 'scale-100'
            }`}
        />
      </motion.div>

      {/* Trailing Gear (Smooth Follow) */}
      <motion.div
        className="fixed top-0 left-0 z-[2147483646] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHidden ? 0 : 0.6,
        }}
        aria-hidden="true"
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isClicking ? 0.8 : isPointer ? 1.2 : 1,
          }}
          transition={{
            scale: { duration: 0.2 }
          }}
          style={{
            animation: isPointer
              ? 'cursor-gear-spin 2s linear infinite'
              : 'cursor-gear-spin 8s linear infinite',
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
            className={`transition-colors duration-300 ${isPointer ? 'text-[var(--accent-teal)]' : 'text-zinc-400'
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

  return createPortal(cursorNodes, document.body)
}
