'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'

// You might need to import your actual paths here depending on setup.
// Using standard ones from your previous implementation.
const TILES = [
    {
        id: 'iq-plugin',
        title: 'IQ Web Plugin & Conversational BI',
        category: 'DATA SCIENCE',
        type: 'WEB COMPONENT',
        year: '2024',
        href: '/experiment/case-study/iq-plugin',
        description: 'Led the UI/UX for a conversational BI interface to simplify data workflows.',
        color: 'from-[var(--accent-teal)] to-blue-600',
        flagship: false,
        videoSrc: '/videos/iq-overview.mp4',
        fallbackImg: '/images/case-study/IQ/V1 Chat.png',
        darkOverlay: true
    },
    {
        id: 'ml-functions',
        title: 'Machine Learning Workflows',
        category: 'MACHINE LEARNING',
        type: 'SAAS UI',
        year: '2023',
        href: '/experiment/case-study/ml-functions',
        description: 'Designed an elegant interface for no-code machine learning model creation.',
        color: 'from-purple-500 to-indigo-600',
        flagship: false,
        videoSrc: '/videos/ml-overview.mp4',
        fallbackImg: '/images/case-study/ML Functions/ML V1 Mapping.png',
        darkOverlay: true
    },
    {
        id: 'reportcaster',
        title: 'ReportCaster Modernization',
        category: 'PLATFORM DESIGN',
        type: 'ENTERPRISE SAAS',
        year: '2024-25',
        href: '/experiment/case-study/reportcaster',
        description: 'Redesigned a legacy 15-year old scheduling engine into a modern unified hub.',
        color: 'from-orange-500 to-red-600',
        flagship: true,
        videoSrc: '/videos/rc-overview.mp4',
        fallbackImg: '/images/case-study/ReportCaster/ReportCaster Cover.png',
        darkOverlay: false
    }
]

/* ─── Bento Tile Component ─── */
function BentoTile({ tile, delay }: { tile: typeof TILES[0]; delay: number }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Simplified fallback using standard React properties rather than trying to handle video directly here
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-[#111] ${
                tile.flagship ? 'min-h-[400px] md:min-h-[600px] h-full' : 'min-h-[280px] md:min-h-[320px]'
            }`}
            onMouseEnter={() => {
                setIsHovered(true)
                if (videoRef.current) {
                    videoRef.current.play().catch(e => console.log('Video play prevented:', e))
                }
            }}
            onMouseLeave={() => {
                setIsHovered(false)
                if (videoRef.current) {
                    videoRef.current.pause()
                }
            }}
        >
            <Link href={tile.href} className="absolute inset-0 z-30">
                <span className="sr-only">View {tile.title} case study</span>
            </Link>

            <div className={`absolute inset-0 bg-gradient-to-br ${tile.color} opacity-0 group-hover:opacity-10 transition-opacity duration-1000 z-10`} />

            {/* Content Layering based on Flagship vs Standard */}
            {tile.flagship ? (
                /* FLAGSHIP LAYOUT (ReportCaster) */
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-20">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0" />
                    
                    {/* Media Layer */}
                    <Image
                        src={tile.fallbackImg}
                        alt={tile.title}
                        fill
                        className={`object-cover object-top transition-transform duration-1000 ${isHovered ? 'scale-105' : 'scale-100'}`}
                        priority
                    />
                    
                    <div className="relative z-10 max-w-xl">
                        <div className="flex gap-2 mb-4">
                            <span className="text-[10px] md:text-xs font-mono tracking-widest bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white/90 border border-white/10 uppercase">
                                {tile.year}
                            </span>
                            <span className="text-[10px] md:text-xs font-mono tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white/70 border border-white/5 uppercase">
                                {tile.type}
                            </span>
                        </div>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4 drop-shadow-lg">
                            {tile.title}
                        </h3>
                        <p className="text-zinc-300 text-sm md:text-base lg:text-lg max-w-lg leading-relaxed font-light">
                            {tile.description}
                        </p>
                        
                        {/* CTA */}
                        <div className="mt-8 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-xl">
                                <Play className="w-5 h-5 ml-1 fill-black" />
                            </div>
                            <span className="text-white font-medium uppercase tracking-widest text-xs">
                                Watch Cinematic Mode <span className="opacity-50 ml-2">2 min</span>
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                /* STACKED LAYOUT (ML / IQ) */
                <div className="absolute inset-0 p-5 md:p-6 z-20 flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />
                    
                    {/* Media Layer */}
                    <Image
                        src={tile.fallbackImg}
                        alt={tile.title}
                        fill
                        className={`object-cover transition-transform duration-1000 ${isHovered ? 'scale-105' : 'scale-100'}`}
                    />

                    {tile.darkOverlay && (
                        <div className="absolute inset-0 bg-black/40 z-0" />
                    )}

                    {/* Top Meta */}
                    <div className="relative z-10 flex justify-end">
                         <span className="text-[10px] md:text-xs font-mono tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white/80 border border-white/10 uppercase">
                            {tile.year}
                        </span>
                    </div>

                    {/* Bottom Content */}
                    <div className="relative z-10 mt-auto">
                        <span className="block text-[10px] text-white/60 font-mono tracking-[0.2em] mb-2 font-bold group-hover:text-white transition-colors duration-300 uppercase">
                            {tile.category}
                        </span>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md overflow-hidden transition-all duration-300 ${isHovered ? 'bg-[var(--accent-teal)] border-[var(--accent-teal)]' : 'bg-black/40'}`}>
                                <Play className={`w-4 h-4 ml-0.5 transition-colors duration-300 ${isHovered ? 'text-black fill-black' : 'text-white fill-white'}`} />
                            </div>
                            <p className="text-white font-semibold leading-tight text-lg max-w-[200px] drop-shadow-md">
                                {tile.title}
                            </p>
                        </div>
                    </div>
                </div>
            )}
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
