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

  return (
    <div className="w-full py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">

        {/* Header */}
        <ComponentHeading
          align="center"
          tag={sectionTag}
          title={title}
          description={subtitle}
          color="teal"
          className="mb-16 md:mb-20"
        />

        {/* Minimal cards — icon + title only, single line summary */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${columns.length === 3 ? 'lg:grid-cols-3' : columns.length >= 4 ? 'lg:grid-cols-4' : ''} gap-6`}>
          {columns.map((column, i) => {
            const IconComponent = iconMap[i % 6]
            // Collapse bullet items into a single line
            const summary = column.items.join(' · ')
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center py-8 px-6"
              >
                {/* Icon */}
                <div className="w-10 h-10 mx-auto rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
                  <IconComponent className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h4 className="font-sans text-[15px] font-medium text-white/70 mb-2">
                  {column.title}
                </h4>

                {/* Single summary line */}
                <p className="text-white/30 text-[13px] font-light leading-relaxed">
                  {summary}
                </p>
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
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 max-w-3xl mx-auto text-center"
          >
            <div className="border-t border-white/[0.06] pt-10">
              <p className="font-sans text-xl md:text-2xl font-light italic text-white/60 leading-relaxed">
                &ldquo;{highlight.text}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
