'use client'

import { ReactNode, MouseEvent } from 'react'
import TransitionLink from '@/components/transitions/TransitionLink'

/**
 * Site-wide button primitive — single source of truth so the cinematic
 * button language stays consistent (no more one-off "flat teal" buttons).
 *
 * Variants:
 *  - primary   — dark glass + teal-glow halo + light-sweep on hover. The
 *                on-brand replacement for the old flat white→teal fill.
 *  - secondary — ghost glass (the existing Watch/Resume treatment).
 *  - ghost     — minimal text/icon link for tertiary actions.
 *
 * Polymorphic: renders a TransitionLink for an internal `href`, a plain
 * <a target="_blank"> for `external`, and a <button> otherwise.
 *
 * Reuses existing tokens + the `.btn-animated` sweep from globals.css —
 * no new global CSS.
 */

type Variant = 'primary' | 'secondary' | 'ghost'
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

const VARIANTS: Record<Variant, string> = {
    primary:
        `btn-animated btn-sweep-teal group relative inline-flex items-center justify-center gap-2 rounded-full ` +
        `border border-[rgba(var(--accent-teal-rgb),0.35)] bg-black/40 backdrop-blur-md ` +
        `font-semibold text-[var(--accent-teal-bright)] ` +
        `shadow-[0_0_30px_-8px_rgba(var(--accent-teal-glow-rgb),0.45)] ` +
        `transition-all duration-300 active:scale-[0.98] ` +
        `hover:border-[rgba(var(--accent-teal-rgb),0.65)] hover:text-white ` +
        `hover:shadow-[0_0_42px_-6px_rgba(var(--accent-teal-glow-rgb),0.6)] ${FOCUS}`,
    secondary:
        `group relative inline-flex items-center justify-center gap-2 rounded-full ` +
        `border border-white/20 bg-white/[0.04] backdrop-blur-sm ` +
        `font-semibold text-zinc-200 ` +
        `transition-all duration-300 active:scale-[0.98] ` +
        `hover:border-white/50 hover:bg-white/[0.10] hover:text-white ${FOCUS}`,
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
