# Anuja Harsha — Design Philosophy, Preferences & Working Style

> **The single source of truth for how Anuja thinks, designs, and works.**
> Consolidated from `design-preferences.md`, `design-thoughts-anu.md`, `design-system.md`,
> `copy-and-tone.md`, and the assistant's long-term memory of working with her.
> The raw source files now live in `archive/` (`design-preferences-source.md`,
> `design-thoughts-anu-source.md`) — this doc supersedes them.
> If you're an AI agent or collaborator: **read this first.** When a decision isn't covered
> here, ask in plain prose — don't guess, and don't hand over a multiple-choice menu (see §8).

---

## 0. The one-line version

She makes complex systems feel **obvious** — "as obvious as knowing to sit in a chair" — and she
holds the bar at *craft*, not just *function*. Everything below is in service of that.

---

## 1. Identity — who she actually is

> "I don't see myself as a designer-designer. I'm a user experience specialist hiding behind the
> title of Senior Product Designer."

- The title is the industry label. The real work is **obsessing over how humans experience things.**
- 13 years in. Started designing at **16**. At this point UX is **instinct**, not process —
  she *feels* when something is wrong before she can name it.
- She doesn't just design — she **builds**. The full loop: feel the problem → design the
  solution → ship the code (vibe-coding on top of the design instinct).
- **AI-era stance (2026):** "In this world of AI — the human user experience will ALWAYS matter,
  because AI is designed for humans." AI doesn't replace experience design; it *amplifies* it.
  The more powerful the technology, the more the experience layer matters.
- Background that shapes the lens: a B2B / enterprise product designer with **no formal CS
  background** who genuinely wants to understand the systems she directs. Finance-obsessed,
  long-horizon strategic thinker (see her own products: WealthEngine, Pathwise, Sous).

---

## 2. The Chair Philosophy — the core identity

The chair isn't a cute analogy. It's **her definition of UX** and her default lens on the world.

> "When you look at a chair... the only thing that comes to mind is to sit on it."

That's it. The design is so good you don't *think* about the design — you just do the thing.
No instructions. No onboarding. No tutorial. You look, you sit.

**The water-bottle extension:**
> "If the mouth isn't easy to drink — what's the point? And the grip? Too fat to hold, or too
> thin to carry enough water — what's the point?"

Everything in the world is either:
- Designed so well you **don't notice** → you just *use* it, or
- Designed so badly you **can't stop noticing** → frustration.

She lives in this space. A door handle, a water bottle, an enterprise BI tool — all get judged
the same way. The bar is always: **is it as obvious as knowing to sit in a chair?**

The conversational long-form (her raw voice):
> "When you look at a chair... the only thing that comes to mind is to sit on it.
> It's the whole point of creating anything — to achieve that obviousness. No?
> How does one achieve that? By obsessing over how humans experience things.
> Hi, I'm Anuja!"

---

## 3. The 5 Affordance Laws — the chair test, made operational

The chair test, derived into five laws you can name in design review ("that fails law 3").
Bake these **into the design-system primitives** (`Money`, `Stat`, `Surface`, `Badge`, `Button`…)
so obviousness is *structural and inherited for free* — never re-applied screen by screen.

1. **Prominence = importance.** The thing that matters most is unmistakably the biggest /
   highest-elevation. Never make the user hunt for the headline.
2. **State before words.** On-track/off-track, in/out, asset/debt, gain/loss is readable by
   **color + sign + weight** *before* you read the label.
3. **Fact ≠ forecast.** A current balance looks settled and exact; a future projection looks
   uncertain (range/cone, lighter). A forecast must **never** masquerade as a fact. *(This is the
   "real data, no assumptions" honesty principle made visual.)*
4. **Actionable looks actionable.** Tappable / editable / "ask" elements invite the action;
   static info stays quiet.
5. **One element, one job.** No Swiss-army cards.

---

## 4. Aesthetic sensibilities — aurora, ocean, dim light

This is **innate personal taste, not a trend.**

> "I've loved the northern lights for as long as I can imagine. I always try to incorporate
> waves somehow in my design — my love for ocean and dark dim lighting is innate and much preferred."

