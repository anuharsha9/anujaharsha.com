'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface MLPatternConnectionsProps {
  isLightBackground?: boolean
}

// SVG Icons for pattern schematics
const GuidedFlowIcon = () => (
  <svg aria-hidden="true" className="w-12 h-12 text-slate-400" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Connecting line */}
    <line x1="6" y1="24" x2="42" y2="24" />
    {/* Step 1 - filled */}
    <circle cx="6" cy="24" r="4" fill="currentColor" />
    {/* Step 2 - filled */}
    <circle cx="18" cy="24" r="4" fill="currentColor" />
    {/* Step 3 - filled */}
    <circle cx="30" cy="24" r="4" fill="currentColor" />
    {/* Step 4 - outline (current) */}
    <circle cx="42" cy="24" r="4" />
    {/* Labels */}
    <text x="6" y="36" fontSize="6" fill="currentColor" textAnchor="middle">1</text>
    <text x="18" y="36" fontSize="6" fill="currentColor" textAnchor="middle">2</text>
    <text x="30" y="36" fontSize="6" fill="currentColor" textAnchor="middle">3</text>
    <text x="42" y="36" fontSize="6" fill="currentColor" textAnchor="middle">4</text>
  </svg>
)

const ContextMenuIcon = () => (
  <svg aria-hidden="true" className="w-12 h-12 text-slate-400" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Background window */}
    <rect x="4" y="8" width="32" height="28" rx="2" />
    {/* Context menu overlay */}
    <rect x="16" y="16" width="28" height="24" rx="2" fill="currentColor" fillOpacity="0.1" />
    {/* Menu items */}
    <line x1="20" y1="22" x2="40" y2="22" strokeWidth="2" />
    <line x1="20" y1="28" x2="36" y2="28" />
    <line x1="20" y1="34" x2="38" y2="34" />
  </svg>
)

const PluginIcon = () => (
  <svg aria-hidden="true" className="w-12 h-12 text-slate-400" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Browser extension icon shape */}
    <rect x="8" y="8" width="32" height="32" rx="4" />
    {/* Plugin connector */}
    <rect x="16" y="4" width="16" height="8" rx="2" fill="currentColor" fillOpacity="0.1" />
    {/* Grid inside */}
    <rect x="14" y="18" width="8" height="8" rx="1" />
    <rect x="26" y="18" width="8" height="8" rx="1" />
    <rect x="14" y="28" width="8" height="8" rx="1" />
    <rect x="26" y="28" width="8" height="8" rx="1" />
  </svg>
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
    </div>
  )
}
