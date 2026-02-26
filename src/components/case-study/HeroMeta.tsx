'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ImageLightbox from './ImageLightbox'
import { CalendarClock, ChartSpline, Bot } from 'lucide-react'
import CaseStudyNav from './CaseStudyNav'
import { heroTitleVariant, heroSubVariant, fadeIn } from '@/lib/animations'
import { recommendations } from '@/data/home'
import TextReveal from '@/components/ui/TextReveal'

interface HeroMetaProps {
  heroTitle: string
  heroSubheading?: string
  heroSubtitle: string
  coverImage?: {
    src: string
    alt: string
  }
  role: string
  company: string
  timeframe: string
  scope: string[]
  hasPrototype?: boolean
  caseStudySlug?: string
  demoVideoUrl?: string
  demoVideoLabel?: string
  demoVideoUrl2?: string
  demoVideoLabel2?: string
  publicDemoUrl?: string
  publicDemoLabel?: string
  dataSheetUrl?: string
  dataSheetLabel?: string
  validationLinks?: Array<{
    url: string
    label: string
  }>
  status?: {
    label: string
    variant?: 'live' | 'shipping' | 'development'
  }
  shareUrl?: string
  testimonialName?: string
  viewMode?: 'full' | 'presentation'
  setViewMode?: (mode: 'full' | 'presentation') => void
}

