'use client'

import { useEffect } from 'react'
import TransitionLink from '@/components/transitions/TransitionLink'
import SignatureLogo from '@/components/brand/SignatureLogo'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error)
    }
  }, [error])

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16">
            <SignatureLogo className="w-full h-full text-zinc-800" />
          </div>
        </div>

        {/* Error Text */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-sans text-zinc-800 font-bold">500</h1>
          <h2 className="text-2xl md:text-3xl font-sans text-zinc-600">
            Something went wrong
          </h2>
          <p className="text-zinc-500 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            We encountered an unexpected error. Please try again or return to the homepage.
          </p>
          {error.digest && (
            <p className="text-zinc-400 text-xs font-mono mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-medium transition-all duration-300 hover:bg-[var(--accent-teal)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-teal)] shadow-sm"
            aria-label="Try again"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try again
          </button>
          <TransitionLink
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 text-zinc-600 text-sm font-medium transition-all duration-300 hover:border-slate-400 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </TransitionLink>
        </div>
      </div>
    </main>
  )
}

