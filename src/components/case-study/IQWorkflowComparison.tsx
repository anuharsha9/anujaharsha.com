'use client'

import { motion } from 'framer-motion'
import ImpactDiff from './ImpactDiff'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface IQWorkflowComparisonProps {
  isLightBackground?: boolean
}

interface ComparisonData {
  id: string
  title: string
  beforeLabel: string
  afterLabel: string
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  insight: string
}

export default function IQWorkflowComparison({ isLightBackground = false }: IQWorkflowComparisonProps) {
  const comparisons: ComparisonData[] = [
    {
      id: 'nlq',
      title: 'Natural Language Query (NLQ)',
      beforeLabel: 'CURRENT: PLUS_MENU → EXPLORE_DATA',
      afterLabel: 'IQ_PLUGIN: ONE_CLICK_ACCESS',
      beforeImage: '/images/case-study/iq-plugin/Explore Data _ NLQ _ Empty State Illustration 1.png',
      afterImage: '/images/case-study/iq-plugin/IQ - Ask a Question _ Data Selected 1.png',
      beforeAlt: 'Current NLQ - Buried in Plus Menu',
      afterAlt: 'IQ Plugin NLQ - Direct Access',
      insight: '2 clicks from Plus menu → 1 click from IQ Hub',
    },
    {
      id: 'insights',
      title: 'Automated Insights',
      beforeLabel: 'CURRENT: PLUS_MENU → INSIGHTS',
      afterLabel: 'IQ_PLUGIN: ONE_CLICK_ACCESS',
      beforeImage: '/images/case-study/iq-plugin/Insights - Results - Tile View 1.png',
      afterImage: '/images/case-study/iq-plugin/IQ - Insights - Tile View 1.png',
      beforeAlt: 'Current Insights - Standalone',
      afterAlt: 'IQ Plugin Insights - Unified Hub',
      insight: 'Same feature, now discoverable alongside NLQ and ML',
    },
    {
      id: 'ml',
      title: 'Machine Learning (Predict Data)',
      beforeLabel: 'CURRENT: REPORTING_SERVER → ML',
      afterLabel: 'IQ_PLUGIN: ONE_CLICK_ACCESS',
      beforeImage: '/images/case-study/ml-functions/1. Predict Data - Train Models - Empty State.png',
      afterImage: '/images/case-study/iq-plugin/IQ - Predict Data - Train Models - landing page - model tile view.png',
      beforeAlt: 'Current ML - Hidden in Reporting Server',
      afterAlt: 'IQ Plugin ML - Same Hub as NLQ and Insights',
      insight: 'Completely different context → Now lives with NLQ and Insights',
    },
  ]

  return (
    <div className={`w-full py-16 md:py-24 ${isLightBackground ? 'bg-white' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ComponentHeading
          variant="block"
          tag="// BEFORE_&_AFTER"
          title="Unifying Fragmented Workflows"
          description="Three features, three different entry points → One unified hub. Drag the slider to compare."
          color="teal"
          align="center"
          className="mb-16"
        />

        {/* Comparison Sliders */}
        <div className="space-y-20">
          {comparisons.map((comparison) => (
            <motion.div
              key={comparison.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Comparison Title & Metric */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
                <h4 className="text-2xl text-slate-900 font-light tracking-tight">
                  {comparison.title}
                </h4>
                <div className="flex items-center gap-3 text-sm font-medium text-[var(--accent-teal)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-teal)]" />
                  {comparison.insight}
                </div>
              </div>

              {/* The Styled Impact Slider */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <ImpactDiff
                  beforeImage={comparison.beforeImage}
                  afterImage={comparison.afterImage}
                  beforeLabel={comparison.beforeLabel}
                  afterLabel={comparison.afterLabel}
                  beforeAlt={comparison.beforeAlt}
                  afterAlt={comparison.afterAlt}
                  isLightBackground={true}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
