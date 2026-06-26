/**
 * 25 pre-baked answers for the most common questions a hiring manager,
 * recruiter, or design leader would ask about Anuja's profile.
 *
 * Sourced from a research sweep of:
 *  - Sourcegraph PD Portfolio Review handbook
 *  - Glassdoor / Meta / Microsoft / DoorDash Senior PD interview threads
 *  - Uxcel Top-50 PD Questions 2026
 *  - Evangeline Ng — AI Product Design Interview Guide
 *  - Aakash Gupta — The New PM Interview (AI-product round)
 *  - Hello Interview — Staff-Level rubrics
 *  - ADPList portfolio-guide content
 *  - Anthropic Careers — PD rubric language
 *
 * Each answer is Anuja's voice: direct, concrete, no hedging, first-person,
 * tied to a specific case study or number where possible. Hiring / fit
 * questions deflect to the Resume + email rather than guess.
 *
 * The Ask UI shows these as click-to-expand chips. Custom free-form
 * questions hit the Cloudflare Worker → Claude API path.
 */

export type AskCategory = 'work' | 'collab' | 'ai-code' | 'philosophy' | 'hiring' | 'meta'

export const CATEGORY_LABELS: Record<AskCategory, string> = {
    'work': 'The Work',
    'collab': 'Collaboration',
    'ai-code': 'AI & Code',
    'philosophy': 'Philosophy',
    'hiring': 'Hiring',
    'meta': 'This Site',
}

export interface AskQA {
    id: string
    category: AskCategory
    question: string
    answer: string
    /* Optional follow-up CTAs the answer can render below itself. */
    cta?: { label: string; href: string; external?: boolean }
}

