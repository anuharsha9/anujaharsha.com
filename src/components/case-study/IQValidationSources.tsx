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
      id: "concept",
      tag: 'OUTCOME_01: CONCEPT_VALIDATION',
      tagColor: 'text-emerald-600',
      headline: "The 'Dual-Layer' Proof.",
      body: "Usability testing settled the internal 'Power vs. Ease' debate. We proved that a single interface could serve both personas via progressive disclosure, ending months of circular design arguments.",
      icon: FlaskConical,
      accent: 'emerald',
    },
    {
      id: "roadmap",
      tag: 'OUTCOME_02: ROADMAP_CONVERGENCE',
      tagColor: 'text-blue-600',
      headline: '3 Roadmaps → 1.',
      body: "The visual prototype was so convincing that 3 distinct Product Managers (NLQ, Insights, Predict) agreed to abandon their standalone roadmaps and commit to the unified IQ Plugin strategy.",
      icon: GitMerge,
      accent: 'blue',
    },
    {
      id: "system",
      tag: 'OUTCOME_03: SYSTEM_STANDARDIZATION',
      tagColor: 'text-purple-600',
      headline: "The New 'North Star'.",
      body: "The patterns defined for IQ (Guided Wizards, Dual-Layer configs) were formally adopted into the WebFOCUS Design System as the standard for all future Data Science tools.",
      icon: Compass,
      accent: 'purple',
    },
  ]

  const accentMap: Record<string, { bg: string, text: string, border: string }> = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ComponentHeading
            tag="// VALIDATION_SOURCES"
            title="Research & Validation"
            description="We didn't just guess. We validated every major decision with real users from our target demographic."
            color="slate"
            align="center"
            className="mb-16 md:mb-24 max-w-3xl mx-auto"
          />
        </motion.div>

        {/* Outcome Matrix - Clean Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Dividers for Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-slate-100" />
          <div className="hidden md:block absolute top-0 bottom-0 right-1/3 w-px bg-slate-100" />

          {outcomes.map((outcome, index) => {
            const IconComponent = outcome.icon
            const style = accentMap[outcome.accent]
            return (
              <motion.div
                key={outcome.id}
                variants={itemVariants}
                className="flex flex-col h-full group"
              >
                {/* Icon - Minimal */}
                <div className={`w-12 h-12 rounded-xl ${style.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-5 h-5 ${style.text}`} strokeWidth={1.5} />
                </div>

                {/* Header */}
                <div className="space-y-4 mb-4">
                  <span className={`font-mono text-[10px] ${outcome.tagColor} uppercase tracking-widest block`}>
                    {outcome.tag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-slate-900 leading-tight">
                    {outcome.headline}
                  </h3>
                </div>

                {/* Body */}
                <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-sm">
                  {outcome.body}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Architect's Log - Refined Dark Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 max-w-5xl mx-auto"
        >
          <div className="bg-[#1D1D20] rounded-xl overflow-hidden border border-white/10 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-400" />
            <div className="p-8 md:p-12">
              <span className="font-mono text-xs text-amber-400 block mb-4 tracking-widest">
                &gt; ARCHITECT&apos;S_LOG: THE_PRINCIPAL_SHIFT
              </span>
              <p className="text-xl md:text-2xl font-light text-slate-200 leading-relaxed font-serif">
                "IQ Plugin taught me that the hardest part of Enterprise UX isn&apos;t designing the pixels—it&apos;s designing the <span className="text-emerald-400 font-normal italic">consensus</span>. By visualizing a unified future, I gave the organization the confidence to stop building silos and start building a platform."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
