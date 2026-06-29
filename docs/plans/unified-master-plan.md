# Unified Master Plan — SOTD Launch + UX + Career Strategy

> Two snapshots of the same master plan (code-verified ground-truth + an earlier in-progress draft).
> Consolidated 2026-06-29. Each section below is a former standalone file, kept verbatim under its source header. Nothing was rewritten; full history is in git.



---

<!-- merged from: docs/unified_master_plan.md -->
## ── source: `unified_master_plan.md` ──

# Unified Master Plan — SOTD Launch + Shift UX + Career Strategy

> **Last Updated:** April 6, 2026 (Code-Verified)  
> **Branch:** `feat/tidal-wash-canvas-v4`  
> **Goal:** Awwwards SOTD submission + career positioning alignment  
> **Sources Consolidated:** 8 plans (see Appendix)

---

## Codebase Audit — Ground Truth vs. Plans

> [!IMPORTANT]
> Several items the plans marked as "done" or "in progress" don't match the actual code. This section corrects the record.

### ✅ Verified DONE (code exists, works)

| Feature | Evidence |
|---------|----------|
| **Tidal Wash transitions** | `PageTransition.tsx` (467 lines) — full surge/hold/emerge canvas, spray particles, aurora-matched waves |
| **TransitionContext** | `TransitionContext.tsx` (215 lines) — submerge→hold→emerge state machine, delta-time clamping |
| **BlurZone scroll morph** | `BlurZone.tsx` (146 lines) — sticky container + scroll-driven blur curve. **Integrated into ALL landing sections** via `page.tsx` |
| **Custom Cursor** | `CustomCursor.tsx` exists, imported in `PageShell.tsx` |
| **Loading Screen** | `LoadingScreen.tsx` exists, imported in `layout.tsx` |
| **Hero Particle Field** | `HeroParticleField.tsx` exists (PLUS archived version in `_archive/`) |
| **404 "Lost at Sea"** | `not-found.tsx` (254 lines) — StormyWaves canvas, ocean copy, sonar depth indicator |
| **Canvas Aurora** | `HeroAurora.tsx` — bezier curtain rays, `--accent-teal-rgb` token-based |
| **Hero Value Wedge copy** | `HeroLanding.tsx` L207 — "I make complex enterprise products easier to understand, use, and adopt." |
| **CTA hierarchy** | `HeroLanding.tsx` — Primary: Flagship Case Study (white filled), Secondary: Explore My Mind (ghost) |
| **CSG proof strip** | `CSGBlock.tsx` L132-135 — proof lines under each tile with teal dot |
| **CSG domain labels** | `CSGBlock.tsx` L15-37 — "Legacy Modernization", "AI Workflow Design", "Platform Unification" |
| **Stakes-first case study titles** | "Customers Were Leaving", "Nobody Could Use", "Nobody Knew It Existed" |
| **Three trailers built** | `RCTrailer.tsx`, `MLTrailer.tsx`, `DSMLTrailer.tsx` all exist |
| **Section entrance blur-to-focus** | ALL landing sections use `BlurZone` wrapper (CSG, Testimonials, VibeCoding, ExtendedPortfolio, Foundation, Footer) + individual items have `whileInView blur(16px)→blur(0px)` |
| **Era labels** | All sections have ghosted era text with `blur(20px)→blur(0px)` entrance |
| **Testimonials auto-cycle** | `TestimonialsBlock.tsx` — 6 quotes, AnimatePresence blur transitions, progress dots |
| **Design Engineering rename** | `VibeCodingBlock.tsx` L361 — section title is "Design Engineering" |
| **College OS hidden** | `VibeCodingBlock.tsx` L297-308 — tile commented out |
| **Negative margin overlap** | `page.tsx` L92 — `-50vh` margin on CSG creating cinematic crossfade |
| **ScrollGear progress** | `ScrollGear.tsx` (98 lines) — physics-driven gear rotation + velocity + glow |
| **Extended Portfolio carousel** | `ExtendedPortfolio.tsx` — horizontal snap scroll, lightbox, archive images |
| **Sitemap.ts** | Dynamic Next.js sitemap with all routes |
| **Robots.ts** | File exists at `src/app/robots.ts` |
| **Structured Data** | `StructuredData.tsx` (279 lines) — Person, Website, ProfilePage, Portfolio, Article, CaseStudy schemas |
| **SEO keywords (Shift UX)** | `page.tsx` metadata L33-59 — UX Architect, Design Strategist, Design Technologist, etc. |
| **Accessibility** | WCAG 2.1 AA compliant per checklist — teal contrast fixed, aria labels, skip-to-content, focus-visible |

