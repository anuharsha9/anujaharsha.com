# Wave Page Transition — Brainstorm v3

> **Core Insight:** The aurora waves have a physical home — they sit in the lower portion of the viewport, like an ocean horizon. During transitions, the wave SURGES upward to consume the page, then RETREATS back to its resting position, revealing new content. The ocean has a shoreline.

---

## Aurora Repositioning

### Current State
```
┌─ HEADER ──────────────────────────────┐
│                                       │
╠═══ AURORA WAVES ══════════════════════╣  ← ~10-15% below header
│                                       │
│      (content)                        │
│                                       │
│                                       │
│                                       │
│                                       │
└─ FOOTER ──────────────────────────────┘
```

### New Position (The Shoreline)
```
┌─ HEADER ──────────────────────────────┐
│                                       │
│   SENIOR PRODUCT DESIGNER             │
│   Hi, I'm Anuja                       │
│   13 years of experience...           │
│                                       │
│ - - - - - - - - - - - - - - - - - - - │  ← the shoreline (~60-70%)
│                                       │
╠═══ AURORA WAVES ══════════════════════╣  ← ~20% above footer
│   (live, breathing, always moving)    │
│                                       │
└─ FOOTER ──────────────────────────────┘
```

The waves now live in the **lower third** of the viewport.
They're always visible — a gentle, breathing ocean floor.
Content floats ABOVE the water.

This changes the entire spatial metaphor:
- **Content = land/shore** — solid, above the waterline
- **Aurora = ocean** — always present, always moving, below
- **Transitions = the tide rising** — water surges up to reclaim the shore

### How to Implement the Reposition
The aurora canvas in FixedBackground needs to shift its vertical position:

```tsx
// FixedBackground.tsx
// Instead of covering full viewport, the aurora sits in the lower portion
<div
  className="fixed bottom-0 left-0 w-screen pointer-events-none"
  style={{ height: '55vh', top: 'auto' }}  // lower 55% of viewport
>
  <HeroAurora />
</div>
```

With a gradient fade at the top edge so the waves feather into the dark:
```css
/* Feathered top edge — waves blend into darkness above */
mask-image: linear-gradient(
  to bottom,
  transparent 0%,
  white 25%,
  white 100%
);
```

---

## Tidal Wash Transition — Option B (Double Ripple)

### The Cast of Characters

**PRIMARY WAVE** — The main crest. Organic SVG bezier curve. This is the heavy hitter.
**TRAILING WASH** — A second, smaller ripple that follows ~80ms behind. Softer. Like the secondary foam you see after a wave crashes.

```
PRIMARY (leading):   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      ↑ this one does the work
TRAILING (follow):      ~~~~~~~~~~~~~~~~~~~~~~~~~~~
                         ↑ this one adds realism
```

### The Foam Zone (Blur!)

RIGHT at the wave edge, there's a **blur gradient zone** — the "foam":

```
         CONTENT (sharp, readable)
         │
    ─────┤ ← 40px above wave: content still sharp
         │
    ░░░░░│ ← 20px above wave: content starts blurring (blur: 8px)
    ▓▓▓▓▓│ ← at wave edge: peak blur (blur: 30px) + opacity fading
    █████│ ← below wave edge: fully dissolved into aurora
         │
         AURORA (full intensity, luminous)
```

This foam zone is a `backdrop-filter` gradient that travels WITH the wave:
- 40px band above the wave: progressive blur (0 → 30px)
- At the wave: content dissolves (blur peaks, opacity drops)
- Below the wave: pure aurora

It's like sea foam — that turbulent, fizzy zone where water meets sand.

---

## Full Phase Breakdown

### Phase 1: THE SURGE (outgoing, ~500ms)

The ocean rises from its resting position to claim the page.

```
t=0ms         t=200ms       t=350ms       t=500ms
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  content │  │  content │  │░░foam░░░░│  │          │
│          │  │          │  │▓▓▓▓▓▓▓▓▓▓│  │  AURORA  │
│          │  │░░foam░░░░│  │ AURORA   │  │  OCEAN   │
│- - - - - │  │▓▓▓▓▓▓▓▓▓▓│  │          │  │          │
│~~~~~~~~~~│  │~~~~~~~~~~│  │          │  │          │
│  AURORA  │  │  AURORA  │  │          │  │          │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

- **Primary wave** sweeps up from shoreline (~70%) to top of viewport
- **Trailing wash** follows 80ms behind
- Content at the foam zone **blurs progressively** as the wave passes
- Aurora intensity surges from 35% → 100%
- Wave edge has a subtle **teal glow + white foam line**

### Phase 2: HIGH TIDE (~200ms)

Everything is ocean. Full aurora. One breath-pulse.

```
┌──────────┐
│          │
│  AURORA  │  ← full viewport, full intensity
│  OCEAN   │  ← breathing, pulsing once
│          │
│          │
└──────────┘
```

### Phase 3: THE RETREAT (incoming, ~600ms)

The wave retreats back down to its natural shoreline, revealing new content.
But the reveal has the "wet sand" magic.

```
t=0ms         t=200ms       t=400ms       t=600ms
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│          │  │ NEW PAGE │  │ NEW PAGE │  │ NEW PAGE │
│  AURORA  │  │ (wet ✨) │  │ (drying) │  │ (settled)│
│  OCEAN   │  │░░foam░░░░│  │          │  │          │
│          │  │▓▓▓▓▓▓▓▓▓▓│  │- - - - - │  │- - - - - │
│          │  │~~~~~~~~~~│  │~~~~~~~~~~│  │~~~~~~~~~~│
│          │  │  AURORA  │  │  AURORA  │  │  AURORA  │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

