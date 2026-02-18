'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ComponentHeading from '@/components/ui/ComponentHeading'
import TerminalInsight from './TerminalInsight'
import { ListOrdered, MousePointer2, Puzzle } from 'lucide-react'

interface MLPatternConnectionsProps {
  isLightBackground?: boolean
}

// Icon components using Lucide
const GuidedFlowIcon = () => (
  <div className="text-slate-400">
    <ListOrdered className="w-12 h-12" strokeWidth={1.5} />
  </div>
)

const ContextMenuIcon = () => (
  <div className="text-slate-400">
    <MousePointer2 className="w-12 h-12" strokeWidth={1.5} />
  </div>
)

const PluginIcon = () => (
  <div className="text-slate-400">
    <Puzzle className="w-12 h-12" strokeWidth={1.5} />
  </div>
)

export default function MLPatternConnections({ isLightBackground = false }: MLPatternConnectionsProps) {
  const patterns = [
    {
      id: 'guided',
      patternName: 'GUIDED_STEPPER_UI',
      Icon: GuidedFlowIcon,
      description: '4-step progressive disclosure. Complex ML workflows broken into digestible phases with clear progress.',
      origin: 'ML Functions',
      reusedIn: null,
      link: null,
    },
    {
      id: 'context',
      patternName: 'CONTEXT_ENTRY_POINTS',
      Icon: ContextMenuIcon,
      description: 'Right-click access from Hub. Natural platform integration for workflow initiation.',
      origin: 'ML Functions',
      reusedIn: 'ReportCaster',
      link: '/work/reportcaster',
    },
    {
      id: 'plugin',
      patternName: 'UNIFIED_TOOL_HUB',
      Icon: PluginIcon,
      description: '4-step flow pattern became foundation for broader DSML ecosystem.',
      origin: 'ML Functions',
      reusedIn: 'IQ Plugin',
      link: '/work/iq-plugin',
    },
  ]

  const PatternCard = ({ pattern, index }: { pattern: typeof patterns[0], index: number }) => {
    const content = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-slate-50 border border-slate-200 p-8 h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-[var(--accent-teal)]/30 transition-all duration-300 group rounded-2xl"
      >
        {/* Schematic Icon */}
        <div className="mb-6">
          <pattern.Icon />
        </div>

        {/* Pattern Name (Hero) */}
        <h4 className="font-mono text-sm uppercase tracking-widest text-[var(--accent-teal)] mb-3 break-words hyphens-auto">
          {pattern.patternName}
        </h4>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed flex-1">
          {pattern.description}
        </p>

        {/* Origin/Reuse Tag */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          {pattern.reusedIn ? (
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs text-slate-500">
                Origin: <span className="font-bold text-slate-900">{pattern.origin}</span>
              </span>
              <span className="font-sans text-xs text-[var(--accent-teal)] font-medium">
                → Reused in: {pattern.reusedIn}
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
        <ComponentHeading
          variant="block"
          tag="// PATTERN_LIBRARY"
          title="Patterns That Became Reusable"
          description="Architectural patterns from ML Functions that scaled across the WebFOCUS ecosystem."
          color="teal"
          align="center"
          className="mb-8"
        />

        {/* Pattern Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {patterns.map((pattern, index) => (
            <PatternCard key={pattern.id} pattern={pattern} index={index} />
          ))}
        </div>

        {/* System Efficiency Footer - Premium Terminal Style */}
        <div className="w-full">
          <TerminalInsight
            title="system_architecture.json"
          >
            <div className="text-sm">
              <span className="text-emerald-400 font-bold">&gt; SYSTEM_EFFICIENCY:</span>
              <p className="text-slate-300 mt-2 leading-relaxed font-sans text-base">
                These weren&apos;t just one-off solutions — they became reusable patterns for handling enterprise complexity across multiple products. Design once, deploy everywhere.
              </p>
            </div>
          </TerminalInsight>
        </div>
      </div>
    </div>
  )
}
