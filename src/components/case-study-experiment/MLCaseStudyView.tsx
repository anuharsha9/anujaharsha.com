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
import MLTrailer from '@/components/home/MLTrailer'

/* ─── Beat Imports ─── */
import {
    MLBeatProblem,
    MLBeatOrigin,
    MLBeatGoal,
    MLBeatDiscovery,
    MLBeatEntryPoint,
    MLBeatPivot,
    MLBeatBreakthrough,
    MLBeatConfusionMatrix,
    MLBeatExplainability,
    MLBeatValidation,
} from '@/components/case-study/storyboard/MLMovieBeats'


/* ─── ML Presentation Slides ─── */
const ML_SLIDES: StorySlide[] = [
    { type: 'title', title: 'A Side Project Earned Me the Whole Thing.', content: ['Anuja Harsha — Lead Product Designer', 'ML Functions · Cloud Software Group — WebFOCUS'], backgroundComponent: <MLWireframe /> },
    { type: 'problem', title: 'It Was Really Shitty', content: ['Click the plus menu, open a data flow, drag a dataset, drag a model pill. Hit a hidden play button. Right-click for cascading context menus. ~15 clicks minimum. Nobody used it.'], component: <MLBeatProblem />, signal: 'ZERO ADOPTION' },
    { type: 'research', title: 'The Side Project', content: ['The principal data scientist showed me a screenshot from a different software and said, "I want this for WebFOCUS." I didn\'t just recreate it. I dug into why the popup was needed. That\'s what got me the entire ML Functions redesign.'], component: <MLBeatOrigin />, signal: 'TRUST EARNED' },
    { type: 'research', title: 'The Full Revamp', content: ['After the explainability popup, I realized the entire ML workflow was not great. I earned the trust to own the whole thing.'], component: <MLBeatGoal />, signal: 'FULL OWNERSHIP' },
    { type: 'research', title: 'MIT Certified', content: ['I paid for the MIT course myself because the work had outgrown surface-level understanding. I was terrified of making something look nice while technically meaning the wrong thing.'], component: <MLBeatDiscovery />, signal: 'DOMAIN MASTERY' },
    { type: 'execution', title: 'Why No Landing Page?', content: ['No Predict Data landing page existed. In WebFOCUS, right-click is like religion. So putting "Predict Data" in the right-click menu was capitalizing on the most common user behavior in the product.'], component: <MLBeatEntryPoint />, signal: 'RIGHT-CLICK ENTRY' },
    { type: 'execution', title: 'One Path, Dual Purpose', content: ['Not two experiences. One path that serves a dual purpose. Not easy enough that data scientists would say "this is spoon feeding," but clear enough that someone like me could use it.'], component: <MLBeatPivot />, signal: 'DUAL PURPOSE' },
    { type: 'execution', title: 'The Popup Won', content: ['I tried full-screen views, side-step layouts, two-column layouts. The popup wizard won because WebFOCUS loved modals. It gave me breathing room for helper text and definitions.'], component: <MLBeatBreakthrough />, signal: 'WIZARD FLOW' },
    { type: 'execution', title: 'The Most Complex Screen', content: ['When I first saw the confusion matrix, I couldn\'t make sense of it. So I sat with the data scientist — a dozen sessions, paper and pen. I aligned the threshold slider exactly 90 degrees parallel to the chart point.'], component: <MLBeatConfusionMatrix />, signal: 'BEST SCREEN' },
    { type: 'execution', title: 'Understanding Feature Importances', content: ['I dug into how model predictions work, what feature importances actually mean, how SHAP values break down a prediction. That depth is what made the explainability popup real, not decorative.'], component: <MLBeatExplainability />, signal: 'DEEP LEARNING' },
    { type: 'impact', title: 'They Just Blazed Through It', content: ['Four SMEs. Separate sessions. I told them one thing: "It starts from the dataset." They right-clicked, saw Predict Data — and just blazed through it.'], component: <MLBeatValidation />, signal: '4/4 VALIDATED' },
]

/* ─── ML Hero Stats ─── */
const ML_HERO_STATS: HeroStat[] = [
    { label: 'Challenge', value: '~6 → 2', description: 'Clicks to start training' },
    { label: 'Result', value: '4/4 SMEs', description: 'Blazed through without help' },
    { label: 'Timeline', value: '', description: 'Design to production' },
]

/* ─── ML Act Sections ─── */
const ML_ACT_SECTIONS: ActSection[] = [
    { id: 'act-1-hook', label: 'I', title: 'The Side Project' },
    { id: 'act-2-investigation', label: 'II', title: 'One Path' },
    { id: 'act-3-architecture', label: 'III', title: 'The Entry Point' },
    { id: 'act-4-craft', label: 'IV', title: 'The Complex Screen' },
    { id: 'act-5-team', label: 'V', title: 'The Fight' },
    { id: 'act-6-outcome', label: 'VI', title: 'Validation' },
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
            heroBackground={<MLTrailer />}
            actSections={ML_ACT_SECTIONS}
        >
            <MLFullContent data={data} />
        </CinematicCaseStudy>
    )
}
