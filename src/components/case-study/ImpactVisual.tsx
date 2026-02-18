'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'
import { CalendarPlus, FolderSearch, FileText, Settings, Check, Users, MessageSquare, Target } from 'lucide-react'

interface ImpactVisualProps {
  isLightBackground?: boolean
}

export default function ImpactVisual({ isLightBackground = true }: ImpactVisualProps) {
  // Entry points data - Old scattered vs New unified
  const entryPoints = {
    old: [
      { feature: 'Create Schedule', location: 'Buried 4 clicks deep' },
      { feature: 'Distribution List', location: 'Separate menu path' },
      { feature: 'Access List', location: 'Another separate path' },
      { feature: 'RC Explorer', location: 'Hamburger menu → hidden' },
      { feature: 'RC Admin', location: 'Management Center → Admin' },
    ],
    new: [
      { feature: 'Create Schedule', location: '+ menu → Create Schedule' },
      { feature: 'Distribution List', location: '+ menu → Distribution List' },
      { feature: 'Access List', location: '+ menu → Access List' },
      { feature: 'RC Explorer', location: 'Home → RC assets filter' },
      { feature: 'RC Admin', location: 'Management Center → RC Admin' },
    ],
  }

  // Click reduction metrics as hero numbers
  const clickMetrics = [
    {
      task: 'Create Schedule',
      icon: <CalendarPlus className="w-8 h-8" strokeWidth={1.5} />,
      reduction: '5→2',
      oldClicks: '5+',
      newClicks: '2'
    },
    {
      task: 'Access Explorer',
      icon: <FolderSearch className="w-8 h-8" strokeWidth={1.5} />,
      reduction: '3→1',
      oldClicks: '3',
      newClicks: '1'
    },
    {
      task: 'View Job Log',
      icon: <FileText className="w-8 h-8" strokeWidth={1.5} />,
      reduction: 'In-context',
      oldClicks: 'New tab',
      newClicks: 'Modal'
    },
    {
      task: 'Access Admin',
      icon: <Settings className="w-8 h-8" strokeWidth={1.5} />,
      reduction: '3→2',
      oldClicks: '3',
      newClicks: '2'
    },
  ]

  // Validation sources
  const validations = [
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Internal Feedback',
      quote: 'Engineers and PMs who had never understood RC could now explain it to others.',
      source: 'Engineering Team'
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: 'Customer Feedback',
      quote: 'Long-time enterprise customer praised the redesign and said he was excited for what was coming next.',
      source: 'Enterprise Customer'
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: 'Support Team',
      quote: 'Fewer "how do I..." questions and more "can I do..." questions — a shift from confusion to capability.',
      source: 'Support Analytics'
    },
  ]

  // Scattered card positions for "before" state
  const scatteredPositions = [
    { rotate: -4, translateY: 0 },
    { rotate: 3, translateY: 8 },
    { rotate: -2, translateY: -4 },
    { rotate: 5, translateY: 12 },
    { rotate: -3, translateY: 4 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const leftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const rightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <div className="space-y-12 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-12"
      >

        {/* Header */}
        <motion.div variants={itemVariants}>
          <ComponentHeading
            variant="block"
            align="center"
            tag="// VISUAL_EVIDENCE"
            title="Visible Impact"
            description="We didn't just clean up the UI; we fundamentally restructured the information hierarchy to prioritize clarity and task completion."
            color="teal"
            className="mb-12"
          />
        </motion.div>

        {/* Click Reduction Data Strip */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {clickMetrics.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white border border-slate-100 p-4 md:p-6 text-center hover:shadow-lg hover:border-teal-100 transition-all duration-300 rounded-2xl group"
            >
              {/* Icon */}
              <div className="text-slate-300 mb-4 flex justify-center group-hover:text-teal-500 transition-colors">
                {item.icon}
              </div>

              {/* Hero Reduction */}
              <div className="font-mono font-bold text-3xl md:text-4xl text-teal-600 leading-none mb-3">
                {item.reduction}
              </div>

              {/* Task */}
              <p className="text-slate-900 text-sm font-medium">
                {item.task}
              </p>

              {/* Before/After */}
              <div className="flex items-center justify-center gap-2 mt-3 text-xs opacity-60">
                <span className="text-slate-500 line-through">{item.oldClicks}</span>
                <span className="text-slate-400">→</span>
                <span className="text-teal-600 font-semibold">{item.newClicks}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Entry Points: Before/After */}
        <div className="space-y-8 pt-8">
          <div className="flex items-center gap-4 justify-center opacity-40">
            <div className="h-px w-24 bg-slate-200"></div>
            <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
              Entry Point Consolidation
            </span>
            <div className="h-px w-24 bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

            {/* BEFORE: Scattered */}
            <motion.div
              variants={leftVariants}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-error)] bg-red-50 px-2 py-1 rounded">
                  ⚠ SCATTERED
                </span>
              </div>

              <div className="relative space-y-2 py-4">
                {entryPoints.old.map((p, i) => {
                  const scatteredVariant = {
                    hidden: { opacity: 0, rotate: scatteredPositions[i].rotate },
                    visible: {
                      opacity: 1,
                      rotate: scatteredPositions[i].rotate,
                      transition: { duration: 0.4, delay: i * 0.05 }
                    }
                  }
                  return (
                    <motion.div
                      key={i}
                      variants={scatteredVariant}
                      whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
                      style={{ transform: `translateY(${scatteredPositions[i].translateY}px)` }}
                      className="bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 rounded-lg relative"
                    >
                      <p className="text-slate-700 text-sm font-medium">{p.feature}</p>
                      <p className="text-slate-400 text-xs mt-0.5 italic">{p.location}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* AFTER: Unified */}
            <motion.div
              variants={rightVariants}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-teal-600 bg-teal-50 px-2 py-1 rounded flex items-center gap-2">
                  <Check className="w-3 h-3" />
                  UNIFIED
                </span>
              </div>

              <div className="bg-teal-50/50 p-6 rounded-2xl border border-teal-100/50 space-y-3">
                {entryPoints.new.map((p, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="bg-white border border-teal-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex justify-between items-center group"
                  >
                    <p className="text-slate-800 text-sm font-medium">{p.feature}</p>
                    <span className="text-teal-600 text-xs bg-teal-50 px-2 py-0.5 rounded-full group-hover:bg-teal-100 transition-colors">
                      {p.location}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Validation Sources */}
        <div className="space-y-8 pt-12 border-t border-slate-100">
          <motion.div
            variants={itemVariants}
            className="text-center space-y-2"
          >
            <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
              {'// VALIDATION_SOURCES'}
            </span>
            <h4 className="text-slate-900 text-xl font-sans">
              Feedback Confirms Impact
            </h4>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {validations.map((v, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-100 p-6 hover:shadow-lg hover:border-teal-200 transition-all duration-300 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-xl shadow-sm">
                    {v.icon}
                  </div>
                  <div>
                    <h5 className="text-slate-900 text-sm font-bold">{v.title}</h5>
                    <p className="text-slate-500 text-xs">{v.source}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic border-l-2 border-teal-100 pl-4">
                  &ldquo;{v.quote}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
