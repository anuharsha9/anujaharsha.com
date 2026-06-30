'use client'

import { ReactNode, MouseEvent } from 'react'
import TransitionLink from '@/components/transitions/TransitionLink'

/**
 * Site-wide button primitive — single source of truth. EVERY text-CTA on
 * the site uses this. Same shape, same hover, same press, same focus
 * across the whole site — color is the only thing that differs.
 *
 * Variants (all share IDENTICAL pill geometry + states):
 *  - primary      — teal-glow halo + light-sweep. The default forward action.
 *  - secondary    — ghost glass (white). Supporting actions, externals.
 *  - accent-amber — amber-glow halo + sweep. Reserved for the résumé CTA —
 *                   the one place a non-teal accent is semantic ("hire me").
 *                   Identical geometry to primary; only the color tokens change.
 *  - ghost        — minimal text/icon link for tertiary actions.
 *
 * Polymorphic: renders a TransitionLink for an internal `href`, a plain
 * <a target="_blank"> for `external`, and a <button> otherwise.
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

const SIZES: Record<Size, string> = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
}

/* Pill variants share the focus ring + tap feedback; ghost is a bare link. */
const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

/* All pill variants share the EXACT same shape + state recipe:
 *   rounded-full, ink-glass fill, backdrop-blur, semibold,
 *   transition 300ms, active:scale-[0.98], focus ring.
 * Only the accent color tokens differ between primary / secondary / accent-amber.
 * This is what "every button on the site is the same button" means in code. */
const PILL_SHELL =
    `group relative inline-flex items-center justify-center gap-2 rounded-full ` +
    `bg-black/40 backdrop-blur-md font-semibold ` +
    `transition-all duration-300 active:scale-[0.98] ${FOCUS}`

const VARIANTS: Record<Variant, string> = {
    primary:
        `btn-animated btn-sweep-teal ${PILL_SHELL} ` +
        `border border-[rgba(var(--accent-teal-rgb),0.35)] text-[var(--accent-teal-bright)] ` +
        `shadow-[0_0_30px_-8px_rgba(var(--accent-teal-glow-rgb),0.45)] ` +
        `hover:border-[rgba(var(--accent-teal-rgb),0.65)] hover:text-white ` +
        `hover:shadow-[0_0_42px_-6px_rgba(var(--accent-teal-glow-rgb),0.6)]`,
    secondary:
        `${PILL_SHELL} ` +
        `border border-white/20 text-zinc-200 ` +
        `shadow-[0_0_30px_-8px_rgba(var(--white-rgb),0.08)] ` +
        `hover:border-white/50 hover:bg-white/[0.10] hover:text-white ` +
        `hover:shadow-[0_0_42px_-6px_rgba(var(--white-rgb),0.15)]`,
    'accent-amber':
        `btn-animated ${PILL_SHELL} ` +
        `border border-[rgba(var(--accent-amber-rgb),0.35)] text-[var(--accent-amber)] ` +
        `shadow-[0_0_30px_-8px_rgba(var(--accent-amber-rgb),0.45)] ` +
        `hover:border-[rgba(var(--accent-amber-rgb),0.65)] hover:text-white ` +
        `hover:shadow-[0_0_42px_-6px_rgba(var(--accent-amber-rgb),0.6)]`,
    ghost:
        `inline-flex items-center gap-1.5 font-medium text-zinc-400 ` +
        `transition-colors duration-200 hover:text-white ${FOCUS} rounded-md`,
}

export default function Button(props: ButtonProps) {
    const { variant = 'primary', size = 'md', icon, className = '', children } = props
    const sizeCls = variant === 'ghost' ? (size === 'sm' ? 'text-xs' : 'text-sm') : SIZES[size]
    const cls = `${VARIANTS[variant]} ${sizeCls} ${className}`.trim()

    /* Content sits above the .btn-animated sweep (z-[2]). */
    const inner = (
        <span className="relative z-[2] inline-flex items-center gap-2">
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
