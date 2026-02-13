'use client'

import { motion, AnimatePresence, useScroll, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState, useMemo, memo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import GearBottomSheet from '@/components/home/GearBottomSheet'
import { GEAR_INSPECTOR, GearInspectorItem } from '@/data/gear-inspector'
import { getTheme, spacing } from '@/lib/design-system'
import Magnetic from '@/components/ui/Magnetic'
import { BRAIN_GEARS_SVG } from '@/data/brain-gears-svg'
import { ArrowRight, Sparkles, Brain } from 'lucide-react'

// --- QUIZ DATA & TYPES ---

const ENTRY_SESSION_KEY = 'portfolio_entry_completed'

type QuizQuestion = {
  id: string
  statement: string
  question: string
  activeGear: string
  options: {
    id: string
    label: string
    val: string
    emoji: string
    reveal: {
      title: string
      content: string
    }
  }[]
  gearCascade: {
    primary: string[]
    secondary: string[]
  }
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    statement: "Let's align our neural networks.",
    question: "Are you a recruiter or a founder?",
    activeGear: 'gear-scattered-workflows',
    options: [
      {
        id: 'recruiter', label: 'Recruiter', val: 'recruiter', emoji: '🕵️‍♀️',
        reveal: {
          title: "Efficiency Expert",
          content: "I speak business value. I reduce development cycles and time-to-hire by architecting systems that scale from Day 1."
        }
      },
      {
        id: 'founder', label: 'Founder/Builder', val: 'founder', emoji: '🏗️',
        reveal: {
          title: "0-to-1 Builder",
          content: "I don't just design Mocks; I ship. I built this entire digital brain using AI agents in under 2 weeks."
        }
      },
      {
        id: 'both', label: 'Just Browsing', val: 'both', emoji: '🚀',
        reveal: {
          title: "Design Engineer",
          content: "I bridge the gap between Code and Design. I'm a Product Designer who commits to GitHub."
        }
      }
    ],
    gearCascade: {
      primary: ['gear-legacy-systems', 'gear-fragmented-ui', 'gear-scattered-workflows'],
      secondary: ['bg-gear-16', 'bg-gear-17', 'bg-gear-18', 'bg-gear-19', 'bg-gear-20']
    }
  },
  {
    id: 'q2',
    statement: "Defining the impact.",
    question: "What matters most in Enterprise Design?",
    activeGear: 'gear-conflicting-teams',
    options: [
      {
        id: 'scale', label: 'Massive Scale', val: 'scale', emoji: '🌍',
        reveal: {
          title: "20 Million+ Users",
          content: "My scheduling systems at UKG power over 20 million shifts every single week without breaking."
        }
      },
      {
        id: 'consistency', label: 'Consistency', val: 'consistency', emoji: '📐',
        reveal: {
          title: "50+ Product Squads",
          content: "I build Design Systems that unify 50+ fragmented product squads into one cohesive experience."
        }
      },
      {
        id: 'legacy', label: 'Modernization', val: 'legacy', emoji: '🏛️',
        reveal: {
          title: "Code Archaeologist",
          content: "I specialize in transforming 10-year-old legacy codebases into modern revenue drivers."
        }
      }
    ],
    gearCascade: {
      primary: ['gear-conflicting-teams', 'gear-missing-briefs'],
      secondary: ['bg-gear-11', 'bg-gear-12', 'bg-gear-13', 'bg-gear-14', 'bg-gear-15']
    }
  },
  {
    id: 'q3',
    statement: "The methodology.",
    question: "How do I bridge Design & Engineering?",
    activeGear: 'gear-motherhood',
    options: [
      {
        id: 'code', label: 'I write Code', val: 'code', emoji: '💻',
        reveal: {
          title: "Production Ready",
          content: "I don't stop at Figma. I write the React components to ensure the final product matches the vision."
        }
      },
      {
        id: 'system', label: 'Systems Thinking', val: 'system', emoji: '🔄',
        reveal: {
          title: "Atomic Design",
          content: "I treat design as a dependency graph. Changing one token should predictably update the entire OS."
        }
      },
      {
        id: 'speed', label: 'Ship Faster', val: 'speed', emoji: '⚡',
        reveal: {
          title: "No Handoff Friction",
          content: "By speaking the developers' language, I eliminate the 'translation layer' that slows teams down."
        }
      }
    ],
    gearCascade: {
      primary: ['gear-motherhood', 'gear-shifting-priorities'],
      secondary: ['bg-gear-6', 'bg-gear-7', 'bg-gear-8', 'bg-gear-9', 'bg-gear-10']
    }
  },
  {
    id: 'q4',
    statement: "The secret weapon.",
    question: "How was this digital brain built?",
    activeGear: 'gear-life',
    options: [
      {
        id: 'ai', label: 'AI Agents', val: 'ai', emoji: '🤖',
        reveal: {
          title: "AI as a Partner",
          content: "I architected the UX and directed AI agents to write the code. It's a glimpse into the future of work."
        }
      },
      {
        id: 'solo', label: 'Solo Dev', val: 'solo', emoji: '👨‍💻',
        reveal: {
          title: "Design Engineering",
          content: "Designed in Figma, built in VS Code. I own the full stack of the user experience."
        }
      },
      {
        id: 'magic', label: 'Magic', val: 'magic', emoji: '✨',
        reveal: {
          title: "The Third State",
          content: "It feels like magic, but it's just rigorous engineering applied to ambiguous design problems."
        }
      }
    ],
    gearCascade: {
      primary: ['gear-life', 'gear-career-ambition'],
      secondary: ['bg-gear-1', 'bg-gear-2', 'bg-gear-3', 'bg-gear-4', 'bg-gear-5']
    }
  }
]

