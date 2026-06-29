# Cinematic Experience & Case-Study Plans

> The cinematic case-study system plans/refactor, general case-study audits, the cinematic upgrade notes, and the IQ overhaul summary.
> Consolidated 2026-06-29. Each section below is a former standalone file, kept verbatim under its source header. Nothing was rewritten; full history is in git.



---

<!-- merged from: docs/artifacts/cinematic_case_study_plan.md -->
## ── source: `cinematic_case_study_plan.md` ──

# Cinematic Case Study — Implementation Plan v3

> **Status:** Awaiting green light  
> **What's new in v3:** Micro-illustrations mapped to every section — lightweight CSS/SVG visual vignettes that tell the story visually without adding clutter.

---

## Micro-Illustration System

Small, monochromatic (white/teal on dark), CSS/SVG visual vignettes. Not decorative — each one **communicates something specific**. They live inside bento tiles alongside text, or as standalone visual tiles.

Style: thin strokes, `stroke: white/20`, accent elements in `var(--accent-teal)`. Minimal. Geometric. No emoji. No stock icons.

---

## Section-by-Section Content + Illustrations

---

### HERO (sticky parallax)

Same as v2 — no changes needed. Stats, scope tags, ownership pills.

---

### ACT I — How I Landed the Project

**Body (30 words):**
> My director said — we have this project in the pipeline, I'm yet to assign it to a designer. I said — I'd like to do it. Give me a chance.

**Bento:**
```
Row 1 (full):
┌──────────────────────────────────────────────────────────┐
│ Legacy Schedule Dialog (full-width image)                 │
│ hover: "5 distinct interfaces for 1 workflow"             │
└──────────────────────────────────────────────────────────┘

Row 2 (33/33/33):
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ Distribution UI  │ │ Access List UI   │ │ RC Explorer      │
└──────────────────┘ └──────────────────┘ └──────────────────┘

Row 3 (30/70):
┌──────────────────┐ ┌────────────────────────────────────────┐
│ RC Admin Status  │ │ TEXT + ILLUSTRATION:                    │
│ (image)          │ │                                        │
│                  │ │ ┌─────────────────────────┐            │
│                  │ │ │  ○○○○○○○○○○○○○○○○○○○○  │            │
│                  │ │ │  ○○○○○○○○○○○○○○○○○○○○  │ ← 200     │
│                  │ │ │  ○○○○○○○○○○○○○○○○○○○○  │   people   │
│                  │ │ │  ○○○○○○○○○○○○○○○○○○○○  │   dots     │
│                  │ │ │  ○○○○○○○○○○○○○○○○○○○○  │            │
│                  │ │ │  ○○○○○○○○○○○○●○○○○○○○  │ ← 2 dots  │
│                  │ │ │  ○○○○○○○○○○○○○○○○○●○○  │   teal =  │
│                  │ │ └─────────────────────────┘   the ones │
│                  │ │                                who knew │
│                  │ │ "~200 people in my business unit.       │
│                  │ │  They knew RC existed. That's it.       │
│                  │ │  Only the support team + ONE engineer." │
└──────────────────┘ └────────────────────────────────────────┘
```

The people-dot grid is a simple CSS grid of small circles. ~200 dots, all `white/10`, exactly 2 highlighted in teal. Visual impact: *isolation*.

**Pull Quote:**
> *"There was no documentation at ALL. I had a sandbox. And that's it."*

---

### ACT II — I Built My Own Research Network

**Body (30 words):**
> I went into the sandbox and used RC as much as I could. The lead support guy shared a presentation — that became my bible. I took hundreds of screenshots. Grouped them. Mapped them.

**Bento:**
```
Row 1 (50/50):
┌────────────────────────────────┐ ┌────────────────────────────────┐
│ ILLUSTRATION + TEXT:           │ │ ILLUSTRATION + TEXT:            │
│                                │ │                                │
│    ╭──╮         ╭──╮          │ │    ╭──╮         ╭──╮          │
│    │🎧│ ←────→  │  │          │ │    │<>│ ←────→  │  │          │
│    ╰──╯         ╰──╯          │ │    ╰──╯         ╰──╯          │
│  Support Rep      Me           │ │  Legacy Eng.     Me           │
│                                │ │                                │
│ "1:1 with customer reps of RC. │ │ "1:1 with that ONE engineer    │
│  Regular calls. They knew      │ │  who knew about it. He did RC  │
│  every workaround, every hack  │ │  code in the 80s and 90s —     │
│  users had invented."          │ │  still with the company."      │
└────────────────────────────────┘ └────────────────────────────────┘
```

