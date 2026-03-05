# ReportCaster Case Study — What's Working & What's Not

> Full code audit of `CinematicCaseStudy.tsx` + `BentoGallery.tsx`
> Reviewed: March 2, 2026

---

## ✅ What's Working

### 1. Hero Section (Lines 55–142)
- **Strong first impression.** Massive gradient text headline, teal accent eyebrow with `role • company`, and a clean 3-column metrics bar (`20M+ Schedules`, `5 → 1 Hub`, `14 Months`).
- **Sticky parallax fade-out** on scroll via `useTransform` — feels cinematic.
- **Ownership & Scale blocks** are clean and informative without being overwhelming.

### 2. Act I: Investigation (Lines 147–282)
- **CinematicScene** component handles eyebrow/title/body consistently.
- **Narrative Grid** (3 cards with numbered insights) is clean, scannable design.
- **The Detective Work** — now properly in a **2-column card layout** with left context + right actions. Hover states on icons are subtle and premium. ✅

### 3. Act III: Chaos (Lines 285–316)
- **Bento Gallery** for sketchbook images is a strong visual moment — shows real process.
- **Competitive Reality Check** card (Lines 318–336) is a nice touch — 2-column with "Market Gap vs Our Response."

### 4. Act IV: Architecture Strategy (Lines 343–483)
- **V1/V2 rejection blocks** are excellent storytelling — red "Rejected" callouts with clear rationale.
- **Alternating image/text layout** for V1 and V2 is clean.
- **Version 3 hero** ("Modal-Based Hub Integration") with embedded problem-solution pairs (Recurrence Engine, Job Logs) is the strongest section of the case study.
- **Horizontal carousel** for final integration bento galleries works well conceptually.

### 5. Act V: Knowledge Transfer (Lines 489–558)
- **2-column layout** (narrative left, operational detail right) works well.
- **"The Takeaway" breakout quote** is clean, centered, and properly weighted with motion animation.

### 6. Act VI: Outcome (Lines 563–672)
- **Before/After prototype videos** with "Shipped" badge is strong proof.
- **ImpactDiff slider** is interactive and compelling.
- **Impact Stats grid** (20M+, 5→1, 4→2, 100%) is well-designed with gradient accents.
- **Reflection Ribbon** quote is a nice pacing moment.

### 7. Peer Review Quotes (Lines 674–706)
- **Frosted glass cards** with giant quote marks are premium and well-animated.
- **Name/role attribution** with teal accent line divider is clean.

### 8. Retrospective Cards (Lines 708–759)
- **Side-by-side "Push Harder" / "Do Next" cards** with distinct visual treatments (dark vs teal-tinted) is a solid design choice.
- **Icon circles** with hover scale are a nice touch.

### 9. "What This Project Made Me" Ending (Lines 761–828)
- **Hero card with floating orbs** and radial gradients is visually arresting.
- **Bento sub-grid** (Architecture Scale + Sharper/More patient/More strategic) adds variety.
- **Final statement** with teal glow on hover is a strong closing moment.

---

## ❌ What's NOT Working

### 1. Bento Gallery Images — `object-contain` Without Background
- **Issue:** Images use `object-contain` in bento cells with fixed row heights (`auto-rows-[150px] md:auto-rows-[250px]`). Without `object-cover`, images will float centered with empty space around them, and the `bg-zinc-900` background will show around the edges. For **sketchbook photos** this may look fine, but for **UI screenshots** in the carousel galleries, the images will appear small and lost inside their cells.
- **Recommendation:** Consider using `object-cover` for UI screenshots (which benefit from filling the frame) and `object-contain` only for process/sketchbook images. Or add a prop to `BentoGallery` to control this per-gallery.

### 2. Carousel Discoverability (Lines 434–478)
- **Issue:** The horizontal scroll carousel for Version 3 galleries has **no visual affordance** — no scroll indicators, no arrows, no pagination dots. A user might not even realize they can scroll horizontally.
- **Recommendation:** Add subtle left/right arrow buttons, a dot indicator (`01 / 05`), or at minimum a "scroll to explore →" hint text.

