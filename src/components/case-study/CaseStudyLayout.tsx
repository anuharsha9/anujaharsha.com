'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import StoryDeck, { StorySlide } from './StoryDeck'
import JobLogRedesignViz from './JobLogRedesignViz'
import { useCaseStudyAccess } from '@/hooks/useCaseStudyAccess'
import { CaseStudyData } from '@/types/caseStudy'
import ComponentHeading from '@/components/ui/ComponentHeading'
import QuickOverview from './QuickOverview'
import HeroMeta from './HeroMeta'
import UXPrinciples from './UXPrinciples'
import SectionBlock from './SectionBlock'
import PrototypeBlock from './PrototypeBlock'
import PasswordGate from './PasswordGate'
import ImpactDiff from './ImpactDiff'
import IQWorkflowComparison from './IQWorkflowComparison'
import SignatureLogo from '@/components/brand/SignatureLogo'
import SectionDivider from '@/components/brand/SectionDivider'
import SocialShareButtons from '@/components/sharing/SocialShareButtons'
import SystemIndex from './SystemIndex'
import SectionNav from './SectionNav'
import CaseStudyNav from './CaseStudyNav'
import StructuredData from '@/components/structured-data/StructuredData'
import FrameworkMatrix from './FrameworkMatrix'
import ViewModeToggle from './ViewModeToggle'
import CaseStudySection from './CaseStudySection'
import LockedContent from './LockedContent'
import LetsTalkCTA from './LetsTalkCTA'

import { reportCasterMarketAnalysis, mlFunctionsMarketAnalysis, iqPluginMarketAnalysis } from '@/data/market-analysis'
import { researchApproachData } from '@/data/research-approach'
import { teamCollaborationData } from '@/data/team-collaboration'
import DesignSystemShowcase from './DesignSystemShowcase'
import ScrollGear from '@/components/ui/ScrollGear'
import { iqTabs, iqFooterContent } from '@/components/case-study/iq-plugin-data'
// RetrospectiveCard and EvolutionSplit removed - personal growth content now on /me page

import LoadingSpinner from '@/components/ui/LoadingSpinner'


// import { PresentationFlow, Slide } from './PresentationFlow' — replaced by StoryDeck
import { ScaleAndResponsibility } from './ScaleAndResponsibility'
import { CaseStudyCard } from './CaseStudyCard'

// Dynamic imports for heavy components - loaded on demand with loading states
// Note: Next.js requires options to be object literals, not variables
// Static imports for better stability (no layout shift)
import PersonaCards from './PersonaCards'
import ProcessArtifactViewer from './ProcessArtifactViewer'
import { reportCasterArtifacts } from '@/data/reportcaster-artifacts'
import { mlArtifacts } from '@/data/ml-artifacts'
import { iqArtifacts } from '@/data/iq-artifacts'
import SystemMappingBreakdown from './SystemMappingBreakdown'

import NavigateForwardContent from './NavigateForwardContent'
import VersionIteration from './VersionIteration'
import ScheduleWorkflowComparison from './ScheduleWorkflowComparison'

// ReportCaster Storyboard Beats
import BeatWeekOne from './storyboard/BeatWeekOne'
import BeatTheRoom from './storyboard/BeatTheRoom'
import BeatWhatIGot from './storyboard/BeatWhatIGot'
import BeatInvestigation from './storyboard/BeatInvestigation'
import BeatFragmentation from './storyboard/BeatFragmentation'
import BeatThreePivots from './storyboard/BeatThreePivots'
import BeatBreakthrough from './storyboard/BeatBreakthrough'
import BeatScheduler from './storyboard/BeatScheduler'
import BeatRecurrence from './storyboard/BeatRecurrence'
import Beat250Screens from './storyboard/Beat250Screens'
import BeatBuildingTeam from './storyboard/BeatTeamBuilding'
import BeatHandoff from './storyboard/BeatHandoff'
import BeatImpact from './storyboard/BeatImpact'
import BeatAskedVsDelivered from './storyboard/BeatAskedVsDelivered'

import SystemArchaeology from './SystemArchaeology'

import ResearchApproach from './ResearchApproach'
import TeamCollaboration from './TeamCollaboration'
import CaseStudyReflection from './CaseStudyReflection'

import ReadingProgress from './ReadingProgress'
import MLChallengeBreakdown from './MLChallengeBreakdown'
import MLKnowledgeGapSystem from './MLKnowledgeGapSystem'
import MLUserAccessStrategy from './MLUserAccessStrategy'
import MLWorkflowMapping from './MLWorkflowMapping'

import MLExplainabilityHighlight from './MLExplainabilityHighlight'
import SystemTopologyBlueprint from './SystemTopologyBlueprint'
import DesignIterationLog from './DesignIterationLog'
import LayeredDisclosureVisual from './LayeredDisclosureVisual'
import MLImpactMetrics from './MLImpactMetrics'
import MLPatternConnections from './MLPatternConnections'
import MLPersonaCards from './MLPersonaCards'

