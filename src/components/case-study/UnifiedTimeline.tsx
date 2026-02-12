'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLightbox } from '@/contexts/LightboxContext'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface TimelinePhase {
  id: string
  phase: string
  title: string
  body: string
  status: 'COMPLETED' | 'IN_PROGRESS' | 'REJECTED'
  isCriticalPivot?: boolean
  image?: {
    src: string
    alt: string
    caption?: string
    isBlurred?: boolean
  }
}

interface UnifiedTimelineProps {
  phases: TimelinePhase[]
  header?: {
    tag: string
    title: string
    subtitle: string
  }
  footer?: {
    tag: string
    body: string
  }
  accentColor?: 'teal' | 'amber' | 'violet'
}

export default function UnifiedTimeline({
  phases,
  header = {
    tag: '// PROJECT_EVOLUTION',
    title: 'Project Timeline',
    subtitle: 'Key phases from discovery to delivery.'
  },
  footer,
  accentColor = 'teal'
}: UnifiedTimelineProps) {
  const { openLightbox } = useLightbox()

  const accentClasses = {
    teal: {
      tag: 'teal',
      line: 'from-slate-200 via-slate-200 to-[var(--accent-teal)]',
      completed: 'bg-emerald-500',
      inProgress: 'bg-amber-400',
      rejected: 'bg-rose-400',
    },
    amber: {
      tag: 'amber',
      line: 'from-slate-200 via-slate-200 to-amber-400',
      completed: 'bg-emerald-500',
      inProgress: 'bg-amber-400',
      rejected: 'bg-rose-400',
    },
    violet: {
      tag: 'indigo',
      line: 'from-slate-200 via-slate-200 to-violet-400',
      completed: 'bg-emerald-500',
      inProgress: 'bg-violet-500',
      rejected: 'bg-rose-400',
    },
  }

  // Cast specific color strings from the map to compatible HeadingColor types
  const accent = accentClasses[accentColor]
  const headingColor = accent.tag as 'teal' | 'amber' | 'indigo'

  const getStatusDot = (status: string, isCriticalPivot?: boolean) => {
    // Critical Pivot gets a special ring
    if (isCriticalPivot) return `${accent.inProgress} ring-4 ring-amber-100`

    // Standard statuses
    if (status === 'COMPLETED') return accent.completed
    if (status === 'IN_PROGRESS') return `${accent.inProgress} ring-4 ring-amber-50`
    if (status === 'REJECTED') return accent.rejected
    return 'bg-slate-200'
  }

  const getStatusTextColor = (status: string) => {
    if (status === 'COMPLETED') return 'text-emerald-600'
    if (status === 'IN_PROGRESS') return 'text-amber-600'
    if (status === 'REJECTED') return 'text-rose-500'
    return 'text-slate-400'
  }

  const allImages = phases
    .filter(p => p.image)
    .map(p => ({
      src: p.image!.src,
      alt: p.image!.alt,
      caption: p.image?.caption || p.title
    }))

  return (
    <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16">
      <div className="space-y-16">
        {/* Header - Clean & Minimal */}
        <ComponentHeading
          variant="block"
          align="center"
          tag={header.tag}
          title={header.title}
          description={header.subtitle}
          color={headingColor}
          className="mb-0 max-w-3xl"
        />

        {/* Timeline Container */}
        <div className="relative pl-4 md:pl-0">
          {/* Vertical Guide Line */}
          <div className={`absolute left-[7px] md:left-[8px] top-4 bottom-4 w-px bg-gradient-to-b ${accent.line}`}></div>

          {/* Phase Nodes */}
          <div className="space-y-12">
            {phases.map((phase, index) => {
              const imageIndex = allImages.findIndex(img => img.src === phase.image?.src)

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-10 md:pl-12 group"
                >
                  {/* Semantic Node Dot - Clean, no borders */}
                  <div className={`
                    absolute left-0 top-2 w-4 h-4 rounded-full transition-all duration-300
                    ${getStatusDot(phase.status, phase.isCriticalPivot)}
                  `}></div>

                  {/* Content Container */}
                  <div className="space-y-3">
                    {/* Phase Tag & Title */}
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        Phase {phase.phase}
                      </span>
                      <h4 className={`text-lg md:text-xl font-medium tracking-tight ${phase.isCriticalPivot ? 'text-amber-600' : 'text-slate-900'}`}>
                        {phase.title.replace(/_/g, ' ')}
                      </h4>

                      {/* Status Tags - Minimal */}
                      {phase.isCriticalPivot && (
                        <span className="text-[9px] uppercase tracking-widest font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                          Critical Pivot
                        </span>
                      )}
                      {phase.status === 'REJECTED' && (
                        <span className="text-[9px] uppercase tracking-widest font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                          Rejected
                        </span>
                      )}
                    </div>

                    {/* Body & Image Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
                      {/* Text Content */}
                      <div className="space-y-4">
                        <p className="text-slate-600 text-base leading-relaxed font-light">
                          {phase.body}
                        </p>

                        {/* Status Indicator text */}
                        <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] ${getStatusTextColor(phase.status)}`}>
                          <span>{phase.status.replace('_', ' ')}</span>
                        </div>
                      </div>

                      {/* Optional Image Attachment */}
                      {phase.image && (
                        <div
                          className="relative aspect-video rounded-lg overflow-hidden border border-slate-100 bg-slate-50 cursor-zoom-in group/img shadow-sm hover:shadow-md transition-all duration-300"
                          onClick={() => openLightbox({
                            src: phase.image!.src,
                            alt: phase.image!.alt,
                            caption: phase.image?.caption || phase.title
                          }, allImages, imageIndex)}
                        >
                          <Image
                            src={phase.image.src}
                            alt={phase.image.alt}
                            fill
                            className={`object-cover transition-transform duration-500 group-hover/img:scale-105 ${phase.image.isBlurred ? 'blur-sm group-hover/img:blur-none' : ''}`}
                          />
                          {phase.image.isBlurred && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[2px] opacity-100 group-hover/img:opacity-0 transition-opacity duration-300">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                                Hover to Reveal
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Footer Note - No Box, Clean Divider */}
        {footer && (
          <div className="pt-8 border-t border-slate-100 mt-12">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 shrink-0 ${accentColor === 'teal' ? 'text-teal-600' : accentColor === 'amber' ? 'text-amber-600' : 'text-indigo-600'}`}>
                {footer.tag.replace(':', '')}
              </span>
              <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed max-w-3xl">
                {footer.body}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

