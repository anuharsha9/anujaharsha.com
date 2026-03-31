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

/* ── Oceanic wave easing ──────────────────────────────────
 *
 *   SURGE   = 1600ms — deep-water swell gathering and crashing
 *   HOLD    = imperceptible route swap
 *   RETREAT = 2200ms — gravity drains the water mass back
 *
 *   Total cycle: ~3.8 seconds. Heavy, tidal, oceanic.
 *
 *   Asymmetric motion — like REAL ocean waves:
 *   - Surge: slow build (0–40%) → gathering momentum (40–80%) → decelerates at peak
 *   - Retreat: water lingers at apex (momentum exhausted) → gravity accelerates drain
 *
 *   The retreat is NOT a "yank" — it's a ball at the top of its arc.
 *   Velocity = 0 at the peak, then gravity gradually takes over.
 */

/** Surge: fast onset (the crash), smoothly decelerating roundly to the peak.
 *  Uses pure sine calculus for flawless effortless $C^1$ continuity. */
function easeSurge(t: number): number {
  return Math.sin(t * Math.PI / 2)
}

/** Retreat: gravity drain.
 *  Water rolls effortlessly out of the peak with harmonic acceleration. */
function easeRetreat(t: number): number {
  return 1 - Math.cos(t * Math.PI / 2)
}

/**
 * TransitionProvider — intercepts navigation to play the Tidal Wash.
 *
 * Timeline:
 *   SUBMERGE  (1600ms): Heavy swell rises with gathering momentum
 *   HOLD      (imperceptible): Route swaps, waves keep undulating
 *   EMERGE    (2200ms): Gravity drainage — hover at apex, accelerating fall
 *
 * 80% coverage at peak — wave crest stops at ~20% from viewport top.
 * No pause at top — continuous tidal motion like real ocean.
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

  /** Animate with a custom easing curve using strict delta-time clamping */
  const animateWith = useCallback((ms: number, easing: (t: number) => number, cb: () => void) => {
    let tPrev: number | null = null
    let elapsed = 0 // Track accumulated time

    const tick = (now?: number) => {
      const currentNow = (typeof now === 'number' && Number.isFinite(now)) ? now : performance.now()
      
      if (tPrev === null) tPrev = currentNow
      
      // Calculate delta time in milliseconds
      let dt = currentNow - tPrev
      tPrev = currentNow
      
      // CRITICAL FIX: Clamp dt to a maximum of 50ms per frame.
      // If Next.js completely freezes the main thread (router.push), 
      // the timeline progress simply pauses and resumes gracefully, 
      // completely eliminating "lag teleportation" whiplash.
      if (!Number.isFinite(dt) || Number.isNaN(dt)) dt = 0
      dt = Math.min(dt, 50) 
      
      elapsed += dt
      
      // Calculate fraction, ensure valid number, and strictly clamp
      let raw = elapsed / ms
      if (!Number.isFinite(raw) || Number.isNaN(raw)) raw = 0
      raw = Math.max(0, Math.min(raw, 1))

      let finalProgress = easing(raw)
      if (!Number.isFinite(finalProgress) || Number.isNaN(finalProgress)) finalProgress = raw // fallback

      setProgress(finalProgress)
      
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

    animateWith(1100, easeRetreat, () => {
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

    // Phase 1: SUBMERGE — canvas waves build upward (1400ms, oceanic physics)
    setPhase('submerge')
    phaseRef.current = 'submerge'
    setProgress(0)
    pendingHref.current = href

    // PRE-FIRE ROUTING: At 1050ms, the screen opacity reaches 0. We trigger the Next.js route swap early.
    setTimeout(() => {
      // If phase is somehow no longer submerge, abort (safety)
      if (phaseRef.current !== 'submerge') return
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      Promise.resolve().then(() => {
        router.push(href)
      })
    }, 1050)

    animateWith(1400, easeSurge, () => {
      const normalize = (p: string) => p === '/' ? '/' : p.replace(/\/+$/, '')
      
      // If Next.js completely finished the route swap during the last 500ms of the surge:
      if (normalize(pathnameRef.current) === normalize(pendingHref.current || '')) {
        // Zero pause! Instantly begin gravitational fall (emerge)
        startEmerge()
      } else {
        // Fallback: The network is slow. The route hasn't resolved yet.
        // We MUST hold the waves at the top until Next.js finishes.
        setPhase('hold')
        phaseRef.current = 'hold'
        setProgress(1)
        window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'hold' } }))

        // Safety valve: if route change doesn't complete within 1.5s of holding, force hard navigation
        setTimeout(() => {
          if (pendingHref.current === href && phaseRef.current === 'hold') {
            window.location.href = href
          }
        }, 1500)
      }
    })
  }, [router, animateWith, startEmerge])

  return (
    <TransitionContext.Provider value={{ phase, progress, navigateTo }}>
      {children}
    </TransitionContext.Provider>
  )
}
