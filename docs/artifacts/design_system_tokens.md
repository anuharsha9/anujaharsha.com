# Design System — Tokens & Variables

> **Source of truth**: [tokens.css](file:///Users/anu/Work/anu-portfolio-exploration/src/styles/tokens.css) → consumed by [tailwind.config.ts](file:///Users/anu/Work/anu-portfolio-exploration/tailwind.config.ts) → applied via [globals.css](file:///Users/anu/Work/anu-portfolio-exploration/src/app/globals.css)

---

## 🎨 Color System

### Text Colors (6 Tiers — Post Migration)

After today's migration, all `text-white/*`, `text-slate-*`, and scattered zinc values are consolidated into **6 semantic tiers**:

| Tier | Tailwind | CSS Variable | Hex | WCAG | Usage |
|---|---|---|---|---|---|
| **Heading** | `text-zinc-100` | `--text-heading` | `#f4f4f5` | — | Primary headings, hero text |
| **Primary** | `text-zinc-200` | `--text-primary` | `#e4e4e7` | — | Body text, subheadings |
| **Body** | `text-zinc-400` | `--text-body` | `#a1a1aa` | — | Default paragraph text |
| **Muted** | `text-zinc-500` | `--text-muted` | `#8b8b95` | AA ✅ (5.9:1) | Secondary/supporting text |
| **Dim** | `text-zinc-600` | `--text-dim` | `#7a7a84` | AA large ✅ (4.7:1) | Captions, decorative labels |
| **Ghost** | `text-zinc-800` | — | `#27272a` | Decorative only | Background decorative text |

> [!IMPORTANT]
> `text-zinc-700` (`#62626c`, 3.3:1) is below AA for normal text. Use for **large text or decorative** only.

### Backgrounds

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| `bg-primary` | `--bg-primary` | `#09090b` | Main page background |
| `bg-secondary` | `--bg-secondary` | `#0f1115` | Slightly raised surfaces |
| `bg-tertiary` | `--bg-tertiary` | `#131518` | Cards, panels |
| `bg-cinematic` | `--bg-cinematic` | `#010204` | Case study deep black |
| `bg-ink-950` | `--bg-ink-950` | `#020617` | Scrollbar track |
| `bg-ink-900` | `--bg-ink-900` | `#0f172a` | Ink-blue dark |
| `bg-monitor` | `--bg-monitor` | `#000000` | Pure black (tech) |
| `bg-monitor-alt` | `--bg-monitor-alt` | `#1c1c1e` | Monitor elevated |
| `bg-monitor-surface` | `--bg-monitor-surface` | `rgba(28,28,30,0.8)` | Monitor glass |
| `surface-panel-dark` | `--surface-panel-dark` | `#1D1D20` | Panel surfaces |

### Accent — Teal (Primary Brand)

| Token | CSS Variable | Hex |
|---|---|---|
| Primary | `--accent-teal` | `#078B9C` |
| Soft | `--accent-teal-soft` | `rgba(7,139,156,0.08)` |
| Bright | `--accent-teal-bright` | `#14b8a6` |
| Dark | `--accent-teal-dark` | `#077D8E` |
| Light/Alias | `--accent-light` | `#0990A2` |
| RGB | `--accent-teal-rgb` | `7, 139, 156` |

**Full scale**: 50–900 available via `--accent-teal-50` through `--accent-teal-900`

### Accent — Amber (Secondary)

| Token | CSS Variable | Hex |
|---|---|---|
| Primary | `--accent-amber` | `#f59e0b` |
| RGB | `--accent-amber-rgb` | `245, 158, 11` |

### Semantic / Data Viz Colors

| Token | Hex | Usage |
|---|---|---|
| `--semantic-emerald-500` | `#10b981` | Success, growth |
| `--semantic-emerald-400` | `#34d399` | Success light |
| `--semantic-green-500` | `#22c55e` | Positive |
| `--semantic-blue-500` | `#3b82f6` | Info, links |
| `--semantic-blue-400` | `#60a5fa` | Info light |
| `--semantic-rose-500` | `#f43f5e` | Emphasis |
| `--semantic-red-500` | `#ef4444` | Error, danger |
| `--semantic-orange-500` | `#f97316` | Warning |
| `--semantic-violet-400` | `#a78bfa` | Creative |
| `--semantic-purple-500` | `#a855f7` | DSML accent |
| `--semantic-cyan-500` | `#06b6d4` | ML accent |
| `--semantic-pink-500` | `#ec4899` | Highlight |
| `--semantic-navy-700` | `#1a3344` | Deep blue |

### Status Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#34c759` | Success states |
| `--color-warning` | `#ff9f0a` | Warning states |
| `--color-error` | `#ff3b30` | Error states |
| `--color-info` | `#078B9C` | Info (alias to teal) |

---

## 🔤 Typography

### Font Families

| Token | Stack |
|---|---|
| `--font-sans` | Inter, SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif |
| `--font-mono` | SF Mono, Menlo, Monaco, Courier New, monospace |

### Type Scale

| Token | Size | Tailwind |
|---|---|---|
| `--text-xs` | 12px (0.75rem) | `text-xs` |
| `--text-sm` | 14px (0.875rem) | `text-sm` |
| `--text-base` | 17px (1.0625rem) | `text-base` |
| `--text-lg` | 19px (1.1875rem) | `text-lg` |
| `--text-xl` | 21px (1.3125rem) | `text-xl` |
| `--text-2xl` | 28px (1.75rem) | `text-2xl` |
| `--text-3xl` | 35px (2.1875rem) | `text-3xl` |
| `--text-4xl` | 40px (2.5rem) | `text-4xl` |
| `--text-5xl` | 48px (3rem) | `text-5xl` |
| `--text-6xl` | 64px (4rem) | `text-6xl` |

### Font Weights

| Token | Value | Usage |
|---|---|---|
| `--weight-heading` | 900 | Hero titles |
| `--weight-subheading` | 700 | Section headers |
| `--weight-label` | 600 | Labels, CTAs |
| `--weight-body` | 400 | Body text |
| `--weight-mono-label` | 700 | Mono labels |

### Line Heights

| Token | Value | Tailwind |
|---|---|---|
| `--leading-tight` | 1.1 | `leading-tight` |
| `--leading-snug` | 1.25 | `leading-snug` |
| `--leading-normal` | 1.47059 | `leading-normal` |
| `--leading-relaxed` | 1.6 | `leading-relaxed` |
| `--leading-loose` | 1.8 | `leading-loose` |

### Letter Spacing

| Token | Value | Tailwind |
|---|---|---|
| `--tracking-tighter` | -0.05em | `tracking-tighter` |
| `--tracking-tight` | -0.022em | `tracking-tight` |
| `--tracking-normal` | -0.011em | `tracking-normal` |
| `--tracking-wide` | 0.025em | `tracking-wide` |
| `--tracking-wider` | 0.05em | `tracking-wider` |

---

## 📐 Spacing

**Base unit**: 4px (0.25rem)

| Token | Value | Tailwind |
|---|---|---|
| `--space-1` | 4px (0.25rem) | `space-1` |
| `--space-2` | 8px (0.5rem) | `space-2` |
| `--space-3` | 12px (0.75rem) | `space-3` |
| `--space-4` | 16px (1rem) | `space-4` |
| `--space-5` | 20px (1.25rem) | `space-5` |
| `--space-6` | 24px (1.5rem) | `space-6` |
| `--space-8` | 32px (2rem) | `space-8` |
| `--space-10` | 40px (2.5rem) | `space-10` |
| `--space-12` | 48px (3rem) | `space-12` |
| `--space-16` | 64px (4rem) | `space-16` |
| `--space-20` | 80px (5rem) | `space-20` |
| `--space-24` | 96px (6rem) | `space-24` |
| `--space-32` | 128px (8rem) | `space-32` |

### Section Padding (Responsive)

| Token | Mobile | Tablet | Desktop |
|---|---|---|---|
| Section spacing | 80px (space-20) | 96px (space-24) | 128px (space-32) |

### Content Widths

| Token | Value |
|---|---|
| `--content-width-narrow` | 65ch |
| `--content-width-medium` | 75ch |
| `--content-width-wide` | 90ch |
| `--content-width-container` | 1024px |
| Max content | 1200px |

---

## 🔲 Border Radius

| Token | Value | Tailwind |
|---|---|---|
| `--radius-sm` | 8px | `rounded-sm` |
| `--radius-md` | 12px | `rounded-md` |
| `--radius-lg` | 18px | `rounded-lg` |
| `--radius-xl` | 24px | `rounded-xl` |
| `--radius-2xl` | 32px | `rounded-2xl` |

---

## 🧱 Borders

| Token | Value |
|---|---|
| `--border-primary` | `rgba(255,255,255,0.08)` |
| `--border-secondary` | `rgba(255,255,255,0.06)` |
| `--border-subtle` | `rgba(255,255,255,0.04)` |
| `--border-light` | `rgba(255,255,255,0.06)` |
| `--border-dark` | `rgba(255,255,255,0.08)` |
| `--border-monitor` | `#333333` |

---

## 🌫 Shadows (Elevation)

| Token | Value | Tailwind |
|---|---|---|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.4)` | `shadow-sm` |
| `--shadow-md` | `0 8px 16px rgba(0,0,0,0.4)` | `shadow-md` |
| `--shadow-lg` | `0 16px 32px rgba(0,0,0,0.5)` | `shadow-lg` |
| `--shadow-xl` | `0 24px 48px rgba(0,0,0,0.6)` | `shadow-xl` |

---

## ✨ Animation

### Easing Curves

| Token | Value | Tailwind | Feel |
|---|---|---|---|
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `ease-spring` | Bouncy overshoot |
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | `ease-smooth` | Material standard |
| `--ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | `ease-bounce` | Elastic snap |

