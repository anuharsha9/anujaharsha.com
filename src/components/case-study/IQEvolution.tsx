'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'
import MacWindowCarousel from '@/components/ui/MacWindowCarousel'

interface IQEvolutionProps {
  isLightBackground?: boolean
}

const evolutionStages = [
  {
    id: '01',
    label: 'PHASE_01',
    title: 'Early Concept',
    description: 'Initial exploration of unified DSML entry point',
    image: '/images/case-study/iq-plugin/Early concept - 1.png',
  },
  {
    id: '02',
    label: 'PHASE_02',
    title: 'Mid-Iteration',
    description: 'Structure taking shape—navigation patterns emerging',
    image: '/images/case-study/iq-plugin/Mid-Iteration.png',
  },
  {
    id: '03',
    label: 'PHASE_03',
    title: 'Refined Layout',
    description: 'Card-based navigation with clearer feature hierarchy',
    image: '/images/case-study/iq-plugin/Mid-Iteration-1.png',
  },
  {
    id: '04',
    label: 'FINAL',
    title: 'Production Design',
    description: 'Final polished design ready for engineering handoff',
    image: '/images/case-study/iq-plugin/Final Look.png',
  },
]

export default function IQEvolution({ isLightBackground = false }: IQEvolutionProps) {
  const [activeStage, setActiveStage] = useState(0)

  // Map phases to viewer images
  const sequenceImages = evolutionStages.map(stage => ({
    src: stage.image,
    alt: stage.title,
    caption: `// ${stage.label}: ${stage.description}`
  }))

  return (
    <div className={`w-full py-10 md:py-12 ${isLightBackground ? 'bg-white' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ComponentHeading
          variant="block"
          align="center"
          tag="// DESIGN_EVOLUTION"
          title="From Concept to Production"
          description="Watch the design mature through 4 major iterations."
          color="teal"
          className="mb-10"
        />

        {/* Streaming Platform Layout */}
        <div className="space-y-8">
          {/* 1. Synchronized Tabs - Mobile Optimized */}
          <div className="relative group">
            {/* Fade gradients */}
            <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r ${isLightBackground ? 'from-white' : 'from-slate-50'} to-transparent z-10 pointer-events-none md:hidden`} />
            <div className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l ${isLightBackground ? 'from-white' : 'from-slate-50'} to-transparent z-10 pointer-events-none md:hidden`} />

            <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 scrollbar-hide px-4 -mx-4 md:mx-0 snap-x">
              <div className="flex gap-2 min-w-min">
                {evolutionStages.map((stage, index) => (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(index)}
                    className={`
                      flex flex-col items-center px-5 py-2 text-xs font-medium transition-all duration-300 snap-center min-w-[120px]
                      ${activeStage === index
                        ? 'bg-[var(--accent-teal)] text-white shadow-md transform scale-105'
                        : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}
                    `}
                  >
                    <span className="font-mono tracking-widest opacity-80 text-[10px] mb-0.5">{stage.label}</span>
                    <span className="font-sans font-semibold text-sm">{stage.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Scroll Hint */}
            <div className="md:hidden flex justify-center mt-2 opacity-40 text-[10px] uppercase tracking-widest font-mono text-slate-500">
              &larr; Swipe to explore phases &rarr;
            </div>
          </div>

          {/* 2. Full Screen Viewer (Controlled) */}
          <div className="max-w-5xl mx-auto">
            <MacWindowCarousel
              images={sequenceImages}
              title="Design Evolution"
              currentIndex={activeStage}
              onIndexChange={setActiveStage}
              autoPlay={true}
              className="w-full"
            />

            {/* Dynamic Caption */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mt-4 px-4"
              >
                <p className="text-slate-600 font-medium">
                  {evolutionStages[activeStage].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
