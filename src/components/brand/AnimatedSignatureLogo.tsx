'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedSignatureLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  duration?: number // Duration for one complete draw cycle in milliseconds
  pauseDuration?: number // Pause between cycles in milliseconds
  autoPlay?: boolean // Whether to auto-start animation
}

/**
 * Animated signature logo with stroke drawing animation.
 * Similar to the lines-background animation in HeroBrain.
 */
export default function AnimatedSignatureLogo({
  className = '',
  duration = 50000, // 50 seconds to draw (matching lines-background)
  pauseDuration = 4000, // 4 second pause (matching lines-background)
  autoPlay = true,
  ...props
}: AnimatedSignatureLogoProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const [isAnimating, setIsAnimating] = useState(autoPlay)
  const animationFrameRef = useRef<number | null>(null)
  const cycleStartRef = useRef<number | null>(null)

  useEffect(() => {
    if (!pathRef.current || !isAnimating) return

    // Respect prefers-reduced-motion: skip the rAF stroke-draw entirely and
    // leave the signature statically drawn (its default fully-visible state).
    // The global CSS kill-switch only catches CSS animations, not this rAF loop.
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const path = pathRef.current
    let pathLength = 0
    let isInitialized = false

    // Initialize path for animation
    const initializePath = () => {
      if (!path) return

      // Calculate path length
      pathLength = path.getTotalLength()
      if (!pathLength || pathLength === 0 || isNaN(pathLength)) {
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
          console.warn('AnimatedSignatureLogo: Invalid path length')
        }
        return
      }

      // Set stroke attributes using setProperty for consistency
      path.style.setProperty('stroke-dasharray', `${pathLength}`, 'important')
      path.style.setProperty('stroke-dashoffset', `${pathLength}`, 'important') // Start hidden
      path.setAttribute('stroke-dasharray', `${pathLength}`)
      path.setAttribute('stroke-dashoffset', `${pathLength}`)
      
      // Force reflow
      void window.getComputedStyle(path).transform
      
      isInitialized = true
    }

    // Wait for SVG to be fully rendered
    const initTimer = setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initializePath()
          if (isInitialized) {
            startAnimation()
          }
        })
      })
    }, 100)

    const startAnimation = () => {
      if (!path || !isInitialized) return

      let cycleStart: number | null = null
      const drawDuration = duration
      const pauseDurationMs = pauseDuration
      let lastUpdateTime = 0
      const throttleMs = 50 // ~20fps for better performance

      const animate = (timestamp: number) => {
        if (!path || !isAnimating) return

        // Throttle updates to reduce reflows
        if (timestamp - lastUpdateTime < throttleMs) {
          animationFrameRef.current = requestAnimationFrame(animate)
          return
        }
        lastUpdateTime = timestamp

        // Initialize cycle start time
        if (cycleStart === null) {
          cycleStart = timestamp
        }

        const elapsed = timestamp - (cycleStart || timestamp)
        const cycleTime = drawDuration + pauseDurationMs
        const cycleProgress = elapsed % cycleTime

        if (cycleProgress <= drawDuration) {
          // Drawing phase - animate stroke-dashoffset from pathLength to 0
          const progress = Math.min(cycleProgress / drawDuration, 1)

          // Smooth easing function (ease-out cubic)
          const easeOut = 1 - Math.pow(1 - progress, 3)

          // Calculate offset: when progress = 0, offset = pathLength (hidden)
          // when progress = 1, offset = 0 (fully visible)
          const currentOffset = pathLength * (1 - easeOut)

          // Only update if value changed significantly to reduce reflows
          const currentValue = parseFloat(path.style.strokeDashoffset || path.getAttribute('stroke-dashoffset') || String(pathLength))
          if (Math.abs(currentValue - currentOffset) > 2) {
            path.style.setProperty('stroke-dashoffset', `${currentOffset}`, 'important')
          }
        } else {
          // Pause phase - line fully drawn (offset = 0)
          path.style.setProperty('stroke-dashoffset', '0', 'important')
        }

        // Continue animation loop
        animationFrameRef.current = requestAnimationFrame(animate)
      }

      // Start animation with small delay
      setTimeout(() => {
        animationFrameRef.current = requestAnimationFrame(animate)
      }, 200)
    }

    return () => {
      clearTimeout(initTimer)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (path && pathLength > 0) {
        path.style.setProperty('stroke-dashoffset', `${pathLength}`, 'important')
      }
    }
  }, [isAnimating, duration, pauseDuration])

  return (
    <svg
      viewBox="0 0 449 526"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <g id="anu-sign">
        <path
          ref={pathRef}
          d="M165.51,328.44c-6.84.4,24.01-59.95,26.26-64.59M191.76,263.85c.92-1.9,1.86-3.85,2.8-5.84M191.76,263.85c-6.63.27-12.92.52-18.73.77M191.76,263.85c14.52-.59,30.69-1.23,47.12-1.9M194.57,258.02c-7.34,2.23-14.61,4.45-21.54,6.6M194.57,258.02c16.36-4.97,33.13-9.99,47.56-14.48M194.57,258.02c59.09-112.31,80.8-280.21,47.56-14.48M242.12,243.53c-.99,5.86-2.07,11.98-3.24,18.42M242.12,243.53c25.94-8.08,53.29-15.76,75.95-31.15M238.88,261.96c17.35-.7,34.97-1.43,51.25-2.14M238.88,261.96c-5.13,28.16-11.09,56.17-17.31,84.11M221.57,346.07c30.4-20.54,50.18-55.43,68.56-86.26M221.57,346.07c-30.06,134.96-215.51-11.86-136.56-49.9M221.57,346.07c-38.96,26.33-145.63,9.02-136.56-49.9M85.02,296.17c27.97-13.48,58.4-22.35,88.02-31.55M85.02,296.17c5.68-36.91,64.18-30.56,88.02-31.55M318.08,212.38c-8.81,14.98-19.01,32.43-27.95,47.43M318.08,212.38c59.48-40.34,49.71-84.53,0,0ZM290.13,259.81c42.97-1.88,25.93-1.71,68.86-3.51"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
          fill="none"
          style={{
            strokeDasharray: '0',
            strokeDashoffset: '0',
          }}
        />
      </g>
    </svg>
  )
}

