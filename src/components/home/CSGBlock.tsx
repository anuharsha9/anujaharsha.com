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
        title: 'Scale: Modernizing a 50-Year-Old Engine (20M+ Jobs/Week)',
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
        title: 'AI/ML Strategy: Architecting the Unified Intelligence Hub',
        proof: 'Made ML accessible to non-technical users through workflow redesign',
        link: '/work/ml-functions',
        Wireframe: MLWireframe,
        accentVar: '--semantic-cyan-rgb',
        wireframeHue: 180,
    },
    {
        id: 'iq-plugin',
        domain: 'Platform Unification · AI-Powered Hub',
        title: 'Growth: Driving a 25% Increase in B2B Feature Discovery',
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

                    {/* Wireframe — always visible, blurs on hover (desktop only) */}
                    <div
                        className="absolute inset-0 transition-all duration-500 pointer-events-none"
                        style={{
                            filter: isHovered ? 'blur(8px)' : 'blur(0px)',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                    >
                        <WireframeComponent />
                    </div>

                    {/* MOBILE: Always-visible bottom overlay with domain + title + CTA */}
                    <div className="absolute inset-x-0 bottom-0 z-20 md:hidden pointer-events-none">
                        <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16 pb-4 px-4">
                            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500 block mb-1">
                                {tile.domain}
                            </span>
                            <p className="text-zinc-100 text-sm font-semibold leading-snug mb-3">
                                {tile.title}
                            </p>
                            <div className="flex flex-col gap-2 pointer-events-auto">
                                <TransitionLink href={tile.link} className="flex items-center justify-center gap-2 py-2 px-4 rounded bg-white/10 text-white text-xs font-mono tracking-widest uppercase hover:bg-white/20 transition-colors">
                                    <FileText className="w-3.5 h-3.5" /> Read Case Study
                                </TransitionLink>
                                <button onClick={onWatch} className="flex items-center justify-center gap-2 py-2 px-4 rounded bg-white/5 text-white/70 text-xs font-mono tracking-widest uppercase hover:bg-white/10 hover:text-white transition-colors">
                                    <MonitorPlay className="w-3.5 h-3.5" /> Watch Presentation
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP: Hover overlay — scrim + buttons + title */}
                    <div
                        className="absolute inset-0 z-20 hidden md:flex flex-col justify-between p-8 transition-all duration-500 pointer-events-none"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            backgroundColor: isHovered ? 'rgba(0,0,0,0.70)' : 'rgba(0,0,0,0)',
                        }}
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-6">
                            <p className="text-zinc-100 text-lg md:text-xl font-semibold leading-snug text-center max-w-sm">
                                {tile.title}
                            </p>
                            
                            <div className="flex flex-col gap-3 pointer-events-auto">
                                <TransitionLink href={tile.link} className="flex items-center justify-center gap-3 py-3 px-6 rounded border border-white/20 bg-white/10 text-white text-xs md:text-sm font-mono tracking-[0.1em] uppercase hover:bg-white hover:text-black hover:border-white transition-all">
                                    <FileText className="w-4 h-4" /> Read Case Study
                                </TransitionLink>
                                <button onClick={onWatch} className="flex items-center justify-center gap-3 py-3 px-6 rounded border border-white/10 bg-black/50 text-white/70 text-xs md:text-sm font-mono tracking-[0.1em] uppercase hover:bg-white/10 hover:text-white hover:border-white/30 transition-all">
                                    <MonitorPlay className="w-4 h-4" /> Watch Presentation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Proof line — attached to this tile */}
            <p className="mt-3 flex items-center gap-2 text-zinc-600 text-[11px] md:text-xs font-mono tracking-wide">
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

                {/* Section header */}
                <motion.div
                    className="mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
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
