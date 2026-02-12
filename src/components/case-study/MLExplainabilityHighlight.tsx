'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Quote, Sparkles, TrendingUp, Play } from 'lucide-react'
import { useLightbox } from '@/contexts/LightboxContext'

interface MLExplainabilityHighlightProps {
  isLightBackground?: boolean
}

export default function MLExplainabilityHighlight({ isLightBackground = true }: MLExplainabilityHighlightProps) {
  const { openLightbox } = useLightbox()

  const oldImage = {
    src: '/images/case-study/ml-functions/Legacy Explainability UI.png',
    alt: 'Reference explainability visualization from external tool - what the Principal Data Scientist wanted recreated',
    caption: '// REF_IMAGE: External explainability tool our Data Scientist wanted me to recreate for WebFOCUS'
  }

  const newImage = {
    src: '/images/case-study/ml-functions/6. Run Model - Explainability Popup.png',
    alt: 'New explainability UI designed for WebFOCUS ML workflow',
    caption: '// NEW_DESIGN: Custom explainability visualization I created for WebFOCUS'
  }

  const allImages = [oldImage, newImage]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Section Header */}
      <div className="text-center space-y-3">
        <span className="inline-block font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest bg-[var(--accent-teal-50)] px-3 py-1.5">
          {'// TRUST_EARNED'}
        </span>
        <h3 className="text-slate-900 text-2xl md:text-3xl font-serif leading-tight">
          The Explainability Deep Dive
        </h3>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
          How tackling the most complex ML visualization earned the trust to revamp the entire experience
        </p>
      </div>

      {/* The Story Container */}
      <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 overflow-hidden rounded-2xl">

        {/* The Challenge Brief */}
        <div className="bg-[var(--accent-blue-50)] border-b border-[var(--accent-blue-100)] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[var(--accent-blue)] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[var(--accent-blue-700)] uppercase tracking-widest">
                {'// THE_CHALLENGE'}
              </span>
              <p className="text-slate-800 text-base md:text-lg leading-relaxed mt-2">
                My Principal Data Scientist handed me a screenshot from an external tool and said:
                <span className="font-serif italic text-[var(--accent-blue-700)]"> &quot;This is the explainability visualization I need in WebFOCUS. Can you figure it out?&quot;</span>
              </p>
            </div>
          </div>
        </div>

        {/* Before / After Comparison */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* BEFORE - Reference Image */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 ">
                  {'// REFERENCE_INPUT'}
                </span>
                <span className="font-mono text-xs text-red-500">LEGACY_TOOL</span>
              </div>

              <div
                className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-2 border-dashed border-slate-300 cursor-pointer group rounded-xl"
                onClick={() => openLightbox(oldImage, allImages, 0)}
              >
                <Image
                  src={oldImage.src}
                  alt={oldImage.alt}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay Label */}
                <div className="absolute top-3 left-3 bg-red-500 text-white font-mono text-[10px] px-2 py-1 uppercase tracking-wider">
                  External Tool
                </div>
              </div>

              <p className="font-mono text-[11px] text-slate-500 leading-relaxed">
                {oldImage.caption}
              </p>
            </motion.div>

            {/* Arrow Connector (Desktop) */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              {/* This is positioned relatively within the grid */}
            </div>

            {/* AFTER - New Design */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-[var(--accent-teal)] uppercase tracking-widest bg-[var(--accent-teal-50)] px-2 py-1 ">
                  {'// MY_SOLUTION'}
                </span>
                <span className="font-mono text-xs text-[var(--accent-teal)]">WEBFOCUS_NATIVE</span>
              </div>

              <div
                className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-2 border-[var(--accent-teal)] cursor-pointer group shadow-lg rounded-xl"
                onClick={() => openLightbox(newImage, allImages, 1)}
              >
                <Image
                  src={newImage.src}
                  alt={newImage.alt}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay Label */}
                <div className="absolute top-3 left-3 bg-[var(--accent-teal)] text-white font-mono text-[10px] px-2 py-1 uppercase tracking-wider">
                  New Design
                </div>
              </div>

              <p className="font-mono text-[11px] text-slate-500 leading-relaxed">
                {newImage.caption}
              </p>
            </motion.div>
          </div>

          {/* Arrow between images on mobile */}
          <div className="flex justify-center py-4 lg:hidden">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="h-px w-8 bg-slate-300"></div>
              <ArrowRight className="w-5 h-5" />
              <div className="h-px w-8 bg-slate-300"></div>
            </div>
          </div>

          {/* Public Explainability Demo (YouTube) */}
          <div className="mt-6 flex justify-center">
            <a
              href="https://www.youtube.com/watch?v=oPFKkcgNCbo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--accent-teal)] text-[var(--accent-teal)] text-xs md:text-sm font-mono tracking-wide hover:bg-[var(--accent-teal-50)] hover:border-[var(--accent-teal-soft)] transition-colors rounded-full"
            >
              <Play className="w-4 h-4" />
              <span>Watch public explainability demo (YouTube)</span>
            </a>
          </div>
        </div>

        {/* The Outcome - Terminal Quote Block */}
        <div className="bg-[#1D1D20]">
          {/* Terminal Header */}
          <div className="bg-[#2D2D30] px-4 py-2 flex gap-2 items-center border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-2 text-[10px] text-slate-500 font-sans">testimonial.log</span>
          </div>

          <div className="p-6 md:p-8 font-mono">
            <div className="flex items-start gap-4">
              <span className="text-[var(--accent-teal)] opacity-50 text-xl font-serif">"</span>
              <div className="space-y-4">
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  The other designers I worked with before didn&apos;t really understand what they were doing—they just gave designs. But you sat with us, talked to us, and actually understood. <span className="text-[var(--accent-teal)]">That&apos;s why I trust you.</span>
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-emerald-500 font-bold text-xs">&gt; AUTHOR:</span>
                  <div>
                    <p className="text-white text-xs font-bold">Marcus Horbach</p>
                    <p className="text-slate-500 text-[10px] uppercase">Principal Data Scientist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Impact Summary */}
        <div className="bg-emerald-50 border-t border-emerald-100 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-emerald-600 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-emerald-700 uppercase tracking-widest">
                {'// OUTCOME'}
              </span>
              <p className="text-slate-800 text-base leading-relaxed mt-2">
                <strong>Understanding before designing:</strong> I didn&apos;t just take requirements and push pixels. I sat with the data scientists, learned the domain, and understood <em>why</em> explainability mattered before designing <em>how</em> to show it. This approach—earning trust through genuine understanding—unlocked the opportunity to redesign the entire ML training workflow from scratch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