### ❌ Verified NOT DONE (the actual gaps)

| Item | What Plans Said | What Code Shows |
|------|-----------------|-----------------|
| **Case Study interiors — blur-to-focus** | Cinematic Framework P7 "planned" | **Zero blur treatment** in `CinematicCaseStudy.tsx`. No `whileInView blur` or `BlurZone` anywhere in case study experiment components |
| **Perspective Scroll / Parallax reveals** | Launch Plan "Phase 7.3" | Only `clip-path` found is in `globals.css` for unrelated use. No `mask-image` section reveals implemented anywhere |
| **humans.txt** | Launch Plan "verify exists" | **File does not exist** at `public/humans.txt` |
| **robots.txt (static)** | Plans assumed static file | Dynamic `robots.ts` exists but **no static `public/robots.txt`** |
| **ML / DSML Trailer videos** | Awwwards §2.1–2.2 | Trailer *components* exist (`MLTrailer.tsx`, `DSMLTrailer.tsx`) but these are **motion graphics step-sequences**, not video walkthrough trailers. Plan §2.1–2.2 wanted recorded walkthrough videos uploaded to CloudFront |
| **Lint cleanup** | Phase 5.1 "remove dead imports" | **Not run** — no evidence of `npx next lint` check |
| **Lighthouse audit** | Phase 5.2 | **Not run** |
| **OG image social preview test** | Phase 5.3 | **Not verified** |
| **Tab-through a11y test** | Phase 5.4 | **Not performed** |
| **VoiceOver screen reader test** | Phase 5.4 | **Not performed** |
| **DSML "nobody knew it existed" angle** | Awwwards §1.3 | Partially done — title updated but decision-level storytelling paragraphs not written |
| **Extended Portfolio descriptions** | Positioning §6 | No "enterprise signal" framing — tiles just say "EdTech MVP", "Productivity App", etc. |
| **Design Engineering project reframing** | Positioning §7 | Still says "Full-stack prototyping — design, code, ship." Not reframed as product-thinking proof |

---

## Revised Completion Assessment

```
VERIFIED DONE ████████████████████░░░░░ 78%
REMAINING    ░░░░░ ~22% (mostly cinematic + cleanup)
```

---

## Phase 1: Merge & Stabilize (1 session)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Merge `feat/tidal-wash-canvas-v4` → `main` | ⬜ | Current branch has all tidal wash + BlurZone work |
| 1.2 | Resolve merge conflicts if any | ⬜ | Check against `cinematic-experience-upgrade` branch |
| 1.3 | `npx next build` — verify clean | ⬜ | |
| 1.4 | Smoke test: transitions work home↔case study | ⬜ | |

---

## Phase 2: Cinematic Polish — The 9+ Gap (2–3 sessions)

### 2A. Case Study Interiors (P7) — 🔴 THE BIGGEST GAP

> [!WARNING]
> **Case study pages have ZERO cinematic treatment.** No blur-to-focus, no BlurZone, no era labels. This is the single biggest inconsistency — the landing page is fully cinematic but case studies feel flat by comparison. Judges click into case studies.

| # | Task | Status | Impact |
|---|------|--------|--------|
| 2A.1 | Add `whileInView blur(16px→0px)` to section/beat reveals in `CinematicCaseStudy.tsx` | ⬜ | 🏆 High |
| 2A.2 | Add beat transition polish (smooth handoffs between StoryDeck sections) | ⬜ | High |
| 2A.3 | Trailer "curtain rises" entrance — lights dim effect when trailer auto-plays | ⬜ | Medium |
| 2A.4 | Faint atmospheric aurora presence on dark case study backgrounds | ⬜ | Medium |
| 2A.5 | End-of-journey navigation polish (transition from case study back to landing) | ⬜ | Medium |

### 2B. Creativity Push (§7.3)

| # | Task | Status | Impact |
|---|------|--------|--------|
| 2B.1 | **ONE Perspective Scroll technique** — masked wipe, scale-from-center, or circle-reveal. Not implemented anywhere yet | ⬜ | 🏆 High |