### 3. Act V: Knowledge Transfer — Onboarding Operations Card is Dense
- **Issue:** The right-column card (Lines 506–538) with "Phased Alignment" and "Execution Reality" uses small text (`text-sm`) packed densely with Phase labels. It reads like a spec doc rather than a case study.
- **Recommendation:** Simplify to 2-3 key bullet points, or convert to a visual timeline/step indicator rather than nested lists.

### 4. Missing Act II
- **Issue:** The narrative jumps from **Act I: Investigation** straight to **Act III: Chaos**. There is no Act II (which should be "Empathize" per your 6-Act model). This creates an obvious gap in the cinematic pacing.
- **Recommendation:** Either add Act II content or renumber the acts to avoid the visible gap.

### 5. Inconsistent Section Spacing
- **Issue:** Some sections use `mt-16`, some `mt-32`, some `pt-16`, and the reflection section uses `space-y-48`. The vertical rhythm feels inconsistent — some transitions are tight (Chaos → Competitive Check) while others have massive chasms.
- **Recommendation:** Standardize section gaps. Use `pt-32 pb-32` or `py-32` consistently between major acts. Reserve `space-y-48` only for the final reflection area.

### 6. "Iterative Sketching" Title Styling (Line 301)
- **Issue:** Uses `text-2xl font-mono text-[var(--accent-teal)] uppercase` — this is very loud and doesn't match the Act Header Protocol (eyebrow → title → subheading). It looks like a sub-section but screams visually.
- **Recommendation:** Demote to the standard eyebrow style: `text-xs font-mono text-[var(--accent-teal)] uppercase tracking-widest`.

### 7. Reflection Section Over-spacing (Line 676)
- **Issue:** `space-y-48` creates **192px** between the quote cards, retrospective, and "What This Project Made Me." This is extreme — each item feels disconnected from the next rather than forming a cohesive closing sequence.
- **Recommendation:** Reduce to `space-y-32` for a tighter narrative flow while maintaining breathing room.

### 8. Competitive Reality Check — Orphaned Placement
- **Issue:** The "Competitive Reality Check" block (Lines 318–336) sits alone between Act III and Act IV with no act header or scene wrapper. It feels like a floating card that doesn't belong to either act.
- **Recommendation:** Nest it inside Act III (Chaos) or Act IV as supporting evidence.

### 9. No Section-Level Scroll Navigation
- **Issue:** At 21,259px page height, this is a very long single-page scroll. There's no way for a reader to jump between acts or know where they are in the story.
- **Recommendation:** Consider a subtle floating sidebar/progress indicator showing "Act I → VI" with the current position highlighted. This is a common Apple-style pattern for long editorial pages.

### 10. Hardcoded Content in Code
- **Issue:** Large portions of content are hardcoded directly in the component (e.g., "The Detective Work" text, the Iterative Sketching description, the Takeaway quote, the Act VI header). This mixes data with presentation.
- **Status:** Minor concern for now since this is a single case study, but worth noting.

---

## 📊 Priority Ranking

| Priority | Issue | Impact |
|----------|-------|--------|
| 🔴 High | Carousel has no scroll affordance | Users will miss 80% of the Version 3 content |
| 🔴 High | Bento images may look lost with `object-contain` | Visual quality of the showcase galleries |
| 🟡 Medium | Missing Act II gap | Breaks narrative rhythm |
| 🟡 Medium | Reflection over-spacing (`space-y-48`) | Page feels disconnected at the end |
| 🟡 Medium | No scroll navigation for 21k px page | UX on long reads |
| 🟢 Low | Onboarding Operations card density | Readable but not ideal |
| 🟢 Low | Inconsistent spacing | Subtle polish issue |
| 🟢 Low | "Iterative Sketching" title styling | Style consistency |
| 🟢 Low | Competitive Check orphaned placement | Structural tidiness |
| 🟢 Low | Hardcoded content | Maintenance concern |
