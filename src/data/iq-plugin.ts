import { CaseStudyData } from '@/types/caseStudy'

export const iqPluginCaseStudy: CaseStudyData = {
  slug: 'iq-plugin',
  heroTitle: 'We Built the Intelligence. Nobody Knew It Existed.',
  heroSubheading: 'Three AI features. <5% adoption. Millions invested. I unified them into one Hub.',
  heroSubtitle:
    'Not assigned — invented. Pitched the vision. VP approved. Owned all three workflows end-to-end.',
  coverImage: {
    src: '/images/case-study/iq-plugin/IQ plugin - visual - 3 in 1 IQ Hub.png',
    alt: 'DSML Hub - Unified Data Science & Machine Learning',
  },
  role: 'Lead Product Designer (End-to-End Ownership)',
  company: 'Cloud Software Group — WebFOCUS',
  timeframe: 'Spring 2024 – Spring 2025 | Shipping 2027',
  status: {
    label: 'NLQ +25% Adoption | Hub Shipping 2027',
    variant: 'shipping' as const,
  },
  scope: [
    'Product Vision',
    'Systems Thinking',
    'Cross-functional Leadership',
    'Team Enablement',
  ],
  // ----------------------------
  // PROJECT SNAPSHOT & DEEP DIVE DATA
  // ----------------------------
  projectSnapshot: {
    problem: 'NLQ, Insights, ML — <5% adoption. Millions invested, buried in menus, invisible to users.',
    role: 'Lead Designer (Vision to Architecture)',
    keyDecisions: [
      'Unifying 3 distinct tools (NLQ, Insights, ML) into 1 Hub',
      'Fighting for large icon tiles over list views (won)',
      'Architecting before tickets existed — PM wrote tickets after seeing mockups',
    ],
    impactDirectional: 'NLQ adoption +25% from discoverability alone. DSML Hub shipping 2027.',
    status: 'NLQ/Insights Live · Hub Shipping 2027',
  },
  challengeDeconstruction: {
    assumptions: [
      'Users know we have DS/ML features.',
      'Data scientists will leave their preferred notebooks.',
      'Business users want to see "AI" everywhere.',
    ],
    unknowns: [
      'Technical feasibility of embedding ML deeply into BI.',
      'Performance impact of running local models.',
      'Will data scientists actually use this?',
    ],
    constraints: [
      'Must fit within existing "Hub" architecture.',
      'Limited engineering resources for new UI components.',
      'Strict security requirements for data access.',
    ],
    businessGoal: 'Rescue millions in engineering investment. Make invisible AI capabilities discoverable.',
  },
  successCriteria: {
    baseline: '3 separate tools, low discoversability, <5% adoption.',
    target: '1 unified hub, high visibility, >10% adoption.',
    result: 'Unified architecture approved, NLQ adoption +25% (standalone), Hub shipping 2027.',
    disclaimer: 'Adoption metrics based on component-level tracking prior to full Hub release.',
  },
  keyDecisions: [
    {
      decision: 'Create a "Start Page" for Data Science',
      rationale: 'Users didn\'t know where to begin. A landing page provided context and entry points.',
      tradeoff: 'One extra click to get to a specific tool.',
      rejectedOption: 'Direct Links in Navigation Bar',
    },
    {
      decision: 'Unified Styling across 3 Engines',
      rationale: 'NLQ, Insights, and ML looked completely different. Unifying them built trust.',
      tradeoff: 'Required significant CSS refactoring by engineering.',
      rejectedOption: 'Keep Native "iframe" Look',
    },
    {
      decision: 'Embed "Ask AI" in the Global Header',
      rationale: 'NLQ needs to be always available, not just in a specific tab.',
      tradeoff: 'Crowded the header; required executive buy-in.',
      rejectedOption: 'Keep NLQ in "Tools" Menu',
    },
  ],
  researchDecisionMap: [
    {
      insight: 'Business users were intimidated by "Machine Learning".',
      evidence: 'Interviews showed fear of breaking things.',
      decision: 'Renamed entry points to outcome-based labels ("Predict", "ask", "Analyze").',
      feature: 'Friendly Navigation Labels',
    },
    {
      insight: 'Users dropped off when asked for configuration upfront.',
      evidence: 'Observed users abandoning complex setup screens.',
      decision: 'Moved configuration to "Just-in-Time" necessity.',
      feature: 'Lazy Configuration',
    },
  ],
  competitiveResponse: {
    marketGap: 'Competitors like PowerBI have "Q&A" but it felt bolted on.',
    response: 'Deeply integrated AI that understands the *context* of your data.',
    evidenceSource: 'Competitive analysis of PowerBI Q&A and Tableau Ask Data.',
  },
  businessImpactDirectional: {
    bullets: [
      'DSML tools now discoverable from the Hub homepage — zero hunting required.',
      '+25% adoption of NLQ feature post-redesign.',
      'Reduced "Time to Insight" for business users.',
    ],
    disclaimer: 'Impact metrics are directional. Full Hub impact pending 2027 release.',
  },
  ownership: {
    ownedFeatures: [
      'DSML Hub Architecture',
      'Discover Page Layout',
      'Unified Navigation',
      'Feature Cards Design',
      'Empty States & Onboarding',
    ],
    excludedFeatures: [
      ' Underlying AI Algorithms',
      'Data Processing Pipeline',
    ],
  },
  presentation: {
    slides: [
      {
        type: 'title',
        title: 'Driving Data Science Adoption',
        content: ['Anuja Harsha — Lead Product Designer', 'Third Case Study'],
        image: '/images/case-study/iq-plugin/iq-cover.png',
      },
      {
        type: 'title',
        layout: 'center',
        title: 'Executive Summary',
        content: [
          'Situation: 3 powerful AI tools existed but had <5% adoption due to poor visibility.',
          'Action: I unified NLQ, Insights, and ML into a single "DSML Hub".',
          'Result: +25% adoption of NLQ immediately. Shipping full Hub in 2027.',
        ],
        signal: 'EXECUTIVE SUMMARY',
      },
      {
        type: 'problem',
        title: 'The "Invisible Feature" Problem',
        content: [
          '3 powerful tools (NLQ, Insights, ML) were siloed.',
          'Buried in deep menus; zero cross-pollination.',
          '<5% adoption rate despite high capability.',
        ],
        image: '/images/case-study/iq-plugin/IQ Structure flowchart.png',
        notes: 'Visualizing the fragmented architecture before the redesign.',
        signal: 'CONSTRAINT: DISCOVERABILITY',
      },
      {
        type: 'research',
        title: 'Unifying the Experience',
        content: [
          'Audit revealed massive fragmentation.',
          'Users treated each tool as a separate product.',
          'Identified opportunity for a "Hub" model.',
        ],
        image: '/images/case-study/iq-plugin/hand-drawn-sketches.png',
        notes: 'Early concept sketches showing the unification strategy.',
        signal: 'EVIDENCE: AUDIT',
      },
      {
        type: 'decision',
        title: 'Architecture Strategy',
        content: [
          'Create a dedicated "DSML Hub".',
          'Unify visual language across all 3 engines.',
          'Outcome-based navigation (Predict, Ask, Analyze).',
        ],
        image: '/images/case-study/iq-plugin/Structure Layout in HUB 1.png',
        signal: 'STRATEGY: UNIFIED HUB',
      },
      {
        type: 'execution',
        title: 'The Solution: A Single Entry Point',
        content: [
          'Unified Landing Page for all AI tasks.',
          'Consistent entry points involved no learning curve.',
          'Shared component library reduced engineering load.',
        ],
        image: '/images/case-study/iq-plugin/IQ plugin - visual - 3 in 1 IQ Hub.png',
        signal: 'EXECUTION: CONSISTENCY',
      },
      {
        type: 'execution',
        title: 'Quality & Scalability',
        content: [
          'Responsive: First fully responsive Hub app.',
          'Lazy Loading: Configuration only when needed.',
          'Scaffolding: Empty states guide first-time users.',
        ],
        signal: 'QUALITY: SCALABILITY',
      },
      {
        type: 'impact',
        title: 'Future Impact',
        content: [
          '+25% NLQ Adoption (verified in piloting).',
          'Shipping 2027.',
          'Foundation for AI roadmap.',
        ],
        image: '/images/case-study/iq-plugin/Final Look.png',
        signal: 'OUTCOME: +25% ADOPTION',
      },
      {
        type: 'lesson',
        title: 'Ecosystem Vision',
        content: [
          'Next: Connect ReportCaster to schedule AI insights.',
          'Vision: NLQ as a chat interface for the whole platform.',
          'Role: End-to-End Ownership (Roadmap to Architecture).',
        ],
        signal: 'ROADMAP: INTEGRATION',
      },
    ],
  },
  bonusSlides: {
    title: 'Deep Dives',
    slides: [
      {
        title: 'NLQ Integration',
        image: '/images/case-study/iq-plugin/iq-nlq-old-poster.jpg',
        description: 'How we brought Natural Language Query to the forefront.',
      },
    ],
  },

  quickOverview: {
    title: 'Data Science Adoption — Quick Impact Overview',
    subtitle: 'From scattered features to unified DSML Hub',
    leadershipSummary: 'Not assigned — invented. Pitched the Hub vision to leadership. VP approved. Owned all three AI workflows. Defended every decision against architects with 20-35 years of tenure.',
    whatTheSystemWas:
      'Three AI features — NLQ, Insights, ML. Millions invested. <5% adoption. Buried in different menus. Invisible.',
    myRole:
      'Vision to architecture. Modernized all three workflows. Made everything responsive. Unified into one Hub.',
    scopeOfPractice: [],
    impactMetrics: [
      { label: 'Adoption impact', value: 'NLQ +25% from discoverability alone' },
      { label: 'Fragmentation eliminated', value: '3 tools → 1 Hub' },
      { label: 'Scope', value: '3 workflows owned simultaneously' },
      { label: 'Team enablement', value: '2 designers onboarded & handed off' },
    ],
    star: {
      situation: 'NLQ, Insights, ML — <5% adoption. Millions invested, invisible to users.',
      task: 'Unify three scattered tools into one discoverable experience.',
      action: 'Co-created Hub concept with PM. Pitched the vision — VP approved. Defined architecture before tickets existed. Drove alignment across 4+ teams. Defended decisions against veteran architects.',
      result: 'NLQ +25% adoption from discoverability alone. No feature changes. DSML Hub shipping 2027.',
    },
    technologies: [],
    keyAchievements: [
      '3 entry points → 1 unified DSML Hub',
      'Co-created concept → pitched to leadership → earned VP approval',
      'Built the Hub navigation from scratch — custom icon tiles for each workflow, no precedent existed',
      'Concept evolved through 4 distinct design iterations before landing the final architecture',
      '3 workflows owned simultaneously across timezones',
      'Drove cross-functional alignment across 4+ teams',
      'Defended design decisions against 20-35 year veteran architects',
      'NLQ + Insights live in 9.3.6. DSML Hub shipping 2027',
    ],
    dataSheetUrl: 'https://www.ibi.com/products/ibi-webfocus',
    dataSheetLabel: 'View WebFOCUS Product Page',
    demoVideoUrl: 'https://www.youtube.com/watch?v=ggcv8b7EKXo',
    demoVideoLabel: 'Insights Public Demo',
    demoVideoUrl2: 'https://www.youtube.com/watch?v=LDaGvuS4K5Y',
    demoVideoLabel2: 'NLQ Public Demo',
    validationLinks: [
      {
        url: 'https://community.ibi.com/articles/from-data-to-insights-ibi-webfocus-data-science-best-feature-%E2%80%9Cinstant-insights-r37/',
        label: 'Instant Insights Article',
      },
      {
        url: 'https://www.ibi.com/products/ibi-webfocus/ai-bootcamp',
        label: 'WebFOCUS AI Bootcamp',
      },
    ],
  },
  // ----------------------------
  // VERSION TIMELINE
  // ----------------------------
  versionTimeline: [],
  // ----------------------------
  // UX PRINCIPLES (Public)
  // ----------------------------
  uxPrinciples: {
    title: 'Design Principles Applied',
    principles: [
      { title: 'Unified Entry Point', description: 'Three menus → one Hub. Describe your goal, not which tool to pick.' },
      { title: 'Progressive Disclosure', description: 'Outcome labels for business users. Expert config hidden until needed.' },
      { title: 'Cognitive Offloading', description: '"Describe your goal" replaces "choose the right tool."' },
      { title: 'One Click Away', description: '"Ask AI" in the global header. Always available, never buried.' },
      { title: 'Responsive First', description: 'First fully responsive Hub app. Designed mobile-up.' },
      { title: 'Contextual Help', description: 'Every empty state teaches the next step. No blank screens.' },
    ],
  },
  // ----------------------------
  // NARRATIVE CASE STUDY SECTIONS (6 sections mapped to D.E.S.I.G.N. Framework)
  // ----------------------------
  sections: [
    {
      id: 'section-01',
      index: 'D',
      title: 'Discover Deeply: The Invisible Feature Problem',
      summary: 'Millions invested. <5% adoption. Three AI features nobody could find.',
      body: `NLQ buried inside "Explore Data." Insights in a submenu. ML in a separate context. <5% adoption on millions in engineering investment. The problem wasn't quality — it was visibility.

This wasn't on a roadmap. My PM and I seized it during product consolidation talks. Dozens of concept mockups. Weekly FigJam sessions across timezones. Our Director of Design started sketching his own ideas mid-pitch. VP approved. We owned it.`,
    },
    {
      id: 'section-02',
      index: 'E',
      title: 'Empathize with the Ecosystem: Modernizing the Building Blocks',
      summary: 'Before unifying, I modernized. Terminal UI → Apple UI.',
      body: `NLQ: bare text field, cryptic errors, zero guidance. Insights: dense data grids, no context. Both felt like command-line tools dressed in web UI.

**From Terminal UI to Apple UI.** Suggested queries. Conversational errors. Scannable cards. Layered disclosure — approachable on the surface, powerful underneath.

I already owned ML from my other case study. When the Hub opportunity came, I had all three building blocks ready.`,
    },
    {
      id: 'section-03',
      index: 'S',
      title: 'Simplify the Chaos: Architecture Before Tickets',
      summary: 'PM wrote tickets after seeing my mockups. That\'s how I operated.',
      body: `**Architecture before tickets. Mockups before meetings. That's how I operated throughout.**

I owned all three features — no audit needed. The decisions:
• **Smart integration** — inside the existing Hub. Zero new infrastructure.
• **One entry point.** Three scattered menus → one destination.
• **Consistent patterns.** Learn one, know all three.
• **Fully responsive.** First Hub app designed mobile-up.`,
    },
    {
      id: 'section-04',
      index: 'I',
      title: 'Iterate with Inclusion: Four Iterations to the Final Hub',
      summary: 'Four iterations. One navigation fight. I won.',
      body: `The biggest fight: large tiles vs. list views. Veteran architects wanted lists. My argument — lists caused the low adoption. Tiles gave immediate context. I won.`,
    },
    {
      id: 'section-05',
      index: 'G',
      title: 'Grow Through Constraints: The Room Full of Veterans',
      summary: 'Decades of tenure across the table. Two years in. Driving the conversation.',
      body: `Every team meeting was a room full of veterans — 20 to 30+ years at WebFOCUS. The only other new person was my PM. We onboarded together.

The conversation that mattered most: integrating the ML workflow into the IQ Plugin. I fought for myself. Industry examples. Interaction logic. Visual prototypes. My Director of Design trusted me to make my own case.

Two years in. Everyone else — decades. I was driving the conversation.`,
    },
    {
      id: 'section-06',
      index: 'N',
      title: 'Navigate Forward: Visibility Was the Solution',
      summary: '+25% NLQ adoption — from discoverability alone. Not feature changes.',
      body: `We didn't add capabilities. Didn't rewrite the engine. We made it visible.

**Live now:** NLQ +25% adoption. Insights with auto-generated visualizations. Both modernized.
**Shipping:** DSML Hub → 2027. ML Functions → 2026.

The features didn't change. The visibility did. Highest-leverage design work: making existing features findable.`,
    },
  ],
  // ----------------------------
  // PROTOTYPE MEDIA
  // ----------------------------
  prototypeMedia: {
    title: 'Transformation in Motion',
    description:
      'See the transformation unfold in real-time. Compare the three existing workflows with the new unified DSML Hub design.',
    multiBeforeAfter: {
      before: {
        title: 'Current Workflows (Public)',
        videos: [
          {
            title: 'NLQ (Natural Language Query)',
            videoEmbedUrl: 'https://www.youtube.com/embed/LDaGvuS4K5Y',
            videoPoster: '/images/case-study/iq-plugin/iq-nlq-old-poster.jpg',
            description: 'Standalone NLQ workflow in Explore Data — separate entry point, different mental model.',
          },
          {
            title: 'Automated Insights',
            videoEmbedUrl: 'https://www.youtube.com/embed/ggcv8b7EKXo',
            videoPoster: '/images/case-study/iq-plugin/iq-insights-old-poster.jpg',
            description: 'Standalone Automated Insights workflow — another separate entry point with its own interface.',
          },
          {
            title: 'ML Functions (Predict Data)',
            videoEmbedUrl: 'https://www.youtube.com/embed/VWxMJ0E5aL0',
            videoPoster: '/images/case-study/iq-plugin/iq-ml-old-poster.jpg',
            description: 'ML Functions from Reporting Server — redesigned with unified patterns.',
          },
        ],
      },
      after: {
        title: 'Unified DSML Hub (Password Protected)',
        videoUrl: '/videos/iq-prototype-walkthrough.mp4',
        videoPoster: '/images/case-study/iq-plugin/iq-prototype-poster.jpg',
        description: 'The new unified DSML Hub: all three DSML capabilities consolidated into one cohesive entry point.',
        sensitive: true,
      },
      comparisonNotes: {
        before: [
          'Three separate entry points',
          'Different patterns for each feature',
          'Users had to hunt for features',
          'Intimidating for business users',
        ],
        after: [
          'Single unified entry point',
          'Consistent patterns everywhere',
          'All DSML in one place',
          'Approachable for all users',
        ],
      },
    },
  },
  // ----------------------------
  // D.E.S.I.G.N. FRAMEWORK CONNECTION
  // ----------------------------
  frameworkConnection: {
    principles: [
      {
        letter: 'D',
        title: 'Discover Deeply',
        description: 'Three powerful DSML tools existed — but nobody could find them. The problem wasn\'t quality; it was visibility.',
      },
      {
        letter: 'E',
        title: 'Empathize with the Ecosystem',
        description: 'Data scientists needed depth. Business users needed simplicity. One entry point had to serve both.',
      },
      {
        letter: 'S',
        title: 'Simplify the Chaos',
        description: 'Three scattered entry points → integrated into the Hub. No extra space — smart integration inside existing patterns.',
      },
      {
        letter: 'I',
        title: 'Iterate with Inclusion',
        description: 'Mockups first — tickets followed. Architecture defined collaboratively with PM.',
      },
      {
        letter: 'G',
        title: 'Grow Through Constraints',
        description: 'Built within the Hub ecosystem. No new infrastructure — smart integration with existing patterns.',
      },
      {
        letter: 'N',
        title: 'Navigate Forward',
        description: 'NLQ and Insights now powering enterprise users daily. The DSML Hub ships in 2027.',
      },
    ],
  },
  // ----------------------------
  // IMPACT SUMMARY
  // ----------------------------

  impactSummary: {
    heading: 'Shipping impact at a glance',
    bullets: [
      '3 entry points → 1 unified DSML Hub',
      'NLQ adoption +25% from discoverability alone — no feature changes',
      'First fully responsive Hub app in the platform',
      'Architecture defined before tickets existed',
      'Enabled 2 designers to continue execution on my foundation',
      'NLQ + Insights live in 9.3.6 · DSML Hub shipping 2027',
    ],
  },
  reflection: {
    people: [
      {
        id: 'kk',
        name: 'Karishma Khadge',
        role: 'Senior Product Manager',
        quote: 'Anuja led UX design initiatives with remarkable creativity, empathy, and precision. She consistently demonstrated a deep understanding of user-centered design and the ability to translate complex product requirements into intuitive and visually engaging experiences. What truly stands out is her collaborative spirit and problem-solving mindset.',
        initials: 'KK'
      },
      {
        id: 'vr',
        name: 'Vijay Raman',
        role: 'VP of Product Management',
        quote: 'Anuja made a significant impact modernizing UX across our legacy enterprise products. She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams. Anuja is bold in her ideas and consistently proactive in turning complex problems into practical, user-centered solutions.',
        initials: 'VR'
      }
    ],
    retrospective: {
      pushHarder: {
        title: 'Proper Tutorials and Onboarding',
        subtitle: 'Git_Diff: What I\'d Push Harder For',
        content: '<span class="text-amber-500/80">Tutorials & Onboarding:</span> Fought for a "Get Started" panel — scrapped, integrated elsewhere. Wanted guided tours, not just tooltips.'
      },
      doNext: {
        title: 'Ecosystem Integration',
        subtitle: 'Roadmap_v2: What I\'d Do Next',
        content: '<span class="text-[var(--accent-teal)]/80">Ecosystem Integration:</span> Connect ReportCaster + IQ to auto-schedule generated insights. NLQ as a chat interface for the entire platform.'
      }
    }
  },
  // ----------------------------
  // FINAL SUMMARY - Removed (duplicates impactSummary)
  // ----------------------------
  finalSummary: undefined,
  // ----------------------------
  // PUBLIC SECTIONS (visible without password)
  // ----------------------------
  // ----------------------------
  // PUBLIC SECTIONS (visible without password)
  // ----------------------------
  publicSections: [],
  // ----------------------------
  // NO PASSWORD GATE - Section 01 is public, sections 02-06 are locked via LockedContent
  // ----------------------------
}
