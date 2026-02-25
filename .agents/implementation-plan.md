# Portfolio Simplification — Implementation Plan

## New Page Flow

### 1. Hero Scroll (DONE)
- Chair philosophy → Bio → CTAs with glow/sweep animations
- 300vh sticky scroll

### 2. CSG Block — `Senior Product Designer at Cloud Software Group — 2022–2025`
- Bento grid layout: ML/DSML stacked left (35%) | RC right (65%)
- Tile titles:
  - RC: "Customer retention success for Enterprise Scheduling"
  - ML: "Feature adoption/simplification for Machine Learning workflows"
  - DSML: "AI powered HUB to meet business needs"
- Each tile: rounded corners, video on hover with play button overlay
- Videos: rc-prototype-walkthrough.mp4, ml-prototype-walkthrough.mp4, iq-prototype-walkthrough.mp4
- Images: existing case study covers
- Scroll-triggered entrance (stagger tiles, fade up)
- Click → navigate to case study page

### 3. Social Testimonials
- All CSG testimonials
- Vijay + Dave highlighted as primary
- Scroll-triggered stagger entrance

### 4. Vibe Coding — `Vibe Coding & Code Prototyping Demos`
- 3 tiles in a row
  - Tile 1: "My Portfolio" → lightbox with orchestration stack + evolution log carousel
  - Tile 2: "WordU" → existing game lightbox
  - Tile 3: "College OS" → shell/placeholder for now
- Scroll-triggered entrance

### 5. Extended Portfolio — `2012–2022`
- Apple-style horizontal carousel with snap scroll
- 6 tiles, 2 per viewport/slide
- Tiles: Kedazzle, Infinite Analytics, Travel Portal, CRBS, WordU (archive), Early Graphic Design
- Dot indicators, subtle parallax
- Scroll-triggered entrance

### 6. Footer / Let's Talk
- "I design so I can be part of making people's lives a little easier every day." (DONE)
- Contact links + social pills

## What Gets Removed
- CinematicTimeline component (from page.tsx import)
- SecondaryCaseStudies (no longer used)
- Life Context milestones from home page
- Origin Story / Foundation → ME page

## Files to Create
- `/src/components/home/CSGBlock.tsx` — CSG bento grid
- `/src/components/home/TestimonialsBlock.tsx` — Social proof section
- `/src/components/home/VibeCodingBlock.tsx` — Vibe coding demos
- `/src/components/home/ExtendedPortfolio.tsx` — Apple carousel
- `/src/components/home/PortfolioLightbox.tsx` — Evolution log lightbox

## Files to Modify
- `/src/app/page.tsx` — Replace CinematicTimeline with new sections
- `/src/components/home/TalkSection.tsx` — Already updated

## Data Sources
- EVOLUTION_VERSIONS from me/page.tsx → extract to shared data file
- ORCHESTRATION_STACK from me/page.tsx → extract to shared data file
- Testimonials from career-data.ts
- Work items from career-data.ts
- Archive items from career-data.ts
