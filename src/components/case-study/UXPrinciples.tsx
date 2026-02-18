'use client'

import { motion } from 'framer-motion'
import { UXPrinciple } from '@/types/caseStudy'

interface UXPrinciplesProps {
  title?: string
  intro?: string
  principles: UXPrinciple[]
  isLightBackground?: boolean
  systemTag?: string // Optional custom system tag
}

export default function UXPrinciples({
  title = 'Design Principles Applied',
  intro,
  principles,
  isLightBackground = true,
  systemTag = 'UX_PRINCIPLES'
}: UXPrinciplesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-slate-400 text-xs tracking-widest uppercase">
          {'// '}{systemTag}
        </span>
      </div>

      <h3 className="text-slate-900 text-lg md:text-xl font-sans font-semibold mb-4">
        {title}
      </h3>

      {/* Compact Principles List */}
      <div className="flex flex-wrap gap-2">
        {principles.map((principle, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-full"
          >
            {principle.title}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
