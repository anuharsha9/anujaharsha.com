'use client'

import { ReactNode, MouseEvent } from 'react'
import TransitionLink from '@/components/transitions/TransitionLink'

/**
 * Site-wide button primitive — single source of truth.
 *
 * Every button on the site uses this. Same surface, same shape, same hover,
 * same press, same focus — color is the only thing that differs between
 * variants. Recipe matches the FloatingActions chips (Resume / Ask Anu) and
 * the NavIsland: compact, mono caps, glass pill, restrained — Anuja's
 * "whispering intensity" aesthetic. No primary-only glow halos, no
 * light-sweeps, no dark blur patches dropped over the aurora background.
 *
 * Variants (identical surface + states; ONLY color tokens swap):
 *  - secondary    — white border + white text. Default for most CTAs.
 *  - primary      — teal border + teal text. The forward action.
 *  - accent-amber — amber border + amber text. Reserved for the résumé CTA
 *                   (the one semantic non-teal: "hire me").
 *  - ghost        — minimal text/icon link for tertiary actions.
 *
 * Polymorphic: TransitionLink for internal `href`, `<a target="_blank">`
 * for `external`, `<button>` otherwise.
 */

type Variant = 'primary' | 'secondary' | 'accent-amber' | 'ghost'
type Size = 'sm' | 'md'

interface BaseProps {
    variant?: Variant
    size?: Size
    icon?: ReactNode
    className?: string
    children?: ReactNode
    'aria-label'?: string
}

interface AsButton extends BaseProps {
    href?: undefined
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    type?: 'button' | 'submit'
}

interface AsLink extends BaseProps {
    href: string
    external?: boolean
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

type ButtonProps = AsButton | AsLink

/* Same proportions as the FloatingActions chips + NavIsland leading pill.
 * sm = the chip default. md = a touch larger for hero / standalone CTAs.
 * Both stay compact and font-mono caps — restrained, never shouting. */
const SIZES: Record<Size, string> = {
    sm: 'p-2.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px]',
    md: 'px-4 py-2.5 sm:px-5 sm:py-3 text-[11px] sm:text-xs',
}

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

/* THE shared pill surface — mirror of GLASS_PILL + GLASS_PILL_STATES from
 * lib/surfaces.ts, the same surface the NavIsland and SystemLightbox use.
 * Color (border + text) is added per variant; everything else is fixed. */
const PILL_SHELL =
    `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full ` +
    `bg-[var(--overlay-ink-55)] backdrop-blur-xl ` +
    `shadow-[var(--shadow-lg)] ` +
    `font-mono uppercase tracking-[0.2em] ` +
    `transition-all duration-300 active:scale-[0.97] ${FOCUS}`

const VARIANTS: Record<Variant, string> = {
    secondary:
        `${PILL_SHELL} ` +
        `border border-[var(--overlay-white-10)] text-zinc-200 ` +
        `hover:border-[var(--overlay-white-20)] hover:bg-[var(--overlay-ink-75)] hover:text-white`,
    primary:
        `${PILL_SHELL} ` +
        `border border-[rgba(var(--accent-teal-rgb),0.35)] text-[var(--accent-teal-bright)] ` +
        `hover:border-[rgba(var(--accent-teal-rgb),0.6)] hover:bg-[var(--overlay-ink-75)] hover:text-white`,
    'accent-amber':
        `${PILL_SHELL} ` +
        `border border-[rgba(var(--accent-amber-rgb),0.35)] text-[var(--accent-amber)] ` +
        `hover:border-[rgba(var(--accent-amber-rgb),0.6)] hover:bg-[var(--overlay-ink-75)] hover:text-white`,
    ghost:
        `inline-flex items-center gap-1.5 font-medium text-zinc-400 ` +
        `transition-colors duration-200 hover:text-white ${FOCUS} rounded-md`,
}

export default function Button(props: ButtonProps) {
    const { variant = 'primary', size = 'sm', icon, className = '', children } = props
    const sizeCls = variant === 'ghost' ? (size === 'sm' ? 'text-xs' : 'text-sm') : SIZES[size]
    const cls = `${VARIANTS[variant]} ${sizeCls} ${className}`.trim()

    const inner = (
        <span className="inline-flex items-center gap-2">
            {icon}
            {children}
        </span>
    )

    if ('href' in props && props.href) {
        if (props.external) {
            return (
                <a
                    href={props.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                    onClick={props.onClick}
                    aria-label={props['aria-label']}
                >
                    {inner}
                </a>
            )
        }
        return (
            <TransitionLink href={props.href} className={cls} aria-label={props['aria-label']} onClick={props.onClick}>
                {inner}
            </TransitionLink>
        )
    }

    return (
        <button
            type={(props as AsButton).type ?? 'button'}
            onClick={(props as AsButton).onClick}
            className={cls}
            aria-label={props['aria-label']}
        >
            {inner}
        </button>
    )
}
