import { Bot, Mountain, GraduationCap, Award, Baby, MapPin, Heart, Palette, Clapperboard, Home, type LucideIcon } from 'lucide-react';

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar?: string;
    relationship: string;
    isPrimary?: boolean; // For the highlighted "Bento" card
    linkedInProfile?: string;
}

export interface WorkItem {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    tags: string[];
    // Legacy / Hero Card Fields
    subtitle?: string;
    metric?: string;
    metricLabel?: string;
    accentColor?: string;
    fileName?: string;
    locked?: boolean;
    video?: string;
    statusLabel?: string;
    impactDirectional?: string;
    caseStudyType?: 'Flagship' | 'Secondary' | 'Third';
    problemStatement?: string;
    goal?: string;
    result?: string;
}

export interface Milestone {
    title: string;
    subtitle?: string;
    year?: string;
    icon?: LucideIcon | string; // Lucide icon component or string key for icon registry
}

export interface SkillBadge {
    icon: 'code' | 'zap' | 'layers' | 'cpu' | 'box' | 'palette';
    label: string;
    sub: string;
}

export interface CareerEra {
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
    secondaryDescription?: string; // Additional tagline
    testimonials: Testimonial[];
    workItems: WorkItem[];
    articles?: WorkItem[]; // Writing/Thought Leadership specific to this era
    milestones?: Milestone[]; // Life context, education, major shifts
    foundations?: string[]; // For Origin Story: tools/skills
    skillBadges?: SkillBadge[]; // For hero-style zones
    heroLabel?: string; // Small label above the role heading
    platformUrl?: string; // Link to live product (proof of work)
    isHeroIntro?: boolean; // Special flag for the hero-intro slide
    isBrainSlide?: boolean; // Special flag for the brain hero slide
}

