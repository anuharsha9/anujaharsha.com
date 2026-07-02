# v2 backlog — post-Awwwards-submission

Everything consciously deferred during the July 1, 2026 submission-prep
sessions. Nothing here blocks anything; it's ranked by likely value.
Sources: the day's audit commits (design, a11y, heuristics, graphic-design
craft, code quality).

## Editorial / content
- **Vary the proof per surface.** 17M users / 20M jobs / 250 screens echo
  across hero, CSG tiles, decks, résumé, and Ask Anu. Locally each is right;
  globally there's stat fatigue. Pick one lead stat per surface.
- **"60-sec intro" runs 65s.** Trim ~5s from a manifesto scene or accept the
  rounding. Nobody times it; honesty nit only.

## Design ambition (the "excellent → undeniable" list)
- **A signature display-type moment.** Inter + JetBrains serves credibility
  but adds no typographic signature. One considered display face in one
  place (hero? case-study titles?) could lift the visual-novelty score.
- **Elevate the brain.** It's the site's most original interaction, now with
  a footer door. Once the job hunt ends and the enterprise-first constraint
  loosens, consider giving it front-door prominence again.
- **Miniature wireframe label density.** The 7–9px mono labels inside tile
  wireframes read as texture, not information. Fine, but worth a pass.

## Motion-system consolidation (from the craft audit)
- Stagger rhythms: 5 distinct ratios (0.05–0.22) → standardize on ~2.
- Blur-in entrance values: 10 distinct blur() values → a 3–4 value palette
  as CSS variables.
- whileInView viewport amounts: 0.2/0.25/0.3/0.4 → one default.
- Section vertical padding: 6 values across zones → 2-value rhythm.
- Manifesto Scene3Unified/Scene4Stitch hardcode the cinematic bezier →
  import EASE_EXPO from lib/motion. String eases ("easeInOut", "linear")
  scattered in SectionSkeleton/PhilosophyVisuals/ImageComparisonSlider →
  named constants.

## Token hygiene (from the design-system audit)
- 8 stray hardcoded chrome colors → tokens: HeroLanding #0a0a0f gradient,
  TestimonialsBlock #000 edge mask, PhilosophyVisuals bg trio,
  ThreeBrainGears #2dd4bf ×2, SystemIndex accents + rgb(12,12,20),
  WalkthroughPlayer #08070a, ReadingProgress #fff.
- text-[15px] (16 uses) and text-[13px] (6 uses) → named tokens.
- Canvas RGB literals (HeroAurora, PageTransition): add sync comments
  pointing at the token they mirror.

## UX / a11y polish (from the heuristics audit)
- Corner chips (Work/Life, sound, Resume, Ask Anu) sit at 33–38px touch
  targets — WCAG 2.2 AA pass (24px), Apple 44pt miss. Bump only if the
  corner density constraint ever loosens.
- Ask Anu: optional "question X of Y" indicator per category.
- ErrorBoundary: soft retry (reset state) before window.location.reload().
- Ambient audio fade-in is 3s; first audible moment ~1.5s after click.
  Consider 1.5s fade for tighter perceived response.

## Performance (diminishing returns, revisit with fresh eyes)
- CSGBlock code-splitting: the dynamic() attempt produced a duplicate
  skeleton+section tree on the static export and was reverted (eager is
  correct-and-proven). If the last ~150ms of TBT ever matters, investigate
  a Next-16-native pattern instead.
- The ~3.3MB "unused JS" Lighthouse line is the deck/brain/beat content
  loaded for interactions — a conscious rich-portfolio trade-off.

## Process notes (lessons encoded)
- Never verify through pipes that swallow exit codes (tsc | grep → grep's
  exit wins). Use explicit exit-code checks.
- Perl on UTF-8 prose requires -CSD; without it, multibyte chars on
  modified lines get mangled.
- Background tabs/webviews stall rAF + IntersectionObserver: framer-driven
  UI cannot be visually verified from hidden contexts — DOM geometry can.
- Buttons with visible text get NO aria-label on this site (WCAG 2.5.3);
  overrides only on icon-only controls.
