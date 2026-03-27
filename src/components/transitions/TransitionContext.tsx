'use client'

import { createContext, useContext, useCallback, useState, useRef, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type Phase = 'idle' | 'submerge' | 'hold' | 'emerge'

interface TransitionContextValue {
  phase: Phase
  progress: number
  navigateTo: (href: string) => void
}

const TransitionContext = createContext<TransitionContextValue>({
  phase: 'idle',
  progress: 0,
  navigateTo: () => {},
})

export function useTransition() {
  return useContext(TransitionContext)
}

/* ── Water physics easing ──────────────────────────────────
 *
 * Real waves are asymmetric:
 *   SURGE:   Sinusoidal ease — accelerates smoothly, decelerates at peak
 *   RETREAT: Quadratic ease-in — lingers at crest, then gravity takes over
 *
 * Timing (continuous, no perceivable pause):
 *   SURGE   = 800ms  (heavy upward sweep)
 *   HOLD    = imperceptible (just route swap, ~50-100ms)
 *   RETREAT = 900ms  (slow gravity-driven drain)
 */

/** Surge: smooth sweep upward — sinusoidal for even visual motion */
function easeSurge(t: number): number {
  // Sinusoidal ease-in-out: starts gently, accelerates mid, decelerates at peak
  // This ensures the wave sweep is VISIBLE — not front-loaded like cubic ease-out
  return 0.5 * (1 - Math.cos(Math.PI * t))
}

/** Retreat: smooth sweep downward — slightly faster ending for "gravity" feel */
function easeRetreat(t: number): number {
  // Ease-in: starts slow (lingering at peak), accelerates like gravity
  return t * t
}

/**
 * TransitionProvider — intercepts navigation to play the Tidal Wash.
 *
 * Timeline (from spec):
 *   SUBMERGE  (800ms): Canvas waves crash upward → cover ~80% of viewport
 *   HOLD      (imperceptible): Route swaps, waves keep undulating
 *   EMERGE    (900ms): Waves retreat with gravity, revealing new content
 *
 * 80-20 Rule: Waves never cover full viewport — ~80% at peak.
 * No pause at top — continuous crash-and-retreat like real ocean.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState(0)
  const navLock = useRef(false)
  const animRef = useRef<number>(0)
  const pendingHref = useRef<string | null>(null)
  const lenisRef = useRef<{ stop: () => void; start: () => void } | null>(null)
  const phaseRef = useRef<Phase>('idle')

  // Safety net: reset navLock whenever phase returns to idle
  useEffect(() => {
    if (phase === 'idle') {
      navLock.current = false
    }
  }, [phase])

  // Cleanup animation frames on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  /** Animate with a custom easing curve */
  const animateWith = useCallback((ms: number, easing: (t: number) => number, cb: () => void) => {
    const t0 = performance.now()
    const tick = (now: number) => {
      const raw = Math.min((now - t0) / ms, 1)
      setProgress(easing(raw))
      if (raw < 1) animRef.current = requestAnimationFrame(tick)
      else cb()
    }
    animRef.current = requestAnimationFrame(tick)
  }, [])

  /** Start the emerge (retreat) animation */
  const startEmerge = useCallback(() => {
    setPhase('emerge')
    phaseRef.current = 'emerge'
    setProgress(0)
    window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'retreat' } }))

    animateWith(900, easeRetreat, () => {
      setPhase('idle')
      phaseRef.current = 'idle'
      setProgress(0)
      navLock.current = false
      pendingHref.current = null
      window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'idle' } }))
      if (lenisRef.current) lenisRef.current.start()

      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('scroll'))
      })
    })
  }, [animateWith])

  /**
   * When pathname changes while we're in the 'hold' phase,
   * it means Next.js has finished the route swap — start emerging.
   */
  useEffect(() => {
    if (phase !== 'hold' || !pendingHref.current) return

    const normalize = (p: string) => p === '/' ? '/' : p.replace(/\/+$/, '')
    if (normalize(pathname) === normalize(pendingHref.current)) {
      // Route has changed — immediately start retreat (no pause)
      startEmerge()
    }
  }, [pathname, phase, startEmerge])

  // Keep a ref in sync with pathname so navigateTo always has current value
  const pathnameRef = useRef(pathname)
  useEffect(() => { pathnameRef.current = pathname }, [pathname])

  const navigateTo = useCallback((href: string) => {
    const normalize = (p: string) => p === '/' ? '/' : p.replace(/\/+$/, '')
    if (navLock.current || normalize(href) === normalize(pathnameRef.current)) return
    navLock.current = true

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    lenisRef.current = lenis || null
    if (lenis) lenis.stop()

    // Tell aurora to surge
    window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'surge' } }))

    // Phase 1: SUBMERGE — canvas waves crash upward (800ms, slow physics)
    setPhase('submerge')
    phaseRef.current = 'submerge'
    setProgress(0)

    animateWith(800, easeSurge, () => {
      // Phase 2: HOLD — 80% coverage, aurora breathes
      setPhase('hold')
      phaseRef.current = 'hold'
      setProgress(1)
      pendingHref.current = href
      window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'hold' } }))

      // Scroll to top before navigation
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })

      // Defer router.push to next microtask — avoids conflicts with rAF callback
      Promise.resolve().then(() => {
        router.push(href)
      })

      // Safety valve: if route change doesn't complete within 1.5s,
      // force navigation via window.location.href as absolute fallback
      setTimeout(() => {
        if (pendingHref.current === href && phaseRef.current === 'hold') {
          // router.push likely failed silently — force hard navigation
          window.location.href = href
        }
      }, 1500)
    })
  }, [router, animateWith])

  return (
    <TransitionContext.Provider value={{ phase, progress, navigateTo }}>
      {children}
    </TransitionContext.Provider>
  )
}
