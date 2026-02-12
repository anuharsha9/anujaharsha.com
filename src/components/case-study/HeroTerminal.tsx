'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLightbox } from '@/contexts/LightboxContext'

interface HeroTerminalProps {
  imageSrc: string
  fileName: string
  accentColor?: string
  alt?: string
  disableLightbox?: boolean
}

export default function HeroTerminal({
  imageSrc,
  fileName,
  accentColor = 'var(--accent-teal)',
  alt = 'System interface',
  disableLightbox = false
}: HeroTerminalProps) {
  const { openLightbox } = useLightbox()
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleClick = () => {
    if (!disableLightbox) {
      openLightbox([{ src: imageSrc, alt, caption: fileName }], 0)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disableLightbox && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl bg-[#1e1e1e] shadow-xl ring-1 ring-white/10
        group transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-2xl
        ${disableLightbox ? '' : 'cursor-zoom-in'}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disableLightbox ? -1 : 0}
      role={disableLightbox ? undefined : 'button'}
      aria-label={disableLightbox ? undefined : `View ${alt} in fullscreen`}
    >
      {/* macOS Terminal Header - Glass-like dark */}
      <div className="h-10 bg-[#2d2d2d] flex items-center px-4 relative border-b border-black/40">
        {/* Traffic Lights */}
        <div className="flex gap-2 absolute left-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-inner" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-inner" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-inner" />
        </div>

        {/* Title - Centered & Apple-like */}
        <div className="w-full text-center">
          <span className="text-[11px] font-medium text-slate-400 font-mono tracking-tight flex items-center justify-center gap-2 opacity-80">
            {fileName} — -zsh
          </span>
        </div>
      </div>

      {/* Terminal Content Area */}
      <div className="relative w-full bg-[#1e1e1e] min-h-[400px]">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#1e1e1e] animate-pulse z-10" />
        )}

        <Image
          src={imageSrc}
          alt={alt}
          width={1400}
          height={900}
          className={`w-full h-auto object-cover object-top transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          priority
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />

        {/* Glossy Overlay for screen effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-20 pointer-events-none mix-blend-overlay" />
      </div>
    </div>
  )
}

