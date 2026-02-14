'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, ArrowRight } from 'lucide-react'
import { GearInspectorItem } from '@/data/gear-inspector'
import { getTheme, spacing } from '@/lib/design-system'

interface GearBottomSheetProps {
  gear: GearInspectorItem | null
  isOpen: boolean
  onClose: () => void
}

/**
 * Mobile Bottom Sheet for Gear Inspector
 * iOS-style sheet that slides up when tapping a gear
 */
export default function GearBottomSheet({ gear, isOpen, onClose }: GearBottomSheetProps) {
  const t = getTheme(true)
  if (!gear) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - tap to dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              // If dragged down more than 100px, close
              if (info.offset.y > 100) {
                onClose()
              }
            }}
            className={`fixed bottom-0 left-0 right-0 z-[9999] ${t.bgAlt} rounded-t-3xl overflow-hidden max-h-[85vh] shadow-2xl`}
            style={{ touchAction: 'none' }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-space-3 pb-space-2">
              <div className={`w-10 h-1 ${t.border} rounded-full`} />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-space-4 right-space-4 w-8 h-8 flex items-center justify-center rounded-full ${t.bg} ${t.textMuted} hover:${t.text} transition-colors`}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="px-6 pb-12 pt-4 flex flex-col gap-6">

              {/* Header: Title & Accent */}
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight text-white font-sans">
                  {gear.title}
                </h3>
                <div
                  className="w-2 h-2 rounded-full shadow-[0_0_12px_currentColor]"
                  style={{ backgroundColor: gear.accentColor, color: gear.accentColor }}
                />
              </div>

              {/* Thought Quote - Clean Sans */}
              <div className="relative pl-4 border-l-2 border-white/10">
                <p className="text-white/80 text-[15px] leading-relaxed font-medium">
                  {gear.thought}
                </p>
              </div>

              {/* Preview Image - If exists */}
              {gear.image && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src={gear.image}
                    alt={gear.title || 'Gear Image'}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}

              {/* Insight Text */}
              <p className="text-white/60 text-sm leading-relaxed">
                {gear.insight}
              </p>

              {/* CTA Button - Premium Pill */}
              <Link
                href={gear.link}
                onClick={onClose}
                className="group flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-[0.98] transition-all backdrop-blur-md border border-white/5"
              >
                <span className="text-sm font-bold tracking-wide uppercase text-white">
                  {gear.linkLabel}
                </span>
                <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors group-hover:translate-x-1" />
              </Link>

              {/* Case Study Badge */}
              {gear.caseStudy && gear.caseStudy !== 'me' && (
                <div className="flex justify-center">
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                    // {gear.caseStudy.replace('-', ' ').toUpperCase()}
                  </p>
                </div>
              )}
            </div>

            {/* Safe area padding for iPhone */}
            <div className="h-safe-area-inset-bottom" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

