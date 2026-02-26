'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLightbox } from '@/contexts/LightboxContext'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface IQEmptyStateShowcaseProps {
  isLightBackground?: boolean
}

const emptyStates = [
  {
    id: 'insights',
    label: 'INSIGHTS_EMPTY',
    title: 'Generate Insights',
    image: '/images/case-study/iq-plugin/IQ - Insights _ Empty State 1.png',
    description: 'Clear call-to-action with visual guidance',
    span: 'md:col-span-2' // Full Width Hero
  },
  {
    id: 'nlq-select',
    label: 'NLQ_DATA_SELECT',
    title: 'Ask a Question',
    image: '/images/case-study/iq-plugin/IQ - Ask a Question _ Empty State 1.png',
    description: 'Dataset selection with progressive disclosure',
    span: 'md:col-span-1' // Half Width
  },
  {
    id: 'predict-empty',
    label: 'PREDICT_EMPTY',
    title: 'Predict Data',
    image: '/images/case-study/iq-plugin/IQ - Predict Data - Train Models - landing page - model tile view.png',
    description: 'Model tile view with clear entry points',
    span: 'md:col-span-1' // Half Width
  },
]

export default function IQEmptyStateShowcase({ isLightBackground = false }: IQEmptyStateShowcaseProps) {
  const { openLightbox } = useLightbox()

  return (
    <div className={`w-full py-10 md:py-16 `}>
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <ComponentHeading
          tag="EMPTY STATES"
          title="Guiding First Impressions"
          description="Every empty state is a teaching moment. No blank screens — each guides users toward their first action."
          className="mb-12 md:mb-16"
        />

        {/* Empty States Grid - Bento Style (1-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-7xl mx-auto px-4 perspective-[2000px]">
          {emptyStates.map((state, index) => (
            <motion.div
              key={state.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group flex flex-col gap-3 ${state.span}`}
            >
              {/* Image Container - No Box, Natural Size */}
              <div
                className="relative w-full cursor-zoom-in group-hover:scale-[1.01] transition-transform duration-500"
                onClick={() => openLightbox(state.image, state.title)}
              >
                <Image
                  src={state.image}
                  alt={state.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  className="object-contain" // Or object-cover if we want consistency, but intrinsic safer for mixed aspect ratios
                />
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-300 pointer-events-none" />
              </div>

              {/* Minimal Caption */}
              <div className="flex flex-col gap-1 px-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-teal-600 font-semibold">
                    {`// ${state.label}`}
                  </span>
                  <span className="h-px flex-1 bg-white/[0.05] hidden group-hover:block transition-all" />
                </div>
                <h4 className="font-sans text-lg text-[var(--text-heading)]">{state.title}</h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-lg">
                  {state.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insight Footer - Kept but refined */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto px-4"
        >
          <div className="bg-slate-900 rounded-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-teal-500" />
            <span className="font-mono text-xs text-teal-400 mb-3 block tracking-wider">
              {`>`} DESIGN_PRINCIPLE
            </span>
            <p className="font-sans text-xl italic text-slate-200 leading-relaxed">
              &quot;The best onboarding happens in context. Every empty state is a teaching moment—show users what&apos;s possible, not just what&apos;s missing.&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
