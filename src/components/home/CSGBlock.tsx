'use client'

import { useRef, useState } from 'react'
import TransitionLink from '@/components/transitions/TransitionLink'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, FileText, MonitorPlay } from 'lucide-react'
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

                    {/* Wireframe — always crisp on mobile (no hover); blurs on desktop hover */}
                    <div
                        className="absolute inset-0 pointer-events-none transition-all duration-500"
                        style={{
                            filter: isHovered ? 'blur(8px)' : 'blur(0px)',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                    >
                        <WireframeComponent />
                    </div>

                    {/* DESKTOP only: hover overlay — title + two proper buttons.
                        Mobile relies on the content sitting BELOW the tile instead,
                        so the wireframe animation isn't buried. */}
                    <div
                        className="absolute inset-0 z-20 hidden md:flex items-center justify-center transition-all duration-500"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            backgroundColor: isHovered ? 'rgba(0,0,0,0.62)' : 'rgba(0,0,0,0)',
                        }}
                    >
                        <div className="flex w-full max-w-[18rem] flex-col items-center gap-5 px-6 text-center pointer-events-auto">
                            <div>
                                {/* Role eyebrow — explicit ownership signal */}
                                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-teal)]/80">
                                    {tile.role}
                                </p>
                                <p className="text-zinc-100 text-lg font-semibold leading-snug">
                                    {tile.title}
                                </p>
                                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                                    {tile.domain}
                                </p>
                            </div>

                            <div className="flex w-full flex-col gap-2.5">
                                <TransitionLink
                                    href={tile.link}
                                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:bg-[var(--accent-teal)] hover:text-white hover:shadow-[0_0_30px_rgba(var(--accent-teal-glow-rgb),0.35)]"
                                >
                                    <FileText className="w-4 h-4" /> Read Case Study
                                </TransitionLink>
                                <button
                                    onClick={onWatch}
                                    className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/35 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/70 hover:bg-white/[0.14]"
                                >
                                    <MonitorPlay className="w-4 h-4" /> Watch Presentation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE-ONLY below-tile content. Simplified: title + one primary CTA +
                the proof line. The mono domain eyebrow is dropped (redundant with the
                title) so the tile reads as three elements, not five. Watch Presentation
                is a quieter secondary text link. */}
            <div className="mt-4 md:hidden">
                {/* Role eyebrow — explicit ownership signal */}
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-teal)]/80">
                    {tile.role}
                </p>
                <h3 className="text-zinc-100 text-base font-semibold leading-snug">
                    {tile.title}
                </h3>
                <div className="mt-3 flex items-center gap-4">
                    <TransitionLink
                        href={tile.link}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--accent-teal)] hover:text-white active:scale-[0.98]"
                    >
                        <FileText className="w-4 h-4" /> Read Case Study
                    </TransitionLink>
                    <button
                        onClick={onWatch}
                        aria-label="Watch Presentation"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition-colors shrink-0"
                    >
                        <MonitorPlay className="w-3.5 h-3.5" /> Watch
                    </button>
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
