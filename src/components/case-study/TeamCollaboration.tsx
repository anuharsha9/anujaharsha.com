'use client'

import { motion } from 'framer-motion'
import { Users, MessageSquare, FileText, Presentation, GitBranch, UserPlus } from 'lucide-react'

export interface CollaborationItem {
  title: string
  items: string[]
}

export interface TeamCollaborationData {
  sectionTag: string
  title: string
  subtitle: string
  columns: CollaborationItem[]
  highlight?: {
    label: string
    text: string
  }
}

interface TeamCollaborationProps {
  data: TeamCollaborationData
  accentColor?: 'teal' | 'amber' | 'violet'
}

const iconMap: Record<number, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  0: Users,
  1: MessageSquare,
  2: FileText,
  3: Presentation,
  4: GitBranch,
  5: UserPlus,
}

import ComponentHeading from '@/components/ui/ComponentHeading'

export default function TeamCollaboration({ data, accentColor = 'teal' }: TeamCollaborationProps) {
  const { sectionTag, title, subtitle, columns, highlight } = data

  const accentClasses = {
    teal: {
      tag: 'text-[var(--accent-teal)]',
      border: 'border-[var(--accent-teal)]',
      bg: 'bg-[var(--accent-teal-50)]',
      text: 'text-[var(--accent-teal)]',
    },
    amber: {
      tag: 'text-amber-600',
      border: 'border-amber-500',
      bg: 'bg-amber-50',
      text: 'text-amber-600',
    },
    violet: {
      tag: 'text-violet-600',
      border: 'border-violet-500',
      bg: 'bg-violet-50',
      text: 'text-violet-600',
    },
  }

  const accent = accentClasses[accentColor]

  return (
    <div className="space-y-8">
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
          tag={`// ${sectionTag}`}
          title={title}
          description={subtitle}
          className="mb-8"
          color={accentColor === 'violet' ? 'indigo' : accentColor}
        />
      </motion.div>

      {/* Grid of Collaboration Areas */}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${columns.length === 3 ? 'lg:grid-cols-3' : columns.length >= 4 ? 'lg:grid-cols-4' : ''} gap-6`}>
        {columns.map((column, i) => {
          const IconComponent = iconMap[i % 6]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="bg-white border border-slate-200 p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-300 rounded-2xl group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${accent.bg} flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-5 h-5 ${accent.text}`} strokeWidth={1.5} />
                </div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-slate-500 font-bold">
                  {column.title}
                </h4>
              </div>
              <ul className="space-y-3">
                {column.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                    <span className={`mt-1.5 w-1 h-1 rounded-full ${accent.bg === 'bg-amber-50' ? 'bg-amber-400' : 'bg-teal-400'}`}></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      {/* Highlight/Quote */}
      {highlight && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`${accent.bg} border ${accent.border} p-6 md:p-8 rounded-2xl shadow-sm`}
        >
          <p className={`font-mono text-xs uppercase tracking-widest ${accent.tag} mb-3 flex items-center gap-2`}>
            <span>★</span> {highlight.label}
          </p>
          <p className="text-slate-800 text-sm md:text-base leading-relaxed italic font-medium">
            &ldquo;{highlight.text}&rdquo;
          </p>
        </motion.div>
      )}
    </div>
  )
}

