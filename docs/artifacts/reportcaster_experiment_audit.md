# ReportCaster `/experiment/case-study/reportcaster/` — Full Audit
**Date**: March 2, 2026  
**Audited Against**: 6-Act Cinematic Narrative Structure, Design System Master, Auditing & Remediation Workflow

---

## Overall Structure Summary

The page follows the `CinematicCaseStudy.tsx` component (705 lines), rendering 7 sections:

| Section | ID | Title | Status |
|---|---|---|---|
| Hero | — | Customers Were Leaving... | ✅ |
| Act I | `act-i` | How I Landed the Project | ⚠️ |
| Act II | `act-ii` | I Built My Own Research Network | ⚠️ |
| Act III | `act-iii` | What I Discovered | ⚠️ |
| Act IV | `act-iv` | Two Rejections. One Breakthrough. | 🔴 |
| Act V | `act-v` | I Onboarded 20 People. | ⚠️ |
| Act VI | `act-vi` | Powering 20M+ Schedules | ⚠️ |
| Reflection | `act-reflection` | What This Project Made Me | ⚠️ |

---

## 🔴 Phase 1: High-Impact Issues

### 1. FloatingOrbs uses JS-driven springs, NOT CSS keyframes
[FloatingOrbs.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/ui/FloatingOrbs.tsx)

> [!CAUTION]
> **Violates**: Performance Protocol. The KI explicitly states *"Background FloatingOrbs use pure CSS keyframe animations instead of JS listeners to eliminate scroll jank at extreme vertical scale."*

**Current**: Uses `framer-motion` `useScroll`, `useTransform`, `useSpring` for parallax + `animate` prop for floating. This means **8 orbs** are running JS-driven spring physics on every scroll frame across a 16,000px page.

**Fix**: Replace with pure CSS `@keyframes` animations. Remove scroll-linked parallax entirely or use `will-change: transform` with CSS-only drift.

---

### 2. No Lightbox Integration on Bento Images
[CinematicCaseStudy.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicCaseStudy.tsx)

> [!WARNING] 
> **Violates**: Universal Investigation (Lightbox Integrity). *"Every bento image is focusable. Every image in a BentoGallery must be clickable, opening the ImageLightbox UI."*

**Current**: `ImageTile` in `BentoGrid.tsx` renders plain `<img>` tags with no `onClick` or lightbox integration. The only component with lightbox is `FeatureCategoryCarousel` — which isn't used anywhere in this page.

All Act III legacy screenshots, Act IV shipped screens, and carousel images are **not focusable**. The `ImageLightbox` component exists (`@/components/case-study/ImageLightbox`) but is never imported or used in the experiment components.

---

