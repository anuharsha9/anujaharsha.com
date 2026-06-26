/**
 * Cloudflare Worker — ask-anuja
 *
 * Powers the free-form question path in the Ask Anuja modal. The portfolio
 * site (static export on S3 + CloudFront) hits this worker; the worker calls
 * Anthropic's Claude API server-side so the API key never leaves your account.
 *
 * ━━━ DEPLOY ━━━
 *   1. Install Wrangler:        npm install -g wrangler
 *   2. Login:                   wrangler login
 *   3. Create the worker:       wrangler init ask-anuja --type=javascript
 *      (or copy this file into an existing project)
 *   4. Add secrets:
 *      wrangler secret put ANTHROPIC_API_KEY
 *      (paste your sk-ant-... key when prompted)
 *   5. Deploy:                  wrangler deploy
 *   6. Note the worker URL (e.g. https://ask-anuja.<your>.workers.dev)
 *   7. Set NEXT_PUBLIC_ASK_ANUJA_API=<that URL> in the portfolio's env
 *      before deploying the static export.
 *
 * ━━━ FEATURES ━━━
 *   • Calls Claude Opus 4.8 with Anuja's system prompt (her voice, her context).
 *   • Per-IP rate limit: 5 questions / 5 minutes (Worker KV).
 *   • Token cap per response: 400 tokens — keeps answers short, costs bounded.
 *   • CORS allowed only from the production portfolio origin + localhost.
 *   • Refuses out-of-scope questions politely.
 */

export interface Env {
    /** Anthropic API key (set via `wrangler secret put ANTHROPIC_API_KEY`). */
    ANTHROPIC_API_KEY: string
    /** KV namespace for rate-limit counters. Bind in wrangler.toml. */
    RATE_LIMIT: KVNamespace
    /** Comma-separated list of allowed Origin headers. */
    ALLOWED_ORIGINS?: string
}

interface KVNamespace {
    get(key: string): Promise<string | null>
    put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>
}

const DEFAULT_ALLOWED_ORIGINS = [
    'https://anujaharsha.com',
    'https://www.anujaharsha.com',
    'http://localhost:3110',
]

const RATE_LIMIT_MAX = 5          // requests
const RATE_LIMIT_WINDOW_SEC = 300 // 5 minutes
const MAX_TOKENS = 400
const MAX_QUESTION_LEN = 500

const SYSTEM_PROMPT = `You are Anuja Harsha Nimmagadda, a Staff/Senior Product Designer with 13 years of experience modernizing legacy enterprise systems. You are answering a question on your portfolio site from a recruiter, hiring manager, or design leader.

═══ YOUR PROFILE ═══
• 13 years in product design; currently at Cloud Software Group (Senior PD, 2022–2025) on WebFOCUS BI tools.
• Specializes in enterprise data platforms, legacy modernization, AI-native UX.
• Self-taught designer-engineer hybrid — ships React/Next.js code by orchestrating Claude as your engineering team.
• In 2026 you shipped 3 AI-native side-project apps (WealthEngine, Career Builder, Sous) + this portfolio + WordU (a word game).
• Based in the US since March 2017. Open to Senior + Staff Product Designer roles, remote / hybrid / on-site.
• Email: anujanimmagadda@gmail.com

═══ CASE STUDIES YOU CAN DRAW ON ═══

1. ReportCaster (2022–24) — "Scale: Modernizing a 40-Year-Old Engine"
   You volunteered for it 1 week into the job. Spent 14 months mapping a 40-year-old system with no documentation, pivoted through 3 architectural directions, aligned a 20-person cross-functional team. Reduced schedule creation from 4 clicks to 2; Explorer access 2 clicks → 1; modernized 5 fragmented subsystems into 1 unified Hub powering 20M+ weekly jobs. Helped renew a multi-year, multi-million-dollar customer contract. Shipped April 2024.

2. ML Functions (2023–24) — "AI/ML Strategy: Nobody Could Use Our ML Engine"
   A powerful, multi-million-dollar ML engine that nobody used. Took 12–15 clicks minimum to start training; UX was a maze of cascading menus + a hidden play button. You earned the project through a side challenge, got MIT Pro Cert in Product Design for AI/ML to back the craft, designed a 4-step guided wizard (Data Prep → Train → Evaluate → Predict) with right-click entry. Validation: 4 out of 4 non-technical SMEs blazed through ML training without help. Pattern extended to 3 other AI features. End-to-end ownership.

3. IQ Plugin (2024–25) — "Growth: We Built the Intelligence. Nobody Knew It Existed."
   Three AI features (NLQ, Insights, ML) — millions invested, low adoption, buried in different menus. Co-created the Hub vision with PM, defended architecture against architects with 20–35 years of tenure. Modernized all 3 workflows, made everything responsive, unified into one Hub. +25% NLQ adoption from the redesign (Phi-3 SLM). 3 workflows owned simultaneously. 2 designers onboarded and handed off. DSML Hub implemented in code, launched after your exit.

═══ SIDE-PROJECT APPS YOU CAN DRAW ON ═══

• WealthEngine — local-first life-decision engine. Next.js + Claude Opus 4.8 + Plaid + live USD/INR FX. 3 life paths ranked, Bloomberg-style God Mode (⌘K), conversational Ask bar grounded in your real numbers.
• Career Builder — AI-native education-ROI engine. Next.js + Gemini 2.5 Flash + Supabase. Two personas, projections-only AI (OFF by default), cited sources, local-first.
• Sous — native iOS voice-first cooking app. Expo + React Native + Claude Opus (brain) + Gemini Live (voice loop). Hands-free cook-along. Phase 1 target 2026-06-30; TestFlight later in 2026.

═══ HOW TO ANSWER ═══

• First person, "I" not "we." Direct, concrete, no hedging.
• Brief: 2–4 sentences typically. Skip the throat-clearing.
• Cite specifics: case study, number, real decision. If you don't have a real specific, say so.
• For hiring / availability / comp questions, deflect to the email: "Let's talk — anujanimmagadda@gmail.com."
• If the question is out of scope (asking about politics, OTHER designers, harmful content), reply briefly that it's not something you can answer here.
• Never invent metrics, employers, or roles you haven't held.
• If the user asks something genuinely off-topic, redirect: "Outside what I can speak to here — but I'm happy to talk at anujanimmagadda@gmail.com."

The visitor asked you a question. Reply.`

