'use client'

import { ReactNode, forwardRef, useEffect, useRef, useState } from 'react'

interface MotionSectionProps {
  id?: string
  className?: string
  children: ReactNode
  style?: React.CSSProperties
  animate?: boolean // Enable scroll-based animations
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale'
  delay?: number // Delay in ms
}

/**
 * MotionSection - Section wrapper with optional scroll-triggered animations
 * 
 * Uses CSS transforms + IntersectionObserver to avoid hydration issues.
 * Animations are opt-in via the `animate` prop.
 */
const MotionSection = forwardRef<HTMLElement, MotionSectionProps>(
  ({ id, className, children, style, animate = false, variant = 'fade-up', delay = 0 }, ref) => {
    const internalRef = useRef<HTMLElement>(null)
    const sectionRef = (ref as React.RefObject<HTMLElement>) || internalRef
    const [isVisible, setIsVisible] = useState(!animate) // Start visible if no animation

    useEffect(() => {
      if (!animate) return

      const element = sectionRef.current
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(element)
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(element)
      return () => observer.disconnect()
    }, [animate, sectionRef])

    const variantClasses = {
      'fade-up': { initial: 'opacity-0 translate-y-12', visible: 'opacity-100 translate-y-0' },
      'fade-down': { initial: 'opacity-0 -translate-y-12', visible: 'opacity-100 translate-y-0' },
      'fade-left': { initial: 'opacity-0 translate-x-12', visible: 'opacity-100 translate-x-0' },
      'fade-right': { initial: 'opacity-0 -translate-x-12', visible: 'opacity-100 translate-x-0' },
      'scale': { initial: 'opacity-0 scale-90', visible: 'opacity-100 scale-100' },
    }

    const animationClass = animate
      ? `transform transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isVisible ? variantClasses[variant].visible : variantClasses[variant].initial}`
      : ''

    return (
      <section
        ref={sectionRef}
        id={id}
        className={`${className || ''} ${animationClass}`}
        style={{
          ...style,
          ...(animate && delay > 0 ? { transitionDelay: `${delay}ms` } : {}),
        }}
      >
        {children}
      </section>
    )
  }
)

MotionSection.displayName = 'MotionSection'

export default MotionSection
