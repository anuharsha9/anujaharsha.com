/**
 * MOTION TOKENS — single source of truth for framer-motion timing.
 *
 * Mirrors the CSS motion tokens in `src/styles/tokens.css` (`--ease-*`,
 * `--duration-*`) so JS-driven (framer-motion) and CSS-driven animations share
 * the exact same curves and speeds.
 *
 * RULE: components must NOT inline easing arrays (`[0.22, 1, 0.36, 1]`) or
 * magic durations (`duration: 1.2`). Import the token instead. If a value you
 * need isn't here, add it here first, then reference it.
 *
 * Note on units: framer-motion expresses duration in SECONDS; the CSS
 * `--duration-*` tokens are in milliseconds. The values correspond 1:1
 * (DURATION.fast 0.2s === --duration-fast 200ms).
 */

/** A cubic-bezier control-point tuple. Typed mutable so framer-motion's
 *  `ease` prop accepts it directly (a readonly tuple would not type-check). */
export type Bezier = [number, number, number, number]

/* ── Easing curves ──────────────────────────────────────────────────────────
   Each mirrors a `--ease-*` CSS token of the same name. */

/** Signature site ease — long, soft deceleration tail. Used site-wide. */
export const EASE_CINEMATIC: Bezier = [0.22, 1, 0.36, 1]
/** Hero entrance — an even longer deceleration than cinematic. */
export const EASE_HERO: Bezier = [0.05, 0.7, 0.1, 1]
/** Material-standard smooth ease. */
export const EASE_SMOOTH: Bezier = [0.4, 0, 0.2, 1]
/** Gentle spring overshoot. */
export const EASE_SPRING: Bezier = [0.34, 1.56, 0.64, 1]
/** Pronounced bounce overshoot. */
export const EASE_BOUNCE: Bezier = [0.68, -0.55, 0.265, 1.55]
/** Expo-out — fast start, long glide to rest. */
export const EASE_EXPO: Bezier = [0.16, 1, 0.3, 1]
/** Glide — a slightly gentler expo-out. */
export const EASE_GLIDE: Bezier = [0.18, 1, 0.28, 1]
/** CSS-default ease curve (the `ease` keyword), as a tuple. */
export const EASE_STANDARD: Bezier = [0.25, 0.1, 0.25, 1]

/** Named map of every easing token (keys match the `--ease-*` CSS tokens). */
export const EASE = {
  cinematic: EASE_CINEMATIC,
  hero: EASE_HERO,
  smooth: EASE_SMOOTH,
  spring: EASE_SPRING,
  bounce: EASE_BOUNCE,
  expo: EASE_EXPO,
  glide: EASE_GLIDE,
  standard: EASE_STANDARD,
} as const

/* ── Durations (SECONDS) ─────────────────────────────────────────────────────
   Semantic speed steps + the discrete extra values the codebase actually uses,
   so every existing `duration:` literal maps to a token of the IDENTICAL value
   (no visual change on migration). */
export const DURATION = {
  instant: 0.15,
  fast: 0.2, //    === --duration-fast (200ms)
  base: 0.3, //    === --duration-normal (300ms)
  medium: 0.4,
  slow: 0.5, //    === --duration-slow (500ms)
  slower: 0.6,
  gentle: 0.7,
  deliberate: 0.8,
  drift: 1.0,
  cinematic: 1.2,
} as const

/* ── Transition presets ─────────────────────────────────────────────────────
   Common (duration + ease) pairings for convenience. */
export const TRANSITION = {
  base: { duration: DURATION.base, ease: EASE_CINEMATIC },
  fast: { duration: DURATION.fast, ease: EASE_SMOOTH },
  cinematic: { duration: DURATION.cinematic, ease: EASE_CINEMATIC },
} as const

/* ── Variants ────────────────────────────────────────────────────────────────
   The fade-in-up pattern that recurs across the site, centralized. */
export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}
