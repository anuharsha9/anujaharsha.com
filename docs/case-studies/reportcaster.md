# ReportCaster — Case-Study Plans, Audits & Ratings

> All ReportCaster (RC) planning, audits, visual elevation, movie-beats, experiment, and rating docs.
> Consolidated 2026-06-29. Each section below is a former standalone file, kept verbatim under its source header. Nothing was rewritten; full history is in git.



---

<!-- merged from: .agents/plans/rc-case-study-restructure.md -->
## ── source: `rc-case-study-restructure.md` ──

# ReportCaster Case Study Restructure — Implementation Plan

## Guiding Principles

| Rule | How It's Honored |
|---|---|
| Don't delete content | Every sentence stays. Reshuffling, not rewriting. |
| Delete repeated things | STAR overview, Framework Matrix, UX Principles tags — redundant summaries. |
| Don't hallucinate | Zero new copy. Rearranging existing words and components. |
| Keep React components | Every existing component stays. Changing order, not gutting internals. |
| Show what YOU can do | Every section reframes around capability, not the product. |

---

## Phase 1: Content Restructure (6 Acts)

### ACT 0: HERO (unchanged)
- **Component:** `HeroSection` — no changes

### ACT I: THE HOOK
- Section 01 body text ("I'll do it" story)  
- `SystemArchaeology` component

### ACT II: THE INVESTIGATION  
- Section 02 body text (research constraints, proxy network)
- `TribalKnowledgeNetwork`
- Section 03 body text (first paragraph — "detective story")
- `ProcessArtifactViewer` (raw sketchbook)

### ACT III: THE ARCHITECTURE
- `SystemConsolidationMap` (5→1 flow)
- `SystemMappingBreakdown` (what was mapped)
- `VersionIteration` (V1/V2/V3 + rejections)
- `PlusMenuInsight` (the breakthrough)
- `ReportCasterTimeline`

### ACT IV: THE CRAFT
- `ScheduleWorkflowComparison` (click reduction)
- `NaturalLanguageInsight` (recurrence detail)
- `PrototypeBlock` (before/after video)
- `ImpactDiff` (side-by-side static)
- `DesignSystemShowcase`

### ACT V: THE TEAM
- Section 05 body text (onboarding, knowledge transfer)
- `OwnershipScope`
- `TeamCollaboration`

### ACT VI: THE OUTCOME
- Section 06 body text (customer validation)
- `ScaleAndResponsibility` (big metrics — now with context)
- Quick Overview metric cards only (merged)
- `NavigateForwardContent` (testimonials + retrospective)

### FOOTER (unchanged)
- `SystemIndex`, `LetsTalkCTA`, `ScrollGear`

### Removed (redundant only)
- QuickOverviewSection STAR text
- FrameworkMatrix standalone section
- UXPrinciples tag cloud
- "Looking Forward" card (folded into retrospective)

---

## Phase 2: Visual Polish

1. Fix quote formatting: `""She impressed..."` → `"She impressed..."`
2. Fix markdown rendering: `**Aha moment:**` showing literal asterisks
3. Fix smart quotes consistency in V3 body text
4. Clean up "Looking Forward" → merge into retrospective

---

## Files to Touch

| File | Change |
|---|---|
| `src/components/case-study-v2/CaseStudyPage.tsx` | Major restructure — reorder into 6 acts |
| `src/data/reportcaster.ts` | Update section metadata for act structure |
| `src/components/case-study/CaseStudySection.tsx` | Add `act` variant for act-level headings |
| `src/components/case-study/SectionNav.tsx` | Act-based nav labels |
| `src/types/caseStudy.ts` | Add optional `act` field if needed |

---

## Execution Order

1. ✅ Save this plan
2. Update `reportcaster.ts` — restructure sections into 6 acts
3. Update `CaseStudyPage.tsx` — reorder component rendering  
4. Update `SectionNav` — new act-based labels
5. Fix visual polish items
6. Build & verify
7. Visual audit — full scroll-through


---

<!-- merged from: docs/artifacts/rc_implementation_plan.md -->
## ── source: `rc_implementation_plan.md` ──

# ReportCaster Case Study — Unified Implementation Plan

> Combining: Code Audit + Visual Audit (Loom) + Performance Fixes (already shipped)
> Created: March 2, 2026

---

## ✅ Already Completed (Performance Pass)

| # | Fix | Status |
|---|-----|--------|
| P1 | FloatingOrbs: 8→4 orbs, Framer Motion → pure CSS keyframes | ✅ Done |
| P2 | Removed duplicate FloatingOrbs in "What This Project Made Me" | ✅ Done |
| P3 | BentoGallery images: added `loading="lazy"` (first image eager) | ✅ Done |
| P4 | All standalone images: `loading="lazy"` (V1, V2, Recurrence, Job Log) | ✅ Done |
| P5 | Videos: `preload="none"`, removed autoPlay (saves 9MB initial load) | ✅ Done |
| P6 | BentoGallery & ImpactDiff: `dynamic()` imports (code-split) | ✅ Done |
| P7 | Removed unused imports (AppleCarousel, FeatureCategoryCarousel, etc.) | ✅ Done |
| P8 | TypeScript: clean `npx tsc --noEmit` ✓ | ✅ Done |

