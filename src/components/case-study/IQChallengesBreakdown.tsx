'use client'

import { motion } from 'framer-motion'

import ComponentHeading from '@/components/ui/ComponentHeading'
interface IQChallengesBreakdownProps {
  isLightBackground?: boolean
}

export default function IQChallengesBreakdown({ isLightBackground = false }: IQChallengesBreakdownProps) {
  const decisions = [
    {
      tag: 'DECISION_01: AUDIENCE_SCOPE',
      headline: 'Universality vs. Specificity',
      conflict: "Supporting 4 distinct personas usually leads to a 'lowest common denominator' interface.",
      resolution: "We rejected genericism. We chose **Bifurcated Pathways**—optimizing the 'Happy Path' for Lisa while preserving 'Power Shortcuts' for Dan.",
    },
    {
      tag: 'DECISION_02: INTERFACE_DENSITY',
      headline: 'Power vs. Approachability',
      conflict: "Technical users demand density; business users demand white space. You can't have both.",
      resolution: "We chose **Progressive Disclosure.** The interface defaults to 'Low Density' (Simplicity) but allows 'High Density' expansion on demand.",
    },
    {
      tag: 'DECISION_03: ORG_VELOCITY',
      headline: 'Autonomy vs. Standardization',
      conflict: "3 Feature Teams wanted to ship fast (Autonomy). The Platform needed consistency (Standardization).",
      resolution: "We chose **Standardization.** I slowed down initial velocity to build the 'IQ Design System,' which eventually accelerated all 3 teams significantly.",
    },
  ]

  // Parse markdown bold syntax
  const renderText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g)
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="text-slate-900 font-semibold">{part}</strong> : part
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <ComponentHeading
        variant="block"
        tag="// ARCHITECTURAL_DECISION_RECORDS"
        title="Architectural Decision Records (ADR)"
        description="Navigating the zero-sum constraints where user needs and business goals collided."
        color="slate"
        align="center"
        className="mb-12"
      />

      {/* Decision Matrix - 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {decisions.map((decision, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-50 border border-slate-200 p-6 md:p-8 h-full flex flex-col"
          >
            {/* Tag */}
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">
              {'// '}{decision.tag}
            </span>

            {/* Headline */}
            <h4 className="text-slate-900 text-lg font-serif font-semibold mb-4">
              {decision.headline}
            </h4>

            {/* The Conflict */}
            <div className="mb-4">
              <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest block mb-2">
                THE TENSION:
              </span>
              <p className="text-slate-600 text-sm leading-relaxed">
                {decision.conflict}
              </p>
            </div>

            {/* The Resolution */}
            <div className="mt-auto pt-4 border-t border-slate-200">
              <span className="font-mono text-[10px] text-emerald-600 uppercase tracking-widest block mb-2">
                THE CALL:
              </span>
              <p className="text-slate-600 text-sm leading-relaxed">
                {renderText(decision.resolution)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Strategic Insight Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-xl bg-[#1e1e1e] shadow-2xl border border-white/10 overflow-hidden mx-auto max-w-4xl"
      >
        {/* macOS Terminal Header */}
        <div className="h-10 bg-[#2d2d2d] flex items-center justify-center relative border-b border-black/40">
          {/* Traffic Lights */}
          <div className="flex gap-2 absolute left-4 top-1/2 -translate-y-1/2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-inner" />
          </div>
          {/* Title */}
          <span className="font-mono text-xs text-slate-400/80 tracking-wide font-medium flex items-center gap-2">
            <span className="opacity-50">~/adr/</span>decision_log.md
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-8 font-mono text-sm leading-relaxed text-slate-300">
          <div className="flex gap-3">
            <span className="text-amber-400 font-bold shrink-0">&gt;</span>
            <div className="space-y-2">
              <p className="text-amber-400 font-bold tracking-wide text-xs uppercase mb-1">
                ADR_INSIGHT:
              </p>
              <p className="text-slate-300 leading-relaxed">
                Every architectural decision created downstream consequences. The choice to standardize
                <span className="text-emerald-400 font-medium opacity-90"> sacrificed short-term speed</span> but
                <span className="text-emerald-400 font-medium opacity-90"> created a compounding velocity advantage</span> that
                paid dividends across all 3 feature teams.
              </p>
            </div>
          </div>

          {/* Blinking Cursor */}
          <span className="inline-block w-2.5 h-4 bg-amber-500/50 animate-pulse mt-4 ml-4" />
        </div>
      </motion.div>
    </div>
  )
}
