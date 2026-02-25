'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Quote, Sparkles, TrendingUp, Play } from 'lucide-react'
import { useLightbox } from '@/contexts/LightboxContext'
import TerminalInsight from './TerminalInsight'

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
        <h3 className="text-slate-900 text-2xl md:text-3xl font-sans leading-tight">
          The Explainability Deep Dive
        </h3>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
          How tackling the most complex ML visualization earned the trust to revamp the entire experience
        </p>
      </div>

      {/* The Story - Open Layout */}
      <div className="space-y-12">

        {/* The Challenge - Open Text Block */}
        <div className="flex flex-col md:flex-row gap-6 items-start max-w-4xl mx-auto">
          <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-2xl flex-shrink-0">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-3">
            <span className="font-mono text-xs text-blue-600 uppercase tracking-widest">
              {'// THE_CHALLENGE'}
            </span>
            <p className="text-xl md:text-2xl font-light text-slate-900 leading-relaxed">
              My Principal Data Scientist handed me a screenshot from an external tool and said:
              <span className="font-sans italic text-blue-700 ml-2">&quot;This is the explainability visualization I need in WebFOCUS. Can you figure it out?&quot;</span>
            </p>
          </div>
        </div>

        {/* Before / After Comparison - Vertical Stack for Maximum Visibility */}
        <div className="space-y-16">

          {/* BEFORE - Reference Image */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded border border-slate-200">
                {'// REFERENCE_INPUT: Data Scientist\'s Requirement'}
              </span>
            </div>

            <div
              className="relative w-full rounded-md overflow-hidden shadow-lg border border-slate-200 cursor-zoom-in group hover:shadow-xl transition-all duration-300"
              onClick={() => openLightbox(oldImage, allImages, 0)}
            >
              <Image
                src={oldImage.src}
                alt={oldImage.alt}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                className="rounded-md grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
            <p className="font-mono text-xs text-slate-400 max-w-3xl">
              {oldImage.caption}
            </p>
          </motion.div>

          {/* Connector - Down Arrow */}
          <div className="flex justify-center">
            <div className="bg-slate-50 p-3 rounded-full border border-slate-100">
              <ArrowRight className="w-6 h-6 text-slate-300 rotate-90" />
            </div>
          </div>


          {/* AFTER - New Design */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[10px] text-[var(--accent-teal)] uppercase tracking-widest bg-[var(--accent-teal-50)] px-2 py-1 rounded border border-[var(--accent-teal-100)]">
                {'// MY_SOLUTION: WebFOCUS Native Implementation'}
              </span>
            </div>

            <div
              className="relative w-full rounded-md overflow-hidden shadow-2xl border border-[var(--accent-teal-200)] cursor-zoom-in group hover:shadow-[0_20px_50px_-12px_var(--overlay-black-25)] transition-all duration-300"
              onClick={() => openLightbox(newImage, allImages, 1)}
            >
              <Image
                src={newImage.src}
                alt={newImage.alt}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                className="rounded-md"
              />
            </div>
            <p className="font-mono text-xs text-[var(--accent-teal)] max-w-3xl opacity-80">
              {newImage.caption}
            </p>
          </motion.div>
        </div>

        {/* Public Explainability Demo (YouTube) - Centered Pill */}
        <div className="flex justify-center">
          <a
            href="https://www.youtube.com/watch?v=oPFKkcgNCbo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 border border-slate-200 bg-white text-slate-600 text-xs md:text-sm font-medium tracking-wide hover:border-[var(--accent-teal)] hover:text-[var(--accent-teal)] transition-colors rounded-full shadow-sm hover:shadow"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Watch public explainability demo</span>
          </a>
        </div>


        {/* The Outcome - Terminal Quote Block - Full Width */}
        <div className="w-full mt-8">
          <TerminalInsight
            title="testimonial.log"
          >
            <div className="flex flex-col md:flex-row gap-6 md:items-start">
              <span className="text-[var(--accent-teal)] opacity-50 text-4xl font-sans leading-none">&quot;</span>
              <div className="space-y-6 flex-1">
                <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light">
                  The other designers I worked with before didn&apos;t really understand what they were doing—they just gave designs. But you sat with us, talked to us, and actually understood. <span className="text-[var(--accent-teal)] font-medium">That&apos;s why I trust you.</span>
                </p>
                <div className="flex items-center gap-4 pt-2 border-t border-white/10 mt-4">
                  <span className="text-emerald-500 font-bold text-xs tracking-widest">&gt; AUTHOR:</span>
                  <div>
                    <p className="text-white text-sm font-bold">Marcus Horbach</p>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">Principal Data Scientist</p>
                  </div>
                </div>
              </div>
            </div>
          </TerminalInsight>
        </div>

        {/* The Impact Summary - Open Text Block */}
        <div className="flex flex-col md:flex-row gap-6 items-start max-w-4xl mx-auto pt-4">
          <div className="w-10 h-10 bg-emerald-50 flex items-center justify-center rounded-2xl flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="space-y-2">
            <span className="font-mono text-xs text-emerald-600 uppercase tracking-widest">
              {'// OUTCOME'}
            </span>
            <p className="text-slate-600 text-base leading-relaxed">
              <strong className="text-slate-900 font-medium">Understanding before designing:</strong> I sat with the data scientists, learned the domain, and understood <em>why</em> explainability mattered before designing <em>how</em> to show it. This approach—earning trust through genuine understanding—unlocked the opportunity to redesign the entire ML training workflow from scratch.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
