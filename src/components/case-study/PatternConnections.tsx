'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface PatternConnectionsProps {
  isLightBackground?: boolean
}

// SVG Icons for pattern schematics
const ModalFlowIcon = () => (
  <svg aria-hidden="true" className="w-12 h-12 text-slate-400" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Outer rectangle (background) */}
    <rect x="4" y="8" width="40" height="32" rx="2" />
    {/* Inner modal rectangle (centered overlay) */}
    <rect x="12" y="14" width="24" height="20" rx="2" fill="currentColor" fillOpacity="0.1" />
    {/* Modal header line */}
    <line x1="14" y1="18" x2="34" y2="18" strokeWidth="2" />
    {/* Modal content lines */}
    <line x1="14" y1="24" x2="30" y2="24" />
    <line x1="14" y1="28" x2="26" y2="28" />
  </svg>
)

const StepperIcon = () => (
  <svg aria-hidden="true" className="w-12 h-12 text-slate-400" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Connecting line */}
    <line x1="8" y1="24" x2="40" y2="24" />
    {/* Step 1 - filled */}
    <circle cx="8" cy="24" r="5" fill="currentColor" />
    {/* Step 2 - filled */}
    <circle cx="24" cy="24" r="5" fill="currentColor" />
    {/* Step 3 - outline */}
    <circle cx="40" cy="24" r="5" />
    {/* Step numbers as small circles with text simulated by position */}
    <circle cx="8" cy="36" r="3" fill="currentColor" fillOpacity="0.3" />
    <circle cx="24" cy="36" r="3" fill="currentColor" fillOpacity="0.3" />
    <circle cx="40" cy="36" r="3" fill="currentColor" fillOpacity="0.3" />
  </svg>
)

const FilterViewIcon = () => (
  <svg aria-hidden="true" className="w-12 h-12 text-slate-400" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Main container */}
    <rect x="4" y="8" width="40" height="32" rx="2" />
    {/* Sidebar */}
    <rect x="4" y="8" width="12" height="32" rx="2" fill="currentColor" fillOpacity="0.1" />
    {/* Sidebar filter items */}
    <line x1="7" y1="14" x2="13" y2="14" strokeWidth="2" />
    <line x1="7" y1="20" x2="13" y2="20" />
    <line x1="7" y1="26" x2="13" y2="26" />
    {/* Content grid */}
    <rect x="20" y="14" width="8" height="8" rx="1" />
    <rect x="32" y="14" width="8" height="8" rx="1" />
    <rect x="20" y="26" width="8" height="8" rx="1" />
    <rect x="32" y="26" width="8" height="8" rx="1" />
  </svg>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-[#1D1D20] p-6 rounded-xl shadow-lg border border-white/10 max-w-4xl mx-auto font-mono"
      >
        {/* Terminal Header */}
        <div className="flex gap-2 mb-4 opacity-50">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>

        <div className="text-sm">
          <span className="text-emerald-400">&gt; SYSTEM_EFFICIENCY:</span>
          <p className="text-slate-300 mt-2 leading-relaxed font-sans">
            These weren&apos;t just one-off solutions — they became reusable patterns for handling enterprise complexity across multiple products. Design once, deploy everywhere.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
