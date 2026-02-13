'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ComponentHeading from '@/components/ui/ComponentHeading'
import TerminalInsight from './TerminalInsight'

interface IQPatternConnectionsProps {
  isLightBackground?: boolean
}

// SVG Icons for pattern schematics
const UnifiedHubIcon = () => (
  <svg aria-hidden="true" className="w-12 h-12 text-slate-400" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Central hub */}
    <circle cx="24" cy="24" r="8" fill="currentColor" fillOpacity="0.1" />
    {/* Connecting spokes */}
    <line x1="24" y1="16" x2="24" y2="6" />
    <line x1="24" y1="32" x2="24" y2="42" />
    <line x1="16" y1="24" x2="6" y2="24" />
    <line x1="32" y1="24" x2="42" y2="24" />
    {/* Outer nodes - NLQ, Insights, ML */}
    <circle cx="24" cy="6" r="4" />
    <circle cx="24" cy="42" r="4" />
    <circle cx="6" cy="24" r="4" />
    <circle cx="42" cy="24" r="4" fill="currentColor" fillOpacity="0.3" />
  </svg>
)

const DatasetSelectionIcon = () => (
  <svg aria-hidden="true" className="w-12 h-12 text-slate-400" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Database icon */}
    <ellipse cx="24" cy="12" rx="16" ry="6" />
    <path d="M8 12v12c0 3.3 7.2 6 16 6s16-2.7 16-6V12" />
    <path d="M8 24v12c0 3.3 7.2 6 16 6s16-2.7 16-6V24" />
    {/* Selection indicator */}
    <circle cx="38" cy="36" r="6" fill="currentColor" fillOpacity="0.2" />
    <path d="M35 36l2 2 4-4" strokeWidth="2" />
  </svg>
)

const ResponsiveUIIcon = () => (
  <svg aria-hidden="true" className="w-12 h-12 text-slate-400" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Desktop frame */}
    <rect x="4" y="8" width="24" height="16" rx="2" />
    <line x1="4" y1="20" x2="28" y2="20" />
    {/* Tablet frame */}
    <rect x="30" y="12" width="14" height="20" rx="2" />
    <line x1="30" y1="28" x2="44" y2="28" />
    {/* Mobile indicator */}
    <rect x="16" y="30" width="8" height="14" rx="1" fill="currentColor" fillOpacity="0.1" />
    <circle cx="20" cy="41" r="1.5" fill="currentColor" />
  </svg>
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
        className="bg-slate-50 border border-slate-200 p-8 h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-[var(--accent-violet)]/30 transition-all duration-300 group rounded-2xl"
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
        <p className="text-slate-600 text-sm leading-relaxed flex-1">
          {pattern.description}
        </p>

        {/* Origin/Reuse Tag */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          {'inheritsFrom' in pattern && pattern.inheritsFrom ? (
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs text-slate-500">
                Pattern from: <span className="font-bold text-slate-900">{pattern.inheritsFrom}</span>
              </span>
              <span className="font-sans text-xs text-[var(--accent-violet)] font-medium">
                → Extended in: IQ Plugin
              </span>
            </div>
          ) : (
            <span className="font-sans text-xs text-slate-500">
              Origin: <span className="font-bold text-slate-900">{pattern.origin}</span>
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
        {/* Header */}
        <ComponentHeading
          tag="// PATTERN_LIBRARY"
          title="Patterns That Became Reusable"
          description="Architectural patterns that brought NLQ, Insights, and ML under one roof."
          color="slate"
          align="center"
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

