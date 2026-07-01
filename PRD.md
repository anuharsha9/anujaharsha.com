# Product Requirements Document — anujaharsha.com

**Product:** Anuja Harsha Nimmagadda — personal portfolio & proof-of-work platform
**Owner:** Anuja Harsha Nimmagadda (Staff / Senior Product Designer)
**Live:** https://anujaharsha.com
**Status:** ✅ Shipped (launched 2026-06-28) · actively iterated (latest: WordU retired to its own project, `/me` merged into the Life tab, testimonials → moving marquee with full letters, Build Lab added to the résumé, all four AI-app subdomains now live)
**Last updated:** 2026-07-01
**Stack:** Next.js 16 (static export) · React 19 · TypeScript · framer-motion · Tailwind (CSS-variable tokens) · Three.js/R3F · Cloudflare Worker (Ask Anu) · AWS S3 + CloudFront · GA4

---

## 1. TL;DR

A portfolio that doesn't *describe* the work — it **is** the work. A cinematic, AI-native site that argues a single thesis: *Anuja makes the most powerful, most-avoided tool in the building obvious — and she ships it herself by orchestrating AI as her engineering team.* It pairs deep enterprise case studies (a $175M platform, a 40-year-old engine modernized) with five self-built AI products, a **live AI ("Ask Anu") that answers recruiters in her voice**, and a design system so disciplined that color, type, spacing **and motion** all flow from tokens. Lighthouse on the live CDN: **82 mobile / 90 desktop, accessibility 100, CLS 0.**

---

## 2. The problem this solves

Senior/Staff design portfolios mostly look the same: tidy Figma shots, "I increased engagement 20%," no evidence the person can operate at the edges of ambiguity or ship. Recruiters skim for 30 seconds; hiring managers want proof of judgment, leadership, and range.

**This portfolio is engineered for that 30-second skim *and* the 30-minute deep read** — and to leave one unmistakable impression: *this person thinks in systems, leads through ambiguity, and builds real things.*

## 3. Vision

> The portfolio should be the strongest case study on the site. If a hiring manager only experienced the site itself — its craft, its systems thinking, its AI-native build — they'd already have their answer.

## 4. Goals & non-goals

**Goals**
- G1 — Convert a cold recruiter into a conversation in one screen (hero + outcome-led proof).
- G2 — Prove **strategic leadership**, not just craft (problem-first case studies, "how I led," role ownership).
- G3 — Demonstrate **range**: enterprise depth *and* 0→1 product building.
- G4 — Make the **AI-native operating model** legible — she architects; agents implement.
- G5 — Be technically *excellent* (perf, a11y, SEO) so the medium reinforces the message.

**Non-goals**
- Not a CMS/blog platform. Not self-serve SaaS. Not a template. Not pixel-perfection for its own sake (UX > polish). Not gated — everything is public and free.

## 5. Audience & personas

| Persona | Need | What the site gives them |
|---|---|---|
| **Recruiter (30-sec skim)** | "Is this person worth a call?" | Hero thesis, outcome-led case-study tiles, one-click résumé, "Ask Anu" |
| **Hiring manager / design lead** | Judgment, leadership, depth | Problem-first cinematic case studies, "how I led," scope ownership, real metrics |
| **Eng / cross-functional partner** | Can she think in systems & ship? | 5 working AI apps, a token-driven design system, clean live performance |
| **The curious** | Who is she beyond the résumé? | Life tab (poem, makings, "same time" stories), manifesto, hidden brain-experience easter egg |

## 6. Success metrics
- Recruiter → contact / résumé-open rate; Ask-Anu engagement (questions asked).
- Time-on-site & case-study depth (scroll completion of cinematic stories).
- Qualitative: interviews that reference the *site itself* as a differentiator.
- Technical SLOs: Lighthouse a11y/SEO/best-practices = 100; perf ≥ 80 mobile / ≥ 90 desktop; CLS 0; zero broken assets.

---

## 7. Information architecture

A single domain, two narrative modes, plus deep-dive routes.

