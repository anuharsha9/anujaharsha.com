'use client'

import { motion } from 'framer-motion'
import { ArrowRight, AlertCircle } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import TerminalInsight from './TerminalInsight'

interface MLWorkflowMappingProps {
  isLightBackground?: boolean
}

export default function MLWorkflowMapping({ isLightBackground = false }: MLWorkflowMappingProps) {
  const mappedAreas = [
    {
      area: 'Data Selection',
      items: ['How users selected data', 'Data flow integration', 'Dataset compatibility']
    },
    {
      area: 'Training Configuration',
      items: ['How they configured training', 'Hyperparameter access', 'Model type selection']
    },
    {
      area: 'Model Execution',
      items: ['How models ran (or failed)', 'Tiny toolbar play icon', 'Hidden execution states']
    },
    {
      area: 'Results Interpretation',
      items: ['How results were interpreted', 'Confusing error messages', 'Unclear model outputs']
    },
  ]

  const coreProblems = [
    'Technical language everywhere',
    'Fragmented flows across screens',
    'No guidance for non-experts',
    'Hidden states and errors',
    'No WebFOCUS integration',
  ]

  return (
    <div className="space-y-8">
      {/* Section Header */}
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <ComponentHeading
          variant="block"
          align="center"
          tag="WORKFLOW MAPPING"
          title="Mapping the Existing Black-Box Workflow"
          description="I documented every workflow step, every user decision point, and every place where users got stuck."
          color="teal"
          className="mb-8"
        />
      </motion.div>

      {/* 4-Step Flow with Connectors */}
      <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">
        {mappedAreas.map((a, i) => (
          <div key={i} className="flex items-center flex-1">
            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex-1 bg-white/[0.03] border border-white/[0.06] p-5 hover:border-teal-400 transition-colors rounded-xl"
            >
              <div className="space-y-4">
                {/* Step Number - Monospace Index */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-bold text-teal-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="font-sans text-lg text-[var(--text-heading)]">{a.area}</h4>
                </div>

                {/* Items List */}
                <ul className="space-y-2">
                  {a.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="font-mono text-teal-500 text-xs mt-0.5">&gt;</span>
                      <span className="text-[var(--text-body)] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Arrow Connector (not after last card) */}
            {i < mappedAreas.length - 1 && (
              <div className="hidden lg:flex items-center justify-center px-3">
                <ArrowRight className="w-6 h-6 text-white/[0.15]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Core Problems - System Error Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
          <span className="w-2 h-2 bg-red-500"></span>
          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
            CORE_PROBLEMS_IDENTIFIED
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {coreProblems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
              className="bg-red-500/[0.06] border border-red-500/[0.15] px-3 py-2 flex items-center gap-2 rounded-full"
            >
              <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              <span className="text-red-400 font-mono text-xs">{p}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Insight Footer */}
      <div className="w-full">
        <TerminalInsight
          title="system_insight.log"
          insightLabel="Insight:"
        >
          <div className="flex items-start gap-3">
            <span className="font-mono text-emerald-400 flex-shrink-0 mt-0.5">$</span>
            <p>
              The core problem wasn&apos;t the algorithm—it was the <span className="text-white">fragmented workflow</span>. Users didn&apos;t know *where* to start or *how* to finish without error.
            </p>
          </div>
        </TerminalInsight>
      </div>
    </div>
  )
}
