/**
 * Apple-like Animation System
 * 
 * Easing curves inspired by Apple's design language:
 * - Smooth, natural motion
 * - Subtle spring physics
 * - Consistent timing
 * - Performance optimized
 */

// Apple's signature easing curves
export const appleEase = {
  // Standard ease-out (most common)
  standard: [0.22, 1, 0.36, 1] as [number, number, number, number],
  // Gentle ease-out
  gentle: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  // Smooth ease-in-out
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  // Spring-like (for interactions)
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
}

// Standard durations (Apple-like timing)
export const duration = {
  fast: 0.3,
  standard: 0.45,
  medium: 0.65,
  slow: 0.9,
  slower: 1.4,
  cinematic: 2.0,
  reveal: 1.1,
}

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: duration.reveal, 
      ease: appleEase.standard,
    },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: duration.medium, 
      ease: appleEase.standard,
    },
  },
}

export const fadeInDown = {
  hidden: { 
    opacity: 0, 
    y: -24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: duration.slow, 
      ease: appleEase.standard,
    },
  },
}

// ============================================
// SECTION REVEALS
// ============================================

export const sectionReveal = {
  hidden: { 
    opacity: 0, 
    y: 28,
    visibility: 'hidden' as const,
  },
  visible: {
    opacity: 1,
    y: 0,
    visibility: 'visible' as const,
    transition: { 
      duration: duration.reveal,
      ease: appleEase.standard,
    },
  },
}

export const sectionRevealSubtle = {
  hidden: { 
    opacity: 0, 
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: duration.slow, 
      ease: appleEase.gentle,
    },
  },
}

// ============================================
// HERO ANIMATIONS
// ============================================

export const heroTitleVariant = {
  hidden: { 
    opacity: 0, 
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: duration.cinematic, 
      ease: appleEase.standard,
    },
  },
}

export const heroSubVariant = {
  hidden: { 
    opacity: 0, 
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: duration.slower, 
      delay: 0.25, 
      ease: appleEase.gentle,
    },
  },
}

export const heroButtonsVariant = {
  hidden: { 
    opacity: 0, 
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: duration.slower, 
      delay: 0.5, 
      ease: appleEase.standard,
    },
  },
}

// ============================================
// CARD ANIMATIONS
// ============================================

export const cardFadeIn = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: duration.medium, 
      ease: appleEase.standard,
    },
  },
}

export const cardHover = {
  scale: 1.02,
  y: -4,
  transition: { 
    duration: duration.standard, 
    ease: appleEase.spring,
  },
}

export const cardTap = {
  scale: 0.98,
  transition: { 
    duration: duration.fast, 
    ease: appleEase.spring,
  },
}

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
}

export const staggerList = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.10,
      delayChildren: 0.08,
    },
  },
}

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
}

// ============================================
// INTERACTION ANIMATIONS
// ============================================

export const buttonHover = {
  scale: 1.02,
  y: -2,
  transition: { 
    duration: duration.standard, 
    ease: appleEase.spring,
  },
}

export const buttonTap = {
  scale: 0.98,
  transition: { 
    duration: duration.fast, 
    ease: appleEase.spring,
  },
}

export const linkHover = {
  y: -2,
  transition: { 
    duration: duration.standard, 
    ease: appleEase.standard,
  },
}

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition = {
  hidden: { 
    opacity: 0, 
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: duration.slower, 
      ease: appleEase.standard,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { 
      duration: duration.slow, 
      ease: appleEase.gentle,
    },
  },
}

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: duration.medium, 
      ease: appleEase.standard,
    },
  },
}

export const scaleUp = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: duration.slow, 
      ease: appleEase.spring,
    },
  },
}

// ============================================
// SLIDE ANIMATIONS
// ============================================

export const slideInLeft = {
  hidden: { 
    opacity: 0, 
    x: -32,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: duration.slow, 
      ease: appleEase.standard,
    },
  },
}

export const slideInRight = {
  hidden: { 
    opacity: 0, 
    x: 32,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: duration.slow, 
      ease: appleEase.standard,
    },
  },
}

// ============================================
// ROTATE ANIMATIONS
// ============================================

export const rotateIn = {
  hidden: { 
    opacity: 0, 
    rotate: -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { 
      duration: duration.medium, 
      ease: appleEase.spring,
    },
  },
}
