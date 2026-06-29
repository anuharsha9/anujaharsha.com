'use client'

import { createContext, useContext, useCallback, useState, useRef, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type Phase = 'idle' | 'submerge' | 'hold' | 'emerge'

interface TransitionContextValue {
  phase: Phase
  navigateTo: (href: string) => void
}

const TransitionContext = createContext<TransitionContextValue>({
  phase: 'idle',
  navigateTo: () => {},
})

export function useTransition() {
  return useContext(TransitionContext)
}

/* ── Oceanic wave easing ──────────────────────────────────
 *
 *   SURGE   = 900ms — deep-water swell gathering and crashing
 *   HOLD    = imperceptible route swap
 *   RETREAT = 600ms — gravity drains the water mass back
 *
 *   Total cycle: ~1.5 seconds. Brisk but still tidal — fast enough
 *   that recruiters clicking through never wait on the chrome.
 *   (Reduced-motion users skip the wash entirely — see navigateTo.)
 *
 *   Asymmetric motion — like REAL ocean waves:
 *   - Surge: slow build (0–40%) → gathering momentum (40–80%) → decelerates at peak
 *   - Retreat: water lingers at apex (momentum exhausted) → gravity accelerates drain
 *
 *   The retreat is NOT a "yank" — it's a ball at the top of its arc.
 *   Velocity = 0 at the peak, then gravity gradually takes over.
 */

function easeSurge(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 // easeInOutCubic
}

function easeRetreat(t: number): number {
  return Math.pow(t, 3) // easeInCubic
}

function normalizePath(p: string): string {
  if (!p) return ''
  let path = p
  try {
    if (p.startsWith('http://') || p.startsWith('https://')) {
      path = new URL(p).pathname
    }
  } catch { /* ignore */ }
  path = path.split('?')[0].split('#')[0]
  const cleaned = path.toLowerCase().replace(/^\/+|\/+$/g, '')
  return cleaned === '' ? '/' : cleaned
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

      // Dispatch custom event to drive canvas loop without triggering React renders
      window.dispatchEvent(new CustomEvent('wave-progress', { detail: { progress: finalProgress, raw: raw } }))
      
      if (raw < 1) animRef.current = requestAnimationFrame(tick)
      else cb()
    }
    animRef.current = requestAnimationFrame(tick)
  }, [])

  /** Start the emerge (retreat) animation */
  const startEmerge = useCallback(() => {
    sessionStorage.removeItem('transition_pending')
    setPhase('emerge')
    phaseRef.current = 'emerge'
    window.dispatchEvent(new CustomEvent('wave-progress', { detail: { progress: 0, raw: 0 } }))
    window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'emerge' } }))

    animateWith(600, easeRetreat, () => {
      setPhase('idle')
      phaseRef.current = 'idle'
      window.dispatchEvent(new CustomEvent('wave-progress', { detail: { progress: 0, raw: 0 } }))
      navLock.current = false
      pendingHref.current = null
      window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'idle' } }))
      if (lenisRef.current) lenisRef.current.start()

      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('scroll'))
      })
    })
  }, [animateWith])

  // Keep a ref in sync with pathname so navigateTo always has current value
  const pathnameRef = useRef(pathname)

  // Handle hard-navigation recovery safely on the client after hydration
  useEffect(() => {
    const pending = sessionStorage.getItem('transition_pending')
    if (pending === 'true') {
      sessionStorage.removeItem('transition_pending')
      startEmerge()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // ONLY run on mount to catch hard reloads

  // Watch for pathname changes (Next.js route completed)
  useEffect(() => {
    // If we're entering a page and we were somehow still holding (safety net fallback)
    if (phaseRef.current === 'hold') {
      if (normalizePath(pathname) === normalizePath(pendingHref.current || '')) {
        startEmerge()
      }
    }
    pathnameRef.current = pathname
  }, [pathname, startEmerge])

  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const navigateTo = useCallback((href: string) => {
    // Append trailing slash to match next.config.js trailingSlash: true on S3 static hosting
    let targetHref = href
    if (targetHref.startsWith('/') && targetHref !== '/') {
      const parts = targetHref.split(/[?#]/)
      const path = parts[0]
      if (!path.endsWith('/') && !path.includes('.')) {
        parts[0] = path + '/'
        targetHref = parts.join('')
      }
    }

    if (navLock.current || normalizePath(targetHref) === normalizePath(pathnameRef.current)) return

    // Respect prefers-reduced-motion: skip the tidal-wash entirely and just
    // navigate. (The wave runs on a raw canvas/rAF pipeline that MotionConfig
    // can't reach, so it must be guarded here directly.)
    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      router.push(targetHref, { scroll: true })
      return
    }

    navLock.current = true

    // Global failsafe: clear lock and force transition completion to prevent infinite deadlocks
    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current)
    lockTimeoutRef.current = setTimeout(() => {
        navLock.current = false
        if (phaseRef.current === 'submerge' || phaseRef.current === 'hold') {
            startEmerge()
        }
    }, 2500)

    pendingHref.current = targetHref

    // 1) Stop scroll
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    lenisRef.current = lenis || null
    if (lenis) lenis.stop()

    // 2) Start Submerge
    setPhase('submerge')
    phaseRef.current = 'submerge'
    window.dispatchEvent(new CustomEvent('wave-progress', { detail: { progress: 0, raw: 0 } }))
    window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'submerge' } }))

    // 3) Push router when the wave is near the peak and content is fully black (at 700ms / ~78% of surge)
    setTimeout(() => {
      if (phaseRef.current !== 'submerge') return
      sessionStorage.setItem('transition_pending', 'true')
      Promise.resolve().then(() => {
        router.push(targetHref, { scroll: true })
      }).catch(err => {
        console.error('[TransitionContext] router.push threw error:', err)
      })
    }, 700)

    animateWith(900, easeSurge, () => {
      // The instant the surging wave hits its peak, gravity takes over.
      if (normalizePath(pathnameRef.current) === normalizePath(pendingHref.current || '')) {
        // NO HOLD PHASE. A physical wave never pauses gracefully in mid-air.
        startEmerge()
      } else {
        // Network is slow — we must hold the waves up to prevent revealing the old page
        setPhase('hold')
        phaseRef.current = 'hold'
        window.dispatchEvent(new CustomEvent('wave-progress', { detail: { progress: 1, raw: 1 } }))
      }
    })
  }, [router, animateWith, startEmerge])

  return (
    <TransitionContext.Provider value={{ phase, navigateTo }}>
      {children}
    </TransitionContext.Provider>
  )
}
