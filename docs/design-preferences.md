# Anu's Design Preferences

> This file captures Anu's explicit preferences for AI orchestration, vibe coding workflow, transitions, animations, typography, and design patterns across the portfolio. Always check this file before implementing changes.

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
- **Blur values should be high** (40-60px) so blurred elements are truly invisible on dark backgrounds — no ghostly shapes leaking through.

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

- Chair philosophy should be a **timed animation on load** (4-5 seconds), not a scroll-based reveal.
- Recruiter should see "Hi, I'm Anuja" within **5 seconds of landing**.
- Hero height should be minimal — no excessive scroll distance before real content.

## Code Quality

- **No patchwork.** If incremental edits make code messy, do a clean rewrite of the whole file.
- **Rewrite over patch** when more than 3 edits are needed on the same file.
- Code should be readable and well-structured at all times — not a stack of fixes on top of fixes.

