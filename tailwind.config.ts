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
        'border-monitor': 'var(--border-monitor)',
        'text-monitor': 'var(--text-monitor)',
        'text-monitor-muted': 'var(--text-monitor-muted)',
        'text-monitor-dim': 'var(--text-monitor-dim)',
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
