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
  },
  {
    id: 'nlq-select',
    label: 'NLQ_DATA_SELECT',
    title: 'Ask a Question',
    image: '/images/case-study/iq-plugin/IQ - Ask a Question _ Empty State 1.png',
    description: 'Dataset selection with progressive disclosure',
  },
  {
    id: 'predict-empty',
    label: 'PREDICT_EMPTY',
    title: 'Predict Data',
    image: '/images/case-study/iq-plugin/IQ - Predict Data - Train Models - landing page - model tile view.png',
    description: 'Model tile view with clear entry points',
  },
]

export default function IQEmptyStateShowcase({ isLightBackground = false }: IQEmptyStateShowcaseProps) {
  const { openLightbox } = useLightbox()

  const allImages = emptyStates.map(state => ({
    src: state.image,
    alt: state.title,
  }))

  return (
    <div className={`w-full py-10 md:py-12 ${isLightBackground ? 'bg-white' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <ComponentHeading
            variant="block"
            align="center"
            tag="// UX_DECISION: EMPTY_STATES"
            title="Intuitive Empty States for Guidance"
            description="Every empty state teaches. Clear visual cues guide users to their first action—reducing friction, increasing adoption."
            color="teal"
          />
        </div>

        {/* Empty States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emptyStates.map((state, index) => (
            <motion.div
              key={state.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => openLightbox(allImages, index)}
            >
              {/* Header */}
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-2">
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
                  {'// '}{state.label}
                </span>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={state.image}
                  alt={state.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Footer */}
              <div className="p-4">
                <h4 className="font-serif text-lg text-slate-900 mb-1">{state.title}</h4>
                <p className="text-sm text-slate-500">{state.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insight Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-slate-900 p-6 text-center"
        >
          <span className="font-mono text-xs text-emerald-400 mb-2 block">
            {`>`} DESIGN_PRINCIPLE:
          </span>
          <p className="font-mono text-sm text-slate-300 max-w-2xl mx-auto">
            &quot;The best onboarding happens in context. Every empty state is a teaching moment—
            show users what&apos;s possible, not just what&apos;s missing.&quot;
          </p>
        </motion.div>
      </div>
    </div>
  )
}

