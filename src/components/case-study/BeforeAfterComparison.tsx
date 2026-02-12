'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import ImageLightbox from './ImageLightbox'
import LockedContent from './LockedContent'

interface BeforeAfterComparisonProps {
  beforeImage: {
    src: string
    alt: string
    caption?: string
    sensitive?: boolean
  }
  afterImage: {
    src: string
    alt: string
    caption?: string
    sensitive?: boolean
  }
  beforeLabel?: string
  afterLabel?: string
  isLightBackground?: boolean
  comparisonNotes?: string
  isUnlocked?: boolean
  password?: string
  caseStudySlug?: string
  sectionTitle?: string
}

export default function BeforeAfterComparison({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  isLightBackground = false,
  comparisonNotes,
  isUnlocked = false,
  password,
  caseStudySlug,
  sectionTitle = 'this section',
}: BeforeAfterComparisonProps) {
  // Check unlock state - initialize with prop only to avoid hydration mismatch
  const [actuallyUnlocked, setActuallyUnlocked] = useState(isUnlocked)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkUnlockState = () => {
        const globalUnlockState = sessionStorage.getItem('portfolio-globally-unlocked') === 'true'
        const caseUnlockState = caseStudySlug
          ? sessionStorage.getItem(`case-study-unlocked-${caseStudySlug}`) === 'true'
          : false
        setActuallyUnlocked(isUnlocked || globalUnlockState || caseUnlockState)
      }

      checkUnlockState()

      const handleUnlock = () => {
        checkUnlockState()
      }

      window.addEventListener('case-study-unlocked', handleUnlock)
      window.addEventListener('portfolio-unlocked', handleUnlock)
      const interval = setInterval(checkUnlockState, 500)

      return () => {
        window.removeEventListener('case-study-unlocked', handleUnlock)
        window.removeEventListener('portfolio-unlocked', handleUnlock)
        clearInterval(interval)
      }
    }
  }, [isUnlocked, caseStudySlug])

  // Calculate lock states based on sensitive flags and unlock status
  const isBeforeLocked = !!(beforeImage.sensitive && !actuallyUnlocked)
  const isAfterLocked = !!(afterImage.sensitive && !actuallyUnlocked)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider')
  const containerRef = useRef<HTMLDivElement>(null)
  // Lightbox state
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption?: string } | null>(null)
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string; caption?: string }>>([])
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0)

  const openLightbox = (src: string, alt: string, caption?: string, index?: number) => {
    const images = [
      { src: beforeImage.src, alt: beforeImage.alt, caption: beforeImage.caption },
      { src: afterImage.src, alt: afterImage.alt, caption: afterImage.caption },
    ]
    setLightboxImage({ src, alt, caption })
    setLightboxImages(images)
    setLightboxCurrentIndex(index ?? 0)
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

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (!isDragging) return

    window.addEventListener('mousemove', handleMouseMove as EventListener)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleMouseMove as EventListener)
    window.addEventListener('touchend', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove as EventListener)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleMouseMove as EventListener)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Keyboard navigation for slider
  useEffect(() => {
    if (viewMode !== 'slider') return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setSliderPosition((prev) => Math.max(0, prev - 5))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setSliderPosition((prev) => Math.min(100, prev + 5))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [viewMode])

  // Use design system tokens (Architect aesthetic)
  const borderColor = 'border-[var(--border-primary)]'
  const imageShadow = 'shadow-[var(--shadow-md)]'
  const imageBorderRadius = ''
  const imageOutline = 'outline outline-1 outline-[var(--border-subtle)] outline-offset-[-1px]'
  const labelColor = 'text-[var(--text-heading)]'
  const mutedColor = 'text-[var(--text-body)]'
  const bgColor = 'bg-[var(--bg-secondary)]'

  // If before image is sensitive and locked, wrap entire component
  if (isBeforeLocked) {
    return (
      <LockedContent
        isUnlocked={actuallyUnlocked}
        password={password}
        caseStudySlug={caseStudySlug}
        isLightBackground={isLightBackground}
        unlockMessage={`Password required to view ${sectionTitle}`}
      >
        <div className="space-y-4">
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`${mutedColor} text-xs font-mono uppercase tracking-wider`}>View:</span>
              <div className={`${bgColor} p-1 border ${borderColor} flex gap-1`}>
                <button
                  className={`px-3 py-1.5 text-xs font-medium ${labelColor}`}
                  disabled
                >
                  Slider
                </button>
                <button
                  className={`px-3 py-1.5 text-xs font-medium ${labelColor}`}
                  disabled
                >
                  Side-by-Side
                </button>
              </div>
            </div>
          </div>
          {/* Blurred slider placeholder */}
          <div
            className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline}`}
            style={{ minHeight: '400px' }}
          >
            <div className="relative w-full h-full">
              <Image
                src={beforeImage.src}
                alt={beforeImage.alt}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            </div>
          </div>
        </div>
      </LockedContent>
    )
  }

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`${mutedColor} text-xs font-mono uppercase tracking-wider`}>View:</span>
          <div className={`${bgColor} p-1 border ${borderColor} flex gap-1`}>
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 ${viewMode === 'slider'
                ? 'bg-[var(--accent-teal)] text-white'
                : `${labelColor} hover:bg-black/5`
                }`}
              aria-label="Slider view"
            >
              Slider
            </button>
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 ${viewMode === 'side-by-side'
                ? 'bg-[var(--accent-teal)] text-white'
                : `${labelColor} hover:bg-black/5`
                }`}
              aria-label="Side-by-side view"
            >
              Side-by-Side
            </button>
          </div>
        </div>
        {viewMode === 'slider' && (
          <div className={`${mutedColor} text-xs`}>
            Use ← → arrow keys or drag
          </div>
        )}
      </div>
      {viewMode === 'slider' ? (
        <div
          ref={containerRef}
          className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-col-resize select-none`}
          style={{ minHeight: '400px' }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          tabIndex={0}
        >
          {/* After Image (background) - determines container size */}
          <div
            className="relative w-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              openLightbox(afterImage.src, afterImage.alt, afterImage.caption, 1)
            }}
            onDoubleClick={(e) => e.stopPropagation()}
          >
            <Image
              src={afterImage.src}
              alt={afterImage.alt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>

          {/* Before Image (clipped overlay) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div
              className="w-full h-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                openLightbox(beforeImage.src, beforeImage.alt, beforeImage.caption, 0)
              }}
            >
              <Image
                src={beforeImage.src}
                alt={beforeImage.alt}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            </div>
          </div>

          {/* Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)] z-10 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Slider Handle */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-[var(--accent-teal)] shadow-lg flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              <div className="flex items-center gap-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[var(--accent-teal)]"
                >
                  <path
                    d="M8 2L4 6L8 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[var(--accent-teal)]"
                >
                  <path
                    d="M4 2L8 6L4 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-white text-sm font-medium">
            {beforeLabel}
          </div>
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-white text-sm font-medium">
            {afterLabel}
          </div>
        </div>
      ) : (
        /* Side-by-Side View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-3">
            <div className={`${bgColor} px-4 py-2 border ${borderColor} inline-block`}>
              <span className={`${labelColor} text-sm font-semibold`}>{beforeLabel}</span>
            </div>
            {isBeforeLocked ? (
              <LockedContent
                isUnlocked={actuallyUnlocked}
                password={password}
                caseStudySlug={caseStudySlug}
                isLightBackground={isLightBackground}
                unlockMessage={`Password required to view ${sectionTitle}`}
              >
                <div className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline}`}>
                  <Image
                    src={beforeImage.src}
                    alt={beforeImage.alt}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain opacity-30"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
                  />
                </div>
              </LockedContent>
            ) : (
              <div
                onClick={() => openLightbox(beforeImage.src, beforeImage.alt, beforeImage.caption, 0)}
                className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.01]`}
              >
                <Image
                  src={beforeImage.src}
                  alt={beforeImage.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
                />
              </div>
            )}
            {beforeImage.caption && (
              <p className={`${mutedColor} text-sm leading-relaxed`}>{beforeImage.caption}</p>
            )}
          </div>
          <div className="space-y-3">
            <div className={`${bgColor} px-4 py-2 border ${borderColor} inline-block`}>
              <span className={`${labelColor} text-sm font-semibold`}>{afterLabel}</span>
            </div>
            {isAfterLocked ? (
              <LockedContent
                isUnlocked={actuallyUnlocked}
                password={password}
                caseStudySlug={caseStudySlug}
                isLightBackground={isLightBackground}
                unlockMessage={`Password required to view ${sectionTitle}`}
              >
                <div className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline}`}>
                  <Image
                    src={afterImage.src}
                    alt={afterImage.alt}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain opacity-30"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
                  />
                </div>
              </LockedContent>
            ) : (
              <div
                onClick={() => openLightbox(afterImage.src, afterImage.alt, afterImage.caption, 1)}
                className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.01]`}
              >
                <Image
                  src={afterImage.src}
                  alt={afterImage.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
                />
              </div>
            )}
            {afterImage.caption && (
              <p className={`${mutedColor} text-sm leading-relaxed`}>{afterImage.caption}</p>
            )}
          </div>
        </div>
      )}

      {/* Comparison Notes */}
      {comparisonNotes && (
        <div className={`${bgColor} p-4 md:p-5 border ${borderColor} border-l-4`} style={{ borderLeftColor: 'var(--accent-teal)' }}>
          <div className="flex items-start gap-3">
            <svg aria-hidden="true" className="w-5 h-5 text-[var(--accent-teal)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className={`${mutedColor} text-xs font-mono uppercase tracking-wider mb-1`}>Key Differences</div>
              <p className={`${labelColor} text-sm md:text-base leading-relaxed`}>{comparisonNotes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Captions */}
      {(beforeImage.caption || afterImage.caption) && (
        <div className="space-y-2">
          {beforeImage.caption && (
            <p className={`${mutedColor} text-sm`}>
              <span className={`${labelColor} font-medium`}>Before: </span>
              {beforeImage.caption}
            </p>
          )}
          {afterImage.caption && (
            <p className={`${mutedColor} text-sm`}>
              <span className={`${labelColor} font-medium`}>After: </span>
              {afterImage.caption}
            </p>
          )}
        </div>
      )}

      {/* Image Lightbox */}
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

