'use client'

import { motion } from 'framer-motion'
import { getTheme, spacing } from '@/lib/design-system'
import { usePdf } from '@/contexts/PdfContext'
import { trackResumeDownload } from '@/components/analytics/GoogleAnalytics'
import Magnetic from '@/components/ui/Magnetic'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function TalkSection() {
  const t = getTheme(false)
  const { openPdf } = usePdf()

  return (
    <footer
      id="lets-talk"
      className="relative overflow-hidden bg-transparent py-16 md:py-24"
      role="contentinfo"
    >
      <div className={`relative z-10 ${spacing.container} max-w-4xl mx-auto`}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, ease }}
        >
          {/* Portrait */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-10 rounded-full overflow-hidden border border-white/10 shadow-[0_0_30px_-5px_var(--accent-teal)]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
            <Image
              src="/images/anuja-portrait.jpg"
              alt="Anuja Harsha Nimmagadda"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Mission quote */}
          <h2 className="font-sans font-light text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide text-zinc-300 mb-6">
            &ldquo;I design to eliminate structural friction&mdash;translating absolute ambiguity into scalable engineering reality.&rdquo;
          </h2>

          {/* Roles seeking */}
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-zinc-500 mb-10">
            STAFF PRODUCT DESIGNER & ARCHITECT
          </p>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mb-10">
            <a
              href="mailto:anujanimmagadda@gmail.com"
              className="font-mono text-sm text-zinc-400 hover:text-[var(--accent-teal)] transition-colors duration-500"
            >
              anujanimmagadda@gmail.com
            </a>
            <span className="hidden sm:inline text-zinc-700">·</span>
            <a
              href="tel:+17813547394"
              className="font-mono text-sm text-zinc-400 hover:text-[var(--accent-teal)] transition-colors duration-500"
            >
              +1 781-354-7394
            </a>
          </div>

          {/* 4 Link Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Magnetic strength={0.2}>
              <a
                href="https://www.linkedin.com/in/anu159"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-zinc-300 text-sm font-medium tracking-wide hover:bg-white/[0.1] hover:text-white hover:border-white/[0.2] transition-all duration-500"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </Magnetic>

            <Magnetic strength={0.4}>
              <button
                onClick={() => {
                  trackResumeDownload()
                  openPdf('/assets/Anuja%20Harsha%20Nimmagadda%20-%20Staff%20Product%20Designer.pdf', 'Anuja Harsha Nimmagadda - Staff Product Designer')
                }}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-amber-500/25 bg-amber-500/[0.08] text-amber-200 text-sm font-medium tracking-wide hover:bg-amber-500/[0.15] hover:text-amber-100 hover:border-amber-500/40 transition-all duration-500 shadow-[0_0_30px_-8px_rgba(245,158,11,0.15)]"
                aria-label="View Resume PDF"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <a
                href="https://medium.com/@anu.anuja"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-zinc-300 text-sm font-medium tracking-wide hover:bg-white/[0.1] hover:text-white hover:border-white/[0.2] transition-all duration-500"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
                Medium
              </a>
            </Magnetic>

            <Magnetic strength={0.2}>
              <a
                href="https://adplist.org/mentors/anuja-harsha-nimmagadda"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-zinc-300 text-sm font-medium tracking-wide hover:bg-white/[0.1] hover:text-white hover:border-white/[0.2] transition-all duration-500"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                ADPList
              </a>
            </Magnetic>
          </div>

          {/* Sign-off */}
          <p className={`${t.textDim} text-[11px] font-mono tracking-wide breathe`} style={{ '--breathe-base': '0.3', '--breathe-peak': '0.45' } as React.CSSProperties} suppressHydrationWarning>
            © {new Date().getFullYear()} Anuja Harsha · Designed + AI-Orchestrated
          </p>

          <div className="h-safe-area-inset-bottom" />
        </motion.div>
      </div>
    </footer>
  )
}