The illustration is two circle avatars connected by a line (like a 1:1 meeting). Left avatar has a tiny icon inside (headset for support, `<>` for engineer). Right avatar is "Me". Line pulses subtly on hover.

```
Row 2 (full):
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  ILLUSTRATION:          TEXT:                                      │
│  ┌───┐┌───┐┌───┐       "I validated everything I had with         │
│  │   ││   ││   │        customer support and customer reps over    │
│  └───┘└───┘└───┘        and over. I was the one person who knew    │
│  ┌───┐┌───┐             more about ReportCaster workflows than     │
│  │   ││   │             anyone else."                              │
│  └───┘└───┘                                                        │
│  ↑ stacked screenshot                                              │
│    frames (rotated slightly)                                       │
└────────────────────────────────────────────────────────────────────┘
```

The stacked screenshots illustration: 5-6 small rectangles overlapping at slight angles, like a pile of screenshots. Thin white/10 borders. Conveys "hundreds of screenshots."

```
Row 3 (50/50):
┌────────────────────────────────┐ ┌────────────────────────────────┐
│ ILLUSTRATION + TEXT:           │ │ ILLUSTRATION + TEXT:            │
│                                │ │                                │
│   ◎ ─→ ◎ ─→ ◎ ─→ ✓           │ │   ◎ ─→ ◎ ─→ ◎ ─→ ✓           │
│ insight  decision  shipped     │ │ insight  decision  shipped     │
│                                │ │                                │
│ "Users were hacking the UI to  │ │ "Tab-switching fatigue between │
│  manage distribution lists."   │ │  scheduling and reporting."    │
│ → Dedicated DL Manager         │ │ → Context-aware Schedule       │
└────────────────────────────────┘ └────────────────────────────────┘
```

Research→Decision→Shipped as a 3-node flow diagram. Thin circles connected by arrows. Last node is a checkmark in teal.

**Pull Quote:**
> *"I'm not an engineer. But I made sure I understood the constraints — legacy FOCUS code, customer dependency, no JS or React. I understood enough to design around it."*

---

### ACT III — What I Discovered

**Body (29 words):**
> ReportCaster was a product in itself. So huge and so powerful. One customer had 13 million schedules running every day. I thought — that's some powerful shit.

**Visual tile before Bento 1 (full-width, animation):**
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│     ●              ●                                                 │
│          ●                   ●              ●                        │
│                         ●                                            │
│                                                                      │
│     5 dots scattered across the space                                │
│     On scroll → they animate/converge → into 1 teal dot center      │
│                                                                      │
│                         ◉                                            │
│                      1 HUB                                           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**This is THE visual metaphor** for the whole case study. Five white dots scattered → animate → merge into one teal circle. Pure CSS/Framer Motion. Repeats the 5→1 story without a word.

**Bento 1 — The 5 subsystems:**
```
(same as v2 — 5 legacy screenshots with hover captions)
Each image has a small number badge: ①②③④⑤ — linking back to the 5 dots above.
```

**Bento 2 — Sketches:**
```
(same as v2 — 6 sketchbook images in 33/33/33 rows)
```

**Full-width:** Consolidation Map

---

### ACT IV — Two Rejections. One Breakthrough.

**Body (28 words):**
> I thought — let's create it like a unified product, with similar consistency. Beautiful. Rejected. Created a plugin version. I loved it the most. Also rejected.

**Bento 1 — V1 (30/70):**
```
┌────────────────────────┐ ┌──────────────────────────────────────────┐
│ TEXT:                   │ │                                          │
│ V1: Independent Product │ │  ← → Image carousel (4 V1 screens)      │
│                         │ │                                          │
│ "I created a fully      │ │                                          │
│  independent version.   │ │                                          │
│  Beautiful. Looked      │ │                                          │
│  exactly like the rest  │ │                                          │
│  of the product."       │ │                                          │
│                         │ │                                          │
│ ILLUSTRATION:           │ │                                          │
│    ╳                    │ │                                          │
│  (large, red/40)        │ │                                          │
│  "Rejected —            │ │                                          │
│   they want the HUB     │ │                                          │
│   to be central."       │ │                                          │
└────────────────────────┘ └──────────────────────────────────────────┘
```

The ╳ is a large, thin, slightly rotated X mark in `red-400/40`. Not a heavy stamp — just a subtle geometric rejection mark. Scroll-triggered: slides in with a slight rotation.

