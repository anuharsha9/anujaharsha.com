export interface HighlightMetric {
  label: string
  value: string
}

export interface ScopeCard {
  tag: string
  tagColor: 'blue' | 'amber' | 'purple' | 'emerald'
  headline: string
  body: string
  icon: 'architect' | 'archaeologist' | 'strategist' | 'multiplier'
}

export interface QuickOverview {
  title: string
  subtitle: string
  leadershipSummary?: string // One-sentence leadership authority statement
  whatTheSystemWas: string
  myRole: string
  scopeOfPractice?: ScopeCard[]
  credentials?: string
  keyActions?: string[]
  impactMetrics: HighlightMetric[]
  // STAR format section (Situation, Task, Action, Result)
  star?: {
    situation: string
    task: string
    action: string
    result: string
  }
  // Technologies and tools used
  technologies?: string[]
  // Key achievements summary
  keyAchievements?: string[]
  publicDemoUrl?: string // Optional public demo link (e.g., for ReportCaster)
  publicDemoLabel?: string // Label for the demo button/link
  dataSheetUrl?: string // Optional data sheet link from ibi.com
  dataSheetLabel?: string // Label for the data sheet link
  demoVideoUrl?: string // Optional YouTube demo video URL (watch format)
  demoVideoLabel?: string // Label for the demo video button
  demoVideoUrl2?: string // Optional second YouTube demo video URL (watch format)
  demoVideoLabel2?: string // Label for the second demo video button
  oldUIDemoUrl?: string // Optional old UI demo URL (for comparison)
  validationLinks?: Array<{
    url: string
    label: string
  }> // Third-party proof links (blog posts, articles about the work)
}

export interface CaseStudySubsection {
  title: string
  description?: string
  quote?: {
    text: string
    attribution?: string
  }
  sensitive?: boolean // If true, entire subsection is sensitive
  images?: {
    src: string
    alt: string
    caption?: string
    fullWidth?: boolean
    sensitive?: boolean // Company-specific UI screenshots, flows, etc.
  }[]
  workflowPrototype?: {
    title: string
    description?: string
    workflowType: 'train' | 'run'
    steps: {
      number: number
      src: string
      alt: string
      caption: string
      description?: string
    }[]
  }
}

export interface CaseStudySection {
  id: string
  index: string // e.g. "01"
  title: string
  summary?: string // TL;DR for the section - 1-2 sentences
  methodologies?: string[] // e.g. ["User Research", "Competitive Analysis", "Prototyping"]
  body: string
  bullets?: string[]
  revealsTitle?: string
  revealsPoints?: string[]
  sensitive?: boolean // If true, entire section content is sensitive (rare - usually just images)
  images?: {
    src: string
    alt: string
    caption?: string
    fullWidth?: boolean
    sensitive?: boolean // Company-specific UI screenshots, flows, etc.
  }[]
  beforeAfter?: {
    before: {
      src: string
      alt: string
      caption?: string
      sensitive?: boolean
    }
    after: {
      src: string
      alt: string
      caption?: string
      sensitive?: boolean
    }
    beforeLabel?: string
    afterLabel?: string
    comparisonNotes?: string
  }
  subsections?: CaseStudySubsection[]
  workflowPrototype?: {
    title: string
    description?: string
    workflowType: 'train' | 'run'
    steps: {
      number: number
      src: string
      alt: string
      caption: string
      description?: string
    }[]
  }[]
  // For version-iteration section: nested V1, V2, V3 data
  v1Data?: {
    id: string
    title: string
    body: string
    images?: {
      src: string
      alt: string
      caption?: string
      fullWidth?: boolean
      sensitive?: boolean
    }[]
    subsections?: CaseStudySubsection[]
  }
  v2Data?: {
    id: string
    title: string
    body: string
    images?: {
      src: string
      alt: string
      caption?: string
      fullWidth?: boolean
      sensitive?: boolean
    }[]
    subsections?: CaseStudySubsection[]
  }
  v3Data?: {
    id: string
    title: string
    body: string
    images?: {
      src: string
      alt: string
      caption?: string
      fullWidth?: boolean
      sensitive?: boolean
    }[]
    subsections?: CaseStudySubsection[]
  }
}

export interface VersionNode {
  id: string
  label: string // "V1", "V2"
  title: string
  description: string
  targetSectionId: string
}

