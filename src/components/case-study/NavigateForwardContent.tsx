'use client'

import ComponentHeading from '@/components/ui/ComponentHeading'
import TerminalInsight from './TerminalInsight'
import { ReflectionData } from '@/types/caseStudy'
import CaseStudyReflection from './CaseStudyReflection'


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
          tag="// PROJECT_OUTCOME"
          title="From Visual Refresh to System Architecture"
          color="teal"
          align="center"
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Duration */}
          <div className="bg-white border border-slate-200 p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 rounded-2xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <span className="font-mono text-[10px] text-blue-600 uppercase tracking-widest mb-2 block">
              {'// DURATION'}
            </span>
            <h4 className="text-slate-900 text-4xl font-serif mb-3">14 Months</h4>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              End-to-end journey from initial visual refresh concepts to a fully implemented system architecture.
            </p>
          </div>

          {/* Card 2: Live Status */}
          <div className="bg-white border border-slate-200 p-8 hover:shadow-xl hover:border-teal-200 transition-all duration-300 rounded-2xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            </div>
            <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-6 text-teal-600 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            </div>
            <span className="font-mono text-[10px] text-teal-600 uppercase tracking-widest mb-2 block">
              {'// STATUS'}
            </span>
            <h4 className="text-slate-900 text-4xl font-serif mb-3">Live</h4>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Shipped April 2024. Available to all enterprise customers in the production environment.
            </p>
          </div>

          {/* Card 3: Scale */}
          <div className="bg-white border border-slate-200 p-8 hover:shadow-xl hover:border-purple-200 transition-all duration-300 rounded-2xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
            </div>
            <span className="font-mono text-[10px] text-purple-600 uppercase tracking-widest mb-2 block">
              {'// SCALE'}
            </span>
            <h4 className="text-slate-900 text-4xl font-serif mb-3">20M+</h4>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Schedules processed weekly. The redesign maintained 100% reliability at massive enterprise scale.
            </p>
          </div>

          {/* Card 4: Transformation */}
          <div className="bg-white border border-slate-200 p-8 hover:shadow-xl hover:border-amber-200 transition-all duration-300 rounded-2xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-6 text-amber-600 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
            </div>
            <span className="font-mono text-[10px] text-amber-600 uppercase tracking-widest mb-2 block">
              {'// TRANSFORMATION'}
            </span>
            <h4 className="text-slate-900 text-4xl font-serif mb-3">System Spec</h4>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Replaced 50 years of tribal knowledge with a documented ecosystem. Architecture enabled extensibility.
            </p>
          </div>
        </div>

        {/* Platform Impact Footer */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-6 text-center shadow-sm">
          <p className="text-slate-600 text-sm leading-relaxed">
            <strong className="text-slate-900">Platform-wide pattern:</strong> The Explorer filter view became scalable to all asset types. The architecture became the pattern for everything.
          </p>
        </div>
      </div>

      {/* Customer Recognition - Standalone Terminal Block */}
      <div className="w-full">
        <TerminalInsight
          title="customer_feedback.log"
          insightLabel="CUSTOMER_RECOGNITION"
        >
          <div className="text-center">
            <blockquote className="mt-2 mb-6">
              <p className="font-serif text-2xl md:text-3xl text-white italic leading-relaxed">
                &ldquo;So what are you going to do next?&rdquo;
              </p>
            </blockquote>
            <p className="text-slate-400 text-sm max-w-xl mx-auto font-sans">
              A customer publicly praised the redesign during a Virtual User Group and asked what I planned next. Shipped 5 months after I transitioned—now demoed on the public YouTube channel.
            </p>
          </div>
        </TerminalInsight>
      </div>

      {/* Retrospective Section (Shared Component) */}
      <div className="mt-24 md:mt-32 pt-12 border-t border-slate-100">
        {reflection && <CaseStudyReflection data={reflection} isLightBackground={isLightBackground} />}
      </div>

      {/* Compact footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4 border-t border-slate-200 text-sm text-center sm:text-left">
        <p className="text-slate-500 italic">
          The V1 I loved is actually being implemented now. Ideas find their way back.
        </p>
        <p className="text-slate-400">
          <span className="text-slate-600 font-medium">Lesson:</span> Chaos is just undocumented architecture.
        </p>
      </div>
    </div>
  )
}
