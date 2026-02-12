'use client'

import { motion } from 'framer-motion'

interface VitalSignItem {
  label: string
  value: string
  context: string
  color?: string // Optional color override
}

interface VitalSignsProps {
  metrics: VitalSignItem[]
  className?: string
}

export default function VitalSigns({ metrics, className = '' }: VitalSignsProps) {
  // Split metrics into rows of 4
  const row1 = metrics.slice(0, 4)
  const row2 = metrics.slice(4, 8)
  const hasSecondRow = row2.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`w-full border-y border-slate-200 ${className}`}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Desktop: 4 columns with dividers, 2 rows if needed */}
        <div className="hidden lg:block">
          {/* Row 1 */}
          <div className="grid grid-cols-4 divide-x divide-slate-200">
            {row1.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="py-6 px-5 text-center"
              >
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-1.5">
                  {`// ${metric.label}`}
                </div>
                <div className={`text-2xl xl:text-3xl font-serif font-semibold ${metric.color || 'text-[var(--accent-teal)]'}`}>
                  {metric.value}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {metric.context}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Row 2 */}
          {hasSecondRow && (
            <div className="grid grid-cols-4 divide-x divide-slate-200 border-t border-slate-200">
              {row2.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="py-6 px-5 text-center"
                >
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-1.5">
                    {`// ${metric.label}`}
                  </div>
                  <div className={`text-2xl xl:text-3xl font-serif font-semibold ${metric.color || 'text-[var(--accent-teal)]'}`}>
                    {metric.value}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {metric.context}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Tablet: 2x2 or 2x4 grid */}
        <div className="hidden sm:block lg:hidden">
          <div className="grid grid-cols-2 divide-x divide-slate-200">
            {row1.slice(0, 2).map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="py-5 px-4 text-center"
              >
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-1.5">
                  {`// ${metric.label}`}
                </div>
                <div className={`text-xl font-serif font-semibold ${metric.color || 'text-[var(--accent-teal)]'}`}>
                  {metric.value}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {metric.context}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200">
            {row1.slice(2, 4).map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 + index * 0.1 }}
                className="py-5 px-4 text-center"
              >
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-1.5">
                  {`// ${metric.label}`}
                </div>
                <div className={`text-xl font-serif font-semibold ${metric.color || 'text-[var(--accent-teal)]'}`}>
                  {metric.value}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {metric.context}
                </div>
              </motion.div>
            ))}
          </div>
          {hasSecondRow && (
            <>
              <div className="grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200">
                {row2.slice(0, 2).map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="py-5 px-4 text-center"
                  >
                    <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-1.5">
                      {`// ${metric.label}`}
                    </div>
                    <div className={`text-xl font-serif font-semibold ${metric.color || 'text-[var(--accent-teal)]'}`}>
                      {metric.value}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {metric.context}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200">
                {row2.slice(2, 4).map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.55 + index * 0.1 }}
                    className="py-5 px-4 text-center"
                  >
                    <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-1.5">
                      {`// ${metric.label}`}
                    </div>
                    <div className={`text-xl font-serif font-semibold ${metric.color || 'text-[var(--accent-teal)]'}`}>
                      {metric.value}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {metric.context}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Mobile: Stacked 2-column grid */}
        <div className="sm:hidden">
          <div className="grid grid-cols-2 divide-x divide-slate-200">
            {metrics.slice(0, 2).map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="py-4 px-3 text-center"
              >
                <div className="font-mono text-[8px] uppercase tracking-widest text-slate-400 mb-1">
                  {`// ${metric.label}`}
                </div>
                <div className={`text-lg font-serif font-semibold ${metric.color || 'text-[var(--accent-teal)]'}`}>
                  {metric.value}
                </div>
                <div className="text-[9px] text-slate-500 mt-0.5">
                  {metric.context}
                </div>
              </motion.div>
            ))}
          </div>
          {metrics.length > 2 && (
            <div className="grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200">
              {metrics.slice(2, 4).map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + index * 0.05 }}
                  className="py-4 px-3 text-center"
                >
                  <div className="font-mono text-[8px] uppercase tracking-widest text-slate-400 mb-1">
                    {`// ${metric.label}`}
                  </div>
                  <div className={`text-lg font-serif font-semibold ${metric.color || 'text-[var(--accent-teal)]'}`}>
                    {metric.value}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">
                    {metric.context}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          {metrics.length > 4 && (
            <>
              <div className="grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200">
                {metrics.slice(4, 6).map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="py-4 px-3 text-center"
                  >
                    <div className="font-mono text-[8px] uppercase tracking-widest text-slate-400 mb-1">
                      {`// ${metric.label}`}
                    </div>
                    <div className={`text-lg font-serif font-semibold ${metric.color || 'text-[var(--accent-teal)]'}`}>
                      {metric.value}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-0.5">
                      {metric.context}
                    </div>
                  </motion.div>
                ))}
              </div>
              {metrics.length > 6 && (
                <div className="grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200">
                  {metrics.slice(6, 8).map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.55 + index * 0.05 }}
                      className="py-4 px-3 text-center"
                    >
                      <div className="font-mono text-[8px] uppercase tracking-widest text-slate-400 mb-1">
                        {`// ${metric.label}`}
                      </div>
                      <div className={`text-lg font-serif font-semibold ${metric.color || 'text-[var(--accent-teal)]'}`}>
                        {metric.value}
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5">
                        {metric.context}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Pre-configured metrics for ML Functions case study
export const mlFunctionsVitalSigns = [
  // Row 1 - Primary Metrics
  {
    label: 'WORKFLOW',
    value: '12→4',
    context: 'Steps simplified',
    color: 'text-[var(--accent-teal)]',
  },
  {
    label: 'ENTRY_POINT',
    value: '2 clicks',
    context: 'Right-click → Predict',
  },
  {
    label: 'DEAD_ENDS',
    value: 'Zero',
    context: 'Eliminated in testing',
    color: 'text-[var(--accent-teal)]',
  },
  {
    label: 'VALIDATION',
    value: 'SME+Eng',
    context: 'Reviewed & validated',
  },
]

// Pre-configured metrics for ReportCaster case study
export const reportCasterVitalSigns = [
  {
    label: 'LEGACY_SYSTEM',
    value: '50yr',
    context: 'Modernized',
  },
  {
    label: 'SCALE',
    value: '20M+',
    context: 'Schedules supported weekly',
  },
  {
    label: 'COMPLEXITY',
    value: '5 → 1',
    context: 'Unified system',
    color: 'text-[var(--accent-teal)]',
  },
  {
    label: 'EFFICIENCY',
    value: '4 → 2',
    context: 'Clicks to create',
    color: 'text-[var(--accent-teal)]',
  },
]

// Pre-configured metrics for IQ Plugin case study
export const iqPluginVitalSigns = [
  {
    label: 'WORKFLOWS_OWNED',
    value: '3',
    context: 'NLQ + Insights + DSML Hub',
  },
  {
    label: 'PATTERN_PARITY',
    value: 'Full',
    context: 'Same Structure Across All 3',
    color: 'text-[var(--accent-teal)]',
  },
  {
    label: 'RESPONSIVE',
    value: '2 of 3',
    context: 'NLQ + Insights Fully Responsive',
  },
  {
    label: 'PERSONAS',
    value: '2 + 2',
    context: 'Created 2, Inherited 2',
  },
]

