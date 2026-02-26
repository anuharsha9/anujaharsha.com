'use client'

import { motion } from 'framer-motion'
import { getTheme } from '@/lib/design-system'
import ComponentHeading from '@/components/ui/ComponentHeading'
import { ArrowRight, X } from 'lucide-react'

interface IQBusinessCaseProps {
  isLightBackground?: boolean
}

export default function IQBusinessCase({ isLightBackground = false }: IQBusinessCaseProps) {
  const t = getTheme(true)

  const businessDrivers = [
    {
      tag: 'COMPETITIVE_PRESSURE',
      body: 'The BI market is moving fast toward AI/ML. WebFOCUS needed DSML as a first-class feature, not a hidden capability buried in menus.',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/[0.06]',
      border: 'border-indigo-500/[0.15]'
    },
    {
      tag: 'HUB_ADOPTION',
      body: 'Users weren\'t living in the Hub. IQ Plugin gives them a reason to—a single destination for all data science workflows.',
      color: 'text-violet-400',
      bg: 'bg-violet-500/[0.06]',
      border: 'border-violet-500/[0.15]'
    },
    {
      tag: 'DSML_DISCOVERABILITY',
      body: 'NLQ, Insights, and ML existed but adoption was low. Users didn\'t know they were there. One-click access changes that.',
      color: 'text-fuchsia-400',
      bg: 'bg-fuchsia-500/[0.06]',
      border: 'border-fuchsia-500/[0.15]'
    },
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <ComponentHeading
        variant="block"
        align="center"
        tag="BUSINESS CASE"
        title="Why Design A New Plugin?"
        description="The existing plugin was functional but created significant friction in the analyst workflow, leading to potential revenue loss."
        color="teal"
        className="mb-12"
      />

      {/* The Split-Screen Visual - Clean Rounded Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/[0.03] rounded-3xl shadow-xl shadow-black/10 border border-white/[0.06] overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Pane - The Problem */}
        <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/[0.06] relative group">
          {/* Decorative Red Line/Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="space-y-6">
            <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest bg-red-500/[0.06] px-2 py-1 rounded-md inline-block">
              {'//'} THE_PROBLEM
            </span>
            <div className="space-y-2">
              <h4 className="text-2xl md:text-3xl font-sans text-[var(--text-heading)] leading-tight">
                Scattered & Hidden
              </h4>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                DSML capabilities existed but lived in <span className="font-medium text-[var(--text-heading)]">different places</span> with different patterns.
              </p>
            </div>

            {/* Problem List */}
            <div className="space-y-4 pt-2">
              {[
                "NLQ & Insights buried in Plus menu (2+ clicks)",
                "ML Functions in separate Reporting Server context",
                "No unified data selection across features",
                "Users didn't know these capabilities existed"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 group/item">
                  <div className="w-5 h-5 rounded-full bg-red-500/[0.06] flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-red-500/[0.12] transition-colors">
                    <X className="w-3 h-3 text-red-500" />
                  </div>
                  <p className="text-[var(--text-body)] text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane - The Solution */}
        <div className="flex-1 p-8 md:p-12 relative group">
          {/* Decorative Green Line/Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="space-y-6">
            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest bg-emerald-500/[0.06] px-2 py-1 rounded-md inline-block">
              {'//'} THE_SOLUTION
            </span>
            <div className="space-y-2">
              <h4 className="text-2xl md:text-3xl font-sans text-[var(--text-heading)] leading-tight">
                Unified IQ Hub
              </h4>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                One destination for all DSML. <span className="font-medium text-[var(--text-heading)]">One click</span> from the Hub homepage.
              </p>
            </div>

            {/* Solution List */}
            <div className="space-y-4 pt-2">
              {[
                "NLQ, Insights, and Predict Data in one place",
                "Unified dataset selection across all features",
                "Built-in tutorials, documentation, video guides",
                "Consistent patterns: learn one, know them all"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 group/item">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/[0.06] flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-emerald-500/[0.12] transition-colors">
                    <ArrowRight className="w-3 h-3 text-emerald-500" />
                  </div>
                  <p className="text-[var(--text-body)] text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Business Drivers Grid */}
      <div className="space-y-6">
        <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block text-center">
          {'//'} BUSINESS_DRIVERS
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {businessDrivers.map((driver, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="bg-white/[0.03] rounded-2xl p-7 border border-white/[0.06] shadow-sm hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`inline-block px-2 py-1 rounded mb-4 ${driver.bg}`}>
                <span className={`font-mono text-[10px] uppercase tracking-widest ${driver.color}`}>
                  &gt; {driver.tag}
                </span>
              </div>
              <p className="text-[var(--text-body)] text-sm leading-relaxed">
                {driver.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Outcome Footer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-[var(--surface-panel-dark)] rounded-2xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-violet-500" />
        <div className="flex flex-col md:flex-row items-start gap-4 relative z-10">
          <span className="font-mono text-xs text-indigo-400 flex-shrink-0 mt-1 uppercase tracking-widest">
            &gt; STRATEGIC_OUTCOME:
          </span>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            Three features unified. One-click discoverability. <span className="text-white font-medium">A DSML hub</span> that
            positions WebFOCUS competitively in the AI-driven BI market. NLQ & Insights shipping now. ML Functions in 2026. IQ Plugin brings it all together in 2027.
          </p>
        </div>
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(var(--tone-indigo-500) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
      </motion.div>
    </div>
  )
}

