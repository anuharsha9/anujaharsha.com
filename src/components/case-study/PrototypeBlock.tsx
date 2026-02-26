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

export default function PrototypeBlock({ prototypeMedia, caseStudySlug, isLightBackground = false, password = 'anu-access' }: PrototypeBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Parallax effect for video container
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  if (!prototypeMedia) return null

  // Before/After comparison — uses its own animation variants
  if (prototypeMedia.multiBeforeAfter) {
    return (
      <section id="prototype" className="py-16 md:py-20 lg:py-24 bg-[var(--bg-primary)]">
        <div className="space-y-8 max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16" ref={ref}>
          <MultiBeforeAfterVideo
            before={prototypeMedia.multiBeforeAfter.before}
            after={prototypeMedia.multiBeforeAfter.after}
            isLightBackground={false}
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
      <section id="prototype" className="py-16 md:py-20 lg:py-24 bg-[var(--bg-primary)]">
        <div className="space-y-8 max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16" ref={ref}>
          <BeforeAfterVideo
            before={prototypeMedia.beforeAfter.before}
            after={prototypeMedia.beforeAfter.after}
            isLightBackground={false}
            comparisonNotes={prototypeMedia.beforeAfter.comparisonNotes}
            password={password}
            caseStudySlug={caseStudySlug}
          />
        </div>
      </section>
    )
  }

  // Fallback video — with MotionSection for scroll-triggered entrance
  return (
    <MotionSection id="prototype" className="py-16 md:py-20 lg:py-24 bg-[var(--bg-primary)]">
      <div className="space-y-8 max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16" ref={ref}>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 bg-white/[0.06]"></div>
            <h2 className="text-[var(--text-heading)] text-4xl md:text-5xl font-sans">{prototypeMedia.title}</h2>
            <div className="h-px flex-1 bg-white/[0.06]"></div>
          </div>
          {prototypeMedia.description && <p className="text-[var(--text-muted)] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">{prototypeMedia.description}</p>}
        </div>

        {!prototypeMedia.videoUrl && !prototypeMedia.videoEmbedUrl && (
          <div className="text-center p-12 bg-white/[0.02] rounded-xl border border-white/[0.06]">
            <p className="text-[var(--text-dim)]">No video content available</p>
          </div>
        )}

        {prototypeMedia.videoUrl && (
          <div className="space-y-6">
            <ComponentHeading
              variant="block"
              tag="DEMO"
              title="Video Walkthrough"
              description="This is an actual video walkthrough created and narrated by me. Watch to see how the final design works in practice."
              className="mb-6"
              color="teal"
            />
            <div className="max-w-[1440px] mx-auto overflow-hidden rounded-2xl">
              <motion.div
                style={{ y }}
                className="relative w-full aspect-video border border-white/[0.08] bg-black/20 shadow-2xl shadow-black/30 rounded-2xl overflow-hidden"
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
              tag="DEMO"
              title="Video Walkthrough"
              description="Watch the walkthrough to see how the final design works in practice."
              className="mb-6"
              color="teal"
            />
            <div className="max-w-[1440px] mx-auto overflow-hidden rounded-2xl">
              <motion.div
                style={{ y }}
                className="relative w-full aspect-video border border-white/[0.08] bg-black/20 shadow-2xl shadow-black/30 rounded-2xl overflow-hidden"
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
