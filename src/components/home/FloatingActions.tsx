'use client'

import { useCallback, useEffect, useState } from 'react'
import { FileText, MessageSquare } from 'lucide-react'
import { usePdf } from '@/contexts/PdfContext'
import { trackResumeDownload } from '@/components/analytics/GoogleAnalytics'
import AskAnujaModal from './AskAnujaModal'

/**
 * Top-right floating action cluster (landing only). Sibling to TabSwitcher in
 * PageShell. Merges the old split FloatingResume (top-right) + AskAnujaTrigger
 * (bottom-left) into ONE cluster so the corners aren't scattered.
 *
 * Layout / rationale:
 *  - Ask Anuja OWNS the corner — always visible, flush-right, never shifts.
 *    It's the signature feature, so it's the persistent hero-state entry.
 *  - Resume is secondary: it stays collapsed (width 0) until the visitor
 *    scrolls past the hero, then expands in to Ask Anuja's LEFT — so Ask Anuja
 *    never moves.
 *  - ⌘K / Ctrl+K opens Ask Anuja from anywhere on the landing.
 *  - Mobile: both go icon-only (labels + kbd hidden) so the cluster stays
 *    clear of the centered Work/Life island.
 */
const ASK_HINT_STORAGE_KEY = 'ask_anu_hint_seen_v1'

export default function FloatingActions() {
    const { openPdf } = usePdf()
    const [askOpen, setAskOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    /* One-time "try ⌘K" hint — surfaces a quiet pointer at the Ask Anu chip
     * for first-time visitors so the keyboard shortcut isn't invisible. */
    const [hintVisible, setHintVisible] = useState(false)

    /* Resume reveals once past the hero (mirrors the old FloatingResume). */
    useEffect(() => {
        const check = () => setScrolled(window.scrollY > 80)
        check()
        const id = window.setInterval(check, 120)
        window.addEventListener('scroll', check, { passive: true })
        return () => {
            clearInterval(id)
            window.removeEventListener('scroll', check)
        }
    }, [])

    /* Show the ⌘K hint exactly once per visitor. Fires 4s after mount (after
     * the hero entrance has settled), dismisses on any interaction. */
    useEffect(() => {
        try {
            if (localStorage.getItem(ASK_HINT_STORAGE_KEY)) return
        } catch { /* localStorage blocked → just skip the hint */ return }
        const t = window.setTimeout(() => setHintVisible(true), 4000)
        return () => window.clearTimeout(t)
    }, [])

    const dismissHint = useCallback(() => {
        setHintVisible(false)
        try { localStorage.setItem(ASK_HINT_STORAGE_KEY, '1') } catch { /* no-op */ }
    }, [])

    /* Auto-dismiss the hint on scroll or first ⌘K press. */
    useEffect(() => {
        if (!hintVisible) return
        const onScroll = () => dismissHint()
        window.addEventListener('scroll', onScroll, { passive: true, once: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [hintVisible, dismissHint])

    /* ⌘K / Ctrl+K opens Ask Anuja from anywhere. */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const cmd = e.metaKey || e.ctrlKey
            if (cmd && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setAskOpen(true)
                dismissHint()
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [dismissHint])

    const openResume = useCallback(() => {
        trackResumeDownload()
        openPdf(
            '/assets/Anuja%20Harsha%20Nimmagadda%20-%20Staff%20Product%20Designer.pdf',
            'Anuja Harsha Nimmagadda - Staff Product Designer',
        )
    }, [openPdf])

    return (
        <>
            <div
                className="pointer-events-none fixed right-4 z-[10001] flex items-center gap-2 md:right-6"
                style={{ top: 'max(1rem, env(safe-area-inset-top))' }}
            >
                {/* Resume — collapsed until scrolled, then expands in on the left.
                    `min-w-0` is required: a flex item defaults to min-width:auto,
                    which floors it at content width and defeats `max-w-0`. */}
                <div
                    className={`min-w-0 overflow-hidden transition-all duration-500 ${
                        scrolled ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
                    }`}
                >
                    <button
                        onClick={openResume}
                        aria-label="View Resume PDF"
                        tabIndex={scrolled ? 0 : -1}
                        className="pointer-events-auto inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.12] bg-black/55 p-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white shadow-[0_8px_32px_-10px_rgba(var(--black-rgb),0.6)] backdrop-blur-xl transition-colors duration-300 hover:border-white/30 hover:bg-black/75 sm:px-4 sm:py-2 md:text-[11px]"
                    >
                        <FileText className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Resume</span>
                    </button>
                </div>

                {/* Ask Anuja — always visible, owns the corner (signature feature + ⌘K) */}
                <div className="relative">
                    <button
                        onClick={() => { setAskOpen(true); dismissHint() }}
                        aria-label="Ask Anu a question (Cmd+K)"
                        className="pointer-events-auto inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.12] bg-black/55 p-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white shadow-[0_8px_32px_-10px_rgba(var(--black-rgb),0.6)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent-teal)]/40 hover:bg-black/75 active:scale-[0.98] sm:px-4 sm:py-2 md:text-[11px]"
                    >
                        <MessageSquare className="h-3.5 w-3.5 text-[var(--accent-teal)]" />
                        <span className="hidden sm:inline">Ask Anu</span>
                        <kbd className="hidden items-center rounded-md border border-white/[0.14] bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] tracking-tight text-zinc-400 md:inline-flex">
                            ⌘K
                        </kbd>
                    </button>

                    {/* One-time coachmark — quiet glass tag, points at the chip
                        with a small caret. Desktop only (mobile has no ⌘K).
                        Dismisses on scroll, click, or first shortcut press. */}
                    {hintVisible && (
                        <div
                            role="status"
                            aria-live="polite"
                            className="pointer-events-auto absolute right-0 top-[calc(100%+10px)] hidden md:block animate-fadeIn"
                            onClick={dismissHint}
                            style={{ animation: 'fadeIn 600ms cubic-bezier(0.22, 1, 0.36, 1)' }}
                        >
                            {/* Caret pointing up at the chip */}
                            <span
                                aria-hidden="true"
                                className="absolute -top-1 right-6 h-2 w-2 rotate-45 border-t border-l border-white/[0.12] bg-black/70"
                            />
                            <span className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-white/[0.12] bg-black/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-zinc-300 shadow-[0_8px_32px_-10px_rgba(var(--black-rgb),0.6)] backdrop-blur-xl transition-colors hover:text-white">
                                <span className="text-zinc-500">Try</span>
                                <kbd className="rounded-md border border-white/[0.14] bg-white/[0.06] px-1.5 py-0.5 text-[9px] text-zinc-400">⌘K</kbd>
                                <span>to ask me anything</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <AskAnujaModal isOpen={askOpen} onClose={() => setAskOpen(false)} />
        </>
    )
}
