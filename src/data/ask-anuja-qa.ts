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
 * Voice: tuned against Anuja's actual Medium articles (linked in the
 * Worker SYSTEM_PROMPT). Direct, punchy, em-dash rhythm, no
 * corporate-deck connectors. Short sentences mixed with longer builds.
 * Every answer ties to a real case study or number where possible.
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
            'Three. ReportCaster (legacy modernization), ML Functions (AI workflow design), IQ Plugin (platform unification). Together they cover what a Staff PD in enterprise data has to prove — scale, AI accessibility, and architecture. Everything before 2022? That was the apprenticeship that taught me how to do these well.',
        cta: { label: 'Read the case studies →', href: '#work-overview' },
    },
    {
        id: 'ml-before-after',
        category: 'work',
        question: 'Walk me through the ML training UX. What did users not understand, and how do you know your design fixed it?',
        answer:
            'Before: 12–15 clicks minimum to train a model. Drag pills onto a data-flow canvas. Hunt for a hidden play button. Decode "No results generated" when the engine ran without telling you why. After: a 4-step guided wizard — Data Prep → Train → Evaluate → Predict — with right-click entry. We validated by sitting 4 non-technical SMEs in front of it cold. All 4 finished training without help. That was the unlock.',
        cta: { label: 'See the ML case study →', href: '/work/ml-functions' },
    },
    {
        id: 'rc-restraint',
        category: 'work',
        question: 'On the legacy-modernization work, what did you refuse to redesign — and why?',
        answer:
            'The scheduler core logic. ReportCaster was 40 years old — 5 subsystems, 20M+ jobs a week. Touching the engine would have killed our timeline and broken customer scripts overnight. So I treated it as untouchable substrate and only modernized the surfaces customers actually saw: schedule creation (4 clicks → 2), Explorer access (2 → 1), one unified Hub instead of 5 fragmented panels. Modernization without disruption was the brief. Restraint was the strategy.',
        cta: { label: 'Read the case study →', href: '/work/reportcaster' },
    },
    {
        id: 'proud-missed',
        category: 'work',
        question: 'What\'s the metric you\'re most proud of, and the metric you missed?',
        answer:
            'Most proud: helping renew a multi-year, multi-million-dollar customer contract by modernizing ReportCaster. That\'s a business outcome, not a design metric — which is the point. Missed: cleaner adoption numbers on the IQ Plugin\'s broader Hub. We got +25% on NLQ discovery from the redesign, but the full Hub launched after I exited, so I never got to measure the architecture-level impact. Still bugs me.',
    },
    {
        id: 'my-pixels',
        category: 'work',
        question: 'Which parts of these case studies were your pixels vs. your team\'s?',
        answer:
            'I owned all three end-to-end as the sole IC designer — research, system mapping, architecture, every screen, every spec, the team handoff. For ML Functions and IQ Plugin the case study data lists "I owned" vs "Out of scope" explicitly. That\'s the audit trail. The backend implementation and the ML algorithms themselves weren\'t mine. Everything a user touched was.',
    },
    {
        id: 'product-types',
        category: 'work',
        question: 'What kinds of products have you worked on?',
        answer:
            'Mostly enterprise data platforms — BI scheduling, ML workflow tools, AI-powered analytics hubs. Before that: branding, mobile, and prototyping at agencies in India and Boston. The throughline across 13 years is the same — the most powerful tool in the building that nobody knows how to use. My job is making complex systems obvious.',
    },

    /* ─── (b) Process / collaboration ─── */
    {
        id: 'legacy-influence',
        category: 'collab',
        question: 'How did you get a legacy enterprise org to ship a modernized flow? Who pushed back?',
        answer:
            'I volunteered for ReportCaster one week into the job — that bought me ownership before anyone could politicize it. Then I spent two months embedded with the Gold Support team and the original RC engineer, mapping the system from scratch because there was zero documentation. Three architectural directions later, the breakthrough landed. Architects with 20–35 years of tenure pushed back hard on the unified Hub approach. I defended every decision with research, system maps, and user video until we were aligned.',
    },
    {
        id: 'disagreement',
        category: 'collab',
        question: 'Tell me about a time a PM or eng lead disagreed with your direction.',
        answer:
            'On IQ Plugin, my PM wanted to ship the three AI features as separate menu items — fastest path. I argued for unifying them into one Hub with shared discovery. So I co-built a vision prototype with him, ran it past the VP, got approval, then defended the architecture for months against engineering pushback that it was "too ambitious." The redesign hit +25% NLQ adoption. The unified Hub shipped after I left. Worth every meeting.',
    },
    {
        id: 'gated-users',
        category: 'collab',
        question: 'How do you do research when enterprise users are gated behind sales and legal?',
        answer:
            'Embedded research with internal proxies. For ReportCaster I sat with the Gold Support team for two months — they fielded the actual customer complaints, so they were the closest thing to the user. For ML Functions, I co-created a test cohort with my PM by reaching out to four non-technical SMEs through internal channels. When you can\'t reach the customer, build a research network inside the company.',
    },
    {
        id: 'scope-reduction',
        category: 'collab',
        question: 'Walk me through a decision in the AI plugin work where you reduced scope.',
        answer:
            'Original brief on IQ Plugin: redesign three AI features (NLQ, Insights, ML), build a unified Hub, make everything responsive, onboard two new designers. All at once. I negotiated to ship in waves — Hub architecture and NLQ redesign first (highest leverage), Insights and ML modernization next, responsive treatment last. Otherwise we\'d have shipped nothing well.',
    },
    {
        id: 'partners',
        category: 'collab',
        question: 'Who do you partner with most — PM, eng, research, or data?',
        answer:
            'PM for vision-level decisions. Engineering leads for what\'s actually feasible. Data scientists and SMEs as my research substitute when end-users are gated. At Staff level the partner mix matters more than partner volume — being the designer who can hold their own with a Principal Data Scientist is the difference. ML Functions was 60% of my time spent with the Principal DS on the team.',
    },

    /* ─── (c) AI + code skills ─── */
    {
        id: 'show-repo',
        category: 'ai-code',
        question: 'Show me the repo. Walk me through one component you\'d refactor today.',
        answer:
            'This portfolio repo is public. The component I\'d refactor today is FoundationBlock (the chair philosophy section) — the kinetic typography logic lives inside the component instead of a hook, which makes the timing harder to reuse. I\'d extract a useStanzaReveal() hook. Trade-off: hooks read cleaner but add indirection. The inline version shipped faster and let me iterate. I left it for now. Honest about it.',
    },
    {
        id: 'ai-line',
        category: 'ai-code',
        question: 'Where\'s the line between what you designed and what Claude/Cursor wrote?',
        answer:
            'I make every architectural and design decision — the system, the components, the interactions, the copy. Claude (Opus, mostly) writes the implementation under my direction the way a senior eng partner would. I describe the intent. I review the diff. I push back on anything that drifts from the design system. Every commit goes through my judgment. The site IS the answer to your question — if you can\'t tell which lines are mine, the orchestration is working.',
    },
    {
        id: 'ai-budget',
        category: 'ai-code',
        question: 'How do you budget for latency, token cost, and model error in an AI UX?',
        answer:
            'In WealthEngine, the Claude Ask bar runs against Opus 4.8 — token cost is real per query. So I pre-compute deterministic answers locally first (a typed rules engine handles 80% of the "next best dollar" cards) and only escalate to the LLM for genuinely novel what-ifs. For latency I stream text the moment the first token arrives. For model error I expose a reasoning toggle so the user can audit the chain. Trust before novelty.',
    },
    {
        id: 'model-wrong',
        category: 'ai-code',
        question: 'When the model is wrong, what does your UI do?',
        answer:
            'For ML Functions: confidence is shown on the model card by default — the user knows whether to trust it before they act. For Pathwise: every projection is labeled "projection," cites its source, and the runtime AI toggle is OFF by default. The deterministic planner answers the base case. The principle: never let the model assert. Let it propose, with provenance.',
    },
    {
        id: 'side-projects-not-build',
        category: 'ai-code',
        question: 'You shipped 3 AI apps in months solo. What did you intentionally NOT build?',
        answer:
            'For WealthEngine: I refused to build a bank-account integration UI before testing whether Plaid\'s sandbox was reliable. For Pathwise: I refused to ship the AI runtime path until the deterministic planner could stand alone — credit-safe mode is the default. For Sous: I left preference-learning to Phase 3 because the cook-along had to feel magical first. Ship the spine. Then the muscle.',
    },
    {
        id: 'designer-who-codes',
        category: 'ai-code',
        question: 'Designer who codes, or engineer who designs?',
        answer:
            'Designer who orchestrates code. I make the product judgment calls — AI agents are my engineering team. For an enterprise PD role, the distinction matters because it lets me ship interactive prototypes that engineering can read AS specs, not just look at. Closes the design-eng translation gap that costs most teams two sprints per feature.',
    },

    /* ─── (d) Design philosophy ─── */
    {
        id: 'changed-mind',
        category: 'philosophy',
        question: 'What\'s a design principle you\'ve changed your mind about in the last 2 years?',
        answer:
            'I used to think research density correlated with quality. Watching the AI-native shift, I now think the bar is closure — did you ship a thing that worked. Synthetic research, vibe-coded prototypes, "ship the spine first" — they beat a flawless research deck that never makes it past the eng standup. The work has to land. Everything else is decoration.',
    },
    {
        id: 'no-ai',
        category: 'philosophy',
        question: 'When is the right answer "don\'t add an AI feature here"?',
        answer:
            'When the deterministic answer is already correct. When the user needs trust more than they need novelty. When latency would break the flow. ReportCaster\'s scheduler doesn\'t need AI — it needs to be obvious. Pathwise\'s base projections don\'t need AI — citing public data is more honest. AI is a multiplier, not a feature.',
    },
    {
        id: 'not-design',
        category: 'philosophy',
        question: 'How do you decide what NOT to design in an enterprise tool with 500 features?',
        answer:
            'Two filters: would removing this hurt churn, and is anyone actually using it. ReportCaster had legacy features no customer had touched in years — we deprecated them in the new Hub instead of porting them. For new features I run a "10-second test": if a customer can\'t articulate the value in 10 seconds, it\'s either too small to ship or in the wrong place.',
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
            'Both. Senior is a fit on profile — Staff is a fit on capability. The factual title on my résumé is Senior; the work I\'m doing in 2026 (architecture, AI-orchestrated shipping, cross-team alignment) is Staff. Use whichever the role title is. I\'ll show up the same way either way.',
        cta: { label: 'View résumé', href: '/assets/Anuja%20Harsha%20Nimmagadda%20-%20Staff%20Product%20Designer.pdf', external: true },
    },
    {
        id: 'location',
        category: 'hiring',
        question: 'Where are you based, and remote/hybrid/on-site?',
        answer:
            'Based in the US since 2017. Open to remote, hybrid, and on-site for the right team. I\'ve done productive remote work and productive in-office work — what matters is the team\'s rhythm, not the zip code. Let\'s talk about the role and I\'ll be direct about logistics.',
        cta: { label: 'Email me', href: 'mailto:anujanimmagadda@gmail.com?subject=Role%20at%20your%20company', external: true },
    },
    {
        id: 'why-not-anthropic',
        category: 'hiring',
        question: 'Why this company over Anthropic / OpenAI / Stripe?',
        answer:
            'I\'m looking for a team where the work compounds — enterprise depth plus AI-native ambition. The frontier labs are exciting, but I\'ve spent 13 years modernizing systems people actually depend on, and that\'s the work I want to keep doing. Tell me what you\'re building and I\'ll tell you honestly whether it\'s a fit.',
        cta: { label: 'Email me', href: 'mailto:anujanimmagadda@gmail.com?subject=Why%20us', external: true },
    },

    /* ─── (f) Meta / about the site itself ─── */
    {
        id: 'site-build',
        category: 'meta',
        question: 'Your site is custom-built — did you design it, code it, or both?',
        answer:
            'Both. I designed the system — the components, the typography rhythm, the choreography. Implementation is Next.js + Tailwind + framer-motion, orchestrated with Claude as my coding partner. Every line was reviewed and pushed through my judgment. Build time across 5 iterations: about 6 weeks of focused evenings. (Two kids and a layoff in the middle. Different story.)',
        cta: { label: 'See the Build Lab section →', href: '#vibe-coding-zone' },
    },
    {
        id: 'ten-seconds',
        category: 'meta',
        question: 'In 10 seconds on your homepage, what do you want me to take away?',
        answer:
            'Staff Product Designer · Enterprise Data Platforms · 13 years modernizing legacy systems. The case studies prove the work. The Build Lab proves the AI-native craft. That\'s the 10-second triage. Everything else is depth on demand.',
    },
]