export const ASK_QA: AskQA[] = [
    /* ─── (a) About the work itself ─── */
    {
        id: 'judge-on',
        category: 'work',
        question: 'Of the 13 years, which 2-3 projects do you actually want to be judged on?',
        answer:
            'ReportCaster (legacy modernization), ML Functions (AI workflow design), and the IQ Plugin (platform unification). They cover the three skills a Staff Product Designer in enterprise data has to prove: scale, AI accessibility, and architecture. Everything before 2022 was the apprenticeship that taught me how to do these well.',
        cta: { label: 'Read the case studies →', href: '#work-overview' },
    },
    {
        id: 'ml-before-after',
        category: 'work',
        question: 'Walk me through the ML training UX. What did users not understand, and how do you know your design fixed it?',
        answer:
            'Before: non-technical SMEs had to drag pills onto a data-flow canvas, find a hidden play button, and decode "No results generated." 12-15 clicks minimum, and the engine ran without telling them why. After: a 4-step guided wizard (Data Prep → Train → Evaluate → Predict) with right-click entry. We validated by sitting 4 non-technical SMEs in front of it cold — all 4 completed training without help. That was the unlock.',
        cta: { label: 'See the ML case study →', href: '/work/ml-functions' },
    },
    {
        id: 'rc-restraint',
        category: 'work',
        question: 'On the legacy-modernization work, what did you refuse to redesign — and why?',
        answer:
            'The scheduler core logic. ReportCaster was 40 years old, 5 subsystems, 20M+ weekly jobs — touching the engine would have killed our timeline and broken customer scripts. So I treated it as a non-negotiable substrate and only modernized the surfaces customers actually saw: schedule creation (4 clicks → 2), Explorer access (2 clicks → 1), unified hub instead of 5 panels. Modernization without disruption was the brief; restraint was the strategy.',
        cta: { label: 'Read the case study →', href: '/work/reportcaster' },
    },
    {
        id: 'proud-missed',
        category: 'work',
        question: 'What\'s the metric you\'re most proud of, and the metric you missed?',
        answer:
            'Most proud: helping renew a multi-year, multi-million-dollar customer contract by modernizing ReportCaster. That\'s a business outcome, not a design metric. Missed: I wish I had cleaner adoption numbers on IQ Plugin\'s broader feature surface — we got +25% on NLQ discovery from the redesign, but the full Hub launched after my exit, so I never got to measure the architecture-level impact.',
    },
    {
        id: 'my-pixels',
        category: 'work',
        question: 'Which parts of these case studies were your pixels vs. your team\'s?',
        answer:
            'I owned all three case studies end-to-end as the sole IC designer: research, system mapping, architecture, every screen, every spec, team handoff. For ML Functions and IQ Plugin specifically, the case study data file lists "I owned" vs "Out of scope" features — that\'s the audit trail. Backend implementation and the ML algorithms themselves were not mine; everything a user touched was.',
    },
    {
        id: 'product-types',
        category: 'work',
        question: 'What kinds of products have you worked on?',
        answer:
            'Enterprise data platforms primarily — BI scheduling, ML workflow tools, AI-powered analytics hubs. Before that: branding, mobile app design, and prototyping at agencies in India and Boston. The throughline is "the most powerful tool in the building that nobody knows how to use" — making complex systems obvious.',
    },

    /* ─── (b) Process / collaboration ─── */
    {
        id: 'legacy-influence',
        category: 'collab',
        question: 'How did you get a legacy enterprise org to ship a modernized flow? Who pushed back?',
        answer:
            'I volunteered for ReportCaster one week into the job — that bought me ownership before anyone could politicize it. I spent two months embedding with the Gold Support team and the original RC engineer, mapping the system from scratch because there was zero documentation. Then I explored three architectural directions before finding the breakthrough. Architects with 20-35 years of tenure pushed back on the unified hub approach; I defended every decision with research, system maps, and user video before alignment.',
    },
    {
        id: 'disagreement',
        category: 'collab',
        question: 'Tell me about a time a PM or eng lead disagreed with your direction.',
        answer:
            'On IQ Plugin, my PM wanted to ship the three AI features as separate menu items — fastest path. I argued for unifying them into one Hub with shared discovery. I built a co-created vision prototype with him, ran it past the VP, got approval, then defended the architecture for months against engineering pushback that it was "too ambitious." The redesign hit +25% NLQ adoption; the unified Hub shipped after I left.',
    },
    {
        id: 'gated-users',
        category: 'collab',
        question: 'How do you do research when enterprise users are gated behind sales and legal?',
        answer:
            'Embedded research with internal proxies. For ReportCaster I sat with the Gold Support team for two months — they fielded the actual customer complaints, so they were the closest thing to the user. For ML Functions, I co-created a test cohort with my PM by reaching out to four non-technical SMEs through internal channels. Build a research network inside the company when you can\'t reach the customer directly.',
    },
    {
        id: 'scope-reduction',
        category: 'collab',
        question: 'Walk me through a decision in the AI plugin work where you reduced scope.',
        answer:
            'Original brief on IQ Plugin: redesign three AI features (NLQ, Insights, ML) AND build a unified Hub AND make everything responsive AND onboard two new designers. I negotiated to ship them in waves — Hub architecture and NLQ redesign first (the highest-leverage), Insights and ML modernization next, responsive treatment last. Otherwise we\'d have shipped nothing well.',
    },
    {
        id: 'partners',
        category: 'collab',
        question: 'Who do you partner with most — PM, eng, research, or data?',
        answer:
            'PM for vision-level decisions, engineering leads for what\'s actually feasible, and data scientists / SMEs as my research substitute when end-users are gated. At Staff level the partner mix matters more than partner volume — being the designer who can hold their own with a Principal Data Scientist is the difference. ML Functions was 60% time with the Principal DS on the team.',
    },

    /* ─── (c) AI + code skills ─── */
    {
        id: 'show-repo',
        category: 'ai-code',
        question: 'Show me the repo. Walk me through one component you\'d refactor today.',
        answer:
            'This portfolio repo is public. The component I\'d refactor today is FoundationBlock (the chair philosophy section) — the kinetic typography logic is currently inside the component instead of a hook, which makes the timing harder to reuse. I\'d extract a useStanzaReveal() hook. The trade-off: pulling everything into hooks reads cleaner but adds indirection; the current inline version was faster to ship and iterate.',
    },
    {
        id: 'ai-line',
        category: 'ai-code',
        question: 'Where\'s the line between what you designed and what Claude/Cursor wrote?',
        answer:
            'I make every architectural and design decision — the system, the components, the interactions, the copy. Claude (Opus, mostly) writes the implementation under my direction the way a senior eng partner would: I describe the intent, review the diff, push back on anything that drifts from the design system. Every commit goes through my judgment. The site IS the answer to your question — if you can\'t tell which lines are mine, that\'s the orchestration working.',
    },
    {
        id: 'ai-budget',
        category: 'ai-code',
        question: 'How do you budget for latency, token cost, and model error in an AI UX?',
        answer:
            'In WealthEngine (one of my side projects), the Claude Ask bar runs against Opus 4.8 — token cost real per query. I budget by pre-computing deterministic answers locally first (a typed rules engine handles 80% of "next best dollar" cards) and only escalating to the LLM for genuinely novel what-ifs. For latency I show streaming text the moment the first token arrives. For model error I show the reasoning toggle so the user can audit the chain.',
    },
    {
        id: 'model-wrong',
        category: 'ai-code',
        question: 'When the model is wrong, what does your UI do?',
        answer:
            'For ML Functions: confidence is shown on the model card by default, so the user knows whether to trust it before they act. For Career Builder: every projection is labeled "projection," cites its source, and the runtime AI toggle is OFF by default — the deterministic planner answers the base case. The principle: never let the model assert; let it propose, with provenance.',
    },
    {
        id: 'side-projects-not-build',
        category: 'ai-code',
        question: 'You shipped 3 AI apps in months solo. What did you intentionally NOT build?',
        answer:
            'For WealthEngine: I deliberately did not build a bank-account integration UI before testing whether Plaid\'s sandbox was reliable. For Career Builder: I refused to ship the AI runtime path until the deterministic planner could stand alone — credit-safe mode is the default. For Sous: I left preference-learning to Phase 3 because the cook-along had to feel magical first. The discipline is: ship the spine, then the muscle.',
    },
    {
        id: 'designer-who-codes',
        category: 'ai-code',
        question: 'Designer who codes, or engineer who designs?',
        answer:
            'Designer who orchestrates code. I make the product judgment calls; AI agents are my engineering team. For an enterprise PD role, the distinction matters because it lets me ship interactive prototypes that engineering can read AS specs, not just look at — closes the design-eng translation gap that costs most teams two sprints per feature.',
    },

    /* ─── (d) Design philosophy ─── */
    {
        id: 'changed-mind',
        category: 'philosophy',
        question: 'What\'s a design principle you\'ve changed your mind about in the last 2 years?',
        answer:
            'I used to think research density correlated with quality. Watching the AI-native shift, I now think the bar is closure: did you ship a thing that worked. Synthetic research, vibe-coded prototypes, and "ship the spine first" beat a flawless research deck that never makes it past the eng standup. The work has to land.',
    },
    {
        id: 'no-ai',
        category: 'philosophy',
        question: 'When is the right answer "don\'t add an AI feature here"?',
        answer:
            'When the deterministic answer is already correct, when the user needs trust more than they need novelty, or when latency would break the flow. ReportCaster\'s scheduler does not need AI — it needs to be obvious. Career Builder\'s base projections do not need AI — citing public data is more honest. AI is a multiplier, not a feature.',
    },
    {
        id: 'not-design',
        category: 'philosophy',
        question: 'How do you decide what NOT to design in an enterprise tool with 500 features?',
        answer:
            'Two filters: would removing this hurt churn, and is anyone actually using it. ReportCaster had legacy features no customer had touched in years — we deprecated them in the new hub instead of porting them. For new features I run a "10-second test": if a customer can\'t articulate the value in 10 seconds, it\'s a feature too small to ship or a feature in the wrong place.',
    },
    {
        id: 'philosophy',
        category: 'philosophy',
        question: 'What\'s your design philosophy?',
        answer:
            'When you look at a chair, the only thing that comes to mind is to sit on it. Every UI element should telegraph its function on sight. I call it the chair test — if you have to explain it, redesign it. Powerful tools fail when they\'re not obvious. Most of my work is making powerful enterprise systems obvious without dumbing them down.',
    },

    /* ─── (e) Availability / fit ─── */
    {
        id: 'looking-for',
        category: 'hiring',
        question: 'Are you looking for a Senior or Staff role?',
        answer:
            'Open to both — Senior is a fit on profile, Staff is a fit on capability. The factual title on my résumé is Senior; the work I\'m doing in 2026 (architecture, AI-orchestrated shipping, cross-team alignment) is Staff. Use whichever the role title is.',
        cta: { label: 'View résumé', href: '/assets/Anuja%20Harsha%20Nimmagadda%20-%20Staff%20Product%20Designer.pdf', external: true },
    },
    {
        id: 'location',
        category: 'hiring',
        question: 'Where are you based, and remote/hybrid/on-site?',
        answer:
            'Based in the US since 2017. Open to remote, hybrid, and on-site for the right team. I\'ve done productive remote work and productive in-office work — what matters is the team\'s rhythm. Let\'s talk about the role and I\'ll be direct about logistics.',
        cta: { label: 'Email me', href: 'mailto:anujanimmagadda@gmail.com?subject=Role%20at%20your%20company', external: true },
    },
    {
        id: 'why-not-anthropic',
        category: 'hiring',
        question: 'Why this company over Anthropic / OpenAI / Stripe?',
        answer:
            'I\'m looking for a team where the work compounds — enterprise depth plus AI-native ambition. The frontier labs are exciting but I\'ve spent 13 years modernizing systems people actually depend on, and that\'s the work I want to keep doing. Tell me what you\'re building and I\'ll tell you honestly whether it\'s a fit.',
        cta: { label: 'Email me', href: 'mailto:anujanimmagadda@gmail.com?subject=Why%20us', external: true },
    },

    /* ─── (f) Meta / about the site itself ─── */
    {
        id: 'site-build',
        category: 'meta',
        question: 'Your site is custom-built — did you design it, code it, or both?',
        answer:
            'Both. I designed the system, the components, the typography rhythm, the choreography. The implementation is Next.js + Tailwind + framer-motion, orchestrated with Claude as my coding partner — every line was reviewed and pushed through my judgment. Build time across 5 iterations: about 6 weeks of focused evenings.',
        cta: { label: 'See the Build Lab section →', href: '#vibe-coding-zone' },
    },
    {
        id: 'ten-seconds',
        category: 'meta',
        question: 'In 10 seconds on your homepage, what do you want me to take away?',
        answer:
            'Staff Product Designer · Enterprise Data Platforms · 13 years modernizing legacy systems. The case studies prove the work; the Build Lab proves the AI-native craft. That\'s the 10-second triage. Everything else is depth on demand.',
    },
]
