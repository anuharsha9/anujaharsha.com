'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ParallaxImage from '@/components/ui/ParallaxImage'
import ScrollRevealText, { ScrollRevealItem } from '@/components/ui/ScrollRevealText'
import { CaseStudySection } from '@/types/caseStudy'
import WorkflowPrototype from './WorkflowPrototype'
import ImageLightbox from './ImageLightbox'
import BeforeAfterComparison from './BeforeAfterComparison'
import PullQuote from './PullQuote'
import AhaMoment from './AhaMoment'
import TeamOnboardingProcess from './TeamOnboardingProcess'
import FourStepFlowBreakdown from './FourStepFlowBreakdown'
import LockedContent from './LockedContent'
import { getTheme } from '@/lib/design-system'


interface SectionBlockProps {
  section: CaseStudySection
  isLightBackground?: boolean
  caseStudySlug?: string
  frameworkMapping?: Record<string, string> // Maps sectionId to framework letter
  isUnlocked?: boolean // Whether password-protected content should be shown
  password?: string // Password for unlocking sensitive content
  hideHeader?: boolean // When nested inside an Act section that already shows its own heading
}

import { extractMetrics, parseBodyWithAhaMoments, renderFormattedContent, createImageGroups } from '@/lib/content-utils'
import ComponentHeading from '@/components/ui/ComponentHeading'

// Helper to create image groups based on content
// (Moved to content-utils.tsx)

