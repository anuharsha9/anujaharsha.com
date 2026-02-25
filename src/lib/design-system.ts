/**
 * Design System - Single source of truth for all styling
 * 
 * This file centralizes all design decisions. Change values here
 * and they propagate across the entire application.
 * 
 * Colors reference CSS variables from /src/styles/tokens.css
 * Tailwind extensions are in /tailwind.config.ts
 */

// =============================================================================
// CSS VARIABLE REFERENCES (for inline styles)
// =============================================================================

export const cssVars = {
  // Brand colors
  accent: 'var(--accent-teal)',
  accent50: 'var(--accent-teal-50)',
  accent100: 'var(--accent-teal-100)',
  accent700: 'var(--accent-teal-700)',
  accentBright: 'var(--accent-teal-bright)',
  accentWordu: 'var(--accent-wordu)',

  // Backgrounds
  bgLight: 'var(--bg-light)',
  bgLightAlt: 'var(--bg-light-alt)',
  bgDark: 'var(--bg-dark)',
  bgDarkAlt: 'var(--bg-dark-alt)',
  bgInk950: 'var(--bg-ink-950)',
  bgInk900: 'var(--bg-ink-900)',
  bgCinematic: 'var(--bg-cinematic)',

  // Text colors
  textLight: 'var(--text-primary-light)',
  textDark: 'var(--text-primary-dark)',
  textMutedLight: 'var(--text-muted-light)',
  textMutedDark: 'var(--text-muted-dark)',

  // Monitor technical theme
  monitorBg: 'var(--bg-monitor)',
  monitorBgAlt: 'var(--bg-monitor-alt)',
  monitorBorder: 'var(--border-monitor)',
  monitorText: 'var(--text-monitor)',
  monitorTextMuted: 'var(--text-monitor-muted)',
} as const

// Static palette for renderers that cannot resolve CSS variables (e.g. next/og ImageResponse)
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
// TAILWIND CLASS CONSTANTS
// =============================================================================

// Text colors (using CSS variables from tokens.css)
const TEXT = {
  // Light theme text (for light backgrounds)
  heading: 'text-[var(--text-heading)]',    // slate-900
  body: 'text-[var(--text-body)]',          // slate-600
  muted: 'text-[var(--text-muted)]',        // slate-500
  dim: 'text-[var(--text-dim)]',            // slate-400
  accent: 'text-[var(--accent-teal)]',
  // Legacy aliases
  light: 'text-[var(--text-primary)]',      // slate-900
  dark: 'text-white',
  mutedLight: 'text-[var(--text-body)]',    // slate-600
  mutedDark: 'text-white/70',
} as const

// Background colors (using CSS variables)
const BG = {
  primary: 'bg-[var(--bg-primary)]',        // slate-50
  secondary: 'bg-[var(--bg-secondary)]',    // white
  tertiary: 'bg-[var(--bg-tertiary)]',      // slate-100
  // Legacy aliases
  light: 'bg-[var(--bg-light)]',
  lightAlt: 'bg-[var(--bg-light-alt)]',
  dark: 'bg-[var(--bg-dark)]',
  darkAlt: 'bg-[var(--bg-dark-alt)]',
  surface: {
    light: 'bg-[var(--bg-secondary)]',      // white
    lightSubtle: 'bg-[var(--bg-tertiary)]', // slate-100
    dark: 'bg-[var(--bg-tertiary)]',        // slate-100 (light theme)
    darkSubtle: 'bg-[var(--bg-primary)]',   // slate-50
  },
  accent: {
    light: 'bg-[var(--accent-teal-soft)]',
    dark: 'bg-[var(--accent-teal-soft)]',
  },
} as const

// Border colors (using CSS variables)
const BORDER = {
  primary: 'border-[var(--border-primary)]',  // slate-200
  secondary: 'border-[var(--border-secondary)]', // slate-300
  subtle: 'border-[var(--border-subtle)]',    // slate-100
  // Legacy aliases
  light: 'border-[var(--border-primary)]',
  dark: 'border-[var(--border-primary)]',
  accent: {
    light: 'border-[var(--accent-teal)]/30',
    dark: 'border-[var(--accent-teal)]/30',
  },
} as const

