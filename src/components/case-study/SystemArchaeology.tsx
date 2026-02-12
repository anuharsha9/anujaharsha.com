'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import ComponentHeading from '@/components/ui/ComponentHeading'
import LightboxImage from '@/components/ui/LightboxImage'
import { useLightbox } from '@/contexts/LightboxContext'
import LockedContent from './LockedContent'

interface SystemArchaeologyProps {
  isLightBackground?: boolean
  caseStudySlug?: string
}

export default function SystemArchaeology({ isLightBackground = true, caseStudySlug = 'reportcaster' }: SystemArchaeologyProps) {
  const { openLightbox } = useLightbox()

  const auditFiles = [
    {
      filename: 'LEGACY_SCHEDULER.EXE',
      status: 'FRAGMENTED',
      statusColor: 'text-red-600',
      image: '/images/case-study/ReportCaster/RC legacy schedule dialog properties.png',
      alt: 'Legacy Schedule Dialog Properties',
      annotation: '// UX_FAILURE: 5 distinct interfaces required for 1 workflow.',
    },
    {
      filename: 'DISTRIBUTION_MODULE.DLL',
      status: 'UNDOCUMENTED',
      statusColor: 'text-amber-600',
      image: '/images/case-study/ReportCaster/RC legacy distribution list UI.png',
      alt: 'Legacy Distribution List',
      annotation: '// UX_FAILURE: Separate screen for a sub-task of scheduling.',
    },
    {
      filename: 'ACCESS_CONTROL.SYS',
      status: 'HIDDEN',
      statusColor: 'text-purple-600',
      image: '/images/case-study/ReportCaster/RC legacy access list UI.png',
      alt: 'Legacy Access List',
      annotation: '// UX_FAILURE: Critical security settings buried in separate app.',
    },
    {
      filename: 'RC_EXPLORER.EXE',
      status: 'SCATTERED',
      statusColor: 'text-blue-600',
      image: '/images/case-study/ReportCaster/RC legacy explorer.png',
      alt: 'Legacy RC Explorer',
      annotation: '// UX_FAILURE: Disconnected asset browser with no hub integration.',
    },
    {
      filename: 'RC_ADMIN.SYS',
      status: 'ISOLATED',
      statusColor: 'text-orange-600',
      image: '/images/case-study/ReportCaster/RC legacy admin status.png',
      alt: 'Legacy RC Admin Status',
      annotation: '// UX_FAILURE: Admin functions siloed in completely separate tool.',
    },
  ]

  const handleImageClick = (image: { src: string; alt: string; caption?: string }, index: number) => {
    const allImages = auditFiles.map(f => ({
      src: f.image,
      alt: f.alt,
      caption: f.annotation,
    }))
    openLightbox(image, allImages, index)
  }

  // Legacy images grid component (to be locked)
  const LegacyImagesGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {auditFiles.map((file, index) => (
        <motion.div
          key={file.filename}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
          className="bg-slate-50 border border-slate-200 overflow-hidden hover:border-slate-300 transition-all duration-300"
        >
          {/* Header Bar */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex justify-between items-center">
            <span className="font-mono text-xs text-slate-500 truncate">
              FILE: {file.filename}
            </span>
            <span className={`font-mono text-[10px] uppercase tracking-widest ${file.statusColor}`}>
              [{file.status}]
            </span>
          </div>

          {/* Image */}
          <div
            className="relative aspect-[4/3] cursor-pointer group"
            onClick={() => handleImageClick({ src: file.image, alt: file.alt, caption: file.annotation }, index)}
          >
            <Image
              src={file.image}
              alt={file.alt}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-300 blur-sm"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Hover/Tap Overlay */}
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
              {/* Desktop Hover State */}
              <div className="hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/90 text-white px-4 py-2 items-center gap-2 transform translate-y-2 group-hover:translate-y-0 text-sm font-medium border border-white/10">
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                <span>Click to examine</span>
              </div>

              {/* Mobile Tap Indication (Always visible but subtle) */}
              <div className="lg:hidden flex bg-slate-900/80 text-white px-3 py-1.5 items-center gap-1.5 text-xs font-medium backdrop-blur-sm border border-white/10 shadow-lg">
                <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Tap to view</span>
              </div>
            </div>
          </div>

          {/* Caption / Annotation */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <p className="font-mono text-xs text-slate-600 leading-relaxed">
              {file.annotation}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-10"
    >
      {/* THE NARRATIVE: Challenge Block - PUBLIC */}
      {/* THE NARRATIVE: Challenge Block - PUBLIC */}
      <ComponentHeading
        variant="block"
        align="center"
        tag="// UNDOCUMENTED_LEGACY"
        title="50-year-old black box. Zero documentation."
        description="I had to reverse-engineer the entire system logic by interviewing 12 engineers and reading 5,000 lines of legacy code."
        className="mb-16"
        color="blue"
      />

      {/* THE EVIDENCE GRID: Legacy Audit Files - LOCKED */}
      <LockedContent
        password="anu-access"
        caseStudySlug={caseStudySlug}
        unlockMessage="Password required to view legacy sandbox UI screenshots"
        isLightBackground={isLightBackground}
      >
        <LegacyImagesGrid />
      </LockedContent>

      {/* THE INSIGHT FOOTER: Dark Mode System Insight - PUBLIC */}
      <div className="rounded-xl bg-[#1e1e1e] shadow-2xl border border-white/10 overflow-hidden mx-auto max-w-4xl">
        {/* macOS Terminal Header */}
        <div className="h-10 bg-[#2d2d2d] flex items-center justify-center relative border-b border-black/40">
          {/* Traffic Lights */}
          <div className="flex gap-2 absolute left-4 top-1/2 -translate-y-1/2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-inner" />
          </div>
          {/* Title */}
          <span className="font-mono text-xs text-slate-400/80 tracking-wide font-medium flex items-center gap-2">
            <span className="opacity-50">~/logs/</span>discovery.log
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-8 font-mono text-sm leading-relaxed text-slate-300">
          <div className="flex gap-3">
            <span className="text-emerald-400 font-bold shrink-0">&gt;</span>
            <div className="space-y-4">
              <p className="text-emerald-400 font-bold tracking-wide text-xs uppercase mb-1">
                DISCOVERY_INSIGHT:
              </p>
              <p className="text-slate-300 leading-relaxed">
                I realized ReportCaster wasn&apos;t one product — it was <strong className="text-white font-medium">five disparate subsystems masquerading as one</strong>. Unifying them required not just a UI refresh, but a complete architectural convergence.
              </p>
            </div>
          </div>

          {/* Blinking Cursor */}
          <span className="inline-block w-2.5 h-4 bg-emerald-500/50 animate-pulse mt-4 ml-4" />
        </div>
      </div>
    </motion.div>
  )
}

