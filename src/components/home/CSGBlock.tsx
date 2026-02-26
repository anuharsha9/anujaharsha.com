'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
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
    },
    {
        id: 'iq-plugin',
        title: 'AI powered HUB to meet business needs',
        link: '/work/iq-plugin',
        Wireframe: IQWireframe,
        accentVar: '--semantic-purple-vivid-rgb',
    },
    {
        id: 'reportcaster',
        title: 'Customer retention success for Enterprise Scheduling',
        link: '/work/reportcaster',
        flagship: true,
        Wireframe: RCWireframe,
        accentVar: '--accent-amber-rgb',
    },
]

/* ─── single tile ─── */
function BentoTile({ tile, delay }: { tile: typeof TILES[0]; delay: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const WireframeComponent = tile.Wireframe
    const rgb = `var(${tile.accentVar})`

    return (
        <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
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
                        border: `1px solid rgba(${rgb}, 0.09)`,
                        backgroundColor: `rgba(${rgb}, 0.03)`,
                        boxShadow: isHovered
                            ? `0 0 40px rgba(${rgb}, 0.08), inset 0 0 0 1px rgba(${rgb}, 0.15)`
                            : `0 0 0px transparent, inset 0 0 0 1px rgba(${rgb}, 0.06)`,
                    }}
                >
                    {/* Wireframe — always visible, blurs on hover */}
                    <div
                        className="absolute inset-0 transition-all duration-500"
                        style={{
                            filter: isHovered ? 'blur(8px)' : 'blur(0px)',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                    >
                        <WireframeComponent />
                    </div>

                    {/* Hover overlay: scrim + play + title */}
                    <div
                        className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-500"
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

    const headingY = useTransform(scrollYProgress, [0, 0.3], [100, 0])
    const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
    const headingScale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1])

    const leftTiles = TILES.filter(t => !t.flagship)
    const rightTile = TILES.find(t => t.flagship)!

    return (
        <section ref={ref} className="relative py-20 md:py-32 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-hidden">
            {/* Era label — decorative, above content */}
            <motion.div
                className="mb-6 md:mb-8 pointer-events-none select-none"
                aria-hidden="true"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="font-extrabold text-[clamp(3rem,8vw,7rem)] text-white/[0.03] uppercase tracking-tighter leading-none block">
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
        </section>
    )
}
