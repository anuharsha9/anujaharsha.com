'use client'

import { motion } from 'framer-motion'
import { Ban, Users } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import TerminalInsight from './TerminalInsight'

interface MLUserAccessStrategyProps {
  isLightBackground?: boolean
}

export default function MLUserAccessStrategy({ isLightBackground = true }: MLUserAccessStrategyProps) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <ComponentHeading
          variant="block"
          align="center"
          tag="RESEARCH METHODOLOGY"
          title="Gathering Insights Without Direct Access"
          description="How I built user empathy through proxy networks when direct research wasn't possible."
          color="teal"
          className="mb-8"
        />
      </motion.div>

      {/* 2-Column Constraint vs Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: The Constraint (The Wall) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-amber-50 border-l-4 border-amber-400 p-8 rounded-xl"
        >
          <div className="space-y-4">
            {/* Icon */}
            <div className="w-12 h-12 bg-amber-100 flex items-center justify-center rounded-lg">
              <Ban className="w-6 h-6 text-amber-600" />
            </div>

            {/* Headline */}
            <h4 className="font-mono text-sm text-amber-700 uppercase tracking-wider">
              {'// CONSTRAINT: NO_DIRECT_ACCESS'}
            </h4>

            {/* Body */}
            <p className="text-[var(--text-body)] text-base leading-relaxed">
              Enterprise security policy blocked direct access to end users. I could not interview the actual people using the tool.
            </p>

            {/* Impact List */}
            <div className="pt-4 border-t border-amber-200 space-y-2">
              <span className="font-mono text-[10px] text-amber-600 uppercase tracking-widest">
                {'// BLOCKED_METHODS'}
              </span>
              <ul className="space-y-1.5">
                <li className="font-mono text-xs text-[var(--text-body)] flex items-start gap-2">
                  <span className="text-amber-500 mt-px">×</span>
                  <span>Direct user interviews</span>
                </li>
                <li className="font-mono text-xs text-[var(--text-body)] flex items-start gap-2">
                  <span className="text-amber-500 mt-px">×</span>
                  <span>On-site observation sessions</span>
                </li>
                <li className="font-mono text-xs text-[var(--text-body)] flex items-start gap-2">
                  <span className="text-amber-500 mt-px">×</span>
                  <span>Usage analytics access</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Card 2: The Strategy (The Bridge) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[var(--accent-teal-50)] border-l-4 border-[var(--accent-teal)] p-8 rounded-xl"
        >
          <div className="space-y-4">
            {/* Icon */}
            <div className="w-12 h-12 bg-[var(--accent-teal-100)] flex items-center justify-center rounded-lg">
              <Users className="w-6 h-6 text-[var(--accent-teal)]" />
            </div>

            {/* Headline */}
            <h4 className="font-mono text-sm text-[var(--accent-teal-700)] uppercase tracking-wider">
              {'// STRATEGY: THE_PROXY_NETWORK'}
            </h4>

            {/* Body */}
            <p className="text-[var(--text-body)] text-base leading-relaxed">
              Talked to everyone I could — support reps, technical staff, and data scientist friends outside work. If they touched ML, I picked their brain.
            </p>

            {/* Strategy List */}
            <div className="pt-4 border-t border-[var(--accent-teal-200)] space-y-2">
              <span className="font-mono text-[10px] text-[var(--accent-teal)] uppercase tracking-widest">
                {'// PROXY_SOURCES'}
              </span>
              <ul className="space-y-1.5">
                <li className="font-mono text-xs text-[var(--text-body)] flex items-start gap-2">
                  <span className="text-[var(--accent-teal)] mt-px">+</span>
                  <span>Support ticket pattern analysis</span>
                </li>
                <li className="font-mono text-xs text-[var(--text-body)] flex items-start gap-2">
                  <span className="text-[var(--accent-teal)] mt-px">+</span>
                  <span>DS friends outside work</span>
                </li>
                <li className="font-mono text-xs text-[var(--text-body)] flex items-start gap-2">
                  <span className="text-[var(--accent-teal)] mt-px">+</span>
                  <span>SME usability sessions</span>
                </li>
                <li className="font-mono text-xs text-[var(--text-body)] flex items-start gap-2">
                  <span className="text-[var(--accent-teal)] mt-px">+</span>
                  <span>Internal domain experts</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Outcome Note */}
      <div className="w-full">
        <TerminalInsight
          title="research_insight.log"
        >
          <span className="text-emerald-400 font-bold mr-2">&gt;</span>
          The proxy network revealed friction points that direct interviews might have missed. <span className="text-emerald-400">Support tickets</span> exposed where users *actually* got stuck, not just where they *said* they did.
        </TerminalInsight>
      </div>
    </div>
  )
}


