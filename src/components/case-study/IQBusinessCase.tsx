'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Layers, MousePointerClick, Puzzle, Smartphone } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface IQBusinessCaseProps {
  isLightBackground?: boolean
}

const decisions = [
  {
    icon: Layers,
    label: 'Smart Integration',
    from: '3 separate entry points',
    to: 'Built inside the Hub. Zero new infrastructure.',
  },
  {
    icon: MousePointerClick,
    label: 'One Entry Point',
    from: '3 scattered menus',
    to: 'One destination. One click.',
  },
  {
    icon: Puzzle,
    label: 'Consistent Patterns',
    from: 'Each feature felt different',
    to: 'Learn one, know all three.',
  },
  {
    icon: Smartphone,
    label: 'Mobile-First',
    from: 'Desktop-only features',
    to: 'First Hub app designed responsive.',
  },
]

export default function IQBusinessCase({ isLightBackground = false }: IQBusinessCaseProps) {
  return (
    <div className="space-y-12">
      <ComponentHeading
        variant="block"
        align="center"
        title="Four Decisions That Shaped the Plugin"
        color="teal"
        className="mb-4"
      />

      {/* Decision Flow — Visual Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {decisions.map((d, i) => {
          const Icon = d.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative group"
            >
              {/* Card */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 h-full flex flex-col hover:border-white/[0.14] transition-colors duration-300">
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5">
                  <Icon className="w-4.5 h-4.5 text-white/40" strokeWidth={1.5} />
                </div>

                {/* Decision label */}
                <h4 className="text-[15px] font-medium text-white/80 mb-4">
                  {d.label}
                </h4>

                {/* From → To */}
                <div className="mt-auto space-y-2">
                  <p className="text-[12px] text-white/25 line-through decoration-white/15 leading-relaxed">
                    {d.from}
                  </p>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 text-[var(--accent-teal)]/50 mt-0.5 shrink-0" />
                    <p className="text-[13px] text-white/50 font-light leading-relaxed">
                      {d.to}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
