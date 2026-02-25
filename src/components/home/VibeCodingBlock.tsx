'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, Sparkles, Gamepad2, GraduationCap } from 'lucide-react'
import PortfolioLightbox from './PortfolioLightbox'
import WordGameLightbox from '@/components/work/wordu/WordGameLightbox'

const VIBE_TILES = [
    {
        id: 'portfolio',
        title: 'This Portfolio',
        subtitle: '5 iterations · 6 AI agents · 1 architect',
        icon: Sparkles,
        image: '/images/wordu-cover.png', // Placeholder — will be the portfolio screenshot
        accent: 'var(--accent-teal)',
        action: 'portfolio' as const,
    },
    {
        id: 'wordu',
        title: 'WordU',
        subtitle: 'A word game created with agentic AI',
        icon: Gamepad2,
        image: '/images/wordu-cover.png',
        accent: 'var(--semantic-orange-vivid)',
        action: 'wordu' as const,
    },
    {
        id: 'college-os',
        title: 'College OS',
        subtitle: 'Coming soon',
        icon: GraduationCap,
        image: '/images/wordu-cover.png', // Placeholder
        accent: 'var(--semantic-purple-vivid)',
        action: 'college-os' as const,
    },
]

export default function VibeCodingBlock() {
    const ref = useRef<HTMLDivElement>(null)
    const [portfolioOpen, setPortfolioOpen] = useState(false)
    const [worduOpen, setWorduOpen] = useState(false)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0])
    const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])

    const handleTileClick = (action: string) => {
        if (action === 'portfolio') setPortfolioOpen(true)
        if (action === 'wordu') setWorduOpen(true)
        // college-os is a shell for now
    }

    return (
        <>
            <section ref={ref} className="relative py-20 md:py-32 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-12 md:mb-16"
                    style={{ y: headingY, opacity: headingOpacity }}
                >
                    <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/30 mb-3">
                        Nov 2025 — Present
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                        Vibe Coding
                        <span className="text-white/40 font-normal"> & Code Prototyping</span>
                    </h2>
                </motion.div>

                {/* 3 tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {VIBE_TILES.map((tile, i) => {
                        const Icon = tile.icon
                        const isShell = tile.action === 'college-os'

                        return (
                            <motion.div
                                key={tile.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <button
                                    onClick={() => handleTileClick(tile.action)}
                                    disabled={isShell}
                                    className={`group relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-white/[0.03] text-left transition-all duration-500
                                        ${isShell
                                            ? 'opacity-60 cursor-not-allowed'
                                            : 'cursor-pointer hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(47,198,213,0.08)]'
                                        }`}
                                >
                                    {/* Background image */}
                                    <Image
                                        src={tile.image}
                                        alt={tile.title}
                                        fill
                                        className="object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                                    />

                                    {/* Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

                                    {/* Play / Icon indicator */}
                                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                                        <div className={`w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500
                                            ${isShell ? '' : 'group-hover:scale-110 group-hover:bg-white/20'}`}>
                                            {isShell ? (
                                                <Icon className="w-5 h-5 text-white/40" />
                                            ) : tile.action === 'wordu' ? (
                                                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                                            ) : (
                                                <Icon className="w-5 h-5 text-white" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                                        <p className="text-white/90 text-base md:text-lg font-semibold mb-1">
                                            {tile.title}
                                        </p>
                                        <p className="text-white/30 text-xs font-mono">
                                            {tile.subtitle}
                                        </p>
                                    </div>

                                    {/* Accent glow on hover */}
                                    {!isShell && (
                                        <div
                                            className="absolute inset-0 z-[5] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                            style={{
                                                background: `radial-gradient(ellipse at 50% 80%, ${tile.accent}15, transparent 70%)`,
                                            }}
                                        />
                                    )}
                                </button>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* Lightboxes */}
            <PortfolioLightbox isOpen={portfolioOpen} onClose={() => setPortfolioOpen(false)} />
            <WordGameLightbox isOpen={worduOpen} onClose={() => setWorduOpen(false)} />
        </>
    )
}
