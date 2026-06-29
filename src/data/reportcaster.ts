import { CaseStudyData } from '@/types/caseStudy'

export const reportcasterCaseStudy: CaseStudyData = {
  slug: 'reportcaster',
  heroTitle: 'I modernized a 40-year-old scheduling system powering millions of automated jobs.',
  heroSubheading: 'It was a black box. 5 disconnected tools. Customers were threatening to leave for modern competitors unless we made it look pretty.',
  heroSubtitle:
    'But a fresh coat of paint wouldn\'t fix the broken engine. I sat with Support, saw users hacking the system just to work, and rebuilt all 5 tools into one simple hub.',
  coverImage: {
    src: '/images/case-study/ReportCaster/ReportCaster Explorer.png',
    alt: 'ReportCaster Explorer - Unified Schedule Management',
  },
  role: 'UX Owner',
  company: 'Cloud Software Group — WebFOCUS',
  timeframe: 'Sept 2022 – Nov 2023 | Shipped April 2024',
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
  // ----------------------------
  // PROJECT SNAPSHOT & DEEP DIVE DATA
  // ----------------------------
  projectSnapshot: {
    problem: 'The platform\'s enterprise scheduler — powering 20M+ weekly jobs — was bleeding trust. A 40-year-old, undocumented legacy codebase had become a black box. The breaking point? A massive, 5-year multi-million-dollar account was threatening to churn unless we modernized the entire scheduling ecosystem.',
    role: 'Lead Designer (Research to Production)',
    keyDecisions: [
      'Rejecting independent product strategy (silo)',
      'Abandoning plugin approach (technical constraints)',
      'Adopting modal-based "Hub" architecture',
    ],
    impactDirectional: '5 fragmented tools → 1 unified Hub ecosystem. Multi-million-dollar contract secured.',
    status: 'Live',
    scale: '20M+ Schedules',
  },
  challengeDeconstruction: {
    assumptions: [
      'Users want a separate scheduling tool.',
      'We can rewrite the legacy backend.',
      'Power users need every legacy setting exposed.',
    ],
    unknowns: [
      'Full scope of legacy features (undocumented).',
      'Technical feasibility of Hub integration.',
      'Real user workflows (no direct access).',
    ],
    constraints: [
      'No backend rewrite allowed.',
      'Must support all legacy schedule types.',
      'No direct access to end users.',
    ],
    businessGoal: 'Retain customers by modernizing a 40-year-old enterprise scheduler — without breaking backward compatibility.',
  },
  successCriteria: {
    baseline: '5 fragmented tools, 4 clicks to start, no centralized view.',
    target: '1 unified hub, 2 clicks to start, integrated dashboard.',
    result: 'Achieved 1 hub, 2 clicks, full integration.',
    disclaimer: 'Metrics are directional based on internal testing and architectural analysis.',
  },
  keyDecisions: [
    {
      decision: 'Pivot from Standalone App to Hub Modal',
      rationale: 'Standalone app reinforced silos. Hub modal met users where they were.',
      tradeoff: 'Less screen real estate for complex forms.',
      rejectedOption: 'Standalone Application (V1)',
    },
    {
      decision: 'Consolidate 5 Sub-products into 1 View',
      rationale: 'Users shouldn\'t care which "tool" powers their schedule.',
      tradeoff: 'Higher initial complexity in the main list view.',
      rejectedOption: 'Keep distinct tabs for Lists vs Schedules',
    },
    {
      decision: 'Use "Progressive Disclosure" for Recurrence',
      rationale: 'Most schedules are simple (daily/weekly). Advanced options scared new users.',
      tradeoff: 'Power users need one extra click for advanced settings.',
      rejectedOption: 'Show all recurrence options upfront',
    },
  ],
  researchDecisionMap: [
    {
      insight: 'Users hacked the UI to manage distribution lists.',
      evidence: 'Support tickets showing "workarounds".',
      decision: 'Elevated Distribution Lists to a first-class citizen.',
      feature: 'Dedicated Distribution List Manager',
    },
    {
      insight: 'Users got lost navigating between scheduling and reporting.',
      evidence: 'Observed "tab switching" fatigue in demos.',
      decision: 'Integrated scheduling directly into the Report context menu.',
      feature: 'Context-aware "Schedule This" action',
    },
  ],
  competitiveResponse: {
    marketGap: 'Competitors offered modern UI but lacked our depth of recurrence options.',
    response: 'Wrapped our powerful legacy engine in a modern, simple UI.',
    evidenceSource: 'Competitive analysis of Tableau/PowerBI scheduling.',
  },
  businessImpactDirectional: {
    bullets: [
      'Reduced schedule creation time by ~50% (directional).',
      'Zero loss of legacy functionality (100% parity).',
      'Adopted by major enterprise clients within 3 months of launch.',
    ],
    disclaimer: 'Impact metrics are directional estimates based on workflow analysis and internal adoption data. Specific revenue or engagement numbers are confidential.',
  },
  ownership: {
    ownedFeatures: [
      'Task/Distribution List Controls',
      'Recurrence Summaries',
      'Log Reports Filters + Search + Copy/Download',
      'Email Chips',
      'Test Connection Button',
      'Unified Schedule Dialog',
      'Distribution List Manager',
      'Access List Manager',
      'Explorer View',
      'Admin Dashboard',
    ],
    excludedFeatures: [
      'OAuth Support (Backend)',
      'SMTP/FTP Server Configuration',
    ],
  },
  scaleAndResponsibility: {
    metrics: [
      { value: 'Millions', label: 'of end users' },
      { value: 'Hundreds', label: 'of enterprise customers' },
      { value: '20M+', label: 'schedules / week' },
    ],
    status: 'Powering 20M+ Schedules Weekly',
    description: 'Shipped as part of WebFOCUS 9.3 — actively impacting millions of users daily. Mission-critical system that couldn\'t afford to break.',
  },
  presentation: {
    slides: [
      {
        type: 'title',
        layout: 'center',
        title: 'Customers Were Leaving. 40 Years Without Updates.',
        content: ['Anuja Harsha — Senior Product Designer', 'Flagship Case Study @ Cloud Software Group'],
        image: '/images/case-study/ReportCaster/rc-cover.png',
      },
      {
        type: 'title',
        layout: 'center',
        title: 'Executive Summary',
        content: [
          'Situation: The platform\'s enterprise scheduler was losing customers after 40+ years without modernization. 20M+ weekly jobs at stake.',
          'Action: I mapped the entire undocumented system and rebuilt 5 fragmented workflows into 1 unified Hub.',
          'Result: Customers retained. Brand-new integrated system. 4 clicks → 2. Direct customer praise at Virtual User Group.',
        ],
        signal: 'EXECUTIVE SUMMARY',
      },
      {
        type: 'problem',
        layout: 'split',
        title: 'The Business Problem',
        content: [
          'The platform\'s enterprise scheduler — powering 20M+ weekly jobs — was losing customers.',
          '40+ years without meaningful updates. Zero documentation.',
          'The goal: retain customers. The challenge: modernize a 40-year-old system.',
        ],
        image: '/images/case-study/ReportCaster/rc-old-workflow-poster.jpg',
        signal: 'CONSTRAINT: FRAGMENTATION',
      },
      {
        type: 'research',
        layout: 'split',
        title: 'The Detective Work',
        content: [
          'User access was blocked by specialized security policies.',
          'I embedded in support calls to hear real complaints.',
          'Discovered users were "hacking" the UI to manage lists.',
        ],
        signal: 'EVIDENCE: SUPPORT CALLS',
      },
      {
        type: 'decision',
        layout: 'split',
        title: 'Three Pivots to Clarity',
        content: [
          'V1: Independent Product. Rejected (Siloed).',
          'V2: Plugin. Rejected (Technical Debt).',
          'V3: Modal-Based Hub Integration. The Winner.',
        ],
        notes: 'We failed twice fast. We couldn\'t rewrite the backend, so we brought the UI to the user where they already were—in the Hub.',
        image: '/images/case-study/ReportCaster/Initiating ReportCaster from the HUB.png',
        signal: 'DECISION: ITERATION',
      },
      {
        type: 'execution',
        layout: 'center',
        title: 'The Solution: Unified Hub Architecture',
        content: [
          'Consolidated 3 workflows (Scheduler, Lists, Access) into one "+" menu.',
          'Reduced creation clicks from 4 to 2.',
          'Unified view: Managing assets requires zero context switching.',
        ],
        image: '/images/case-study/ReportCaster/ReportCaster Explorer.png',
        signal: 'STRATEGY: UNIFIED HUB',
      },
      {
        type: 'execution',
        layout: 'split',
        title: 'Simplifying Recurrence',
        content: [
          'Moved from cryptic codes to natural language summaries.',
          'Progressive disclosure for advanced options.',
          'Built-in error prevention for complex patterns.',
        ],
        image: '/images/case-study/ReportCaster/New SD - Recurrence - Monthly - Days of the week.png',
        signal: 'DECISION: PROGRESSIVE DISCLOSURE',
      },
      {
        type: 'execution',
        layout: 'split',
        title: 'First-Class Distribution Lists',
        content: [
          'Elevated "Distribution Lists" to a primary asset type.',
          'Manage members with drag-and-drop simplicity.',
          'Direct integration with corporate directories.',
        ],
        image: '/images/case-study/ReportCaster/Distribution List - Populated List view.png',
        signal: 'FEATURE: ASSET MANAGEMENT',
      },
      {
        type: 'execution',
        layout: 'split',
        title: 'Integrated Job Logs',
        content: [
          'Old: Logs opened in new browser tabs. Zero context.',
          'New: Embedded viewer. Filter, Search, & Share inside the Scheduler.',
          'Result: Instant diagnostics without window management chaos.',
        ],
        image: '/images/case-study/ReportCaster/Job log dialog.png',
        signal: 'FEATURE: CONTEXTUAL LOGS',
      },
      {
        type: 'impact',
        layout: 'full',
        title: 'Powering 20M+ Schedules',
        content: [
          'Launched April 2024.',
          '100% Legacy Parity achieved.',
          'Zero Regression reported.',
          'Adopted by major enterprise clients immediately.',
        ],
        image: '/images/case-study/ReportCaster/ReportCaster Status (Admin).png',
        signal: 'OUTCOME: 20M+ SCHEDULES',
      },
      {
        type: 'impact',
        layout: 'center',
        title: 'Validation',
        content: [
          '"She impressed everyone. She took a 40-year-old system and made it look like it was built yesterday."',
          '— Principal Engineer',
        ],
        signal: 'VALIDATION: PEER REVIEW',
      },
      {
        type: 'lesson',
        layout: 'center',
        title: 'Roadmap: Product-Wide Integration',
        content: [
          'Next: Integrate scheduling directly into Designer & Reporting Server.',
          'Vision: Generate an insight → Schedule it immediately.',
          'Goal: Remove "Scheduling" as a separate task entirely.',
        ],
      },
    ],
  },
  bonusSlides: {
    title: 'Deep Dives',
    slides: [
      {
        title: 'Recurrence Logic',
        image: '/images/case-study/ReportCaster/New SD - Recurrence - Weekly.png',
        description: 'How we simplified complex recurrence patterns.',
      },
      {
        title: 'Distribution Lists',
        image: '/images/case-study/ReportCaster/Distribution List - Populated List view.png',
        description: 'First-class management for distribution groups.',
      },
    ],
  },

  quickOverview: {
    title: 'ReportCaster — Quick Impact Overview',
    subtitle: 'Enterprise scheduling system modernization',
    leadershipSummary: 'The platform\'s enterprise scheduler was losing customers — 40+ years without meaningful updates. I volunteered for this project one week into the job. Over 14 months, I independently mapped the entire system with zero documentation, pivoted through three architectural directions, and aligned a 20-person cross-functional team to ship a brand-new integrated product.',
    whatTheSystemWas:
      'The platform\'s enterprise scheduler, powering 20M+ weekly jobs. It worked — but 40+ years without meaningful updates were driving customer complaints and churn. The business couldn\'t afford to lose them.',
    myRole:
      'I owned this end-to-end: from research and system documentation, through architecture and design, to team handoff.',
    scopeOfPractice: [],
    impactMetrics: [
      { label: 'Context switching eliminated', value: '5 → 1' },
      { label: 'Schedule creation time reduced', value: '~60%' },
      { label: 'Weekly schedules impacted', value: '20M+' },
      { label: 'Explorer access', value: '2 → 1 click' },
    ],
    star: {
      situation: 'The platform\'s enterprise scheduler was losing customers after 40+ years without modernization. 5 fragmented subsystems, no documentation, 20M+ weekly jobs at stake.',
      task: 'Retain customers by modernizing the 40-year-old system. Document what had never been documented.',
      action: 'Volunteered one week into the job. Embedded with the Gold Support team and the original RC engineer to reconstruct tribal knowledge. Mapped all five subsystems from scratch. Explored three architectural directions — independent product, hub plugin, modal-based — before finding the breakthrough. Onboarded a ~20-person team and remained point of contact for 6 months after exit.',
      result: 'Rebuilt 5 subsystems into a brand-new integrated Hub — not a UI refresh. Reduced schedule creation from 4 clicks to 2. Customers retained. Shipped April 2024.',
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
    dataSheetLabel: 'ReportCaster Data Sheet',
    demoVideoUrl: 'https://www.youtube.com/watch?v=NvNFN6sz41M',
    demoVideoLabel: 'ReportCaster Public Demo',
    validationLinks: [
      {
        url: 'https://www.ibi.com/blog/introducing-webfocus-9-3',
        label: '9.3 Release Blog',
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
    title: 'Behavioral Principles Applied',
    principles: [
      { title: 'Honor the Platform\'s Ecosystem', description: 'Instead of forcing users into a siloed application, we let the platform dictate the behavior. The platform is the ecosystem; the schedule is just a momentary action within it.' },
      { title: 'Design for Progressive Trust', description: 'Users were overwhelmed by 40 years of settings. We built a system that feels lightweight out of the gate, progressively scaling up in capability only when the user explicitly asks for advanced power.' },
      { title: 'Speak Human, Not Machine', description: 'Cryptic cron jobs and legacy codes were translated into auto-generating, human-readable sentence summaries. Users shouldn\'t have to decode their own schedules.' },
      { title: 'Protect the User from the Engine', description: 'Running 20M+ jobs means failures are catastrophic. We designed smart, inline semantic validation that prevents configuration errors before they can even be submitted.' },
    ],
  },
  // ----------------------------
  // NARRATIVE CASE STUDY SECTIONS (01–06) - Mapped to D.E.S.I.G.N. Framework
  // ----------------------------
  sections: [
    {
      id: 'section-01',
      index: 'D',
      title: 'Discover Deeply: Stepping into the Black Box',
      body: `Customers were threatening to churn after 40+ years without a single update. One week into my role, I volunteered for the project no one else wanted to touch.

When I asked for the constraints, the reality set in: there was no documentation, no roadmap, and no prior UX work. Ever. Out of ~200 people in my business unit, the only people who actually knew how to use the system were the customer support team and the single engineer who wrote the original code in the 1980s.

My entire research foundation consisted of a sandbox environment, a single slide deck from a support lead, and hours of listening in on customer support calls.`,
    },
    {
      id: 'section-02',
      index: 'E',
      title: 'Empathize with the Ecosystem',
      summary: 'No user access. No documentation. I embedded with the Gold Support lead and the original RC engineer — they became my sources of truth.',
      body: `With zero user access allowed, I couldn't run standard UX research. Instead, I embedded myself with the Gold Support lead and the original engineer. I lived in the sandbox, mapping hundreds of screenshots and validating every workaround and hack users had invented. I wasn't an engineer, but I learned the constraints of the legacy FOCUS code well enough to design a modern ecosystem around it.`,
    },
    {
      id: 'section-03',
      index: 'S',
      title: 'Simplify the Chaos: Mapping and Integrating the Architecture',
      summary: 'Mapped and unified five fragmented subsystems into one coherent mental model. Prioritized patterns, clarified undocumented rules, and made complexity digestible for everyone.',
      body: `ReportCaster was essentially a product in itself. It was huge. One customer alone had 13 million schedules running every day. I remember looking at that and thinking—that is some insane scale.

But the system was a complete maze. I pieced the architecture together from hundreds of screenshots and support tickets, and the core problem became obvious: five completely fragmented subsystems.

Schedule workflows were buried four clicks deep. Distribution lists were hidden. The explorer was stuffed inside a hamburger menu. Before I could even draw a single wireframe, I had to map out this chaos and unify it into one coherent mental model.

**Architecture & Layout**
![ReportCaster Basic Map Workflow](/images/case-study/reportcaster/ReportCaster%20Basic%20Map%20Workflow.png)

**Sketchbook Sessions & Wireframes**
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
  <figure class="story-image" style="margin: 0;"><img src="../images/case-study/reportcaster/process/rc-sketchbook_Page_01_Image_0001.jpg" alt="Sketchbook Page 1" /><figcaption style="text-align: center; color: var(--text-muted); font-size: 0.9rem; margin-top: 8px; font-style: italic;">Sketchbook Page 1</figcaption></figure>
  <figure class="story-image" style="margin: 0;"><img src="../images/case-study/reportcaster/process/rc-sketchbook_Page_02_Image_0001.jpg" alt="Sketchbook Page 2" /><figcaption style="text-align: center; color: var(--text-muted); font-size: 0.9rem; margin-top: 8px; font-style: italic;">Sketchbook Page 2</figcaption></figure>
  <figure class="story-image" style="margin: 0;"><img src="../images/case-study/reportcaster/process/rc-sketchbook_Page_03_Image_0001.jpg" alt="Sketchbook Page 3" /><figcaption style="text-align: center; color: var(--text-muted); font-size: 0.9rem; margin-top: 8px; font-style: italic;">Sketchbook Page 3</figcaption></figure>
  <figure class="story-image" style="margin: 0;"><img src="../images/case-study/reportcaster/process/rc-sketchbook_Page_04_Image_0001.jpg" alt="Sketchbook Page 4" /><figcaption style="text-align: center; color: var(--text-muted); font-size: 0.9rem; margin-top: 8px; font-style: italic;">Sketchbook Page 4</figcaption></figure>
  <figure class="story-image" style="margin: 0;"><img src="../images/case-study/reportcaster/process/rc-sketchbook_Page_05_Image_0001.jpg" alt="Sketchbook Page 5" /><figcaption style="text-align: center; color: var(--text-muted); font-size: 0.9rem; margin-top: 8px; font-style: italic;">Sketchbook Page 5</figcaption></figure>
  <figure class="story-image" style="margin: 0;"><img src="../images/case-study/reportcaster/process/rc-sketchbook_Page_06_Image_0001.jpg" alt="Sketchbook Page 6" /><figcaption style="text-align: center; color: var(--text-muted); font-size: 0.9rem; margin-top: 8px; font-style: italic;">Sketchbook Page 6</figcaption></figure>
</div>`,
    },
    {
      id: 'section-04',
      index: 'I',
      title: 'Iterate with Inclusion: Two Rejections. One Breakthrough.',
      summary: 'V1 stung. V2 was my favorite. V3 was the breakthrough — born from asking how the platform itself wanted workflows to behave.',
      body: `I began drafting designs while I was still onboarding. My initial attempts felt out of place, but after internalizing the design system, I started building out full architectural models.

I pitched three completely different models:
**V1 (The Independent Product)** was rejected because leadership wanted all workflows centralized in the Hub.
**V2 (The Hub Plugin)** was my favorite, but it was rejected because it required too much engineering effort to build a new top-level plugin.

Two rejections in, I was perplexed. I reframed the problem from scratch, which led to **V3 (The Platform-Native Approach)** — the breakthrough that defined the final product.`,

      // Store V1, V2, V3 data for the VersionIteration component
      v1Data: {
        id: 'version-1',
        title: 'Version 1: The Independent Product',
        body: `Because massive tools like "Designer" and "Data Flow" had their own independent environments outside the hub, I assumed a massive 5-subsystem scheduler should too.

I created a fully independent version of RC that incorporated the main workflows, admin status, and explorer into one seamless app. I thought it was beautiful.

**Rejected.**
The engineers and PM liked the experience, but leadership wanted the Hub to remain the central command station. This design took users outside the Hub. Fair constraint. I moved on.`,
        images: [
          {
            src: '/images/case-study/ReportCaster/RC - V1.3 - Independent version - Home.png',
            alt: 'RC Independent V1 - Home',
          },
          {
            src: '/images/case-study/ReportCaster/RC - V1.3 - Independent version - New Schedule.png',
            alt: 'RC Independent V1 - New Schedule',
          },
          {
            src: '/images/case-study/ReportCaster/RC - V1.3 - Independent version - Schedule Task.png',
            alt: 'RC Independent V1 - Schedule Task',
          },
          {
            src: '/images/case-study/ReportCaster/RC - V1.3 - Independent version - New Schedule Full screen.png',
            alt: 'RC Independent V1 - New Schedule Full screen',
          },
        ],
      },
      v2Data: {
        id: 'version-2',
        title: 'Version 2: The Hub Plugin',
        body: `Taking the feedback, I integrated the entire independent version directly into the Hub as a dedicated plugin, adding an RC icon to the main side navigation. Everything lived inside the Hub shell.

This was my favorite version. It was clean and powerful.

**Rejected.**
I was hit with a wall of technical jargon. Creating a new top-level plugin in the Hub required too much cross-team engineering effort for the year. This was a resourcing constraint, not a strategy constraint.

Now I was perplexed. They wanted it fully integrated in the Hub, but we couldn't build a new plugin.`,
        images: [
          {
            src: '/images/case-study/ReportCaster/RC Hub Integration V2.1 - Home - Create new schedule context menu.png',
            alt: 'RC Hub Integration V2.1 - Home',
          },
          {
            src: '/images/case-study/ReportCaster/RC Hub Integration V2.1 - Home - Create new schedule.png',
            alt: 'RC Hub Integration V2.1 - Create new schedule',
          },
          {
            src: '/images/case-study/ReportCaster/RC Hub Integration V2.1 - Admin (Status).png',
            alt: 'RC Hub Integration V2.1 - Admin',
          },
          {
            src: '/images/case-study/ReportCaster/RC Hub Integration V2.1 - Home - Create new schedule - New task.png',
            alt: 'RC Hub Integration V2.1 - New task',
          },
        ],
      },
      v3Data: {
        id: 'version-3',
        title: 'Version 3: The Breakthrough (Platform-Native)',
        body: `I looked closely at the Hub. We had a universal "+" menu where every major workflow began — creating visualizations, exploring data, building data flows.

That was the "Ah-ha" moment: **If RC is a creation workflow, why not initiate from the + menu?** The platform is the ecosystem; the schedule is just a momentary action within it.

I completely decoupled the 5 subsystems and embedded them natively where they belonged:
1. **Creation (Schedules & Lists):** Launched as intelligent, progressive dialog modals directly from the + menu. The Hub remains the parent window.
2. **Explorer:** Integrated straight into the Hub's Home view alongside Recents and Favorites. We originally wanted to add RC as deep-dive filters for all files, but pushed that to a future phase and finalized a dedicated Home area.
3. **Admin Status:** Given its own dedicated, highly-visible tab in the main Management Center, rather than being buried three clicks deep in an admin console.

No new plugins. No external apps. UX done. Time to build hundreds of UI screens.`,
        subsections: [
          {
            title: 'Schedule Dialog',
            description: 'Unified schedule creation — all properties in one modal.',
            images: [
              {
                src: '/images/case-study/ReportCaster/Initiating ReportCaster from the HUB.png',
                alt: 'Initiating ReportCaster from + menu',
                fullWidth: true,
              },
              {
                src: '/images/case-study/ReportCaster/Schedule Dialog - Properties.png',
                alt: 'Schedule Dialog - Properties',
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
              },
              {
                src: '/images/case-study/ReportCaster/New SD - Recurrence - Monthly - Days of the week.png',
                alt: 'Recurrence - Monthly',
              },
              {
                src: '/images/case-study/ReportCaster/New SD - Recurrence - Days.png',
                alt: 'Recurrence - Daily',
              },
              {
                src: '/images/case-study/ReportCaster/New SD - Recurrence - Validation Error.png',
                alt: 'Recurrence - Validation Error',
              },
              {
                src: '/images/case-study/ReportCaster/New SD - Recurrence - Once.png',
                alt: 'Recurrence - One-time',
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
              },
              {
                src: '/images/case-study/ReportCaster/Distribution List - Add new members.png',
                alt: 'Distribution List - Add members',
              },
              {
                src: '/images/case-study/ReportCaster/Distribution List - Edit Current List+Search built in.png',
                alt: 'Distribution List - Edit',
              },
              {
                src: '/images/case-study/ReportCaster/Distribution List - Populated List view.png',
                alt: 'Distribution List - Populated',
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
              },
              {
                src: '/images/case-study/ReportCaster/Access List - Add new members.png',
                alt: 'Access List - Add new',
              },
              {
                src: '/images/case-study/ReportCaster/Access List - Add existing members - populated.png',
                alt: 'Access List - Add existing',
              },
              {
                src: '/images/case-study/ReportCaster/Access List - Current List+context menu options.png',
                alt: 'Access List - Current',
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
              },
              {
                src: '/images/case-study/ReportCaster/RC Explorer - filter view for different types of RC assets.png',
                alt: 'RC Explorer - Filter view',
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
      summary: 'Onboarded a ~20-person team who had never seen RC. Managed multiple massive projects simultaneously. Remained the knowledge hub for 6 months after handoff.',
      body: `With the UX locked and over 250 UI screens designed, the next hurdle was engineering. The 20-person execution team—lead architect, core engineers, QA, and a new PM—had never actually seen ReportCaster before. 

I became the educator. I started with the lead architect and lead engineer, and eventually expanded to dozens of demos for the entire cross-functional team, translating my unified mental model into actionable engineering phases.

At this point, I was running RC and our Machine Learning platform simultaneously, while three other designers were focused on a single feature. Being trusted with two massive systems simultaneously spoke volumes about leadership's confidence in my ownership.

Once the heavy lifting was done, I brought on a junior designer, mentored her on the system's intricacies, and eventually handed the project off. But my role as the core knowledge hub persisted long after I left the team.

> I was in a room full of veterans — the Head of PM (15 years), Gold Support Lead (20 years), Original RC Engineer (35+ years), Lead Architect (40 years), and Backend Lead (30+ years). By the time I left the team, they'd become my family. They were no longer intimidating. I had earned respect and trust from them. I was the youngest in the room with an unspoken authority on the experience of RC.`,
    },
    {
      id: 'section-06',
      index: 'N',
      title: 'Navigate Forward: Shipping Impact and Reflection',
      summary: 'Asked for: a UI makeover. Delivered: a brand-new integrated ReportCaster. Customers retained. Satisfaction validated.',
      body: `Shipped. From 4 clicks to 2. No more individual browser tabs. Everything smoothly integrated within the hub ecosystem. Customers noticed.

At the Virtual User Group, a customer praised the redesign directly and said he was looking forward to what's next. A 5-year contract worth millions was signed after RC shipped.`,
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
        description: 'The old fragmented workflow: multiple disconnected interfaces.',
      },
      after: {
        title: 'New Unified Workflow',
        videoUrl: '/videos/rc-prototype-walkthrough.mp4',
        videoPoster: '/images/case-study/ReportCaster/rc-prototype-poster.jpg',
        description: 'The new unified workflow: modal-based creation, 2 clicks to create a schedule, all functionality accessible from one place.',
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
        description: 'Rebuilt five fragmented subsystems into a brand-new integrated Hub. Not a facelift — a structural upgrade to retain customers.',
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
        description: 'Shipped April 2024. Customers retained. Direct praise received during a Virtual User Group I hosted.',
      },
    ],
  },
  // ----------------------------
  // IMPACT + REFLECTION SUMMARY
  // ----------------------------

  impactSummary: {
    heading: 'Shipping impact at a glance',
    bullets: [
      '5 subsystems → 1 Hub (brand-new integrated product)',
      '4 → 2 clicks for schedules and lists',
      '2 → 1 click for Explorer access',
      '20M+ weekly jobs retained — customers stayed',
      'Direct customer praise at Virtual User Group',
      'Shipped April 2024 — zero regressions',
    ],
  },
  reflection: {
    people: [
      {
        id: 'yc',
        name: 'Yingchun Chen',
        role: 'Principal System Software Engineer',
        quote: 'She impressed everyone with how quickly she grasped all aspects of a highly intricate system and translated that understanding into a clear, modern, and user-centered design.',
        initials: 'YC'
      },
      {
        id: 'dp',
        name: 'Dave Pfeiffer',
        role: 'Director of Design',
        quote: 'Anuja brings energy and determination to tackling complex design challenges. She approaches her work with a fearless attitude and is never afraid to explore new ideas.',
        initials: 'DP'
      }
    ],
    retrospective: {
      pushHarder: {
        title: 'Embedded Explorer View',
        subtitle: 'Git_Diff: What I\'d Push Harder For',
        content: '<span class="text-amber-500/80">Embedded Explorer View:</span> Embedding the RC Explorer view directly into Hub workspaces instead of a separate filtered view. This would have expanded the pattern to Designer, Reporting Server—everything. That\'s my biggest regret.'
      },
      doNext: {
        title: 'Product-Wide Integration',
        subtitle: 'Roadmap_v2: What I\'d Do Next',
        content: '<span class="text-[var(--accent-teal)]/80">Product-Wide Integration:</span> Integrate ReportCaster product-wide—schedule from Designer, Reporting Server, IQ Plugin. Imagine generating an insight and immediately scheduling it. That\'s the vision.'
      }
    }
  },
  // ----------------------------
  // FINAL SUMMARY (Now combined with Section 08)
  // ----------------------------
  finalSummary: undefined,
}
