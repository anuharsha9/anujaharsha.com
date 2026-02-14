'use client'

import { ReactNode } from 'react'
import { motion, HTMLMotionProps, Variants } from 'framer-motion'

interface MotionSectionProps extends HTMLMotionProps<'section'> {
  children: ReactNode
  delay?: number // Delay in seconds
  staggerChildren?: number // Stagger delay for children
  viewportAmount?: number // Amount of element visible to trigger
  className?: string
}

const variants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smooth feeling
    }
  }
}

/**
 * MotionSection - Upgraded to use Framer Motion natively.
 * Wraps content in a <motion.section> that reveals on scroll.
 * 
 * @param delay - Delay before starting animation (seconds)
 * @param staggerChildren - Delay between animating children (if they produce motion)
 * @param viewportAmount - 0 to 1, how much of element must be visible
 */
export default function MotionSection({
  children,
  className = '',
  delay = 0,
  staggerChildren = 0,
  viewportAmount = 0.1,
  ...props
}: MotionSectionProps) {

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px", amount: viewportAmount }}
      transition={{
        delay,
        staggerChildren,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  )
}
