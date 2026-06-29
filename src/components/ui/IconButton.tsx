'use client'

import { type LucideIcon } from 'lucide-react'
import { GLASS_PILL_INTERACTIVE } from '@/lib/surfaces'

/**
 * THE circular glass icon button — one canonical control for every icon-only
 * action (lightbox close / zoom / play, nav arrows, …). Surface + states come
 * from the shared GLASS_PILL language, so it always matches the nav island and
 * there is never a second icon-button doing the same job a little differently.
 */

const SIZES = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-12 w-12 md:h-14 md:w-14',
} as const

const ICON_SIZES: Record<keyof typeof SIZES, number> = { sm: 16, md: 20, lg: 24 }

interface IconButtonProps {
    icon: LucideIcon
    /** Accessible name — used for both aria-label and the native title tooltip. */
    label: string
    onClick?: () => void
    size?: keyof typeof SIZES
    /** Override the icon glyph size (defaults to a size-matched value). */
    iconSize?: number
    /** Fill the glyph (e.g. a solid Play/Pause triangle). */
    fill?: boolean
    className?: string
}

export default function IconButton({
    icon: Icon,
    label,
    onClick,
    size = 'md',
    iconSize,
    fill = false,
    className = '',
}: IconButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            className={`${GLASS_PILL_INTERACTIVE} pointer-events-auto inline-flex items-center justify-center text-zinc-300 ${SIZES[size]} ${className}`}
        >
            <Icon size={iconSize ?? ICON_SIZES[size]} fill={fill ? 'currentColor' : 'none'} />
        </button>
    )
}
