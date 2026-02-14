'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

import { MousePointer, Workflow, Layout, BarChart3, Sparkles, Terminal } from 'lucide-react'
import { getTheme } from '@/lib/design-system'
import ComponentHeading from '@/components/ui/ComponentHeading'
import ImageLightbox from './ImageLightbox'

export interface TabImage {
  src: string
  alt: string
  caption: string
  figNumber: string
}

export interface TabQuote {
  text: string
  attribution: string
}

export interface Tab {
  id: string
  index: string
  label: string
  icon: React.ReactNode
  title: string
  description: string
  images: TabImage[]
  quote?: TabQuote
  isKey?: boolean
  specCaption?: string // Added to support IQ's extra caption
}

interface DesignIterationLogProps {
  isLightBackground?: boolean
  tabs?: Tab[]
  title?: string
  description?: string
  footerContent?: {
    label: string
    text: React.ReactNode
  }
}

export default function DesignIterationLog({
  isLightBackground = false,
  tabs: propTabs,
  title = "System Inspection: The Design Artifacts",
  description = "Navigate through the key design deliverables that emerged from 6–8 months of cross-functional iteration.",
  footerContent
}: DesignIterationLogProps) {
  const t = getTheme(true)
  const [activeTab, setActiveTab] = useState(propTabs ? propTabs[0].id : '01_ENTRY_POINTS')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const defaultTabs: Tab[] = [
    {
      id: '01_ENTRY_POINTS',
      index: '01',
      label: 'Entry Points',
      icon: <MousePointer className="w-4 h-4" />,
      title: 'Multiple Entry Points from the Hub',
      description: 'Right-click context menus from the Hub, driven by the Techy Analyst persona. Users access Predict Data via right-click on dataset, folder, or +Data menu — all entry points found in SME testing.',
      images: [
        {
          src: '/images/case-study/ml-functions/1. Predict Data - Train Models - Empty State.png',
          alt: 'Predict Data - Empty State',
          caption: 'Empty State: Initial landing when no models exist',
          figNumber: 'FIG_04',
        },
        {
          src: '/images/case-study/ml-functions/Launch ML from the HUB - right click dataset.png',
          alt: 'Launch ML from HUB - right click dataset',
          caption: 'Right-click on dataset: Direct access to Predict Data',
          figNumber: 'FIG_05',
        },
        {
          src: '/images/case-study/ml-functions/Launch ML from the HUB - right click folder.png',
          alt: 'Launch ML from HUB - right click folder',
          caption: 'Right-click on folder: Context menu integration',
          figNumber: 'FIG_06',
        },
        {
          src: '/images/case-study/ml-functions/Launch ML from the HUB - right click +Data button.png',
          alt: 'Launch ML from HUB - +Data button',
          caption: '+Data menu: First-class feature exposure',
          figNumber: 'FIG_07',
        },
      ],
    },
    {
      id: '03_CORE_WORKFLOW',
      index: '03',
      label: 'Core Workflow',
      icon: <Workflow className="w-4 h-4" />,
      title: 'The 4-Step Guided Wizard',
      description: 'Structured guided flow: problem type → target → predictors → hyperparameters. Based on our domain expert\'s answer to "What do you absolutely need?" — making ML feel like a guided tour, not a black box.',
      images: [
        {
          src: '/images/case-study/ml-functions/4. Train Model Workflow - Step 1 - Select Problem Type.png',
          alt: 'Step 1 - Select Problem Type',
          caption: 'Step 1: Select Problem Type (classification/regression)',
          figNumber: 'FIG_08',
        },
        {
          src: '/images/case-study/ml-functions/5. Train Model Workflow - Step 2 - Specify Problem.png',
          alt: 'Step 2 - Specify Problem',
          caption: 'Step 2: Specify Problem details and target',
          figNumber: 'FIG_09',
        },
        {
          src: '/images/case-study/ml-functions/6. Train Model Workflow - Step 3 - Select Predictors.png',
          alt: 'Step 3 - Select Predictors',
          caption: 'Step 3: Select Predictors and features',
          figNumber: 'FIG_10',
        },
        {
          src: '/images/case-study/ml-functions/7. Train Model Workflow - Step 4 - Configure Hyperparameters.png',
          alt: 'Step 4 - Configure Hyperparameters (optional for experts)',
          caption: 'Step 4: Configure Hyperparameters (optional for experts)',
          figNumber: 'FIG_11',
        },
      ],
    },
    {
      id: '04_DESIGN_SYSTEM',
      index: '04',
      label: 'Design System',
      icon: <Layout className="w-4 h-4" />,
      title: 'ML-Specific Component Architecture',
      description: 'A comprehensive design system built for ML workflows: responsive grids, table styling specifications, and component-level precision for model cards. Every pixel decision was documented.',
      images: [
        {
          src: '/images/case-study/ml-functions/1. ML UI Structure.png',
          alt: 'ML UI Structure',
          caption: 'UI Architecture: Overall layout structure',
          figNumber: 'FIG_12',
        },
        {
          src: '/images/case-study/ml-functions/12 Column Grid for the Step Workflow.png',
          alt: '12 Column Grid for Step Workflow',
          caption: 'Step Workflow Grid: Responsive 12-column system',
          figNumber: 'FIG_13',
        },
        {
          src: '/images/case-study/ml-functions/Important Styling and Structure Decisions w/12 Column Grid in Train Model UI.png',
          alt: '12 Column Grid in Train Model UI',
          caption: 'Train Model Grid: Applied grid in context',
          figNumber: 'FIG_14',
        },
        {
          src: '/images/case-study/ml-functions/Important Styling and Structure Decisions w/Table Styling Guide.png',
          alt: 'Table Styling Guide',
          caption: 'Table Styling: Color specs for predictors & columns',
          figNumber: 'FIG_15',
        },
        {
          src: '/images/case-study/ml-functions/Important Styling and Structure Decisions w/Model Tile UI Guide.png',
          alt: 'Model Tile UI Guide',
          caption: 'Model Tile: Component-level specs for model cards',
          figNumber: 'FIG_16',
        },
      ],
    },
    {
      id: '05_ADVANCED_METRICS',
      index: '05',
      label: 'Advanced Metrics',
      icon: <BarChart3 className="w-4 h-4" />,
      title: 'Balancing DS Needs with Readability',
      description: 'Advanced metrics screens that balance data scientist needs (comprehensive metrics) with user needs (scannable, understandable results). The tension between depth and clarity produced the best outcomes.',
      images: [
        {
          src: '/images/case-study/ml-functions/10. Binary Classfication - ROC Precision.png',
          alt: 'Binary Classification - ROC Precision',
          caption: 'ROC Precision: Comprehensive yet scannable metrics',
          figNumber: 'FIG_17',
        },
        {
          src: '/images/case-study/ml-functions/17. Optimize Model Popup.png',
          alt: 'Optimize Model Popup',
          caption: 'Optimize Model: Expert controls with clear affordances',
          figNumber: 'FIG_18',
        },
      ],
    },
    {
      id: '06_KEY_INTERACTIONS',
      index: '06',
      label: 'Key Interactions',
      icon: <Sparkles className="w-4 h-4" />,
      title: 'The Confusion Matrix & Explainability',
      description: 'The confusion matrix went through 10+ iterations with our domain expert. Balanced DS priorities (metrics, accuracy) with UX priorities (clarity, scan-ability).',
      isKey: true,
      quote: {
        text: "This is the best screen in the entire UX revamp — I couldn't have designed it better.",
        attribution: 'Principal Data Scientist',
      },
      images: [
        {
          src: '/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png',
          alt: 'Confusion Matrix screen',
          caption: 'Confusion Matrix: 10+ iterations to perfect',
          figNumber: 'FIG_19',
        },
        {
          src: '/images/case-study/ml-functions/8. Train Model Workflow - Compare Models.png',
          alt: 'Compare Models screen',
          caption: 'Model comparison: Cards replace legacy tables',
          figNumber: 'FIG_20',
        },
        {
          src: '/images/case-study/ml-functions/6. Run Model - Explainability Popup.png',
          alt: 'Explainability Popup',
          caption: 'Explainability: Making ML trustworthy',
          figNumber: 'FIG_21',
        },
      ],
    },
  ]

  const tabs = propTabs || defaultTabs
  const activeTabData = tabs.find(t => t.id === activeTab)

  const headerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="space-y-12 py-12">
      {/* Section Header */}
      <motion.div
        variants={headerVariants}
        className="max-w-4xl mx-auto"
      >
        <ComponentHeading
          variant="block"
          align="center"
          tag="// ARTIFACT_GALLERY"
          title={title}
          description={description}
          color="slate"
          className="mb-12"
        />
      </motion.div>

      {/* Interactive Gallery */}
      <div className="space-y-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex bg-slate-100 p-1.5 rounded-full overflow-x-auto max-w-full">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                                relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}
                            `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white shadow-sm rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Stage */}
        <AnimatePresence mode="wait">
          {activeTabData && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Context Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div>
                  <h4 className="text-2xl font-light text-slate-900 mb-2">
                    {activeTabData.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {activeTabData.description}
                  </p>
                </div>

                {/* Featured Quote */}
                {activeTabData.quote && (
                  <div className="mt-6">
                    <blockquote className="text-xl font-serif italic text-slate-800 leading-relaxed">
                      &ldquo;{activeTabData.quote.text}&rdquo;
                    </blockquote>
                    <cite className="block mt-2 text-xs font-bold uppercase tracking-widest text-slate-400 not-italic">
                      — {activeTabData.quote.attribution}
                    </cite>
                  </div>
                )}
              </div>

              {/* Static Grid View (Replacing Slider) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeTabData.images.map((img, index) => (
                  <div
                    key={index}
                    className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white cursor-pointer hover:shadow-md transition-all duration-300"
                    onClick={() => {
                      setLightboxIndex(index)
                      setLightboxOpen(true)
                    }}
                  >
                    <div className="aspect-video relative bg-slate-50">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-4 bg-white border-t border-slate-50 flex items-start gap-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-0.5 whitespace-nowrap">
                        {img.figNumber}
                      </span>
                      <p className="text-sm text-slate-600 font-light leading-snug">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Insight - Terminal Style */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/10 max-w-4xl mx-auto"
      >
        {/* Terminal Window Controls */}
        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>

        <div className="p-8">
          <div className="flex items-start gap-4">
            <div className="bg-emerald-500/10 p-2 rounded-lg shrink-0">
              <Terminal className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block">
                {footerContent ? footerContent.label : '> IDENTIFIED_PATTERN:'}
              </span>
              {footerContent ? (
                <div className="text-slate-300 text-sm font-mono leading-relaxed">
                  {footerContent.text}
                </div>
              ) : (
                <p className="text-slate-300 text-sm font-mono leading-relaxed">
                  <span className="text-emerald-300 font-bold">USER_OUTCOME:</span> The tension between data scientist depth and user clarity produced the best results.
                  <span className="block mt-2 text-slate-500 italic">
                    {'//'} 21 key artifacts documenting 6–8 months of cross-functional iteration.
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      {lightboxOpen && activeTabData && (
        <ImageLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageSrc={activeTabData.images[lightboxIndex].src}
          imageAlt={activeTabData.images[lightboxIndex].alt}
          imageCaption={activeTabData.images[lightboxIndex].caption}
          images={activeTabData.images.map(img => ({
            src: img.src,
            alt: img.alt,
            caption: img.caption,
            type: 'image'
          }))}
          currentIndex={lightboxIndex}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}

    </div>
  )
}
