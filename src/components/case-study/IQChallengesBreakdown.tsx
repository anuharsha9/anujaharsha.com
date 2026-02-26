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
      id: "navigation",
      tag: 'DECISION_01: NAVIGATION_PATTERN',
      headline: 'Icon Tiles vs. List Views',
      conflict: "Architects wanted traditional list views — the pattern they'd used for 20+ years. But list views caused the low adoption in the first place.",
      resolution: "I chose **Large Icon Tiles** with outcome-based labels (Ask, Analyze, Predict). Users understand the goal, not the tool. This won the navigation fight.",
      accent: "slate"
    },
    {
      id: "integration",
      tag: 'DECISION_02: INTEGRATION_STRATEGY',
      headline: 'New App vs. Hub Embedding',
      conflict: "Building a standalone DSML app would be faster. But it would create yet another destination users wouldn't find.",
      resolution: "We chose **Hub Integration.** Zero new infrastructure — the DSML Hub lives inside the existing ecosystem. One click from the homepage.",
      accent: "slate"
    },
    {
      id: "disclosure",
      tag: 'DECISION_03: DUAL_AUDIENCE',
      headline: 'Simplicity vs. Depth',
      conflict: "Data scientists need direct model parameters. Business analysts need plain-language results. One hub has to serve both.",
      resolution: "We chose **Progressive Disclosure.** Outcome labels for business users by default, expert configuration accessible on demand.",
      accent: "slate"
    },
  ]

  // Parse markdown bold syntax
  const renderText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g)
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="text-[var(--text-heading)] font-semibold">{part}</strong> : part
    )
  }

  return (
    <div className="w-full py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <ComponentHeading
          tag="ARCHITECTURAL DECISIONS"
          title="Architectural Decision Records (ADR)"
          description="Navigating the zero-sum constraints where user needs and business goals collided."
          color="teal"
          className="mb-16 md:mb-24 max-w-4xl mx-auto"
        />

        {/* Decision Grid - Clean 3-Column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {/* Dividers for Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-white/[0.06]" />
          <div className="hidden md:block absolute top-0 bottom-0 right-1/3 w-px bg-white/[0.06]" />

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
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-4 block group-hover:text-[var(--text-body)] transition-colors">
                {'// '}{decision.tag}
              </span>

              {/* Headline */}
              <h3 className="text-2xl md:text-3xl font-sans text-[var(--text-heading)] leading-tight mb-8">
                {decision.headline}
              </h3>

              {/* The Conflict */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest font-semibold">
                    THE TENSION
                  </span>
                </div>
                <p className="text-[var(--text-body)] text-sm leading-relaxed pl-6 border-l border-amber-500/[0.20]">
                  {decision.conflict}
                </p>
              </div>

              {/* The Resolution */}
              <div className="mt-auto pt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">
                    THE CALL
                  </span>
                </div>
                <p className="text-[var(--text-body)] text-sm leading-relaxed pl-6 border-l border-emerald-500/[0.20]">
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
              &quot;Every architectural decision optimized for one thing: <span className="text-emerald-400">discoverability</span>. The choice to embed inside the Hub instead of building standalone <span className="text-emerald-400">eliminated the visibility problem</span> that caused low adoption in the first place.&quot;
              <span className="inline-block w-2 h-4 bg-amber-500/50 align-middle ml-2 animate-pulse" />
            </p>
          </TerminalInsight>
        </div>
      </div>
    </div>
  )
}
