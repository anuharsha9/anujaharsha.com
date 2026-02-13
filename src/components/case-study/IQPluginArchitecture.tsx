'use client'

import { motion } from 'framer-motion'
import { Terminal, Command, Layout, Layers, ArrowRight, Sparkles } from 'lucide-react'
import { getTheme } from '@/lib/design-system'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface IQPluginArchitectureProps {
  isLightBackground?: boolean
}

export default function IQPluginArchitecture({ isLightBackground = true }: IQPluginArchitectureProps) {
  const t = getTheme(true)

  const terminalFeatures = [
    { id: 'insights', title: 'INSIGHTS_EXE', command: './init_insights --legacy', status: 'Process_ID: 8021' },
    { id: 'nlq', title: 'NLQ_QUERY', command: './run_query --stand-alone', status: 'Process_ID: 4402' },
    { id: 'predict', title: 'ML_ENGINE', command: './train_model --v1', status: 'Process_ID: 1193' },
  ]

  const unifiedFeatures = [
    { id: 'insights', title: 'Insights', icon: Layout, desc: 'Pattern Recognition' },
    { id: 'nlq', title: 'Ask AI', icon: Sparkles, desc: 'Natural Language' },
    { id: 'predict', title: 'Predictions', icon: Layers, desc: 'AutoML Hub' },
  ]

  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-24">

        {/* Background Decorative Mesh - Cleaned up */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-50/30 to-transparent rounded-full blur-3xl -z-10" />

        <ComponentHeading
          tag="// EVOLUTION"
          title="From Disparate Tools to Unified Platform"
          description="Transforming independent utilities into a cohesive, integrated ecosystem."
          color="text-[var(--accent-teal)]"
          align="center"
          className="mb-20 text-center items-center"
        />

        <div className="grid lg:grid-cols-[1fr,auto,1fr] gap-8 md:gap-16 items-center relative max-w-6xl mx-auto">

          {/* STATE 01: TERMINAL SILOS */}
          <div className="space-y-6 relative group">
            <div className="text-center">
              <span className="font-mono text-slate-400 text-[10px] uppercase tracking-widest px-2 py-1">
                  // ORIGIN: DISJOINTED_CLI
              </span>
            </div>
            <div className="space-y-4 relative z-10">
              {terminalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-[#1e1e1e] rounded-xl p-5 font-mono text-xs shadow-xl shadow-slate-200/50 relative overflow-hidden ring-1 ring-black/5"
                >
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between mb-4 pb-0 border-b-0 border-white/5 opacity-50">
                    <span className="text-slate-500 font-bold tracking-tight text-[10px]">{feature.title}</span>
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    </div>
                  </div>
                  {/* Terminal Body */}
                  <div className="space-y-2">
                    <div className="text-emerald-400/90 flex gap-2 text-sm">
                      <span className="text-emerald-600 select-none">$</span>
                      {feature.command}
                    </div>
                    <div className="text-slate-600 text-[10px]">{feature.status}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Connector Lines (Visual Only) */}
            <div className="absolute top-1/2 -right-8 lg:-right-16 w-8 lg:w-16 h-px border-t border-dashed border-slate-200 hidden lg:block" />
          </div>

          {/* TRANSITION ARROW */}
          <div className="flex justify-center py-8 lg:py-0 relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-4 bg-white rounded-full border border-slate-100 shadow-xl text-slate-300"
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </div>

          {/* STATE 02: UNIFIED UI PLATFORM */}
          <div className="space-y-6 relative">
            <div className="text-center">
              <span className="font-mono text-emerald-600 text-[10px] uppercase tracking-widest px-2 py-1">
                  // TARGET: UNIFIED_ECOSYSTEM
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl shadow-slate-200/40 border border-slate-100/60 overflow-hidden transform transition-transform hover:scale-[1.01] duration-500 ring-1 ring-slate-900/5"
            >
              {/* Window Header */}
              <div className="bg-white border-b border-slate-50 px-5 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="text-[10px] font-medium text-slate-300 tracking-wide uppercase">IQ Plugin</div>
                <div className="w-12" /> {/* Spacer */}
              </div>

              {/* Content */}
              <div className="p-8 grid gap-6">
                {/* Hero Card */}
                <div className="bg-gradient-to-br from-emerald-50/50 to-white rounded-2xl p-6 border border-emerald-50/50 flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Welcome back, Anuja</h4>
                    <p className="text-xs text-slate-500 mt-1">3 insights available today</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-emerald-100/50 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {unifiedFeatures.map((feature) => (
                    <div key={feature.id + '-unified'} className="bg-slate-50/50 rounded-2xl p-5 hover:bg-emerald-50/30 transition-all cursor-pointer group">
                      <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 transition-colors group-hover:scale-110 duration-300">
                        <feature.icon className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      <div className="text-xs font-bold text-slate-800">{feature.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{feature.desc}</div>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}
