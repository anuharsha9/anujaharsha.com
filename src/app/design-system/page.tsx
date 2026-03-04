'use client'

import React from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN SYSTEM — Living Visual Reference
   Route: /design-system
   ═══════════════════════════════════════════════════════════════════════════ */

// ── Color swatches ──
const BRAND_COLORS = [
    { name: '--accent-teal', value: '#078B9C', label: 'Primary Accent' },
    { name: '--accent-teal-bright', value: '#14b8a6', label: 'Hover / Bright' },
    { name: '--accent-teal-dark', value: '#077D8E', label: 'Active / Dark' },
    { name: '--accent-amber', value: '#f59e0b', label: 'Amber (Resume)' },
]

const CS_THEMES = [
    { name: 'ReportCaster', accent: '#078B9C', attr: 'rc', label: 'Teal — Flagship' },
    { name: 'ML Functions', accent: '#06b6d4', attr: 'ml', label: 'Cyan — AI/ML' },
    { name: 'DSML / IQ Hub', accent: '#a855f7', attr: 'dsml', label: 'Violet — Data Science' },
    { name: 'WordU', accent: '#00ADEE', attr: 'wordu', label: 'Blue — Game' },
]

const BACKGROUNDS = [
    { name: '--bg-primary', value: '#09090b', label: 'Primary' },
    { name: '--bg-secondary', value: '#0f1115', label: 'Secondary' },
    { name: '--bg-tertiary', value: '#131518', label: 'Tertiary' },
    { name: '--bg-cinematic', value: '#010204', label: 'Cinematic' },
    { name: '--bg-ink-950', value: '#020617', label: 'Ink 950' },
]

const TEXT_COLORS = [
    { name: '--text-heading', value: '#f4f4f5', ratio: '18:1', label: 'Headings' },
    { name: '--text-primary', value: '#e4e4e7', ratio: '15:1', label: 'Primary body' },
    { name: '--text-body', value: '#a1a1aa', ratio: '7.2:1', label: 'Body text' },
    { name: '--text-muted', value: '#8b8b95', ratio: '5.9:1', label: 'Supporting' },
    { name: '--text-dim', value: '#62626c', ratio: '3.3:1', label: 'Decorative (AA large)' },
]

const OPACITY_SCALE = [
    { class: 'text-white/90', opacity: 90, wcag: 'AAA', usage: 'Near-full headings' },
    { class: 'text-white/70', opacity: 70, wcag: 'AA', usage: 'Body text' },
    { class: 'text-white/50', opacity: 50, wcag: 'AA lg', usage: 'Descriptions' },
    { class: 'text-white/40', opacity: 40, wcag: 'AA lg', usage: 'Labels, metadata' },
    { class: 'text-white/30', opacity: 30, wcag: 'Lg only', usage: 'Section tags' },
    { class: 'text-white/15', opacity: 15, wcag: '—', usage: 'Ghost (decorative)' },
]

const SEMANTIC_COLORS = [
    { name: 'Success', value: '#34c759' },
    { name: 'Warning', value: '#ff9f0a' },
    { name: 'Error', value: '#ff3b30' },
    { name: 'Info', value: '#078B9C' },
]

const TYPE_SCALE = [
    { name: '--text-xs', size: '12px', rem: '0.75rem' },
    { name: '--text-sm', size: '14px', rem: '0.875rem' },
    { name: '--text-base', size: '17px', rem: '1.0625rem' },
    { name: '--text-lg', size: '19px', rem: '1.1875rem' },
    { name: '--text-xl', size: '21px', rem: '1.3125rem' },
    { name: '--text-2xl', size: '28px', rem: '1.75rem' },
    { name: '--text-3xl', size: '35px', rem: '2.1875rem' },
    { name: '--text-4xl', size: '40px', rem: '2.5rem' },
    { name: '--text-5xl', size: '48px', rem: '3rem' },
    { name: '--text-6xl', size: '64px', rem: '4rem' },
]

const SPACING_SCALE = [
    { token: '--space-1', value: '4px' },
    { token: '--space-2', value: '8px' },
    { token: '--space-3', value: '12px' },
    { token: '--space-4', value: '16px' },
    { token: '--space-6', value: '24px' },
    { token: '--space-8', value: '32px' },
    { token: '--space-10', value: '40px' },
    { token: '--space-12', value: '48px' },
    { token: '--space-16', value: '64px' },
    { token: '--space-20', value: '80px' },
]

