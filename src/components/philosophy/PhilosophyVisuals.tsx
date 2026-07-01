'use client'

/**
 * Supporting illustrations for the /philosophy page.
 *
 * RULES (per Anuja): the page scrolls CLEANLY — NO parallax, NO scroll-driven
 * reveals, NO `whileInView`, NO `useScroll`. Illustrations support the content
 * like a Medium article. Animation is limited to gentle ON-MOUNT draws and
 * AMBIENT idle loops (never tied to scroll position). Colors are tokens only.
 */

import { m } from 'framer-motion'
import { LineChart, ShieldCheck, NotebookPen, Compass, ChefHat, type LucideIcon } from 'lucide-react'
import { EASE_CINEMATIC as ease, DURATION } from '@/lib/motion'

/* ─────────────────────────────────────────────────────────────
   CHAIR — the centerpiece (§3). A clean front-view line chair that
   draws itself once on mount. No scroll dependency.
   ───────────────────────────────────────────────────────────── */
export function ChairMark({ className = '' }: { className?: string }) {
    const stroke = {
        stroke: 'var(--accent-teal)',
        strokeWidth: 1.4,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        fill: 'none' as const,
    }
    const draw = (delay: number) => ({
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: DURATION.reveal, delay, ease },
    })
    return (
        <svg viewBox="0 0 200 220" className={`h-40 w-40 md:h-48 md:w-48 ${className}`} aria-hidden="true">
            <m.path d="M 70 20 L 70 120" {...stroke} {...draw(0.1)} />
            <m.path d="M 130 20 L 130 120" {...stroke} {...draw(0.2)} />
            <m.path d="M 65 22 Q 100 12 135 22" {...stroke} {...draw(0.35)} />
            <m.path d="M 78 50 L 122 50" {...stroke} strokeWidth={0.9} opacity={0.7} {...draw(0.5)} />
            <m.path d="M 78 75 L 122 75" {...stroke} strokeWidth={0.9} opacity={0.5} {...draw(0.62)} />
            <m.path d="M 55 120 L 155 120" {...stroke} {...draw(0.78)} />
            <m.path d="M 55 127 L 155 127" {...stroke} strokeWidth={1} opacity={0.65} {...draw(0.9)} />
            <m.path d="M 60 127 L 60 200" {...stroke} {...draw(1.02)} />
            <m.path d="M 150 127 L 150 200" {...stroke} {...draw(1.14)} />
            <m.path d="M 40 202 L 170 202" {...stroke} strokeWidth={0.8} opacity={0.4} {...draw(1.3)} />
        </svg>
    )
}

/* ─────────────────────────────────────────────────────────────
   ORIGIN TIMELINE (§1) — four quiet milestones on a line.
   Static; supports the "I knew at 15" story.
   ───────────────────────────────────────────────────────────── */
