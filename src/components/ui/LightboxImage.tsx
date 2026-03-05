'use client'

import Image from 'next/image'
import { useLightbox } from '@/contexts/LightboxContext'

interface LightboxImageProps {
  src: string
  alt: string
  caption?: string
  className?: string
  containerClassName?: string
  priority?: boolean
  sizes?: string
  // For gallery navigation
  images?: { src: string; alt: string; caption?: string }[]
  imageIndex?: number
}

/**
 * LightboxImage - A clickable image component that opens in the site-wide lightbox
 * 
 * Usage:
 * ```tsx
 * // Single image
 * <LightboxImage 
 *   src="/images/screenshot.png" 
 *   alt="Screenshot" 
 *   caption="// FIG_01: Screenshot of the dashboard"
 * />
 * 
 * // Gallery with navigation
 * const images = [
 *   { src: '/img1.png', alt: 'Image 1', caption: 'First' },
 *   { src: '/img2.png', alt: 'Image 2', caption: 'Second' },
 * ]
 * {images.map((img, i) => (
 *   <LightboxImage 
 *     key={i}
 *     src={img.src} 
 *     alt={img.alt} 
 *     caption={img.caption}
 *     images={images}
 *     imageIndex={i}
 *   />
 * ))}
 * ```
 */
export default function LightboxImage({
  src,
  alt,
  caption,
  className = '',
  containerClassName = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  images,
  imageIndex,
}: LightboxImageProps) {
  const { openLightbox } = useLightbox()

  const handleClick = () => {
    const currentImage = { src, alt, caption }
    
    if (images && images.length > 0 && imageIndex !== undefined) {
      openLightbox(currentImage, images, imageIndex)
    } else {
      openLightbox(currentImage)
    }
  }

  return (
    <div 
      className={`group cursor-pointer ${containerClassName}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label={`View ${alt} in lightbox`}
    >
      <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-300">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-[1.02] ${className}`}
          sizes={sizes}
          priority={priority}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                Click to expand
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

