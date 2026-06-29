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


---

<!-- merged from: docs/artifacts/design_system_tokens.md -->
## ── Appendix: Token Reference (merged from artifacts/design_system_tokens.md) ──

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


---

<!-- merged from: docs/artifacts/design_system_preview.md -->
## ── Appendix: Design-System Preview (merged from artifacts/design_system_preview.md) ──

# Design System — Visual Preview

> Live at [localhost:3000/design-system](http://localhost:3000/design-system)

## Above the Fold

![Design System Hero](/Users/anu/.gemini/antigravity/brain/30f57d61-946d-4175-b75c-cea36cff5a23/design_system_fold.png)

## Full Page

![Design System Full](/Users/anu/.gemini/antigravity/brain/30f57d61-946d-4175-b75c-cea36cff5a23/design_system_full.png)

---

## Quick Reference

### Files
| File | Purpose |
|---|---|
| [tokens.css](file:///Users/anu/Work/anu-portfolio-exploration/src/styles/tokens.css) | CSS custom properties (source of truth) |
| [design-system.ts](file:///Users/anu/Work/anu-portfolio-exploration/src/lib/design-system.ts) | JS theme system + component presets |
| [globals.css](file:///Users/anu/Work/anu-portfolio-exploration/src/app/globals.css) | Global styles, focus, print, reduced motion |
| [design-system page](file:///Users/anu/Work/anu-portfolio-exploration/src/app/design-system/page.tsx) | React visual reference |
| [design-system.md](file:///Users/anu/Work/anu-portfolio-exploration/docs/design-system.md) | Full documentation |

### Sections on the page
1. **Colors** — Brand teal, case study themes, backgrounds, text hierarchy, opacity scale, semantics
2. **Typography** — Font stacks (Inter, SF Mono, Playfair Display), type scale, weights
3. **Spacing** — 4px grid, visual bars showing all spacing tokens
4. **Borders & Radius** — Border radius shapes, elevation/shadow levels
5. **Animation** — Easing curves, duration scale with animated progress bars
6. **Components** — Buttons, tags, cards with live hover states
7. **Accessibility** — Focus ring, reduced motion, skip-to-content, touch targets
