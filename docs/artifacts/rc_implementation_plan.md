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
