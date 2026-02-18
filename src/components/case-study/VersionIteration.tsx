'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import ImageLightbox from './ImageLightbox'
import AutoSequenceDataViewer from './AutoSequenceDataViewer'

interface VersionData {
  id: string
  title: string
  body: string
  images?: { src: string; alt: string; caption?: string; fullWidth?: boolean; sensitive?: boolean }[]
  subsections?: { title: string; description?: string; images?: { src: string; alt: string; caption?: string; fullWidth?: boolean; sensitive?: boolean }[] }[]
}

interface VersionIterationProps {
  v1?: VersionData
  v2?: VersionData
  v3?: VersionData
  isLightBackground?: boolean
}

export default function VersionIteration({ v1, v2, v3, isLightBackground = true }: VersionIterationProps) {
  // Guard: all three versions are required for the iteration timeline
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption?: string } | null>(null)
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string; caption?: string }>>([])
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0)

  // Guard: all three versions are required for the iteration timeline
  if (!v1 || !v2 || !v3) return null

  const imageBorderRadius = ''
  const imageShadow = 'shadow-md'
  const imageOutline = 'outline outline-1 outline-slate-200/50 outline-offset-[-1px]'

  const openLightbox = (src: string, alt: string, caption?: string, images?: Array<{ src: string; alt: string; caption?: string }>, index?: number) => {
    setLightboxImage({ src, alt, caption })
    if (images && index !== undefined) {
      setLightboxImages(images)
      setLightboxCurrentIndex(index)
    } else {
      setLightboxImages([])
      setLightboxCurrentIndex(0)
    }
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    setLightboxImages([])
    setLightboxCurrentIndex(0)
  }

  const handleLightboxNavigate = (index: number) => {
    if (lightboxImages[index]) {
      const img = lightboxImages[index]
      setLightboxImage({ src: img.src, alt: img.alt, caption: img.caption })
      setLightboxCurrentIndex(index)
    }
  }

  const versions = [
    {
      id: 'v1' as const,
      label: 'V1',
      title: v1.title,
      section: v1,
      approach: 'Independent Product',
      description: 'Standalone RC environment — dedicated scheduling, explorer, and admin',
      rationale: 'Matched existing platform patterns (Designer, Data Flows) and industry standards.',
      rejection: 'Leadership mandated all workflows centralized in the Hub.',
      status: 'rejected' as const,
      pivotReason: 'Pivot: Leadership mandated Hub integration',
      validation: {
        headline: '2025 Update: V1 Is Being Built',
        body: 'Customers specifically requested an independent RC environment. Leadership approved. My "rejected" V1 is now in active development — design instincts validated by customer data.',
      },
      extensibility: null,
    },
    {
      id: 'v2' as const,
      label: 'V2',
      title: v2.title,
      section: v2,
      approach: 'Hub Plugin',
      description: 'RC as a plugin with integrated navigation and consolidated subsystems',
      rationale: 'Brought RC into the Hub to meet leadership requirements.',
      rejection: 'Engineering estimated 6+ months — too much effort for the timeline.',
      status: 'rejected' as const,
      pivotReason: 'Pivot: Engineering constraints forced simplification',
      validation: null,
      extensibility: null,
    },
    {
      id: 'v3' as const,
      label: 'V3',
      title: v3.title,
      section: v3,
      approach: 'Platform-Native',
      description: 'Modal-based workflows from the + menu',
      rationale: 'Designed WITH platform patterns (+ menu, modals) — minimal engineering, maximum impact.',
      rejection: null,
      status: 'shipped' as const,
      pivotReason: null,
      validation: null,
      extensibility: {
        headline: 'Designed for Platform-Wide Reuse',
        body: 'Decoupling the scheduler from any specific location means scheduling can surface from anywhere — Designer, Reporting Server, IQ Plugin, or any future product.',
        futureIntegrations: [
          'Schedule from WebFOCUS Designer',
          'Schedule from Reporting Server',
          'Schedule Insights from IQ Plugin',
          'Any future platform surface',
        ],
        principle: 'Enterprise design means creating space for tomorrow\'s features without architectural rewrites.',
      }
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
      >
        <ComponentHeading
          variant="block"
          align="center"
          tag="DESIGN EVOLUTION"
          title="Three Architectures. Two Rejections. One Shipped."
          description="Each rejection narrowed the constraint space until the right solution emerged."
          color="teal"
          className="mb-0"
        />
      </motion.div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Timeline Spine */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-slate-200" />

        {/* Version Cards */}
        <div className="space-y-16 md:space-y-24">
          {versions.map((version, index) => {
            const isSuccess = version.status === 'shipped'
            const isLast = index === versions.length - 1

            return (
              <div key={version.id} className="relative">
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-8 top-0 flex flex-col items-center h-full -ml-[9px] md:-ml-[1px]">
                  <div className={`w-4 h-4 rounded-full border-[3px] bg-white z-10 ${isSuccess ? 'border-emerald-500' : 'border-slate-300'
                    }`} />
                </div>

                {/* Content Container */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, delay: index * 0.1 }
                    }
                  }}
                  className="pl-12 md:pl-24"
                >
                  <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left Column: Narrative */}
                    <div className="lg:w-[40%] space-y-8">

                      {/* Header Group */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                            {version.label}
                          </span>
                          {version.status === 'shipped' ? (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                              Shipped
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                              Rejected
                            </span>
                          )}
                        </div>

                        <h3 className="text-3xl md:text-4xl font-sans text-slate-900 leading-tight">
                          {version.approach}
                        </h3>

                        <p className="text-lg text-slate-600 font-light leading-relaxed">
                          {version.description}
                        </p>
                      </div>

                      {/* Rationale & Insights - No Boxes */}
                      <div className="space-y-6 pt-4 border-t border-slate-100">
                        <div>
                          <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Rationale</h5>
                          <p className="text-sm text-slate-600 leading-relaxed font-light">
                            {version.rationale}
                          </p>
                        </div>

                        {version.rejection && (
                          <div>
                            <h5 className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-2">Constraint</h5>
                            <p className="text-sm text-slate-600 leading-relaxed italic font-light">
                              {version.rejection}
                            </p>
                          </div>
                        )}

                        {version.pivotReason && !isLast && (
                          <div className="pt-4">
                            <div className="flex items-center gap-2 text-amber-600">
                              <ArrowDown className="w-3 h-3" />
                              <span className="text-[10px] font-bold uppercase tracking-wider">
                                {version.pivotReason}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Version Body Text */}
                      <div className="text-slate-500 font-light text-sm leading-relaxed space-y-4">
                        {version.section.body.split('\n\n').slice(0, 2).map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>

                    </div>

                    {/* Right Column: Visuals */}
                    <div className="lg:w-[60%] space-y-8">
                      {/* Main Images */}
                      {version.section.images && version.section.images.length > 0 && (
                        <AutoSequenceDataViewer
                          images={version.section.images.map(img => ({
                            src: img.src,
                            alt: img.alt,
                            caption: img.caption
                          }))}
                          title={version.title}
                          className="w-full"
                          aspectRatio="aspect-video"
                        />
                      )}

                      {/* Shipped Subsections (Key Screens) */}
                      {isSuccess && version.section.subsections && version.section.subsections.length > 0 && (
                        <div className="pt-12 border-t border-slate-100">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-6">
                            Shipped Workflows
                          </p>
                          <AutoSequenceDataViewer
                            images={version.section.subsections.flatMap(sub =>
                              sub.images ? sub.images.map(img => ({
                                src: img.src,
                                alt: img.alt,
                                caption: `${sub.title}: ${img.caption || img.alt}`
                              })) : []
                            )}
                            title={`${version.title} - Shipped Workflows`}
                            className="w-full"
                            aspectRatio="aspect-video"
                          />
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>

                {/* Extra Callouts (Validation / Extensibility) - Cleaned Up */}
                {('extensibility' in version && version.extensibility) && (
                  <div className="pl-12 md:pl-24 mt-12 mb-12">
                    <div className="bg-violet-50/30 p-8 md:p-10 border-l-2 border-violet-200">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400 block mb-4">
                        Looking Forward
                      </span>
                      <h4 className="text-2xl md:text-3xl font-sans text-violet-900 mb-4">
                        {version.extensibility.headline}
                      </h4>
                      <p className="text-violet-800/80 font-light leading-relaxed max-w-2xl mb-8">
                        {version.extensibility.body}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                        {version.extensibility.futureIntegrations.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-violet-700/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-300" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {('validation' in version && version.validation) && (
                  <div className="pl-12 md:pl-24 mt-12 mb-12">
                    <div className="bg-emerald-50/30 p-8 md:p-10 border-l-2 border-emerald-200">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 block mb-4">
                        Validation
                      </span>
                      <h4 className="text-2xl md:text-3xl font-sans text-emerald-900 mb-4">
                        {version.validation.headline}
                      </h4>
                      <p className="text-emerald-800/80 font-light leading-relaxed max-w-2xl">
                        {version.validation.body}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <ImageLightbox
          isOpen={!!lightboxImage}
          onClose={closeLightbox}
          imageSrc={lightboxImage.src}
          imageAlt={lightboxImage.alt}
          imageCaption={lightboxImage.caption}
          images={lightboxImages.length > 0 ? lightboxImages : undefined}
          currentIndex={lightboxCurrentIndex}
          onNavigate={lightboxImages.length > 0 ? handleLightboxNavigate : undefined}
        />
      )}
    </div>
  )
}
