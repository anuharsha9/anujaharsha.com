# Archived Audits — Portfolio, Cleanup, Clutter, Mobile

> Point-in-time audit snapshots kept for the record.
> Consolidated 2026-06-29. Each section below is a former standalone file, kept verbatim under its source header. Nothing was rewritten; full history is in git.



---

<!-- merged from: docs/artifacts/portfolio_10_of_10_audit.md -->
## ── source: `portfolio_10_of_10_audit.md` ──

# 🔬 Portfolio 10/10 Audit — Ruthless Criticism

> **Goal:** Land a FAANG role + win Awwwards + get featured
> **Current Score:** 7/10 — strong bones, but rough edges everywhere
> **Audit Date:** Feb 26, 2026

---

## 🚨 Tier 1: Showstoppers (Fix Before Any Recruiter Sees This)

### 1. Hydration Error — Red "1 Issue" Badge
Every page shows a visible Next.js error overlay in the bottom-left corner. For someone whose brand is "Design Engineer who codes" — this is a **credibility killer**.

**Root cause:** Likely random values generated during render (particle positions, random IDs, Date objects) that differ between server and client.

**Fix:**
- Wrap any `Math.random()` or `new Date()` calls in `useEffect` or `useMemo` with stable seeds
- Use `suppressHydrationWarning` only as a last resort
- Test with `next build && next start` (production mode) to confirm zero errors

**Priority:** 🔴 CRITICAL — do this first

---

### 2. Massive Dead Zones on Scroll (Homepage)
Scrolling through the hero, users encounter **1000+ pixels of pure black** before content appears. This isn't "dramatic pause" — it's broken pacing. Awwwards judges will scroll once, see nothing, and leave.

![Homepage mid-scroll showing dead zone](/Users/anu/.gemini/antigravity/brain/dc2e37c1-ee7b-44ca-a456-a59f1b93fd04/homepage_csg_section_1772148834597.png)

**Fix:**
- Tighten the scroll timeline — reduce gaps between animated reveals by 40-50%
- Add subtle ambient particles or gradient shifts during "empty" scroll zones so something is always alive
- Consider a scroll progress indicator (thin line at top) so users know the page isn't broken

**Priority:** 🔴 HIGH

---

### 3. Ghost Content — "College OS" & "Coming Soon" Cards
These placeholders are functionally invisible on the dark background. A hiring manager doesn't know they're "coming soon" — they think it's a rendering bug.

**Fix:**
- Either make them genuinely visible with proper contrast + a clear "Coming Soon" badge
- Or **remove them entirely** until they're ready. Empty promises hurt more than gaps.

**Priority:** 🔴 HIGH

---

## 🟡 Tier 2: Serious Polish (The Difference Between 7/10 and 9/10)

### 4. Contrast Still Needs Work in Practice
The token values now pass WCAG AA mathematically, but visually:
- The `2022—2025` background text is so dim it looks like a screen smudge
- "SOCIAL PROOF" background label barely registers
- Footer secondary text ("Designed + AI-Orchestrated") feels invisible
- Case study slide indicators at bottom are too dim to track

**Fix:** Audit every decorative text instance. If it's meant to be noticed at all, it needs ≥2:1 contrast. If it's not meant to be noticed, question why it exists.

**Priority:** 🟡 MEDIUM-HIGH

---

### 5. The "Booting System" Loader — Friction Point
Cool the first time. Annoying the second. A hiring manager reviewing 50 portfolios doesn't want to wait 3 seconds for each page. Awwwards judges test multiple pages rapidly.

**Fix:**
- Cache the animation in `sessionStorage` — only play it once per session
- Add a subtle "Skip" tap target
- Reduce total animation time from ~3s to ~1.5s

**Priority:** 🟡 MEDIUM-HIGH

---

### 6. Wordu Game — Visual Whiplash
Going from a dark, moody, premium portfolio to a bright white Duolingo-style game is jarring. It breaks the brand identity.

![Wordu game page](/Users/anu/.gemini/antigravity/brain/dc2e37c1-ee7b-44ca-a456-a59f1b93fd04/wordu_hero_1772149000947.png)

**Fix:**
- Consider a dark theme variant for Wordu that matches the portfolio aesthetic
- Or add a deliberate "entering game mode" transition that acknowledges the shift
- The "Rally" mode arrow with no explanation is confusing — add a tooltip or "Locked" label

