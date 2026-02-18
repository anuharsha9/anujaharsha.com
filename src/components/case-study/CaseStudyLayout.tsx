'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
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


import { PresentationFlow, Slide } from './PresentationFlow'
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
}

export default function CaseStudyLayout({ data }: CaseStudyLayoutProps) {
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
  const [viewMode, setViewMode] = useState<'full' | 'presentation'>('full')

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

  // Use standard presentation slides without injected deep-dive components
  const presentationSlides = useMemo(() => {
    return (data.presentation?.slides || []) as Slide[]
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
      {/* Reading Progress Indicator - Full Mode Only */}
      {viewMode === 'full' && <ReadingProgress />}

      {/* Presentation Mode Overlay */}
      {viewMode === 'presentation' && data.presentation && (
        <PresentationFlow
          slides={presentationSlides}
          bonusSlides={data.bonusSlides}
          onExit={() => setViewMode('full')}
        />
      )}



      {/* Table of Contents - Sticky Navigation */}
      {/* Section Navigation - shows on all case study pages (Full Mode Only) */}
      {viewMode === 'full' && data.sections && data.sections.length > 0 && (
        <SectionNav sections={data.sections} />
      )}

      {/* ============================================
          PUBLIC SECTION (Visible by default)
          ============================================ */}

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
                        className="flex-1 px-4 py-3 border border-black/20 text-[var(--text-primary-light)] bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:border-transparent placeholder:text-[var(--text-muted-light)] shadow-sm"
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
                      className="flex-1 px-4 py-3 border border-black/20 text-[var(--text-primary-light)] bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:border-transparent placeholder:text-[var(--text-muted-light)] shadow-sm"
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
            {/* Quick Overview - light background with White Cards */}
            <section className="surface-light py-8 sm:py-10 md:py-12 relative space-y-8">
              {/* Subtle Logo Watermark - Top Left Corner */}
              <div className="absolute top-8 left-8 opacity-[0.02] pointer-events-none hidden lg:block">
                <div className="w-24 h-24">
                  <SignatureLogo className="w-full h-full text-black" />
                </div>
              </div>

              {/* Quick Overview Card */}
              <CaseStudyCard noPadding={true}>
                <QuickOverview data={data.quickOverview} heroSubtitle={data.heroSubtitle} caseStudySlug={data.slug} />
              </CaseStudyCard>

              {/* Scale & Responsibility Card */}
              {data.scaleAndResponsibility && (
                <CaseStudyCard noPadding={true}>
                  <ScaleAndResponsibility
                    data={data.scaleAndResponsibility}
                    accentColor={data.slug === 'reportcaster' ? 'teal' : data.slug === 'iq-plugin' ? 'violet' : 'teal'}
                  />
                </CaseStudyCard>
              )}

              {/* ExecutiveSummaryArc removed — V1→V2→V3 story now told once in VersionIteration (section-04) */}
            </section>

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
              <section className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                <CaseStudyCard>
                  <ReportCasterTimeline isLightBackground={true} />
                </CaseStudyCard>
              </section>
            )}

            {/* ML Functions Timeline - Moved Outside Discover */}
            {data.slug === 'ml-functions' && (
              <section className="surface-light py-8 md:py-10">
                <CaseStudyCard>
                  <MLFunctionsTimeline isLightBackground={true} />
                </CaseStudyCard>
              </section>
            )}

            {/* IQ Plugin Project Timeline - Outside Discover Section */}
            {data.slug === 'iq-plugin' && (
              <section className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                <CaseStudyCard>
                  <IQPluginTimeline isLightBackground={true} />
                </CaseStudyCard>
              </section>
            )}

            {/* D.E.S.I.G.N. Framework Matrix */}
            {data.frameworkConnection && (
              <section id="framework-connection" className="surface-light py-8 md:py-10">
                <CaseStudyCard>
                  <FrameworkMatrix
                    principles={data.frameworkConnection.principles}
                    caseStudyContext={data.slug.toUpperCase().replace(/-/g, '_')}
                    sectionMappings={frameworkSectionMappings}
                  />
                </CaseStudyCard>
              </section>
            )}



            {/* Public Sections - if explicitly defined */}
            {data.publicSections &&
              data.publicSections.map((section, index) => {
                const isDiscoverySection = section.id === 'section-01' || section.id === 'section-02'
                const sectionBg = 'surface-light'
                const borderClass = sectionBg.includes('dark') ? 'border-refined-dark' : 'border-refined-light'

                return (
                  <div key={section.id}>
                    <section
                      className={`${sectionBg} py-8 sm:py-10 md:py-12 ${borderClass}`}
                    >
                      <CaseStudyCard>
                        <SectionBlock
                          section={section}
                          isLightBackground={sectionBg === 'surface-light'}
                          caseStudySlug={data.slug}
                          isUnlocked={showPasswordContent}
                          password={data.passwordGate?.password || 'anu-access'}
                        />
                      </CaseStudyCard>
                    </section>

                  </div>
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
                    <>
                      {/* Render as proper section with header */}
                      <section
                        id={section.id}
                        className={`${sectionBg} ${paddingClass} ${borderClass}`}
                      >
                        <CaseStudyCard>
                          {/* Section Header - Letter badges removed for senior energy */}
                          <div className="space-y-4 mb-8">
                            <ComponentHeading
                              variant="section"
                              tag={undefined}
                              title={section.title}
                              color="slate"
                            />
                            {section.summary && (
                              <div className="mt-6 max-w-4xl">
                                <p className="text-xl md:text-2xl leading-relaxed text-slate-500 font-light">
                                  {section.summary}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* UX Principles / Architectural Standards - At the start of Iterate section */}
                          {data.uxPrinciples && (
                            <div className="mb-12">
                              <UXPrinciples
                                title={data.uxPrinciples.title}
                                intro={data.uxPrinciples.intro}
                                principles={data.uxPrinciples.principles}
                                isLightBackground={true}
                              />
                            </div>
                          )}

                          {/* Plus Menu Insight - The reframing moment */}
                          <PlusMenuInsight isLightBackground={sectionBg === 'surface-light'} />

                          {/* Workflow Transformation Visual - Show separately (not locked) */}
                          <ScheduleWorkflowComparison isLightBackground={sectionBg === 'surface-light'} />

                          {/* Natural Language Insight - The recurrence summary micro-detail */}
                          <NaturalLanguageInsight isLightBackground={sectionBg === 'surface-light'} />

                          {/* RecurrenceDesignDetail REMOVED — duplicates NaturalLanguageInsight */}

                          {/* Version Iteration Details - NOW PUBLIC */}
                          <div className="mt-8">
                            <VersionIteration
                              v1={section.v1Data}
                              v2={section.v2Data}
                              v3={section.v3Data}
                              isLightBackground={sectionBg === 'surface-light'}
                            />

                            {/* RCDesignEvolution REMOVED — too granular for the narrative flow */}
                          </div>
                        </CaseStudyCard>
                      </section>
                    </>
                  ) : (
                    <>
                      {/* Each section */}
                      <section
                        id={section.id}
                        className={`${sectionBg} ${paddingClass} ${borderClass}`}
                      >
                        <CaseStudyCard>
                          {/* Lock entire section-04 (Iterate) for ML Functions */}
                          {data.slug === 'ml-functions' && section.id === 'section-04' ? (
                            <LockedContent
                              password={data.passwordGate?.password || 'anu-access'}
                              caseStudySlug={data.slug}
                              unlockMessage="Password required to view iteration details and new workflow designs"
                              isLightBackground={sectionBg === 'surface-light'}
                            >
                              <SectionBlock
                                section={section}
                                isLightBackground={sectionBg === 'surface-light'}
                                caseStudySlug={data.slug}
                                isUnlocked={showPasswordContent}
                                password={data.passwordGate?.password || 'anu-access'}
                                frameworkMapping={data.frameworkConnection ? (() => {
                                  // Create reverse mapping: sectionId -> framework letter
                                  const mapping: Record<string, string> = {}
                                  data.frameworkConnection.principles.forEach((principle) => {
                                    let sectionId = ''
                                    if (data.slug === 'reportcaster') {
                                      if (principle.letter === 'D') sectionId = 'section-01'
                                      else if (principle.letter === 'E') sectionId = 'section-02'
                                      else if (principle.letter === 'S') sectionId = 'section-03'
                                      else if (principle.letter === 'I') sectionId = 'version-iteration'
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
                                    // For sections that map to multiple principles, use the first one found
                                    if (sectionId && !mapping[sectionId]) {
                                      mapping[sectionId] = principle.letter
                                    }
                                  })
                                  return mapping
                                })() : undefined}
                              />
                            </LockedContent>
                          ) : (
                            <SectionBlock
                              section={section}
                              isLightBackground={sectionBg === 'surface-light'}
                              caseStudySlug={data.slug}
                              isUnlocked={showPasswordContent}
                              password={data.passwordGate?.password || 'anu-access'}
                              frameworkMapping={data.frameworkConnection ? (() => {
                                // Create reverse mapping: sectionId -> framework letter
                                const mapping: Record<string, string> = {}
                                data.frameworkConnection.principles.forEach((principle) => {
                                  let sectionId = ''
                                  if (data.slug === 'reportcaster') {
                                    if (principle.letter === 'D') sectionId = 'section-01'
                                    else if (principle.letter === 'E') sectionId = 'section-02'
                                    else if (principle.letter === 'S') sectionId = 'section-03'
                                    else if (principle.letter === 'I') sectionId = 'version-iteration'
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
                                  // For sections that map to multiple principles, use the first one found
                                  if (sectionId && !mapping[sectionId]) {
                                    mapping[sectionId] = principle.letter
                                  }
                                })
                                return mapping
                              })() : undefined}
                            />
                          )}

                          {/* === INLINE SUB-COMPONENTS: All in the SAME white box === */}

                          {/* RC Section 01: SystemArchaeology only — ScopeExpansionReveal removed (duplicates ExecutiveSummaryArc) */}
                          {section.id === 'section-01' && data.slug === 'reportcaster' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <SystemArchaeology isLightBackground={true} caseStudySlug={data.slug} />
                              </div>
                            </>
                          )}

                          {/* ML Section 01: Knowledge Gap + Challenge Breakdown */}
                          {section.id === 'section-01' && data.slug === 'ml-functions' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <MLKnowledgeGapSystem isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <MLChallengeBreakdown isLightBackground={true} />
                              </div>
                            </>
                          )}

                          {/* IQ Section 01: Business Case + Workflows + NLQ */}
                          {section.id === 'section-01' && data.slug === 'iq-plugin' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <IQBusinessCase isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <IQWorkflowsAndFoundation isLightBackground={true} />
                              </div>
                            </>
                          )}

                          {/* RC Section 06: ImpactVisual — REMOVED: metrics shown elsewhere */}

                          {/* RC Section 02: Research Network + Strategy only — MarketAnalysis, Personas, EmpathizeGrid removed (generic filler) */}
                          {isSectionTwo && data.slug === 'reportcaster' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <TribalKnowledgeNetwork isLightBackground={true} />
                              </div>
                            </>
                          )}

                          {/* ML Section 02: Research + Access Strategy + Personas + Market */}
                          {isSectionTwo && data.slug === 'ml-functions' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <ResearchApproach data={researchApproachData['ml-functions']} accentColor="teal" />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <MLUserAccessStrategy isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <MLPersonaCards isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <MarketAnalysis {...mlFunctionsMarketAnalysis} isLightBackground={true} />
                              </div>
                            </>
                          )}

                          {/* IQ Section 02: Research + Personas + Market */}
                          {section.id === 'section-02' && data.slug === 'iq-plugin' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <ResearchApproach data={researchApproachData['iq-plugin']} accentColor="violet" />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <IQPersonaCards isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <MarketAnalysis {...iqPluginMarketAnalysis} isLightBackground={true} />
                              </div>
                            </>
                          )}

                          {/* RC Section 03: SystemConsolidationMap + ProcessArtifacts + SystemMapping — SubsystemConsolidation removed (duplicates consolidation map) */}
                          {section.id === 'section-03' && data.slug === 'reportcaster' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <SystemConsolidationMap isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <ProcessArtifactViewer
                                  artifacts={reportCasterArtifacts}
                                  pdfUrl="/assets/rc-sketchbook.pdf"
                                />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <SystemMappingBreakdown isLightBackground={sectionBg === 'surface-light'} />
                              </div>
                            </>
                          )}

                          {/* ML Section 03: Topology + Workflow + Pivots + Principles + Artifacts */}
                          {section.id === 'section-03' && data.slug === 'ml-functions' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <ProcessArtifactViewer
                                  artifacts={mlArtifacts}
                                  title="The System Blueprint"
                                  description="Before solving for UI, I had to solve for system logic. These diagrams map the complex relationships between model types, training workflows, and user personas."
                                  pdfUrl="/assets/ml-iq-sketchbook.pdf"
                                />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <SystemTopologyBlueprint isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <MLWorkflowMapping isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">

                              </div>
                              {data.uxPrinciples && (
                                <div className="mt-12 pt-12 border-t border-slate-100">
                                  <UXPrinciples
                                    title={data.uxPrinciples.title}
                                    intro={data.uxPrinciples.intro}
                                    principles={data.uxPrinciples.principles}
                                    isLightBackground={true}
                                  />
                                </div>
                              )}
                            </>
                          )}

                          {/* IQ Section 03: ProcessArtifacts + Architecture + Blueprint + Principles */}
                          {section.id === 'section-03' && data.slug === 'iq-plugin' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <IQIdeaLab isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <IQBuildingSystem isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <IQPluginArchitecture isLightBackground={true} />
                              </div>

                              {data.uxPrinciples && (
                                <div className="mt-12 pt-12 border-t border-slate-100">
                                  <UXPrinciples
                                    title={data.uxPrinciples.title}
                                    intro={data.uxPrinciples.intro}
                                    principles={data.uxPrinciples.principles}
                                    isLightBackground={true}
                                  />
                                </div>
                              )}
                            </>
                          )}

                          {/* ML Section 04: Layered Disclosure + Design Iteration Log */}
                          {section.id === 'section-04' && data.slug === 'ml-functions' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <LockedContent
                                  password={data.passwordGate?.password || 'anu-access'}
                                  caseStudySlug={data.slug}
                                  unlockMessage="Password required to view layered disclosure strategy"
                                  isLightBackground={true}
                                >
                                  <LayeredDisclosureVisual isLightBackground={true} />
                                </LockedContent>
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <LockedContent
                                  password={data.passwordGate?.password || 'anu-access'}
                                  caseStudySlug={data.slug}
                                  unlockMessage="Password required to view design artifacts"
                                  isLightBackground={true}
                                >
                                  <DesignIterationLog isLightBackground={true} />
                                </LockedContent>
                              </div>
                            </>
                          )}

                          {/* IQ Section 04: Evolution + Empty States + Design Log */}
                          {section.id === 'section-04' && data.slug === 'iq-plugin' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <LockedContent
                                  password={data.passwordGate?.password || 'anu-access'}
                                  caseStudySlug={data.slug}
                                  unlockMessage="Password required to view design evolution"
                                  isLightBackground={true}
                                >
                                  <IQEvolution isLightBackground={true} />
                                </LockedContent>
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <LockedContent
                                  password={data.passwordGate?.password || 'anu-access'}
                                  caseStudySlug={data.slug}
                                  unlockMessage="Password required to view empty states"
                                  isLightBackground={true}
                                >
                                  <IQEmptyStateShowcase isLightBackground={true} />
                                </LockedContent>
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <LockedContent
                                  password={data.passwordGate?.password || 'anu-access'}
                                  caseStudySlug={data.slug}
                                  unlockMessage="Password required to view design specifications"
                                  isLightBackground={true}
                                >
                                  <DesignIterationLog
                                    isLightBackground={true}
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
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <OwnershipScope isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <TeamCollaboration data={teamCollaborationData['reportcaster']} accentColor="amber" />
                              </div>
                            </>
                          )}

                          {/* ML Section 05: Explainability + Team Collaboration */}
                          {section.id === 'section-05' && data.slug === 'ml-functions' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <MLExplainabilityHighlight isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <TeamCollaboration data={teamCollaborationData['ml-functions']} accentColor="teal" />
                              </div>
                            </>
                          )}

                          {/* IQ Section 05: Team Collaboration + Challenges */}
                          {section.id === 'section-05' && data.slug === 'iq-plugin' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <TeamCollaboration data={teamCollaborationData['iq-plugin']} accentColor="violet" />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <LockedContent
                                  isUnlocked={showPasswordContent}
                                  password="access"
                                  caseStudySlug={data.slug}
                                  unlockMessage="Password required to view architectural decisions"
                                  isLightBackground={true}
                                >
                                  <IQChallengesBreakdown isLightBackground={true} />
                                </LockedContent>
                              </div>
                            </>
                          )}

                          {/* RC Section 06: Testimonials + ShippedImpact + ImpactDiff + NavigateForward — PatternConnections removed (filler) */}
                          {section.id === 'section-06' && data.slug === 'reportcaster' && (
                            <>





                              <div className="mt-12 pt-12 border-t border-slate-100">
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
                                  isLightBackground={true}
                                />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <NavigateForwardContent isLightBackground={true} reflection={data.reflection} />
                              </div>
                            </>
                          )}

                          {/* ML Section 06: Visual Diffs + Impact + Reflection + Patterns */}
                          {section.id === 'section-06' && data.slug === 'ml-functions' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <div className="text-center mb-8">
                                  <span className="font-mono text-[var(--accent-teal)] text-xs tracking-widest uppercase block mb-2">
                                    {'// VISUAL_DIFF'}
                                  </span>
                                  <h4 className="font-sans text-slate-900 text-xl md:text-2xl">
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
                                  isLightBackground={true}
                                />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <ImpactDiff
                                  beforeImage="/images/case-study/ml-functions/Legacy Train Model Results UI.png"
                                  afterImage="/images/case-study/ml-functions/8. Train Model Workflow - Compare Models.png"
                                  beforeLabel="Legacy"
                                  afterLabel="Redesign"
                                  beforeTitle="legacy_results.exe"
                                  afterTitle="model_comparison.tsx"
                                  isLightBackground={true}
                                />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <MLImpactMetrics isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                {data.reflection && <CaseStudyReflection data={data.reflection} isLightBackground={true} />}
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <MLPatternConnections isLightBackground={true} />
                              </div>
                            </>
                          )}

                          {/* IQ Section 06: Workflow Comparison + Validation + Reflection + Patterns */}
                          {section.id === 'section-06' && data.slug === 'iq-plugin' && (
                            <>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <LockedContent
                                  password={data.passwordGate?.password || 'anu-access'}
                                  caseStudySlug={data.slug}
                                  unlockMessage="Password required to view workflow comparison"
                                  isLightBackground={true}
                                >
                                  <IQWorkflowComparison isLightBackground={true} />
                                </LockedContent>
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <IQValidationSources isLightBackground={true} />
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                {data.reflection && <CaseStudyReflection data={data.reflection} isLightBackground={true} />}
                              </div>
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <IQPatternConnections isLightBackground={true} />
                              </div>
                            </>
                          )}

                          {/* Generic UX Principles for other case studies section-03 */}
                          {section.id === 'section-03' && data.uxPrinciples &&
                            !(data.slug === 'ml-functions' || data.slug === 'iq-plugin' || data.slug === 'reportcaster') && (
                              <div className="mt-12 pt-12 border-t border-slate-100">
                                <UXPrinciples
                                  title={data.uxPrinciples.title}
                                  intro={data.uxPrinciples.intro}
                                  principles={data.uxPrinciples.principles}
                                  isLightBackground={true}
                                />
                              </div>
                            )}

                        </CaseStudyCard>
                      </section>
                    </>
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

      {/* Scroll Progress Gear */}
      <ScrollGear />
    </>
  )
}