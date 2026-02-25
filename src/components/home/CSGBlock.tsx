'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play } from 'lucide-react'

/* ─── tile data ─── */
const TILES = [
    {
        id: 'ml-functions',
        title: 'Feature adoption/simplification for Machine Learning workflows',
        video: '/videos/ml-prototype-walkthrough.mp4',
        link: '/work/ml-functions',
        wireframeHue: 180,
    },
    {
        id: 'iq-plugin',
        title: 'AI powered HUB to meet business needs',
        video: '/videos/iq-prototype-walkthrough.mp4',
        link: '/work/iq-plugin',
        wireframeHue: 260,
    },
    {
        id: 'reportcaster',
        title: 'Customer retention success for Enterprise Scheduling',
        video: '/videos/rc-prototype-walkthrough.mp4',
        link: '/work/reportcaster',
        flagship: true,
        wireframeHue: 40,
    },
]

/* ─── Animated wireframe background ─── */
function WireframeBackground({ hue }: { hue: number }) {
    const accent = `hsl(${hue}, 70%, 55%)`
    const accentDim = `hsl(${hue}, 50%, 25%)`

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `
                        linear-gradient(${accentDim} 1px, transparent 1px),
                        linear-gradient(90deg, ${accentDim} 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Morphing shapes */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                {/* Rotating outer ring */}
                <motion.rect
                    x="50" y="30" width="300" height="240" rx="20"
                    fill="none"
                    stroke={accent}
                    strokeWidth="0.5"
                    strokeDasharray="8 12"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '200px 150px' }}
                    opacity={0.15}
                />
                {/* Inner morphing rectangle */}
                <motion.rect
                    x="100" y="60" width="200" height="180" rx="12"
                    fill="none"
                    stroke={accent}
                    strokeWidth="0.5"
                    initial={{ rx: 12, ry: 12 }}
                    animate={{ rx: [12, 60, 12], ry: [12, 60, 12] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    opacity={0.12}
                />
                {/* Floating circles */}
                <motion.circle
                    cx="120" cy="80" r="30"
                    fill="none"
                    stroke={accent}
                    strokeWidth="0.5"
                    initial={{ cx: 120, cy: 80 }}
                    animate={{ cx: [120, 280, 120], cy: [80, 220, 80] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                    opacity={0.1}
                />
                <motion.circle
                    cx="280" cy="220" r="20"
                    fill="none"
                    stroke={accent}
                    strokeWidth="0.5"
                    initial={{ cx: 280, cy: 220 }}
                    animate={{ cx: [280, 120, 280], cy: [220, 80, 220] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    opacity={0.1}
                />
                {/* Diagonal scan line */}
                <motion.line
                    x1="0" y1="0" x2="400" y2="300"
                    stroke={accent}
                    strokeWidth="0.3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Pulsing center dot */}
                <motion.circle
                    cx="200" cy="150" r="3"
                    fill={accent}
                    initial={{ r: 2, opacity: 0.2 }}
                    animate={{ r: [2, 6, 2], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
            </svg>

            {/* Radial accent glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 30% 70%, ${accentDim}20, transparent 70%)`,
                }}
            />
        </div>
    )
}

/* ─── single tile ─── */
function BentoTile({ tile, delay }: { tile: typeof TILES[0]; delay: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const handleMouseEnter = () => {
        setIsHovered(true)
        if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(() => { })
        }
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
        if (videoRef.current) {
            videoRef.current.pause()
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link href={tile.link}>
                <div
                    className="group relative w-full h-full overflow-hidden rounded-2xl bg-black/60 cursor-pointer transition-all duration-500 hover:shadow-[0_0_60px_rgba(47,198,213,0.06)]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ minHeight: tile.flagship ? '420px' : '200px' }}
                >
                    {/* Animated wireframe background */}
                    <div className={`transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                        <WireframeBackground hue={tile.wireframeHue} />
                    </div>

                    {/* Video (revealed on hover) */}
                    <video
                        ref={videoRef}
                        src={tile.video}
                        muted
                        playsInline
                        loop
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

                    {/* Play button overlay */}
                    <div className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Play className="w-6 h-6 text-white fill-white ml-1" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6">
                        <p className="text-white/90 text-sm md:text-base font-medium leading-snug max-w-md">
                            {tile.title}
                        </p>
                        <span className={`inline-flex items-center gap-1.5 mt-3 text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 ${isHovered ? 'text-[var(--accent-teal)] translate-x-1' : 'text-white/30'}`}>
                            Watch Case Study
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
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

    const headingY = useTransform(scrollYProgress, [0, 0.3], [60, 0])
    const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

    const leftTiles = TILES.filter(t => !t.flagship)
    const rightTile = TILES.find(t => t.flagship)!

    return (
        <section ref={ref} className="relative py-20 md:py-32 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto">
            {/* Section header */}
            <motion.div
                className="mb-12 md:mb-16"
                style={{ y: headingY, opacity: headingOpacity }}
            >
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/30 mb-3">
                    2022 — 2025
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                    Senior Product Designer
                    <span className="text-white/40 font-normal"> at Cloud Software Group</span>
                </h2>
            </motion.div>

            {/* Bento Grid: 35% left (stacked) / 65% right (flagship) */}
            <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-4 md:gap-5">
                {/* Left column — ML + DSML stacked */}
                <div className="flex flex-col gap-4 md:gap-5">
                    {leftTiles.map((tile, i) => (
                        <BentoTile key={tile.id} tile={tile} delay={0.1 + i * 0.1} />
                    ))}
                </div>

                {/* Right column — RC flagship */}
                <BentoTile tile={rightTile} delay={0.2} />
            </div>
        </section>
    )
}
