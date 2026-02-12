'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'
import LockedContent from './LockedContent'
import ImageLightbox from './ImageLightbox'

interface DesignSystemShowcaseProps {
  isLightBackground?: boolean
  caseStudySlug?: string
}

// Each image has a size hint for Bento layout
const designSystemImages = [
  { src: '/images/design-system/Color Palette.png', alt: 'Color Palette', title: 'Color Palette', size: 'lg' },
  { src: '/images/design-system/Typography.png', alt: 'Typography', title: 'Typography', size: 'lg' },
  { src: '/images/design-system/Buttons.png', alt: 'Buttons', title: 'Buttons', size: 'md' },
  { src: '/images/design-system/Form Elements.png', alt: 'Form Elements', title: 'Form Elements', size: 'md' },
  { src: '/images/design-system/Modals.png', alt: 'Modals', title: 'Modals', size: 'sm' },
  { src: '/images/design-system/Dialog Design Specifications.png', alt: 'Dialog Design Specifications', title: 'Dialog Specs', size: 'sm' },
  { src: '/images/design-system/Alert Dialogs.png', alt: 'Alert Dialogs', title: 'Alert Dialogs', size: 'sm' },
  { src: '/images/design-system/Confirmation Dialogs.png', alt: 'Confirmation Dialogs', title: 'Confirmation Dialogs', size: 'sm' },
  { src: '/images/design-system/Navigation Bars.png', alt: 'Navigation Bars', title: 'Navigation Bars', size: 'md' },
  { src: '/images/design-system/Headers & Dividers.png', alt: 'Headers & Dividers', title: 'Headers & Dividers', size: 'sm' },
  { src: '/images/design-system/Accordions & Tabs.png', alt: 'Accordions & Tabs', title: 'Accordions & Tabs', size: 'md' },
  { src: '/images/design-system/Informational Tooltips.png', alt: 'Informational Tooltips', title: 'Tooltips', size: 'sm' },
  { src: '/images/design-system/Tooltip usage.png', alt: 'Tooltip usage', title: 'Tooltip Usage', size: 'sm' },
  { src: '/images/design-system/Messaging.png', alt: 'Messaging', title: 'Messaging', size: 'sm' },
  { src: '/images/design-system/Chips UI.png', alt: 'Chips UI', title: 'Chips UI', size: 'sm' },
  { src: '/images/design-system/Paging.png', alt: 'Paging', title: 'Paging', size: 'sm' },
  { src: '/images/design-system/Grid: Tabular Data.png', alt: 'Grid: Tabular Data', title: 'Grid: Tabular Data', size: 'lg' },
  { src: '/images/design-system/Hub Asset Tiles.png', alt: 'Hub Asset Tiles', title: 'Hub Asset Tiles', size: 'md' },
  { src: '/images/design-system/DSML Model Tiles.png', alt: 'DSML Model Tiles', title: 'DSML Model Tiles', size: 'sm' },
  { src: '/images/design-system/Nodes.png', alt: 'Nodes', title: 'Nodes', size: 'sm' },
  { src: '/images/design-system/Designer UI.png', alt: 'Designer UI', title: 'Designer UI', size: 'md' },
  { src: '/images/design-system/Settings Panel Spacing guide.png', alt: 'Settings Panel Spacing guide', title: 'Spacing Guide', size: 'sm' },
  { src: '/images/design-system/Content Guidelines.png', alt: 'Content Guidelines', title: 'Content Guidelines', size: 'sm' },
  { src: '/images/design-system/Samples.png', alt: 'Samples', title: 'Samples', size: 'sm' },
]

export default function DesignSystemShowcase({ caseStudySlug }: DesignSystemShowcaseProps) {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; title?: string } | null>(null)
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string; title?: string }>>([])
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0)

  const openLightbox = (src: string, alt: string, title?: string, index?: number) => {
    // ... functional logic same as before ... 
    // Re-implementing simplified for brevity in replacement, essentially mapping logic
    setLightboxImage({ src, alt, title })
    setLightboxImages(designSystemImages.map((img) => ({ src: img.src, alt: img.alt, title: img.title })))
    setLightboxCurrentIndex(index ?? designSystemImages.findIndex((img) => img.src === src))
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    setLightboxImages([])
  }

  const handleLightboxNavigate = (index: number) => {
    setLightboxCurrentIndex(index)
    if (lightboxImages[index]) {
      const img = lightboxImages[index];
      setLightboxImage({ src: img.src, alt: img.alt, title: img.title })
    }
  }

  return (
    <LockedContent
      password="anu-access"
      caseStudySlug={caseStudySlug}
      unlockMessage="Password required to view design system documentation"
      isLightBackground={true}
    >
      <div className="space-y-12 py-8">
        {/* Header - Minimal & Clean */}
        {/* Header - Minimal & Clean */}
        <ComponentHeading
          variant="block"
          tag="Component Library"
          title="Design System Components"
          description="Shared design system used across all three case studies. A unified language for coherence."
          align="center"
          color="slate"
        />

        {/* Bento Grid - Clean & Edgeless */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {designSystemImages.map((image, index) => {
            const spanClass =
              image.size === 'lg' ? 'md:col-span-2 md:row-span-2'
                : image.size === 'md' ? 'md:col-span-1 md:row-span-1'
                  : ''

            return (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`
                  group relative cursor-zoom-in rounded-2xl overflow-hidden bg-slate-50
                  hover:shadow-lg transition-all duration-500 hover:-translate-y-1
                  ${spanClass}
                `}
                onClick={() => openLightbox(image.src, image.alt, image.title, index)}
              >
                {/* Image Container */}
                <div className="relative w-full h-full min-h-[160px] flex items-center justify-center p-6">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/[0.02] transition-colors duration-300" />
                </div>

                {/* Caption - Floating clean label */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-sm border border-slate-100">
                    {image.title}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer Note - Clean */}
        <div className="border-t border-slate-100 pt-8 flex items-center gap-3 text-slate-400">
          <span className="text-[10px] uppercase tracking-widest font-bold">
            {designSystemImages.length} Artifacts
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-200" />
          <span className="text-sm font-light">Interact to view details</span>
        </div>
      </div>

      {lightboxImage && (
        <ImageLightbox
          isOpen={!!lightboxImage}
          onClose={closeLightbox}
          imageSrc={lightboxImage.src}
          imageAlt={lightboxImage.alt}
          imageCaption={lightboxImage.title}
          images={lightboxImages}
          currentIndex={lightboxCurrentIndex}
          onNavigate={handleLightboxNavigate}
        />
      )}
    </LockedContent>
  )
}
