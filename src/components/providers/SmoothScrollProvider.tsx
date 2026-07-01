'use client'

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { DURATION } from '@/lib/motion'

// Context to expose Lenis instance for programmatic scrollTo
const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
    return useContext(LenisContext)
}

interface SmoothScrollProviderProps {
    children: ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null)
    const pathname = usePathname()

    // Reset scroll position on route change
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true })
        } else {
            window.scrollTo(0, 0)
        }
    }, [pathname])

    useEffect(() => {
        // Don't initialize on mobile/touch devices — native scroll feels better there
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        if (isTouchDevice) return

        /* Defer the Lenis constructor + rAF loop until the browser is idle.
         * Lenis instantiation walks the DOM to attach listeners and starts a
         * per-frame rAF that reads scroll state — expensive enough to show up
         * as a long task on cold loads. A visitor cannot scroll before first
         * paint anyway, so a 200ms idle defer is completely invisible but
         * moves the setup work out of the critical render path. */
        let lenis: Lenis | null = null
        let raf: ((time: number) => void) | null = null

        const kickoff = () => {
            lenis = new Lenis({
                duration: DURATION.reveal,           // Slower = heavier, more deliberate scroll weight
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 0.8,    // Less distance per scroll tick = smoother, more controlled
                touchMultiplier: 1.5,    // Keep mobile scrolling responsive
            })

            lenisRef.current = lenis

            raf = (time: number) => {
                lenis?.raf(time)
                requestAnimationFrame(raf!)
            }
            requestAnimationFrame(raf)

            // Expose globally for edge cases (lightboxes, modals that need to stop/start)
            ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
        }

        let idleId = 0
        if (typeof window.requestIdleCallback === 'function') {
            idleId = window.requestIdleCallback(kickoff, { timeout: 300 })
        } else {
            idleId = window.setTimeout(kickoff, 120)
        }

        return () => {
            if (typeof window.cancelIdleCallback === 'function') {
                window.cancelIdleCallback(idleId)
            } else {
                window.clearTimeout(idleId)
            }
            lenis?.destroy()
            lenisRef.current = null
            ;(window as unknown as { __lenis?: Lenis }).__lenis = undefined
        }
    }, [])

    return (
        <LenisContext.Provider value={lenisRef.current}>
            {children}
        </LenisContext.Provider>
    )
}
