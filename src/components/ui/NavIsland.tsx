'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { m } from 'framer-motion'
import { ArrowLeft, type LucideIcon } from 'lucide-react'
import { GLASS_PILL, GLASS_PILL_STATES } from '@/lib/surfaces'

/**
 * THE Dynamic-Island nav shell — one canonical component for every nav context
 * (Work/Life, RC/ML/IQ, Back). No more duplicated island markup.
 *
 * Glass + all interactive states come from the shared GLASS_PILL language
 * (see src/lib/surfaces.ts) — the same surface the lightbox + icon buttons use.
 *
 * Renders an optional leading pill (Back/Home) and/or a segmented control with a
 * spring-sliding active highlight. If there's no segmented control, the leading
 * pill centers itself (so a lone "Back" reads as intentional, not lopsided).
 */

export interface NavSegment {
    id: string
    label: string
    short?: string // compact label for narrow viewports (e.g. "RC")
    icon?: LucideIcon
}

interface NavIslandProps {
    segments?: NavSegment[]
    activeId?: string
    onSelect?: (id: string) => void
    leading?: { label: string; onClick: () => void; icon?: LucideIcon }
    ariaLabel?: string
    /** Render in-flow (relative) instead of fixed top-center — for the design-system specimen. */
    embedded?: boolean
}

/* The ONE glass-pill surface (shared language — tokens only). */
const PILL = GLASS_PILL

export default function NavIsland({ segments, activeId, onSelect, leading, ariaLabel, embedded = false }: NavIslandProps) {
    const hasSegments = !!segments && segments.length > 0

    /* Active-highlight geometry — measured from the REAL active button, not
     * derived from equal-column percentage math. The segments are inline-flex
     * with intrinsic widths ('ReportCaster' is a wider button than 'IQ
     * Plugin'), so 100/count% columns never matched the actual text and the
     * highlight sat visibly off-center behind longer/shorter labels.
     * offsetLeft/offsetWidth are relative to the island (its offsetParent),
     * so the pill hugs whichever button is active, exactly. Re-measured on
     * resize because labels swap between full and short at the sm breakpoint. */
    const btnRefs = useRef(new Map<string, HTMLButtonElement>())
    const [slider, setSlider] = useState<{ left: number; width: number } | null>(null)

    useLayoutEffect(() => {
        if (!hasSegments || !activeId) return
        const measure = () => {
            const btn = btnRefs.current.get(activeId)
            if (btn) setSlider({ left: btn.offsetLeft, width: btn.offsetWidth })
        }
        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [hasSegments, activeId, segments])

    const leadingPill = leading && (
        <button
            onClick={leading.onClick}
            aria-label={leading.label}
            title={leading.label}
            className={`${PILL} ${GLASS_PILL_STATES} pointer-events-auto group inline-flex items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 md:px-4 md:text-[11px]`}
        >
            {leading.icon
                ? <leading.icon className="h-3.5 w-3.5" />
                : <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />}
            <span className="hidden sm:inline">{leading.label}</span>
        </button>
    )

    return (
        <div
            className={embedded
                ? 'pointer-events-none relative flex items-center justify-center gap-3'
                : 'pointer-events-none fixed inset-x-0 top-0 z-[10001] flex items-start justify-center gap-3'}
            style={embedded ? undefined : { paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        >
            {/* Leading sits left of a switcher, or centers when it's the only control. */}
            {leading && (hasSegments
                ? <div className="absolute left-4 md:left-6">{leadingPill}</div>
                : leadingPill)}

            {hasSegments && (
                <div className={`${PILL} pointer-events-auto relative inline-flex items-center gap-1 p-1`} role="tablist" aria-label={ariaLabel}>
                    {/* Active highlight — spring-slides between segments, sized to
                        the measured active button (null until first measure so it
                        never flashes at a wrong position). */}
                    {slider && (
                        <m.div
                            className="absolute inset-y-1 rounded-full bg-[var(--overlay-white-10)] ring-1 ring-[var(--overlay-white-15)]"
                            initial={false}
                            animate={{ left: slider.left, width: slider.width }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            aria-hidden="true"
                        />
                    )}
                    {segments!.map(seg => {
                        const Icon = seg.icon
                        const isActive = seg.id === activeId
                        return (
                            <button
                                key={seg.id}
                                ref={(el) => { if (el) btnRefs.current.set(seg.id, el); else btnRefs.current.delete(seg.id) }}
                                onClick={() => onSelect?.(seg.id)}
                                role="tab"
                                aria-selected={isActive}
                                title={seg.label}
                                className={`relative z-[1] inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 active:scale-[0.97] md:px-5 md:text-[11px] ${isActive ? 'text-[var(--accent-teal)]' : 'text-zinc-400 hover:text-zinc-200'
                                    }`}
                            >
                                {Icon && <Icon className="h-3.5 w-3.5" />}
                                {seg.short
                                    ? (<><span className="hidden sm:inline">{seg.label}</span><span className="sm:hidden">{seg.short}</span></>)
                                    : <span>{seg.label}</span>}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
