'use client'

/**
 * RCCaseStudyView — Client component that wires RC data into the reusable CinematicCaseStudy shell.
 */

import dynamic from 'next/dynamic'
import { CaseStudyData } from '@/types/caseStudy'
import CinematicCaseStudy, { type HeroStat, type ActSection } from '@/components/case-study-experiment/CinematicCaseStudy'
import { StorySlide } from '@/components/case-study/StoryDeck'
const RCFullContent = dynamic(() => import('@/components/case-study-experiment/RCFullContent'), { ssr: true })

/* ─── Beat Imports ─── */
import { RCWireframe } from '@/components/case-study/CaseStudyWireframes'
import BeatWeekOne from '@/components/case-study/storyboard/BeatWeekOne'
import BeatTheRoom from '@/components/case-study/storyboard/BeatTheRoom'
import BeatWhatIGot from '@/components/case-study/storyboard/BeatWhatIGot'
import BeatInvestigation from '@/components/case-study/storyboard/BeatInvestigation'
import BeatFragmentation from '@/components/case-study/storyboard/BeatFragmentation'
import BeatThreePivots from '@/components/case-study/storyboard/BeatThreePivots'
import BeatBreakthrough from '@/components/case-study/storyboard/BeatBreakthrough'
import BeatScheduler from '@/components/case-study/storyboard/BeatScheduler'
import BeatRecurrence from '@/components/case-study/storyboard/BeatRecurrence'
import JobLogRedesignViz from '@/components/case-study/JobLogRedesignViz'
import Beat250Screens from '@/components/case-study/storyboard/Beat250Screens'
import BeatTeamBuilding from '@/components/case-study/storyboard/BeatTeamBuilding'
import BeatHandoff from '@/components/case-study/storyboard/BeatHandoff'
import BeatImpact from '@/components/case-study/storyboard/BeatImpact'
import BeatAskedVsDelivered from '@/components/case-study/storyboard/BeatAskedVsDelivered'


/* ─── RC Presentation Slides ─── */
const RC_SLIDES: StorySlide[] = [
    { type: 'title', title: 'Customers Were Leaving. I Rebuilt the System.', content: ['Anuja Harsha — Senior Product Designer', 'Flagship Case Study @ Cloud Software Group'], backgroundComponent: <RCWireframe /> },
    { type: 'problem', title: 'Week 1. Zero Domain Knowledge.', content: ['I had never worked in data analytics. Never heard of BI tools. And I volunteered for the biggest project in the pipeline.'], component: <BeatWeekOne /> },
    { type: 'research', title: 'The Room', content: ['130+ years of combined experience. And me — 3 weeks in.'], component: <BeatTheRoom /> },
    { type: 'problem', title: 'What I Got', content: ['Three things. That\'s all.'], component: <BeatWhatIGot /> },
    { type: 'research', title: 'The Investigation', content: ['4 months of research that nobody expected — and nobody had ever done.'], component: <BeatInvestigation /> },
    { type: 'problem', title: 'What I Found — 5 Systems, 1 Product', content: ['5 fragmented sub-products. Zero documentation. 4 clicks just to start a task.'], component: <BeatFragmentation />, signal: 'CONSTRAINT: FRAGMENTATION' },
    { type: 'decision', title: 'Three Pivots to Clarity', content: ['V1 rejected. V2 rejected. V3 — the breakthrough.'], component: <BeatThreePivots />, signal: 'DECISION: ITERATION' },
    { type: 'execution', title: 'The Breakthrough — The + Menu', content: ['Three workflows. One button. Zero context switching.'], component: <BeatBreakthrough />, signal: 'STRATEGY: UNIFIED HUB' },
    { type: 'execution', title: 'Scheduler Redesign', content: ['Two separate entry points → One unified modal.'], component: <BeatScheduler />, signal: 'FEATURE: SCHEDULER' },
    { type: 'execution', title: 'Simplifying Recurrence', content: ['From cryptic codes to plain English.'], component: <BeatRecurrence />, signal: 'DECISION: PROGRESSIVE DISCLOSURE' },
    { type: 'execution', title: 'Job Log Redesign', content: ['Two broken workflows → One unified experience.'], component: <JobLogRedesignViz />, signal: 'FEATURE: CONTEXTUAL LOGS' },
    { type: 'execution', title: '250 Screens', content: ['Every edge case. Every state. Every error.'], component: <Beat250Screens />, signal: '250 SCREENS' },
    { type: 'execution', title: 'Building the Team', content: ['~20 people. I onboarded every single one.'], component: <BeatTeamBuilding />, signal: 'TEAM BUILDING' },
    { type: 'lesson', title: 'The Handoff', content: ['250+ files. A living Google Drive folder. The single source of truth.'], component: <BeatHandoff />, signal: 'HANDOFF' },
    { type: 'impact', title: 'Powering 15M+ Users', content: ['Shipped. Live. Mission-critical.'], component: <BeatImpact />, signal: 'OUTCOME: 15M+ USERS' },
    { type: 'impact', title: 'Asked vs. Delivered', content: ['They asked for a makeover. I rebuilt the engine.'], component: <BeatAskedVsDelivered />, signal: 'ASKED VS DELIVERED' },
]

/* ─── RC Hero Stats ─── */
const RC_HERO_STATS: HeroStat[] = [
    { label: 'Scale', value: '15M+ Users', description: 'Enterprise platform reach' },
    { label: 'Transformation', value: '5 → 1 Hub', description: 'Subsystems unified' },
    { label: 'Timeline', value: '', description: 'Research to production' },
]

/* ─── RC Act Sections ─── */
const RC_ACT_SECTIONS: ActSection[] = [
    { id: 'act-i', label: 'I', title: 'The Beginning' },
    { id: 'act-ii', label: 'II', title: 'Research' },
    { id: 'act-iii', label: 'III', title: 'Discovery' },
    { id: 'act-iv', label: 'IV', title: 'Architecture' },
    { id: 'act-v', label: 'V', title: 'Team' },
    { id: 'act-vi', label: 'VI', title: 'Outcome' },
    { id: 'act-reflection', label: '✦', title: 'Reflection' },
]


export default function RCCaseStudyView({ data }: { data: CaseStudyData }) {
    // Fill in the timeframe from data
    const stats = RC_HERO_STATS.map(s =>
        s.label === 'Timeline' ? { ...s, value: data.timeframe || '2+ Years' } : s
    )

    return (
        <CinematicCaseStudy
            data={data}
            slides={RC_SLIDES}
            theme="rc"
            heroStats={stats}
            heroBackground={<RCWireframe />}
            actSections={RC_ACT_SECTIONS}
        >
            <RCFullContent data={data} />
        </CinematicCaseStudy>
    )
}
