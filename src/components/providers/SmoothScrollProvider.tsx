'use client'

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

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

        const lenis = new Lenis({
            duration: 1.6,           // Slower = heavier, more deliberate scroll weight
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8,    // Less distance per scroll tick = smoother, more controlled
            touchMultiplier: 1.5,    // Keep mobile scrolling responsive
            // Lenis automatically syncs with native scroll events,
            // so useScrollManager, whileInView, IntersectionObserver all work
        })

        lenisRef.current = lenis

        // RAF loop to drive Lenis
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

            // Expose globally for edge cases (lightboxes, modals that need to stop/start)
            ; (window as any).__lenis = lenis

        return () => {
            lenis.destroy()
            lenisRef.current = null
                ; (window as any).__lenis = undefined
        }
    }, [])

    return (
        <LenisContext.Provider value={lenisRef.current}>
            {children}
        </LenisContext.Provider>
    )
}
