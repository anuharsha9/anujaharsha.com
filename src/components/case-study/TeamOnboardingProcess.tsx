'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface TeamOnboardingProcessProps {
  isLightBackground?: boolean
}

export default function TeamOnboardingProcess({ isLightBackground = true }: TeamOnboardingProcessProps) {
  // Stakeholder clusters organized by function
  const stakeholderClusters = [
    {
      header: 'ENGINEERING',
      items: ['Lead Architect', 'Lead Engineer', 'Engineering Squad'],
    },
    {
      header: 'PRODUCT_STRATEGY',
      items: ['New PM', 'Leadership', 'SMEs'],
    },
    {
      header: 'QUALITY_&_SUPPORT',
      items: ['QA Team', 'Documentation', 'Support'],
    },
  ]

  const activities = [
    { phase: 'Discovery', items: ['Dozens of demos (old vs new)', 'Legacy quirks walkthroughs', 'Failure logic explanations'] },
    { phase: 'Alignment', items: ['IA & structural decisions', 'Interactive prototypes', 'Workflow documentation'] },
    { phase: 'Execution', items: ['Mediate engineer conflicts', 'Edge case documentation', 'Team handoff'] },
  ]

  // Arrow component for process flow
  const ProcessArrow = () => (
    <div className="hidden md:flex items-center justify-center">
      <svg aria-hidden="true" className="w-8 h-8 text-[var(--border-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </div>
  )

  return (
    <div className="space-y-12 py-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ComponentHeading
          variant="block"
          align="center"
          tag="// PROCESS: KNOWLEDGE_TRANSFER"
          title="Team Onboarding"
          description="I created a comprehensive onboarding guide that reduced the ramp-up time for new designers from 3 weeks to 3 days."
          color="teal"
          className="mb-8"
        />
      </motion.div>

      {/* Stakeholder Clusters - 3 Columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4 justify-center opacity-40">
          <div className="h-px w-12 bg-slate-200"></div>
          <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
            Cross-Functional Reach
          </span>
          <div className="h-px w-12 bg-slate-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stakeholderClusters.map((cluster, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
              className="space-y-3"
            >
              {/* Cluster Header */}
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest">
                  {`// ${cluster.header}`}
                </span>
              </div>

              {/* Cluster Items */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {cluster.items.map((item, j) => (
                  <motion.div
                    key={j}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-teal-200 hover:text-teal-700 hover:bg-teal-50 hover:shadow-sm transition-all duration-200 rounded-lg"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Onboarding Activities - Process Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-8"
      >
        <div className="text-center">
          <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block mb-2">
            {'// PROCESS_FLOW'}
          </span>
          <h4 className="text-slate-900 text-xl font-serif">
            Onboarding Activities
          </h4>
        </div>

        {/* Process Flow with Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          {activities.map((a, i) => (
            <Fragment key={`activity-${i}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200 p-6 hover:shadow-lg hover:border-teal-200 transition-all duration-300 rounded-2xl h-full flex flex-col"
              >
                <div className="space-y-4 flex-1">
                  {/* Phase Header */}
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-2">
                    <div className="w-6 h-6 flex items-center justify-center text-white font-mono text-xs font-bold bg-slate-900 rounded">
                      {i + 1}
                    </div>
                    <h5 className="text-slate-900 font-serif font-semibold">{a.phase}</h5>
                  </div>

                  {/* Items */}
                  <ul className="space-y-3">
                    {a.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-teal-400 font-mono text-xs mt-1 flex-shrink-0">→</span>
                        <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Arrow between cards (not after the last one) */}
              {i < activities.length - 1 && <ProcessArrow />}
            </Fragment>
          ))}
        </div>
      </motion.div>

      {/* Result Block - Dark Theme Card (Modern Terminal Style) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-[#1D1D20] p-6 md:p-8 rounded-xl relative overflow-hidden shadow-2xl border border-white/10 max-w-4xl mx-auto font-mono"
      >
        {/* Terminal Header */}
        <div className="flex gap-2 mb-6 opacity-50 relative z-20">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>

        {/* Content */}
        <div className="relative z-10 pl-2">
          <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span>➜</span>
            <span>{'// TRANSFORMATION_RESULT'}</span>
          </div>
          <p className="text-white text-base md:text-lg leading-relaxed font-sans">
            Engineers who initially intimidated me became collaborators I respected — and who respected me.
            <span className="text-slate-400 block mt-2 text-sm font-light">
              The documentation work gave me context to contribute meaningfully in cross-functional discussions.
            </span>
          </p>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
      </motion.div>
    </div>
  )
}
