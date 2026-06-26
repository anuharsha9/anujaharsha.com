'use client'

import { useRef, useState } from 'react'
import Button from '@/components/ui/Button'
import { m, useScroll, useTransform } from 'framer-motion'
import { FileText, MonitorPlay } from 'lucide-react'
import { RCWireframe, MLWireframe, IQWireframe } from '@/components/case-study/CaseStudyWireframes'
import PresentationLightbox from '@/components/case-study/PresentationLightbox'
import { RC_SLIDES, ML_SLIDES, DSML_SLIDES } from '@/data/presentation-slides'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─── tile data ───
 * Recruiter-readable 10-second triage (per Superhive UX-portfolio article):
 *  - leadSignal: the STAFF signal — scope of influence in a few words, shown
 *    as an eyebrow above the title (the thing that reads as "leader," not just
 *    "IC"). Condensed from each case study's authored leadershipSummary.
 *  - title: the outcome-framed headline. */
const TILES = [
    {
        id: 'reportcaster',
        leadSignal: 'Volunteered week 1 · aligned a 20-person team',
        title: 'Scale: Modernizing a 40-Year-Old Engine (20M+ Jobs/Week)',
        link: '/work/reportcaster',
        flagship: true,
        Wireframe: RCWireframe,
        accentVar: '--accent-amber-rgb',
        wireframeHue: 40,
    },
    {
        id: 'ml-functions',
        leadSignal: 'Earned it via a side challenge · MIT-certified',
        title: 'AI/ML Strategy: Nobody Could Use Our ML Engine',
        link: '/work/ml-functions',
        Wireframe: MLWireframe,
        accentVar: '--semantic-cyan-rgb',
        wireframeHue: 180,
    },
    {
        id: 'iq-plugin',
        leadSignal: 'Defined the architecture · defended vs. 20–35-yr veterans',
        title: 'Growth: We Built the Intelligence. Nobody Knew It Existed.',
        link: '/work/iq-plugin',
        Wireframe: IQWireframe,
        accentVar: '--semantic-purple-rgb',
        wireframeHue: 260,
    },
]

/* ─── Case-study tile — 3-column grid.
 *
 * Layout per Anuja: don't crowd the card. The animated wireframe fills the
 * card and is the default view; on hover (desktop) ONLY the two buttons
 * (Case Study / Watch) fade in over a bottom scrim. On mobile (no hover) the
 * buttons stay visible. The TEXT — a leadSignal eyebrow (the Staff signal)
 * and the title — sits BELOW the card, always visible, never crowding the
 * animation. Buttons use the shared <Button> primitive (dark-glass primary +
 * ghost-glass secondary). */
function BentoTile({ tile, delay, onWatch }: { tile: typeof TILES[0]; delay: number; onWatch: () => void }) {
    const WireframeComponent = tile.Wireframe
    const rgb = `var(${tile.accentVar})`
    const gridColor = `hsl(${tile.wireframeHue}, 50%, 25%)`

    return (
        <m.div
            initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(16px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, delay, ease }}
            className="group flex flex-col"
        >
            {/* CARD — wireframe + hover-revealed buttons only (no text). */}
            <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl transition-all duration-500 group-hover:-translate-y-1"
                style={{
                    border: `1px solid rgba(${rgb}, 0.18)`,
                    background: `linear-gradient(135deg, rgba(${rgb}, 0.08), rgba(${rgb}, 0.03)), var(--bg-cinematic)`,
                    boxShadow: `0 0 0px transparent, inset 0 0 0 1px rgba(${rgb}, 0.08)`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 18px 50px -20px rgba(${rgb}, 0.45), inset 0 0 0 1px rgba(${rgb}, 0.28)`; e.currentTarget.style.borderColor = `rgba(${rgb}, 0.35)` }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 0px transparent, inset 0 0 0 1px rgba(${rgb}, 0.08)`; e.currentTarget.style.borderColor = `rgba(${rgb}, 0.18)` }}
            >
                {/* Dot pattern overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-[1]"
                    style={{
                        backgroundImage: `radial-gradient(circle, ${gridColor} 0.8px, transparent 0.8px)`,
                        backgroundSize: '24px 24px',
                        opacity: 0.10,
                    }}
                />

                {/* Wireframe cover — fills the card, always visible (the star). */}
                <div className="absolute inset-0 z-[2] pointer-events-none">
                    <WireframeComponent />
                </div>

                {/* Buttons only — reveal on hover (desktop), always on mobile. */}
                <div className="absolute inset-x-0 bottom-0 z-[10] flex gap-2 p-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent transition-opacity duration-500 opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto">
                    <Button variant="primary" size="sm" href={tile.link} icon={<FileText className="w-3.5 h-3.5" />} className="flex-1">
                        Case Study
                    </Button>
                    <Button variant="secondary" size="sm" onClick={onWatch} icon={<MonitorPlay className="w-3.5 h-3.5" />} className="flex-1">
                        Watch
                    </Button>
                </div>
            </div>

            {/* TEXT — below the card, always visible. leadSignal eyebrow (Staff
                signal) + title. Never crowds the animation. */}
            <div className="mt-4">
                <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] leading-relaxed" style={{ color: `rgba(${rgb}, 0.9)` }}>
                    {tile.leadSignal}
                </p>
                <h3 className="mt-1.5 font-sans text-sm md:text-base font-semibold leading-snug tracking-tight text-zinc-300">
                    {tile.title}
                </h3>
            </div>
        </m.div>
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
            <m.section ref={ref} className="relative pt-8 md:pt-16 pb-12 md:pb-20 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-hidden">
                {/* Era label — decorative, above content */}
                <m.div
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
                </m.div>

                {/* Section header — animate on mount (NOT whileInView). This block sits
                    inside a BlurZone pulled up by -50vh, so a viewport-gated reveal never
                    hit its trigger and the heading stayed stuck at opacity 0 (invisible).
                    Mount-based animation guarantees the heading is always present. */}
                <m.div
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
                        Architecting a $175M P&amp;L mission-critical data platform — named a Customer Experience Leader in Dresner Advisory Services&apos; 2025 Industry Excellence Awards, one of the BI industry&apos;s highest honors.
                    </p>
                </m.div>


                {/* 3-column grid — one card per case study. 1-col on mobile,
                    3-col from md up. items-stretch keeps all three equal height. */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start">
                    {TILES.map((tile, i) => (
                        <BentoTile key={tile.id} tile={tile} delay={0.15 + i * 0.12} onWatch={() => setPresentationId(tile.id)} />
                    ))}
                </div>
            </m.section>

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
