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
        gray: {
          50: 'var(--palette-gray-50, #f9fafb)',
          100: 'var(--palette-gray-100, #f3f4f6)',
          200: 'var(--palette-gray-200, #e5e7eb)',
          300: 'var(--palette-gray-300, #d1d5db)',
          400: 'var(--palette-gray-400, #9ca3af)',
          500: 'var(--palette-gray-500, #6b7280)',
          600: 'var(--palette-gray-600, #4b5563)',
          700: 'var(--palette-gray-700, #374151)',
          800: 'var(--palette-gray-800, #1f2937)',
          900: 'var(--palette-gray-900, #111827)',
          950: 'var(--palette-gray-950, #030712)',
        },
        neutral: {
          50: 'var(--palette-neutral-50, #fafafa)',
          100: 'var(--palette-neutral-100, #f5f5f5)',
          200: 'var(--palette-neutral-200, #e5e5e5)',
          300: 'var(--palette-neutral-300, #d4d4d4)',
          400: 'var(--palette-neutral-400, #a3a3a3)',
          500: 'var(--palette-neutral-500, #737373)',
          600: 'var(--palette-neutral-600, #525252)',
          700: 'var(--palette-neutral-700, #404040)',
          800: 'var(--palette-neutral-800, #262626)',
          900: 'var(--palette-neutral-900, #171717)',
          950: 'var(--palette-neutral-950, #0a0a0a)',
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
        'text-primary-light': 'var(--text-primary-light)',
        'text-muted-light': 'var(--text-muted-light)',
        'accent-teal': 'var(--accent-teal)',
        'accent-teal-soft': 'var(--accent-teal-soft)',
        'accent-teal-50': 'var(--accent-teal-50)',
        'accent-teal-100': 'var(--accent-teal-100)',
        'accent-teal-200': 'var(--accent-teal-200)',
        'accent-teal-300': 'var(--accent-teal-300)',
        'accent-teal-400': 'var(--accent-teal-400)',
        'accent-teal-500': 'var(--accent-teal-500)',
        'accent-teal-600': 'var(--accent-teal-600)',
        'accent-teal-700': 'var(--accent-teal-700)',
        'accent-teal-800': 'var(--accent-teal-800)',
        'accent-teal-900': 'var(--accent-teal-900)',
        'accent-teal-bright': 'var(--accent-teal-bright)',
        'accent-wordu': 'var(--accent-wordu)',
        'accent-wordu-hover': 'var(--accent-wordu-hover)',
        'accent-wordu-active': 'var(--accent-wordu-active)',
        'highlight': 'var(--highlight)',
        'highlight-soft': 'var(--highlight-soft)',
        'highlight-hover': 'var(--highlight-hover)',
        'highlight-active': 'var(--highlight-active)',
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
        'semantic-emerald-500': 'var(--semantic-emerald-500)',
        'semantic-emerald-400': 'var(--semantic-emerald-400)',
        'semantic-green-500': 'var(--semantic-green-500)',
        'semantic-blue-500': 'var(--semantic-blue-500)',
        'semantic-blue-400': 'var(--semantic-blue-400)',
        'semantic-rose-500': 'var(--semantic-rose-500)',
        'semantic-red-500': 'var(--semantic-red-500)',
        'semantic-orange-500': 'var(--semantic-orange-500)',
        'semantic-violet-400': 'var(--semantic-violet-400)',
        'semantic-purple-500': 'var(--semantic-purple-500)',
        'semantic-cyan-500': 'var(--semantic-cyan-500)',
        'semantic-pink-500': 'var(--semantic-pink-500)',
        'semantic-navy-700': 'var(--semantic-navy-700)',
        'brand-linkedin': 'var(--brand-linkedin)',

        // Legacy support
        bg: 'var(--bg-dark)',
        surface: 'var(--bg-dark-alt)',
        accent: 'var(--accent-teal)',
        muted: 'var(--text-muted-dark)',
        text: 'var(--text-primary-dark)',
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
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
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
        'content': '1200px',
        'content-container': 'calc(1200px + 2rem)',
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
