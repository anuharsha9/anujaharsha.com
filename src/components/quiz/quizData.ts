'use client'

// Quiz Question and Option Types
export interface QuizOption {
    id: string
    emoji: string
    label: string
    sublabel?: string
}

export interface QuizQuestion {
    id: string
    type: 'single' | 'multi' | 'path-select'
    question: string
    subtitle?: string
    options: QuizOption[]
    reveal?: {
        title: string
        content: string
    }
}

export interface QuizPath {
    id: 'designer' | 'hiring'
    label: string
    emoji: string
    sublabel: string
    questions: QuizQuestion[]
}

// Micro-reveals for dopamine hits
export const microReveals = {
    M1: "I'm usually the person who maps the whole system so engineers stop guessing.",
    M2: "I don't simplify by dumbing things down. I simplify by making the structure obvious.",
    M3: "My best work happens in messy, engineer-led products—because I can translate chaos into a usable model.",
    M4: "I care about design systems because speed without consistency is just chaos with a sprint badge.",
    M5: "I've built AI/ML workflows for business users. The trick isn't 'AI.' It's trust and comprehension.",
    M6: "I rebuilt this portfolio 6 times in 30 days. My partner has learned to recognize the look.",
    M7: "I lead rooms without the title. Workshops, alignment, mentorship — it's just how I operate.",
}

// Path selector question
export const pathSelector: QuizQuestion = {
    id: 'path-select',
    type: 'path-select',
    question: "What brings you here?",
    options: [
        { id: 'designer', emoji: '🎨', label: 'Fellow Designer', sublabel: 'Browsing, curious, maybe finding some inspiration' },
        { id: 'hiring', emoji: '💼', label: 'Hiring', sublabel: 'I might have a role for you' },
    ]
}

// Designer Path Questions
export const designerQuestions: QuizQuestion[] = [
    {
        id: 'designer-obsession',
        type: 'single',
        question: "What do you obsess over?",
        options: [
            { id: 'system', emoji: '🧠', label: 'The system', sublabel: 'How everything connects' },
            { id: 'details', emoji: '✨', label: 'The details', sublabel: 'That 4am easing curve adjustment' },
            { id: 'ship', emoji: '🚀', label: 'The ship', sublabel: 'Getting it out the door' },
            { id: 'proof', emoji: '🔬', label: 'The proof', sublabel: 'Data over gut' },
        ],
        reveal: {
            title: 'The Unreasonable Standard',
            content: microReveals.M6
        }
    },
    {
        id: 'designer-curiosity',
        type: 'single',
        question: "What are you here to see?",
        options: [
            { id: 'enterprise', emoji: '🏗️', label: 'Enterprise complexity', sublabel: 'How do you design for 20 million users?' },
            { id: 'side-projects', emoji: '🎮', label: 'Side projects', sublabel: 'The creative experiments' },
            { id: 'build', emoji: '⚡', label: 'The build', sublabel: 'How this portfolio was made (AI + code)' },
            { id: 'journey', emoji: '📖', label: 'The journey', sublabel: '14 years of this' },
        ],
        reveal: {
            title: 'The Translator',
            content: "Master's in English Literature. 50+ shipped apps. 3 years inside a 20-million user enterprise monolith. I move at startup speed and think at enterprise scale. I'm not one thing."
        }
    },
    {
        id: 'designer-why',
        type: 'single',
        question: "Why do you design?",
        options: [
            { id: 'career', emoji: '💰', label: "It's a great career" },
            { id: 'good', emoji: '🎯', label: "I'm good at it" },
            { id: 'cant-imagine', emoji: '🔥', label: "I can't imagine doing anything else" },
            { id: 'figuring', emoji: '🤷', label: 'Still figuring that out' },
        ],
        reveal: {
            title: 'The Constant',
            content: "Same. Design isn't my career. It's the constant. The thing that's been there through every chapter — marriage, kids, grief, joy, layoffs, late nights. It's how I process the world."
        }
    }
]

