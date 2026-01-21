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
    thought: "These workflows are scattered; I need to organize them into clarity.",
    link: "/work/ml-functions#section-03",
    linkLabel: "See the ML Wizard",
    accentColor: "#0BA2B5",
    caseStudy: "ml-functions"
  },

  "gear-legacy-systems": {
    id: "gear-legacy-systems",
    thought: "Decades of complex enterprise code... I need to find the pattern and make this usable.",
    link: "/work/reportcaster#section-01",
    linkLabel: "See the Transformation",
    accentColor: "#F59E0B",
    caseStudy: "reportcaster"
  },

  "gear-hidden-features": {
    id: "gear-hidden-features",
    thought: "These features are buried. Users need them one click away.",
    link: "/work/iq-plugin#section-01",
    linkLabel: "See the Hub",
    accentColor: "#8B5CF6", // Violet
    caseStudy: "iq-plugin"
  },

  "gear-fragmented-ui": {
    id: "gear-fragmented-ui",
    thought: "This ecosystem is fragmented. I have to find a way to unify it.",
    link: "/work/reportcaster#section-04",
    linkLabel: "See the Integration",
    accentColor: "#F59E0B",
    caseStudy: "reportcaster"
  },

  "gear-missing-briefs": {
    id: "gear-missing-briefs",
    thought: "No brief? I dig, ask, research, and piece the requirements together.",
    link: "/work/ml-functions#section-02",
    linkLabel: "See My Process",
    accentColor: "#0BA2B5",
    caseStudy: "ml-functions"
  },

  "gear-conflicting-teams": {
    id: "gear-conflicting-teams",
    thought: "Too many conflicts. Let's get everyone aligned on a shared vision.",
    link: "/work/ml-functions#section-05",
    linkLabel: "See the Collaboration",
    accentColor: "#0BA2B5",
    caseStudy: "ml-functions"
  },

  "gear-shifting-priorities": {
    id: "gear-shifting-priorities",
    thought: "Priorities just shifted again. I need to adapt the plan, fast.",
    link: "/work/reportcaster#section-04",
    linkLabel: "See the Pivots",
    accentColor: "#F59E0B",
    caseStudy: "reportcaster"
  },

  "gear-motherhood": {
    id: "gear-motherhood",
    thought: "Designing for overwhelmed enterprise users who need clarity, not complexity.",
    link: "/work/reportcaster#section-03",
    linkLabel: "See the Simplification",
    accentColor: "#F59E0B",
    caseStudy: "reportcaster"
  },

  "gear-career-ambition": {
    id: "gear-career-ambition",
    thought: "Consistency at scale, not just screens. I need to build a system.",
    link: "/work/iq-plugin#section-03",
    linkLabel: "See the System",
    accentColor: "#8B5CF6", // Violet
    caseStudy: "iq-plugin"
  },

  "gear-life": {
    id: "gear-life",
    thought: "Career, future, family… it's a lot, but it's my life, and I love it.",
    link: "/me",
    linkLabel: "Get to Know Me",
    accentColor: "#0BA2B5", // Teal
    caseStudy: "me"
  }
}

// Helper to get gear data by ID
export function getGearData(gearId: string): GearInspectorItem | null {
  return GEAR_INSPECTOR[gearId] || null
}

