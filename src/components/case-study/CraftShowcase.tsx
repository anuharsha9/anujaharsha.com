'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Calendar, Clock, Mail, Users, FolderTree, Settings,
    MousePointer, Workflow, Layout, BarChart3, Sparkles,
    Pencil, Layers, LayoutGrid, CheckCircle, ArrowRight,
} from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import ImageLightbox from './ImageLightbox'
import type { CraftShowcaseData, ShowcaseTab } from '@/types/craftShowcase'

// ─── Icon Resolver ───────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
    Calendar: <Calendar className="w-4 h-4" />,
    Clock: <Clock className="w-4 h-4" />,
    Mail: <Mail className="w-4 h-4" />,
    Users: <Users className="w-4 h-4" />,
    FolderTree: <FolderTree className="w-4 h-4" />,
    Settings: <Settings className="w-4 h-4" />,
    MousePointer: <MousePointer className="w-4 h-4" />,
    Workflow: <Workflow className="w-4 h-4" />,
    Layout: <Layout className="w-4 h-4" />,
    BarChart3: <BarChart3 className="w-4 h-4" />,
    Sparkles: <Sparkles className="w-4 h-4" />,
    Pencil: <Pencil className="w-4 h-4" />,
    Layers: <Layers className="w-4 h-4" />,
    LayoutGrid: <LayoutGrid className="w-4 h-4" />,
    CheckCircle: <CheckCircle className="w-4 h-4" />,
}

function getIcon(name: string) {
    return iconMap[name] || <Sparkles className="w-4 h-4" />
}

// ─── Component ───────────────────────────────────────────

interface CraftShowcaseProps {
    data: CraftShowcaseData
}

