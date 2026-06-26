import React from 'react'

/* ─── StorySlide shape ─── consumed by PresentationLightbox.
 * Previously imported from a now-deleted StoryDeck module; the type
 * lives here where the data lives. */
export type StorySlideType = 'problem' | 'research' | 'decision' | 'execution' | 'lesson' | 'impact'

export interface StorySlide {
    type: StorySlideType
    title: string
    content: string[]
    component: React.ReactNode
    signal?: string
}

/* ─── RC Beat Imports ─── */
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

/* ─── ML Beat Imports ─── */
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

/* ─── DSML Beat Imports ─── */
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

export const RC_SLIDES: StorySlide[] = [
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

export const ML_SLIDES: StorySlide[] = [
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

export const DSML_SLIDES: StorySlide[] = [
    { type: 'problem', title: 'The Invisible Feature Problem', content: ['3 powerful AI features — NLQ, Insights, ML — buried in different menus. Near-zero adoption. Millions in engineering investment, effectively invisible.'], component: <DSMLBeatProblem />, signal: 'LOW ADOPTION' },
    { type: 'research', title: 'The Strategic Spark', content: ['Data Intelligence merger talks opened the door. My PM and I saw the opportunity for a shared AI hub. The merger dropped — the Hub idea stayed. Dozens of concept mockups. VP approved.'], component: <DSMLBeatSpark />, signal: 'VP APPROVED' },
    { type: 'execution', title: 'Upgrading the Building Blocks', content: ['Before building the Hub, I modernized each feature. NLQ upgraded to Phi-3 SLM — question suggestions, chart switching, ambiguity correction.'], component: <DSMLBeatModernize />, signal: 'MODERNIZED' },
    { type: 'decision', title: 'Architecture Before Tickets', content: ['I defined the architecture before any tickets existed. 3 scattered tools became 1 unified DSML Hub.'], component: <DSMLBeatArchitecture />, signal: '3 → 1 HUB' },
    { type: 'execution', title: 'Four Iterations', content: ['V1 too dense. V2 too passive. V3 competed with navigation. V4 — clean icon tiles — landed.'], component: <DSMLBeatIterations />, signal: 'V4 LANDED' },
    { type: 'decision', title: 'The Navigation Fight', content: ['Icon tiles vs. list views. Veteran architects wanted lists. I argued large tiles gave immediate context. I won.'], component: <DSMLBeatNavFight />, signal: 'I WON' },
    { type: 'lesson', title: 'The Room Full of Veterans', content: ['Director of Engineering, Principal Data Scientist, Head PM, Lead Architect — all decades of tenure. I was 2 years in. I was driving the conversation.'], component: <DSMLBeatVeterans />, signal: '2 YEARS IN' },
    { type: 'impact', title: 'Visibility Was the Solution', content: ['NLQ adoption +25% from discoverability alone — no feature changes. The patterns became the platform\'s AI strategy foundation.'], component: <DSMLBeatImpact />, signal: '+25% ADOPTION' },
]
