'use client'

import { motion } from 'framer-motion'
import { Unplug, ArrowDown, Link2, Layers } from 'lucide-react'
import { getTheme } from '@/lib/design-system'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface IQPluginArchitectureProps {
  isLightBackground?: boolean
}

export default function IQPluginArchitecture({ isLightBackground = true }: IQPluginArchitectureProps) {
  const t = getTheme(true) // Force light background

  const siloFeatures = [
    { id: 'insights', title: 'Automated Insights', status: 'Isolated Codebase' },
    { id: 'nlq', title: 'Natural Language Query', status: 'Separate Entry Point' },
    { id: 'predict', title: 'Predict Data', status: 'Different Shell' },
  ]

  const unifiedFeatures = [
    { id: 'insights', title: 'Insights', description: 'Pattern surfacing' },
    { id: 'nlq', title: 'Ask a Question', description: 'Natural language interface' },
    { id: 'predict', title: 'Predict Data', description: 'ML workflows' },
    { id: 'discover', title: 'Discover', description: 'Onboarding & tutorials' },
  ]

  return (
    <div className="bg-[var(--bg-light)]">
      <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12">
        {/* System Convergence Diagram */}
        <div className="bg-slate-50/50 border border-slate-200 p-8 md:p-12 space-y-12">

          {/* Header */}
          <ComponentHeading
            tag="// SYSTEM_CONVERGENCE"
            title="From Silos to Platform"
            description="Three fragmented tools converged into one unified architecture."
            color="text-[var(--accent-teal)]"
            align="center"
            className="mb-8 text-center items-center"
          />

          {/* PART A: THE LEGACY STATE (The Silos) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-red-600 text-[10px] uppercase tracking-widest">
                {'// STATE_01: FRAGMENTED_SILOS'}
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 md:gap-8">
              {siloFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-1 max-w-[200px]"
                >
                  <div className="bg-white border-l-4 border-l-red-200 border border-dashed border-slate-200 p-4 md:p-6 opacity-75 text-center">
                    <div className={`${t.text} text-sm md:text-base font-semibold mb-1`}>
                      {feature.title}
                    </div>
                    <div className={`${t.textMuted} text-[10px] font-mono uppercase tracking-wider`}>
                      {feature.status}
                    </div>
                  </div>

                  {/* Disconnect Icon between cards */}
                  {index < siloFeatures.length - 1 && (
                    <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2">
                      <Unplug className="w-4 h-4 text-red-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* PART B: THE ACTION (The Converge) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center py-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-slate-300"></div>
              <ArrowDown className="w-8 h-8 text-slate-400" />
              <div className="h-px w-12 bg-slate-300"></div>
            </div>
            <span className="font-mono text-slate-400 text-[10px] uppercase tracking-widest">
              ↓ ARCHITECTURAL_UNIFICATION
            </span>
          </motion.div>

          {/* PART C: THE TARGET STATE (The Unified Hub) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-emerald-600 text-[10px] uppercase tracking-widest">
                {'// STATE_02: UNIFIED_PLATFORM'}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white border-2 border-emerald-200 shadow-xl overflow-hidden"
            >
              {/* Header Bar */}
              <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <span className={`${t.text} font-semibold`}>WebFOCUS IQ Plugin</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-600 uppercase tracking-widest">
                  UNIFIED_ENTRY_POINT
                </span>
              </div>

              {/* Integrated Modules */}
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {unifiedFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="bg-emerald-50/50 border border-emerald-100 p-4 text-center hover:bg-emerald-50 transition-colors"
                    >
                      <Link2 className="w-4 h-4 text-emerald-500 mx-auto mb-2" />
                      <div className={`${t.text} text-sm font-semibold`}>{feature.title}</div>
                      <div className={`${t.textMuted} text-[10px] mt-1`}>{feature.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Outcome Note */}
          <div className="text-center pt-4">
            <p className={`${t.textMuted} text-sm italic`}>
              One plugin. One mental model. Four capabilities. Zero context switching.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
