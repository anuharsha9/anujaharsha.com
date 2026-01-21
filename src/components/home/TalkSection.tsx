'use client'

import { motion } from 'framer-motion'
import { getTheme, spacing } from '@/lib/design-system'

export default function TalkSection() {
  const t = getTheme(false)

  return (
    <section
      id="lets-talk"
      className="py-section-mobile md:py-section-tablet lg:py-section-desktop relative overflow-hidden"
    >
      {/* Content container */}
      <div className={`relative z-10 ${spacing.container}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-space-6"
        >
          {/* Headline - Large, Serif */}
          <h2 className={`font-serif ${t.text} text-3xl md:text-4xl lg:text-5xl leading-tight`}>
            Let&apos;s connect.
          </h2>

          {/* Role Targeting - subtle */}
          <p className={`${t.textMuted} text-sm`}>
            Seeking Senior Product Designer / Lead Product Designer roles
          </p>

          {/* Contact Row - Large, clickable links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-space-6 md:gap-space-10">
            {/* Email */}
            <a
              href="mailto:anujanimmagadda@gmail.com"
              className={`${t.text} font-mono text-lg md:text-xl hover:text-[var(--accent-teal)] transition-colors duration-300 group`}
            >
              <span className={`border-b ${t.borderSecondary} group-hover:border-[var(--accent-teal)] transition-colors duration-300 pb-space-1`}>
                anujanimmagadda@gmail.com
              </span>
            </a>

            <span className={`hidden md:inline ${t.textDim} opacity-60`}>·</span>

            {/* Phone */}
            <a
              href="tel:+17813547394"
              className={`${t.text} font-mono text-lg md:text-xl hover:text-[var(--accent-teal)] transition-colors duration-300 group`}
            >
              <span className={`border-b ${t.borderSecondary} group-hover:border-[var(--accent-teal)] transition-colors duration-300 pb-space-1`}>
                +1 781-354-7394
              </span>
            </a>
          </div>

          {/* Social Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:flex-nowrap">
            <a
              href="https://www.linkedin.com/in/anu159"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-800 text-slate-400 font-medium text-sm hover:bg-[#0077b5]/10 hover:text-[#0077b5] hover:border-[#0077b5]/50 transition-all duration-300`}
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            <a
              href="/assets/Anuja Harsha Nimmagadda - Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-800 text-slate-400 font-medium text-sm hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-300`}
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Resume (PDF)</span>
            </a>

            <a
              href="https://medium.com/@anu.anuja"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-800 text-slate-400 font-medium text-sm hover:bg-white/10 hover:text-white hover:border-white/50 transition-all duration-300`}
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
              <span>Medium</span>
            </a>

            <a
              href="https://adplist.org/mentors/anuja-harsha-nimmagadda"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-800 text-slate-400 font-medium text-sm hover:bg-teal-400/10 hover:text-teal-400 hover:border-teal-400/50 transition-all duration-300`}
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>ADPList</span>
            </a>
          </div>

          {/* Copyright - Low contrast gray */}
          <p className={`${t.textDim} text-sm font-mono`}>
            Engineered and orchestrated with AI agents.
          </p>

          {/* Safe area for iPhone home indicator */}
          <div className="h-safe-area-inset-bottom" />
        </motion.div>
      </div>
    </section>
  )
}