- Wave recedes from top → back to shoreline position
- New content emerges with:
  - **Teal wash** — subtle teal overlay (mix-blend-mode or CSS filter)
  - **Shimmer sweep** — single glint of light across the content
  - **Settling** — teal fades over 300ms, content reaches final state
- Content at the receding wave edge is **slightly blurred**, sharpening as the wave passes
- Aurora dims from 100% → 35% as the wave settles back to its resting position

---

## The Wet Sand Shimmer

The premium detail. When new content emerges:

```
t=0ms (wave just passed):
  ┌────────────────────────────────────┐
  │  Content visible but TEAL-TINGED  │  ← like wet sand
  │  Slight shimmer sweeping L→R       │  ← like light on water
  └────────────────────────────────────┘

t=300ms (settling):
  ┌────────────────────────────────────┐
  │  Content at FINAL STATE           │  ← normal colors
  │  No tint, no shimmer              │  ← "dried"
  └────────────────────────────────────┘
```

Implementation:
```css
.wet-sand {
  /* Subtle teal overlay */
  filter: brightness(1.05) saturate(1.2);
  /* OR */
  box-shadow: inset 0 0 100vw rgba(var(--accent-teal-rgb), 0.06);
}

/* Shimmer sweep */
.wet-sand::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255,255,255,0.04) 50%,
    transparent 60%
  );
  animation: shimmer-dry 600ms ease-out forwards;
}
```

---

## SVG Wave Path (Option B: Double Ripple)

```svg
<!-- Primary wave — organic, asymmetric -->
<clipPath id="wave-primary">
  <path d="M0,{y}
    C200,{y-40} 400,{y+30} 600,{y-10}
    S800,{y+35} 1000,{y-20}
    S1200,{y+25} 1440,{y}
    V{viewportHeight} H0 Z"
  />
</clipPath>

<!-- Trailing wash — softer, smaller amplitude -->
<clipPath id="wave-trailing">
  <path d="M0,{y+60}
    C200,{y+40} 400,{y+75} 600,{y+50}
    S800,{y+80} 1000,{y+45}
    S1200,{y+70} 1440,{y+60}
    V{viewportHeight} H0 Z"
  />
</clipPath>
```

The `y` value animates from `70vh` (resting) → `-5vh` (fully surged) → back to `70vh`.

The wave paths themselves also **wobble** during animation:
- Control points shift ±10px as the wave moves
- Creates the feeling of water, not a rigid shape

---

## Timing Summary

```
EVENT                    TIME        DURATION    NOTES
───────────────────────────────────────────────────────
Click navigation         0ms
Primary wave starts      0ms         500ms       bottom → top
Trailing wash starts     80ms        500ms       follows primary
Foam zone blurs content  (travels)   -           40px band above wave
Aurora surges to 100%    0ms         300ms       ease-in
Content fully consumed   500ms       -           viewport is all aurora

HIGH TIDE HOLD           500ms       200ms       aurora breathes once

Primary wave retreats    700ms       600ms       top → bottom (shoreline)
Trailing wash retreats   780ms       600ms       follows
Wet sand effect          700ms       300ms       teal tint emerges
Shimmer sweep            800ms       400ms       L→R glint
Aurora dims to 35%       900ms       400ms       ease-out
Content "dries"          1000ms      300ms       teal fades

TRANSITION COMPLETE      ~1300ms     -           page is settled
```

Total: ~1.3 seconds. Feels cinematic but not sluggish.

---

## Open Design Questions

1. **Shoreline position**: 60% or 70% down? (Affects how much aurora is visible at rest)
2. **Wave amplitude**: How curvy? Gentle rolling waves or dramatic crests?
3. **The wobble**: Should the wave curve undulate as it moves, or stay fixed shape?
4. **Sound**: A muted ocean swoosh? (Off by default, toggle-able?)
5. **Mobile**: Same concept but faster? (~900ms total instead of 1300ms)
