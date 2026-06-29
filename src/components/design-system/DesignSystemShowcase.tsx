'use client'

import { useState, type ReactNode } from 'react'
import { ArrowUpRight, Briefcase, Sparkles, Download, ExternalLink, Maximize2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'
import NavIsland from '@/components/ui/NavIsland'
import SystemLightbox from '@/components/ui/SystemLightbox'
import { GLASS_PILL } from '@/lib/surfaces'

/* ──────────────────────────────────────────────────────────────────────────
   Page-local showcase scaffolding. These are documentation furniture (section
   frames, swatches, spec rows) — NOT design-system primitives — so they live
   here. Everything they render is still tokens-only, no hardcoded color values.
   ────────────────────────────────────────────────────────────────────────── */

const MONO_EYEBROW = 'font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-teal)]'

function Section({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children: ReactNode }) {
    return (
        <section className="border-t border-[var(--overlay-white-08)] py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <p className={MONO_EYEBROW}>{eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-heading)] md:text-4xl">{title}</h2>
                {intro && <p className="mt-4 max-w-2xl leading-relaxed text-[var(--text-body)]">{intro}</p>}
                <div className="mt-10">{children}</div>
            </div>
        </section>
    )
}

/** A specimen frame — a labeled card that holds a live component demo. */
function Specimen({ label, children, className = '' }: { label?: string; children: ReactNode; className?: string }) {
    return (
        <div className={`rounded-2xl border border-[var(--overlay-white-08)] bg-[var(--overlay-white-02)] p-6 md:p-8 ${className}`}>
            {label && <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">{label}</p>}
            {children}
        </div>
    )
}

/** A color swatch. `onGlass` lays a teal gradient behind so transparency reads. */
function Swatch({ name, value, css, onGlass = false }: { name: string; value: string; css: string; onGlass?: boolean }) {
    return (
        <div className="overflow-hidden rounded-xl border border-[var(--overlay-white-08)] bg-[var(--overlay-white-02)]">
            <div className="relative h-20">
                {onGlass && (
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: 'linear-gradient(135deg, rgba(var(--accent-teal-rgb),0.9), rgba(var(--white-rgb),0.15))' }}
                    />
                )}
                <div className="absolute inset-0" style={{ background: css }} />
            </div>
            <div className="p-3">
                <p className="font-mono text-[11px] text-[var(--text-primary)]">{name}</p>
                <p className="mt-0.5 font-mono text-[10px] text-[var(--text-dim)]">{value}</p>
            </div>
        </div>
    )
}

const LAWS = [
    { n: '01', t: 'Tokens are law', d: 'Every color, size, shadow and motion value comes from a CSS variable. No hardcoded hex, no magic numbers.' },
    { n: '02', t: 'One element per job', d: 'A single canonical component owns each job — one button, one icon button, one nav. Never five that look almost alike.' },
    { n: '03', t: 'States are standardized', d: 'Hover, press and focus behave identically everywhere a control appears — so the system feels like one hand built it.' },
    { n: '04', t: 'Never a loose end', d: 'Every path resolves into a conclusive, satisfying, actionable step. No dangling question with no way forward.' },
]

