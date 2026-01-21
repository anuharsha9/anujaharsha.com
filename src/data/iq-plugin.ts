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
  role: 'Lead Product Designer (Full Ownership)',
  company: 'Cloud Software Group — WebFOCUS',
  timeframe: 'Spring 2024 – Spring 2025 | Shipping 2027',
  status: {
    label: 'In Engineering — Shipping 2027',
    variant: 'shipping' as const,
  },
  scope: [
    'Product Vision',
    'Systems Thinking',
    'Cross-functional Leadership',
    'Team Enablement',
  ],
  // ----------------------------
  // QUICK IMPACT OVERVIEW (Public)
  // ----------------------------
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
      summary: 'Three powerful features existed — but nobody could find them. Customer feedback confirmed: visibility was the problem.',
      body: `WebFOCUS had three data science features:
• **NLQ** — Natural Language Query: ask questions against your data in plain English ("Which product sold most last quarter?")
• **Insights** — Auto-generates visualizations and patterns from your dataset
• **ML** — Train predictive models: classification, regression, time-series forecasting, anomaly detection

All shipping. None legacy. The problem? They weren't visible. NLQ was buried in Explore Data. Insights was hidden in a submenu. ML lived in a completely separate context.

**How I discovered this:** Customer feedback from support reps, PMs, and leadership all pointed to the same issue — users didn't know these features existed. The problem wasn't quality; it was discoverability.`,
    },
    {
      id: 'section-02',
      index: 'E',
      title: 'Empathize with the Ecosystem: Bridging the Gap Between Personas',
      summary: 'Data scientists needed depth. Business users needed simplicity. One entry point had to serve both.',
      body: `Two primary personas with conflicting needs:
• **Data scientists** wanted depth, control, and advanced configuration options
• **Business users** wanted simplicity, guidance, and quick answers without technical complexity

They had completely different mental models — but we needed one entry point for both. The solution was layered disclosure: approachable on the surface for business users, powerful underneath for data scientists.`,
    },
    {
      id: 'section-03',
      index: 'S',
      title: 'Simplify the Chaos: Mapping and Unifying the System',
      summary: 'Integrated three scattered entry points into the Hub. Already owned all three — integration felt natural.',
      body: `I defined the architecture before any tickets existed. The PM wrote tickets after seeing my mockups — that's how I operated throughout.

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
**After:** One DSML Hub, consistent patterns, one learning curve.

Drag the sliders to see the transformation.`,
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
