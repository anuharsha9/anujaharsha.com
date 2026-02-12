'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, MessageSquare, Lightbulb, Palette, Layout, AlertCircle } from 'lucide-react'
import { useLightbox } from '@/contexts/LightboxContext'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ElementType
  iconColor: string
  screens: {
    imageSrc: string
    altText: string
    label: string
  }[]
  demoLink?: string
  isLightBackground: boolean
}

const FeatureCard = ({ title, description, icon: Icon, iconColor, screens, demoLink, isLightBackground }: FeatureCardProps) => {
  const { openLightbox } = useLightbox()
  const bgColor = isLightBackground ? 'bg-white' : 'bg-slate-800'
  const borderColor = isLightBackground ? 'border-slate-200' : 'border-slate-700'
  const titleColor = isLightBackground ? 'text-slate-900' : 'text-white'
  const descColor = isLightBackground ? 'text-slate-600' : 'text-slate-300'
  const labelColor = isLightBackground ? 'text-slate-400' : 'text-slate-500'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${bgColor} ${borderColor} border shadow-sm overflow-hidden`}
    >
      {/* Header */}
      <div className={`p-6 border-b ${borderColor}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 flex items-center justify-center ${iconColor}`}>
            <Icon size={20} className="text-white" />
          </div>
          <h3 className={`font-serif text-xl font-semibold ${titleColor}`}>{title}</h3>
        </div>
        <p className={`text-sm ${descColor}`}>{description}</p>
        {demoLink && (
          <Link
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mt-3"
          >
            <ExternalLink size={14} /> Watch Public Demo
          </Link>
        )}
      </div>

      {/* Screen Grid - Mobile Scroll / Desktop Grid */}
      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 p-3 min-w-max">
          {screens.map((screen, index) => (
            <div
              key={index}
              className="w-[200px] flex-shrink-0"
            >
              <span className={`font-mono text-[9px] uppercase tracking-widest ${labelColor} block mb-2`}>
                {'// '}{screen.label}
              </span>
              <div
                className="relative aspect-video overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(screen.imageSrc, screen.altText)}
              >
                <Image
                  src={screen.imageSrc}
                  alt={screen.altText}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 shadow-sm">
                  <span className="font-mono text-[8px] text-slate-500 uppercase">Tap</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {screens.length > 2 && (
          <p className="text-center text-slate-400 text-[10px] pb-2">← Swipe →</p>
        )}
      </div>

      {/* Desktop: 2-Column Grid */}
      <div className="hidden md:grid grid-cols-2 gap-px bg-slate-200">
        {screens.map((screen, index) => (
          <div
            key={index}
            className={`${bgColor} p-3`}
          >
            <span className={`font-mono text-[9px] uppercase tracking-widest ${labelColor} block mb-2`}>
              {'// '}{screen.label}
            </span>
            <div
              className="relative aspect-video overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(screen.imageSrc, screen.altText)}
            >
              <Image
                src={screen.imageSrc}
                alt={screen.altText}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                <span className="text-white text-opacity-0 group-hover:text-opacity-100 transition-opacity text-xs font-medium">
                  View
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function IQNLQInsightsShowcase({ isLightBackground = true }) {
  const features = [
    {
      title: 'Natural Language Query (NLQ)',
      description: 'Ask questions in plain English, get instant visualizations. I designed the complete workflow—from empty states to error handling to results display.',
      icon: MessageSquare,
      iconColor: 'bg-blue-600',
      demoLink: 'https://www.youtube.com/watch?v=LDaGvuS4K5Y',
      screens: [
        {
          imageSrc: '/images/case-study/iq-plugin/NLQ _ Empty State Illustration.png',
          altText: 'NLQ Empty State',
          label: 'EMPTY_STATE',
        },
        {
          imageSrc: '/images/case-study/iq-plugin/NLQ _ Suggested Questions.png',
          altText: 'NLQ Suggested Questions',
          label: 'SUGGESTIONS',
        },
        {
          imageSrc: '/images/case-study/iq-plugin/NLQ _ Results View.png',
          altText: 'NLQ Results',
          label: 'RESULTS_VIEW',
        },
        {
          imageSrc: '/images/case-study/iq-plugin/NLQ _ Empty State Illustration - Error Screen with Back Button.png',
          altText: 'NLQ Error State',
          label: 'ERROR_HANDLING',
        },
      ],
    },
    {
      title: 'Automated Insights',
      description: 'One-click statistical analysis with auto-generated insights. I owned the full visual system—including the custom color palette for data visualization.',
      icon: Lightbulb,
      iconColor: 'bg-amber-500',
      demoLink: 'https://www.youtube.com/watch?v=ggcv8b7EKXo',
      screens: [
        {
          imageSrc: '/images/case-study/iq-plugin/Insights in HUB - Empty state.png',
          altText: 'Insights Empty State',
          label: 'EMPTY_STATE',
        },
        {
          imageSrc: '/images/case-study/iq-plugin/Insights - Results - Tile View 1.png',
          altText: 'Insights Results Tile View',
          label: 'TILE_VIEW',
        },
        {
          imageSrc: '/images/case-study/iq-plugin/Insights in HUB - Results view.png',
          altText: 'Insights Results in Hub',
          label: 'RESULTS_VIEW',
        },
        {
          imageSrc: '/images/case-study/iq-plugin/Insights Color Palette 1.png',
          altText: 'Insights Color Palette',
          label: 'COLOR_SYSTEM',
        },
      ],
    },
  ]

  const titleColor = isLightBackground ? 'text-slate-900' : 'text-white'
  const summaryColor = isLightBackground ? 'text-slate-600' : 'text-slate-300'

  return (
    <div className="w-full py-10 md:py-12">
      <ComponentHeading
        variant="block"
        tag="// WORKFLOWS_OWNED"
        title="NLQ & Insights: The Foundation"
        description="Before IQ Plugin unified everything, I designed and owned these workflows end-to-end. Both are shipping now in WebFOCUS 9.3.6—fully responsive, with consistent patterns that made the IQ Plugin integration seamless."
        color="teal"
        align="center"
        className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-12"
      />

      <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            isLightBackground={isLightBackground}
          />
        ))}
      </div>

      {/* Pattern Parity Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-12"
      >
        <div className={`p-6 ${isLightBackground ? 'bg-slate-100' : 'bg-slate-800'}`}>
          <div className="flex items-start gap-3">
            <Layout size={20} className="text-[var(--accent-teal)] flex-shrink-0 mt-0.5" />
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-2 ${isLightBackground ? 'text-slate-500' : 'text-slate-400'}`}>
                {'// PATTERN_PARITY'}
              </span>
              <p className={`text-sm leading-relaxed ${summaryColor}`}>
                Same empty state patterns. Same data selection flow. Same error handling. Same responsive breakpoints.
                When I built NLQ and Insights, I designed them as a <span className="font-medium text-[var(--accent-teal)]">system</span>—knowing
                they&apos;d eventually live together. IQ Plugin is the result.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