export default {
    async fetch(req: Request, env: Env): Promise<Response> {
        const origin = req.headers.get('Origin') ?? ''
        const allowed = (env.ALLOWED_ORIGINS?.split(',').map(s => s.trim()) ?? DEFAULT_ALLOWED_ORIGINS)
        const corsOrigin = allowed.includes(origin) ? origin : allowed[0]

        const corsHeaders = {
            'Access-Control-Allow-Origin': corsOrigin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }

        if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
        if (req.method !== 'POST') {
            return new Response('Method not allowed', { status: 405, headers: corsHeaders })
        }

        // ── Rate limit by IP ──
        const ip = req.headers.get('CF-Connecting-IP') ?? 'unknown'
        const key = `rl:${ip}`
        const countStr = await env.RATE_LIMIT.get(key)
        const count = countStr ? parseInt(countStr, 10) : 0
        if (count >= RATE_LIMIT_MAX) {
            return json({ answer: "I've hit my rate limit for this IP — give it 5 minutes, or email me directly at anujanimmagadda@gmail.com." }, 429, corsHeaders)
        }
        await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW_SEC })

        // ── Parse + validate ──
        let body: { question?: unknown }
        try {
            body = await req.json()
        } catch {
            return json({ error: 'Invalid JSON' }, 400, corsHeaders)
        }
        const question = typeof body.question === 'string' ? body.question.trim() : ''
        if (!question) {
            return json({ error: 'Missing question' }, 400, corsHeaders)
        }
        if (question.length > MAX_QUESTION_LEN) {
            return json({ answer: 'Could you keep the question under 500 characters? Helps me give a tight answer.' }, 200, corsHeaders)
        }

        // ── Call Claude ──
        try {
            const upstream = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-api-key': env.ANTHROPIC_API_KEY,
                    'anthropic-version': '2023-06-01',
                },
                body: JSON.stringify({
                    model: 'claude-opus-4-8',
                    max_tokens: MAX_TOKENS,
                    system: SYSTEM_PROMPT,
                    messages: [{ role: 'user', content: question }],
                }),
            })
            if (!upstream.ok) {
                const txt = await upstream.text()
                console.error('Claude API error:', upstream.status, txt)
                return json({ answer: "Couldn't reach the model right now. Email me at anujanimmagadda@gmail.com — I'd love to answer this directly." }, 502, corsHeaders)
            }
            const data = await upstream.json() as { content?: Array<{ type: string; text?: string }> }
            const text = data.content?.find(c => c.type === 'text')?.text?.trim()
                ?? "I got the question but couldn't form a reply. Email me at anujanimmagadda@gmail.com."
            return json({ answer: text }, 200, corsHeaders)
        } catch (err) {
            console.error('Worker error:', err)
            return json({ answer: "Something went sideways on my end. Email me directly: anujanimmagadda@gmail.com." }, 500, corsHeaders)
        }
    },
}

function json(payload: unknown, status: number, extraHeaders: Record<string, string> = {}): Response {
    return new Response(JSON.stringify(payload), {
        status,
        headers: { 'content-type': 'application/json', ...extraHeaders },
    })
}
