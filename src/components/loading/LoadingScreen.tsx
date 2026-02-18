'use client'

import { useEffect, useState, useRef } from 'react'
import { Cog } from 'lucide-react'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Initializing Neural Interface')
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  const LOADING_DURATION = 2000 // 2 seconds total

  useEffect(() => {
    // Skip loading screen for returning visitors
    const hasSession = typeof window !== 'undefined' && localStorage.getItem('portfolio_entry_completed') === 'true'
    if (hasSession) {
      setIsVisible(false)
      window.dispatchEvent(new Event('app-ready'))
      return
    }

    startTimeRef.current = performance.now()

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current
      const rawProgress = Math.min(elapsed / LOADING_DURATION, 1)

      // Eased progress (ease-out cubic) for natural feel
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3)
      const currentProgress = Math.round(easedProgress * 100)

      setProgress(currentProgress)

      // Update status text at milestones
      if (currentProgress < 30) {
        setStatusText('Initializing Neural Interface')
      } else if (currentProgress < 60) {
        setStatusText('Loading Gear Systems')
      } else if (currentProgress < 85) {
        setStatusText('Calibrating Brain Map')
      } else {
        setStatusText('System Online')
      }

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animateProgress)
      } else {
        // Loading complete — start fade out
        setTimeout(() => {
          setIsFading(true)
          setTimeout(() => {
            setIsVisible(false)
            // Signal the rest of the app (HeroSplit listens for this)
            window.dispatchEvent(new Event('app-ready'))
          }, 600) // Match CSS fade duration
        }, 200) // Brief pause at 100% before fading
      }
    }

    animationRef.current = requestAnimationFrame(animateProgress)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center"
      style={{
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Spinning Gear Icon */}
        <div className="relative">
          <Cog
            className="w-16 h-16 md:w-20 md:h-20 text-[#078B9C] animate-[gear-spin_3s_linear_infinite]"
            strokeWidth={1.5}
          />
          {/* Subtle glow behind the gear */}
          <div className="absolute inset-0 blur-xl bg-[#078B9C]/20 rounded-full" />
        </div>

        {/* Status Text */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-slate-400 text-xs md:text-sm font-mono tracking-[0.2em] uppercase">
            {statusText}
          </p>

          {/* Progress Bar */}
          <div className="w-48 md:w-64 h-[2px] bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#078B9C] to-[#14b8a6] rounded-full transition-[width] duration-100 ease-out"
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
