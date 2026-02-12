'use client'

import { motion } from 'framer-motion'
import { getTheme } from '@/lib/design-system'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface IQBusinessCaseProps {
  isLightBackground?: boolean
}

export default function IQBusinessCase({ isLightBackground = false }: IQBusinessCaseProps) {
  const t = getTheme(true) // Force light background

  const businessDrivers = [
    {
      tag: 'DRIVER_01: COMPETITIVE_PRESSURE',
      body: 'The BI market is moving fast toward AI/ML. WebFOCUS needed DSML as a first-class feature, not a hidden capability buried in menus.',
    },
    {
      tag: 'DRIVER_02: HUB_ADOPTION',
      body: 'Users weren\'t living in the Hub. IQ Plugin gives them a reason to—a single destination for all data science workflows.',
    },
    {
      tag: 'DRIVER_03: DSML_DISCOVERABILITY',
      body: 'NLQ, Insights, and ML existed but adoption was low. Users didn\'t know they were there. One-click access changes that.',
    },
  ]

  return (
    <div className="space-y-10">
      {/* Header */}
      <ComponentHeading
        variant="block"
        tag="// BUSINESS_CASE"
        title="Why Design A New Plugin?"
        description="The existing plugin was functional but created significant friction in the analyst workflow, leading to potential revenue loss."
        color="indigo"
        align="center"
        className="mb-12"
      />

      {/* The Split-Screen Visual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-200 overflow-hidden"
      >
        {/* Left Pane - The Problem */}
        <div className="bg-slate-50 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200">
          <div className="space-y-5">
            <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest">
              {'// THE_PROBLEM'}
            </span>
            <h4 className="text-slate-900 text-xl font-serif font-semibold">
              Scattered & Hidden
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              DSML capabilities existed but lived in <span className="font-semibold text-slate-900">different places</span> with different interaction patterns.
            </p>

            {/* Problem List */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-2">
                <span className="text-red-400 text-sm mt-0.5">×</span>
                <p className="text-slate-600 text-sm">NLQ & Insights buried in Plus menu (2+ clicks)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 text-sm mt-0.5">×</span>
                <p className="text-slate-600 text-sm">ML Functions in separate Reporting Server context</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 text-sm mt-0.5">×</span>
                <p className="text-slate-600 text-sm">No unified data selection across features</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 text-sm mt-0.5">×</span>
                <p className="text-slate-600 text-sm">Users didn&apos;t know these capabilities existed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - The Solution */}
        <div className="bg-white p-6 md:p-8">
          <div className="space-y-5">
            <span className="font-mono text-[10px] text-emerald-600 uppercase tracking-widest">
              {'// THE_SOLUTION'}
            </span>
            <h4 className="text-slate-900 text-xl font-serif font-semibold">
              Unified IQ Hub
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              One destination for all DSML. <span className="font-semibold text-slate-900">One click</span> from the Hub homepage.
            </p>

            {/* Solution List */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 text-sm mt-0.5">→</span>
                <p className="text-slate-600 text-sm">NLQ, Insights, and Predict Data in one place</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 text-sm mt-0.5">→</span>
                <p className="text-slate-600 text-sm">Unified dataset selection across all features</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 text-sm mt-0.5">→</span>
                <p className="text-slate-600 text-sm">Built-in tutorials, documentation, video guides</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500 text-sm mt-0.5">→</span>
                <p className="text-slate-600 text-sm">Consistent patterns: learn one, know them all</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Business Drivers Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block text-center">
          {'// BUSINESS_DRIVERS'}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {businessDrivers.map((driver, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="bg-white border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <span className="font-mono text-[10px] text-[var(--accent-violet)] uppercase tracking-widest block mb-3">
                &gt; {driver.tag}
              </span>
              <p className="text-slate-600 text-sm leading-relaxed">
                {driver.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Outcome Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-slate-900 p-6"
      >
        <div className="flex items-start gap-3">
          <span className="font-mono text-sm text-[var(--accent-violet)] flex-shrink-0">
            &gt; STRATEGIC_OUTCOME:
          </span>
          <p className="text-slate-300 text-sm leading-relaxed">
            Three features unified. One-click discoverability. <span className="text-[var(--accent-violet)] font-medium">A DSML hub</span> that
            positions WebFOCUS competitively in the AI-driven BI market. NLQ & Insights shipping now. ML Functions in 2026. IQ Plugin brings it all together in 2027.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

