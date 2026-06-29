/**
 * Design System — Theme & layout utilities
 * 
 * Provides theme-aware Tailwind class strings and layout helpers.
 * All color values reference CSS custom properties from tokens.css.
 */

// =============================================================================
// STATIC PALETTE (for contexts that can't resolve CSS vars, e.g. OG images)
// =============================================================================

export const staticPalette = {
  white: '#ffffff',
  surfaceCharcoal950: '#0a0a0a',
  neutralZinc300: '#d4d4d8',
  neutralZinc400: '#a1a1aa',
  neutralZinc500: '#71717a',
  neutralZinc600: '#52525b',
  overlayWhite02: 'rgba(255,255,255,0.02)',
  overlayWhite06: 'rgba(255,255,255,0.06)',
  overlayWhite10: 'rgba(255,255,255,0.1)',
  overlayWhite12: 'rgba(255,255,255,0.12)',
  overlayEmerald05: 'rgba(16,185,129,0.05)',
} as const

// =============================================================================
// THEME INTERFACE
// =============================================================================

export interface Theme {
  // Text
  text: string
  textSecondary: string
  textMuted: string
  textDim: string
  textAccent: string

  // Backgrounds
  bg: string
  bgAlt: string
  bgAccent: string

  // Borders
  border: string
  borderSecondary: string
  borderSubtle: string
  borderAccent: string

  // Surfaces & Dividers
  divider: string
  surface: string
  cardBg: string

  // CSS Variable reference (for inline styles)
  accentVar: string

  // Context flag
  isLight: boolean

  // Monitor sub-theme (technical aesthetic)
  monitor: {
    bg: string
    bgAlt: string
    bgSurface: string
    border: string
    text: string
    textMuted: string
    textDim: string
  }
}

// Shared monitor sub-theme — identical in both themes
const MONITOR_THEME = {
  bg: 'bg-[var(--bg-monitor)]',
  bgAlt: 'bg-[var(--bg-monitor-alt)]',
  bgSurface: 'bg-[var(--bg-monitor-surface)]',
  border: 'border-[var(--border-monitor)]',
  text: 'text-[var(--text-monitor)]',
  textMuted: 'text-[var(--text-monitor-muted)]',
  textDim: 'text-[var(--text-monitor-dim)]',
} as const

// Pre-built theme objects — no re-creation on every call
const LIGHT_THEME: Theme = {
  text: 'text-[var(--text-heading)]',
  textSecondary: 'text-[var(--text-body)]',
  textMuted: 'text-[var(--text-muted)]',
  textDim: 'text-[var(--text-dim)]',
  textAccent: 'text-[var(--accent-teal)]',

  bg: 'bg-[var(--bg-primary)]',
  bgAlt: 'bg-[var(--bg-secondary)]',
  bgAccent: 'bg-[var(--accent-teal-soft)]',

  border: 'border-[var(--border-primary)]',
  borderSecondary: 'border-[var(--border-subtle)]',
  borderSubtle: 'border-[var(--border-subtle)]',
  borderAccent: 'border-[var(--accent-teal)]/30',

  divider: 'bg-[var(--border-primary)]',
  surface: 'bg-[var(--bg-secondary)]',
  cardBg: 'bg-[var(--bg-secondary)]',

  accentVar: 'var(--accent-teal)',
  isLight: true,
  monitor: MONITOR_THEME,
}

const DARK_THEME: Theme = {
  text: 'text-[var(--text-monitor)]',
  textSecondary: 'text-[var(--text-monitor-muted)]',
  textMuted: 'text-[var(--text-monitor-dim)]',
  textDim: 'text-[var(--text-dim)]',
  textAccent: 'text-[var(--accent-teal)]',

  bg: 'bg-[var(--bg-ink-950)]',
  bgAlt: 'bg-[var(--bg-ink-900)]',
  bgAccent: 'bg-[var(--accent-teal)]/10',

  border: 'border-[var(--border-primary)]',
  borderSecondary: 'border-[var(--border-subtle)]',
  borderSubtle: 'border-[var(--border-subtle)]',
  borderAccent: 'border-[var(--accent-teal)]/50',

  divider: 'bg-[var(--border-primary)]',
  surface: 'bg-[var(--bg-ink-900)]',
  cardBg: 'bg-[var(--bg-ink-900)]',

  accentVar: 'var(--accent-teal)',
  isLight: false,
  monitor: MONITOR_THEME,
}

/**
 * Get theme-aware Tailwind class strings.
 * 
 * @param isLight - true for architect aesthetic, false for dark/system aesthetic
 * @returns Pre-built Theme object (no allocation per call)
 * 
 * @example
 * const t = getTheme(false)
 * return <div className={`${t.bg} ${t.text}`}>...</div>
 */
export function getTheme(isLight: boolean = true): Theme {
  return isLight ? LIGHT_THEME : DARK_THEME
}

// =============================================================================
// SPACING PRESETS
// =============================================================================

export const spacing = {
  // Section padding (Vertical Rhythm)
  section: 'py-section-mobile md:py-section-tablet lg:py-section-desktop',
  sectionCompact: 'py-space-8 md:py-space-12 lg:py-space-16',

  // Container
  container: 'px-space-4 xs:px-space-5 sm:px-space-6 md:px-space-8 lg:px-space-12 xl:px-space-16',
  containerMax: 'max-w-[1440px] mx-auto',
  containerFull: 'max-w-[1440px] mx-auto px-space-4 xs:px-space-5 sm:px-space-6 md:px-space-8 lg:px-space-12 xl:px-space-16',

  // Component spacing
  stack: {
    xs: 'space-y-space-2',
    sm: 'space-y-space-4',
    md: 'space-y-space-6',
    lg: 'space-y-space-8',
    xl: 'space-y-space-12',
  },

  gap: {
    xs: 'gap-space-2',
    sm: 'gap-space-4',
    md: 'gap-space-6',
    lg: 'gap-space-8',
  },
} as const
