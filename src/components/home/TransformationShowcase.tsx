'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { GripVertical, Play } from 'lucide-react'
import Link from 'next/link'
import { getTheme, spacing } from '@/lib/design-system'

/**
 * TransformationShowcase - A dramatic before/after slider for the landing page
 * Shows the most impactful transformation: 50-year legacy to modern UI
 */
export default function TransformationShowcase() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100
    setSliderPosition(percentage)
  }, [])

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

  const handleStart = () => setIsDragging(true)
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
            I modernized WebFOCUS&apos;s core workflows—taking fragmented legacy tools and unifying them into coherent, intelligent experiences.
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
            onMouseLeave={handleEnd}
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
            <div
              className="absolute inset-0 pt-11 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src="/images/case-study/ReportCaster/Before.png"
                alt="Legacy ReportCaster interface"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-11 bottom-0 z-10 cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              onMouseDown={handleStart}
              onTouchStart={handleStart}
            >
              {/* Vertical Line */}
              <div className="w-0.5 h-full bg-[var(--accent-teal)] shadow-lg shadow-[var(--accent-teal)]/50"></div>

              {/* Drag Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[var(--accent-teal)] rounded-full flex items-center justify-center shadow-xl shadow-[var(--accent-teal)]/30 border-2 border-white cursor-ew-resize hover:scale-110 transition-transform">
                <GripVertical className="w-5 h-5 text-white" />
              </div>
            </div>

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

