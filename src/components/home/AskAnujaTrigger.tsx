'use client'

import { useCallback, useEffect, useState } from 'react'
import { MessageSquare } from 'lucide-react'
import AskAnujaModal from './AskAnujaModal'

/**
 * Floating "Ask Anuja · ⌘K" chip at the bottom-left of the viewport.
 * Sibling to TabSwitcher + FloatingResume in the PageShell composition — only
 * renders on landing.
 *
 * Why bottom-left: top-right is FloatingResume, top-center is the Dynamic
 * Island tab. Bottom-left is the empty corner; on mobile it stays clear of
 * the iOS home indicator via safe-area-inset-bottom.
 *
 * Keyboard shortcut: ⌘K / Ctrl+K from anywhere on the landing.
 */
export default function AskAnujaTrigger() {
    const [isOpen, setIsOpen] = useState(false)

    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => setIsOpen(false), [])

    /* ⌘K / Ctrl+K opens the modal from anywhere. */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const cmd = e.metaKey || e.ctrlKey
            if (cmd && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setIsOpen(true)
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [])

    return (
        <>
            <div
                className="pointer-events-none fixed left-4 z-[10001] md:left-6"
                style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
            >
                <button
                    onClick={open}
                    aria-label="Ask Anuja a question (Cmd+K)"
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-black/55 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white shadow-[0_8px_32px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent-teal)]/40 hover:bg-black/75 active:scale-[0.98] md:text-[11px]"
                >
                    <MessageSquare className="h-3.5 w-3.5 text-[var(--accent-teal)]" />
                    <span>Ask Anuja</span>
                    <kbd className="hidden items-center rounded-md border border-white/[0.14] bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] tracking-tight text-zinc-400 md:inline-flex">
                        ⌘K
                    </kbd>
                </button>
            </div>
            <AskAnujaModal isOpen={isOpen} onClose={close} />
        </>
    )
}
