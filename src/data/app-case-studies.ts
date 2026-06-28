/**
 * Short-snapshot case studies for the AI-native apps shown in Build Lab.
 *
 * Content is grounded in the actual app repos (README.md / PRD.md / package.json)
 * — no invented features. WealthEngine uses the public DEMO_MODE framing
 * (fictional Rao persona) per [[wealthengine-demo-mode]] memory; real personal
 * numbers/goals stay private.
 */

import { Compass, LineChart, ChefHat, ShieldCheck, NotebookPen, Gamepad2, type LucideIcon } from 'lucide-react'

export type AppCaseStudyId = 'career-builder' | 'wealth-engine' | 'sous' | 'warden' | 'inkwell' | 'wordu'

export interface AppCaseStudy {
    id: AppCaseStudyId
    title: string
    tagline: string
    /* Visual identity — matches the Build Lab tile. */
    icon: LucideIcon
    accent: string         // e.g. 'var(--semantic-purple)'
    accentRgbVar: string   // e.g. '--semantic-purple-rgb'

    /* The 10-second read content. */
    why: string                                          // Why I built it — 1-2 sentences
    whatItSolves: string                                 // The job it does for the user — 1-2 sentences
    highlights: { title: string; description: string }[] // 3-4 standout features
    stack: string[]                                      // Tech pills

    /* Demo + status. Resolution order in AppCaseStudyLightbox:
     *   1. env var override (NEXT_PUBLIC_*) — set this to swap the URL without a code change
     *   2. productionUrl — the source-of-truth public demo URL (baked in, no secret needed)
     *   3. devFallbackUrl — localhost, used only in dev when the above are absent */
    demoUrlEnvVar?: string
    productionUrl?: string
    devFallbackUrl?: string
    videoSrc?: string

    /* Internal "play" route (WordU) — when set, the "See it run" section shows a
     * cover still + a "Play <title>" button that opens the playable build at this
     * route, instead of a video / embed / walkthrough. */
    playRoute?: string
    coverImage?: string

    /* Workflow-led walkthrough — the self-advancing captioned tour shown as the
     * PRIMARY "See it run" surface when present. Each slide pairs ONE visual
     * with ONE caption (no audio — the captions + motion carry it). */
    walkthrough?: {
        id: string          // 'problem' | 'workflow' | 'feature-a' | 'feature-b' | 'outcome'
        label: string       // 'The problem'
        caption: string     // on-screen caption for the beat
        image?: string      // '/images/walkthroughs/pathwise-feature-a.jpg' (still; gets a Ken Burns pan)
        video?: string      // '/videos/walkthroughs/pathwise-feature-a.mp4' (loops; image is the poster)
    }[]

    /* "Request a demo" CTA (Sous) — a native app you can't just open in a
     * browser. When set, the "See it run" section shows the demo reel (videoSrc,
     * landscape) or a "reel coming" placeholder, plus a request button:
     *   testflightUrl present → "Get it on TestFlight" (external)
     *   else                  → "Request a demo" (mailto)
     * `note` explains the bring-your-own-API-key model. */
    requestDemo?: {
        testflightUrl?: string
        note?: string
    }

    /* Embedded live demo (for projects that render INSIDE the case study via
     * an iframe, instead of linking out). When `embed` is set, the
     * AppCaseStudyLightbox renders an iframe in the "See it run" section
     * INSTEAD OF the video + Open Live Demo CTA. Resolution mirrors the
     * demo URL: envVar → productionUrl → devFallbackUrl. */
    embed?: {
        urlEnvVar?: string
        productionUrl?: string
        devFallbackUrl?: string
        /* Aspect ratio class (tailwind). Defaults to aspect-[16/10]. */
        aspectClass?: string
    }

    status: 'live' | 'demo' | 'in-development'
    statusLabel: string     // small badge text
}

