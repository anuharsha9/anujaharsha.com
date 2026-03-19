/**
 * Motion System — Animation & interaction presets
 * 
 * Philosophy: "Slow-born, revealing, effortless"
 * Every motion should feel like it was always meant to arrive
 * at its final position. Long deceleration tails, generous
 * durations, breathing room between staggers.
 * 
 * Easing curves reference CSS variables from /src/styles/tokens.css
 */

// =============================================================================
// TRANSITION PRESETS
// =============================================================================

export const transitions = {
    fast: 'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
    normal: 'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
    slow: 'transition-all duration-700 ease-[cubic-bezier(0.05,0.7,0.1,1)]',
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
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
} as const

export const scaleIn = {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.97 },
} as const

// =============================================================================
// EASING CURVES
// =============================================================================

export const easing = {
    /** Cinematic — extremely long deceleration tail, drifts into place */
    cinematic: [0.05, 0.7, 0.1, 1] as const,
    /** Smooth — material decelerate, natural feeling stop */
    smooth: [0.16, 1, 0.3, 1] as const,
    /** Standard — slightly quicker decelerate for interactions */
    standard: [0.22, 1, 0.36, 1] as const,
    /** Spring — subtle overshoot for playful interactions */
    spring: [0.34, 1.56, 0.64, 1] as const,
    /** Decelerate — long ease-out for scroll reveals */
    decelerate: [0.0, 0.0, 0.2, 1] as const,
    /** Google material — clean middle ground */
    material: [0.4, 0, 0.2, 1] as const,
} as const

// =============================================================================
// DURATION PRESETS (in seconds, for Framer Motion)
// =============================================================================

export const duration = {
    /** Micro-interactions: toggles, button feedback */
    fast: 0.3,
    /** Default motion: cards, tooltips, hover states */
    normal: 0.55,
    /** Sections revealing on scroll */
    slow: 0.85,
    /** Page transitions, hero elements */
    cinematic: 1.4,
    /** Hero-level slow-born reveals */
    glacial: 2.2,
    /** Section content reveals */
    reveal: 1.0,
} as const

// =============================================================================
// STAGGER PRESETS — generous breathing room between items
// =============================================================================

export const stagger = {
    fast: 0.08,
    normal: 0.12,
    slow: 0.18,
} as const

