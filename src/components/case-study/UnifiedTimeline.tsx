'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
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

/** Scroll-triggered de-blur for timeline images */
function ScrollRevealImage({ image, onOpen }: {
  image: { src: string; alt: string; caption?: string; isBlurred?: boolean }
  onOpen: () => void
}) {
  const imgRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(imgRef, { once: true, amount: 0.4 })

  return (
    <div
      ref={imgRef}
      className="relative aspect-video rounded-lg overflow-hidden border border-slate-100 bg-slate-50 cursor-zoom-in group/img shadow-sm hover:shadow-md transition-all duration-300"
      onClick={onOpen}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={`object-cover transition-all duration-[1.2s] ease-out group-hover/img:scale-105 ${image.isBlurred && !isInView ? 'blur-md scale-105' : 'blur-0 scale-100'
          }`}
      />
    </div>
  )
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
      line: 'from-teal-300 via-teal-500 to-teal-400',
      completed: 'bg-slate-400 border border-slate-300',
      inProgress: 'bg-slate-300 border border-slate-200',
      rejected: 'bg-slate-300 border border-slate-200',
    },
    amber: {
      tag: 'teal',
      line: 'from-slate-200 via-slate-300 to-slate-200',
      completed: 'bg-slate-400 border border-slate-300',
      inProgress: 'bg-slate-300 border border-slate-200',
      rejected: 'bg-slate-300 border border-slate-200',
    },
    violet: {
      tag: 'indigo',
      line: 'from-violet-300 via-violet-500 to-violet-400',
      completed: 'bg-slate-400 border border-slate-300',
      inProgress: 'bg-slate-300 border border-slate-200',
      rejected: 'bg-slate-300 border border-slate-200',
    },
  }

  // Cast specific color strings from the map to compatible HeadingColor types
  const accent = accentClasses[accentColor]
  const headingColor = accent.tag as 'teal' | 'amber' | 'indigo'

  const getStatusDot = (status: string, isCriticalPivot?: boolean) => {
    // Critical Pivot gets a subtle distinguished ring
    if (isCriticalPivot) return `bg-slate-600 ring-2 ring-slate-300`

    // Standard statuses — all subtle, no bright colors
    if (status === 'COMPLETED') return `${accent.completed}`
    if (status === 'IN_PROGRESS') return `${accent.inProgress} ring-2 ring-slate-200`
    if (status === 'REJECTED') return accent.rejected
    return 'bg-slate-200'
  }

  const getStatusTextColor = (status: string) => {
    if (status === 'COMPLETED') return 'text-slate-500'
    if (status === 'IN_PROGRESS') return 'text-slate-400'
    if (status === 'REJECTED') return 'text-slate-400'
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
          {/* Vertical Guide Line - Lively & Pulsing - Extended */}
          <div className={`absolute left-[6px] md:left-[6px] -top-24 -bottom-24 w-[2px] bg-gradient-to-b ${accent.line} rounded-full opacity-60`}></div>

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
                      <h4 className={`text-lg md:text-xl font-medium tracking-tight ${phase.isCriticalPivot ? 'text-teal-700' : 'text-slate-900'}`}>
                        {phase.title.replace(/_/g, ' ')}
                      </h4>

                      {/* Status Tags - Ghost Outlined */}
                      {phase.isCriticalPivot && (
                        <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 border border-slate-300 px-2 py-0.5 rounded-full">
                          Critical Pivot
                        </span>
                      )}
                      {phase.status === 'REJECTED' && (
                        <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 border border-slate-300 px-2 py-0.5 rounded-full">
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

                      {/* Optional Image Attachment — Scroll-triggered De-blur */}
                      {phase.image && (
                        <ScrollRevealImage
                          image={phase.image}
                          onOpen={() => openLightbox({
                            src: phase.image!.src,
                            alt: phase.image!.alt,
                            caption: phase.image?.caption || phase.title
                          }, allImages, imageIndex)}
                        />
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
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 shrink-0 ${accentColor === 'teal' ? 'text-teal-600' : accentColor === 'amber' ? 'text-slate-500' : 'text-indigo-600'}`}>
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