---

## 🔴 Phase 1: High-Impact Visual Fixes

### 1.1 — Fix Bento Image Dead Space
**Source:** Code audit #1 + Visual audit (frames 0:10, 0:13, 0:36)
**Problem:** Legacy UI screenshots and Access List dialogs float small inside `bg-zinc-900` cells. `object-contain` leaves huge gray dead zones. Sketchbook photos work fine because they naturally fill the frame.
**Plan:**
- Add an `objectFit` prop to `BentoGallery` (`'contain' | 'cover'`, default `'cover'`)
- Update `CinematicCaseStudy.tsx` to pass `objectFit="contain"` only for the sketchbook gallery
- All UI screenshot galleries use `objectFit="cover"` (default)
- Consider adding `bg-white/5` or matching the screenshot's background color instead of pure `bg-zinc-900`

**Files:** `BentoGallery.tsx`, `CinematicCaseStudy.tsx`
**Effort:** Small (30 min)

---

### 1.2 — Add Carousel Scroll Affordance
**Source:** Code audit #2 + Visual audit (frame 0:35)
**Problem:** The horizontal scroll carousel for Version 3 feature galleries has zero discoverability — no arrows, dots, or hints. Users will miss 80% of the Version 3 content.
**Plan:**
- Add left/right arrow buttons (subtle, appear on hover)
- Add a dot indicator or slide counter (e.g., `01 / 05`) already partially visible
- Add a "Scroll to explore →" hint text that fades after first interaction
- Use `IntersectionObserver` to track which slide is active

**Files:** `CinematicCaseStudy.tsx` (the carousel section ~lines 434-478)
**Effort:** Medium (1 hr)

---

### 1.3 — Fix the Floating Gear Icon
**Source:** Visual audit (visible throughout multiple sections)
**Problem:** A gear/cog icon (⚙️) appears floating in the center of several sections. It looks like a loading spinner that never resolved, or an unfinished design element. Visually distracting.
**Plan:**
- Investigate what component renders this (likely the `FloatingOrbs` CSS or a stale loading state)
- Remove or replace with intentional design element
- If it's an SVG orb artifact from the CSS rewrite, adjust the `orbFloat` keyframes

**Files:** `FloatingOrbs.tsx` or `CinematicCaseStudy.tsx`
**Effort:** Small (15 min)

---

## 🟡 Phase 2: Narrative & Spacing Polish

### 2.1 — Fix Missing Act II Gap
**Source:** Code audit #4
**Problem:** The narrative jumps Act I → Act III. Act II ("Empathize") is missing, breaking the 6-Act model.
**Plan:**
- **Option A:** Rename "Research & Decisions" section to "Act II: Empathize" — the content already covers empathy (support calls, ecosystem mapping)
- **Option B:** Renumber Act III→II, IV→III, etc. to eliminate gap
- Recommendation: **Option A** — the content fits the "Empathize" act perfectly

**Files:** `CinematicCaseStudy.tsx`
**Effort:** Small (15 min)

---

### 2.2 — Tighten Reflection Section Spacing
**Source:** Code audit #7 + Visual audit
**Problem:** `space-y-48` (192px) between peer review quotes, retrospective cards, and "What This Project Made Me" disconnects the closing sequence.
**Plan:**
- Reduce from `space-y-48` to `space-y-32` (128px)
- This keeps breathing room but makes it feel like a cohesive closing

**Files:** `CinematicCaseStudy.tsx` (~line 676)
**Effort:** Tiny (5 min)

---

### 2.3 — Standardize Section Spacing
**Source:** Code audit #5 + Visual audit (frame 0:27-0:28, visible ~300px black gap)
**Problem:** Inconsistent gaps: `mt-16`, `mt-32`, `pt-16` across sections. The gap between Competitive Check and Act IV is especially noticeable.
**Plan:**
- Audit all section gaps
- Standardize to `py-24 md:py-32` between major sections
- Use `py-16 md:py-24` between sub-sections within an act
- Tighten the gap before Act IV specifically

**Files:** `CinematicCaseStudy.tsx`
**Effort:** Medium (30 min)

---

### 2.4 — Demote "ITERATIVE SKETCHING" Title
**Source:** Code audit #6 + Visual audit (frame 0:20)
**Problem:** `text-2xl font-mono text-[var(--accent-teal)] uppercase` is too loud for a sub-section title. Screams compared to elegant Act headers.
**Plan:**
- Change from `text-2xl` to `text-xs tracking-widest` to match the standard eyebrow protocol
- It should read as a section label, not a section title

