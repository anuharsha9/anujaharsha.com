'use client'

import { motion } from 'framer-motion'
import { User, Code, Terminal, Briefcase, Zap, Shield, Search, Telescope, TrendingUp, Beaker, type LucideIcon } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface Persona {
  name: string
  type: string
  icon: LucideIcon
  description: string
}

interface PersonaCardsProps {
  isLightBackground?: boolean
  title?: string
  description?: string
  personas: Persona[]
  insightText?: React.ReactNode
  accentColor?: 'teal' | 'violet' | 'amber'
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function PersonaCards({
  isLightBackground = true,
  title = 'Understanding the User',
  description = 'Inherited foundational research. Used to guide architectural decisions.',
  personas,
  insightText,
  accentColor = 'teal',
}: PersonaCardsProps) {
  const accentClasses = {
    teal: {
      badgeBg: 'bg-teal-500/[0.10]',
      badgeText: 'text-teal-400',
      hoverAccent: 'group-hover:text-[var(--accent-teal)]',
    },
    violet: {
      badgeBg: 'bg-violet-500/[0.10]',
      badgeText: 'text-violet-400',
      hoverAccent: 'group-hover:text-[var(--accent-violet)]',
    },
    amber: {
      badgeBg: 'bg-amber-500/[0.10]',
      badgeText: 'text-amber-400',
      hoverAccent: 'group-hover:text-amber-400',
    },
  }

  const accent = accentClasses[accentColor] || accentClasses.teal

  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="text-center space-y-4 max-w-2xl mx-auto"
      >
        <div className="flex justify-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text-muted)]">
            User Personas
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-light text-[var(--text-heading)] tracking-tight">
          {title}
        </h3>
        <p className="text-[var(--text-body)] text-lg font-light leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Personas Grid */}
      <motion.div
        className={`grid grid-cols-1 ${personas.length <= 2 ? 'md:grid-cols-2 max-w-4xl' : 'md:grid-cols-2 max-w-4xl'} gap-6 mx-auto`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {personas.map((p, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="bg-white/[0.03] rounded-2xl p-8 shadow-sm border border-white/[0.06] hover:shadow-md hover:shadow-black/10 hover:border-white/[0.12] transition-all duration-300 group"
          >
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <p.icon className={`w-6 h-6 text-[var(--text-muted)] ${accent.hoverAccent} transition-colors`} strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-medium text-[var(--text-heading)]">{p.name}</h4>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${accent.badgeBg} ${accent.badgeText} rounded-full`}>
                    {p.type}
                  </span>
                </div>
                <p className="text-[var(--text-body)] text-sm leading-relaxed font-light">
                  {p.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Insight */}
      {insightText && (
        <motion.div
          variants={cardVariants}
          className="max-w-3xl mx-auto bg-white/[0.03] rounded-xl p-6 text-center border border-white/[0.06]"
        >
          <p className="text-[var(--text-body)] text-base font-light leading-relaxed">
            {insightText}
          </p>
        </motion.div>
      )}
    </div>
  )
}
