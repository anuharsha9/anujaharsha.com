'use client'

import { motion } from 'framer-motion'
import { BookOpen, Users, Search, Cpu, BarChart3, GraduationCap, Shield, Target, Network, Ban, Lightbulb } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

export interface ResearchMethod {
  category: string
  description: string
  items: string[]
  icon: 'book' | 'users' | 'search' | 'cpu' | 'chart' | 'graduation' | 'shield' | 'target' | 'network' | 'lightbulb'
}

export interface ResearchConstraint {
  type: 'warning' | 'success'
  label: string
  body: string
}

export interface ResearchApproachData {
  sectionTag: string
  title: string
  subtitle: string
  methods: ResearchMethod[]
  constraint?: ResearchConstraint
  strategy?: ResearchConstraint
}

interface ResearchApproachProps {
  data: ResearchApproachData
  accentColor?: 'teal' | 'amber' | 'violet'
}

const iconMap = {
  book: BookOpen,
  users: Users,
  search: Search,
  cpu: Cpu,
  chart: BarChart3,
  graduation: GraduationCap,
  shield: Shield,
  target: Target,
  network: Network,
  lightbulb: Lightbulb,
}

export default function ResearchApproach({ data, accentColor = 'teal' }: ResearchApproachProps) {
  const { sectionTag, title, subtitle, methods, constraint, strategy } = data

  const accentClasses = {
    teal: {
      tag: 'text-[var(--accent-teal)]',
      icon: 'text-[var(--accent-teal)]',
      bg: 'bg-teal-50',
      border: 'border-teal-100',
    },
    amber: {
      tag: 'text-amber-600',
      icon: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    violet: {
      tag: 'text-violet-600',
      icon: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100',
    },
  }

  const accent = accentClasses[accentColor] || accentClasses.teal

  return (
    <div className="space-y-16 py-8">
      {/* Header - Minimal & Clean */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <ComponentHeading
          variant="block"
          align="center"
          tag={sectionTag}
          title={title}
          description={subtitle}
          color="slate"
        />
      </motion.div>

      {/* Strategic Constraints - Clean Blocks */}
      {(constraint || strategy) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-slate-100 py-12">
          {constraint && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-3 pr-8 md:border-r border-slate-100"
            >
              <div className="flex items-center gap-2 text-rose-500 mb-2">
                <Ban className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-[11px] font-bold uppercase tracking-widest">Constraint</span>
              </div>
              <h4 className="text-lg font-medium text-slate-900">{constraint.label}</h4>
              <p className="text-slate-600 text-base leading-relaxed font-light">{constraint.body}</p>
            </motion.div>
          )}

          {strategy && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-3 md:pl-8"
            >
              <div className={`flex items-center gap-2 ${accent.icon} mb-2`}>
                <Target className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-[11px] font-bold uppercase tracking-widest">Strategy</span>
              </div>
              <h4 className="text-lg font-medium text-slate-900">{strategy.label}</h4>
              <p className="text-slate-600 text-base leading-relaxed font-light">{strategy.body}</p>
            </motion.div>
          )}
        </div>
      )}

      {/* Methods Grid - Clean & Open */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {methods.map((method, i) => {
          // const IconComponent = iconMap[method.icon] // Keeping generic if needed, or mapping
          // For simplicity in replacement, assuming iconMap is available or re-mapping 
          // Re-mapping for safety inside replacement block scope if needed, but 'iconMap' is outer scope usually suitable.
          // Let's use the outer scope iconMap.
          const IconComponent = iconMap[method.icon] || Lightbulb

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="space-y-4 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <h4 className="text-lg font-medium text-slate-900 group-hover:text-[var(--accent-teal)] transition-colors">
                  {method.category}
                </h4>
                <IconComponent className={`w-5 h-5 text-slate-300 group-hover:${accent.icon} transition-colors`} strokeWidth={1.5} />
              </div>

              {/* Divider */}
              <div className="h-px w-12 bg-slate-200 group-hover:w-full group-hover:bg-[var(--accent-teal)] transition-all duration-500" />

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                {method.description}
              </p>

              {/* Items List - Clean */}
              <ul className="space-y-2 pt-2">
                {method.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-slate-500">
                    <span className={`w-1 h-1 rounded-full bg-slate-300 mt-2 shrink-0 group-hover:${accent.bg.replace('bg-', 'bg-')}-400 transition-colors`} />
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

