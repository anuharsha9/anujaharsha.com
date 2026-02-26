'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

// Types for different display modes
interface Competitor {
  name: string
  tag?: string
  headline?: string
  painPoints?: string[]
  note?: string
  // For matrix mode
  features?: Record<string, boolean>
}

interface OurSolution {
  name: string
  tag: string
  headline: string
  body?: string
  differentiators: string[]
  // For matrix mode
  features?: Record<string, boolean>
  note?: string
}

interface Insight {
  tag: string
  title?: string
  body: string
}

interface MarketAnalysisProps {
  // Header
  sectionTag?: string
  title: string
  subtitle?: string

  // Data
  competitors: Competitor[]
  ourSolution: OurSolution

  // For matrix mode
  featureColumns?: { key: string; label: string }[]

  // Footer insight
  insight?: Insight

  // Styling
  accentColor?: 'teal' | 'amber' | 'violet'
  displayMode?: 'cards' | 'matrix'
  isLightBackground?: boolean
}

export default function MarketAnalysis({
  sectionTag = 'MARKET_ANALYSIS',
  title,
  subtitle,
  competitors,
  ourSolution,
  featureColumns,
  insight,
  accentColor = 'teal',
  displayMode = 'cards',
  isLightBackground = true,
}: MarketAnalysisProps) {

  // Accent color classes — dark theme
  const accentClasses = {
    teal: {
      tag: 'text-[var(--accent-teal)]',
      border: 'border-[var(--accent-teal)]',
      bg: 'bg-[var(--accent-teal)]',
      bgLight: 'bg-teal-500/[0.06]',
      borderLight: 'border-teal-500/[0.15]',
      text: 'text-teal-400',
      textAccent: 'text-teal-400',
      check: 'text-emerald-400',
    },
    amber: {
      tag: 'text-amber-400',
      border: 'border-amber-500',
      bg: 'bg-amber-500',
      bgLight: 'bg-amber-500/[0.06]',
      borderLight: 'border-amber-500/[0.15]',
      text: 'text-amber-400',
      textAccent: 'text-amber-400',
      check: 'text-amber-400',
    },
    violet: {
      tag: 'text-violet-400',
      border: 'border-violet-500',
      bg: 'bg-violet-500',
      bgLight: 'bg-violet-500/[0.06]',
      borderLight: 'border-violet-500/[0.15]',
      text: 'text-violet-400',
      textAccent: 'text-violet-400',
      check: 'text-violet-400',
    },
  }

  const accent = accentClasses[accentColor]

  const CheckIcon = () => (
    <div className="flex justify-center">
      <Check className={`w-6 h-6 ${accent.check}`} strokeWidth={2.5} />
    </div>
  )

  const XIcon = () => (
    <div className="flex justify-center">
      <X className="w-5 h-5 text-white/[0.15]" strokeWidth={2} />
    </div>
  )

  return (
    <div className="space-y-12 py-8">
      {/* Header - Minimal & Clean */}
      <ComponentHeading
        variant="block"
        align="center"
        tag={sectionTag}
        title={title}
        description={subtitle}
        color={accentColor}
        className="max-w-3xl mx-auto"
      />

      {/* Content - Cards or Matrix */}
      {displayMode === 'cards' ? (
        /* Cards Layout */
        <div className="space-y-8">
          {/* Competitor Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitors.map((competitor, index) => (
              <motion.div
                key={competitor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/[0.03] rounded-2xl p-6 group hover:bg-white/[0.06] hover:shadow-lg hover:shadow-black/10 transition-all duration-300 border border-white/[0.06]"
              >
                <div className="space-y-4">
                  {competitor.tag && (
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold block">
                      {competitor.tag}
                    </span>
                  )}
                  <div>
                    <h4 className="text-[var(--text-heading)] text-lg font-medium group-hover:text-[var(--text-body)] transition-colors">
                      {competitor.name}
                    </h4>
                    {competitor.headline && (
                      <p className="text-[var(--text-muted)] text-xs mt-1 font-medium">{competitor.headline}</p>
                    )}
                  </div>
                  {competitor.painPoints && (
                    <ul className="space-y-2 pt-2">
                      {competitor.painPoints.slice(0, 3).map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-[var(--text-muted)] text-sm leading-snug">
                          <span className="text-red-400/60 mt-1 flex-shrink-0 text-xs">●</span>
                          <span className="font-light">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Our Solution Card - Prominent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`
              relative overflow-hidden rounded-3xl bg-white/[0.03] shadow-xl shadow-black/10 p-8 md:p-10
              border border-white/[0.06]
            `}
          >
            {/* Subtle background accent */}
            <div className={`absolute top-0 right-0 w-64 h-64 ${accent.bg} opacity-[0.03] rounded-bl-full pointer-events-none`} />

            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr] gap-8 md:gap-12 items-start relative z-10">
              {/* Left: Name & Headline */}
              <div className="space-y-4">
                <span className={`text-[10px] ${accent.textAccent} uppercase tracking-[0.2em] font-bold block`}>
                  {ourSolution.tag}
                </span>
                <div className="space-y-2">
                  <h4 className="text-[var(--text-heading)] text-2xl md:text-3xl font-light tracking-tight">
                    {ourSolution.name}
                  </h4>
                  <p className={`${accent.text} text-xl md:text-2xl font-medium tracking-tight`}>
                    {ourSolution.headline}
                  </p>
                </div>
                {ourSolution.body && (
                  <p className="text-[var(--text-body)] text-base leading-relaxed pt-2 font-light">
                    {ourSolution.body}
                  </p>
                )}
              </div>

              {/* Right: Differentiators Grid */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
                {ourSolution.differentiators.map((diff, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className={`mt-1 w-5 h-5 rounded-full ${accent.bgLight} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Check className={`w-3 h-3 ${accent.textAccent}`} strokeWidth={3} />
                    </div>
                    <span className="text-[var(--text-body)] text-base font-light">{diff}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        /* Matrix Layout (Clean & Open) */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-6 px-6 md:px-8 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] w-1/4">
                    Platform
                  </th>
                  {featureColumns?.map((col) => (
                    <th
                      key={col.key}
                      className="text-center py-6 px-4 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]"
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="text-left py-6 px-6 md:px-8 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] w-1/3">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Competitors */}
                {competitors.map((competitor, index) => (
                  <motion.tr
                    key={competitor.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="py-6 px-6 md:px-8">
                      <span className="font-medium text-[var(--text-heading)] text-base">{competitor.name}</span>
                    </td>
                    {featureColumns?.map((col) => (
                      <td key={col.key} className="py-6 px-4 text-center align-middle">
                        {competitor.features?.[col.key] ? <CheckIcon /> : <XIcon />}
                      </td>
                    ))}
                    <td className="py-6 px-6 md:px-8">
                      <span className="text-sm text-[var(--text-muted)] font-light leading-relaxed">{competitor.note}</span>
                    </td>
                  </motion.tr>
                ))}
                {/* Our Solution Row - Highlighted */}
                <motion.tr
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: competitors.length * 0.1 }}
                  className={`${accent.bgLight} relative border-t border-white/[0.06]`}
                >
                  <td className="py-8 px-6 md:px-8 relative">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent.bg} rounded-r`} />
                    <span className={`font-semibold text-lg ${accent.text} tracking-tight block`}>{ourSolution.name}</span>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mt-1 block">Your Solution</span>
                  </td>
                  {featureColumns?.map((col) => (
                    <td key={col.key} className="py-8 px-4 text-center align-middle">
                      {ourSolution.features?.[col.key] ? <CheckIcon /> : <XIcon />}
                    </td>
                  ))}
                  <td className="py-8 px-6 md:px-8">
                    <span className={`text-sm ${accent.textAccent} font-medium leading-relaxed`}>{ourSolution.note}</span>
                  </td>
                </motion.tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Insight Footer - Clean Block */}
      {insight && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center max-w-4xl mx-auto space-y-4"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${accent.bgLight} border ${accent.borderLight}`}>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${accent.textAccent}`}>
              {insight.tag.replace('// ', '')}
            </span>
          </div>

          <h4 className="text-2xl font-light text-[var(--text-heading)] leading-tight">
            {insight.title || insight.body}
          </h4>

          {insight.title && (
            <p className="text-[var(--text-body)] text-base leading-relaxed font-light">
              {insight.body}
            </p>
          )}
        </motion.div>
      )}
    </div>
  )
}
