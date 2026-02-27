'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CaseStudyData } from '@/types/caseStudy'
import HeroSection from './HeroSection'
import QuickOverviewSection from './QuickOverviewSection'
import { ScaleAndResponsibility } from '@/components/case-study/ScaleAndResponsibility'
import ReadingProgress from '@/components/case-study/ReadingProgress'
import ViewModeToggle from '@/components/case-study/ViewModeToggle'
import SectionNav from '@/components/case-study/SectionNav'
import CaseStudySection from '@/components/case-study/CaseStudySection'
import SectionBlock from '@/components/case-study/SectionBlock'
import FrameworkMatrix from '@/components/case-study/FrameworkMatrix'
import DesignSystemShowcase from '@/components/case-study/DesignSystemShowcase'
import PrototypeBlock from '@/components/case-study/PrototypeBlock'
import ReportCasterTimeline from '@/components/case-study/ReportCasterTimeline'
import SystemArchaeology from '@/components/case-study/SystemArchaeology'
import ResearchConstraints from '@/components/case-study/ResearchConstraints'
import SystemConsolidationMap from '@/components/case-study/SystemConsolidationMap'
import ArchitectureBlueprint from '@/components/case-study/ArchitectureBlueprint'
import OwnershipScope from '@/components/case-study/OwnershipScope'
import TeamCollaboration from '@/components/case-study/TeamCollaboration'
import ImpactDiff from '@/components/case-study/ImpactDiff'

import VersionIteration from '@/components/case-study/VersionIteration'
import PlusMenuInsight from '@/components/case-study/PlusMenuInsight'
import ScheduleWorkflowComparison from '@/components/case-study/ScheduleWorkflowComparison'
import NaturalLanguageInsight from '@/components/case-study/NaturalLanguageInsight'

import SystemIndex from '@/components/case-study/SystemIndex'
import LetsTalkCTA from '@/components/case-study/LetsTalkCTA'
import ScrollGear from '@/components/ui/ScrollGear'
import ComponentHeading from '@/components/ui/ComponentHeading'
import { rcArchitectureBlueprint, mlArchitectureBlueprint, iqArchitectureBlueprint } from '@/data/architecture-blueprint'
import { teamCollaborationData } from '@/data/team-collaboration'
import { rcResearchConstraints, mlResearchConstraints } from '@/data/research-constraints'
import ImpactOutcomes from '@/components/case-study/ImpactOutcomes'
import { rcImpactOutcomes, mlImpactOutcomes, iqImpactOutcomes } from '@/data/impact-outcomes'
import StoryDeck, { StorySlide } from '@/components/case-study/StoryDeck'
import { RCWireframe, MLWireframe, IQWireframe } from '@/components/case-study/CaseStudyWireframes'
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
import CraftShowcase from '@/components/case-study/CraftShowcase'
import { rcCraftShowcase, mlCraftShowcase, iqCraftShowcase } from '@/data/craft-showcase'
import Beat250Screens from '@/components/case-study/storyboard/Beat250Screens'
import BeatTeamBuilding from '@/components/case-study/storyboard/BeatTeamBuilding'
import BeatHandoff from '@/components/case-study/storyboard/BeatHandoff'
import BeatImpact from '@/components/case-study/storyboard/BeatImpact'
import BeatAskedVsDelivered from '@/components/case-study/storyboard/BeatAskedVsDelivered'

// ── ML Presentation Beat Components ──
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

// ── ML Functions Components ──
import MLKnowledgeGapSystem from '@/components/case-study/MLKnowledgeGapSystem'
import MLChallengeBreakdown from '@/components/case-study/MLChallengeBreakdown'

import MLPersonaCards from '@/components/case-study/MLPersonaCards'
import MLWorkflowMapping from '@/components/case-study/MLWorkflowMapping'
import MLExplainabilityHighlight from '@/components/case-study/MLExplainabilityHighlight'


import CaseStudyReflection from '@/components/case-study/CaseStudyReflection'
import AutoSequenceDataViewer from '@/components/case-study/AutoSequenceDataViewer'

import ThreeCriticalPivots from '@/components/case-study/ThreeCriticalPivots'
import LayeredDisclosureVisual from '@/components/case-study/LayeredDisclosureVisual'



// ── DSML/IQ Presentation Beat Components ──
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

// ── IQ/DSML Components ──
import IQPersonaCards from '@/components/case-study/IQPersonaCards'
import IQBusinessCase from '@/components/case-study/IQBusinessCase'






import IQWorkflowComparison from '@/components/case-study/IQWorkflowComparison'



/* ─────────────────────────────────────────────
    CaseStudyPage — Story-First Architecture
    
    6-Act Structure:
    ─────────────────────────────────────────
    ACT I    │ THE HOOK          │ Why me? Why this?
    ACT II   │ THE INVESTIGATION │ How deep I went
    ACT III  │ THE ARCHITECTURE  │ How I think
    ACT IV   │ THE CRAFT         │ What I built
    ACT V    │ THE TEAM          │ How I led
    ACT VI   │ THE OUTCOME       │ What shipped
    ─────────────────────────────────────────
    
    Supports Presentation (StoryDeck) / Full toggle.
    ───────────────────────────────────────────── */


// Section nav mappings for the 6-act structure
const actSections = [
    { id: 'act-1-hook', title: 'Hook', index: 'I' },
    { id: 'act-2-investigation', title: 'Investigation', index: 'II' },
    { id: 'act-3-architecture', title: 'Architecture', index: 'III' },
    { id: 'act-4-craft', title: 'Craft', index: 'IV' },
    { id: 'act-5-team', title: 'Team', index: 'V' },
    { id: 'act-6-outcome', title: 'Outcome', index: 'VI' },
]

