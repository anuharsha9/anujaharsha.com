'use client'

import { motion } from 'framer-motion'
import { GraduationCap, UserCheck, Bot } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import TerminalInsight from './TerminalInsight'

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
      className="w-full max-w-5xl mx-auto space-y-12"
    >
      {/* Intro Block - Open */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-mono text-xs text-[var(--accent-teal-700)] uppercase tracking-widest block">
          {'// CHALLENGE: ZERO_ML_KNOWLEDGE'}
        </span>
        <h3 className="text-2xl md:text-3xl font-light text-slate-900 leading-tight">
          I entered this project knowing nothing about machine learning. <strong className="font-medium">So I got obsessed.</strong>
        </h3>
      </div>

      {/* Methods - Open Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {methods.map((m, i) => {
          const IconComponent = m.icon
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group"
            >
              {/* Icon */}
              <div className="mb-6 relative">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--accent-teal-50)] text-[var(--accent-teal)] group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <span className="absolute -top-3 -right-3 font-mono text-[10px] text-slate-300 opacity-50">
                  {m.id}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h4 className="font-sans text-xl text-slate-900 leading-snug">
                  {m.method}
                </h4>

                {m.highlight && (
                  <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-medium text-slate-600 uppercase tracking-wider mb-1">
                    {m.highlight}
                  </span>
                )}

                <p className="text-slate-600 text-sm leading-relaxed">
                  {m.description}
                </p>

                {/* Open List with simple markers */}
                <ul className="space-y-2 pt-2">
                  {m.details.map((d, j) => (
                    <li key={j} className="text-slate-500 text-xs flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-[var(--accent-teal)] mt-1.5 flex-shrink-0"></span>
                      <span className="leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Outcome - Apple Terminal Style */}
      <div className="w-full mt-12">
        <TerminalInsight
          title="outcome_log.txt"
        >
          <div className="text-sm">
            <span className="text-emerald-400 font-bold mr-2">&gt;</span>
            <span className="text-emerald-400 font-bold">RESULT:</span> Within weeks, I could challenge technical assumptions, translate DS requirements into UX patterns, and earn the trust needed to redesign the entire workflow.
          </div>
        </TerminalInsight>
      </div>
    </motion.div>
  )
}
