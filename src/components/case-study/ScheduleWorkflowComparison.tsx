'use client'

import { motion } from 'framer-motion'
import { MousePointer2, Layers, ArrowRight, ExternalLink } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'


interface ScheduleWorkflowComparisonProps {
  isLightBackground?: boolean
}

export default function ScheduleWorkflowComparison({ isLightBackground = true }: ScheduleWorkflowComparisonProps) {
  const scheduleWorkflow = {
    old: [
      { step: 'Go into hub', clicks: 1 },
      { step: 'Navigate to workspaces', clicks: 1 },
      { step: 'Click plus content button', clicks: 1 },
      { step: 'Drill down in context menu', clicks: 1 },
      { step: 'Select create schedule', clicks: 1 },
      { step: 'Scheduler opens in new tab', clicks: 0, isNewTab: true },
    ],
    new: [
      { step: '+ menu → Create Schedule', clicks: 2 },
      { step: 'Configure (task, distribution, recurrence) — same context', clicks: 0, isNote: true },
    ],
  }

  // Positions for "chaotic" step cards on the left
  const chaosPositions = [
    { rotate: -2, x: -5, y: 0 },
    { rotate: 1.5, x: 8, y: 2 },
    { rotate: -1, x: -3, y: -1 },
    { rotate: 2, x: 5, y: 3 },
    { rotate: -1.5, x: -8, y: 1 },
    { rotate: 3, x: 10, y: -2 },
  ]

  return (
    <div className="py-12">
      <div className="space-y-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ComponentHeading
            variant="block"
            tag="// CORE_WORKFLOW"
            title="Schedule Creation: 5+ Clicks vs 2 Clicks"
            description="The old path required 5+ clicks and a context-switching new tab. The new modal is accessible in 2 clicks directly from the Hub."
            align="center"
            color="slate"
          />
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

          {/* BEFORE: Chaotic Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-[10px] uppercase tracking-widest font-bold border border-rose-100">
                Fragmented
              </span>
              <div className="text-rose-900/40 font-mono text-sm">
                5+ clicks to dialog
              </div>
            </div>

            {/* Chaotic Steps Container */}
            <div className="relative min-h-[460px] bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden p-8">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '20px 20px' }}>
              </div>

              {/* Steps */}
              <div className="relative flex flex-col items-center justify-center h-full pt-4">
                {scheduleWorkflow.old.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9, rotate: chaosPositions[idx]?.rotate || 0 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: chaosPositions[idx]?.rotate || 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                    style={{
                      transform: `translateX(${chaosPositions[idx]?.x || 0}px) translateY(${chaosPositions[idx]?.y || 0}px)`,
                    }}
                    className={`
                      w-full max-w-sm relative mb-3 p-4 rounded-xl shadow-sm border backdrop-blur-sm transition-all duration-300
                      ${item.isNewTab ? 'bg-amber-50/90 border-amber-200/60' : 'bg-white/90 border-slate-200/60'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm
                        ${item.isNewTab ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}
                      `}>
                        {item.isNewTab ? <ExternalLink className="w-3 h-3" /> : idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${item.isNewTab ? 'text-amber-900' : 'text-slate-600'}`}>
                          {item.step}
                        </p>
                      </div>

                      {item.clicks > 0 && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                          <MousePointer2 className="w-3 h-3" /> +{item.clicks}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 italic">
              Result: Context switching fatigue & high cognitive load
            </p>
          </motion.div>

          {/* AFTER: Clean Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-blue-100 pb-3">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] uppercase tracking-widest font-bold border border-blue-100">
                Unified
              </span>
              <div className="text-blue-900/40 font-mono text-sm">
                2 clicks total
              </div>
            </div>

            {/* Clean Steps Container */}
            <div className="relative min-h-[460px] bg-blue-50/30 rounded-2xl border border-blue-100/50 p-8 flex flex-col justify-center">
              <div className="space-y-6">

                {/* Step 1: Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-blue-100 group hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Action</span>
                    </div>
                    <span className="text-xs font-mono text-blue-400 flex items-center gap-1">
                      <MousePointer2 className="w-3 h-3" /> 2 clicks
                    </span>
                  </div>
                  <p className="text-lg text-slate-900 font-medium">
                    + Menu <ArrowRight className="inline w-4 h-4 text-blue-300 mx-1" /> Create Schedule
                  </p>
                </motion.div>

                {/* Step 2: Context */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/60 rounded-xl p-6 border-2 border-dashed border-blue-100/60"
                >
                  <div className="flex items-center gap-2 mb-2 opacity-60">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold">2</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Context</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed">
                    Configure (task, distribution, recurrence) — <span className="text-slate-700 font-medium font-sans italic">happens in same context</span>
                  </p>
                </motion.div>

              </div>

              {/* Floating Benefit Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring" }}
                className="mt-8 bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-center justify-center gap-2 text-emerald-700 text-sm"
              >
                <Layers className="w-4 h-4" />
                <span>Zero context switching required</span>
              </motion.div>
            </div>
            <p className="text-center text-xs text-emerald-600/60 font-medium">
              Result: Streamlined flow & retained focus
            </p>
          </motion.div>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="inline-flex divide-x divide-slate-100 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="px-8 py-4 flex flex-col items-center">
              <span className="text-3xl font-light text-slate-900">60%</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">Faster Entry</span>
            </div>
            <div className="px-8 py-4 flex flex-col items-center bg-emerald-50/30">
              <span className="text-3xl font-light text-emerald-600">0</span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-600/60 font-bold mt-1">New Tabs</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
