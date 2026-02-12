'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useLightbox } from '@/contexts/LightboxContext'
import { MessageSquare, Lightbulb, Brain, Database } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface IQIterationLogProps {
  isLightBackground?: boolean
}

interface TabImage {
  src: string
  alt: string
  caption: string
  figNumber: string
}

interface Tab {
  id: string
  index: string
  label: string
  icon: React.ReactNode
  title: string
  description: string
  images: TabImage[]
  specCaption: string
  isKey?: boolean
}

export default function IQIterationLog({ isLightBackground = false }: IQIterationLogProps) {
  const [activeTab, setActiveTab] = useState('01_NLQ_WORKFLOW')
  const { openLightbox } = useLightbox()

  const tabs: Tab[] = [
    {
      id: '01_NLQ_WORKFLOW',
      index: '01',
      label: 'Natural Language Query',
      icon: <MessageSquare className="w-4 h-4" />,
      title: 'Ask a Question Workflow',
      description: 'From empty state to visualization. Validating the "Ask a Question" mental model with non-technical users.',
      specCaption: 'FIG_01: QUERY_PARSING_LOGIC',
      images: [
        {
          src: '/images/case-study/iq-plugin/IQ - Ask a Question _ Empty State 1.png',
          alt: 'IQ NLQ - Empty state',
          caption: 'Empty State: Tutorial guidance on first visit',
          figNumber: 'FIG_01A',
        },
        {
          src: '/images/case-study/iq-plugin/IQ - Ask a Question _ Data Selected 1.png',
          alt: 'IQ NLQ - Data selected',
          caption: 'Data Selected: Ready to receive natural language input',
          figNumber: 'FIG_01B',
        },
        {
          src: '/images/case-study/iq-plugin/IQ - Ask a Question - Vertical Stacked Bar 1.png',
          alt: 'IQ NLQ - Chart visualization',
          caption: 'Query Result: Auto-generated visualization',
          figNumber: 'FIG_01C',
        },
      ],
    },
    {
      id: '02_INSIGHTS_ENGINE',
      index: '02',
      label: 'Automated Insights',
      icon: <Lightbulb className="w-4 h-4" />,
      title: 'Pattern Recognition Engine',
      description: 'Generating instant summaries. Testing the "auto-generate" pattern to reduce time-to-value.',
      specCaption: 'FIG_02: PATTERN_RECOGNITION_UI',
      images: [
        {
          src: '/images/case-study/iq-plugin/IQ - Insights _ Empty State 1.png',
          alt: 'IQ Insights - Empty state',
          caption: 'Empty State: Data selection prompt',
          figNumber: 'FIG_02A',
        },
        {
          src: '/images/case-study/iq-plugin/IQ - Insights _ Data Selected 1.png',
          alt: 'IQ Insights - Data selected',
          caption: 'Processing: Insights generation in progress',
          figNumber: 'FIG_02B',
        },
        {
          src: '/images/case-study/iq-plugin/IQ - Insights - Tile View 1.png',
          alt: 'IQ Insights - Tile view',
          caption: 'Results: Scannable tile-based insights display',
          figNumber: 'FIG_02C',
        },
      ],
    },
    {
      id: '03_PREDICT_WORKFLOW',
      index: '03',
      label: 'Predictive Analytics',
      icon: <Brain className="w-4 h-4" />,
      isKey: true,
      title: 'Guided Model Training Flow',
      description: 'The guided 4-step ML flow. Re-using the "ML Functions" wizard pattern within the IQ Hub context.',
      specCaption: 'FIG_03: GUIDED_MODEL_TRAINING',
      images: [
        {
          src: '/images/case-study/iq-plugin/IQ - Predict Data - Train Models - landing page - model tile view.png',
          alt: 'IQ Predict Data - Train models landing',
          caption: 'Landing: Model tile overview with quick actions',
          figNumber: 'FIG_03A',
        },
        {
          src: '/images/case-study/iq-plugin/IQ - Predict Data - Train Model Workflow - Compare models.png',
          alt: 'IQ Predict Data - Compare models',
          caption: 'Compare: Side-by-side model performance analysis',
          figNumber: 'FIG_03B',
        },
        {
          src: '/images/case-study/iq-plugin/IQ - Predict Data - Train Model Workflow - Results - Fitted Values.png',
          alt: 'IQ Predict Data - Model results',
          caption: 'Results: Fitted values with confidence intervals',
          figNumber: 'FIG_03C',
        },
        {
          src: '/images/case-study/iq-plugin/IQ - Predict Data - Run Model - results.png',
          alt: 'IQ Predict Data - Results',
          caption: 'Execution: Live prediction results',
          figNumber: 'FIG_03D',
        },
        {
          src: '/images/case-study/iq-plugin/IQ - Predict Data - Run Model - explanability.png',
          alt: 'IQ Predict Data - Explainability',
          caption: 'Explainability: Making ML decisions transparent',
          figNumber: 'FIG_03E',
        },
      ],
    },
    {
      id: '04_DATA_PREVIEW',
      index: '04',
      label: 'Data Exploration',
      icon: <Database className="w-4 h-4" />,
      title: 'Quick-Look Dataset Analysis',
      description: 'Ensuring consistent table interactions and time-series views. The first step in any data workflow.',
      specCaption: 'FIG_04: DATA_QUALITY_INSPECTION',
      images: [
        {
          src: '/images/case-study/iq-plugin/IQ - Preview Data Sample Tab 1.png',
          alt: 'IQ Preview Data - Sample tab',
          caption: 'Sample Tab: Quick data inspection',
          figNumber: 'FIG_04A',
        },
        {
          src: '/images/case-study/iq-plugin/IQ - Preview Data Key Analysis Tab 1.png',
          alt: 'IQ Preview Data - Key analysis tab',
          caption: 'Key Analysis: Column statistics and distribution',
          figNumber: 'FIG_04B',
        },
        {
          src: '/images/case-study/iq-plugin/IQ - Preview Data Time-series report tab 1.png',
          alt: 'IQ Preview Data - Time-series tab',
          caption: 'Time-series: Temporal pattern visualization',
          figNumber: 'FIG_04C',
        },
      ],
    },
  ]

  const activeTabData = tabs.find(t => t.id === activeTab)

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <ComponentHeading
        tag="// DESIGN_ITERATION_LOG"
        title="System Inspection: The Design Artifacts"
        description="Navigate through the key design deliverables across all 4 IQ Plugin pillars."
        color="text-[var(--accent-teal)]"
        align="center"
        className="mb-8"
      />

      {/* IDE Layout - Large Feature Display */}
      <div className="bg-white border border-slate-200 overflow-hidden shadow-lg rounded-xl">
        <div className="flex flex-col lg:flex-row">

          {/* Mobile Tabs - Horizontal Scrollable Pills */}
          <div className="lg:hidden border-b border-slate-200 bg-slate-50/30">
            <div className="px-4 pt-4 pb-2">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                {'// PILLAR_INDEX'}
              </span>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 px-4 pb-4 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200
                      ${activeTab === tab.id
                        ? 'bg-[var(--accent-violet)] text-white shadow-md'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}
                    `}
                  >
                    <span className={activeTab === tab.id ? 'text-white' : 'text-slate-400'}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Sidebar - File Tree */}
          <div className="hidden lg:block w-[22%] border-r border-slate-200 p-6 bg-slate-50/30">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block mb-6">
              {'// PILLAR_INDEX'}
            </span>

            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full text-left py-4 px-4 border-l-2 transition-all duration-200 flex items-center gap-3
                    ${activeTab === tab.id
                      ? 'border-[var(--accent-teal)] bg-[var(--accent-teal-50)] text-slate-900'
                      : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <span className={`flex-shrink-0 ${activeTab === tab.id ? 'text-[var(--accent-teal)]' : 'text-slate-400'}`}>
                    {tab.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-xs opacity-50 mr-2">{tab.index}</span>
                    <span className="font-sans font-medium text-sm">{tab.label}</span>
                  </div>
                  {tab.isKey && (
                    <span className="flex-shrink-0 bg-violet-100 text-violet-700 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 ">
                      Key
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Preview Pane - The Stage */}
          <div className="flex-1 p-4 md:p-6 lg:p-10 min-h-[400px] lg:min-h-[650px]">
            <AnimatePresence mode="wait">
              {activeTabData && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Content Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] text-[var(--accent-teal)] uppercase tracking-widest">
                        {'// '}{activeTabData.specCaption}
                      </span>
                    </div>
                    <h4 className="font-serif text-2xl md:text-3xl text-slate-900 mb-3">
                      {activeTabData.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
                      {activeTabData.description}
                    </p>
                  </div>

                  {/* Mobile: Horizontal Scroll Images */}
                  <div className="md:hidden -mx-4 px-4">
                    <div className="overflow-x-auto scrollbar-hide">
                      <div className="flex gap-4 min-w-max pb-4">
                        {activeTabData.images.map((img, i) => {
                          const galleryImages = activeTabData.images.map(image => ({
                            src: image.src,
                            alt: image.alt,
                            caption: `// ${image.figNumber}: ${image.caption}`
                          }))

                          return (
                            <div
                              key={i}
                              className="group cursor-pointer w-[280px] flex-shrink-0"
                              onClick={() => openLightbox(
                                { src: img.src, alt: img.alt, caption: `// ${img.figNumber}: ${img.caption}` },
                                galleryImages,
                                i
                              )}
                              role="button"
                              tabIndex={0}
                              aria-label={`View ${img.alt} in fullscreen`}
                            >
                              <div className="border border-slate-200 shadow-sm overflow-hidden bg-slate-50">
                                <div className="relative aspect-[4/3]">
                                  <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover"
                                    sizes="280px"
                                  />
                                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 shadow-sm">
                                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider">
                                      Tap to expand
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mt-2 line-clamp-2">
                                {'// '}{img.figNumber}: {img.caption}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    {activeTabData.images.length > 1 && (
                      <p className="text-center text-slate-400 text-xs mt-1">← Swipe to see more →</p>
                    )}
                  </div>

                  {/* Desktop: Grid Display */}
                  <div className={`hidden md:grid gap-5 ${activeTabData.images.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 xl:grid-cols-3'}`}>
                    {activeTabData.images.map((img, i) => {
                      const galleryImages = activeTabData.images.map(image => ({
                        src: image.src,
                        alt: image.alt,
                        caption: `// ${image.figNumber}: ${image.caption}`
                      }))

                      return (
                        <div
                          key={i}
                          className="group cursor-pointer"
                          onClick={() => openLightbox(
                            { src: img.src, alt: img.alt, caption: `// ${img.figNumber}: ${img.caption}` },
                            galleryImages,
                            i
                          )}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              openLightbox(
                                { src: img.src, alt: img.alt, caption: `// ${img.figNumber}: ${img.caption}` },
                                galleryImages,
                                i
                              )
                            }
                          }}
                          aria-label={`View ${img.alt} in fullscreen`}
                        >
                          <div className="border border-slate-200 shadow-sm overflow-hidden bg-slate-50 group-hover:shadow-lg group-hover:border-[var(--accent-teal-300)] transition-all duration-300">
                            <div className="relative aspect-[4/3]">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                sizes="(max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-lg">
                                    <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
                                      Click to expand
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-2.5">
                            {'// '}{img.figNumber}: {img.caption}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Validation Outcome Footer - Terminal Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#1D1D20] p-6 rounded-xl shadow-lg border border-white/10 max-w-4xl mx-auto font-mono"
      >
        {/* Terminal Header */}
        <div className="flex gap-2 mb-4 opacity-50">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>

        <div className="flex items-start gap-3">
          <span className="font-mono text-sm text-emerald-400 flex-shrink-0">
            &gt; VALIDATION_OUTCOME:
          </span>
          <p className="text-slate-300 text-sm leading-relaxed font-sans">
            User testing confirmed that the &quot;Unified Hub&quot; architecture successfully abstracted the complexity.
            <span className="text-emerald-400 font-medium"> Non-technical users could execute NLQ queries without training</span>, while
            <span className="text-emerald-400 font-medium"> Data Scientists accepted the &quot;Predict&quot; wizard as a valid accelerator</span>.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
