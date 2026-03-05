# CinematicCaseStudy Refactor Plan

## Goal
Make `CinematicCaseStudy` a fully reusable component. Zero hardcoded content. Everything prop-driven. Design tokens via `data-cs-theme`.

## Design Tokens ✅ DONE
- Added `--cs-accent`, `--cs-accent-bright`, `--cs-accent-soft`, `--cs-accent-rgb` defaults in `:root`
- Added derived tokens: `--cs-accent-glow`, `--cs-accent-border`, `--cs-accent-surface`, `--cs-bg-radial`
- Theme overrides: `[data-cs-theme="rc|ml|dsml|wordu"]`

## Phase 2: Refactor CinematicCaseStudy Props

### New Props Interface
```tsx
interface CinematicCaseStudyProps {
  data: CaseStudyData              // existing — hero title, role, etc.
  slides: StorySlide[]             // presentation mode slides
  theme: 'rc' | 'ml' | 'dsml' | 'wordu'  // maps to data-cs-theme
  heroStats: HeroStat[]            // the 3 stats in hero
  actSections?: ActSection[]       // scroll nav dots (optional, full view only)
  children?: ReactNode             // full view content (Acts)
}
```

### What changes:
1. Replace ALL `var(--accent-teal)` → `var(--cs-accent)` in the component
2. Replace `var(--overlay-accent-08)` → `var(--cs-bg-radial)`
3. Hero stats (15M+, 5→1, timeline) → from `heroStats` prop
4. `presentationSlides` → from `slides` prop
5. `ACT_SECTIONS` → from `actSections` prop
6. Full view content (Acts I-VI) → from `children` prop
7. Wrap in `<div data-cs-theme={theme}>` for CSS token scoping

### What stays the same:
- Hero section structure (title, role, scope tags, cover image — all from `data`)
- ViewModeToggle
- StoryDeck carousel
- Background effects (orbs, scanlines, noise)
- Scroll progress dots behavior

## Phase 3: Extract RC Content
- Move RC's `presentationSlides` array to a new file or inline in the page
- Move RC's Acts I-VI full view content to `RCFullContent.tsx`

## Phase 4: Port ML & DSML
- ML page: import ML_MOVIE_BEATS, convert to slides, use CinematicCaseStudy
- DSML page: import DSML_MOVIE_BEATS, convert to slides, use CinematicCaseStudy
- Both get presentation mode only (no full view children yet)
