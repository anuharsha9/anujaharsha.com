'use client'

/**
 * DSMLCaseStudyView — Client component that wires DSML/IQ Plugin data
 * into the reusable CinematicCaseStudy shell.
 */

import dynamic from 'next/dynamic'
import { CaseStudyData } from '@/types/caseStudy'
import CinematicCaseStudy, { type HeroStat, type ActSection } from '@/components/case-study-experiment/CinematicCaseStudy'
import { StorySlide } from '@/components/case-study/StoryDeck'
const DSMLFullContent = dynamic(() => import('@/components/case-study-experiment/DSMLFullContent'), { ssr: true })
import { IQWireframe } from '@/components/case-study/CaseStudyWireframes'

/* ─── Beat Imports ─── */
import {
    DSMLBeatProblem,
    DSMLBeatSpark,
    DSMLBeatModernize,
    DSMLBeatArchitecture,
    DSMLBeatIterations,
    DSMLBeatNavFight,
    DSMLBeatVeterans,
    DSMLBeatImpact,
} from '@/components/case-study/storyboard/DSMLMovieBeats'


/* ─── DSML Presentation Slides ─── */
const DSML_SLIDES: StorySlide[] = [
    { type: 'title', title: 'We Built the Intelligence. Nobody Knew It Existed.', content: ['Anuja Harsha — Lead Product Designer', 'DSML Hub · Cloud Software Group — WebFOCUS'], backgroundComponent: <IQWireframe /> },
    { type: 'problem', title: 'The Invisible Feature Problem', content: ['3 powerful AI features — NLQ, Insights, ML — buried in different menus. <5% adoption. Millions in engineering investment, effectively invisible.'], component: <DSMLBeatProblem />, signal: '<5% ADOPTION' },
    { type: 'research', title: 'The Strategic Spark', content: ['This wasn\'t assigned — it was invented. My PM and I saw the opportunity, built dozens of concept mockups, and pitched the vision. VP approved.'], component: <DSMLBeatSpark />, signal: 'VP APPROVED' },
    { type: 'execution', title: 'Terminal → Apple UI', content: ['Before building the Hub, I modernized the building blocks. NLQ and Insights went from terminal-style interfaces to clean, approachable UI.'], component: <DSMLBeatModernize />, signal: 'MODERNIZED' },
    { type: 'decision', title: 'Architecture Before Tickets', content: ['I defined the architecture before any tickets existed. 3 scattered tools became 1 unified DSML Hub.'], component: <DSMLBeatArchitecture />, signal: '3 → 1 HUB' },
    { type: 'execution', title: 'Four Iterations', content: ['V1 too dense. V2 too passive. V3 competed with navigation. V4 — clean icon tiles — landed.'], component: <DSMLBeatIterations />, signal: 'V4 LANDED' },
    { type: 'decision', title: 'The Navigation Fight', content: ['Icon tiles vs. list views. Veteran architects wanted lists. I argued large tiles gave immediate context. I won.'], component: <DSMLBeatNavFight />, signal: 'I WON' },
    { type: 'lesson', title: 'The Room Full of Veterans', content: ['Director of Engineering, Principal Data Scientist, Head PM, Lead Architect — all decades of tenure. I was 2 years in. I was driving the conversation.'], component: <DSMLBeatVeterans />, signal: '2 YEARS IN' },
    { type: 'impact', title: 'Visibility Was the Solution', content: ['NLQ adoption +25% from discoverability alone — no feature changes. The patterns became the platform\'s AI strategy foundation.'], component: <DSMLBeatImpact />, signal: '+25% ADOPTION' },
]

/* ─── DSML Hero Stats ─── */
const DSML_HERO_STATS: HeroStat[] = [
    { label: 'Problem', value: '<5% Adoption', description: 'Three AI features, invisible' },
    { label: 'Solution', value: '3 → 1 Hub', description: 'Unified discovery surface' },
    { label: 'Timeline', value: '', description: 'Architecture to production' },
]

/* ─── DSML Act Sections ─── */
const DSML_ACT_SECTIONS: ActSection[] = [
    { id: 'act-1-hook', label: 'I', title: 'The Hook' },
    { id: 'act-2-investigation', label: 'II', title: 'Investigation' },
    { id: 'act-3-architecture', label: 'III', title: 'Architecture' },
    { id: 'act-4-craft', label: 'IV', title: 'Craft' },
    { id: 'act-5-team', label: 'V', title: 'Team' },
    { id: 'act-6-outcome', label: 'VI', title: 'Outcome' },
]


export default function DSMLCaseStudyView({ data }: { data: CaseStudyData }) {
    const stats = DSML_HERO_STATS.map(s =>
        s.label === 'Timeline' ? { ...s, value: data.timeframe || '1+ Year' } : s
    )

    return (
        <CinematicCaseStudy
            data={data}
            slides={DSML_SLIDES}
            theme="dsml"
            heroStats={stats}
            heroBackground={<IQWireframe />}
            actSections={DSML_ACT_SECTIONS}
        >
            <DSMLFullContent data={data} />
        </CinematicCaseStudy>
    )
}
