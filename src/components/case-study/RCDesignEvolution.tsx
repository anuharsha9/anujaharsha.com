'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Mail, Users, FolderTree, Settings } from 'lucide-react'
import AutoSequenceDataViewer from './AutoSequenceDataViewer'

interface RCDesignEvolutionProps {
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
  highlight?: {
    label: string
    text: string
  }
  images: TabImage[]
}

export default function RCDesignEvolution({ isLightBackground = false }: RCDesignEvolutionProps) {
  const [activeTab, setActiveTab] = useState('01_SCHEDULE_DIALOG')

  const tabs: Tab[] = [
    {
      id: '01_SCHEDULE_DIALOG',
      index: '01',
      label: 'Schedule Dialog',
      icon: <Calendar className="w-4 h-4" />,
      title: 'The Unified Schedule Dialog',
      description: 'The heart of ReportCaster modernization. All scheduling functionality consolidated into a single, modal-based workflow accessible via + menu. From 9 clicks across 5 interfaces to 4 clicks in one unified experience.',
      images: [
        {
          src: '/images/case-study/ReportCaster/Schedule Dialog - Properties.png',
          alt: 'Schedule Dialog - Properties',
          caption: 'Schedule Properties: Core scheduling configuration',
          figNumber: 'FIG_01',
        },
        {
          src: '/images/case-study/ReportCaster/Schedule dialog - tasks.png',
          alt: 'Schedule Dialog - Tasks',
          caption: 'Tasks Panel: What gets scheduled',
          figNumber: 'FIG_02',
        },
        {
          src: '/images/case-study/ReportCaster/Task Dialog.png',
          alt: 'Task Dialog',
          caption: 'Task Configuration: Individual task settings',
          figNumber: 'FIG_03',
        },
        {
          src: '/images/case-study/ReportCaster/Schedule Dialog - Job Log.png',
          alt: 'Schedule Dialog - Job Log',
          caption: 'Job Log: Execution history and status',
          figNumber: 'FIG_04',
        },
        {
          src: '/images/case-study/ReportCaster/Job log dialog.png',
          alt: 'Job Log Dialog',
          caption: 'Job Log Detail: Detailed execution history',
          figNumber: 'FIG_05',
        },
      ],
    },
    {
      id: '02_RECURRENCE',
      index: '02',
      label: 'Recurrence Redesign',
      icon: <Clock className="w-4 h-4" />,
      title: 'From Cryptic Settings to Natural Language',
      description: 'The legacy recurrence UI was a 30-year-old relic — confusing checkbox mazes and obscure terminology. I redesigned it with a natural language summary that tells users exactly what they\'ve scheduled in plain English.',
      highlight: {
        label: '// DESIGN_DECISION: NATURAL_LANGUAGE',
        text: 'Every recurrence configuration now generates a human-readable sentence: "Runs Monday to Friday at 6:00 PM, recurring every week." With complex scheduling, users need confirmation of what they\'ve actually set.',
      },
      images: [
        {
          src: '/images/case-study/ReportCaster/Schedule Dialog - Recurrences.png',
          alt: 'Schedule Dialog - Recurrences',
          caption: 'Modern Recurrence: Natural language summary at the top',
          figNumber: 'FIG_05',
        },
        {
          src: '/images/case-study/ReportCaster/New SD - Recurrence - Weekly.png',
          alt: 'Recurrence - Weekly',
          caption: 'Weekly Pattern: Clear day selection with summary',
          figNumber: 'FIG_06',
        },
        {
          src: '/images/case-study/ReportCaster/New SD - Recurrence - Monthly - Days of the week.png',
          alt: 'Recurrence - Monthly Days of Week',
          caption: 'Monthly by Day: "Every second Monday of the month"',
          figNumber: 'FIG_07',
        },
        {
          src: '/images/case-study/ReportCaster/New SD - Recurrence - Monthly - Dates.png',
          alt: 'Recurrence - Monthly Dates',
          caption: 'Monthly by Date: Specific day selection',
          figNumber: 'FIG_08',
        },
        {
          src: '/images/case-study/ReportCaster/New SD - Recurrence - Yearly.png',
          alt: 'Recurrence - Yearly',
          caption: 'Yearly Pattern: Annual scheduling made clear',
          figNumber: 'FIG_09',
        },
        {
          src: '/images/case-study/ReportCaster/New SD - Recurrence - Days.png',
          alt: 'Recurrence - Days',
          caption: 'Days Pattern: Every N days',
          figNumber: 'FIG_10',
        },
        {
          src: '/images/case-study/ReportCaster/New SD - Recurrence - Hours.png',
          alt: 'Recurrence - Hours',
          caption: 'Hours Pattern: Intraday scheduling',
          figNumber: 'FIG_11',
        },
        {
          src: '/images/case-study/ReportCaster/New SD - Recurrence - Validation Error.png',
          alt: 'Recurrence - Validation Error',
          caption: 'Validation: Clear error states prevent mistakes',
          figNumber: 'FIG_12',
        },
      ],
    },
    {
      id: '03_DISTRIBUTION',
      index: '03',
      label: 'Distribution List',
      icon: <Mail className="w-4 h-4" />,
      title: 'Streamlined Report Distribution',
      description: 'Distribution lists define who receives scheduled reports. Modernized from a separate standalone tool to an integrated panel within the schedule workflow — with inline search, member management, and clear status indicators.',
      images: [
        {
          src: '/images/case-study/ReportCaster/Distribution List starting point.png',
          alt: 'Distribution List - Starting Point',
          caption: 'Starting Point: Empty distribution panel',
          figNumber: 'FIG_13',
        },
        {
          src: '/images/case-study/ReportCaster/Distribution List - Populated List view.png',
          alt: 'Distribution List - Populated',
          caption: 'Populated List: Active recipients with status',
          figNumber: 'FIG_14',
        },
        {
          src: '/images/case-study/ReportCaster/Distribution List - Add existing members.png',
          alt: 'Distribution List - Add Members',
          caption: 'Add Members: Search and select from directory',
          figNumber: 'FIG_15',
        },
        {
          src: '/images/case-study/ReportCaster/Distribution List - Add new members.png',
          alt: 'Distribution List - New Member',
          caption: 'New Member: Create recipient inline',
          figNumber: 'FIG_16',
        },
        {
          src: '/images/case-study/ReportCaster/Distribution List - Edit Current List+Search built in.png',
          alt: 'Distribution List - Edit with Search',
          caption: 'Edit Mode: Built-in search for large lists',
          figNumber: 'FIG_17',
        },
      ],
    },
    {
      id: '04_ACCESS_LIST',
      index: '04',
      label: 'Access List',
      icon: <Users className="w-4 h-4" />,
      title: 'Permission Management Made Clear',
      description: 'Access lists control who can view and manage schedules. Previously buried in a separate application, now integrated into the workflow with clear permission indicators and streamlined member management.',
      images: [
        {
          src: '/images/case-study/ReportCaster/Access List starting point.png',
          alt: 'Access List - Starting Point',
          caption: 'Starting Point: Empty access panel',
          figNumber: 'FIG_18',
        },
        {
          src: '/images/case-study/ReportCaster/Access List - Current List+context menu options.png',
          alt: 'Access List - Current List',
          caption: 'Current List: Members with context actions',
          figNumber: 'FIG_19',
        },
        {
          src: '/images/case-study/ReportCaster/Access List - Add existing members - empty state.png',
          alt: 'Access List - Add Members Empty',
          caption: 'Add Members: Empty state with search',
          figNumber: 'FIG_20',
        },
        {
          src: '/images/case-study/ReportCaster/Access List - Add existing members - populated.png',
          alt: 'Access List - Add Members Populated',
          caption: 'Search Results: Available members to add',
          figNumber: 'FIG_21',
        },
        {
          src: '/images/case-study/ReportCaster/Access List - Add existing members - selected members.png',
          alt: 'Access List - Selected Members',
          caption: 'Selection: Members ready to add',
          figNumber: 'FIG_22',
        },
        {
          src: '/images/case-study/ReportCaster/Access List - Add new members.png',
          alt: 'Access List - New Member',
          caption: 'New Member: Create user inline',
          figNumber: 'FIG_23',
        },
      ],
    },
    {
      id: '05_RC_EXPLORER',
      index: '05',
      label: 'RC Explorer',
      icon: <FolderTree className="w-4 h-4" />,
      title: 'Schedule Asset Management',
      description: 'The explorer view for browsing, filtering, and managing all ReportCaster assets (schedules, distribution lists, access lists). Integrated into the platform hub with consistent filtering patterns.',
      images: [
        {
          src: '/images/case-study/ReportCaster/ReportCaster Explorer.png',
          alt: 'ReportCaster Explorer',
          caption: 'RC Explorer: Unified asset browser',
          figNumber: 'FIG_24',
        },
        {
          src: '/images/case-study/ReportCaster/RC Explorer - filter view for different types of RC assets.png',
          alt: 'RC Explorer - Filter View',
          caption: 'Filter View: Asset type filtering',
          figNumber: 'FIG_25',
        },
        {
          src: '/images/case-study/ReportCaster/RC Explorer__Grid View_Flat View 1.png',
          alt: 'RC Explorer - Grid View',
          caption: 'Grid View: Visual asset browsing',
          figNumber: 'FIG_26',
        },
      ],
    },
    {
      id: '06_RC_ADMIN',
      index: '06',
      label: 'RC Admin',
      icon: <Settings className="w-4 h-4" />,
      title: 'Status & Administration',
      description: 'The admin view showing job status, execution history, and system health. Critical for IT admins managing 20M+ weekly schedules across enterprise deployments.',
      images: [
        {
          src: '/images/case-study/ReportCaster/ReportCaster Status (Admin).png',
          alt: 'ReportCaster Status Admin',
          caption: 'Status Dashboard: System health overview',
          figNumber: 'FIG_27',
        },
      ],
    },
  ]

  const activeTabData = tabs.find(t => t.id === activeTab)

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <span className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest">
          SHIPPED SYSTEM
        </span>
        <h3 className="font-sans text-[var(--text-heading)] text-3xl md:text-4xl lg:text-5xl">
          The Final System: Modal-Based Workflows
        </h3>
        <p className="text-[var(--text-muted)] text-lg max-w-3xl mx-auto leading-relaxed">
          400+ screens across six subsystems unified into platform-native modals. I designed 250+; onboarded 2 designers who completed 150+. Shipped in WebFOCUS 9.3.
        </p>
      </motion.div>

      {/* IDE Layout - Large Feature Display */}
      {/* Streaming Platform Layout - Modern Tabs + Full Screen Viewer */}
      <div className="space-y-8">
        {/* 1. Top Navigation Pills - Mobile Optimized */}
        <div className="relative group">
          {/* Fade gradients to indicate scrollability */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none md:hidden" />

          <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 scrollbar-hide px-4 -mx-4 md:mx-0 snap-x">
            <div className="flex gap-2 min-w-min">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 snap-center
                    ${activeTab === tab.id
                      ? 'bg-[var(--accent-teal)] text-white shadow-md transform scale-105'
                      : 'bg-white/[0.05] border border-white/[0.10] text-[var(--text-muted)] hover:bg-white/[0.08] hover:border-white/[0.15]'}
                  `}
                >
                  <span className={activeTab === tab.id ? 'text-white' : 'text-[var(--text-muted)]'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  {tab.id === '02_RECURRENCE' && activeTab !== tab.id && (
                    <span className="ml-1 flex-shrink-0 bg-amber-100 text-amber-700 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded">
                      Key
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Scroll Hint */}
          <div className="md:hidden flex justify-center mt-2 opacity-40 text-[10px] uppercase tracking-widest font-mono text-[var(--text-muted)]">
            &larr; Swipe to explore tabs &rarr;
          </div>
        </div>

        {/* 2. Content Stage */}
        <AnimatePresence mode="wait">
          {activeTabData && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Feature Title & Description (Centered) */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <h4 className="font-sans text-2xl md:text-3xl text-[var(--text-heading)]">
                  {activeTabData.title}
                </h4>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {activeTabData.description}
                </p>
                {/* Highlight Block (for Recurrence) */}
                {activeTabData.highlight && (
                  <div className="inline-block mt-2 bg-amber-500/[0.08] border border-amber-500/20 px-4 py-2 rounded-lg">
                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest mr-2">
                      {activeTabData.highlight.label}:
                    </span>
                    <span className="italic text-sm text-[var(--text-body)]">
                      {activeTabData.highlight.text}
                    </span>
                  </div>
                )}
              </div>

              {/* The Viewer */}
              <AutoSequenceDataViewer
                images={activeTabData.images.map(img => ({
                  src: img.src,
                  alt: img.alt,
                  caption: `// ${img.figNumber}: ${img.caption}`
                }))}
                title={activeTabData.title}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recurrence Highlight - Natural Language Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-amber-500/[0.06] border border-amber-500/20 rounded-2xl p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Left - The Problem */}
          <div className="flex-1 space-y-3">
            <span className="font-mono text-xs text-red-400 uppercase tracking-widest">
              LEGACY PAIN
            </span>
            <h4 className="font-sans text-xl text-[var(--text-heading)]">
              30 Years of Checkbox Chaos
            </h4>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              The original recurrence UI was a maze of checkboxes, dropdowns, and obscure terminology.
              Users couldn&apos;t verify what they&apos;d actually scheduled without running a test.
            </p>
          </div>

          {/* Center - Arrow */}
          <div className="flex items-center justify-center md:flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-white/[0.05] border border-amber-500/30 flex items-center justify-center">
              <svg aria-hidden="true" className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

          {/* Right - The Solution */}
          <div className="flex-1 space-y-3">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
              NATURAL LANGUAGE
            </span>
            <h4 className="font-sans text-xl text-[var(--text-heading)]">
              Human-Readable Summaries
            </h4>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Every configuration now generates a plain English summary: <strong className="text-[var(--text-heading)]">&quot;Runs Monday to Friday at 6:00 PM, recurring every week.&quot;</strong>
              Users see exactly what they&apos;ve scheduled before saving.
            </p>
          </div>
        </div>
      </motion.div>

      {/* System Outcome Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <span className="font-mono text-sm text-emerald-400 flex-shrink-0">
            &gt; V3_OUTCOME:
          </span>
          <p className="text-slate-300 text-sm leading-relaxed">
            400+ screens across 6 subsystems — unified into platform-native modals.
            <span className="text-emerald-400 font-medium"> significantly reduced entry steps</span>,
            <span className="text-emerald-400 font-medium"> zero new tabs</span>, and
            <span className="text-emerald-400 font-medium"> natural language recurrence summaries</span> that
            eliminate scheduling confusion. Shipped in WebFOCUS 9.3.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

