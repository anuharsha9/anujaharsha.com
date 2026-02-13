'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface Project {
  id: string
  tag: string
  tagColor: string
  title: string
  subtitle: string
  hook: string
  link: string
  hoverColor: string
  arrowColor: string
}

interface SystemIndexProps {
  currentId: 'REPORTCASTER' | 'ML_FUNCTIONS' | 'IQ_PLUGIN'
}

const projects: Project[] = [
  {
    id: 'REPORTCASTER',
    tag: '[SYS_ID: LEGACY_MOD]',
    tagColor: 'text-emerald-500',
    title: 'ReportCaster',
    subtitle: 'Enterprise Scheduler Modernization',
    hook: 'Refactoring a 50-year-old legacy codebase into a unified React architecture, significantly reducing scheduling complexity.',
    link: '/work/reportcaster',
    hoverColor: 'group-hover:border-emerald-500/50',
    arrowColor: 'group-hover:text-emerald-400',
  },
  {
    id: 'ML_FUNCTIONS',
    tag: '[SYS_ID: AI_PIPELINE]',
    tagColor: 'text-purple-500',
    title: 'ML Functions',
    subtitle: 'No-Code Machine Learning',
    hook: "Transforming a black-box engineering script into a guided 'Glass Box' wizard that allows non-experts to train models safely.",
    link: '/work/ml-functions',
    hoverColor: 'group-hover:border-purple-500/50',
    arrowColor: 'group-hover:text-purple-400',
  },
  {
    id: 'IQ_PLUGIN',
    tag: '[SYS_ID: UNIFIED_HUB]',
    tagColor: 'text-blue-500',
    title: 'IQ Plugin',
    subtitle: 'DSML Platform Unification',
    hook: "Architecting a unified 'front door' for 3 disparate analytics engines, bridging the gap between business users and data scientists.",
    link: '/work/iq-plugin',
    hoverColor: 'group-hover:border-blue-500/50',
    arrowColor: 'group-hover:text-blue-400',
  },
]

export default function SystemIndex({ currentId }: SystemIndexProps) {
  // Filter to show only the 2 projects that aren't the current one
  const otherProjects = projects.filter((project) => project.id !== currentId)

  return (
    <section
      className="w-full bg-slate-950 py-10 md:py-12 border-t border-slate-900"
      aria-labelledby="system-index-heading"
    >
      <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Header - Inline with cards */}
        <div className="mb-6">
          <ComponentHeading
            tag="// SYSTEM_INDEX"
            title="Explore Other Architectures"
            color="slate"
            align="center"
            className="mb-0 [&_h2]:text-white [&_p]:text-slate-400 [&_span]:text-slate-500"
          />
        </div>

        {/* Cards Grid - 2 Column, Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherProjects.map((project) => (
            <Link
              key={project.id}
              href={project.link}
              className={`
                group relative bg-slate-900 border border-slate-800 p-5 overflow-hidden
                transition-all duration-300 ${project.hoverColor}
                hover:bg-slate-800/50
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
                flex items-center gap-4
              `}
            >
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-serif text-white group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`font-mono text-[10px] tracking-widest uppercase ${project.tagColor}`}>
                    {project.tag.replace('[SYS_ID: ', '').replace(']', '')}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                  {project.hook}
                </p>
              </div>

              {/* Arrow Icon */}
              <ArrowRight
                className={`w-5 h-5 text-slate-600 ${project.arrowColor} transition-all duration-300 group-hover:translate-x-1 flex-shrink-0`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
