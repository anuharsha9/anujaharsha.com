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
import { ArrowRight, Sparkles, Brain, Check } from 'lucide-react'

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
    nextId: string | 'end' // Branching logic
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

const QUIZ_QUESTIONS_DATA: Record<string, QuizQuestion> = {
  'start': {
    id: 'start',
    statement: "Let's align our neural networks.",
    question: "What are you looking for right now?",
    activeGear: 'gear-scattered-workflows', // Restored
    options: [
      {
        id: 'hiring', label: 'A Business Problem Solver', val: 'hiring', emoji: '🤝', nextId: 'hire_1',
        reveal: {
          title: "Efficiency Expert",
          content: "Excellent. I speak business value—reducing development cycles and ensuring scalability from Day 1."
        }
      },
      {
        id: 'browsing', label: 'Design Inspiration', val: 'browsing', emoji: '🔭', nextId: 'explore_1',
        reveal: {
          title: "Welcome, Explorer",
          content: "I built this site to push the boundaries of what a portfolio can be. Let's peek under the hood."
        }
      }
    ],
    gearCascade: {
      primary: ['gear-legacy-systems', 'gear-fragmented-ui', 'gear-scattered-workflows'],
      secondary: ['bg-gear-16', 'bg-gear-17', 'bg-gear-18', 'bg-gear-19', 'bg-gear-20']
    }
  },
  // --- HIRING TRACK ---
  'hire_1': {
    id: 'hire_1',
    statement: "First principles thinking.",
    question: "How do you handle a legacy system that's slowing down 20M+ users?",
    activeGear: 'gear-conflicting-teams', // Restored
    options: [
      {
        id: 'ui', label: 'Do you just reskin the UI?', val: 'ui', emoji: '🎨', nextId: 'hire_2',
        reveal: {
          title: "Yes, and...",
          content: "A fresh UI helps, but I dig deeper. I map the data flow to solve the root cause, not just the symptom."
        }
      },
      {
        id: 'audit', label: 'Do you audit the architecture?', val: 'audit', emoji: '🔍', nextId: 'hire_2',
        reveal: {
          title: "Code Archaeologist",
          content: "Exactly. I audit the component library and API calls to find the bottleneck before touching a pixel."
        }
      }
    ],
    gearCascade: {
      primary: ['gear-conflicting-teams', 'gear-missing-briefs'],
      secondary: ['bg-gear-11', 'bg-gear-12', 'bg-gear-13', 'bg-gear-14', 'bg-gear-15']
    }
  },
  'hire_2': {
    id: 'hire_2',
    statement: "Execution matters.",
    question: "Engineering says a critical feature is 'too complex'. What do you do?",
    activeGear: 'gear-motherhood', // Restored
    options: [
      {
        id: 'spec', label: 'Write a spec doc?', val: 'spec', emoji: '📄', nextId: 'hire_3',
        reveal: {
          title: "Documentation + Code",
          content: "Specs are vital. But I go further: I prototype the interaction in React so engineers have a working reference."
        }
      },
      {
        id: 'build', label: 'Build it nicely in React?', val: 'build', emoji: '⚛️', nextId: 'hire_3',
        reveal: {
          title: "The Polymath Move",
          content: "Exactly. I built this portfolio myself to prove that complex UX is possible when Design and Engineering are one."
        }
      }
    ],
    gearCascade: {
      primary: ['gear-motherhood', 'gear-shifting-priorities'],
      secondary: ['bg-gear-6', 'bg-gear-7', 'bg-gear-8', 'bg-gear-9', 'bg-gear-10']
    }
  },
  'hire_3': {
    id: 'hire_3',
    statement: "The multiplier effect.",
    question: "What is your biggest impact as a Principal Designer?",
    activeGear: 'gear-life', // Restored
    options: [
      {
        id: 'lead', label: 'Is it leading teams?', val: 'lead', emoji: '👑', nextId: 'end',
        reveal: {
          title: "Servant Leadership",
          content: "I lead by doing. My code sets the standard, and my systems empower the team to ship faster and better."
        }
      },
      {
        id: 'strategy', label: 'Is it defining strategy?', val: 'strategy', emoji: '🎯', nextId: 'end',
        reveal: {
          title: "Strategic Execution",
          content: "Strategy without execution is hallucination. I define the roadmap and then write the code to validate it."
        }
      }
    ],
    gearCascade: {
      primary: ['gear-life', 'gear-career-ambition'],
      secondary: ['bg-gear-1', 'bg-gear-2', 'bg-gear-3', 'bg-gear-4', 'bg-gear-5']
    }
  },
  // --- EXPLORER TRACK ---
  'explore_1': {
    id: 'explore_1',
    statement: "Behind the curtain.",
    question: "This site feels different. How exactly was it built?",
    activeGear: 'gear-conflicting-teams', // Matches Hire_1
    options: [
      {
        id: 'nocode', label: 'Did you use Framer/Webflow?', val: 'nocode', emoji: '🎨', nextId: 'explore_2',
        reveal: {
          title: "Pixel Perfect",
          content: "It has that polish, doesn't it? But this is a custom Next.js app. I need full control over the state and animation stack."
        }
      },
      {
        id: 'code', label: 'Did you write the code?', val: 'code', emoji: '💻', nextId: 'explore_2',
        reveal: {
          title: "Hand-Crafted",
          content: "Correct. I built this with TypeScript, React, and Framer Motion. I believe designers should own their medium."
        }
      },
      {
        id: 'ai', label: 'Did you use AI?', val: 'ai', emoji: '🤖', nextId: 'explore_2',
        reveal: {
          title: "The Secret Sauce",
          content: "Spot on. I orchestrated autonomous AI agents to handle the boilerplate, acting as the Architect while they laid the bricks."
        }
      }
    ],
    gearCascade: {
      primary: ['gear-conflicting-teams', 'gear-missing-briefs'],
      secondary: ['bg-gear-11', 'bg-gear-12', 'bg-gear-13', 'bg-gear-14', 'bg-gear-15']
    }
  },
  'explore_2': {
    id: 'explore_2',
    statement: "Looking forward.",
    question: "Where do you see the future of Product Design going?",
    activeGear: 'gear-motherhood', // Matches Hire_2
    options: [
      {
        id: 'tools', label: 'Better UI Tools?', val: 'tools', emoji: '🖌️', nextId: 'explore_3',
        reveal: {
          title: "Tools Empower Us",
          content: "Figma is great, but the browser is the final canvas. I bet on code as the ultimate design tool."
        }
      },
      {
        id: 'systems', label: 'System Orchestration?', val: 'systems', emoji: '🧠', nextId: 'explore_3',
        reveal: {
          title: "The Architect",
          content: "As AI handles the pixels, designers will become System Architects. That's the playground I'm building in."
        }
      }
    ],
    gearCascade: {
      primary: ['gear-motherhood', 'gear-shifting-priorities'],
      secondary: ['bg-gear-6', 'bg-gear-7', 'bg-gear-8', 'bg-gear-9', 'bg-gear-10']
    }
  },
  'explore_3': {
    id: 'explore_3',
    statement: "The hidden craft.",
    question: "How do you make an interface feel this 'premium'?",
    activeGear: 'gear-life', // Matches Hire_3
    options: [
      {
        id: 'motion', label: 'Is it the motion?', val: 'motion', emoji: '🌊', nextId: 'end',
        reveal: {
          title: "Alive Interfaces",
          content: "It's not just animation; it's physics. I use spring physics (like in this card) to make Ui feel organic."
        }
      },
      {
        id: 'details', label: 'Is it the micro-interactions?', val: 'details', emoji: '✨', nextId: 'end',
        reveal: {
          title: "Sweat the Details",
          content: "The difference between good and great is in the details. I obsess over the 1% that others ignore."
        }
      }
    ],
    gearCascade: {
      primary: ['gear-life', 'gear-career-ambition'],
      secondary: ['bg-gear-1', 'bg-gear-2', 'bg-gear-3', 'bg-gear-4', 'bg-gear-5']
    }
  }
}


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
  const [showMobileSheet, setShowMobileSheet] = useState(false)
  const [mobileGear, setMobileGear] = useState<GearInspectorItem | null>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // -- QUIZ & ENTRY STATE --
  const [isAppReady, setIsAppReady] = useState(false)
  const [shouldSkipEntrance, setShouldSkipEntrance] = useState(false)
  const [quizState, setQuizState] = useState<'loading' | 'quiz' | 'complete'>('loading')

  // MAIN QUIZ STATE
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('start')
  const [litGears, setLitGears] = useState<string[]>([])
  const [showReveal, setShowReveal] = useState(false)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)

  // INSPECTOR STATE
  const [isGearHovered, setIsGearHovered] = useState(false)
  const [isCardHovered, setIsCardHovered] = useState(false)

  // INSPECTOR QUIZ STATE
  const [inspectorQuizSelection, setInspectorQuizSelection] = useState<string | null>(null)

  // REFS
  const isCardHoveredRef = useRef(isCardHovered)
  const inspectorQuizSelectionRef = useRef(inspectorQuizSelection)

  // Refs for event listeners
  useEffect(() => {
    isCardHoveredRef.current = isCardHovered
    inspectorQuizSelectionRef.current = inspectorQuizSelection
  }, [isCardHovered, inspectorQuizSelection])

  // MASTER VISIBILITY EFFECT
  // Declaratively manage when to close the gear inspector
  useEffect(() => {
    // If hovering anything or answering quiz, STAY OPEN.
    // Also check if we just opened it (activeGear exists but no hover entries yet? 
    // Actually, on desktop, enter sets hover true immediately.

    // We only care about CLOSING here. Opening is handled by events.
    if (!activeGear) return

    if (isGearHovered || isCardHovered || inspectorQuizSelection) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
        hideTimeoutRef.current = null
      }
    } else {
      // Neither hovered nor answering. Close after delay.
      if (!hideTimeoutRef.current) {
        hideTimeoutRef.current = setTimeout(() => {
          setActiveGear(null)
          // Also clear selection to be safe
          setInspectorQuizSelection(null)
          inspectorQuizSelectionRef.current = null
        }, 300) // 300ms grace period
      }
    }

    return () => {
      // Don't clear activeGear on unmount, just timeout
      // Timeout cleanup handled by ref usage pattern
    }
  }, [activeGear, isGearHovered, isCardHovered, inspectorQuizSelection])

  // Reset quiz selection when gear changes
  useEffect(() => {
    setInspectorQuizSelection(null)
    inspectorQuizSelectionRef.current = null
  }, [activeGear?.id])

  // CHANGED: Lookup by ID
  const currentQuestion = QUIZ_QUESTIONS_DATA[currentQuestionId]

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
      setLitGears([QUIZ_QUESTIONS_DATA['start'].activeGear]) // Use start
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
    setCurrentQuestionId('start') // User start ID
    setLitGears([QUIZ_QUESTIONS_DATA['start'].activeGear])
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

  const nextQuestionRef = useRef<string | null>(null)

  // -- QUIZ HANDLERS --
  const handleContinue = useCallback(() => {
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current)
      autoAdvanceTimeoutRef.current = null
    }

    setShowReveal(false)

    // Logic for next question - Use Ref to avoid closure staleness
    const nextId = nextQuestionRef.current || 'end'

    // Reset selection state
    setSelectedOptionId(null)
    nextQuestionRef.current = null

    if (nextId !== 'end' && QUIZ_QUESTIONS_DATA[nextId]) {
      // Small delay to allow exit animation of previous card
      setTimeout(() => {
        setCurrentQuestionId(nextId)
      }, 200)
    } else {
      // Finish Quiz -> Transition to Hero
      localStorage.setItem(ENTRY_SESSION_KEY, 'true')
      setQuizState('complete')
      setShouldSkipEntrance(true) // Ensure seamless transition
      setIsAppReady(true)
      // Trigger rotations will happen via useEffect(isAppReady)
    }
  }, [])

  const handleAnswer = useCallback((optionId: string) => {
    const option = currentQuestion.options.find(o => o.id === optionId)
    if (!option) return

    setSelectedOptionId(optionId)

    // Store next ID immediately to avoid state closure issues
    nextQuestionRef.current = option.nextId

    const cascade = currentQuestion.gearCascade
    setLitGears(prev => {
      const newGears = [...cascade.primary, ...cascade.secondary]
      return [...new Set([...prev, ...newGears])]
    })

    // For the last question, we want a smoother, faster transition to the hero
    const isLastQuestion = option.nextId === 'end'
    const delay = isLastQuestion ? 2000 : 4000 // 4s reading time for reveal

    setShowReveal(true)
    if (autoAdvanceTimeoutRef.current) clearTimeout(autoAdvanceTimeoutRef.current)
    autoAdvanceTimeoutRef.current = setTimeout(handleContinue, delay)
  }, [currentQuestion, handleContinue])

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
              setIsGearHovered(true)
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

            // Tell React we left the gear. Master Effect handles closing.
            setIsGearHovered(false)

            // Visual cleanup
            gearGroup.classList.remove('gear-main--active')
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
      // CRITICAL: Don't close if we just made a quiz selection (ref tracks this instantly)
      if (!isClickOnGear && !isClickOnCard && activeGear && !inspectorQuizSelectionRef.current) {
        // Clear any pending timeouts
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current)
          hideTimeoutRef.current = null
        }
        // Close the active gear card
        setActiveGear(null)
        setHasInteracted(false)
        setIsGearHovered(false)
        setIsCardHovered(false)

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
                    key={`question-${currentQuestionId}`}
                    className="absolute z-[9999] pointer-events-auto left-1/2 top-1/2"
                    style={{ x: "-50%", y: "-50%" }}
                    initial={{ opacity: 0, scale: 0.9, y: "-40%" }}
                    animate={{ opacity: 1, scale: 1, y: "-50%" }}
                    exit={{ opacity: 0, scale: 0.9, y: "-60%" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="text-white bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl max-w-xl w-[90vw] relative overflow-hidden">

                      <motion.div
                        key={`statement-${currentQuestionId}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-3 text-center"
                      >
                        <h3 className="text-lg md:text-xl font-light text-white leading-tight">
                          {currentQuestion.question}
                        </h3>
                      </motion.div>

                      <div className="space-y-3">
                        <AnimatePresence mode="wait">
                          {!showReveal ? (
                            <motion.div
                              key={`options-${currentQuestionId}`}
                              className={`grid grid-cols-1 md:grid-cols-2 gap-2 ${showReveal ? 'pointer-events-none' : ''}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ delay: 0.2 }}
                            >
                              {currentQuestion.options.map((option) => (
                                <button
                                  key={option.id}
                                  onClick={() => handleAnswer(option.id)}
                                  className={`text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 
                                             border border-white/5 hover:border-white/20 transition-all duration-300
                                             flex items-center gap-3 group h-full ${currentQuestion.options.length === 3 ? 'md:last:col-span-2 md:last:w-1/2 md:last:mx-auto' : ''}`}
                                >
                                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">{option.emoji}</span>
                                  <span className="text-sm text-white/90 font-light">{option.label}</span>
                                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </button>
                              ))}
                            </motion.div>
                          ) : (
                            <motion.div
                              key="reveal"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl"
                            >
                              <div className="flex items-start gap-3">
                                <div className="p-1.5 bg-emerald-500/20 rounded-lg shrink-0">
                                  <Check className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div>
                                  <h4 className="text-emerald-400 font-medium mb-0.5 text-sm">{selectedOption?.reveal.title}</h4>
                                  <p className="text-white/80 text-xs leading-relaxed">
                                    {selectedOption?.reveal.content}
                                  </p>
                                </div>
                              </div>
                              <motion.div
                                className="mt-3 h-1 bg-emerald-500/30 rounded-full overflow-hidden"
                              >
                                <motion.div
                                  className="h-full bg-emerald-500"
                                  initial={{ width: "0%" }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: selectedOption?.nextId === 'end' ? 2 : 4, ease: "linear" }}
                                />
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
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
                      <div
                        className={`pointer-events-auto mx-4 p-5 w-[260px] xs:w-[300px] min-h-[140px] flex flex-col justify-center rounded-xl backdrop-blur-xl bg-slate-900/90 border border-slate-700/50 shadow-2xl relative overflow-hidden transition-all duration-300`}
                        onMouseEnter={() => {
                          setIsCardHovered(true)
                          if (hideTimeoutRef.current) {
                            clearTimeout(hideTimeoutRef.current)
                            hideTimeoutRef.current = null
                          }
                        }}
                        onMouseLeave={() => {
                          setIsCardHovered(false)
                          // Use Ref to ensure we catch the updated state
                          // If answered, DO NOT AUTO-HIDE. Wait for manual dismiss or click-away.
                          if (inspectorQuizSelectionRef.current !== null) return

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

                        {/* DISMISS BUTTON */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            setActiveGear(null)
                          }}
                          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white transition-colors z-50 rounded-full hover:bg-white/10"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>

                        {/* QUIZ MODE */}
                        {activeGear.quiz && !inspectorQuizSelection ? (
                          <div className="space-y-3">
                            <p className="text-white text-sm font-medium leading-snug">
                              {activeGear.quiz.question}
                            </p>
                            <div className="space-y-2">
                              {activeGear.quiz.options.map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    // IMMEDIATE REF UPDATE: Prevent race condition where mouseleave fires before effect
                                    inspectorQuizSelectionRef.current = opt.id
                                    setInspectorQuizSelection(opt.id)
                                  }}
                                  className="w-full text-left text-xs p-2.5 rounded-lg bg-white/5 hover:bg-white/10 
                                             border border-white/5 hover:border-white/20 transition-all text-slate-300 hover:text-white
                                             flex items-center gap-2 group/btn"
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${opt.isCorrect ? 'bg-emerald-400' : 'bg-slate-500'} opacity-0 group-hover/btn:opacity-100 transition-opacity`} />
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="block text-left group">
                            {/* REVEAL / DEFAULT MODE */}
                            <div className="flex flex-col h-full justify-between gap-4">
                              {/* Content - NOT Clickable for nav, select text allowed */}
                              <div className="space-y-2 select-text cursor-auto">
                                {inspectorQuizSelection && activeGear.quiz && (
                                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400/90">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                                    {activeGear.quiz.reveal.title}
                                  </div>
                                )}
                                <p className="text-white/90 text-[14px] leading-relaxed font-medium">
                                  {inspectorQuizSelection && activeGear.quiz ? activeGear.quiz.reveal.content : activeGear.thought}
                                </p>
                              </div>

                              {/* CTA Link - CLICKABLE */}
                              <div
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  router.push(activeGear.link)
                                }}
                                className="group/cta flex items-center gap-2 text-xs font-semibold tracking-wide text-white/50 hover:text-white transition-colors cursor-pointer self-start py-1"
                              >
                                <span className="uppercase border-b border-transparent group-hover/cta:border-white/20 transition-all">
                                  {activeGear.linkLabel}
                                </span>
                                <ArrowRight className="w-3 h-3 transition-transform group-hover/cta:translate-x-0.5" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
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
        </div >

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
      </section >



      {/* Mobile Bottom Sheet for Gear Inspector */}
      <GearBottomSheet
        gear={mobileGear}
        isOpen={showMobileSheet}
        onClose={() => {
          setShowMobileSheet(false)
          setMobileGear(null)
        }
        }
      />
    </>
  )
}
