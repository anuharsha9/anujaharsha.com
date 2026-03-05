# Awwwards Launch Plan

> **Goal:** SOTD / SOTM submission-ready  
> **Target Score:** 9–9.5 / 10  
> **Status:** Live at anujaharsha.com — functional, but not submission-ready yet  
> **Estimated Timeline:** 5–7 working sessions

---

## Is it ready to go live?

**Yes — as a portfolio.** It's deployed, fast, accessible, and visually strong. You can share the link with recruiters right now.

**No — for Awwwards submission.** The items below represent the gap between "good portfolio" and "award-winning portfolio." The biggest gaps are content voice (ML/DSML stories) and design system consistency (40+ text colors → 7).

---

## Phase 1: Content Voice (Days 1–2)
> *The jury reads your case studies. Voice is everything.*

### 1.1 ML Functions — Story in Voice
- [ ] Rewrite ML story narrative using your authentic voice
- [ ] Use the ML Story Discovery questions from the career brand KI
- [ ] Apply the Dad Test — would your dad understand the stakes?
- [ ] Key sections: the "aha" moment, the constraint that shaped the design, the human impact

### 1.2 ML Functions — Beats in Voice  
- [ ] Rewrite StoryDeck presentation beats (slides 1–N)
- [ ] Each beat = one clear decision + one visual proof
- [ ] Trim to essentials — Awwwards judges skim

### 1.3 DSML / IQ Hub — Story in Voice
- [ ] Same process as ML: authentic narrative, not corporate
- [ ] Focus on the "nobody knew it existed" angle — it's your strongest hook
- [ ] Decision-level storytelling: what you chose, why, what happened

### 1.4 DSML / IQ Hub — Beats in Voice
- [ ] Rewrite StoryDeck beats
- [ ] Emphasize the adoption problem → solution arc

---

## Phase 2: Trailers (Day 2–3)
> *First impression for case studies. 15–30 second auto-playing cinematic loops.*

### 2.1 ML Functions Trailer
- [ ] Record/create walkthrough video of ML prototype
- [ ] Convert to mp4 (CRF 20), upload to S3/CloudFront
- [ ] Wire into `MLTrailer.tsx` (or create equivalent to `RCTrailer.tsx`)
- [ ] Ensure auto-play, loop, muted, inline on mobile

### 2.2 DSML / IQ Hub Trailer
- [ ] Same process — walkthrough video
- [ ] Convert, upload, wire into component
- [ ] Match the cinematic quality of the RC trailer

---

## Phase 3: Design System Consolidation (Day 3–4)
> *40+ text colors → 7. Pristine, tokenized, no drift.*

### 3.1 Define the Final Text Color System

| Role | Token | Approximate Value | Replaces |
|---|---|---|---|
| `--text-heading` | `#f4f4f5` | white/95 | `text-white`, `text-zinc-100-200`, `text-white/80-95` |
| `--text-body` | `#a1a1aa` | white/65 | `text-zinc-400`, `text-white/60-70`, `text-slate-300-400` |
| `--text-muted` | `#8b8b95` | white/55 | `text-zinc-500`, `text-white/50`, `text-slate-500` |
| `--text-dim` | `#62626c` | white/40 | `text-zinc-600`, `text-white/30-40`, `text-slate-600` |
| `--text-ghost` | `#3f3f46` | white/20 | `text-white/10-25`, `text-zinc-700-800` |
| `--accent-teal` | `#078B9C` | — | Accent text |
| `--cs-accent` | per theme | — | Case study accent |

### 3.2 Migration Plan (file by file)

- [ ] **Landing page components** (~15 files, ~200 replacements)
  - `HeroLanding.tsx`, `CSGBlock.tsx`, `FoundationBlock.tsx`, `TestimonialsBlock.tsx`
  - `VibeCodingBlock.tsx`, `ExtendedPortfolio.tsx`, `LifeContextStrip.tsx`
  - `RCTrailer.tsx`, `TalkSection.tsx`, `GearBottomSheet.tsx`
  - `ImmersiveBrainExperience.tsx`, `PortfolioLightbox.tsx`
- [ ] **ME page** (~60 replacements)
- [ ] **Case study components** (~80 replacements)
  - `CinematicCaseStudy.tsx`, `StoryDeck.tsx`, `ViewModeToggle.tsx`
  - `BentoGrid.tsx`, storyboard beats
- [ ] **Layout & shared** (~30 replacements)
  - `SiteHeader.tsx`, `MobileMenu.tsx`, `PageShell.tsx`
  - `CaseStudiesDropdown.tsx`, `LoadingScreen.tsx`
