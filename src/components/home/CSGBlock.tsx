'use client'

import { useRef, useState } from 'react'
import TransitionLink from '@/components/transitions/TransitionLink'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FileText, MonitorPlay } from 'lucide-react'
import { RCWireframe, MLWireframe, IQWireframe } from '@/components/case-study/CaseStudyWireframes'
import PresentationLightbox from '@/components/case-study/PresentationLightbox'
import { RC_SLIDES, ML_SLIDES, DSML_SLIDES } from '@/data/presentation-slides'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─── tile data ───
 * Recruiter-readable 10-second triage (per Superhive UX-portfolio article):
 *  - role: explicit ownership signal (failure #4: 'unclear role')
 *  - proof: OUTCOME-led, not description (failure #3: 'process without outcomes')
 *    Each proof line names a real change — contract retention, completion rate,
 *    discovery rate — using numbers from the case study hero data. */
const TILES = [
    {
        id: 'reportcaster',
        role: 'UX Owner · Lead Designer · 2022—24',
        domain: 'Legacy Modernization · Customer Retention',
        title: 'Scale: Modernizing a 40-Year-Old Engine (20M+ Jobs/Week)',
        proof: 'Helped renew a multi-year, multi-million-dollar enterprise contract',
        link: '/work/reportcaster',
        flagship: true,
        Wireframe: RCWireframe,
        accentVar: '--accent-amber-rgb',
        wireframeHue: 40,
    },
    {
        id: 'ml-functions',
        role: 'Lead Designer & Researcher · End-to-End · 2023—24',
        domain: 'AI Workflow Design · ML Accessibility',
        title: 'AI/ML Strategy: Nobody Could Use Our ML Engine',
        proof: '4/4 non-technical SMEs completed ML training unaided · ~6→2 clicks',
        link: '/work/ml-functions',
        Wireframe: MLWireframe,
        accentVar: '--semantic-cyan-rgb',
        wireframeHue: 180,
    },
    {
        id: 'iq-plugin',
        role: 'Lead Designer · Vision to Architecture · 2024—25',
        domain: 'Platform Unification · AI-Powered Hub',
        title: 'Growth: We Built the Intelligence. Nobody Knew It Existed.',
        proof: '+25% AI feature discovery through unified platform UX',
        link: '/work/iq-plugin',
        Wireframe: IQWireframe,
        accentVar: '--semantic-purple-rgb',
        wireframeHue: 260,
    },
]

/* ─── Single unified feature-card tile.
 *
 * Per Anuja: 'Can't we just keep the title and the two buttons? Do we
 * really need all that extra content making it so busy?'
 *
 * All 3 case studies use this same minimal horizontal layout, stacked
 * vertically (one below another). Wireframe LEFT, just title + 2 buttons
 * RIGHT. The role / domain / outcome content is preserved inside the
 * case study itself via QuickImpactOverview — no need to repeat it here. */
function BentoTile({ tile, delay, onWatch, reverse = false }: { tile: typeof TILES[0]; delay: number; onWatch: () => void; reverse?: boolean }) {
    const WireframeComponent = tile.Wireframe
    const rgb = `var(${tile.accentVar})`
    const gridColor = `hsl(${tile.wireframeHue}, 50%, 25%)`

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(16px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, delay, ease }}
            className="group"
        >
            <div
                className="relative w-full overflow-hidden rounded-2xl transition-all duration-500"
                style={{
                    border: `1px solid rgba(${rgb}, 0.18)`,
                    background: `linear-gradient(135deg, rgba(${rgb}, 0.08), rgba(${rgb}, 0.03)), var(--bg-cinematic)`,
                    boxShadow: `0 0 0px transparent, inset 0 0 0 1px rgba(${rgb}, 0.08)`,
                }}
            >
                {/* Dot pattern overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle, ${gridColor} 0.8px, transparent 0.8px)`,
                        backgroundSize: '24px 24px',
                        opacity: 0.10,
                    }}
                />

                {/* Side-by-side — wireframe and content swap sides on `reverse` tiles
                    for editorial rhythm (every-other card alternates layout). */}
                <div className="relative grid grid-cols-1 md:grid-cols-12 md:items-stretch md:min-h-[360px]">
                    {/* Wireframe — always crisp, no hover blur */}
                    <div className={`relative md:col-span-7 ${reverse ? 'md:order-2' : 'md:order-1'} aspect-[16/10] md:aspect-auto overflow-hidden`}>
                        <div className="absolute inset-0 pointer-events-none">
                            <WireframeComponent />
                        </div>
                    </div>

                    {/* Content — just title + 2 buttons. Nothing else. */}
                    <div className={`relative md:col-span-5 ${reverse ? 'md:order-1 md:border-r' : 'md:order-2 md:border-l'} flex flex-col justify-center gap-6 p-6 md:p-10 lg:p-12 border-t border-white/[0.04] md:border-t-0`}>
                        <h3 className="text-xl md:text-2xl lg:text-[28px] font-bold text-zinc-100 leading-tight tracking-tight">
                            {tile.title}
                        </h3>

                        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                            <TransitionLink
                                href={tile.link}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--accent-teal)] hover:text-white hover:shadow-[0_0_30px_rgba(var(--accent-teal-glow-rgb),0.35)] active:scale-[0.98]"
                            >
                                <FileText className="w-4 h-4" /> Case Study
                            </TransitionLink>
                            <button
                                onClick={onWatch}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/[0.10] active:scale-[0.98]"
                            >
                                <MonitorPlay className="w-4 h-4" /> Watch
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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


                {/* Stacked — all 3 case studies one below another. Alternating layout:
                    even tiles get wireframe LEFT + content RIGHT, odd tiles reverse it. */}
                <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
                    {TILES.map((tile, i) => (
                        <BentoTile key={tile.id} tile={tile} delay={0.2 + i * 0.15} onWatch={() => setPresentationId(tile.id)} reverse={i % 2 === 1} />
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
