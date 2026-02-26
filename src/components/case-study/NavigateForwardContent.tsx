'use client'

import ComponentHeading from '@/components/ui/ComponentHeading'
import { ReflectionData } from '@/types/caseStudy'
import CaseStudyReflection from './CaseStudyReflection'
import { Clock, Activity, BarChart3, FileText } from 'lucide-react'


interface NavigateForwardContentProps {
  isLightBackground?: boolean
  reflection?: ReflectionData
}

export default function NavigateForwardContent({ isLightBackground = true, reflection }: NavigateForwardContentProps) {
  return (
    <div className="space-y-12">

      {/* Project Outcome - Refactored to 2x2 Grid (ML Style) */}
      <div className="space-y-6">
        <ComponentHeading
          variant="block"
          tag="PROJECT OUTCOME"
          title="From Visual Refresh to System Architecture"
          color="teal"
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Duration */}
          <div className="bg-white/[0.03] border border-white/[0.06] p-8 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/[0.15] transition-all duration-300 rounded-2xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock className="w-16 h-16" strokeWidth={1} />
            </div>
            <div className="w-12 h-12 bg-blue-500/[0.10] rounded-full flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-6 h-6" strokeWidth={2} />
            </div>
            <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest mb-2 block">
              {'// DURATION'}
            </span>
            <h4 className="text-[var(--text-heading)] text-4xl font-sans mb-3">14 Months</h4>
            <p className="text-[var(--text-body)] text-sm leading-relaxed max-w-sm">
              End-to-end journey from initial visual refresh concepts to a fully implemented system architecture.
            </p>
          </div>

          {/* Card 2: Live Status */}
          <div className="bg-white/[0.03] border border-white/[0.06] p-8 hover:shadow-xl hover:shadow-teal-500/5 hover:border-teal-500/[0.15] transition-all duration-300 rounded-2xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity className="w-16 h-16" strokeWidth={1} />
            </div>
            <div className="w-12 h-12 bg-teal-500/[0.10] rounded-full flex items-center justify-center mb-6 text-teal-400 group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-6 h-6" strokeWidth={2} />
            </div>
            <span className="font-mono text-[10px] text-teal-400 uppercase tracking-widest mb-2 block">
              {'// STATUS'}
            </span>
            <h4 className="text-[var(--text-heading)] text-4xl font-sans mb-3">Live</h4>
            <p className="text-[var(--text-body)] text-sm leading-relaxed max-w-sm">
              Shipped April 2024. Available to all enterprise customers in the production environment.
            </p>
          </div>

          {/* Card 3: Scale */}
          <div className="bg-white/[0.03] border border-white/[0.06] p-8 hover:shadow-xl hover:shadow-purple-500/5 hover:border-purple-500/[0.15] transition-all duration-300 rounded-2xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BarChart3 className="w-16 h-16" strokeWidth={1} />
            </div>
            <div className="w-12 h-12 bg-purple-500/[0.10] rounded-full flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-6 h-6" strokeWidth={2} />
            </div>
            <span className="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-2 block">
              {'// SCALE'}
            </span>
            <h4 className="text-[var(--text-heading)] text-4xl font-sans mb-3">20M+</h4>
            <p className="text-[var(--text-body)] text-sm leading-relaxed max-w-sm">
              Schedules processed weekly. The redesign maintained 100% reliability at massive enterprise scale.
            </p>
          </div>

          {/* Card 4: Transformation */}
          <div className="bg-white/[0.03] border border-white/[0.06] p-8 hover:shadow-xl hover:shadow-amber-500/5 hover:border-amber-500/[0.15] transition-all duration-300 rounded-2xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText className="w-16 h-16" strokeWidth={1} />
            </div>
            <div className="w-12 h-12 bg-amber-500/[0.10] rounded-full flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-6 h-6" strokeWidth={2} />
            </div>
            <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest mb-2 block">
              {'// TRANSFORMATION'}
            </span>
            <h4 className="text-[var(--text-heading)] text-4xl font-sans mb-3">System Spec</h4>
            <p className="text-[var(--text-body)] text-sm leading-relaxed max-w-sm">
              Replaced 50 years of tribal knowledge with a documented ecosystem. Architecture enabled extensibility.
            </p>
          </div>
        </div>

        {/* Platform Impact Footer */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mt-6 text-center shadow-sm">
          <p className="text-[var(--text-body)] text-sm leading-relaxed">
            <strong className="text-[var(--text-heading)]">Platform-wide pattern:</strong> The Explorer filter view became scalable to all asset types. The architecture became the pattern for everything.
          </p>
        </div>
      </div>

      {/* Customer Recognition — Premium Card */}
      <div className="w-full">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--surface-slate-925)] via-[var(--surface-navy-850)] to-[var(--surface-navy-900)] p-10 md:p-14
          border border-white/5 shadow-2xl">
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/[0.04] rounded-full blur-3xl" />

          <div className="relative text-center max-w-2xl mx-auto">
            <span className="font-mono text-[10px] text-emerald-400/60 uppercase tracking-[0.2em] block mb-6">
              Customer Recognition
            </span>
            <blockquote className="mb-8">
              <p className="font-sans text-3xl md:text-4xl text-white/95 italic leading-snug tracking-tight">
                &ldquo;So what are you going to do next?&rdquo;
              </p>
            </blockquote>
            <p className="text-[var(--text-muted)]/80 text-sm md:text-base leading-relaxed font-light max-w-xl mx-auto">
              A customer publicly praised the redesign during a Virtual User Group and asked what I planned next. Shipped 5 months after I transitioned—now demoed on the public YouTube channel.
            </p>
          </div>
        </div>
      </div>

      {/* Retrospective Section (Shared Component) */}
      <div className="mt-16 md:mt-20">
        {reflection && <CaseStudyReflection data={reflection} isLightBackground={isLightBackground} />}
      </div>

      {/* Compact footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-t border-white/[0.06] text-sm text-center sm:text-left mt-8">
        <p className="text-[var(--text-muted)] italic font-light">
          The V1 I loved is actually being implemented now. Ideas find their way back.
        </p>
        <p className="text-[var(--text-muted)] font-light">
          <span className="text-[var(--text-body)] font-medium">Lesson:</span> Chaos is just undocumented architecture.
        </p>
      </div>
    </div>
  )
}
