'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Workflow, Cpu, ShieldAlert, Search, Maximize2 } from 'lucide-react'
import ImageLightbox from './ImageLightbox'
import ComponentHeading from '@/components/ui/ComponentHeading'


interface SystemMappingBreakdownProps {
  isLightBackground?: boolean
}

export default function SystemMappingBreakdown({ isLightBackground = true }: SystemMappingBreakdownProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const categories = [
    {
      category: 'Workflows & Navigation',
      icon: Workflow,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      items: [
        { label: 'Every scheduling workflow', detail: 'From schedule creation to distribution to monitoring' },
        { label: 'Every entry point', detail: 'Where users could access RC features (inconsistent across product)' },
        { label: 'Every dialog and branching path', detail: 'Understanding when users saw what, and why' },
      ],
    },
    {
      category: 'System Capabilities',
      icon: Cpu,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
      items: [
        { label: 'Every admin capability', detail: 'System configuration, permissions, settings' },
        { label: 'Every explorer interaction', detail: 'How users viewed and filtered existing schedules' },
        { label: 'Every job-health pattern', detail: 'How users monitored scheduled jobs, failure states' },
      ],
    },
    {
      category: 'Reliability & Logic',
      icon: ShieldAlert,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      items: [
        { label: 'Every failure & recovery rule', detail: 'Critical for enterprise reliability' },
        { label: 'Burst, retention, blackout logic', detail: 'Undocumented rules users relied on' },
        { label: 'Invisible UI behaviors', detail: 'Rules in code that were never surfaced' },
      ],
    },
  ]

  // ... existing code ...
  return (
    <div className="space-y-12 py-8">

      {/* Header Section */}
      {/* Header Section */}
      <div>
        <ComponentHeading
          variant="block"
          tag="// SYSTEM_ARCHITECTURE"
          title="The Complete Map"
          description="The categories below show the scope of mapping required to understand the complete 50-year-old system."
          align="center"
          color="slate"
        />
      </div>

      {/* Hero Image - Emphasized */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative w-full h-[500px] md:h-[600px] bg-slate-50 rounded-2xl border border-slate-100 shadow-xl overflow-hidden group cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 shadow-sm flex items-center gap-2 border border-slate-200">
            <Maximize2 className="w-3 h-3" /> Expand Map
          </span>
        </div>

        <Image
          src="/images/case-study/ReportCaster/ReportCaster Basic Map Workflow.png"
          alt="RC mental-model map: Complete system diagram"
          fill
          className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
          priority
        />

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none" />
      </motion.div>


      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-full ${cat.bg} flex items-center justify-center`}>
                <cat.icon className={`w-5 h-5 ${cat.color}`} strokeWidth={1.5} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 group-hover:text-[var(--accent-teal)] transition-colors">
                {cat.category}
              </h4>
            </div>

            <ul className="space-y-4">
              {cat.items.map((item, j) => (
                <li key={j} className="group/item">
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2 shrink-0 group-hover/item:bg-[var(--accent-teal)] transition-colors" />
                    <div>
                      <p className="text-slate-900 text-sm font-medium leading-snug">
                        {item.label}
                      </p>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed font-light">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Terminal Output - Sleek & Modern */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-xl overflow-hidden bg-[#1D1D20] shadow-2xl ring-1 ring-white/10"
      >
        {/* Header */}
        <div className="h-9 bg-[#2A2A2D] flex items-center px-4 gap-2 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] opacity-80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] opacity-80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] opacity-80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[10px] font-mono text-slate-500 opacity-60">system_status.log</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
          <div className="flex gap-3 text-emerald-400/90 mb-2">
            <span className="opacity-50 select-none">➜</span>
            <span>SYSTEM_STATUS: Analysis Complete</span>
          </div>
          <p className="text-slate-300 pl-6 mb-4 font-light">
            This mapping produced the first complete mental model in RC&apos;s 50-year history — a foundation that enabled the unified architecture.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6 border-t border-white/5 pt-4">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase tracking-wider mb-1">Subsystems Mapped</span>
              <span className="text-emerald-400 font-bold">5 Complete</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase tracking-wider mb-1">Undocumented Rules</span>
              <span className="text-emerald-400 font-bold">12+ Identified</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase tracking-wider mb-1">Transfer Status</span>
              <span className="text-emerald-400 font-bold">100% SUCCESS</span>
            </div>
          </div>
        </div>
      </motion.div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc="/images/case-study/ReportCaster/ReportCaster Basic Map Workflow.png"
        imageAlt="RC mental-model map: Complete system diagram"
        imageCaption="The complete system diagram showing the unified workflow that replaced five independent subsystems with one coherent mental model."
      />
    </div>
  )
}