export default function HeroMeta({
  heroTitle,
  heroSubheading,
  heroSubtitle,

  role,
  company,
  timeframe,
  scope,
  hasPrototype = false,
  caseStudySlug,
  demoVideoUrl,
  demoVideoLabel,
  demoVideoUrl2,
  demoVideoLabel2,
  publicDemoUrl,
  publicDemoLabel,
  dataSheetUrl,
  dataSheetLabel,
  validationLinks,
  status,
  shareUrl,
  testimonialName,
  viewMode = 'full',
  setViewMode,
}: HeroMetaProps) {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage({ src, alt })
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  // Get case study number for eyebrow
  const getCaseStudyNumber = () => {
    if (caseStudySlug === 'reportcaster') return '001'
    if (caseStudySlug === 'ml-functions') return '002'
    if (caseStudySlug === 'iq-plugin') return '003'
    return '001'
  }

  return (
    <>
      <motion.header
        className="relative min-h-[60vh] flex items-center py-12 md:py-16 lg:py-20 bg-[var(--bg-primary)] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Navigation - Centered at the top */}
          <div className="mb-14 md:mb-20 flex justify-center">
            <CaseStudyNav />
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto">
            <div className="relative mb-16 isolate min-h-[400px] flex items-center">

              {/* Background Icon - Enlarged & Subtle */}
              <motion.div
                className="absolute -right-[20%] md:-right-[10%] top-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none opacity-[0.03]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                {caseStudySlug === 'reportcaster' ? (
                  <CalendarClock strokeWidth={0.5} className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] text-white" />
                ) : caseStudySlug === 'ml-functions' ? (
                  <ChartSpline strokeWidth={0.5} className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] text-white" />
                ) : (
                  <Bot strokeWidth={0.5} className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] text-white" />
                )}
              </motion.div>

              {/* Left: Title & Intro */}
              <div className="relative z-10 max-w-2xl lg:max-w-4xl space-y-8">
                <motion.div
                  variants={heroSubVariant}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Case study number eyebrow */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] text-white/50 text-sm font-medium border border-white/[0.06] rounded-full">
                    <span className="w-2 h-2 bg-[var(--accent-teal)]" />
                    <span>Case Study {getCaseStudyNumber()}</span>
                  </div>
                </motion.div>

                <TextReveal
                  as="h1"
                  className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium text-[var(--text-heading)] leading-[1.15] tracking-tight"
                  variant="slide-up"
                  stagger={0.06}
                  delay={0.2}
                  viewportAmount={0.3}
                  once={true}
                >
                  {caseStudySlug === 'reportcaster'
                    ? 'Customers Were Leaving. 40 Years Without Updates.'
                    : caseStudySlug === 'ml-functions'
                      ? 'Democratizing Machine Learning for Everyone'
                      : caseStudySlug === 'iq-plugin'
                        ? 'Driving Data Science Adoption in Enterprise BI'
                        : heroTitle}
                </TextReveal>

                <motion.p
                  variants={heroSubVariant}
                  initial="hidden"
                  animate="visible"
                  className="text-lg md:text-xl text-[var(--text-body)] leading-relaxed font-light max-w-2xl"
                >
                  {caseStudySlug === 'reportcaster'
                    ? 'The platform\'s enterprise scheduler was losing customers after 40+ years without meaningful updates. The goal: retain them. The challenge: modernize a 50-year-old system with zero documentation.'
                    : caseStudySlug === 'ml-functions'
                      ? 'Turning a black-box data science process into a guided, 4-step workflow.'
                      : (
                        <>
                          {heroSubheading && <>{heroSubheading} </>}
                          {heroSubtitle}
                        </>
                      )
                  }
                </motion.p>
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.4,
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 border-t border-white/[0.06]"
            >
              {/* Col 1: Role & Expertise */}
              <motion.div className="space-y-4" variants={{ hidden: { opacity: 0, y: 12, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">Role & Expertise</h3>
                <div className="space-y-3">
                  <p className="font-medium text-[var(--text-heading)] text-lg">{role}</p>
                  {scope.length > 0 && (
                    <p className="text-sm text-[var(--text-body)] leading-relaxed font-medium">
                      {scope.join(' • ')}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Col 2: Timeline */}
              <motion.div className="space-y-4" variants={{ hidden: { opacity: 0, y: 12, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">Timeline</h3>
                <div className="space-y-2">
                  <p className="font-medium text-[var(--text-heading)] text-lg">{timeframe.split('|')[0].trim()}</p>

                  {/* Status Display */}
                  {timeframe.includes('|') ? (
                    <div className="inline-flex items-center gap-2 bg-[var(--accent-teal-soft)]/10 px-3 py-1 w-fit border border-[var(--accent-teal)]/20 rounded-full">
                      <span className="w-2 h-2 bg-[var(--accent-teal)]"></span>
                      <p className="text-sm text-[var(--accent-teal)] font-bold tracking-wide">
                        {timeframe.split('|')[1].trim().toUpperCase()}
                      </p>
                    </div>
                  ) : status && (
                    <div className="inline-flex items-center gap-2 bg-white/[0.04] px-3 py-1 w-fit border border-white/[0.06] rounded-full">
                      <span className={`w-2 h-2 ${status.variant === 'live' ? 'bg-[var(--accent-teal)]' : 'bg-amber-500'}`}></span>
                      <p className="text-xs text-[var(--text-muted)] font-bold tracking-wide font-mono uppercase">
                        {status.label}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Col 3: Assets */}
              <motion.div className="space-y-4" variants={{ hidden: { opacity: 0, y: 12, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">Assets</h3>
                <div className="flex flex-col gap-3">
                  {dataSheetUrl && (
                    <a
                      href={dataSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-3 -ml-3 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] rounded-xl transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    >
                      <div className="w-8 h-8 bg-white/[0.06] flex items-center justify-center text-[var(--text-muted)] rounded-lg group-hover:bg-[var(--accent-teal)] group-hover:text-white transition-colors duration-300">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[var(--text-body)] group-hover:text-[var(--text-heading)]">{dataSheetLabel || 'View Data Sheet'}</p>
                      </div>
                    </a>
                  )}

                  {validationLinks?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-3 -ml-3 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] rounded-xl transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    >
                      <div className="w-8 h-8 bg-white/[0.06] flex items-center justify-center text-[var(--text-muted)] rounded-lg group-hover:bg-[var(--accent-teal)] group-hover:text-white transition-colors duration-300">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[var(--text-body)] group-hover:text-[var(--text-heading)]">{link.label}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </motion.header>

      {/* Subtle Section Transition */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"></div>

      {/* Image Lightbox */}
      {lightboxImage && (
        <ImageLightbox
          isOpen={!!lightboxImage}
          onClose={closeLightbox}
          imageSrc={lightboxImage.src}
          imageAlt={lightboxImage.alt}
        />
      )}
    </>
  )
}