**Priority:** 🟡 MEDIUM

---

### 7. Missing Page Transitions
Navigation between pages is instantaneous — no transition. Awwwards winners almost universally have smooth page transitions (fade, slide, morph).

**Fix:**
- Implement `framer-motion` `AnimatePresence` for route transitions
- Even a simple 200ms fade-in/fade-out would elevate the feel significantly
- Bonus: morphing transitions where case study cards expand into full pages

**Priority:** 🟡 MEDIUM

---

### 8. Typography Hierarchy on /me Page
"DESIGN ENGINEER" is massive and dominant, but "Watch Intro Video" — the actual CTA — is tiny. The hierarchy is inverted.

**Fix:**
- The CTA should be the visual anchor, not the label
- Add a play icon with a subtle pulse animation to draw the eye

**Priority:** 🟡 MEDIUM

---

### 9. Footer CTA Weakness
"I design so I can be part of making people's lives a little easier every day" is a lovely sentiment but it's the **last thing** a recruiter reads. It should be a hiring hook, not a diary entry.

**Fix:**
- Lead with the value prop: "Looking for a Senior Product Designer who ships code? Let's talk."
- Make the email/phone a primary CTA button, not just text
- The social links (LinkedIn, Resume, Medium, ADPList) should have hover states and be more prominent

**Priority:** 🟡 MEDIUM

---

### 10. No 404 Page
What happens when someone hits a broken link? Currently: Next.js default 404. That's a missed brand moment.

**Fix:** Design a custom 404 that's on-brand — maybe the brain gears with a "thought not found" message.

**Priority:** 🟡 LOW-MEDIUM

---

## 🟢 Tier 3: Awwwards-Level Polish (The Difference Between 9/10 and 10/10)

### 11. No Cursor Customization
Most Awwwards-winning dark portfolios have custom cursors (dot follower, magnetic buttons, etc.)

### 12. No Smooth Scroll Momentum
The native browser scroll is utilitarian. Consider Lenis/Locomotive scroll for buttery-smooth inertia that matches the premium feel.

### 13. Mobile Experience Is Unknown
No mobile screenshots were taken in this audit. Awwwards scores mobile separately — it's 50% of the total score. **This must be tested.**