### 3. `<img>` tags instead of Next.js `<Image />`
[BentoGrid.tsx:L58-L73](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/BentoGrid.tsx#L58-L73) | [AppleEndlessCarousel.tsx:L27](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/AppleEndlessCarousel.tsx#L27)

> [!WARNING]
> **Violates**: Media & Performance Protocol. *"All legacy and modern artifacts use Next.js `<Image />` tags with aggressive Asset Deferral Protocol."*

**Current**: Both `ImageTile` and `AppleEndlessCarousel.Card` use raw `<img>` tags. This means:
- No automatic WebP/AVIF conversion
- No responsive `srcset` generation
- No lazy loading optimization (the `loading="lazy"` attribute is present but less effective than Next.js's native implementation)
- Worse LCP scores

---

### 4. Missing Scroll Progress Navigation (Act Dots)
[CinematicCaseStudy.tsx:L54-L73](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicCaseStudy.tsx#L54-L73)

> [!IMPORTANT]
> **Violates**: Scroll Progress Navigation. *"Implemented a floating 'Act Dots' sidebar for 20k-pixel navigation."*

**Current**: The `ACT_SECTIONS` array and scroll tracking logic exist (lines 20-73), tracking `activeAct` and `showProgress`. However, **there is no JSX rendering the floating dot sidebar**. The state is tracked but never displayed. The page is 16,000px tall with zero navigation affordance.

---

## 🟡 Phase 2: Narrative & Spacing Issues

### 5. Act V uses hardcoded background color, not token
[CinematicCaseStudy.tsx:L474](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicCaseStudy.tsx#L474)

```tsx
<div className="relative z-20 bg-[#0a0f0f]" id="act-v">
```

All other Acts use `bg-[var(--bg-cinematic)]` (`#010204`). Act V uses a different hardcoded color `#0a0f0f`, creating an inconsistent background shift. This should use the token for consistency, or be an intentional design deviation that's documented.

---

### 6. No `BentoGallery` Masonry Layout — Using Row-Based Grid Instead
[BentoGrid.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/BentoGrid.tsx)

> [!NOTE]
> **Diverges from**: Masonry Column Architecture. The KI mandates *"CSS Columns Masonry (columnCount, columnGap) to create a fluid, magazine-style puzzle layout"* and *"play with scale, not ratio."*

**Current**: `BentoGrid` uses a traditional `BentoRow` system with fixed CSS Grid templates (`grid-cols-1`, `grid-cols-2`, `grid-cols-3`, etc.). This is a **structured row-based layout**, not the fluid masonry documented in the KI.

This means images are forced into predetermined aspect ratios rather than flowing naturally. The KI specifically warns against *"rigid grid spanning that forces cropping."*

---

### 7. PullQuote Eyebrow Says "THE TAKEAWAY" — Correct ✅
[BentoGrid.tsx:L145-L224](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/BentoGrid.tsx#L145-L224)

The `PullQuote` component correctly uses `"THE TAKEAWAY"` label with cyan styling. This matches the design system spec. ✅

---

### 8. No Act Eyebrow Labels — Correct ✅
[CinematicScene.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicScene.tsx)

The `CinematicScene` component accepts an `eyebrow` prop, but **none of the Act sections pass it** in `CinematicCaseStudy.tsx`. Only the massive title + body subtext pattern is used. This correctly follows the **2-Style Act Header Protocol**. ✅

---

### 9. Inconsistent Section Spacing
[CinematicScene.tsx:L47](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicScene.tsx#L47)

**Current**: `CinematicScene` uses `py-24 sm:py-32`. The KI specifies standardized `py-24` for consistency. The `sm:py-32` variation creates inconsistent rhythm between mobile and desktop that doesn't match the documented token `--case-study-section-py: var(--space-24)`.

Additionally, Act IV's V3 story section (`space-y-16 md:space-y-24 mt-12`) uses different spacing than other Acts, creating uneven vertical rhythm.

---

### 10. Act III Has Non-Bento Inline Headers
[CinematicCaseStudy.tsx:L258-L260](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicCaseStudy.tsx#L258-L260) | [L272-L278](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicCaseStudy.tsx#L272-L278)

```tsx
<div className="flex items-end justify-between border-b border-white/10 pb-4 mb-8 mt-8">
    <h3 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase">Legacy Context</h3>
</div>
```

These inline section dividers ("Legacy Context", "Mapping the chaos") break the **Title → Subtext → Bento** rhythmic pattern. They introduce a third hierarchy level within an Act. The KI states every section should be **exactly two pieces of information (Title + context)** followed by one bento.

---

### 11. Act IV V3 Shipped Screens Are Outside CinematicScene
[CinematicCaseStudy.tsx:L376-L466](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicCaseStudy.tsx#L376-L466)

The V3 "Story Deck" (Unifying the Setup, Natural Language System, etc.) renders **outside** any `CinematicScene` wrapper. It's a raw `<div>` with manual `max-w-[1440px]` and padding. This means:
- No fade-in/scale animation on scroll entry
- No consistent spacing wrapper
- The `PlusIconTree` and narrative text are orphaned from the section's narrative container

---

## 🟢 Phase 3: UX Enhancements

### 12. CarouselTile Has No Navigation Affordance
[BentoGrid.tsx:L233-L315](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/BentoGrid.tsx#L233-L315)

> [!NOTE]
> **Violates**: Horizontal Discoverability. *"Carousels must have pointers (arrows, dots, or 'scroll to explore')."*

**Current**: `CarouselTile` has left/right arrow buttons and dot indicators. ✅ However, the dots are plain `<button>` elements without proper `aria-label` attributes beyond index numbers.

Also, the `autoPlay` carousel in Act III (sketches, 2000ms interval) may be too fast for meaningful inspection. The KI recommends pausing on hover — which is not implemented in `CarouselTile`.

---

### 13. Hero Section Uses `sticky top-0` — Potential Z-Index Conflict
[CinematicCaseStudy.tsx:L95-L151](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicCaseStudy.tsx#L95-L151)

The hero is `sticky top-0` with `z-10`, while all Act sections use `z-20`. This creates an intentional parallax/overlap effect where content scrolls over the hero. This appears to be working as designed ✅, but the hero opacity/scale animation (`[0, 0.6]` range) may leave residual content visible underneath Act I for a brief moment.

---

### 14. `object-cover` on Videos Instead of `object-contain`
[CinematicCaseStudy.tsx:L584](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicCaseStudy.tsx#L584) | [L593](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicCaseStudy.tsx#L593)

```tsx
className="w-full h-full object-cover"
```

> [!WARNING]
> **Violates**: Clean No-Frame Containment Protocol. Videos use `object-cover` which crops content to fill the container. The KI mandates `object-contain` for all artifacts to preserve native aspect ratios.

---

### 15. Video Elements Don't Have `poster` Fallback Loading
The before/after videos use `preload="none"` ✅ and have `poster` props ✅. This is correctly implemented per the Video Deferral protocol.

---

### 16. Reflection Section Misses "Graphical Bento Finale"
[CinematicCaseStudy.tsx:L639-L701](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicCaseStudy.tsx#L639-L701)

> [!IMPORTANT]
> The KI describes the Reflection as a **"Graphical Bento Reflection"** with: Hero Card (`min-h-[50vh]`), `FloatingOrbs`, Lucide icons, 7xl Hero Typography, and glassmorphic cards.

**Current**: The Reflection is a standard `CinematicScene` with two TextTile rows (peer reviews + retrospective) followed by a centered closing quote. There are:
- No glassmorphic cards
- No 7xl Hero Typography
- No Hero Card with `min-h-[50vh]`
- No dedicated `FloatingOrbs` instance for the finale
- No icons (Lucide or otherwise)

The closing section (lines 681-700) is a simple centered italic quote with a border top. It doesn't have the "Manifesto" scale described in the KI.

---

## ✅ What's Working Well

| Feature | Status |
|---|---|
| **2-Style Act Headers** | ✅ No eyebrow labels, left-aligned |
| **PullQuote spacing & styling** | ✅ Correct "THE TAKEAWAY" label with cyan accent |
| **Hero stat grid** | ✅ Clean, token-driven metrics display |
| **ScatterConverge illustration** | ✅ Excellent 5→1 animation |
| **PlusIconTree** | ✅ Strong V3 breakthrough visualization |
| **ImpactClimax component** | ✅ Clean metric cards with hover shimmer |
| **RejectionMark** | ✅ Subtle, well-animated rejection indicator |
| **OnboardingPath / KnowledgeTransfer** | ✅ Clean micro-illustrations |
| **Video deferral** | ✅ `preload="none"` with poster fallback |
| **Narrative voice** | ✅ Authentic first-person, high-impact |
| **Scope tags** | ✅ Premium pill styling |
| **Color token usage** | ✅ Consistent `--accent-teal`, `--bg-cinematic` (except Act V) |

---

## Priority Fix Order

| Priority | Issue | Effort | Status |
|---|---|---|---|
| 🔴 1 | **Add Scroll Progress Dots** (state exists, no UI) | Small | ✅ DONE |
| 🔴 2 | **Add Lightbox to ImageTile** | Medium | ✅ DONE |
| 🔴 3 | **FloatingOrbs → CSS keyframes** | Medium | ✅ DONE |
| 🔴 4 | **`<img>` → Next.js `<Image />`** | Medium | ✅ DONE |
| 🟡 5 | **Fix Act V bg color token** | Tiny | ✅ DONE |
| 🟡 6 | **Fix video `object-cover` → `object-contain`** | Tiny | ✅ DONE |
| 🟡 7 | **Remove Act III inline sub-headers** | Small | ✅ DONE |
| 🟡 8 | **Wrap Act IV V3 in CinematicScene** | Small | ✅ DONE |
| 🟢 9 | **Upgrade Reflection to Graphical Bento Finale** | Large | ✅ DONE |
| 🟢 10 | **Migrate BentoGrid to CSS Columns Masonry** | Large | 🟡 Future |

## ⚡ Performance Wins Applied

| Change | Impact |
|---|---|
| FloatingOrbs → CSS @keyframes | Eliminated 8 JS spring + scroll listeners |
| PeopleDotGrid → single container fade | Eliminated ~200 IntersectionObservers |
| ScatterConverge rotations → CSS | Eliminated 5 infinite JS animation loops |
| KnowledgeTransfer pulses → CSS | Eliminated 2 infinite JS animation loops |
| `<img>` → Next.js `<Image />` | Auto WebP, responsive srcset, native lazy |
| Scroll progress dots rendered | 16k-pixel page now has navigation |
| Lightbox via context provider | All images focusable with "View Focus" overlay |
| Act III sub-headers → EyebrowLabel | Consistent Title → Subtext → Bento rhythm |
| V3 story deck → CinematicScene | Proper fade-in animation + spacing wrapper |
| Reflection → Graphical Bento Finale | Glassmorphic cards, gradient manifesto, 50vh close |