// Counter Component for animated numbers
function Counter({ value, duration = 2, isReady = false }: { value: number, duration?: number, isReady?: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = nodeRef.current
    if (!node || !isReady) return

    // Delay animation slightly to sync with entrance
    const controls = animate(0, value, {
      duration,
      delay: 0.5, // Reduced delay since we wait for ready signal
      onUpdate(v) {
        node.textContent = Math.floor(v).toLocaleString()
      },
      ease: [0.22, 1, 0.36, 1]
    })

    return () => controls.stop()
  }, [value, duration, isReady])

  return <span ref={nodeRef}>0</span>
}

const GEAR_IDS = Object.keys(GEAR_INSPECTOR)


// Memoized SVG container to prevent re-renders when activeGear state changes
const GearsSvgContainer = memo(function GearsSvgContainer({
  svgContent,
  containerRef,
  isReady,
  shouldSkipAnimation
}: {
  svgContent: string
  containerRef: React.RefObject<HTMLDivElement | null>
  isReady: boolean
  shouldSkipAnimation?: boolean
}) {
  return (
    <motion.div
      ref={containerRef}
      className="gears-dark-theme w-full"
      // If ready, we are visible. If skipping animation (quiz done), start visible. Else fade in.
      initial={{ opacity: shouldSkipAnimation ? 1 : 0, scale: shouldSkipAnimation ? 1 : 0.8, rotate: shouldSkipAnimation ? 0 : -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, opacity' }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
})

/**
 * HeroSplit - "Gear Inspector" Experience
 * Hover on gears to peek inside my brain - each gear reveals actual work
 */
export default function HeroSplit({ forceQuiz = false }: { forceQuiz?: boolean }) {
  const router = useRouter()
  const t = getTheme(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLElement>(null)

  const [activeGear, setActiveGear] = useState<GearInspectorItem | null>(null)
  const [activeCoords, setActiveCoords] = useState<{ x: number, y: number, side: 'left' | 'right' } | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isCardHovered, setIsCardHovered] = useState(false)
  const [showMobileSheet, setShowMobileSheet] = useState(false)
  const [mobileGear, setMobileGear] = useState<GearInspectorItem | null>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // -- QUIZ & ENTRY STATE --
  const [isAppReady, setIsAppReady] = useState(false)
  const [shouldSkipEntrance, setShouldSkipEntrance] = useState(false)
  const [quizState, setQuizState] = useState<'loading' | 'quiz' | 'complete'>('loading')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [litGears, setLitGears] = useState<string[]>([])
  const [showReveal, setShowReveal] = useState(false)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]
  const selectedOption = useMemo(() =>
    currentQuestion?.options.find(o => o.id === selectedOptionId),
    [currentQuestion, selectedOptionId]
  )
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize: Default to HERO (complete), Quiz is Opt-In
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    // Allow forcing via URL/Prop
    if (forceQuiz || window.location.search.includes('force=quiz')) {
      setQuizState('quiz')
      setLitGears([QUIZ_QUESTIONS[0].activeGear])
      return
    }

    // Default: Show Hero immediately
    setQuizState('complete')
    setIsAppReady(true)

    // Check session just to determine entrance animation
    const hasSession = localStorage.getItem(ENTRY_SESSION_KEY) === 'true'
    if (hasSession) {
      setShouldSkipEntrance(true)
    }
  }, [forceQuiz])

  const startQuiz = useCallback(() => {
    // Scroll to top immediately to ensure quiz is visible before locking scroll
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    // Reset state for fresh run
    setCurrentQuestionIndex(0)
    setLitGears([QUIZ_QUESTIONS[0].activeGear])
    setShowReveal(false)
    setSelectedOptionId(null)

    // Trigger Quiz Mode
    setQuizState('quiz')
    // We don't clear session key so we don't annoy them if they refresh
  }, [])

  // -- SVG GENERATION & LIGHTING --
  // 1. Base SVG cleanup (Memoized once)
  const baseSvg = useMemo(() => {
    return BRAIN_GEARS_SVG
      .replace(/width=["'][^"']*["']/g, '')
      .replace(/height=["'][^"']*["']/g, '')
      .replace(/<svg/, '<svg style="width:100%;height:auto"')
  }, [])

  // 2. Dynamic SVG (Re-runs on quiz state/lit gears)
  const svgContent = useMemo(() => {
    if (!baseSvg) return ''

    // If quiz complete, we return baseSvg but effectively all gears are 'active' via JS animations later?
    // Actually, in 'complete' mode, we might want to ensure NO 'gear-main--active' classes conflict with JS?
    // OR we just return clean SVG and let JS (setupGearRotations) take over.
    // BUT BrainEntryExperience logic added 'gear-lit' class.

    // Create sets for fast lookup
    const persistentGears = new Set(litGears)
    const currentActiveGear = (quizState === 'quiz' && currentQuestion?.activeGear)
      ? currentQuestion.activeGear
      : null

    // If no specific lighting needed (and not quiet 'complete' yet?), return base
    // If complete, we accept base.

    return baseSvg.replace(/id=["']([^"']+)["']/g, (match, id) => {
      const classes: string[] = []

      // In Quiz Mode: Light up specific gears
      if (quizState === 'quiz') {
        if (persistentGears.has(id)) {
          classes.push('gear-main--active', 'gear-lit')
        } else if (id === currentActiveGear) {
          classes.push('gear-main--active')
        }
      }

      // In Complete Mode:
      // We let setupGearRotations handle the visuals?
      // BrainEntryExperience had 'gear-lit' style. 
      // We probably want to Keep 'gear-lit' for all gears if we want them to stay bright.
      // OR we trust the GSAP/JS animation to set opacity: 1.

      // Special handling: Completely hide lines-background during quiz
      if (quizState === 'quiz' && (id === 'lines-background' || id === 'lines-background-copy')) {
        return `${match} style="display: none"`
      }

      if (classes.length > 0) {
        return `${match} class="${classes.join(' ')}"`
      }
      return match
    })
  }, [baseSvg, litGears, currentQuestion, quizState])

  // -- QUIZ HANDLERS --
  const handleContinue = useCallback(() => {
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current)
      autoAdvanceTimeoutRef.current = null
    }

    setShowReveal(false)
    setSelectedOptionId(null)

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // Finish Quiz -> Transition to Hero
      localStorage.setItem(ENTRY_SESSION_KEY, 'true')
      setQuizState('complete')
      setShouldSkipEntrance(true) // Ensure seamless transition
      setIsAppReady(true)
      // Trigger rotations will happen via useEffect(isAppReady)
    }
  }, [currentQuestionIndex])

  const handleAnswer = useCallback((optionId: string) => {
    setSelectedOptionId(optionId)
    const cascade = currentQuestion.gearCascade
    setLitGears(prev => {
      const newGears = [...cascade.primary, ...cascade.secondary]
      return [...new Set([...prev, ...newGears])]
    })

    // For the last question, we want a smoother, faster transition to the hero
    // No need to show the reveal card for long, but enough to read (bumped from 600ms)
    // Standard questions increased to 5000ms as requested
    const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1
    const delay = isLastQuestion ? 2000 : 5000

    setShowReveal(true)
    if (autoAdvanceTimeoutRef.current) clearTimeout(autoAdvanceTimeoutRef.current)
    autoAdvanceTimeoutRef.current = setTimeout(handleContinue, delay)
  }, [currentQuestion, currentQuestionIndex, handleContinue])

  // Lock scroll during quiz
  useEffect(() => {
    if (quizState === 'quiz') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [quizState])

  // Parallax effect for hero section (Only active if not in quiz?)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const gearsY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3])

  useEffect(() => {
    // Run setup if app is ready OR if we are in quiz mode
    if (!isAppReady && quizState !== 'quiz') return

    const container = containerRef.current
    if (!container) return

    let cleanup: (() => void) | null = null

    const setup = () => {
      const svgRoot = container.querySelector<SVGSVGElement>('svg')
      if (!svgRoot) {
        setTimeout(setup, 100)
        return
      }

      // In the white-gears SVG, the ID might still be brain-gears or brain-gears-copy
      // We check for both just in case
      let brainGearsGroup = svgRoot.querySelector<SVGGElement>('#brain-gears-copy')
      if (!brainGearsGroup) {
        brainGearsGroup = svgRoot.querySelector<SVGGElement>('#brain-gears')
      }
      if (!brainGearsGroup) return

      const setupGearRotations = () => {
        // CRITICAL: During quiz/loading mode, CSS handles visibility via .gear-lit class
        // We should NOT force opacity or run animations until quiz is complete
        // Check for 'complete' instead of 'quiz' to also handle 'loading' state
        const shouldAnimate = quizState === 'complete'

        // If not complete (loading OR quiz), don't run the full animation setup
        // Only set transform origins so gears rotate properly when lit
        if (!shouldAnimate) {
          // During quiz: Only set transform properties, let CSS handle opacity
          const mainGearsGroup = brainGearsGroup!.querySelector<SVGGElement>('#main-gears')
          if (mainGearsGroup) {
            GEAR_IDS.forEach((gearId) => {
              const gear = mainGearsGroup.querySelector<SVGGElement>(`#${gearId}`)
              if (!gear) return
              gear.style.transformOrigin = 'center'
              gear.style.transformBox = 'fill-box'
            })
          }
          // Don't run rotation animations during quiz - gears should be static/dimmed
          return
        }

        // Quiz is complete - now run full animation setup
        const fadeInDuration = shouldSkipEntrance ? 0 : 2.0
        const slowDownTime = shouldSkipEntrance ? 0 : 2.0
        const mainGearSlowDownPercent = 0.30

        // New structure: gears are direct children of #main-gears with IDs like gear-life, gear-career-ambition
        const mainGearsGroup = brainGearsGroup!.querySelector<SVGGElement>('#main-gears')
        if (!mainGearsGroup) return

        GEAR_IDS.forEach((gearId) => {
          // The gear group IS the gear itself now (not a container with gear-base inside)
          const gear = mainGearsGroup.querySelector<SVGGElement>(`#${gearId}`)
          if (!gear) return

          const isClockwise = Math.random() > 0.5
          const baseRotationSpeed = 20 + Math.random() * 20
          const fastRotationSpeed = baseRotationSpeed
          const slowRotationSpeed = baseRotationSpeed / (1 - mainGearSlowDownPercent)
          const fadeInRotationAmount = (360 / fastRotationSpeed) * fadeInDuration * (isClockwise ? 1 : -1)
          const rotationAmountValue = isClockwise ? '360deg' : '-360deg'

          gear.style.setProperty('--fade-in-rotation', `${fadeInRotationAmount}deg`)
          gear.style.setProperty('--rotation-duration', `${slowRotationSpeed}s`)
          gear.style.setProperty('--rotation-amount', rotationAmountValue)

          // Quiz complete: Now animate in
          if (shouldSkipEntrance) {
            gear.style.setProperty('animation', `gear-rotate-continuous ${slowRotationSpeed}s linear infinite`, 'important')
            gear.style.setProperty('opacity', '1', 'important')
          } else {
            gear.style.setProperty('animation', `gear-fade-in-main ${fadeInDuration}s linear forwards, gear-rotate-continuous ${slowRotationSpeed}s linear infinite ${slowDownTime}s`, 'important')
            // After fade-in completes, set opacity directly to prevent any hover state issues
            setTimeout(() => {
              gear.style.setProperty('opacity', '1', 'important')
            }, (fadeInDuration + 0.2) * 1000)
          }

          gear.style.transformOrigin = 'center'
          gear.style.transformBox = 'fill-box'
        })

        const bgGears = Array.from(brainGearsGroup!.querySelectorAll<SVGGElement>('[id^="bg-gear-"]'))
        const avgMainGearSpeed = 30

        bgGears.forEach((gear) => {
          const isClockwise = Math.random() > 0.5
          const fastBgRotationSpeed = avgMainGearSpeed
          const slowBgRotationSpeed = avgMainGearSpeed * 6  // Slower rotation (half speed)
          const fadeInRotationAmount = (360 / fastBgRotationSpeed) * fadeInDuration * (isClockwise ? 1 : -1)
          const bgRotationAmountValue = isClockwise ? '360deg' : '-360deg'

          gear.style.setProperty('--fade-in-rotation', `${fadeInRotationAmount}deg`)
          gear.style.setProperty('--rotation-duration', `${slowBgRotationSpeed}s`)
          gear.style.setProperty('--rotation-amount', bgRotationAmountValue)

          // Quiz complete: Now animate in
          if (shouldSkipEntrance) {
            gear.style.setProperty('animation', `gear-rotate-bg-slow ${slowBgRotationSpeed}s linear infinite`, 'important')
            gear.style.setProperty('opacity', '1', 'important')
          } else {
            gear.style.setProperty('animation', `gear-fade-in-bg ${fadeInDuration}s linear forwards, gear-rotate-bg-slow ${slowBgRotationSpeed}s linear infinite ${slowDownTime}s`, 'important')
          }
        })
      }

      const setTransformOrigins = () => {
        // Main gears under #main-gears
        const mainGearsGroup = brainGearsGroup!.querySelector<SVGGElement>('#main-gears')
        if (mainGearsGroup) {
          const mainGears = mainGearsGroup.querySelectorAll<SVGGElement>(':scope > [id^="gear-"]')
          mainGears.forEach((gear) => {
            try {
              const bbox = gear.getBBox()
              if (bbox.width > 0 && bbox.height > 0) {
                gear.style.transformOrigin = 'center'
                gear.style.transformBox = 'fill-box'
              }
            } catch {
              gear.style.transformOrigin = 'center'
              gear.style.transformBox = 'fill-box'
            }
          })
        }

        // Background gears
        const bgGears = brainGearsGroup!.querySelectorAll<SVGGElement>('[id^="bg-gear-"]')
        bgGears.forEach((gear) => {
          try {
            const bbox = gear.getBBox()
            if (bbox.width > 0 && bbox.height > 0) {
              gear.style.transformOrigin = 'center'
              gear.style.transformBox = 'fill-box'
            }
          } catch {
            gear.style.transformOrigin = 'center'
            gear.style.transformBox = 'fill-box'
          }
        })
      }

      const setupLineDrawing = () => {
        const linesBackground = brainGearsGroup!.querySelector<SVGGElement>('#lines-background')
        if (!linesBackground) return

        const paths = Array.from(linesBackground.querySelectorAll<SVGPathElement>('path'))
        if (paths.length === 0) return

        paths.forEach((path) => {
          path.style.opacity = '0'
          path.setAttribute('opacity', '0')
        })

        const durationPerLine = 24000
        const initialDelay = 3000

        paths.forEach((path) => {
          setTimeout(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                try {
                  const pathLength = path.getTotalLength()
                  if (pathLength > 0 && !isNaN(pathLength) && isFinite(pathLength)) {
                    path.style.setProperty('--path-length', String(pathLength))
                    path.setAttribute('stroke-dasharray', String(pathLength))
                    path.setAttribute('stroke-dashoffset', String(pathLength))
                    path.style.opacity = '0'
                    path.setAttribute('opacity', '0')
                    const delay = initialDelay
                    path.style.animation = `line-draw-path ${durationPerLine}ms ease-out ${delay}ms forwards`
                  }
                } catch {
                  // Silent fail
                }
              })
            })
          }, 100)
        })
      }

      const setupHoverListeners = () => {
        const allHoverTimeouts = new Map<string, NodeJS.Timeout | null>()
        const eventListeners = new Map<string, { element: Element; type: string; handler: EventListener }[]>()

        // New structure: gears are direct children of #main-gears
        const mainGearsGroup = brainGearsGroup!.querySelector<SVGGElement>('#main-gears')
        if (!mainGearsGroup) return

        GEAR_IDS.forEach((gearId) => {
          // The gear group IS the gear itself now
          const gear = mainGearsGroup.querySelector<SVGGElement>(`#${gearId}`)
          if (!gear) return

          // Enable pointer events on the gear itself
          gear.style.pointerEvents = 'auto'
          gear.style.cursor = 'pointer'

          try {
            const bbox = gear.getBBox()
            if (bbox.width > 0 && bbox.height > 0) {
              const centerX = bbox.x + bbox.width / 2
              const centerY = bbox.y + bbox.height / 2
              const radius = (Math.max(bbox.width, bbox.height) / 2) * 1.005

              let overlay = gear.querySelector<SVGCircleElement>('.gear-hover-overlay')
              if (!overlay) {
                overlay = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
                overlay.setAttribute('class', 'gear-hover-overlay')
                overlay.setAttribute('cx', String(centerX))
                overlay.setAttribute('cy', String(centerY))
                overlay.setAttribute('r', String(radius))
                overlay.setAttribute('fill', 'transparent')
                overlay.setAttribute('stroke', 'none')
                overlay.style.pointerEvents = 'auto'
                overlay.style.cursor = 'pointer'
                overlay.style.zIndex = '1000'
                gear.appendChild(overlay)
              } else {
                overlay.setAttribute('cx', String(centerX))
                overlay.setAttribute('cy', String(centerY))
                overlay.setAttribute('r', String(radius))
              }
            }
          } catch {
            // Continue anyway
          }

          // Reference the gear for the rest of the function (was gearGroup)
          const gearGroup = gear

          if (!GEAR_INSPECTOR[gearId]) return

          let hoverTimeout: NodeJS.Timeout | null = null
          allHoverTimeouts.set(gearId, null)

          const handleEnter = () => {
            allHoverTimeouts.forEach((timeout, id) => {
              if (timeout) {
                clearTimeout(timeout)
                allHoverTimeouts.set(id, null)
              }
            })

            if (hoverTimeout) {
              clearTimeout(hoverTimeout)
              hoverTimeout = null
              allHoverTimeouts.set(gearId, null)
            }

            // Clear hide timeout if hovering a new gear
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current)
              hideTimeoutRef.current = null
            }

            const allActiveGears = brainGearsGroup!.querySelectorAll<SVGGElement>('.gear-main--active')
            allActiveGears.forEach((activeGear) => {
              if (activeGear.id !== gearId) {
                activeGear.classList.remove('gear-main--active')
                // Remove accent color from previously active gear
                activeGear.style.removeProperty('--gear-accent')
              }
            })

            gearGroup.classList.add('gear-main--active')
            const gearData = GEAR_INSPECTOR[gearId]
            if (gearData) {
              // Calculate position for popover
              const rect = gearGroup.getBoundingClientRect()
              const containerRect = containerRef.current?.getBoundingClientRect()

              if (containerRect) {
                const centerX = rect.left - containerRect.left + rect.width / 2
                const centerY = rect.top - containerRect.top + rect.height / 2
                // Determine side based on gear position relative to center
                const side = centerX > containerRect.width / 2 ? 'left' : 'right'

                setActiveCoords({ x: centerX, y: centerY, side })
              }

              // Apply accent color to the gear
              gearGroup.style.setProperty('--gear-accent', gearData.accentColor)
              setActiveGear(gearData)
              setHasInteracted(true)
            }
          }

          const handleLeave = () => {
            if (hoverTimeout) {
              clearTimeout(hoverTimeout)
              hoverTimeout = null
              allHoverTimeouts.set(gearId, null)
            }

            // Short delay to allow user to move to the inspector card
            hoverTimeout = setTimeout(() => {
              gearGroup.classList.remove('gear-main--active')
              const activeGears = Array.from(brainGearsGroup!.querySelectorAll<SVGGElement>('.gear-main--active'))
              if (activeGears.length === 0) {
                // Use the ref to schedule hiding (will be cancelled if card is hovered)
                if (hideTimeoutRef.current) {
                  clearTimeout(hideTimeoutRef.current)
                }
                hideTimeoutRef.current = setTimeout(() => {
                  setActiveGear((current) => current)
                }, 150)
              }
              hoverTimeout = null
              allHoverTimeouts.set(gearId, null)
            }, 80)

            allHoverTimeouts.set(gearId, hoverTimeout)
          }

          const overlay = gearGroup.querySelector<SVGCircleElement>('.gear-hover-overlay')
          const listeners: { element: Element; type: string; handler: EventListener }[] = []

          // Click handler to navigate to the gear's linked content (desktop only)
          const handleClick = (e: Event) => {
            // On mobile, we use the bottom sheet instead of direct navigation
            const isMobile = window.matchMedia('(max-width: 1023px)').matches
            if (isMobile) {
              e.preventDefault()
              e.stopPropagation()
              return // Bottom sheet handles mobile taps
            }

            const gearData = GEAR_INSPECTOR[gearId]
            if (gearData?.link) {
              router.push(gearData.link)
            }
          }

          // Mobile tap handler - open bottom sheet
          const handleTap = (e: Event) => {
            e.stopPropagation()
            e.preventDefault() // Prevent click event from also firing

            // Check if we're on mobile (no hover capability)
            const isMobile = window.matchMedia('(max-width: 1023px)').matches

            const gearData = GEAR_INSPECTOR[gearId]
            if (!gearData) return

            if (isMobile) {
              // Mobile: Open bottom sheet
              setMobileGear(gearData)
              setShowMobileSheet(true)

              // Visual feedback - highlight the tapped gear
              const allActiveGears = brainGearsGroup!.querySelectorAll<SVGGElement>('.gear-main--active')
              allActiveGears.forEach((ag) => {
                ag.classList.remove('gear-main--active')
                ag.style.removeProperty('--gear-accent')
              })
              gearGroup.classList.add('gear-main--active')
              gearGroup.style.setProperty('--gear-accent', gearData.accentColor)
            } else {
              // Desktop: Toggle behavior (fallback for click)
              const isCurrentlyActive = gearGroup.classList.contains('gear-main--active')

              const allActiveGears = brainGearsGroup!.querySelectorAll<SVGGElement>('.gear-main--active')
              allActiveGears.forEach((ag) => {
                ag.classList.remove('gear-main--active')
                ag.style.removeProperty('--gear-accent')
              })

              if (!isCurrentlyActive) {
                gearGroup.classList.add('gear-main--active')
                gearGroup.style.setProperty('--gear-accent', gearData.accentColor)
                setActiveGear(gearData)
                setHasInteracted(true)
              } else {
                setActiveGear(null)
              }
            }
          }

          if (overlay) {
            overlay.addEventListener('mouseenter', handleEnter)
            overlay.addEventListener('mouseleave', handleLeave)
            overlay.addEventListener('click', handleClick)
            // Mobile: use touchend for better tap handling
            overlay.addEventListener('touchend', handleTap)
            listeners.push(
              { element: overlay, type: 'mouseenter', handler: handleEnter },
              { element: overlay, type: 'mouseleave', handler: handleLeave },
              { element: overlay, type: 'click', handler: handleClick },
              { element: overlay, type: 'touchend', handler: handleTap }
            )
          } else {
            gearGroup.style.pointerEvents = 'auto'
            gearGroup.addEventListener('mouseenter', handleEnter)
            gearGroup.addEventListener('mouseleave', handleLeave)
            gearGroup.addEventListener('click', handleClick)
            // Mobile: use touchend for better tap handling
            gearGroup.addEventListener('touchend', handleTap)
            listeners.push(
              { element: gearGroup, type: 'mouseenter', handler: handleEnter },
              { element: gearGroup, type: 'mouseleave', handler: handleLeave },
              { element: gearGroup, type: 'click', handler: handleClick },
              { element: gearGroup, type: 'touchend', handler: handleTap }
            )
          }

          eventListeners.set(gearId, listeners)
        })

        return () => {
          allHoverTimeouts.forEach((timeout) => {
            if (timeout) clearTimeout(timeout)
          })
          allHoverTimeouts.clear()
          eventListeners.forEach((listeners) => {
            listeners.forEach(({ element, type, handler }) => {
              element.removeEventListener(type, handler)
            })
          })
          eventListeners.clear()
        }
      }

      setTransformOrigins()
      setTimeout(setTransformOrigins, 200)
      setupGearRotations()

      // Only run line animation if quiz is complete
      if (quizState === 'complete') {
        setupLineDrawing()
      } else {
        // Ensure lines are completely hidden during quiz
        const linesBg = brainGearsGroup!.querySelector<SVGGElement>('#lines-background')
        if (linesBg) linesBg.style.opacity = '0'
      }

      const hoverCleanup = setupHoverListeners()

      cleanup = () => {
        if (hoverCleanup) hoverCleanup()
      }
    }

    setup()

    return () => {
      if (cleanup) cleanup()
    }
  }, [router, isAppReady, shouldSkipEntrance, quizState, litGears])

  // Click outside to close the hover card
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | SVGElement

      // Check if click is on a gear element (has gear-main class or is inside one)
      const isClickOnGear = target.closest('.gear-main') !== null

      // Check if click is on the hover card
      const isClickOnCard = target.closest('[data-gear-card]') !== null

      // If click is not on a gear and not on the card, close the active gear
      if (!isClickOnGear && !isClickOnCard && activeGear) {
        // Clear any pending timeouts
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current)
          hideTimeoutRef.current = null
        }
        // Close the active gear card
        setActiveGear(null)
        // Also remove active class from all gears
        if (containerRef.current) {
          const activeGears = containerRef.current.querySelectorAll('.gear-main--active')
          activeGears.forEach((gear) => {
            gear.classList.remove('gear-main--active')
              ; (gear as HTMLElement).style.removeProperty('--gear-accent')
          })
        }
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [activeGear])

  // Hide header during quiz via CSS injection
  useEffect(() => {
    if (quizState === 'quiz') {
      const style = document.createElement('style')
      style.id = 'hide-header-style'
      style.innerHTML = 'header { display: none !important; }'
      document.head.appendChild(style)
      return () => {
        const el = document.getElementById('hide-header-style')
        if (el) el.remove()
      }
    }
  }, [quizState])

  return (
    <>
      <section
        ref={heroRef}
        id="hero"
        className="bg-monitor relative min-h-screen flex flex-col overflow-hidden"
      >
        {/* Subtle grid background */}
        {/* Subtle grid background - only show when not in quiz */}
        {quizState !== 'quiz' && (
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        )}

        {/* Glow effect behind gears - with parallax */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ y: glowY }}
        >
          <motion.div
            className="w-[750px] h-[750px] bg-accent-teal/10 rounded-full blur-[150px]"
            style={{ scale: glowScale }}
          />
        </motion.div>


        {/* Main Content Container - Centered Layout */}
        <div className={`${spacing.containerFull} relative z-10 flex-1 flex flex-col items-center justify-center`}>
          <div className="w-full flex-1 flex flex-col items-center justify-center">

            {/* Centered Gears - THE HERO - with subtle parallax */}
            <motion.div
              className={`relative w-[320px] xs:w-[380px] sm:w-[480px] md:w-[580px] lg:w-[680px] xl:w-[740px] 2xl:w-[900px] max-w-full max-h-[85vh] mx-auto flex items-center justify-center transition-all duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${quizState === 'quiz' ? 'mt-32 sm:mt-36 brain-entry-container' : 'mt-0'}`}
              // If quiz is active, we might want it fixed/centered? 
              // Actually, simplified approach: Just use standard flow, but overlay everything else.
              initial={shouldSkipEntrance ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              animate={(isAppReady || quizState === 'quiz')
                ? { opacity: 1, scale: quizState === 'quiz' ? 1.15 : 1 }
                : (shouldSkipEntrance ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 })
              }
              transition={{ duration: 3.0, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: gearsY, transformOrigin: 'center 40%' }}
            >
              <GearsSvgContainer
                svgContent={svgContent}
                containerRef={containerRef}
                isReady={isAppReady || quizState === 'quiz'}
                shouldSkipAnimation={shouldSkipEntrance}
              />

              {/* === QUIZ CARD OVERLAY === */}
              {/* This renders ON TOP of the brain but aligns with it */}
              <AnimatePresence>
                {quizState === 'quiz' && (
                  <motion.div
                    key={`question-${currentQuestionIndex}`}
                    className="absolute z-[9999] pointer-events-auto left-1/2 top-1/2"
                    style={{
                      maxWidth: '320px',
                      width: '90%',
                      x: "-50%", // Base centering
                      y: "-50%"  // Base centering
                    }}
                    initial={{ opacity: 0, scale: 0.9, y: "calc(-50% + 20px)" }}
                    animate={{ opacity: 1, scale: 1, y: "-50%" }}
                    exit={{ opacity: 0, scale: 0.9, y: "calc(-50% - 20px)" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-5 shadow-2xl overflow-hidden relative min-h-[160px] flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`statement-${currentQuestionIndex}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-white/60 text-sm mb-2 font-medium">
                            {currentQuestion.statement}
                          </p>
                          <h3 className="text-white text-lg font-semibold mb-4">
                            {currentQuestion.question}
                          </h3>
                        </motion.div>
                      </AnimatePresence>

                      {/* Reveal - Moved ABOVE options as requested */}
                      <AnimatePresence>
                        {showReveal && selectedOption && (
                          <motion.div
                            key="reveal"
                            initial={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 0, marginBottom: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-white/10">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-full bg-accent-teal/20">
                                  <Sparkles className="w-4 h-4 text-accent-teal" />
                                </div>
                                <span className="text-accent-teal text-sm font-bold uppercase tracking-wide">
                                  {selectedOption.reveal.title}
                                </span>
                              </div>

                              <p className="text-white/90 text-[15px] leading-relaxed mb-4 font-medium">
                                {selectedOption.reveal.content}
                              </p>

                              <div className="flex justify-between items-center text-xs text-white/40">
                                <span>Auto-advancing...</span>
                                <motion.button
                                  onClick={handleContinue}
                                  className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
                                  whileHover={{ x: 2 }}
                                >
                                  Skip <ArrowRight className="w-3 h-3" />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Options */}
                      <motion.div
                        key={`options-${currentQuestionIndex}`}
                        className={`space-y-2 ${showReveal ? 'pointer-events-none' : ''}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: showReveal ? 0.4 : 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {currentQuestion.options.map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => handleAnswer(option.id)}
                            className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/15 
                                                                       border border-white/10 hover:border-accent-teal/50
                                                                       transition-all duration-300 group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="mr-2">{option.emoji}</span>
                            <span className="text-white/90 group-hover:text-white">
                              {option.label}
                            </span>
                          </motion.button>
                        ))}
                      </motion.div>


                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Center hint - shown when no gear is active AND quiz is complete */}
              <AnimatePresence mode="wait">
                {!activeGear && quizState === 'complete' && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.3, delay: hasInteracted ? 0.1 : 1.5 } }}
                    exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }}
                  >
                    <div className="text-center px-4">
                      <p className={`text-slate-400 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed`}>
                        <span className="hidden lg:block">
                          Hover &amp; click on the rotating gears<br />
                          <span className="text-slate-500">to explore my mind</span>
                        </span>
                        <span className="lg:hidden">
                          Tap on the rotating gears<br />
                          <span className="text-slate-500">to explore my mind</span>
                        </span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* GEAR INSPECTOR - Proximity Popover (Only when quiz complete) */}
              <AnimatePresence mode="wait">
                {activeGear && activeCoords && quizState === 'complete' && (
                  <motion.div
                    key={activeGear.id}
                    className="absolute z-20 pointer-events-none"
                    style={{
                      left: activeCoords.x,
                      top: activeCoords.y,
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div
                      className={`flex items-center ${activeCoords.side === 'left' ? 'flex-row-reverse -translate-x-full' : 'flex-row'}`}
                    >
                      {/* Connecting Line (Leader) */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 40 }}
                        className="h-px bg-slate-600 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                      />

                      {/* The Card */}
                      <motion.div
                        className={`pointer-events-auto mx-4 p-5 w-[260px] xs:w-[300px] rounded-xl backdrop-blur-xl bg-slate-900/90 border border-slate-700/50 shadow-2xl relative overflow-hidden`}
                        initial={{ x: activeCoords.side === 'left' ? 10 : -10 }}
                        animate={{ x: 0 }}
                        onMouseEnter={() => {
                          setIsCardHovered(true)
                          if (hideTimeoutRef.current) {
                            clearTimeout(hideTimeoutRef.current)
                            hideTimeoutRef.current = null
                          }
                        }}
                        onMouseLeave={() => {
                          setIsCardHovered(false)
                          hideTimeoutRef.current = setTimeout(() => {
                            setActiveGear(null)
                          }, 150)
                        }}
                      >
                        {/* Accent Top Border */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px]"
                          style={{ backgroundColor: activeGear.accentColor, opacity: 0.8 }}
                        />

                        <Link
                          href={activeGear.link}
                          data-gear-card
                          className="block text-left group"
                        >
                          <div className="space-y-3">
                            {/* Thought - The Hero Content */}
                            <p className="text-white text-[15px] font-medium leading-relaxed font-serif italic">
                              "{activeGear.thought}"
                            </p>

                            {/* CTA Link */}
                            <div className="flex items-center gap-2 pt-1">
                              <span
                                className="text-xs font-bold tracking-wide uppercase border-b border-transparent group-hover:border-current transition-all"
                                style={{ color: activeGear.accentColor }}
                              >
                                {activeGear.linkLabel}
                              </span>
                              <svg
                                className="w-3 h-3 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke={activeGear.accentColor}
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Text Content - Below Gears */}
            <motion.div
              className={`flex flex-col items-center text-center space-y-4 sm:space-y-5 mt-space-12 sm:mt-space-16 lg:mt-space-20 px-4`}
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.2 }}
              animate={isAppReady ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : { clipPath: 'inset(0 100% 0 0)', opacity: 0.2 }}
              transition={{ duration: 2.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Subtext - Job Title / Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isAppReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-accent-teal font-mono text-sm xs:text-base sm:text-lg tracking-wider font-medium mb-0"
              >
                Senior Product Designer · 13+ Years Experience · AI-Adept Prototyper · Enterprise UX
              </motion.div>

              {/* Main Headline */}
              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight w-full max-w-7xl mx-auto font-sans !mt-space-2">
                <span className="block mb-2">
                  {"I design so users never have to wonder".split('').map((char, i) => (
                    <motion.span
                      key={`h1-Line1-${i}`}
                      initial={{ opacity: 0 }}
                      animate={isAppReady ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0, delay: 0.5 + i * 0.06 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="inline-block bg-gradient-to-r from-[var(--accent-teal)] via-cyan-400 to-white bg-clip-text text-transparent pb-1">
                  {"\"how do I use this?\"".split('').map((char, i) => (
                    <motion.span
                      key={`h1-Line2-${i}`}
                      initial={{ opacity: 0 }}
                      animate={isAppReady ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0, delay: 0.5 + (38 + i) * 0.06 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </h1>

              {/* CTA Buttons - Moved here from bottom bar */}
              <div className="flex flex-row gap-4 mt-8 sm:mt-10 justify-center w-full flex-wrap">
                <a
                  href="#work-overview"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-white/90 hover:bg-white text-black text-sm sm:text-base font-light transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap backdrop-blur-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    const section = document.getElementById('work-overview')
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  <span>See Work</span>
                  <svg aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>

                <button
                  onClick={startQuiz}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-white/10 hover:border-white/20 text-white/90 hover:text-white text-sm sm:text-base font-light bg-white/5 hover:bg-white/10 transition-all duration-300 whitespace-nowrap backdrop-blur-sm"
                >
                  <Brain className="w-4 h-4 opacity-70 group-hover:scale-110 transition-transform" />
                  <span>Take a quiz to know more about me</span>
                </button>
              </div>



            </motion.div>


          </div>
        </div>

        <motion.div
          className="w-full relative mt-space-16 sm:mt-space-24 z-20 pb-space-8 sm:pb-space-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <div className="max-w-6xl mx-auto w-full px-space-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-space-8 md:gap-y-0 divide-white/10 md:divide-x">

              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center px-space-4 group">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-space-2 whitespace-nowrap">
                  <Counter value={50} isReady={isAppReady} />+
                </div>
                <div className="text-white-muted group-hover:text-white-dim transition-colors text-[10px] sm:text-xs font-mono uppercase tracking-widest text-center font-medium">
                  Projects Shipped
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center px-space-4 group">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-space-2 whitespace-nowrap">
                  <Counter value={25} isReady={isAppReady} />M+
                </div>
                <div className="text-white-muted group-hover:text-white-dim transition-colors text-[10px] sm:text-xs font-mono uppercase tracking-widest text-center font-medium">
                  Users on WebFOCUS
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center px-space-4 group">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-space-2 whitespace-nowrap">
                  Fortune 500
                </div>
                <div className="text-white-muted group-hover:text-white-dim transition-colors text-[10px] sm:text-xs font-mono uppercase tracking-widest text-center font-medium">
                  Clients
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center justify-center px-space-4 group">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-space-2 whitespace-nowrap">
                  Best-in-Class
                </div>
                <div className="text-white-muted group-hover:text-white-dim transition-colors text-[10px] sm:text-xs font-mono uppercase tracking-widest text-center font-medium">
                  2025 Dresner Award
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </section>



      {/* Mobile Bottom Sheet for Gear Inspector */}
      <GearBottomSheet
        gear={mobileGear}
        isOpen={showMobileSheet}
        onClose={() => {
          setShowMobileSheet(false)
          setMobileGear(null)
        }}
      />
    </>
  )
}
