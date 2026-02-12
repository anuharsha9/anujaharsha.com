'use client'

import { motion } from 'framer-motion'
import { FlaskConical, GitMerge, Compass } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface IQValidationSourcesProps {
  isLightBackground?: boolean
}

export default function IQValidationSources({ isLightBackground = false }: IQValidationSourcesProps) {
  const outcomes = [
    {
      tag: 'OUTCOME_01: CONCEPT_VALIDATION',
      tagColor: 'text-emerald-600',
      headline: "The 'Dual-Layer' Proof.",
      body: "Usability testing settled the internal 'Power vs. Ease' debate. We proved that a single interface could serve both personas via progressive disclosure, ending months of circular design arguments.",
      icon: FlaskConical,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      tag: 'OUTCOME_02: ROADMAP_CONVERGENCE',
      tagColor: 'text-blue-600',
      headline: '3 Roadmaps → 1.',
      body: "The visual prototype was so convincing that 3 distinct Product Managers (NLQ, Insights, Predict) agreed to abandon their standalone roadmaps and commit to the unified IQ Plugin strategy.",
      icon: GitMerge,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      tag: 'OUTCOME_03: SYSTEM_STANDARDIZATION',
      tagColor: 'text-purple-600',
      headline: "The New 'North Star'.",
      body: "The patterns defined for IQ (Guided Wizards, Dual-Layer configs) were formally adopted into the WebFOCUS Design System as the standard for all future Data Science tools.",
      icon: Compass,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <ComponentHeading
        variant="block"
        tag="// VALIDATION_SOURCES"
        title="Research & Validation"
        description="We didn't just guess. We validated every major decision with real users from our target demographic."
        color="slate"
        align="center"
        className="mb-12"
      />

      {/* Outcome Matrix - 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {outcomes.map((outcome, index) => {
          const IconComponent = outcome.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-slate-200 p-6 md:p-8 h-full flex flex-col hover:shadow-lg hover:border-slate-300 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${outcome.iconBg} flex items-center justify-center mb-4`}>
                <IconComponent className={`w-6 h-6 ${outcome.iconColor}`} />
              </div>

              {/* Tag */}
              <span className={`font-mono text-[10px] ${outcome.tagColor} uppercase tracking-widest mb-3`}>
                {'// '}{outcome.tag}
              </span>

              {/* Headline */}
              <h4 className="text-slate-900 text-lg font-serif font-semibold mb-3">
                {outcome.headline}
              </h4>

              {/* Body */}
              <p className="text-slate-600 text-sm leading-relaxed">
                {outcome.body}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Architect's Log Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-slate-900 p-6 md:p-8 mt-12"
      >
        <div className="flex items-start gap-3">
          <span className="font-mono text-sm text-amber-400 flex-shrink-0">
            &gt; ARCHITECT&apos;S_LOG: THE_PRINCIPAL_SHIFT
          </span>
        </div>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-3">
          IQ Plugin taught me that the hardest part of Enterprise UX isn&apos;t designing the pixels—it&apos;s designing the
          <span className="text-emerald-400 font-semibold"> consensus</span>. By visualizing a unified future, I gave the organization
          the confidence to stop building silos and start building a platform.
        </p>
      </motion.div>
    </div>
  )
}