**Bento 2 — V2 (30/70):**
```
(same pattern, ╳ with "Too much engineering effort.")
```

**Pull Quote:**
> *"How does the platform WANT workflows to behave?"*

**V3 Breakthrough — ILLUSTRATION (full-width, before the V3 bento):**
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                            ┌─────┐                                   │
│                            │  +  │  ← Plus icon                     │
│                            └─────┘     glows teal                    │
│                               │        pulses gently                 │
│                    ┌──────────┼──────────┐                           │
│                    │          │          │                            │
│                ┌───┴───┐ ┌───┴───┐ ┌───┴───┐                        │
│                │Schedule│ │ Dist. │ │Access │                        │
│                │ Dialog │ │ List  │ │ List  │                        │
│                └────────┘ └───────┘ └───────┘                        │
│                                                                      │
│  "I decided to add 'Create Schedule' to the Plus menu.              │
│   A dialog box in the HUB."                                         │
│                                                                      │
│  There it was — the final workflow of ReportCaster.                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

The Plus icon is CSS: a rounded square with a `+` inside, glowing teal border, gentle pulse animation. Three branches connect to three workflow labels below. This is the "aha moment" diagram.

**Bento 3 — V3 shipped screens:**
```
(same as v2 — organized by subsystem, with eyebrow labels)
```

---

### ACT V — I Onboarded 20 People. Then I Let Go.

**Body (27 words):**
> Hundreds of screens done. But the people who were going to work with me — lead architect, lead engineer, core engineers, QA, new PM — they were unaware of ReportCaster.

**Bento (text + illustrations):**
```
Row 1 (50/50):
┌────────────────────────────────┐ ┌────────────────────────────────┐
│ ILLUSTRATION + TEXT:           │ │ ILLUSTRATION + TEXT:            │
│                                │ │                                │
│    ╭──╮    ╭──╮               │ │    ╭──╮                        │
│    │LA│────│LE│               │ │    │Me│──┐                     │
│    ╰──╯    ╰──╯               │ │    ╰──╯  │                     │
│  Lead       Lead               │ │    ┌─────┴─────┐              │
│  Architect  Engineer           │ │  ╭──╮╭──╮╭──╮╭──╮╭──╮       │
│                                │ │  │En││PM││QA││DC││  │       │
│ "First people I onboarded.     │ │  ╰──╯╰──╯╰──╯╰──╯╰──╯       │
│  Design discussions finalized  │ │                                │
│  with them."                   │ │ "Then the entire group.        │
│                                │ │  Dozens of demos."             │
└────────────────────────────────┘ └────────────────────────────────┘
```

Left tile: Two avatars side by side (Lead Architect, Lead Engineer). Right tile: "Me" avatar with branching lines to 5+ smaller avatars below (the team). Simple org diagram feel.

```
Row 2 (50/50):
┌────────────────────────────────┐ ┌────────────────────────────────┐
│ ILLUSTRATION + TEXT:           │ │ ILLUSTRATION + TEXT:            │
│                                │ │                                │
│   ┌────┐        ┌────┐        │ │         ╭──╮╭──╮╭──╮          │
│   │ RC │        │ ML │        │ │   ┌────▸│  ││  ││  │          │
│   └──┬─┘        └──┬─┘        │ │   │     ╰──╯╰──╯╰──╯          │
│      └──────┬──────┘          │ │   │      working on             │
│           ╭──╮               │ │   │      1 feature               │
│           │Me│  + 👶          │ │   │                              │
│           ╰──╯               │ │  ╭──╮                            │
│                                │ │  │Me│──▸ RC + ML               │
│ "Managing both projects.       │ │  ╰──╯                          │
│  With a 1-year-old at home.    │ │                                │
│  All day."                     │ │ "3 designers on 1 feature.      │
│                                │ │  I was on 2. That said          │
│                                │ │  something about trust."        │
└────────────────────────────────┘ └────────────────────────────────┘
```

Left: Two project boxes (RC and ML) converging to one "Me" avatar. Right: visual ratio — 3 dots pointing to 1 box vs 1 dot pointing to 2 boxes.

