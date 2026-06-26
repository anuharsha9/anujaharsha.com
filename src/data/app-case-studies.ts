/**
 * Short-snapshot case studies for the 3 AI-native apps shown in Build Lab.
 *
 * Content is grounded in the actual app repos (README.md / PRD.md / package.json)
 * — no invented features. WealthEngine uses the public DEMO_MODE framing
 * (fictional Rao persona) per [[wealthengine-demo-mode]] memory; real personal
 * numbers/goals stay private.
 */

import { Compass, LineChart, ChefHat, type LucideIcon } from 'lucide-react'

export type AppCaseStudyId = 'career-builder' | 'wealth-engine' | 'sous'

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

    /* Demo + status. */
    demoUrlEnvVar?: string  // Production URL via env var (NEXT_PUBLIC_*)
    devFallbackUrl?: string // Localhost for dev mode only
    videoSrc?: string       // optional demo walkthrough video
    status: 'live' | 'demo' | 'in-development'
    statusLabel: string     // small badge text
}

export const APP_CASE_STUDIES: Record<AppCaseStudyId, AppCaseStudy> = {
    'career-builder': {
        id: 'career-builder',
        title: 'Career Builder',
        tagline: 'An AI-native education-ROI and career-projection engine.',
        icon: Compass,
        accent: 'var(--semantic-purple)',
        accentRgbVar: '--semantic-purple-rgb',
        why: 'College applications happen blind. Families pick programs by reputation and gut, then find out four years and a hundred-thousand dollars later if it paid off. I wanted to make that decision quantitative — and honest about what AI can and cannot project.',
        whatItSolves: 'For any program a student is considering, Career Builder estimates the realistic earnings trajectory, time-to-payoff, and career range — cited from public data, not vibes — so the choice rests on a number, not a brochure.',
        highlights: [
            {
                title: 'Two personas, one engine',
                description: 'A high-school senior view and a working-professional view, each with its own application tracker + projection state. Switch instantly; data stays local per profile.',
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
        devFallbackUrl: 'http://localhost:3101',
        videoSrc: '/videos/lab/career-builder-demo.mp4',
        status: 'demo',
        statusLabel: 'Live demo on Vercel',
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
        devFallbackUrl: 'http://localhost:3939',
        videoSrc: '/videos/lab/wealthengine-demo.mp4',
        status: 'demo',
        statusLabel: 'Live demo on Vercel (Rao persona)',
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
        videoSrc: '/videos/lab/sous-demo.mp4',
        status: 'in-development',
        statusLabel: 'Native iOS · TestFlight Q3 2026',
    },
}