// Hiring Path Questions
export const hiringQuestions: QuizQuestion[] = [
    {
        id: 'hiring-role',
        type: 'single',
        question: "What are you looking for?",
        options: [
            { id: 'senior-ic', emoji: '🎨', label: 'Senior IC', sublabel: 'Deep craft, ships independently' },
            { id: 'player-coach', emoji: '👥', label: 'Player-Coach', sublabel: 'IC who leads without managing' },
            { id: 'lead', emoji: '🏆', label: 'Design Lead', sublabel: 'Someone to build and scale a team' },
        ],
        reveal: {
            title: 'The Translator',
            content: microReveals.M7
        }
    },
    {
        id: 'hiring-environment',
        type: 'single',
        question: "What's your environment?",
        options: [
            { id: 'startup', emoji: '🚀', label: 'Startup', sublabel: 'Speed, ambiguity, wear every hat' },
            { id: 'enterprise', emoji: '🏢', label: 'Enterprise', sublabel: 'Scale, process, 6-month roadmaps' },
            { id: 'agency', emoji: '🎨', label: 'Agency', sublabel: 'Client work, variety, tight deadlines' },
            { id: 'ai-native', emoji: '🤖', label: 'AI-native', sublabel: 'Cutting edge, experimental, moving fast' },
        ],
        reveal: {
            title: 'The Builder Seeking Signal',
            content: "I've done all four. 8+ years in enterprise taught me scale — but it starved me creatively. I'm not looking for a job. I'm looking to feel alive again. To work somewhere that doesn't just tolerate obsession, but requires it."
        }
    },
    {
        id: 'hiring-challenge',
        type: 'single',
        question: "What challenge are you solving?",
        options: [
            { id: 'legacy', emoji: '🔄', label: 'Legacy modernization', sublabel: 'Making decades-old systems feel modern' },
            { id: 'zero-one', emoji: '🆕', label: '0→1', sublabel: 'Building something from nothing' },
            { id: 'growth', emoji: '📈', label: 'Growth', sublabel: 'Iterate, measure, ship, repeat' },
            { id: 'foundations', emoji: '🧱', label: 'Foundations', sublabel: 'Design systems, standards, scalable craft' },
        ],
    },
    {
        id: 'hiring-proof',
        type: 'multi',
        question: "Which of these matter to you?",
        subtitle: "Select all that apply",
        options: [
            { id: 'enterprise-exp', emoji: '☑️', label: 'Enterprise experience at scale' },
            { id: 'ships-code', emoji: '☑️', label: 'Actually ships code, not just mockups' },
            { id: 'ai-ml', emoji: '☑️', label: 'AI/ML product experience' },
            { id: 'exec-presence', emoji: '☑️', label: 'Presents to executives without flinching' },
            { id: 'obsessed', emoji: '☑️', label: 'Has rebuilt their portfolio 6 times in a month' },
        ],
        reveal: {
            title: 'The Operator',
            content: "✅ All of the above. But here's what the checklist doesn't capture: Most designers talk about craft. I live it."
        }
    }
]

// Case study routing based on answers
export const caseStudyRouting: Record<string, { path: string; title: string; subtitle: string; time: string }> = {
    legacy: {
        path: '/work/iq-plugin',
        title: 'IQ Plugin',
        subtitle: 'Modernizing a 50-year-old workflow',
        time: '5 min'
    },
    enterprise: {
        path: '/work/reportcaster',
        title: 'ReportCaster',
        subtitle: 'Designing at 25M user scale',
        time: '6 min'
    },
    'ai-native': {
        path: '/work/ml-functions',
        title: 'ML Functions',
        subtitle: 'When the AI needs UX',
        time: '4 min'
    },
    foundations: {
        path: '/work/reportcaster',
        title: 'ReportCaster',
        subtitle: 'Designing at 25M user scale',
        time: '6 min'
    },
    'zero-one': {
        path: '/work/iq-plugin',
        title: 'IQ Plugin',
        subtitle: 'Building the unified hub',
        time: '5 min'
    },
    growth: {
        path: '/work/ml-functions',
        title: 'ML Functions',
        subtitle: 'Iterate and optimize AI UX',
        time: '4 min'
    },
}

// Designer path routing based on curiosity
export const designerRouting: Record<string, { path: string; section?: string; label: string }> = {
    enterprise: { path: '/', section: 'work-overview', label: 'View the Work' },
    'side-projects': { path: '/me', section: 'archive', label: 'See the Experiments' },
    build: { path: '/me', section: 'evolution', label: 'See the Build' },
    journey: { path: '/me', label: 'Read the Journey' },
}
