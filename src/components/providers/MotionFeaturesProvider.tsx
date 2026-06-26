'use client'

import { LazyMotion, domMax } from 'framer-motion'
import { ReactNode } from 'react'

/**
 * Loads framer-motion's animation features once, high in the tree, so every
 * `m` component on the site can animate.
 *
 * Why it lives in the root layout (above PdfProvider / LightboxProvider) and
 * NOT inside PageShell: those context providers render their own overlays
 * (PdfLightbox, etc.) which use `m.*`. If LazyMotion were only inside PageShell,
 * an `m` component rendered by a provider *outside* PageShell would have no
 * features — its entrance animation never runs and it stays stuck at its
 * `initial` opacity 0, i.e. an invisible modal ("clicking does nothing"). This
 * exact bug hit the Resume PDF lightbox. Mounting features at the very top
 * covers all `m` consumers regardless of which provider renders them.
 *
 * domMax (not domAnimation) because the site uses layout animations (layoutId)
 * and drag (lightbox carousels).
 */
export default function MotionFeaturesProvider({ children }: { children: ReactNode }) {
    return <LazyMotion features={domMax}>{children}</LazyMotion>
}
