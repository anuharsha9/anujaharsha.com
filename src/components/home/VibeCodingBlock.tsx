'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from 'framer-motion'
import { Play, Sparkles, Gamepad2 } from 'lucide-react'
import PortfolioLightbox from './PortfolioLightbox'

/* ─── Animated WordU wireframe cover (matches browser/graduation SVG style) ─── */
function WordULogoCover() {
    const letters = ['W', 'O', 'R', 'D', 'U']
    const accentColor = 'var(--semantic-orange)'
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* Subtle warm radial bg */}
            <div className="absolute inset-0" style={{
                background: 'radial-gradient(circle at 50% 50%, hsla(30,80%,50%,0.06), transparent 70%)',
            }} />

            <svg viewBox="0 0 280 180" className="w-[75%] h-auto" fill="none">
                {/* Game board outline */}
                <motion.rect
                    x="40" y="20" width="200" height="140" rx="8"
                    stroke={accentColor}
                    strokeWidth="0.8"
                    strokeDasharray="4 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                />

                {/* Row 1 — active guess row with letters */}
                {letters.map((letter, i) => (
                    <g key={`active-${i}`}>
                        <motion.rect
                            x={55 + i * 38} y="40" width="32" height="32" rx="4"
                            stroke={accentColor}
                            strokeWidth="0.8"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.5 }}
                            transition={{ duration: 0.8, delay: 0.8 + i * 0.15 }}
                        />
                        <motion.text
                            x={71 + i * 38} y="62" textAnchor="middle"
                            fill={accentColor}
                            className="font-mono text-[14px] font-bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0, 0.7] }}
                            transition={{ duration: 1, delay: 1.8 + i * 0.2, times: [0, 0.3, 1] }}
                        >
                            {letter}
                        </motion.text>
                    </g>
                ))}

                {/* Row 2 — empty guess row */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.rect
                        key={`row2-${i}`}
                        x={55 + i * 38} y="80" width="32" height="32" rx="4"
                        stroke={accentColor}
                        strokeWidth="0.4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        transition={{ delay: 2.2 + i * 0.08 }}
                    />
                ))}

                {/* Row 3 — empty guess row */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.rect
                        key={`row3-${i}`}
                        x={55 + i * 38} y="120" width="32" height="32" rx="4"
                        stroke={accentColor}
                        strokeWidth="0.3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.08 }}
                        transition={{ delay: 2.5 + i * 0.08 }}
                    />
                ))}

                {/* Cursor blink in first empty cell of row 2 */}
                <motion.rect
                    x="68" y="86" width="1.5" height="18" rx="0.5"
                    fill={accentColor}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 2.8 }}
                />
            </svg>
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
                    stroke="var(--semantic-purple)"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                />
                {/* Cap brim fill glow */}
                <motion.polygon
                    points="60,15 110,40 60,55 10,40"
                    fill="var(--semantic-purple)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.08, 0.04] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                />

                {/* Body of cap (left side) */}
                <motion.path
                    d="M 25,42 L 25,65 Q 25,78 60,80 Q 95,78 95,65 L 95,42"
                    stroke="var(--semantic-purple)"
                    strokeWidth="0.8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.35 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                />

                {/* Tassel string */}
                <motion.path
                    d="M 60,40 L 60,50 Q 65,58 80,60"
                    stroke="var(--semantic-purple)"
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
                    fill="var(--semantic-purple)"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    transition={{ delay: 2, type: 'spring', stiffness: 200 }}
                />
                {/* Gentle sway of tassel */}
                <motion.circle
                    cx="80" cy="60" r="3"
                    fill="var(--semantic-purple)"
                    animate={{ cx: [80, 85, 78, 80] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
                    opacity={0.4}
                />

                {/* Floating sparkle dots */}
                {[[30, 25], [90, 20], [45, 85], [85, 75]].map(([cx, cy], i) => (
                    <motion.circle
                        key={i}
                        cx={cx} cy={cy} r="1"
                        fill="var(--semantic-purple)"
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
        accentRgbVar: '--accent-teal-rgb',
        dotHue: 180,
        action: 'portfolio' as const,
    },
    {
        id: 'wordu',
        title: 'WordU',
        subtitle: 'A word game created with agentic AI',
        icon: Gamepad2,
        cover: 'wordu' as const,
        accent: 'var(--semantic-orange)',
        accentRgbVar: '--semantic-orange-rgb',
        dotHue: 30,
        action: 'wordu' as const,
    },
    // College OS tile — hidden until deployed
    // {
    //     id: 'college-os',
    //     title: 'College OS',
    //     subtitle: 'AI-powered college app tracker · Next.js + Gemini',
    //     icon: GraduationCap,
    //     cover: 'graduation' as const,
    //     accent: 'var(--semantic-purple)',
    //     accentRgbVar: '--semantic-purple-rgb',
    //     dotHue: 270,
    //     action: 'college-os' as const,
    // },
]

export default function VibeCodingBlock() {
    const ref = useRef<HTMLDivElement>(null)
    const [portfolioOpen, setPortfolioOpen] = useState(false)
    const [worduOpen, setWorduOpen] = useState(false)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const headingY = useTransform(scrollYProgress, [0, 0.3], [80, 0])
    const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
    const headingScale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1])

    // Blur-to-focus entrance: consistent crossfade theme
    const rawSectionBlur = useTransform(scrollYProgress, [0, 0.12], [12, 0])
    const sectionBlur = useSpring(rawSectionBlur, { stiffness: 100, damping: 20, mass: 0.5 })
    const sectionFilter = useMotionTemplate`blur(${sectionBlur}px)`

    const collegeOsUrl = process.env.NEXT_PUBLIC_COLLEGE_OS_URL || 'http://localhost:3005'

    const handleTileClick = (action: string) => {
        if (action === 'portfolio') setPortfolioOpen(true)
        if (action === 'wordu') setWorduOpen(true)
        if (action === 'college-os') window.open(collegeOsUrl, '_blank', 'noopener,noreferrer')
    }

    return (
        <>
            <motion.section ref={ref} className="relative pt-10 pb-20 md:pt-16 md:pb-32 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-hidden" style={{ filter: sectionFilter }}>
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
                        NOV / 2025
                    </span>
                </motion.div>

                {/* Header */}
                <motion.div
                    className="mb-12 md:mb-16"
                    style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
                >
                    <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-zinc-500 mb-3">
                        Nov 2025 — Present
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                        Vibe Coding
                        <span className="text-zinc-600 font-normal"> & Code Prototyping</span>
                    </h2>
                </motion.div>

                {/* 3 tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {VIBE_TILES.map((tile, i) => {
                        const Icon = tile.icon
                        const isShell = false  // all tiles are now live
                        const rgb = `var(${tile.accentRgbVar})`

                        return (
                            <motion.div
                                key={tile.id}
                                initial={{ opacity: 0, y: 70, scale: 0.9, filter: 'blur(8px)' }}
                                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <button
                                    onClick={() => handleTileClick(tile.action)}
                                    disabled={isShell}
                                    className={`group relative w-full aspect-[4/3] overflow-hidden rounded-2xl text-left transition-all duration-500
                                        ${isShell ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                                    style={{
                                        border: `1px solid rgba(${rgb}, 0.18)`,
                                        backgroundColor: `rgba(${rgb}, 0.05)`,
                                        boxShadow: `0 0 0px transparent, inset 0 0 0 1px rgba(${rgb}, 0.08)`,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = `0 0 40px rgba(${rgb}, 0.12), inset 0 0 0 1px rgba(${rgb}, 0.25)`
                                        e.currentTarget.style.borderColor = `rgba(${rgb}, 0.3)`
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = `0 0 0px transparent, inset 0 0 0 1px rgba(${rgb}, 0.08)`
                                        e.currentTarget.style.borderColor = `rgba(${rgb}, 0.18)`
                                    }}
                                >
                                    {/* Dot pattern overlay — AI neural net feel */}
                                    <div
                                        className="absolute inset-0 pointer-events-none z-[1]"
                                        style={{
                                            backgroundImage: `radial-gradient(circle, hsl(${tile.dotHue}, 50%, 25%) 0.8px, transparent 0.8px)`,
                                            backgroundSize: '24px 24px',
                                            opacity: 0.10,
                                        }}
                                    />

                                    {/* Cover: animated SVG — blurs on desktop hover */}
                                    <div className="absolute inset-0 transition-all duration-500 md:group-hover:blur-[8px] md:group-hover:scale-105">
                                        {tile.cover === 'browser' && <BrowserWireframeCover />}
                                        {tile.cover === 'wordu' && <WordULogoCover />}
                                    </div>

                                    {/* Desktop hover overlay — hidden on mobile */}
                                    <div className="absolute inset-0 z-20 hidden md:flex items-center justify-center bg-black/0 group-hover:bg-black/55 transition-all duration-500 opacity-0 group-hover:opacity-100">
                                        <div className="flex flex-col items-center gap-3 max-w-xs text-center px-4">
                                            <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                                {tile.action === 'wordu' ? (
                                                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                                                ) : (
                                                    <Icon className="w-5 h-5 text-white" />
                                                )}
                                            </div>
                                            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-zinc-400">
                                                {tile.action === 'wordu' ? 'Play Game' : 'Explore'}
                                            </span>
                                            <p className="text-zinc-100 text-base font-semibold leading-snug mt-1">
                                                {tile.title}
                                            </p>
                                            <p className="text-zinc-500 text-xs font-mono">
                                                {tile.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom label bar — mobile only (desktop uses hover overlay) */}
                                    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent md:hidden transition-opacity duration-300">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                                style={{ backgroundColor: `rgba(${rgb}, 0.2)` }}>
                                                <Icon className="w-4 h-4 text-zinc-200" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-zinc-100 text-sm font-semibold leading-tight truncate">{tile.title}</p>
                                                <p className="text-zinc-500 text-[11px] font-mono truncate">{tile.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.section>

            {/* Lightboxes */}
            <PortfolioLightbox isOpen={portfolioOpen} onClose={() => setPortfolioOpen(false)} />
            <WordGameLightbox isOpen={worduOpen} onClose={() => setWorduOpen(false)} />
        </>
    )
}
