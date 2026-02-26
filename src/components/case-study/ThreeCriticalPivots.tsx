'use client'

import { motion } from 'framer-motion'
import { Layers, LayoutGrid, CreditCard } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface ThreeCriticalPivotsProps {
  isLightBackground?: boolean
}

interface Pivot {
  number: string
  title: string
  icon: LucideIcon
  before: string
  after: string
  reason: string
  schematic?: {
    before: React.ReactNode
    after: React.ReactNode
  }
}

export default function ThreeCriticalPivots({ isLightBackground = false }: ThreeCriticalPivotsProps) {
  const pivots: Pivot[] = [
    {
      number: '01',
      title: 'Split Train vs Run',
      icon: Layers,
      before: 'Unified Train+Run experience mixing two mental models',
      after: 'Separate tabs for distinct mental models: Create vs Apply',
      reason: 'We were mixing two different mental models — creating models vs applying them. Splitting them simplified both UX and implementation.',
      schematic: {
        before: (
          <div className="flex gap-1">
            <div className="w-8 h-4 bg-red-200 rounded-sm border border-red-300 flex items-center justify-center">
              <span className="text-[6px] text-red-600 font-mono">ALL</span>
            </div>
          </div>
        ),
        after: (
          <div className="flex gap-1">
            <div className="w-6 h-4 bg-teal-200 rounded-sm border border-teal-300 flex items-center justify-center">
              <span className="text-[6px] text-teal-700 font-mono">T</span>
            </div>
            <div className="w-6 h-4 bg-blue-200 rounded-sm border border-blue-300 flex items-center justify-center">
              <span className="text-[6px] text-blue-700 font-mono">R</span>
            </div>
          </div>
        ),
      }
    },
    {
      number: '02',
      title: 'Remove Data Flow from ML UI',
      icon: LayoutGrid,
      before: 'Engineering wanted data flow visible inside ML UI',
      after: 'Data flow accessible elsewhere, ML UI stays focused',
      reason: 'After training models hundreds of times myself, I concluded the data flow was adding noise and risking users losing progress.',
      schematic: {
        before: (
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 bg-red-200 rounded-sm border border-red-300"></div>
            <div className="w-1 h-px bg-red-300"></div>
            <div className="w-4 h-4 bg-red-200 rounded-sm border border-red-300"></div>
            <div className="w-1 h-px bg-red-300"></div>
            <div className="w-4 h-4 bg-red-200 rounded-sm border border-red-300"></div>
          </div>
        ),
        after: (
          <div className="flex items-center">
            <div className="w-10 h-5 bg-teal-200 rounded-sm border border-teal-300 flex items-center justify-center">
              <span className="text-[6px] text-teal-700 font-mono">ML</span>
            </div>
          </div>
        ),
      }
    },
    {
      number: '03',
      title: 'Model Cards vs Tables',
      icon: CreditCard,
      before: 'Legacy UI used tables for everything, including models',
      after: 'Model cards for better scanning and comparison',
      reason: 'Despite initial pushback, cards became the primary way to choose a model, with tables reserved for dense tabular data like training logs.',
      schematic: {
        before: (
          <div className="space-y-0.5">
            <div className="w-12 h-1.5 bg-red-200 rounded-sm border border-red-300"></div>
            <div className="w-12 h-1.5 bg-red-200 rounded-sm border border-red-300"></div>
            <div className="w-12 h-1.5 bg-red-200 rounded-sm border border-red-300"></div>
          </div>
        ),
        after: (
          <div className="flex gap-1">
            <div className="w-4 h-5 bg-teal-200 rounded-sm border border-teal-300"></div>
            <div className="w-4 h-5 bg-teal-200 rounded-sm border border-teal-300"></div>
            <div className="w-4 h-5 bg-teal-200 rounded-sm border border-teal-300"></div>
          </div>
        ),
      }
    },
  ]

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-3"
      >
        <span className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest">
          DESIGN PIVOTS
        </span>
        <h3 className="font-sans text-[var(--text-heading)] text-2xl md:text-3xl">
          Three Critical Design Pivots
        </h3>
        <p className="text-[var(--text-muted)] text-base max-w-2xl mx-auto">
          The mapping revealed the problems, but solving them required multiple iterations.
        </p>
      </motion.div>

      {/* 3-Column Pivot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pivots.map((p, i) => {
          const IconComponent = p.icon
          return (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-2xl font-bold text-amber-500">{p.number}</span>
                <div>
                  <h4 className="font-sans text-lg text-[var(--text-heading)]">{p.title}</h4>
                </div>
              </div>

              {/* Before Block - Legacy Pattern */}
              <div className="bg-red-500/[0.06] border-l-2 border-red-400/40 p-3 mb-3 rounded-r-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest">
                    LEGACY PATTERN
                  </span>
                  {p.schematic && (
                    <div className="opacity-70">{p.schematic.before}</div>
                  )}
                </div>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{p.before}</p>
              </div>

              {/* After Block - New Architecture */}
              <div className="bg-teal-500/[0.06] border-l-2 border-teal-400/40 p-3 mb-5 rounded-r-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-teal-400 uppercase tracking-widest">
                    NEW ARCHITECTURE
                  </span>
                  {p.schematic && (
                    <div>{p.schematic.after}</div>
                  )}
                </div>
                <p className="text-[var(--text-body)] text-sm font-medium leading-relaxed">{p.after}</p>
              </div>

              {/* Rationale Footer - Code Comment Style */}
              <div className="mt-auto pt-4 border-t border-white/[0.06]">
                <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed">
                  <span className="text-[var(--text-muted)]">RATIONALE:</span> {p.reason}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Summary Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest flex-shrink-0">
            {'// BREAKTHROUGH'}
          </span>
          <p className="text-slate-300 text-sm leading-relaxed">
            These pivots weren&apos;t just UX decisions — they were <span className="text-emerald-400 font-medium">architectural choices</span> that simplified implementation while improving user experience. The structured guided flow emerged from our domain expert&apos;s answer to
            <span className="text-emerald-400 font-medium"> &quot;What do you absolutely need?&quot;</span> → problem type, target, predictors, hyperparameters.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
