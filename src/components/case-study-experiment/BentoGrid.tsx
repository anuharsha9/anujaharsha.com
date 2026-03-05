'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ImageLightbox from '@/components/case-study/ImageLightbox'

/* ─── Lightbox Context ─── */
interface LightboxState {
    open: (images: { src: string; alt: string; caption?: string }[], index: number) => void
}

const LightboxContext = React.createContext<LightboxState | null>(null)

function useLightbox() {
    return React.useContext(LightboxContext)
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [images, setImages] = React.useState<{ src: string; alt: string; caption?: string }[]>([])
    const [currentIndex, setCurrentIndex] = React.useState(0)

    const open = React.useCallback((imgs: { src: string; alt: string; caption?: string }[], index: number) => {
        setImages(imgs)
        setCurrentIndex(index)
        setIsOpen(true)
    }, [])

    return (
        <LightboxContext.Provider value={{ open }}>
            {children}
            <ImageLightbox
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                images={images}
                currentIndex={currentIndex}
                imageSrc={images[currentIndex]?.src || ''}
                imageAlt={images[currentIndex]?.alt || ''}
                imageCaption={images[currentIndex]?.caption}
                onNavigate={setCurrentIndex}
                autoPlayInterval={0}
            />
        </LightboxContext.Provider>
    )
}

/* ─── Row Layout Types ─── */
type RowLayout = 'full' | '50/50' | '30/70' | '70/30' | '33/33/33' | '25/25/25/25'

const GRID_TEMPLATES: Record<RowLayout, string> = {
    'full': 'grid-cols-1',
    '50/50': 'grid-cols-1 md:grid-cols-2',
    '30/70': 'grid-cols-1 md:grid-cols-[30%_1fr]',
    '70/30': 'grid-cols-1 md:grid-cols-[1fr_30%]',
    '33/33/33': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    '25/25/25/25': 'grid-cols-2 md:grid-cols-4',
}

/* ─── BentoGrid ─── */
export function BentoGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`space-y-4 md:space-y-6 ${className}`}>
            {children}
        </div>
    )
}

/* ─── BentoRow ─── */
export function BentoRow({
    layout = 'full',
    children,
    className = '',
}: {
    layout?: RowLayout
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={`grid ${GRID_TEMPLATES[layout]} gap-4 md:gap-6 ${className}`}>
            {children}
        </div>
    )
}

