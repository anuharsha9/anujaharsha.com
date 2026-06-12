export interface FeaturedCaseStudy {
  slug: string
  title: string
  summary: string
  impact: string
  tags: string[]
  image?: string
  ctaText?: string
}

export interface ArticleLink {
  title: string
  topic: string
  href: string
  readTime?: string
}

export interface ExecutiveSummaryItem {
  slug: string
  problem: string
  caseStudyType: 'Flagship' | 'Secondary' | 'Third'
  status: 'Live' | 'Shipping 2026' | 'Not shipped yet' | 'Not shipped yet — in production pipeline'
  impactDirectional: string
}

export const executiveSummary: ExecutiveSummaryItem[] = [
  {
    slug: 'reportcaster',
    problem: '40-year-old scheduling system with 5 fragmented sub-products.',
    caseStudyType: 'Flagship',
    status: 'Live',
    impactDirectional: 'Consolidated into 1 unified hub; powering 20M+ weekly schedules.'
  },
  {
    slug: 'ml-functions',
    problem: 'Engineers struggled to train models without deep Python knowledge.',
    caseStudyType: 'Secondary',
    status: 'Shipping 2026',
    impactDirectional: 'Reduced 12-step coding task to a 4-step visual wizard.'
  },
  {
    slug: 'iq-plugin',
    problem: 'Data science tools were siloed from business intelligence users.',
    caseStudyType: 'Third',
    status: 'Not shipped yet — in production pipeline',
    impactDirectional: 'Unified 3 tools into one discovery hub.'
  }
]

export const featuredCaseStudies: FeaturedCaseStudy[] = [
  {
    slug: 'reportcaster',
    title: 'Modernizing a 40-Year-Old Enterprise Scheduler',
    summary:
      'Owning the end-to-end UX modernization of a 40-year-old scheduling tool — turning scattered workflows into a clear, unified scheduling experience used by millions of enterprise reports.',
    impact: 'Unified 5 subsystems, eliminated tab sprawl, streamlined workflows.',
    tags: ['Enterprise UX', 'Legacy modernization', 'Architecture'],
    image: '/images/case-study/ReportCaster/rc-cover.png',
    ctaText: 'View case study',
  },
  {
    slug: 'ml-functions',
    title: 'Democratizing Machine Learning for Everyone',
    summary:
      'Revamping an engineer-driven model-training workflow into a guided, step-by-step experience that helps non-experts configure, run, and interpret machine-learning models with confidence.',
    impact:
      'Step-based flows, clearer mental models, aligned with DSML strategy.',
    tags: ['AI/ML UX', 'Workflow design'],
    image: '/images/case-study/ml-functions/ml-functions-cover.webp',
    ctaText: 'View case study',
  },
  {
    slug: 'iq-plugin',
    title: 'Driving Data Science Adoption in Enterprise BI',
    summary:
      'Designing a unified hub that brings scattered DSML services into one responsive experience — so business users can discover, run, and interpret insights without leaving their analytics hub.',
    impact: 'Reduced context switching and made insights discoverable.',
    tags: ['DSML Integration', 'Information Architecture'],
    image: '/images/case-study/iq-plugin/iq-cover.webp',
    ctaText: 'View case study',
  },
]

export const articleLinks: ArticleLink[] = [
  {
    title: 'I Don\'t Need a Manual: How System Archaeology and 13 Years of Grit Built a Design Engineer',
    topic: 'Design Engineering',
    href: 'https://medium.com/@anu.anuja/i-dont-need-a-manual-how-system-archaeology-and-13-years-of-grit-built-a-design-engineer-df62ddebfc04',
    readTime: '10 min',
  },
  {
    title: 'How I Rebuilt My Portfolio While Navigating a Layoff, Visa Stress, Two Kids, and Pure Chaos',
    topic: 'Resilience',
    href: 'https://medium.com/@anu.anuja/how-i-rebuilt-my-portfolio-while-navigating-a-layoff-visa-stress-two-kids-and-pure-chaos-889ee81514ba',
    readTime: '12 min',
  },
  {
    title: 'Never Design Blind: How Learning and Empathy Shaped My Approach to ML UX',
    topic: 'Machine Learning UX',
    href: 'https://medium.com/@anu.anuja/never-design-blind-how-learning-and-empathy-shaped-my-approach-to-ml-ux-822aaf422613',
    readTime: '7 min',
  },
  {
    title: 'The Real Designer Grind: Building Together, Not Alone',
    topic: 'Design Culture',
    href: 'https://medium.com/@anu.anuja/the-real-designer-grind-building-together-not-alone-f7ad3e7cb881',
    readTime: '13 min',
  },
  {
    title: 'I Always Thought I Wasn\'t Good Enough — Until WebFOCUS Made Me Someone New',
    topic: 'Personal Growth',
    href: 'https://medium.com/@anu.anuja/i-always-thought-i-wasnt-good-enough-until-ibi-webfocus-made-me-someone-new-e1a769f15621',
    readTime: '12 min',
  },
]

export interface Recommendation {
  quote: string
  name: string
  role: string
  company: string
  relationship: string
  source?: 'corporate' | 'adplist' | 'mentor' | 'origin' // Distinguish between work colleagues, mentorship, personal mentor, and origin story
}

