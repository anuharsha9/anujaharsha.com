'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import LockedContent from './LockedContent'
import { useLightbox } from '@/contexts/LightboxContext'

interface DesignSystemShowcaseProps {
  isLightBackground?: boolean
  caseStudySlug?: string
}

const designSystemImages = [
  { src: '/images/design-system/Color Palette.png', alt: 'Color Palette', title: 'Color Palette' },
  { src: '/images/design-system/Typography.png', alt: 'Typography', title: 'Typography' },
  { src: '/images/design-system/Buttons.png', alt: 'Buttons', title: 'Buttons' },
  { src: '/images/design-system/Form Elements.png', alt: 'Form Elements', title: 'Form Elements' },
  { src: '/images/design-system/Modals.png', alt: 'Modals', title: 'Modals' },
  { src: '/images/design-system/Dialog Design Specifications.png', alt: 'Dialog Design Specifications', title: 'Dialog Specs' },
  { src: '/images/design-system/Alert Dialogs.png', alt: 'Alert Dialogs', title: 'Alert Dialogs' },
  { src: '/images/design-system/Confirmation Dialogs.png', alt: 'Confirmation Dialogs', title: 'Confirmation Dialogs' },
  { src: '/images/design-system/Navigation Bars.png', alt: 'Navigation Bars', title: 'Navigation Bars' },
  { src: '/images/design-system/Headers & Dividers.png', alt: 'Headers & Dividers', title: 'Headers & Dividers' },
  { src: '/images/design-system/Accordions & Tabs.png', alt: 'Accordions & Tabs', title: 'Accordions & Tabs' },
  { src: '/images/design-system/Informational Tooltips.png', alt: 'Informational Tooltips', title: 'Tooltips' },
  { src: '/images/design-system/Tooltip usage.png', alt: 'Tooltip usage', title: 'Tooltip Usage' },
  { src: '/images/design-system/Messaging.png', alt: 'Messaging', title: 'Messaging' },
  { src: '/images/design-system/Chips UI.png', alt: 'Chips UI', title: 'Chips UI' },
  { src: '/images/design-system/Paging.png', alt: 'Paging', title: 'Paging' },
  { src: '/images/design-system/Grid: Tabular Data.png', alt: 'Grid: Tabular Data', title: 'Grid: Tabular Data' },
  { src: '/images/design-system/Hub Asset Tiles.png', alt: 'Hub Asset Tiles', title: 'Hub Asset Tiles' },
  { src: '/images/design-system/DSML Model Tiles.png', alt: 'DSML Model Tiles', title: 'DSML Model Tiles' },
  { src: '/images/design-system/Nodes.png', alt: 'Nodes', title: 'Nodes' },
  { src: '/images/design-system/Designer UI.png', alt: 'Designer UI', title: 'Designer UI' },
  { src: '/images/design-system/Settings Panel Spacing guide.png', alt: 'Settings Panel Spacing guide', title: 'Spacing Guide' },
  { src: '/images/design-system/Content Guidelines.png', alt: 'Content Guidelines', title: 'Content Guidelines' },
  { src: '/images/design-system/Samples.png', alt: 'Samples', title: 'Samples' },
]

