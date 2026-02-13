import { Bot, Mountain, GraduationCap, Award, Baby, MapPin, Heart, Palette, Clapperboard, Home } from 'lucide-react';

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
}

export interface Milestone {
    title: string;
    subtitle?: string;
    year?: string;
    icon?: any; // Lucide Icon Component or String
}

export interface CareerEra {
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
    testimonials: Testimonial[];
    workItems: WorkItem[];
    articles?: WorkItem[]; // Writing/Thought Leadership specific to this era
    milestones?: Milestone[]; // Life context, education, major shifts
    foundations?: string[]; // For Origin Story: tools/skills
}

export const CAREER_DATA: CareerEra[] = [
    // BLOCK 1: CLOUD SOFTWARE GROUP
    {
        id: "csg-architect",
        company: "Cloud Software Group",
        role: "Senior Product Designer",
        period: "2022 — 2025",
        description: "Orchestrating AI-driven workflows for 25M+ users. Modernizing 50 years of legacy complexity into a unified \"Hub\" architecture.",
        testimonials: [
            {
                id: "dave-pfeiffer",
                name: "Dave Pfeiffer",
                role: "Director of Design",
                company: "Cloud Software Group",
                quote: "Anuja is willing to take on difficult problems and push for creative solutions... She approaches her work with a fearless attitude and is never afraid to explore new ideas.",
                relationship: "Manager (Direct)",
                isPrimary: true,
                linkedInProfile: "https://www.linkedin.com/in/dave-pfeiffer-1806b36/"
            },
            {
                id: "vijay-raman",
                name: "Vijay Raman",
                role: "VP of Product Management",
                company: "Cloud Software Group",
                quote: "Anuja brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across teams. She delivered a design strategy that improved usability and reduced operational risk.",
                relationship: "VP (Leadership)",
                linkedInProfile: "https://www.linkedin.com/in/vijayraman1/"
            },
            {
                id: "marcus-horbach",
                name: "Marcus Horbach, Ph.D.",
                role: "Principal Data Scientist",
                company: "Cloud Software Group",
                quote: "The clarity of her designs, in spite of the underlying data science complexity, is impressive. She actively engaged with data scientists... ensuring AI-powered features were user-friendly.",
                relationship: "Data Science Partner"
            },
            {
                id: "karishma-khadge",
                name: "Karishma Khadge",
                role: "Sr. Product Manager",
                company: "Cloud Software Group",
                quote: "Her design thinking workshops often became the foundation for key product decisions. She brings an infectious positivity and professionalism that elevates every team she's part of.",
                relationship: "Product Partner",
                linkedInProfile: "https://www.linkedin.com/in/createworkinspire/"
            },
            {
                id: "anita-george",
                name: "Anita George",
                role: "Principal Account Tech Strategist",
                company: "Cloud Software Group",
                quote: "Anticipating the next move of the user, that is next level UI! Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels.",
                relationship: "SME / User Voice",
                linkedInProfile: "https://www.linkedin.com/in/anita-george-7977231b/"
            },
            {
                id: "yingchun-chen",
                name: "Yingchun Chen",
                role: "Principal System Software Engineer",
                company: "Cloud Software Group",
                quote: "She impressed everyone with how quickly she grasped all aspects of a highly intricate system... She's the kind of UX leader any team would be lucky to have.",
                relationship: "Engineering Lead",
                linkedInProfile: "https://www.linkedin.com/in/yingchun-chen-aa0b804a/"
            }
        ],
        milestones: [
            { title: "Vibe Coding & AI Orchestration", subtitle: "Built this portfolio", year: "Nov 2025", icon: Bot },
            { title: "Salt Lake City", subtitle: "Home Base", year: "Since 2019", icon: Mountain },
            { title: "Masters in English", subtitle: "Literature & Critical Theory", year: "2024 — 2025", icon: GraduationCap },
            { title: "MITx Pro Certificate", subtitle: "Product Design for AI and ML", year: "Apr 2024", icon: Award },
            { title: "Second Child", subtitle: "The greatest production release", year: "Sep 2024", icon: Baby },
        ],
        workItems: [
            {
                id: "reportcaster",
                title: "Modernizing a 50-Year-Old Enterprise Scheduler",
                subtitle: '50yr Legacy → Modern Hub',
                description: 'Modernized a 50-year-old platform\'s scheduler powering 20M+ schedules weekly. Integrated 5 legacy subsystems intelligently into the main product hub.',
                image: '/images/case-study/ReportCaster/ReportCaster Explorer.png',
                video: '/videos/rc-prototype-walkthrough.mp4',
                link: "/work/reportcaster",
                tags: ["Legacy Modernization", "Complex Systems"],
                metric: '75%',
                metricLabel: 'fewer clicks',
                fileName: 'legacy_scheduler_refactor.js',
                accentColor: '#F59E0B',
                locked: false,
                statusLabel: 'Live in Production',
                impactDirectional: 'Consolidated into 1 unified hub; powering 20M+ weekly schedules.',
                caseStudyType: 'Flagship'
            },
            {
                id: "ml-functions",
                title: "Democratizing Machine Learning for Everyone",
                subtitle: 'Black Box → Guided Flow',
                description: 'Transformed complex 12-step ML training into a guided 4-step visual workflow. Zero dead-end errors in testing.',
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
                caseStudyType: 'Secondary'
            },
            {
                id: "iq-plugin",
                title: "Driving Data Science Adoption in Enterprise BI",
                subtitle: '3 Tools + Discover Page',
                description: 'Unified 3 DSML tools into one Hub plugin with a custom Discover page—featuring tutorials, documentation, and tool descriptions.',
                image: '/images/case-study/iq-plugin/Final Look.png',
                link: "/work/iq-plugin",
                tags: ["System Design", "Zero-to-One"],
                metric: '1',
                metricLabel: 'unified hub',
                fileName: 'iq_hub_unified_view.tsx',
                accentColor: '#8B5CF6',
                locked: true,
                statusLabel: 'Not shipped yet — in production pipeline',
                impactDirectional: 'Unified 3 tools into one discovery hub (in production pipeline).',
                caseStudyType: 'Third'
            }
        ],
        articles: [
            {
                id: "better-bi",
                title: "The Secret Behind Better BI",
                description: "Who's Your Business User? A deep dive into user personas in enterprise analytics.",
                image: "/images/articles/better-bi-thumb.png",
                link: "https://community.ibi.com/articles/the-secret-behind-better-bi-who%E2%80%99s-your-business-user-r44/",
                tags: ["UX Strategy", "Article"]
            },
            {
                id: "enhancing-ux",
                title: "Enhancing UX in WebFOCUS",
                description: "Strategies for improving user experience in complex data science and machine learning workflows.",
                image: "/images/articles/enhancing-ux-webfocus.jpg",
                link: "https://community.ibi.com/forums/topic/16161-enhancing-user-experience-in-webfocus-dsml/",
                tags: ["AI/ML", "Article"]
            }
        ]
    },

    // BLOCK 2: INDEPENDENT CONSULTANT / INFOTRIANGLE
    {
        id: "consultant-tech",
        company: "Independent Consultant",
        role: "Start-up Consultant",
        period: "2017 — 2022",
        description: "End-to-End UX Owner for independent ventures. Delivering production-ready design workflows and developer handoffs.",
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
        milestones: [
            { title: "First Child", subtitle: "Becoming a mother", year: "2021", icon: Baby },
            { title: "HCI Certificate", subtitle: "Georgia Tech", year: "Jan 2021", icon: Award },
            { title: "Salt Lake City", subtitle: "Moved to Utah", year: "Aug 2019", icon: Mountain },
            { title: "Denver", subtitle: "Moved to Colorado", year: "Feb 2019", icon: Mountain },
        ],
        workItems: [
            {
                id: "kedazzle",
                title: "Kedazzle",
                description: "EdTech MVP. From concept to shipping product.",
                image: "/images/Kedazzle-cover.png",
                link: "/archive/kedazzle",
                tags: ["0-to-1", "EdTech"]
            },
            {
                id: "infinite-analytics",
                title: "Infinite",
                description: "Endless productivity mobile app. An all-in-one workspace for tasks, notes, and goals.",
                image: "/images/Infinite-Cover.png",
                link: "/archive/infinite-analytics",
                tags: ["Productivity", "Mobile App"]
            },
            {
                id: "pelli",
                title: "Pelli (InfoTriangle)",
                description: "Matrimony App. End-to-End Mobile UX.",
                image: "/images/Pelli-cover.png",
                link: "/archive/pelli",
                tags: ["Mobile UX", "iOS/Android"]
            },
            {
                id: "travel-portal",
                title: "Travel Portal",
                description: "Corporate travel booking platform.",
                image: "/images/travel-cover.png",
                link: "/archive/travel-portal",
                tags: ["Enterprise", "Travel"]
            },
            {
                id: "suitcase",
                title: "Suitcase",
                description: "Travel planning and itinerary management app.",
                image: "/images/suitcase-cover.png",
                link: "/archive/suitcase",
                tags: ["Consumer App", "Travel"]
            }
        ]
    },

    // BLOCK 3: AGENCY & STARTUP ERA (Merged)
    {
        id: "agency-startup",
        company: "9P Studioz & F1 Studioz",
        role: "Mobile & Enterprise UX Designer",
        period: "2012 — 2017",
        description: "From high-velocity mobile games to complex enterprise logistics. Learning to ship at startup speed while solving Fortune 500 problems.",
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
        milestones: [
            { title: "Moved to Boston", subtitle: "The American Dream", year: "Mar 2017", icon: MapPin },
            { title: "Got Married", subtitle: "New Chapter", year: "Aug 2016", icon: Heart },
        ],
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
                id: "wordu",
                title: "Wordu",
                description: "Viral Word Game. 12,000+ organic downloads in week one.",
                image: "/images/wordu-cover.png",
                link: "/archive/wordu",
                tags: ["Game Design", "Viral Growth"]
            },
            {
                id: "graphic-design-archive",
                title: "Early Graphic Design",
                description: "A collection of logos, print, and brand identity work from the early agency days.",
                image: "/images/graphic-cover.png",
                link: "/archive/graphic-design",
                tags: ["Visual Design", "Brand Identity"]
            }
        ]
    },
    // BLOCK 5: THE ORIGIN STORIES
    {
        id: "origin-story",
        company: "The Origin",
        role: "Foundation",
        period: "1994 — 2012",
        description: "The formative years. Before the titles and tools, there was just curiosity and the drive to create.",
        testimonials: [],
        workItems: [],
        foundations: ["MS Paint", "CorelDRAW", "Pencil Drawing", "Origami", "Acrylic & Oil Painting"],
        milestones: [
            { title: "BA in Animation & VFX", subtitle: "Enrolled", year: "Jun 2012", icon: Palette },
            { title: "High School Graduation", subtitle: "Hyderabad", year: "2012", icon: GraduationCap },
            { title: "Curtain Call Productions", subtitle: "Poster Designer", year: "Sep 2011", icon: Clapperboard },
            { title: "Moved to Hyderabad", subtitle: "From Mumbai", year: "2005", icon: MapPin },
            { title: "Born in Mumbai", subtitle: "The Beginning", year: "15 Sep 1994", icon: Home },
        ]
    }
];
