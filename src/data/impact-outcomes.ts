import { ImpactOutcomesData } from '@/components/case-study/ImpactOutcomes'
import { TrendingUp, ShieldCheck, Layout, Users, Clock, Activity, BarChart3, FileText, Eye, Smartphone, Network } from 'lucide-react'

// ─── REPORTCASTER ─────────────────────────────────────────

export const rcImpactOutcomes: ImpactOutcomesData = {
    sectionTag: 'PROJECT OUTCOME',
    title: 'From Visual Refresh to System Architecture',
    outcomes: [
        {
            tag: 'OUTCOME_01: DURATION',
            headline: '14 Months',
            body: 'End-to-end journey from initial visual refresh concepts to a fully implemented system architecture.',
            icon: Clock,
            accentColor: 'blue',
        },
        {
            tag: 'OUTCOME_02: STATUS',
            headline: 'Live',
            body: 'Shipped April 2024. Available to all enterprise customers in the production environment.',
            icon: Activity,
            accentColor: 'teal',
        },
        {
            tag: 'OUTCOME_03: SCALE',
            headline: '20M+',
            body: 'Schedules processed weekly. The redesign maintained 100% reliability at massive enterprise scale.',
            icon: BarChart3,
            accentColor: 'purple',
        },
        {
            tag: 'OUTCOME_04: TRANSFORMATION',
            headline: 'System Spec',
            body: 'Replaced 50 years of tribal knowledge with a documented ecosystem. Architecture enabled extensibility.',
            icon: FileText,
            accentColor: 'amber',
        },
    ],
}

// ─── ML FUNCTIONS ─────────────────────────────────────────

export const mlImpactOutcomes: ImpactOutcomesData = {
    sectionTag: 'IMPACT METRICS',
    title: 'Impact & Validation',
    description: 'How design decisions translated into tangible business value, system trust, and market expansion.',
    outcomes: [
        {
            tag: 'OUTCOME_01: BUSINESS_IMPACT',
            headline: 'Demo-Ready at Scale',
            body: 'For the first time, ML was stable enough for 200+ person org-wide demos. Sales engineering could finally showcase the capability confidently.',
            icon: TrendingUp,
            accentColor: 'teal',
        },
        {
            tag: 'OUTCOME_02: RELIABILITY',
            headline: 'Zero Abandonment',
            body: "Eliminating dead-end errors didn't just save clicks; it stopped users from quitting. All SME testers completed the full workflow.",
            icon: ShieldCheck,
            accentColor: 'emerald',
        },
        {
            tag: 'OUTCOME_03: SCALABILITY',
            headline: '1 Core Pattern',
            body: 'The 4-step guided flow pattern was so robust it was directly inherited by the IQ Plugin, reducing future design/dev time.',
            icon: Layout,
            accentColor: 'purple',
        },
        {
            tag: 'OUTCOME_04: MARKET_EXPANSION',
            headline: 'New User Tier',
            body: 'Lowering the technical barrier allowed Business Analysts to self-serve, expanding the addressable market beyond just Data Scientists.',
            icon: Users,
            accentColor: 'amber',
        },
    ],
}

// ─── IQ PLUGIN ────────────────────────────────────────────

export const iqImpactOutcomes: ImpactOutcomesData = {
    sectionTag: 'IMPACT METRICS',
    title: 'Consolidation as a Feature',
    description: 'How unifying three scattered tools into one hub drove adoption without changing any underlying features.',
    outcomes: [
        {
            tag: 'OUTCOME_01: DISCOVERABILITY',
            headline: '+25% NLQ Adoption',
            body: 'Just by making NLQ visible in the Hub — no feature changes. Discoverability alone drove a meaningful adoption increase.',
            icon: Eye,
            accentColor: 'teal',
        },
        {
            tag: 'OUTCOME_02: CONSOLIDATION',
            headline: '3 → 1 Entry Point',
            body: 'NLQ, Automated Insights, and ML Functions brought under one roof. Users no longer had to hunt across different platform areas.',
            icon: Network,
            accentColor: 'purple',
        },
        {
            tag: 'OUTCOME_03: FIRST_OF_KIND',
            headline: 'First Responsive Hub App',
            body: 'The first fully responsive application in the Hub ecosystem. Set the standard for all future Hub integrations.',
            icon: Smartphone,
            accentColor: 'blue',
        },
        {
            tag: 'OUTCOME_04: CONTINUITY',
            headline: 'Foundation Enabled Handoff',
            body: 'Architecture was so well-defined that 2 designers continued execution on my foundation after I transitioned off the project.',
            icon: Users,
            accentColor: 'amber',
        },
    ],
}
