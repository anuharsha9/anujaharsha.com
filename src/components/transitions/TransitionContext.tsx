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

/**
 * TransitionProvider — intercepts navigation to play transitions.
 *
 * SUBMERGE (500ms): Old content blurs + fades into the aurora.
 * HOLD     (200ms): Pure aurora. Navigate + scroll reset.
 * EMERGE   (600ms): New content sharpens + rises from the aurora.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState(0)
  const navLock = useRef(false)
  const animRef = useRef<number>(0)

  const animate = useCallback((ms: number, cb: () => void) => {
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - t0) / ms, 1)
      setProgress(1 - Math.pow(1 - t, 3)) // ease-out cubic
      if (t < 1) animRef.current = requestAnimationFrame(tick)
      else cb()
    }
    animRef.current = requestAnimationFrame(tick)
  }, [])

  const navigateTo = useCallback((href: string) => {
    // Normalize paths (strip trailing slashes for comparison)
    const normalize = (p: string) => p === '/' ? '/' : p.replace(/\/+$/, '')
    if (navLock.current || normalize(href) === normalize(pathname)) return
    navLock.current = true

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    if (lenis) lenis.stop()

    // Tell aurora to surge
    window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'surge' } }))

    // Phase 1: SUBMERGE — wave sweeps up, old content fades
    setPhase('submerge')
    setProgress(0)

    animate(500, () => {
      // Phase 2: HOLD — navigate while wave covers everything
      setPhase('hold')
      setProgress(1)
      window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'hold' } }))

      // Do the actual navigation
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      router.push(href)

      // Give Next.js time to render the new page, then retreat
      setTimeout(() => {
        // Phase 3: EMERGE — wave recedes, new content revealed
        setPhase('emerge')
        setProgress(0)
        window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'retreat' } }))

        animate(600, () => {
          setPhase('idle')
          setProgress(0)
          navLock.current = false
          window.dispatchEvent(new CustomEvent('wave-transition', { detail: { phase: 'idle' } }))
          if (lenis) lenis.start()

          requestAnimationFrame(() => {
            window.dispatchEvent(new Event('scroll'))
          })
        })
      }, 350) // hold: give Next.js time to render new page
    })
  }, [pathname, router, animate])

  return (
    <TransitionContext.Provider value={{ phase, progress, navigateTo }}>
      {children}
    </TransitionContext.Provider>
  )
}
