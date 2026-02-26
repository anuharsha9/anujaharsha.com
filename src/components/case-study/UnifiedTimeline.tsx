'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { useLightbox } from '@/contexts/LightboxContext'

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

const accentCSSMap = {
  teal: 'var(--accent-teal)',
  amber: '#f59e0b',
  violet: '#8b5cf6',
}

const accentGradientMap = {
  teal: 'from-[var(--accent-teal)]/60 via-[var(--accent-teal)]/20 to-transparent',
  amber: 'from-amber-500/60 via-amber-500/20 to-transparent',
  violet: 'from-violet-500/60 via-violet-500/20 to-transparent',
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
      className="relative aspect-video overflow-hidden border border-white/[0.06] bg-white/[0.02] cursor-zoom-in group/img transition-all duration-300 hover:border-white/[0.12]"
      onClick={onOpen}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={`object-cover transition-all duration-[1.2s] ease-out group-hover/img:scale-105 ${image.isBlurred && !isInView ? 'blur-md scale-105' : 'blur-0 scale-100'
          }`}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
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
  const accentCss = accentCSSMap[accentColor]

  const getStatusDot = (status: string, isCriticalPivot?: boolean) => {
    if (isCriticalPivot) return { bg: accentCss, ring: true }
    if (status === 'COMPLETED') return { bg: 'rgba(255,255,255,0.4)', ring: false }
    if (status === 'IN_PROGRESS') return { bg: accentCss, ring: true }
    if (status === 'REJECTED') return { bg: 'rgba(255,255,255,0.15)', ring: false }
    return { bg: 'rgba(255,255,255,0.1)', ring: false }
  }

  const getStatusBadge = (status: string, isCriticalPivot?: boolean) => {
    if (isCriticalPivot) return { label: 'Critical Pivot', color: accentCss }
    if (status === 'REJECTED') return { label: 'Rejected', color: 'rgba(255,255,255,0.3)' }
    if (status === 'IN_PROGRESS') return { label: 'In Progress', color: accentCss }
    return null
  }

  const allImages = phases
    .filter(p => p.image)
    .map(p => ({
      src: p.image!.src,
      alt: p.image!.alt,
      caption: p.image?.caption || p.title
    }))

  return (
    <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
      <div className="space-y-16">

        {/* ── Header ─── */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: accentCss }}
          >
            {header.tag.replace('//', '').trim()}
          </p>
          <h3 className="text-2xl md:text-3xl font-sans font-bold text-[var(--text-heading)] tracking-tight mb-3">
            {header.title}
          </h3>
          <p className="text-[var(--text-body)] text-base md:text-lg leading-relaxed font-light">
            {header.subtitle}
          </p>
        </motion.div>

        {/* ── Timeline ─── */}
        <div className="relative pl-4 md:pl-0">

          {/* Vertical guide line */}
          <div
            className={`absolute left-[7px] md:left-[7px] -top-12 -bottom-12 w-[2px] rounded-full bg-gradient-to-b ${accentGradientMap[accentColor]}`}
          />

          {/* Phase nodes */}
          <div className="space-y-10 md:space-y-14">
            {phases.map((phase, index) => {
              const imageIndex = allImages.findIndex(img => img.src === phase.image?.src)
              const dot = getStatusDot(phase.status, phase.isCriticalPivot)
              const badge = getStatusBadge(phase.status, phase.isCriticalPivot)

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="relative pl-10 md:pl-12 group"
                >
                  {/* Node dot */}
                  <div
                    className={`absolute left-0 top-[6px] w-4 h-4 rounded-full transition-all duration-300 ${dot.ring ? 'ring-2 ring-white/[0.1]' : ''}`}
                    style={{ backgroundColor: dot.bg }}
                  />

                  {/* Content */}
                  <div className="space-y-3">

                    {/* Phase tag + Title */}
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        Phase {phase.phase}
                      </span>
                      <h4 className={`text-lg md:text-xl font-medium tracking-tight ${phase.isCriticalPivot
                        ? ''
                        : 'text-[var(--text-heading)]'
                        }`}
                        style={phase.isCriticalPivot ? { color: accentCss } : undefined}
                      >
                        {phase.title.replace(/_/g, ' ')}
                      </h4>

                      {/* Status badge */}
                      {badge && (
                        <span
                          className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border"
                          style={{
                            color: badge.color,
                            borderColor: badge.color,
                            opacity: 0.7,
                          }}
                        >
                          {badge.label}
                        </span>
                      )}
                    </div>

                    {/* Body + Image */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
                      <div className="space-y-4">
                        <p className="text-[var(--text-body)] text-base leading-relaxed font-light">
                          {phase.body}
                        </p>

                        {/* Status indicator */}
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                          <span>{phase.status.replace('_', ' ')}</span>
                        </div>
                      </div>

                      {/* Image */}
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

        {/* ── Footer ─── */}
        {footer && (
          <div className="pt-8 border-t border-white/[0.06] mt-12">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1 shrink-0"
                style={{ color: accentCss }}
              >
                {footer.tag.replace(':', '')}
              </span>
              <p className="text-[var(--text-body)] text-base md:text-lg font-light leading-relaxed max-w-3xl">
                {footer.body}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