```
Row 3 (full):
┌──────────────────────────────────────────────────────────────────────┐
│ ILLUSTRATION + TEXT:                                                 │
│                                                                      │
│    ╭──╮ ──────▸ ╭──╮ ──────▸ ╭──╮╭──╮                              │
│    │Me│ train   │Jr│ handoff │  ││  │                              │
│    ╰──╯         ╰──╯         ╰──╯╰──╯                              │
│                                                                      │
│ "I borrowed one junior designer. Onboarded her on everything I knew.│
│  Eventually I left. Let her and another one take over.               │
│  My job was mainly done — I had done all the heavy lifting."         │
└──────────────────────────────────────────────────────────────────────┘
```

A handoff diagram: Me → trains Junior → Junior + another designer take over. Arrows show flow of knowledge. The "Me" avatar fades teal (departure), the others solidify.

**Pull Quote:**
> *"By the time I left the team, the senior engineers who'd worked for decades — they'd become my family. They were no longer intimidating. I was the youngest in the room with an unspoken authority on the experience of RC."*

---

### ACT VI — Powering 20M+ Schedules

**Body (25 words):**
> Shipped. From 4 clicks to 1. No more individual browser tabs. Everything smoothly integrated within the hub ecosystem. Customers noticed.

**Bento 1 — Stats (25/25/25/25):**
```
(same as v2 — big numbers, no borders)

Each stat has a tiny ILLUSTRATION above the number:

  ④→①          ③→①          ③→②           🚫
  clicks        clicks        clicks       tabs
```

The click-reduction illustrations: small nested rectangles (representing clicks) with an arrow showing reduction. For "0 browser tabs": a browser tab icon with a strikethrough.

**Bento 2 — Videos + ImpactDiff:**
```
(same as v2)
```

**Bento 3 — Validation (50/50):**
```
┌──────────────────────────────────────┐ ┌──────────────────────────────┐
│ ILLUSTRATION:                        │ │                              │
│                                      │ │                              │
│    ┌───┐┌───┐┌───┐                  │ │  ┌──────┐                    │
│    │ 🎥││ 🎥││ 🎥│    ← video      │ │  │ v1.0 │ → │ v1.1 │ →      │
│    └───┘└───┘└───┘      grid /      │ │  └──────┘   └──────┘        │
│    ┌───┐┌───┐┌───┐      virtual     │ │  │ v1.2 │ → │ v2.0 │ →     │
│    │ 🎥││ 🎥││ Me│      user group  │ │  └──────┘   └──────┘        │
│    └───┘└───┘└───┘                  │ │    ↑ room for growth         │
│                                      │ │                              │
│ "In a virtual user group I was       │ │ "I designed for the future,  │
│  hosting, a customer praised my      │ │  allowing room for new       │
│  work and said he's looking forward  │ │  features. More could fit    │
│  for what's next."                   │ │  without restricting          │
│                                      │ │  anything."                   │
└──────────────────────────────────────┘ └──────────────────────────────┘
```

Left: A 2×3 video call grid (like Zoom/Teams). Small rectangles with circle avatars inside. One highlighted as "Me". Represents the virtual user group.

Right: Version boxes flowing forward with arrows, showing extensibility. Represents "room for growth."

---

### ✦ REFLECTION — What This Project Made Me

**Body (25 words):**
> I won some and I lost some with RC, but I grew immensely. I did things I never did before. I matured. I learned leadership.

**Bento — Peer Reviews (50/50):**
```
┌──────────────────────────────────────┐ ┌──────────────────────────────────────┐
│ ILLUSTRATION:                        │ │ ILLUSTRATION:                        │
│    ╭──╮                              │ │    ╭──╮                              │
│    │YC│  ← Principal Eng.            │ │    │DP│  ← Dir. of Design           │
│    ╰──╯                              │ │    ╰──╯                              │
│                                      │ │                                      │
│ "She impressed everyone with how     │ │ "Anuja brings energy and             │
│  quickly she grasped all aspects     │ │  determination to tackling complex   │
│  of a highly intricate system..."    │ │  design challenges..."              │
│  — Yingchun Chen                     │ │  — Dave Pfeiffer                     │
└──────────────────────────────────────┘ └──────────────────────────────────────┘
```

Each quote tile has a small avatar circle with initials at the top. Subtle, personal.

**Bento — Retrospective (50/50):**
```
(same as v2 — text only, no illustration needed here)
```

**Closing (outside bento):**
```
(same as v2)
```

---

## Summary of Illustrations

