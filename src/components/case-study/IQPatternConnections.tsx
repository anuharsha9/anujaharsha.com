'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ComponentHeading from '@/components/ui/ComponentHeading'
import TerminalInsight from './TerminalInsight'
import { Network, Database, MonitorSmartphone } from 'lucide-react'

interface IQPatternConnectionsProps {
  isLightBackground?: boolean
}

// Icon components using Lucide
const UnifiedHubIcon = () => (
  <div className="text-[var(--text-muted)]">
    <Network className="w-12 h-12" strokeWidth={1.5} />
  </div>
)

const DatasetSelectionIcon = () => (
  <div className="text-[var(--text-muted)]">
    <Database className="w-12 h-12" strokeWidth={1.5} />
  </div>
)

const ResponsiveUIIcon = () => (
  <div className="text-[var(--text-muted)]">
    <MonitorSmartphone className="w-12 h-12" strokeWidth={1.5} />
  </div>
)

export default function IQPatternConnections({ isLightBackground = false }: IQPatternConnectionsProps) {
  const patterns = [
    {
      id: 'unified-hub',
      patternName: 'UNIFIED_DSML_HUB',
      Icon: UnifiedHubIcon,
      description: 'Single entry point for 3 disparate analytics workflows. One-click access replaces multi-step navigation across different platform areas.',
      origin: 'IQ Plugin',
      reusedIn: null,
      link: null,
    },
    {
      id: 'dataset-selection',
      patternName: 'CONTEXTUAL_DATA_SELECTION',
      Icon: DatasetSelectionIcon,
      description: 'Universal dataset picker shared across NLQ, Insights, and ML. Select once, explore across all three tools.',
      origin: 'ML Functions',
      inheritsFrom: 'ML Functions',
      link: '/work/ml-functions',
    },
    {
      id: 'responsive',
      patternName: 'RESPONSIVE_WORKFLOW_UI',
      Icon: ResponsiveUIIcon,
      description: 'Pattern parity across all 3 workflows. Same interaction model, same visual language, all fully responsive.',
      origin: 'IQ Plugin',
      reusedIn: null,
      link: null,
    },
  ]

  const PatternCard = ({ pattern, index }: { pattern: typeof patterns[0], index: number }) => {
    const content = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white/[0.03] border border-white/[0.06] p-8 h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 hover:border-[var(--accent-violet)]/30 transition-all duration-300 group rounded-2xl"
      >
        {/* Schematic Icon */}
        <div className="mb-6">
          <pattern.Icon />
        </div>

        {/* Pattern Name (Hero) */}
        <h4 className="font-mono text-sm uppercase tracking-widest text-[var(--accent-violet)] mb-3 break-words hyphens-auto">
          {pattern.patternName}
        </h4>

        {/* Description */}
        <p className="text-[var(--text-body)] text-sm leading-relaxed flex-1">
          {pattern.description}
        </p>

        {/* Origin/Reuse Tag */}
        <div className="mt-6 pt-4 border-t border-white/[0.06]">
          {'inheritsFrom' in pattern && pattern.inheritsFrom ? (
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs text-[var(--text-muted)]">
                Pattern from: <span className="font-bold text-[var(--text-heading)]">{pattern.inheritsFrom}</span>
              </span>
              <span className="font-sans text-xs text-[var(--accent-violet)] font-medium">
                → Extended in: IQ Plugin
              </span>
            </div>
          ) : (
            <span className="font-sans text-xs text-[var(--text-muted)]">
              Origin: <span className="font-bold text-[var(--text-heading)]">{pattern.origin}</span>
            </span>
          )}
        </div>
      </motion.div>
    )

    if (pattern.link) {
      return (
        <Link href={pattern.link} className="block h-full">
          {content}
        </Link>
      )
    }

    return content
  }

  return (
    <div className="space-y-12">
      <div className="space-y-12">

        {/* Header */}
        <ComponentHeading
          align="center"
          tag="PATTERN LIBRARY"
          title="Patterns That Became Reusable"
          description="Architectural patterns that brought NLQ, Insights, and ML under one roof."
          color="teal"
          className="mb-12"
        />

        {/* Pattern Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {patterns.map((pattern, index) => (
            <PatternCard key={pattern.id} pattern={pattern} index={index} />
          ))}
        </div>

        {/* System Efficiency Footer - Terminal Style */}
        <div className="w-full">
          <TerminalInsight
            title="system_efficiency.log"
          >
            <div className="text-sm">
              <span className="text-purple-400 font-bold">&gt; SYSTEM_EFFICIENCY:</span>
              <p className="text-slate-300 mt-2 leading-relaxed font-sans">
                The IQ Plugin isn&apos;t just a feature — it&apos;s the foundation for how WebFOCUS approaches DSML capabilities. One hub, three engines, infinite possibilities.
              </p>
            </div>
          </TerminalInsight>
        </div>
      </div>
    </div>
  )
}
