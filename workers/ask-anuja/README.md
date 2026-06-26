# ask-anuja — Cloudflare Worker

The portfolio's free-form "Ask Anuja" question path. The static portfolio sends `POST { question }` here; the worker calls Claude server-side so the API key never leaves your account.

## One-time setup

```bash
# 1. Install Wrangler (if you don't have it)
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Create a KV namespace for rate limiting
wrangler kv:namespace create RATE_LIMIT
# → copy the printed `id` and paste it into wrangler.toml (the REPLACE_WITH_KV_NAMESPACE_ID line)

# 4. Add the Anthropic API key as a secret
wrangler secret put ANTHROPIC_API_KEY
# → paste your sk-ant-... key when prompted

# 5. Deploy
wrangler deploy
# → note the URL printed (e.g. https://ask-anuja.<your-subdomain>.workers.dev)
```

## Wire it into the portfolio

Add to the portfolio's environment (Vercel / S3 build env / `.env.production`):

```
NEXT_PUBLIC_ASK_ANUJA_API=https://ask-anuja.<your-subdomain>.workers.dev
```

Rebuild + redeploy the portfolio. The Ask Anuja modal will now route custom questions to the worker.

## What it does

- Validates the question (length, JSON shape).
- Rate-limits by IP: 5 questions / 5 minutes via Worker KV.
- Calls `claude-opus-4-8` with Anuja's system prompt (her voice, her real case studies).
- Caps responses to 400 tokens.
- CORS allows only the production origins + localhost.
- Refuses out-of-scope questions politely.

## Costs

Each question is ~2.5K input tokens (system prompt) + up to 400 output tokens. At Opus 4.8 pricing, that's a few cents per question. Rate limit + token cap make a single bad actor cost ~$0.30/hour max — which is why the limit is per-IP, not per-session.

## Updating Anuja's context

Edit `SYSTEM_PROMPT` in `worker.ts`, redeploy. The prompt currently includes profile, case-study one-liners, and the answer-style rules. Add new projects + numbers as they ship.

## Until you deploy this

The portfolio's `NEXT_PUBLIC_ASK_ANUJA_API` env var will be unset. The Ask Anuja modal handles that gracefully: custom questions show a friendly "haven't wired up the API yet — email me directly" message instead of erroring. The 25 pre-baked Q&A keep working regardless.
