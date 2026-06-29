'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useInView } from 'framer-motion'
import { EASE_CINEMATIC, DURATION } from '@/lib/motion'

interface AnimatedCounterProps {
  value: string // e.g., "75%", "20M+", "50yr"
  className?: string
  duration?: number
}

/**
 * AnimatedCounter - Elegantly animates numbers when scrolled into view
 * Handles various formats: percentages, millions, years, plain numbers
 */
export default function AnimatedCounter({ 
  value, 
  className = '',
  duration = 1.5 
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState('0')
  
  useEffect(() => {
    if (!isInView) return

    // Parse the value to extract number and suffix
    const match = value.match(/^([\d.]+)(.*)$/)
    if (!match) {
      setDisplayValue(value)
      return
    }

    const targetNumber = parseFloat(match[1])
    const suffix = match[2] || ''
    
    // Determine if we should show decimals
    const hasDecimal = match[1].includes('.')
    const decimalPlaces = hasDecimal ? match[1].split('.')[1]?.length || 0 : 0

    const startTime = Date.now()
    const durationMs = duration * 1000

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      
      // Ease out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      const currentValue = targetNumber * easeOut
      
      if (hasDecimal) {
        setDisplayValue(currentValue.toFixed(decimalPlaces) + suffix)
      } else {
        setDisplayValue(Math.round(currentValue) + suffix)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value) // Ensure exact final value
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <m.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: DURATION.medium, ease: EASE_CINEMATIC }}
    >
      {displayValue}
    </m.span>
  )
}