- **`/` — Work tab (default):** Hero → CSG enterprise case studies → **Build Lab** (AI apps) → Foundation (the chair-philosophy thesis) → testimonials (moving two-row marquee) → contact. Earlier work is a quiet "Earlier work →" drawer in the footer; the "Why hire me · 60 sec" intro is a hero CTA.
- **`/` — Life tab (the single personal surface):** the human behind the work (family, makings, "same time" simultaneity stories, the 12-stanza poem). Deep-link: `/?tab=life`.
- **Case studies:** `/work/reportcaster`, `/work/ml-functions`, `/work/iq-plugin` — each a cinematic, scrollytelling page.
- **Depth:** `/manifesto` (the operating philosophy, scene-by-scene), `/quiz` (the hidden 3D "brain experience").
- **Utility:** dynamic OG/Twitter images, sitemap, robots, résumé PDF.

---

## 8. Features — "every amazing thing"

### 8.1 The hero
- Blur-to-focus cinematic entrance, **CSS-driven so it paints on the first frame** (not gated on JS hydration); teal-gradient name; signature brandmark that draws itself.
- A single positioning line — *"I make the most powerful tool in the building — the one nobody can figure out — obvious."* — plus credibility (13 years; modernized a 50-year-old BI platform that helped renew a multi-million-dollar contract).
- Two CTAs: **"See the Work"** (primary) and **"60-sec intro"** (the manifesto/"why hire me" trailer). Résumé lives in the floating chip + footer.
- **Easter egg:** clicking the name opens the immersive brain experience.

### 8.2 CSG enterprise case studies (the depth)
Three flagship, problem-first, cinematic case studies — each opens with a *real stakes* trailer (timed, readable beats), then a structured deep-dive:
- **ReportCaster** — modernized a **40-year-old scheduling engine running 20M+ jobs/week**; volunteered week 1, aligned a ~20-person team, defended a unified Hub architecture against 20–35-year veterans.
- **ML Functions** — made an ML engine usable for everyone (a 12–15-click workflow → a 4-step guided wizard); earned the work via a side challenge, MIT-certified along the way.
- **IQ Hub / Plugin** — made the AI *impossible to miss*; defined the architecture.
- Each renders explicit **role ownership, "how I led," scope tags, and outcome-led proof** — not just screens. Backed by a **$175M P&L** platform and a **Dresner Advisory 2025 Customer Experience Leader** award.

### 8.3 Build Lab — five self-built AI products
Proof of 0→1 range, each a real, (mostly) live product with a **narrated, workflow-led walkthrough player** + "Open Live Demo":
- **Pathwise** — AI-native career/education-ROI navigator → `pathwise.anujaharsha.com`
- **WealthEngine** — local-first life-decision & scenario engine → `wealthengine.anujaharsha.com` (DEMO_MODE + fictional Rao persona)
- **Warden** — AI-agent authorization & guardrails console → `warden.anujaharsha.com`
- **Inkwell** — local-first writing studio (archive + AI coach) → `inkwell.anujaharsha.com`
- **Sous** — voice-first AI cooking companion (native iOS; on TestFlight, App Store submission pending; free with **bring-your-own-key** for the LLM brain)