| Source | What it means in the work |
|---|---|
| **Northern lights (aurora)** | Curtains of light that ripple. Not a glow, not a blob — horizontal bands that drift and breathe. Subtle, alive, ethereal. |
| **Ocean waves** | The movement pattern everywhere in her work. Slow, organic, continuous. Never abrupt. |
| **Dark dim lighting** | Not "dark mode for aesthetic." Genuinely preferred atmosphere — ocean at night, lit from below, barely there. |
| **Teal as the accent** | Not arbitrary: the color of deep ocean + aurora. It *is* the system, not decoration. |

**Intensity = "Whispering Intensity."** The screen is alive, but barely. You're not sure if it's
moving. The base color itself can breathe between pure black and faint navy.

### The Ocean-Boat metaphor (governs every scroll interaction)
> "I want the user to feel like they're floating on a boat in the ocean."

- The **fixed aurora background is the ocean** — always present, always alive, never scrolling.
- **Content zones are the scenery from the boat** — they drift into view through blur, hold steady
  so you can observe them, then blur away as new scenery appears.
- Serene, continuous, breathing — **not snappy or jarring.**

---

## 5. Motion & transition language

Motion is part of the design system, not an afterthought. It is **token-based** (`src/lib/motion.ts`
for JS easings/durations; `--ease-*` / `--duration-*` in `tokens.css`) — never hand-tuned per component.

- **NO crossfades. NO opacity fades.** Never use `opacity 0→1` / `1→0` as a transition. Not on the
  hero, not on scroll reveals, not anywhere.
- **Blur-to-focus** (entering) and **focus-to-blur** (leaving) instead — everywhere: scroll reveals,
  timed animations, beat transitions, page transitions.
- **Bidirectional & alive.** Scrolling up re-focuses content. The page is never a one-time animation.
- **Read before it blurs.** Content stays sharp for ~76% of its scroll distance (desktop) / ~80%
  (mobile). The user must be able to *read* before it dissolves.
- **Zone overlap.** As outgoing content hits ~90% blur, incoming content starts focusing — content
  "morphs through blur."
- **Everything moves like water** — slow dissolves, gentle parallax (~30px desktop / 16px mobile),
  no snaps.
- **Particles / WebGL:** flat hard-edged dots only (no glow, no additive blending). Teal + white only.
  Shape-forming uses spring physics, then **freezes** — no ambient drift or re-scatter.

---

## 6. The design system — tokens are law

> **NO hardcoded values. Ever.** Colors, type, spacing, radii, shadows, easings, durations —
> all come from tokens. This rule is enforced, not aspirational.

- **Source of truth:** `src/styles/tokens.css` (CSS custom properties) → consumed by
  `src/lib/design-system.ts` (JS theme) and `src/lib/motion.ts` (motion presets). A living
  reference page lives at `/design-system`.
- **No hex values, no Tailwind default-palette colors** (`text-red-500` etc.) — only semantic tokens.
- **ONE color per hue.** Semantic palette: emerald, blue, rose, orange, purple, cyan, pink, navy.
  No duplicates.
- **Main-site palette:** black, white, shades of zinc grey, **teal accent.** Semantic colors are for
  **animation and data-viz only** — not UI chrome.
- **Case-study theming** is scoped via `data-cs-theme` (rc=teal, ml=cyan, dsml=violet, wordu=blue).
- **Accessibility is built in:** text tokens carry their WCAG ratio; focus ring is a token
  (`--focus-ring`, teal, 3px) applied globally via `*:focus-visible`; `prefers-reduced-motion` kills
  animation globally. Dark sites need an opaque `html` background or contrast tooling false-positives.
- **Satori/canvas caveat:** OG-image and canvas rendering can't resolve CSS `var()` — keep those
  colors literal (`staticPalette`). CSS `var()` in SVG fill/stroke is unreliable in Safari — leave
  SVG-attribute colors literal too.

*The single-`<Button>`-primitive / no-inline-styles discipline is itself the "pristine codebase"
win — one source of truth, no drift.*

---

## 7. Voice & tone — Apple-style minimalist

Her copy voice is **simple, straightforward, direct, confident — never boastful.**

**Do:**
- Lead with **outcomes and specifics** (numbers, before/after, what shipped).
- Short sentences. Fragments are fine. One idea per line.
- Let typography breathe — **whitespace > word count.**
- Use **her raw voice**, not AI-written filler. If raw voice isn't ready, prefer visuals-only over
  fake narration.

