import { motion } from 'framer-motion'
import { User, Code, Terminal, Briefcase, Zap, Shield, Search } from 'lucide-react'

interface PersonaCardsProps {
  isLightBackground?: boolean
}

export default function PersonaCards({ isLightBackground = true }: PersonaCardsProps) {
  const personas = [
    {
      name: 'BI Developer',
      type: 'TECHNICAL',
      icon: Code,
      description: 'Developers who schedule reports but struggle with fragmented interfaces and unclear system behavior.',
    },
    {
      name: 'Reporting Guru',
      type: 'POWER USER',
      icon: Zap,
      description: 'Power users who understand the system deeply but waste time context-switching between multiple tabs.',
    },
  ]

  return (
    <div className="space-y-12 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-4 max-w-2xl mx-auto"
      >
        <div className="flex justify-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            User Personas
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
          Understanding the User
        </h3>
        <p className="text-slate-600 text-lg font-light leading-relaxed">
          Inherited foundational research. Used to guide architectural decisions.
        </p>
      </motion.div>

      {/* Personas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {personas.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
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
      </div>

      {/* Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto bg-slate-50 rounded-xl p-6 text-center border border-slate-100"
      >
        <p className="text-slate-600 text-base font-light leading-relaxed">
          Both personas share the same pain: <strong className="font-medium text-slate-900">fragmented interfaces and context switching</strong>.
          Solution unified scheduling into a single, predictable workflow.
        </p>
      </motion.div>
    </div>
  )
}
