'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import ImageLightbox from './ImageLightbox'
import TerminalInsight from './TerminalInsight'

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {auditCards.map((card, index) => (
          <motion.div
            key={card.code}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            {/* Screenshot Area - Standalone Rounded */}
            <div
              className="relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => openLightbox(card.screenshot, card.screenshotAlt, card.title)}
            >
              <Image
                src={card.screenshot}
                alt={card.screenshotAlt}
                fill
                className="object-cover filter grayscale-[30%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  Zoom Image
                </span>
              </div>
              {/* Error Badge */}
              <div className="absolute top-3 left-3">
                <span className="inline-block px-2 py-1 bg-red-500/90 text-white text-[10px] font-mono uppercase tracking-wider rounded backdrop-blur-sm shadow-sm">
                  Legacy 9.2
                </span>
              </div>
            </div>

            {/* Content Area - Open (No Background) */}
            <div className="pt-5 space-y-3">
              {/* Title & Code */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-slate-900 text-lg font-medium">
                    {card.title}
                  </h4>
                  <code className="font-mono text-[10px] text-red-400 opacity-60">
                    {card.code}
                  </code>
                </div>
              </div>

              {/* Pain Points - Clean List */}
              <ul className="space-y-2">
                {card.painPoints.map((point, j) => (
                  <li key={j} className="text-slate-600 text-sm flex items-start gap-2.5">
                    <span className="text-red-400 font-mono text-[10px] mt-1 flex-shrink-0">
                      {point.startsWith('x') ? '✕' : '>'}
                    </span>
                    <span className="leading-relaxed">{point.replace(/^x\s/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Audit Conclusion - Apple Terminal Style */}
      <div className="w-full mt-12">
        <TerminalInsight
          title="audit_summary.log"
        >
          <span className="text-red-400 font-bold mr-2">&gt; AUDIT_CONCLUSION:</span>
          The legacy ML workflow wasn&apos;t just hard for beginners — it was fragmented, opaque, and frustrating.
          <div className="mt-3 pl-4 border-l-2 border-emerald-500/30">
            <span className="text-emerald-400 font-semibold block mb-1">NEW MANDATE:</span>
            Make predictive modeling usable, understandable, and trustworthy — for analysts and everyday business users.
          </div>
        </TerminalInsight>
      </div>

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
