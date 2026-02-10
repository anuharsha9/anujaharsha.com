/**
 * Gear Inspector Data - Maps each gear to actual case study content
 * "This is how my brain processes complexity"
 */

// Gear Inspector Data - Maps each gear to actual case study content

export interface GearInspectorItem {
  id: string
  thought: string
  link: string
  linkLabel: string
  accentColor: string
  caseStudy?: 'reportcaster' | 'ml-functions' | 'iq-plugin' | 'me'
}

export const GEAR_INSPECTOR: Record<string, GearInspectorItem> = {
  "gear-scattered-workflows": {
    id: "gear-scattered-workflows",
    thought: "I bridged the gap. I stopped waiting for developer handoffs and built this site to prove I can ship production code.",
    link: "/me",
    linkLabel: "See My Tech Stack",
    accentColor: "#0BA2B5",
    caseStudy: "me"
  },

  "gear-legacy-systems": {
    id: "gear-legacy-systems",
    thought: "Digital Native. I mastered Pixel Logic (MS Paint) in Grade 2 and Vector Logic (CorelDRAW) in Grade 5. Design is my native language.",
    link: "/me",
    linkLabel: "See My Origin",
    accentColor: "#F59E0B",
    caseStudy: "me"
  },

  "gear-hidden-features": {
    id: "gear-hidden-features",
    thought: "The Polymath. Violin taught me rhythm. Logic taught me structure. Design organizes the chaos.",
    link: "/me",
    linkLabel: "See My Story",
    accentColor: "#8B5CF6", // Violet
    caseStudy: "me"
  },

  "gear-fragmented-ui": {
    id: "gear-fragmented-ui",
    thought: "System Archaeologist. I map fragmented, undocumented legacy subsystems and unify them into coherent platforms.",
    link: "/work/reportcaster#section-04",
    linkLabel: "See the Unification",
    accentColor: "#F59E0B",
    caseStudy: "reportcaster"
  },

  "gear-missing-briefs": {
    id: "gear-missing-briefs",
    thought: "Fearless Adapter. Drop me in. I didn't know Machine Learning, so I embedded with Data Scientists and got MIT Certified.",
    link: "/work/ml-functions#section-02",
    linkLabel: "See the Certification",
    accentColor: "#0BA2B5",
    caseStudy: "ml-functions"
  },

  "gear-conflicting-teams": {
    id: "gear-conflicting-teams",
    thought: "Alignment Architect. I use high-fidelity prototypes to bridge the gap between Product, Engineering, and Design.",
    link: "/work/ml-functions#section-05",
    linkLabel: "See the Alignment",
    accentColor: "#0BA2B5",
    caseStudy: "ml-functions"
  },

  "gear-shifting-priorities": {
    id: "gear-shifting-priorities",
    thought: "Strategic Debt. I know when to ship a 'hack' to unblock revenue and when to fight for a refactor. Speed matters.",
    link: "/work/reportcaster#section-04",
    linkLabel: "See the Strategy",
    accentColor: "#F59E0B",
    caseStudy: "reportcaster"
  },

  "gear-motherhood": {
    id: "gear-motherhood",
    thought: "Elite Focus. Managing a household and career taught me to respect time. I don't grind; I orbit efficiently.",
    link: "/me",
    linkLabel: "See My Philosophy",
    accentColor: "#F59E0B",
    caseStudy: "me"
  },

  "gear-career-ambition": {
    id: "gear-career-ambition",
    thought: "Consistency at scale. I ensure one component deployed everywhere behaves identically across 50+ squads.",
    link: "/work/iq-plugin#section-03",
    linkLabel: "See the System",
    accentColor: "#8B5CF6", // Violet
    caseStudy: "iq-plugin"
  },

  "gear-life": {
    id: "gear-life",
    thought: "I don't need a manual. Drop me into ambiguity, and I will map the system, learn the language, and build the solution.",
    link: "/me",
    linkLabel: "Hire the Adapter",
    accentColor: "#0BA2B5", // Teal
    caseStudy: "me"
  }
}

// Helper to get gear data by ID
export function getGearData(gearId: string): GearInspectorItem | null {
  return GEAR_INSPECTOR[gearId] || null
}

