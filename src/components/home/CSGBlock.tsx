'use client'

import { useRef, useState } from 'react'
import TransitionLink from '@/components/transitions/TransitionLink'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, FileText, MonitorPlay } from 'lucide-react'
import { RCWireframe, MLWireframe, IQWireframe } from '@/components/case-study/CaseStudyWireframes'
import PresentationLightbox from '@/components/case-study/PresentationLightbox'
import { RC_SLIDES, ML_SLIDES, DSML_SLIDES } from '@/data/presentation-slides'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─── tile data ─── */
const TILES = [
    {
        id: 'reportcaster',
        domain: 'Legacy Modernization · Customer Retention',
        title: 'Scale: Modernizing a 40-Year-Old Engine (20M+ Jobs/Week)',
        proof: 'Reduced churn risk by modernizing a legacy enterprise platform',
        link: '/work/reportcaster',
        flagship: true,
        Wireframe: RCWireframe,
        accentVar: '--accent-amber-rgb',
        wireframeHue: 40,
    },
    {
        id: 'ml-functions',
        domain: 'AI Workflow Design · ML Accessibility',
        title: 'AI/ML Strategy: Nobody Could Use Our ML Engine',
        proof: 'Made ML accessible to non-technical users through workflow redesign',
        link: '/work/ml-functions',
        Wireframe: MLWireframe,
        accentVar: '--semantic-cyan-rgb',
        wireframeHue: 180,
    },
    {
        id: 'iq-plugin',
        domain: 'Platform Unification · AI-Powered Hub',
        title: 'Growth: We Built the Intelligence. Nobody Knew It Existed.',
        proof: 'Boosted AI feature discovery 25% through UX redesign',
        link: '/work/iq-plugin',
        Wireframe: IQWireframe,
        accentVar: '--semantic-purple-rgb',
        wireframeHue: 260,
    },
]

/* ─── single tile ─── */
function BentoTile({ tile, delay, onWatch }: { tile: typeof TILES[0]; delay: number; onWatch: () => void }) {
    const [isHovered, setIsHovered] = useState(false)
    const WireframeComponent = tile.Wireframe
    const rgb = `var(${tile.accentVar})`
    const gridColor = `hsl(${tile.wireframeHue}, 50%, 25%)`

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(16px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, delay, ease }}
        >
            <div className="group block relative">
                {/* TILE — wireframe animation lives here, always-visible, never covered.
                    Hover just adds a subtle border + shadow accent. */}
                <div
                    className="relative w-full overflow-hidden rounded-2xl transition-all duration-500"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        minHeight: '320px',
                        border: `1px solid rgba(${rgb}, 0.12)`,
                        background: `linear-gradient(135deg, rgba(${rgb}, 0.08), rgba(${rgb}, 0.03)), var(--bg-cinematic)`,
                        boxShadow: isHovered
                            ? `0 0 40px rgba(${rgb}, 0.10), inset 0 0 0 1px rgba(${rgb}, 0.20)`
                            : `0 0 0px transparent, inset 0 0 0 1px rgba(${rgb}, 0.06)`,
                    }}
                >
                    {/* Dot pattern overlay — AI neural net feel */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `radial-gradient(circle, ${gridColor} 0.8px, transparent 0.8px)`,
                            backgroundSize: '24px 24px',
                            opacity: 0.12,
                        }}
                    />

                    {/* Wireframe — always crisp, always visible, the star of the tile */}
                    <div className="absolute inset-0 pointer-events-none">
                        <WireframeComponent />
                    </div>
                </div>
            </div>

            {/* Title + Domain — sits below the tile, always-visible */}
            <div className="mt-5">
                <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    {tile.domain}
                </p>
                <h3 className="mt-2 text-zinc-100 text-base md:text-lg font-semibold leading-snug">
                    {tile.title}
                </h3>
            </div>

            {/* CTA pair — permanent, side-by-side. Filled primary + outlined secondary. */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
                <TransitionLink
                    href={tile.link}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--accent-teal)] hover:text-white hover:shadow-[0_0_30px_rgba(var(--accent-teal-glow-rgb),0.35)] active:scale-[0.98]"
                >
                    <FileText className="w-4 h-4" /> Read Case Study
                </TransitionLink>
                <button
                    onClick={onWatch}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/[0.10] active:scale-[0.98]"
                >
                    <MonitorPlay className="w-4 h-4" /> Watch Presentation
                </button>
            </div>

            {/* Proof line — attached to this tile */}
            <p className="mt-4 flex items-center gap-2 text-zinc-600 text-[11px] md:text-xs font-mono tracking-wide">
                <span className="w-1 h-1 rounded-full bg-[var(--accent-teal)] opacity-40 shrink-0" />
                {tile.proof}
            </p>
        </motion.div>
    )
}

/* ─── main block ─── */
export default function CSGBlock() {
    const [presentationId, setPresentationId] = useState<string | null>(null)
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const headingY = useTransform(scrollYProgress, [0, 0.15], [20, 0])
    const headingOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1])
    const headingScale = useTransform(scrollYProgress, [0, 0.15], [0.98, 1])

    return (
        <>
            <motion.section ref={ref} className="relative pt-8 md:pt-16 pb-12 md:pb-20 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-hidden">
                {/* Era label — decorative, above content */}
                <motion.div
                    className="mb-6 md:mb-8 pointer-events-none select-none"
                    aria-hidden="true"
                    initial={{ opacity: 0, x: -40, filter: 'blur(20px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="font-extrabold text-[clamp(2rem,6vw,7rem)] text-white/[0.03] uppercase tracking-tighter leading-none block breathe-slow" style={{ '--breathe-base': '0.03', '--breathe-peak': '0.05' } as React.CSSProperties}>
                        2022 — 2025
                    </span>
                </motion.div>

                {/* Section header — animate on mount (NOT whileInView). This block sits
                    inside a BlurZone pulled up by -50vh, so a viewport-gated reveal never
                    hit its trigger and the heading stayed stuck at opacity 0 (invisible).
                    Mount-based animation guarantees the heading is always present. */}
                <motion.div
                    className="mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-zinc-500 mb-3">
                        2022 — 2025
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                        Senior Product Designer
                        <span className="text-zinc-600 font-normal"> at Cloud Software Group</span>
                    </h2>
                    <p className="mt-3 text-sm md:text-base text-zinc-500 font-light max-w-2xl">
                        Architecting a $175M P&L mission-critical data platform.
                    </p>
                </motion.div>


                {/* 3-column equal grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    {TILES.map((tile, i) => (
                        <BentoTile key={tile.id} tile={tile} delay={0.2 + i * 0.15} onWatch={() => setPresentationId(tile.id)} />
                    ))}
                </div>
            </motion.section>

            {/* Presentation Lightboxes */}
            {presentationId === 'reportcaster' && (
                <PresentationLightbox isOpen={true} onClose={() => setPresentationId(null)} slides={RC_SLIDES} />
            )}
            {presentationId === 'ml-functions' && (
                <PresentationLightbox isOpen={true} onClose={() => setPresentationId(null)} slides={ML_SLIDES} />
            )}
            {presentationId === 'iq-plugin' && (
                <PresentationLightbox isOpen={true} onClose={() => setPresentationId(null)} slides={DSML_SLIDES} />
            )}
        </>
    )
}
