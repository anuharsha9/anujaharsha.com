'use client'

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
    const count = hasSegments ? segments!.length : 0
    const rawIndex = hasSegments ? segments!.findIndex(s => s.id === activeId) : -1
    const idx = rawIndex === -1 ? 0 : rawIndex
    const sliderLeft =
        idx === 0 ? '4px'
            : idx === count - 1 ? `calc(100% - ${100 / count}% + 0px)`
                : `calc(${(100 / count) * idx}% + 2px)`

    const leadingPill = leading && (
        <button
            onClick={leading.onClick}
            aria-label={leading.label}
            title={leading.label}
            className={`${PILL} ${GLASS_PILL_STATES} pointer-events-auto group inline-flex items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-300 md:px-4 md:text-[11px]`}
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
                    {/* Active highlight — spring-slides between segments. */}
                    <m.div
                        className="absolute inset-y-1 rounded-full bg-[var(--overlay-white-10)] ring-1 ring-[var(--overlay-white-15)]"
                        style={{ width: `calc(${100 / count}% - 4px)` }}
                        animate={{ left: sliderLeft }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        aria-hidden="true"
                    />
                    {segments!.map(seg => {
                        const Icon = seg.icon
                        const isActive = seg.id === activeId
                        return (
                            <button
                                key={seg.id}
                                onClick={() => onSelect?.(seg.id)}
                                role="tab"
                                aria-selected={isActive}
                                title={seg.label}
                                className={`relative z-[1] inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 active:scale-[0.97] md:px-5 md:text-[11px] ${isActive ? 'text-[var(--accent-teal)]' : 'text-zinc-400 hover:text-zinc-200'
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
