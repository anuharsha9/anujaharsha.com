# Landing Page Redesign — Implementation Plan

> **Status:** PLANNING (Do NOT implement until user says "do it")
> **Created:** 2026-02-23
> **Goal:** Balance brain hero with flagship work showcase

---

## Final Mobile Flow

```
╔═══════════════════════════════════════════╗
║  VIEWPORT 1 — LANDING                    ║
║                                           ║
║  🧠 Brain SVG                             ║
║  (starts ~70vh → zooms out to ~30-35%)    ║
║  Brain scrolls away (NOT sticky)          ║
║                                           ║
║  13 Years. One Mission.                   ║
║  "From curiosity to code..."             ║
║                                           ║
║  50+  ·  25M+  ·  Fortune 500  ·  Award  ║
║                                           ║
║  ⌄                                        ║
╠═══════════════════════════════════════════╣
║  VIEWPORT 2 — FLAGSHIP THEATER            ║
║                                           ║
║  RC Beat Animations (full BG, auto-play)  ║
║  Only RC auto-plays. Not ML/IQ.           ║
║                                           ║
║  "ReportCaster"                           ║
║  "Reducing 5 Legacy Systems to 1 Hub"     ║
║                                           ║
║  [ ▶ Watch the Story ]                    ║
║  ████████░░░ 1:12 / 1:30                  ║
║                                           ║
╠═══════════════════════════════════════════╣
║  VIEWPORT 3 — SECONDARY LINKS             ║
║                                           ║
║  ┌─────────────────┐ ┌─────────────────┐  ║
║  │  ML Functions   │ │   IQ Plugin     │  ║
║  │  Static card    │ │   Static card   │  ║
║  │  Link → pres.   │ │   Link → pres.  │  ║
║  │  view of case   │ │   view of case  │  ║
║  │  study page     │ │   study page    │  ║
║  └─────────────────┘ └─────────────────┘  ║
║                                           ║
║  (Later: replace with auto-play beats)    ║
║                                           ║
╠═══════════════════════════════════════════╣
║  DIVIDER                                  ║
║  ───── Explore My Career ─────            ║
║               ⌄                           ║
╠═══════════════════════════════════════════╣
║                                           ║
║  EXISTING TIMELINE (untouched)            ║
║  ├─ Design Engineering + WordU            ║
║  ├─ CSG Era + 3 Cards                    ║
║  ├─ Testimonials                         ║
║  ├─ Life Context                         ║
║  ├─ Consultant Era                       ║
║  ├─ Agency Era                           ║
║  └─ Origin Story                         ║
║                                           ║
╚═══════════════════════════════════════════╝
```

Same flow applies to desktop (just wider layout).

---

## Key Design Decisions (Locked In)

| Decision | Answer |
|---|---|
| Brain sticky? | **NO** — scrolls away normally |
| Which stories auto-play? | **Only RC** — on both mobile AND desktop |
| ML/IQ treatment (interim) | Static cards linking to presentation view of their case study pages |
| ML/IQ treatment (future) | Auto-play beat animations (built later) |
| "13 Years" placement | On landing viewport, BELOW the zoomed-out brain |
| Desktop layout | Same concept as mobile (not separate) |
| Quiz mode | Still works — tapping "Explore My Mind" scales brain back up |

---

## Execution Order

### Pre-work: Clean Up RC Story Sequence
- Audit all existing Beat components for quality/flow
- Polish animations, timing, text
- Fix any mobile responsiveness issues in beats
- Ensure the story arc makes sense as a condensed 90s movie

### Phase 1: Brain Zoom-Out Animation (~2-3 hours)
- Brain starts at ~70vh on load (current behavior)
- After 2-3s (or after gear power-up), brain smoothly:
  - Scales down to ~30-35% of viewport
  - Rises to upper portion of the viewport
- "13 Years. One Mission." + stats fade in below
- Quiz mode: brain scales back up for interaction, then back down
- File: `HeroSplit.tsx` (major changes)
- File: `MobileTimeline.tsx` (brain slide section restructured)

