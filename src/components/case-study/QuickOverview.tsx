import { motion } from 'framer-motion'
import { QuickOverview as QuickOverviewType } from '@/types/caseStudy'
import { MapPin, Layers, Zap, Trophy } from 'lucide-react'

interface QuickOverviewProps {
  data: QuickOverviewType
  heroSubtitle?: string
  caseStudySlug?: string
}

export default function QuickOverview({ data, heroSubtitle, caseStudySlug }: QuickOverviewProps) {
  // Map STAR steps to icons and colors
  const items = [
    {
      label: 'Situation',
      content: data.star?.situation || '',
      icon: MapPin,
      iconColor: 'text-slate-400',
    },
    {
      label: 'Task',
      content: data.star?.task || '',
      icon: Layers,
      iconColor: 'text-slate-400',
    },
    {
      label: 'Action',
      content: data.star?.action || '',
      icon: Zap,
      iconColor: 'text-amber-500',
    },
    {
      label: 'Result',
      content: data.star?.result || '',
      icon: Trophy,
      iconColor: 'text-teal-500',
    },
  ];

  return (
    <div className="space-y-8 w-full min-h-[200px] py-6 px-4 md:px-6">
      {data.star && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* 4-Column STAR Grid - Linear Flow with Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 mb-10 pb-8 border-b border-slate-100">
            {items.map((item, index) => (
              <div
                key={item.label}
                className={`
                  flex flex-col gap-3 md:px-6 first:pl-0 last:pr-0
                  ${index !== items.length - 1 ? 'md:border-r border-slate-100' : ''}
                `}
              >
                <div className="flex items-center gap-2">
                  <item.icon className={`w-4 h-4 ${item.iconColor}`} strokeWidth={2} />
                  <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-slate-400">{item.label}</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed font-light">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          {/* Metrics Row — Clean & Minimal */}
          {data.impactMetrics && data.impactMetrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-2">
              {data.impactMetrics.map((metric, index) => (
                <div key={index} className="flex flex-col gap-1 md:px-6 first:pl-0">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 font-feature-settings-tnum">
                    {metric.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
