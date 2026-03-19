'use client'

import { motion } from 'framer-motion'
import { getTheme, spacing } from '@/lib/design-system'
import { usePdf } from '@/contexts/PdfContext'
import { trackResumeDownload } from '@/components/analytics/GoogleAnalytics'
import Magnetic from '@/components/ui/Magnetic'

export default function TalkSection() {
  const t = getTheme(false)
  const { openPdf } = usePdf()

  return (
    <footer
      id="lets-talk"
      className="py-section-mobile md:py-section-tablet lg:py-section-desktop relative overflow-hidden bg-transparent"
      role="contentinfo"
    >
      {/* Content container */}
      <div className={`relative z-10 ${spacing.container}`}>
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Content zone — no card, clean float */}
          <div className="relative mx-auto max-w-5xl px-8 py-16 md:px-16 md:py-20">

            {/* Mission quote — 2-line wrap */}
            <h2
              className="font-sans font-light text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide text-zinc-400 mb-10"
            >
              &ldquo;I design so I can be part of making people&apos;s lives a little easier every day.&rdquo;
            </h2>

            {/* Role targeting */}
            <p className="text-zinc-600 text-xs font-mono uppercase tracking-[0.2em] mb-10">
              Seeking Senior Product Designer / Lead Product Designer roles
            </p>

            {/* Contact — mono, understated, clickable */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10">
              <a
                href="mailto:anujanimmagadda@gmail.com"
                className="font-mono text-sm md:text-base text-zinc-400 hover:text-[var(--accent-teal)] transition-colors duration-500"
              >
                anujanimmagadda@gmail.com
              </a>
              <span className="hidden md:inline text-zinc-700">·</span>
              <a
                href="tel:+17813547394"
                className="font-mono text-sm md:text-base text-zinc-400 hover:text-[var(--accent-teal)] transition-colors duration-500"
              >
                +1 781-354-7394
              </a>
            </div>

            {/* Social links — glass pills, cinematic */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <Magnetic strength={0.2}>
                <a
                  href="https://www.linkedin.com/in/anu159"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm text-zinc-400 text-xs font-mono uppercase tracking-wider hover:bg-white/[0.08] hover:text-zinc-200 hover:border-white/[0.15] transition-all duration-500"
                >
                  <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </Magnetic>

              <Magnetic strength={0.4}>
                <button
                  onClick={() => {
                    trackResumeDownload()
                    openPdf('/assets/Anuja Harsha Nimmagadda - Senior Product Designer.pdf', 'Anuja Harsha - Senior Product Designer')
                  }}
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-500/20 bg-amber-500/[0.06] backdrop-blur-sm text-amber-300/80 text-xs font-mono uppercase tracking-wider hover:bg-amber-500/[0.12] hover:text-amber-200 hover:border-amber-500/40 transition-all duration-500 shadow-[0_0_20px_-5px_rgba(245,158,11,0.1)]"
                  aria-label="View Resume PDF"
                >
                  <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm text-zinc-400 text-xs font-mono uppercase tracking-wider hover:bg-white/[0.08] hover:text-zinc-200 hover:border-white/[0.15] transition-all duration-500"
                >
                  <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
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
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm text-zinc-400 text-xs font-mono uppercase tracking-wider hover:bg-white/[0.08] hover:text-zinc-200 hover:border-white/[0.15] transition-all duration-500"
                >
                  <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  ADPList
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Sign-off — below the card */}
          <p className={`${t.textDim} text-[11px] font-mono tracking-wide mt-8 breathe`} style={{ '--breathe-base': '0.3', '--breathe-peak': '0.45' } as React.CSSProperties} suppressHydrationWarning>
            © {new Date().getFullYear()} Anuja Harsha · Designed + AI-Orchestrated
          </p>

          {/* Safe area for iPhone home indicator */}
          <div className="h-safe-area-inset-bottom" />
        </motion.div>
      </div>
    </footer>
  )
}
