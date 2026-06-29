'use client'

import React, { useState, useEffect } from 'react'
import SystemLightbox from '@/components/ui/SystemLightbox'
import { type StorySlide } from '@/data/presentation-slides'
import { m, AnimatePresence } from 'framer-motion'
import HeroAurora from '@/components/home/HeroAurora'
import { DURATION } from '@/lib/motion'

interface PresentationLightboxProps {
 isOpen: boolean
 onClose: () => void
 slides: StorySlide[]
}

export default function PresentationLightbox({ isOpen, onClose, slides }: PresentationLightboxProps) {
 const [currentIndex, setCurrentIndex] = useState(0)

 // Reset index when opened
 useEffect(() => {
 if (isOpen) {
 setCurrentIndex(0)
 }
 }, [isOpen])

 if (!slides || slides.length === 0) return null

 const handleNext = () => {
 setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
 }

 const handlePrev = () => {
 setCurrentIndex((prev) => Math.max(prev - 1, 0))
 }

 const currentSlide = slides[currentIndex]

 return (
 <SystemLightbox
 isOpen={isOpen}
 onClose={onClose}
 title="CASE_STUDY_PRESENTATION"
 indexString={`[ ${(currentIndex + 1).toString().padStart(2, '0')} / ${slides.length.toString().padStart(2, '0')} ]`}
 onNext={currentIndex < slides.length - 1 ? handleNext : undefined}
 onPrev={currentIndex > 0 ? handlePrev : undefined}
 shortcuts={[
 { key: "ESC", label: "CLOSE" },
 { key: "← →", label: "NAVIGATE" }
 ]}
 >
 <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
 <HeroAurora />
 </div>
 <div className="w-full h-full flex flex-col justify-center items-center px-4 md:px-12 py-8 overflow-y-auto relative z-10">
 <AnimatePresence mode="wait">
 <m.div
 key={currentIndex}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 transition={{ duration: DURATION.medium, ease: "easeOut" }}
 className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
 >
 {/* Text Column */}
 <div className="lg:col-span-5 flex flex-col justify-center text-white space-y-6">
 <div className="flex items-center gap-3">
 <span className="text-[10px] uppercase tracking-widest text-white/50 border border-white/10 px-2 py-1 rounded-full">
 {currentSlide.type}
 </span>
 {currentSlide.signal && (
 <span className="text-[10px] uppercase tracking-widest text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 px-2 py-1 rounded-full">
 {currentSlide.signal}
 </span>
 )}
 </div>
 
 <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
 {currentSlide.title}
 </h2>
 
 <div className="space-y-4">
 {currentSlide.content.map((paragraph, idx) => (
 <p key={idx} className="text-lg md:text-xl text-white/60 leading-relaxed">
 {paragraph}
 </p>
 ))}
 </div>
 </div>

 {/* Visual Column */}
 <div className="lg:col-span-7 flex justify-center items-center min-h-[400px]">
 {currentSlide.component}
 </div>
 </m.div>
 </AnimatePresence>
 </div>
 </SystemLightbox>
 )
}
