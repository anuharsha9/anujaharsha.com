import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        // ============================================
        // PALETTE OVERRIDES — Centralized via CSS Variables
        // These ensure ALL zinc/slate usage across the codebase
        // is backed by the token system in tokens.css
        // ============================================
        zinc: {
          50: 'var(--palette-zinc-50, #fafafa)',
          100: 'var(--palette-zinc-100, #f4f4f5)',
          200: 'var(--palette-zinc-200, #e4e4e7)',
          300: 'var(--palette-zinc-300, #d4d4d8)',
          400: 'var(--palette-zinc-400, #a1a1aa)',
          500: 'var(--palette-zinc-500, #71717a)',
          600: 'var(--palette-zinc-600, #52525b)',
          700: 'var(--palette-zinc-700, #3f3f46)',
          800: 'var(--palette-zinc-800, #27272a)',
          900: 'var(--palette-zinc-900, #18181b)',
          950: 'var(--palette-zinc-950, #09090b)',
        },
        slate: {
          50: 'var(--palette-slate-50, #f8fafc)',
          100: 'var(--palette-slate-100, #f1f5f9)',
          200: 'var(--palette-slate-200, #e2e8f0)',
          300: 'var(--palette-slate-300, #cbd5e1)',
          400: 'var(--palette-slate-400, #94a3b8)',
          500: 'var(--palette-slate-500, #64748b)',
          600: 'var(--palette-slate-600, #475569)',
          700: 'var(--palette-slate-700, #334155)',
          800: 'var(--palette-slate-800, #1e293b)',
          900: 'var(--palette-slate-900, #0f172a)',
          950: 'var(--palette-slate-950, #020617)',
        },


        // ============================================
        // SEMANTIC DESIGN TOKENS
        // ============================================
        'bg-dark': 'var(--bg-dark)',
        'bg-dark-alt': 'var(--bg-dark-alt)',
        'bg-light': 'var(--bg-light)',
        'bg-light-alt': 'var(--bg-light-alt)',
        'text-primary-dark': 'var(--text-primary-dark)',
        'text-muted-dark': 'var(--text-muted-dark)',
        'accent-teal': 'var(--accent-teal)',
        'accent-teal-soft': 'var(--accent-teal-soft)',
        'accent-teal-bright': 'var(--accent-teal-bright)',
        'accent-wordu': 'var(--accent-wordu)',
        'accent-wordu-hover': 'var(--accent-wordu-hover)',
        'accent-wordu-active': 'var(--accent-wordu-active)',
        'highlight': 'var(--highlight)',
        'color-success': 'var(--color-success)',
        'color-warning': 'var(--color-warning)',
        'color-error': 'var(--color-error)',
        'color-info': 'var(--color-info)',

        // Backgrounds
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',

        // Monitor / Dark Theme (Tech)
        'bg-monitor': 'var(--bg-monitor)',
        'bg-monitor-alt': 'var(--bg-monitor-alt)',
        'bg-monitor-surface': 'var(--bg-monitor-surface)',
        'bg-ink-950': 'var(--bg-ink-950)',
        'bg-ink-900': 'var(--bg-ink-900)',
        'bg-cinematic': 'var(--bg-cinematic)',
        'surface-panel-dark': 'var(--surface-panel-dark)',
        'border-monitor': 'var(--border-monitor)',
        'text-monitor': 'var(--text-monitor)',
        'text-monitor-muted': 'var(--text-monitor-muted)',
        'text-monitor-dim': 'var(--text-monitor-dim)',
        'semantic-emerald': 'var(--semantic-emerald)',
        'semantic-blue': 'var(--semantic-blue)',
        'semantic-rose': 'var(--semantic-rose)',
        'semantic-orange': 'var(--semantic-orange)',
        'semantic-purple': 'var(--semantic-purple)',
        'semantic-cyan': 'var(--semantic-cyan)',
        'semantic-pink': 'var(--semantic-pink)',
        'semantic-navy': 'var(--semantic-navy)',
        'brand-linkedin': 'var(--brand-linkedin)',

      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
      transitionTimingFunction: {
        'spring': 'var(--ease-spring)',
        'smooth': 'var(--ease-smooth)',
        'bounce': 'var(--ease-bounce)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },

      letterSpacing: {
        'tighter': 'var(--tracking-tighter)',
        'tight': 'var(--tracking-tight)',
        'normal': 'var(--tracking-normal)',
        'wide': 'var(--tracking-wide)',
        'wider': 'var(--tracking-wider)',
      },
      lineHeight: {
        'tight': 'var(--leading-tight)',
        'snug': 'var(--leading-snug)',
        'normal': 'var(--leading-normal)',
        'relaxed': 'var(--leading-relaxed)',
        'loose': 'var(--leading-loose)',
      },
      maxWidth: {
        'content': '1440px',
      },
      spacing: {
        'space-1': 'var(--space-1)',
        'space-2': 'var(--space-2)',
        'space-3': 'var(--space-3)',
        'space-4': 'var(--space-4)',
        'space-5': 'var(--space-5)',
        'space-6': 'var(--space-6)',
        'space-8': 'var(--space-8)',
        'space-10': 'var(--space-10)',
        'space-12': 'var(--space-12)',
        'space-16': 'var(--space-16)',
        'space-20': 'var(--space-20)',
        'space-24': 'var(--space-24)',
        'space-32': 'var(--space-32)',
        'section-mobile': 'var(--section-padding-mobile)',
        'section-tablet': 'var(--section-padding-tablet)',
        'section-desktop': 'var(--section-padding-desktop)',
      },
      fontSize: {
        'xs': ['var(--text-xs)', { lineHeight: 'var(--leading-normal)' }],
        'sm': ['var(--text-sm)', { lineHeight: 'var(--leading-normal)' }],
        'base': ['var(--text-base)', { lineHeight: 'var(--leading-relaxed)' }],
        'lg': ['var(--text-lg)', { lineHeight: 'var(--leading-relaxed)' }],
        'xl': ['var(--text-xl)', { lineHeight: 'var(--leading-tight)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-tight)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-tight)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--leading-tight)' }],
        '5xl': ['var(--text-5xl)', { lineHeight: 'var(--leading-tight)' }],
        '6xl': ['var(--text-6xl)', { lineHeight: 'var(--leading-tight)' }],
      },
      screens: {
        'xs': '475px',   // Extra small devices
        'sm': '640px',   // Small devices (default Tailwind)
        'md': '768px',   // Medium devices (default Tailwind)
        'lg': '1024px',  // Large devices (default Tailwind)
        'xl': '1280px',  // Extra large devices (default Tailwind)
        '2xl': '1536px', // 2X large devices (default Tailwind)
        '3xl': '1920px', // Ultra wide screens
      },
    },
  },
  plugins: [],
}
export default config
