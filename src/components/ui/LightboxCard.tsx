import type { ReactNode } from 'react'

/* Accent-colored card used inside lightbox case studies (highlights grid).
 * Extracted from a pattern that was repeated 7+ times across
 * AppCaseStudyLightbox and PortfolioLightbox.
 *
 * Usage:
 *   <LightboxCard accentRgb="--accent-teal-rgb">
 *     <h3>...</h3><p>...</p>
 *   </LightboxCard>
 *
 * When `accentRgb` is omitted, a neutral border is used. */
interface LightboxCardProps {
    /** Accent color CSS variable name (e.g. '--accent-teal-rgb'). */
    accentRgb?: string
    /** Extra classes — appended to the base card classes. */
    className?: string
    children: ReactNode
}

export default function LightboxCard({ accentRgb, className = '', children }: LightboxCardProps) {
    return (
        <div
            className={`rounded-2xl border bg-white/[0.02] p-5 transition-colors duration-300 ${
                accentRgb ? '' : 'border-white/[0.08]'
            } ${className}`}
            style={accentRgb ? { borderColor: `rgba(var(${accentRgb}), 0.18)` } : undefined}
        >
            {children}
        </div>
    )
}
