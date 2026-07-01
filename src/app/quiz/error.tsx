'use client'

/**
 * Route-level error boundary for the immersive brain quiz.
 *
 * The quiz surface (ImmersiveBrainExperience) is the site's most
 * complex client-side component — a hand-drawn interlocked-gear SVG
 * with WAAPI rotation, quiz progression state, canvas overlays, and
 * multi-beat reveal choreography. A single throw inside it would
 * kill the whole shell without this boundary; here it fails
 * gracefully with a way back home.
 */

import { useEffect } from 'react'
import Link from 'next/link'

export default function QuizError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.error('Brain experience crashed:', error)
        }
    }, [error])

    return (
        <div className="fixed inset-0 z-[1] flex items-center justify-center bg-[var(--bg-cinematic)] px-6">
            <div className="max-w-md text-center">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/70 md:text-xs">
                    A gear slipped
                </p>
                <h1 className="mb-4 text-2xl font-medium leading-tight text-white md:text-3xl">
                    The brain experience hit a snag.
                </h1>
                <p className="mb-8 text-base leading-relaxed text-zinc-400">
                    Something in the interlocked-gear engine misfired. Try again — or head back to the rest of the site.
                </p>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center rounded-full border border-[rgba(var(--accent-teal-rgb),0.35)] bg-[var(--overlay-ink-55)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-teal-bright)] backdrop-blur-xl transition-all hover:border-[rgba(var(--accent-teal-rgb),0.6)] hover:text-white active:scale-[0.97]"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-full border border-white/[0.10] bg-[var(--overlay-ink-55)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-200 backdrop-blur-xl transition-all hover:border-white/20 hover:text-white active:scale-[0.97]"
                    >
                        Back to work
                    </Link>
                </div>
                {error.digest && (
                    <p className="mt-6 font-mono text-[10px] text-zinc-600">
                        Ref: {error.digest}
                    </p>
                )}
            </div>
        </div>
    )
}
