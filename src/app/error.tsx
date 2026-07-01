'use client'

import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import { RotateCw, ArrowLeft } from 'lucide-react'
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
            We encountered an unexpected error. Try again or return to the homepage.
          </p>
          {error.digest && (
            <p className="text-zinc-400 text-xs font-mono mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Action Buttons — canonical, same as every other CTA on the site. */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button variant="primary" onClick={reset} icon={<RotateCw className="w-4 h-4" />}>
            Try again
          </Button>
          <Button variant="secondary" href="/" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </div>
      </div>
    </main>
  )
}