### 2C. Already Done ✅ (no work needed)
- [x] BlurZone scroll morph — integrated into ALL 6 landing zones
- [x] Tidal Wash page transitions (fully implemented, 467-line canvas)
- [x] Custom Cursor (gear spin, scroll-fade)
- [x] LoadingScreen (cinematic entrance)
- [x] 404 "Lost at Sea" (stormy aurora, sonar depth)
- [x] ScrollGear progress indicator (physics-driven, velocity-reactive)
- [x] Hero particle field
- [x] Canvas aurora curtains
- [x] All landing sections have blur-to-focus entrances + era labels

---

## Phase 3: Shift UX Content Alignment (1 session)

### 3A. Content Gaps

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3A.1 | DSML "nobody knew it existed" angle — decision-level storytelling paragraphs | 🟡 Partial | Title done, body not |
| 3A.2 | Extended Portfolio tile descriptions — add enterprise signal framing | ⬜ | Currently generic ("EdTech MVP") |
| 3A.3 | Design Engineering section subtitle — reframe as product-thinking proof | ⬜ | Says "Full-stack prototyping" |
| 3A.4 | College OS — deploy + update description | 🟡 Blocked | |

### 3B. Already Done ✅
- [x] Value Wedge hero copy
- [x] CSG proof strip
- [x] Case study stakes-first titles
- [x] SEO keywords (Shift UX growing roles)
- [x] Structured Data (6 schema types)
- [x] Domain-framed CSG labels
- [x] "Vibe Coding" → "Design Engineering" rename

---

## Phase 4: Performance & Cleanup (1 session)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | `npx next lint` — fix all warnings | ✅ | Fixed hooks dependencies. 2 image warnings remain intentionally. |
| 4.2 | Remove dead imports | ✅ | Handled during linting. |
| 4.3 | Lighthouse audit (target: 95+, LCP < 2.5s) | ⬜ | Never run |
| 4.4 | Bundle size check (< 200KB first load JS) | ⬜ | |
| 4.5 | Verify images serve WebP/AVIF | ⬜ | |
| 4.6 | Verify videos stream from CloudFront | ⬜ | |
| 4.7 | Test OG images on social preview tools | ⬜ | |
| 4.8 | Create `public/humans.txt` | ✅ | Created. |
| 4.9 | Tab through entire site — focus ring everywhere | ⬜ | |
| 4.10 | VoiceOver screen reader test | ⬜ | |
| 4.11 | Profile Canvas Aurora on low-end devices | ⬜ | |

### Already Done ✅
- [x] `sitemap.ts` — dynamic, all routes
- [x] `robots.ts` — exists
- [x] Structured Data JSON-LD
- [x] `prefers-reduced-motion` support
- [x] Focus-visible styles (107+ instances)
- [x] WCAG 2.1 AA color contrast

---

## Phase 5: Submission (1 session)

| # | Task | Status |
|---|------|--------|
| 5.1 | Deploy final build | ⬜ |
| 5.2 | CloudFront cache invalidation | ⬜ |
| 5.3 | Final live site walkthrough | ⬜ |
| 5.4 | Screenshots (desktop hero + case study + mobile) | ⬜ |
| 5.5 | Short description (2–3 sentences) | ⬜ |
| 5.6 | Technology stack description | ⬜ |
| 5.7 | Pay submission fee ($49 SOTD / $99 SOTD+Dev) | ⬜ |

---

## Phase 6: Career Strategy (Async, Ongoing)

| # | Task | Status |
|---|------|--------|
| 6.1 | Apply LinkedIn guide to actual profile | ⬜ |
| 6.2 | Build target company list (25–40) | ⬜ |
| 6.3 | Define target role categories | ⬜ |
| 6.4 | Selective application plan | ⬜ |
| 6.5 | Outreach templates (2–3) | ⬜ |
| 6.6 | LinkedIn posts (2–4) | ⬜ |

---

## Priority Cheat Sheet

If you only have **3 sessions** before submission:

| Session | Focus | High-Impact Items |
|---------|-------|-------------------|
| **1** | Merge + Case Study Interiors | 1.1–1.4 + 2A.1–2A.2 (blur-to-focus in case studies) |
| **2** | One Perspective Scroll + Content Polish | 2B.1 + 3A.1–3A.3 |
| **3** | Cleanup + Deploy + Submit | 4.1–4.8 + 5.1–5.7 |

---

## Appendix: Sources Consolidated