// Keep framework mappings for non-RC case studies
const frameworkSectionMappings: Record<string, string> = {
    'D — Discover': 'section-01',
    'E — Empathize': 'section-02',
    'S — Synthesize': 'section-03',
    'I — Iterate': 'section-04',
    'G — Govern': 'section-05',
    'N — Navigate': 'section-06',
}

interface CaseStudyPageProps {
    data: CaseStudyData
    defaultViewMode?: 'full' | 'presentation'
    quickOverviewOverrides?: {
        title?: string
        subtitle?: string
        narrative?: string
        achievements?: { metric: string; context: string }[]
        star?: { situation: string; task: string; action: string; result: string }
    }
}

export default function CaseStudyPage({
    data,
    defaultViewMode = 'presentation',
    quickOverviewOverrides,
}: CaseStudyPageProps) {
    const [viewMode, setViewMode] = useState<'full' | 'presentation'>(defaultViewMode)
    const router = useRouter()

    // X / ESC in presentation → go back to landing page work overview
    const handlePresentationClose = useCallback(() => {
        router.push('/#work-overview')
    }, [router])

    // ── Build presentation slides ──
    const presentationSlides = useMemo(() => {
        if (data.slug === 'reportcaster') {
            const storyboardSlides: StorySlide[] = [
                // ── Beat 0: Title ──
                {
                    type: 'title',
                    title: 'Customers Were Leaving. I Rebuilt the System.',
                    content: ['Anuja Harsha — Senior Product Designer', 'Flagship Case Study @ Cloud Software Group'],
                    backgroundComponent: <RCWireframe />,
                },
                // ── Beat 1: Week 1 ──
                {
                    type: 'problem',
                    title: 'Week 1. Zero Domain Knowledge.',
                    content: ['I had never worked in data analytics. Never heard of BI tools. And I volunteered for the biggest project in the pipeline.'],
                    component: <BeatWeekOne />,
                },
                // ── Beat 2: The Room ──
                {
                    type: 'research',
                    title: 'The Room',
                    content: ['130+ years of combined experience. And me — 3 weeks in.'],
                    component: <BeatTheRoom />,
                },
                // ── Beat 3: What I Got ──
                {
                    type: 'problem',
                    title: 'What I Got',
                    content: ['Three things. That\'s all.'],
                    component: <BeatWhatIGot />,
                },
                // ── Beat 4: The Investigation ──
                {
                    type: 'research',
                    title: 'The Investigation',
                    content: ['4 months of research that nobody expected — and nobody had ever done.'],
                    component: <BeatInvestigation />,
                },
                // ── Beat 5: What I Found — Fragmentation ──
                {
                    type: 'problem',
                    title: 'What I Found — 5 Systems, 1 Product',
                    content: [
                        '5 fragmented sub-products. Zero documentation. 4 clicks just to start a task.',
                    ],
                    component: <BeatFragmentation />,
                    signal: 'CONSTRAINT: FRAGMENTATION',
                },
                // ── Beat 6: Three Pivots ──
                {
                    type: 'decision',
                    title: 'Three Pivots to Clarity',
                    content: [
                        'V1 rejected. V2 rejected. V3 — the breakthrough.',
                    ],
                    component: <BeatThreePivots />,
                    signal: 'DECISION: ITERATION',
                },
                // ── Beat 7: The Breakthrough — + Menu ──
                {
                    type: 'execution',
                    title: 'The Breakthrough — The + Menu',
                    content: [
                        'Three workflows. One button. Zero context switching.',
                    ],
                    component: <BeatBreakthrough />,
                    signal: 'STRATEGY: UNIFIED HUB',
                },
                // ── Beat 8: Scheduler Redesign ──
                {
                    type: 'execution',
                    title: 'Scheduler Redesign',
                    content: [
                        'Two separate entry points → One unified modal.',
                    ],
                    component: <BeatScheduler />,
                    signal: 'FEATURE: SCHEDULER',
                },
                // ── Beat 9: Recurrence Redesign ──
                {
                    type: 'execution',
                    title: 'Simplifying Recurrence',
                    content: [
                        'From cryptic codes to plain English.',
                    ],
                    component: <BeatRecurrence />,
                    signal: 'DECISION: PROGRESSIVE DISCLOSURE',
                },
                // ── Beat 10: Job Log Redesign ──
                {
                    type: 'execution',
                    title: 'Job Log Redesign',
                    content: ['Two broken workflows → One unified experience.'],
                    component: <JobLogRedesignViz />,
                    signal: 'FEATURE: CONTEXTUAL LOGS',
                },
                // ── Beat 11: 250 Screens ──
                {
                    type: 'execution',
                    title: '250 Screens',
                    content: [
                        'Every edge case. Every state. Every error.',
                    ],
                    component: <Beat250Screens />,
                    signal: '250 SCREENS',
                },
                // ── Beat 12: Building the Team ──
                {
                    type: 'execution',
                    title: 'Building the Team',
                    content: [
                        '~20 people. I onboarded every single one.',
                    ],
                    component: <BeatTeamBuilding />,
                    signal: 'TEAM BUILDING',
                },
                // ── Beat 13: The Handoff ──
                {
                    type: 'lesson',
                    title: 'The Handoff',
                    content: [
                        '250+ files. A living Google Drive folder. The single source of truth.',
                    ],
                    component: <BeatHandoff />,
                    signal: 'HANDOFF',
                },
                // ── Beat 14: Shipped + Impact ──
                {
                    type: 'impact',
                    title: 'Powering 20M+ Schedules',
                    content: [
                        'Shipped. Live. Mission-critical.',
                    ],
                    component: <BeatImpact />,
                    signal: 'OUTCOME: 20M+ SCHEDULES',
                },
                // ── Beat 15: Asked vs. Delivered ──
                {
                    type: 'impact',
                    title: 'Asked vs. Delivered',
                    content: [
                        'They asked for a makeover. I rebuilt the engine.',
                    ],
                    component: <BeatAskedVsDelivered />,
                    signal: 'ASKED VS DELIVERED',
                },
            ]
            return storyboardSlides
        }

        if (data.slug === 'ml-functions') {
            const mlStoryboardSlides: StorySlide[] = [
                // ── Beat 0: Title ──
                {
                    type: 'title',
                    title: 'Democratizing Machine Learning for Everyone',
                    content: ['Anuja Harsha — Lead Product Designer', 'ML Functions · Cloud Software Group — WebFOCUS'],
                    backgroundComponent: <MLWireframe />,
                },
                // ── Beat 1: The Business Problem ──
                {
                    type: 'problem',
                    title: 'The Business Problem',
                    content: ['0% feature adoption. A powerful ML engine buried in a data flow canvas — 12+ clicks, cascading context menus, confusing error states.'],
                    component: <MLBeatProblem />,
                    signal: 'ZERO ADOPTION',
                },
                // ── Beat 2: Earning Trust ──
                {
                    type: 'research',
                    title: 'Earning Trust',
                    content: ['Our DS handed me a side challenge: recreate an external explainability tool in WebFOCUS. I nailed it. That earned the trust to own the entire ML UX revamp.'],
                    component: <MLBeatOrigin />,
                    signal: 'SIDE PROJECT',
                },
                // ── Beat 3: The Goal ──
                {
                    type: 'research',
                    title: 'The Goal',
                    content: ['Democratize ML for non-technical users. No code, no confusion, no dead-ends.'],
                    component: <MLBeatGoal />,
                    signal: 'DEMOCRATIZE ML',
                },
                // ── Beat 4: Domain Expertise ──
                {
                    type: 'research',
                    title: 'Earning the Domain',
                    content: ['Zero ML background → MIT certified. Months embedded with our Principal Data Scientist.'],
                    component: <MLBeatDiscovery />,
                    signal: 'MIT CERTIFIED',
                },
                // ── Beat 5: Entry Point ──
                {
                    type: 'execution',
                    title: 'Designing the Entry Point',
                    content: ['No entry point existed. I designed the Predict Data landing page from scratch.'],
                    component: <MLBeatEntryPoint />,
                    signal: 'RIGHT-CLICK ENTRY',
                },
                // ── Beat 6: Guided Wizard ──
                {
                    type: 'execution',
                    title: 'Guided Wizard',
                    content: ['12+ clicks through data flows and menus → ~6 steps in one guided flow.'],
                    component: <MLBeatBreakthrough />,
                    signal: '12+ → ~6 STEPS',
                },
                // ── Beat 7: Confusion Matrix UX ──
                {
                    type: 'execution',
                    title: 'Confusion Matrix UX',
                    content: ['The confusion matrix was already visual but interactive features were invisible. 10+ iterations: a threshold slider that updates every graph in real time.'],
                    component: <MLBeatConfusionMatrix />,
                    signal: 'INTERACTIVE',
                },
                // ── Beat 8: Model Explainability ──
                {
                    type: 'execution',
                    title: 'Model Explainability',
                    content: ['Our DS handed me a screenshot from an external tool. I built a native explainability popup — feature importances, prediction breakdowns.'],
                    component: <MLBeatExplainability />,
                    signal: 'WHY THIS PREDICTION?',
                },
                // ── Beat 9: Validation ──
                {
                    type: 'impact',
                    title: 'Validation & Impact',
                    content: ['5/5 SMEs completed the flow without help. Patterns became foundation for IQ Plugin.'],
                    component: <MLBeatValidation />,
                    signal: '5/5 SUCCESS',
                },
            ]
            return mlStoryboardSlides
        }

        if (data.slug === 'iq-plugin') {
            const dsmlStoryboardSlides: StorySlide[] = [
                // ── Beat 0: Title ──
                {
                    type: 'title',
                    title: 'We Built the Intelligence. Nobody Knew It Existed.',
                    content: ['Anuja Harsha — Lead Product Designer', 'DSML Hub · Cloud Software Group — WebFOCUS'],
                    backgroundComponent: <IQWireframe />,
                },
                // ── Beat 1: The Invisible Feature Problem ──
                {
                    type: 'problem',
                    title: 'The Invisible Feature Problem',
                    content: ['3 powerful AI features — NLQ, Insights, ML — buried in different menus. <5% adoption. Millions in engineering investment, effectively invisible.'],
                    component: <DSMLBeatProblem />,
                    signal: '<5% ADOPTION',
                },
                // ── Beat 2: The Strategic Spark ──
                {
                    type: 'research',
                    title: 'The Strategic Spark',
                    content: ['This wasn\'t assigned — it was invented. My PM and I saw the opportunity, built dozens of concept mockups, and pitched the vision. VP approved.'],
                    component: <DSMLBeatSpark />,
                    signal: 'VP APPROVED',
                },
                // ── Beat 3: Modernizing the Building Blocks ──
                {
                    type: 'execution',
                    title: 'Terminal → Apple UI',
                    content: ['Before building the Hub, I modernized the building blocks. NLQ and Insights went from terminal-style interfaces to clean, approachable UI.'],
                    component: <DSMLBeatModernize />,
                    signal: 'MODERNIZED',
                },
                // ── Beat 4: Architecture Before Tickets ──
                {
                    type: 'decision',
                    title: 'Architecture Before Tickets',
                    content: ['I defined the architecture before any tickets existed. 3 scattered tools became 1 unified DSML Hub.'],
                    component: <DSMLBeatArchitecture />,
                    signal: '3 → 1 HUB',
                },
                // ── Beat 5: Four Iterations ──
                {
                    type: 'execution',
                    title: 'Four Iterations',
                    content: ['V1 too dense. V2 too passive. V3 competed with navigation. V4 — clean icon tiles — landed.'],
                    component: <DSMLBeatIterations />,
                    signal: 'V4 LANDED',
                },
                // ── Beat 6: The Navigation Fight ──
                {
                    type: 'decision',
                    title: 'The Navigation Fight',
                    content: ['Icon tiles vs. list views. Veteran architects wanted lists. I argued large tiles gave immediate context. I won.'],
                    component: <DSMLBeatNavFight />,
                    signal: 'I WON',
                },
                // ── Beat 7: The Room Full of Veterans ──
                {
                    type: 'lesson',
                    title: 'The Room Full of Veterans',
                    content: ['Director of Engineering, Principal Data Scientist, Head PM, Lead Architect — all decades of tenure. I was 2 years in. I was driving the conversation.'],
                    component: <DSMLBeatVeterans />,
                    signal: '2 YEARS IN',
                },
                // ── Beat 8: Visibility Was the Solution ──
                {
                    type: 'impact',
                    title: 'Visibility Was the Solution',
                    content: ['NLQ adoption +25% from discoverability alone — no feature changes. The patterns became the platform\'s AI strategy foundation.'],
                    component: <DSMLBeatImpact />,
                    signal: '+25% ADOPTION',
                },
            ]
            return dsmlStoryboardSlides
        }

        // All other case studies: use data file slides
        const slides = (data.presentation?.slides || []) as StorySlide[]
        return slides
    }, [data])

    const hasPresentation = !!data.presentation
    const isRC = data.slug === 'reportcaster'
    const isML = data.slug === 'ml-functions'
    const isIQ = data.slug === 'iq-plugin'
    const is6Act = isRC || isML || isIQ

    // Get specific sections by ID for RC restructure
    const getSection = (id: string) => data.sections.find(s => s.id === id)

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            {/* ── Sticky View Mode Toggle ──── */}
            <ViewModeToggle
                viewMode={viewMode}
                setViewMode={setViewMode}
                hasPresentation={hasPresentation}
            />

            {/* ── Reading Progress (Full Mode Only) ── */}
            {viewMode === 'full' && <ReadingProgress />}

            {/* ── Presentation Mode — StoryDeck ── */}
            {viewMode === 'presentation' && hasPresentation && (
                <StoryDeck
                    slides={presentationSlides}
                    onExit={() => setViewMode('full')}
                    onClose={handlePresentationClose}
                />
            )}

            {/* ── Section Navigation (Full Mode Only) ── */}
            {viewMode === 'full' && is6Act && (
                <SectionNav sections={actSections} />
            )}
            {viewMode === 'full' && !is6Act && data.sections && data.sections.length > 0 && (
                <SectionNav sections={data.sections} />
            )}

            {/* ============================================
                FULL CASE STUDY CONTENT
                (Hidden in presentation mode)
                ============================================ */}
            <div style={{ display: viewMode === 'presentation' ? 'none' : 'contents' }}>

                {/* ═══════════════════════════════════════════
                    ACT 0: HERO
                    ═══════════════════════════════════════════ */}
                <HeroSection data={data} />


                {isRC ? (
                    /* ═══════════════════════════════════════
                       REPORTCASTER — STORY-FIRST LAYOUT
                       ═══════════════════════════════════════ */
                    <>
                        {/* ═══════════════════════════════════════════
                            ACT I: THE HOOK
                            "Week 1. A Product That Had Never Been Touched by Design."
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-1-hook"
                            eyebrow="Act I"
                            title="Week 1. A Product That Had Never Been Touched by Design."
                            subtitle={getSection('section-01')?.summary}
                        >
                            {/* Section 01 narrative body — the "I'll do it" story */}
                            <SectionBlock
                                section={getSection('section-01')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />

                            {/* SystemArchaeology — the "50-year-old black box" discovery */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <SystemArchaeology isLightBackground={false} caseStudySlug={data.slug} />
                            </div>
                        </CaseStudySection>


                        {/* ═══════════════════════════════════════════
                            ACT II: THE INVESTIGATION
                            "No Users. No Docs. So I Built My Own Research Network."
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-2-investigation"
                            eyebrow="Act II"
                            title="No Users. No Docs. So I Built My Own Research Network."
                            subtitle={getSection('section-02')?.summary}
                        >
                            {/* Section 02 narrative — enterprise research constraints */}
                            <SectionBlock
                                section={getSection('section-02')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />

                            {/* Enterprise Research Constraints */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <ResearchConstraints data={rcResearchConstraints} isLightBackground={false} />
                            </div>

                            {/* Section 03 body — "This became a detective story" */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <SectionBlock
                                    section={getSection('section-03')!}
                                    isLightBackground={false}
                                    caseStudySlug={data.slug}
                                    isUnlocked={true}
                                    password="anu-access"
                                    hideHeader
                                />
                            </div>

                        </CaseStudySection>


                        {/* ═══════════════════════════════════════════
                            ACT III: THE ARCHITECTURE
                            "5 Systems. 2 Rejections. 1 Breakthrough."
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-3-architecture"
                            eyebrow="Act III"
                            title="5 Systems. 2 Rejections. 1 Breakthrough."
                            subtitle={getSection('section-04')?.summary}
                        >
                            {/* Sketches + Workflow Map */}
                            <ArchitectureBlueprint data={rcArchitectureBlueprint} />

                            {/* 5→1 Consolidation Map + System Mapping (combined) */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <SystemConsolidationMap isLightBackground={false} />
                            </div>

                            {/* V1 / V2 / V3 Design Evolution */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <VersionIteration
                                    v1={getSection('section-04')?.v1Data}
                                    v2={getSection('section-04')?.v2Data}
                                    v3={getSection('section-04')?.v3Data}
                                    isLightBackground={false}
                                />
                            </div>

                            {/* V3 Design Evolution — tabbed subsystem screens */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <CraftShowcase data={rcCraftShowcase} />
                            </div>

                            {/* The Breakthrough — "How does the platform WANT workflows to behave?" */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <PlusMenuInsight isLightBackground={false} />
                            </div>
                        </CaseStudySection>


                        {/* ═══════════════════════════════════════════
                            ACT IV: THE CRAFT
                            "What I Built: From Dialog to Ecosystem"
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-4-craft"
                            eyebrow="Act IV"
                            title="What I Built: From Dialog to Ecosystem"
                        >
                            {/* Click reduction — 5+ clicks vs 2 clicks */}
                            <ScheduleWorkflowComparison isLightBackground={false} />

                            {/* Natural language recurrence — "one detail I'm proud of" */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <NaturalLanguageInsight isLightBackground={false} />
                            </div>

                            {/* Before/After video walkthroughs */}
                            {data.prototypeMedia && (
                                <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                    <PrototypeBlock
                                        prototypeMedia={data.prototypeMedia}
                                        caseStudySlug={data.slug}
                                        isLightBackground={false}
                                        password="anu-access"
                                    />
                                </div>
                            )}

                            {/* Side-by-side static comparison */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <div className="mb-8">
                                    <ComponentHeading
                                        variant="block"
                                        align="center"
                                        title="Side-by-Side Comparison"
                                        color="teal"
                                    />
                                </div>
                                <ImpactDiff
                                    beforeImage="/images/case-study/ReportCaster/Before.png"
                                    afterImage="/images/case-study/ReportCaster/After.png"
                                    beforeLabel="Legacy"
                                    afterLabel="Redesign"
                                    beforeTitle="legacy_report.exe"
                                    afterTitle="modern_dashboard.tsx"
                                    isLightBackground={false}
                                />
                            </div>
                        </CaseStudySection>

                        {/* ── Design System Showcase ──── */}
                        <section className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                            <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                                <DesignSystemShowcase isLightBackground={true} caseStudySlug={data.slug} />
                            </div>
                        </section>


                        {/* ═══════════════════════════════════════════
                            ACT V: THE TEAM
                            "I Onboarded 20 People. Then I Let Go."
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-5-team"
                            eyebrow="Act V"
                            title="I Onboarded 20 People. Then I Let Go."
                            subtitle={getSection('section-05')?.summary}
                        >
                            {/* Section 05 narrative — onboarding, mentorship, knowledge transfer */}
                            <SectionBlock
                                section={getSection('section-05')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />


                            {/* Cross-functional collaboration */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <TeamCollaboration data={teamCollaborationData['reportcaster']} accentColor="amber" />
                            </div>
                        </CaseStudySection>


                        {/* ═══════════════════════════════════════════
                            ACT VI: THE OUTCOME
                            "Asked For a Makeover. Delivered a New Product."
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-6-outcome"
                            eyebrow="Act VI"
                            title="Asked For a Makeover. Delivered a New Product."
                            subtitle={getSection('section-06')?.summary}
                        >
                            {/* Section 06 narrative — customer validation */}
                            <SectionBlock
                                section={getSection('section-06')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />

                            {/* Impact Outcomes */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <ImpactOutcomes data={rcImpactOutcomes} isLightBackground={false} />
                            </div>

                            {/* Scale & Responsibility — animated metrics */}
                            {data.scaleAndResponsibility && (
                                <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                    <ScaleAndResponsibility
                                        data={data.scaleAndResponsibility}
                                        accentColor="teal"
                                    />
                                </div>
                            )}

                            {/* Reflection — Testimonials + Retrospective */}
                            {data.reflection && (
                                <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                    <CaseStudyReflection data={data.reflection} isLightBackground={false} />
                                </div>
                            )}
                        </CaseStudySection>
                    </>

                ) : isML ? (
                    /* ═══════════════════════════════════════
                       ML FUNCTIONS — STORY-FIRST LAYOUT
                       ═══════════════════════════════════════ */
                    <>
                        {/* ═══════════════════════════════════════════
                            ACT I: THE HOOK
                            "Zero ML Knowledge. So I Got MIT Certified."
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-1-hook"
                            eyebrow="Act I"
                            title="Zero ML Knowledge. So I Got MIT Certified."
                            subtitle={getSection('section-01')?.summary}
                        >
                            {/* Section 01 narrative — how I earned the project */}
                            <SectionBlock
                                section={getSection('section-01')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />

                            {/* Knowledge Gap System — MIT cert, DS embedding, AI learning */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <MLKnowledgeGapSystem isLightBackground={false} />
                            </div>

                            {/* Challenge Breakdown — 4 audit cards of legacy pain points */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <MLChallengeBreakdown isLightBackground={false} />
                            </div>
                        </CaseStudySection>


                        {/* ═══════════════════════════════════════════
                            ACT II: THE INVESTIGATION
                            "No Users. No Access. So I Built a Proxy Network."
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-2-investigation"
                            eyebrow="Act II"
                            title="No Users. No Access. So I Built a Proxy Network."
                            subtitle={getSection('section-02')?.summary}
                        >
                            {/* Section 02 narrative — empathizing with the ecosystem */}
                            <SectionBlock
                                section={getSection('section-02')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />

                            {/* NOTE: ResearchApproach removed — its ML content (MIT cert, DS embedding,
                               AI-accelerated learning) duplicates MLKnowledgeGapSystem in Act I */}

                            {/* Enterprise Research Constraints */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <ResearchConstraints data={mlResearchConstraints} isLightBackground={false} />
                            </div>

                            {/* Persona Cards — Techy Analyst & Financial Strategist */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <MLPersonaCards isLightBackground={false} />
                            </div>

                            {/* NOTE: MarketAnalysis skipped — competitiveResponse data is simple text,
                               doesn't match the rich MarketAnalysis interface. Key competitive context
                               is covered in the section narrative above. */}
                        </CaseStudySection>


                        {/* ═══════════════════════════════════════════
                            ACT III: THE ARCHITECTURE
                            "From Black Box to 4-Step Guided Flow."
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-3-architecture"
                            eyebrow="Act III"
                            title="From Black Box to 4-Step Guided Flow."
                            subtitle={getSection('section-03')?.summary}
                        >
                            {/* Section 03 narrative — simplifying the chaos */}
                            <SectionBlock
                                section={getSection('section-03')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />

                            {/* Sketches + Architecture Diagrams */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <ArchitectureBlueprint data={mlArchitectureBlueprint} />
                            </div>

                            {/* Workflow Mapping — the 4-step mapped flow */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <MLWorkflowMapping isLightBackground={false} />
                            </div>

                            {/* Three Critical Design Pivots */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <ThreeCriticalPivots isLightBackground={false} />
                            </div>
                        </CaseStudySection>


                        {/* ═══════════════════════════════════════════
                            ACT IV: THE CRAFT
                            "10+ Iterations. One Breakthrough Screen."
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-4-craft"
                            eyebrow="Act IV"
                            title="10+ Iterations. One Breakthrough Screen."
                            subtitle={getSection('section-04')?.summary}
                        >
                            {/* Section 04 narrative — iterating with inclusion */}
                            <SectionBlock
                                section={getSection('section-04')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />

                            {/* Layered Disclosure Strategy */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <LayeredDisclosureVisual isLightBackground={false} />
                            </div>

                            {/* Design Iteration Log — IDE-style artifact explorer */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <CraftShowcase data={mlCraftShowcase} />
                            </div>
                            {/* Shipped Screens — auto-playing UI screenshots */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <ComponentHeading
                                    variant="block"
                                    align="center"
                                    title="The Guided 4-Step Workflow"
                                    description="Every screen of the redesigned ML wizard."
                                    color="teal"
                                    className="mb-8"
                                />
                                <AutoSequenceDataViewer
                                    images={[
                                        { src: '/images/case-study/ml-functions/1. Predict Data - Train Models - Empty State.png', alt: 'Empty State — Train Models', caption: 'Entry Point: Empty state with clear call-to-action' },
                                        { src: '/images/case-study/ml-functions/4. Train Model Workflow - Step 1 - Select Problem Type.png', alt: 'Step 1 — Select Problem Type', caption: 'Step 1: Select Problem Type' },
                                        { src: '/images/case-study/ml-functions/5. Train Model Workflow - Step 2 - Specify Problem.png', alt: 'Step 2 — Specify Problem', caption: 'Step 2: Specify Problem Details' },
                                        { src: '/images/case-study/ml-functions/6. Train Model Workflow - Step 3 - Select Predictors.png', alt: 'Step 3 — Select Predictors', caption: 'Step 3: Select Predictors' },
                                        { src: '/images/case-study/ml-functions/7. Train Model Workflow - Step 4 - Configure Hyperparameters.png', alt: 'Step 4 — Configure Hyperparameters', caption: 'Step 4: Configure Hyperparameters' },
                                        { src: '/images/case-study/ml-functions/8. Train Model Workflow - Compare Models.png', alt: 'Compare Models', caption: 'Compare Models — Side-by-side evaluation' },
                                        { src: '/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png', alt: 'Confusion Matrix', caption: 'Confusion Matrix — "The best screen in the entire UX revamp"' },
                                    ]}
                                    title="ml_workflow_sequence"
                                    className="w-full"
                                    aspectRatio="aspect-video"
                                />
                            </div>

                            {/* Before/After video walkthroughs */}
                            {data.prototypeMedia && (
                                <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                    <PrototypeBlock
                                        prototypeMedia={data.prototypeMedia}
                                        caseStudySlug={data.slug}
                                        isLightBackground={false}
                                        password="anu-access"
                                    />
                                </div>
                            )}

                            {/* Side-by-side static comparisons — actual ML screenshots */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <div className="mb-8">
                                    <ComponentHeading
                                        variant="block"
                                        align="center"
                                        title="Legacy vs. Redesign"
                                        color="teal"
                                    />
                                </div>
                                <ImpactDiff
                                    beforeImage="/images/case-study/ml-functions/Legacy Train Model UI.png"
                                    afterImage="/images/case-study/ml-functions/4. Train Model Workflow - Step 1 - Select Problem Type.png"
                                    beforeLabel="Legacy"
                                    afterLabel="Redesign"
                                    beforeTitle="legacy_ui.exe"
                                    afterTitle="workflow_step_1.tsx"
                                    isLightBackground={false}
                                />
                            </div>
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <div className="mb-6">
                                    <ComponentHeading
                                        variant="block"
                                        align="center"
                                        title="The Confusion Matrix"
                                        description={`"The best screen in the entire UX revamp." — Principal Data Scientist`}
                                        color="teal"
                                    />
                                </div>
                                <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] max-w-4xl mx-auto">
                                    <Image
                                        src="/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png"
                                        alt="Confusion Matrix — 10+ iterations to perfect"
                                        width={1400}
                                        height={900}
                                        className="w-full h-auto object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                    />
                                </div>
                            </div>
                        </CaseStudySection>

                        {/* ── Design System Showcase ──── */}
                        <section className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                            <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                                <DesignSystemShowcase isLightBackground={true} caseStudySlug={data.slug} />
                            </div>
                        </section>


                        {/* ═══════════════════════════════════════════
                            ACT V: THE TEAM
                            "I Led This While Owning Three Other Products."
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-5-team"
                            eyebrow="Act V"
                            title="I Led This While Owning Three Other Products."
                            subtitle={getSection('section-05')?.summary}
                        >
                            {/* Section 05 narrative — constraints, leadership, dual-experience */}
                            <SectionBlock
                                section={getSection('section-05')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />

                            {/* Explainability Highlight — confusion matrix story */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <MLExplainabilityHighlight isLightBackground={false} />
                            </div>

                            {/* Cross-functional collaboration */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <TeamCollaboration data={teamCollaborationData['ml-functions']} accentColor="teal" />
                            </div>
                        </CaseStudySection>


                        {/* ═══════════════════════════════════════════
                            ACT VI: THE OUTCOME
                            "5/5 Validated. Patterns Became the Platform Standard."
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-6-outcome"
                            eyebrow="Act VI"
                            title="5/5 Validated. Patterns Became the Platform Standard."
                            subtitle={getSection('section-06')?.summary}
                        >
                            {/* Section 06 narrative — impact & validation */}
                            <SectionBlock
                                section={getSection('section-06')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />

                            {/* Impact Outcomes — shared component */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <ImpactOutcomes data={mlImpactOutcomes} isLightBackground={false} />
                            </div>


                            {/* Reflection */}
                            {data.reflection && (
                                <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                    <CaseStudyReflection data={data.reflection} isLightBackground={false} />
                                </div>
                            )}

                        </CaseStudySection>
                    </>
                ) : isIQ ? (
                    /* ═══════════════════════════════════════
                       IQ/DSML — STORY-FIRST LAYOUT
                       ═══════════════════════════════════════ */
                    <>
                        {/* ═══════════════════════════════════════════
                            ACT I: THE HOOK
                            "We Built the Intelligence. Nobody Knew It Existed."
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-1-hook"
                            eyebrow="Act I"
                            title="Three Powerful AI Features. <5% Adoption."
                            subtitle={getSection('section-01')?.summary}
                        >
                            {/* Section 01 narrative */}
                            <SectionBlock
                                section={getSection('section-01')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />

                            {/* Business Case */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <IQBusinessCase isLightBackground={false} />
                            </div>

                        </CaseStudySection>


                        {/* ═══════════════════════════════════════════
                            ACT II: THE INVESTIGATION
                            "Modernizing the Building Blocks"
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-2-investigation"
                            eyebrow="Act II"
                            title="Modernizing the Building Blocks"
                            subtitle={getSection('section-02')?.summary}
                        >
                            {/* Section 02 narrative */}
                            <SectionBlock
                                section={getSection('section-02')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />

                            {/* Persona Cards */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <IQPersonaCards isLightBackground={false} />
                            </div>

                        </CaseStudySection>


                        {/* ═══════════════════════════════════════════
                            ACT III: THE ARCHITECTURE
                            "Architecture Before Tickets"
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-3-architecture"
                            eyebrow="Act III"
                            title="Architecture Before Tickets"
                            subtitle={getSection('section-03')?.summary}
                        >
                            {/* Section 03 narrative */}
                            <SectionBlock
                                section={getSection('section-03')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />


                            {/* Sketches + Architecture Diagrams */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <ArchitectureBlueprint data={iqArchitectureBlueprint} />
                            </div>


                        </CaseStudySection>


                        {/* ═══════════════════════════════════════════
                            ACT IV: THE CRAFT
                            "Four Iterations to the Final Hub"
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-4-craft"
                            eyebrow="Act IV"
                            title="Four Iterations to the Final Hub"
                            subtitle={getSection('section-04')?.summary}
                        >
                            {/* Section 04 narrative */}
                            <SectionBlock
                                section={getSection('section-04')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />





                            {/* Design Evolution — From Concept to Production */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <CraftShowcase data={iqCraftShowcase} />
                            </div>

                            {/* Shipped Screens — auto-playing UI screenshots */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <ComponentHeading
                                    variant="block"
                                    align="center"
                                    title="The Unified DSML Hub"
                                    description="Ask, Analyze, Predict — unified under one roof."
                                    color="teal"
                                    className="mb-8"
                                />
                                <AutoSequenceDataViewer
                                    images={[
                                        { src: '/images/case-study/iq-plugin/IQ plugin - visual - 3 in 1 IQ Hub.png', alt: 'DSML Hub — Unified Entry Point', caption: 'The unified DSML Hub: Ask, Analyze, Predict' },
                                        { src: '/images/case-study/iq-plugin/IQ - Ask a Question _ Empty State 1.png', alt: 'NLQ — Empty State', caption: 'NLQ: Ask questions in plain English' },
                                        { src: '/images/case-study/iq-plugin/IQ - Ask a Question - Vertical Stacked Bar 1.png', alt: 'NLQ — Results', caption: 'NLQ: AI-generated chart from natural language' },
                                        { src: '/images/case-study/iq-plugin/IQ - Insights _ Empty State 1.png', alt: 'Insights — Empty State', caption: 'Insights: Auto-generated analysis' },
                                        { src: '/images/case-study/iq-plugin/IQ - Insights - Tile View 1.png', alt: 'Insights — Results Grid', caption: 'Insights: Scannable card-based results' },
                                        { src: '/images/case-study/iq-plugin/IQ - Predict Data - Train Models - landing page - model tile view.png', alt: 'ML — Model Landing', caption: 'ML: Predict Data landing page' },
                                        { src: '/images/case-study/iq-plugin/Final Look.png', alt: 'Final Hub Look', caption: 'The final Hub look — shipped' },
                                    ]}
                                    title="dsml_hub_sequence"
                                    className="w-full"
                                    aspectRatio="aspect-video"
                                />
                            </div>

                            {/* Before/After video walkthroughs */}
                            {data.prototypeMedia && (
                                <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                    <PrototypeBlock
                                        prototypeMedia={data.prototypeMedia}
                                        caseStudySlug={data.slug}
                                        isLightBackground={false}
                                        password="anu-access"
                                    />
                                </div>
                            )}



                            {/* Workflow Comparison */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <IQWorkflowComparison isLightBackground={false} />
                            </div>
                        </CaseStudySection>

                        {/* ── Design System Showcase ──── */}
                        <section className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                            <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                                <DesignSystemShowcase isLightBackground={true} caseStudySlug={data.slug} />
                            </div>
                        </section>


                        {/* ═══════════════════════════════════════════
                            ACT V: THE TEAM
                            "The Room Full of Veterans"
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-5-team"
                            eyebrow="Act V"
                            title="The Room Full of Veterans"
                            subtitle={getSection('section-05')?.summary}
                        >
                            {/* Section 05 narrative */}
                            <SectionBlock
                                section={getSection('section-05')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />


                            {/* Cross-functional collaboration */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <TeamCollaboration data={teamCollaborationData['iq-plugin']} accentColor="teal" />
                            </div>
                        </CaseStudySection>


                        {/* ═══════════════════════════════════════════
                            ACT VI: THE OUTCOME
                            "Visibility Was the Solution"
                            ═══════════════════════════════════════════ */}
                        <CaseStudySection
                            id="act-6-outcome"
                            eyebrow="Act VI"
                            title="Visibility Was the Solution"
                            subtitle={getSection('section-06')?.summary}
                        >
                            {/* Section 06 narrative */}
                            <SectionBlock
                                section={getSection('section-06')!}
                                isLightBackground={false}
                                caseStudySlug={data.slug}
                                isUnlocked={true}
                                password="anu-access"
                                hideHeader
                            />

                            {/* Impact Outcomes — shared component */}
                            <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                <ImpactOutcomes data={iqImpactOutcomes} isLightBackground={false} />
                            </div>

                            {/* Reflection */}
                            {data.reflection && (
                                <div className="mt-10 pt-10 border-t border-white/[0.08]">
                                    <CaseStudyReflection data={data.reflection} isLightBackground={false} />
                                </div>
                            )}

                        </CaseStudySection>
                    </>
                ) : (
                    /* ═══════════════════════════════════════
                       NON-RC CASE STUDIES — Original Layout
                       ═══════════════════════════════════════ */
                    <>
                        {/* ── Quick Overview ────────────── */}
                        <QuickOverviewSection
                            data={data.quickOverview}
                            {...quickOverviewOverrides}
                        />

                        {/* ── Scale & Responsibility ───── */}
                        {data.scaleAndResponsibility && (
                            <CaseStudySection>
                                <ScaleAndResponsibility
                                    data={data.scaleAndResponsibility}
                                    accentColor="teal"
                                />
                            </CaseStudySection>
                        )}

                        {/* ── Prototype Block ──────────── */}
                        {data.prototypeMedia && (
                            <PrototypeBlock
                                prototypeMedia={data.prototypeMedia}
                                caseStudySlug={data.slug}
                                isLightBackground={false}
                                password="anu-access"
                            />
                        )}

                        {/* ── Framework Matrix ─────────── */}
                        {data.frameworkConnection && (
                            <CaseStudySection id="framework-connection" eyebrow="Framework">
                                <FrameworkMatrix
                                    principles={data.frameworkConnection.principles}
                                    caseStudyContext={data.slug.toUpperCase().replace(/-/g, '_')}
                                    sectionMappings={frameworkSectionMappings}
                                />
                            </CaseStudySection>
                        )}

                        {/* ── D.E.S.I.G.N. Sections ───── */}
                        {data.sections.map((section) => (
                            <div key={section.id}>
                                <CaseStudySection id={section.id} noAnimation>
                                    <SectionBlock
                                        section={section}
                                        isLightBackground={false}
                                        caseStudySlug={data.slug}
                                        isUnlocked={true}
                                        password="anu-access"
                                        frameworkMapping={frameworkSectionMappings}
                                    />
                                </CaseStudySection>
                            </div>
                        ))}

                        {/* ── Design System Showcase ──── */}
                        <section className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                            <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                                <DesignSystemShowcase isLightBackground={true} caseStudySlug={data.slug} />
                            </div>
                        </section>
                    </>
                )}

                {/* ── Navigate to Other Studies ── */}
                <SystemIndex
                    currentId={
                        isRC ? 'REPORTCASTER' :
                            isML ? 'ML_FUNCTIONS' :
                                isIQ ? 'IQ_PLUGIN' :
                                    'REPORTCASTER'
                    }
                />

                {/* ── Let's Talk CTA ────────────── */}
                <LetsTalkCTA />

                {/* ── Scroll Gear ───────────────── */}
                <ScrollGear />

            </div>
        </div>
    )
}
