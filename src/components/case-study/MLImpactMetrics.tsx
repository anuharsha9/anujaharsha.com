'use client'

import { motion } from 'framer-motion'
import { TrendingUp, ShieldCheck, Layout, Users } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import TerminalInsight from './TerminalInsight'

interface MLImpactMetricsProps {
  isLightBackground?: boolean
}

export default function MLImpactMetrics({ isLightBackground = false }: MLImpactMetricsProps) {
  const outcomes = [
    {
      tag: 'OUTCOME_01: BUSINESS_IMPACT',
      tagColor: 'text-[var(--accent-teal)]',
      headline: 'Demo-Ready at Scale',
      body: 'For the first time, ML was stable enough for 200+ person org-wide demos. Sales engineering could finally showcase the capability confidently.',
      icon: TrendingUp,
      iconBg: 'bg-[var(--accent-teal-50)]',
      iconColor: 'text-[var(--accent-teal)]',
    },
    {
      tag: 'OUTCOME_02: RELIABILITY',
      tagColor: 'text-emerald-600',
      headline: 'Zero Abandonment',
      body: "Eliminating dead-end errors didn't just save clicks; it stopped users from quitting. All SME testers completed the full workflow.",
      icon: ShieldCheck,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      tag: 'OUTCOME_03: SCALABILITY',
      tagColor: 'text-purple-600',
      headline: '1 Core Pattern',
      body: 'The 4-step guided flow pattern was so robust it was directly inherited by the IQ Plugin, reducing future design/dev time.',
      icon: Layout,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      tag: 'OUTCOME_04: MARKET_EXPANSION',
      tagColor: 'text-amber-600',
      headline: 'New User Tier',
      body: 'Lowering the technical barrier allowed Business Analysts to self-serve, expanding the addressable market beyond just Data Scientists.',
      icon: Users,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 }
        }}
        className="text-center space-y-3"
      >
        <ComponentHeading
          variant="block"
          tag="// IMPACT_METRICS"
          title="Impact & Validation"
          description="Beyond usability metrics — these outcomes demonstrate how design decisions translated into tangible business value, system trust, and market expansion."
          color="teal"
          align="center"
          className="mb-0"
        />
      </motion.div>

      {/* Outcome Cards - 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {outcomes.map((o, i) => {
          const IconComponent = o.icon
          return (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }
              }}
              className="bg-white border border-slate-200 p-6 md:p-8 h-full flex flex-col hover:shadow-lg hover:border-slate-300 transition-all duration-300 rounded-2xl"
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${o.iconBg} flex items-center justify-center mb-4 rounded-xl`}>
                <IconComponent className={`w-6 h-6 ${o.iconColor}`} />
              </div>

              {/* Tag */}
              <span className={`font-mono text-[10px] ${o.tagColor} uppercase tracking-widest mb-3`}>
                {'// '}{o.tag}
              </span>

              {/* Headline */}
              <h4 className="text-slate-900 text-lg font-serif font-semibold mb-3">
                {o.headline}
              </h4>

              {/* Body */}
              <p className="text-slate-600 text-sm leading-relaxed">
                {o.body}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* System Outcome Footer */}
      <div className="w-full mt-12">
        <TerminalInsight
          title="system_outcome.log"
        >
          <div className="text-sm">
            <span className="text-emerald-400 font-bold mr-2">&gt; OUTCOME:</span>
            <span className="text-slate-300">
              ML Functions became a <span className="text-emerald-400 font-bold">gateway for broader ML adoption</span> across teams,
              rather than a niche expert-only feature. Seamless workflow integration meant users stayed inside WebFOCUS instead of bouncing between tools.
            </span>
          </div>
        </TerminalInsight>
      </div>
    </div>
  )
}
