'use client'

import { motion } from 'framer-motion'
import { Users, MessageSquare, FileText, Presentation, GitBranch, UserPlus } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

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

export default function TeamCollaboration({ data, accentColor = 'teal' }: TeamCollaborationProps) {
  if (!data) return null;

  const { sectionTag, title, subtitle, columns, highlight } = data

  const accentClasses = {
    teal: {
      text: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-100',
      marker: 'bg-teal-400',
    },
    amber: {
      text: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      marker: 'bg-amber-400',
    },
    violet: {
      text: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100',
      marker: 'bg-violet-400',
    },
  }

  const accent = accentClasses[accentColor] || accentClasses['teal']

  return (
    <div className="w-full py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">

        {/* Header */}
        <ComponentHeading
          tag={`// ${sectionTag}`}
          title={title}
          description={subtitle}
          color={accentColor === 'violet' ? 'indigo' : accentColor}
          align="center"
          className="mb-16 md:mb-20"
        />

        {/* Clean Grid - No Boxes */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${columns.length === 3 ? 'lg:grid-cols-3' : columns.length >= 4 ? 'lg:grid-cols-4' : ''} gap-x-12 gap-y-16`}>
          {columns.map((column, i) => {
            const IconComponent = iconMap[i % 6]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                {/* Icon & Title Group */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${accent.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <IconComponent className={`w-6 h-6 ${accent.text}`} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-sans text-lg md:text-xl text-slate-900 leading-tight group-hover:text-[var(--accent-primary)] transition-colors">
                    {column.title}
                  </h4>
                </div>

                {/* List Items - Clean */}
                <ul className="space-y-4 pl-2 border-l border-slate-100 group-hover:border-slate-200 transition-colors">
                  {column.items.map((item, j) => (
                    <li key={j} className="pl-4 relative flex items-start text-sm md:text-base text-slate-600 leading-relaxed">
                      {/* Custom Bullet */}
                      <span className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border-2 border-white ${accent.marker} shadow-sm transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-${j * 50}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Highlight/Quote - Minimal & Elegant */}
        {highlight && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className="relative pl-8 md:pl-12 border-l-2 border-slate-200">
              <span className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white ${accent.marker}`} />
              <span className={`font-mono text-xs uppercase tracking-widest ${accent.text} block mb-3 opacity-80`}>
                {`// ${highlight.label}`}
              </span>
              <p className="font-sans text-2xl md:text-3xl font-light italic text-slate-800 leading-relaxed">
                &ldquo;{highlight.text}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
