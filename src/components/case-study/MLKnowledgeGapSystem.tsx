'use client'

import { motion } from 'framer-motion'
import { GraduationCap, UserCheck, Bot } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface MLKnowledgeGapSystemProps {
  isLightBackground?: boolean
}

interface LearningMethod {
  id: string
  method: string
  description: string
  highlight?: string
  details: string[]
  icon: LucideIcon
}

export default function MLKnowledgeGapSystem({ isLightBackground = true }: MLKnowledgeGapSystemProps) {
  const methods: LearningMethod[] = [
    {
      id: '01',
      method: 'MIT Professional Certificate',
      description: 'Product Design for Machine Learning & AI',
      highlight: 'MIT xPRO, Boston',
      details: ['ML product lifecycle', 'Design for AI systems', 'Responsible ML practices'],
      icon: GraduationCap
    },
    {
      id: '02',
      method: 'Weekly DS Embedding',
      description: 'Constant collaboration with Principal Data Scientist',
      details: ['Model training logic', 'Evaluation metrics', 'Domain expertise transfer'],
      icon: UserCheck
    },
    {
      id: '03',
      method: 'AI-Accelerated Learning',
      description: 'Filled knowledge gaps in real-time',
      details: ['Concept clarification', 'Technical terminology', 'Quick domain ramp-up'],
      icon: Bot
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="rounded-2xl overflow-hidden border border-slate-200">
        {/* HEADER: Concise Challenge */}
        <div className="bg-[var(--accent-teal-50)] border-b border-[var(--accent-teal-200)] p-6">
          <span className="font-mono text-xs text-[var(--accent-teal-700)] uppercase tracking-widest">
            {'// CHALLENGE: ZERO_ML_KNOWLEDGE'}
          </span>
          <p className="mt-3 text-slate-700 text-lg leading-relaxed">
            I entered this project knowing nothing about machine learning. <strong className="text-slate-900">So I got obsessed.</strong>
          </p>
        </div>

        {/* BODY: 3 High-Impact Methods */}
        <div className="bg-white p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {methods.map((m, i) => {
              const IconComponent = m.icon
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="bg-slate-50 border border-slate-200 p-5 hover:border-[var(--accent-teal-300)] transition-colors rounded-xl"
                >
                  {/* Icon + ID */}
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="w-8 h-8 text-[var(--accent-teal)]" />
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                      {'// '}{m.id}
                    </span>
                  </div>

                  {/* Method Name */}
                  <h4 className="font-serif text-lg text-slate-900 mb-1">
                    {m.method}
                  </h4>

                  {/* Highlight Badge */}
                  {m.highlight && (
                    <span className="inline-block font-mono text-[10px] text-[var(--accent-teal)] bg-[var(--accent-teal-50)] px-2 py-1 mb-3 rounded-full">
                      {m.highlight}
                    </span>
                  )}

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {m.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-200">
                    {m.details.map((d, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span className="font-mono text-[10px] text-[var(--accent-teal)] mt-0.5 select-none">+</span>
                        <span className="text-xs text-slate-500 leading-relaxed">{d}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* FOOTER: Outcome */}
        <div className="bg-slate-900 p-5">
          <div className="font-mono text-sm">
            <span className="text-emerald-400">&gt; OUTCOME:</span>
            <p className="text-slate-300 mt-2 leading-relaxed">
              Within weeks, I could challenge technical assumptions, translate DS requirements into UX patterns, and earn the trust needed to redesign the entire workflow.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

