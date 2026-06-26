'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { m, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import Image from 'next/image'
import { GripVertical } from 'lucide-react'
import { getTheme } from '@/lib/design-system'

interface ImageComparisonSliderProps {
    beforeImage: string
    afterImage: string
    beforeAlt?: string
    afterAlt?: string
    beforeLabel?: string
    afterLabel?: string
    beforeTitle?: string // For browser bar, e.g. "legacy.exe"
    afterTitle?: string // For browser bar, e.g. "modern.tsx"
    aspectRatio?: string // e.g. "aspect-video" or "aspect-[16/10]"
    className?: string
}

export default function ImageComparisonSlider({
    beforeImage,
    afterImage,
    beforeAlt = 'Before',
    afterAlt = 'After',
    beforeLabel = 'LEGACY',
    afterLabel = 'MODERN',
    beforeTitle = 'legacy.exe',
    afterTitle = 'modern.tsx',
    aspectRatio = 'aspect-[16/10]',
    className = ''
}: ImageComparisonSliderProps) {
    const sliderPosition = useMotionValue(50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)

    // Derive styles from the motion value to avoid re-renders
    const clipPath = useTransform(sliderPosition, (pos) => `inset(0 ${100 - pos}% 0 0)`)
    const handleLeft = useTransform(sliderPosition, (pos) => `${pos}%`)

    const isInView = useInView(containerRef, { once: false, amount: 0.5 })
    const phase = useRef(0)

    const t = getTheme(false)

    // Sync phase when dragging ends to avoid jumps
    useEffect(() => {
        if (!isDragging && !isHovered) {
            const currentPos = sliderPosition.get()
            const val = (currentPos - 50) / 35
            const clamped = Math.max(-1, Math.min(1, val))
            phase.current = Math.asin(clamped)
        }
    }, [isDragging, isHovered, sliderPosition])

    // Animation: Perform one dramatic scan when hovered, then stop
    useEffect(() => {
        if (!isInView || !isHovered || hasInteracted || isDragging) return

        const controls = animate(sliderPosition, [50, 80, 20, 50], {
            duration: 3,
            ease: "easeInOut",
            onComplete: () => setHasInteracted(true)
        })

        return () => controls.stop()
    }, [isInView, isHovered, hasInteracted, isDragging, sliderPosition])

    const handleMove = useCallback((clientX: number) => {
        setHasInteracted(true)
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
        const percentage = (x / rect.width) * 100

        sliderPosition.set(percentage)
    }, [sliderPosition])

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!isDragging) return
            handleMove(e.clientX)
        },
        [isDragging, handleMove]
    )

    const handleTouchMove = useCallback(
        (e: React.TouchEvent) => {
            if (!isDragging) return
            handleMove(e.touches[0].clientX)
        },
        [isDragging, handleMove]
    )

    const handleStart = () => {
        setIsDragging(true)
        setHasInteracted(true)
    }
    const handleEnd = () => setIsDragging(false)

    return (
        <div
            ref={containerRef}
            className={`w-full ${aspectRatio} relative overflow-hidden rounded-xl border ${t.border} shadow-2xl select-none cursor-ew-resize ${className}`}
            onMouseMove={handleMouseMove}
            onMouseUp={handleEnd}
            onMouseLeave={() => {
                handleEnd()
                setIsHovered(false)
            }}
            onMouseEnter={() => setIsHovered(true)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleEnd}
            // Fallback style for aspect ratio if tailwind class fails
            style={{ aspectRatio: aspectRatio === 'aspect-video' ? '16/9' : '16/10' }}
        >
            {/* Browser Bar Header */}
            <div className={`absolute top-0 left-0 right-0 z-20 ${t.monitor.bg} ${t.monitor.textDim} text-xs font-mono py-space-3 px-space-4 flex justify-between items-center border-b ${t.monitor.border}`}>
                <div className="flex items-center gap-space-3">
                    <div className="flex gap-space-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                    </div>
                    <span className={`${t.monitor.textDim}`}>{beforeTitle}</span>
                </div>
                <div className="flex items-center gap-space-3">
                    <span className="text-zinc-600">{afterTitle}</span>
                    <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-teal)]"></span>
                    </div>
                </div>
            </div>

            {/* After Image (Base Layer - Modern) */}
            <div className="absolute inset-0 pt-11">
                <Image
                    src={afterImage}
                    alt={afterAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority
                />
            </div>

            {/* Before Image (Overlay - Legacy - Clipped) */}
            <m.div
                className="absolute inset-0 pt-11 overflow-hidden"
                style={{ clipPath }}
                variants={{}}
            >
                <Image
                    src={beforeImage}
                    alt={beforeAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority
                />
            </m.div>

            {/* Slider Handle */}
            <m.div
                className="absolute top-11 bottom-0 z-10 cursor-ew-resize"
                style={{ left: handleLeft, x: '-50%' }}
                variants={{}}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
                role="slider"
                aria-label="Compare before and after — drag to reveal"
                aria-orientation="horizontal"
            >
                {/* Vertical Line */}
                <div className="w-0.5 h-full bg-[var(--accent-teal)] shadow-lg shadow-[var(--accent-teal)]/50"></div>

                {/* Drag Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[var(--accent-teal)] rounded-full flex items-center justify-center shadow-xl shadow-[var(--accent-teal)]/30 border-2 border-white cursor-ew-resize hover:scale-110 transition-transform">
                    <GripVertical className="w-5 h-5 text-white" />
                </div>
            </m.div>

            {/* Labels on sides */}
            <div className="absolute bottom-space-4 left-space-4 z-20">
                <span className={`bg-white/90 backdrop-blur-sm ${t.textMuted} text-xs font-mono px-space-3 py-space-1.5 rounded-full border ${t.border} shadow-sm uppercase`}>
                    {beforeLabel}
                </span>
            </div>
            <div className="absolute bottom-space-4 right-space-4 z-20">
                <span className="bg-[var(--accent-teal)]/90 backdrop-blur-sm text-white text-xs font-mono px-space-3 py-space-1.5 rounded-full shadow-sm uppercase">
                    {afterLabel}
                </span>
            </div>
        </div>
    )
}