| Section | Illustration | What it communicates |
|---|---|---|
| Act I | People-dot grid (200 dots, 2 teal) | Nobody knew RC |
| Act II | Avatar pairs with role icons | 1:1 research meetings |
| Act II | Stacked screenshot rectangles | Hundreds of screenshots |
| Act II | 3-node flow (insight→decision→shipped) | Research-to-impact pipeline |
| Act III | 5 dots scatter → converge to 1 (animated) | The 5→1 consolidation |
| Act IV | Large ╳ marks (red/40) | Rejections |
| Act IV | Plus icon tree diagram | The breakthrough architecture |
| Act V | 2 avatars side-by-side | Leadership buy-in |
| Act V | Me → branching to team | Onboarding the whole team |
| Act V | 2 project boxes → 1 person | Managing RC + ML |
| Act V | 3:1 vs 1:2 ratio | Trust from leadership |
| Act V | Me → Junior → handoff | Knowledge transfer |
| Act VI | Click-reduction icons | Impact metrics |
| Act VI | Video call grid (Zoom-style) | Virtual user group |
| Act VI | Version boxes flowing forward | Designing for growth |
| ✦ | Avatar circles with initials | Peer reviews |

All illustrations are **CSS/SVG** — no external images. Monochromatic white/teal. Thin lines. They add visual rhythm without clutter.

---

## Files to Create / Modify

| File | Action |
|---|---|
| `src/components/case-study-experiment/BentoGrid.tsx` | **Create** — CSS Grid with row layouts |
| `src/components/case-study-experiment/CinematicCaseStudy.tsx` | **Rewrite** — Full rebuild |
| `src/components/case-study-experiment/CinematicScene.tsx` | **Keep** |
| `src/components/case-study-experiment/illustrations/` | **Create** — Small SVG/CSS illustration components |


---

<!-- merged from: docs/artifacts/cinematic_refactor_plan.md -->
## ── source: `cinematic_refactor_plan.md` ──

# CinematicCaseStudy Refactor Plan

## Goal
Make `CinematicCaseStudy` a fully reusable component. Zero hardcoded content. Everything prop-driven. Design tokens via `data-cs-theme`.

## Design Tokens ✅ DONE
- Added `--cs-accent`, `--cs-accent-bright`, `--cs-accent-soft`, `--cs-accent-rgb` defaults in `:root`
- Added derived tokens: `--cs-accent-glow`, `--cs-accent-border`, `--cs-accent-surface`, `--cs-bg-radial`
- Theme overrides: `[data-cs-theme="rc|ml|dsml|wordu"]`

## Phase 2: Refactor CinematicCaseStudy Props

### New Props Interface
```tsx
interface CinematicCaseStudyProps {
  data: CaseStudyData              // existing — hero title, role, etc.
  slides: StorySlide[]             // presentation mode slides
  theme: 'rc' | 'ml' | 'dsml' | 'wordu'  // maps to data-cs-theme
  heroStats: HeroStat[]            // the 3 stats in hero
  actSections?: ActSection[]       // scroll nav dots (optional, full view only)
  children?: ReactNode             // full view content (Acts)
}
```

### What changes:
1. Replace ALL `var(--accent-teal)` → `var(--cs-accent)` in the component
2. Replace `var(--overlay-accent-08)` → `var(--cs-bg-radial)`
3. Hero stats (15M+, 5→1, timeline) → from `heroStats` prop
4. `presentationSlides` → from `slides` prop
5. `ACT_SECTIONS` → from `actSections` prop
6. Full view content (Acts I-VI) → from `children` prop
7. Wrap in `<div data-cs-theme={theme}>` for CSS token scoping

### What stays the same:
- Hero section structure (title, role, scope tags, cover image — all from `data`)
- ViewModeToggle
- StoryDeck carousel
- Background effects (orbs, scanlines, noise)
- Scroll progress dots behavior

## Phase 3: Extract RC Content
- Move RC's `presentationSlides` array to a new file or inline in the page
- Move RC's Acts I-VI full view content to `RCFullContent.tsx`

## Phase 4: Port ML & DSML
- ML page: import ML_MOVIE_BEATS, convert to slides, use CinematicCaseStudy
- DSML page: import DSML_MOVIE_BEATS, convert to slides, use CinematicCaseStudy
- Both get presentation mode only (no full view children yet)


---

<!-- merged from: docs/cinematic-experience-upgrade.md -->
## ── source: `cinematic-experience-upgrade.md` ──

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


---

<!-- merged from: docs/artifacts/case_study_audit_plan.md -->
## ── source: `case_study_audit_plan.md` ──

# Case Study Audit & Simplification Plan (V3: The Cinematic Hero Aesthetic)

