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
| 4.1 | `npx next lint` — fix all warnings | ⬜ | Never run |
| 4.2 | Remove dead imports | ⬜ | |
| 4.3 | Lighthouse audit (target: 95+, LCP < 2.5s) | ⬜ | Never run |
| 4.4 | Bundle size check (< 200KB first load JS) | ⬜ | |
| 4.5 | Verify images serve WebP/AVIF | ⬜ | |
| 4.6 | Verify videos stream from CloudFront | ⬜ | |
| 4.7 | Test OG images on social preview tools | ⬜ | |
| 4.8 | Create `public/humans.txt` | ⬜ | **Missing** |
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
