import { CaseStudyData } from '@/types/caseStudy'

export const iqPluginCaseStudy: CaseStudyData = {
  slug: 'iq-plugin',
  heroTitle: 'We Built the Intelligence. Nobody Knew It Existed.',
  heroSubheading: 'Millions invested in NLQ, Insights, and ML. Near-zero adoption. Three powerful AI features buried in separate menus — invisible to the users who needed them.',
  heroSubtitle:
    'I unified all three into one hub, modernized each workflow, and drove NLQ adoption up 25%. Architecture defined before tickets existed — PM wrote tickets after seeing my mockups.',
  coverImage: {
    src: '/images/case-study/iq-plugin/IQ plugin - visual - 3 in 1 IQ Hub.png',
    alt: 'DSML Hub - Unified Data Science & Machine Learning',
  },
  role: 'Senior Product Designer (End-to-End Ownership)',
  company: 'Cloud Software Group — WebFOCUS',
  timeframe: 'Spring 2024 – Spring 2025',
  status: {
    label: 'NLQ +25% Adoption | Hub In Development',
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
    problem: 'NLQ, Insights, ML — low adoption. Millions invested, buried in menus, invisible to users.',
    role: 'Lead Designer (Vision to Architecture)',
    keyDecisions: [
      'Unifying 3 distinct tools (NLQ, Insights, ML) into 1 Hub',
      'Fighting for large icon tiles over list views (won)',
      'Architecting before tickets existed — PM wrote tickets after seeing mockups',
    ],
    impactDirectional: 'NLQ adoption +25% from redesign (Phi-3 SLM upgrade). DSML Hub implemented in code — pending launch.',
    status: 'NLQ/Insights Live · Hub Implemented (Pre-Launch)',
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
    baseline: '3 separate tools, low discoverability, near-zero adoption.',
    target: '1 unified hub, high visibility, meaningful adoption increase.',
    result: 'Unified architecture approved. NLQ adoption +25% from redesign. Hub implemented in code, pending launch.',
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
      '+25% adoption of NLQ feature post-redesign (Phi-3 SLM upgrade).',
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
        title: 'We Built the Intelligence. Nobody Knew It Existed.',
        content: ['Anuja Harsha — Senior Product Designer', 'Third Case Study'],
        image: '/images/case-study/iq-plugin/iq-cover.webp',
      },
      {
        type: 'title',
        layout: 'center',
        title: 'Executive Summary',
        content: [
          'Situation: 3 powerful AI tools existed but had near-zero adoption due to poor visibility.',
          'Action: I unified NLQ, Insights, and ML into a single "DSML Hub".',
          'Result: +25% adoption of NLQ from redesign. Hub fully implemented in code, pending launch.',
        ],
        signal: 'EXECUTIVE SUMMARY',
      },
      {
        type: 'problem',
        title: 'The "Invisible Feature" Problem',
        content: [
          '3 powerful tools (NLQ, Insights, ML) were siloed.',
          'Buried in deep menus; zero cross-pollination.',
          'Near-zero adoption rate despite high capability.',
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
          '+25% NLQ Adoption from redesign (Phi-3 upgrade).',
          'Hub fully implemented.',
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
    leadershipSummary: 'Team vision, my architecture. Designed how three AI features would come together in one Hub. Defended every decision against architects with 20-35 years of tenure.',
    whatTheSystemWas:
      'Three AI features — NLQ, Insights, ML. Millions invested. Low adoption. Buried in different menus. Invisible.',
    myRole:
      'Vision to architecture. Modernized all three workflows. Made everything responsive. Unified into one Hub.',
    scopeOfPractice: [],
    impactMetrics: [
      { label: 'Adoption impact', value: 'NLQ +25% from redesign (Phi-3 SLM)' },
      { label: 'Fragmentation eliminated', value: '3 tools → 1 Hub' },
      { label: 'Scope', value: '3 workflows owned simultaneously' },
      { label: 'Team enablement', value: '2 designers onboarded & handed off' },
    ],
    star: {
      situation: 'NLQ, Insights, ML — low adoption. Millions invested, invisible to users.',
      task: 'Unify three scattered tools into one discoverable experience.',
      action: 'Co-created Hub concept with PM. Pitched the vision — VP approved. Defined architecture before tickets existed. Drove alignment across 4+ teams. Defended decisions against veteran architects.',
      result: 'NLQ +25% adoption from redesign. DSML Hub implemented in code, pending launch.',
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
      'NLQ + Insights live in 9.3.6. DSML Hub implemented — final QA pending at departure',
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
      summary: 'Millions invested. Low adoption. The algorithms weren\'t broken; the architecture was.',
      body: `We had built powerful enterprise AI capabilities—Natural Language Query, Automated Insights, and Predictive ML—but they were fragmented across the platform. NLQ was buried inside "Explore Data." Insights was hidden in a submenu.

The problem wasn't the algorithms; it was the architecture. Millions in engineering investment were sitting at near-zero adoption because the features were essentially invisible to the users who needed them most.

This wasn't on a roadmap. My PM and I seized the opportunity during product consolidation talks. I designed dozens of concept mockups, ran weekly FigJam sessions across timezones, and pitched the vision. The VP approved. We owned it end-to-end.`,
    },
    {
      id: 'section-02',
      index: 'E',
      title: 'Empathize with the Ecosystem: Modernizing the Building Blocks',
      summary: 'Before unifying the system, I modernized each tool individually.',
      body: `Before unifying the architecture, I had to fix the foundation. NLQ felt like a command-line tool dressed in web UI: bare text fields, cryptic errors, and zero guidance. Insights consisted of dense data grids lacking context.

**Smarter NLQ via Phi-3 SLM:** I redesigned the interaction model from the ground up. I introduced suggested queries to eliminate the "blank page" problem, replaced stack traces with conversational error states, and designed scannable insight cards.

Because I already owned and modernized NLQ, Insights, and ML individually, I was the natural choice to lead the overarching IQ Plugin initiative. When the Hub opportunity arrived, I had all three building blocks modernized and ready for integration.`,
    },
    {
      id: 'section-03',
      index: 'S',
      title: 'Simplify the Chaos: Architecture Before Tickets',
      summary: 'I architected the cross-functional workflows before a single Jira ticket existed.',
      body: `I pushed for cross-functional alignment in a way that hadn't been done in the organization before. I architected the unified workflows across all three AI engines before anyone asked for them.

My PM Karishma wrote the Jira tickets *after* seeing my mockups. We ran 3–4 meetings a week across timezones to ensure engineering feasibility.

**One Entry Point**
We designed smart integration inside the existing WebFOCUS Hub. No new backend infrastructure was needed. We transformed three scattered menus into one unified destination, with one consistent mental model.

![IQ Plugin architecture — NLQ, Insights, and ML under one Hub](/images/case-study/iq-plugin/IQ%20Structure%20flowchart.png)
![Unified dataset selection workflow](/images/case-study/iq-plugin/IQ%20Dataset%20Selection%20Workflow%202.png)
![How IQ fits into the existing Hub layout](/images/case-study/iq-plugin/Structure%20Layout%20in%20HUB%201.png)

**Sketches & Early Concepts**
![Early concept sketching](/images/case-study/iq-plugin/hand-drawn-sketches.webp)
![Architecture wireframes](/images/case-study/iq-plugin/IQ%20Wireframes.png)

**Responsive Design**
![First fully responsive Hub app](/images/case-study/iq-plugin/Mockups%20for%20IQ%20Plugin%20Reponsive%20UI%201.png)`,
    },
    {
      id: 'section-04',
      index: 'I',
      title: 'Iterate with Inclusion: Four Iterations to the Final Hub',
      summary: 'V1 was too dense. V2 was too passive. V3 competed with Hub navigation. V4 landed perfectly.',
      body: `V1 was too dense. V2 was too passive. V3 competed with the global Hub navigation. V4 landed perfectly: clean, outcome-based navigation tiles.

**Design Iterations**
![IQ Hub concept: NLQ + Insights + ML in one place](/images/case-study/iq-plugin/IQ%20plugin%20-%20visual%20-%203%20in%201%20IQ%20Hub.png)
![First concept — too much information](/images/case-study/iq-plugin/Early%20concept%20-%201.png)
![Second iteration — too sparse](/images/case-study/iq-plugin/Mid-Iteration.png)
![Third iteration — competed with Hub navigation](/images/case-study/iq-plugin/Mid-Iteration-1.png)

I designed a unified "Start Page" for Data Science that used clean, outcome-based verbs (Predict, Ask, Analyze) to guide business users naturally, rather than forcing them to decipher technical tool names.`,
    },
    {
      id: 'section-05',
      index: 'G',
      title: 'Grow Through Constraints: Defending Data Over Opinions',
      summary: 'I used industry precedents and interaction logic to defend scannable tiles against veteran architects advocating for list views.',
      body: `The lead architect (20+ years) and the WebFOCUS architect (35+ years) pushed hard for traditional list views. I demonstrated that list views were the exact reason these features were invisible in the first place. By using industry precedents and interaction logic, I shifted their mental model toward large, scannable tiles, proving they provided immediate context for intimidating AI features.

![The final IQ Discover page — shipped](/images/case-study/iq-plugin/Final%20Look.png)

**Insights in IQ**
![Insights: Empty state](/images/case-study/iq-plugin/IQ%20-%20Insights%20_%20Empty%20State%201.png)
![Insights: Data selected](/images/case-study/iq-plugin/IQ%20-%20Insights%20_%20Data%20Selected%201.png)
![Insights: Scannable card-based results](/images/case-study/iq-plugin/IQ%20-%20Insights%20-%20Tile%20View%201.png)

**NLQ in IQ**
![NLQ: Ask questions in plain English](/images/case-study/iq-plugin/IQ%20-%20Ask%20a%20Question%20_%20Empty%20State%201.png)
![NLQ: Data selected state](/images/case-study/iq-plugin/IQ%20-%20Ask%20a%20Question%20_%20Data%20Selected%201.png)
![NLQ: AI-generated chart](/images/case-study/iq-plugin/IQ%20-%20Ask%20a%20Question%20-%20Vertical%20Stacked%20Bar%201.png)

**ML in IQ**
![Predict Data landing — inside IQ](/images/case-study/iq-plugin/IQ%20-%20Predict%20Data%20-%20Train%20Models%20-%20landing%20page%20-%20model%20tile%20view.png)
![Compare models in context](/images/case-study/iq-plugin/IQ%20-%20Predict%20Data%20-%20Train%20Model%20Workflow%20-%20Compare%20models.png)
![Model results — fitted values](/images/case-study/iq-plugin/IQ%20-%20Predict%20Data%20-%20Train%20Model%20Workflow%20-%20Results%20-%20Fitted%20Values.png)
![Run model — explainability view](/images/case-study/iq-plugin/IQ%20-%20Predict%20Data%20-%20Run%20Model%20-%20explanability.png)
![Run model — prediction results](/images/case-study/iq-plugin/IQ%20-%20Predict%20Data%20-%20Run%20Model%20-%20results.png)

**Preview Data in IQ**
![Preview data — sample tab](/images/case-study/iq-plugin/IQ%20-%20Preview%20Data%20Sample%20Tab%201.png)
![Preview data — key analysis](/images/case-study/iq-plugin/IQ%20-%20Preview%20Data%20Key%20Analysis%20Tab%201.png)
![Preview data — time series](/images/case-study/iq-plugin/IQ%20-%20Preview%20Data%20Time-series%20report%20tab%201.png)

> Integrating the ML workflow into the IQ Plugin was the hardest sell. Despite being the newest person in a room of 30-year veterans, I backed my architecture with user evidence. My Director of Design gave me the mandate, and I drove the final integration.`,
    },
    {
      id: 'section-06',
      index: 'N',
      title: 'Navigate Forward: Visibility Was the Solution',
      summary: '+25% NLQ adoption jump. The Hub is now implemented, unifying three fragmented AI tools into one ecosystem.',
      body: `We didn't add new capabilities. We didn't rewrite the core engines. We just made the existing ones visible.

**Live now:** NLQ adoption jumped 25% post-redesign. Insights with auto-generated visualizations is live. 
**Implemented:** The unified DSML Hub and ML Functions were code-complete at my departure, with final QA pending.

The features didn't change. The architecture did. It was the highest-leverage design work possible: making powerful tools findable.`,
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
    heading: 'Impact at a glance',
    bullets: [
      '3 entry points → 1 unified DSML Hub',
      'NLQ adoption +25% from redesign (Phi-3 SLM upgrade)',
      'First fully responsive Hub app in the platform',
      'Architecture defined before tickets existed',
      'Enabled 2 designers to continue execution on my foundation',
      'NLQ + Insights live in 9.3.6 · DSML Hub implemented, final QA pending at departure',
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
        content: '<span class="text-amber-500/80">Tutorials & Onboarding:</span> Initially proposed a dedicated "Get Started" panel. Through iteration, we improved the tutorials, Discover page, and Explore Data header instead — better UX, same goal.'
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
