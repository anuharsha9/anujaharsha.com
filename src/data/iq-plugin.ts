import { CaseStudyData } from '@/types/caseStudy'

export const iqPluginCaseStudy: CaseStudyData = {
  slug: 'iq-plugin',
  heroTitle: 'Driving Data Science Adoption in Enterprise BI',
  heroSubheading: 'Unifying Data Science & ML Inside WebFOCUS',
  heroSubtitle:
    'This started as a concept in the annual roadmap. I took it from idea to shipped architecture — bringing mockups to the table first, with tickets following after. I owned all three workflows and eventually handed off to two designers.',
  coverImage: {
    src: '/images/case-study/iq-plugin/IQ plugin - visual - 3 in 1 IQ Hub.png',
    alt: 'DSML Hub - Unified Data Science & Machine Learning',
  },
  role: 'Lead Product Designer (End-to-End Ownership)',
  company: 'Cloud Software Group — WebFOCUS',
  timeframe: 'Spring 2024 – Spring 2025 | Shipping 2027',
  status: {
    label: 'Not shipped yet — in production pipeline',
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
    problem: 'Data science tools were siloed from business intelligence users.',
    role: 'Lead Designer (Concept to Architecture)',
    keyDecisions: [
      'Unifying 3 distinct tools (NLQ, Insights, ML) into 1 Hub',
      'Implementing "Progressive Disclosure" for complex features',
      'Creating a "Discover" page for education/onboarding',
    ],
    impactDirectional: 'Unified 3 tools into one discovery hub (in production pipeline).',
    status: 'In Production Pipeline',
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
    businessGoal: 'Increase adoption of high-value DS/ML features by 25%.',
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
      evidence: 'Analytics showed high bounce rate on "New Project" screen.',
      decision: 'Moved configuration to "Just-in-Time" necessity.',
      feature: 'Lazy Configuration',
    },
  ],
  competitiveResponse: {
    marketGap: 'Competitors like PowerBI have "Q&A" but it felt bolted on.',
    response: 'Deeply integrated AI that understands the *context* of your data.',
    evidenceSource: 'Competitive usability study of PowerBI Q&A.',
  },
  businessImpactDirectional: {
    bullets: [
      'Increased discoverability of DS tools by 100% (directional).',
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
    leadershipSummary: 'NLQ, Insights, and ML — three workflows, one owner. Took this from a roadmap concept to shipped architecture, then enabled two designers to build on the foundation.',
    whatTheSystemWas:
      'WebFOCUS had three powerful data science features — NLQ (ask questions in plain English), Insights (auto-generated visualizations), and ML (predictive model training). All shipping, none legacy. But they were invisible — buried in different menus with different entry points. Users didn\'t know they existed.',
    myRole:
      'End-to-end ownership: made all three workflows responsive, established consistent interaction patterns, and unified them into a single discoverable hub.',
    scopeOfPractice: [],
    impactMetrics: [
      { label: 'Workflows owned', value: '3 simultaneously' },
      { label: 'Entry points integrated', value: '3 → 1 Hub' },
      { label: 'NLQ adoption', value: '+25%' },
      { label: 'Designers enabled', value: '2 (1 junior, 1 senior)' },
    ],
    star: {
      situation: 'Three powerful data science features existed but were scattered across the platform. Different entry points, different patterns, low adoption. Users didn\'t know they were there.',
      task: 'Unify them into one discoverable experience. Make data science accessible without hiding it.',
      action: 'Defined the architecture and base screens for all three. Established consistent interaction patterns and made everything responsive.',
      result: 'Integrated three features into the Hub — no extra space, everything inside. NLQ and Insights now powering enterprise users daily. DSML Hub shipping 2027.',
    },
    technologies: [],
    keyAchievements: [
      '3 entry points → 1 unified DSML Hub',
      '3 workflows owned simultaneously',
      'Consistent interaction patterns across all features',
      'From annual roadmap concept → shipped architecture',
      'Enabled 2 designers with architecture and base screens',
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
      { title: 'Unified Entry Point', description: '' },
      { title: 'Progressive Disclosure', description: '' },
      { title: 'Cognitive Offloading', description: '' },
      { title: 'One Click Away', description: '' },
      { title: 'Responsive First', description: '' },
      { title: 'Contextual Help', description: '' },
    ],
  },
  // ----------------------------
  // NARRATIVE CASE STUDY SECTIONS (6 sections mapped to D.E.S.I.G.N. Framework)
  // ----------------------------
  sections: [
    {
      id: 'section-01',
      index: 'D',
      title: 'Discover Deeply: From Roadmap Concept to Strategic Definition',
      summary: 'TL;DR Three powerful features existed — but nobody could find them. Customer feedback confirmed: visibility was the problem.',
      body: `WebFOCUS had three data science features:

*   **NLQ — Natural Language Query:** ask questions against your data in plain English ("Which product sold most last quarter?")
*   **Insights —** Auto-generates visualizations and patterns from your dataset
*   **ML —** Train predictive models: classification, regression, time-series forecasting, anomaly detection

All shipping. None legacy. The problem? They weren't visible. NLQ was buried in Explore Data. Insights was hidden in a submenu. ML lived in a completely separate context.

**How I discovered this:** Customer feedback from support reps, PMs, and leadership all pointed to the same issue — users didn't know these features existed. The problem wasn't quality; it was discoverability.`,
    },
    {
      id: 'section-02',
      index: 'E',
      title: 'Empathize with the Ecosystem: NLQ & Insights',
      summary: 'Before we could unify the platform, we had to modernize the pieces. NLQ and Insights became the bedrock of the new System.',
      body: `NLQ (Natural Language Query) and Automated Insights became the foundation. But in their legacy state, they were rigid and intimidating—like command line interfaces for data.

**From Terminal UI to Apple UI**
I redesigned their standalone interfaces first, moving them from legacy interactions to the new "Apple UI" aesthetic we defined—clean whitespace, human-readable prompts, and intuitive navigation. Once these two foundational "apps" were modernized, I had the building blocks to construct the unified Hub.`,
    },
    {
      id: 'section-03',
      index: 'S',
      title: 'Simplify the Chaos: Mapping and Unifying the System',
      summary: 'Integrated three scattered entry points into the Hub. Already owned all three — integration felt natural.',
      body: `**I defined the architecture before any tickets existed. The PM wrote tickets after seeing my mockups — that's how I operated throughout.**

**Why integration was natural:** I already owned all three features. NLQ, Insights, and ML were mine. When the DSML Hub opportunity came, the hard work was already done — I understood every workflow, every edge case, every user pain point.

Key architectural decisions:
• Smart integration into the Hub — no extra space, everything inside
• One DSML Hub as the single entry point
• Consistent interaction patterns across NLQ, Insights, and ML
• Fully responsive — works on any screen size
• No new infrastructure; built within existing Hub ecosystem

This meant faster development and familiar patterns for engineering.`,
    },
    {
      id: 'section-04',
      index: 'I',
      title: 'Iterate with Inclusion: The Evolution of a Unified Hub',
      summary: 'Same features, transformed experience. Three separate tools became one cohesive hub.',
      body: `The transformation wasn't about changing features — it was about changing how users find and access them.

**Before:** Three separate entry points, three different mental models, three chances for users to give up.
**After:** One DSML Hub, consistent patterns, one learning curve.`,
    },
    {
      id: 'section-05',
      index: 'G',
      title: 'Grow Through Constraints: Strategic Ownership at Scale',
      summary: 'Fought for features, lost some battles. Built within constraints, enabled two designers to continue.',
      body: `**What got rejected:** A lot. I fought for a navigation bar in IQ — eventually won. Built a "Get Started" panel that got scrapped after significant effort (we integrated it better elsewhere). Pushed for more IQ features on the Hub homepage — rejected due to engineering resources.

The Hub ecosystem constraint became an advantage: familiar patterns meant faster development and easier adoption. After establishing the architecture and base screens, I handed off to two designers (one junior, one senior). They executed confidently because the foundation was clear.

**What I'd do differently:** I wanted to add proper tutorials and onboarding flows — never got full green light. I envisioned NLQ as a chat interface for WebFOCUS itself (step-by-step workflow guidance), and I wanted to connect ReportCaster and IQ (schedule generated insights automatically). These remain opportunities for the platform.`,
    },
    {
      id: 'section-06',
      index: 'N',
      title: 'Navigate Forward: Adoption, Impact, and Future',
      summary: 'NLQ adoption +25%. Insights live. DSML Hub shipping 2027.',
      body: `**What's live now (9.3.6):**
• NLQ with +25% adoption increase
• Insights with auto-generated visualizations

**What's shipping:**
• ML Functions redesign → 2026
• Unified DSML Hub → 2027

The +25% NLQ adoption increase came from making the feature discoverable — not from changing the feature itself. Visibility was the problem. Visibility was the solution.`,
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
    heading: 'Impact',
    bullets: [
      '3 entry points → 1 unified DSML Hub',
      '+25% NLQ adoption from improved discoverability',
      'Consistent interaction patterns across all features',
      'Enabled 2 designers with architecture + base screens',
      'NLQ + Insights live in 9.3.6. DSML Hub shipping 2027',
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
        content: '<span class="text-amber-500/80">Proper Tutorials and Onboarding:</span> I fought for a "Get Started" panel that got scrapped after significant effort (we integrated it better elsewhere). I wanted to scaffold the experience for first-time users more effectively with guided tours, not just tooltips.'
      },
      doNext: {
        title: 'Ecosystem Integration',
        subtitle: 'Roadmap_v2: What I\'d Do Next',
        content: '<span class="text-[var(--accent-teal)]/80">Ecosystem Integration:</span> Connect ReportCaster and IQ to schedule generated insights automatically. Envision NLQ as a chat interface for WebFOCUS itself, offering step-by-step workflow guidance beyond just data querying. This is the future of the platform.'
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
