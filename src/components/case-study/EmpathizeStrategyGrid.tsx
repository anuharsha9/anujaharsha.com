'use client'

import { motion } from 'framer-motion'

interface EmpathizeStrategyGridProps {
  isLightBackground?: boolean
}

export default function EmpathizeStrategyGrid({ isLightBackground = true }: EmpathizeStrategyGridProps) {
  return (
    <div className="space-y-12">
      {/* CUSTOMER OBSESSION HIGHLIGHT: The Support Team Deep Dive */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative group"
      >
        {/* Decorative background gradient */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent-blue-100)] via-white to-[var(--accent-teal-50)] opacity-50 blur-xl group-hover:opacity-80 transition-opacity duration-700" />

        <div className="relative bg-white/60 backdrop-blur-sm border border-white/50 shadow-xl shadow-slate-200/50 p-8 md:p-12 overflow-hidden">
          {/* Large Quote Icon */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10 text-[var(--accent-blue)] opacity-10 pointer-events-none">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-white border border-[var(--accent-blue-100)] shadow-sm">
              <span className="font-mono text-[var(--accent-blue)] text-[10px] md:text-xs uppercase tracking-widest font-medium">
                {'// CUSTOMER_OBSESSION'}
              </span>
            </div>

            <h3 className="font-serif text-slate-900 text-3xl md:text-4xl leading-tight max-w-4xl mx-auto">
              I Embedded Myself in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-teal)]">Customer Support.</span>
            </h3>

            <div className="space-y-6 text-slate-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-light">
              <p>
                <strong className="font-semibold text-slate-900 bg-[var(--accent-blue-50)] px-1 ">I didn&apos;t wait for permission.</strong> I joined the customer support team lead&apos;s meetings — multiple times over the course of a month. I interviewed <strong className="font-semibold text-slate-900">every single person on the team</strong>. I grilled them to understand the real pain, not sanitized summaries.
              </p>
              <p>
                What I discovered was critical: <strong className="font-semibold text-[var(--accent-error)]">customers were customizing and hacking the UI out of desperation</strong>. They weren&apos;t asking for a cosmetic refresh — they were drowning in fragmentation.
              </p>
            </div>

            <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-teal)] opacity-30" />

            <p className="text-slate-600 text-sm md:text-base italic max-w-2xl">
              &quot;This wasn&apos;t just research — it was <span className="not-italic font-semibold text-slate-900">earning trust to access truth</span>. I gained access to private internal tickets and historical insights.&quot;
            </p>
          </div>
        </div>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center"
      >
        <div className="bg-slate-900 text-slate-200 px-6 py-4 border-l-4 border-[var(--accent-teal)] shadow-lg max-w-3xl">
          <p className="text-sm md:text-base leading-relaxed font-mono">
            <span className="text-[var(--accent-teal)] font-bold mr-2">{'>'}</span>
            I designed for the <span className="text-white font-bold">entire RC ecosystem</span>. End users, support teams, engineers, and PMs — each role&apos;s constraints shaped the unified architecture.
          </p>
        </div>
      </motion.div>
    </div>
  )
}





