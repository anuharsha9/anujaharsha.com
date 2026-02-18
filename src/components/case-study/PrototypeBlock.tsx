'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import MotionSection from '@/components/ui/MotionSection'
import CustomVideoPlayer from '@/components/video/CustomVideoPlayer'
import BeforeAfterVideo from './BeforeAfterVideo'
import MultiBeforeAfterVideo from './MultiBeforeAfterVideo'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface PrototypeBlockProps {
  prototypeMedia?: {
    title: string
    description?: string
    figmaEmbedUrl?: string
    videoEmbedUrl?: string
    videoUrl?: string
    videoPoster?: string
    beforeAfter?: {
      before: { title: string; videoUrl?: string; videoEmbedUrl?: string; videoPoster?: string; description?: string }
      after: { title: string; videoUrl: string; videoPoster?: string; description?: string; isPublic?: boolean }
      comparisonNotes?: { before: string[]; after: string[] }
    }
    multiBeforeAfter?: {
      before: { title: string; videos: { title: string; videoUrl?: string; videoEmbedUrl?: string; videoPoster?: string; description?: string }[] }
      after: { title: string; videoUrl: string; videoPoster?: string; description?: string }
      comparisonNotes?: { before: string[]; after: string[] }
    }
  }
  caseStudySlug?: string
  isLightBackground?: boolean
  password?: string
}

export default function PrototypeBlock({ prototypeMedia, caseStudySlug, isLightBackground = true, password = 'anu-access' }: PrototypeBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Parallax effect for video container
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  if (!prototypeMedia) return null

  // If using specific comparison components, they handle their own animations (variants based).
  // We avoid wrapping them in MotionSection to prevent double-fades or conflicting triggers.
  if (prototypeMedia.multiBeforeAfter) {
    return (
      <section id="prototype" className="py-10 md:py-14 bg-white">
        <div className="space-y-8" ref={ref}>
          <MultiBeforeAfterVideo
            before={prototypeMedia.multiBeforeAfter.before}
            after={prototypeMedia.multiBeforeAfter.after}
            isLightBackground={true}
            comparisonNotes={prototypeMedia.multiBeforeAfter.comparisonNotes}
            password={password}
            caseStudySlug={caseStudySlug}
          />
        </div>
      </section>
    )
  }

  if (prototypeMedia.beforeAfter) {
    return (
      <section id="prototype" className="py-10 md:py-14 bg-white">
        <div className="space-y-8" ref={ref}>
          <BeforeAfterVideo
            before={prototypeMedia.beforeAfter.before}
            after={prototypeMedia.beforeAfter.after}
            isLightBackground={true}
            comparisonNotes={prototypeMedia.beforeAfter.comparisonNotes}
            password={password}
            caseStudySlug={caseStudySlug}
          />
        </div>
      </section>
    )
  }

  // For fallback video, we use MotionSection to provide the entry animation
  return (
    <MotionSection id="prototype" className="py-10 md:py-14 bg-white">
      <div className="space-y-8" ref={ref}>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 bg-slate-200"></div>
            <h2 className="text-slate-900 text-4xl md:text-5xl font-sans">{prototypeMedia.title}</h2>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>
          {prototypeMedia.description && <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">{prototypeMedia.description}</p>}
        </div>

        {!prototypeMedia.videoUrl && !prototypeMedia.videoEmbedUrl && (
          <div className="text-center p-12 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-slate-400">No video content available</p>
          </div>
        )}

        {prototypeMedia.videoUrl && (
          <div className="space-y-6">
            <ComponentHeading
              variant="block"
              tag="// DEMO"
              title="Video Walkthrough"
              description="This is an actual video walkthrough created and narrated by me. Watch to see how the final design works in practice."
              className="mb-6"
              align="center"
              color="teal"
            />
            <div className="max-w-[1440px] mx-auto overflow-hidden rounded-2xl">
              <motion.div
                style={{ y }}
                className="relative w-full aspect-video border border-slate-200 bg-white shadow-sm"
              >
                <CustomVideoPlayer src={prototypeMedia.videoUrl} className="" />
              </motion.div>
            </div>
          </div>
        )}

        {prototypeMedia.videoEmbedUrl && !prototypeMedia.videoUrl && (
          <div className="space-y-6">
            <ComponentHeading
              variant="block"
              tag="// DEMO"
              title="Video Walkthrough"
              description="Watch the walkthrough to see how the final design works in practice."
              className="mb-6"
              align="center"
              color="teal"
            />
            <div className="max-w-[1440px] mx-auto overflow-hidden rounded-2xl">
              <motion.div
                style={{ y }}
                className="relative w-full aspect-video border border-slate-200 bg-white shadow-sm"
              >
                <iframe src={prototypeMedia.videoEmbedUrl} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Video Walkthrough" />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </MotionSection>
  )
}
