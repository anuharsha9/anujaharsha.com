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
 * Real waves are asymmetric — surge ≠ retreat:
 *
 *   SURGE:   Builds momentum like water being pulled by undertow,
 *            then crashes with force. Slight deceleration at crest,
 *            but NOT symmetric — the wave is still moving fast when
 *            it reaches peak. Think: 30% ease-in, 70% sustained speed.
 *
 *   RETREAT: Lingers at crest (surface tension), then gravity kicks in
 *            and accelerates the pullback. The retreat STARTS slow
 *            and ENDS fast — like water draining off a tilted surface.
 *
 * Timing (continuous, no perceivable pause):
 *   SURGE   = 850ms  (heavy, building momentum)
 *   HOLD    = imperceptible (just route swap)
 *   RETREAT = 1000ms (languid gravity drain)
 */

/** Surge: builds momentum, sustains through crest — asymmetric ease */
function easeSurge(t: number): number {
  // Custom curve: gentle start (0-20%), rapid acceleration (20-60%),
  // sustained speed through crest (60-100%) with only slight decel.
  // This feels like water CRASHING — not a gentle sine wave.
  if (t < 0.3) {
    // Slow start: cubic ease-in for first 30%
    const local = t / 0.3
    return 0.15 * (local * local * local)
  }
  // Fast sustained: sine curve from 15% to 100% over remaining 70%
  const local = (t - 0.3) / 0.7
  return 0.15 + 0.85 * Math.sin(local * Math.PI * 0.5)
}

/** Retreat: lingers at crest, then gravity accelerates pullback */
function easeRetreat(t: number): number {
  // Quartic ease-in: much slower start than quadratic,
  // then snaps into acceleration — like surface tension breaking
  // and gravity yanking the water back.
  return t * t * t * t
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

    animateWith(1000, easeRetreat, () => {
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

    animateWith(850, easeSurge, () => {
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
