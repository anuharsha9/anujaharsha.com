'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, Sparkles, Gamepad2, GraduationCap } from 'lucide-react'
import PortfolioLightbox from './PortfolioLightbox'

/* ─── Animated WordU letter tiles cover ─── */
function WordULogoCover() {
    const letters = ['W', 'O', 'R', 'D', 'U']
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Subtle warm radial bg */}
            <div className="absolute inset-0" style={{
                background: 'radial-gradient(circle at 50% 50%, hsla(30,80%,50%,0.06), transparent 70%)',
            }} />

            <div className="flex gap-2">
                {letters.map((letter, i) => (
                    <motion.div
                        key={letter + i}
                        className="w-11 h-11 bg-[var(--accent-wordu,#4F7CFF)] rounded-lg flex items-center justify-center text-white text-xl font-black shadow-lg"
                        initial={{ y: 40, opacity: 0, rotateX: -90 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        transition={{
                            delay: 0.3 + i * 0.12,
                            type: 'spring',
                            stiffness: 300,
                            damping: 15,
                        }}
                    >
                        <motion.span
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: 'easeInOut',
                            }}
                        >
                            {letter}
                        </motion.span>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
import WordGameLightbox from '@/components/work/wordu/WordGameLightbox'

/* ─── Animated browser wireframe (Portfolio tile cover) ─── */
function BrowserWireframeCover() {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Subtle grid bg */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: 'linear-gradient(hsla(180,60%,50%,0.3) 1px, transparent 1px), linear-gradient(90deg, hsla(180,60%,50%,0.3) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
            }} />

            <svg viewBox="0 0 320 200" className="w-[75%] h-auto" fill="none">
                {/* Browser chrome outline */}
                <motion.rect
                    x="10" y="10" width="300" height="180" rx="8"
                    stroke="var(--accent-teal)"
                    strokeWidth="0.8"
                    strokeDasharray="4 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                />
                {/* Title bar */}
                <motion.line
                    x1="10" y1="35" x2="310" y2="35"
                    stroke="var(--accent-teal)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    opacity={0.25}
                />
                {/* Traffic lights */}
                <motion.circle cx="25" cy="22" r="3" fill="var(--accent-teal)"
                    initial={{ opacity: 0 }} animate={{ opacity: [0, 0.4, 0.4] }}
                    transition={{ duration: 0.5, delay: 0.8 }} />
                <motion.circle cx="35" cy="22" r="3" fill="var(--accent-teal)"
                    initial={{ opacity: 0 }} animate={{ opacity: [0, 0.3, 0.3] }}
                    transition={{ duration: 0.5, delay: 1 }} />
                <motion.circle cx="45" cy="22" r="3" fill="var(--accent-teal)"
                    initial={{ opacity: 0 }} animate={{ opacity: [0, 0.2, 0.2] }}
                    transition={{ duration: 0.5, delay: 1.2 }} />
                {/* URL bar */}
                <motion.rect x="60" y="17" width="180" height="10" rx="5"
                    stroke="var(--accent-teal)" strokeWidth="0.4"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.15 }}
                    transition={{ delay: 1 }} />

                {/* Sidebar wireframe */}
                <motion.rect x="20" y="45" width="60" height="135" rx="4"
                    stroke="var(--accent-teal)" strokeWidth="0.4"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.12 }}
                    transition={{ delay: 1.5 }} />
                {/* Sidebar lines */}
                {[55, 70, 85, 100, 115].map((cy, i) => (
                    <motion.line key={cy} x1="28" y1={cy} x2="68" y2={cy}
                        stroke="var(--accent-teal)" strokeWidth="0.4"
                        initial={{ opacity: 0 }} animate={{ opacity: 0.1 }}
                        transition={{ delay: 1.8 + i * 0.1 }} />
                ))}

                {/* Main content area */}
                <motion.rect x="90" y="45" width="210" height="50" rx="4"
                    stroke="var(--accent-teal)" strokeWidth="0.4"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.12 }}
                    transition={{ delay: 1.6 }} />
                {/* Content card rows */}
                {[105, 125, 145].map((cy, i) => (
                    <motion.rect key={cy} x="90" y={cy} width="210" height="18" rx="3"
                        stroke="var(--accent-teal)" strokeWidth="0.3"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 0.08, x: 0 }}
                        transition={{ delay: 2 + i * 0.15, duration: 0.5 }} />
                ))}

                {/* "Hi, I'm Anuja" text — types in */}
                <motion.text
                    x="160" y="75" textAnchor="middle"
                    fill="var(--accent-teal)"
                    className="font-sans text-[14px] font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 0.7] }}
                    transition={{ duration: 1.5, delay: 2.5, times: [0, 0.3, 1] }}
                >
                    Hi, I&apos;m Anuja
                </motion.text>

                {/* Cursor blink */}
                <motion.rect
                    x="205" y="65" width="1.5" height="14" rx="0.5"
                    fill="var(--accent-teal)"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 2.5 }}
                />
            </svg>
        </div>
    )
}

