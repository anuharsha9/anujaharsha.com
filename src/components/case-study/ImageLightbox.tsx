'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SystemLightbox from '@/components/ui/SystemLightbox'

interface MediaItem {
  src: string
  alt: string
  caption?: string
  type?: 'image' | 'video'
  poster?: string
}

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  imageCaption?: string
  images?: MediaItem[]
  currentIndex?: number
  onNavigate?: (index: number) => void
  actionLink?: string
  actionLabel?: string
  autoPlayInterval?: number
}

export default function ImageLightbox({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  imageCaption,
  images,
  currentIndex = 0,
  onNavigate,
  autoPlayInterval = 5000,
  ...props
}: ImageLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true) // Auto-play by default

  // Navigation state
  const hasNavigation = images && images.length > 1 && onNavigate
  const canGoPrev = hasNavigation && currentIndex > 0
  const canGoNext = hasNavigation && currentIndex < images.length - 1

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Touch gesture state
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [touchEndY, setTouchEndY] = useState<number | null>(null)
  const [dragY, setDragY] = useState(0)
  const minSwipeDistance = 50
  const closeSwipeDistance = 100

  const onTouchStart = (e: React.TouchEvent) => {
    if (isZoomed) return
    setTouchEndX(null)
    setTouchEndY(null)
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchStartY(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (isZoomed) return
    setTouchEndX(e.targetTouches[0].clientX)
    setTouchEndY(e.targetTouches[0].clientY)

    if (touchStartY !== null) {
      const deltaY = e.targetTouches[0].clientY - touchStartY
      if (deltaY > 0) setDragY(deltaY * 0.5)
    }
  }

  const onTouchEnd = () => {
    if (isZoomed) return
    setDragY(0)

    if (touchStartY !== null && touchEndY !== null) {
      const verticalDistance = touchEndY - touchStartY
      if (verticalDistance > closeSwipeDistance) {
        onClose()
        return
      }
    }

    if (!touchStartX || !touchEndX || !hasNavigation) return
    const distance = touchStartX - touchEndX
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && canGoNext && onNavigate) onNavigate(currentIndex + 1)
    if (isRightSwipe && canGoPrev && onNavigate) onNavigate(currentIndex - 1)
  }

  // Reset zoom on change
  useEffect(() => {
    setIsZoomed(false)
    setImageLoaded(false)
  }, [imageSrc])

  // Reset AutoPlay on Close/Open
  useEffect(() => {
    if (isOpen) setIsPlaying(true)
    else setIsPlaying(false)
  }, [isOpen])

  // Auto-play logic
  useEffect(() => {
    if (!isOpen || !isPlaying || !hasNavigation || isZoomed) return
    const timer = setInterval(() => {
      if (onNavigate) onNavigate((currentIndex + 1) % (images?.length || 1))
    }, autoPlayInterval)
    return () => clearInterval(timer)
  }, [isOpen, isPlaying, hasNavigation, currentIndex, onNavigate, images?.length, autoPlayInterval, isZoomed])

  const handlePrev = useCallback(() => {
    if (canGoPrev && onNavigate) {
      setIsPlaying(false)
      onNavigate(currentIndex - 1)
    }
  }, [canGoPrev, currentIndex, onNavigate])

  const handleNext = useCallback(() => {
    if (canGoNext && onNavigate) {
      setIsPlaying(false)
      onNavigate(currentIndex + 1)
    }
  }, [canGoNext, currentIndex, onNavigate])

  // Construct Index String
  const indexStr = hasNavigation
    ? `[ ${String(currentIndex + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')} ]`
    : `[ 01 / 01 ]`

  // Construct Shortcuts
  const shortcuts = [
    { key: "ESC", label: "CLOSE" },
    ...(hasNavigation ? [{ key: "SPACE", label: isPlaying ? "PAUSE" : "PLAY" }] : []),
    ...(!isMobile ? [{ key: "Z", label: "ZOOM" }] : []),
    ...(hasNavigation ? [{ key: "← →", label: "NAVIGATE" }] : [])
  ]

  return (
    <SystemLightbox
      isOpen={isOpen}
      onClose={onClose}
      title="SYSTEM_VISUAL_ARCHIVE"
      indexString={indexStr}
      onZoom={!isMobile ? () => setIsZoomed(prev => !prev) : undefined}
      onPlay={hasNavigation ? () => setIsPlaying(prev => !prev) : undefined}
      isPlaying={isPlaying}
      onNext={canGoNext ? handleNext : undefined}
      onPrev={canGoPrev ? handlePrev : undefined}
      shortcuts={shortcuts}
      className={isZoomed ? "max-w-none w-full h-full p-0" : ""}
    >
      <motion.div
        drag={isZoomed ? "x" : false}
        dragConstraints={{ left: -100, right: 100 }} // Simple constraint for zoomed drag
        className={`relative flex flex-col items-center justify-center w-full h-full ${!isMobile && !isZoomed ? 'cursor-zoom-in' : ''} ${!isMobile && isZoomed ? 'cursor-zoom-out' : ''}`}
        onClick={() => !isMobile && setIsZoomed(prev => !prev)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        animate={{
          y: dragY,
          scale: dragY > 0 ? 1 - (dragY / 500) : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div
          className={`relative bg-slate-900 border border-slate-700/50 shadow-2xl transition-all duration-500 overflow-hidden ${isZoomed
            ? 'w-screen h-screen max-w-none max-h-none border-0 rounded-none'
            : 'w-full h-[85vh] max-w-[95vw] rounded-lg'
            }`}
        >
          {/* Loading Indicator */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-0">
              <div className="w-8 h-8 border-2 border-slate-700 border-t-white animate-spin rounded-full" />
            </div>
          )}

          {/* Video or Image */}
          {images?.[currentIndex]?.type === 'video' ? (
            <video
              src={images[currentIndex].src}
              poster={images[currentIndex].poster}
              controls
              autoPlay
              loop
              className={`block w-full h-full object-contain ${isZoomed ? '' : ''
                }`}
              onLoadedData={() => setImageLoaded(true)}
            />
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1920}
              height={1080}
              className={`block w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              onLoad={() => setImageLoaded(true)}
              unoptimized
            />
          )}
        </div>

        {/* Caption */}
        {(imageCaption || (props.actionLink && props.actionLabel)) && !isZoomed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center max-w-2xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {imageCaption && (
              <p className="font-mono text-sm text-zinc-400 leading-relaxed bg-black/50 px-4 py-2 rounded-lg backdrop-blur-md border border-white/10 inline-block">
                {imageCaption}
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </SystemLightbox>
  )
}

