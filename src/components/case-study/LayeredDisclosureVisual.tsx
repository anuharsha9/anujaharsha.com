'use client'

import { motion } from 'framer-motion'
import { User, Sliders, Code, CheckCircle2 } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface LayeredDisclosureVisualProps {
  isLightBackground?: boolean
}

export default function LayeredDisclosureVisual({ isLightBackground = false }: LayeredDisclosureVisualProps) {
  const layers = [
    {
      level: 'Default Experience',
      tag: '// LEVEL_01: DEFAULT',
      user: 'Non-technical users',
      icon: User,
      features: [
        'Guided, safe, error-proof flow',
        'Clear steps, clear terminology',
        'Tooltips, wizards, onboarding text',
        'Inline explanations',
        'Progressive disclosure'
      ]
    },
    {
      level: 'Advanced Controls',
      tag: '// LEVEL_02: ADVANCED',
      user: 'Technical users',
      icon: Sliders,
      features: [
        'Expandable sections for parameters',
        'Ability to adjust algorithms',
        'Feature selection options',
        'Training configuration'
      ]
    },
    {
      level: 'Expert Mode',
      tag: '// LEVEL_03: EXPERT',
      user: 'Data scientists',
      icon: Code,
      features: [
        'Full control available but not required',
        'Advanced tuning options',
        'Hyperparameter presets',
        'All within the same unified experience'
      ]
    },
  ]

  const safetyChecks = [
    'Incompatible datasets blocked early (Step 1)',
    'Inline warnings in plain language',
    'Standardized error patterns from design system',
    'Users always have a way out: go back, change input, or safely cancel'
  ]

  const backlog = [
    'Auto-suggesting best model type based on dataset',
    'Deep hyperparameter presets and advanced tuning',
    'Unified Train+Run single-screen concept',
    'Heavier onboarding overlays / carousels'
  ]

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
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Section Header - More Compact */}
      <motion.div variants={itemVariants}>
        <ComponentHeading
          variant="block"
          tag="// CONFIGURATION_MATRIX"
          title="Balancing Model Control with Simplicity"
          description="Layered disclosure: serve multiple user types within a single experience."
          color="teal"
          align="center"
          className="mb-8"
        />
      </motion.div>

      {/* Configuration Matrix - 3 User Levels - Modern Clean Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {layers.map((l, i) => {
          const IconComponent = l.icon
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white/[0.03] p-6 rounded-2xl shadow-sm border border-white/[0.06] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Top: Icon + Headline */}
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-teal-50)] flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-[var(--accent-teal)]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-[var(--text-heading)]">{l.level}</h4>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mt-1">
                      {l.user}
                    </p>
                  </div>
                </div>

                {/* Features List - Clean */}
                <ul className="space-y-2 pt-2">
                  {l.features.map((f, j) => (
                    <li key={j} className="text-[var(--text-body)] text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-teal)] mt-1.5 flex-shrink-0 opacity-50"></span>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Modern Two-Column Layout for Safety + Backlog */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* System Safety Checks - Clean */}
        <motion.div
          variants={itemVariants}
          className="bg-emerald-50/30 border border-emerald-100/50 p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100/50 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h5 className="font-medium text-emerald-900 text-sm uppercase tracking-wider">Safety guardrails</h5>
          </div>
          <ul className="grid grid-cols-1 gap-3">
            {safetyChecks.map((check, i) => (
              <li key={i} className="text-[var(--text-body)] text-sm flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span className="leading-relaxed">{check}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Architectural Backlog - Clean */}
        <motion.div
          variants={itemVariants}
          className="bg-white/[0.03]/50 border border-white/[0.06] p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-[var(--text-muted)]">..</span>
            </div>
            <h5 className="font-medium text-[var(--text-heading)] text-sm uppercase tracking-wider">Future Roadmap</h5>
          </div>
          <ul className="grid grid-cols-1 gap-3">
            {backlog.map((item, i) => (
              <li key={i} className="text-[var(--text-muted)] text-sm flex items-start gap-3">
                <span className="text-[var(--text-muted)] mt-0.5">→</span>
                <span className="leading-relaxed italic">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* System Outcome Footer - Compact */}
      <motion.div
        variants={itemVariants}
        className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <span className="font-mono text-xs text-emerald-400 flex-shrink-0">
            &gt;
          </span>
          <p className="text-[var(--text-muted)] text-xs leading-relaxed">
            Default users never see expert controls unless needed. Experts can dive deep without wading through tutorials.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
