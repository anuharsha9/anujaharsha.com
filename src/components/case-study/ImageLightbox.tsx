'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Play, Pause } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'

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
  const containerRef = useFocusTrap(isOpen)
  const [isZoomed, setIsZoomed] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true) // Auto-play by default as requested ("preview of sorts")

  // Store scroll position in ref to persist across re-renders
  const scrollPositionRef = useRef<number>(0)
  // Track if scroll was locked (to properly restore on close)
  const wasLockedRef = useRef(false)

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

  // Touch gesture state - horizontal swipe for navigation
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  // Touch gesture state - vertical swipe for close
  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [touchEndY, setTouchEndY] = useState<number | null>(null)
  const [dragY, setDragY] = useState(0)
  const minSwipeDistance = 50
  const closeSwipeDistance = 100

  const onTouchStart = (e: React.TouchEvent) => {
    if (isZoomed) return // Don't handle gestures when zoomed
    setTouchEndX(null)
    setTouchEndY(null)
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchStartY(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (isZoomed) return
    setTouchEndX(e.targetTouches[0].clientX)
    setTouchEndY(e.targetTouches[0].clientY)

    // Calculate vertical drag for visual feedback
    if (touchStartY !== null) {
      const deltaY = e.targetTouches[0].clientY - touchStartY
      if (deltaY > 0) { // Only drag down
        setDragY(deltaY * 0.5) // Dampened drag
      }
    }
  }

  const onTouchEnd = () => {
    if (isZoomed) return

    // Reset drag
    setDragY(0)

    // Check for vertical swipe down to close
    if (touchStartY !== null && touchEndY !== null) {
      const verticalDistance = touchEndY - touchStartY
      if (verticalDistance > closeSwipeDistance) {
        onClose()
        return
      }
    }

    // Check for horizontal swipe for navigation
    if (!touchStartX || !touchEndX || !hasNavigation) return
    const distance = touchStartX - touchEndX
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && canGoNext && onNavigate) {
      onNavigate(currentIndex + 1)
    }
    if (isRightSwipe && canGoPrev && onNavigate) {
      onNavigate(currentIndex - 1)
    }
  }

  // Reset zoom when image changes
  useEffect(() => {
    setIsZoomed(false)
    setImageLoaded(false)
  }, [imageSrc])

  // Scroll lock - properly tracks open/close state
  useEffect(() => {
    if (isOpen && !wasLockedRef.current) {
      // Opening - capture scroll position and lock
      scrollPositionRef.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPositionRef.current}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      wasLockedRef.current = true
      setIsPlaying(true) // Reset auto-play on open
    } else if (!isOpen && wasLockedRef.current) {
      // Closing - restore scroll position
      const scrollY = scrollPositionRef.current
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      wasLockedRef.current = false
      setIsPlaying(false) // Stop playing when closed
      // Use requestAnimationFrame to ensure DOM is ready before scrolling
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollY,
          behavior: 'instant'
        })
      })
    }

    // Cleanup on unmount - ensure scroll is restored if component unmounts while open
    return () => {
      if (wasLockedRef.current) {
        const scrollY = scrollPositionRef.current
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        wasLockedRef.current = false
        window.scrollTo({ top: scrollY, behavior: 'instant' })
      }
    }
  }, [isOpen])

  // Auto-play logic
  useEffect(() => {
    if (!isOpen || !isPlaying || !hasNavigation || isZoomed) return

    const timer = setInterval(() => {
      if (onNavigate) {
        onNavigate((currentIndex + 1) % (images?.length || 1))
      }
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [isOpen, isPlaying, hasNavigation, currentIndex, onNavigate, images?.length, autoPlayInterval, isZoomed])

  // Pause on user interaction
  const pauseAutoPlay = () => setIsPlaying(false)

  // Keyboard navigation - separate effect to avoid scroll issues
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed(prev => !prev)
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault()
        setIsPlaying(prev => !prev)
      } else if (hasNavigation) {
        if (e.key === 'ArrowLeft' && canGoPrev) {
          pauseAutoPlay()
          onNavigate(currentIndex - 1)
        } else if (e.key === 'ArrowRight' && canGoNext) {
          pauseAutoPlay()
          onNavigate(currentIndex + 1)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, hasNavigation, canGoPrev, canGoNext, currentIndex, onNavigate, onClose])

  const handlePrev = useCallback(() => {
    if (canGoPrev && onNavigate) {
      pauseAutoPlay()
      onNavigate(currentIndex - 1)
    }
  }, [canGoPrev, currentIndex, onNavigate])

  const handleNext = useCallback(() => {
    if (canGoNext && onNavigate) {
      pauseAutoPlay()
      onNavigate(currentIndex + 1)
    }
  }, [canGoNext, currentIndex, onNavigate])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999]">
          {/* Backdrop - Dark with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Top Bar - Technical Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-gradient-to-b from-slate-950/90 to-transparent"
          >
            {/* Technical Label - Hidden on mobile for cleaner look */}
            <div className="flex items-center gap-4">
              <span className="hidden md:inline font-mono text-[11px] text-slate-500 uppercase tracking-widest">
                {'// SYSTEM_INSPECTION'}
              </span>
              {hasNavigation && (
                <span className="font-mono text-xs text-slate-400">
                  [{String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}]
                </span>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Play/Pause Toggle */}
              {hasNavigation && (
                <button
                  onClick={() => setIsPlaying(prev => !prev)}
                  className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
                  aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
              )}
              {/* Zoom Toggle - Hidden on mobile (use pinch instead) */}
              {!isMobile && (
                <button
                  onClick={() => setIsZoomed(prev => !prev)}
                  className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
                  aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
                >
                  {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                </button>
              )}

              {/* Close Button - Larger tap target on mobile */}
              <button
                onClick={onClose}
                className="p-3 md:p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6 md:w-5 md:h-5" />
              </button>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div
            ref={containerRef as React.RefObject<HTMLDivElement>}
            className="absolute inset-0 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-image"
          >
            {/* Navigation Arrows */}
            {hasNavigation && canGoPrev && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={handlePrev}
                className="absolute left-4 md:left-8 z-10 p-3 md:p-4 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 backdrop-blur-sm transition-all duration-200 group"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-x-0.5 transition-transform" />
              </motion.button>
            )}

            {hasNavigation && canGoNext && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={handleNext}
                className="absolute right-4 md:right-8 z-10 p-3 md:p-4 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 backdrop-blur-sm transition-all duration-200 group"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            )}

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: dragY > 0 ? 1 - (dragY / 300) : 1,
                scale: 1,
                y: dragY
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: dragY > 0 ? 0 : 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`relative flex flex-col items-center px-4 md:px-20 py-16 md:py-20 max-w-full ${!isMobile && !isZoomed ? 'cursor-zoom-in' : ''} ${!isMobile && isZoomed ? 'cursor-zoom-out' : ''}`}
              onClick={() => !isMobile && setIsZoomed(prev => !prev)}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Image Wrapper with Border */}
              <div
                className={`relative bg-slate-900 overflow-auto border border-slate-700/50 shadow-2xl shadow-black/50 transition-all duration-500 ${isZoomed ? 'max-w-none max-h-[95vh]' : 'max-w-[95vw] max-h-[85vh]'
                  }`}
              >
                {/* Loading State */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900 min-h-[200px] min-w-[300px]">
                    <div className="w-8 h-8 border-2 border-slate-700 border-t-[var(--accent-teal)] animate-spin" />
                  </div>
                )}

                {/* The Image - using img tag for natural sizing */}
                {/* Content Render Logic (Image or Video) */}
                {images?.[currentIndex]?.type === 'video' ? (
                  <video
                    src={images[currentIndex].src}
                    poster={images[currentIndex].poster}
                    controls
                    autoPlay
                    loop
                    className={`transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${isZoomed
                      ? 'max-w-none max-h-none w-auto h-auto'
                      : 'max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] max-h-[80vh] w-auto h-auto'
                      }`}
                    onLoadedData={() => setImageLoaded(true)}
                  />
                ) : (
                  <Image
                    id="lightbox-image"
                    src={imageSrc}
                    alt={imageAlt}
                    width={1600}
                    height={1200}
                    unoptimized
                    className={`transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${isZoomed
                      ? 'max-w-none max-h-none w-auto h-auto'
                      : 'max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] max-h-[80vh] w-auto h-auto object-contain'
                      }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                )}
              </div>

              {/* Caption - Technical Style */}
              {(imageCaption || (props.actionLink && props.actionLabel)) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mt-6 text-center max-w-3xl flex flex-col items-center gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {imageCaption && (
                    <p className="font-mono text-sm text-slate-400 leading-relaxed">
                      {imageCaption}
                    </p>
                  )}

                  {props.actionLink && props.actionLabel && (
                    <a
                      href={props.actionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono border border-slate-700 hover:border-slate-600 transition-all duration-200"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {props.actionLabel}
                    </a>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Bottom Hint Bar - Different for mobile vs desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center px-4 md:px-6 py-3 md:py-4 bg-gradient-to-t from-slate-950/90 to-transparent"
          >
            {/* Mobile hints */}
            {isMobile ? (
              <div className="flex items-center gap-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <span className="text-slate-400">↓</span>
                  Swipe down to close
                </span>
                {hasNavigation && (
                  <span className="flex items-center gap-2">
                    <span className="text-slate-400">←→</span>
                    Swipe to navigate
                  </span>
                )}
              </div>
            ) : (
              /* Desktop hints */
              <div className="flex items-center gap-6 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-400">ESC</kbd>
                  Close
                </span>
                <span className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-400">Z</kbd>
                  Zoom
                </span>
                {hasNavigation && (
                  <span className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-400">SPACE</kbd>
                    {isPlaying ? 'Pause' : 'Play'}
                  </span>
                )}
                {hasNavigation && (
                  <span className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-400">←</kbd>
                    <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-400">→</kbd>
                    Navigate
                  </span>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