const ACCENTS = [
    { name: '--accent-teal', value: '#078B9C', css: '#078B9C' },
    { name: '--accent-teal-bright', value: '#14b8a6', css: '#14b8a6' },
    { name: '--accent-teal-dark', value: '#077D8E', css: '#077D8E' },
    { name: '--accent-teal-glow', value: '#2fc6d5', css: '#2fc6d5' },
    { name: '--accent-amber', value: '#f59e0b', css: '#f59e0b' },
]
const SURFACES = [
    { name: '--bg-cinematic', value: '#010204', css: 'var(--bg-cinematic)' },
    { name: '--bg-primary', value: '#09090b', css: 'var(--bg-primary)' },
    { name: '--bg-secondary', value: '#0f1115', css: 'var(--bg-secondary)' },
    { name: '--bg-tertiary', value: '#131518', css: 'var(--bg-tertiary)' },
]
const TEXTS = [
    { name: '--text-heading', value: '#f4f4f5', css: 'var(--text-heading)' },
    { name: '--text-primary', value: '#e4e4e7', css: 'var(--text-primary)' },
    { name: '--text-body', value: '#a1a1aa', css: 'var(--text-body)' },
    { name: '--text-muted', value: '#8b8b95', css: 'var(--text-muted)' },
    { name: '--text-dim', value: '#62626c', css: 'var(--text-dim)' },
]
const GLASS = [
    { name: '--overlay-ink-55', value: 'rgba(0,0,0,.55)', css: 'var(--overlay-ink-55)' },
    { name: '--overlay-ink-75', value: 'rgba(0,0,0,.75)', css: 'var(--overlay-ink-75)' },
    { name: '--overlay-white-05', value: 'rgba(255,255,255,.05)', css: 'var(--overlay-white-05)' },
    { name: '--overlay-white-10', value: 'rgba(255,255,255,.10)', css: 'var(--overlay-white-10)' },
    { name: '--overlay-white-20', value: 'rgba(255,255,255,.20)', css: 'var(--overlay-white-20)' },
]
const SEMANTIC = [
    { name: 'emerald', value: '#10b981', css: 'var(--semantic-emerald)' },
    { name: 'blue', value: '#3b82f6', css: 'var(--semantic-blue)' },
    { name: 'cyan', value: '#06b6d4', css: 'var(--semantic-cyan)' },
    { name: 'rose', value: '#f43f5e', css: 'var(--semantic-rose)' },
    { name: 'orange', value: '#f97316', css: 'var(--semantic-orange)' },
    { name: 'purple', value: '#a855f7', css: 'var(--semantic-purple)' },
]

const TYPE_SPECIMENS = [
    { token: '--text-6xl · 900', cls: 'text-5xl font-black tracking-tight md:text-6xl', sample: 'Made obvious.' },
    { token: '--text-4xl · 700', cls: 'text-3xl font-bold tracking-tight md:text-4xl', sample: 'One language, enforced.' },
    { token: '--text-2xl · 600', cls: 'text-2xl font-semibold tracking-tight', sample: 'The chair tells you it is a chair.' },
    { token: '--text-lg · 400', cls: 'text-lg text-[var(--text-body)]', sample: 'Body copy sits at 19px with relaxed leading for long-form reading.' },
    { token: '--text-sm · 400', cls: 'text-sm text-[var(--text-muted)]', sample: 'Secondary copy and captions live at 14px.' },
    { token: 'mono label · 700', cls: 'font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-teal)]', sample: 'Build Lab · Design System' },
]

const SHADOWS = [
    { name: '--shadow-sm', css: 'var(--shadow-sm)' },
    { name: '--shadow-md', css: 'var(--shadow-md)' },
    { name: '--shadow-lg', css: 'var(--shadow-lg)' },
    { name: '--shadow-xl', css: 'var(--shadow-xl)' },
]

const SPACING = [
    { name: '--space-2', px: '8px', w: '0.5rem' },
    { name: '--space-4', px: '16px', w: '1rem' },
    { name: '--space-6', px: '24px', w: '1.5rem' },
    { name: '--space-8', px: '32px', w: '2rem' },
    { name: '--space-12', px: '48px', w: '3rem' },
    { name: '--space-16', px: '64px', w: '4rem' },
]

const MOTION = [
    { name: '--ease-cinematic', d: 'The signature curve. Confident, settled entrances.' },
    { name: '--ease-spring', d: 'Overshoot for tactile, alive controls (nav slider).' },
    { name: '--ease-expo', d: 'Fast-out, slow-in for large reveals.' },
    { name: '--duration-fast → slow', d: '200ms · 300ms · 500ms — the only three speeds.' },
]