export default function SectionBlock({ section, isLightBackground = false, caseStudySlug, frameworkMapping, isUnlocked = false, password, hideHeader = false }: SectionBlockProps) {
  // Check global unlock state in addition to prop
  const [globalUnlocked, setGlobalUnlocked] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkUnlockState = () => {
        const globalUnlockState = sessionStorage.getItem('portfolio-globally-unlocked') === 'true'
        const caseUnlockState = caseStudySlug
          ? sessionStorage.getItem(`case-study-unlocked-${caseStudySlug}`) === 'true'
          : false
        setGlobalUnlocked(globalUnlockState || caseUnlockState)
      }

      // Check on mount
      checkUnlockState()

      // Listen for unlock events
      const handleUnlock = () => {
        checkUnlockState()
      }

      window.addEventListener('case-study-unlocked', handleUnlock)
      window.addEventListener('portfolio-unlocked', handleUnlock)

      // Also check periodically in case sessionStorage is updated elsewhere
      const interval = setInterval(checkUnlockState, 500)

      return () => {
        window.removeEventListener('case-study-unlocked', handleUnlock)
        window.removeEventListener('portfolio-unlocked', handleUnlock)
        clearInterval(interval)
      }
    }
  }, [caseStudySlug])

  // For sensitive images, always check unlock status (don't rely on isUnlocked prop)
  // The isUnlocked prop is for password-gated case studies, but individual images can be locked independently
  // IMPORTANT: For individual sensitive images, ONLY check globalUnlocked (sessionStorage), NOT isUnlocked prop
  // This ensures that even if a case study is unlocked, individual sensitive images remain locked until explicitly unlocked
  const actuallyUnlocked = globalUnlocked

  // Calculate if section should be locked entirely (if >50% of content is sensitive)
  const calculateSectionSensitivity = () => {
    if (section.sensitive) return true // Already marked as sensitive

    const images = section.images || []
    const subsections = section.subsections || []

    // Count sensitive images
    const sensitiveImages = images.filter(img => img.sensitive).length
    const totalImages = images.length

    // Count sensitive subsections
    const sensitiveSubsections = subsections.filter(sub => {
      if (sub.sensitive) return true
      const subImages = sub.images || []
      const sensitiveSubImages = subImages.filter(img => img.sensitive).length
      return subImages.length > 0 && sensitiveSubImages / subImages.length > 0.5
    }).length
    const totalSubsections = subsections.length

    // Count total sensitive items
    const totalSensitive = sensitiveImages + sensitiveSubsections
    const totalItems = totalImages + totalSubsections

    // If >50% of content is sensitive, lock the whole section
    if (totalItems > 0 && totalSensitive / totalItems > 0.5) {
      return true
    }

    return false
  }

  const isSectionSensitive = calculateSectionSensitivity()

  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set([0]))
  const [expandedDetailImages, setExpandedDetailImages] = useState(false)
  const [expandedSubsections, setExpandedSubsections] = useState<Set<number>>(new Set()) // All subsections collapsed by default
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption?: string } | null>(null)
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string; caption?: string }>>([])
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0)
  const [showAllLegacyImages, setShowAllLegacyImages] = useState(false) // For Section 01 collapsible gallery
  const [showAllScheduleDialogImages, setShowAllScheduleDialogImages] = useState(false) // For Schedule Dialog collapsible gallery

  // Safety check: ensure section exists (after hooks)
  if (!section) {
    return null
  }

  const openLightbox = (src: string, alt: string, caption?: string, images?: Array<{ src: string; alt: string; caption?: string }>, index?: number) => {
    setLightboxImage({ src, alt, caption })
    if (images && typeof index === 'number') {
      setLightboxImages(images)
      setLightboxCurrentIndex(index)
    } else {
      setLightboxImages([])
      setLightboxCurrentIndex(0)
    }
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  // Use design system (Architect aesthetic)
  const t = getTheme(isLightBackground)
  const textColor = t.text
  const mutedColor = t.textMuted
  const borderColor = t.border
  const bgColor = t.bg
  const dividerColor = t.divider

  // Light shadow for depth, minimal design
  const imageShadow = 'shadow-sm'
  const imageBorderRadius = ''
  const imageOutline = ''

  const images = section.images || []
  const imageGroups = images.length > 6 ? createImageGroups(images) : null

  const toggleGroup = (groupIndex: number) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupIndex)) {
      newExpanded.delete(groupIndex)
    } else {
      newExpanded.add(groupIndex)
    }
    setExpandedGroups(newExpanded)
  }

  const toggleSubsection = (subIndex: number) => {
    const newExpanded = new Set(expandedSubsections)
    if (newExpanded.has(subIndex)) {
      newExpanded.delete(subIndex)
    } else {
      newExpanded.add(subIndex)
    }
    setExpandedSubsections(newExpanded)
  }

  // Separate design detail images (for Section 05)
  const designDetailImages = images.filter(img =>
    img.caption?.toLowerCase().includes('ui structure') ||
    img.caption?.toLowerCase().includes('ui guide') ||
    img.caption?.toLowerCase().includes('grid') ||
    img.caption?.toLowerCase().includes('styling guide')
  )
  const workflowImages = images.filter(img => !designDetailImages.includes(img))

  // Determine if body should render at top or bottom
  const hasVisualContent = (section.subsections && Array.isArray(section.subsections) && section.subsections.length > 0) ||
    (section.workflowPrototype && Array.isArray(section.workflowPrototype) && section.workflowPrototype.length > 0) ||
    images.length > 0
  const renderBodyAtTop = !hasVisualContent

  // Split header and body content for sensitive sections
  // Header Section (always visible) - Senior energy: no letter badges

  const sectionHeader = (
    <div className="space-y-6 relative mb-10">
      {/* Section Title - Apple Style: Clean, Sans-Serif, Light */}
      <div className="relative">
        <ComponentHeading
          variant="section"
          tag={undefined}
          title={section.title}
          description={section.summary || (section.id === 'version-3' ? "The solution that balanced everything" : undefined)}
          color={frameworkMapping?.[section.id] ? "teal" : "slate"}
          className="mb-0"
        />
      </div>

      {/* Extract and Display Metrics - Minimal Tags */}

      {/* Extract and Display Metrics - Minimal Tags */}
      {section.body && (() => {
        const metrics = extractMetrics(section.body)
        return metrics.length > 0 ? (
          <motion.div
            className="flex flex-wrap items-center gap-3 pt-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
            }}
          >
            {metrics.slice(0, 5).map((metric, index) => (
              <motion.span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-white/[0.04] text-[var(--text-body)] text-xs font-medium rounded-full border border-white/[0.06]"
                variants={{
                  hidden: { opacity: 0, scale: 0.85, filter: 'blur(4px)' },
                  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                }}
              >
                {metric}
              </motion.span>
            ))}
          </motion.div>
        ) : null
      })()}
    </div>
  );

  // Body Content (can be locked)
  const sectionBody = (
    <div className="space-y-8">
      {/* "What this reveals" - REMOVED: Redundant self-praise. Evidence speaks for itself. */}

      {/* Body Text - Render at top only if no visual content */}
      {renderBodyAtTop && section.body && (
        <div className="relative border-l border-white/[0.10] pl-6 md:pl-8 py-2">
          <div className={`${mutedColor} leading-[1.8] text-[15px] md:text-[17px] space-y-4`}>
            {caseStudySlug === 'reportcaster' ? (
              parseBodyWithAhaMoments(section.body).map((part, index) => {
                if (part.type === 'aha') {
                  return (
                    <AhaMoment key={`aha-${index}`} isLightBackground={isLightBackground}>
                      <strong>{part.title}:</strong> {part.content}
                    </AhaMoment>
                  )
                }
                // Break long paragraphs into shorter ones for better scanning
                const paragraphs = part.content.split(/\n\n+/).filter(p => p.trim())
                return (
                  <ScrollRevealText key={`text-${index}`} className="space-y-4" stagger staggerDelay={0.06}>
                    {paragraphs.map((para: string, pIndex: number) => (
                      <ScrollRevealItem key={`para-${pIndex}`} variant="paragraph">
                        {renderFormattedContent(para.trim(), t)}
                      </ScrollRevealItem>
                    ))}
                  </ScrollRevealText>
                )
              })
            ) : (
              // Break long paragraphs into shorter ones for better scanning
              // Extract pull quotes from impactful sentences
              (() => {
                const paragraphs = section.body.split(/\n\n+/).filter(p => p.trim())

                // Patterns for pull quotes: sentences with strong statements, questions, or key insights
                const pullQuotePatterns = [
                  /(?:^|\.\s+)([A-Z][^.!?]*(?:don't|can't|won't|should|must|need|critical|fundamental|breakthrough|realization|discovered|realized|learned|understood|key|essential|important|significant|major|turning point|game changer)[^.!?]*[.!?])/gi,
                  /(?:^|\.\s+)([A-Z][^.!?]*\?[^.!?]*[.!?])/g, // Questions
                  /(?:^|\.\s+)([A-Z][^.!?]*(?:This|That|It|The|What|Why|How)[^.!?]*(?:reveals|shows|means|demonstrates|proves|indicates)[^.!?]*[.!?])/gi,
                ]

                return (
                  <ScrollRevealText className="space-y-4" stagger staggerDelay={0.06}>
                    {paragraphs.map((para: string, pIndex: number) => {
                      const trimmedPara = para.trim()
                      const isFirstParagraph = pIndex === 0

                      // Check for pull quote
                      let hasPullQuote = false
                      let pullQuoteText = ''
                      for (const pattern of pullQuotePatterns) {
                        const matches = trimmedPara.match(pattern)
                        if (matches && matches.length > 0) {
                          const candidate = matches
                            .map(m => m.trim().replace(/^(?:^|\.\s+)/, ''))
                            .filter(m => m.length > 40 && m.length < 200)
                            .sort((a, b) => b.length - a.length)[0]
                          if (candidate) {
                            hasPullQuote = true
                            pullQuoteText = candidate
                            break
                          }
                        }
                      }

                      if (hasPullQuote && trimmedPara.length > 300) {
                        const remainingText = trimmedPara.replace(pullQuoteText, '').trim()
                        return (
                          <ScrollRevealItem key={`para-${pIndex}`} variant="paragraph">
                            <div className="space-y-space-4">
                              <div className={`${isFirstParagraph ? `text-lg ${t.text} leading-relaxed font-medium` : ''}`}>
                                {renderFormattedContent(remainingText, t, isFirstParagraph)}
                              </div>
                              <PullQuote quote={pullQuoteText} isLightBackground={isLightBackground} />
                            </div>
                          </ScrollRevealItem>
                        )
                      }

                      return (
                        <ScrollRevealItem
                          key={`para-${pIndex}`}
                          variant={isFirstParagraph ? 'heading' : 'paragraph'}
                        >
                          <div className={`${isFirstParagraph ? `text-lg ${t.text} leading-relaxed font-medium` : ''}`}>
                            {renderFormattedContent(trimmedPara, t, isFirstParagraph)}
                          </div>
                        </ScrollRevealItem>
                      )
                    })}
                  </ScrollRevealText>
                )
              })()
            )}
          </div>
        </div>
      )}

      {/* Challenge Breakdown now integrated into DiscoveryVisual component - shown in CaseStudyLayout */}

      {/* Team Onboarding Process integrated into Section 05 (G - Grow) - ReportCaster only */}
      {
        section.id === 'section-05' && caseStudySlug === 'reportcaster' && (
          <div className="pt-6">
            <TeamOnboardingProcess isLightBackground={isLightBackground} />
          </div>
        )
      }

      {/* Subsections */}
      {
        section.subsections && Array.isArray(section.subsections) && section.subsections.length > 0 && (
          <div className="space-y-4">
            {section.subsections.map((subsection, subIndex) => {
              const isExpanded = expandedSubsections.has(subIndex)
              const isFirstSubsection = subIndex === 0

              // Special handling for certain subsections - always open
              const isAlwaysOpen = subsection.title === 'Early Ideation: Hand-Drawn Wireframes' ||
                subsection.title === 'Schedule Dialog'

              // Special styling for text-only subsections (like Prototyping and Testing)
              const isTextOnlySubsection = !subsection.images || subsection.images.length === 0

              // Subsections that use 2x2 grid layout
              const use2x2Grid = subsection.title === 'Distribution List' ||
                subsection.title === 'Access List'

              return (
                <div key={`subsection-${section.id}-${subIndex}`} className="space-y-4">
                  {isAlwaysOpen ? (
                    // Always open, no collapse button
                    <>
                      <div className="space-y-space-2">
                        <ScrollRevealText variant="heading">
                          <h3 className={`${textColor} text-lg md:text-xl font-sans`}>{subsection.title}</h3>
                        </ScrollRevealText>
                        {subsection.description && (
                          <ScrollRevealText variant="paragraph" delay={0.1}>
                            <p className={`${mutedColor} text-sm leading-relaxed`}>
                              {subsection.description}
                            </p>
                          </ScrollRevealText>
                        )}
                      </div>

                      {/* Subsection Images */}
                      {subsection.images && Array.isArray(subsection.images) && subsection.images.length > 0 && (
                        <div className="space-y-space-4">
                          {/* For Workflow Planning: 2x2 grid for regular images */}
                          {subsection.title === 'Workflow Planning & Architecture' && (
                            <>
                              {/* Regular images in 2x2 grid */}
                              {subsection.images.filter(img => !img.fullWidth).length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
                                  {subsection.images
                                    .filter(img => !img.fullWidth)
                                    .map((image, imgIndex) => {
                                      const imageContent = (
                                        <div key={`sub-img-${subIndex}-${imgIndex}`} className="space-y-space-2 p-space-2">
                                          <div
                                            className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} cursor-pointer transition-opacity duration-300 hover:opacity-90`}
                                            onClick={() => openLightbox(image.src, image.alt, image.caption, subsection.images?.filter(img => !img.fullWidth), imgIndex)}
                                          >
                                            <ParallaxImage
                                              src={image.src}
                                              alt={image.alt}
                                              width={1200}
                                              height={800}
                                              className="w-full h-auto object-contain"
                                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                              loading="lazy"
                                            />
                                          </div>
                                          {image.caption && (
                                            <p className={`${mutedColor} text-sm leading-relaxed mt-space-3`}>
                                              {image.caption}
                                            </p>
                                          )}
                                        </div>
                                      )

                                      if (image.sensitive && !actuallyUnlocked) {
                                        return (
                                          <LockedContent
                                            key={`sub-img-${subIndex}-${imgIndex}`}
                                            isUnlocked={actuallyUnlocked}
                                            password={password}
                                            caseStudySlug={caseStudySlug}
                                            isLightBackground={isLightBackground}
                                            unlockMessage={`Password required to view ${subsection.title || section.title}`}
                                          >
                                            {imageContent}
                                          </LockedContent>
                                        )
                                      }

                                      if (image.sensitive && actuallyUnlocked) {
                                        return imageContent
                                      }

                                      return imageContent
                                    })}
                                </div>
                              )}
                              {/* Full width images below the grid */}
                              {subsection.images.filter(img => img.fullWidth).map((image, imgIndex) => {
                                const imageContent = (
                                  <div key={`sub-img-full-${subIndex}-${imgIndex}`} className="space-y-space-2 p-space-2">
                                    <div
                                      className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} cursor-pointer transition-opacity duration-300 hover:opacity-90`}
                                      onClick={() => openLightbox(image.src, image.alt, image.caption)}
                                    >
                                      <ParallaxImage
                                        src={image.src}
                                        alt={image.alt}
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                                        loading="lazy"
                                      />
                                    </div>
                                    {image.caption && (
                                      <p className={`${mutedColor} text-sm text-center mt-space-3 px-space-6`}>
                                        {image.caption}
                                      </p>
                                    )}
                                  </div>
                                )

                                if (image.sensitive && !actuallyUnlocked) {
                                  return (
                                    <LockedContent
                                      key={`sub-img-full-${subIndex}-${imgIndex}`}
                                      isUnlocked={actuallyUnlocked}
                                      password={password}
                                      caseStudySlug={caseStudySlug}
                                      isLightBackground={isLightBackground}
                                      unlockMessage={`Password required to view ${subsection.title || section.title}`}
                                    >
                                      {imageContent}
                                    </LockedContent>
                                  )
                                }

                                if (image.sensitive && actuallyUnlocked) {
                                  return imageContent
                                }

                                return imageContent
                              })}
                            </>
                          )}
                          {/* For Schedule Dialog: Compact gallery with expand option */}
                          {subsection.title === 'Schedule Dialog' && subsection.images && Array.isArray(subsection.images) && subsection.images.length > 0 && (
                            <div className="space-y-3">
                              {/* Header with expand button */}
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className={`${mutedColor} text-sm`}>
                                    {showAllScheduleDialogImages ? `All ${subsection.images.length} schedule dialog screens` : `Preview: ${Math.min(6, subsection.images.length)} of ${subsection.images.length} screens`}
                                  </p>
                                </div>
                                {subsection.images.length > 6 && (
                                  <button
                                    onClick={() => setShowAllScheduleDialogImages(!showAllScheduleDialogImages)}
                                    className={`px-4 py-2 ${bgColor} ${textColor} text-sm font-medium hover:opacity-90 transition-opacity duration-300 flex items-center gap-2 rounded-full`}
                                  >
                                    <span>{showAllScheduleDialogImages ? 'Show Less' : `Show All ${subsection.images.length}`}</span>
                                    <svg
                                      className={`w-4 h-4 transition-transform duration-300 ${showAllScheduleDialogImages ? 'rotate-180' : ''}`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                )}
                              </div>

                              {/* First image - full width highlight (if it has fullWidth flag) */}
                              {subsection.images[0] && subsection.images[0].fullWidth && (
                                <div className="space-y-2">
                                  <div
                                    className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                                    onClick={() => openLightbox(subsection.images![0].src, subsection.images![0].alt, subsection.images![0].caption)}
                                  >
                                    <ParallaxImage
                                      src={subsection.images[0].src}
                                      alt={subsection.images[0].alt}
                                      width={1200}
                                      height={800}
                                      className="w-full h-auto object-contain"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                                      loading="lazy"
                                    />
                                  </div>
                                  {subsection.images[0].caption && (
                                    <p className={`${mutedColor} text-sm text-center mt-3 px-6`}>
                                      {subsection.images[0].caption}
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Remaining images in compact 3-column grid */}
                              {subsection.images && subsection.images.length > (subsection.images[0]?.fullWidth ? 1 : 0) && (
                                <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 transition-all duration-500`}>
                                  {(showAllScheduleDialogImages
                                    ? subsection.images.slice(subsection.images[0]?.fullWidth ? 1 : 0)
                                    : subsection.images.slice(subsection.images[0]?.fullWidth ? 1 : 0).slice(0, 6)
                                  ).map((image, imgIndex) => {
                                    const startIndex = subsection.images?.[0]?.fullWidth ? 1 : 0
                                    return (
                                      <div key={`sub-img-${subIndex}-${imgIndex + startIndex}`} className="group space-y-2">
                                        <div
                                          className={`relative w-full aspect-[4/3] ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} cursor-pointer transition-opacity duration-300 hover:opacity-90 ${t.monitor.bgSurface}`}
                                          onClick={() => openLightbox(image.src, image.alt, image.caption, subsection.images?.filter(img => !img.fullWidth), imgIndex)}
                                        >
                                          <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 300px"
                                            loading="lazy"
                                          />
                                          {/* Overlay on hover */}
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                            <svg
                                              className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                          </div>
                                        </div>
                                        {image.caption && (
                                          <p className={`${mutedColor} text-xs leading-relaxed line-clamp-2`}>
                                            {image.caption.split(':')[0]}
                                          </p>
                                        )}
                                      </div>
                                    )
                                  })}
                                </div>
                              )}

                              {/* Expand hint */}
                              {!showAllScheduleDialogImages && subsection.images.length > 7 && (
                                <div className="text-center pt-2">
                                  <p className={`${mutedColor} text-sm`}>
                                    Click &quot;Show All {subsection.images.length}&quot; to view all schedule dialog screens
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                          {/* For Distribution List and Access List: 2x2 grid */}
                          {use2x2Grid && subsection.images && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {subsection.images.map((image, imgIndex) => {
                                const imageContent = (
                                  <div key={`sub-img-${subIndex}-${imgIndex}`} className="space-y-2 p-2">
                                    <div
                                      className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} cursor-pointer transition-opacity duration-300 hover:opacity-90`}
                                      onClick={() => openLightbox(image.src, image.alt, image.caption)}
                                    >
                                      <ParallaxImage
                                        src={image.src}
                                        alt={image.alt}
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                        loading="lazy"
                                      />
                                    </div>
                                    {image.caption && (
                                      <p className={`${mutedColor} text-sm leading-relaxed mt-3`}>
                                        {image.caption}
                                      </p>
                                    )}
                                  </div>
                                )

                                if (image.sensitive && !actuallyUnlocked) {
                                  return (
                                    <LockedContent
                                      key={`sub-img-${subIndex}-${imgIndex}`}
                                      isUnlocked={actuallyUnlocked}
                                      password={password}
                                      caseStudySlug={caseStudySlug}
                                      isLightBackground={isLightBackground}
                                      unlockMessage={`Password required to view ${subsection.title || section.title}`}
                                    >
                                      {imageContent}
                                    </LockedContent>
                                  )
                                }

                                if (image.sensitive && actuallyUnlocked) {
                                  return imageContent
                                }

                                return imageContent
                              })}
                            </div>
                          )}
                          {/* For other always-open subsections: default grid */}
                          {subsection.title !== 'Workflow Planning & Architecture' && subsection.title !== 'Schedule Dialog' && !use2x2Grid && subsection.images && subsection.images.length > 0 && (
                            <div className={`grid grid-cols-1 ${subsection.images.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-1'} gap-6`}>
                              {subsection.images.map((image, imgIndex) =>
                                image.fullWidth ? (
                                  <div key={`sub-img-full-${subIndex}-${imgIndex}`} className="col-span-full space-y-2 p-2">
                                    <div
                                      className={`relative w-full max-w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                                      onClick={() => openLightbox(image.src, image.alt, image.caption)}
                                    >
                                      <ParallaxImage
                                        src={image.src}
                                        alt={image.alt}
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto max-w-full object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                                      />
                                    </div>
                                    {image.caption && (
                                      <p className={`${mutedColor} text-sm text-center mt-3 px-6`}>
                                        {image.caption}
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <div key={`sub-img-${subIndex}-${imgIndex}`} className="space-y-2 p-2">
                                    <div
                                      className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} cursor-pointer transition-opacity duration-300 hover:opacity-90`}
                                      onClick={() => openLightbox(image.src, image.alt, image.caption)}
                                    >
                                      <ParallaxImage
                                        src={image.src}
                                        alt={image.alt}
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      />
                                    </div>
                                    {image.caption && (
                                      <p className={`${mutedColor} text-sm leading-relaxed mt-3`}>
                                        {image.caption}
                                      </p>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    // Regular collapsible subsection
                    <>
                      {/* Collapsible Subsection Header - Minimal Row */}
                      <button
                        onClick={() => toggleSubsection(subIndex)}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} subsection: ${subsection.title}`}
                        aria-expanded={isExpanded}
                        className={`w-full text-left group border-b border-white/[0.06] py-6 transition-all duration-300 hover:bg-white/[0.02] -mx-6 px-6 md:-mx-8 md:px-8`}
                      >
                        <div className="flex items-center justify-between gap-6">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className={`${textColor} text-lg md:text-xl font-medium tracking-tight group-hover:text-[var(--accent-teal)] transition-colors`}>
                                {subsection.title}
                              </h3>
                              {subsection.images && subsection.images.length > 0 && (
                                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold transition-colors ${isExpanded
                                  ? 'bg-[var(--accent-teal)] text-white'
                                  : 'bg-white/[0.06] text-[var(--text-muted)] group-hover:bg-[var(--accent-teal-soft)] group-hover:text-[var(--accent-teal)]'
                                  }`}>
                                  {subsection.images.length}
                                </span>
                              )}
                            </div>
                            {subsection.description && (
                              <p className={`${mutedColor} text-sm leading-relaxed line-clamp-2 pr-8`}>
                                {subsection.description}
                              </p>
                            )}
                          </div>

                          {/* Chevron Icon */}
                          <div className={`flex flex-col items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isExpanded
                            ? 'border-[var(--accent-teal)] bg-[var(--accent-teal)] text-white rotate-180'
                            : 'border-white/[0.1] text-[var(--text-muted)] group-hover:border-[var(--accent-teal)] group-hover:text-[var(--accent-teal)]'
                            }`}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </div>
                        </div>
                      </button>

                      {/* Subsection Content (collapsible) — Animated */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            className="space-y-8 pl-2 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {subsection.quote && (
                              <div className={`${bgColor} p-6 md:p-8`}>
                                <p className={`${textColor} italic text-lg md:text-xl leading-relaxed`}>
                                  &quot;{subsection.quote.text}&quot;
                                </p>
                                {subsection.quote.attribution && (
                                  <p className={`${mutedColor} text-sm mt-4`}>— {subsection.quote.attribution}</p>
                                )}
                              </div>
                            )}

                            {/* Entry Point content handled by DesignIterationLog */}

                            {/* Four Step Flow Breakdown for ML Functions Section 06 - The main step workflow UI */}
                            {section.id === 'section-06' && subsection.title === 'The main step workflow UI' && caseStudySlug === 'ml-functions' && (
                              <div className="pt-4 pb-4">
                                {actuallyUnlocked ? (
                                  <FourStepFlowBreakdown isLightBackground={isLightBackground} />
                                ) : (
                                  <LockedContent
                                    isUnlocked={actuallyUnlocked}
                                    password={password}
                                    caseStudySlug={caseStudySlug}
                                    isLightBackground={isLightBackground}
                                    unlockMessage={`Password required to view ${section.title}`}
                                  >
                                    <div className="min-h-[200px]" />
                                  </LockedContent>
                                )}
                              </div>
                            )}

                            {/* Subsection Workflow Prototype */}
                            {subsection.workflowPrototype && (
                              <WorkflowPrototype
                                title={subsection.workflowPrototype.title}
                                description={subsection.workflowPrototype.description}
                                steps={subsection.workflowPrototype.steps}
                                workflowType={subsection.workflowPrototype.workflowType}
                                isLightBackground={isLightBackground}
                              />
                            )}

                            {/* Subsection Images */}
                            {subsection.images && subsection.images.length > 0 && (
                              <div className={`grid grid-cols-1 ${
                                // Special case: 4-step workflow UI should be 2x2 grid
                                section.id === 'section-06' && subsection.title === 'The main step workflow UI' && caseStudySlug === 'ml-functions' && subsection.images.length === 4
                                  ? 'md:grid-cols-2'
                                  // Special case: Evolution of IQ Plugin should be 2x2 grid
                                  : subsection.title === 'The Evolution of the IQ Plugin' && subsection.images.length === 4
                                    ? 'md:grid-cols-2'
                                    // Special case: Section 05 subsections (IQ Plugin workflows) should be 2-column grid, or 2x2 for 4 images
                                    : section.id === 'section-05' && caseStudySlug === 'iq-plugin'
                                      ? subsection.images.length === 4
                                        ? 'md:grid-cols-2'
                                        : 'md:grid-cols-2'
                                      : subsection.images.length === 1
                                        ? 'md:grid-cols-1'
                                        : subsection.images.length === 2
                                          ? 'md:grid-cols-2'
                                          : 'md:grid-cols-2 lg:grid-cols-3'
                                } gap-6`}>
                                {subsection.images.map((image, imgIndex) => {
                                  const imageContent = image.fullWidth ? (
                                    <div key={`sub-img-full-${subIndex}-${imgIndex}`} className="col-span-full space-y-2 p-2">
                                      <div
                                        className={`relative w-full max-w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                                        onClick={() => openLightbox(image.src, image.alt, image.caption)}
                                      >
                                        <ParallaxImage
                                          src={image.src}
                                          alt={image.alt}
                                          width={1200}
                                          height={800}
                                          className="w-full h-auto max-w-full object-contain"
                                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                                        />
                                      </div>
                                      {image.caption && (
                                        <p className={`${mutedColor} text-sm text-center mt-3 px-6`}>
                                          {image.caption}
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <div key={`sub-img-${subIndex}-${imgIndex}`} className="space-y-2 p-2">
                                      <div
                                        className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} cursor-pointer transition-opacity duration-300 hover:opacity-90`}
                                        onClick={() => openLightbox(image.src, image.alt, image.caption)}
                                      >
                                        <ParallaxImage
                                          src={image.src}
                                          alt={image.alt}
                                          width={1200}
                                          height={800}
                                          className="w-full h-auto object-contain"
                                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                      </div>
                                      {image.caption && (
                                        <p className={`${mutedColor} text-sm leading-relaxed mt-3`}>
                                          {image.caption}
                                        </p>
                                      )}
                                    </div>
                                  )

                                  if (image.sensitive && !actuallyUnlocked) {
                                    return (
                                      <LockedContent
                                        key={`sub-img-${subIndex}-${imgIndex}`}
                                        isUnlocked={actuallyUnlocked}
                                        password={password}
                                        caseStudySlug={caseStudySlug}
                                        isLightBackground={isLightBackground}
                                        unlockMessage={`Password required to view ${subsection.title || section.title}`}
                                      >
                                        {imageContent}
                                      </LockedContent>
                                    )
                                  }

                                  return imageContent
                                })}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )
      }

      {/* Workflow Prototype(s) */}
      {
        section.workflowPrototype && Array.isArray(section.workflowPrototype) && section.workflowPrototype.length > 0 && (
          <div className="space-y-4">
            {section.workflowPrototype.map((prototype, idx) => {
              if (!prototype || !prototype.steps || !Array.isArray(prototype.steps) || prototype.steps.length === 0) {
                return null
              }

              const validSteps = prototype.steps.filter(step => step.src && step.alt && step.caption)

              if (validSteps.length === 0) {
                return null
              }

              return (
                <div key={`workflow-wrapper-${section.id}-${idx}`}>
                  <WorkflowPrototype
                    title={prototype.title || 'Workflow'}
                    description={prototype.description}
                    steps={validSteps}
                    workflowType={prototype.workflowType}
                    isLightBackground={isLightBackground}
                  />
                </div>
              )
            })}
          </div>
        )
      }

      {/* Before/After Comparison */}
      {
        section.beforeAfter && (
          <div className="space-y-4">
            <BeforeAfterComparison
              beforeImage={section.beforeAfter.before}
              afterImage={section.beforeAfter.after}
              beforeLabel={section.beforeAfter.beforeLabel}
              afterLabel={section.beforeAfter.afterLabel}
              comparisonNotes={section.beforeAfter.comparisonNotes}
              isLightBackground={isLightBackground}
              isUnlocked={actuallyUnlocked}
              password={password}
              caseStudySlug={caseStudySlug}
              sectionTitle={section.title}
            />
          </div>
        )
      }

      {/* Images */}
      {
        images.length > 0 && (
          <div className="space-y-4">
            {/* Special handling for Section 1: Collapsible gallery for 8 legacy images - ReportCaster only */}
            {section.id === 'section-01' && images.length === 8 && caseStudySlug === 'reportcaster' ? (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`${textColor} text-lg font-sans mb-1`}>Legacy Interface Examples</h3>
                    <p className={`${mutedColor} text-sm`}>
                      {showAllLegacyImages ? 'All 8 legacy interfaces' : 'Preview of fragmented legacy system'}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAllLegacyImages(!showAllLegacyImages)}
                    className={`px-4 py-2 border ${borderColor} ${bgColor} ${textColor} text-sm font-medium hover:opacity-90 transition-all duration-300 flex items-center gap-2`}
                  >
                    <span>{showAllLegacyImages ? 'Show Less' : `Show All ${images.length}`}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${showAllLegacyImages ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Image Grid */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-500 ${showAllLegacyImages ? 'opacity-100' : 'opacity-100'
                  }`}>
                  {(showAllLegacyImages ? images : images.slice(0, 4)).map((image, index) => {
                    const imageContent = (
                      <div
                        key={`legacy-img-${index}`}
                        className="group space-y-2"
                      >
                        <div
                          className={`relative w-full aspect-[4/3] ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.03] hover:shadow-xl bg-black/5`}
                          onClick={() => openLightbox(image.src, image.alt, image.caption)}
                        >
                          <ParallaxImage
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            containerClassName="w-full h-full"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
                            loading="lazy"
                            enableParallax={false}
                          />
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                        {image.caption && (
                          <p className={`${mutedColor} text-xs leading-relaxed line-clamp-2`}>
                            {image.caption.split(':')[0]}
                          </p>
                        )}
                      </div>
                    )

                    if (image.sensitive && !actuallyUnlocked) {
                      return (
                        <LockedContent
                          key={`legacy-img-${index}`}
                          isUnlocked={actuallyUnlocked}
                          password={password}
                          caseStudySlug={caseStudySlug}
                          isLightBackground={isLightBackground}
                          unlockMessage={`Password required to view ${section.title}`}
                        >
                          {imageContent}
                        </LockedContent>
                      )
                    }

                    if (image.sensitive && actuallyUnlocked) {
                      return imageContent
                    }

                    return imageContent
                  })}
                </div>

                {/* Expand hint */}
                {!showAllLegacyImages && (
                  <div className="text-center pt-4">
                    <p className={`${mutedColor} text-sm`}>
                      Click &quot;Show All 8&quot; to view all legacy interface examples
                    </p>
                  </div>
                )}
              </div>
            ) : images.length === 1 ? (
              (() => {
                const image = section.images![0]
                const imageContent = image.fullWidth ? (
                  <div className="w-screen relative left-[calc(50%-50vw)]">
                    <div
                      className="relative w-full cursor-pointer transition-opacity duration-300 hover:opacity-90"
                      onClick={() => openLightbox(image.src, image.alt, image.caption)}
                    >
                      <ParallaxImage
                        src={image.src}
                        alt={image.alt}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain"
                        sizes="100vw"
                      />
                    </div>
                    {image.caption && (
                      <p className={`${mutedColor} text-sm text-center mt-4 px-6`}>
                        {image.caption}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 p-2">
                    <div
                      className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                      onClick={() => openLightbox(image.src, image.alt, image.caption)}
                    >
                      <ParallaxImage
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      />
                    </div>
                    {image.caption && (
                      <p className={`${mutedColor} text-sm`}>
                        {image.caption}
                      </p>
                    )}
                  </div>
                )

                if (image.sensitive && !actuallyUnlocked) {
                  return (
                    <LockedContent
                      isUnlocked={actuallyUnlocked}
                      password={password}
                      caseStudySlug={caseStudySlug}
                      isLightBackground={isLightBackground}
                      unlockMessage={`Password required to view ${section.title}`}
                    >
                      {imageContent}
                    </LockedContent>
                  )
                }

                if (image.sensitive && actuallyUnlocked) {
                  return imageContent
                }

                return imageContent
              })()
            ) : images.some(img => img.fullWidth) && images.length > 1 ? (
              // Layout for sections with multiple images where some are fullWidth
              <div className="space-y-4">
                {/* Full-width images first */}
                {images.filter(img => img.fullWidth).map((image, index) => {
                  const imageContent = (
                    <div key={`img-full-${index}`} className="space-y-2">
                      <div
                        className={`relative w-full max-w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                        onClick={() => openLightbox(image.src, image.alt, image.caption)}
                      >
                        <ParallaxImage
                          src={image.src}
                          alt={image.alt}
                          width={1200}
                          height={800}
                          className="w-full h-auto max-w-full object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                          loading="lazy"
                        />
                      </div>
                      {image.caption && (
                        <p className={`${mutedColor} text-sm text-center mt-3 px-6`}>
                          {image.caption}
                        </p>
                      )}
                    </div>
                  )

                  if (image.sensitive && !actuallyUnlocked) {
                    return (
                      <LockedContent
                        key={`img-full-${index}`}
                        isUnlocked={actuallyUnlocked}
                        password={password}
                        caseStudySlug={caseStudySlug}
                        isLightBackground={isLightBackground}
                        unlockMessage={`Password required to view ${section.title}`}
                      >
                        {imageContent}
                      </LockedContent>
                    )
                  }

                  if (image.sensitive && actuallyUnlocked) {
                    return imageContent
                  }

                  return imageContent
                })}
                {/* 2x2 grid for remaining images */}
                {images.filter(img => !img.fullWidth).length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {images
                      .filter(img => !img.fullWidth)
                      .map((image, index) => {
                        const imageContent = (
                          <div key={`img-grid-${index}`} className="space-y-2">
                            <div
                              className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                              onClick={() => openLightbox(image.src, image.alt, image.caption)}
                            >
                              <ParallaxImage
                                src={image.src}
                                alt={image.alt}
                                width={1200}
                                height={800}
                                className="w-full h-auto object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                              />
                            </div>
                            {image.caption && (
                              <p className={`${mutedColor} text-sm leading-relaxed mt-3`}>
                                {image.caption}
                              </p>
                            )}
                          </div>
                        )

                        if (image.sensitive && !actuallyUnlocked) {
                          return (
                            <LockedContent
                              key={`img-grid-${index}`}
                              isUnlocked={actuallyUnlocked}
                              password={password}
                              caseStudySlug={caseStudySlug}
                              isLightBackground={isLightBackground}
                              unlockMessage={`Password required to view ${section.title}`}
                            >
                              {imageContent}
                            </LockedContent>
                          )
                        }

                        if (image.sensitive && actuallyUnlocked) {
                          return imageContent
                        }

                        return imageContent
                      })}
                  </div>
                )}
              </div>
            ) : imageGroups && imageGroups.length > 1 ? (
              <div className="space-y-4">
                {imageGroups.map((group, groupIndex) => {
                  const isExpanded = expandedGroups.has(groupIndex)
                  const isFirstGroup = groupIndex === 0

                  return (
                    <div key={`group-${groupIndex}`} className="space-y-4">
                      {!isFirstGroup && (
                        <button
                          onClick={() => toggleGroup(groupIndex)}
                          className={`w-full flex items-center justify-between p-4 ${bgColor} hover:opacity-90 transition-opacity`}
                        >
                          <span className={`${textColor} text-sm font-medium`}>
                            {group[0].caption?.split(':')[0] || `View ${group.length} images`}
                          </span>
                          <span className={`${mutedColor} text-sm`}>
                            {isExpanded ? '−' : '+'} {group.length} {group.length === 1 ? 'image' : 'images'}
                          </span>
                        </button>
                      )}

                      {isExpanded && (
                        <div className={`grid grid-cols-1 ${group.length >= 3 ? 'md:grid-cols-2' : 'md:grid-cols-2'} ${group.length >= 6 ? 'lg:grid-cols-3' : ''} gap-4`}>
                          {group.map((image, imgIndex) => {
                            const imageContent = image.fullWidth ? (
                              <div
                                key={`group-img-${groupIndex}-${imgIndex}`}
                                className="col-span-full w-full max-w-full overflow-hidden"
                              >
                                <div
                                  className="relative w-full max-w-full cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg"
                                  onClick={() => openLightbox(image.src, image.alt, image.caption)}
                                >
                                  <ParallaxImage
                                    src={image.src}
                                    alt={image.alt}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                </div>
                                {image.caption && (
                                  <p className={`${mutedColor} text-sm text-center mt-3 px-6`}>
                                    {image.caption}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div key={`group-img-${groupIndex}-${imgIndex}`} className="space-y-2 p-2">
                                <div
                                  className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                                  onClick={() => openLightbox(image.src, image.alt, image.caption)}
                                >
                                  <ParallaxImage
                                    src={image.src}
                                    alt={image.alt}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                </div>
                                {image.caption && (
                                  <p className={`${mutedColor} text-sm leading-relaxed mt-3`}>
                                    {image.caption}
                                  </p>
                                )}
                              </div>
                            )

                            if (image.sensitive && !actuallyUnlocked) {
                              return (
                                <LockedContent
                                  key={`group-img-${groupIndex}-${imgIndex}`}
                                  isUnlocked={actuallyUnlocked}
                                  password={password}
                                  caseStudySlug={caseStudySlug}
                                  isLightBackground={isLightBackground}
                                  unlockMessage={`Password required to view ${section.title}`}
                                >
                                  {imageContent}
                                </LockedContent>
                              )
                            }

                            if (image.sensitive && actuallyUnlocked) {
                              return imageContent
                            }

                            return imageContent
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : workflowImages.length > 0 && designDetailImages.length > 0 ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`${mutedColor} text-xs font-mono uppercase tracking-wider`}>Workflow</span>
                    <div className={`h-px flex-1 ${dividerColor}`}></div>
                  </div>
                  <div className={`grid grid-cols-1 ${workflowImages.length >= 3 ? 'md:grid-cols-2' : 'md:grid-cols-2'} ${workflowImages.length >= 6 ? 'lg:grid-cols-3' : ''} gap-4`}>
                    {workflowImages.map((image, index) => (
                      image.fullWidth ? (
                        <div
                          key={`workflow-img-${index}`}
                          className="col-span-full w-full max-w-full overflow-hidden"
                        >
                          <div
                            className="relative w-full max-w-full cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg"
                            onClick={() => openLightbox(image.src, image.alt, image.caption)}
                          >
                            <ParallaxImage
                              src={image.src}
                              alt={image.alt}
                              width={1200}
                              height={800}
                              className="w-full h-auto max-w-full object-contain"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                            />
                          </div>
                          {image.caption && (
                            <p className={`${mutedColor} text-sm text-center mt-3 px-6`}>
                              {image.caption}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div key={`workflow-img-${index}`} className="space-y-2 p-2">
                          <div
                            className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                            onClick={() => openLightbox(image.src, image.alt, image.caption)}
                          >
                            <ParallaxImage
                              src={image.src}
                              alt={image.alt}
                              width={1200}
                              height={800}
                              className="w-full h-auto object-contain"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          {image.caption && (
                            <p className={`${mutedColor} text-sm leading-relaxed mt-3`}>
                              {image.caption}
                            </p>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setExpandedDetailImages(!expandedDetailImages)}
                    className={`w-full flex items-center justify-between p-4 ${bgColor} ${imageBorderRadius} border ${borderColor} hover:opacity-90 transition-all`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`${mutedColor} text-xs font-mono uppercase tracking-wider`}>Design Details</span>
                      <span className={`${textColor} text-sm font-medium`}>
                        UI Structure, Component Guides, Grid System
                      </span>
                    </div>
                    <span className={`${mutedColor} text-sm`}>
                      {expandedDetailImages ? '−' : '+'} {designDetailImages.length} {designDetailImages.length === 1 ? 'image' : 'images'}
                    </span>
                  </button>

                  {expandedDetailImages && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {designDetailImages.map((image, index) => (
                        <div key={`detail-img-${index}`} className="space-y-2 p-2">
                          <div
                            className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                            onClick={() => openLightbox(image.src, image.alt, image.caption)}
                          >
                            <ParallaxImage
                              src={image.src}
                              alt={image.alt}
                              width={1200}
                              height={800}
                              className="w-full h-auto object-contain"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          {image.caption && (
                            <p className={`${mutedColor} text-sm leading-relaxed mt-3`}>
                              {image.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : section.id === 'section-01' && caseStudySlug === 'reportcaster' && images.length === 3 ? (
              // Special layout for ReportCaster section-01: 3 images with admin below explorer
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First image - left column, full height */}
                {(() => {
                  const imageContent = (
                    <div className="space-y-2 p-2">
                      <div
                        className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                        onClick={() => openLightbox(images[0].src, images[0].alt, images[0].caption)}
                      >
                        <ParallaxImage
                          src={images[0].src}
                          alt={images[0].alt}
                          width={1200}
                          height={800}
                          className="w-full h-auto object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        />
                      </div>
                      {images[0].caption && (
                        <p className={`${mutedColor} text-sm leading-relaxed mt-3`}>
                          {images[0].caption}
                        </p>
                      )}
                    </div>
                  )
                  return images[0].sensitive && !actuallyUnlocked ? (
                    <LockedContent
                      isUnlocked={actuallyUnlocked}
                      password={password}
                      caseStudySlug={caseStudySlug}
                      isLightBackground={isLightBackground}
                      unlockMessage={`Password required to view ${section.title}`}
                    >
                      {imageContent}
                    </LockedContent>
                  ) : imageContent
                })()}
                {/* Right column: explorer on top, admin below */}
                <div className="space-y-4">
                  {/* Explorer - top */}
                  {(() => {
                    const imageContent = (
                      <div className="space-y-2 p-2">
                        <div
                          className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                          onClick={() => openLightbox(images[1].src, images[1].alt, images[1].caption)}
                        >
                          <ParallaxImage
                            src={images[1].src}
                            alt={images[1].alt}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                          />
                        </div>
                        {images[1].caption && (
                          <p className={`${mutedColor} text-sm leading-relaxed mt-3`}>
                            {images[1].caption}
                          </p>
                        )}
                      </div>
                    )
                    return images[1].sensitive && !actuallyUnlocked ? (
                      <LockedContent
                        isUnlocked={actuallyUnlocked}
                        password={password}
                        caseStudySlug={caseStudySlug}
                        isLightBackground={isLightBackground}
                        unlockMessage={`Password required to view ${section.title}`}
                      >
                        {imageContent}
                      </LockedContent>
                    ) : imageContent
                  })()}
                  {/* Admin - below explorer */}
                  {(() => {
                    const imageContent = (
                      <div className="space-y-2 p-2">
                        <div
                          className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                          onClick={() => openLightbox(images[2].src, images[2].alt, images[2].caption)}
                        >
                          <ParallaxImage
                            src={images[2].src}
                            alt={images[2].alt}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                          />
                        </div>
                        {images[2].caption && (
                          <p className={`${mutedColor} text-sm leading-relaxed mt-3`}>
                            {images[2].caption}
                          </p>
                        )}
                      </div>
                    )
                    return images[2].sensitive && !actuallyUnlocked ? (
                      <LockedContent
                        isUnlocked={actuallyUnlocked}
                        password={password}
                        caseStudySlug={caseStudySlug}
                        isLightBackground={isLightBackground}
                        unlockMessage={`Password required to view ${section.title}`}
                      >
                        {imageContent}
                      </LockedContent>
                    ) : imageContent
                  })()}
                </div>
              </div>
            ) : (
              <div className={`grid grid-cols-1 ${images.length >= 3 ? 'md:grid-cols-2' : 'md:grid-cols-2'} ${images.length >= 6 ? 'lg:grid-cols-3' : ''} gap-4`}>
                {images.map((image, index) =>
                  image.fullWidth ? (
                    <div
                      key={`img-${index}`}
                      className="col-span-full w-full max-w-full overflow-hidden"
                    >
                      <div
                        className="relative w-full max-w-full cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg"
                        onClick={() => openLightbox(image.src, image.alt, image.caption)}
                      >
                        <ParallaxImage
                          src={image.src}
                          alt={image.alt}
                          width={1200}
                          height={800}
                          className="w-full h-auto max-w-full object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        />
                      </div>
                      {image.caption && (
                        <p className={`${mutedColor} text-sm text-center mt-3 px-6`}>
                          {image.caption}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div key={`img-${index}`} className="space-y-2 p-2">
                      <div
                        className={`relative w-full ${imageBorderRadius} overflow-hidden border ${borderColor} ${imageShadow} ${imageOutline} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg`}
                        onClick={() => openLightbox(image.src, image.alt, image.caption)}
                      >
                        <ParallaxImage
                          src={image.src}
                          alt={image.alt}
                          width={1200}
                          height={800}
                          className="w-full h-auto object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      {image.caption && (
                        <p className={`${mutedColor} text-sm leading-relaxed mt-3`}>
                          {image.caption}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )
      }

      {/* Story - Full Width Below Visual (revealsPoints now shown at top) */}
      {
        !renderBodyAtTop && section.body && (
          <div className="space-y-4">
            <div className="relative border-l border-white/[0.10] pl-6 md:pl-8 py-2">
              <div className={`${mutedColor} leading-[1.8] text-[15px] md:text-[17px] space-y-4`}>
                {/* Only parse Aha moments for ReportCaster */}
                {caseStudySlug === 'reportcaster' ? (
                  parseBodyWithAhaMoments(section.body).map((part, index) => {
                    if (part.type === 'aha') {
                      return (
                        <AhaMoment key={`aha-${index}`} isLightBackground={isLightBackground}>
                          <strong>{part.title}:</strong> {part.content}
                        </AhaMoment>
                      )
                    }
                    // Break long paragraphs into shorter ones for better scanning
                    const paragraphs = part.content.split(/\n\n+/).filter(p => p.trim())
                    return (
                      <ScrollRevealText key={`text-${index}`} className="space-y-4" stagger staggerDelay={0.06}>
                        {paragraphs.map((para: string, pIndex: number) => (
                          <ScrollRevealItem key={`para-${pIndex}`} variant="paragraph">
                            {renderFormattedContent(para.trim(), t)}
                          </ScrollRevealItem>
                        ))}
                      </ScrollRevealText>
                    )
                  })
                ) : (
                  // Break long paragraphs into shorter ones for better scanning
                  (() => {
                    const paragraphs = section.body.split(/\n\n+/).filter(p => p.trim())
                    return (
                      <ScrollRevealText className="space-y-3" stagger staggerDelay={0.06}>
                        {paragraphs.map((para: string, pIndex: number) => (
                          <ScrollRevealItem key={`para-${pIndex}`} variant="paragraph">
                            {renderFormattedContent(para.trim(), t)}
                          </ScrollRevealItem>
                        ))}
                      </ScrollRevealText>
                    )
                  })()
                )}
              </div>
            </div>

            {section.bullets && Array.isArray(section.bullets) && section.bullets.length > 0 && (
              <div className="space-y-3">
                <ScrollRevealText variant="subtle">
                  <div className="flex items-center gap-3">
                    <h3 className={`${textColor} text-lg font-semibold`}>Key points</h3>
                    <div className={`h-px flex-1 ${dividerColor}`}></div>
                  </div>
                </ScrollRevealText>
                <ScrollRevealText className="grid grid-cols-1 gap-3" stagger staggerDelay={0.05}>
                  {section.bullets.map((bullet, index) => (
                    <ScrollRevealItem
                      key={`bullet-${index}`}
                      variant="subtle"
                    >
                      <div className={`flex gap-3 p-4 ${bgColor} hover:opacity-90 transition-opacity duration-300`}>
                        <span className={`text-[var(--accent-teal)] text-base font-mono flex-shrink-0 mt-0.5 font-semibold`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <p className={`${mutedColor} leading-relaxed text-base`}>{bullet}</p>
                      </div>
                    </ScrollRevealItem>
                  ))}
                </ScrollRevealText>
              </div>
            )}
          </div>
        )
      }


      {/* Image Lightbox */}
      {
        lightboxImage && (
          <ImageLightbox
            isOpen={!!lightboxImage}
            onClose={closeLightbox}
            imageSrc={lightboxImage.src}
            imageAlt={lightboxImage.alt}
            imageCaption={lightboxImage.caption}
            images={lightboxImages.length > 0 ? lightboxImages : undefined}
            currentIndex={lightboxCurrentIndex}
            onNavigate={(index) => {
              if (lightboxImages[index]) {
                const img = lightboxImages[index]
                setLightboxImage({ src: img.src, alt: img.alt, caption: img.caption })
                setLightboxCurrentIndex(index)
              }
            }}
          />
        )
      }
    </div >
  )

  // If section is sensitive and not unlocked, show header but lock body content
  if (isSectionSensitive && !actuallyUnlocked) {
    return (
      <div
        id={section.id}
        className="space-y-6 scroll-mt-24"
      >
        {/* Header - Always visible (unless parent Act already shows one) */}
        {!hideHeader && sectionHeader}

        {/* Body - Locked */}
        {actuallyUnlocked ? (
          sectionBody
        ) : (
          <LockedContent
            isUnlocked={actuallyUnlocked}
            password={password}
            caseStudySlug={caseStudySlug}
            isLightBackground={isLightBackground}
            unlockMessage={`Password required to view ${section.title}`}
          >
            <div className="min-h-[400px]" />
          </LockedContent>
        )}
      </div>
    )
  }

  // Normal rendering - show everything
  return (
    <div
      id={section.id}
      className="scroll-mt-24"
    >
      {!hideHeader && sectionHeader}
      {sectionBody}
    </div>
  )
}
