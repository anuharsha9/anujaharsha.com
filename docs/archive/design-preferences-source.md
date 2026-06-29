# Anu's Design Preferences

> This file captures Anu's explicit preferences for AI orchestration, vibe coding workflow, transitions, animations, typography, and design patterns across the portfolio. Always check this file before implementing changes.

---

## Core Experience Metaphor: The Ocean Boat

> "I want the user to feel like they're floating on a boat in the ocean."

- The **fixed aurora background** is the ocean — always present, always alive, never scrolling
- **Content zones** are what you see from the boat — they drift into view through blur, hold steady so you can observe them, then blur away as new scenery appears
- The experience is **serene, continuous, and breathing** — not snappy or jarring
- This metaphor guides every scroll interaction, transition, and layout decision

## AI Orchestration & Workflow

- **Plan before execute.** For any creative, structural, or visual change — present a plan and get Anu's approval BEFORE writing code.
- **Always reference this file.** Check design-preferences.md before implementing visual or architectural decisions.
- **No surprises.** Don't install dependencies, restructure components, or make design decisions without confirmation.
- **Use artifacts for reference docs.** Plans, audits, and reference documents should be created as Antigravity artifacts (rich formatted, easier to read). Also save them in the project's `docs/artifacts/` folder so they persist across conversations and don't get lost.
- **Document everything.** Every significant piece of work (audits, plans, decisions, refactors) should be documented as an artifact. This builds a history of what was done and why.

---

## Design System

- **NO hardcoded colors.** Every color must use a CSS variable from `tokens.css`. No hex values, no Tailwind default palette colors (e.g. `text-red-500`) — only the semantic tokens (`--semantic-rose`, `--accent-teal`, `text-zinc-*`, etc.).
- **ONE color per hue.** The semantic palette is: emerald, blue, rose, orange, purple, cyan, pink, navy. No duplicates.
- **Main site palette:** Black, white, shades of zinc grey, and teal accent. Semantic colors are for **animations and data visualization only**.



## Transitions

- **NO crossfades or opacity fades.** Never use `opacity: 0 → 1` or `opacity: 1 → 0` as a transition effect. Not on the hero, not on scroll reveals, not anywhere.
- Use **blur-to-focus** (element entering) and **focus-to-blur** (element leaving) instead.
- Every transition between content sections should follow the blur ↔ focus pattern.
- This applies to: scroll-based reveals, timed animations, beat transitions, page transitions.
- **Blur values:** Hero = 20px (desktop) / 14px (mobile). All other zones = 14px (desktop) / 10px (mobile).
- **Focus plateau:** Content stays sharp for ~76% of its scroll distance (desktop) / ~80% (mobile). The user must be able to READ the content before it blurs away.
- **Bidirectional:** Scrolling up re-focuses content. The page is alive — not a one-time animation.
- **Watermark timing:** Ghosted watermark text ("2022 — 2025", "SOCIAL PROOF") resolves at 2× speed — appears before zone content sharpens.
- **Zone overlap:** As outgoing content is ~90% blurred, incoming content starts focusing. Creates a "content morphs through blur" effect.

---

## Wave Design Language

- **ONE universal fixed background** across the entire portfolio: dark bg + HeroAurora canvas, sized to `100vw × 100vh`, `position: fixed`.
- **The aurora never moves.** Content scrolls over it like scenery passing a boat.
- **Content has NO opaque backgrounds** — everything is transparent so the aurora shows through.
- **6 landing page zones**, each wrapped in a `BlurZone` with scroll-driven blur + parallax.
- **Subtle parallax** on all zones: content gently translates 30px (desktop) / 16px (mobile) as it scrolls.
- **The same wave language extends to case study pages and /me page** for visual continuity.
- **Aurora micro-interactions**: border shimmer on cards, teal glow on hover, breathing opacity on static elements.

## Particles / WebGL Effects

- **Flat dots only.** No glow, no soft falloff, no additive blending. Hard-edged circles.
- Colors: **accent teal + white** mix from the design system. No other colors.
- Particles that form shapes should use **spring physics** (velocity + damping), not linear interpolation.
- Once formed, particles should **freeze** — no ambient drift, no oscillation, no re-scatter.

## Trailer / Movie

- Trailer should be **one continuous motion graphics piece**, not separate beats with cuts.
- Trailer language must pass the **"dad test"** — a layperson should understand the context without industry jargon.
- Trailer should also speak to **recruiters and design leaders** — show strategic thinking, not just UI work.
- **No duplicate information** — if the visual shows it, the narration shouldn't repeat it.
- **No AI-written copy** in place of Anu's voice. If raw voice isn't available yet, prefer visuals-only over fake narration.
- CTA at end of trailer: **"Watch the full animated case study deck"** (not "read the case study").

## Typography & Copy

- Use Anu's **raw voice** for narration and case study storytelling. See `/copy-and-tone` workflow for tone preferences.
- No redundant headings (e.g., signal pill + beat label saying the same thing).

## Visual Scale

- Beat visuals / trailer visuals should **fill the viewport** — avoid tiny centered content with massive empty space.
- Use generous sizing for key visual moments.

## Case Study Architecture

- **Trailer** (landing page) → hooks into **Full Beats** (animated presentation deck) → **Case Study** (optional deep dive).
- The beats ARE the primary experience. Case study is supplementary.

## Hero / Landing

- Hero loads on page load with its current entrance animation. **No scroll required to see the hero.**
- The hero's dark bg + aurora ARE the universal fixed background (same component, just placed in the fixed layer).
- On scroll, the hero blurs out like any other zone — it's Zone 1 of 6.
- Scroll back up = hero re-focuses. The page is alive.
- Recruiter should see "Hi, I'm Anuja" within **5 seconds of landing**.
- "LET'S TALK" nav link = **instant jump** to footer (Zone 6), no scroll-through.

## Code Quality

- **No patchwork.** If incremental edits make code messy, do a clean rewrite of the whole file.
- **Rewrite over patch** when more than 3 edits are needed on the same file.
- Code should be readable and well-structured at all times — not a stack of fixes on top of fixes.

---

## Locked Experiences — DO NOT TOUCH

These components are finalized and must **never be modified, refactored, or restructured**:

- **Brain SVG experience** — the interactive brain/neural network triggered by "EXPLORE MY MIND". Code is locked.
- **HeroAurora component** — the Canvas 2D aurora rendering code (curtain config, draw loop, rendering logic). It can be *placed* in different containers (hero vs fixed background), but its internal code stays identical.
- **Case study trailer animations** — RCTrailer, MLTrailer, DSMLTrailer. Internal code is locked.

