'use client'

import { motion } from 'framer-motion'
import { Code, Briefcase, Zap } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface MLPersonaCardsProps {
  isLightBackground?: boolean
}

export default function MLPersonaCards({ isLightBackground = false }: MLPersonaCardsProps) {
  const personas = [
    {
      name: 'Techy Analyst',
      type: 'TECHNICAL',
      icon: Code,
      description: 'Self-sufficient power users who need right-click entry and advanced controls.',
    },
    {
      name: 'Financial Strategist',
      type: 'BUSINESS',
      icon: Briefcase,
      description: 'Goal-oriented users who need guided workflows and plain-language explanations.',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <ComponentHeading
        variant="block"
        tag="// USER_PERSONAS"
        title="User Personas"
        description="Two distinct user types drove the dual-experience approach."
        color="slate"
        align="center"
        className="mb-8"
      />

      {/* Personas Grid - Matched to ReportCaster Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {personas.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <p.icon className="w-6 h-6 text-slate-400 group-hover:text-[var(--accent-teal)] transition-colors" strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-medium text-slate-900">{p.name}</h4>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${p.type === 'TECHNICAL'
                      ? 'bg-[var(--accent-teal-50)] text-[var(--accent-teal)]'
                      : 'bg-emerald-50 text-emerald-600'
                    }`}>
                    {p.type}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  {p.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Design Implication */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto bg-slate-50 rounded-xl p-6 text-center border border-slate-100"
      >
        <p className="text-slate-600 text-sm font-light leading-relaxed">
          <span className="font-medium text-slate-900">Dual-experience approach</span>: Technical users get right-click entry + advanced controls. Business users get guided workflows + inline teaching.
        </p>
      </motion.div>
    </div>
  )
}
