'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCaseStudyAccess } from '@/hooks/useCaseStudyAccess'
import { CaseStudyData } from '@/types/caseStudy'
import MotionSection from '@/components/ui/MotionSection'
import QuickOverview from './QuickOverview'
import HeroMeta from './HeroMeta'
import UXPrinciples from './UXPrinciples'
import SectionBlock from './SectionBlock'
import PrototypeBlock from './PrototypeBlock'
import PasswordGate from './PasswordGate'
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
import { mlFunctionsVitalSigns, reportCasterVitalSigns, iqPluginVitalSigns } from './VitalSigns'
import { reportCasterMarketAnalysis, mlFunctionsMarketAnalysis, iqPluginMarketAnalysis } from '@/data/market-analysis'
import { researchApproachData } from '@/data/research-approach'
import { teamCollaborationData } from '@/data/team-collaboration'
import DesignSystemShowcase from './DesignSystemShowcase'
import ScrollGear from '@/components/ui/ScrollGear'
import { iqTabs, iqFooterContent } from '@/components/case-study/iq-plugin-data'
// RetrospectiveCard and EvolutionSplit removed - personal growth content now on /me page

import LoadingSpinner from '@/components/ui/LoadingSpinner'

// Dynamic imports for heavy components - loaded on demand with loading states
// Note: Next.js requires options to be object literals, not variables
const ImpactVisual = dynamic(() => import('./ImpactVisual'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const EmpathizeStrategyGrid = dynamic(() => import('./EmpathizeStrategyGrid'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const PersonaCards = dynamic(() => import('./PersonaCards'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
// DiscoveryVisual removed - replaced by SystemArchaeology
const TeamOnboardingProcess = dynamic(() => import('./TeamOnboardingProcess'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
import ProcessArtifactViewer from './ProcessArtifactViewer'
import { reportCasterArtifacts } from '@/data/reportcaster-artifacts'
import { mlArtifacts } from '@/data/ml-artifacts'
import { iqArtifacts } from '@/data/iq-artifacts'
const SystemMappingBreakdown = dynamic(() => import('./SystemMappingBreakdown'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
// LearningAndTransformation removed - redundant with EvolutionSplit
const NavigateForwardContent = dynamic(() => import('./NavigateForwardContent'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const VersionIteration = dynamic(() => import('./VersionIteration'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const ScheduleWorkflowComparison = dynamic(() => import('./ScheduleWorkflowComparison'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const ImpactDiff = dynamic(() => import('./ImpactDiff'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const SystemArchaeology = dynamic(() => import('./SystemArchaeology'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const RCDesignEvolution = dynamic(() => import('./RCDesignEvolution'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
// TestimonialCard removed - testimonials now integrated into NavigateForwardContent

// Unified Research & Collaboration Components
const ResearchApproach = dynamic(() => import('./ResearchApproach'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const TeamCollaboration = dynamic(() => import('./TeamCollaboration'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})

// ML Functions specific components
const PatternConnections = dynamic(() => import('./PatternConnections'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const ReadingProgress = dynamic(() => import('./ReadingProgress'), { ssr: false }) // No loading state needed for progress bar
const MLChallengeBreakdown = dynamic(() => import('./MLChallengeBreakdown'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const MLKnowledgeGapSystem = dynamic(() => import('./MLKnowledgeGapSystem'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const MLUserAccessStrategy = dynamic(() => import('./MLUserAccessStrategy'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const MLWorkflowMapping = dynamic(() => import('./MLWorkflowMapping'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const ThreeCriticalPivots = dynamic(() => import('./ThreeCriticalPivots'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const MLExplainabilityHighlight = dynamic(() => import('./MLExplainabilityHighlight'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const VitalSigns = dynamic(() => import('./VitalSigns'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const SystemTopologyBlueprint = dynamic(() => import('./SystemTopologyBlueprint'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const DesignIterationLog = dynamic(() => import('./DesignIterationLog'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const LayeredDisclosureVisual = dynamic(() => import('./LayeredDisclosureVisual'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const MLImpactMetrics = dynamic(() => import('./MLImpactMetrics'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const MLPatternConnections = dynamic(() => import('./MLPatternConnections'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const MLPersonaCards = dynamic(() => import('./MLPersonaCards'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const MLRecommendations = dynamic(() => import('./MLRecommendations'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const MLReflection = dynamic(() => import('./MLReflection'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQReflection = dynamic(() => import('./IQReflection'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQPersonaCards = dynamic(() => import('./IQPersonaCards'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQBusinessCase = dynamic(() => import('./IQBusinessCase'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQChallengesBreakdown = dynamic(() => import('./IQChallengesBreakdown'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQValidationSources = dynamic(() => import('./IQValidationSources'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const ReportCasterTimeline = dynamic(() => import('./ReportCasterTimeline'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const MLFunctionsTimeline = dynamic(() => import('./MLFunctionsTimeline'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQPluginTimeline = dynamic(() => import('./IQPluginTimeline'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQArchitectureBlueprint = dynamic(() => import('./IQArchitectureBlueprint'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQNLQInsightsShowcase = dynamic(() => import('./IQNLQInsightsShowcase'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQPluginArchitecture = dynamic(() => import('./IQPluginArchitecture'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQIterationLog = dynamic(() => import('./IQIterationLog'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQWorkflowComparison = dynamic(() => import('./IQWorkflowComparison'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQEmptyStateShowcase = dynamic(() => import('./IQEmptyStateShowcase'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQEvolution = dynamic(() => import('./IQEvolution'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQWorkflowsBuilt = dynamic(() => import('./IQWorkflowsBuilt'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const IQPatternConnections = dynamic(() => import('./IQPatternConnections'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
const MarketAnalysis = dynamic(() => import('./MarketAnalysis'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})

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

  const pathname = usePathname()

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

  // Handle redirect to prototype if needed
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
      {/* Reading Progress Indicator */}
      <ReadingProgress />

      {/* Table of Contents - Sticky Navigation */}
      {/* Section Navigation - shows on all case study pages */}
      {data.sections && data.sections.length > 0 && (
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
                  className="text-[var(--text-primary-light)] text-3xl md:text-4xl lg:text-5xl font-serif leading-tight"
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
                        className="flex-1 px-4 py-3 rounded-full border border-black/20 text-[var(--text-primary-light)] bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:border-transparent placeholder:text-[var(--text-muted-light)] shadow-sm"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent-teal)] text-white flex items-center justify-center hover:bg-[var(--accent-teal-soft)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:ring-offset-2 shadow-md"
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
                  className="text-[var(--text-primary-light)] text-3xl md:text-4xl lg:text-5xl font-serif leading-tight"
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
        <section className="relative surface-light overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-12 md:pt-16">
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
            />
          </div>
        </section>
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
          <MotionSection className="surface-light py-8 md:py-12">
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
                      className="flex-1 px-4 py-3 rounded-full border border-black/20 text-[var(--text-primary-light)] bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:border-transparent placeholder:text-[var(--text-muted-light)] shadow-sm"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent-teal)] text-white flex items-center justify-center hover:bg-[var(--accent-teal-soft)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:ring-offset-2 shadow-md"
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
          </MotionSection>
        )
      }

      {/* ============================================
          CASE STUDY CONTENT (Only visible when unlocked)
          ============================================ */}
      {
        (showPasswordContent || !data.passwordGate) && (
          <>
            {/* Leadership Summary - Right after hero, before metrics */}
            {data.quickOverview.leadershipSummary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 md:py-8 overflow-hidden">
                  {/* Accent glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[var(--accent-teal)] to-transparent" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-12 bg-[var(--accent-teal)]/10 blur-3xl" />

                  {/* Content */}
                  <div className="relative max-w-[1000px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12">
                    <div className="flex items-start gap-4 md:gap-6">
                      {/* Quote mark */}
                      <div className="hidden md:block text-[var(--accent-teal)]/30 text-6xl lg:text-7xl font-serif leading-none -mt-2">&ldquo;</div>

                      <div className="flex-1 text-center md:text-left">
                        {/* Case-study specific quotes */}
                        {data.slug === 'reportcaster' ? (
                          <>
                            <p className="text-white text-xl md:text-2xl lg:text-3xl font-serif italic leading-relaxed">
                              So what are you going to do next?
                            </p>
                            <p className="text-slate-400 text-sm md:text-base mt-3">
                              — Customer feedback during Virtual User Group, after publicly praising the redesign
                            </p>
                          </>
                        ) : data.slug === 'ml-functions' ? (
                          <>
                            <p className="text-white text-xl md:text-2xl lg:text-3xl font-serif italic leading-relaxed">
                              The best screen in the entire UX revamp.
                            </p>
                            <p className="text-slate-400 text-sm md:text-base mt-3">
                              — Principal Data Scientist, on the confusion matrix I designed after 10+ iterations together
                            </p>
                          </>
                        ) : data.slug === 'iq-plugin' ? (
                          <>
                            <p className="text-white text-xl md:text-2xl lg:text-3xl font-serif italic leading-relaxed">
                              I brought mockups first — tickets followed.
                            </p>
                            <p className="text-slate-400 text-sm md:text-base mt-3">
                              — From roadmap concept to shipped architecture, owning all three DSML workflows
                            </p>
                          </>
                        ) : (
                          <p className="text-white text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
                            {data.quickOverview.leadershipSummary}
                          </p>
                        )}

                        {/* Label */}
                        <div className="mt-5 flex items-center justify-center md:justify-start gap-3">
                          <div className="w-10 h-px bg-[var(--accent-teal)]" />
                          <span className="text-[var(--accent-teal)] text-xs font-mono uppercase tracking-widest">
                            {data.slug === 'reportcaster' ? 'Customer Recognition' :
                              data.slug === 'ml-functions' ? 'SME Validation' :
                                data.slug === 'iq-plugin' ? 'Design Leadership' : 'Leading Without Authority'}
                          </span>
                        </div>
                      </div>

                      {/* Closing quote mark */}
                      <div className="hidden md:block text-[var(--accent-teal)]/30 text-6xl lg:text-7xl font-serif leading-none self-end -mb-2">&rdquo;</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Vital Signs Strip - Key Metrics at a Glance */}
            <VitalSigns
              metrics={
                data.slug === 'ml-functions' ? mlFunctionsVitalSigns :
                  data.slug === 'reportcaster' ? reportCasterVitalSigns :
                    data.slug === 'iq-plugin' ? iqPluginVitalSigns :
                      mlFunctionsVitalSigns // fallback
              }
            />

            {/* Quick Overview - light background */}
            <MotionSection className="surface-light py-8 sm:py-10 md:py-12 relative">
              {/* Subtle Logo Watermark - Top Left Corner */}
              <div className="absolute top-8 left-8 opacity-[0.02] pointer-events-none hidden lg:block">
                <div className="w-24 h-24">
                  <SignatureLogo className="w-full h-full text-black" />
                </div>
              </div>
              <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
                <QuickOverview data={data.quickOverview} heroSubtitle={data.heroSubtitle} caseStudySlug={data.slug} />
              </div>
            </MotionSection>

            {/* Prototype Block - Transformation in Motion (Before Framework) */}
            {data.prototypeMedia && (
              <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <PrototypeBlock
                  prototypeMedia={data.prototypeMedia}
                  caseStudySlug={data.slug}
                  isLightBackground={false}
                  password={data.passwordGate?.password || 'anu-access'}
                />
              </div>
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

            {/* ReportCaster Timeline - Moved Outside Discover */}
            {data.slug === 'reportcaster' && (
              <MotionSection className="surface-light py-8 md:py-10">
                <ReportCasterTimeline isLightBackground={true} />
              </MotionSection>
            )}

            {/* ML Functions Timeline - Moved Outside Discover */}
            {data.slug === 'ml-functions' && (
              <MotionSection className="surface-light py-8 md:py-10">
                <MLFunctionsTimeline isLightBackground={true} />
              </MotionSection>
            )}

            {/* IQ Plugin Project Timeline - Outside Discover Section */}
            {data.slug === 'iq-plugin' && (
              <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                <IQPluginTimeline isLightBackground={true} />
              </MotionSection>
            )}

            {/* D.E.S.I.G.N. Framework Matrix - surface-light */}
            {data.frameworkConnection && (
              <MotionSection id="framework-connection" className="surface-light py-8 md:py-10">
                <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                  <FrameworkMatrix
                    principles={data.frameworkConnection.principles}
                    caseStudyContext={data.slug.toUpperCase().replace(/-/g, '_')}
                    sectionMappings={(() => {
                      // Create mapping: framework letter -> sectionId
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
                        if (sectionId) {
                          mapping[principle.letter] = sectionId
                        }
                      })
                      return mapping
                    })()}
                  />
                </div>
              </MotionSection>
            )}



            {/* Public Sections - if explicitly defined */}
            {data.publicSections &&
              data.publicSections.map((section, index) => {
                const isDiscoverySection = section.id === 'section-01' || section.id === 'section-02'
                const sectionBg = 'surface-light'
                const borderClass = sectionBg.includes('dark') ? 'border-refined-dark' : 'border-refined-light'

                return (
                  <div key={section.id}>
                    <MotionSection
                      className={`${sectionBg} py-8 sm:py-10 md:py-12 border-t ${borderClass}`}
                    >
                      <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                        <SectionBlock
                          section={section}
                          isLightBackground={sectionBg === 'surface-light'}
                          caseStudySlug={data.slug}
                          isUnlocked={showPasswordContent}
                          password={data.passwordGate?.password || 'anu-access'}
                        />
                      </div>
                    </MotionSection>

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
              const paddingClass = 'py-8 sm:py-10 md:py-12'

              return (
                <div key={section.id}>
                  {/* Special handling for section-04 (version iteration) for ReportCaster */}
                  {section.id === 'section-04' && data.slug === 'reportcaster' && (section as any).v1Data && (section as any).v2Data && (section as any).v3Data ? (
                    <>
                      {/* Render as proper section with header */}
                      <MotionSection
                        id={section.id}
                        className={`${sectionBg} ${paddingClass} border-t ${borderClass}`}
                      >
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          {/* Section Header - Letter badges removed for senior energy */}
                          <div className="space-y-4 mb-8">
                            <h2 className={`${sectionBg === 'surface-light' ? 'text-slate-900' : 'text-white'} text-3xl md:text-4xl font-serif leading-snug tracking-tight`}>
                              {section.title}
                            </h2>
                            {section.summary && (
                              <div className={`${sectionBg === 'surface-light' ? 'bg-[var(--accent-teal)]/10' : 'bg-[var(--accent-teal)]/20'} p-4 md:p-5`}>
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 mt-0.5">
                                    <svg aria-hidden="true" className="w-5 h-5 text-[var(--accent-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                  <div className="flex-1">
                                    <div className={`${sectionBg === 'surface-light' ? 'text-slate-500' : 'text-white/70'} text-xs font-mono uppercase tracking-wider mb-1`}>TL;DR</div>
                                    <p className={`${sectionBg === 'surface-light' ? 'text-slate-900' : 'text-white'} text-sm md:text-base leading-relaxed font-medium`}>{section.summary}</p>
                                  </div>
                                </div>
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

                          {/* Workflow Transformation Visual - Show separately (not locked) */}
                          <ScheduleWorkflowComparison isLightBackground={sectionBg === 'surface-light'} />

                          {/* Version Iteration Details - NOW PUBLIC */}
                          <div className="mt-8">
                            <VersionIteration
                              v1={(section as any).v1Data}
                              v2={(section as any).v2Data}
                              v3={(section as any).v3Data}
                              isLightBackground={sectionBg === 'surface-light'}
                            />

                            {/* V3 Design Evolution - Detailed subsystem screens */}
                            <div className="mt-16 pt-12 border-t border-slate-200">
                              <RCDesignEvolution isLightBackground={sectionBg === 'surface-light'} />
                            </div>

                            {/* Impact Metrics & Validation - Moved from Section 06 */}
                            <div className="mt-16 pt-12 border-t border-slate-200">
                              <ImpactVisual isLightBackground={sectionBg === 'surface-light'} />
                            </div>

                          </div>
                        </div>
                      </MotionSection>
                    </>
                  ) : (
                    <>
                      {/* Each section */}
                      <MotionSection
                        id={section.id}
                        className={`${sectionBg} ${paddingClass} border-t ${borderClass}`}
                      >
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
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
                        </div>
                      </MotionSection>
                    </>
                  )}

                  {/* System Mapping Breakdown - Inside Section 03 (S - Simplify) - ReportCaster only - NOW PUBLIC */}
                  {section.id === 'section-03' && data.slug === 'reportcaster' && (
                    <>
                      {/* Process Artifacts "The War Room" - Moved to Section 03 */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <ProcessArtifactViewer
                            artifacts={reportCasterArtifacts}
                            pdfUrl="/assets/rc-sketchbook.pdf"
                          />
                        </div>
                      </MotionSection>
                    </>
                  )}

                  {section.id === 'section-03' && data.slug === 'reportcaster' && (
                    <MotionSection className={`${sectionBg} py-section-mobile md:py-section-tablet lg:py-section-desktop`}>
                      <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                        <SystemMappingBreakdown isLightBackground={sectionBg === 'surface-light'} />
                      </div>
                    </MotionSection>
                  )}

                  {/* Process Artifacts "The System Blueprint" - Moved to Section 03 for ML Functions */}
                  {section.id === 'section-03' && data.slug === 'ml-functions' && (
                    <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                      <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                        <ProcessArtifactViewer
                          artifacts={mlArtifacts}
                          title="The System Blueprint"
                          description="Before solving for UI, I had to solve for system logic. These diagrams map the complex relationships between model types, training workflows, and user personas."
                          pdfUrl="/assets/ml-iq-sketchbook.pdf"
                        />
                      </div>
                    </MotionSection>
                  )}



                  {/* Discovery Visual - Inside Section 01 (D - Discover Deeply) - ReportCaster only */}
                  {/* Note: Narrative content is public; only legacy images are locked inside SystemArchaeology */}
                  {section.id === 'section-01' && data.slug === 'reportcaster' && (
                    <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                      <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                        <SystemArchaeology isLightBackground={true} caseStudySlug={data.slug} />
                      </div>
                    </MotionSection>
                  )}








                  {/* Insert Research Approach, Strategy Grid, Research Methods and Persona Cards - ReportCaster Section 02 */}
                  {isSectionTwo && data.slug === 'reportcaster' && (
                    <>
                      {/* Research Approach - Unified Component */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <ResearchApproach data={researchApproachData['reportcaster']} accentColor="amber" />
                        </div>
                      </MotionSection>

                      {/* Customer Obsession Highlight */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <EmpathizeStrategyGrid isLightBackground={true} />
                        </div>
                      </MotionSection>

                      {/* Market Analysis - Competitive Landscape */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <MarketAnalysis {...reportCasterMarketAnalysis} isLightBackground={true} />
                        </div>
                      </MotionSection>

                      {/* User Personas */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <PersonaCards isLightBackground={true} />
                        </div>
                      </MotionSection>
                    </>
                  )}



                  {/* ML Functions Visuals - Section 01 (Discover) */}
                  {section.id === 'section-01' && data.slug === 'ml-functions' && (
                    <>
                      {/* Knowledge Gap System - Unified Challenge → Method → Result */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <MLKnowledgeGapSystem isLightBackground={true} />
                        </div>
                      </MotionSection>
                      {/* System Audit - The Baseline (Legacy Screens with Error Annotations) */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <MLChallengeBreakdown isLightBackground={true} />
                        </div>
                      </MotionSection>
                    </>
                  )}

                  {/* ML Functions Visuals - Section 02 (Empathize) */}
                  {isSectionTwo && data.slug === 'ml-functions' && (
                    <>
                      {/* Research Approach - Unified Component */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <ResearchApproach data={researchApproachData['ml-functions']} accentColor="teal" />
                        </div>
                      </MotionSection>
                      {/* User Access Strategy - Constraint vs Strategy */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <MLUserAccessStrategy isLightBackground={true} />
                        </div>
                      </MotionSection>
                      {/* User Personas - Horizontal Spec Sheet */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <MLPersonaCards isLightBackground={true} />
                        </div>
                      </MotionSection>
                      {/* Feature Comparison Matrix - Competitive Analysis */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <MarketAnalysis {...mlFunctionsMarketAnalysis} isLightBackground={true} />
                        </div>
                      </MotionSection>
                    </>
                  )}

                  {/* ML Functions Visuals - Section 03 */}
                  {section.id === 'section-03' && data.slug === 'ml-functions' && (
                    <>
                      {/* System Topology & Architecture Blueprints */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <SystemTopologyBlueprint isLightBackground={true} />
                        </div>
                      </MotionSection>

                      {/* Workflow Mapping */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <MLWorkflowMapping isLightBackground={true} />
                        </div>
                      </MotionSection>
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <LockedContent
                            password={data.passwordGate?.password || 'anu-access'}
                            caseStudySlug={data.slug}
                            unlockMessage="Password required to view design pivot details"
                            isLightBackground={true}
                          >
                            <ThreeCriticalPivots isLightBackground={true} />
                          </LockedContent>
                        </div>
                      </MotionSection>
                      {/* UX Principles - In Simplify section (S) */}
                      {data.uxPrinciples && (
                        <MotionSection className="surface-light py-8 sm:py-10 md:py-12">
                          <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                            <UXPrinciples
                              title={data.uxPrinciples.title}
                              intro={data.uxPrinciples.intro}
                              principles={data.uxPrinciples.principles}
                              isLightBackground={true}
                            />
                          </div>
                        </MotionSection>
                      )}
                    </>
                  )}

                  {/* ML Functions Visuals - Section 04 */}
                  {section.id === 'section-04' && data.slug === 'ml-functions' && (
                    <>
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <LockedContent
                            password={data.passwordGate?.password || 'anu-access'}
                            caseStudySlug={data.slug}
                            unlockMessage="Password required to view layered disclosure strategy"
                            isLightBackground={true}
                          >
                            <LayeredDisclosureVisual isLightBackground={true} />
                          </LockedContent>
                        </div>
                      </MotionSection>
                      {/* Design Iteration Log - IDE-style artifact explorer */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <LockedContent
                            password={data.passwordGate?.password || 'anu-access'}
                            caseStudySlug={data.slug}
                            unlockMessage="Password required to view design artifacts"
                            isLightBackground={true}
                          >
                            <DesignIterationLog isLightBackground={true} />
                          </LockedContent>
                        </div>
                      </MotionSection>
                    </>
                  )}

                  {/* IQ Plugin Visuals - Section 04 (Iterate with Inclusion) */}
                  {section.id === 'section-04' && data.slug === 'iq-plugin' && (
                    <>
                      {/* Design Evolution - Section 04 (Iterate) */}
                      <MotionSection className="surface-light py-0">
                        <LockedContent
                          password={data.passwordGate?.password || 'anu-access'}
                          caseStudySlug={data.slug}
                          unlockMessage="Password required to view design evolution"
                          isLightBackground={true}
                          className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16"
                        >
                          <IQEvolution isLightBackground={true} />
                        </LockedContent>
                      </MotionSection>

                      {/* Empty State Showcase - Intuitive First Impression (Reordered) */}
                      <MotionSection className="surface-light py-0">
                        <LockedContent
                          password={data.passwordGate?.password || 'anu-access'}
                          caseStudySlug={data.slug}
                          unlockMessage="Password required to view empty states"
                          isLightBackground={true}
                          className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16"
                        >
                          <IQEmptyStateShowcase isLightBackground={true} />
                        </LockedContent>
                      </MotionSection>

                      {/* System Inspection (Artifacts) - Updated Component */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
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
                      </MotionSection>
                      {/* Iteration Log */}

                    </>
                  )}



                  {/* ReportCaster Visuals - Section 05 (G - Grow Through Constraints) */}
                  {section.id === 'section-05' && data.slug === 'reportcaster' && (
                    <>
                      {/* Team Collaboration - Unified Component */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <TeamCollaboration data={teamCollaborationData['reportcaster']} accentColor="amber" />
                        </div>
                      </MotionSection>
                    </>
                  )}

                  {/* IQ Plugin Visuals - Section 05 (G - Grow) */}
                  {section.id === 'section-05' && data.slug === 'iq-plugin' && (
                    <>
                      {/* Leadership / Team Collaboration */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <TeamCollaboration data={teamCollaborationData['iq-plugin']} accentColor="violet" />
                        </div>
                      </MotionSection>

                      {/* Architectural Decision Records (Moved from Section 04) */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
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
                      </MotionSection>
                    </>
                  )}

                  {/* ML Functions Visuals - Section 05 (G - Grow Through Constraints) */}
                  {section.id === 'section-05' && data.slug === 'ml-functions' && (
                    <>
                      {/* Explainability Deep Dive - Trust Earned */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <MLExplainabilityHighlight isLightBackground={true} />
                        </div>
                      </MotionSection>



                      {/* Team Collaboration - Unified Component */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <TeamCollaboration data={teamCollaborationData['ml-functions']} accentColor="teal" />
                        </div>
                      </MotionSection>
                    </>
                  )}

                  {/* Note: FourStepFlowBreakdown content is integrated into section subsections */}
                  {/* Note: Challenge Breakdown is integrated into Section 01 */}
                  {/* Note: Team Onboarding Process is integrated into Section 05 (G - Grow) via SectionBlock */}

                  {/* Navigate Forward Content - ReportCaster Section 06 */}
                  {section.id === 'section-06' && data.slug === 'reportcaster' && (
                    <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                      <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                        {/* Impact Diff - Visual Before/After Comparison */}
                        <div className="mb-16">
                          <div className="text-center mb-8">
                            <span className="font-mono text-[var(--accent-teal)] text-xs tracking-widest uppercase block mb-2">
                              {'// VISUAL_DIFF'}
                            </span>
                            <h4 className="font-serif text-slate-900 text-xl md:text-2xl">
                              Side-by-Side Comparison
                            </h4>
                          </div>
                          <ImpactDiff
                            beforeImage="/images/case-study/ReportCaster/Before.png"
                            afterImage="/images/case-study/ReportCaster/After.png"
                            beforeAlt="Before: Legacy RC interface — fragmented, multi-tab workflow"
                            afterAlt="After: New RC interface — unified, modal-based workflow"
                            isLightBackground={true}
                          />
                        </div>

                        <NavigateForwardContent isLightBackground={true} />
                      </div>
                    </MotionSection>
                  )}


                  {/* Insert Impact Visual after Section 06 - ReportCaster only */}


                  {/* ML Functions Visuals - Section 06 (N - Navigate / Retrospective) */}
                  {section.id === 'section-06' && data.slug === 'ml-functions' && (
                    <>
                      {/* Visual Diff - Legacy vs Redesigned Workflow */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <div className="text-center mb-8">
                            <span className="font-mono text-[var(--accent-teal)] text-xs tracking-widest uppercase block mb-2">
                              {'// VISUAL_DIFF'}
                            </span>
                            <h4 className="font-serif text-slate-900 text-xl md:text-2xl">
                              Legacy vs. Redesigned Workflow
                            </h4>
                          </div>
                          <ImpactDiff
                            beforeImage="/images/case-study/ml-functions/Legacy Train Model UI.png"
                            afterImage="/images/case-study/ml-functions/4. Train Model Workflow - Step 1 - Select Problem Type.png"
                            beforeAlt="Before: Legacy ML interface — fragmented drag-and-drop workflow"
                            afterAlt="After: New ML interface — guided 4-step workflow"
                            isLightBackground={true}
                          />
                        </div>
                      </MotionSection>

                      {/* Visual Diff - Legacy vs Redesigned Results */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <ImpactDiff
                            beforeImage="/images/case-study/ml-functions/Legacy Train Model Results UI.png"
                            afterImage="/images/case-study/ml-functions/8. Train Model Workflow - Compare Models.png"
                            beforeAlt="Before: Legacy Results - fragmented table"
                            afterAlt="After: New Comparison View - visualized metrics"
                            beforeLabel="// LEGACY"
                            afterLabel="// REDESIGN"
                            isLightBackground={true}
                          />
                        </div>
                      </MotionSection>
                      {/* 1. Strategic Outcomes (Impact Metrics) */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <MLImpactMetrics isLightBackground={true} />
                        </div>
                      </MotionSection>

                      {/* 2. Reflection (Testimonials + What I'd Do Next) */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <MLReflection isLightBackground={true} />
                        </div>
                      </MotionSection>

                      {/* 3. Patterns That Became Reusable */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <MLPatternConnections isLightBackground={true} />
                        </div>
                      </MotionSection>
                    </>
                  )}

                  {/* Pattern Connections Visual - ReportCaster Section 06 */}
                  {data.slug === 'reportcaster' && section.id === 'section-06' && (
                    <>
                      {/* Pattern Connections Visual - ReportCaster only */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <PatternConnections isLightBackground={true} />
                        </div>
                      </MotionSection>
                    </>
                  )}

                  {/* IQ Plugin - Section 01 (D - System Diagnosis) */}
                  {section.id === 'section-01' && data.slug === 'iq-plugin' && (
                    <>
                      {/* 1. The Problem First (PUBLIC) */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <IQBusinessCase isLightBackground={true} />
                        </div>
                      </MotionSection>
                      {/* 2. What I Owned - The 3 Workflows (PUBLIC) */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <IQWorkflowsBuilt isLightBackground={true} />
                      </MotionSection>
                      {/* 3. NLQ & Insights Deep Dive (PUBLIC) */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <IQNLQInsightsShowcase isLightBackground={true} />
                      </MotionSection>
                    </>
                  )}

                  {/* IQ Plugin - Section 02 (E - Mapping the Ecosystem / Personas) */}
                  {section.id === 'section-02' && data.slug === 'iq-plugin' && (
                    <>
                      {/* Research Approach - Unified Component */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <ResearchApproach data={researchApproachData['iq-plugin']} accentColor="violet" />
                        </div>
                      </MotionSection>
                      {/* Persona Matrix */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <IQPersonaCards isLightBackground={true} />
                        </div>
                      </MotionSection>
                      {/* Competitive Positioning - Moved from Section 06 */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <MarketAnalysis {...iqPluginMarketAnalysis} isLightBackground={true} />
                        </div>
                      </MotionSection>
                    </>
                  )}

                  {/* IQ Plugin - Section 03 (S - Architectural Convergence) */}
                  {section.id === 'section-03' && data.slug === 'iq-plugin' && (
                    <>
                      {/* Process Artifacts "The Idea Lab" - Moved to Simplify Section */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <ProcessArtifactViewer
                            artifacts={iqArtifacts}
                            title="The Idea Lab"
                            description="3 products in 1 plugin. From napkin sketches to high-fidelity wireframes, mapping out how Natural Language, Insights, and Analysis would coexist."
                          />
                        </div>
                      </MotionSection>

                      {/* System Convergence Diagram */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <IQPluginArchitecture isLightBackground={true} />
                      </MotionSection>
                      {/* Architecture Blueprint - Building the System */}
                      <MotionSection className="surface-light py-0">
                        <LockedContent
                          password={data.passwordGate?.password || 'anu-access'}
                          caseStudySlug={data.slug}
                          unlockMessage="Password required to view architecture blueprint"
                          isLightBackground={true}
                          className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16"
                        >
                          <IQArchitectureBlueprint isLightBackground={true} />
                        </LockedContent>
                      </MotionSection>
                      {/* Architectural Directives */}
                      {data.uxPrinciples && (
                        <MotionSection className="surface-light py-8 sm:py-10 md:py-12">
                          <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                            <UXPrinciples
                              title={data.uxPrinciples.title}
                              intro={data.uxPrinciples.intro}
                              principles={data.uxPrinciples.principles}
                              isLightBackground={true}
                            />
                          </div>
                        </MotionSection>
                      )}
                    </>
                  )}

                  {/* UX Principles - In Simplify section (S) - For case studies without section-03 visuals */}
                  {/* Note: ReportCaster UXPrinciples moved to section-04 (Iterate) for better context */}
                  {section.id === 'section-03' && data.uxPrinciples &&
                    !(data.slug === 'ml-functions' || data.slug === 'iq-plugin' || data.slug === 'reportcaster') && (
                      <MotionSection className="surface-light py-8 sm:py-10 md:py-12">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <UXPrinciples
                            title={data.uxPrinciples.title}
                            intro={data.uxPrinciples.intro}
                            principles={data.uxPrinciples.principles}
                            isLightBackground={true}
                          />
                        </div>
                      </MotionSection>
                    )}

                  {/* IQ Plugin Visuals - Section 05 (G - Architectural Decision Records) */}


                  {/* IQ Plugin Visuals - Section 06 (N - Navigate / Retrospective) */}
                  {section.id === 'section-06' && data.slug === 'iq-plugin' && (
                    <>
                      {/* Workflow Comparison - Moved to Section 06 (Navigate) */}
                      <MotionSection className="surface-light py-0">
                        <LockedContent
                          password={data.passwordGate?.password || 'anu-access'}
                          caseStudySlug={data.slug}
                          unlockMessage="Password required to view workflow comparison"
                          isLightBackground={true}
                          className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16"
                        >
                          <IQWorkflowComparison isLightBackground={true} />
                        </LockedContent>
                      </MotionSection>

                      {/* 1. Strategic Outcomes (Validation Sources) */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <IQValidationSources isLightBackground={true} />
                        </div>
                      </MotionSection>

                      {/* 2. Reflection (Testimonials + What I'd Do Next) */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <IQReflection isLightBackground={true} />
                        </div>
                      </MotionSection>

                      {/* 3. Pattern Connections - Consistent with RC and ML */}
                      <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
                        <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                          <IQPatternConnections isLightBackground={true} />
                        </div>
                      </MotionSection>
                    </>
                  )}

                </div>
              )
            })}


            {/* Design System Showcase - Locked for RC, Public for others */}
            <MotionSection className="surface-light py-section-mobile md:py-section-tablet lg:py-section-desktop">
              <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                {data.slug === 'reportcaster' ? (
                  <LockedContent
                    password="anu-access"
                    caseStudySlug={data.slug}
                    unlockMessage="Password required to view design system details"
                    isLightBackground={true}
                  >
                    <DesignSystemShowcase isLightBackground={true} caseStudySlug={data.slug} />
                  </LockedContent>
                ) : (
                  <DesignSystemShowcase isLightBackground={true} caseStudySlug={data.slug} />
                )}
              </div>
            </MotionSection>

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