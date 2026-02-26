'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'
import AutoSequenceDataViewer from './AutoSequenceDataViewer'

interface IQEvolutionProps {
  isLightBackground?: boolean
}

const evolutionStages = [
  {
    id: '01',
    label: 'V1',
    title: 'Early Concept',
    description: 'Initial exploration of unified DSML entry point',
    image: '/images/case-study/iq-plugin/Early concept - 1.png',
  },
  {
    id: '02',
    label: 'V2',
    title: 'Mid-Iteration',
    description: 'Structure taking shape — navigation patterns emerging',
    image: '/images/case-study/iq-plugin/Mid-Iteration.png',
  },
  {
    id: '03',
    label: 'V3',
    title: 'Refined Layout',
    description: 'Card-based navigation with clearer feature hierarchy',
    image: '/images/case-study/iq-plugin/Mid-Iteration-1.png',
  },
  {
    id: '04',
    label: 'FINAL',
    title: 'Production',
    description: 'Final polished design ready for engineering handoff',
    image: '/images/case-study/iq-plugin/Final Look.png',
  },
]

export default function IQEvolution({ isLightBackground = false }: IQEvolutionProps) {
  const [activeStage, setActiveStage] = useState(0)

  const sequenceImages = evolutionStages.map(stage => ({
    src: stage.image,
    alt: stage.title,
    caption: `// ${stage.label}: ${stage.description}`
  }))

  return (
    <div className="w-full py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ComponentHeading
          variant="block"
          align="center"
          tag="DESIGN EVOLUTION"
          title="From Concept to Production"
          description="4 iterations to the final Hub architecture."
          color="teal"
          className="mb-10"
        />

        <div className="space-y-6">
          {/* Timeline-style phase selector */}
          <div className="flex items-center justify-center gap-0 max-w-2xl mx-auto">
            {evolutionStages.map((stage, index) => (
              <div key={stage.id} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => setActiveStage(index)}
                  className="flex flex-col items-center gap-1.5 group relative"
                >
                  {/* Dot */}
                  <div className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${activeStage === index
                      ? 'bg-[var(--accent-teal)] shadow-lg shadow-teal-500/30 scale-125'
                      : activeStage > index
                        ? 'bg-[var(--accent-teal)]/50'
                        : 'bg-white/[0.15] group-hover:bg-white/[0.25]'}
                  `} />
                  {/* Label */}
                  <span className={`
                    font-mono text-[9px] uppercase tracking-widest transition-colors duration-300
                    ${activeStage === index ? 'text-[var(--accent-teal)]' : 'text-[var(--text-muted)]'}
                  `}>
                    {stage.label}
                  </span>
                  <span className={`
                    font-sans text-xs font-medium transition-colors duration-300 whitespace-nowrap
                    ${activeStage === index ? 'text-[var(--text-heading)]' : 'text-[var(--text-muted)]'}
                  `}>
                    {stage.title}
                  </span>
                </button>
                {/* Connecting line */}
                {index < evolutionStages.length - 1 && (
                  <div className={`
                    flex-1 h-px mx-3 mt-[-24px] transition-colors duration-300
                    ${activeStage > index ? 'bg-[var(--accent-teal)]/40' : 'bg-white/[0.08]'}
                  `} />
                )}
              </div>
            ))}
          </div>

          {/* Image Viewer */}
          <div className="max-w-5xl mx-auto">
            <AutoSequenceDataViewer
              images={sequenceImages}
              title="Design Evolution"
              currentIndex={activeStage}
              onIndexChange={setActiveStage}
              autoPlay={true}
              className="w-full"
            />

            {/* Dynamic Caption */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeStage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mt-4 text-[var(--text-muted)] text-sm"
              >
                {evolutionStages[activeStage].description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