export const APP_CASE_STUDIES: Record<AppCaseStudyId, AppCaseStudy> = {
    'career-builder': {
        id: 'career-builder',
        title: 'Pathwise',
        tagline: 'An AI-native education-ROI and career-projection engine.',
        icon: Compass,
        accent: 'var(--semantic-purple)',
        accentRgbVar: '--semantic-purple-rgb',
        why: 'College applications happen blind. Families pick programs by reputation and gut, then find out four years and a hundred-thousand dollars later if it paid off. I wanted to make that decision quantitative — and honest about what AI can and cannot project.',
        whatItSolves: 'For any program or path you\'re weighing, Pathwise estimates the realistic earnings trajectory, time-to-payoff, and career range — cited from public data, not vibes — so the choice rests on a number, not a brochure.',
        highlights: [
            {
                title: 'Built for the working professional',
                description: 'The demo features the professional persona — weighing a degree, a career switch, or a certification by its real career ROI. Each profile keeps its own tracker + projection state, local to the profile; the engine is built to host more.',
            },
            {
                title: 'AI = projections only',
                description: 'Gemini 2.5 Flash powers career projections; every claim cites its source and is labeled as a projection. AI runtime is OFF by default — a deterministic local planner handles the base case.',
            },
            {
                title: 'Local-first, sync-optional',
                description: 'Data lives in your browser. Supabase magic-link sync is opt-in; row-level security policies enforce that even the publishable key can\'t leak someone else\'s data.',
            },
            {
                title: 'Honest about the AI flow',
                description: 'When Gemini IS called, the Profile page surfaces it. Build, lint, and test never touch the API — no surprise charges, no silent telemetry.',
            },
        ],
        stack: ['Next.js', 'Gemini 2.5 Flash', 'Supabase', 'TypeScript', 'Tailwind', 'Local-first JSON'],
        demoUrlEnvVar: 'NEXT_PUBLIC_CAREER_BUILDER_URL',
        productionUrl: 'https://pathwise.anujaharsha.com',
        devFallbackUrl: 'http://localhost:3101',
        status: 'demo',
        statusLabel: 'Live demo on Vercel',
        walkthrough: [
            { id: 'problem', image: '/images/walkthroughs/pathwise-problem.jpg', label: 'The problem', caption: 'College applications happen blind. Families pick programs by reputation and gut, then find out four years and a hundred-thousand dollars later whether it paid off. I wanted to make that decision quantitative — and honest about what AI can and cannot project.' },
            { id: 'workflow', image: '/images/walkthroughs/pathwise-workflow.jpg', label: 'How I built it', caption: 'I built Pathwise the way I build everything now: agentic. I describe the decision model to Claude Code in plain language, it scaffolds the Next.js and Supabase layers, and I steer — tighten the schema here, make the planner deterministic there. Designer in the driver\'s seat, AI doing the typing.' },
            { id: 'feature-a', image: '/images/walkthroughs/pathwise-feature-a.jpg', video: '/videos/walkthroughs/pathwise-feature-a.mp4', label: 'Built for the professional', caption: 'The demo features the working-professional persona — someone weighing a degree, a career switch, or a certification, scored by its real career ROI. Each profile keeps its own tracker and projection state, local to the profile. The engine\'s built to host more than one.' },
            { id: 'feature-b', image: '/images/walkthroughs/pathwise-feature-b.jpg', label: 'AI = projections only', caption: 'Here\'s the honest part. AI only does projections, and every number cites its source and is labeled a projection, not a fact. The AI runtime is off by default — a deterministic local planner handles the base case. Build, lint, and test never touch the API.' },
            { id: 'outcome', image: '/images/walkthroughs/pathwise-outcome.jpg', label: 'The outcome', caption: 'Pathwise turns a hundred-thousand-dollar gut call into a number you can actually defend. It\'s live, it\'s local-first, and it proves the thing I care about most — that AI in a product can be powerful and honest at the same time.' },
        ],
    },

    'wealth-engine': {
        id: 'wealth-engine',
        title: 'WealthEngine',
        tagline: 'A local-first life-decision engine — your personal financial chief of staff.',
        icon: LineChart,
        accent: 'var(--semantic-emerald)',
        accentRgbVar: '--semantic-emerald-rgb',
        why: 'Budgeting apps look backward. None of them help you decide whether moving cities, taking a remote role, or holding off on a house is the right call for the next fifteen years. I wanted a tool that scores the actual life paths I\'m weighing — not last month\'s coffee spend.',
        whatItSolves: 'You drop in your real positions (or use the demo persona) and WealthEngine ranks possible life scenarios — interim paths and the long-term endgame — by savings power, runway, and goal-fit. Plus a Bloomberg-style God Mode for the raw numbers and a Claude-backed Ask bar for what-ifs.',
        highlights: [
            {
                title: 'Three life paths, ranked',
                description: 'Each scenario shows the annual savings needed to actually hit the goal (back-solved), with a dual-runway gauge — today vs. an all-income-lost stress test.',
            },
            {
                title: 'Claude-backed Ask bar',
                description: 'Conversational what-if queries grounded in YOUR numbers, answered by Claude Opus 4.8. Degrades gracefully when the API key isn\'t set.',
            },
            {
                title: 'God Mode (⌘K)',
                description: 'A dense, dark Bloomberg terminal: raw positions, liabilities, scenario matrix, year-by-year projection grid. For when you want the math, not the chart.',
            },
            {
                title: 'Local-first by default',
                description: 'Your numbers live in a gitignored JSON file on your machine. Optional Plaid sync for US accounts; access tokens never touch this app\'s repo.',
            },
        ],
        stack: ['Next.js', 'Claude Opus 4.8', 'Plaid', 'Live USD/INR FX', 'Local JSON', 'TypeScript', 'Vitest + Playwright'],
        demoUrlEnvVar: 'NEXT_PUBLIC_WEALTHENGINE_URL',
        productionUrl: 'https://wealthengine.anujaharsha.com',
        devFallbackUrl: 'http://localhost:3939',
        status: 'demo',
        statusLabel: 'Live demo on Vercel (Rao persona)',
        walkthrough: [
            { id: 'problem', image: '/images/walkthroughs/wealthengine-problem.jpg', label: 'The problem', caption: 'Every budgeting app looks backward — last month\'s coffee spend. None of them help you decide whether moving cities, taking a remote role, or holding off on a house is the right call for the next fifteen years. I wanted a tool that scores the actual life paths I\'m weighing.' },
            { id: 'workflow', image: '/images/walkthroughs/wealthengine-workflow.jpg', label: 'How I built it', caption: 'I vibe-coded the whole thing with agentic AI — but the hard part was the math, not the UI. I\'d reason through the savings model out loud with Claude, have it generate the projection engine and the tests, then pressure-test the numbers myself. AI moves fast; I make sure it\'s right.' },
            { id: 'feature-a', image: '/images/walkthroughs/wealthengine-feature-a.jpg', video: '/videos/walkthroughs/wealthengine-feature-a.mp4', label: 'Three life paths, ranked', caption: 'It ranks three life paths by savings power, runway, and goal-fit — and back-solves the annual savings each one actually needs. There\'s a dual-runway gauge too: your runway today versus an all-income-lost stress test. Decisions, not dashboards.' },
            { id: 'feature-b', image: '/images/walkthroughs/wealthengine-feature-b.jpg', label: 'Ask bar + God Mode', caption: 'Two power moves. A Claude-backed Ask bar answers what-ifs grounded in your real numbers. And a Bloomberg-style God Mode — hit Command-K — drops you into the raw positions, scenario matrix, and year-by-year grid. For when you want the math, not the chart.' },
            { id: 'outcome', image: '/images/walkthroughs/wealthengine-outcome.jpg', label: 'The outcome', caption: 'WealthEngine is my financial chief of staff — local-first, my numbers never leave my machine. It\'s the clearest proof that a designer can own a genuinely quantitative product end to end, modeling and all.' },
        ],
    },

    'sous': {
        id: 'sous',
        title: 'Sous',
        tagline: 'An ambient, voice-first sous-chef that cooks with you.',
        icon: ChefHat,
        accent: 'var(--semantic-rose)',
        accentRgbVar: '--semantic-rose-rgb',
        why: 'Cookbooks lose your place. Phones go to sleep mid-knead. Reading 12-point recipe text with garlic-y hands is a kitchen failure mode. I wanted an app that just runs alongside you — big text, voice, no screen-tapping with messy hands.',
        whatItSolves: 'Bring a recipe in from anywhere (paste, a website, or a YouTube link) — Sous normalizes it, then walks you through cooking hands-free: one huge step at a time, voice that reads steps and answers "how much garlic again?", and screen-stays-awake so the flow never breaks.',
        highlights: [
            {
                title: 'Dual-brain architecture',
                description: 'Claude Opus (server-side) does the thinking — recipe generation, import normalization, preferences. Gemini Live (full-duplex, barge-in) owns the voice loop. Tightly constrained tool calls, no UI hallucinations.',
            },
            {
                title: 'Recipes from anywhere',
                description: 'Paste plain text, drop a URL, or share a YouTube cooking video — all normalized to one canonical Recipe shape.',
            },
            {
                title: 'Hands-free cook-along',
                description: 'One step on screen at a time, with just the ingredients for THAT step. Screen kept awake. Voice that advances on "next," answers timing questions, and reads ingredients on demand.',
            },
            {
                title: 'Local-first, learns over time',
                description: 'All your recipes + preferences live on-device in expo-file-system. Later phases: silent memory of "hates mushrooms / double the garlic" + a mid-cook "we\'re out of olive oil" grocery grab.',
            },
        ],
        stack: ['Expo + React Native', 'Claude Opus 4.8', 'Gemini Live', 'NativeWind', 'TypeScript (strict)', 'expo-file-system', 'Jest + Maestro'],
        /* Native iOS — can't run in a browser. "See it run" shows the on-camera
         * demo reel (videoSrc, landscape) once recorded; until then a themed
         * "reel coming" placeholder. Plus a request-demo CTA — you get it on
         * TestFlight and bring your own API key. (Add videoSrc when the reel
         * lands; add requestDemo.testflightUrl when the build is invitable.) */
        requestDemo: {
            note: 'Native iOS. Download it on your iPhone via TestFlight and bring your own API key to run it.',
        },
        status: 'in-development',
        statusLabel: 'Native iOS · demo reel + TestFlight',
    },

    'warden': {
        id: 'warden',
        title: 'Warden',
        tagline: 'Authorization for AI agents — because an agent is not its deployer.',
        icon: ShieldCheck,
        accent: 'var(--accent-amber)',
        accentRgbVar: '--accent-amber-rgb',
        why: 'Classic RBAC governs humans and is solved. The unsolved problem is governing autonomous AI agents — actors that reason and act with no session to watch, and that must never inherit the permissions of whoever deployed them. Built for a Datadog "Triple-A" panel as proof I would ship this on day one.',
        whatItSolves: 'An agent gets its own scoped identity, capped at least-privilege, governed by a trust gradient plus per-action guardrails and a first-class audit trail. Even when the deployer is a superadmin, the agent can never exceed what was explicitly granted. One pure permission engine, five screens, the full configure → simulate → approve → audit loop.',
        highlights: [
            {
                title: 'Pure permission engine',
                description: 'A single typed function — evaluate(agent, action, context) — walks an ordered ladder: liveness → owner authority → scope → guardrails → autonomy. First decisive gate wins. Unit-tested edge by edge; the trace IS the on-whose-authority receipt.',
            },
            {
                title: 'Default deny, least privilege',
                description: 'Scope is a grid. Every cell starts denied. Access exists only where you explicitly grant it. Even a superadmin\'s autonomous agent can\'t act outside its grant — the visual default makes this obvious on day one.',
            },
            {
                title: 'Autonomy ≠ unlimited',
                description: 'Marquee scenario: the autonomous Cost Sentinel attempts to modify payments in prod. Gates 1–3 pass. Guardrail prod_requires_approval trips. The autonomy gate is never reached. The full ladder is visible in the audit trail.',
            },
            {
                title: 'NL adjudication, deterministic core',
                description: 'Type "rotate the Plaid bank token" → Claude parses the intent (it never decides) → the local engine adjudicates → audit captures the full gate ladder. Falls back to a deterministic parser if Claude is unreachable, so a live demo never breaks.',
            },
        ],
        stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind', 'Claude Opus 4.8', 'Vitest', 'Pure functional engine'],
        embed: {
            urlEnvVar: 'NEXT_PUBLIC_WARDEN_URL',
            productionUrl: 'https://warden.anujaharsha.com',
            devFallbackUrl: 'http://localhost:3102',
            /* aspect-[4/3] gives the 5-screen console enough vertical room */
            aspectClass: 'aspect-[4/3]',
        },
        status: 'demo',
        statusLabel: 'Live · Datadog Triple-A interview demo',
        walkthrough: [
            { id: 'problem', image: '/images/walkthroughs/warden-problem.jpg', label: 'The problem', caption: 'Classic role-based access governs humans, and that\'s solved. The unsolved problem is governing autonomous AI agents — things that reason and act with no human in the loop, and that must never inherit the permissions of whoever deployed them. I built Warden to prove I\'d ship that on day one.' },
            { id: 'workflow', image: '/images/walkthroughs/warden-workflow.jpg', label: 'How I built it', caption: 'I designed Warden as a pure permission engine first — one typed function, evaluate of agent, action, context — and built it test-first with Claude. Every gate unit-tested edge by edge before a single screen existed. Agentic AI let me move at the speed of thinking; the core stays deterministic.' },
            { id: 'feature-a', image: '/images/walkthroughs/warden-feature-a.jpg', label: 'Default deny, least privilege', caption: 'Scope is a grid, and every cell starts denied. Access exists only where you explicitly grant it. Even a superadmin\'s autonomous agent can\'t act outside its grant — and the visual default makes that obvious the moment you look at it.' },
            { id: 'feature-b', label: 'The marquee scenario', caption: 'Here\'s the moment it clicks: an autonomous cost-sentinel agent tries to modify payments in production. The first gates pass — then a guardrail trips, and the autonomy gate is never even reached. The whole ladder is right there in the audit trail. The trace is the receipt.' },
            { id: 'outcome', label: 'The outcome', caption: 'I built Warden for a Datadog interview panel, but it stands on its own — and it\'s embedded live, right here in this portfolio. It\'s how I show I don\'t just design for AI systems; I can architect the thing that governs them.' },
        ],
    },

    'inkwell': {
        id: 'inkwell',
        title: 'Inkwell',
        tagline: 'A local-first writing studio — archive, publishing queue, and a craft coach in your own voice.',
        icon: NotebookPen,
        accent: 'var(--semantic-blue)',
        accentRgbVar: '--semantic-blue-rgb',
        why: 'I write in bursts — long fallow stretches, then five essays in a sitting. Every publishing tool assumes a steady cadence and adds in-the-moment pressure that kills the burst. I wanted the opposite: somewhere to write ahead into an archive, then publish from inventory on a whim.',
        whatItSolves: 'Inkwell decouples writing from publishing. You draft into a local archive during a burst, track each piece from idea → drafting → ready → published, answer "what can I post right now?" in one glance, and copy a finished article out to Substack, LinkedIn, or Medium in a single action. A 50-article roadmap ships seeded on first run.',
        highlights: [
            {
                title: 'Decoupled write / publish',
                description: 'Write ahead into inventory during high-energy bursts; publish from the queue with zero pressure. Status moves idea → drafting → ready → published, so the dashboard answers "what can I ship today?" at a glance.',
            },
            {
                title: 'Local-first, no backend, no accounts',
                description: 'Everything lives in your browser via IndexedDB — articles, images, settings. Debounced autosave, exactly one write path, edits survive a full reload. Your drafts never leave your machine.',
            },
            {
                title: 'One-action copy-out',
                description: 'The workhorse: copy a finished piece — formatted, with its images downscaled-on-store — ready to paste into any platform. Plus JSON + Markdown-zip export/import for real, portable backups.',
            },
            {
                title: 'Architected to become a coach',
                description: 'Clean seams throughout — the AI provider is a one-file adapter — for the committed next phase: a writing partner in your voice that rewrites, reviews, and teaches the craft principle behind every fix.',
            },
        ],
        stack: ['React 18', 'Vite', 'TypeScript', 'Zustand', 'IndexedDB (idb)', 'Claude SDK', 'react-markdown', 'Local-first'],
        demoUrlEnvVar: 'NEXT_PUBLIC_INKWELL_URL',
        productionUrl: 'https://inkwell.anujaharsha.com',
        devFallbackUrl: 'http://localhost:3120',
        status: 'demo',
        statusLabel: 'Live demo on Vercel',
        walkthrough: [
            { id: 'problem', image: '/images/walkthroughs/inkwell-problem.jpg', label: 'The problem', caption: 'I write in bursts — long quiet stretches, then five essays in a single sitting. Every publishing tool assumes a steady cadence and adds this in-the-moment pressure that kills the burst. I wanted the opposite: somewhere to write ahead, then publish on a whim.' },
            { id: 'workflow', image: '/images/walkthroughs/inkwell-workflow.jpg', label: 'How I built it', caption: 'Inkwell is the most "just me and Claude Code" build of the set. I gave it the architecture I wanted — clean seams, one write path, the AI provider as a swappable adapter — and let the agent fill it in while I kept the structure honest. Code clarity over feature count, because I\'ll extend this myself.' },
            { id: 'feature-a', image: '/images/walkthroughs/inkwell-feature-a.jpg', video: '/videos/walkthroughs/inkwell-feature-a.mp4', label: 'Decoupled write / publish', caption: 'It splits writing from publishing completely. You draft into a local archive during a burst, and every piece moves through idea, drafting, ready, published. So the dashboard answers the only question that matters in the moment — what can I actually ship right now?' },
            { id: 'feature-b', image: '/images/walkthroughs/inkwell-feature-b.jpg', label: 'Local-first + copy-out', caption: 'Everything lives in your browser — IndexedDB, debounced autosave, one write path, edits survive a reload. And the workhorse: copy a finished piece out, formatted with its images, ready to paste into Substack or LinkedIn in one action. No backend, no accounts, no lock-in.' },
            { id: 'outcome', image: '/images/walkthroughs/inkwell-outcome.jpg', label: 'The outcome', caption: 'Inkwell\'s live, and it\'s the seed of something bigger — it\'s architected to grow into a writing coach in my own voice. It\'s the clearest example of how I build now: design the seams, let AI do the volume, keep my hand on the wheel.' },
        ],
    },

    'wordu': {
        id: 'wordu',
        title: 'WordU',
        tagline: 'A fast word-chain game — shipped solo with agentic AI, dictionary and all.',
        icon: Gamepad2,
        accent: 'var(--semantic-orange)',
        accentRgbVar: '--semantic-orange-rgb',
        why: 'I wanted to prove a designer could ship a complete, polished interactive game end-to-end with agentic AI — not a toy, but something with real game feel: timing, scoring, an opponent, and a payoff loop. A word game was the perfect crucible.',
        whatItSolves: 'WordU is a real-time word-chain game. Build the longest, highest-scoring chains against the clock or a computer opponent — every word validated against a real dictionary, with multipliers, hints, and tap-to-define on any word you play.',
        highlights: [
            {
                title: 'Two modes, real game feel',
                description: 'Rapid Fire — a 60-second sprint — and a head-to-head Versus battle against a computer opponent. Scoring with multipliers, hints, and genuine time / move pressure.',
            },
            {
                title: 'Real dictionary, instantly',
                description: 'Every word is validated against a bundled word list (lazy-loaded so play stays snappy). Tap any played word for its real definition + phonetics, pulled live from a dictionary API.',
            },
            {
                title: 'Shipped solo with agentic AI',
                description: 'Game loop, state machine, opponent logic, and a custom design system — all designed and coded end-to-end with agentic AI. Proof that one designer can ship a complete interactive product.',
            },
            {
                title: 'Tactile, distraction-free UI',
                description: 'A focused play surface with smooth transitions and a custom theme — no emoji, no clutter. Just the chain and the clock.',
            },
        ],
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Dictionary API', 'Agentic AI build'],
        playRoute: '/work/wordu',
        coverImage: '/images/wordu-cover.png',
        status: 'live',
        statusLabel: 'Live · playable now',
    },
}