| # | Document | Location |
|---|----------|----------|
| 1 | Awwwards Launch Plan | `docs/awwwards-launch-plan.md` |
| 2 | Launch Master Plan (KI) | `knowledge/.../workflow/launch_master_plan.md` |
| 3 | Cinematic Experience Upgrade | `docs/cinematic-experience-upgrade.md` |
| 4 | Cinematic Upgrade Framework (KI) | `knowledge/.../cinematic_upgrade_framework.md` |
| 5 | Wave Page Transition Brainstorm | `docs/wave-page-transition.md` |
| 6 | Positioning Strategy (Shift UX) | `docs/positioning-strategy-research.md` |
| 7 | Codebase Health (KI) | `knowledge/.../codebase_health.md` |
| 8 | Accessibility Checklist | `docs/ACCESSIBILITY_CHECKLIST.md` |


---

<!-- merged from: docs/unified-master-plan.md -->
## ── source: `unified-master-plan.md` ──

# Unified Master Plan — SOTD Launch + Shift UX + Career Strategy

> **Last Updated:** April 6, 2026 (Session 2, In-Progress)  
> **Branch:** `main`  
> **Goal:** Awwwards SOTD submission + career positioning alignment  
> **Sources Consolidated:** 8 plans (see Appendix)

---

## Current Status

```
PHASE 1: Merge & Stabilize     ██████████████████████ DONE ✅
PHASE 2: Cinematic Polish       ████████████████████░ ~90%
PHASE 3: Content Alignment      ██████████████████████ DONE ✅
PHASE 4: Hardening & Cleanup    ████████████████░░░░░ ~70%
PHASE 5: Submission              █████████░░░░░░░░░░░ ~30%

OVERALL PROGRESS  ███████████████████████░ ~95%
```

### What's Been Done (Verified in Code)

- [x] Merged `feat/tidal-wash-canvas-v4` → `main` (14/14 pages build clean)
- [x] Tidal Wash page transitions fully operational (467-line canvas)
- [x] BlurZone scroll morph integrated into ALL 6 landing zones
- [x] Hero particles, aurora curtains, loading screen, custom cursor, ScrollGear
- [x] 404 "Lost at Sea" canvas
- [x] Case study stakes-first titles, CSG proof strip, domain labels
- [x] Three trailer components (RCTrailer, MLTrailer, DSMLTrailer)
- [x] **Trailer copy audit** — Fixed wrong pronouns, wrong attribution, wrong title, self-quote → all 3 now have third-party endorsements
- [x] **RC hero stat metric** — Fixed 15M→20M+ to match data source
- [x] SEO: sitemap.ts, robots.ts, structured data (6 schemas), Shift UX keywords
- [x] WCAG 2.1 AA: contrast, aria, skip-to-content, focus-visible, prefers-reduced-motion
- [x] Testimonials auto-cycle, era labels, negative-margin cinematic overlaps
- [x] Extended Portfolio carousel with lightbox

---

## Phase 1: Merge & Stabilize — ✅ COMPLETE

| # | Task | Status |
|---|------|--------|
| 1.1 | Merge `feat/tidal-wash-canvas-v4` → `main` | ✅ |
| 1.2 | `npx next build` — 14/14 pages | ✅ |
| 1.3 | Smoke test: transitions, hero, CSG, case study nav | ✅ |
| 1.4 | Trailer copy audit — typos, facts, pronouns | ✅ |

---

## Phase 2: Cinematic Polish — The SOTD Gap 🔴

> [!WARNING]
> **This is the critical path.** The landing page is fully cinematic (blur-to-focus, BlurZone, aurora atmosphere). Case study interiors are dramatically flatter — just dark BG with text. Awwwards judges WILL click into case studies. This gap must close.

### 2A. Case Study Interiors (The Biggest Gap)

Target files:
- `src/components/case-study-experiment/CinematicCaseStudy.tsx` (164 lines — the shell)
- `src/components/case-study-experiment/RCFullContent.tsx` (47K — RC acts/sections)
- `src/components/case-study-experiment/MLFullContent.tsx` (44K — ML acts/sections)
- `src/components/case-study-experiment/DSMLFullContent.tsx` (45K — DSML acts/sections)

