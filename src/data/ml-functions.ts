import { CaseStudyData } from '@/types/caseStudy'

export const mlFunctionsCaseStudy: CaseStudyData = {
  slug: 'ml-functions',
  // Blueprint Hero - Architect Design System
  heroTitle: 'Nobody Could Use Our ML Engine.',
  heroSubheading: 'A multi-million dollar ML engine with zero adoption. 15 clicks through data flow canvases and cascading menus. Business users couldn\'t touch it.',
  heroSubtitle:
    'I turned it into a 4-step guided workflow. Got MIT certified to earn credibility with the data science team. 4 out of 4 SMEs completed it without help — and the right-click entry pattern was adopted across 3 AI features.',
  coverImage: {
    src: '/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png',
    alt: 'ML Functions Confusion Matrix - Model Performance Visualization',
  },
  role: 'Lead Product Designer (End-to-End Ownership)',
  company: 'Cloud Software Group — WebFOCUS',
  timeframe: 'Jan 2023 – Jan 2025',
  status: {
    label: 'Implemented — Final QA Pending',
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
    problem: 'The UX was a complete liability. A powerful, multi-million dollar ML engine was buried in a data flow canvas — click the plus menu, open a data flow, drag a dataset, drag a model pill, hit a hidden play button, right-click for cascading context menus. 12 to 15 clicks minimum. Nobody used it.',
    role: 'Lead Designer & Researcher (End-to-End Ownership)',
    keyDecisions: [
      'Created a Predict Data landing page from scratch — none existed',
      'Designed one unified path serving both novices and data scientists — not two separate modes',
      'Rebuilt the confusion matrix into an interactive, visual experience',
    ],
    impactDirectional: 'Turned a zero-adoption ML engine into a guided workflow that four SMEs blazed through without help.',
    status: 'Implemented — Final QA pending at departure',
  },
  challengeDeconstruction: {
    assumptions: [
      'Business analysts understand data flow canvases and cascading menus.',
      'Users know what hyperparameters, binary classification, and regression mean.',
      'A red exclamation mark saying "No results generated" is acceptable feedback.',
    ],
    unknowns: [
      'How do we abstract complex algorithms without losing power for data scientists?',
      'Can one path serve both a novice who\'s never touched ML and a Principal Data Scientist?',
    ],
    constraints: [
      'Cannot rewrite the underlying ML engine (Python based).',
      'Must work within WebFOCUS\'s modal/popup architecture.',
      'Extremely limited frontend engineering resources.',
    ],
    businessGoal: 'Drive adoption and defend our market position by making ML accessible to business users who\'d never touched a model before.',
  },
  successCriteria: {
    baseline: '~15 clicks through data flow canvas, cascading context menus, "No results generated" dead-ends.',
    target: 'Right-click entry, guided flow, zero dead-ends.',
    result: '2 clicks to start, 4-step wizard, 4/4 SMEs completed without help.',
    disclaimer: 'Results based on internal usability testing with 4 SMEs.',
  },
  keyDecisions: [
    {
      decision: 'One Unified Path (Not Two Separate Modes)',
      rationale: 'The principal data scientist asked if I was "trying to make this dumb." I wasn\'t. One path that serves a dual purpose — not dumbed down, not over-engineered. Every step had context, definitions, and tooltips. The sophistication was there; it just waited for you to ask for it.',
      tradeoff: 'Had to design each step to be legible for novices AND useful for data scientists simultaneously.',
      rejectedOption: 'Two completely separate experiences (guided vs. advanced)',
    },
    {
      decision: 'Popup Wizard (Not Full-Screen)',
      rationale: 'I tried full-screen views, side-step layouts, two-column layouts. The popup won because WebFOCUS loved modals — all engineers lived in popups. It gave breathing room for helper text and definitions.',
      tradeoff: 'Less screen real estate for complex forms.',
      rejectedOption: 'Full-screen wizard with dedicated navigation',
    },
    {
      decision: 'Interactive Confusion Matrix',
      rationale: 'I aligned the threshold slider directly under the chart point — exactly 90 degrees parallel. As you drag it, the dot on the line chart moves with it. No way to miss the relationship.',
      tradeoff: 'Dozens of sessions with the data scientist to understand every interaction on every chart before I could design it.',
      rejectedOption: 'Standard numerical table',
    },
  ],
  researchDecisionMap: [
    {
      insight: 'Users didn\'t know which algorithm to pick or what "hyperparameters" meant.',
      evidence: 'I couldn\'t figure it out after weeks of study. If I find this frustrating, a first-time user has no chance.',
      decision: 'Added contextual definitions at every step. Problem type, target, predictors — each explained in plain language.',
      feature: 'Contextual Education',
    },
    {
      insight: 'Chart colors didn\'t mean anything — four different colors with no purpose.',
      evidence: 'Working sessions with the data scientist. I said: "Your goal is to show F1 scores. Adding colors makes it more confusing."',
      decision: 'Simplified to meaningful colors only. Won that conversation because I\'d finally understood what the chart was showing.',
      feature: 'Visual Clarity',
    },
  ],
  competitiveResponse: {
    marketGap: 'DataRobot and H2O.ai are powerful but too complex for ad-hoc business users.',
    response: 'Built a guided ML experience embedded directly in their BI tool — right-click a dataset and you\'re in.',
    evidenceSource: 'Competitor teardowns of DataRobot/H2O.',
  },
  businessImpactDirectional: {
    bullets: [
      '4/4 SMEs completed the workflow without assistance.',
      'Right-click entry pattern extended to Generate Insights and Ask a Question.',
      'Design director learned ML from this workflow — he could do it.',
    ],
    disclaimer: 'Impact metrics are based on pre-release usability testing with 4 SMEs.',
  },
  ownership: {
    ownedFeatures: [
      '4-Step Training Wizard',
      'Predict Data Landing Page (designed from scratch)',
      'Confusion Matrix Interactive Visualization',
      'Right-click Entry Point Pattern',
      'Model Card Display System',
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
        title: 'Nobody Could Use Our ML Engine.',
        content: ['Anuja Harsha — Senior Product Designer', 'ML Functions Case Study'],
        image: '/images/case-study/ml-functions/ml-functions-cover.webp',
      },
      {
        type: 'title',
        layout: 'center',
        title: 'Executive Summary',
        content: [
          'Situation: A powerful ML engine with zero adoption — buried in a data flow canvas, 12-15 clicks, confusing error states.',
          'Action: I earned the trust to own this through a small explainability project. Got MIT certified. Designed a 4-step guided workflow with one path serving both novices and data scientists.',
          'Result: 4/4 SMEs blazed through it without help. Right-click entry pattern adopted for other AI features.',
        ],
        signal: 'EXECUTIVE SUMMARY',
      },
      {
        type: 'problem',
        layout: 'split',
        title: 'The UX Was a Complete Liability.',
        content: [
          'Click the plus menu, open a data flow, drag a dataset, drag a model pill.',
          'Hit a hidden play button. Right-click for cascading context menus.',
          '"No results generated." 12-15 clicks minimum. Nobody used it.',
        ],
        image: '/images/case-study/ml-functions/Legacy Train Model UI.png',
        signal: 'CONSTRAINT: LEGACY DEBT',
      },
      {
        type: 'research',
        title: 'I Didn\'t Design It Blindly.',
        content: [
          'Got MIT certified because the work outgrew surface-level understanding.',
          'Weekly sessions with the principal data scientist. I validated my understanding constantly.',
          'If I found this frustrating after weeks of study, a first-time user had no chance.',
        ],
        signal: 'EVIDENCE: DOMAIN MASTERY',
      },
      {
        type: 'execution',
        title: 'One Path. Not Two Experiences.',
        content: [
          'Step 1: Select Problem Type.',
          'Step 2: Specify Target Variable.',
          'Step 3: Choose Predictors.',
          'Step 4: Configure Hyperparameters.',
        ],
        image: '/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png',
        signal: 'STRATEGY: UNIFIED PATH',
      },
      {
        type: 'decision',
        title: 'Why Don\'t We Have a Landing Page Here?',
        content: [
          'No Predict Data landing page existed. I designed it from scratch.',
          'Tried combining Train and Run. Engineering pushed back. Tab split became the answer.',
          'Right-click entry: capitalizing on the most common user behavior in the product.',
        ],
        notes: 'The popup wizard won because WebFOCUS loved modals. It gave breathing room for helper text. Sometimes the best design move is the one that doesn\'t ask the legacy product to become something it isn\'t.',
        signal: 'DECISION: ARCHITECTURE',
      },
      {
        type: 'execution',
        title: 'The Most Complex Screen I\'ve Ever Designed.',
        content: [
          'Confusion matrix: two charts, a threshold slider, a four-by-three table.',
          'Threshold slider and chart point: exactly 90 degrees parallel.',
          'A dozen sessions with the data scientist — paper, pen, sketching live inside my design software.',
        ],
        signal: 'CRAFT: CONFUSION MATRIX',
      },
      {
        type: 'impact',
        layout: 'full',
        title: 'They Just Blazed Through It.',
        content: [
          '4/4 SMEs completed the workflow without help.',
          '"The best screen in the entire UX revamp." — the principal data scientist said it out loud, in front of everyone.',
          'Right-click entry pattern adopted for Generate Insights and Ask a Question.',
        ],
        image: '/images/case-study/ml-functions/ml-functions-reflections.jpg',
        signal: 'OUTCOME: 4/4 VALIDATED',
      },
      {
        type: 'lesson',
        title: 'What a Mind-Bending Project.',
        content: [
          'ML taught me product partnership. My PM and I co-owned the direction.',
          'I fought for every decision with logic, research, and documentation.',
          'I only fully realized I was shaping the entire product experience after getting laid off.',
        ],
        signal: 'RETROSPECTIVE',
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
    title: 'ML Functions — Nobody Could Use Our ML Engine',
    subtitle: 'From zero ML knowledge to owning the entire ML UX revamp',
    leadershipSummary: 'Our data scientist gave me a small explainability project. I didn\'t design it blindly — I dug in, asked questions, understood the entire upstream workflow. That earned the trust to own the full ML revamp. I led this alongside ReportCaster and IQ Plugin, managing multiple teams simultaneously.',
    whatTheSystemWas:
      'The UX was a complete liability. A powerful, multi-million dollar ML engine that nobody used. Click the plus menu, open a data flow, drag a dataset, drag a model pill, hit a hidden play button, right-click for cascading context menus — 12 to 15 clicks minimum. A red exclamation mark saying "No results generated." To business analysts, it was a complete black box.',
    myRole:
      'End-to-end ownership. I earned the project through a side challenge, got MIT certified because the work outgrew surface-level understanding, designed the 4-step guided workflow, and fought for every decision with logic, research, and documentation.',
    scopeOfPractice: [],
    credentials: 'Professional Certificate in Product Design for AI & ML — MIT, Boston',
    impactMetrics: [
      {
        label: 'SME Validation',
        value: '4/4 completed without help',
      },
      {
        label: 'Entry Point',
        value: '~6 clicks to start → 2-click right-click entry',
      },
      {
        label: 'Workflow',
        value: 'Data flow canvas → 4-step wizard',
      },
      {
        label: 'Pattern Adoption',
        value: 'Right-click entry extended to 3 AI features',
      },
    ],
    star: {
      situation: 'Zero adoption. A powerful ML engine buried in a data flow canvas — 12-15 clicks, cascading context menus, confusing error states. Our business users couldn\'t touch it. Massive sunk cost.',
      task: 'Turn the black box into something a business analyst could use, while keeping it useful for our Principal Data Scientist. One path, not two separate experiences.',
      action: 'Earned the project through a small explainability challenge. Got MIT certified because the work outgrew surface-level understanding. Designed a 4-step popup wizard with contextual education at every step. Sat with the data scientist for dozens of sessions to understand every interaction on the confusion matrix before designing it. Fought to keep Data Flow out of the view when it was brought back. Won.',
      result: '4/4 SMEs blazed through the workflow without help. The principal data scientist called the confusion matrix "the best screen in the entire UX revamp" — out loud, in front of everyone. The right-click entry pattern I designed was adopted for Generate Insights and Ask a Question.',
    },
    technologies: [],
    keyAchievements: [
      '~6 clicks to start training → reduced to 2-click entry (right-click → Predict Data)',
      '4/4 SMEs completed the workflow without assistance',
      'Zero ML background → MIT certified (paid for it myself)',
      '"The best screen in the entire UX revamp" — the principal data scientist, in front of the whole team',
      'Created the Predict Data landing page from scratch — no entry point existed',
      'Replaced dense model tables with scannable model cards',
      'Tab split negotiation — balancing UX clarity with engineering constraints',
      'One unified path serving both personas — not two separate modes',
      'Right-click entry pattern adopted for other AI features',
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
      { title: 'Explainability First', description: 'I couldn\'t make sense of the confusion matrix when I first saw it. So I sat with the data scientist for a dozen sessions until I understood every interaction. If I can explain it visually, anyone can understand it. He called it "the best screen in the entire UX revamp."' },
      { title: 'Linear Flow (No Branching)', description: 'Problem Type → Target → Predictors → Hyperparameters. The foundation was staring at me in my face. Four things you need to train a model. That became the spine. No branching, no hidden paths.' },
      { title: 'Evidence-Backed Decisions', description: 'I could never just say "I designed this because I felt like it." Design instincts don\'t mean anything if you don\'t have the evidence to back them up. Every pushback forced me to find industry research, existing WebFOCUS behavior, or documentation.' },
      { title: 'Contextual Education', description: 'Every step had definitions, tooltips, explanations. Not a dumbed-down UI — an educated one. The sophistication was there; it just waited for you to ask for it.' },
      { title: 'Right-click Entry', description: 'In WebFOCUS, right-click is like religion. Everything is right-clickable. So putting "Predict Data" in the right-click menu was capitalizing on the most common user behavior in the product. That wasn\'t a UX tweak. That was adoption thinking.' },
      { title: 'One Path, Dual Purpose', description: 'We did not have two experiences. We had one path that serves both new users and data scientists. Not easy enough that they\'d say "this is spoon feeding," but clear enough that someone with zero ML background could use it.' },
    ],
  },
  // ----------------------------
  // SECTIONS (6 Acts — Cinematic Case Study)
  // ----------------------------
  sections: [
    {
      id: 'section-01',
      index: 'I',
      title: 'A Side Project Earned Me the Whole Thing',
      summary: 'I started with a tiny request: an explainability popup. Instead of designing it blindly, I mapped the entire upstream ML workflow.',
      body: `Our Principal Data Scientist showed me a screenshot from another tool and said, "I want this in WebFOCUS." It was a simple request for an explainability popup.

I could have just designed the UI component and handed it back. Instead, I did a lot of digging. I asked questions, built context, and mapped out exactly why the popup was needed and how it fit into the broader system architecture.

![Native explainability — where it all started](/images/case-study/ml-functions/6.%20Run%20Model%20-%20Explainability%20Popup.png)

He was shocked that I took the effort to understand the entire upstream workflow before touching a single design. That curiosity earned me the trust to completely redesign the multi-million dollar ML platform.`,
    },
    {
      id: 'section-02',
      index: 'II',
      title: 'One Path. Not Two Experiences.',
      summary: 'Data scientists wanted depth. I wanted simplicity. We landed on one workflow that served both—not dumbed down, not over-engineered.',
      body: `The principal data scientist asked me early on, "Are you trying to make this dumb?" No. I wasn't removing sophistication. I was making the sophistication legible.

We didn't need two separate experiences. We needed one path that served both business analysts and experts. Every step provided contextual education—definitions, explanations, and tooltips. The sophistication was there; it just waited for you to ask for it.

> To bridge the massive knowledge gap, I began doing weekly deep dives with the data scientist. I then used an MIT certification course in AI/ML as an accelerator to build foundational knowledge. Those two things combined allowed me to have smarter, faster, and highly technical conversations with engineering.

**Sketchbook Sessions & Wireframes**
![Sketchbook session notes 1](/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_01_Image_0001.jpg)
![Sketchbook session notes 2](/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_02_Image_0001.jpg)
![Sketchbook session notes 3](/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_03_Image_0001.jpg)
![Initial hand-drawn wireframes](/images/case-study/ml-functions/Machine%20learning%20functions-handdrawn-wireframes.png)

**Architecture & Layout**
![Full workflow mapping](/images/case-study/ml-functions/entire%20ML%20workflow%20flowchart.png)
![All model types architecture](/images/case-study/ml-functions/all%20model%20types%20architecture%20map.png)
![12 column grid layout](/images/case-study/ml-functions/12%20Column%20Grid%20for%20the%20Step%20Workflow.png)
![High-fidelity UI Structure](/images/case-study/ml-functions/1.%20ML%20UI%20Structure.png)

Every session with the data scientist was enlightening. He loved machine learning. I loved user experience. That mutual passion is why the partnership worked.`,
    },
    {
      id: 'section-03',
      index: 'III',
      title: 'Why Don\'t We Have a Landing Page Here?',
      summary: 'There was no entry point to the system. I designed a Predict Data landing page from scratch, capitalizing on existing user behaviors.',
      body: `The moment I saw the legacy workflow, my first instinct was structural: *why don't we have a landing page here?* Why couldn't users select data themselves? I designed the Predict Data hub from scratch.

I initially tried combining "Train" and "Run" on the same display, but engineering pushed back—it was too complex to maintain in the codebase. So we split them into two tabs. That negotiation balanced UX ambition with technical reality.

The model display was another breakthrough. Dense tables made comparison impossible for non-experts. I introduced model cards instead, where each model gets its own card with the key details needed for an informed decision.

In WebFOCUS, right-clicking is religion. Everything is right-clickable. So putting "Predict Data" in the right-click menu capitalized on the most common user behavior in the product. It was such a success that we later extended the pattern to "Generate Insights" and "Ask a Question."

![Right-click +Data button](/images/case-study/ml-functions/Launch%20ML%20from%20the%20HUB%20-%20right%20click%20+Data%20button.png)
![Right-click dataset](/images/case-study/ml-functions/Launch%20ML%20from%20the%20HUB%20-%20right%20click%20dataset.png)
![Right-click folder](/images/case-study/ml-functions/Launch%20ML%20from%20the%20HUB%20-%20right%20click%20folder.png)
![Initial workflow mapping](/images/case-study/ml-functions/ML%20functions%20inital%20workflow.png)

The 4-step wizard practically designed itself: Problem Type, Target Variable, Predictors, and Hyperparameters. The foundation was staring me in the face.`,
    },
    {
      id: 'act-4-craft',
      index: 'IV',
      title: 'The Most Complex Screen I\'ve Ever Designed',
      summary: 'The confusion matrix featured two charts, a threshold slider, and a 4x3 table. I sketched live with the data scientist until the relationship became undeniable.',
      body: `The confusion matrix screen was incredibly dense: two charts, a threshold slider, and a four-by-three table. When I first saw it, it looked like a wall of noise. I sat with the data scientist for dozens of sessions—paper, pen, and live sketching—until I grasped every interaction.

![Threshold slider and chart point: exactly 90° parallel.](/images/case-study/ml-functions/11.%20Train%20Model%20Workflow%20-%20Confusion%20Matrix.png)

**The Guided 4-Step Workflow**
![Entry point: Empty state](/images/case-study/ml-functions/1. Predict Data - Train Models - Empty State.png)
![Step 1: Select Problem Type](/images/case-study/ml-functions/4. Train Model Workflow - Step 1 - Select Problem Type.png)
![Step 2: Specify Problem Details](/images/case-study/ml-functions/5. Train Model Workflow - Step 2 - Specify Problem.png)
![Step 3: Select Predictors](/images/case-study/ml-functions/6. Train Model Workflow - Step 3 - Select Predictors.png)
![Step 4: Configure Hyperparameters](/images/case-study/ml-functions/7. Train Model Workflow - Step 4 - Configure Hyperparameters.png)
![Compare Models](/images/case-study/ml-functions/8. Train Model Workflow - Compare Models.png)

**The Confusion Matrix**
The breakthrough came when I aligned the threshold slider directly under the chart point that moved—exactly 90 degrees parallel. As you drag the slider, the dot on the line chart moves with it. The relationship became undeniable. After understanding every technical interaction, I was finally able to explain it visually.

![ROC / Precision curves](/images/case-study/ml-functions/10.%20Binary%20Classfication%20-%20ROC%20Precision.png)`,
    },
    {
      id: 'act-5-execution',
      index: 'V',
      title: 'Defending the Experience: Data Over Opinions',
      summary: 'When legacy constraints threatened the new workflow, I held my ground against engineering directors using research and documentation.',
      body: `I was managing two massive platform teams simultaneously, and after layoffs, I absorbed four systems. I built a mental model of WebFOCUS as an end-to-end ecosystem: get data, prepare data, train ML, visualize, and distribute. Nobody explained that to me. I built that understanding by touching every corner of the platform.

> When the data scientist tried to bring Data Flow canvases back into the UI, I pushed back. In a room with two engineering directors and the principal data scientist, I used user research and session recordings to prove why reverting to the old canvas would break the workflow. We committed to the new direction, and the results spoke for themselves.`,
    },
    {
      id: 'act-6-reflection',
      index: 'VI',
      title: 'They Just Blazed Through It',
      summary: '4/4 SMEs completed the workflow without help. My design director—who knew nothing about ML—learned the system purely by using this workflow.',
      body: `During validation, I tested the flow with four Subject Matter Experts. I gave them one instruction: "It starts from the dataset." They right-clicked, hit 'Predict Data', and blazed through the 4-step wizard with zero assistance. Because it was that obvious.

The core four-step spine went completely untouched by feedback. Even my design director, who had no background in machine learning, was able to train a model. I essentially taught him machine learning through this UI.

ML Functions taught me the power of product partnership. My PM and I co-owned the direction, and I realized I was shaping the entire product experience.

What a mind-bending project.`,
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
        videoPoster: '/images/case-study/ml-functions/Legacy Train Model UI.png',
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
  // CINEMATIC ACTS CONNECTION
  // ----------------------------
  frameworkConnection: {
    principles: [
      {
        letter: 'I',
        title: 'A Side Project Earned Me the Whole Thing',
        description: 'Our data scientist gave me a small explainability project. I didn\'t design it blindly. That curiosity earned the trust to own the full ML revamp.',
      },
      {
        letter: 'II',
        title: 'One Path. Not Two Experiences.',
        description: 'The principal data scientist asked if I was making it dumb. No. One path serving a dual purpose. Every step had context, definitions, tooltips. The sophistication waited for you to ask for it.',
      },
      {
        letter: 'III',
        title: 'Why Don\'t We Have a Landing Page Here?',
        description: 'No entry point existed. Right-click entry, tab split, model cards, popup wizard — all invented from scratch.',
      },
      {
        letter: 'IV',
        title: 'The Most Complex Screen I\'ve Ever Designed',
        description: 'Dozens of sessions with the data scientist on the confusion matrix. Threshold slider and chart point: exactly 90 degrees parallel. "The best screen in the entire UX revamp."',
      },
      {
        letter: 'V',
        title: 'Defending the Experience: Data Over Opinions',
        description: 'Four systems after layoffs. Held my ground against Data Flow resurfacing. Won the room with recordings, notes, and documentation.',
      },
      {
        letter: 'VI',
        title: 'They Just Blazed Through It',
        description: 'Four SMEs. Separate sessions. Right-clicked, saw Predict Data, blazed through the whole thing. Because it was that obvious.',
      },
    ],
  },
  // ----------------------------
  // IMPACT SUMMARY
  // ----------------------------

  impactSummary: {
    heading: 'What a mind-bending project.',
    bullets: [
      '~6 clicks to start training → reduced to 2-click entry (right-click → Predict Data)',
      '4/4 SMEs blazed through the workflow without help',
      'Right-click entry pattern adopted for 3 AI features',
      '"The best screen in the entire UX revamp" — said out loud, in front of everyone',
      'Design director learned ML from this workflow — that was the real test',
    ],
  },
  reflection: {
    people: [
      {
        id: 'mh',
        name: 'Marcus Horbach',
        role: 'Principal Data Scientist',
        quote: 'The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive and has greatly contributed to the success of our products. Her design solutions are rooted in a deep understanding of the purpose of the product.',
        initials: 'MH'
      },
      {
        id: 'ag',
        name: 'Anita George',
        role: 'Principal Account Tech Strategist',
        quote: 'During a User Acceptance Test session, Anuja observed me navigating the screen. I was highly impressed with Anuja\'s approach. Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels.',
        initials: 'AG'
      }
    ],
    retrospective: {
      pushHarder: {
        title: 'Earlier Working Sessions with the Data Scientist',
        subtitle: 'Git_Diff: What I\'d Push Harder For',
        content: '<span class="text-amber-500/80">Live Brainstorming from Week One:</span> If I had started the live working sessions — paper, pen, sketching inside my design software on video calls — from week one instead of halfway through, we would have saved sprint cycles. Brainstorming together inside my tool, not as separate handoffs, was the breakthrough workflow.'
      },
      doNext: {
        title: 'Simplify Even Further',
        subtitle: 'Roadmap_v2: What I\'d Do Next',
        content: '<span class="text-[var(--accent-teal)]/80">There\'s always room for improvement:</span> Graying out incompatible models before users ever try them. Simplifying the results screen even more. Automatically letting users enter run model mode from training — no context tab switching. I pushed hard for what mattered. When technical constraints blocked something, that was technical reality, not lack of conviction.'
      }
    }
  },
  // ----------------------------
  // FINAL SUMMARY - Removed (duplicates impactSummary)
  // ----------------------------
  finalSummary: undefined,
}
