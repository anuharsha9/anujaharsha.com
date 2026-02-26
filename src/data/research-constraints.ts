import { ResearchConstraintsData } from '@/components/case-study/ResearchConstraints'

// ─── REPORTCASTER ─────────────────────────────────────────

export const rcResearchConstraints: ResearchConstraintsData = {
    tag: 'RESEARCH STRATEGY',
    title: 'Navigating Enterprise Research Constraints',
    description: 'How I reconstructed an undocumented 50-year-old system when direct user research wasn\'t possible.',
    constraint: {
        label: 'CONSTRAINT: NO_DIRECT_USER_ACCESS',
        body: 'Enterprise security policy blocked direct access to end users. No interviews, no usability tests, no direct feedback loops.',
        blockedMethods: [
            'Direct user interviews',
            'On-site observation sessions',
            'Usage analytics access',
        ],
    },
    strategy: {
        label: 'STRATEGY: THE_PROXY_NETWORK',
        body: 'Leveraged Support Agents and Customer Reps as high-fidelity proxies for user pain points. Built ecosystem understanding through indirect channels.',
        proxySources: [
            'Gold Support team meetings',
            'Original RC engineer sessions',
            'Support ticket pattern analysis',
            'Customer rep feedback',
        ],
    },
    sources: [
        {
            id: 'chris',
            name: 'Chris Kaplan',
            role: 'Gold Support Lead',
            color: 'amber',
            insights: [
                'Which issues take longest to resolve',
                'What users hack around daily',
                'Real-world pain points from support tickets',
            ],
            method: 'Embedded in team meetings',
        },
        {
            id: 'yingchun',
            name: 'Yingchun Chen',
            role: 'Original RC Engineer',
            color: 'blue',
            insights: [
                'Decades of undocumented logic',
                'Why legacy decisions were made',
                'What code can and cannot change',
            ],
            method: 'Deep technical sessions',
        },
    ],
    connectorLabel: 'SO I BUILT MY OWN NETWORK',
}

// ─── ML FUNCTIONS ─────────────────────────────────────────

export const mlResearchConstraints: ResearchConstraintsData = {
    tag: 'RESEARCH METHODOLOGY',
    title: 'Gathering Insights Without Direct Access',
    description: 'How I built user empathy through proxy networks when direct research wasn\'t possible.',
    constraint: {
        label: 'CONSTRAINT: NO_DIRECT_ACCESS',
        body: 'Enterprise security policy blocked direct access to end users. I could not interview the actual people using the tool.',
        blockedMethods: [
            'Direct user interviews',
            'On-site observation sessions',
            'Usage analytics access',
        ],
    },
    strategy: {
        label: 'STRATEGY: THE_PROXY_NETWORK',
        body: 'Talked to everyone I could — support reps, technical staff, and data scientist friends outside work. If they touched ML, I picked their brain.',
        proxySources: [
            'Support ticket pattern analysis',
            'DS friends outside work',
            'SME usability sessions',
            'Internal domain experts',
        ],
    },
    connectorLabel: 'BUILT A PROXY NETWORK',
}
