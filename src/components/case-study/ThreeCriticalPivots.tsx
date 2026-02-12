'use client'

import { motion } from 'framer-motion'
import { Layers, LayoutGrid, CreditCard } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'
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
            <div className="w-8 h-4 bg-red-200 border border-red-300 flex items-center justify-center">
              <span className="text-[6px] text-red-600 font-mono">ALL</span>
            </div>
          </div>
        ),
        after: (
          <div className="flex gap-1">
            <div className="w-6 h-4 bg-teal-200 border border-teal-300 flex items-center justify-center">
              <span className="text-[6px] text-teal-700 font-mono">T</span>
            </div>
            <div className="w-6 h-4 bg-blue-200 border border-blue-300 flex items-center justify-center">
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
            <div className="w-4 h-4 bg-red-200 border border-red-300"></div>
            <div className="w-1 h-px bg-red-300"></div>
            <div className="w-4 h-4 bg-red-200 border border-red-300"></div>
            <div className="w-1 h-px bg-red-300"></div>
            <div className="w-4 h-4 bg-red-200 border border-red-300"></div>
          </div>
        ),
        after: (
          <div className="flex items-center">
            <div className="w-10 h-5 bg-teal-200 border border-teal-300 flex items-center justify-center">
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
            <div className="w-12 h-1.5 bg-red-200 border border-red-300"></div>
            <div className="w-12 h-1.5 bg-red-200 border border-red-300"></div>
            <div className="w-12 h-1.5 bg-red-200 border border-red-300"></div>
          </div>
        ),
        after: (
          <div className="flex gap-1">
            <div className="w-4 h-5 bg-teal-200 border border-teal-300"></div>
            <div className="w-4 h-5 bg-teal-200 border border-teal-300"></div>
            <div className="w-4 h-5 bg-teal-200 border border-teal-300"></div>
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
        className="space-y-3"
      >
        <ComponentHeading
          variant="block"
          tag="// DESIGN_PIVOTS"
          title="Three Critical Design Pivots"
          description="The mapping revealed the problems, but solving them required multiple iterations."
          color="slate"
          align="center"
          className="mb-0"
        />
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
              className="bg-white border border-slate-200 p-8 flex flex-col rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-3xl font-bold text-slate-200">{p.number}</span>
                <div className="w-px h-8 bg-slate-100"></div>
                <h4 className="font-serif text-xl text-slate-900">{p.title}</h4>
              </div>

              {/* Transformation Flow */}
              <div className="space-y-4 mb-6 relative">
                {/* Vertical connector line if needed, but keeping it simple */}

                {/* Before */}
                <div className="relative pl-6 border-l-2 border-slate-200">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-200 border-2 border-white"></span>
                  <p className="text-slate-500 text-sm leading-relaxed line-through decoration-slate-300 decoration-1">{p.before}</p>
                </div>

                {/* After */}
                <div className="relative pl-6 border-l-2 border-[var(--accent-teal)]">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--accent-teal)] border-2 border-white shadow-sm"></span>
                  <p className="text-slate-900 text-base font-medium leading-relaxed">{p.after}</p>
                </div>
              </div>

              {/* Rationale */}
              <div className="mt-auto pt-4 border-t border-slate-100">
                <p className="text-slate-600 text-xs italic leading-relaxed">
                  &quot;{p.reason}&quot;
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-[#1D1D20] rounded-xl overflow-hidden shadow-lg border border-white/10 font-mono"
      >
        {/* Terminal Header */}
        <div className="bg-[#2D2D30] px-4 py-2 flex gap-2 items-center border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          <span className="ml-2 text-[10px] text-slate-500 font-sans">pivot_analysis.log</span>
        </div>

        {/* Content */}
        <div className="p-6 text-slate-300 text-sm leading-relaxed font-mono">
          <span className="text-emerald-400 font-bold mr-2">&gt;</span>
          These pivots weren&apos;t just UX decisions — they were <span className="text-emerald-400 font-medium">architectural choices</span> that simplified implementation. The structured flow emerged from asking:
          <span className="block mt-2 pl-4 text-emerald-300">"What do you absolutely need?" → Problem Type + Target + Predictors + Params.</span>
        </div>
      </motion.div>
    </div>
  )
}
