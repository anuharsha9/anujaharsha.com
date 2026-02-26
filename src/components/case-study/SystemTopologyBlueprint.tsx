'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLightbox } from '@/contexts/LightboxContext'
import ComponentHeading from '@/components/ui/ComponentHeading'
import TerminalInsight from '@/components/case-study/TerminalInsight'

interface SystemTopologyBlueprintProps {
  isLightBackground?: boolean
}

export default function SystemTopologyBlueprint({ isLightBackground = true }: SystemTopologyBlueprintProps) {
  const { openLightbox } = useLightbox()

  const blueprints = {
    // wireframes removed - moved to ProcessArtifactViewer
    master: {
      src: '/images/case-study/ml-functions/1. ML UI Structure.png',
      alt: 'ML UI Structure - How the redesign fits into WebFOCUS shell',
      caption: '// FIG_01: UI_STRUCTURE',
      note: 'How the ML workflow redesign would be structured within the existing WebFOCUS shell and navigation system.',
    },
    flowchart1: {
      src: '/images/case-study/ml-functions/Overview of ML workflow based on user.png',
      alt: 'ML workflow based on user type',
      caption: '// FIG_02: USER_WORKFLOW_MAP',
      note: 'ML workflow by user type — how Train Model and Run Model connect and flow into each other.',
    },
    flowchart2: {
      src: '/images/case-study/ml-functions/ML functions inital workflow.png',
      alt: 'ML workflow in IQ Plugin',
      caption: '// FIG_03: IQ_PLUGIN_FLOW',
      note: 'The ML workflow as it exists within the IQ Plugin — entry points, data selection, and training steps.',
    },
    systemMap: {
      src: '/images/case-study/ml-functions/all model types architecture map.png',
      alt: 'All model types architecture map',
      caption: '// FIG_04: MODEL_TAXONOMY',
      note: 'Complete system architecture for all ML model types supported.',
    },
  }

  const allImages = [
    // blueprints.wireframes,
    blueprints.master,
    blueprints.flowchart1,
    blueprints.flowchart2,
    blueprints.systemMap,
  ]

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
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Section Header - Centered */}
      <motion.div variants={itemVariants}>
        <ComponentHeading
          variant="block"
          align="center"
          tag="ARCHITECTURE MAPS"
          title="System Topology & Logic"
          description="Before designing pixels, I mapped the physical constraints of the WebFOCUS platform. These blueprints defined how the new ML wizard would inherit responsive behaviors from the existing 3rd-level navigation system."
          color="blue"
          className="mb-8"
        />
      </motion.div>

      {/* Blueprint Grid - Technical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column - Master Spec (spans 2 columns on large screens) */}
        <motion.div
          className="lg:col-span-2"
          variants={itemVariants}
        >
          <div className="bg-white/[0.03] border border-white/[0.06] overflow-hidden h-full rounded-2xl">
            {/* Blueprint Image */}
            <div
              className="relative aspect-video cursor-zoom-in group"
              onClick={() => openLightbox(blueprints.master, allImages, 1)}
            >
              <Image
                src={blueprints.master.src}
                alt={blueprints.master.alt}
                fill
                className="object-contain p-4 group-hover:scale-[1.02] transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.10] transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 backdrop-blur-sm px-3 py-1.5 font-mono text-xs text-white/80 shadow-sm">
                  Click to inspect
                </span>
              </div>
            </div>
            {/* Caption */}
            <div className="bg-white/[0.02] border-t border-white/[0.06] p-4">
              <span className="font-mono text-xs text-[var(--text-muted)] block mb-1">
                {blueprints.master.caption}
              </span>
              <p className="text-[var(--text-body)] text-sm leading-relaxed">
                {blueprints.master.note}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Logic Stack */}
        <div className="flex flex-col gap-6">
          {/* Card 1 - Information Architecture */}
          <motion.div
            variants={itemVariants}
            className="bg-white/[0.03] border border-white/[0.06] overflow-hidden flex-1 rounded-xl"
          >
            <div
              className="relative aspect-[4/3] cursor-zoom-in group"
              onClick={() => openLightbox(blueprints.flowchart1, allImages, 2)}
            >
              <Image
                src={blueprints.flowchart1.src}
                alt={blueprints.flowchart1.alt}
                fill
                className="object-contain p-3 group-hover:scale-[1.02] transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.10] transition-colors duration-300" />
            </div>
            <div className="bg-white/[0.02] border-t border-white/[0.06] p-3">
              <span className="font-mono text-[10px] text-[var(--text-muted)] block">
                {blueprints.flowchart1.caption}
              </span>
            </div>
          </motion.div>

          {/* Card 2 - Logic Branching */}
          <motion.div
            variants={itemVariants}
            className="bg-white/[0.03] border border-white/[0.06] overflow-hidden flex-1 rounded-xl"
          >
            <div
              className="relative aspect-[4/3] cursor-zoom-in group"
              onClick={() => openLightbox(blueprints.flowchart2, allImages, 3)}
            >
              <Image
                src={blueprints.flowchart2.src}
                alt={blueprints.flowchart2.alt}
                fill
                className="object-contain p-3 group-hover:scale-[1.02] transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.10] transition-colors duration-300" />
            </div>
            <div className="bg-white/[0.02] border-t border-white/[0.06] p-3">
              <span className="font-mono text-[10px] text-[var(--text-muted)] block">
                {blueprints.flowchart2.caption}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-Width System Map */}
      <motion.div
        variants={itemVariants}
        className="bg-white/[0.03] border border-white/[0.06] overflow-hidden rounded-2xl"
      >
        <div
          className="relative w-full cursor-zoom-in group"
          style={{ aspectRatio: '21/9' }}
          onClick={() => openLightbox(blueprints.systemMap, allImages, 4)}
        >
          <Image
            src={blueprints.systemMap.src}
            alt={blueprints.systemMap.alt}
            fill
            className="object-contain p-4 group-hover:scale-[1.01] transition-transform duration-300"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.10] transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 backdrop-blur-sm px-3 py-1.5 font-mono text-xs text-white/80 shadow-sm">
              Click to inspect full taxonomy
            </span>
          </div>
        </div>
        <div className="bg-white/[0.02] border-t border-white/[0.06] p-4 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs text-[var(--text-muted)] block mb-1">
              {blueprints.systemMap.caption}
            </span>
            <p className="text-[var(--text-body)] text-sm">
              {blueprints.systemMap.note}
            </p>
          </div>
          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest hidden md:block">
            {'// FULL_WIDTH_SPEC'}
          </span>
        </div>
      </motion.div>

      {/* Technical Note Footer */}
      <motion.div variants={itemVariants} className="w-full">
        <TerminalInsight
          title="architecture_summary.log"
          insightLabel="INSIGHT:"
        >
          <div className="flex items-start gap-3">
            <span className="font-mono text-emerald-400 flex-shrink-0 mt-0.5">&gt;</span>
            <p>
              We didn&apos;t just redesign screens; we re-architected the <span className="text-white font-medium">user&apos;s mental model</span>. From scattershot tasks to a linear, coherent journey.
            </p>
          </div>
        </TerminalInsight>
      </motion.div>
    </motion.div>
  )
}

