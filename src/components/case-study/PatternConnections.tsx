'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ComponentHeading from '@/components/ui/ComponentHeading'
import TerminalInsight from './TerminalInsight'
import { AppWindow, ListOrdered, PanelLeft } from 'lucide-react'

interface PatternConnectionsProps {
  isLightBackground?: boolean
}

// Icon components using Lucide
const ModalFlowIcon = () => (
  <div className="text-slate-400">
    <AppWindow className="w-12 h-12" strokeWidth={1.5} />
  </div>
)

const StepperIcon = () => (
  <div className="text-slate-400">
    <ListOrdered className="w-12 h-12" strokeWidth={1.5} />
  </div>
)

const FilterViewIcon = () => (
  <div className="text-slate-400">
    <PanelLeft className="w-12 h-12" strokeWidth={1.5} />
  </div>
)

export default function PatternConnections({ isLightBackground = true }: PatternConnectionsProps) {
  const patterns = [
    {
      id: 'modal',
      patternName: 'MODAL_CREATION_FLOW',
      Icon: ModalFlowIcon,
      description: 'Unified creation via global + menu. Replaced multi-page wizards with focused modal workflows.',
      origin: 'ReportCaster',
      reusedIn: null,
      link: null,
    },
    {
      id: 'stepper',
      patternName: 'GUIDED_STEPPER_UI',
      Icon: StepperIcon,
      description: 'Step-by-step model training. Complex workflows broken into digestible phases with clear progress.',
      origin: 'ReportCaster',
      reusedIn: 'ML Functions',
      link: '/work/ml-functions',
    },
    {
      id: 'filter',
      patternName: 'EXPLORER_FILTER_VIEW',
      Icon: FilterViewIcon,
      description: 'Asset filtering approach. Sidebar-driven navigation for browsing large data collections.',
      origin: 'ReportCaster',
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ComponentHeading
          variant="block"
          align="center"
          tag="// PATTERN_LIBRARY"
          title="Patterns That Became Reusable"
          description="Architectural patterns that scaled across multiple enterprise products."
          color="teal"
          className="mb-12"
        />
      </motion.div>

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
          insightLabel="SYSTEM_EFFICIENCY"
        >
          <div className="text-sm">
            <p className="text-slate-300 mt-2 leading-relaxed font-sans">
              These weren&apos;t just one-off solutions — they became reusable patterns for handling enterprise complexity across multiple products. Design once, deploy everywhere.
            </p>
          </div>
        </TerminalInsight>
      </div>
    </div>
  )
}