export default function DesignSystemShowcase({ caseStudySlug }: DesignSystemShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { openLightbox } = useLightbox()

  // Format data for lightbox
  const lightboxImages = designSystemImages.map(img => ({
    src: img.src,
    alt: img.alt,
    caption: img.title
  }))

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % designSystemImages.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + designSystemImages.length) % designSystemImages.length)
  }

  // Robust calculation of visual state for each item
  const getVisualState = (index: number) => {
    const length = designSystemImages.length
    // Calculate shortest distance in circular array
    let offset = (index - currentIndex + length) % length
    if (offset > length / 2) offset -= length

    // We only render items close to center to save performance, handled in rendering loop
    const distance = Math.abs(offset)
    const direction = Math.sign(offset) // -1 left, 0 center, 1 right

    // Style logic
    if (distance === 0) {
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
        blur: 0,
        display: 'block'
      }
    } else if (distance === 1) {
      return {
        x: direction === 1 ? '60%' : '-60%', // Adjust overlap spread
        scale: 0.85,
        opacity: 0.6,
        zIndex: 5,
        blur: 2,
        display: 'block'
      }
    } else if (distance === 2) {
      // Keep "waiting" items just off screen for smooth entry
      return {
        x: direction === 1 ? '120%' : '-120%',
        scale: 0.7,
        opacity: 0,
        zIndex: 1,
        blur: 5,
        display: 'block'
      }
    } else {
      return {
        x: 0,
        scale: 0,
        opacity: 0,
        zIndex: 0,
        blur: 0,
        display: 'none'
      }
    }
  }

  return (
    <LockedContent
      password="anu-access"
      caseStudySlug={caseStudySlug}
      unlockMessage="Password required to view design system documentation"
      isLightBackground={true}
    >
      <div className="space-y-12 py-8 relative">
        <ComponentHeading
          variant="block"
          tag="Component Library"
          title="Design System Components"
          description="Shared design system used across all three case studies. A unified language for coherence."
          align="center"
          color="slate"
        />

        {/* Carousel Container */}
        <div className="relative h-[400px] md:h-[500px] flex items-center justify-center w-full max-w-7xl mx-auto overflow-visible md:overflow-visible touch-pan-x">

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 z-50 p-3 bg-white/90 backdrop-blur rounded-full shadow-lg border border-slate-200 text-slate-600 hover:text-[var(--accent-teal)] hover:border-[var(--accent-teal)] transition-all hover:scale-110 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 z-50 p-3 bg-white/90 backdrop-blur rounded-full shadow-lg border border-slate-200 text-slate-600 hover:text-[var(--accent-teal)] hover:border-[var(--accent-teal)] transition-all hover:scale-110 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards */}
          <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
            {designSystemImages.map((image, index) => {
              const state = getVisualState(index)
              if (state.display === 'none') return null

              return (
                <motion.div
                  key={image.src}
                  className={`
                            absolute w-[80%] md:w-[650px] lg:w-[750px] aspect-video 
                            bg-white rounded-lg shadow-2xl border border-slate-100 overflow-hidden
                            ${state.zIndex === 10 ? 'cursor-zoom-in' : 'cursor-pointer'}
                        `}
                  initial={false}
                  animate={{
                    x: state.x,
                    scale: state.scale,
                    opacity: state.opacity,
                    zIndex: state.zIndex,
                    filter: `blur(${state.blur}px)`
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8
                  }}
                  onClick={() => {
                    if (state.zIndex === 10) {
                      openLightbox(image, lightboxImages, index)
                    } else {
                      // Smart navigation: if clicking left item, go prev. right, go next.
                      const length = designSystemImages.length
                      let offset = (index - currentIndex + length) % length
                      if (offset > length / 2) offset -= length
                      if (offset === -1) handlePrev()
                      if (offset === 1) handleNext()
                    }
                  }}
                >
                  <div className="relative w-full h-full p-4 md:p-8 flex items-center justify-center">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain" // Preserves content without cropping
                      priority={state.zIndex === 10}
                    />

                    {/* Hover Overlay only on Center */}
                    {state.zIndex === 10 && (
                      <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/[0.03] transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100 pointer-events-none">
                        <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-200 shadow-xl flex items-center gap-2 transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                          <Maximize2 className="w-3 h-3 text-[var(--accent-teal)]" />
                          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                            {image.title}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Minimal Footer Indicators */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1">
            {designSystemImages.map((_, idx) => (
              <motion.div
                key={idx}
                className={`h-1 rounded-full ${idx === currentIndex ? 'bg-[var(--accent-teal)]' : 'bg-slate-200'}`}
                animate={{
                  width: idx === currentIndex ? 24 : 4,
                  opacity: idx === currentIndex ? 1 : 0.5
                }}
              />
            ))}
          </div>
          <p className="text-slate-400 text-[10px] uppercase tracking-widest font-mono">
            Artifact {String(currentIndex + 1).padStart(2, '0')} of {designSystemImages.length}
          </p>
        </div>

      </div>
    </LockedContent>
  )
}
