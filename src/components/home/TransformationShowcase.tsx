'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import Image from 'next/image'
import { GripVertical, Play } from 'lucide-react'
import Link from 'next/link'
import { getTheme, spacing } from '@/lib/design-system'

/**
 * TransformationShowcase - A dramatic before/after slider for the landing page
 * Shows the most impactful transformation: 50-year legacy to modern UI
 */
export default function TransformationShowcase() {
  const sliderPosition = useMotionValue(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Derive styles from the motion value to avoid re-renders
  const clipPath = useTransform(sliderPosition, (pos) => `inset(0 ${100 - pos}% 0 0)`)
  const handleLeft = useTransform(sliderPosition, (pos) => `${pos}%`)

  // Use a separate ref for intersection to avoid conflict if containerRef usage is complex, 
  // but here containerRef is just a div, so we can use it.
  const isInView = useInView(containerRef, { once: false, amount: 0.5 })
  const phase = useRef(0)

  // Sync phase when dragging ends to avoid jumps
  useEffect(() => {
    if (!isDragging && !isHovered) {
      // Calculate phase from current position to resume smoothly
      // pos = 50 + 35 * sin(phase)
      // (pos - 50) / 35 = sin(phase)
      const currentPos = sliderPosition.get()
      const val = (currentPos - 50) / 35
      // Clamp to avoid NaN
      const clamped = Math.max(-1, Math.min(1, val))
      phase.current = Math.asin(clamped)
    }
  }, [isDragging, isHovered, sliderPosition])

  // Animation: Perform one dramatic scan when hovered, then stop
  useEffect(() => {
    // Only animate if hovered, in view, and hasn't been interacted with yet
    if (!isInView || !isHovered || hasInteracted || isDragging) return

    // Animate from center (50) to right (80) then left (20) then back to center (50)
    // using keyframes for a comprehensive scan
    const controls = animate(sliderPosition, [50, 80, 20, 50], {
      duration: 3,
      ease: "easeInOut",
      onComplete: () => setHasInteracted(true) // Stop future auto-animations
    })

    return () => controls.stop()
  }, [isInView, isHovered, hasInteracted, isDragging, sliderPosition])

  const handleMove = useCallback((clientX: number) => {
    setHasInteracted(true) // User is manually controlling it
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100

    // Update MotionValue directly - no re-render!
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

  const t = getTheme(false)

  return (
    <section className="py-section-mobile md:py-section-tablet lg:py-section-desktop relative overflow-hidden">
      <div className={`${spacing.containerFull} relative z-10`}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-space-10 md:mb-space-14"
        >
          <h2 className={`font-serif ${t.text} text-3xl md:text-4xl lg:text-5xl leading-tight mb-space-4`}>
            50 years of legacy.<br />
            <span className="text-[var(--accent-teal)]">Modern in 18 months.</span>
          </h2>
          <p className={`${t.textSecondary} text-base md:text-lg max-w-2xl mx-auto`}>
            I led the modernization of WebFOCUS&apos;s core workflows—unifying fragmented legacy tools into coherent, intelligent experiences.
          </p>
        </motion.div>

        {/* The Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            ref={containerRef}
            className={`w-full aspect-[16/10] max-h-[720px] relative overflow-hidden rounded-xl border ${t.border} shadow-2xl select-none cursor-ew-resize`}
            onMouseMove={handleMouseMove}
            onMouseUp={handleEnd}
            onMouseLeave={() => {
              handleEnd()
              setIsHovered(false)
            }}
            onMouseEnter={() => setIsHovered(true)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleEnd}
          >
            {/* Browser Bar Header */}
            <div className={`absolute top-0 left-0 right-0 z-20 ${t.monitor.bg} ${t.monitor.textDim} text-xs font-mono py-space-3 px-space-4 flex justify-between items-center border-b ${t.monitor.border}`}>
              <div className="flex items-center gap-space-3">
                <div className="flex gap-space-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <span className={`${t.monitor.textDim}`}>reportcaster_legacy.exe</span>
              </div>
              <div className="flex items-center gap-space-3">
                <span className="text-slate-600">reportcaster_modern.tsx</span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-teal)]"></span>
                </div>
              </div>
            </div>

            {/* After Image (Base Layer - Modern) */}
            <div className="absolute inset-0 pt-11">
              <Image
                src="/images/case-study/ReportCaster/After.png"
                alt="Modern ReportCaster interface"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Before Image (Overlay - Legacy - Clipped) */}
            <motion.div
              className="absolute inset-0 pt-11 overflow-hidden"
              style={{ clipPath }}
            >
              <Image
                src="/images/case-study/ReportCaster/Before.png"
                alt="Legacy ReportCaster interface"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </motion.div>

            {/* Slider Handle */}
            <motion.div
              className="absolute top-11 bottom-0 z-10 cursor-ew-resize"
              style={{ left: handleLeft, x: '-50%' }}
              onMouseDown={handleStart}
              onTouchStart={handleStart}
            >
              {/* Vertical Line */}
              <div className="w-0.5 h-full bg-[var(--accent-teal)] shadow-lg shadow-[var(--accent-teal)]/50"></div>

              {/* Drag Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[var(--accent-teal)] rounded-full flex items-center justify-center shadow-xl shadow-[var(--accent-teal)]/30 border-2 border-white cursor-ew-resize hover:scale-110 transition-transform">
                <GripVertical className="w-5 h-5 text-white" />
              </div>
            </motion.div>

            {/* Labels on sides */}
            <div className="absolute bottom-space-4 left-space-4 z-20">
              <span className={`bg-white/90 backdrop-blur-sm ${t.textMuted} text-xs font-mono px-space-3 py-space-1.5 rounded-full border ${t.border} shadow-sm`}>
                LEGACY
              </span>
            </div>
            <div className="absolute bottom-space-4 right-space-4 z-20">
              <span className="bg-[var(--accent-teal)]/90 backdrop-blur-sm text-white text-xs font-mono px-space-3 py-space-1.5 rounded-full shadow-sm">
                MODERN
              </span>
            </div>
          </div>

          {/* Instruction + CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-space-6 mt-space-8">
            <p className={`${t.textMuted} text-sm font-mono`}>
              {'<'} Drag to compare {'>'}
            </p>

            {/* Watch Demo Button */}
            <a
              href="https://www.youtube.com/watch?v=NvNFN6sz41M"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-space-2 bg-[var(--accent-teal-800)] hover:bg-[var(--accent-teal-900)] text-white text-sm font-medium px-space-4 py-space-2 rounded-full transition-colors`}
            >
              <Play className="w-4 h-4" />
              <span>Watch Demo</span>
            </a>

            <div className="flex items-center gap-space-4">
              <Link
                href="/work/reportcaster"
                className={`inline-flex items-center gap-space-2 ${t.textSecondary} hover:text-[var(--accent-teal)] text-sm font-medium transition-colors`}
              >
                <span>ReportCaster</span>
                <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <span className={`${t.textDim} opacity-40`}>·</span>
              <Link
                href="/work/ml-functions"
                className={`inline-flex items-center gap-space-2 ${t.textSecondary} hover:text-[var(--accent-teal)] text-sm font-medium transition-colors`}
              >
                <span>ML Functions</span>
                <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <span className={`${t.textDim} opacity-40`}>·</span>
              <Link
                href="/work/iq-plugin"
                className={`inline-flex items-center gap-space-2 ${t.textSecondary} hover:text-[var(--accent-teal)] text-sm font-medium transition-colors`}
              >
                <span>DSML Hub</span>
                <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