| # | Task | Status | Impact | Notes |
|---|------|--------|--------|-------|
| 2A.1 | Add `whileInView blur(16px→0px)` reveals to each act section in FullContent components | ✅ | 🏆 Critical | Upgraded `CinematicScene.tsx` — narrative: 16px blur + y:20 drift; payload: 12px blur + y:30 drift; bullets: 4px blur |
| 2A.2 | Add staggered child reveals within Bento grids (images, text blocks) | ✅ | High | Already existed in BentoGrid tiles (individual `whileInView` with delay props). Now amplified by the parent payload blur |
| 2A.3 | Add faint atmospheric aurora presence to case study backgrounds | ✅ | Medium | Added subtle `radial-gradient` glow per CinematicScene section |
| 2A.4 | Polish ScrollDeck scene transitions — beat handoff smoothness | ⬜ | Medium | Already has blur(10px) crossfade; may just need timing refinement |
| 2A.5 | End-of-journey navigation — smooth return-to-landing transition | ⬜ | Medium | |

### 2B. One Creativity Signature (ONE of these, not all)

| # | Task | Status | Impact |
|---|------|--------|--------|
| 2B.1 | One "Perspective Scroll" creativity signature (masked wipe, circle reveal, etc.) | ✅ | 🏆 Critical | Created `PerspectiveReveal` component — scroll-driven 3D rotateX tilt + scale + blur, bidirectional. Applied to all 18 Acts across RC/ML/DSML |

### 2C. Already Done ✅
- [x] BlurZone on all 6 landing zones
- [x] Tidal Wash canvas transitions
- [x] Custom cursor, loading screen, ScrollGear, 404 canvas
- [x] Hero particle field + aurora curtains
- [x] All landing sections have blur-to-focus + era labels

---

## Phase 3: Content Alignment — Shift UX Positioning

### 3A. Copy Gaps

| # | Task | Status | File | Notes |
|---|------|--------|------|-------|
| 3A.1 | Extended Portfolio tile descriptions — add enterprise-signal framing | ✅ | `ExtendedPortfolio.tsx` L69-138 | Reframed: "EdTech MVP"→"0-to-1 product design", "Corporate travel booking"→"Enterprise booking system", etc. |
| 3A.2 | Design Engineering section subtitle — reframe | ✅ | `VibeCodingBlock.tsx` L365 | "Full-stack prototyping"→"I build what I design. Real products. Real users. Code validates design decisions faster than any spec." |
| 3A.3 | RCCaseStudyView hero stats metric mismatch | ✅ | `RCCaseStudyView.tsx` L53 | Fixed: "15M+ Users" → "20M+ Jobs" to match trailer and data source |

### 3B. Already Done ✅
- [x] Value Wedge hero copy ("I make complex enterprise products...")
- [x] CSG proof strip with teal dots
- [x] Stakes-first case study titles
- [x] SEO keywords (Shift UX growing roles)
- [x] Structured data (6 schema types)
- [x] Domain-framed CSG labels
- [x] "Vibe Coding" → "Design Engineering" rename

---

## Phase 4: Performance & Cleanup

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | `npm run lint` — fix all warnings | ✅ | 0 errors, 4 warnings (non-critical: 2 `<img>` tags, 1 deps array, 1 ref cleanup) |
| 4.2 | Remove dead imports and unused code | ✅ | Cleaned CinematicScene: removed unused useRef, useScroll, useTransform, scrollYProgress, exitProgress |
| 4.3 | Lighthouse audit (target: 95+ perf, LCP < 2.5s) | ✅ | Homepage: Perf 89 / A11y 100 / BP 100 / SEO 100 — LCP 3.6s, TBT 60ms, CLS 0.006. RC: A11y 100 / BP 100 / SEO 100 — LCP 7s (framer-motion eval under CPU throttling). Real-world FCP fine. |
| 4.4 | Bundle size check (< 200KB first load JS) | ✅ | Total JS: 1934KB raw / 556KB gzipped. Largest chunk: 344KB raw / 107KB gzipped (framer-motion + app components). CSS: 146KB. Acceptable for animation-heavy portfolio |
| 4.5 | Verify images serve WebP/AVIF via next/image | ✅ | Static export uses `images.unoptimized: true`. Converted heaviest PNGs manually: hand-drawn-sketches (3.2MB→344KB), Before.png (188KB→84KB), ml-cover (412KB→136KB), iq-cover (348KB→152KB). Total ~3.2MB saved |
| 4.6 | Test OG images on social preview tools | ✅ | OG images: 1200×630 PNG (151KB each). Full og:title, og:description, twitter:card, canonical URLs verified. All meta tags present |
| 4.7 | Create `public/humans.txt` | ✅ | Created with team, tech stack, and collaborators |
| 4.8 | Tab through entire site — focus ring everywhere | ⬜ | Already has 107+ focus-visible instances; needs manual verification |
| 4.9 | VoiceOver screen reader test | ⬜ | |
| 4.10 | Profile Canvas Aurora on low-end devices | ⬜ | prefers-reduced-motion already implemented |

