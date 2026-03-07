# Awwwards Launch Plan

> **Goal:** SOTD / SOTM submission-ready
> **Target Score:** 9–9.5 / 10
> **Status:** Live at anujaharsha.com — functional, but not submission-ready yet
> **Estimated Timeline:** 5–7 working sessions

---

## Is it ready to go live?

**Yes — as a portfolio.** It's deployed, fast, accessible, and visually strong. You can share the link with recruiters right now.

**No — for Awwwards submission.** The items below represent the gap between "good portfolio" and "award-winning portfolio." The biggest gaps are content voice (ML/DSML stories) and the creativity push (WebGL moments).

---

## Phase 1: Content Voice (Days 1–2)

_The jury reads your case studies. Voice is everything._

### 1.1 ML Functions — Story in Voice ✅
- [x] Rewrite ML story narrative using your authentic voice
- [x] Use the ML Story Discovery questions from the career brand KI
- [x] Apply the Dad Test — would your dad understand the stakes?
- [x] Key sections: the "aha" moment, the constraint that shaped the design, the human impact

### 1.2 ML Functions — Beats in Voice ✅
- [x] Rewrite StoryDeck presentation beats (slides 1–N)
- [x] Each beat = one clear decision + one visual proof
- [x] Trim to essentials — Awwwards judges skim

### 1.3 DSML / IQ Hub — Story in Voice
- [x] Updated to co-creation narrative (team concept, my architecture)
- [x] Removed "invented" language — honest attribution
- [x] Fixed +25% NLQ attribution (redesign + Phi-3 upgrade, not IQ Plugin)
- [x] Added culmination framing (bringing NLQ/ML/Insights work front and center)
- [ ] Focus on the "nobody knew it existed" angle — it's your strongest hook
- [ ] Decision-level storytelling: what you chose, why, what happened

### 1.4 DSML / IQ Hub — Beats in Voice
- [x] Updated Beat 2 (Spark) — team co-creation, not sole invention
- [x] Updated Beat 3 (Modernize) narration — culmination framing
- [x] Updated Beat 4 (Architecture) narration — "pushed for things never done"
- [x] Updated Beat 8 (Impact) — correct +25% attribution
- [ ] Emphasize the adoption problem → solution arc

---

## Phase 2: Trailers (Day 2–3)

_First impression for case studies. 15–30 second auto-playing cinematic loops._

### 2.1 ML Functions Trailer
- [ ] Record/create walkthrough video of ML prototype
- [ ] Convert to mp4 (CRF 20), upload to S3/CloudFront
- [ ] Wire into MLTrailer.tsx (or create equivalent to RCTrailer.tsx)
- [ ] Ensure auto-play, loop, muted, inline on mobile

### 2.2 DSML / IQ Hub Trailer
- [ ] Same process — walkthrough video
- [ ] Convert, upload, wire into component
- [ ] Match the cinematic quality of the RC trailer

---

## Phase 3: Design System Consolidation (Day 3–4) ✅

_40+ text colors → lean tokenized set. Pristine, no drift._

### 3.1 Define the Final Color System ✅
- [x] Semantic accent palette consolidated: 13 variants → 8 hues (one per hue)
- [x] Status colors removed (0 usage)
- [x] Content widths removed (0 usage)
- [x] Border tokens consolidated (6 → 3)
- [x] Border radius tokens removed (Tailwind defaults)
- [x] Gray/neutral palette overrides removed
- [x] tokens.css: 352 → 303 lines
- [x] tailwind.config.ts: 238 → 179 lines

### 3.2 Migration ✅
- [x] 76 component references migrated to consolidated token names
- [x] All wireframe animations converted from hardcoded hex to token RGB values
- [x] Wireframe component refactored to reusable `useWireframePhases` hook

### 3.3 Verification ✅
- [x] Build passes (`npx next build`)
- [x] No-drift rule added to `design-preferences.md`

---

## Phase 4: College OS & Brain Quiz (Day 4)

### 4.1 College OS (External App)
- [ ] Verify the app is running and accessible at its URL
- [ ] Test the core flow: adding colleges, tracking apps, AI features
- [ ] Ensure the link from the portfolio opens correctly
- [ ] Test on mobile — responsive layout

### 4.2 Brain Quiz (Portfolio Experience) ✅
- [x] Test full quiz flow (all paths) — **user verified working**
- [x] Verify gear interactions work on desktop + mobile
- [x] Check bottom sheet content renders correctly
- [x] Confirm navigation back to portfolio works

---

## Phase 5: Final Code Cleanup & Performance (Day 5)

### 5.1 Code Cleanup
- [ ] Remove any remaining dead imports
- [ ] Verify no eslint warnings (address StoryDeck.tsx useEffect dep)
- [ ] Run `npx next lint` — fix all warnings

### 5.2 Performance Audit
- [ ] Run Lighthouse on deployed site (target: 95+ performance)
- [ ] Verify LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Check bundle size — target < 200KB first load JS
- [ ] Verify all images serve WebP/AVIF via Next Image
- [ ] Verify videos stream from CloudFront (no local fallbacks)

### 5.3 SEO Final Check
- [x] Structured data (JSON-LD) renders correctly (website, person, article, caseStudy schemas)
- [ ] Test OG images on social preview tools
- [ ] Verify sitemap.xml and robots.txt are correct