**Avoid:**
- Flowery language ("crafting digital experiences," "passionate about…").
- Filler adjectives (innovative, cutting-edge, world-class).
- Marketing-speak that says nothing. Redundant headings that restate the same idea.

| | |
|---|---|
| **Bad** | "Connecting the structural integrity of code with the emotional resonance of design." |
| **Good** | "I prototype in code because the biggest risk isn't in the visuals — it's in the logic." |
| **Bad** | "Passionate Designer creating human-centered solutions." |
| **Good** | "Senior Product Designer. Enterprise systems. AI-augmented workflow." |

The "dad test" (for trailers/narration): a layperson should get the context with **no industry
jargon** — while still speaking to recruiters and design leaders (strategy, not just UI). And: if
the visual already shows it, the narration shouldn't repeat it.

---

## 8. How she works — collaboration & process

This is as important as the design rules. It's how she wants to be worked *with*.

- **Plan before execute.** For any creative, structural, or visual change — present a plan and get
  approval **before** writing code. No surprises: don't install deps, restructure components, or make
  design decisions without confirmation.
- **Teach as you code.** "I don't want you to blindly code. I want to understand how you're doing it."
  Narrate the *why* behind each choice, surface tradeoffs (e.g. caching = freshness vs speed/cost),
  and explain bugs + fixes as they happen. Plain language + B2B/enterprise analogies. No jargon dumps.
- **Talk to her in prose, not menus.** She's a strategic thinker who reframes the question itself
  (e.g. turning a 3-way "fork" into a fixed destination with interim paths). Multiple-choice prompts
  flatten that. Prefer open questions; reflect her vision back for confirmation. Reserve structured
  question-menus for genuinely binary/tooling choices.
- **Real data, no assumptions.** Every model, projection, or claim uses real, sourced numbers with
  citations — never invented figures. (For her finance work: model as a **band/range**, and a
  **floor + ceiling**, never a single confident line.)
- **UX substance > visual polish.** Get the flows, usefulness, and decision-support right. Visuals
  need to be **appealing and not dull** — but pixel-perfect polish is *not* the goal, and
  gold-plating a finished design system is a waste. Judge a change by whether it helps the user
  *decide and act*.
- **Rewrite over patch.** No patchwork. If incremental edits make a file messy (>3 edits on the same
  file), do a clean rewrite. Code stays readable and well-structured — not a stack of fixes on fixes.
- **Document everything.** Audits, plans, decisions, and refactors get written down (artifacts in
  `docs/`) so the history persists across sessions and nothing gets lost.

---

## 9. Locked experiences — DO NOT TOUCH

These are finalized. Never modify, refactor, or restructure their internals:

- **Brain SVG experience** — the interactive neural network behind "EXPLORE MY MIND."
- **HeroAurora component** — the Canvas 2D aurora render code (curtain config, draw loop). It can be
  *placed* in different containers (hero vs fixed bg), but the internal code stays identical.
- **Case-study trailer animations** — RCTrailer, MLTrailer, DSMLTrailer. Internal code is locked.

---

## 10. The aesthetic across her products (it's consistent)

The same instincts show up everywhere — proof this is a real design language, not a one-off theme:

- **Portfolio (anujaharsha.com):** dark, aurora, teal, glassmorphism, blur-on-scroll, parallax,
  ocean-boat motion.
- **Sous — "Midnight" design language:** near-pure-black canvas, **no** background gradients; solid
  dark cards + hairline borders; **lavender as a *rare* accent** (restraint is the point); **custom
  SVG icons only, never emoji**; glass reserved for *chrome* (tab bar, sheets) — content lives on
  solid grouped surfaces (Apple-app bones, no gloss/sheen); food imagery as hero; serif (editorial)
  for recipe titles only. The AI presence is **one glowing orb whose *motion is the state*** — the
  chair test applied to voice (thinking / listening / speaking / idle all readable at a glance).
- **WealthEngine / Pathwise:** the 5 affordance laws baked into design-system primitives; tokens-only;
  dark + single teal accent; honesty made visual (fact ≠ forecast).

Common DNA: **dark + dim, one disciplined accent, glass-as-chrome-not-gloss, custom marks over
stock/emoji, motion that breathes, and obviousness above all.**

---

*Living document. The philosophy is settled; specifics evolve. When in doubt, return to the chair.*
