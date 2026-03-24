'use client'

import { createContext, useContext, useCallback, useState, useRef, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type Phase = 'idle' | 'submerge' | 'hold' | 'emerge'

interface TransitionContextValue {
  phase: Phase
  /** Live progress ref — read in rAF loops, never triggers re-renders */
  progressRef: React.RefObject<number>
  navigateTo: (href: string) => void
}

const TransitionContext = createContext<TransitionContextValue>({
  phase: 'idle',
  progressRef: { current: 0 },
  navigateTo: () => {},
})

export function useTransition() {
  return useContext(TransitionContext)
}

/* ── Fluid-dynamics easing ──────────────────────────────────
 *
 * Sinusoidal curves model real fluid momentum:
 *   SURGE:   Smooth acceleration → effortless coast → gentle arrival
 *   RETREAT: Barely perceptible start → flowing middle → soft landing
 *
 * Sine curves are C∞-smooth (infinitely differentiable). No corners,
 * no piecewise joins, no "mechanical" moments. Just fluid motion.
 */

/** Surge: smooth ramp-up, effortless deceleration — wave rushing ashore */
function easeSurge(t: number): number {
  return Math.sin(t * Math.PI * 0.5)
}

/** Retreat: barely-there start, flowing through, soft landing */
function easeRetreat(t: number): number {
  return (1 - Math.cos(t * Math.PI)) * 0.5
}

/**
 * TransitionProvider — intercepts navigation to play transitions.
 *
 * ZERO React re-renders during animation. Progress lives in a ref,
 * DOM updates happen via rAF in PageTransition. React only re-renders
 * on phase changes (4 total per transition: idle→submerge→hold→emerge→idle).
 *
 * SUBMERGE  (900ms): Wave surges up — smooth, effortless momentum.
 * HOLD      (350ms): Full coverage. Navigate + scroll reset.
 * EMERGE    (900ms): Wave retreats — gravitational, unhurried.
 *
 * Total: ~2.15s
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  const progressRef = useRef(0)
  const navLock = useRef(false)
  const animRef = useRef<number>(0)

  /** Animate via ref — NO React state updates during animation */
  const animateWith = useCallback((ms: number, easing: (t: number) => number, cb: () => void) => {
    const t0 = performance.now()
    const tick = (now: number) => {
      const raw = Math.min((now - t0) / ms, 1)
      progressRef.current = easing(raw)  // ← ref, not setState
      if (raw < 1) animRef.current = requestAnimationFrame(tick)
      else cb()
    }
    animRef.current = requestAnimationFrame(tick)
  }, [])

  const navigateTo = useCallback((href: string) => {
    const normalize = (p: string) => p === '/' ? '/' : p.replace(/\/+$/, '')
    if (navLock.current || normalize(href) === normalize(pathname)) return
    navLock.current = true

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void; scrollTo: (target: number, options?: { immediate?: boolean }) => void } }).__lenis
    if (lenis) lenis.stop()

    // Tell aurora to surge
    window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'surge' } }))

    // Phase 1: SUBMERGE — wave flows up (smooth sine momentum)
    progressRef.current = 0
    setPhase('submerge')  // ← only re-render: phase change

    animateWith(900, easeSurge, () => {
      // Phase 2: HOLD — total submersion, navigate underneath
      progressRef.current = 1
      setPhase('hold')
      window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'hold' } }))

      // Force scroll to top
      if (lenis) lenis.scrollTo(0, { immediate: true })
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      router.push(href)

      // Phase 3: EMERGE — wave retreats (smooth sine, gravitational)
      setTimeout(() => {
        if (lenis) lenis.scrollTo(0, { immediate: true })
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })

        progressRef.current = 0
        setPhase('emerge')
        window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'retreat' } }))

        animateWith(900, easeRetreat, () => {
          progressRef.current = 0
          setPhase('idle')
          navLock.current = false
          window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'idle' } }))
          if (lenis) lenis.start()

          requestAnimationFrame(() => {
            window.dispatchEvent(new Event('scroll'))
          })
        })
      }, 350)
    })
  }, [pathname, router, animateWith])

  return (
    <TransitionContext.Provider value={{ phase, progressRef, navigateTo }}>
      {children}
    </TransitionContext.Provider>
  )
}