export interface UXPrinciple {
  title: string
  description: string
}

export interface FrameworkConnection {
  // Which D.E.S.I.G.N. principles were most relevant to this case study
  principles: {
    letter: 'D' | 'E' | 'S' | 'I' | 'G' | 'N'
    title: string
    description: string // How this principle was applied in this specific case study
  }[]
}

export interface CaseStudyData {
  slug: string
  heroTitle: string
  heroSubheading?: string
  heroSubtitle: string
  coverImage?: {
    src: string
    alt: string
  }
  role: string
  company: string
  timeframe: string
  scope: string[]
  status?: {
    label: string
    variant?: 'live' | 'shipping' | 'development'
  }
  projectSnapshot: {
    problem: string
    role: string
    keyDecisions: string[]
    impactDirectional: string
    status: string
    scale?: string
  }
  challengeDeconstruction: {
    assumptions: string[]
    unknowns: string[]
    constraints: string[]
    businessGoal: string
  }
  successCriteria: {
    baseline: string
    target: string
    result: string
    disclaimer?: string
  }
  keyDecisions: {
    decision: string
    rationale: string
    tradeoff: string
    rejectedOption: string
  }[]
  researchDecisionMap: {
    insight: string
    evidence: string
    decision: string
    feature: string
  }[]
  competitiveResponse: {
    marketGap: string
    response: string
    evidenceSource: string
  }
  notShipped?: {
    reason: string
    learning: string
    nextStep: string
  }
  businessImpactDirectional: {
    bullets: string[]
    disclaimer: string
  }
  presentation: {
    slides: {
      type: 'title' | 'problem' | 'research' | 'decision' | 'execution' | 'collaboration' | 'impact' | 'lesson'
      title: string
      content: string[] // Bullet points
      image?: string
      notes?: string // Speaker notes
    }[]
  }
  bonusSlides?: {
    title: string
    slides: {
      title: string
      image: string
      description: string
    }[]
  }
  ownership: {
    ownedFeatures: string[]
    excludedFeatures: string[]
  }

  scaleAndResponsibility?: {
    metrics: { value: string; label: string }[]
    status: string
    description: string
  }

  // Original fields below
  quickOverview: QuickOverview
  versionTimeline: VersionNode[]
  uxPrinciples?: {
    title: string
    intro?: string
    principles: UXPrinciple[]
  }
  // D.E.S.I.G.N. Framework connection
  frameworkConnection?: FrameworkConnection
  sections: CaseStudySection[]
  publicSections?: CaseStudySection[] // Sections that should be public (not gated)
  prototypeMedia?: {
    title: string
    description?: string
    figmaEmbedUrl?: string
    videoEmbedUrl?: string // YouTube embed URL
    videoUrl?: string // Self-hosted video URL (MP4)
    videoPoster?: string // Poster/thumbnail for self-hosted videos
    // Before/After video comparison
    beforeAfter?: {
      before: {
        title: string
        videoUrl?: string
        videoEmbedUrl?: string // YouTube embed URL (public)
        videoPoster?: string
        description?: string
        sensitive?: boolean // If true, video requires password protection
      }
      after: {
        title: string
        videoUrl: string
        videoPoster?: string
        description?: string
        isPublic?: boolean // If true, video is public (e.g., Figma prototype, not from sandbox)
        sensitive?: boolean // If true, video requires password protection
      }
      comparisonNotes?: {
        before: string[]
        after: string[]
      }
    }
    // Multiple before videos (for IQ Plugin - 3 old workflows)
    multiBeforeAfter?: {
      before: {
        title: string
        videos: {
          title: string
          videoUrl?: string
          videoEmbedUrl?: string
          videoPoster?: string
          description?: string
        }[]
      }
      after: {
        title: string
        videoUrl: string
        videoPoster?: string
        description?: string
        sensitive?: boolean
      }
      comparisonNotes?: {
        before: string[]
        after: string[]
      }
    }
  }
  impactSummary: {
    heading: string
    bullets: string[]
  }
  reflectionSummary?: {
    heading: string
    paragraphs: string[]
  }
  finalSummary?: {
    title: string
    body: string
    keyPoints: string[]
  }
  passwordGate?: {
    password: string
    description?: string
    learnItems?: string[]
  }
  publishedDate?: string // ISO date string for structured data
  updatedDate?: string // ISO date string for structured data
}