## Synthesizing the Vision (Post-Homepage Review)
I just reviewed the incredible `HeroLanding.tsx` and the homepage layout. The aesthetic is stunning: "Neural Mainframe," deep cinematic vignettes, floating orbs, massive transparent gradients, and auto-playing scrollytelling. It feels powerful, immersive, and incredibly premium.  

Your critique is spot-on: transitioning from that immersive, Apple-like cinematic homepage sequence into a standard React site with boxed components breaks the magic. The case study needs to feel like an extension of the hero experience—not a standard B2B webpage.

***

## The Execution Plan: The Cinematic Experiment Route

### Vision: The Core Philosophy
We are shifting from a "reading" layout to a "scrollytelling" experience. We will use the full height of the viewport, dramatic contrast, and huge, kinetic typography. We will strip out arbitrary React boxes (`SectionBlock`) entirely.

### Step 1: Set Up the Cinematic Sandbox
* Create `src/app/experiment/case-study/[slug]/page.tsx`
* Create `src/components/case-study-experiment/CinematicCaseStudy.tsx`
* This ensures complete safety for the live portfolio while we build the new paradigm.

### Step 2: Full-Bleed Scrollytelling (No More standard "Sections")
* We will replace the standard `SectionBlock` with a `CinematicScene.tsx`.
* **The Layout:** Images/videos will anchor to the background (full bleed or massive floating plates), and the text will be massive, high-contrast typography that fades in and out as the user scrolls, much like the `HeroLanding` quote sequence.
* No more small paragraphs next to arbitrary grids. One thought, one screen, one impact.

### Step 3: Apple-Style Bento Callouts
* For areas where we absolutely *must* show dense information (e.g., the 5 legacy sub-systems or the "250 screens" moment), we will use an ultra-premium, dark-mode `BentoGallery.tsx`.
* Native, familiar Apple hardware pages layout: Glassmorphic tiles, tight gaps, minimal text, interactive hover states.

### Step 4: The AutoPlay Data Viewer
* You specifically asked for an improved `AutoSequenceDataViewer`. I will rebuild this as a high-end cinematic component.
* Instead of a web-app component, it will feel like a HUD terminal overlaying the background, typing out data points or cycling through architectural diagrams on a timer, with slick Framer Motion transitions.

### Step 5: "Better Business Framing"
* We will extract the true business impact (20M+ schedules, churn prevention) and display them using massive, screen-filling numbers (e.g., `HeroLanding` typography scale) that format dynamically on scroll. 
* No fake data. Just leveraging the insane scale of what you actually built.

***

### Ready to Execute?
The vision is clear: we are throwing out the standard React portfolio template and bringing the cinematic, "Neural Mainframe" magic directly into the case study. 

If this hits the mark, I will run the terminal commands to set up the `experiment` route and start building the `CinematicCaseStudy` frame right now.


---

<!-- merged from: docs/artifacts/case_study_content_audit.md -->
## ── source: `case_study_content_audit.md` ──

# Case Study Content Audit: Feb 10 vs Current

> Comparing commit `54d9944` (Feb polished version) against the current `CaseStudyPage.tsx` new layout.

## REPORTCASTER

### Feb 10 Layout (per section)
| Section | Components |
|---------|-----------|
| **section-01** | SectionBlock + SystemArchaeology |
| **section-02** | SectionBlock + ResearchApproach (RC) + EmpathizeStrategyGrid + MarketAnalysis (RC) + PersonaCards |
| **section-03** | SectionBlock + ProcessArtifactViewer (RC) + SystemMappingBreakdown |
| **section-04** | SectionBlock + ScheduleWorkflowComparison + VersionIteration + **RCDesignEvolution** + ImpactVisual |
| **section-05** | SectionBlock + TeamCollaboration (RC) |
| **section-06** | SectionBlock + NavigateForwardContent |
| **Cross-section** | QuickOverview, VitalSigns, ReportCasterTimeline, DesignSystemShowcase |

### Current CaseStudyPage.tsx (RC 6-Act)
| Act | Components |
|-----|-----------|
| **Act I** | SectionBlock (01) + SystemArchaeology |
| **Act II** | SectionBlock (02) + TribalKnowledgeNetwork + SectionBlock (03) + ProcessArtifactViewer (RC) |
| **Act III** | SystemConsolidationMap + VersionIteration + ✅ **RCDesignEvolution** (just restored) + PlusMenuInsight |
| **Act IV** | ScheduleWorkflowComparison + NaturalLanguageInsight + PrototypeBlock + ImpactDiff + DesignSystemShowcase |
| **Act V** | SectionBlock (05) + TeamCollaboration (RC) |
| **Act VI** | SectionBlock (06) + ScaleAndResponsibility + QuickOverviewSection + NavigateForwardContent |