export default function CraftShowcase({ data }: CraftShowcaseProps) {
    const [activeTabId, setActiveTabId] = useState(data.tabs[0].id)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    const activeTab = data.tabs.find(t => t.id === activeTabId) || data.tabs[0]

    return (
        <div className="space-y-10">
            {/* ── Section Header ──────────────────────────── */}
            <ComponentHeading
                variant="block"
                align="center"
                tag={data.sectionTag}
                title={data.sectionTitle}
                description={data.sectionDescription}
                color="teal"
                className="mb-2"
            />

            {/* ── Tab Navigation ──────────────────────────── */}
            <div className="relative">
                {/* Mobile scroll fades */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none md:hidden" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none md:hidden" />

                <div className="flex items-center justify-start md:justify-center overflow-x-auto scrollbar-hide px-4 -mx-4 md:mx-0">
                    <div className="flex gap-2 min-w-min p-1">
                        {data.tabs.map((tab) => {
                            const isActive = activeTabId === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTabId(tab.id)}
                                    className={`
                    relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300
                    ${isActive
                                            ? 'bg-[var(--accent-teal)] text-white shadow-lg shadow-teal-500/20 scale-[1.03]'
                                            : 'bg-white/[0.04] border border-white/[0.08] text-[var(--text-muted)] hover:bg-white/[0.07] hover:border-white/[0.12]'}
                  `}
                                >
                                    <span className={isActive ? 'text-white' : 'text-[var(--text-muted)]'}>
                                        {getIcon(tab.iconName)}
                                    </span>
                                    <span>{tab.label}</span>
                                    {tab.isKey && !isActive && (
                                        <span className="ml-1 bg-amber-400/15 text-amber-400 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded">
                                            Key
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* ── Content Stage ───────────────────────────── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTabId}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-8"
                >
                    {/* Title + Description */}
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                        <h4 className="font-sans text-2xl md:text-3xl text-[var(--text-heading)] font-light">
                            {activeTab.title}
                        </h4>
                        <p className="text-[var(--text-body)] leading-relaxed font-light">
                            {activeTab.description}
                        </p>

                        {/* Highlight chip */}
                        {activeTab.highlight && (
                            <div className="inline-block mt-3 bg-amber-500/[0.08] border border-amber-500/20 px-5 py-3 rounded-xl text-left">
                                <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest block mb-1">
                                    {activeTab.highlight.label}
                                </span>
                                <span className="text-sm text-[var(--text-body)] italic leading-relaxed">
                                    {activeTab.highlight.text}
                                </span>
                            </div>
                        )}

                        {/* Quote */}
                        {activeTab.quote && (
                            <div className="mt-6 max-w-2xl mx-auto">
                                <blockquote className="text-xl font-sans italic text-[var(--text-heading)] leading-relaxed">
                                    &ldquo;{activeTab.quote.text}&rdquo;
                                </blockquote>
                                <cite className="block mt-2 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] not-italic">
                                    — {activeTab.quote.attribution}
                                </cite>
                            </div>
                        )}
                    </div>

                    {/* Image Grid — Glass Cards */}
                    <div className={`grid gap-5 ${activeTab.images.length === 1 ? 'grid-cols-1 max-w-3xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
                        {activeTab.images.map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] cursor-pointer hover:border-white/[0.12] hover:shadow-xl hover:shadow-black/10 transition-all duration-300"
                                onClick={() => {
                                    setLightboxIndex(index)
                                    setLightboxOpen(true)
                                }}
                            >
                                <div className="aspect-video relative bg-white/[0.01]">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="px-5 py-3.5 bg-white/[0.02] border-t border-white/[0.04] flex items-start gap-3">
                                    <span className="text-[10px] font-mono font-bold text-[var(--accent-teal)]/60 uppercase tracking-widest mt-0.5 whitespace-nowrap">
                                        {img.figNumber}
                                    </span>
                                    <p className="text-sm text-[var(--text-body)] font-light leading-snug">
                                        {img.caption}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* ── Comparison Card (optional) ───────────────── */}
            {data.comparison && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 md:p-8 backdrop-blur-sm"
                >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                        {/* Before */}
                        <div className="flex-1 space-y-3">
                            <span className="font-mono text-[10px] text-red-400 uppercase tracking-[0.2em]">
                                {data.comparison.before.tag}
                            </span>
                            <h4 className="font-sans text-xl text-[var(--text-heading)]">
                                {data.comparison.before.title}
                            </h4>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                                {data.comparison.before.description}
                            </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center justify-center md:flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                                <ArrowRight className="w-5 h-5 text-[var(--accent-teal)]" />
                            </div>
                        </div>

                        {/* After */}
                        <div className="flex-1 space-y-3">
                            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-[0.2em]">
                                {data.comparison.after.tag}
                            </span>
                            <h4 className="font-sans text-xl text-[var(--text-heading)]">
                                {data.comparison.after.title}
                            </h4>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                                {data.comparison.after.description}
                                {data.comparison.after.highlight && (
                                    <strong className="block mt-1 text-[var(--text-heading)]">
                                        {data.comparison.after.highlight}
                                    </strong>
                                )}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* ── Footer Outcome (optional) ────────────────── */}
            {data.footer && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 max-w-4xl mx-auto"
                >
                    <div className="flex items-start gap-4">
                        <div className="bg-emerald-500/10 p-2.5 rounded-xl shrink-0">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="space-y-1.5">
                            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-[0.2em] block">
                                {data.footer.label}
                            </span>
                            <p className="text-[var(--text-body)] text-sm leading-relaxed">
                                {data.footer.text}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* ── Lightbox ─────────────────────────────────── */}
            {lightboxOpen && activeTab && (
                <ImageLightbox
                    isOpen={lightboxOpen}
                    onClose={() => setLightboxOpen(false)}
                    imageSrc={activeTab.images[lightboxIndex].src}
                    imageAlt={activeTab.images[lightboxIndex].alt}
                    imageCaption={activeTab.images[lightboxIndex].caption}
                    images={activeTab.images.map(img => ({
                        src: img.src,
                        alt: img.alt,
                        caption: img.caption,
                        type: 'image' as const,
                    }))}
                    currentIndex={lightboxIndex}
                    onNavigate={(index) => setLightboxIndex(index)}
                />
            )}
        </div>
    )
}
