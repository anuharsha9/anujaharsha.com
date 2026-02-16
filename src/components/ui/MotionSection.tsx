'use client'

import { ReactNode } from 'react'
import { motion, HTMLMotionProps, Variants } from 'framer-motion'

interface MotionSectionProps extends HTMLMotionProps<'section'> {
  children: ReactNode
  delay?: number
  staggerChildren?: number
  viewportAmount?: number
  className?: string
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

/**
 * MotionSection — Premium scroll-reveal with subtle scale.
 * Sections gently "breathe in" as they enter the viewport.
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
      viewport={{
        once: true,
        margin: "50px 0px",
        amount: Math.min(viewportAmount, 0.05),
      }}
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