### RC GAPS (Missing from new layout)
| Component | Status | Notes |
|-----------|--------|-------|
| ❌ **ResearchApproach** (RC data) | Missing | Was in section-02. TribalKnowledgeNetwork replaces some of it but is different. |
| ❌ **EmpathizeStrategyGrid** | Missing | Was in section-02 — stakeholder empathy mapping. |
| ❌ **MarketAnalysis** (RC) | Missing | Was in section-02 — competitive landscape. |
| ❌ **PersonaCards** | Missing | Was in section-02 — user persona cards. |
| ❌ **ImpactVisual** | Missing | Was in section-04 — impact visualization. |
| ❌ **SystemMappingBreakdown** | Missing | Was in section-03 — system mapping. |
| ✅ RCDesignEvolution | **Just restored** | Tabbed subsystem screens. |

---

## ML FUNCTIONS

### Feb 10 Layout (per section)
| Section | Components |
|---------|-----------|
| **section-01** | SectionBlock + MLKnowledgeGapSystem + MLChallengeBreakdown |
| **section-02** | SectionBlock + ResearchApproach (ML) + MLUserAccessStrategy + MLPersonaCards + MarketAnalysis (ML) |
| **section-03** | SectionBlock + ProcessArtifactViewer (ML) + SystemTopologyBlueprint + MLWorkflowMapping + ThreeCriticalPivots |
| **section-04** | SectionBlock + LayeredDisclosureVisual + DesignIterationLog |
| **section-05** | SectionBlock + MLExplainabilityHighlight + TeamCollaboration (ML) |
| **section-06** | SectionBlock + MLImpactMetrics + NavigateForwardContent/MLReflection + MLPatternConnections |
| **Cross-section** | QuickOverview, VitalSigns, MLFunctionsTimeline, DesignSystemShowcase |

### Current CaseStudyPage.tsx (ML 6-Act)
| Act | Components |
|-----|-----------|
| **Act I** | SectionBlock (01) + MLKnowledgeGapSystem + MLChallengeBreakdown |
| **Act II** | SectionBlock (02) + MLUserAccessStrategy + MLPersonaCards |
| **Act III** | SectionBlock (03) + ProcessArtifactViewer (ML) + SystemTopologyBlueprint + MLWorkflowMapping |
| **Act IV** | SectionBlock (04) + AutoSequenceDataViewer (shipped screens) + PrototypeBlock + ImpactDiff ×2 + DesignSystemShowcase |
| **Act V** | SectionBlock (05) + MLExplainabilityHighlight + TeamCollaboration (ML) |
| **Act VI** | SectionBlock (06) + MLImpactMetrics + CaseStudyReflection + MLPatternConnections |

### ML GAPS (Missing from new layout)
| Component | Status | Notes |
|-----------|--------|-------|
| ❌ **ResearchApproach** (ML data) | Removed intentionally | Content overlapped with MLKnowledgeGapSystem. |
| ❌ **MarketAnalysis** (ML) | Missing | Competitive landscape for ML. |
| ❌ **ThreeCriticalPivots** | Missing | Was in section-03 — 3 architectural pivots. |
| ❌ **LayeredDisclosureVisual** | Missing | Was in section-04 — progressive disclosure strategy. |
| ❌ **DesignIterationLog** | Missing | Was in section-04 — IDE-style artifact explorer with iteration history. |
| ✅ MLFunctionsTimeline | Removed intentionally | User requested removal. |
| ✅ QuickOverviewSection | Removed intentionally | Duplicated MLImpactMetrics in Act VI. |

---

## IQ PLUGIN
> Note: IQ Plugin uses the fallback layout (non-6-Act), not audited here in detail.

### Feb 10 Layout (per section)
| Section | Components |
|---------|-----------|
| **section-01** (Discovery) | SectionBlock + (IQ-specific discovery sub-components) |
| **section-02** (Research) | SectionBlock |
| **section-03** (Architecture) | SectionBlock |
| **section-04** (Iterate) | SectionBlock + IQEvolution + IQEmptyStateShowcase + DesignIterationLog (IQ tabs) |
| **section-05** (Grow) | SectionBlock + TeamCollaboration (IQ) + IQChallengesBreakdown |
| **section-06** (Outcome) | SectionBlock |

