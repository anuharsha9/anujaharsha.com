'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import TerminalInsight from './TerminalInsight'

interface IQChallengesBreakdownProps {
  isLightBackground?: boolean
}

export default function IQChallengesBreakdown({ isLightBackground = false }: IQChallengesBreakdownProps) {
  const decisions = [
    {
      id: "audience",
      tag: 'DECISION_01: AUDIENCE_SCOPE',
      headline: 'Universality vs. Specificity',
      conflict: "Supporting 4 distinct personas usually leads to a 'lowest common denominator' interface.",
      resolution: "We rejected genericism. We chose **Bifurcated Pathways**—optimizing the 'Happy Path' for Lisa while preserving 'Power Shortcuts' for Dan.",
      accent: "slate"
    },
    {
      id: "density",
      tag: 'DECISION_02: INTERFACE_DENSITY',
      headline: 'Power vs. Approachability',
      conflict: "Technical users demand density; business users demand white space. You can't have both.",
      resolution: "We chose **Progressive Disclosure.** The interface defaults to 'Low Density' (Simplicity) but allows 'High Density' expansion on demand.",
      accent: "slate"
    },
    {
      id: "velocity",
      tag: 'DECISION_03: ORG_VELOCITY',
      headline: 'Autonomy vs. Standardization',
      conflict: "3 Feature Teams wanted to ship fast (Autonomy). The Platform needed consistency (Standardization).",
      resolution: "We chose **Standardization.** I slowed down initial velocity to build the 'IQ Design System,' which eventually accelerated all 3 teams significantly.",
      accent: "slate"
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
    <div className="w-full py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <ComponentHeading
          tag="// ARCHITECTURAL_DECISION_RECORDS"
          title="Architectural Decision Records (ADR)"
          description="Navigating the zero-sum constraints where user needs and business goals collided."
          color="slate"
          align="center"
          className="mb-16 md:mb-24 max-w-4xl mx-auto"
        />

        {/* Decision Grid - Clean 3-Column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {/* Dividers for Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-slate-100" />
          <div className="hidden md:block absolute top-0 bottom-0 right-1/3 w-px bg-slate-100" />

          {decisions.map((decision, index) => (
            <motion.div
              key={decision.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col h-full group"
            >
              {/* Tag */}
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-4 block group-hover:text-slate-600 transition-colors">
                {'// '}{decision.tag}
              </span>

              {/* Headline */}
              <h3 className="text-2xl md:text-3xl font-serif text-slate-900 leading-tight mb-8">
                {decision.headline}
              </h3>

              {/* The Conflict */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span className="font-mono text-[10px] text-amber-600 uppercase tracking-widest font-semibold">
                    THE TENSION
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pl-6 border-l border-amber-100">
                  {decision.conflict}
                </p>
              </div>

              {/* The Resolution */}
              <div className="mt-auto pt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-mono text-[10px] text-emerald-600 uppercase tracking-widest font-semibold">
                    THE CALL
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pl-6 border-l border-emerald-100">
                  {renderText(decision.resolution)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Strategic Insight Footer - Refined Console */}
        <div className="mt-24 w-full">
          <TerminalInsight
            title="~/adr/decision_log.md"
            insightLabel="ADR_INSIGHT:"
          >
            <p className="opacity-90 leading-7">
              &quot;Every architectural decision created downstream consequences. The choice to standardize <span className="text-emerald-400">sacrificed short-term speed</span> but <span className="text-emerald-400">created a compounding velocity advantage</span> that paid dividends across all 3 feature teams.&quot;
              <span className="inline-block w-2 h-4 bg-amber-500/50 align-middle ml-2 animate-pulse" />
            </p>
          </TerminalInsight>
        </div>
      </div>
    </div>
  )
}
