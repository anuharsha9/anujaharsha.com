'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from 'framer-motion'
import { Play } from 'lucide-react'
import { RCWireframe, MLWireframe, IQWireframe } from '@/components/case-study/CaseStudyWireframes'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─── tile data ─── */
const TILES = [
    {
        id: 'ml-functions',
        title: 'Feature adoption/simplification for Machine Learning workflows',
        link: '/work/ml-functions',
        Wireframe: MLWireframe,
        accentVar: '--semantic-cyan-vivid-rgb',
        wireframeHue: 180,
    },
    {
        id: 'iq-plugin',
        title: 'AI powered HUB to meet business needs',
        link: '/work/iq-plugin',
        Wireframe: IQWireframe,
        accentVar: '--semantic-purple-vivid-rgb',
        wireframeHue: 260,
    },
    {
        id: 'reportcaster',
        title: 'Customer retention success for Enterprise Scheduling',
        link: '/work/reportcaster',
        flagship: true,
        Wireframe: RCWireframe,
        accentVar: '--accent-amber-rgb',
        wireframeHue: 40,
    },
]

/* ─── single tile ─── */
function BentoTile({ tile, delay }: { tile: typeof TILES[0]; delay: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const WireframeComponent = tile.Wireframe
    const rgb = `var(${tile.accentVar})`
    const gridColor = `hsl(${tile.wireframeHue}, 50%, 25%)`

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay, ease }}
        >
            <Link href={tile.link} className="group block">
                <div
                    className="relative w-full overflow-hidden rounded-2xl cursor-pointer transition-all duration-500"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        minHeight: tile.flagship ? '420px' : '200px',
                        border: `1px solid rgba(${rgb}, 0.12)`,
                        backgroundColor: `rgba(${rgb}, 0.04)`,
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

                    {/* MOBILE: Always-visible bottom overlay with title + CTA */}
                    <div className="absolute inset-x-0 bottom-0 z-20 md:hidden pointer-events-none">
                        <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16 pb-4 px-4">
                            <p className="text-white/90 text-sm font-semibold leading-snug mb-1.5">
                                {tile.title}
                            </p>
                            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/50 flex items-center gap-1.5">
                                <Play className="w-3 h-3 fill-white/50" />
                                View Case Study
                            </span>
                        </div>
                    </div>

                    {/* DESKTOP: Hover overlay — scrim + play + title */}
                    <div
                        className="absolute inset-0 z-20 hidden md:flex items-center justify-center transition-all duration-500 pointer-events-none"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            backgroundColor: isHovered ? 'var(--overlay-black-50)' : 'transparent',
                        }}
                    >
                        <div className="flex flex-col items-center gap-3 max-w-xs text-center px-4">
                            <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                            </div>
                            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/70">
                                Watch Case Study
                            </span>
                            <p className="text-white/90 text-sm md:text-base font-semibold leading-snug mt-1">
                                {tile.title}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

/* ─── main block ─── */
export default function CSGBlock() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const headingY = useTransform(scrollYProgress, [0, 0.15], [20, 0])
    const headingOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1])
    const headingScale = useTransform(scrollYProgress, [0, 0.15], [0.98, 1])

    // Blur-to-focus entrance: mirrors the hero's focus-to-blur exit for seamless crossfade
    const rawSectionBlur = useTransform(scrollYProgress, [0, 0.10], [12, 0])
    // Spring-smooth the blur for organic momentum feel
    const sectionBlur = useSpring(rawSectionBlur, { stiffness: 100, damping: 20, mass: 0.5 })
    const sectionFilter = useMotionTemplate`blur(${sectionBlur}px)`

    const leftTiles = TILES.filter(t => !t.flagship)
    const rightTile = TILES.find(t => t.flagship)!

    return (
        <motion.section ref={ref} className="relative pt-8 md:pt-16 pb-12 md:pb-20 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-hidden" style={{ filter: sectionFilter }}>
            {/* Era label — decorative, above content */}
            <motion.div
                className="mb-6 md:mb-8 pointer-events-none select-none"
                aria-hidden="true"
                initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="font-extrabold text-[clamp(2rem,6vw,7rem)] text-white/[0.03] uppercase tracking-tighter leading-none block">
                    2022 — 2025
                </span>
            </motion.div>

            {/* Section header */}
            <motion.div
                className="mb-12 md:mb-16"
                style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
            >
                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-white/50 mb-3">
                    2022 — 2025
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                    Senior Product Designer
                    <span className="text-white/40 font-normal"> at Cloud Software Group</span>
                </h2>
            </motion.div>

            {/* Bento Grid: RC flagship left (65%) / ML + IQ stacked right (35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_35%] gap-4 md:gap-5">
                {/* Left column — RC flagship */}
                <BentoTile tile={rightTile} delay={0.1} />

                {/* Right column — ML + IQ stacked */}
                <div className="flex flex-col gap-4 md:gap-5">
                    {leftTiles.map((tile, i) => (
                        <BentoTile key={tile.id} tile={tile} delay={0.15 + i * 0.15} />
                    ))}
                </div>
            </div>
        </motion.section>
    )
}
