'use client'

import { useState, useRef, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Send, Mail, Loader2 } from 'lucide-react'
import SystemLightbox from '@/components/ui/SystemLightbox'
import { ASK_QA, CATEGORY_LABELS, type AskCategory } from '@/data/ask-anuja-qa'
import { EASE_CINEMATIC as ease, DURATION } from '@/lib/motion'

/**
 * The "Ask Anuja" experience.
 *
 * Two modes layered together:
 *  1. Pre-baked Q&A — 25 hand-curated answers (zero API cost, her voice).
 *     Click a chip to expand its answer in place.
 *  2. Free-form custom questions — POSTed to the Cloudflare Worker calling
 *     Claude. The worker URL comes from NEXT_PUBLIC_ASK_ANUJA_API, falling
 *     back to the deployed Worker (the URL is public; the API key is a Worker
 *     secret). If the fetch fails, the UI shows a friendly 'email me' state.
 *
 * The modal uses SystemLightbox so the mobile-native chrome we already built
 * (compact close button, safe-area, no terminal cruft) works for free.
 */
interface AskAnujaModalProps {
    isOpen: boolean
    onClose: () => void
}

const CATEGORIES = Object.keys(CATEGORY_LABELS) as AskCategory[]

export default function AskAnujaModal({ isOpen, onClose }: AskAnujaModalProps) {
    const [activeCategory, setActiveCategory] = useState<AskCategory>('work')
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [customQ, setCustomQ] = useState('')
    const [customAnswer, setCustomAnswer] = useState<string | null>(null)
    const [customStatus, setCustomStatus] = useState<'idle' | 'loading' | 'error'>('idle')
    const inputRef = useRef<HTMLInputElement>(null)

    /* Reset visible state when modal closes so re-opening starts fresh. */
    useEffect(() => {
        if (!isOpen) {
            setExpandedId(null)
            setCustomQ('')
            setCustomAnswer(null)
            setCustomStatus('idle')
        }
    }, [isOpen])

    const visibleQuestions = ASK_QA.filter(q => q.category === activeCategory)

    const handleCustomSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const question = customQ.trim()
        if (!question || customStatus === 'loading') return

        // Worker URL is public (not a secret — the API key lives inside the
        // Worker). Default keeps production working without any build-time env.
        const apiUrl = process.env.NEXT_PUBLIC_ASK_ANUJA_API || 'https://ask-anuja.anujaharsha.workers.dev'

        setCustomStatus('loading')
        setCustomAnswer(null)
        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const data = await res.json()
            setCustomAnswer(data.answer ?? "I got the question but couldn't form a reply. Try emailing me — hello@anujaharsha.com.")
            setCustomStatus('idle')
        } catch {
            setCustomAnswer(
                "Couldn't reach the AI right now. Email me directly at hello@anujaharsha.com — I'd be glad to answer this in person."
            )
            setCustomStatus('error')
        }
    }

    return (
        <SystemLightbox
            isOpen={isOpen}
            onClose={onClose}
            title="ASK_ANU"
            indexString="[ HIRING_MODE ]"
            showArrows={false}
            shortcuts={[{ key: 'ESC', label: 'CLOSE' }]}
            className="!p-0 !max-w-3xl"
        >
            <div className="flex h-full w-full flex-col overflow-hidden">
                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10">

                    {/* Header */}
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/70">
                            Ask Me Anything
                        </p>
                        <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                            What do you want to know?
                        </h2>
                        <p className="mt-2 text-sm text-zinc-400 md:text-base">
                            Pick a question below, or type your own. The pre-baked ones are in my voice; custom questions go through Claude with my context.
                        </p>
                    </div>

                    {/* Category tabs */}
                    <div className="mt-7 flex flex-wrap gap-2">
                        {CATEGORIES.map(c => {
                            const isActive = c === activeCategory
                            return (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => {
                                        setActiveCategory(c)
                                        setExpandedId(null)
                                    }}
                                    aria-pressed={isActive}
                                    className={`rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-200 md:text-[11px] ${
                                        isActive
                                            ? 'border-[var(--accent-teal)]/40 bg-[var(--accent-teal)]/[0.12] text-[var(--accent-teal)]'
                                            : 'border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                                    }`}
                                >
                                    {CATEGORY_LABELS[c]}
                                </button>
                            )
                        })}
                    </div>

                    {/* Q list — click to expand */}
                    <ul className="mt-6 space-y-2.5">
                        {visibleQuestions.map(qa => {
                            const isExpanded = expandedId === qa.id
                            return (
                                <li
                                    key={qa.id}
                                    className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                                        isExpanded
                                            ? 'border-[var(--accent-teal)]/30 bg-white/[0.03]'
                                            : 'border-white/[0.06] bg-white/[0.015] hover:border-white/[0.14] hover:bg-white/[0.03]'
                                    }`}
                                >
                                    <button
                                        onClick={() => setExpandedId(isExpanded ? null : qa.id)}
                                        className="w-full px-5 py-4 text-left text-[15px] font-medium leading-snug text-zinc-100 md:text-base"
                                    >
                                        {qa.question}
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isExpanded && (
                                            <m.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: DURATION.base, ease }}
                                            >
                                                <div className="border-t border-white/[0.06] px-5 py-4">
                                                    <p className="text-[15px] leading-relaxed text-zinc-300">
                                                        {qa.answer}
                                                    </p>
                                                    {qa.cta && (
                                                        <a
                                                            href={qa.cta.href}
                                                            target={qa.cta.external ? '_blank' : undefined}
                                                            rel={qa.cta.external ? 'noopener noreferrer' : undefined}
                                                            onClick={() => {
                                                                if (!qa.cta?.external && qa.cta?.href.startsWith('#')) onClose()
                                                            }}
                                                            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-teal)] transition-transform duration-200 hover:translate-x-1"
                                                        >
                                                            {qa.cta.label}
                                                        </a>
                                                    )}
                                                </div>
                                            </m.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            )
                        })}
                    </ul>

                    {/* Custom answer area */}
                    {customAnswer && (
                        <m.div
                            className="mt-8 rounded-2xl border border-[var(--accent-teal)]/25 bg-[var(--accent-teal)]/[0.06] p-5"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: DURATION.medium, ease }}
                        >
                            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-teal)]/80">
                                {customStatus === 'error' ? 'Heads up' : "Anu’s reply"}
                            </p>
                            <p className="text-[15px] leading-relaxed text-zinc-200">{customAnswer}</p>
                            {customStatus === 'error' && (
                                <a
                                    href="mailto:hello@anujaharsha.com"
                                    className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-teal)] hover:translate-x-1 transition-transform"
                                >
                                    <Mail className="h-3.5 w-3.5" /> hello@anujaharsha.com
                                </a>
                            )}
                        </m.div>
                    )}
                </div>

                {/* Sticky bottom input */}
                <form
                    onSubmit={handleCustomSubmit}
                    className="sticky bottom-0 flex items-center gap-2 border-t border-white/[0.06] bg-black/85 px-6 py-4 backdrop-blur-md md:px-10"
                    style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
                >
                    <input
                        ref={inputRef}
                        value={customQ}
                        onChange={(e) => setCustomQ(e.target.value)}
                        placeholder="Ask something else…"
                        maxLength={500}
                        className="flex-1 rounded-full border border-white/[0.10] bg-white/[0.04] px-5 py-3 text-sm text-white placeholder-zinc-500 transition-colors focus:border-[var(--accent-teal)]/50 focus:outline-none md:text-base"
                        aria-label="Ask a custom question"
                        disabled={customStatus === 'loading'}
                    />
                    <button
                        type="submit"
                        disabled={!customQ.trim() || customStatus === 'loading'}
                        aria-label="Send question"
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all hover:bg-[var(--accent-teal)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {customStatus === 'loading' ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </button>
                </form>
            </div>
        </SystemLightbox>
    )
}