### IQ GAPS — Need to verify against current fallback layout

---

## PRIORITY ACTION ITEMS

### ✅ Restored
1. **ThreeCriticalPivots** → ML Act III (after MLWorkflowMapping) — 3 visual before/after pivot cards
2. **LayeredDisclosureVisual** → ML Act IV — progressive disclosure strategy diagram
3. **DesignIterationLog** → ML Act IV — IDE-style artifact explorer
4. **RCDesignEvolution** → RC Act III (after VersionIteration) — 6-tab shipped screen viewer

All 4 components converted from light-mode hardcoded slate/white to design system tokens.

### Consider Restoring (valuable but may overlap)
5. **MarketAnalysis** (both RC and ML) — competitive landscape
6. **PersonaCards** (RC) and **EmpathizeStrategyGrid** (RC) — research depth
7. **SystemMappingBreakdown** (RC) — replaced by SystemConsolidationMap?
8. **ImpactVisual** (RC) — impact data visualization

### Intentionally Removed (confirmed by user)
- MLFunctionsTimeline ✅
- QuickOverviewSection from ML Act VI ✅  
- ResearchApproach from ML (duplicated MLKnowledgeGapSystem) ✅


---

<!-- merged from: docs/artifacts/iq_overhaul_summary.md -->
## ── source: `iq_overhaul_summary.md` ──

# IQ/DSML Case Study Overhaul — Complete Summary

## ✅ What Was Done

### 1. IQ Case Study Page → 6-Act Structure
The IQ Plugin page has been migrated from the old `CaseStudyLayout` to the new `CaseStudyPage` (6-Act structure), matching ReportCaster and ML Functions.

**File changed:** [page.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/app/work/iq-plugin/page.tsx)

### 2. DSML Movie Beats Created (8 Beats)
A full set of animated presentation beats for the DSML/IQ case study, following the exact same patterns as RC and ML beats.

**File created:** [DSMLMovieBeats.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study/storyboard/DSMLMovieBeats.tsx)

| Beat | Title | Signal | Story |
|------|-------|--------|-------|
| 1 | The Invisible Feature Problem | <5% ADOPTION | 3 AI features nobody could find |
| 2 | The Strategic Spark | VP APPROVED | Invented, not assigned — PM partnership |
| 3 | Terminal → Apple UI | MODERNIZED | Before/after interface transformation |
| 4 | Architecture Before Tickets | 3 → 1 HUB | Scattered tools → unified hub |
| 5 | Four Iterations | V4 LANDED | V1→V2→V3→V4 design evolution |
| 6 | The Navigation Fight | I WON | Icon tiles vs. list views — won |
| 7 | Room Full of Veterans | 2 YEARS IN | Driving conversation among decades-tenured veterans |
| 8 | Visibility Was the Solution | +25% ADOPTION | Impact from discoverability alone |

### 3. IQ 6-Act Layout Wired Up
The full 6-Act structure for IQ is now live with rich IQ-specific components:

**File modified:** [CaseStudyPage.tsx](file:///Users/anu/Work/anu-portfolio-exploration/src/components/case-study-v2/CaseStudyPage.tsx)

| Act | Title | Components |
|-----|-------|------------|
| I — The Hook | Three Powerful AI Features. <5% Adoption. | IQBusinessCase, IQChallengesBreakdown |
| II — The Investigation | Modernizing the Building Blocks | IQPersonaCards, IQEvolution |
| III — The Architecture | Architecture Before Tickets | ProcessArtifactViewer, IQArchitectureBlueprint, IQWorkflowsAndFoundation, UXPrinciples |
| IV — The Craft | Four Iterations to the Final Hub | IQIterationLog, IQEmptyStateShowcase, AutoSequenceDataViewer (7 screens), PrototypeBlock, IQWorkflowComparison + DesignSystemShowcase |
| V — The Team | The Room Full of Veterans | IQPluginTimeline, TeamCollaboration |
| VI — The Outcome | Visibility Was the Solution | CaseStudyReflection, IQPatternConnections |

### 4. Verification
- ✅ TypeScript: Clean build (`npx tsc --noEmit` — zero errors)
- ✅ All pages return HTTP 200:
  - `/work/iq-plugin/` → 200
  - `/work/reportcaster/` → 200
  - `/work/ml-functions/` → 200

> [!IMPORTANT]
> The IQ case study now uses the same premium 6-Act layout as RC and ML, with animated movie beats in presentation mode and rich component-filled sections in full view.