### Phase 2: RC Flagship Theater (~3-4 hours)
- New component: `FlagshipTheater.tsx`
- Full-viewport section below the brain/manifesto
- Background: condensed RC beat animations auto-playing
- Foreground: title, subtitle, metric, CTA
- CTA links to `/work/reportcaster` (full case study)
- Progress bar showing movie position
- Reuses existing Beat components but in "condensed auto-play" mode
- New wrapper: `AutoPlayStory.tsx` that sequences beats with timers

### Phase 3: Secondary Case Study Links (~1-2 hours)
- Two cards side by side below RC theater
- ML Functions + IQ Plugin
- Static cards with image, title, brief description
- Link to presentation view: `/work/ml-functions?view=presentation`
  and `/work/iq-plugin?view=presentation`
- Later replaced with auto-play beat animations

### Phase 4: "Explore My Career" Divider (~30 min)
- Horizontal rule with text label
- Scroll indicator (chevron down)
- Creates clear Act 1 / Act 2 boundary
- Below this: existing timeline starts

### Phase 5: Timeline Integration (~1 hour)
- Remove `isBrainSlide` and `isHeroIntro` from the timeline
  (they're now in the new landing section above)
- Timeline starts at Design Engineering era
- Or keep them but hidden on mobile (desktop might differ)
- Ensure no duplicate content

### Phase 6: Desktop Adaptation (~2-3 hours)
- Same concept on desktop (cinematic scroll)
- Brain zoom-out works with the existing scroll-driven architecture
- RC theater integrates into the cinematic scroll sequence
- May need to adjust `TimelineSlide.tsx`

### Phase 7: Performance + Polish (~2-3 hours)
- Only animate the Beat that's currently in view
- Pause animations when off-screen
- Smooth 60fps on mobile
- Test on real devices

---

## Future Work (After Phases 1-7)

### Build ML Functions Beat Components
- 4-6 new Beat components
- Story arc: 12-step CLI → engineers-only → visual wizard → 
  progressive disclosure → zero dead-end errors
- ~4-6 hours

### Build IQ Plugin Beat Components
- 4-6 new Beat components
- Story arc: 3 siloed tools → user confusion → one hub → 
  onboarding → discovery
- ~4-6 hours

### Replace Static Cards with Auto-Play
- Swap the placeholder cards for auto-play mini-movies
- Same architecture as RC theater but smaller canvas
- ~2-3 hours

---

## Files That Will Change

| File | Changes |
|---|---|
| `HeroSplit.tsx` | Brain zoom-out animation, scale states |
| `MobileTimeline.tsx` | New landing section structure |
| `CinematicTimeline.tsx` | Integration of new sections |
| `career-data.ts` | Possibly restructure brain/hero slides |
| **NEW** `FlagshipTheater.tsx` | RC auto-play theater component |
| **NEW** `AutoPlayStory.tsx` | Beat sequencer with auto-advance |
| **NEW** `SecondarySpotlight.tsx` | ML/IQ placeholder cards |
| **NEW** `CareerDivider.tsx` | "Explore My Career" section break |
| `TimelineSlide.tsx` | Desktop adaptation |
| `Beat*.tsx` (existing) | Polish + "condensed mode" prop |

---

## RC Mini-Movie Sequence (90s condensed)

| Time | Beat | Key Visual |
|---|---|---|
| 0-12s | BeatWeekOne | "Week 1. Brand new." Facts cascade |
| 12-25s | BeatTheRoom | Zoom call, participants join, "3 weeks" highlight |
| 25-40s | BeatFragmentation | 5 system nodes, chaos lines, pain stats |
| 40-52s | BeatThreePivots | V1 rejected, V2 rejected |
| 52-65s | BeatBreakthrough | "+Menu" consolidation, metric counters |
| 65-77s | Beat250Screens | Screen cascade, "250+" counter |
| 77-90s | BeatImpact | "SHIPPED.", metrics, Yingchun quote |

Each beat runs for 12-15 seconds (vs. current 8-13 seconds).
Auto-advance with no user interaction required.