### 14. No Sound Design
The "booting system" intro would be 10x more impactful with a subtle ambient sound (optional, with mute). See: [Lusion](https://lusion.co), [Active Theory](https://activetheory.net).

### 15. Performance Budget
- Run Lighthouse on every page — target 90+ on Performance, Accessibility, Best Practices, SEO
- Ensure Time to Interactive (TTI) < 3s on 3G
- Optimize images: ensure all case study visuals are in WebP/AVIF

### 16. Micro-interactions on Cards
The case study cards on homepage lack hover micro-interactions. They should:
- Have a subtle scale (1.02x) on hover
- Show a preview animation or parallax tilt
- Magnetic button effect on CTAs

### 17. Testimonial Section Polish
The "Social Proof" section could feel more premium:
- Animate quote marks appearing
- Add subtle gradient border on the testimonial card
- Company logos alongside quotes for credibility

---

## 🧹 Token Consolidation Plan

> **Your comment:** "too many color variables — can't we tone it down?"

You're right. 169 variables is still heavy for a single-theme site. Here's what can be consolidated:

### Current Redundancies (can eliminate ~40-50 variables)

| Redundancy | Count | Action |
|---|---|---|
| `--bg-primary` = `--bg-dark` = `--palette-zinc-950` (all `#09090b`) | 3→1 | Keep `--bg-primary`, alias others in `design-system.ts` |
| `--bg-secondary` = `--bg-dark-alt` = `--bg-light` (all `#0f1115`) | 3→1 | Keep `--bg-secondary` |
| `--bg-tertiary` = `--bg-light-alt` (both `#131518`) | 2→1 | Keep `--bg-tertiary` |
| `--text-heading` = `--text-primary-dark` = `--text-primary-light` (all `#f4f4f5`) | 3→1 | Just use `--text-heading` |
| `--text-body` = `--text-muted-dark` = `--text-muted-light` (all `#a1a1aa`) | 3→1 | Just use `--text-body` |
| `--accent-teal` = `--highlight` = `--color-info` (all `#078B9C`) | 3→1 | Keep `--accent-teal` |
| `--accent-teal-soft` = `--highlight-soft` | 2→1 | Keep `--accent-teal-soft` |
| `--border-primary` = `--border-dark` (both `rgba(255,255,255,0.08)`) | 2→1 | Keep `--border-primary` |
| `--border-secondary` = `--border-light` (both `rgba(255,255,255,0.06)`) | 2→1 | Keep `--border-secondary` |
| `--accent-teal-50` through `--accent-teal-900` (full 10-shade scale) | 10 | Audit: likely only 3-4 are used |
| `--semantic-*` (13 colors for data viz) | 13 | Audit: how many are actually used in case studies? |
| `--overlay-white-*` (7 opacity levels) | 7 | Can likely reduce to 4 (03, 05, 10, 20) |

### Target After Consolidation
- **Current:** 169 variables
- **Target:** ~110 variables
- **Method:** Remove aliases, audit teal/semantic scales for actual usage

---

## 📊 Prioritized Action Plan

| # | Task | Impact | Effort | Priority |
|---|---|---|---|---|
| 1 | Fix hydration error | 🔴 Credibility | Low | **P0** |
| 2 | Tighten scroll dead zones | 🔴 Engagement | Medium | **P0** |
| 3 | Remove/fix ghost "Coming Soon" cards | 🔴 Polish | Low | **P0** |
| 4 | Cache boot animation (play once) | 🟡 UX | Low | **P1** |
| 5 | Consolidate duplicate tokens (~40 vars) | 🟡 Code health | Medium | **P1** |
| 6 | Improve decorative text contrast | 🟡 Readability | Low | **P1** |
| 7 | Add page transitions | 🟡 Premium feel | Medium | **P1** |
| 8 | Custom 404 page | 🟢 Brand | Low | **P2** |
| 9 | Test + polish mobile experience | 🔴 Awwwards req | High | **P1** |
| 10 | Footer CTA rewrite | 🟡 Hiring impact | Low | **P2** |
| 11 | Lighthouse performance audit | 🟡 Technical | Medium | **P2** |
| 12 | Custom cursor / smooth scroll | 🟢 Awwwards wow | Medium | **P3** |
| 13 | Wordu dark theme | 🟢 Brand consistency | High | **P3** |

---

## 🎯 Bottom Line

**What's working well:**
- The brain-ignition entry experience is genuinely impressive and memorable
- Case study storytelling (movie beats/slide format) is unique and engaging
- Typography choices and the overall dark aesthetic are strong
- OG image is clean and professional
- SEO foundations are solid (structured data, sitemap, robots.txt)

**What's keeping you from 10/10:**
1. **Technical debt** — hydration error is a dealbreaker for anyone who inspects
2. **Pacing** — the scroll story has dead zones that kill momentum
3. **Incomplete content** — "coming soon" placeholders look unfinished
4. **Missing premium touches** — no page transitions, no cursor effects, no scroll smoothing
5. **Mobile is untested** — Awwwards scores it separately, and most recruiters browse on phones

**The honest truth:** You're closer to 10/10 than most portfolios ever get. The architecture and storytelling are exceptional. The gap is in the last 20% of polish — the kind of polish that separates "impressive side project" from "this person ships at a world-class level."


---

<!-- merged from: docs/artifacts/cleanup_audit.md -->
## ── source: `cleanup_audit.md` ──

# 🧹 Comprehensive Dead Code Audit

> After the cinematic bento refactor, the old `CaseStudyLayout → SectionBlock` pipeline is fully replaced. This cascades into many orphaned components, data files, and UI utilities.

---

## TIER 1 — Entire Dead Directories (delete whole folder)

| Directory | Files | Total Size | Reason |
|---|---|---|---|
| `src/components/case-study-v2/` | 3 | ~93KB | Old v2 rendering shell — replaced by cinematic views |
| `src/app/experiment/` | 1 | ~1KB | Just redirects to `/work/*` — no longer needed |

---

## TIER 2 — Dead components in `src/components/case-study/`

### Old rendering pipeline (the core dead chain)
| File | Size | Reason |
|---|---|---|
| `CaseStudyLayout.tsx` | 66KB | Old full layout shell — replaced by `CinematicCaseStudy.tsx` |
| `SectionBlock.tsx` | 91KB | Old section renderer — replaced by bento `TextTile`/`ImageTile` |
| `CaseStudySection.tsx` | 6KB | Old section wrapper |
| `CaseStudyNav.tsx` | 2KB | Old nav — replaced by `ViewModeToggle` |
| `CaseStudyCard.tsx` | 1KB | Unused |
| `SectionNav.tsx` | 8KB | Old section nav |
| `HeroMeta.tsx` | 13KB | Old hero — replaced by `CinematicCaseStudy` hero |
| `ReadingProgress.tsx` | 1KB | Old progress bar — replaced by scroll dots |
| `PresentationFlow.tsx` | 15KB | Old presentation — replaced by `StoryDeck` |
| `PresentationSlide.tsx` | 20KB | Old presentation slides |
| `BonusSlides.tsx` | 4KB | Old bonus slides |
| `PasswordGate.tsx` | 7KB | Old password gate |
| `QuickOverview.tsx` | 4KB | Old quick overview |
| `LockedContent.tsx` | 0.4KB | Old locked section |
| `AhaMoment.tsx` | 2KB | Only imported by dead SectionBlock |
| `iq-plugin-data.tsx` | 6KB | Old IQ data format |
| `AutoSequenceDataViewer.tsx` | 10KB | Only imported by dead CaseStudyLayout |
| `CaseStudyReflection.tsx` | 5KB | Only imported by dead files |

### ML-specific (replaced by `MLFullContent.tsx` bento)
| File | Size |
|---|---|
| `MLChallengeBreakdown.tsx` | 7KB |
| `MLExplainabilityHighlight.tsx` | 9KB |
| `MLFunctionsTimeline.tsx` | 3KB |
| `MLImpactMetrics.tsx` | 5KB |
| `MLKnowledgeGapSystem.tsx` | 5KB |
| `MLPatternConnections.tsx` | 5KB |
| `MLPersonaCards.tsx` | 1KB |
| `MLUserAccessStrategy.tsx` | 6KB |
| `MLWorkflowMapping.tsx` | 6KB |

### IQ/DSML-specific (replaced by `DSMLFullContent.tsx` bento)
| File | Size |
|---|---|
| `IQArchitectureBlueprint.tsx` | 7KB |
| `IQBuildingSystem.tsx` | 5KB |
| `IQBusinessCase.tsx` | 3KB |
| `IQChallengesBreakdown.tsx` | 6KB |
| `IQEmptyStateShowcase.tsx` | 5KB |
| `IQEvolution.tsx` | 5KB |
| `IQIdeaLab.tsx` | 4KB |
| `IQIterationLog.tsx` | 14KB |
| `IQPatternConnections.tsx` | 5KB |
| `IQPersonaCards.tsx` | 2KB |
| `IQPluginArchitecture.tsx` | 8KB |
| `IQPluginTimeline.tsx` | 2KB |
| `IQValidationSources.tsx` | 6KB |
| `IQWorkflowComparison.tsx` | 4KB |
| `IQWorkflowsAndFoundation.tsx` | 14KB |

### RC-specific (replaced by `RCFullContent.tsx` bento)
| File | Size |
|---|---|
| `ReportCasterTimeline.tsx` | 4KB |
| `SystemArchaeology.tsx` | 7KB |
| `SystemConsolidationMap.tsx` | 17KB |
| `TribalKnowledgeNetwork.tsx` | 16KB |
| `ThreeCriticalPivots.tsx` | 9KB |
| `ScheduleWorkflowComparison.tsx` | 11KB |
| `NaturalLanguageInsight.tsx` | 10KB |
| `PlusMenuInsight.tsx` | 14KB |
| `TeamOnboardingProcess.tsx` | 7KB |
| `ScaleAndResponsibility.tsx` | 8KB |
| `VersionIteration.tsx` | 15KB |
| `NavigateForwardContent.tsx` | 8KB |
| `JobLogRedesignViz.tsx` | 40KB |

### Shared old components (only consumed by dead files)
| File | Size |
|---|---|
| `BeforeAfterComparison.tsx` | 16KB |
| `BeforeAfterVideo.tsx` | 11KB |
| `MultiBeforeAfterVideo.tsx` | 11KB |
| `CraftShowcase.tsx` | 2KB |
| `DesignIterationLog.tsx` | 17KB |
| `DesignSystemShowcase.tsx` | 11KB |
| `FoundationsTerminal.tsx` | 4KB |
| `FrameworkMatrix.tsx` | 4KB |
| `FourStepFlowBreakdown.tsx` | 5KB |
| `ImpactOutcomes.tsx` | 2KB |
| `LayeredDisclosureVisual.tsx` | 7KB |
| `MarketAnalysis.tsx` | 13KB |
| `OwnershipScope.tsx` | 3KB |
| `PersonaCards.tsx` | 4KB |
| `ProcessArtifactViewer.tsx` | 7KB |
| `PrototypeBlock.tsx` | 6KB |
| `ResearchApproach.tsx` | 6KB |
| `ResearchConstraints.tsx` | 12KB |
| `SystemMappingBreakdown.tsx` | 9KB |
| `SystemTopologyBlueprint.tsx` | 10KB |
| `TeamCollaboration.tsx` | 3KB |
| `TerminalInsight.tsx` | 3KB |
| `UnifiedTimeline.tsx` | 9KB |
| `UXPrinciples.tsx` | 2KB |
| `WorkflowPrototype.tsx` | 10KB |
| `ArchitectureBlueprint.tsx` | 12KB |

### Dead `PullQuote.tsx` (case-study version)
`BentoGrid.tsx` has its own `PullQuote` — the old one in `case-study/PullQuote.tsx` (1KB) is unused.

---

## TIER 3 — Dead UI Utilities in `src/components/ui/`

| File | Size | Reason |
|---|---|---|
| `SocialShareButtons.tsx` | (in `sharing/`) | Only imported by dead CaseStudyLayout |
| `ParallaxImage.tsx` | ~3KB | Only imported by dead SectionBlock |
| `ScrollRevealText.tsx` | ~3KB | Only imported by dead SectionBlock |
| `TextReveal.tsx` | ~3KB | Only imported by dead HeroMeta + HeroSection v2 |
| `MotionSection.tsx` | ~2KB | Only imported by dead PrototypeBlock |
| `ComponentHeading.tsx` | ~2KB | ALL importers are dead case-study/ files |
| `CustomVideoPlayer.tsx` (in `video/`) | ~5KB | Only imported by dead BeforeAfterVideo, MultiBeforeAfterVideo, PrototypeBlock |
| `ImageComparisonSlider.tsx` | ~4KB | Used by ImpactDiff (KEEP) + dead BeforeAfterComparison — **KEEP** |

---

## TIER 4 — Dead Data Files in `src/data/`

| File | Only Imported By | Status |
|---|---|---|
| `architecture-blueprint.ts` | CaseStudyPage v2 (DEAD) | **DELETE** |
| `craft-showcase.ts` | CaseStudyPage v2 (DEAD) | **DELETE** |
| `impact-outcomes.ts` | CaseStudyPage v2 (DEAD) | **DELETE** |
| `iq-artifacts.ts` | CaseStudyLayout (DEAD) | **DELETE** |
| `market-analysis.ts` | CaseStudyLayout (DEAD) | **DELETE** |
| `ml-artifacts.ts` | CaseStudyLayout (DEAD) | **DELETE** |
| `research-approach.ts` | CaseStudyLayout (DEAD) | **DELETE** |
| `research-constraints.ts` | CaseStudyPage v2 (DEAD) | **DELETE** |
| `team-collaboration.ts` | CaseStudyLayout + CaseStudyPage v2 (DEAD) | **DELETE** |

---

## TIER 5 — Dead Lib Files in `src/lib/`

| File | Reason |
|---|---|
| `movieBeatsToSlides.ts` | Zero importers |
| `content-utils.tsx` | Only imported by dead SectionBlock |
| `getCaseStudyData.ts` | Only imported by MobileMenu — **CHECK** if Menu still uses it |

---

## TIER 6 — Dead Landing Page / Other Components

| File | Size | Reason |
|---|---|---|
| `src/components/home/ImmersiveEraBlock.tsx` | ~15KB | Zero importers — not rendered anywhere |
| `src/components/home/MilestoneConnector.tsx` | ~5KB | Zero importers |
| `src/components/timeline/SecondaryCaseStudies.tsx` | ~8KB | Zero importers |

---

## TIER 7 — Brain SVG / Quiz / Gear System

These are **STILL LIVE**:

| File | Used By | Status |
|---|---|---|
| `ImmersiveBrainExperience.tsx` | `/quiz/page.tsx` + `MobileTimeline.tsx` | **KEEP** |
| `brain-gears-svg.ts` | `ImmersiveBrainExperience` | **KEEP** |
| `gear-inspector.ts` | `GearBottomSheet` + `ImmersiveBrainExperience` | **KEEP** |
| `GearBottomSheet.tsx` | Landing page | **KEEP** |
| `FlagshipTheater.tsx` | `MobileTimeline` | **KEEP** |
| `CinematicTimeline.tsx` | `ImmersiveBrainExperience` | **KEEP** |

---

## Component KEEP List (src/components/case-study/)

| File | Reason |
|---|---|
| `CaseStudyWireframes.tsx` | Landing page tiles + hero backgrounds |
| `ImpactDiff.tsx` | Used by RCFullContent, MLFullContent |
| `ImageLightbox.tsx` | Core lightbox renderer used by LightboxContext |
| `LetsTalkCTA.tsx` | Landing page CTA |
| `StoryDeck.tsx` | Presentation mode carousel |
| `SystemIndex.tsx` | Next case study navigation |
| `ViewModeToggle.tsx` | Case study nav bar |
| `storyboard/` (all 19 files) | Used by RC/ML/DSML presentation slides |

## Storyboard: KEEP all

All storyboard files (`Beat*.tsx`, `*MovieBeats.tsx`, `AutoPlayStory.tsx`, `PresenterBar.tsx`) are still imported by the cinematic case study views for presentation mode slides.

---

## Summary

| Category | Files | Est. Size |
|---|---|---|
| Dead case-study/ components | ~67 files | ~650KB |
| Dead case-study-v2/ | 3 files | ~93KB |
| Dead experiment/ route | 1 file | ~1KB |
| Dead UI utilities | 6 files | ~18KB |
| Dead data files | 9 files | ~40KB |
| Dead lib files | 2-3 files | ~15KB |
| Dead home/timeline components | 3 files | ~28KB |
| Dead sharing component | 1 file | ~3KB |
| **TOTAL** | **~92 files** | **~850KB** |


---

<!-- merged from: docs/artifacts/clutter_audit.md -->
## ── source: `clutter_audit.md` ──

# Case Study Clutter Audit

## High-Impact Cleanup Opportunities

### 1. `IQBusinessCase` — Problem/Solution + Business Drivers ⭐ HIGH
**Current**: 2 large text panels (Problem vs Solution) with 4 bullets each + 3 Business Driver cards + Strategic Outcome banner. That's **4 separate sections** of text.
**Fix**: Collapse to a single clean 2-column card (title + 1-line summary only, no bullets). Remove Business Drivers cards entirely (they repeat the same message). Remove Strategic Outcome banner.

### 2. `OwnershipScope` — 4 cards × 3 bullets each ⭐ HIGH
**Current**: 4 colored cards (Product Strategy, Design Execution, Engineering Partnership, Research & Validation) each with 3 bullet points (= 12 bullets total) + 4 stat badges at the bottom.
**Fix**: Same approach as TeamCollaboration — icon + title + single summary line. Remove stat badges (they repeat content from elsewhere).

### 3. `ImpactOutcomes` — 4 cards with tag + headline + body ⭐ MEDIUM
**Current**: Each card has a `// TAG` label, an icon, a headline, AND a body paragraph. Three text layers per card.
**Fix**: Remove the `// TAG` mono labels. Keep just icon + headline + body (or even just icon + headline if body is redundant).

### 4. `ResearchConstraints` — Heavy text layout (215 lines!) ⭐ MEDIUM  
**Current**: Constraint box + strategy box + connector + source cards with detailed insight bullets.
**Fix**: Simplify to constraint label → strategy label (one-liner each), and collapse source cards to icon + name only.

### 5. `CaseStudyReflection` — Retrospective section ⭐ LOW-MEDIUM
**Current**: "Voice of the Team" heading + quotes + "Honest Reflection" heading + two titled paragraphs with colored mono labels.
**Fix**: Remove `// RETROSPECTIVE` and `// TESTIMONIALS` internal headings (already handled by removing tags). Clean up the mono labels on "What I'd Push Harder For" / "Where I'd Take It Next".

### 6. `IQWorkflowComparison` description text ⭐ LOW
**Current**: Has a description line "Three features, three different entry points → One unified hub. Drag the slider to compare."
**Fix**: Remove the description — the sliders are self-explanatory.

### 7. `ComponentHeading` description props throughout ⭐ LOW
**Current**: Many ComponentHeading usages pass a `description` prop that repeats what the title already says.
**Fix**: Audit and remove redundant description strings.

---

## Recommended Priority Order
1. **IQBusinessCase** — biggest visual clutter offender
2. **OwnershipScope** — 12 bullets feels like a resume dump
3. **ImpactOutcomes** — remove tags, tighten
4. **IQWorkflowComparison** — remove description text
5. **ResearchConstraints** — simplify
6. **CaseStudyReflection** — minor cleanup
7. **ComponentHeading descriptions** — surgical pass


---

<!-- merged from: docs/artifacts/mobile_audit_report.md -->
## ── source: `mobile_audit_report.md` ──

# Mobile Responsiveness Audit — Current State

> [!NOTE]
> Continuing from the **Mobile Responsiveness Audit** conversation. The last session completed: hero-to-CSG transition fixes, CSG tile border/background fixes, dotted pattern restoration, Vibe Coding tile fixes (College OS graduation cap, WordU container), and a full-page screenshot sweep. The **final step — identifying and fixing mobile issues — was not completed**.

## Fresh Audit Results (390×844 viewport)

### ✅ Sections That Look Good
| Section | Scroll Position | Status |
|---------|----------------|--------|
| Hero intro ("When you look at a chair...") | 0–400px | Clean, centered, well-scaled |
| Hero bio ("Hi, I'm Anuja") transition | 800–1200px | Smooth crossfade, no dead zones |
| CSG case study tiles (ReportCaster, ML Functions, IQ Plugin) | 2000–2800px | Tiles stack nicely, borders/bg visible |
| Social Proof testimonials | 3000–4200px | Cards read well, good padding |
| Vibe Coding tiles (Portfolio, WordU, College OS) | 5400–6200px | Stack beautifully, SVGs render correctly |
| Timeline ("Meanwhile, in life...") | 4400–5000px + 6600–7800px | Two-column grid works at mobile |
| Footer / Contact | 8400+ | Buttons have good sizing |

### 🔴 Issues to Fix

#### 1. **"FEATURED" badge overlaps quote text** (~3000–3600px)
The small `FEATURED` label sits directly on top of the last line of testimonial quotes, overlapping with words like "design" and "is never".

````carousel
![FEATURED badge overlaps "design" in Vijay Raman's quote](/Users/anu/.gemini/antigravity/brain/9e249e04-8d34-4061-9613-270be8bc7321/mobile_audit_3000px_1772176350005.png)
<!-- slide -->
![FEATURED badge overlaps "is never" in Dave Pfeiffer's quote](/Users/anu/.gemini/antigravity/brain/9e249e04-8d34-4061-9613-270be8bc7321/mobile_audit_3600px_1772176351344.png)
````

#### 2. **Large background date typography overlaps section titles** (~1800px, ~4800px, ~6600px)
The decorative background dates (e.g., "2022 — 2025", "NOV / 2025", "2012 — 2022") are oversized for mobile and visually clash with the foreground section titles.

````carousel
![2022-2025 background date overlap](/Users/anu/.gemini/antigravity/brain/9e249e04-8d34-4061-9613-270be8bc7321/mobile_audit_1800px_1772176340321.png)
<!-- slide -->
![NOV/2025 background date overlap](/Users/anu/.gemini/antigravity/brain/9e249e04-8d34-4061-9613-270be8bc7321/mobile_audit_4800px_1772176361737.png)
<!-- slide -->
![2012-2022 background date overlap](/Users/anu/.gemini/antigravity/brain/9e249e04-8d34-4061-9613-270be8bc7321/mobile_audit_6600px_1772176375061.png)
````

#### 3. **ML Functions tile — only 2 of 3 circles visible** (~2400px)
The ML Functions tile's "DATA PREP / TRAIN / EVALUATE" circles are cut off — only 2 of 3 are visible on mobile.

![ML Functions tile cut off](/Users/anu/.gemini/antigravity/brain/9e249e04-8d34-4061-9613-270be8bc7321/mobile_audit_2400px_1772176341647.png)

---

## Recommended Fix Priority
1. **FEATURED badge** — Quick CSS fix (reposition or hide on mobile)
2. **Background date typography** — Scale down `font-size` on mobile breakpoint
3. **ML Functions circles** — Scale down or adjust layout for narrow viewports