### 5.4 Accessibility Final Check
- [x] Focus-visible styles
- [x] `prefers-reduced-motion` — CSS kill-switch + Framer Motion `ReducedMotionProvider`
- [ ] Tab through entire site — focus ring visible everywhere
- [ ] Screen reader test (VoiceOver on Mac)
- [ ] Verify all interactive elements have labels

---

## Phase 7: Creativity Push — The 9+ Gap (Days 6–8)

_This is the difference between "beautifully executed" and "I've never seen this before."_

### 7.1 WebGL / Three.js — Strategic Moments
Pick 1-2. Don't do all three.

**Option A: 3D Brain Gears**
- [ ] Convert the flat SVG brain gears to a 3D Three.js scene
- [ ] Parallax depth on scroll, gears rotate in 3D space
- [ ] Light rays through the gear teeth
- [ ] Particle system when gears "activate"

**Option B: Case Study Portal Transition**
- [ ] When clicking into a case study, pull through a portal
- [ ] Tunnel/warp effect using GLSL shader or Three.js plane distortion
- [ ] 0.8s transition, each case study theme tints the tunnel

**Option C: Hero Particle Field**
- [ ] Replace or overlay the hero with a reactive particle field (Three.js Points)
- [ ] Particles respond to mouse movement (magnetic repulsion)
- [ ] Particles form your name / "PRODUCT DESIGNER" then scatter
- [ ] Subtle, dark, cinematic — not a screensaver

### 7.2 Custom Cursor ✅
- [x] Custom cursor component (gear spin, blend mode)
- [x] Cursor morphs on interactive elements
- [x] Disappear cursor on scroll (content focus)
- [x] Fall back to native on touch devices

### 7.3 Scroll Paradigm Innovation
Pick 1.

**Option A: Horizontal Case Study Gallery**
- [ ] Case study section scrolls horizontally while page scrolls vertically
- [ ] Each card fills viewport, snaps into place
- [ ] Parallax layers inside each card

**Option B: Depth Scroll on ME Page**
- [ ] Z-axis scroll effect where content layers move at different depths
- [ ] Use perspective + translateZ on scroll progress

**Option C: Cinematic Section Reveals**
- [ ] Masked wipes (reveal left-to-right through gradient mask)
- [ ] Scale-from-center with blur (camera focusing)
- [ ] Clip-path animations (circle-reveal from cursor position)
- [ ] Different reveal for each major section

### 7.4 Micro-Details That Judges Notice
- [x] Page load: meaningful loading sequence (LoadingScreen.tsx)
- [ ] Smooth page transitions between routes (shared layout animations)
- [ ] Scroll-linked progress indicator that's visually interesting
- [ ] Easter egg somewhere
- [ ] Sound design — optional subtle audio on key interactions (muted by default)

---

## Phase 8: Awwwards Submission (Day 8–9)

### 8.1 Pre-Submit
- [ ] Deploy final build (`build-and-deploy.sh`)
- [ ] CloudFront cache invalidation
- [ ] Test live site one more time
- [ ] Take screenshots for submission (desktop + mobile)

### 8.2 Submission Checklist
- [ ] Project URL
- [ ] Short description (2-3 sentences)
- [ ] Category selection (Portfolio)
- [ ] Technology stack description
- [ ] Screenshots (desktop hero, case study, mobile)
- [ ] Pay submission fee ($49 SOTD / $99 SOTD+Dev)

---

## Non-Blocking (Do Anytime)

### 🎬 New Intro Video
- [ ] Script the new intro
- [ ] Record and edit
- [ ] Convert to mp4, upload to S3
- [ ] Replace CloudFront URL in ME page

_Won't block submission — current video works fine_

---

## What's Already Done ✅

- [x] H1 hierarchy fixed (all pages 1 h1)
- [x] Metadata complete (OG, Twitter, canonical on all pages)
- [x] Alt text on all images
- [x] ViewModeToggle aria-labels
- [x] Focus-visible styles
- [x] `prefers-reduced-motion` support (CSS + Framer Motion ReducedMotionProvider)
- [x] Print stylesheet
- [x] Semantic footer element
- [x] Skip-to-content link
- [x] Structured data (JSON-LD)
- [x] Dead code removal (~83 files)
- [x] Dynamic imports (lazy loading)
- [x] Videos on CloudFront (high quality)
- [x] Design system doc + visual page
- [x] Token cleanup — 40+ → lean set, 13 semantic → 8 hues, hardcoded hex eliminated
- [x] Wireframe animations refactored — reusable hook + token-based colors
- [x] Contrast fixes on ME page
- [x] RC trailer working
- [x] RC story in voice
- [x] Custom cursor (gear spin, scroll-fade, native suppression)
- [x] Figma Config pitch video integrated into RC case study
- [x] Brain Quiz verified working
- [x] No-hardcoded-colors rule in design-preferences.md
- [x] DSML case study — co-creation narrative, correct +25% attribution
- [x] DSML case study — Act restructuring (YouTube tiles in Act 1, walkthrough in Act 4)
- [x] DSML case study — design iteration flow fixed (V1→V2→V3→V4)
- [x] DSML case study — EyebrowLabel visibility increased
- [x] DSML case study — "Continue Exploring" = Extended Portfolio + About Me (no RC/ML)
- [x] DSML case study — removed Insights Color Palette image
- [x] DSML movie beats narration updated (co-creation + attribution)
- [x] docs/case-study-narratives.md — updated IQ origin story
