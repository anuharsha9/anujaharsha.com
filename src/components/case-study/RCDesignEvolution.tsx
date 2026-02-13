'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Mail, Users, FolderTree, Settings } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import MacWindowCarousel from '@/components/ui/MacWindowCarousel'

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
      >
        <ComponentHeading
          variant="block"
          tag="// V3_MODAL_ARCHITECTURE"
          title="The Final System: Modal-Based Workflows"
          description="400+ screens across six subsystems unified into platform-native modals. I designed 250+; onboarded 2 designers who completed 150+. Shipped in WebFOCUS 9.3."
          align="center"
          color="teal"
        />
      </motion.div>

      {/* IDE Layout - Large Feature Display */}
      {/* Streaming Platform Layout - Modern Tabs + Full Screen Viewer */}
      <div className="space-y-8">
        {/* 1. Top Navigation Pills - Mobile Optimized */}
        <div className="relative group">
          {/* Fade gradients to indicate scrollability */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden" />

          <div className="flex justify-center pb-8">
            <div className="inline-flex bg-slate-100 p-1.5 rounded-full overflow-x-auto max-w-full scrollbar-hide">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                      ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white shadow-sm rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {tab.icon}
                      <span>{tab.label}</span>
                      {tab.id === '02_RECURRENCE' && !isActive && (
                        <span className="flex-shrink-0 bg-amber-100 text-amber-700 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full">
                          Key
                        </span>
                      )}
                      {tab.id === '02_RECURRENCE' && isActive && (
                        <span className="flex-shrink-0 bg-amber-50 text-amber-600 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-amber-100">
                          Key
                        </span>
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mobile Scroll Hint */}
          <div className="md:hidden flex justify-center mt-2 opacity-40 text-[10px] uppercase tracking-widest font-mono text-slate-500">
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
                <h4 className="font-serif text-2xl md:text-3xl text-slate-900">
                  {activeTabData.title}
                </h4>
                <p className="text-slate-500 leading-relaxed">
                  {activeTabData.description}
                </p>
                {/* Highlight Block (for Recurrence) */}
                {activeTabData.highlight && (
                  <div className="inline-block mt-2 bg-amber-50 border border-amber-200 px-4 py-2">
                    <span className="font-mono text-[10px] text-amber-700 uppercase tracking-widest mr-2">
                      {activeTabData.highlight.label}:
                    </span>
                    <span className="font-serif italic text-sm text-slate-700">
                      {activeTabData.highlight.text}
                    </span>
                  </div>
                )}
              </div>

              {/* The Viewer */}
              <MacWindowCarousel
                images={activeTabData.images.map(img => ({
                  src: img.src,
                  alt: img.alt,
                  caption: `// ${img.figNumber}: ${img.caption}`
                }))}
                title={activeTabData.title}
                autoPlay={true}
                className="w-full"
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
        className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-6 md:p-8 rounded-2xl"
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Left - The Problem */}
          <div className="flex-1 space-y-3">
            <span className="font-mono text-xs text-red-600 uppercase tracking-widest">
              {'// LEGACY_PAIN'}
            </span>
            <h4 className="font-serif text-xl text-slate-900">
              30 Years of Checkbox Chaos
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              The original recurrence UI was a maze of checkboxes, dropdowns, and obscure terminology.
              Users couldn&apos;t verify what they&apos;d actually scheduled without running a test.
            </p>
          </div>

          {/* Center - Arrow */}
          <div className="flex items-center justify-center md:flex-shrink-0">
            <div className="w-12 h-12 bg-white border border-amber-300 flex items-center justify-center shadow-sm rounded-full">
              <svg aria-hidden="true" className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

          {/* Right - The Solution */}
          <div className="flex-1 space-y-3">
            <span className="font-mono text-xs text-emerald-600 uppercase tracking-widest">
              {'// NATURAL_LANGUAGE'}
            </span>
            <h4 className="font-serif text-xl text-slate-900">
              Human-Readable Summaries
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every configuration now generates a plain English summary: <strong className="text-slate-900">&quot;Runs Monday to Friday at 6:00 PM, recurring every week.&quot;</strong>
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
        className="bg-[#1D1D20] rounded-xl p-6 shadow-lg border border-white/10 max-w-4xl mx-auto font-mono"
      >
        {/* Terminal Header */}
        <div className="flex gap-2 mb-4 opacity-50">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>

        <div className="flex items-start gap-3">
          <span className="text-emerald-400 flex-shrink-0 mt-0.5">
            &gt; V3_OUTCOME:
          </span>
          <p className="text-slate-300 text-sm leading-relaxed font-sans">
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