- [ ] **WordU components** — skip (separate light theme)
- [ ] **Design system page** — update to reflect final 7 colors

### 3.3 Verification
- [ ] Build passes (`npx next build`)
- [ ] Visual diff — screenshot each page before/after
- [ ] Run contrast audit (`scripts/screenshot-audit.mjs`)

---

## Phase 4: College OS & Brain Quiz (Day 4)
> *Two separate experiences. Both need to work flawlessly.*

### 4.1 College OS (External App)
College OS is a separate AI-powered college application tracker (Next.js + Gemini). It's linked from the Vibe Coding block and the case studies dropdown.

- [ ] Verify the app is running and accessible at its URL
- [ ] Test the core flow: adding colleges, tracking apps, AI features
- [ ] Ensure the link from the portfolio opens correctly
- [ ] Check `NEXT_PUBLIC_COLLEGE_OS_URL` env var is set for production
- [ ] Test on mobile — responsive layout

### 4.2 Brain Quiz (Portfolio Experience)
The brain/gear quiz at `/quiz` — the interactive portfolio entry experience.

- [ ] Test full quiz flow (all paths)
- [ ] Verify gear interactions work on desktop + mobile
- [ ] Check bottom sheet content renders correctly
- [ ] Confirm navigation back to portfolio works
- [ ] Test on Safari, Chrome, Firefox

---

## Phase 5: Final Code Cleanup & Performance (Day 5)
> *The technical score. Judges check PageSpeed, Lighthouse, source hygiene.*

### 5.1 Code Cleanup
- [ ] Remove any remaining dead imports
- [ ] Verify no eslint warnings (address `StoryDeck.tsx` useEffect dep)
- [ ] Run `npx next lint` — fix all warnings
- [ ] Verify `motion.ts` exports are used or remove dead ones

### 5.2 Performance Audit
- [ ] Run Lighthouse on deployed site (target: 95+ performance)
- [ ] Verify LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Check bundle size — target < 200KB first load JS
- [ ] Verify all images serve WebP/AVIF via Next Image
- [ ] Verify videos stream from CloudFront (no local fallbacks)

### 5.3 SEO Final Check
- [ ] Run `screenshot-audit.mjs` — all pages green
- [ ] Verify structured data (JSON-LD) renders correctly
- [ ] Test OG images on social preview tools
- [ ] Verify sitemap.xml and robots.txt are correct

### 5.4 Accessibility Final Check
- [ ] Tab through entire site — focus ring visible everywhere
- [ ] Screen reader test (VoiceOver on Mac)
- [ ] Verify all interactive elements have labels
- [ ] `prefers-reduced-motion` — verify animations stop

---

## Phase 7: Creativity Push — The 9+ Gap (Days 6–8)
> *This is the difference between "beautifully executed" and "I've never seen this before."*
> *The goal: make 3 judges say "wow" out loud.*

### 7.1 WebGL / Three.js — Strategic Moments
Don't rebuild the whole site in 3D. Add Three.js to **2–3 key moments** where it creates genuine awe:

**Option A: 3D Brain Gears**
- [ ] Convert the flat SVG brain gears to a 3D Three.js scene
- [ ] Parallax depth on scroll, gears rotate in 3D space
- [ ] Light rays through the gear teeth
- [ ] Particle system when gears "activate"
- [ ] This already has the interaction model — adding depth transforms it

**Option B: Case Study Portal Transition**
- [ ] When clicking into a case study, the page doesn't just scroll — it *pulls you through a portal*
- [ ] Tunnel/warp effect using a GLSL shader or Three.js plane distortion
- [ ] 0.8s transition that feels like entering a different world
- [ ] Each case study theme tints the tunnel (teal/cyan/violet)

**Option C: Hero Particle Field**
- [ ] Replace or overlay the hero with a reactive particle field (Three.js Points)
- [ ] Particles respond to mouse movement (magnetic repulsion)
- [ ] Particles form your name / "PRODUCT DESIGNER" then scatter
- [ ] Subtle, dark, cinematic — not a screensaver

*Pick 1-2. Don't do all three — restraint is what separates premium from circus.*

### 7.2 Custom Cursor
Quick but high-impact. Every 9+ site has one.

- [ ] Create a custom cursor component (blend mode difference, or soft glow)
- [ ] Cursor morphs on interactive elements (grows on buttons, turns to arrow on links)
- [ ] Magnetic snap near CTAs (you already have the `<Magnetic>` component)
- [ ] Disappear cursor on scroll (content focus)
- [ ] Fall back to native on touch devices
- [ ] Implementation: `requestAnimationFrame` + CSS `mix-blend-mode: difference`

