'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePdf } from '@/contexts/PdfContext'
import { trackResumeDownload } from '@/components/analytics/GoogleAnalytics'

interface LetsTalkCTAProps {
  className?: string
  variant?: 'inline' | 'card'
}

export default function LetsTalkCTA({ className = '', variant = 'card' }: LetsTalkCTAProps) {
  const { openPdf } = usePdf()
  if (variant === 'inline') {
    return (
      <div className={className}>
        <Link
          href="/#lets-talk"
          className="inline-flex items-center gap-2 text-[var(--accent-teal)] hover:text-[var(--accent-teal)]/80 transition-colors font-medium group"
          aria-label="Let's talk - Contact me"
        >
          <span>Let&apos;s talk</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    )
  }

  // Subtle, quiet footer CTA
  return (
    <motion.section
      className={`${className} py-6 md:py-8`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 border-t border-white/[0.04]">
          <p className="text-zinc-800 text-xs font-mono tracking-wider uppercase">
            Interested in working together?
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/#lets-talk"
              className="text-xs text-zinc-600 hover:text-[var(--accent-teal)] transition-colors duration-300 font-mono tracking-wider uppercase"
              aria-label="Contact me"
            >
              Get in touch →
            </Link>
            <span className="w-px h-3 bg-white/[0.06]" />
            <button
              onClick={() => {
                trackResumeDownload()
                openPdf('/assets/Anuja Harsha Nimmagadda - Senior Product Designer.pdf', 'Anuja Harsha - Senior Product Designer')
              }}
              className="text-xs text-zinc-800 hover:text-zinc-500 transition-colors duration-300 font-mono tracking-wider uppercase cursor-pointer"
              aria-label="Read Resume PDF"
            >
              Resume
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