import IQPersonaCards from './IQPersonaCards'
import IQBusinessCase from './IQBusinessCase'
import IQChallengesBreakdown from './IQChallengesBreakdown'
import IQValidationSources from './IQValidationSources'
import ReportCasterTimeline from './ReportCasterTimeline'
import MLFunctionsTimeline from './MLFunctionsTimeline'
import IQPluginTimeline from './IQPluginTimeline'
import IQArchitectureBlueprint from './IQArchitectureBlueprint'
import IQWorkflowsAndFoundation from './IQWorkflowsAndFoundation'
import IQPluginArchitecture from './IQPluginArchitecture'
import IQIterationLog from './IQIterationLog'

import IQEmptyStateShowcase from './IQEmptyStateShowcase'
import IQEvolution from './IQEvolution'
import IQBuildingSystem from './IQBuildingSystem'

import IQIdeaLab from './IQIdeaLab'
import IQPatternConnections from './IQPatternConnections'
import MarketAnalysis from './MarketAnalysis'

import TribalKnowledgeNetwork from './TribalKnowledgeNetwork'
import PlusMenuInsight from './PlusMenuInsight'
import NaturalLanguageInsight from './NaturalLanguageInsight'

// ExecutiveSummaryArc removed — merged into VersionIteration (section-04)
import SystemConsolidationMap from './SystemConsolidationMap'
import OwnershipScope from './OwnershipScope'



interface CaseStudyLayoutProps {
  data: CaseStudyData
  defaultViewMode?: 'full' | 'presentation'
}