### Durations

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `--duration-fast` | 200ms | `duration-fast` | Hovers, micro-interactions |
| `--duration-normal` | 300ms | `duration-normal` | Standard transitions |
| `--duration-slow` | 500ms | `duration-slow` | Page-level transitions |

---

## 🎭 Overlays

| Token | Value |
|---|---|
| `--overlay-white-02` | `rgba(255,255,255,0.02)` |
| `--overlay-white-03` | `rgba(255,255,255,0.03)` |
| `--overlay-white-05` | `rgba(255,255,255,0.05)` |
| `--overlay-white-08` | `rgba(255,255,255,0.08)` |
| `--overlay-white-10` | `rgba(255,255,255,0.1)` |
| `--overlay-white-15` | `rgba(255,255,255,0.15)` |
| `--overlay-white-20` | `rgba(255,255,255,0.2)` |
| `--overlay-teal-core-12` | `rgba(0,162,183,0.12)` |

---

## 🎬 Case Study Themes

Scoped via `data-cs-theme` attribute on wrapper. All components use `--cs-*` tokens.

| Theme | Accent | Bright | Soft | RGB |
|---|---|---|---|---|
| **RC** (default) | `#078B9C` | `#14b8a6` | `rgba(7,139,156,0.08)` | `7, 139, 156` |
| **ML** | `#06b6d4` | `#22d3ee` | `rgba(6,182,212,0.08)` | `6, 182, 212` |
| **DSML** | `#a855f7` | `#c084fc` | `rgba(168,85,247,0.08)` | `168, 85, 247` |
| **WordU** | `#00ADEE` | `#33c4f5` | `rgba(0,173,238,0.08)` | `0, 173, 238` |

