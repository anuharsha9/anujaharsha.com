'use client'

/**
 * MLCaseStudyView — Client component that wires ML data into the reusable CinematicCaseStudy shell.
 */

import dynamic from 'next/dynamic'
import { CaseStudyData } from '@/types/caseStudy'
import CinematicCaseStudy, { type HeroStat, type ActSection } from '@/components/case-study-experiment/CinematicCaseStudy'
import { StorySlide } from '@/components/case-study/StoryDeck'
const MLFullContent = dynamic(() => import('@/components/case-study-experiment/MLFullContent'), { ssr: true })
import { MLWireframe } from '@/components/case-study/CaseStudyWireframes'

/* ─── Beat Imports ─── */
import {
    MLBeatProblem,
    MLBeatOrigin,
    MLBeatGoal,
    MLBeatDiscovery,
    MLBeatEntryPoint,
    MLBeatBreakthrough,
    MLBeatConfusionMatrix,
    MLBeatExplainability,
    MLBeatValidation,
} from '@/components/case-study/storyboard/MLMovieBeats'


/* ─── ML Presentation Slides ─── */
const ML_SLIDES: StorySlide[] = [
    { type: 'title', title: 'Democratizing Machine Learning for Everyone', content: ['Anuja Harsha — Lead Product Designer', 'ML Functions · Cloud Software Group — WebFOCUS'], backgroundComponent: <MLWireframe /> },
    { type: 'problem', title: 'The Business Problem', content: ['0% feature adoption. A powerful ML engine buried in a data flow canvas — 12+ clicks, cascading context menus, confusing error states.'], component: <MLBeatProblem />, signal: 'ZERO ADOPTION' },
    { type: 'research', title: 'Earning Trust', content: ['Our DS handed me a side challenge: recreate an external explainability tool in WebFOCUS. I nailed it. That earned the trust to own the entire ML UX revamp.'], component: <MLBeatOrigin />, signal: 'SIDE PROJECT' },
    { type: 'research', title: 'The Goal', content: ['Democratize ML for non-technical users. No code, no confusion, no dead-ends.'], component: <MLBeatGoal />, signal: 'DEMOCRATIZE ML' },
    { type: 'research', title: 'Earning the Domain', content: ['Zero ML background → MIT certified. Months embedded with our Principal Data Scientist.'], component: <MLBeatDiscovery />, signal: 'MIT CERTIFIED' },
    { type: 'execution', title: 'Designing the Entry Point', content: ['No entry point existed. I designed the Predict Data landing page from scratch.'], component: <MLBeatEntryPoint />, signal: 'RIGHT-CLICK ENTRY' },
    { type: 'execution', title: 'Guided Wizard', content: ['12+ clicks through data flows and menus → ~6 steps in one guided flow.'], component: <MLBeatBreakthrough />, signal: '12+ → ~6 STEPS' },
    { type: 'execution', title: 'Confusion Matrix UX', content: ['The confusion matrix was already visual but interactive features were invisible. 10+ iterations: a threshold slider that updates every graph in real time.'], component: <MLBeatConfusionMatrix />, signal: 'INTERACTIVE' },
    { type: 'execution', title: 'Model Explainability', content: ['Our DS handed me a screenshot from an external tool. I built a native explainability popup — feature importances, prediction breakdowns.'], component: <MLBeatExplainability />, signal: 'WHY THIS PREDICTION?' },
    { type: 'impact', title: 'Validation & Impact', content: ['5/5 SMEs completed the flow without help. Patterns became foundation for IQ Plugin.'], component: <MLBeatValidation />, signal: '5/5 SUCCESS' },
]

/* ─── ML Hero Stats ─── */
const ML_HERO_STATS: HeroStat[] = [
    { label: 'Challenge', value: '12+ Clicks', description: 'Reduced to ~6 guided steps' },
    { label: 'Result', value: '5/5 SMEs', description: 'Completed flow unaided' },
    { label: 'Timeline', value: '', description: 'Design to production' },
]

/* ─── ML Act Sections ─── */
const ML_ACT_SECTIONS: ActSection[] = [
    { id: 'act-1-hook', label: 'I', title: 'The Hook' },
    { id: 'act-2-investigation', label: 'II', title: 'Investigation' },
    { id: 'act-3-architecture', label: 'III', title: 'Architecture' },
    { id: 'act-4-craft', label: 'IV', title: 'Craft' },
    { id: 'act-5-team', label: 'V', title: 'Team' },
    { id: 'act-6-outcome', label: 'VI', title: 'Outcome' },
]


export default function MLCaseStudyView({ data }: { data: CaseStudyData }) {
    const stats = ML_HERO_STATS.map(s =>
        s.label === 'Timeline' ? { ...s, value: data.timeframe || '2+ Years' } : s
    )

    return (
        <CinematicCaseStudy
            data={data}
            slides={ML_SLIDES}
            theme="ml"
            heroStats={stats}
            heroBackground={<MLWireframe />}
            actSections={ML_ACT_SECTIONS}
        >
            <MLFullContent data={data} />
        </CinematicCaseStudy>
    )
}