const ORIGIN = [
    { year: '2009', age: '15', label: 'Knew' },
    { year: '2010', age: '16', label: 'Animation institute' },
    { year: '2011', age: '16–17', label: 'UI clicked' },
    { year: '2012', age: '17', label: 'First job' },
]
export function OriginTimeline() {
    return (
        <div className="relative w-full max-w-2xl">
            <div className="absolute left-0 right-0 top-2.5 h-px bg-gradient-to-r from-[var(--accent-teal)]/50 via-[var(--accent-teal)]/25 to-transparent" />
            <ol className="relative grid grid-cols-4 gap-2">
                {ORIGIN.map((m) => (
                    <li key={m.year} className="flex flex-col items-start">
                        <span className="h-[21px] w-[21px] -ml-px flex items-center justify-center">
                            <span className="h-2 w-2 rounded-full bg-[var(--accent-teal)] shadow-[0_0_12px_var(--accent-teal)]" />
                        </span>
                        <span className="mt-3 font-mono text-sm text-[var(--accent-teal-bright)]">{m.year}</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">age {m.age}</span>
                        <span className="mt-1 text-sm text-zinc-300">{m.label}</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   ADAPTIVE LOOP (§5) — "software should learn you." A feedback
   ring with a single dot orbiting (ambient idle loop, not scroll).
   ───────────────────────────────────────────────────────────── */
export function AdaptiveLoop() {
    const nodes = ['You act', 'It learns', 'It adapts', 'You improve']
    return (
        <div className="relative mx-auto aspect-square w-full max-w-[340px]">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <circle cx="100" cy="100" r="74" fill="none" stroke="var(--accent-teal)" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 7" />
                {/* orbiting dot — ambient, infinite, no scroll tie */}
                <m.g animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 100px' }}>
                    <circle cx="100" cy="26" r="4" fill="var(--accent-teal)" />
                    <circle cx="100" cy="26" r="8" fill="var(--accent-teal)" opacity="0.25" />
                </m.g>
            </svg>
            {/* center label */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="max-w-[120px] text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    learns&nbsp;you ·<br />extends&nbsp;your<br />thinking
                </span>
            </div>
            {/* four node labels at N/E/S/W */}
            <span className="absolute left-1/2 top-1 -translate-x-1/2 text-xs text-zinc-300">{nodes[0]}</span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-zinc-300">{nodes[1]}</span>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-zinc-300">{nodes[2]}</span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-zinc-300">{nodes[3]}</span>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   AURORA / OCEAN BAND (§8) — the aesthetic, shown not told.
   Teal→navy gradient with two soft curtains drifting (ambient).
   ───────────────────────────────────────────────────────────── */
export function AuroraBand() {
    return (
        <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--bg-cinematic)] md:h-52">
            {/* deep base */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #010204 0%, #04121a 60%, #061a24 100%)' }} />
            {/* drifting curtains */}
            <m.div
                className="absolute -inset-x-10 top-2 h-24 blur-2xl"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--accent-teal-rgb),0.30), transparent)' }}
                animate={{ x: ['-6%', '6%', '-6%'], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <m.div
                className="absolute -inset-x-10 top-10 h-20 blur-2xl"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.22), transparent)' }}
                animate={{ x: ['8%', '-8%', '8%'], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* faint horizon line = ocean at night */}
            <div className="absolute bottom-10 left-0 right-0 h-px bg-white/[0.05]" />
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   ROUTE-FLEX (§11) — destination fixed, route flexes. Static SVG.
   ───────────────────────────────────────────────────────────── */
export function RouteFlex() {
    return (
        <svg viewBox="0 0 320 110" className="w-full max-w-xl" aria-hidden="true">
            {/* straight "goal" reference */}
            <line x1="24" y1="55" x2="290" y2="55" stroke="white" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 5" />
            {/* the flexing actual route */}
            <path d="M 24 55 C 70 10, 110 100, 160 55 S 250 5, 290 55" fill="none" stroke="var(--accent-teal)" strokeWidth="1.6" strokeLinecap="round" />
            {/* start */}
            <circle cx="24" cy="55" r="4" fill="white" fillOpacity="0.5" />
            <text x="24" y="80" textAnchor="middle" className="fill-zinc-500 font-mono text-[9px] uppercase tracking-wider">start</text>
            {/* destination = star */}
            <path d="M 290 47 l 2.2 5.2 5.6 .4 -4.3 3.7 1.4 5.5 -4.9 -3 -4.9 3 1.4 -5.5 -4.3 -3.7 5.6 -.4 z" fill="var(--accent-teal)" />
            <text x="290" y="82" textAnchor="middle" className="fill-[var(--accent-teal-bright)] font-mono text-[9px] uppercase tracking-wider">goal</text>
        </svg>
    )
}

/* ─────────────────────────────────────────────────────────────
   FIVE PRODUCTS (§14 / proof) — a clean static grid.
   ───────────────────────────────────────────────────────────── */
const PRODUCTS: { name: string; what: string; icon: LucideIcon }[] = [
    { name: 'WealthEngine', what: 'Predictive finance engine', icon: LineChart },
    { name: 'Warden', what: 'AI-agent authorization', icon: ShieldCheck },
    { name: 'Inkwell', what: 'AI writing coach', icon: NotebookPen },
    { name: 'Pathwise', what: 'Career & education ROI', icon: Compass },
    { name: 'Sous', what: 'Voice-first cooking AI', icon: ChefHat },
]
export function FiveProducts() {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {PRODUCTS.map(({ name, what, icon: Icon }) => (
                <div key={name} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors duration-500 hover:border-[var(--accent-teal)]/30">
                    <Icon className="mb-3 h-5 w-5 text-[var(--accent-teal)]" strokeWidth={1.6} />
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="mt-0.5 text-xs leading-snug text-zinc-500">{what}</p>
                </div>
            ))}
        </div>
    )
}
