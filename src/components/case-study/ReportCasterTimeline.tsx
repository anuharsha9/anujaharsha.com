'use client'

import UnifiedTimeline from './UnifiedTimeline'

interface ReportCasterTimelineProps {
  isLightBackground?: boolean
}

export default function ReportCasterTimeline({ isLightBackground = false }: ReportCasterTimelineProps) {
  const phases = [
    {
      id: 'phase-01',
      phase: '01',
      title: 'TAKING_OWNERSHIP',
      body: 'Took ownership of a deferred legacy project. Given full ownership of a 50-year-old system with zero documentation.',
      status: 'COMPLETED' as const,
    },
    {
      id: 'phase-02',
      phase: '02',
      title: 'SYSTEM_ARCHAEOLOGY',
      body: 'Took hundreds of screenshots, mapped workflows, interviewed support team, customer reps, and the one engineer who built it. Created comprehensive mind maps and documented the entire ecosystem.',
      status: 'COMPLETED' as const,
      image: {
        src: '/images/case-study/ReportCaster/ReportCaster Basic Map Workflow.png',
        alt: 'Mind Map of ReportCaster System',
        caption: 'System mapping: Documenting the undocumented',
        isBlurred: false,
      },
    },
    {
      id: 'phase-03',
      phase: '03',
      title: 'DISCOVERY_REALIZATION',
      body: 'Discovered ReportCaster wasn\'t a feature—it was a product with 5 independent subsystems: Scheduling, Distribution Lists, Access Lists, Explorer, and Admin.',
      status: 'COMPLETED' as const,
    },
    {
      id: 'phase-04',
      phase: '04',
      title: 'V1_INDEPENDENT_PRODUCT',
      body: 'Designed as standalone product (like Designer, Data Flow). Unified all 5 subsystems in one place. Aligned with industry standards—complex scheduling tools like Control-M and Tableau Prep operate as independent apps.',
      status: 'REJECTED' as const,
      image: {
        src: '/images/case-study/ReportCaster/RC - V1.3 - Independent version - Home.png',
        alt: 'Version 1 - Independent Product Concept',
        caption: 'V1 Rejected: Leadership wanted workflows centralized in the hub',
        isBlurred: false,
      },
    },
    {
      id: 'phase-05',
      phase: '05',
      title: 'V2_PLUGIN_INTEGRATION',
      body: 'Brought RC into hub as a plugin with fully integrated navigation. Preserved feature parity while embedding in the platform ecosystem.',
      status: 'REJECTED' as const,
      image: {
        src: '/images/case-study/ReportCaster/RC Hub Integration V2.1 - Home - Create new schedule.png',
        alt: 'Version 2 - Plugin Integration Concept',
        caption: 'V2 Rejected: Too much engineering effort for release cycle',
        isBlurred: false,
      },
    },
    {
      id: 'phase-06',
      phase: '06',
      title: 'V3_PLATFORM_NATIVE',
      body: 'Designed WITH platform patterns: Modal creation from + menu, Explorer in Home view, Admin in Management Center. Aligned with architecture, constraints, and scalability.',
      status: 'COMPLETED' as const,
      isCriticalPivot: true,
      image: {
        src: '/images/case-study/ReportCaster/Initiating ReportCaster from the HUB.png',
        alt: 'Version 3 - Platform Native Design',
        caption: 'V3 Breakthrough: Modal-based creation from + menu',
        isBlurred: false,
      },
    },
    {
      id: 'phase-07',
      phase: '07',
      title: 'TEAM_ONBOARDING',
      body: 'Onboarded lead architect, lead engineer, full engineering squad, PM, QA, Documentation, SMEs, Support. Ran dozens of demos, translated tribal knowledge into UX rationale.',
      status: 'COMPLETED' as const,
    },
    {
      id: 'phase-08',
      phase: '08',
      title: 'SHIPPING_IMPACT',
      body: 'Entry path from Hub simplified (5+ clicks → 2). Multi-tab workflows eliminated. Customers praised redesign in Virtual User Group session.',
      status: 'COMPLETED' as const,
    },
  ]

  return (
    <UnifiedTimeline
      phases={phases}
      header={{
        tag: '// PROJECT_TIMELINE',
        title: 'Project Evolution',
        subtitle: 'From legacy constraints to a shipped modern platform — a 12-month journey of persistence.'
      }}
      footer={{
        tag: 'CURRENT_STATE:',
        body: 'ReportCaster redesign shipped in WebFOCUS 9.3, impacting millions of users daily across enterprise deployments.'
      }}
      accentColor="amber"
    />
  )
}
