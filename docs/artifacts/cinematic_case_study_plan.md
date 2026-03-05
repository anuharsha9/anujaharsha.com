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