/* ─── Image Tile ─── */
export function ImageTile({
    src,
    alt,
    caption,
    delay = 0,
    className = '',
    aspectRatio,
}: {
    src: string
    alt: string
    caption?: string
    delay?: number
    className?: string
    aspectRatio?: string
}) {
    const lightbox = useLightbox()

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative overflow-hidden rounded-xl cursor-pointer ${className}`}
            style={aspectRatio ? { aspectRatio } : undefined}
            onClick={() => lightbox?.open([{ src, alt, caption }], 0)}
        >
            <Image
                src={src}
                alt={alt}
                width={1920}
                height={1080}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
                className="w-full h-auto object-contain"
            />
            {/* View Focus hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
                    View Focus
                </span>
            </div>
            {caption && (
                <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                        <p className="text-[12px] text-zinc-100 font-light leading-snug">{caption}</p>
                    </div>
                </div>
            )}
        </motion.div>
    )
}

/* ─── Text Tile ─── */
export function TextTile({
    children,
    delay = 0,
    accent,
    className = '',
}: {
    children: React.ReactNode
    delay?: number
    accent?: 'teal' | 'red'
    className?: string
}) {
    const borderStyle = accent === 'teal'
        ? 'border-l-2 border-[var(--accent-teal)]/30 pl-6'
        : accent === 'red'
            ? 'border-l-2 border-red-400/30 pl-6'
            : ''

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={`flex flex-col justify-center ${borderStyle} ${className}`}
        >
            {children}
        </motion.div>
    )
}

/* ─── Stat Tile ─── */
export function StatTile({
    value,
    label,
    icon,
    delay = 0,
}: {
    value: string
    label: string
    icon?: React.ReactNode
    delay?: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center py-4"
        >
            {icon && <div className="mb-3 text-zinc-500">{icon}</div>}
            <p className="text-3xl md:text-4xl font-bold text-[var(--accent-teal)]">{value}</p>
            <p className="text-sm text-zinc-500 font-light mt-2">{label}</p>
        </motion.div>
    )
}

/* ─── Pull Quote (outside bento) ─── */
export function PullQuote({
    children,
    className = '',
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full relative py-28 md:py-48 flex flex-col items-center justify-center overflow-hidden bg-black/40 ${className}`}
        >
            {/* Background glowing orb to give it a cinematic back-light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[400px] max-w-3xl bg-[var(--accent-teal)]/5 blur-[120px] rounded-[100%] pointer-events-none" />

            {/* Top architectural border line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            <div className="w-full max-w-[1440px] px-6 md:px-16 mx-auto relative z-10 flex flex-col items-center text-center">

                {/* Eyebrow / Label */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col items-center mb-10 md:mb-16"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[var(--accent-teal)]/50 mb-6" />
                    <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-[var(--accent-teal)] font-bold">The Turning Point</span>
                </motion.div>

                {/* Massive bold typographic story */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative max-w-4xl"
                >
                    <div className="absolute -top-12 -left-8 md:-top-16 md:-left-16 text-[100px] md:text-[160px] leading-none font-serif text-[var(--accent-teal)]/10 select-none pointer-events-none drop-shadow-[0_0_30px_rgba(45,212,191,0.2)]">&ldquo;</div>

                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold leading-[1.2] md:leading-[1.15] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500 z-10 relative" style={{ textWrap: 'balance' }}>
                        {children}
                    </div>

                    <div className="absolute -bottom-16 -right-8 md:-bottom-24 md:-right-16 text-[100px] md:text-[160px] leading-none font-serif text-[var(--accent-teal)]/10 select-none pointer-events-none drop-shadow-[0_0_30px_rgba(45,212,191,0.2)]">&rdquo;</div>
                </motion.div>

                {/* Bottom accent indicating continuation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
                    className="mt-20 md:mt-32 w-2 h-2 rounded-full bg-[var(--accent-teal)]/60 shadow-[0_0_15px_rgba(45,212,191,0.8)]"
                />
            </div>

            {/* Bottom architectural border line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
        </motion.div>
    )
}

/* ─── Eyebrow Label ─── */
export function EyebrowLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">{children}</p>
    )
}

/* ─── Carousel Tile ─── */
export function CarouselTile({
    images,
    delay = 0,
    autoPlay = false,
    interval = 3000,
}: {
    images: { src: string; alt: string; caption?: string }[]
    delay?: number
    autoPlay?: boolean
    interval?: number
}) {
    const [current, setCurrent] = React.useState(0)
    const lightbox = useLightbox()

    React.useEffect(() => {
        if (!autoPlay || images.length <= 1) return;
        const timer = setInterval(() => setCurrent((prev) => (prev + 1) % images.length), interval);
        return () => clearInterval(timer);
    }, [autoPlay, images.length, interval]);

    if (!images || images.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-xl group"
        >
            {/* Image */}
            <div
                className="relative cursor-pointer"
                onClick={() => lightbox?.open(images, current)}
            >
                <Image
                    src={images[current].src}
                    alt={images[current].alt}
                    width={1920}
                    height={1080}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
                    className="w-full h-auto object-contain transition-opacity duration-500"
                />
                {/* View Focus hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
                        View Focus
                    </span>
                </div>
                {images[current].caption && (
                    <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                            <p className="text-[12px] text-zinc-100 font-light">{images[current].caption}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            {images.length > 1 && (
                <>
                    {/* Arrows */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setCurrent((current - 1 + images.length) % images.length); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Previous"
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2.5L4 6l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setCurrent((current + 1) % images.length); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Next"
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-3' : 'bg-white/30'}`}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </motion.div>
    )
}
