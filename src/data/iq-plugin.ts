import { CaseStudyData } from '@/types/caseStudy'

export const iqPluginCaseStudy: CaseStudyData = {
  slug: 'iq-plugin',
  heroTitle: 'Driving Data Science Adoption in Enterprise BI',
  heroSubheading: 'Unifying Data Science & ML Inside WebFOCUS',
  heroSubtitle:
    'This wasn\'t assigned — it was invented. When strategic product consolidation talks began, my PM and I saw the opportunity: a unified IQ Hub. I built dozens of concept mockups, we mapped user journeys together in FigJam, and pitched the vision to leadership. I owned all three workflows end-to-end and drove cross-functional alignment across teams that had never worked together.',
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
    leadershipSummary: 'Co-created the IQ Hub concept with my PM during strategic product discussions. Built dozens of concept mockups, pitched the vision to leadership, earned VP approval, and owned end-to-end execution across three workflows. Drove cross-functional alignment across teams that had never collaborated — then handed off with thorough documentation when the time came.',
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
      action: 'Co-created the Hub concept with my PM, built dozens of visual concepts, and pitched it to leadership. Defined the architecture and base screens for all three workflows. Drove cross-functional alignment across engineering, PM, and QA teams. Established consistent interaction patterns and made everything responsive.',
      result: 'Integrated three features into the Hub — no extra space, everything inside. NLQ and Insights now powering enterprise users daily. DSML Hub shipping 2027.',
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
      { title: 'Unified Entry Point', description: 'Three separate tools buried in different menus became one DSML Hub. Users no longer need to know which tool to use — they just describe what they want to do.' },
      { title: 'Progressive Disclosure', description: 'Business users see outcome-based labels ("Predict", "Ask", "Analyze"). Advanced configuration stays hidden until experts need it.' },
      { title: 'Cognitive Offloading', description: 'Moved from "choose the right tool" to "describe your goal." The system figures out whether you need NLQ, Insights, or ML.' },
      { title: 'One Click Away', description: 'Embedded "Ask AI" in the global header. NLQ is always available — not just when you navigate to a specific tab.' },
      { title: 'Responsive First', description: 'First fully responsive Hub app in the platform. Designed mobile-up to ensure the experience worked at every breakpoint.' },
      { title: 'Contextual Help', description: 'Empty states guide first-time users with suggested actions. No blank screens — every state teaches the next step.' },
    ],
  },
  // ----------------------------
  // NARRATIVE CASE STUDY SECTIONS (6 sections mapped to D.E.S.I.G.N. Framework)
  // ----------------------------
  sections: [
    {
      id: 'section-01',
      index: 'D',
      title: 'Discover Deeply: From Strategic Spark to Unified Vision',
      summary: 'Three powerful features existed — but nobody could find them. The idea for a unified Hub came from a strategic moment, not a roadmap assignment.',
      body: `The spark came from an unexpected place. Strategic discussions about consolidating product lines raised a question: what if we created a central IQ Hub that unified all of WebFOCUS's data science capabilities?

My PM Karishma and I started brainstorming. We met 3-4 times a week across timezones — she in India, me in the US — mapping user journeys and personas in FigJam. I built dozens of concept mockups exploring what a unified Hub could look like. When we pitched the concept to our Director of Design, he started sketching his own ideas — that's how compelling the vision was. Eventually, the VP approved it, and Karishma and I were given ownership to execute.

The problem we were solving was clear: WebFOCUS had three powerful data science features — NLQ (ask questions in plain English), Insights (auto-generated visualizations), and ML (predictive model training). All shipping. None legacy. But they were invisible — buried in different menus with different entry points. Less than 5% adoption despite high capability. Customer feedback from support reps, PMs, and leadership all confirmed the same thing: users didn't know these features existed. The problem wasn't quality — it was discoverability.`,
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
      summary: 'Same features, transformed experience. Every element was debated, tested, and refined through real collaboration.',
      body: `The transformation wasn't about changing features — it was about changing how users find and access them.

**Before:** Three separate entry points, three different mental models, three chances for users to give up. There was no unified navigation — no IQ Hub existed at all.
**After:** One DSML Hub, consistent patterns, one learning curve.

The concept evolution was visible across four distinct iterations: I started with a data-heavy tabbed dashboard, moved to educational layouts ("What are Insights?"), then explored split interfaces with sidebar navigation, and finally landed on a clean modular approach with icon tiles. Each iteration brought clarity about what users actually needed at the entry point.

The navigation bar was the biggest fight. I designed large tiles with custom icon glyphs to give each workflow a clear visual identity.

The veteran architects wanted a traditional list view. My argument: list items caused low adoption. Large tiles gave immediate context — users could understand what each tool did before clicking.

The "Get Started" panel went through multiple iterations before being reimagined as contextual empty states — ultimately a better solution because it met users where they already were. Every empty state became a teaching moment.`,
    },
    {
      id: 'section-05',
      index: 'G',
      title: 'Grow Through Constraints: Earning Trust in a Room Full of Veterans',
      summary: 'Fought for every design element against 20-35 year veterans. Drove cross-functional alignment. Built the foundation strong enough to outlast my absence.',
      body: `Every element was a battle. The Lead Architect of IQ Plugin had been at the company for over 20 years. The Lead Architect of WebFOCUS itself — over 35. They were cautious about new design elements, let alone an entire embedded Hub.

I defended each decision with industry examples, interaction logic, and visual prototypes. My Director of Design was fully in my corner — trusting me to make my own case.

What surprised me was the cross-functional coordination this project demanded. IQ Plugin needed alignment from the Hub team, other PMs, and engineering teams that had never collaborated. I drove most of that alignment myself.

There was a defining meeting for IQ Plugin and ML — I found myself across from the Director of Engineering, the Principal Data Scientist, the Head PM, the Lead Architect, and the Director of QA. I was two years into the company. Everyone else had been there for decades. It hit me afterward: I wasn't just the designer in the room — I was driving the conversation.

When I transitioned off the project, I made sure the foundation was solid: documentation, recorded walkthroughs, and annotated design files. The architecture was strong enough to carry forward — but the engineers later told me they missed the rapport and the design partnership we'd built together.

**What I'd do differently:** I wanted to add proper tutorials and onboarding flows — never got full green light. I envisioned NLQ as a chat interface for WebFOCUS itself, and I wanted to connect ReportCaster and IQ. these remain opportunities.`,
    },
    {
      id: 'section-06',
      index: 'N',
      title: 'Navigate Forward: Adoption, Impact, and Future',
      summary: 'NLQ adoption +25%. Insights live. DSML Hub shipping 2027.',
      body: `The +25% NLQ adoption increase came from making the feature discoverable — not from changing the feature itself. Visibility was the problem. Visibility was the solution.`,
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
