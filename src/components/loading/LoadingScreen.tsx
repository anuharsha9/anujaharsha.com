'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Wait for React hydration + Framer Motion initialization
    const waitForHydration = () => {
      // Check if motion sections have been hydrated (have inline styles from Framer Motion)
      const checkReady = () => {
        const motionSections = document.querySelectorAll('.motion-section-hidden')
        const hasFramerStyles = motionSections.length > 0 &&
          Array.from(motionSections).some(el => el.getAttribute('style')?.includes('opacity'))
        return hasFramerStyles || motionSections.length === 0
      }

      // Poll until ready or timeout
      let attempts = 0
      const maxAttempts = 20 // 1 second max wait

      const pollReady = () => {
        attempts++
        if (checkReady() || attempts >= maxAttempts) {
          // Start fade out
          setIsFading(true)
          setTimeout(() => {
            setIsVisible(false)
            // Dispatch event to signal other components (like HeroSplit) to start animating
            window.dispatchEvent(new Event('app-ready'))
          }, 400) // Match CSS transition duration
        } else {
          setTimeout(pollReady, 50)
        }
      }

      // Initial delay to let React hydrate
      setTimeout(pollReady, 100)
    }

    if (document.readyState === 'complete') {
      waitForHydration()
    } else {
      window.addEventListener('load', waitForHydration)
      return () => window.removeEventListener('load', waitForHydration)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[var(--bg-dark)] flex items-center justify-center"
      style={{
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.4s ease-out',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Rotating Gear SVG */}
        <div className="w-24 h-24 md:w-32 md:h-32 gear-loading">
          <Image
            src="/assets/gear-contact.svg"
            alt="Loading"
            width={128}
            height={128}
            className="w-full h-full invert"
            priority
          />
        </div>
      </div>
    </div>
  )
}
