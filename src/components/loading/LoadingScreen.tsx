'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Cog } from 'lucide-react'

export default function LoadingScreen() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Initializing Neural Interface')
  const animationRef = useRef<number | null>(null)
  const fadeTimeoutRef = useRef<number | null>(null)
  const hideTimeoutRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  const LOADING_DURATION = 900

  useEffect(() => {
    const dispatchReady = () => {
      window.dispatchEvent(new Event('app-ready'))
    }

    const clearScheduledWork = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current)
        fadeTimeoutRef.current = null
      }
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current)
        hideTimeoutRef.current = null
      }
    }

    clearScheduledWork()

    if (pathname !== '/') {
      setIsVisible(false)
      dispatchReady()
      return
    }

    // Skip loading screen for returning visitors
    const hasSession = localStorage.getItem('portfolio_entry_completed') === 'true'
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (hasSession || prefersReducedMotion) {
      setIsVisible(false)
      dispatchReady()
      return
    }

    setIsVisible(true)
    setIsFading(false)
    setProgress(0)
    setStatusText('Initializing Neural Interface')
    startTimeRef.current = performance.now()

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current
      const rawProgress = Math.min(elapsed / LOADING_DURATION, 1)

      // Eased progress (ease-out cubic) for natural feel
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3)
      const currentProgress = Math.round(easedProgress * 100)

      setProgress(currentProgress)

      // Update status text at milestones
      if (currentProgress < 35) {
        setStatusText('Initializing Neural Interface')
      } else if (currentProgress < 65) {
        setStatusText('Loading Gear Systems')
      } else if (currentProgress < 90) {
        setStatusText('Calibrating Brain Map')
      } else {
        setStatusText('System Online')
      }

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animateProgress)
      } else {
        // Loading complete — start quick fade out
        fadeTimeoutRef.current = window.setTimeout(() => {
          setIsFading(true)
          hideTimeoutRef.current = window.setTimeout(() => {
            setIsVisible(false)
            dispatchReady()
          }, 350)
        }, 90)
      }
    }

    animationRef.current = requestAnimationFrame(animateProgress)

    return () => {
      clearScheduledWork()
    }
  }, [pathname])

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[var(--bg-ink-950)] flex items-center justify-center"
      style={{
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Spinning Gear Icon */}
        <div className="relative">
          <Cog
            className="w-16 h-16 md:w-20 md:h-20 text-[var(--accent-teal)] animate-[gear-spin_3s_linear_infinite]"
            strokeWidth={1.5}
          />
          {/* Subtle glow behind the gear */}
          <div className="absolute inset-0 blur-xl bg-[var(--accent-teal)]/20 rounded-full" />
        </div>

        {/* Status Text */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-slate-400 text-xs md:text-sm font-mono tracking-[0.2em] uppercase">
            {statusText}
          </p>

          {/* Progress Bar */}
          <div className="w-48 md:w-64 h-[2px] bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-teal-bright)] rounded-full transition-[width] duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage Counter */}
          <p className="text-slate-500 text-xs font-mono tabular-nums tracking-wider">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  )
}
