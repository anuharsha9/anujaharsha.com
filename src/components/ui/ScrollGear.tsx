'use client'

import { useEffect, useState } from 'react'
import { m, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion'

/**
 * ScrollGear — Physics-driven scroll progress indicator
 * 
 * The gear rotates with scroll position AND responds to velocity:
 * - Spins faster when scrolling fast (momentum)
 * - Wobbles slightly on direction changes (spring overshoot)
 * - Gentle pulsing glow that intensifies with speed
 */
export default function ScrollGear() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress, scrollY } = useScroll()

  // Base rotation from scroll position
  const baseRotate = useTransform(scrollYProgress, [0, 1], [0, 720])

  // Velocity-driven bonus rotation (spins faster when scrolling fast)
  const scrollVelocity = useVelocity(scrollY)
  const velocityRotation = useTransform(scrollVelocity, [-3000, 0, 3000], [-60, 0, 60])

  // Spring-smooth the velocity rotation for organic momentum feel
  const smoothVelocityRotation = useSpring(velocityRotation, {
    stiffness: 100,
    damping: 15,
    mass: 0.5,
  })

  // Combined rotation = position + velocity bonus
  const finalRotate = useTransform(
    [baseRotate, smoothVelocityRotation],
    ([base, velocity]) => (base as number) + (velocity as number)
  )

  // Velocity-driven scale pulse (gear "breathes" with speed)
  const velocityScale = useTransform(scrollVelocity, [-2000, 0, 2000], [1.15, 1, 1.15])
  const smoothScale = useSpring(velocityScale, {
    stiffness: 200,
    damping: 20,
    mass: 0.3,
  })

  // Velocity-driven glow intensity
  const glowIntensity = useTransform(scrollVelocity, [-2000, 0, 2000], [0.5, 0.15, 0.5])
  const smoothGlow = useSpring(glowIntensity, {
    stiffness: 150,
    damping: 25,
  })

  // Show gear only after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <m.div
      className="fixed bottom-6 left-6 z-50 pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <m.div
        style={{ rotate: finalRotate, scale: smoothScale }}
        className="w-10 h-10 md:w-12 md:h-12"
      >
        {/* Gear SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full text-[var(--accent-teal)] opacity-60"
        >
          <path
            fill="currentColor"
            d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"
          />
        </svg>
      </m.div>

      {/* Dynamic glow — intensifies with scroll velocity */}
      <m.div
        className="absolute inset-0 bg-[var(--accent-teal)] blur-xl rounded-full -z-10"
        style={{ opacity: smoothGlow, scale: smoothScale }}
      />
    </m.div>
  )
}