// Divider colors
const DIVIDER = {
  primary: 'bg-[var(--border-primary)]',
  light: 'bg-[var(--border-primary)]',
  dark: 'bg-[var(--border-primary)]',
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

  // CSS Variable (for inline styles)
  accentVar: string

  // Context
  isLight: boolean

  // Technical Monitor Theme (Dark)
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

/**
 * Get all theme-aware classes for a component
 * Now always returns light theme values (Architect aesthetic)
 * @param isLight - Deprecated, always uses light theme
 * @returns Theme object with all class strings
 * 
 * @example
 * const t = getTheme(true)
 * return <div className={`${t.bg} ${t.text}`}>...</div>
 */
export function getTheme(isLight: boolean = true): Theme {
  if (isLight) {
    // Light Theme (Architect aesthetic)
    return {
      text: TEXT.heading,           // slate-900
      textSecondary: TEXT.body,     // slate-600
      textMuted: TEXT.muted,        // slate-500
      textDim: TEXT.dim,            // slate-400
      textAccent: TEXT.accent,      // teal

      bg: BG.primary,               // slate-50
      bgAlt: BG.secondary,          // white
      bgAccent: BG.accent.light,    // teal soft

      border: BORDER.primary,       // slate-200
      borderSecondary: BORDER.secondary, // slate-300
      borderSubtle: BORDER.subtle,  // slate-100
      borderAccent: BORDER.accent.light,

      divider: DIVIDER.primary,     // slate-200
      surface: 'bg-[var(--bg-secondary)]',
      cardBg: BG.secondary,         // white

      accentVar: cssVars.accent,
      isLight: true,

      monitor: {
        bg: 'bg-[var(--bg-monitor)]',
        bgAlt: 'bg-[var(--bg-monitor-alt)]',
        bgSurface: 'bg-[var(--bg-monitor-surface)]',
        border: 'border-[var(--border-monitor)]',
        text: 'text-[var(--text-monitor)]',
        textMuted: 'text-[var(--text-monitor-muted)]',
        textDim: 'text-[var(--text-monitor-dim)]',
      }
    }
  } else {
    // Dark Theme (monitor/System aesthetic)
    return {
      text: 'text-[var(--text-monitor)]',           // white
      textSecondary: 'text-[var(--text-monitor-muted)]', // slate-400
      textMuted: 'text-[var(--text-monitor-dim)]',  // slate-500
      textDim: 'text-slate-600',
      textAccent: TEXT.accent,      // teal

      bg: 'bg-[var(--bg-ink-950)]', // slate-950 (Monitor BG)
      bgAlt: 'bg-[var(--bg-ink-900)]', // slate-900 (Monitor Alt)
      bgAccent: 'bg-[var(--accent-teal)]/10',

      border: 'border-slate-800',
      borderSecondary: 'border-slate-700',
      borderSubtle: 'border-slate-800',
      borderAccent: 'border-[var(--accent-teal)]/50',

      divider: 'bg-slate-800',
      surface: 'bg-[var(--bg-ink-900)]',
      cardBg: 'bg-[var(--bg-ink-900)]',

      accentVar: cssVars.accent,
      isLight: false,

      monitor: {
        bg: 'bg-[var(--bg-monitor)]',
        bgAlt: 'bg-[var(--bg-monitor-alt)]',
        bgSurface: 'bg-[var(--bg-monitor-surface)]',
        border: 'border-[var(--border-monitor)]',
        text: 'text-[var(--text-monitor)]',
        textMuted: 'text-[var(--text-monitor-muted)]',
        textDim: 'text-[var(--text-monitor-dim)]',
      }
    }
  }
}

// Legacy alias
export const getThemeClasses = getTheme

// =============================================================================
// TYPOGRAPHY PRESETS
// =============================================================================

export const typography = {
  // Headings
  h1: 'text-4xl md:text-5xl font-serif leading-tight tracking-tight',
  h2: 'text-3xl md:text-4xl font-serif leading-snug tracking-tight',
  h3: 'text-2xl md:text-3xl font-serif',
  h4: 'text-xl md:text-2xl font-serif',
  h5: 'text-lg md:text-xl font-semibold',

  // Body text
  body: 'text-base md:text-lg leading-relaxed',
  bodySmall: 'text-sm md:text-base leading-relaxed',

  // Labels & captions
  label: 'text-xs font-mono uppercase tracking-widest',
  caption: 'text-xs leading-relaxed',

  // Emphasis
  bold: 'font-semibold',
  italic: 'italic',
} as const

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

// =============================================================================
// EFFECT PRESETS
// =============================================================================

export const effects = {
  // Border radius — Apple minimalism: sharp edges
  rounded: {
    sm: '',                   // sharp
    md: '',                   // sharp
    lg: '',                   // sharp
    full: 'rounded-full',     // keep for dots/avatars only
  },

  // Shadows — Apple diffused
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  },

  // Transitions — Amazon Design-inspired smooth
  transition: {
    fast: 'transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
    normal: 'transition-all duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
    slow: 'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
  },

  // Hover effects — refined, Amazon Design-style
  hover: {
    lift: 'hover:-translate-y-[2px] hover:shadow-lg',
    scale: 'hover:scale-[1.015]',
    glow: 'hover:shadow-[0_4px_24px_var(--overlay-teal-core-12)]',
  },
} as const

// =============================================================================
// COMPONENT PRESETS
// =============================================================================

export const components = {
  // Card styles — sharp-edge windows
  card: (isLight: boolean) => ({
    base: `${isLight ? BG.surface.light : BG.surface.dark} border ${isLight ? BORDER.light : BORDER.dark}`,
    interactive: `${isLight ? BG.surface.light : BG.surface.dark} border ${isLight ? BORDER.light : BORDER.dark} ${effects.transition.normal} ${effects.hover.scale} hover:shadow-lg`,
    accent: `${isLight ? BG.surface.light : BG.surface.dark} border-2 ${effects.transition.normal}`,
  }),

  // Section header
  sectionHeader: (isLight: boolean) => ({
    wrapper: 'text-center space-y-3',
    title: `${isLight ? TEXT.light : TEXT.dark} ${typography.h3}`,
    subtitle: `${isLight ? TEXT.mutedLight : TEXT.mutedDark} ${typography.body} max-w-2xl mx-auto`,
  }),

  // Button styles — sharp edges
  button: {
    primary: 'bg-accent-teal text-white px-6 py-3 font-medium transition-all duration-300 hover:bg-accent-teal-700 hover:shadow-md',
    secondary: 'bg-black/5 text-slate-900 px-6 py-3 font-medium transition-all duration-300 hover:bg-black/10',
    ghost: 'text-accent-teal hover:text-accent-teal-700 transition-colors duration-300',
  },
} as const

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Combine class strings, filtering out falsy values
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Create a responsive class string
 * @example responsive('p-4', 'p-6', 'p-8') => 'p-4 md:p-6 lg:p-8'
 */
export function responsive(mobile: string, tablet?: string, desktop?: string): string {
  return cn(mobile, tablet && `md:${tablet}`, desktop && `lg:${desktop}`)
}
