'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import ImageLightbox from '@/components/case-study/ImageLightbox'

interface LightboxImage {
  src: string
  alt: string
  caption?: string
  actionLink?: string
  actionLabel?: string
}

// Flexible type to handle multiple calling conventions
type OpenLightboxArgs =
  | [image: LightboxImage, images?: LightboxImage[], startIndex?: number]
  | [src: string, alt: string, caption?: string]
  | [images: LightboxImage[], startIndex: number]

interface LightboxContextType {
  openLightbox: (...args: OpenLightboxArgs) => void
  closeLightbox: () => void
  isOpen: boolean
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined)

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<LightboxImage | null>(null)
  const [imageSet, setImageSet] = useState<LightboxImage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Flexible openLightbox that handles multiple calling conventions
  const openLightbox = useCallback((...args: OpenLightboxArgs) => {
    // Case 1: openLightbox(images[], startIndex) - array of images with index
    if (Array.isArray(args[0])) {
      const images = args[0] as LightboxImage[]
      const startIndex = (args[1] as number) ?? 0
      if (images.length > 0) {
        setCurrentImage(images[startIndex] || images[0])
        setImageSet(images)
        setCurrentIndex(startIndex)
        setIsOpen(true)
      }
      return
    }

    // Case 2: openLightbox(src, alt, caption?) - string arguments
    if (typeof args[0] === 'string') {
      const src = args[0]
      const alt = args[1] as string
      const caption = args[2] as string | undefined
      const image: LightboxImage = { src, alt, caption }
      setCurrentImage(image)
      setImageSet([image])
      setCurrentIndex(0)
      setIsOpen(true)
      return
    }

    // Case 3: openLightbox(image, images?, startIndex?) - object with optional array
    const image = args[0] as LightboxImage
    const images = args[1] as LightboxImage[] | undefined
    const startIndex = args[2] as number | undefined

    setCurrentImage(image)
    if (images && images.length > 0) {
      setImageSet(images)
      setCurrentIndex(startIndex ?? images.findIndex(img => img.src === image.src) ?? 0)
    } else {
      setImageSet([image])
      setCurrentIndex(0)
    }
    setIsOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setIsOpen(false)
    // Delay clearing the image to allow exit animation
    setTimeout(() => {
      setCurrentImage(null)
      setImageSet([])
      setCurrentIndex(0)
    }, 300)
  }, [])

  const handleNavigate = useCallback((index: number) => {
    if (index >= 0 && index < imageSet.length) {
      setCurrentIndex(index)
      setCurrentImage(imageSet[index])
    }
  }, [imageSet])

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox, isOpen }}>
      {children}

      {/* Global Lightbox Instance */}
      {currentImage && (
        <ImageLightbox
          isOpen={isOpen}
          onClose={closeLightbox}
          imageSrc={currentImage.src}
          imageAlt={currentImage.alt}
          imageCaption={currentImage.caption}
          images={imageSet.length > 1 ? imageSet : undefined}
          currentIndex={currentIndex}
          onNavigate={imageSet.length > 1 ? handleNavigate : undefined}
          actionLink={currentImage.actionLink}
          actionLabel={currentImage.actionLabel}
        />
      )}
    </LightboxContext.Provider>
  )
}

export function useLightbox() {
  const context = useContext(LightboxContext)
  if (context === undefined) {
    throw new Error('useLightbox must be used within a LightboxProvider')
  }
  return context
}