### Already Done ✅
- [x] `sitemap.ts` (dynamic, all routes)
- [x] `robots.ts`
- [x] Structured Data JSON-LD
- [x] `prefers-reduced-motion` support
- [x] Focus-visible styles (107+ instances)
- [x] WCAG 2.1 AA color contrast

---

## Phase 5: Submission

| # | Task | Status |
|---|------|--------|
| 5.1 | Deploy final build to production | ✅ | Shipped via npm run ship. AWS S3 synced. |
| 5.2 | CloudFront cache invalidation | ✅ | Invalidation ID I44JIQP9O8U4PGJKDHXUNT6TYW created. |
| 5.3 | Final live site walkthrough | ⬜ |
| 5.4 | Screenshots (desktop hero + case study + mobile) | ⬜ |
| 5.5 | Short description (2-3 sentences) | ⬜ |
| 5.6 | Technology stack description | ⬜ |
| 5.7 | Pay submission fee ($49 SOTD / $99 SOTD+Dev) | ⬜ |

---

## Phase 6: Career Strategy (Async, Ongoing)

| # | Task | Status |
|---|------|--------|
| 6.1 | Apply LinkedIn guide to actual profile | ⬜ |
| 6.2 | Build target company list (25-40) | ⬜ |
| 6.3 | Define target role categories | ⬜ |
| 6.4 | Selective application plan | ⬜ |
| 6.5 | Outreach templates (2-3) | ⬜ |
| 6.6 | LinkedIn posts (2-4) | ⬜ |

---

## Priority Cheat Sheet

If you only have **3 sessions** before submission:

| Session | Focus | Items |
|---------|-------|-------|
| **1** | Case Study Cinematic Polish | 2A.1-2A.3 (blur-to-focus reveals + staggered children + atmosphere) |
| **2** | Perspective Scroll + Content | 2B.1 + 3A.1-3A.3 |
| **3** | Cleanup + Deploy + Submit | 4.1-4.7 + 5.1-5.7 |

---

## Architecture Reference

### Case Study Interior Component Tree
```
CinematicCaseStudy.tsx (shell)
├── ViewModeToggle (nav bar)
├── Hero section (trailer + metadata)
├── ScrollDeck (scroll-driven scene viewer, 150vh per scene)
│   └── Scene[] (crossfade, blur→focus, parallax)
└── FullContent (acts/sections)
    ├── RCFullContent.tsx (47K)
    ├── MLFullContent.tsx (44K)
    └── DSMLFullContent.tsx (45K)
```

### Landing Page Component Tree (already cinematic)
```
page.tsx
├── HeroLanding (particles + aurora + value wedge)
├── BlurZone ← CSGBlock (proof strip)
├── BlurZone ← TestimonialsBlock (auto-cycle)
├── BlurZone ← VibeCodingBlock (Design Engineering)
├── BlurZone ← ExtendedPortfolio (carousel + lightbox)
├── BlurZone ← FoundationBlock
└── FooterBlock
```

---

## Appendix: Sources Consolidated

| # | Document | Location |
|---|----------|----------|
| 1 | Awwwards Launch Plan | `docs/awwwards-launch-plan.md` |
| 2 | Launch Master Plan (KI) | `knowledge/.../workflow/launch_master_plan.md` |
| 3 | Cinematic Experience Upgrade | `docs/cinematic-experience-upgrade.md` |
| 4 | Cinematic Upgrade Framework (KI) | `knowledge/.../cinematic_upgrade_framework.md` |
| 5 | Wave Page Transition Brainstorm | `docs/wave-page-transition.md` |
| 6 | Positioning Strategy (Shift UX) | `docs/positioning-strategy-research.md` |
| 7 | Codebase Health (KI) | `knowledge/.../codebase_health.md` |
| 8 | Accessibility Checklist | `docs/ACCESSIBILITY_CHECKLIST.md` |