export default function DesignSystemShowcase() {
    const [tab, setTab] = useState('work')
    const [lightboxOpen, setLightboxOpen] = useState(false)

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            {/* ── Hero ─────────────────────────────────────────────── */}
            <header className="relative overflow-hidden px-6 pb-16 pt-32 md:pt-40">
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60"
                    style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(var(--accent-teal-rgb),0.18), transparent 70%)' }}
                />
                <div className="relative mx-auto max-w-6xl">
                    <p className={MONO_EYEBROW}>Build Lab · Design System</p>
                    <h1 className="mt-4 text-4xl font-black tracking-tight text-[var(--text-heading)] md:text-6xl">
                        One language, enforced.
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-body)]">
                        The system behind this portfolio. Every surface is built from a single set of tokens
                        and a small set of canonical components — so the whole site feels like one hand made it,
                        and every path resolves into something you can act on.
                    </p>

                    <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--overlay-white-08)] bg-[var(--overlay-white-08)] sm:grid-cols-2 lg:grid-cols-4">
                        {LAWS.map((law) => (
                            <div key={law.n} className="bg-[var(--bg-primary)] p-6">
                                <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent-teal)]">{law.n}</p>
                                <h3 className="mt-3 text-base font-semibold text-[var(--text-heading)]">{law.t}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{law.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* ── Color ────────────────────────────────────────────── */}
            <Section
                eyebrow="Foundations · Color"
                title="A teal accent over deep ink"
                intro="One accent hue, used sparingly, against a near-black surface ramp. Semantic colors are reserved for data visualization — never for chrome."
            >
                <div className="space-y-10">
                    <div>
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Accent</p>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                            {ACCENTS.map((s) => <Swatch key={s.name} {...s} />)}
                        </div>
                    </div>
                    <div>
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Surfaces</p>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {SURFACES.map((s) => <Swatch key={s.name} {...s} />)}
                        </div>
                    </div>
                    <div>
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Text</p>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                            {TEXTS.map((s) => <Swatch key={s.name} {...s} />)}
                        </div>
                    </div>
                    <div>
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Glass &amp; overlays</p>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                            {GLASS.map((s) => <Swatch key={s.name} {...s} onGlass />)}
                        </div>
                    </div>
                    <div>
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Semantic — data viz only</p>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                            {SEMANTIC.map((s) => <Swatch key={s.name} {...s} />)}
                        </div>
                    </div>
                </div>
            </Section>

            {/* ── Typography ───────────────────────────────────────── */}
            <Section
                eyebrow="Foundations · Type"
                title="Inter for voice, mono for labels"
                intro="A tight display scale for headlines, comfortable body copy at 19px, and a wide-tracked monospace for eyebrows and system labels."
            >
                <Specimen>
                    <div className="space-y-8">
                        {TYPE_SPECIMENS.map((t) => (
                            <div key={t.token} className="flex flex-col gap-2 border-b border-[var(--overlay-white-05)] pb-6 last:border-0 last:pb-0 md:flex-row md:items-baseline md:gap-8">
                                <p className="w-44 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)]">{t.token}</p>
                                <p className={t.cls}>{t.sample}</p>
                            </div>
                        ))}
                    </div>
                </Specimen>
            </Section>

            {/* ── Buttons ──────────────────────────────────────────── */}
            <Section
                eyebrow="Components · Button"
                title="One button, three intents"
                intro="The single source of truth for every text action. Primary carries a teal-glow halo and light-sweep; secondary is ghost glass; ghost is a bare link. Hover, press and focus are standardized across all three."
            >
                <Specimen label="Variants × sizes — live, hover me">
                    <div className="space-y-8">
                        <div className="flex flex-wrap items-center gap-4">
                            <Button variant="primary" size="md" icon={<ArrowUpRight className="h-4 w-4" />}>Primary</Button>
                            <Button variant="secondary" size="md" icon={<Download className="h-4 w-4" />}>Secondary</Button>
                            <Button variant="ghost" size="md" icon={<ArrowUpRight className="h-4 w-4" />}>Ghost link</Button>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <Button variant="primary" size="sm" icon={<ArrowUpRight className="h-3.5 w-3.5" />}>Primary sm</Button>
                            <Button variant="secondary" size="sm" icon={<ExternalLink className="h-3.5 w-3.5" />}>Secondary sm</Button>
                            <Button variant="ghost" size="sm">Ghost sm</Button>
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
                            hover · press (scale 0.98) · focus ring — standardized
                        </p>
                    </div>
                </Specimen>
            </Section>

            {/* ── Icon button ──────────────────────────────────────── */}
            <Section
                eyebrow="Components · IconButton"
                title="The glass icon control"
                intro="Every icon-only action — lightbox close, zoom, play, the nav arrows — is the same circular glass pill, in three sizes. It shares its surface and states with the nav island, so nothing drifts."
            >
                <Specimen label="Sizes sm · md · lg — live, hover me">
                    <div className="flex flex-wrap items-center gap-5">
                        <div className="flex flex-col items-center gap-2">
                            <IconButton icon={Maximize2} label="Zoom" size="sm" />
                            <span className="font-mono text-[10px] text-[var(--text-dim)]">sm</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconButton icon={Maximize2} label="Zoom" size="md" />
                            <span className="font-mono text-[10px] text-[var(--text-dim)]">md</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconButton icon={Maximize2} label="Zoom" size="lg" />
                            <span className="font-mono text-[10px] text-[var(--text-dim)]">lg</span>
                        </div>
                    </div>
                </Specimen>
            </Section>

            {/* ── Nav island ───────────────────────────────────────── */}
            <Section
                eyebrow="Components · NavIsland"
                title="One nav, every context"
                intro="The Dynamic Island at the top of every page. It carries a segmented control (Work/Life · RC/ML/IQ) and an optional leading Back pill — and the Back button always circles you back to exactly where you came from. The live island sits at the very top of this page; below are the two specimens in-flow."
            >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Specimen label="Segmented — Work / Life">
                        <div className="flex justify-center py-2">
                            <NavIsland
                                embedded
                                segments={[
                                    { id: 'work', label: 'Work', icon: Briefcase },
                                    { id: 'life', label: 'Life', icon: Sparkles },
                                ]}
                                activeId={tab}
                                onSelect={setTab}
                                ariaLabel="Demo work/life switcher"
                            />
                        </div>
                    </Specimen>
                    <Specimen label="Leading — Back pill">
                        <div className="flex justify-center py-2">
                            <NavIsland embedded leading={{ label: 'Back', onClick: () => { } }} />
                        </div>
                    </Specimen>
                </div>
            </Section>

            {/* ── Glass surface ────────────────────────────────────── */}
            <Section
                eyebrow="Components · Surface"
                title="The glass pill"
                intro="All floating chrome — nav, lightbox, icon buttons — is cut from the one GLASS_PILL surface: ink at 55% over blur, a hairline white border, and a large soft shadow. Defined once in src/lib/surfaces.ts."
            >
                <Specimen className="relative overflow-hidden">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-40"
                        style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(var(--accent-teal-rgb),0.35), transparent 60%)' }}
                    />
                    <div className="relative flex flex-wrap items-center gap-4">
                        <div className={`${GLASS_PILL} inline-flex items-center gap-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-300`}>
                            GLASS_PILL
                        </div>
                        <code className="font-mono text-[11px] text-[var(--text-muted)]">
                            --overlay-ink-55 · --overlay-white-10 · --shadow-lg · backdrop-blur-xl
                        </code>
                    </div>
                </Specimen>
            </Section>

            {/* ── Lightbox ─────────────────────────────────────────── */}
            <Section
                eyebrow="Components · SystemLightbox"
                title="The master overlay"
                intro="One portal-rendered lightbox powers the résumé, case-study presentations, images and the app walkthroughs. Its chrome — title pill, glass icon controls, keyboard hints — is the same language as everything else."
            >
                <Specimen>
                    <Button variant="primary" icon={<Maximize2 className="h-4 w-4" />} onClick={() => setLightboxOpen(true)}>
                        Open the lightbox
                    </Button>
                </Specimen>
            </Section>

            {/* ── Elevation ────────────────────────────────────────── */}
            <Section eyebrow="Foundations · Elevation" title="Four shadows" intro="A single soft-shadow ramp. Floating chrome uses lg; everything else stays flat.">
                <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                    {SHADOWS.map((s) => (
                        <div key={s.name} className="flex flex-col items-center gap-4">
                            <div className="h-24 w-full rounded-2xl bg-[var(--bg-tertiary)]" style={{ boxShadow: s.css }} />
                            <span className="font-mono text-[10px] text-[var(--text-dim)]">{s.name}</span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Spacing ──────────────────────────────────────────── */}
            <Section eyebrow="Foundations · Spacing" title="A 4px rhythm" intro="Every gap and pad steps off a 4px base, so vertical rhythm stays even across the whole system.">
                <Specimen>
                    <div className="space-y-4">
                        {SPACING.map((s) => (
                            <div key={s.name} className="flex items-center gap-4">
                                <span className="w-28 shrink-0 font-mono text-[10px] text-[var(--text-dim)]">{s.name}</span>
                                <div className="h-3 rounded-full bg-[var(--accent-teal)]" style={{ width: s.w }} />
                                <span className="font-mono text-[10px] text-[var(--text-muted)]">{s.px}</span>
                            </div>
                        ))}
                    </div>
                </Specimen>
            </Section>

            {/* ── Motion ───────────────────────────────────────────── */}
            <Section eyebrow="Foundations · Motion" title="One signature curve, three speeds" intro="Mirrored 1:1 between CSS and framer-motion so animation feels identical whichever side drives it.">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {MOTION.map((m) => (
                        <div key={m.name} className="rounded-xl border border-[var(--overlay-white-08)] bg-[var(--overlay-white-02)] p-5">
                            <p className="font-mono text-[11px] text-[var(--accent-teal)]">{m.name}</p>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{m.d}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Closer — no loose ends ────────────────────────────── */}
            <section className="border-t border-[var(--overlay-white-08)] py-20 md:py-28">
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <p className={MONO_EYEBROW}>The standing rule</p>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--text-heading)] md:text-3xl">
                        Never a loose end.
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[var(--text-body)]">
                        A design system is only finished when it leaves nothing dangling — so this page ends
                        the way every path should: with a clear way forward.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button variant="primary" href="/" icon={<ArrowUpRight className="h-4 w-4" />}>See it across the work</Button>
                        <Button variant="secondary" href="/philosophy">Read the philosophy</Button>
                    </div>
                </div>
            </section>

            {/* Demo lightbox */}
            <SystemLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                title="DESIGN_SYSTEM"
                indexString="[ DEMO ]"
                showArrows={false}
                shortcuts={[{ key: 'ESC', label: 'CLOSE' }]}
            >
                <div className="mx-auto max-w-lg px-6 text-center">
                    <div className={`${GLASS_PILL} mx-auto mb-8 inline-flex items-center gap-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-300`}>
                        SystemLightbox
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-heading)] md:text-3xl">
                        The same overlay, everywhere.
                    </h3>
                    <p className="mt-4 leading-relaxed text-[var(--text-body)]">
                        Résumé, case-study decks, images and app walkthroughs all render through this one
                        portal — scroll-locked, focus-trapped, keyboard-driven, and dressed in the same glass
                        chrome as the rest of the system. Press <span className="font-mono text-[var(--accent-teal)]">ESC</span> to close.
                    </p>
                </div>
            </SystemLightbox>
        </div>
    )
}
