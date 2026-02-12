'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { useLightbox } from '@/contexts/LightboxContext'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface IQWorkflowsBuiltProps {
  isLightBackground?: boolean
}

const workflowsBuilt = [
  {
    id: 'nlq',
    label: 'WORKFLOW_01',
    title: 'Natural Language Query',
    subtitle: 'Ask questions in plain English',
    status: 'SHIPPING_NOW',
    statusColor: 'text-emerald-600',
    description: 'Built the complete NLQ workflow — from empty state to results visualization. Users ask questions in natural language, get instant chart responses.',
    image: '/images/case-study/iq-plugin/Explore Data _ NLQ _ Empty State Illustration 1.png',
    publicDemo: 'https://www.youtube.com/watch?v=LDaGvuS4K5Y',
    publicDemoLabel: 'Watch Public Demo',
    caseStudyLink: null,
  },
  {
    id: 'insights',
    label: 'WORKFLOW_02',
    title: 'Automated Insights',
    subtitle: 'AI-generated data patterns',
    status: 'SHIPPING_NOW',
    statusColor: 'text-emerald-600',
    description: 'Built the complete Insights workflow — automatic pattern detection, anomaly identification, and narrative generation from any dataset.',
    image: '/images/case-study/iq-plugin/Insights - Results - Tile View 1.png',
    publicDemo: 'https://www.youtube.com/watch?v=ggcv8b7EKXo',
    publicDemoLabel: 'Watch Public Demo',
    caseStudyLink: null,
  },
  {
    id: 'ml',
    label: 'WORKFLOW_03',
    title: 'Machine Learning (Predict Data)',
    subtitle: 'Train & run ML models',
    status: 'SHIPPING_2026',
    statusColor: 'text-blue-600',
    description: 'Complete ML workflow redesign — model training, comparison, explainability. Full case study available.',
    image: '/images/case-study/ml-functions/1. Predict Data - Train Models - Empty State.png',
    publicDemo: null,
    publicDemoLabel: null,
    caseStudyLink: '/work/ml-functions',
    caseStudyLabel: 'View ML Case Study',
  },
]

export default function IQWorkflowsBuilt({ isLightBackground = false }: IQWorkflowsBuiltProps) {
  const { openLightbox } = useLightbox()

  const allImages = workflowsBuilt.map(w => ({
    src: w.image,
    alt: w.title,
  }))

  return (
    <div className={`w-full py-10 md:py-12 ${isLightBackground ? 'bg-white' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ComponentHeading
          variant="block"
          tag="// FOUNDATION: WHAT_I_BUILT"
          title="Three Workflows. Three Entry Points."
          description="Before IQ Plugin unified them, I designed each of these workflows independently. NLQ and Insights are shipping now. ML launches 2026."
          color="teal"
          align="center"
          className="mb-12"
        />

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workflowsBuilt.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group"
            >
              {/* Header */}
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 bg-red-500/80" />
                    <div className="w-2.5 h-2.5 bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 bg-green-500/80" />
                  </div>
                  <span className="font-mono text-[9px] text-white/70 uppercase tracking-wider">
                    {workflow.label}
                  </span>
                </div>
                <span className={`font-mono text-[9px] uppercase tracking-wider ${workflow.statusColor}`}>
                  {workflow.status.replace('_', ' ')}
                </span>
              </div>

              {/* Image */}
              <div
                className="relative aspect-[4/3] bg-slate-100 cursor-pointer overflow-hidden"
                onClick={() => openLightbox(allImages, index)}
              >
                <Image
                  src={workflow.image}
                  alt={workflow.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="font-serif text-lg text-slate-900 mb-1">{workflow.title}</h4>
                <p className="text-xs text-slate-500 mb-3">{workflow.subtitle}</p>
                <p className="text-sm text-slate-600 mb-4">{workflow.description}</p>

                {/* Links */}
                <div className="flex flex-wrap gap-2">
                  {workflow.publicDemo && (
                    <a
                      href={workflow.publicDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent-teal)] hover:text-[var(--accent-teal-700)] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {workflow.publicDemoLabel}
                    </a>
                  )}
                  {workflow.caseStudyLink && (
                    <Link
                      href={workflow.caseStudyLink}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent-teal)] hover:text-[var(--accent-teal-700)] transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      {workflow.caseStudyLabel}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unification Statement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-slate-900 px-6 py-3">
            <span className="font-mono text-xs text-emerald-400">
              {`>`} THEN_I_UNIFIED_THEM:
            </span>
            <span className="font-serif text-white">
              IQ Plugin brings all 3 home.
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