Derived tokens (auto-calculated from RGB):

| Token | Formula |
|---|---|
| `--cs-accent-glow` | `rgba(rgb, 0.6)` |
| `--cs-accent-border` | `rgba(rgb, 0.12)` |
| `--cs-accent-surface` | `rgba(rgb, 0.04)` |
| `--cs-bg-radial` | `rgba(rgb, 0.08)` |

---

## 🎯 Focus & Accessibility

| Token | Value |
|---|---|
| `--focus-ring` | `rgba(7,139,156,0.5)` — teal ring |
| `--focus-ring-width` | `3px` |
| `--focus-ring-offset` | `1px` |

### Reduced Motion

All animations respect `prefers-reduced-motion: reduce` — durations forced to `0.01ms`.

### Custom Cursor

Native cursor hidden via `html.has-custom-cursor` class. Falls back to native on touch devices.

---

## 📱 Breakpoints

| Name | Width | Tailwind |
|---|---|---|
| xs | 475px | `xs:` |
| sm | 640px | `sm:` |
| md | 768px | `md:` |
| lg | 1024px | `lg:` |
| xl | 1280px | `xl:` |
| 2xl | 1536px | `2xl:` |
| 3xl | 1920px | `3xl:` |

---

## 🎮 WordU Theme (Light)

Separate token set for the WordU case study:

| Category | Token | Value |
|---|---|---|
| Accent | `--accent-wordu` | `#00ADEE` |
| Surface | `--surface-wordu` | `#f8f9fb` |
| Surface raised | `--surface-wordu-raised` | `#ffffff` |
| Text primary | `--text-wordu-primary` | `#1a1d23` |
| Text secondary | `--text-wordu-secondary` | `#3d4250` |
| Text muted | `--text-wordu-muted` | `#6b7280` |
| Border | `--border-wordu` | `#e5e7eb` |
| Glow | `--glow-wordu` | `rgba(0,173,238,0.12)` |
