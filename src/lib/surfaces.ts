/**
 * The ONE glass-pill surface language — single source of truth for every
 * floating chrome element (nav island, lightbox controls, icon buttons).
 *
 * Tokens only; no hardcoded colors. States are standardized here once so that
 * hover / press feel identical everywhere a glass pill appears. If the glass
 * language ever changes, it changes here and nowhere else.
 *
 *   surface  → --overlay-ink-55  (+ --overlay-ink-75 on hover)
 *   border   → --overlay-white-10 (+ --overlay-white-20 on hover)
 *   shadow   → --shadow-lg
 *   press    → active:scale-[0.97]   (focus ring is the global *:focus-visible token)
 */

/** Resting glass surface — the pill shell with no interactive states. */
export const GLASS_PILL =
    'rounded-full border border-[var(--overlay-white-10)] bg-[var(--overlay-ink-55)] ' +
    'shadow-[var(--shadow-lg)] backdrop-blur-xl'

/** Standardized interactive states for a glass-pill control (hover · press). */
export const GLASS_PILL_STATES =
    'transition-all duration-300 hover:border-[var(--overlay-white-20)] ' +
    'hover:bg-[var(--overlay-ink-75)] hover:text-white active:scale-[0.97]'

/** Resting glass + interactive states — the full interactive pill. */
export const GLASS_PILL_INTERACTIVE = `${GLASS_PILL} ${GLASS_PILL_STATES}`
