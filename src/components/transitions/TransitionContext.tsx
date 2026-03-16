'use client'

import { createContext, useContext, useCallback, useState, useRef, ReactNode } from 'react'
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
 *   SURGE:   Accelerates fast, powerful push → eases to a stop
 *            (power curve: t^1.6 with smooth deceleration)
 *   RETREAT: Starts slow, gravity pulls it back → accelerates away
 *            (gentle ease-in with a soft landing)
 *
 * This creates the feeling of mass and momentum — water, not a UI.
 */

/** Surge: fast attack, smooth deceleration — wave crashing onto shore */
function easeSurge(t: number): number {
  // Quadratic ease-out with a slight overshoot feel
  return 1 - Math.pow(1 - t, 2.4)
}

/** Retreat: slow start, then gravity pulls it away — water receding */
function easeRetreat(t: number): number {
  // Cubic ease-in-out biased toward ease-in (slow start, faster finish)
  return t < 0.4
    ? 2 * Math.pow(t / 0.4, 2) * 0.4   // slow crawl for first 40%
    : 0.4 + (1 - 0.4) * (1 - Math.pow(1 - (t - 0.4) / 0.6, 2))  // then ease out
}

/**
 * TransitionProvider — intercepts navigation to play transitions.
 *
 * SUBMERGE (350ms): Wave surges up — fast, powerful, like a wave breaking.
 * HOLD     (200ms): Full coverage. Navigate + scroll reset.
 * EMERGE   (650ms): Wave retreats — slow, gravitational, deliberate.
 *
 * Total: ~1.2s — the asymmetry makes it feel physical.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState(0)
  const navLock = useRef(false)
  const animRef = useRef<number>(0)

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

  const navigateTo = useCallback((href: string) => {
    const normalize = (p: string) => p === '/' ? '/' : p.replace(/\/+$/, '')
    if (navLock.current || normalize(href) === normalize(pathname)) return
    navLock.current = true

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    if (lenis) lenis.stop()

    // Tell aurora to surge
    window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'surge' } }))

    // Phase 1: SUBMERGE — wave crashes up (fast, powerful)
    setPhase('submerge')
    setProgress(0)

    animateWith(350, easeSurge, () => {
      // Phase 2: HOLD — total submersion, navigate underneath
      setPhase('hold')
      setProgress(1)
      window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'hold' } }))

      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      router.push(href)

      // Phase 3: EMERGE — wave retreats (slow, gravitational)
      setTimeout(() => {
        setPhase('emerge')
        setProgress(0)
        window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'retreat' } }))

        animateWith(650, easeRetreat, () => {
          setPhase('idle')
          setProgress(0)
          navLock.current = false
          window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'idle' } }))
          if (lenis) lenis.start()

          requestAnimationFrame(() => {
            window.dispatchEvent(new Event('scroll'))
          })
        })
      }, 200) // hold: brief submersion
    })
  }, [pathname, router, animateWith])

  return (
    <TransitionContext.Provider value={{ phase, progress, navigateTo }}>
      {children}
    </TransitionContext.Provider>
  )
}
