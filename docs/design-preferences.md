# Anu's Design Preferences

> This file captures Anu's explicit preferences for transitions, animations, typography, and design patterns across the portfolio. Always check this file before implementing visual changes.

---

## Transitions

- **NO crossfades.** Use **blur-to-focus** (element entering) and **focus-to-blur** (element leaving) instead.
- Every transition between content sections should follow the blur ↔ focus pattern.
- This applies to: scroll-based reveals, timed animations, beat transitions, page transitions.

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
