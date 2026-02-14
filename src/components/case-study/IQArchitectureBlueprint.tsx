'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLightbox } from '@/contexts/LightboxContext'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface BlueprintItemProps {
  imageSrc: string
  altText: string
  label: string
  caption: string
  isLightBackground: boolean
  size?: 'full' | 'half'
}

const BlueprintItem = ({ imageSrc, altText, label, caption, isLightBackground, size = 'half' }: BlueprintItemProps) => {
  const { openLightbox } = useLightbox()
  const bgColor = isLightBackground ? 'bg-white' : 'bg-slate-800'
  const borderColor = isLightBackground ? 'border-slate-200' : 'border-slate-700'
  const labelColor = isLightBackground ? 'text-slate-400' : 'text-slate-500'
  const captionColor = isLightBackground ? 'text-slate-600' : 'text-slate-300'

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`flex flex-col ${bgColor} ${borderColor} border shadow-sm overflow-hidden ${size === 'full' ? 'col-span-1 md:col-span-2' : ''}`}
    >
      <div className={`px-4 py-3 border-b ${borderColor} ${isLightBackground ? 'bg-slate-50' : 'bg-slate-900'}`}>
        <span className={`font-mono text-[10px] uppercase tracking-widest ${labelColor}`}>
          {'// '}{label}
        </span>
      </div>
      <div
        className="relative w-full cursor-pointer group"
        style={{ aspectRatio: size === 'full' ? '21/9' : '16/10' }}
        onClick={() => openLightbox(imageSrc, altText)}
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes={size === 'full' ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
          <span className="text-white text-opacity-0 group-hover:text-opacity-100 transition-opacity text-sm font-medium bg-black/50 px-3 py-1 ">
            View Full Size
          </span>
        </div>
      </div>
      <div className={`px-4 py-3 ${isLightBackground ? 'bg-slate-50' : 'bg-slate-900'}`}>
        <p className={`text-sm ${captionColor}`}>{caption}</p>
      </div>
    </motion.div>
  )
}

export default function IQArchitectureBlueprint({ isLightBackground = true }) {
  const blueprintItems = [
    {
      imageSrc: '/images/case-study/iq-plugin/IQ Structure flowchart.png',
      altText: 'IQ Plugin System Architecture Flowchart',
      label: 'SYSTEM_ARCHITECTURE',
      caption: 'Complete flowchart mapping user journeys across NLQ, Insights, and Predict Data—showing how all paths connect through unified dataset selection.',
      size: 'full' as const,
    },
    {
      imageSrc: '/images/case-study/iq-plugin/Structure Layout in HUB 1.png',
      altText: 'IQ Plugin Structure in WebFOCUS Hub',
      label: 'HUB_INTEGRATION',
      caption: 'How IQ Plugin fits within the existing WebFOCUS Hub architecture—one-click access from the main workspace.',
      size: 'half' as const,
    },
    {
      imageSrc: '/images/case-study/iq-plugin/IQ Dataset Selection Workflow 2.png',
      altText: 'Unified Dataset Selection Workflow',
      label: 'DATASET_WORKFLOW',
      caption: 'The unified dataset selection pattern—select once, use across all three features. Eliminates redundant data picking.',
      size: 'half' as const,
    },
    {
      imageSrc: '/images/case-study/iq-plugin/IQ Wireframes.png',
      altText: 'IQ Plugin Early Wireframes',
      label: 'EARLY_WIREFRAMES',
      caption: 'Early wireframe explorations—testing navigation patterns, information hierarchy, and feature discoverability before visual design.',
      size: 'half' as const,
    },
    {
      imageSrc: '/images/case-study/iq-plugin/Mockups for IQ Plugin Reponsive UI 1.png',
      altText: 'IQ Plugin Responsive UI Mockups',
      label: 'RESPONSIVE_DESIGN',
      caption: 'Mobile-first responsive layouts. Enterprise BI on any screen—all three features work seamlessly across devices.',
      size: 'half' as const,
    },
  ]

  const titleColor = isLightBackground ? 'text-slate-900' : 'text-white'
  const summaryColor = isLightBackground ? 'text-slate-600' : 'text-slate-300'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <div className="w-full py-10 md:py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={itemVariants}>
          <ComponentHeading
            tag="// SYSTEM_ARCHITECTURE"
            title="Building the System"
            description="From flowcharts to responsive mockups—the structural foundation that makes three complex features feel like one unified experience."
            color="text-[var(--accent-violet)]"
            align="center"
            className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-12"
          />
        </motion.div>

        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {blueprintItems.map((item, index) => (
            <BlueprintItem
              key={index}
              {...item}
              isLightBackground={isLightBackground}
            />
          ))}
        </div>

        {/* Architecture Insight Footer */}
        <motion.div
          variants={itemVariants}
          className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-12"
        >
          <div className="bg-slate-900 p-6">
            <div className="flex items-start gap-3">
              <span className="font-mono text-sm text-[var(--accent-violet)] flex-shrink-0">
                &gt; DESIGN_PRINCIPLE:
              </span>
              <p className="text-slate-300 text-sm leading-relaxed">
                Every architectural decision optimized for <span className="text-[var(--accent-violet)] font-medium">pattern consistency</span>.
                Same navigation logic, same data selection flow, same error handling—regardless of which feature you&apos;re using.
                Learn one workflow, know them all.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

