'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface EasterEggProps {
  children: React.ReactNode
  clicksRequired?: number
}

export default function EasterEgg({ children, clicksRequired = 5 }: EasterEggProps) {
  const [clickCount, setClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [lastClickTime, setLastClickTime] = useState(0)

  const handleClick = useCallback(() => {
    const now = Date.now()

    // Reset count if more than 2 seconds since last click
    if (now - lastClickTime > 2000) {
      setClickCount(1)
    } else {
      setClickCount(prev => prev + 1)
    }

    setLastClickTime(now)

    // Trigger easter egg
    if (clickCount + 1 >= clicksRequired) {
      setShowEasterEgg(true)
      setClickCount(0)

      // Auto-hide after 4 seconds
      setTimeout(() => {
        setShowEasterEgg(false)
      }, 4000)
    }
  }, [clickCount, lastClickTime, clicksRequired])

  /* Wrapping element stays a div (children can include their own
   * interactive elements; nesting a real <button> would be invalid HTML).
   * role="button" + tabIndex + keyboard handler makes the click trigger
   * fully keyboard-accessible per WCAG 2.1.1. */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }, [handleClick])

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label="Trigger easter egg (click 5 times)"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEgg(false)}
          >
            <motion.div
              className="bg-[var(--bg-dark)] rounded-2xl p-8 max-w-md mx-4 text-center border border-slate-700"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Spinning gears */}
              <div className="flex justify-center gap-2 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Image
                    src="/assets/gear-contact.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="invert opacity-60"
                  />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Image
                    src="/assets/gear-contact.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="invert opacity-40"
                  />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Image
                    src="/assets/gear-contact.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="invert opacity-30"
                  />
                </motion.div>
              </div>

              <h3 className="text-white text-xl font-medium mb-2">
                You found me! 🎉
              </h3>

              <p className="text-zinc-400 text-sm mb-4">
                These gears? Designed in Figma.<br />
                Animated with Cursor + AI.<br />
                Orchestrated by me.
              </p>

              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-slate-800 text-zinc-200">Figma</span>
                <span className="px-2 py-1 rounded-full bg-slate-800 text-zinc-200">Cursor</span>
                <span className="px-2 py-1 rounded-full bg-slate-800 text-zinc-200">Claude</span>
                <span className="px-2 py-1 rounded-full bg-slate-800 text-zinc-200">Next.js</span>
                <span className="px-2 py-1 rounded-full bg-slate-800 text-zinc-200">Framer Motion</span>
              </div>

              <p className="text-zinc-500 text-xs mt-4">
                Click anywhere to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
