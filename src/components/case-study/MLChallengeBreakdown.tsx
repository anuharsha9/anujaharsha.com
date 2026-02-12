'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import ImageLightbox from './ImageLightbox'

interface MLChallengeBreakdownProps {
  isLightBackground?: boolean
}

interface AuditCard {
  code: string
  title: string
  screenshot: string
  screenshotAlt: string
  painPoints: string[]
}

export default function MLChallengeBreakdown({ isLightBackground = true }: MLChallengeBreakdownProps) {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption?: string } | null>(null)

  const auditCards: AuditCard[] = [
    {
      code: '// 01_FRAGMENTATION',
      title: 'Fragmented Workflow',
      screenshot: '/images/case-study/ml-functions/Legacy Run Model Landing Page.png',
      screenshotAlt: 'Legacy ML workflow showing fragmented data flow canvas',
      painPoints: [
        'x 4+ scattered steps to train a single model',
        'x Drag "model pill" onto data flow canvas',
        'x Configure in disconnected popup windows',
        'x Hidden toolbar controls for execution',
      ],
    },
    {
      code: '// 02_HIDDEN_COMPLEXITY',
      title: 'Hidden Configuration',
      screenshot: '/images/case-study/ml-functions/Legacy Train Model Results UI.png',
      screenshotAlt: 'Legacy ML interface with hyperparameters hidden in context menus',
      painPoints: [
        'x Hyperparameters buried in right-click menus',
        'x Settings only accessible after training',
        'x No inline guidance or documentation',
        'x Technical jargon without explanation',
      ],
    },
    {
      code: '// 03_DEAD_END_ERRORS',
      title: 'Opaque Error States',
      screenshot: '/images/case-study/ml-functions/Legacy Train Model UI.png',
      screenshotAlt: 'Legacy ML error state showing results not generated message',
      painPoints: [
        'x "Results not generated" with no explanation',
        'x No guidance on how to fix issues',
        'x Silent failures during model training',
        'x Users abandon workflow mid-process',
      ],
    },
    {
      code: '// 04_PLATFORM_DISCONNECT',
      title: 'Platform Disconnect',
      screenshot: '/images/case-study/ml-functions/Legacy Run Model Landing Page.png',
      screenshotAlt: 'Legacy Run Model landing page - disconnected from main WebFOCUS workflows',
      painPoints: [
        'x No connection to main WebFOCUS workflows',
        'x Felt bolted-on, not platform-native',
        'x Multiple context switches required',
        'x No clear entry points from hub',
      ],
    },
  ]

  const openLightbox = (src: string, alt: string, caption?: string) => {
    setLightboxImage({ src, alt, caption })
  }

  return (
    <div className="space-y-8">
      {/* System Audit Header */}
      <ComponentHeading
        variant="block"
        tag="// SYSTEM_AUDIT"
        title="System Audit: The Baseline"
        description="Identified critical friction points in the legacy 9.2 workflow."
        color="red"
        align="center"
        className="mb-12"
      />

      {/* Audit Cards Grid - Locked */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {auditCards.map((card, index) => (
          <motion.div
            key={card.code}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-50 border border-red-200 overflow-hidden hover:shadow-lg transition-shadow group rounded-2xl"
          >
            {/* Screenshot Area */}
            <div
              className="relative aspect-video cursor-pointer overflow-hidden"
              onClick={() => openLightbox(card.screenshot, card.screenshotAlt, card.title)}
            >
              <Image
                src={card.screenshot}
                alt={card.screenshotAlt}
                fill
                className="object-cover filter grayscale-[30%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/60 px-3 py-1">
                  🔍 Inspect Legacy UI
                </span>
              </div>
              {/* Error Badge */}
              <div className="absolute top-0 left-0 bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded-br-lg">
                <span className="font-mono text-[10px] text-white uppercase tracking-wider">
                  LEGACY 9.2
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4">
              {/* Error Code */}
              <div className="flex items-center gap-3">
                <code className="font-mono text-xs text-red-600 bg-red-50 px-2 py-1 border border-red-100 rounded-full">
                  {card.code}
                </code>
              </div>

              {/* Title */}
              <h4 className="text-slate-900 text-lg font-serif font-semibold">
                {card.title}
              </h4>

              {/* Pain Points List */}
              <ul className="space-y-2">
                {card.painPoints.map((point, j) => (
                  <li key={j} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-red-500 font-mono text-xs mt-0.5 flex-shrink-0">
                      {point.startsWith('x') ? '✕' : '>'}
                    </span>
                    <span>{point.replace(/^x\s/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Audit Summary Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-slate-900 p-6 rounded-2xl"
      >
        <div className="font-mono text-sm">
          <span className="text-red-400">&gt; AUDIT_CONCLUSION:</span>
          <p className="text-slate-300 mt-2 leading-relaxed">
            The legacy ML workflow wasn&apos;t just hard for beginners — it was fragmented, opaque, and frustrating even for power users.
            <span className="text-emerald-400 font-semibold"> The mandate:</span> Make predictive modeling usable, understandable, and trustworthy — for analysts and everyday business users.
          </p>
        </div>
      </motion.div>

      {/* Lightbox */}
      {lightboxImage && (
        <ImageLightbox
          isOpen={!!lightboxImage}
          onClose={() => setLightboxImage(null)}
          imageSrc={lightboxImage.src}
          imageAlt={lightboxImage.alt}
          imageCaption={lightboxImage.caption}
        />
      )}
    </div>
  )
}
