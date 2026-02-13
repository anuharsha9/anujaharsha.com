'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { GripVertical } from 'lucide-react'

interface ImpactDiffProps {
  beforeImage: string
  afterImage: string
  beforeAlt?: string
  afterAlt?: string
  beforeLabel?: string
  afterLabel?: string
  isLightBackground?: boolean
}

export default function ImpactDiff({
  beforeImage,
  afterImage,
  beforeAlt = 'Legacy interface',
  afterAlt = 'Unified interface',
  beforeLabel = 'Legacy',
  afterLabel = 'Modern',
}: ImpactDiffProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const percentage = (x / rect.width) * 100
      setSliderPosition(percentage)
    },
    []
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => { if (isDragging) handleMove(e.clientX) },
    [isDragging, handleMove]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => { if (isDragging) handleMove(e.touches[0].clientX) },
    [isDragging, handleMove]
  )

  const handleStart = () => setIsDragging(true)
  const handleEnd = () => setIsDragging(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full select-none"
    >
      <div
        ref={containerRef}
        className="relative w-full aspect-video max-h-[700px] overflow-hidden rounded-2xl cursor-col-resize group bg-slate-100"
        style={{ aspectRatio: '16/9' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {/* Images Layer */}
        <div className="absolute inset-0">
          {/* After Image (Right Side) */}
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            className="object-cover object-top"
            priority
          />
          {/* Floating Label - Right */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-10 pointer-events-none">
            {afterLabel}
          </div>
        </div>

        {/* Before Image (Left Side - Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover object-top"
            priority
          />
          {/* Floating Label - Left */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-10 pointer-events-none shadow-sm">
            {beforeLabel}
          </div>
        </div>

        {/* Separator Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        />

        {/* Slider Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transform transition-transform group-active:scale-95">
            <GripVertical className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Instruction Footer */}
      <div className="mt-4 flex justify-center text-slate-400">
        <div className="text-[10px] uppercase tracking-widest font-medium flex items-center gap-2">
          <span>Drag to compare</span>
        </div>
      </div>
    </motion.div>
  )
}

