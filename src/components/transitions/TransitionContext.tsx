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
 *   SURGE:   Accelerates fast initially, then decelerates gently at peak
 *            (mimics water momentum + resistance as crest reaches height)
 *   RETREAT: Slow departure from peak, then gravity takes over
 *            (lingering crest, then accelerating fall)
 *
 * Per the spec, total transition is ~1300ms:
 *   SURGE   = 600ms  (powerful, visible sweep up)
 *   HOLD    = dynamic (wait for route swap, min ~150ms)
 *   RETREAT = 700ms  (slower — gravity + wet sand reveal)
 */

/** Surge: powerful push — starts fast, decelerates at peak */
function easeSurge(t: number): number {
  // Cubic ease-out: fast initial push, gentle arrival at peak
  return 1 - Math.pow(1 - t, 3)
}

/** Retreat: slow departure, then gravity accelerates the fall */
function easeRetreat(t: number): number {
  // Ease-in-quad: lingers at top, accelerates away
  if (t < 0.25) {
    // Slow departure (lingering at peak)
    return (t / 0.25) * (t / 0.25) * 0.1
  }
  // Accelerating descent
  const remaining = (t - 0.25) / 0.75
  return 0.1 + 0.9 * (1 - Math.pow(1 - remaining, 2))
}

/**
 * TransitionProvider — intercepts navigation to play the Tidal Wash.
 *
 * Timeline (from spec):
 *   SUBMERGE  (600ms): Wave surges from shoreline (70%) → covers 80% of viewport
 *   HOLD      (wait):  Full coverage. Navigate + scroll reset. Waits for route swap.
 *   EMERGE    (700ms): Wave retreats back to shoreline, revealing new content.
 *
 * 80-20 Rule: The wave never covers the full viewport. 80% coverage with
 * organic horizontal undulation — not a simple vertical wipe.
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

    animateWith(700, easeRetreat, () => {
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
      // Route has changed to our target — brief breathe-pulse then emerge
      setTimeout(startEmerge, 150)
    }
  }, [pathname, phase, startEmerge])

  const navigateTo = useCallback((href: string) => {
    const normalize = (p: string) => p === '/' ? '/' : p.replace(/\/+$/, '')
    if (navLock.current || normalize(href) === normalize(pathname)) return
    navLock.current = true

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    lenisRef.current = lenis || null
    if (lenis) lenis.stop()

    // Tell aurora to surge
    window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'surge' } }))

    // Phase 1: SUBMERGE — wave surges upward (600ms, powerful sweep)
    setPhase('submerge')
    phaseRef.current = 'submerge'
    setProgress(0)

    animateWith(600, easeSurge, () => {
      // Phase 2: HOLD — 80% coverage, aurora breathes
      setPhase('hold')
      phaseRef.current = 'hold'
      setProgress(1)
      pendingHref.current = href
      window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'hold' } }))

      // Scroll to top + navigate. Emerge triggered by pathname useEffect.
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      router.push(href)

      // Safety valve: if route change doesn't fire within 2s, emerge anyway
      setTimeout(() => {
        if (pendingHref.current === href && phaseRef.current === 'hold') {
          startEmerge()
        }
      }, 2000)
    })
  }, [pathname, router, animateWith, startEmerge])

  return (
    <TransitionContext.Provider value={{ phase, progress, navigateTo }}>
      {children}
    </TransitionContext.Provider>
  )
}
