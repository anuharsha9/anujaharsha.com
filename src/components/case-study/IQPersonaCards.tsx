import { motion } from 'framer-motion'
import { Telescope, TrendingUp, Beaker, Terminal } from 'lucide-react'

interface IQPersonaCardsProps {
  isLightBackground?: boolean
  title?: string
  description?: string
}

export default function IQPersonaCards({
  isLightBackground = false,
  title = 'User Personas',
  description = '2 personas created from scratch. 2 inherited from existing research. All 4 mapped into the unified system.'
}: IQPersonaCardsProps) {
  const personas = [
    {
      name: 'Tech Visionary',
      type: 'TECHNICAL',
      icon: Telescope,
      description: 'Needs direct model parameter access and keyboard-first navigation.',
    },
    {
      name: 'Financial Strategist',
      type: 'BUSINESS',
      icon: TrendingUp,
      description: 'Needs one-click insight generation and plain-language explanations.',
    },
    {
      name: 'Analytics Innovator',
      type: 'DEVELOPER',
      icon: Beaker,
      description: 'Needs consistent component behavior and debuggable error states.',
    },
    {
      name: 'Techy Analyst',
      type: 'POWER USER',
      icon: Terminal,
      description: 'Needs self-service workflows and shareable, repeatable queries.',
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="text-center space-y-4 max-w-2xl mx-auto"
      >
        <div className="flex justify-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            User Personas
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
          {title}
        </h3>
        <p className="text-slate-600 text-lg font-light leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Persona Grid - 2x2 */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {personas.map((p, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <p.icon className="w-6 h-6 text-slate-400 group-hover:text-[var(--accent-teal)] transition-colors" strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-medium text-slate-900">{p.name}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                    {p.type}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  {p.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Design Implication Footer */}
      <motion.div
        variants={cardVariants}
        className="max-w-3xl mx-auto bg-slate-50 rounded-xl p-6 text-center border border-slate-100"
      >
        <p className="text-slate-600 text-base font-light leading-relaxed">
          Four personas, one interface. Solution: <strong className="font-medium text-slate-900">layered progressive disclosure</strong> that surfaces simplicity by default while keeping power accessible on demand.
        </p>
      </motion.div>
    </div>
  )
}
