import { CaseStudyData } from '@/types/caseStudy'

export const mlFunctionsCaseStudy: CaseStudyData = {
  slug: 'ml-functions',
  // Blueprint Hero - Architect Design System
  heroTitle: 'Democratizing Machine Learning for Everyone',
  heroSubheading: 'Turning a black-box data science process into a guided, 4-step workflow',
  heroSubtitle:
    'I came in with zero ML background and got MIT certified to do this work. Over two years, I navigated engineering delays, layoffs, and resource constraints — leading design through it all.',
  coverImage: {
    src: '/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png',
    alt: 'ML Functions Confusion Matrix - Model Performance Visualization',
  },
  role: 'Lead Product Designer (End-to-End Ownership)',
  company: 'Cloud Software Group — WebFOCUS',
  timeframe: 'Jan 2023 – Jan 2025 | Shipping 2026',
  status: {
    label: 'Shipping 2026',
    variant: 'shipping' as const,
  },
  scope: [
    'AI/ML UX',
    'Systems Thinking',
    'Zero-to-One',
    'Cross-functional Leadership',
    'Technical Fluency',
  ],
  // ----------------------------
  // QUICK IMPACT OVERVIEW (Public)
  // ----------------------------
  // ----------------------------
  // PROJECT SNAPSHOT & DEEP DIVE DATA
  // ----------------------------
  projectSnapshot: {
    problem: 'Engineers struggled to train models without deep Python knowledge.',
    role: 'Lead Designer & Researcher',
    keyDecisions: [
      'Moving from 12-step code to 4-step wizard',
      'Implementing "Dual Experience" (Guided vs Advanced)',
      'Visualizing confusion matrix for non-statisticians',
    ],
    impactDirectional: 'Reduced 12-step coding task to a 4-step visual wizard.',
    status: 'Shipping 2026',
  },
  challengeDeconstruction: {
    assumptions: [
      'Users know what "hyperparameters" are.',
      'Business analysts can code in Python.',
      'Errors should be technical stack traces.',
    ],
    unknowns: [
      'Which ML algorithms are most used?',
      'How much customization do business users actually need?',
      'Can we abstract the backend without breaking flexibility?',
    ],
    constraints: [
      'Cannot rewrite the underlying ML engine (Python based).',
      'Must support legacy "Advanced Mode" for data scientists.',
      'Limited frontend engineering resources.',
    ],
    businessGoal: 'Democratize ML training for non-technical business analysts.',
  },
  successCriteria: {
    baseline: '12+ clicks, requires Python knowledge, high error rate.',
    target: '<10 clicks, no coding required, guided error handling.',
    result: '7-9 clicks, zero code, 5/5 success rate in usability testing.',
    disclaimer: 'Results based on internal usability testing with 5 SMEs.',
  },
  keyDecisions: [
    {
      decision: 'Implement "Dual Experience" Mode',
      rationale: 'Experts needed control; novices needed guidance. One UI couldn\'t serve both.',
      tradeoff: 'Double the maintenance for two distinct flows.',
      rejectedOption: 'Force everyone into the "Simple" Wizard',
    },
    {
      decision: 'Linear 4-Step Wizard',
      rationale: 'Broke complex ML training into digestable chunks: Type -> Target -> Predictors -> Params.',
      tradeoff: 'Less flexibility to jump around steps.',
      rejectedOption: 'Single-page "Dashboard" Configuration',
    },
    {
      decision: 'Visual Confusion Matrix',
      rationale: 'Standard tables were unreadable to non-data scientists.',
      tradeoff: 'High engineering effort to build custom visualization.',
      rejectedOption: 'Standard Numerical Table',
    },
  ],
  researchDecisionMap: [
    {
      insight: 'Users didn\'t know which algorithm to pick.',
      evidence: 'Usability tests showed hesitation at "Select Algorithm".',
      decision: 'Added "Auto-Select" based on data type analysis.',
      feature: 'Smart Defaults',
    },
    {
      insight: 'Error messages like "Error 500" were useless.',
      evidence: 'Users abandoned tasks upon first error.',
      decision: 'Translated backend errors into "Try changing [X]" suggestions.',
      feature: 'Human-Readable Error Layer',
    },
  ],
  competitiveResponse: {
    marketGap: 'DataRobot and H2O.ai are powerful but too complex for ad-hoc business users.',
    response: 'Built a "Lightweight ML" experience embedded directly in their BI tool.',
    evidenceSource: 'Competitor teardowns of DataRobot/H2O.',
  },
  businessImpactDirectional: {
    bullets: [
      'Reduced training time from ~20 mins to ~5 mins (directional).',
      'Enabled non-technical users to build valid models.',
      'Zero dead-end errors in final usability testing.',
    ],
    disclaimer: 'Impact metrics are based on pre-release usability testing and time-on-task measurements.',
  },
  ownership: {
    ownedFeatures: [
      '4-Step Training Wizard',
      'Confusion Matrix Visualization',
      'Smart Defaults Logic',
      'Error Handling Layer',
      'Dual-Mode Toggle',
    ],
    excludedFeatures: [
      'Python Backend Execution',
      'Algorithm Implementation',
    ],
  },
  presentation: {
    slides: [
      {
        type: 'title',
        title: 'Democratizing Machine Learning',
        content: ['Anuja — Senior Product Designer', 'Secondary Case Study'],
        image: '/images/case-study/ml-functions/ml-functions-cover.png',
      },
      {
        type: 'problem',
        title: 'The "Black Box" Problem',
        content: [
          'ML was reserved for data scientists.',
          'Required Python scripting.',
          '12+ steps to train a simple model.',
          'Opaque error messages.',
        ],
      },
      {
        type: 'research',
        title: 'Bridging the Gap',
        content: [
          'Earned MIT Certification to understand the domain.',
          'Embedded with Principal Data Scientist.',
          'Identified the "Dual Persona" need.',
        ],
        image: '/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png',
      },
      {
        type: 'decision',
        title: 'Key Design Decisions',
        content: [
          'Dual Experience: Wizard vs Advanced.',
          'Linear 4-Step Flow.',
          'Visual Confusion Matrix.',
        ],
      },
      {
        type: 'execution',
        title: 'The Guided Solution',
        content: [
          'Step 1: Define Problem.',
          'Step 2: select Target.',
          'Step 3: Choose Predictors.',
          'Step 4: Tune Parameters.',
        ],
        image: '/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png',
      },
      {
        type: 'impact',
        title: 'Impact & Validation',
        content: [
          '5/5 SMEs succeeded without help.',
          'Reduced clicks from 12+ to 7-9.',
          'Validated by Principal Data Scientist.',
          'Shipping 2026.',
        ],
      },
    ],
  },
  bonusSlides: {
    title: 'Deep Dives',
    slides: [
      {
        title: 'Confusion Matrix iteration',
        image: '/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png',
        description: 'Evolution of the model performance visualization.',
      },
    ],
  },

  quickOverview: {
    title: 'Democratizing ML — Quick Impact Overview',
    subtitle: 'Predictive analytics for non-technical users',
    leadershipSummary: 'Led ML Functions alongside ReportCaster and IQ Plugin. Weekly sessions with our Principal Data Scientist for months — learned the domain before touching design. Guided engineering through implementation due to limited front-end resources.',
    whatTheSystemWas:
      'The existing workflow was fragmented — hyperparameters hidden behind right-click menus, confusing error messages, and no clear path from start to finish. It worked for experts, but it wasn\'t accessible to the broader user base.',
    myRole:
      'I took this from ambiguity to a design-ready 4-step workflow. End-to-end ownership, from learning the domain to shipping the design.',
    scopeOfPractice: [],
    credentials: 'Professional Certificate in Product Design for AI & ML — MIT, Boston',
    impactMetrics: [
      {
        label: 'Clicks reduced',
        value: '12+ → 7-9',
      },
      {
        label: 'SME discoverability',
        value: '5/5 found entry without help',
      },
      {
        label: 'Error handling',
        value: 'Dead-ends → clear guidance',
      },
      {
        label: 'Entry point',
        value: '2-click access',
      },
    ],
    star: {
      situation: 'A fragmented ML training workflow with 12+ clicks, hidden hyperparameters, and dead-end error states. It worked for data scientists but wasn\'t accessible to business users.',
      task: 'Make machine learning accessible to non-technical users without dumbing it down for experts.',
      action: 'Got MIT certified in AI/ML product design. Embedded weekly with the Principal Data Scientist for months. Navigated 2-year timeline through engineering delays and layoffs. Hands-on with engineering due to limited front-end resources.',
      result: 'Reduced workflow from 12+ clicks to 7-9. All five SMEs found the entry point without help. Our Principal Data Scientist called the confusion matrix "the best screen in the entire UX revamp."',
    },
    technologies: [],
    keyAchievements: [
      '12+ clicks → 7-9 clicks for ML workflow',
      '5/5 SMEs found entry point without help',
      'Zero ML background → MIT certified',
      '"The best screen in the entire UX revamp" — Principal Data Scientist on confusion matrix',
      'Dual-experience approach (guided + advanced)',
      'Patterns became foundation for IQ Plugin',
    ],
    dataSheetUrl: 'https://www.ibi.com/content/dam/ibi/documents/data-sheet/ibi-webFOCUS-integrated-data-science-data-sheet.pdf',
    dataSheetLabel: 'View ML Functions Data Sheet',
    demoVideoUrl: 'https://www.youtube.com/watch?v=VWxMJ0E5aL0',
    demoVideoLabel: 'Old UI Public Demo',
    validationLinks: [
      {
        url: 'https://www.ibi.com/press-releases/2023/ibi-webfocus-92-addresses-the-industry-push-for-modern-business-intelligence-cloud-and-user',
        label: 'WebFOCUS 9.2 Press Release',
      },
      {
        url: 'https://community.ibi.com/articles/using-machine-learning-functions-in-webfocus-r27141/',
        label: 'ML Functions Article',
      },
      {
        url: 'https://www.ibi.com/resources/november-vug-elevate-your-analytics-game-with-dsml-and-webfocus',
        label: 'DSML Webinar',
      },
    ],
  },
  // ----------------------------
  // VERSION TIMELINE
  // ----------------------------
  // No version timeline for ML Functions case study
  versionTimeline: [],
  // ----------------------------
  // UX PRINCIPLES (Public)
  // ----------------------------
  uxPrinciples: {
    title: 'Design Principles Applied',
    principles: [
      { title: 'Explainability First', description: '' },
      { title: 'Linear Flow (No Branching)', description: '' },
      { title: 'Upstream Validation', description: '' },
      { title: 'System State Visibility', description: '' },
      { title: 'Progressive Disclosure', description: '' },
      { title: 'Dual Experience (Guided + Advanced)', description: '' },
    ],
  },
  // ----------------------------
  // SECTIONS (6 sections mapped to D.E.S.I.G.N. Framework)
  // ----------------------------
  sections: [
    {
      id: 'section-01',
      index: 'D',
      title: 'Discover Deeply: How I Earned the Project',
      summary: 'Turned a knowledge gap into an advantage. MIT certified. Months learning before designing.',
      body: `Zero ML background could have been a liability — instead, it became an advantage. I enrolled in MIT's AI/ML product design certification and embedded weekly with our Principal Data Scientist.

By the time I started designing, I understood the domain deeply enough to challenge assumptions and ask the right questions.`,
    },
    {
      id: 'section-02',
      index: 'E',
      title: 'Empathize with the Ecosystem: Understanding Users and Workflows',
      summary: 'Three personas with conflicting needs. The existing experience served none of them well.',
      body: `Three personas. Three different needs: data scientists wanted depth and control over hyperparameters, business users wanted simplicity and guidance, analysts wanted both. The existing experience served none of them well.

After documenting every workflow and decision point, I realized: if I find this frustrating after weeks of study, a first-time user has no chance. That insight drove the redesign.`,
    },
    {
      id: 'section-03',
      index: 'S',
      title: 'Simplify the Chaos: From Black Box to Guided Flow',
      summary: 'Designed a structured 4-step guided flow: Problem Type → Target → Predictors → Hyperparameters.',
      body: `The mapping revealed the problems, but solving them required multiple iterations. Three critical pivots shaped the final design.

Breakthrough: I asked our Principal Data Scientist, "What do you absolutely need to train a model responsibly?" His answer: problem type, target variable, predictors, and hyperparameters. That became the 4-step UX spine — a linear flow that made ML accessible without dumbing it down.`,
    },
    {
      id: 'section-04',
      index: 'I',
      title: 'Iterate with Inclusion: Balancing Control with Simplicity',
      summary: '10+ iterations on the confusion matrix. Productive tension with Data Science → best screen in the project.',
      body: `Led cross-functional alignment across Product, Engineering, and Data Science. Weekly syncs. Shared Figma. Screen-reviewed design reviews.

The confusion matrix screen alone went through 10+ iterations. Our Principal Data Scientist pushed for advanced metrics; I pushed for clarity. That productive tension produced what he called "the best screen in the entire UX revamp."

**What I'd do differently:** Earlier, cleaner alignment with our Data Scientist. He surfaced insights late in the process that were harder to incorporate — some we did, but it cost us time.`,
    },
    {
      id: 'section-05',
      index: 'G',
      title: 'Grow Through Constraints: Earning Trust & Leading the Team',
      summary: 'Dual-experience approach emerged from constraints. Led this while simultaneously owning ReportCaster and IQ Plugin.',
      body: `The dual-experience approach emerged from engineering constraints. We couldn't rebuild the advanced mode — it had to coexist with the new guided flow. What felt like a limitation became a feature: experts got their power, newcomers got guidance.

I led this while simultaneously owning ReportCaster and IQ Plugin. Cross-project pattern sharing meant solutions in one project accelerated the others.`,
    },
    {
      id: 'section-06',
      index: 'N',
      title: 'Navigate Forward: Impact, Validation, and Reflection',
      summary: '5/5 SMEs found entry without help. Patterns became foundation for IQ Plugin and platform-wide AI strategy.',
      body: `5/5 SMEs found the entry point without help. Dead-ends → clear guidance. Design demos to 150-200 person business unit earned leadership support.

The patterns I developed here — structured flows, upstream validation, right-click entry, dual-experience — became the foundation for IQ Plugin and platform-wide AI strategy.`,
    },
  ],
  // ----------------------------
  // PROTOTYPE (placeholder URLs)
  // ----------------------------
  prototypeMedia: {
    title: 'Transformation in Motion',
    description:
      'See the transformation unfold in real-time. Compare the old fragmented workflow with the new guided design side-by-side.',
    // Before/After video comparison
    beforeAfter: {
      before: {
        title: 'Legacy ML Workflow',
        // Public YouTube video - old workflow is public (still current, new workflow hasn't launched yet)
        videoEmbedUrl: 'https://www.youtube.com/embed/VWxMJ0E5aL0', // Public demo of current ML Functions UI
        videoUrl: '/videos/ml-old-workflow.mp4', // Fallback if videoEmbedUrl not provided
        videoPoster: '/images/case-study/ml-functions/ml-old-workflow-poster.jpg',
        description: 'The old fragmented workflow: 4+ step path, drag model pill onto data flow, configure in popup, hidden hyperparameters, confusing "results not generated" errors.',
      },
      after: {
        title: 'New Guided Workflow',
        videoUrl: '/videos/ml-prototype-walkthrough.mp4',
        videoPoster: '/images/case-study/ml-functions/ml-prototype-poster.jpg',
        description: 'The new guided workflow: structured step-by-step flow, right-click entry, clear error handling, reduced from 12+ clicks to 7-9 clicks.',
        sensitive: true, // Unreleased feature - new ML UI
      },
      comparisonNotes: {
        before: [
          'Fragmented 4+ step workflow',
          '12+ clicks through data flows and menus',
          'Hidden hyperparameters behind right-click',
          'Confusing "results not generated" errors',
        ],
        after: [
          'Structured 4-step guided flow',
          '7-9 clicks via right-click entry',
          'Clear error handling and validation',
          'Accessible for non-technical users',
        ],
      },
    },
    // Fallback single video if beforeAfter not available
    videoUrl: '/videos/ml-prototype-walkthrough.mp4',
    videoPoster: '/images/case-study/ml-functions/ml-prototype-poster.jpg',
  },
  // ----------------------------
  // D.E.S.I.G.N. FRAMEWORK CONNECTION
  // ----------------------------
  frameworkConnection: {
    principles: [
      {
        letter: 'D',
        title: 'Discover Deeply',
        description: 'Zero ML background → MIT certified. Months embedded with our Principal Data Scientist before designing.',
      },
      {
        letter: 'E',
        title: 'Empathize with the Ecosystem',
        description: 'Three personas with conflicting needs: data scientists wanted depth, business users wanted simplicity, analysts wanted both.',
      },
      {
        letter: 'S',
        title: 'Simplify the Chaos',
        description: '12+ clicks → 7-9. Fragmented workflow → structured 4-step flow. Dead-ends → clear error guidance.',
      },
      {
        letter: 'I',
        title: 'Iterate with Inclusion',
        description: '10+ iterations on the confusion matrix. Our Principal Data Scientist called it "the best screen in the entire UX revamp."',
      },
      {
        letter: 'G',
        title: 'Grow Through Constraints',
        description: 'Engineering constraint: couldn\'t rebuild advanced mode. Solution: dual-experience (guided + advanced) that served both personas.',
      },
      {
        letter: 'N',
        title: 'Navigate Forward',
        description: 'All five SMEs found the entry point without help. The patterns I developed here scaled to the IQ Plugin and platform-wide AI strategy.',
      },
    ],
  },
  // ----------------------------
  // IMPACT SUMMARY
  // ----------------------------
  impactSummary: {
    heading: 'Pre-launch impact at a glance',
    bullets: [
      '12+ clicks → 7-9 clicks for ML workflow',
      '5/5 SMEs found entry point without help',
      'Dead-ends → clear error guidance',
      'Confusion matrix: "the best screen in the entire UX revamp"',
      'Patterns became foundation for IQ Plugin',
    ],
  },
  // ----------------------------
  // FINAL SUMMARY - Removed (duplicates impactSummary)
  // ----------------------------
  finalSummary: undefined,
}