### 7.3 Scroll Paradigm Innovation
You don't need to abandon vertical scroll. But add **one moment** that breaks the pattern:

**Option A: Horizontal Case Study Gallery**
- [ ] The case study section scrolls horizontally while the page scrolls vertically
- [ ] Each card fills the viewport, snaps into place
- [ ] Parallax layers inside each card (title moves at different speed than image)
- [ ] This is a proven pattern (Apple does it) but feels novel in a portfolio

**Option B: Depth Scroll on ME Page**
- [ ] Z-axis scroll effect where content layers move at different depths
- [ ] Text comes forward, images recede, creating a parallax depth field
- [ ] Use `perspective` + `translateZ` on scroll progress

**Option C: Cinematic Section Reveals**
- [ ] Instead of fade-up-on-scroll (standard), sections reveal through:
  - Masked wipes (reveal left-to-right through a gradient mask)
  - Scale-from-center with blur (like a camera focusing)
  - Clip-path animations (circle-reveal from cursor position)
- [ ] Different reveal for each major section = surprise at every scroll point

*These are CSS-achievable but feel premium because they break the "fade up" monotony.*

### 7.4 Micro-Details That Judges Notice
- [ ] Page load: meaningful loading sequence (not just a spinner)
- [ ] Smooth page transitions between routes (shared layout animations)
- [ ] Scroll-linked progress indicator that's visually interesting
- [ ] Easter egg somewhere (judges love discovering hidden interactions)
- [ ] Sound design — optional subtle audio on key interactions (muted by default)

---

## Phase 8: Awwwards Submission (Day 8–9)
> *The submission itself.*

### 6.1 Pre-Submit
- [ ] Deploy final build (`build-and-deploy.sh`)
- [ ] CloudFront cache invalidation
- [ ] Test live site one more time
- [ ] Take screenshots for submission (desktop + mobile)

### 6.2 Submission Checklist
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
- *Won't block submission — current video works fine*

---

## Progress Tracker

| # | Item | Priority | Status |
|---|---|---|---|
| 1 | ML story — in voice | 🔴 Critical | ⬜ Not started |
| 2 | ML beats — in voice | 🔴 Critical | ⬜ Not started |
| 3 | DSML story — in voice | 🔴 Critical | ⬜ Not started |
| 4 | DSML beats — in voice | 🔴 Critical | ⬜ Not started |
| 5 | ML trailer | 🟡 Important | ⬜ Not started |
| 6 | DSML trailer | 🟡 Important | ⬜ Not started |
| 7 | Text color cleanup (40→7) | 🟡 Important | ⬜ Not started |
| 8 | Design system simplification | 🟡 Important | 🟢 Tokens cleaned |
| 9 | Final code cleanup | 🟡 Important | ⬜ Not started |
| 10 | Performance test | 🟡 Important | ⬜ Not started |
| 11 | College OS — working properly | 🟡 Important | ⬜ Not started |
| 12 | Brain Quiz — working properly | 🟡 Important | ⬜ Not started |
| 13 | WebGL/Three.js moments (1-2) | 🔴 Critical for 9+ | ⬜ Not started |
| 14 | Custom cursor | 🟡 Important for 9+ | ⬜ Not started |
| 15 | Scroll paradigm innovation | 🟡 Important for 9+ | ⬜ Not started |
| 16 | New intro video | 🟢 Nice to have | ⬜ Not started |
| 17 | Awwwards submission | — | ⬜ Blocked by 1–15 |

---

## What's Already Done ✅

- [x] H1 hierarchy fixed (all pages 1 h1)
- [x] Metadata complete (OG, Twitter, canonical on all pages)
- [x] Alt text on all images
- [x] ViewModeToggle aria-labels
- [x] Focus-visible styles
- [x] `prefers-reduced-motion` support
- [x] Print stylesheet
- [x] Semantic footer element
- [x] Skip-to-content link
- [x] Structured data (JSON-LD)
- [x] Dead code removal (~83 files)
- [x] Dynamic imports (lazy loading)
- [x] Videos on CloudFront (high quality)
- [x] Design system doc + visual page
- [x] Token cleanup (dead aliases removed)
- [x] Hardcoded hex replaced with tokens
- [x] Contrast fixes on ME page
- [x] RC trailer working
- [x] RC story in voice ✅
