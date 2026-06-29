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
  image?: string
  title?: string
  insight?: string
  quiz?: {
    question: string
    options: Array<{ id: string; label: string; isCorrect: boolean }>
    reveal: {
      title: string
      content: string
    }
  }
}

export const GEAR_INSPECTOR: Record<string, GearInspectorItem> = {
  "gear-scattered-workflows": {
    id: "gear-scattered-workflows",
    thought: "I bridged the gap. I stopped waiting for developer handoffs and built this site to prove I can ship production code.",
    link: "/?tab=life",
    linkLabel: "See My Tech Stack",
    accentColor: "#0BA2B5",
    caseStudy: "me",
    quiz: {
      question: "When devs say 'wait for the handoff'...",
      options: [
        { id: 'wait', label: "Wait patiently?", isCorrect: false },
        { id: 'ship', label: "Bridge the gap?", isCorrect: true }
      ],
      reveal: {
        title: "The Bridge",
        content: "I stopped waiting. I built this site to prove I can ship production code alongside my designs."
      }
    }
  },

  "gear-legacy-systems": {
    id: "gear-legacy-systems",
    thought: "Digital Native. I mastered Pixel Logic (MS Paint) in Grade 2 and Vector Logic (CorelDRAW) in Grade 5. Design is my native language.",
    link: "/?tab=life",
    linkLabel: "See My Origin",
    accentColor: "#22D3EE",
    caseStudy: "me",
    quiz: {
      question: "What was my first design tool?",
      options: [
        { id: 'figma', label: "Figma?", isCorrect: false },
        { id: 'paint', label: "MS Paint (Grade 2)?", isCorrect: true }
      ],
      reveal: {
        title: "Digital Native",
        content: "I mastered Pixel Logic in Grade 2. Design isn't just a job; it's my native language."
      }
    }
  },

  "gear-hidden-features": {
    id: "gear-hidden-features",
    thought: "The Polymath. Violin taught me rhythm. Logic taught me structure. Design organizes the chaos.",
    link: "/?tab=life",
    linkLabel: "See My Story",
    accentColor: "#8B5CF6", // Violet
    caseStudy: "me",
    quiz: {
      question: "What connects Violin and Code?",
      options: [
        { id: 'nothing', label: "Nothing?", isCorrect: false },
        { id: 'rhythm', label: "Rhythm & Structure?", isCorrect: true }
      ],
      reveal: {
        title: "The Polymath",
        content: "Violin taught me rhythm. Logic taught me structure. Design organizes the chaos."
      }
    }
  },

  "gear-fragmented-ui": {
    id: "gear-fragmented-ui",
    thought: "System Archaeologist. I map fragmented, undocumented legacy subsystems and unify them into coherent platforms.",
    link: "/work/reportcaster#section-04",
    linkLabel: "See the Unification",
    accentColor: "#0BA2B5",
    caseStudy: "reportcaster",
    quiz: {
      question: "How do I handle fragmented UI?",
      options: [
        { id: 'ignore', label: "Ignore it?", isCorrect: false },
        { id: 'unify', label: "Map & Unify?", isCorrect: true }
      ],
      reveal: {
        title: "System Archaeologist",
        content: "I map undocumented legacy subsystems and unify them into coherent platforms."
      }
    }
  },

  "gear-missing-briefs": {
    id: "gear-missing-briefs",
    thought: "Fearless Adapter. Drop me in. I didn't know Machine Learning, so I embedded with Data Scientists and got MIT Certified.",
    link: "/work/ml-functions#section-02",
    linkLabel: "See the Certification",
    accentColor: "#0BA2B5",
    caseStudy: "ml-functions",
    quiz: {
      question: "I didn't know Machine Learning. So...",
      options: [
        { id: 'ask', label: "I asked for a brief?", isCorrect: false },
        { id: 'learn', label: "I got MIT Certified?", isCorrect: true }
      ],
      reveal: {
        title: "Fearless Adapter",
        content: "I embedded with Data Scientists and learned their language to design better tools."
      }
    }
  },

  "gear-conflicting-teams": {
    id: "gear-conflicting-teams",
    thought: "Alignment Architect. I use high-fidelity prototypes to bridge the gap between Product, Engineering, and Design.",
    link: "/work/ml-functions#section-05",
    linkLabel: "See the Alignment",
    accentColor: "#0BA2B5",
    caseStudy: "ml-functions",
    quiz: {
      question: "Teams are misaligned. The fix?",
      options: [
        { id: 'meetings', label: "More Meetings?", isCorrect: false },
        { id: 'proto', label: "Code Prototypes?", isCorrect: true }
      ],
      reveal: {
        title: "Alignment Architect",
        content: "I force alignment by building high-fidelity prototypes that serve as the source of truth."
      }
    }
  },

  "gear-shifting-priorities": {
    id: "gear-shifting-priorities",
    thought: "Strategic Debt. I know when to ship a 'hack' to unblock revenue and when to fight for a refactor. Speed matters.",
    link: "/work/reportcaster#section-04",
    linkLabel: "See the Strategy",
    accentColor: "#0EA5E9",
    caseStudy: "reportcaster",
    quiz: {
      question: "When do I ship a 'hack'?",
      options: [
        { id: 'never', label: "Never?", isCorrect: false },
        { id: 'revenue', label: "To unblock revenue?", isCorrect: true }
      ],
      reveal: {
        title: "Strategic Debt",
        content: "I know when to ship fast to unblock the business and when to fight for a refactor."
      }
    }
  },

  "gear-motherhood": {
    id: "gear-motherhood",
    thought: "Elite Focus. Managing a household and career taught me to respect time. I don't grind; I orbit efficiently.",
    link: "/?tab=life",
    linkLabel: "See My Philosophy",
    accentColor: "#06B6D4",
    caseStudy: "me",
    quiz: {
      question: "How do I balance it all?",
      options: [
        { id: 'grind', label: "Work 80hrs?", isCorrect: false },
        { id: 'focus', label: "Elite Focus?", isCorrect: true }
      ],
      reveal: {
        title: "Efficiency Over Grind",
        content: "I don't grind; I orbit efficiently. Managing a household taught me to respect every second."
      }
    }
  },

  "gear-career-ambition": {
    id: "gear-career-ambition",
    thought: "Consistency at scale. I ensure one component deployed everywhere behaves identically across 50+ squads.",
    link: "/work/iq-plugin#section-03",
    linkLabel: "See the System",
    accentColor: "#8B5CF6", // Violet
    caseStudy: "iq-plugin",
    quiz: {
      question: "Consistency across 50+ squads?",
      options: [
        { id: 'pdf', label: "PDF Guidelines?", isCorrect: false },
        { id: 'code', label: "Code Components?", isCorrect: true }
      ],
      reveal: {
        title: "Scale Architect",
        content: "I deploy one component that behaves identically everywhere, ensuring consistency at scale."
      }
    }
  },

  "gear-life": {
    id: "gear-life",
    thought: "The Human Algorithm. I design for the neural networks of the users who use my tools, not just for screens.",
    link: "/?tab=life",
    linkLabel: "See My Core",
    accentColor: "#67E8F9",
    caseStudy: "me",
    quiz: {
      question: "I design for...",
      options: [
        { id: 'screens', label: "Screens?", isCorrect: false },
        { id: 'humans', label: "Neural Networks?", isCorrect: true }
      ],
      reveal: {
        title: "The Human Algorithm",
        content: "I design for the people who use the tools, understanding their cognitive load and workflows."
      }
    }
  }
}

// Helper to get gear data by ID
export function getGearData(gearId: string): GearInspectorItem | null {
  return GEAR_INSPECTOR[gearId] || null
}