**Files:** `CinematicCaseStudy.tsx` (~line 301)
**Effort:** Tiny (5 min)

---

### 2.5 — Nest Competitive Reality Check
**Source:** Code audit #8
**Problem:** The "Competitive Reality Check" card floats orphaned between Act III and Act IV with no scene wrapper.
**Plan:**
- Move it inside the Act III `CinematicScene` as a child element, or
- Place it as the opening evidence card inside Act IV: Architecture Strategy

**Files:** `CinematicCaseStudy.tsx`
**Effort:** Small (15 min)

---

## 🟢 Phase 3: UX Enhancements

### 3.1 — Add Scroll Progress Navigation
**Source:** Code audit #9
**Problem:** 21,299px page with no way to jump between acts or know your position.
**Plan:**
- Add a subtle floating sidebar (fixed left or right) showing Act I → VI dots
- Highlight current act based on `IntersectionObserver`
- Clicking a dot scrolls to that act
- Apple editorial pattern: thin vertical line with nodes
- Should auto-hide after 3s of no interaction, reappear on scroll

**Files:** New component `ScrollProgress.tsx`, integrate in `CinematicCaseStudy.tsx`
**Effort:** Medium-Large (1.5 hr)

---

### 3.2 — Simplify Onboarding Operations Card
**Source:** Code audit #3
**Problem:** Dense Phase 1/Phase 2 text reads like a spec doc.
**Plan:**
- Convert to a visual 2-step timeline with icons
- Reduce text to 1-2 sentences per phase
- Keep "Execution Reality" as-is (it's compelling)

**Files:** `CinematicCaseStudy.tsx` (~lines 506-538)
**Effort:** Small (30 min)

---

## 📊 Execution Order

| Order | Task | Phase | Effort | Status |
|-------|------|-------|--------|--------|
| 1 | Fix Bento image dead space | 🔴 1.1 | 30 min | ✅ Done |
| 2 | Fix floating gear icon | 🔴 1.3 | 15 min | ✅ N/A (macOS cursor in recording) |
| 3 | Add carousel arrows/dots | 🔴 1.2 | 1 hr | ✅ Done |
| 4 | Fix Act II gap | 🟡 2.1 | 15 min | ✅ Already existed (line 206) |
| 5 | Tighten reflection spacing | 🟡 2.2 | 5 min | ✅ Done (space-y-48 → space-y-24) |
| 6 | Demote "Iterative Sketching" | 🟡 2.4 | 5 min | ✅ Done (text-2xl → text-xs) |
| 7 | Standardize spacing | 🟡 2.3 | 30 min | ✅ Done (Act V gaps increased) |
| 8 | Nest Competitive Check | 🟡 2.5 | 15 min | ✅ Done (moved inside Act III) |
| 9 | Simplify Onboarding card | 🟢 3.2 | 30 min | ⬜ Pending |
| 10 | Add scroll progress nav | 🟢 3.1 | 1.5 hr | ⬜ Pending |

**Total estimated effort: ~4.5 hours**

---

## Summary

The case study is **80% there**. The narrative arc, the visual design language, and the emotional beats all work. The remaining issues are mostly **image fitting** (bento dead space), **discoverability** (carousel), and **spacing consistency**. Phase 1 (3 fixes) will resolve the most visible problems. Phase 2 (5 fixes) is polish. Phase 3 (2 fixes) is UX enhancement for completeness.


---

<!-- merged from: docs/artifacts/rc_case_study_audit.md -->
## ── source: `rc_case_study_audit.md` ──

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


---

<!-- merged from: docs/artifacts/rc_visual_audit.md -->
## ── source: `rc_visual_audit.md` ──

# ReportCaster Full Case Study — Visual Audit

> Based on 54-frame video scrollthrough of the live site

---

## Section-by-Section Visual Assessment

### 1. Hero (0:00–0:04) ✅ Strong
- Massive white title "Customers Were Leaving. 40 Years Without Updates." reads powerfully
- Teal eyebrow "UX OWNER • CLOUD SOFTWARE GROUP — WEBFOCUS" is clean
- 3-column metrics bar (20M+ / 5→1 / 14 Months) is scannable and well-spaced
- Scope of Ownership table (Owned vs Excluded) is clean and informative

### 2. Scale & Responsibility Block (0:04–0:09) ✅ Good
- "Powering 20M+ Schedules Weekly" status card works
- "Millions / Hundreds / 20M+" scale indicators are clean

### 3. Legacy Systems Bento (0:09–0:13) ⚠️ Issues
- **The bento images of legacy UI screenshots have LOTS of dead gray space** around them
- The old dialog screenshots (Windows-style UIs) are small within their bento cells
- `object-contain` is causing them to float centered with `bg-zinc-900` showing around edges
- The caption "Legacy Schedule Dialog: 5 distinct interfaces required for 1 workflow" is helpful
- **Fix needed:** These legacy screenshots would look better with `object-cover` or with a lighter/matching background instead of dark gray

### 4. Research & Decisions / Detective Work (0:16–0:19) ✅ Working Well
- "Empathize with the Ecosystem" title is massive and impactful
- 3-card narrative grid (01/02/03) with insights is clean and scannable
- **Detective Work 2-column card** is rendering correctly:
  - Left column: "EVIDENCE: SUPPORT CALLS" pill, title, and context text  
  - Right column: Action items with icon circles
  - Dark card background with subtle gradient — looks premium

### 5. Act III: Chaos (0:19–0:24) ✅ Strong
- "Simplify the Chaos: Mapping the Architecture" — massive title, great pacing
- "ITERATIVE SKETCHING & SYSTEM CONSOLIDATION" section title is visible

### 6. Sketchbook Bento Gallery (0:23–0:24) ✅ Good
- Handwritten notebook sketches look authentic and compelling
- Bento grid layout works well here — the photos fill cells naturally
- Hover caption "Exploring unified layout structures for the hub" is visible
- System consolidation diagram (flowchart) below the sketches is clean

### 7. Competitive Reality Check (0:27) ✅ Clean
- 2-column "THE MARKET GAP" vs "OUR RESPONSE" card
- Teal text for "Wrapped our powerful legacy engine in a modern, simple UI" stands out
- "COMPETITIVE ANALYSIS OF TABLEAU/POWERBI SCHEDULING" subtext is informative

### 8. Act IV: Architecture Strategy (0:28–0:36) ✅ Best Section
- "Two Rejections. One Breakthrough." — killer headline
- **V2 Plugin Integration** with screenshot + red "REJECTED BY ENGINEERING" callout is excellent storytelling
- **Version 3: Modal-Based Hub Integration** — "VERSION 3: THE WINNER" eyebrow is strong
- Recurrence Engine screenshot with teal border glow looks premium
- Job Log Dialog with "Problem Solved: Context Switching" narrative works great

### 9. Feature Carousel / Access List (0:35–0:36) ⚠️ Issues
- "04 / 5" pagination visible — good
- **But the Access List screenshots have the same dead-space problem** as the legacy bento
- First image shows tiny dialog floating on gray — lots of empty `bg-zinc-900` around it
- The right-side image (hub integration view) fills the frame better

### 10. Act V: Knowledge Transfer (0:39) ✅ Good
- 2-column layout (narrative left, operational detail right) is working
- Phase 1/Phase 2 formatting is clear
- "Execution Reality" context about managing RC + ML simultaneously is compelling

### 11. The Takeaway Quote (0:39) ✅ Excellent
- *"By the time I left the team, the senior engineers who intimidated me initially had become collaborators I respected — and who respected me. I earned trust by bringing clarity."*
- Centered, italic, large — perfect breakout moment

### 12. Act VI: The Outcome (0:43) ✅ Strong
- ImpactDiff slider showing Legacy UI vs Redesigned is visible and interactive
- **Impact Stats Grid** (20M+ / 5→1 / 4→2 / 100%) — clean with mono labels
- Reflection quote below stats is well-placed

### 13. Peer Review Quote (0:46) ✅ Premium
- Dave Pfeiffer, Director of Design quote with large quote marks
- Clean attribution with teal "DIRECTOR OF DESIGN" role label
- Giant decorative `"` mark in the top-right corner adds editorial feel

### 14. Retrospective Cards (0:47) ✅ Good  
- "07 — RETROSPECTIVE" section label
- Side-by-side "Push Harder" / "Do Next" cards visible
- "Embedded Explorer View" visible in the Push Harder card

### 15. "What This Project Made Me" (0:49–0:50) ✅ Excellent
- Hero card: "This was not just a redesign. It was a turning point." — powerful
- Subtle teal gradient in top-right corner of hero card
- "Architecture Scale" bento card with icon and description
- "Sharper. More patient. More strategic." — teal gradient text, strong closing

### 16. Footer / Next Case Study (0:53–0:54) ✅ Clean
- "UP NEXT / Next Case Study" with ML Functions card
- Footer with "INTERESTED IN WORKING TOGETHER?" + "GET IN TOUCH →" + "RESUME"

---

## Top Visual Issues to Fix (Priority Order)

| # | Issue | Frames | Severity |
|---|-------|--------|----------|
| 1 | **Bento images have dead gray space** — legacy UI screenshots and Access List dialogs float small inside `bg-zinc-900` cells with `object-contain` | 0:10, 0:13, 0:36 | 🔴 High |
| 2 | **No carousel scroll affordance** — Version 3 feature galleries (04/5) have no arrows or dots | 0:35 | 🔴 High |
| 3 | **"ITERATIVE SKETCHING" title too loud** — all-caps teal text at 2xl feels like it's screaming vs the elegant Act headers | 0:20 | 🟡 Medium |
| 4 | **Excessive vertical space** between Competitive Check → Act IV (about 300px of empty black) | 0:27–0:28 | 🟡 Medium |
| 5 | **Gear icon (⚙️)** appears floating in the center of several sections — seems like a loading spinner that never resolves | Throughout | 🟡 Medium |

---

## What's Working Visually (Strengths)

1. ✅ **Hero** — Massive, confident, Apple-editorial
2. ✅ **Detective Work 2-column** — Premium, well-composed
3. ✅ **Sketchbook bento** — Authentic, fills grid naturally
4. ✅ **V1/V2 rejection storytelling** — Red callouts are compelling
5. ✅ **Version 3 hero** — Teal glow borders on screenshots look premium
6. ✅ **Takeaway quote** — Perfect pacing break
7. ✅ **Impact Stats** — Clean, scannable
8. ✅ **Peer review quote** — Editorial, premium feel
9. ✅ **"What This Project Made Me"** — Strong emotional close
10. ✅ **Next Case Study card** — Clean handoff to ML Functions


---

<!-- merged from: docs/artifacts/rc_visual_elevation_plan.md -->
## ── source: `rc_visual_elevation_plan.md` ──

# Visual Elevation Plan: ReportCaster Case Study

> **The Problem:** By removing all borders, card backgrounds, and visible grid lines, the layout relies entirely on spacing. Raw screenshots floating on a dark background can feel unpolished, and thin white text can feel underwhelming. The goal is to make it feel **premium, intentional, and highly cinematic.**

Here are four specific ways we can dramatically improve the visual impact without adding clutter or changing your narrative.

---

### 1. Cinematic Staging for Images (The biggest quick win)
Raw enterprise screenshots dropped onto a dark background look harsh. They need to feel seated in the environment.
*   **Ambient Glow:** Extract the dominant color of the screenshot and create a very subtle, soft blurred glow behind it (`box-shadow` with low opacity). This makes the image feel like it's emitting light.
*   **Dark Glass Frames:** Instead of the image just ending abruptly, wrap it in a sleek, ultra-thin border (`border-white/5` with a subtle inner shadow) and a very dark glassmorphism backing (`bg-black/40 backdrop-blur-md`).
*   **Inner Vignette:** Apply a subtle dark gradient around the inner edges of the image container to sink the screenshot deeper into the page.

### 2. Architectural Anchors for the "Implied Grid"
When a grid is completely invisible, content can sometimes look like it just fell onto the page. We can imply the grid **architecturally**.
*   **Crosshairs:** Add tiny `+` marks (opacity 20%) at the exact corners where columns and rows intersect. It defines the space geometrically without building boxes.
*   **Fading Guidelines:** Use 1px vertical or horizontal lines that fade out (gradient from `white/10` to `transparent`) to visually separate columns in the 50/50 or 30/70 splits, anchoring the text to the boundary.

### 3. Exaggerated, Premium Typography
Because we removed visual containers, the text *must* become the UI. Standard font sizes won't cut it.
*   **Massive Metrics:** In the Act VI stats bento, the numbers should be massive (e.g., `text-6xl text-[var(--accent-teal)]`) with an extremely light font weight.
*   **Cinematic Text Reveals:** Currently, text just fades up. We can use a staggered, word-by-word or line-by-line mask reveal for the 30-word intros. The text slides up from a hidden baseline, which feels incredibly high-end.
*   **Exaggerated Pull Quotes:** Pull quotes should be enormous, perhaps with a subtle gradient text fill, breaking far outside the boundaries of the grid.

### 4. Upgrading the Micro-Illustrations
Right now, they are thin white lines, which can sometimes come off looking like low-fidelity wireframes rather than premium UI moments.
*   **Data-Streaming Effects:** Instead of connecting the avatars with a static line, animate a glowing teal "pulse" that travels along the path.
*   **Glow and Bloom:** Give the teal elements (like the 2 highlighted dots in the 200-dot grid, or the glowing Plus icon) a CSS bloom effect (`filter: drop-shadow(0 0 8px rgba(teal, 0.5))`).
*   **Depth:** Use layered opacity. For example, in the "1:1 avatar" illustration, place a larger, heavily blurred version of the avatar behind the crisp one to create atmospheric depth.

---

### 5. Transition Moments (The "Between" Spaces)
Right now the acts just stack on top of each other. We can increase the drama.
*   **Act Dividers:** Introduce a full-width, ultra-thin horizontal line that draws itself from left to right as you scroll down, accompanied by a massive, ghosted Act Number (e.g., a giant, 10% opacity **"ACT III"** sitting behind the text).

---

### Implementation Options

Let me know which of these resonate most. We can:
1.  **Go all-in on lighting and staging:** Focus on making the images look incredible with ambient glows and glass housing.
2.  **Focus on typography and architecture:** Add the crosshairs and upgrade the typographic hierarchy and motion.
3.  **Do it all:** I can systematically apply these upgrades across the `BentoGrid` and `CinematicCaseStudy` components to elevate the entire piece.


---

<!-- merged from: docs/artifacts/rc_movie_beats_audit.md -->
## ── source: `rc_movie_beats_audit.md` ──

# RC Movie Beats — Audit (growth.design Lens)

> **Rating each beat** on the growth.design standard: **one idea, one viewport, minimal text, visual does the heavy lifting.**

---

## Beat 1: "The Business Problem" (`MovieBeatAssignment`)
**Rating: ⭐⭐⭐⭐ Strong**

| Aspect | Status |
|--------|--------|
| One idea? | ✅ "Old system losing customers" |
| Fits viewport? | ✅ Compact — label + headline + stats |
| Text density? | ⚠️ The subtitle paragraph is borderline heavy |
| Visual doing work? | ❌ Stats are text-only, no visual metaphor |

**Suggestion:** The 3 stats (50+ Years, 20M+ Jobs, 0 Documentation) ARE the visual. Drop the subtitle paragraph — the stats say it all. The headline + stats alone is a punch.

---

## Beat 2: "Discovery Arc" (`MovieBeatDiscovery`)
**Rating: ⭐⭐⭐ OK**

| Aspect | Status |
|--------|--------|
| One idea? | ⚠️ Trying to land 3 sub-points + a closing quote |
| Fits viewport? | ⚠️ 3 cards + line + closing = tall on mobile |
| Text density? | ❌ 3 paragraphs of meta text inside cards + closing line |
| Visual doing work? | ⚠️ Cards are styled text, not a visual |

**Suggestion:** Condense to ONE moment: "Week 1 volunteer → 4 months of research nobody expected." The 3 cards could be a single visual timeline instead of separate text boxes. Kill the "connecting line" and closing paragraph.

---

## Beat 3: "The Chaos" (`MovieBeatChaos`)
**Rating: ⭐⭐⭐⭐⭐ Best Beat**

| Aspect | Status |
|--------|--------|
| One idea? | ✅ "The system was fragmented chaos" |
| Fits viewport? | ✅ Ring visual + 2 stats underneath |
| Text density? | ✅ Minimal text — visual tells the story |
| Visual doing work? | ✅ The ring of nodes + chaos lines is genuinely visual |

**Suggestion:** Near-perfect. Only tweak: the closing text line is redundant — the visual already conveys it. Consider removing  "50 years of accumulated debt..." entirely.

---

## Beat 4: "Three Pivots" (`MovieBeatPivots`)
**Rating: ⭐⭐⭐⭐ Strong**

| Aspect | Status |
|--------|--------|
| One idea? | ✅ "3 versions, only one won" |
| Fits viewport? | ✅ Horizontal layout keeps it compact |
| Text density? | ✅ Very lean labels |
| Visual doing work? | ✅ V1→V2→V3 cards with color-coded verdicts |

**Suggestion:** Almost perfect. The `10px` text on REJECTED/WINNER should be 11px. Otherwise, this is a growth.design-grade frame.

---

## Beat 5: "The Breakthrough" (`MovieBeatBreakthrough`)
**Rating: ⭐⭐⭐ OK**

| Aspect | Status |
|--------|--------|
| One idea? | ⚠️ Doing TWO things: Before vs After + stats |
| Fits viewport? | ⚠️ The After state has a nested grid + sparkles + 2 stats |
| Text density? | ❌ Before: 3 boxes + explanatory text. After: nested grid + label + stats |
| Visual doing work? | ⚠️ Boxes are styled text, not a visual transformation |

**Suggestion:** The Before→After swap via `AnimatePresence mode="wait"` is great storytelling. But the After state is overloaded. Pick ONE thing: either the hub architecture visual OR the stats. Not both. The sparkles + "Zero context switching" label is clutter.

---

## Beat 6: "Execution: Recurrence" (`MovieBeatExecution`)
**Rating: ⭐⭐ Weakest**

| Aspect | Status |
|--------|--------|
| One idea? | ❌ Trying to do: intro + before codes + after codes (3 ideas) |
| Fits viewport? | ❌ Intro text + 2 card blocks with expandable content = very tall |
| Text density? | ❌ Most text-heavy beat. Full sentences + code blocks |
| Visual doing work? | ❌ No visual — it's all text and code |

> [!WARNING]
> **This beat also has factual issues** — the user clarified that users didn't "memorize codes." The old UI was just a bad, confusing interface. The redesign used natural language after selecting settings.

**Suggestion:** This needs the most work. Kill the intro paragraph, kill the code strings. Instead, visualize: confusing UI → clean natural language sentence. Think: a single before/after morph. One frame, one moment.

---

## Beat 7: "250 Screens" (`MovieBeatScale`)
**Rating: ⭐⭐⭐⭐ Strong**

| Aspect | Status |
|--------|--------|
| One idea? | ✅ "I designed 250+ screens" |
| Fits viewport? | ✅ Screen cascade + counter — clean |
| Text density? | ⚠️ Closing paragraph is a full sentence |
| Visual doing work? | ✅ The screen cascade grid is satisfying |

**Suggestion:** Drop the closing paragraph. "250+" counter + cascade IS the moment. Let it breathe.

---

## Beat 8: "Shipped + Impact" (`MovieBeatShipped`)
**Rating: ⭐⭐⭐ OK**

| Aspect | Status |
|--------|--------|
| One idea? | ❌ Trying to land 4 things: SHIPPED + metrics + quote + Asked vs Delivered |
| Fits viewport? | ❌ Most vertically overloaded beat |
| Text density? | ❌ Headline + 3 metric cards + blockquote + comparison = dense |
| Visual doing work? | ⚠️ The big "SHIPPED." text IS visual, but then it drowns in stats |

**Suggestion:** Split into 2 beats or cut ruthlessly. Option A: Just "SHIPPED." + the quote. Option B: Just "SHIPPED." + Asked vs Delivered. The metrics can live in the full case study.

---

## Summary Scorecard

| Beat | Score | Key Issue |
|------|-------|-----------|
| 1. Business Problem | ⭐⭐⭐⭐ | Drop subtitle paragraph |
| 2. Discovery | ⭐⭐⭐ | Condense 3 cards to 1 moment |
| 3. Chaos | ⭐⭐⭐⭐⭐ | Near-perfect. Kill closing text. |
| 4. Three Pivots | ⭐⭐⭐⭐ | Fix 10px text → 11px |
| 5. Breakthrough | ⭐⭐⭐ | After state overloaded |
| 6. Execution | ⭐⭐ | Needs full rethink + factual fix |
| 7. 250 Screens | ⭐⭐⭐⭐ | Drop closing paragraph |
| 8. Shipped | ⭐⭐⭐ | Too many sections in one beat |

### Top 3 Actions:
1. **Fix Beat 6** — factually wrong + most text-heavy. Needs visual redesign.
2. **Slim Beat 8** — split or cut. One idea max.
3. **Remove closing text** from Beats 1, 3, 7 — let the visuals breathe.


---

<!-- merged from: docs/artifacts/reportcaster_experiment_audit.md -->
## ── source: `reportcaster_experiment_audit.md` ──

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


---

<!-- merged from: docs/artifacts/reportcaster_rating.md -->
## ── source: `reportcaster_rating.md` ──

# ReportCaster Case Study — Full Rating

> Rated after all audit fixes applied. Honest assessment.

---

## 📊 Scorecard

| Aspect | Score | Grade |
|---|---|---|
| **Narrative & Story Arc** | 9/10 | A |
| **Visual Design** | 8/10 | B+ |
| **Performance** | 8.5/10 | A- |
| **Content Quality** | 8/10 | B+ |
| **Interactivity & UX** | 7.5/10 | B |
| **Technical Execution** | 8.5/10 | A- |
| **Emotional Impact** | 9/10 | A |
| **Credibility & Proof** | 7/10 | B- |
| **Overall** | **8.2/10** | **B+** |

---

## 🟢 What's Working Great

### Narrative Arc — 9/10
The 6-Act structure is genuinely compelling. It doesn't read like a case study — it reads like a career story. The flow from "volunteering one week in" through two rejections to the breakthrough is the strongest part. The PullQuotes are perfectly placed and hit real emotional beats, not manufactured ones. The "How does the platform WANT workflows to behave?" pivot moment is *chef's kiss*.

### Emotional Resonance — 9/10
This case study makes you *feel* things. "I had never felt so proud of myself." "RC made me the design leader I am today." The closing manifesto lands because the 6 acts before it earned it. The personal stakes (1-year-old at home, two simultaneous projects, earning respect from decades-veteran engineers) are real and differentiated. No other portfolio candidate will have this story.

### Illustrations — Smart
The custom illustrations (ScatterConverge, PlusIconTree, OnboardingPath, KnowledgeTransfer) aren't decorative — they're informational. The 5→1 consolidation animation actually *explains* the product strategy. The PlusIconTree branching diagram *reveals* the architectural insight. They earn their render cost.

### CinematicScene System
The apple-style blur-in Title → Subtext → Bento rhythm is consistent across all 6 acts. It creates predictability that lets the reader focus on content, not navigation. The scroll progress dots now give spatial awareness on a 16k-pixel page.

---

## 🟡 What's Decent But Not Exceptional

### Visual Design — 8/10
The dark cinematic tone is strong. The accent teal + zinc palette is cohesive. But:

- **The hero is text-heavy.** Three sections (heroSubheading, scope tags, stats, ownership tags) stack into a very dense landing. The first impression is a wall of metadata rather than a *visual* statement. Compare this to Stripe's or Linear's case studies where the hero is one image + one sentence.
- **No hero image.** The `coverImage` exists in the data but isn't rendered in the hero. You land on the page and see no visual artifact for the first full viewport. For a design case study, that's a miss.
- **The glassmorphic reflection cards** we just added look good but they're the only place with that treatment. The V1/V2 rejection TextTiles are plain by comparison. There's a visual hierarchy jump at the end.

### Content Quality — 8/10
The copy is personal and confident — definitely not junior. But:

- **Act I is thin.** Just one TextTile + PeopleDotGrid + PullQuote. Every other act has 2-3 BentoRows of evidence. It feels rushed before the story even gets started.
- **Act VI "Validation" tiles are vague.** "Customer feedback was extremely positive" is a claim without evidence. "A customer praised my work" — which customer? What did they say specifically? This is the proof section and it's the weakest on specifics.
- **VideoGrid (the Zoom avatar illustration)** is cute but doesn't add real information. It's visual filler in a section that should be pure proof.

### Credibility & Proof — 7/10
This is the biggest gap. The story is strong, but the *evidence* is soft:

- **No metrics with teeth.** "4 clicks → 2" is the main quantitative claim and it's a workflow count, not a business metric. No task completion rates, no user satisfaction scores, no support ticket reduction, no customer retention numbers.
- **The "20M+ Schedules" stat** is impressive but it's *system scale*, not *design impact*. It was 20M before you touched it.
- **No direct user quotes.** The peer reviews from teammates are good for culture proof, but there are zero end-user testimonials. The "customer praised my work at virtual user group" is referenced but never quoted.
- **ImpactDiff (before/after slider)** is great. That's actual visual proof. More of this.

### Interactivity — 7.5/10
The lightbox is now functional. The carousel tiles work. But:

- **The before/after videos need poster images that clearly show the contrast.** Right now they rely on the user pressing play.
- **No scroll-linked animations in the V3 Story Deck.** The 30/70 text+image pairs just whileInView fade in — they could benefit from staggered entrance to create more of a "reveal" feeling.
- **The ImpactDiff slider** is the most interactive element but it's buried deep in Act VI. Consider teasing this earlier or making it more prominent.

---

## 🔴 What Needs Work

### 1. Act I Needs Weight
It's the weakest act. One TextTile and a PullQuote. Options:
- Add a sandbox screenshot showing the actual legacy UI you encountered
- Add a visual showing "zero documentation" — empty folder, blank wiki, etc.
- Add the "1 engineer from the 80s" as a dedicated tile with more context

### 2. The Hero Needs a Visual Anchor
You have `coverImage` in your data pointing to `/images/case-study/ReportCaster/ReportCaster Explorer.png`. It should be prominently displayed — either as a full-bleed background or a floating artifact in the hero. The first viewport is currently 100% text.

### 3. Act VI Needs Harder Proof
Replace or supplement vague "positive feedback" claims with:
- Actual customer quotes (even paraphrased with attribution)
- Before/after workflow timing comparisons
- Support ticket volume change
- Customer retention data (even directional)

### 4. Missing "Back to Portfolio" Navigation
The page ends at the closing manifesto and then... nothing. No CTA. No link back. No "next case study" prompt. The reader hits a dead end.

---

## 🎯 Priority Improvements (If You Had 2 Hours)

| Priority | Fix | Time |
|---|---|---|
| 1 | **Render hero image** (the data already has `coverImage`) | 15 min |
| 2 | **Add back-navigation** — "← Back to Work" link or "Next: ML Functions" | 15 min |
| 3 | **Beef up Act I** — add one more BentoRow with context | 30 min |
| 4 | **Harden Act VI proof** — add real customer quote | 20 min |
| 5 | **Add video poster fallbacks** — clear before/after thumbnails | 20 min |

---

## 💡 The Honest Summary

This is a **strong senior-level case study** with a **genuinely differentiated narrative**. The emotional arc, the rejection-to-breakthrough structure, and the personal stakes make it memorable. The technical execution (CinematicScene system, performance-optimized illustrations, lightbox integration) is solid.

Where it falls short is **evidence density** — the story promises transformation but then leans on workflow click-counts rather than business impact. A hiring manager reading this will think "great story, but where are the numbers?" Adding 2-3 harder proof points would elevate this from B+ to A.

The other gap is the **cold start** — no hero image, Act I is thin, and the first thing a reader sees is a wall of text metadata. The first 5 seconds matter more than anything else. A single full-bleed image of the shipped product would change that completely.
