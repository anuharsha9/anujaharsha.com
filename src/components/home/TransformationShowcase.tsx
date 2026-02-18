'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Link from 'next/link'
import { getTheme, spacing } from '@/lib/design-system'
import ImageComparisonSlider from '@/components/ui/ImageComparisonSlider'

/**
 * TransformationShowcase - A dramatic before/after slider for the landing page
 * Shows the most impactful transformation: 50-year legacy to modern UI
 */
export default function TransformationShowcase() {
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
          <h2 className={`font-sans font-black ${t.text} text-3xl md:text-4xl lg:text-5xl leading-tight mb-space-4`}>
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
          <ImageComparisonSlider
            beforeImage="/images/case-study/ReportCaster/Before.png"
            afterImage="/images/case-study/ReportCaster/After.png"
            beforeAlt="Legacy ReportCaster interface"
            afterAlt="Modern ReportCaster interface"
            beforeLabel="LEGACY"
            afterLabel="MODERN"
            beforeTitle="reportcaster_legacy.exe"
            afterTitle="reportcaster_modern.tsx"
            aspectRatio="aspect-[16/10]"
          />

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
