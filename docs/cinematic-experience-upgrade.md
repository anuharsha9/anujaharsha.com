# Cinematic Experience Upgrade — Continuation Plan

> Branch: `cinematic-experience-upgrade` (off `visual-polish-v3`)
> Commit: `9f6cac8`
> Date: Mar 7, 2026

---

## ✅ Completed (Landing Page)

### P1 — Hero → CSG Transition
- Hero fades to `opacity: 0` (not just blur) at scroll progress `0.50→0.70` (bio) and `0.55→0.75` (container)
- Hero height reduced from `200vh` → `135vh`
- CSG overlap: `-mt-[50vh]` — no dead scroll zone
- **No separate background on CSG wrapper** — continuous `bg-cinematic` from page root. No visible division line.

### P2 — CSG Entrance Choreography
- Tiles: `blur(16px)`, `1.4s` resolve, wider stagger (`0.25 + i*0.2`)
- Era label: `blur(20px)`, `1.6s` resolve
- Heading: scroll-driven `blur(16px→0)` via `useTransform` + `useMotionTemplate`

### P3 — Atmospheric Continuity
- Faint teal radial gradient (`0.04` opacity) in fixed background layer
- `mix-blend-screen` + `aurora-ambient` CSS animation (20s gentle drift)
- SVG noise texture remains for film grain

### P4 — Vibe Coding + Extended Portfolio
- Same blur-to-focus protocol: `20px` era labels, `16px` tiles, `1.4s` resolve
- Heading scroll-driven blur removed (performance) — individual items still blur-to-focus

### P5 — Testimonials
- Era label + heading upgraded to match
- Individual quote transitions already use blur-to-focus via `AnimatePresence`

### P6 — Foundation + Footer
- Foundation: `16px` blur, `1.2s` resolve
- TalkSection: `20px` blur, `1.6s` resolve

### Aurora (Canvas 2D)
- [HeroAurora.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/home/HeroAurora.tsx) — vertical curtain rays from wavy bezier top edges
- 3 curtains (was 4), rayWidth 12-14px (was 3-5px) for performance
- Colors from `--accent-teal-rgb` design token
- Reduced motion support

### Performance Fixes
- **Removed all `useSpring` on blur values** — springs compute continuously
- **Removed section-level `filter: blur()`** — forces GPU compositing of entire section trees
- **Canvas aurora: 4x draw call reduction** — wider rays, fewer curtains
- Individual item `whileInView` blur preserved (cheap, fires once)

---

## ⬜ Remaining (P7+)

### P7 — Case Study Pages
Priority order:
1. **Section entrance blur-to-focus** — Apply same 16-20px blur protocol to beat/section reveals
2. **Beat transitions** — Ensure smooth handoffs between StoryDeck/Movie Beats sections
3. **Trailer entrance** — The trailers should feel like "lights dim, curtain rises" moments
4. **Atmospheric continuity** — Very faint aurora/teal presence on case study dark backgrounds
5. **End-of-journey navigation** — Polish the transition from case study back to landing

Files to audit:
- [src/components/case-study-experiment/CinematicCaseStudy.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicCaseStudy.tsx)
- [src/components/case-study-experiment/RCCaseStudyView.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/RCCaseStudyView.tsx)
- [src/components/case-study-experiment/MLFullContent.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/MLFullContent.tsx)
- [src/components/case-study-experiment/DSMLCaseStudyView.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/DSMLCaseStudyView.tsx)
- `src/components/case-study/storyboard/*.tsx`

### Wave Design Language Integration
Ideas discussed but not implemented:
- Hover states with wave ripple effect
- Loading indicator as a single flowing wave line
- Wave-like easing curves site-wide
- Text reveals with wave stagger
- Scroll-driven wave parallax on background elements

### Performance Monitoring
- Verify no more flickering/lag after the fixes
- Consider `will-change: transform` hints on animated elements
- Profile canvas aurora on lower-end devices

---

## Key Files Changed

| File | What Changed |
|---|---|
| [src/components/home/HeroAurora.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/home/HeroAurora.tsx) | **NEW** — Canvas 2D aurora with vertical curtain rays |
| [src/components/home/HeroLanding.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/home/HeroLanding.tsx) | Hero exit: opacity fade, adjusted timings, 135vh height |
| [src/app/page.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/app/page.tsx) | Ambient aurora background, CSG overlap cleanup |
| [src/app/globals.css](file:///Users/anu/Work/anu-portfolio-exploration/src/app/globals.css) | `@keyframes aurora-ambient`, old CSS aurora removed |
| [src/components/home/CSGBlock.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/home/CSGBlock.tsx) | Blur-to-focus entrance, useSpring removed |
| [src/components/home/TestimonialsBlock.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/home/TestimonialsBlock.tsx) | Blur-to-focus entrance, useSpring removed |
| [src/components/home/VibeCodingBlock.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/home/VibeCodingBlock.tsx) | Blur-to-focus entrance, useSpring removed |
| [src/components/home/ExtendedPortfolio.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/home/ExtendedPortfolio.tsx) | Blur-to-focus entrance, useSpring removed |
| [src/components/home/FoundationBlock.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/home/FoundationBlock.tsx) | Deeper blur entrance |
| [src/components/home/TalkSection.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/home/TalkSection.tsx) | Deeper blur entrance |
| [src/components/home/LifeContextStrip.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/home/LifeContextStrip.tsx) | Unused import cleanup |

---

## Design Principles (Locked In)

1. **The scroll is a film** — every pixel enters as if directed
2. **Content stays, layout stays, only experience changes**
3. **Blur-to-focus is the transition protocol** — no crossfades, no opacity-only fades
4. **The dark canvas is alive** — ambient aurora, never dead black
5. **"Whispering Intensity"** — alive but barely, you're not sure if it's moving
6. **The gear/brain experience is separate** — hidden, immersive, its own world