/* ─── Animated graduation cap (College OS tile cover) ─── */
function GraduationCapCover() {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Radial accent */}
            <div className="absolute inset-0" style={{
                background: 'radial-gradient(circle at 50% 50%, hsla(270,50%,40%,0.08), transparent 70%)',
            }} />

            <svg viewBox="0 0 120 100" className="w-[40%] h-auto" fill="none">
                {/* Cap top (diamond) */}
                <motion.polygon
                    points="60,15 110,40 60,55 10,40"
                    stroke="var(--semantic-purple-vivid)"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                />
                {/* Cap brim fill glow */}
                <motion.polygon
                    points="60,15 110,40 60,55 10,40"
                    fill="var(--semantic-purple-vivid)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.08, 0.04] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                />

                {/* Body of cap (left side) */}
                <motion.path
                    d="M 25,42 L 25,65 Q 25,78 60,80 Q 95,78 95,65 L 95,42"
                    stroke="var(--semantic-purple-vivid)"
                    strokeWidth="0.8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.35 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                />

                {/* Tassel string */}
                <motion.path
                    d="M 60,40 L 60,50 Q 65,58 80,60"
                    stroke="var(--semantic-purple-vivid)"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    opacity={0.4}
                />
                {/* Tassel bob */}
                <motion.circle
                    cx="80" cy="60" r="3"
                    fill="var(--semantic-purple-vivid)"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    transition={{ delay: 2, type: 'spring', stiffness: 200 }}
                />
                {/* Gentle sway of tassel */}
                <motion.circle
                    cx="80" cy="60" r="3"
                    fill="var(--semantic-purple-vivid)"
                    animate={{ cx: [80, 85, 78, 80] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
                    opacity={0.4}
                />

                {/* Floating sparkle dots */}
                {[[30, 25], [90, 20], [45, 85], [85, 75]].map(([cx, cy], i) => (
                    <motion.circle
                        key={i}
                        cx={cx} cy={cy} r="1"
                        fill="var(--semantic-purple-vivid)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1.5, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                    />
                ))}
            </svg>
        </div>
    )
}

const VIBE_TILES = [
    {
        id: 'portfolio',
        title: 'This Portfolio',
        subtitle: '5 iterations · 6 AI agents · 1 architect',
        icon: Sparkles,
        cover: 'browser' as const,
        accent: 'var(--accent-teal)',
        action: 'portfolio' as const,
    },
    {
        id: 'wordu',
        title: 'WordU',
        subtitle: 'A word game created with agentic AI',
        icon: Gamepad2,
        cover: 'wordu' as const,
        accent: 'var(--semantic-orange-vivid)',
        action: 'wordu' as const,
    },
    {
        id: 'college-os',
        title: 'College OS',
        subtitle: 'Coming soon',
        icon: GraduationCap,
        cover: 'graduation' as const,
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
                                    className={`group relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-black/60 text-left transition-all duration-500
                                        ${isShell
                                            ? 'opacity-60 cursor-not-allowed'
                                            : 'cursor-pointer hover:shadow-[0_0_40px_rgba(47,198,213,0.08)]'
                                        }`}
                                >
                                    {/* Cover: animated SVG */}
                                    {tile.cover === 'browser' && <BrowserWireframeCover />}
                                    {tile.cover === 'graduation' && <GraduationCapCover />}
                                    {tile.cover === 'wordu' && <WordULogoCover />}

                                    {/* Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                                    {/* Play / Icon indicator */}
                                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                                        <div className={`w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-500
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
