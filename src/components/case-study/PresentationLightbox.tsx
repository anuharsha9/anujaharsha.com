'use client'

import React, { useState, useEffect, useRef } from 'react'
import SystemLightbox from '@/components/ui/SystemLightbox'
import { type StorySlide } from '@/data/presentation-slides'
import { m } from 'framer-motion'
import HeroAurora from '@/components/home/HeroAurora'
import { DURATION } from '@/lib/motion'
import {
 InsideLightboxContext,
 PresenterSlotContext,
} from '@/components/case-study/storyboard/PresenterSlotContext'

interface PresentationLightboxProps {
 isOpen: boolean
 onClose: () => void
 slides: StorySlide[]
}

export default function PresentationLightbox({ isOpen, onClose, slides }: PresentationLightboxProps) {
 const [currentIndex, setCurrentIndex] = useState(0)
 /* Portal target for the PresenterBar bubble — set when the left-column
  * slot div mounts. Keyed by slide index so each slide's PresenterBar
  * (a fresh component instance) portals into the current slide's slot. */
 const [presenterSlot, setPresenterSlot] = useState<HTMLDivElement | null>(null)
 /* Swipe origin for the mobile deck gesture. */
 const touchRef = useRef<{ x: number; y: number } | null>(null)

 // Reset index when opened
 useEffect(() => {
 if (isOpen) {
 setCurrentIndex(0)
 setPresenterSlot(null)
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
 <InsideLightboxContext.Provider value={true}>
 <PresenterSlotContext.Provider value={presenterSlot}>
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
 {/* Magazine spread (Option C) — asymmetric 40/60. Left column owns the
 title block; right column is the visual, breathing wide. A whisper-thin
 hairline between columns anchors the composition. No competing chips,
 no centered text fighting the visual — each column owns one job. On
 mobile, the columns stack and the hairline disappears. */}
 {/* NO AnimatePresence here — deliberately. mode="wait" hangs when a
     visitor advances slides faster than the exit animation completes:
     the interrupted exit never fires onExitComplete, the next slide
     never mounts, and the deck is permanently wedged on stale content
     while the counter keeps advancing (reproduced at ~1s click pacing
     on the production build). Same failure HomeTabsWrapper documents.
     A keyed m.div remounts instantly on navigation with an enter-only
     animation — un-wedgeable by construction, spam-proof arrows. */}
 {/* Mobile: horizontal swipe advances slides (the native deck gesture).
     Axis-discriminated so vertical scrolling inside a slide still works —
     only a clearly-horizontal drag (>56px, >1.5× the vertical delta)
     navigates. Desktop unaffected (arrows + keyboard). */}
 <div
 className="w-full h-full overflow-y-auto relative z-10"
 onTouchStart={(e) => {
 touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
 }}
 onTouchEnd={(e) => {
 const start = touchRef.current
 if (!start) return
 touchRef.current = null
 const dx = e.changedTouches[0].clientX - start.x
 const dy = e.changedTouches[0].clientY - start.y
 if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.5) return
 if (dx < 0) handleNext()
 else handlePrev()
 }}
 >
 <m.div
 key={currentIndex}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: DURATION.medium, ease: "easeOut" }}
 className="grid w-full min-h-full grid-cols-1 lg:grid-cols-[7fr_13fr]"
 >
 {/* Left column — eyebrow stack · title · body. Narrower than half
     deliberately: the right-column animation is the case-study hero,
     this column is just the editorial frame around it. Mobile gets
     compact spacing + bottom padding clearance for the docked arrows. */}
 <div className="flex flex-col justify-center px-5 pt-6 pb-2 md:px-12 md:py-10 lg:py-16 lg:pr-12 lg:border-r lg:border-white/[0.05]">
 <div className="mb-8 flex flex-col gap-1.5">
 <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:text-[11px]">
 {currentSlide.type}
 </span>
 {currentSlide.signal && (
 <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/70 md:text-[11px]">
 {currentSlide.signal}
 </span>
 )}
 </div>

 {/* Title — smaller than first pass. The animation on the right is
     the highlight; this is the chapter heading for it, not the poster. */}
 <h2 className="mb-5 text-2xl font-medium leading-[1.1] tracking-tight text-white md:text-3xl lg:text-[2rem]">
 {currentSlide.title}
 </h2>

 <div className="space-y-4">
 {currentSlide.content.map((paragraph, idx) => (
 <p key={idx} className="text-sm leading-relaxed text-white/55 md:text-base">
 {paragraph}
 </p>
 ))}
 </div>

 {/* PresenterBar portal slot — each beat's avatar + speech bubble
     lands here, under the title block. The PresenterBar inside
     the beat detects the slot via PresenterSlotContext and portals
     itself in (its timing state machine still runs in place). */}
 <div ref={setPresenterSlot} className="mt-10" />
 </div>

 {/* Right column — the visual, full-bleed-ish. The wrapper does NOT
     clamp width — each beat's own internal max-w (typically max-w-4xl)
     is the real ceiling. We just center it in the column with breathing
     room on the edges. */}
 <div className="flex items-center justify-center px-4 pt-2 pb-24 md:px-10 md:py-10 md:pb-10 lg:py-16 lg:pl-14">
 <div className="flex w-full items-center justify-center">
 {currentSlide.component}
 </div>
 </div>
 </m.div>
 </div>
 </SystemLightbox>
 </PresenterSlotContext.Provider>
 </InsideLightboxContext.Provider>
 )
}