export const recommendations: Recommendation[] = [
  // ═══════════════════════════════════════════════════════════════
  // FEATURED: MY MENTOR
  // ═══════════════════════════════════════════════════════════════
  {
    quote: 'She approaches her work with a fearless attitude and is never afraid to explore new ideas or directions. Anuja is willing to take on difficult problems and push for creative solutions, even under tight timelines.',
    name: 'Dave Pfeiffer',
    role: 'Director of Design',
    company: 'Cloud Software Group',
    relationship: 'Dave was my manager for over 3 years and I collaborated with him closely every single day I was at the company.',
    source: 'mentor',
  },

  // ═══════════════════════════════════════════════════════════════
  // FEATURED: MY ORIGIN
  // ═══════════════════════════════════════════════════════════════
  {
    quote: 'She quickly became the designer we trusted for everything. By the time she moved on, she was operating at a level far beyond her experience, ready for enterprise-grade work.',
    name: 'Vikram Patel',
    role: 'Co-Founder & CEO',
    company: '9P Studioz',
    relationship: 'Vikram was my first ever boss and my first design job, where I learned the fundamentals of design and client work over 4.5 years.',
    source: 'origin',
  },

  // ═══════════════════════════════════════════════════════════════
  // LEADERSHIP
  // ═══════════════════════════════════════════════════════════════
  {
    quote: 'She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams. Any team would be lucky to have her.',
    name: 'Vijay Raman',
    role: 'VP of Product Management',
    company: 'Cloud Software Group',
    relationship: 'Vijay was the main leadership figure at my workplace, overseeing product strategy across the organization.',
  },

  // ═══════════════════════════════════════════════════════════════
  // DATA SCIENCE / ML
  // ═══════════════════════════════════════════════════════════════
  {
    quote: 'The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive. Her design solutions are rooted in a deep understanding of the purpose of the product.',
    name: 'Marcus Horbach, Ph.D.',
    role: 'Principal Data Scientist',
    company: 'Cloud Software Group',
    relationship: "I won Marcus's trust with ML Functions when I was trying to understand and learn ML. He was the data scientist I collaborated with closely on ML initiatives.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ENGINEERING
  // ═══════════════════════════════════════════════════════════════
  {
    quote: "From the start, she impressed everyone with how quickly she grasped all aspects of a highly intricate system. She's the kind of UX leader any team would be lucky to have.",
    name: 'Yingchun Chen',
    role: 'Principal System Software Engineer',
    company: 'Cloud Software Group',
    relationship: 'I worked closely with Yingchun on ReportCaster, where he was my engineering partner helping me understand the complex legacy system architecture.',
  },

  // ═══════════════════════════════════════════════════════════════
  // PRODUCT MANAGEMENT
  // ═══════════════════════════════════════════════════════════════
  {
    quote: 'Her design thinking workshops and prototype walkthroughs often became the foundation for key product decisions, driving clarity and alignment across cross-functional teams.',
    name: 'Karishma Khadge',
    role: 'Senior Product Manager',
    company: 'Cloud Software Group',
    relationship: 'Karishma was the PM I collaborated with on ML Functions and IQ Plugin. We had extremely close collaboration—a true partnership.',
  },
  {
    quote: "Anuja demonstrated exceptional ability to understand intricate workflows and translate them into elegant, user-centric designs that elevated the product's usability.",
    name: 'Aniket Awchare',
    role: 'Senior Product Manager',
    company: 'Cloud Software Group',
    relationship: 'Aniket partnered with me on ML Functions and IQ Plugin after Karishma left the org. We had the same close partnership dynamic.',
  },

  // ═══════════════════════════════════════════════════════════════
  // CUSTOMER / SME
  // ═══════════════════════════════════════════════════════════════
  {
    quote: 'Anticipating the next move of the user, that is next level UI! Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels.',
    name: 'Anita George',
    role: 'Principal Account Technology Strategist',
    company: 'Cloud Software Group',
    relationship: 'Anita was my favorite reliable SME and customer representative for ML Functions and IQ Plugin, providing invaluable user insights.',
  },
  {
    quote: "Smart and very attuned to user needs, she 'just gets it' and developed intuitive designs that were very well received by our end users.",
    name: 'Radhika Tekumalla',
    role: 'Founder',
    company: 'Kedazzle (EdTech)',
    relationship: 'I worked with Radhika for 3 years during my freelance period on her EdTech startup.',
  },
  {
    quote: 'She is a collaborative teammate, strong advocate for user research, and great designer. She impressed everyone with how quickly she grasped all aspects of a highly intricate system.',
    name: 'Shay Bagwell',
    role: 'Lead Customer Marketing Manager',
    company: 'Cloud Software Group',
    relationship: 'Shay worked with me on several projects where my design made an impact.',
  },

  // ═══════════════════════════════════════════════════════════════
  // ADPLIST MENTORSHIP
  // ═══════════════════════════════════════════════════════════════
  {
    quote: 'Anuja is an excellent mentor. She proactively provides actionable tips, checks on progress, and leverages her expertise to guide career growth.',
    name: 'Gina Kim',
    role: 'Product Designer',
    company: 'UC Riverside',
    relationship: 'ADPList Mentorship',
    source: 'adplist',
  },
  {
    quote: 'Really good advice for breaking out of a rut and how to enter the field. She gave me clear direction when I felt lost.',
    name: 'Nathan Irwin',
    role: 'Design Student',
    company: 'BCIT',
    relationship: 'ADPList Mentorship',
    source: 'adplist',
  },
  {
    quote: 'An experienced designer with a unique and insightful approach. This was an enriching experience covering design projects, AI, emerging industries, and UX.',
    name: 'Eswar Varma',
    role: 'Associate Lead UX Designer',
    company: 'Born Group',
    relationship: 'ADPList Mentorship',
    source: 'adplist',
  },
]
