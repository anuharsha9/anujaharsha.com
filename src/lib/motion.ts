/**
 * Motion System — Animation & interaction presets
 * 
 * Separated from design-system.ts to keep visual design 
 * and motion concerns cleanly decoupled.
 * 
 * Easing curves reference CSS variables from /src/styles/tokens.css
 */

// =============================================================================
// TRANSITION PRESETS
// =============================================================================

export const transitions = {
    fast: 'transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
    normal: 'transition-all duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
    slow: 'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
} as const

// =============================================================================
// HOVER PRESETS
// =============================================================================

export const hover = {
    lift: 'hover:-translate-y-[2px] hover:shadow-lg',
    scale: 'hover:scale-[1.015]',
    glow: 'hover:shadow-[0_4px_24px_var(--overlay-teal-core-12)]',
} as const

// =============================================================================
// FRAMER MOTION VARIANTS
// =============================================================================

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
} as const

export const slideUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
} as const

export const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
} as const

// =============================================================================
// EASING CURVES (matching tokens.css)
// =============================================================================

export const easing = {
    spring: [0.34, 1.56, 0.64, 1] as const,
    smooth: [0.4, 0, 0.2, 1] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
    decelerate: [0.16, 1, 0.3, 1] as const,
    standard: [0.25, 0.1, 0.25, 1] as const,
} as const

// =============================================================================
// DURATION PRESETS (in seconds, for Framer Motion)
// =============================================================================

export const duration = {
    fast: 0.2,
    normal: 0.35,
    slow: 0.5,
    cinematic: 0.8,
} as const

// =============================================================================
// STAGGER PRESETS
// =============================================================================

export const stagger = {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
} as const
