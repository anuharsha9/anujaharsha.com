import { motion } from 'framer-motion'
import { QuickOverview as QuickOverviewType } from '@/types/caseStudy'
// Note: ImpactMetricsChart removed - now using VitalSigns strip at top of page
// Note: ScopeOfPractice and MyRole removed - leadership info now in VitalSigns

interface QuickOverviewProps {
  data: QuickOverviewType
  heroSubtitle?: string
  caseStudySlug?: string
}

export default function QuickOverview({ data, heroSubtitle, caseStudySlug }: QuickOverviewProps) {
  return (
    <div className="space-y-6 w-full min-h-[200px]">
      {/* ============================================
          PHASE 3: THE STAR GRID (At a Glance)
          ============================================ */}
      {data.star && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-teal)] flex-shrink-0"></div>
            <div className="h-px flex-1 bg-slate-200"></div>
            <h3 className="text-[var(--accent-teal)] text-lg md:text-xl font-serif font-semibold">At a Glance</h3>
            <div className="h-px flex-1 bg-slate-200"></div>
            <div className="h-px w-8 bg-[var(--accent-teal)]"></div>
          </div>

          {/* 4-Column STAR Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {/* Situation */}
            <div className="p-4 border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="text-[var(--accent-teal)] text-xs uppercase tracking-widest font-mono font-semibold mb-2">Situation</div>
              <p className="text-slate-700 text-sm leading-relaxed">{data.star.situation}</p>
            </div>

            {/* Task */}
            <div className="p-4 border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="text-[var(--accent-teal)] text-xs uppercase tracking-widest font-mono font-semibold mb-2">Task</div>
              <p className="text-slate-700 text-sm leading-relaxed">{data.star.task}</p>
            </div>

            {/* Action */}
            <div className="p-4 border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="text-[var(--accent-teal)] text-xs uppercase tracking-widest font-mono font-semibold mb-2">Action</div>
              <p className="text-slate-700 text-sm leading-relaxed">{data.star.action}</p>
            </div>

            {/* Result - Highlighted Column */}
            <div className="p-4 bg-emerald-50/50 border-l-2 border-emerald-400 rounded-r-xl">
              <div className="text-emerald-600 text-xs uppercase tracking-widest font-mono font-semibold mb-2">Result</div>
              <p className="text-slate-900 text-sm leading-relaxed font-semibold">
                {/* Bold the metrics */}
                {data.star.result.split(',').map((part, i, arr) => (
                  <span key={i}>
                    {part.includes('%') || part.includes('M+') || part.includes('million') ? (
                      <strong className="text-emerald-700">{part.trim()}</strong>
                    ) : (
                      part.trim()
                    )}
                    {i < arr.length - 1 && ', '}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scale & Importance Callout - Only for ReportCaster */}
      {caseStudySlug === 'reportcaster' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="bg-slate-900 rounded-2xl p-6 md:p-8 shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-teal)] flex-shrink-0"></div>
            <div className="h-px flex-1 bg-slate-700"></div>
            <h3 className="text-white text-lg md:text-xl font-serif font-semibold">Scale & Responsibility</h3>
            <div className="h-px flex-1 bg-slate-700"></div>
            <div className="h-px w-8 bg-[var(--accent-teal)]"></div>
          </div>

          {/* Numbers Grid - Monospace */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-bold text-[var(--accent-teal)] mb-1">Millions</div>
              <div className="text-slate-400 text-sm font-mono">of end users</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-bold text-[var(--accent-teal)] mb-1">Hundreds</div>
              <div className="text-slate-400 text-sm font-mono">of enterprise customers</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-bold text-[var(--accent-teal)] mb-1">20M+</div>
              <div className="text-slate-400 text-sm font-mono">schedules / week</div>
            </div>
          </div>

          {/* Production Badge */}
          <div className="pt-6 border-t border-slate-700 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider">Powering 20M+ Schedules Weekly</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl mx-auto">
              Shipped as part of WebFOCUS 9.3 — actively impacting millions of users daily.
              <span className="text-slate-500 italic"> Mission-critical system that couldn&apos;t afford to break.</span>
            </p>
          </div>
        </motion.div>
      )}

      {/* Note: Impact Metrics moved to VitalSigns strip immediately after Hero */}
    </div>
  )
}