export default function CaseStudyLayout({ data, defaultViewMode = 'presentation' }: CaseStudyLayoutProps) {
  const {
    isUnlocked: showPasswordContent,
    unlock,
    validatePassword,
    shouldRedirectToPrototype,
    clearRedirectFlag
  } = useCaseStudyAccess({
    slug: data.slug,
    passwordGate: data.passwordGate
  })

  // Password state for IQ Plugin inline input
  const [iqPassword, setIqPassword] = useState('')
  const [iqError, setIqError] = useState('')

  // Password state for ML and RC case studies
  const [mlRcPassword, setMlRcPassword] = useState('')
  const [mlRcError, setMlRcError] = useState('')
  const [viewMode, setViewMode] = useState<'full' | 'presentation'>(defaultViewMode)

  const pathname = usePathname()

  // Memoize framework mappings to prevent unnecessary re-renders of the Matrix component
  const frameworkSectionMappings = useMemo(() => {
    if (!data.frameworkConnection) return {}

    const mapping: Record<string, string> = {}
    data.frameworkConnection.principles.forEach((principle) => {
      let sectionId = ''
      if (data.slug === 'reportcaster') {
        if (principle.letter === 'D') sectionId = 'section-01'
        else if (principle.letter === 'E') sectionId = 'section-02'
        else if (principle.letter === 'S') sectionId = 'section-03'
        else if (principle.letter === 'I') sectionId = 'section-04' // Fixed from 'version-iteration'
        else if (principle.letter === 'G') sectionId = 'section-05'
        else if (principle.letter === 'N') sectionId = 'section-06'
      } else if (data.slug === 'ml-functions') {
        if (principle.letter === 'D') sectionId = 'section-01'
        else if (principle.letter === 'E') sectionId = 'section-02'
        else if (principle.letter === 'S') sectionId = 'section-03'
        else if (principle.letter === 'I') sectionId = 'section-04'
        else if (principle.letter === 'G') sectionId = 'section-05'
        else if (principle.letter === 'N') sectionId = 'section-06'
      } else if (data.slug === 'iq-plugin') {
        if (principle.letter === 'D') sectionId = 'section-01'
        else if (principle.letter === 'E') sectionId = 'section-02'
        else if (principle.letter === 'S') sectionId = 'section-03'
        else if (principle.letter === 'I') sectionId = 'section-04'
        else if (principle.letter === 'G') sectionId = 'section-05'
        else if (principle.letter === 'N') sectionId = 'section-06'
      }
      if (sectionId) {
        mapping[principle.letter] = sectionId
      }
    })
    return mapping
  }, [data.frameworkConnection, data.slug])

  // Scroll to top when case study loads or pathname changes
  // Modified to respect hash links (like from Gear Inspector)
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // If hash is present, try to scroll to it
      // Use a robust retry mechanism for dynamic content (images, lazy loaded components)
      const targetId = hash.substring(1)
      let attempts = 0
      const maxAttempts = 60 // 6 seconds total (at 100ms intervals)
      let lastScrollY = -1

      const scrollToTarget = () => {
        attempts++
        const element = document.getElementById(targetId)

        if (element) {
          const rect = element.getBoundingClientRect()
          // Calculate distance from top of viewport (accounting for sticky nav ~60px)
          const targetOffset = 80 // Leave some space for nav
          const currentTop = rect.top

          // If element is not near the top of viewport, scroll to it
          if (currentTop > targetOffset + 50 || currentTop < -50) {
            // Use instant scroll to avoid being interrupted by layout shifts
            element.scrollIntoView({ behavior: 'instant', block: 'start' })
            // After scrolling, offset for the nav
            window.scrollBy({ top: -targetOffset, behavior: 'instant' })
          }
        }

        // Keep checking as long as:
        // 1. We haven't exhausted attempts
        // 2. Layout might still be settling (scrollY is changing)
        const shouldContinue = attempts < maxAttempts &&
          (attempts < 10 || window.scrollY !== lastScrollY) // Force first 10 attempts, then check for stability

        lastScrollY = window.scrollY

        if (shouldContinue) {
          setTimeout(scrollToTarget, 100)
        }
      }

      // Start immediately
      requestAnimationFrame(() => {
        scrollToTarget()
      })
    } else {
      // Default behavior: scroll to top
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      })
    }
  }, [pathname, data.slug])

  // Use standard presentation slides for StoryDeck
  const presentationSlides = useMemo(() => {
    // ReportCaster: Full storyboard with animated beat components
    if (data.slug === 'reportcaster') {
      const storyboardSlides: StorySlide[] = [
        // ── Beat 0: Title ──
        {
          type: 'title',
          title: 'Customers Were Leaving. I Rebuilt the System.',
          content: ['Anuja Harsha — Senior Product Designer', 'Flagship Case Study @ Cloud Software Group'],
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
        // ── Beat 10: Job Log Redesign (existing interactive viz) ──
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
          component: <BeatBuildingTeam />,
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

    // All other case studies: keep original slide data
    const slides = (data.presentation?.slides || []) as StorySlide[]
    return slides
  }, [data])

  useEffect(() => {
    if (showPasswordContent && shouldRedirectToPrototype) {
      clearRedirectFlag()
      // Wait a bit for content to render, then scroll to prototype
      setTimeout(() => {
        const prototypeSection = document.getElementById('prototype')
        if (prototypeSection) {
          prototypeSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    }
  }, [showPasswordContent, shouldRedirectToPrototype, clearRedirectFlag])

  const handlePasswordCorrect = () => {
    unlock()
  }

  const handleIqPasswordSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    if (validatePassword(iqPassword)) {
      setIqError('')
      unlock()
    } else {
      setIqError('Incorrect password. Please try again.')
    }
  }

  const handleMlRcPasswordSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    if (validatePassword(mlRcPassword)) {
      setMlRcError('')
      unlock()
    } else {
      setMlRcError('Incorrect password. Please try again.')
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

  return (
    <>
      <StructuredData type="caseStudy" data={data} />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Case Studies',
                item: `${siteUrl}/#work-overview`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: data.heroTitle,
                item: `${siteUrl}/work/${data.slug}/`,
              },
            ],
          }),
        }}
      />
      {/* Sticky View Mode Toggle */}
      <ViewModeToggle
        viewMode={viewMode}
        setViewMode={setViewMode}
        hasPresentation={!!data.presentation}
      />

      {/* Reading Progress Indicator - Full Mode Only */}
      {viewMode === 'full' && <ReadingProgress />}

      {/* Presentation Mode — Scroll-driven Story Deck */}
      {viewMode === 'presentation' && data.presentation && (
        <StoryDeck
          slides={presentationSlides}
          onExit={() => setViewMode('full')}
        />
      )}

      {/* Table of Contents - Sticky Navigation */}
      {/* Section Navigation - shows on all case study pages (Full Mode Only) */}
      {viewMode === 'full' && data.sections && data.sections.length > 0 && (
        <SectionNav sections={data.sections} />
      )}

      {/* ============================================
          FULL CASE STUDY CONTENT (Hidden in presentation mode)
          ============================================ */}
      <div style={{ display: viewMode === 'presentation' ? 'none' : 'contents' }}>

        {/* Hero - Dark Immersive Background */}
        {/* Show locked hero if passwordGate exists AND content is not unlocked */}
        {data.passwordGate && !showPasswordContent ? (
          /* Locked Hero View - Custom for IQ Plugin to match home page style */
          data.slug === 'iq-plugin' ? (
            <section className="relative surface-light overflow-hidden min-h-[80vh] flex items-center">
              <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
                <div className="max-w-2xl mx-auto text-center space-y-6 py-10 md:py-14">
                  {/* Case Study Navigation - Links to other case studies */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-4"
                  >
                    <CaseStudyNav />
                  </motion.div>

                  {/* Lock Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center"
                  >
                    <svg
                      className="w-16 h-16 md:w-20 md:h-20 text-[var(--text-muted-light)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-[var(--text-primary-light)] text-3xl md:text-4xl lg:text-5xl font-sans leading-tight"
                  >
                    {data.heroTitle || 'IQ Plugin Case Study'}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-[var(--text-muted-light)] text-base md:text-lg leading-relaxed"
                  >
                    {data.passwordGate?.description || 'This case study contains confidential company information and cannot be made public. Enter the password to view the full case study.'}
                  </motion.p>

                  {/* Password Input with Circular Button - Same as home page */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="pt-6 w-full max-w-md mx-auto"
                  >
                    <form onSubmit={handleIqPasswordSubmit} className="w-full">
                      <div className="flex items-center gap-3">
                        <label htmlFor="iq-password-input" className="sr-only">Password</label>
                        <input
                          id="iq-password-input"
                          type="password"
                          value={iqPassword}
                          onChange={(e) => {
                            setIqPassword(e.target.value)
                            setIqError('')
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleIqPasswordSubmit()
                            }
                          }}
                          placeholder="Enter password"
                          aria-label="Enter password to unlock IQ Plugin case study"
                          className="flex-1 px-4 py-3 border border-white/[0.1] text-[var(--text-heading)] bg-white/[0.04] backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:border-transparent placeholder:text-[var(--text-muted)] shadow-sm rounded-lg"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="flex-shrink-0 w-12 h-12 bg-[var(--accent-teal)] text-white flex items-center justify-center hover:bg-[var(--accent-teal-soft)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:ring-offset-2 shadow-md"
                          aria-label="Submit password"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      </div>
                      {iqError && (
                        <p className="mt-2 text-sm text-red-600 text-center">{iqError}</p>
                      )}
                    </form>
                  </motion.div>
                </div>
              </div>
            </section >
          ) : (
            /* Default Locked Hero View for other case studies */
            <section className="relative surface-light overflow-hidden min-h-[80vh] flex items-center">
              <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">

                <div className="max-w-2xl mx-auto text-center space-y-6 py-10 md:py-14">
                  {/* Lock Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center"
                  >
                    <svg
                      className="w-16 h-16 md:w-20 md:h-20 text-[var(--text-muted-light)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-[var(--text-primary-light)] text-3xl md:text-4xl lg:text-5xl font-sans leading-tight"
                  >
                    Unification of all ML and AI features project.
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-[var(--text-muted-light)] text-base md:text-lg leading-relaxed"
                  >
                    This case study is locked due to confidential company information and can&apos;t be made public. Please enter password to view this case study.
                  </motion.p>
                </div>
              </div>
            </section >
          )
        ) : (
          /* Normal Hero View */
          <HeroMeta
            heroTitle={data.heroTitle}
            heroSubheading={data.heroSubheading}
            heroSubtitle={data.heroSubtitle}
            coverImage={data.coverImage}
            role={data.role}
            company={data.company}
            timeframe={data.timeframe}
            scope={data.scope}
            hasPrototype={!!data.prototypeMedia}
            caseStudySlug={data.slug}
            demoVideoUrl={data.quickOverview.demoVideoUrl}
            demoVideoLabel={data.quickOverview.demoVideoLabel}
            demoVideoUrl2={data.quickOverview.demoVideoUrl2}
            demoVideoLabel2={data.quickOverview.demoVideoLabel2}
            dataSheetUrl={data.quickOverview.dataSheetUrl}
            status={data.status}
            dataSheetLabel={data.quickOverview.dataSheetLabel}
            validationLinks={data.quickOverview.validationLinks}
            publicDemoUrl={data.quickOverview.publicDemoUrl}
            publicDemoLabel={data.quickOverview.publicDemoLabel}
            shareUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/work/${data.slug}`}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        )
        }

        {/* ============================================
          PASSWORD GATE (Show only for non-IQ-Plugin locked case studies)
          IQ Plugin has its own locked hero with password form
          ============================================ */}
        {
          !showPasswordContent && data.passwordGate && data.slug !== 'iq-plugin' && (
            <PasswordGate
              onPasswordCorrect={handlePasswordCorrect}
              password={data.passwordGate.password}
              description={data.passwordGate.description}
              learnItems={data.passwordGate.learnItems}
              caseStudySlug={data.slug}
              redirectToPrototype={shouldRedirectToPrototype}
            />
          )
        }

        {/* ============================================
          PASSWORD UNLOCK SECTION FOR ML AND RC (Before Quick Overview)
          ============================================ */}
        {
          (data.slug === 'ml-functions' || data.slug === 'reportcaster') && !showPasswordContent && (
            <section className="surface-light py-8 md:py-12">
              <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="text-center space-y-4">
                    <p className="text-[var(--text-primary-light)] text-base md:text-lg leading-relaxed">
                      Parts of the case study are locked due to sensitive company data and NDA restrictions. To unlock them all enter password here or continue scrolling to see the public version.
                    </p>
                  </div>

                  {/* Password Input with Circular Button */}
                  <form onSubmit={handleMlRcPasswordSubmit} className="w-full max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                      <label htmlFor="ml-rc-password-input" className="sr-only">Password</label>
                      <input
                        id="ml-rc-password-input"
                        type="password"
                        value={mlRcPassword}
                        onChange={(e) => {
                          setMlRcPassword(e.target.value)
                          setMlRcError('')
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleMlRcPasswordSubmit()
                          }
                        }}
                        placeholder="Enter password"
                        aria-label="Enter password to unlock protected content"
                        className="flex-1 px-4 py-3 border border-white/[0.1] text-[var(--text-heading)] bg-white/[0.04] backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:border-transparent placeholder:text-[var(--text-muted)] shadow-sm rounded-lg"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="flex-shrink-0 w-12 h-12 bg-[var(--accent-teal)] text-white flex items-center justify-center hover:bg-[var(--accent-teal-soft)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:ring-offset-2 shadow-md"
                        aria-label="Submit password"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>
                    {mlRcError && (
                      <p className="mt-2 text-sm text-red-600 text-center">{mlRcError}</p>
                    )}
                  </form>

                  {/* Contact link */}
                  <div className="pt-4 text-center">
                    <Link
                      href="/#lets-talk"
                      className="text-[var(--text-muted-light)] hover:text-[var(--accent-teal)] text-sm transition-colors underline"
                    >
                      Contact me for password
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )
        }

        {/* ============================================
          CASE STUDY CONTENT (Only visible when unlocked)
          ============================================ */}
        {
          (showPasswordContent || !data.passwordGate) && (
            <>
              {/* Quick Overview */}
              <CaseStudySection eyebrow="Overview" divider={false}>
                <QuickOverview data={data.quickOverview} heroSubtitle={data.heroSubtitle} caseStudySlug={data.slug} />
              </CaseStudySection>

              {/* Scale & Responsibility */}
              {data.scaleAndResponsibility && (
                <CaseStudySection>
                  <ScaleAndResponsibility
                    data={data.scaleAndResponsibility}
                    accentColor={data.slug === 'reportcaster' ? 'teal' : data.slug === 'iq-plugin' ? 'violet' : 'teal'}
                  />
                </CaseStudySection>
              )}

              {/* Prototype Block - Transformation in Motion (Before Framework) */}
              {data.prototypeMedia && (
                <PrototypeBlock
                  prototypeMedia={data.prototypeMedia}
                  caseStudySlug={data.slug}
                  isLightBackground={true}
                  password={data.passwordGate?.password || 'anu-access'}
                />
              )}
            </>
          )
        }

        {/* D.E.S.I.G.N. Framework Navigation - REMOVED: Now using SectionNav instead */}

        {/* ============================================
          CASE STUDY CONTENT (Only visible when unlocked)
          ============================================ */}
        {
          (showPasswordContent || !data.passwordGate) && (
            <>


              {/* ReportCaster Timeline */}
              {data.slug === 'reportcaster' && (
                <CaseStudySection eyebrow="Project Timeline">
                  <ReportCasterTimeline isLightBackground={false} />
                </CaseStudySection>
              )}

              {/* ML Functions Timeline */}
              {data.slug === 'ml-functions' && (
                <CaseStudySection eyebrow="Project Timeline">
                  <MLFunctionsTimeline isLightBackground={false} />
                </CaseStudySection>
              )}

              {/* IQ Plugin Timeline */}
              {data.slug === 'iq-plugin' && (
                <CaseStudySection eyebrow="Project Timeline">
                  <IQPluginTimeline isLightBackground={false} />
                </CaseStudySection>
              )}

              {/* D.E.S.I.G.N. Framework Matrix */}
              {data.frameworkConnection && (
                <CaseStudySection id="framework-connection" eyebrow="Framework">
                  <FrameworkMatrix
                    principles={data.frameworkConnection.principles}
                    caseStudyContext={data.slug.toUpperCase().replace(/-/g, '_')}
                    sectionMappings={frameworkSectionMappings}
                  />
                </CaseStudySection>
              )}



              {/* Public Sections - if explicitly defined */}
              {data.publicSections &&
                data.publicSections.map((section, index) => {
                  const isDiscoverySection = section.id === 'section-01' || section.id === 'section-02'
                  const sectionBg = 'surface-light'
                  const borderClass = sectionBg.includes('dark') ? 'border-refined-dark' : 'border-refined-light'

                  return (
                    <CaseStudySection key={section.id} id={section.id}>
                      <SectionBlock
                        section={section}
                        isLightBackground={false}
                        caseStudySlug={data.slug}
                        isUnlocked={showPasswordContent}
                        password={data.passwordGate?.password || 'anu-access'}
                      />
                    </CaseStudySection>
                  )
                })}
            </>
          )
        }

        {/* ============================================
          ALL SECTIONS (Only visible when unlocked)
          ============================================ */}
        {
          (showPasswordContent || !data.passwordGate) && data.frameworkConnection && (
            <>
              {/* All Sections (always visible, sensitive content locked) */}
              {data.sections.map((section, index) => {
                const isVersionSection = section.id?.startsWith('version-')
                const isDiscoverySection = section.id === 'section-01' || section.id === 'section-02'
                const isOutcomeSection = section.id === 'section-06' // All case studies now have 6 sections
                const isSectionTwo = section.id === 'section-02'

                // Determine if this is the last section (N - Navigate Forward)
                const isLastSection =
                  (data.slug === 'reportcaster' && section.id === 'section-06') ||
                  (data.slug === 'ml-functions' && section.id === 'section-06') ||
                  (data.slug === 'iq-plugin' && section.id === 'section-06')



                // All sections are light now
                let sectionBg = 'surface-light'

                // Remove top borders for cleaner look - only keep if transitioning from different background
                const borderClass = '' // Removed borders for cleaner separation
                const paddingClass = 'py-12 sm:py-14 md:py-16'

                return (
                  <div key={section.id}>
                    {/* Special handling for section-04 (version iteration) for ReportCaster */}
                    {section.id === 'section-04' && data.slug === 'reportcaster' ? (
                      <CaseStudySection
                        id={section.id}
                        title={section.title}
                        subtitle={section.summary}
                      >
                        {/* UX Principles / Architectural Standards */}
                        {data.uxPrinciples && (
                          <div className="mb-12">
                            <UXPrinciples
                              title={data.uxPrinciples.title}
                              intro={data.uxPrinciples.intro}
                              principles={data.uxPrinciples.principles}
                              isLightBackground={false}
                            />
                          </div>
                        )}

                        {/* Plus Menu Insight */}
                        <PlusMenuInsight isLightBackground={false} />

                        {/* Workflow Transformation Visual */}
                        <ScheduleWorkflowComparison isLightBackground={false} />

                        {/* Natural Language Insight */}
                        <NaturalLanguageInsight isLightBackground={false} />

                        {/* Version Iteration Details */}
                        <div className="mt-8">
                          <VersionIteration
                            v1={section.v1Data}
                            v2={section.v2Data}
                            v3={section.v3Data}
                            isLightBackground={false}
                          />
                        </div>
                      </CaseStudySection>
                    ) : (
                      <CaseStudySection id={section.id} noAnimation>
                        {/* Lock entire section-04 (Iterate) for ML Functions */}
                        {data.slug === 'ml-functions' && section.id === 'section-04' ? (
                          <LockedContent
                            password={data.passwordGate?.password || 'anu-access'}
                            caseStudySlug={data.slug}
                            unlockMessage="Password required to view iteration details and new workflow designs"
                            isLightBackground={false}
                          >
                            <SectionBlock
                              section={section}
                              isLightBackground={false}
                              caseStudySlug={data.slug}
                              isUnlocked={showPasswordContent}
                              password={data.passwordGate?.password || 'anu-access'}
                              frameworkMapping={frameworkSectionMappings}
                            />
                          </LockedContent>
                        ) : (
                          <SectionBlock
                            section={section}
                            isLightBackground={false}
                            caseStudySlug={data.slug}
                            isUnlocked={showPasswordContent}
                            password={data.passwordGate?.password || 'anu-access'}
                            frameworkMapping={frameworkSectionMappings}
                          />
                        )}

                        {/* === INLINE SUB-COMPONENTS === */}

                        {/* RC Section 01: SystemArchaeology */}
                        {section.id === 'section-01' && data.slug === 'reportcaster' && (
                          <div className="mt-12 pt-12 border-t border-white/[0.06]">
                            <SystemArchaeology isLightBackground={false} caseStudySlug={data.slug} />
                          </div>
                        )}

                        {/* ML Section 01: Knowledge Gap + Challenge Breakdown */}
                        {section.id === 'section-01' && data.slug === 'ml-functions' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <MLKnowledgeGapSystem isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <MLChallengeBreakdown isLightBackground={false} />
                            </div>
                          </>
                        )}

                        {/* IQ Section 01: Business Case + Workflows + NLQ */}
                        {section.id === 'section-01' && data.slug === 'iq-plugin' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <IQBusinessCase isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <IQWorkflowsAndFoundation isLightBackground={false} />
                            </div>
                          </>
                        )}

                        {/* RC Section 06: ImpactVisual — REMOVED: metrics shown elsewhere */}

                        {/* RC Section 02: Research Network + Strategy only — MarketAnalysis, Personas, EmpathizeGrid removed (generic filler) */}
                        {isSectionTwo && data.slug === 'reportcaster' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <TribalKnowledgeNetwork isLightBackground={false} />
                            </div>
                          </>
                        )}

                        {/* ML Section 02: Research + Access Strategy + Personas + Market */}
                        {isSectionTwo && data.slug === 'ml-functions' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <ResearchApproach data={researchApproachData['ml-functions']} accentColor="teal" />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <MLUserAccessStrategy isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <MLPersonaCards isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <MarketAnalysis {...mlFunctionsMarketAnalysis} isLightBackground={false} />
                            </div>
                          </>
                        )}

                        {/* IQ Section 02: Research + Personas + Market */}
                        {section.id === 'section-02' && data.slug === 'iq-plugin' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <ResearchApproach data={researchApproachData['iq-plugin']} accentColor="violet" />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <IQPersonaCards isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <MarketAnalysis {...iqPluginMarketAnalysis} isLightBackground={false} />
                            </div>
                          </>
                        )}

                        {/* RC Section 03: SystemConsolidationMap + ProcessArtifacts + SystemMapping — SubsystemConsolidation removed (duplicates consolidation map) */}
                        {section.id === 'section-03' && data.slug === 'reportcaster' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <SystemConsolidationMap isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <ProcessArtifactViewer
                                artifacts={reportCasterArtifacts}
                                pdfUrl="/assets/rc-sketchbook.pdf"
                              />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <SystemMappingBreakdown isLightBackground={false} />
                            </div>
                          </>
                        )}

                        {/* ML Section 03: Topology + Workflow + Pivots + Principles + Artifacts */}
                        {section.id === 'section-03' && data.slug === 'ml-functions' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <ProcessArtifactViewer
                                artifacts={mlArtifacts}
                                title="The System Blueprint"
                                description="Before solving for UI, I had to solve for system logic. These diagrams map the complex relationships between model types, training workflows, and user personas."
                                pdfUrl="/assets/ml-iq-sketchbook.pdf"
                              />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <SystemTopologyBlueprint isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <MLWorkflowMapping isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">

                            </div>
                            {data.uxPrinciples && (
                              <div className="mt-12 pt-12 border-t border-white/[0.06]">
                                <UXPrinciples
                                  title={data.uxPrinciples.title}
                                  intro={data.uxPrinciples.intro}
                                  principles={data.uxPrinciples.principles}
                                  isLightBackground={false}
                                />
                              </div>
                            )}
                          </>
                        )}

                        {/* IQ Section 03: ProcessArtifacts + Architecture + Blueprint + Principles */}
                        {section.id === 'section-03' && data.slug === 'iq-plugin' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <IQIdeaLab isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <IQBuildingSystem isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <IQPluginArchitecture isLightBackground={false} />
                            </div>

                            {data.uxPrinciples && (
                              <div className="mt-12 pt-12 border-t border-white/[0.06]">
                                <UXPrinciples
                                  title={data.uxPrinciples.title}
                                  intro={data.uxPrinciples.intro}
                                  principles={data.uxPrinciples.principles}
                                  isLightBackground={false}
                                />
                              </div>
                            )}
                          </>
                        )}

                        {/* ML Section 04: Layered Disclosure + Design Iteration Log */}
                        {section.id === 'section-04' && data.slug === 'ml-functions' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <LockedContent
                                password={data.passwordGate?.password || 'anu-access'}
                                caseStudySlug={data.slug}
                                unlockMessage="Password required to view layered disclosure strategy"
                                isLightBackground={false}
                              >
                                <LayeredDisclosureVisual isLightBackground={false} />
                              </LockedContent>
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <LockedContent
                                password={data.passwordGate?.password || 'anu-access'}
                                caseStudySlug={data.slug}
                                unlockMessage="Password required to view design artifacts"
                                isLightBackground={false}
                              >
                                <DesignIterationLog isLightBackground={false} />
                              </LockedContent>
                            </div>
                          </>
                        )}

                        {/* IQ Section 04: Evolution + Empty States + Design Log */}
                        {section.id === 'section-04' && data.slug === 'iq-plugin' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <LockedContent
                                password={data.passwordGate?.password || 'anu-access'}
                                caseStudySlug={data.slug}
                                unlockMessage="Password required to view design evolution"
                                isLightBackground={false}
                              >
                                <IQEvolution isLightBackground={false} />
                              </LockedContent>
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <LockedContent
                                password={data.passwordGate?.password || 'anu-access'}
                                caseStudySlug={data.slug}
                                unlockMessage="Password required to view empty states"
                                isLightBackground={false}
                              >
                                <IQEmptyStateShowcase isLightBackground={false} />
                              </LockedContent>
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <LockedContent
                                password={data.passwordGate?.password || 'anu-access'}
                                caseStudySlug={data.slug}
                                unlockMessage="Password required to view design specifications"
                                isLightBackground={false}
                              >
                                <DesignIterationLog
                                  isLightBackground={false}
                                  tabs={iqTabs}
                                  footerContent={iqFooterContent}
                                />
                              </LockedContent>
                            </div>
                          </>
                        )}

                        {/* RC Section 05: Ownership Scope + Team Collaboration — KnowledgeTransferSystem removed (overlaps with TeamCollaboration) */}
                        {section.id === 'section-05' && data.slug === 'reportcaster' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <OwnershipScope isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <TeamCollaboration data={teamCollaborationData['reportcaster']} accentColor="amber" />
                            </div>
                          </>
                        )}

                        {/* ML Section 05: Explainability + Team Collaboration */}
                        {section.id === 'section-05' && data.slug === 'ml-functions' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <MLExplainabilityHighlight isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <TeamCollaboration data={teamCollaborationData['ml-functions']} accentColor="teal" />
                            </div>
                          </>
                        )}

                        {/* IQ Section 05: Team Collaboration + Challenges */}
                        {section.id === 'section-05' && data.slug === 'iq-plugin' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <TeamCollaboration data={teamCollaborationData['iq-plugin']} accentColor="violet" />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <LockedContent
                                isUnlocked={showPasswordContent}
                                password="access"
                                caseStudySlug={data.slug}
                                unlockMessage="Password required to view architectural decisions"
                                isLightBackground={false}
                              >
                                <IQChallengesBreakdown isLightBackground={false} />
                              </LockedContent>
                            </div>
                          </>
                        )}

                        {/* RC Section 06: Testimonials + ShippedImpact + ImpactDiff + NavigateForward — PatternConnections removed (filler) */}
                        {section.id === 'section-06' && data.slug === 'reportcaster' && (
                          <>





                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <div className="mb-8">
                                <ComponentHeading
                                  variant="block"
                                  align="center"
                                  tag="VISUAL_DIFF"
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
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <NavigateForwardContent isLightBackground={false} reflection={data.reflection} />
                            </div>
                          </>
                        )}

                        {/* ML Section 06: Visual Diffs + Impact + Reflection + Patterns */}
                        {section.id === 'section-06' && data.slug === 'ml-functions' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <div className="text-center mb-8">
                                <span className="font-mono text-[var(--accent-teal)] text-xs tracking-widest uppercase block mb-2">
                                  {'// VISUAL_DIFF'}
                                </span>
                                <h4 className="font-sans text-[var(--text-heading)] text-xl md:text-2xl">
                                  Legacy vs. Redesigned Workflow
                                </h4>
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
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <ImpactDiff
                                beforeImage="/images/case-study/ml-functions/Legacy Train Model Results UI.png"
                                afterImage="/images/case-study/ml-functions/8. Train Model Workflow - Compare Models.png"
                                beforeLabel="Legacy"
                                afterLabel="Redesign"
                                beforeTitle="legacy_results.exe"
                                afterTitle="model_comparison.tsx"
                                isLightBackground={false}
                              />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <MLImpactMetrics isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              {data.reflection && <CaseStudyReflection data={data.reflection} isLightBackground={false} />}
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <MLPatternConnections isLightBackground={false} />
                            </div>
                          </>
                        )}

                        {/* IQ Section 06: Workflow Comparison + Validation + Reflection + Patterns */}
                        {section.id === 'section-06' && data.slug === 'iq-plugin' && (
                          <>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <LockedContent
                                password={data.passwordGate?.password || 'anu-access'}
                                caseStudySlug={data.slug}
                                unlockMessage="Password required to view workflow comparison"
                                isLightBackground={false}
                              >
                                <IQWorkflowComparison isLightBackground={false} />
                              </LockedContent>
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <IQValidationSources isLightBackground={false} />
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              {data.reflection && <CaseStudyReflection data={data.reflection} isLightBackground={false} />}
                            </div>
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <IQPatternConnections isLightBackground={false} />
                            </div>
                          </>
                        )}

                        {/* Generic UX Principles for other case studies section-03 */}
                        {section.id === 'section-03' && data.uxPrinciples &&
                          !(data.slug === 'ml-functions' || data.slug === 'iq-plugin' || data.slug === 'reportcaster') && (
                            <div className="mt-12 pt-12 border-t border-white/[0.06]">
                              <UXPrinciples
                                title={data.uxPrinciples.title}
                                intro={data.uxPrinciples.intro}
                                principles={data.uxPrinciples.principles}
                                isLightBackground={false}
                              />
                            </div>
                          )}

                      </CaseStudySection>
                    )}
























                  </div>
                )
              })}


              {/* Design System Showcase */}
              {data.slug && (
                <section className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                  <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                    <DesignSystemShowcase isLightBackground={true} caseStudySlug={data.slug} />
                  </div>
                </section>
              )}

              {/* System Index - Navigate to Other Architectures */}
              <SystemIndex
                currentId={
                  data.slug === 'reportcaster' ? 'REPORTCASTER' :
                    data.slug === 'ml-functions' ? 'ML_FUNCTIONS' :
                      'IQ_PLUGIN'
                }
              />



              {/* Let's Talk CTA */}
              <LetsTalkCTA />
            </>
          )
        }

        {/* end: full case study content wrapper */}
      </div >

      {/* Scroll Progress Gear - Only in full mode */}
      {viewMode === 'full' && <ScrollGear />}

      {/* Presentation Mode — handled above via StoryDeck */}
    </>
  )
}