const RADIUS_SCALE = [
    { token: '--radius-sm', value: '8px' },
    { token: '--radius-md', value: '12px' },
    { token: '--radius-lg', value: '18px' },
    { token: '--radius-xl', value: '24px' },
    { token: '--radius-2xl', value: '32px' },
]

// ── Reusable components ──
function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2"
        >
            {children}
        </motion.h2>
    )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/60 block mb-4">
            {children}
        </span>
    )
}

function Swatch({ color, label, name, size = 'md' }: { color: string; label: string; name: string; size?: 'sm' | 'md' | 'lg' }) {
    const sizes = { sm: 'w-12 h-12', md: 'w-16 h-16', lg: 'w-20 h-20' }
    return (
        <div className="group">
            <div
                className={`${sizes[size]} rounded-xl border border-white/10 group-hover:border-white/30 transition-all duration-300 group-hover:scale-105 shadow-lg`}
                style={{ backgroundColor: color }}
            />
            <p className="text-white/70 text-xs font-mono mt-2">{color}</p>
            <p className="text-white/40 text-[10px] font-mono">{label}</p>
            <p className="text-white/20 text-[9px] font-mono truncate max-w-[80px]">{name}</p>
        </div>
    )
}

// ── Page ──
export default function DesignSystemPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-white">
            {/* Hero */}
            <header className="relative pt-32 pb-20 px-6 md:px-16 border-b border-white/[0.06]">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--accent-teal)]/50 block mb-6">
                            Living Reference
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-500 mb-4">
                            Design System
                        </h1>
                        <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
                            All design tokens, colors, typography, spacing, and component patterns used across the Anuja Harsha portfolio. Source of truth: <code className="text-[var(--accent-teal)] text-sm">tokens.css</code>
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 md:px-16">

                {/* ═══════════════════════════════════════════════════
           COLORS
           ═══════════════════════════════════════════════════ */}
                <section className="py-20 border-b border-white/[0.06]" id="colors">
                    <SectionLabel>01 — Colors</SectionLabel>
                    <SectionTitle>Color Palette</SectionTitle>

                    {/* Brand Accent */}
                    <div className="mt-12">
                        <h3 className="text-white/60 text-sm font-mono uppercase tracking-widest mb-6">Brand Accent — Teal</h3>
                        <div className="flex flex-wrap gap-6">
                            {BRAND_COLORS.map(c => (
                                <Swatch key={c.name} color={c.value} label={c.label} name={c.name} size="lg" />
                            ))}
                        </div>
                    </div>

                    {/* Case Study Themes */}
                    <div className="mt-16">
                        <h3 className="text-white/60 text-sm font-mono uppercase tracking-widest mb-6">Case Study Themes</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {CS_THEMES.map(t => (
                                <motion.div
                                    key={t.attr}
                                    className="rounded-xl border border-white/[0.08] p-5 hover:border-white/20 transition-all"
                                    style={{ background: `linear-gradient(135deg, ${t.accent}08 0%, transparent 60%)` }}
                                    whileHover={{ y: -2 }}
                                >
                                    <div className="w-10 h-10 rounded-lg mb-3" style={{ backgroundColor: t.accent }} />
                                    <p className="text-white font-medium text-sm">{t.name}</p>
                                    <p className="text-white/40 text-xs font-mono">{t.accent}</p>
                                    <p className="text-white/30 text-[10px] font-mono mt-1">{t.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Backgrounds */}
                    <div className="mt-16">
                        <h3 className="text-white/60 text-sm font-mono uppercase tracking-widest mb-6">Backgrounds</h3>
                        <div className="flex gap-0 rounded-xl overflow-hidden border border-white/10">
                            {BACKGROUNDS.map(bg => (
                                <div
                                    key={bg.name}
                                    className="flex-1 min-h-[100px] flex flex-col items-center justify-end p-3"
                                    style={{ backgroundColor: bg.value }}
                                >
                                    <p className="text-white/60 text-[9px] font-mono">{bg.label}</p>
                                    <p className="text-white/30 text-[8px] font-mono">{bg.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Text Colors */}
                    <div className="mt-16">
                        <h3 className="text-white/60 text-sm font-mono uppercase tracking-widest mb-6">Text Hierarchy</h3>
                        <div className="space-y-3">
                            {TEXT_COLORS.map(tc => (
                                <div key={tc.name} className="flex items-center gap-4 py-3 border-b border-white/[0.04]">
                                    <span className="text-lg font-medium w-48" style={{ color: tc.value }}>
                                        The quick brown fox
                                    </span>
                                    <span className="text-white/40 text-xs font-mono w-40">{tc.name}</span>
                                    <span className="text-white/30 text-xs font-mono w-16">{tc.ratio}</span>
                                    <span className="text-white/50 text-xs">{tc.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Opacity Scale */}
                    <div className="mt-16">
                        <h3 className="text-white/60 text-sm font-mono uppercase tracking-widest mb-6">White Opacity Scale</h3>
                        <div className="space-y-2">
                            {OPACITY_SCALE.map(op => (
                                <div key={op.class} className="flex items-center gap-4 py-2">
                                    <span
                                        className="text-base w-56"
                                        style={{ color: `rgba(255,255,255,${op.opacity / 100})` }}
                                    >
                                        Sample text at {op.opacity}%
                                    </span>
                                    <code className="text-[var(--accent-teal)] text-xs font-mono w-32">{op.class}</code>
                                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${op.wcag === 'AAA' ? 'bg-emerald-500/20 text-emerald-400' : op.wcag === 'AA' ? 'bg-green-500/20 text-green-400' : op.wcag === 'AA lg' || op.wcag === 'Lg only' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {op.wcag}
                                    </span>
                                    <span className="text-white/30 text-xs">{op.usage}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Semantic Colors */}
                    <div className="mt-16">
                        <h3 className="text-white/60 text-sm font-mono uppercase tracking-widest mb-6">Semantic</h3>
                        <div className="flex gap-6">
                            {SEMANTIC_COLORS.map(c => (
                                <Swatch key={c.name} color={c.value} label={c.name} name={`--color-${c.name.toLowerCase()}`} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
           TYPOGRAPHY
           ═══════════════════════════════════════════════════ */}
                <section className="py-20 border-b border-white/[0.06]" id="typography">
                    <SectionLabel>02 — Typography</SectionLabel>
                    <SectionTitle>Type Scale</SectionTitle>

                    {/* Font Stacks */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-xl border border-white/[0.06]">
                            <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-3">Sans (Default)</p>
                            <p className="text-white text-2xl font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                                Inter / SF Pro
                            </p>
                            <p className="text-white/50 text-sm mt-2" style={{ fontFamily: 'var(--font-sans)' }}>
                                The quick brown fox jumps over the lazy dog
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-white/[0.06]">
                            <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-3">Mono</p>
                            <p className="text-white text-2xl" style={{ fontFamily: 'var(--font-mono)' }}>
                                SF Mono / Menlo
                            </p>
                            <p className="text-white/50 text-sm mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
                                const design = &quot;system&quot;;
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-white/[0.06]">
                            <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-3">Serif (Poetry)</p>
                            <p className="text-white text-2xl italic" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                                Playfair Display
                            </p>
                            <p className="text-white/50 text-sm mt-2 italic" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                                Life gave me the gift of art
                            </p>
                        </div>
                    </div>

                    {/* Scale */}
                    <div className="mt-12 space-y-1">
                        {TYPE_SCALE.map(t => (
                            <div key={t.name} className="flex items-baseline gap-4 py-3 border-b border-white/[0.04]">
                                <span
                                    className="text-white font-semibold leading-none"
                                    style={{ fontSize: t.rem }}
                                >
                                    Aa
                                </span>
                                <code className="text-[var(--accent-teal)] text-xs font-mono shrink-0">{t.name}</code>
                                <span className="text-white/30 text-xs font-mono shrink-0">{t.size}</span>
                            </div>
                        ))}
                    </div>

                    {/* Weights */}
                    <div className="mt-12">
                        <h3 className="text-white/60 text-sm font-mono uppercase tracking-widest mb-6">Weights</h3>
                        <div className="space-y-3">
                            {[
                                { weight: 400, label: 'Body (400)' },
                                { weight: 600, label: 'Label (600)' },
                                { weight: 700, label: 'Subheading (700)' },
                                { weight: 900, label: 'Heading (900)' },
                            ].map(w => (
                                <p key={w.weight} className="text-white text-xl" style={{ fontWeight: w.weight }}>
                                    {w.label} — The quick brown fox jumps over the lazy dog
                                </p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
           SPACING
           ═══════════════════════════════════════════════════ */}
                <section className="py-20 border-b border-white/[0.06]" id="spacing">
                    <SectionLabel>03 — Spacing</SectionLabel>
                    <SectionTitle>Space Scale (4px Grid)</SectionTitle>

                    <div className="mt-12 space-y-2">
                        {SPACING_SCALE.map(s => (
                            <div key={s.token} className="flex items-center gap-4">
                                <code className="text-[var(--accent-teal)] text-xs font-mono w-28 shrink-0">{s.token}</code>
                                <span className="text-white/40 text-xs font-mono w-12 shrink-0">{s.value}</span>
                                <div className="flex-1">
                                    <div
                                        className="h-4 bg-[var(--accent-teal)]/20 border border-[var(--accent-teal)]/30 rounded-sm"
                                        style={{ width: s.value }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
           BORDERS & RADIUS
           ═══════════════════════════════════════════════════ */}
                <section className="py-20 border-b border-white/[0.06]" id="borders">
                    <SectionLabel>04 — Borders & Radius</SectionLabel>
                    <SectionTitle>Border Radius</SectionTitle>

                    <div className="mt-12 flex flex-wrap gap-6">
                        {RADIUS_SCALE.map(r => (
                            <div key={r.token} className="text-center">
                                <div
                                    className="w-20 h-20 border-2 border-[var(--accent-teal)]/40 bg-white/[0.03]"
                                    style={{ borderRadius: r.value }}
                                />
                                <code className="text-[var(--accent-teal)] text-[10px] font-mono block mt-2">{r.value}</code>
                                <span className="text-white/30 text-[9px] font-mono">{r.token}</span>
                            </div>
                        ))}
                    </div>

                    {/* Shadows */}
                    <div className="mt-16">
                        <h3 className="text-white/60 text-sm font-mono uppercase tracking-widest mb-6">Elevation</h3>
                        <div className="flex flex-wrap gap-6">
                            {['sm', 'md', 'lg', 'xl'].map(size => (
                                <div
                                    key={size}
                                    className="w-32 h-32 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center"
                                    style={{ boxShadow: `var(--shadow-${size})` }}
                                >
                                    <span className="text-white/40 text-xs font-mono">shadow-{size}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
           ANIMATION
           ═══════════════════════════════════════════════════ */}
                <section className="py-20 border-b border-white/[0.06]" id="animation">
                    <SectionLabel>05 — Animation</SectionLabel>
                    <SectionTitle>Motion</SectionTitle>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'Spring', ease: '--ease-spring', desc: 'Bouncy interactions' },
                            { name: 'Smooth', ease: '--ease-smooth', desc: 'Default transitions' },
                            { name: 'Bounce', ease: '--ease-bounce', desc: 'Playful emphasis' },
                        ].map(e => (
                            <motion.div
                                key={e.name}
                                className="p-6 rounded-xl border border-white/[0.06] cursor-pointer"
                                whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.15)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <p className="text-white font-medium">{e.name}</p>
                                <p className="text-white/40 text-xs font-mono mt-1">{e.ease}</p>
                                <p className="text-white/30 text-xs mt-2">{e.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Duration */}
                    <div className="mt-12">
                        <h3 className="text-white/60 text-sm font-mono uppercase tracking-widest mb-6">Duration</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Fast', token: '--duration-fast', value: '200ms' },
                                { label: 'Normal', token: '--duration-normal', value: '300ms' },
                                { label: 'Slow', token: '--duration-slow', value: '500ms' },
                            ].map(d => (
                                <div key={d.token} className="flex items-center gap-4">
                                    <span className="text-white/60 text-sm w-20">{d.label}</span>
                                    <code className="text-[var(--accent-teal)] text-xs font-mono w-36">{d.token}</code>
                                    <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[var(--accent-teal)]/40 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: parseInt(d.value) / 1000, ease: 'easeOut' }}
                                        />
                                    </div>
                                    <span className="text-white/30 text-xs font-mono w-16 text-right">{d.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
           COMPONENTS
           ═══════════════════════════════════════════════════ */}
                <section className="py-20 border-b border-white/[0.06]" id="components">
                    <SectionLabel>06 — Components</SectionLabel>
                    <SectionTitle>UI Patterns</SectionTitle>

                    {/* Buttons */}
                    <div className="mt-12">
                        <h3 className="text-white/60 text-sm font-mono uppercase tracking-widest mb-6">Buttons</h3>
                        <div className="flex flex-wrap gap-4 items-center">
                            <button className="px-6 py-3 bg-[var(--accent-teal)] text-white font-medium rounded-lg hover:bg-[var(--accent-teal-dark)] transition-colors">
                                Primary CTA
                            </button>
                            <button className="px-6 py-3 border border-white/20 text-white/80 font-medium rounded-lg hover:bg-white/5 transition-colors">
                                Secondary
                            </button>
                            <button className="group relative px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/80 font-medium hover:bg-white/10 transition-all overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                <span className="relative">Pill + Shine</span>
                            </button>
                            <button className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-colors">
                                Hero CTA
                            </button>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-12">
                        <h3 className="text-white/60 text-sm font-mono uppercase tracking-widest mb-6">Tags & Labels</h3>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 rounded-full bg-[var(--accent-teal)]/10 border border-[var(--accent-teal)]/20 text-[var(--accent-teal)] text-xs font-mono">
                                AI-Native
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono">
                                Enterprise
                            </span>
                            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
                                Data Science
                            </span>
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                                Code Prototype
                            </span>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="mt-12">
                        <h3 className="text-white/60 text-sm font-mono uppercase tracking-widest mb-6">Cards</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['Surface card', 'Bordered card', 'Accent card'].map((label, i) => (
                                <motion.div
                                    key={label}
                                    className={`p-6 rounded-xl ${i === 0 ? 'bg-white/[0.03]' : i === 1 ? 'border border-white/[0.08] bg-transparent' : 'border border-[var(--accent-teal)]/20 bg-[var(--accent-teal)]/[0.03]'}`}
                                    whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.15)' }}
                                >
                                    <p className="text-white font-medium">{label}</p>
                                    <p className="text-white/40 text-sm mt-2">A card component for grouping related content.</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
           ACCESSIBILITY
           ═══════════════════════════════════════════════════ */}
                <section className="py-20" id="accessibility">
                    <SectionLabel>07 — Accessibility</SectionLabel>
                    <SectionTitle>A11y Standards</SectionTitle>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-xl border border-white/[0.06]">
                            <h3 className="text-white font-medium mb-4">Focus Ring</h3>
                            <button className="px-4 py-2 rounded-lg border border-white/20 text-white/70 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--focus-ring)]">
                                Tab to me
                            </button>
                            <p className="text-white/40 text-xs font-mono mt-3">3px teal ring · 1px offset</p>
                        </div>

                        <div className="p-6 rounded-xl border border-white/[0.06]">
                            <h3 className="text-white font-medium mb-4">Reduced Motion</h3>
                            <p className="text-white/50 text-sm">
                                All animations respect <code className="text-[var(--accent-teal)] text-xs">prefers-reduced-motion</code>.
                                Durations collapse to 0.01ms.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-white/[0.06]">
                            <h3 className="text-white font-medium mb-4">Skip to Content</h3>
                            <p className="text-white/50 text-sm">
                                <code className="text-[var(--accent-teal)] text-xs">SkipToContent</code> component wraps all pages via PageShell.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-white/[0.06]">
                            <h3 className="text-white font-medium mb-4">Touch Targets</h3>
                            <p className="text-white/50 text-sm">
                                Minimum <code className="text-[var(--accent-teal)] text-xs">44×44px</code> via <code className="text-[var(--accent-teal)] text-xs">.touch-target</code>.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/[0.06] py-12 text-center">
                <p className="text-white/20 text-xs font-mono">
                    Design System · Anuja Harsha Portfolio · tokens.css
                </p>
            </footer>
        </div>
    )
}