export const CAREER_DATA: CareerEra[] = [
    // ZONE 1: DESIGN ENGINEERING (2026)
    {
        id: "design-engineering",
        company: "AI-Orchestrated Portfolio",
        role: "Staff Product Designer",
        period: "Nov 2025 — Present",
        heroLabel: "November 2025 — Present",
        description: "I prototype in code. The real risk isn't visuals — it's the logic.",
        skillBadges: [
            { icon: 'code', label: 'Production-Grade React', sub: 'TypeScript, Next.js, Architecture' },
            { icon: 'zap', label: '60fps Interaction', sub: 'Framer Motion, Physics, Gestures' },
        ],
        testimonials: [],
        workItems: [
        ],
        milestones: []
    },

    // ZONE 2: CLOUD SOFTWARE GROUP - PROJECTS
    {
        id: "csg-architect",
        company: "Cloud Software Group",
        role: "Senior Product Designer",
        period: "2022 — 2025",
        description: "Led UX across WebFOCUS — 17M+ users, 50 years of legacy, one Hub.",
        platformUrl: "https://www.ibi.com/webfocus",
        testimonials: [
            {
                id: 'vijay-raman',
                quote: "She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams. Any team would be lucky to have her.",
                name: "Vijay Raman",
                role: "VP of Product Management",
                company: "Cloud Software Group",
                relationship: "Leadership",
                linkedInProfile: "https://www.linkedin.com/in/vijayraman/"
            }
        ],
        milestones: [],
        workItems: [
            {
                id: "reportcaster",
                title: "Reducing 5 Legacy Subsystems to 1 Unified Hub",
                subtitle: '75% fewer clicks · 20M+ weekly schedules',
                description: '5 fragmented subsystems → 1 hub. 20M+ weekly schedules. 75% fewer clicks.',
                image: '/images/case-study/ReportCaster/ReportCaster Explorer.png',
                video: '/videos/rc-prototype-walkthrough.mp4',
                link: "/work/reportcaster",
                tags: ["Legacy Modernization", "Complex Systems"],
                metric: '75%',
                metricLabel: 'fewer clicks',
                fileName: 'legacy_scheduler_refactor.js',
                accentColor: '#F59E0B',
                locked: false,
                statusLabel: 'Flagship Case Study',
                impactDirectional: 'Consolidated into 1 unified hub; powering 20M+ weekly schedules.',
                caseStudyType: 'Flagship',
                problemStatement: 'Customers were leaving due to legacy UX.',
                goal: 'RETENTION & MODERNIZATION',
                result: 'SUCCESS! 75% fewer clicks'
            },
            {
                id: "ml-functions",
                title: "12-Step ML Process → 4-Step Visual Wizard",
                subtitle: 'Zero dead-end errors in testing',
                description: 'Engineers-only ML workflow → visual wizard anyone can use. Zero dead-end errors.',
                image: '/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png',
                link: "/work/ml-functions",
                tags: ["AI/ML", "UX Architecture"],
                metric: '100%',
                metricLabel: 'discoverability',
                fileName: 'ml_wizard_pipeline.py',
                accentColor: '#0BA2B5',
                locked: false,
                statusLabel: 'Shipping 2026',
                impactDirectional: 'Reduced 12-step coding task to a 4-step visual wizard.',
                caseStudyType: 'Secondary',
                problemStatement: 'Lack of feature adoptability (0%).',
                goal: 'DISCOVERABILITY & EASE OF USE',
                result: '50% faster task achievement'
            },
            {
                id: "iq-plugin",
                title: "Unifying 3 Siloed Tools into One Discovery Hub",
                subtitle: 'Zero-to-one product · In pipeline',
                description: '3 siloed data science tools → 1 entry point with onboarding and docs.',
                image: '/images/case-study/iq-plugin/Final Look.png',
                link: "/work/iq-plugin",
                tags: ["System Design", "Zero-to-One"],
                metric: '1',
                metricLabel: 'unified hub',
                fileName: 'iq_hub_unified_view.tsx',
                accentColor: '#8B5CF6',
                locked: false,
                statusLabel: 'Not shipped yet — in production pipeline',
                impactDirectional: 'Unified 3 tools into one discovery hub (in production pipeline).',
                caseStudyType: 'Third',
                problemStatement: 'AI/ML capabilities were siloed and hidden.',
                goal: 'MAKE AI/ML PROMINENT',
                result: 'SUCCESS! 1 click to each feature'
            }
        ],
        articles: []
    },

    // ZONE 2.5: CSG TESTIMONIALS (Dedicated Block)
    {
        id: "csg-testimonials",
        company: "Cloud Software Group",
        role: "Social Proof",
        period: "2022 — 2025",
        description: "Endorsements from the team I worked with every day.",
        testimonials: [
            {
                id: "dave-pfeiffer",
                name: "Dave Pfeiffer",
                role: "Director of Design",
                company: "Cloud Software Group",
                quote: "She approaches her work with a fearless attitude and is never afraid to explore new ideas or directions. Anuja is willing to take on difficult problems and push for creative solutions, even under tight timelines.",
                relationship: "Direct Manager · 3+ years",
                isPrimary: true,
                linkedInProfile: "https://www.linkedin.com/in/davepfeiffer/"
            },

            {
                id: "marcus-horbach",
                name: "Marcus Horbach, Ph.D.",
                role: "Principal Data Scientist",
                company: "Cloud Software Group",
                quote: "The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive. Her design solutions are rooted in a deep understanding of the purpose of the product.",
                relationship: "Cross-functional Collaborator",
            },
            {
                id: "yingchun-chen",
                name: "Yingchun Chen",
                role: "Principal System Software Engineer",
                company: "Cloud Software Group",
                quote: "From the start, she impressed everyone with how quickly she grasped all aspects of a highly intricate system. She's the kind of UX leader any team would be lucky to have.",
                relationship: "Engineering Partner",
            },
            {
                id: "karishma-khadge",
                name: "Karishma Khadge",
                role: "Senior Product Manager",
                company: "Cloud Software Group",
                quote: "Her design thinking workshops and prototype walkthroughs often became the foundation for key product decisions, driving clarity and alignment across cross-functional teams.",
                relationship: "Product Partner",
            },
            {
                id: "anita-george",
                name: "Anita George",
                role: "Principal Account Technology Strategist",
                company: "Cloud Software Group",
                quote: "Anticipating the next move of the user, that is next level UI! Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels.",
                relationship: "Customer / SME",
            }
        ],
        workItems: [],
        milestones: []
    },

    // LIFE CONTEXT: CSG ERA
    {
        id: "life-csg",
        company: "Cloud Software Group",
        role: "Life Context",
        period: "2022 — 2025",
        description: "",
        testimonials: [],
        workItems: [],
        milestones: [
            { title: "Vibe Coding & AI Orchestration", subtitle: "Built this portfolio", year: "Nov 2025", icon: Bot },
            { title: "Salt Lake City", subtitle: "Home Base", year: "Since 2019", icon: Mountain },
            { title: "Masters in English", subtitle: "Literature & Critical Theory", year: "2024 — 2025", icon: GraduationCap },
            { title: "MITx Pro Certificate", subtitle: "Product Design for AI and ML", year: "Apr 2024", icon: Award },
            { title: "Second Child", subtitle: "The greatest production release", year: "Sep 2024", icon: Baby },
        ]
    },

    // BLOCK 2: INDEPENDENT CONSULTANT / INFOTRIANGLE
    {
        id: "consultant-tech",
        company: "Independent Consultant",
        role: "Start-up Consultant",
        period: "2017 — 2022",
        description: "End-to-end UX ownership. Concept to shipped product.",
        testimonials: [
            {
                id: "radhika-tekumalla",
                name: "Radhika Tekumalla",
                role: "Founder",
                company: "Kedazzle",
                quote: "Smart and very attuned to user needs, she 'just gets it'... I was super impressed by her design thinking and user empathy.",
                relationship: "Client (Founder)",
                isPrimary: true,
                linkedInProfile: "https://www.linkedin.com/in/radhika-tekumalla/"
            }
        ],
        milestones: [],
        workItems: [
            {
                id: "kedazzle",
                title: "Kedazzle",
                description: "Blank canvas → Shipped EdTech MVP. End-to-end product design.",
                image: "/images/Kedazzle-cover.png",
                link: "/archive/kedazzle",
                tags: ["0-to-1", "EdTech"]
            },
            {
                id: "infinite-analytics",
                title: "Infinite",
                description: "Fragmented tools → Unified productivity. Merged tasks, notes, and goals.",
                image: "/images/Infinite-Cover.png",
                link: "/archive/infinite-analytics",
                tags: ["Productivity", "Mobile App"]
            },
            {
                id: "travel-portal",
                title: "Travel Portal",
                description: "Complex routing → Simple booking. Designed for strict enterprise compliance.",
                image: "/images/travel-cover.png",
                link: "/archive/travel-portal",
                tags: ["Enterprise", "Travel"]
            }
            // Commented out to show only 3 tiles - keeping for reference
            // {
            //     id: "pelli",
            //     title: "Pelli (InfoTriangle)",
            //     description: "Matrimony App. End-to-End Mobile UX.",
            //     image: "/images/Pelli-cover.png",
            //     link: "/archive/pelli",
            //     tags: ["Mobile UX", "iOS/Android"]
            // },
            // {
            //     id: "suitcase",
            //     title: "Suitcase",
            //     description: "Travel planning and itinerary management app.",
            //     image: "/images/suitcase-cover.png",
            //     link: "/archive/suitcase",
            //     tags: ["Consumer App", "Travel"]
            // }
        ]
    },

    // LIFE CONTEXT: CONSULTANT ERA
    {
        id: "life-consultant",
        company: "Independent",
        role: "Life Context",
        period: "2017 — 2022",
        description: "",
        testimonials: [],
        workItems: [],
        milestones: [
            { title: "First Child", subtitle: "Becoming a mother", year: "2021", icon: Baby },
            { title: "HCI Certificate", subtitle: "Georgia Tech", year: "Jan 2021", icon: Award },
            { title: "Salt Lake City", subtitle: "Moved to Utah", year: "Aug 2019", icon: Mountain },
            { title: "Denver", subtitle: "Moved to Colorado", year: "Feb 2019", icon: Mountain },
        ]
    },

    // BLOCK 3: AGENCY & STARTUP ERA (Merged)
    {
        id: "agency-startup",
        company: "9P Studioz & F1 Studioz",
        role: "Mobile & Enterprise UX Designer",
        period: "2012 — 2017",
        description: "Mobile games to enterprise logistics. Startup speed, Fortune 500 problems.",
        testimonials: [
            {
                id: "vikram-patel",
                name: "Vikram Patel",
                role: "CEO & Co-founder",
                company: "9P Studioz",
                quote: "She didn't know what 'UX' was yet — but she had intensity, discipline, and raw talent you can't teach. By the time she left, she was thinking in systems... trusted with high-stakes decisions.",
                relationship: "First Boss / Mentor",
                isPrimary: true,
                linkedInProfile: "https://www.linkedin.com/in/vikrampatel"
            }
        ],
        milestones: [],
        workItems: [
            {
                id: "crbs",
                title: "CRBS",
                description: "Conference Room Booking System. Tablet interface for enterprise campuses.",
                image: "/images/crbs-cover.png",
                link: "/archive/crbs",
                tags: ["Enterprise UX", "Tablet"]
            },
            {
                id: "graphic-design-archive",
                title: "Early Graphic Design",
                description: "Logos, print, and brand identity from the early days.",
                image: "/images/graphic-cover.png",
                link: "/archive/graphic-design",
                tags: ["Visual Design", "Brand Identity"]
            }
        ]
    },

    // LIFE CONTEXT: AGENCY ERA
    {
        id: "life-agency",
        company: "Studios Era",
        role: "Life Context",
        period: "2012 — 2017",
        description: "",
        testimonials: [],
        workItems: [],
        milestones: [
            { title: "Moved to Boston", subtitle: "The American Dream", year: "Mar 2017", icon: MapPin },
            { title: "Bachelor's in English", subtitle: "Literature", year: "Jan 2017", icon: GraduationCap },
            { title: "Got Married", subtitle: "New Chapter", year: "Aug 2016", icon: Heart },
            { title: "BA in Animation & VFX", subtitle: "Enrolled", year: "Jun 2012", icon: Palette },
            { title: "High School Graduation", subtitle: "Hyderabad", year: "2012", icon: GraduationCap },
        ]
    },

    // BLOCK 5: THE ORIGIN STORIES
    {
        id: "origin-story",
        company: "The Origin",
        role: "Foundation",
        period: "Birth — 2012",
        description: "Before the titles and tools. Just curiosity and the drive to make things.",
        testimonials: [],
        workItems: [],
        foundations: ["MS Paint", "CorelDRAW", "Pencil Drawing", "Origami", "Acrylic & Oil Painting", "Embroidery"],
        milestones: [
            { title: "Curtain Call Productions", subtitle: "Poster Designer", year: "Sep 2011", icon: Clapperboard },
            { title: "Moved to Hyderabad", subtitle: "From Mumbai", year: "2005", icon: MapPin },
            { title: "Born in Mumbai", subtitle: "The Beginning", year: "1990s", icon: Home },
        ]
    }
];
