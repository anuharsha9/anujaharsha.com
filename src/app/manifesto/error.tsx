'use client'

/**
 * Route-level error boundary for the 60-sec manifesto trailer.
 *
 * The manifesto page is a full-screen timed experience with 6 hand-built
 * scene components (Terminal, Philosophy, Blueprint, Archaeology,
 * TechEdge, Closer), each with its own rAF loops, canvas, and animation
 * state machine. If one scene throws mid-play, this boundary catches it
 * so the visitor sees a graceful fallback with a way back to the site
 * instead of the app-shell 'Something went wrong' screen.
 */

import { useEffect } from 'react'
import Link from 'next/link'

export default function ManifestoError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.error('Manifesto trailer crashed:', error)
        }
    }, [error])

    return (
        <div className="fixed inset-0 z-[1] flex items-center justify-center bg-[var(--bg-cinematic)] px-6">
            <div className="max-w-md text-center">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/70 md:text-xs">
                    The trailer dropped a frame
                </p>
                <h1 className="mb-4 text-2xl font-medium leading-tight text-white md:text-3xl">
                    Something went wrong playing the trailer.
                </h1>
                <p className="mb-8 text-base leading-relaxed text-zinc-400">
                    The scene ran into an unexpected issue mid-play. Try again — or head back to the case studies.
                </p>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center rounded-full border border-[rgba(var(--accent-teal-rgb),0.35)] bg-[var(--overlay-ink-55)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-teal-bright)] backdrop-blur-xl transition-all hover:border-[rgba(var(--accent-teal-rgb),0.6)] hover:text-white active:scale-[0.97]"
                    >
                        Replay trailer
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
