# Design System — Anuja Harsha Portfolio

> Single source of truth. All tokens defined in `src/styles/tokens.css`, consumed by `src/lib/design-system.ts`.

---

## 🎨 Color System

### Brand Accent — Teal
The primary accent color, used for CTAs, interactive elements, and brand expressions.

| Token | Value | Hex | Usage |
|---|---|---|---|
| `--accent-teal` | `#078B9C` | ![#078B9C](https://placehold.co/16x16/078B9C/078B9C.png) | Primary accent, links, CTAs |
| `--accent-teal-bright` | `#14b8a6` | ![#14b8a6](https://placehold.co/16x16/14b8a6/14b8a6.png) | Hover states |
| `--accent-teal-dark` | `#077D8E` | ![#077D8E](https://placehold.co/16x16/077D8E/077D8E.png) | Active states, scrollbar |
| `--accent-teal-soft` | `rgba(7,139,156,0.08)` | — | Soft backgrounds |

### Case Study Theme Accents
Each case study has a scoped accent via `data-cs-theme` attribute:

| Case Study | Theme | Accent | RGB |
|---|---|---|---|
| ReportCaster | `rc` | `#078B9C` Teal | `7, 139, 156` |
| ML Functions | `ml` | `#06b6d4` Cyan | `6, 182, 212` |
| DSML / IQ Hub | `dsml` | `#a855f7` Violet | `168, 85, 247` |
| WordU | `wordu` | `#00ADEE` Blue | `0, 173, 238` |

### Backgrounds
Dark-first palette, optimized for OLED and cinematic presence.

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#09090b` | Main page background |
| `--bg-secondary` | `#0f1115` | Elevated surfaces |
| `--bg-tertiary` | `#131518` | Subtle lift |
| `--bg-cinematic` | `#010204` | Ultra-dark (case studies) |
| `--bg-ink-950` | `#020617` | Deep navy (ink theme) |

### Text Colors
Semantic text hierarchy on dark backgrounds.

| Token | Value | WCAG | Usage |
|---|---|---|---|
| `--text-heading` | `#f4f4f5` | ✅ 18:1 | Primary headings |
| `--text-primary` | `#e4e4e7` | ✅ 15:1 | Body text |
| `--text-body` | `#a1a1aa` | ✅ 7.2:1 | Default paragraph text |
| `--text-muted` | `#8b8b95` | ✅ 5.9:1 | Secondary/supporting text |
| `--text-dim` | `#62626c` | ⚠️ 3.3:1 | Decorative only (AA large) |

### Opacity Classes (on white text)
For inline opacity on dark backgrounds:

| Class | Opacity | WCAG | Usage |
|---|---|---|---|
| `text-white/90` | 90% | ✅ | Near-full headings |
| `text-white/70` | 70% | ✅ | Body text |
| `text-white/50` | 50% | ✅ AA large | Descriptions, captions |
| `text-white/40` | 40% | ⚠️ AA large | Labels, metadata |
| `text-white/30` | 30% | ⚠️ Large only | Section tags, decorative |
| `text-white/15-20` | — | ❌ | Ghost text only (non-content) |

---

## 📐 Typography

### Font Stacks

| Token | Stack | Usage |
|---|---|---|
| `--font-sans` | Inter, SF Pro Text, system | Body text, headings |
| `--font-serif` | *(unused — renamed)* | — |
| `--font-mono` | SF Mono, Menlo, Monaco | Code, labels, metadata |
| Google: Playfair Display | — | Poetry, editorial accents |
| Google: JetBrains Mono | — | Terminal UI, article listing |

### Type Scale

| Token | Size | px | Usage |
|---|---|---|---|
| `--text-xs` | 0.75rem | 12px | Micro labels |
| `--text-sm` | 0.875rem | 14px | Small body |
| `--text-base` | 1.0625rem | 17px | Default body |
| `--text-lg` | 1.1875rem | 19px | Large body |
| `--text-xl` | 1.3125rem | 21px | Section intro |
| `--text-2xl` | 1.75rem | 28px | Sub-headings |
| `--text-3xl` | 2.1875rem | 35px | Section titles |
| `--text-4xl` | 2.5rem | 40px | Large titles |
| `--text-5xl` | 3rem | 48px | Hero sub |
| `--text-6xl` | 4rem | 64px | Hero title |

### Font Weights

| Token | Weight | Usage |
|---|---|---|
| `--weight-body` | 400 | Body text |
| `--weight-label` | 600 | UI labels |
| `--weight-subheading` | 700 | Section headings |
| `--weight-heading` | 900 | Hero, page titles |

### Line Heights

| Token | Value | Usage |
|---|---|---|
| `--leading-tight` | 1.1 | Headlines |
| `--leading-snug` | 1.25 | Compact text |
| `--leading-normal` | 1.47 | Default body |
| `--leading-relaxed` | 1.6 | Long-form reading |
| `--leading-loose` | 1.8 | Spacious sections |

---

## 📏 Spacing & Layout

### Base Scale (4px grid)

| Token | Value | px |
|---|---|---|
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem | 16px |
| `--space-6` | 1.5rem | 24px |
| `--space-8` | 2rem | 32px |
| `--space-10` | 2.5rem | 40px |
| `--space-12` | 3rem | 48px |
| `--space-16` | 4rem | 64px |
| `--space-20` | 5rem | 80px |
| `--space-24` | 6rem | 96px |
| `--space-32` | 8rem | 128px |

### Section Padding

| Breakpoint | Token | Value |
|---|---|---|
| Mobile | `--section-padding-mobile` | 80px |
| Tablet | `--section-padding-tablet` | 96px |
| Desktop | `--section-padding-desktop` | 128px |

### Content Widths

| Token | Value | Usage |
|---|---|---|
| `--content-width-narrow` | 65ch | Body copy |
| `--content-width-medium` | 75ch | Section content |
| `--content-width-wide` | 90ch | Wide layouts |
| `--content-width-container` | 1024px | Max container |

---

## 🔲 Borders & Surfaces

### Border Colors

| Token | Value | Usage |
|---|---|---|
| `--border-primary` | `white 8%` | Default dividers |
| `--border-secondary` | `white 6%` | Subtle dividers |
| `--border-subtle` | `white 4%` | Ghost borders |

### Border Radius

| Token | Value |
|---|---|
| `--radius-sm` | 8px |
| `--radius-md` | 12px |
| `--radius-lg` | 18px |
| `--radius-xl` | 24px |
| `--radius-2xl` | 32px |

### Elevation (Shadows)

| Token | Usage |
|---|---|
| `--shadow-sm` | Cards, subtle lift |
| `--shadow-md` | Dropdowns, modals |
| `--shadow-lg` | Hero elements |
| `--shadow-xl` | Feature highlights |

---

## 🎬 Animation

### Easing Functions

| Token | Curve | Usage |
|---|---|---|
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy interactions |
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default transitions |
| `--ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Playful emphasis |

### Duration Scale

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | 200ms | Micro-interactions |
| `--duration-normal` | 300ms | Default transitions |
| `--duration-slow` | 500ms | Page transitions |

### Framer Motion Presets
Defined in `src/lib/motion.ts`:
- `fadeUp` — Staggered entrance
- `scaleIn` — Attention-grabbing
- `slideIn` — Directional reveal
- `staggerContainer` — Parent orchestration

---

## ♿ Accessibility

### Focus Ring
| Token | Value |
|---|---|
| `--focus-ring` | `rgba(7, 139, 156, 0.5)` |
| `--focus-ring-width` | `3px` |
| `--focus-ring-offset` | `1px` |

Applied globally via `*:focus-visible` in `globals.css`.

### Motion Safety
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📂 File Map

| File | Purpose |
|---|---|
| `src/styles/tokens.css` | CSS custom properties (source of truth) |
| `src/lib/design-system.ts` | JS theme system + component presets |
| `src/lib/motion.ts` | Framer Motion animation presets |
| `src/app/globals.css` | Global styles, focus, print, reduced motion |
| `tailwind.config.ts` | Tailwind extends using CSS vars |
| `src/app/design-system/page.tsx` | Visual living design system page |