A sixth Build Lab tile, **This Portfolio**, frames the site itself as an artifact (5 iterations · 6 AI agents · 1 architect). *(WordU, an earlier word game, was retired to its own standalone project — it didn't carry the enterprise story.)*

### 8.4 Ask Anu — a live AI that speaks in her voice ⭐
- A chat surface (⌘K) with ~39 hand-curated, voice-matched Q&A **plus free-form questions** answered live.
- **Architecture:** static site → **Cloudflare Worker → Claude**, with the API key held as a Worker secret (never client-exposed), CORS-locked to her domains, and KV rate-limiting. The worker URL is public + baked in, so it "just works" in production.
- It's the portfolio's thesis made interactive: an AI-native designer whose site can *answer for her*.

### 8.5 The Life dimension
- **Life tab** (the single personal surface; `/me` retired): parent, baker, painter, poet, migrant — the capacity behind the work, with a 12-stanza immersive poem, a "things I make" gallery (graphic design, paintings, baking), and a "same time" room pairing career and life milestones.
- **`/manifesto`**: the operating philosophy as a scene-by-scene cinematic.
- **`/quiz` — the brain experience:** a hidden, interactive **Three.js** sequence (the curiosity reward).

### 8.6 Social proof & conversion
- **10 named peer testimonials** in a moving two-row marquee (VP Product, Director of Design, Ph.D. data science…) — tap any quote to read the full, unedited letter.
- One-click **résumé** (PDF, in-site lightbox + download — now with a **Build Lab** section), persistent floating actions, and a **"Why hire me · 60 sec"** intro CTA in the hero that opens the manifesto.

---

## 9. Design system — tokens are the single source of truth

The site's craft signal *and* its maintainability story.

- **Tokens for everything** in `src/styles/tokens.css` + `src/lib/motion.ts`: color, typography, spacing, elevation, **and motion** (easing curves + a duration scale). No hardcoded `[0.22,1,0.36,1]` easings or magic `1.2s` durations in components — change a token, the whole site (CSS *and* framer-motion) follows.
- **Primitives** in `components/ui/`: `Button`, `VideoPlayer`, `LightboxCard`, `SystemLightbox` — one source of truth, no drift.
- **Design principles:** the *chair test* (every element telegraphs its function on sight); **UX over polish**; cinematic-but-legible motion; dark, teal-accented "neural mainframe" aesthetic with aurora waves.
- Deliberate exception: bespoke SVG-illustration palettes stay local (CSS `var()` in SVG is unreliable in Safari) — *systematic* colors are tokenized, artful one-offs are intentional.

---

## 10. Engineering & architecture

- **Next.js 16 App Router, `output: 'export'`** → fully static, deployed to **S3 + CloudFront** via a GitHub Action on push to `main` (build → S3 sync with cache headers → CloudFront invalidation).
- **React 19 + framer-motion** (LazyMotion) for scroll choreography & cinematic beats; **Three.js / React-Three-Fiber** (lazy-loaded) for the brain experience; **Lenis** smooth scroll.
- **Ask Anu** on **Cloudflare Workers** (serverless proxy keeping the model key server-side) + KV rate-limiting.
- **Resilience:** zero broken links/images/videos (verified by a full built-output asset scan); graceful media primitives (never emit empty `src`); honest in-development states.

## 11. Performance & accessibility (live, on CloudFront)

| | Mobile | Desktop |
|---|---|---|
| Performance | **82** | **90** |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |
| LCP | 3.8s | 0.7s |
| CLS | **0** | **0** |

- WCAG-minded: AA color contrast, `Label in Name` compliance, `prefers-reduced-motion` honored, sr-only headings, keyboard + focus states.

## 12. The AI-native story (the meta-differentiator)

The portfolio is itself the headline proof: a designer who **architects and ships production software by orchestrating AI agents as her engineering team** — five apps, a live AI, a token-driven system, all built solo. The medium *is* the message.

## 13. SEO & shareability
- Dynamic, on-brand **OG / Twitter cards** (Satori) — dark cinematic, teal-gradient name, tagline, skills, served as proper `image/png`.
- Case-study **JSON-LD**, sitemap, robots, semantic metadata.

## 14. What makes it stand out (differentiators)
1. **A live AI that answers in your voice** — almost no portfolio does this.
2. **Five real, (mostly) live AI products** — not concepts; demos you can open.
3. **Enterprise depth + 0→1 range** in one place, both told cinematically.
4. **Token-driven design system incl. motion** — rare engineering discipline for a *designer's* site.
5. **The site as proof of the AI-native operating model.**
6. **Dual Work/Life narrative** — competence *and* humanity.

## 15. Roadmap (post-launch, additive)
- **Sous → App Store** (free, BYOK): build 4 is live on TestFlight (2026-06-30) — awaiting Anuja's real-cook test → tune wake phrases → ASC listing → Submit for Review. When approved, flip the tile to a "Download on the App Store" CTA and host privacy + support URLs on the domain.
- Drop in remaining **Build Lab demo reels** (e.g., Sous on-camera reel).
- Optional: deepen the signature "wow" interaction for award consideration (Awwwards SOTD path).

## 16. Appendix — key paths
- Tokens: `src/styles/tokens.css` · Motion tokens: `src/lib/motion.ts` · Primitives: `src/components/ui/`
- Hero: `src/components/home/HeroLanding.tsx` · Case studies: `src/app/work/*`, `src/components/case-study*`
- Build Lab: `src/components/home/VibeCodingBlock.tsx`, `src/data/app-case-studies.ts`
- Ask Anu: `src/components/home/AskAnujaModal.tsx`, `workers/ask-anuja/`
- Deploy: `.github/workflows/deploy.yml`
