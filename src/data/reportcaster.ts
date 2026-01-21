import { CaseStudyData } from '@/types/caseStudy'

export const reportcasterCaseStudy: CaseStudyData = {
  slug: 'reportcaster',
  heroTitle: 'Modernizing a 50-Year-Old Enterprise Scheduler',
  heroSubheading: 'A 50-year-old workhorse, untouched by UX—until now',
  heroSubtitle:
    'When I joined, this project was waiting in the pipeline. I asked to take it on. I spent months documenting a system that had never been fully mapped — and the architecture I created became "the pattern for everything."',
  coverImage: {
    src: '/images/case-study/ReportCaster/ReportCaster Explorer.png',
    alt: 'ReportCaster Explorer - Unified Schedule Management',
  },
  role: 'UX Lead / UX Owner (End-to-End Ownership)',
  company: 'Cloud Software Group — WebFOCUS',
  timeframe: 'Sept 2022 – Nov 2023, Jan 2025 | Shipped April 2024',
  status: {
    label: 'Shipping to 20M+ Users',
    variant: 'live' as const,
  },
  scope: [
    'Systems Thinking',
    'UX Architecture',
    'Legacy Modernization',
    'Cross-functional Leadership',
    'Strategic Influence',
  ],
  // ----------------------------
  // QUICK IMPACT OVERVIEW (Public)
  // ----------------------------
  quickOverview: {
    title: 'ReportCaster — Quick Impact Overview',
    subtitle: 'Enterprise scheduling system modernization',
    leadershipSummary: 'This project had been waiting in the pipeline when I joined — I volunteered to take it on. Over 14 months, I mapped the entire system, defined the UX architecture, and built the foundation that two designers later built upon.',
    whatTheSystemWas:
      'A 50-year-old scheduling engine powering 20M+ weekly jobs. It worked — but it was undocumented, fragmented across five subsystems, and ready for modernization.',
    myRole:
      'I owned this end-to-end: from research and system documentation, through architecture and design, to team handoff.',
    scopeOfPractice: [],
    impactMetrics: [
      { label: 'Subsystems integrated', value: '5 → 1 Hub' },
      { label: 'Clicks to create schedule', value: '4 → 2' },
      { label: 'Weekly schedules impacted', value: '20M+' },
      { label: 'Explorer access', value: '2 → 1 click' },
    ],
    star: {
      situation: 'A 50-year-old scheduling system with five fragmented subsystems and no documentation. It powered 20M+ weekly schedules but needed modernization.',
      task: 'Modernize the system while preserving what worked. Document what had never been documented.',
      action: 'Volunteered for the project. Embedded myself in support calls to understand real pain points. Explored three architectural directions before finding the right approach.',
      result: 'Integrated five subsystems into the Hub — no extra space, smart integration. Reduced schedule creation from 4 clicks to 2. Shipped April 2024.',
    },
    technologies: [],
    keyAchievements: [
      '5 subsystems → 1 Hub (smart integration)',
      '4 clicks → 2 clicks for schedule/list creation',
      '2 clicks → 1 click for Explorer access',
      '20M+ weekly schedules impacted',
      '3 architectural directions before finding the right approach',
      'Shipped April 2024 — powering 20M+ weekly schedules',
    ],
    // Public demo URL removed - legacy link no longer available
    dataSheetUrl: 'https://www.ibi.com/content/dam/ibi/documents/data-sheet/webfocus-report-caster-data-sheet.pdf',
    dataSheetLabel: 'View ReportCaster Data Sheet',
    demoVideoUrl: 'https://www.youtube.com/watch?v=NvNFN6sz41M',
    demoVideoLabel: 'ReportCaster Public Demo',
    validationLinks: [
      {
        url: 'https://www.ibi.com/blog/introducing-webfocus-9-3',
        label: 'WebFOCUS 9.3 Release Blog',
      },
      {
        url: 'https://community.ibi.com/articles/enhancing-the-ux-of-webfocus-reportcaster-a-path-to-improved-efficiency-and-user-satisfaction-r38/',
        label: 'UX Enhancement Article',
      },
    ],
  },
  // ----------------------------
  // VERSION TIMELINE
  // ----------------------------
  versionTimeline: [
    {
      id: 'version-1',
      label: 'V1',
      title: 'Independent product',
      description: 'Standalone RC environment similar to other complex tools.',
      targetSectionId: 'version-1',
    },
    {
      id: 'version-2',
      label: 'V2',
      title: 'Hub plugin',
      description: 'RC as a plugin inside the hub environment.',
      targetSectionId: 'version-2',
    },
    {
      id: 'version-3',
      label: 'V3',
      title: 'Modal-based Architecture',
      description: 'Final shipped direction using + menu modal workflow.',
      targetSectionId: 'version-3',
    },
  ],
  // ----------------------------
  // UX PRINCIPLES (Public)
  // ----------------------------
  uxPrinciples: {
    title: 'Design Principles Applied',
    principles: [
      { title: 'Cognitive Load Reduction', description: '' },
      { title: 'Unified Mental Model', description: '' },
      { title: 'User Control & Freedom', description: '' },
      { title: 'Match System to Real World', description: '' },
      { title: 'Progressive Disclosure', description: '' },
      { title: 'Error Prevention', description: '' },
    ],
  },
  // ----------------------------
  // NARRATIVE CASE STUDY SECTIONS (01–06) - Mapped to D.E.S.I.G.N. Framework
  // ----------------------------
  sections: [
    {
      id: 'section-01',
      index: 'D',
      title: 'Discover Deeply: How I Landed the Project',
      summary: 'Volunteered for a deferred project with no documentation. Built structure from scratch using only sandbox access and tribal knowledge.',
      body: `No onboarding deck. No design file. No documented history. Just a sandbox environment and the tribal knowledge of engineers who had worked on it for decades.

I spent the first weeks listening, mapping, and asking questions that revealed how little was actually written down. I documented the entire system, created the UX architecture, and eventually handed it off to two designers after establishing the foundation.`,
    },
    {
      id: 'section-02',
      index: 'E',
      title: 'Empathize with the Ecosystem: Understanding Users and Constraints',
      summary: 'Built relationships with support lead and team. Gained access to private internal tickets and historical insights. Anchored redesign on pain customers actually voiced.',
      body: `Enterprise security policies blocked direct access to end users. No interviews, no usability tests, no direct feedback loops. This is the reality of B2B enterprise design—you often can't talk to the people using your product.

I found another way. I embedded myself in support calls, built relationships with the support lead, and gained access to years of internal tickets. I discovered that users were hacking the UI just to get their jobs done—creating workarounds for problems the system was never designed to solve.`,
    },
    {
      id: 'section-03',
      index: 'S',
      title: 'Simplify the Chaos: Mapping and Integrating the Architecture',
      summary: 'Mapped and unified five fragmented subsystems into one coherent mental model. Prioritized patterns, clarified undocumented rules, and made complexity digestible for everyone.',
      body: `After accepting the project, I faced the reality: there was no onboarding, no spec, no design file, no historical rationale. Just: "Here's the sandbox. Figure it out."

This became a detective story. I pieced together the system from fragments: hundreds of screenshots, support tickets, conversations with the one engineer who knew it end-to-end, and patterns I discovered by using it myself.`,
      // Note: Hero image removed - SystemMappingBreakdown component provides the visual at section end
    },
    {
      id: 'section-04',
      index: 'I',
      title: 'Iterate with Inclusion: Three Architectural Approaches',
      summary: 'Three directions before finding the right one. Each rejection taught me something about platform constraints.',
      body: `After mapping the system and identifying the five subsystems (Schedules, Distribution Lists, Access Lists, Explorer, Admin), I explored three architectural directions before finding the solution that balanced everything.

**V1: Independent Product** → Rejected. "Leadership wants all workflows centralized in the hub."
**V2: Hub Plugin** → Rejected. "Too much engineering effort this year."
**V3: Modal-based Architecture** → Shipped. Platform-native design that worked within existing code.

Each rejection taught me something different about platform constraints, user needs, and engineering realities.`,
      // Store V1, V2, V3 data for the VersionIteration component
      v1Data: {
        id: 'version-1',
        title: 'Version 1: Independent Product',
        body: `I designed V1 as a standalone product matching existing platform patterns — dedicated scheduling, explorer, and admin in one place.

Rejected: "Leadership wants all workflows centralized in the hub." Fair constraint. I moved on.`,
        images: [
          {
            src: '/images/case-study/ReportCaster/RC - V1.3 - Independent version - Home.png',
            alt: 'RC Independent V1 - Home',
            sensitive: true,
          },
          {
            src: '/images/case-study/ReportCaster/RC - V1.3 - Independent version - New Schedule.png',
            alt: 'RC Independent V1 - New Schedule',
            sensitive: true,
          },
          {
            src: '/images/case-study/ReportCaster/RC - V1.3 - Independent version - Schedule Task.png',
            alt: 'RC Independent V1 - Schedule Task',
            sensitive: true,
          },
          {
            src: '/images/case-study/ReportCaster/RC - V1.3 - Independent version - New Schedule Full screen.png',
            alt: 'RC Independent V1 - New Schedule Full screen',
            sensitive: true,
          },
        ],
      },
      v2Data: {
        id: 'version-2',
        title: 'Version 2: Plugin Integration',
        body: `I built a hub-friendly plugin with integrated navigation and consolidated subsystems. This was my favorite version.

Rejected: "Too much engineering effort this year." Different constraint — resourcing, not strategy. Two rejections. Time to reframe from scratch.`,
        images: [
          {
            src: '/images/case-study/ReportCaster/RC Hub Integration V2.1 - Home - Create new schedule context menu.png',
            alt: 'RC Hub Integration V2.1 - Home',
            sensitive: true,
          },
          {
            src: '/images/case-study/ReportCaster/RC Hub Integration V2.1 - Home - Create new schedule.png',
            alt: 'RC Hub Integration V2.1 - Create new schedule',
            sensitive: true,
          },
          {
            src: '/images/case-study/ReportCaster/RC Hub Integration V2.1 - Admin (Status).png',
            alt: 'RC Hub Integration V2.1 - Admin',
            sensitive: true,
          },
          {
            src: '/images/case-study/ReportCaster/RC Hub Integration V2.1 - Home - Create new schedule - New task.png',
            alt: 'RC Hub Integration V2.1 - New task',
            sensitive: true,
          },
        ],
      },
      v3Data: {
        id: 'version-3',
        title: 'Version 3: The Breakthrough (Platform-native Design)',
        body: `Reframed: "How does the platform WANT workflows to behave?" Every major workflow starts in the + menu. That's platform architecture, not just UI.

**Aha moment:** If RC is a creation workflow, why not initiate from + menu? Modals worked within legacy FOCUS code without a rewrite. Constraint became advantage.

**Final solution:** Scheduling → modals from + menu. Explorer → filtered view in Home. Admin → management center.`,
        subsections: [
          {
            title: 'Schedule Dialog',
            description: 'Unified schedule creation — all properties in one modal.',
            images: [
              {
                src: '/images/case-study/ReportCaster/Initiating ReportCaster from the HUB.png',
                alt: 'Initiating ReportCaster from + menu',
                fullWidth: true,
                sensitive: true,
              },
              {
                src: '/images/case-study/ReportCaster/Schedule Dialog - Properties.png',
                alt: 'Schedule Dialog - Properties',
                sensitive: true,
              },
            ],
          },
          {
            title: 'Recurrence Redesign',
            description: 'Natural language summaries instead of cryptic settings.',
            images: [
              {
                src: '/images/case-study/ReportCaster/New SD - Recurrence - Weekly.png',
                alt: 'Recurrence - Weekly',
                fullWidth: true,
                sensitive: true,
              },
              {
                src: '/images/case-study/ReportCaster/New SD - Recurrence - Monthly - Days of the week.png',
                alt: 'Recurrence - Monthly',
                sensitive: true,
              },
              {
                src: '/images/case-study/ReportCaster/New SD - Recurrence - Days.png',
                alt: 'Recurrence - Daily',
                sensitive: true,
              },
              {
                src: '/images/case-study/ReportCaster/New SD - Recurrence - Validation Error.png',
                alt: 'Recurrence - Validation Error',
                sensitive: true,
              },
              {
                src: '/images/case-study/ReportCaster/New SD - Recurrence - Once.png',
                alt: 'Recurrence - One-time',
                sensitive: true,
              },
            ],
          },
          {
            title: 'Distribution List',
            description: 'Same modal pattern for all asset types.',
            images: [
              {
                src: '/images/case-study/ReportCaster/Distribution List starting point.png',
                alt: 'Distribution List - Start',
                sensitive: true,
              },
              {
                src: '/images/case-study/ReportCaster/Distribution List - Add new members.png',
                alt: 'Distribution List - Add members',
                sensitive: true,
              },
              {
                src: '/images/case-study/ReportCaster/Distribution List - Edit Current List+Search built in.png',
                alt: 'Distribution List - Edit',
                sensitive: true,
              },
              {
                src: '/images/case-study/ReportCaster/Distribution List - Populated List view.png',
                alt: 'Distribution List - Populated',
                sensitive: true,
              },
            ],
          },
          {
            title: 'Access List',
            description: 'One mental model for all list types.',
            images: [
              {
                src: '/images/case-study/ReportCaster/Access List starting point.png',
                alt: 'Access List - Start',
                sensitive: true,
              },
              {
                src: '/images/case-study/ReportCaster/Access List - Add new members.png',
                alt: 'Access List - Add new',
                sensitive: true,
              },
              {
                src: '/images/case-study/ReportCaster/Access List - Add existing members - populated.png',
                alt: 'Access List - Add existing',
                sensitive: true,
              },
              {
                src: '/images/case-study/ReportCaster/Access List - Current List+context menu options.png',
                alt: 'Access List - Current',
                sensitive: true,
              },
            ],
          },
          {
            title: 'RC Explorer',
            description: 'Filtered view pattern — scalable to all asset types.',
            images: [
              {
                src: '/images/case-study/ReportCaster/ReportCaster Explorer.png',
                alt: 'ReportCaster Explorer',
                sensitive: true,
              },
              {
                src: '/images/case-study/ReportCaster/RC Explorer - filter view for different types of RC assets.png',
                alt: 'RC Explorer - Filter view',
                sensitive: true,
              },
            ],
          },
          {
            title: 'RC Admin',
            description: 'Fifth subsystem surfaced.',
            images: [
              {
                src: '/images/case-study/ReportCaster/ReportCaster Status (Admin).png',
                alt: 'ReportCaster Admin',
                sensitive: true,
              },
            ],
          },
        ],
      },
    },
    {
      id: 'section-05',
      index: 'G',
      title: 'Grow Through Constraints: Aligning the Team Within the Ecosystem',
      summary: 'Owned three major projects simultaneously. Onboarded 2 designers and remained the knowledge hub.',
      body: `I was redesigning ML Functions and IQ Plugin simultaneously — three major enterprise systems at once. This taught me to prioritize ruthlessly: architecture first, polish second.

I onboarded 2 designers mid-project and remained the knowledge hub even after transitioning. The team could execute because they understood the "why" behind every decision.`,
    },
    {
      id: 'section-06',
      index: 'N',
      title: 'Navigate Forward: Shipping Impact and Reflection',
      summary: 'Requested: visual refresh. Delivered: foundational system architecture.',
      body: `The request was for a visual refresh. I delivered a foundational system architecture. What started as "make it look better" became "document, unify, and future-proof a 50-year-old system."

**What shipped (April 2024):**
• 5 subsystems → 1 unified mental model
• 4 → 2 clicks for schedule/list creation
• 2 → 1 click for Explorer access
• Powering 20M+ weekly schedules, featured in public demos

**What I'd do differently:**
• Push harder for direct user research earlier — even in enterprise, there are ways
• Document architectural decisions in real-time, not retrospectively
• Build design system components as I go, not after

The architecture I created became the reference pattern for other modernization projects in the org.`,
    },
  ],
  // ----------------------------
  // PROTOTYPE (placeholder URLs)
  // ----------------------------
  prototypeMedia: {
    title: 'Transformation in Motion',
    description:
      'See the transformation unfold in real-time. Compare the old fragmented workflow with the new unified design side-by-side.',
    // Before/After video comparison
    beforeAfter: {
      before: {
        title: 'Legacy RC Workflow',
        videoUrl: '/videos/rc-old-workflow.mp4', // 5 min video of old RC UI workflow
        videoPoster: '/images/case-study/ReportCaster/rc-old-workflow-poster.jpg',
        description: 'The old fragmented workflow: multiple disconnected interfaces, 4 clicks to create a schedule, hidden functionality in legacy menus. Note: The legacy workflow video is under NDA and requires password access to view.',
        sensitive: true,
      },
      after: {
        title: 'New Unified Workflow',
        videoUrl: '/videos/rc-prototype-walkthrough.mp4',
        videoPoster: '/images/case-study/ReportCaster/rc-prototype-poster.jpg',
        description: 'The new unified workflow: modal-based creation, 2 clicks to create a schedule (+ menu → create schedule), all functionality accessible from one place. (Note: This is a Figma prototype and may not reflect all final shipped changes.)',
        isPublic: true, // Public - new workflow is not sensitive
      },
      comparisonNotes: {
        before: [
          'Five disconnected subsystems',
          '4 clicks to create schedule/lists',
          '2 clicks to access Explorer',
          'Hidden functionality in legacy menus',
        ],
        after: [
          'Unified modal-based workflow',
          '2 clicks to create schedule/lists',
          '1 click to access Explorer',
          'All functionality accessible from Hub',
        ],
      },
    },
    // Fallback single video if beforeAfter not available
    videoUrl: '/videos/rc-prototype-walkthrough.mp4',
    videoPoster: '/images/case-study/ReportCaster/rc-prototype-poster.jpg',
  },
  // ----------------------------
  // D.E.S.I.G.N. FRAMEWORK CONNECTION
  // ----------------------------
  frameworkConnection: {
    principles: [
      {
        letter: 'D',
        title: 'Discover Deeply',
        description: 'Volunteered for a deferred project with no documentation. Spent weeks mapping the full architecture before designing.',
      },
      {
        letter: 'E',
        title: 'Empathize with the Ecosystem',
        description: 'No direct user access, so I embedded in support calls. Found customers creating workarounds for problems the system never solved.',
      },
      {
        letter: 'S',
        title: 'Simplify the Chaos',
        description: 'Integrated five fragmented subsystems into the Hub. No extra space — smart integration that lives inside existing patterns.',
      },
      {
        letter: 'I',
        title: 'Iterate with Inclusion',
        description: 'I explored three architectural directions before finding the right approach. The modal-based design emerged from platform constraints.',
      },
      {
        letter: 'G',
        title: 'Grow Through Constraints',
        description: 'I handed off to two designers and remained the knowledge hub even after moving to other projects.',
      },
      {
        letter: 'N',
        title: 'Navigate Forward',
        description: 'Shipped April 2024. Powering 20M+ weekly schedules. Featured in public YouTube demos.',
      },
    ],
  },
  // ----------------------------
  // IMPACT + REFLECTION SUMMARY
  // ----------------------------
  impactSummary: {
    heading: 'Shipping impact at a glance',
    bullets: [
      '5 subsystems → 1 Hub (smart integration)',
      '4 → 2 clicks for schedules and lists',
      '2 → 1 click for Explorer access',
      '20M+ weekly schedules impacted',
      'Shipped April 2024 — powering 20M+ weekly schedules',
    ],
  },
  // ----------------------------
  // FINAL SUMMARY (Now combined with Section 08)
  // ----------------------------
  finalSummary: undefined,
}
