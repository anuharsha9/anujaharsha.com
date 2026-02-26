'use client'

import { motion, AnimatePresence, animate } from 'framer-motion'
import { useEffect, useRef, useState, useMemo, memo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import GearBottomSheet from '@/components/home/GearBottomSheet'
import { GEAR_INSPECTOR, GearInspectorItem } from '@/data/gear-inspector'
import { spacing } from '@/lib/design-system'
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
    statement: "The engineering wall.",
    question: "Engineering says a critical feature is 'too complex' to build. What's your move?",
    activeGear: 'gear-conflicting-teams',
    options: [
      {
        id: 'compromise', label: 'Simplify the design?', val: 'compromise', emoji: '📉', nextId: 'hire_2',
        reveal: {
          title: "Never.",
          content: "I don't dumb it down. I spin up an AI agent, 'vibe code' a working prototype, and hand engineering the solution, not a request."
        }
      },
      {
        id: 'build', label: 'Protype in code?', val: 'build', emoji: '🧑‍💻', nextId: 'hire_2',
        reveal: {
          title: "The Unblocker",
          content: "Exactly. I use AI to bridge the gap. I deliver a functional React component they can inspect, proving it's not just possible—it's ready."
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
    statement: "The build method.",
    question: "This portfolio feels custom. Did you write every line of code yourself?",
    activeGear: 'gear-motherhood',
    options: [
      {
        id: 'yes', label: 'Yes, hand-coded?', val: 'yes', emoji: '⌨️', nextId: 'hire_3',
        reveal: {
          title: "Better: I Orchestrated.",
          content: "I didn't type the syntax; I directed the system. I use AI agents to execute the code while I architect the logic. This is Vibe Coding."
        }
      },
      {
        id: 'ai', label: 'AI wrote it?', val: 'ai', emoji: '🤖', nextId: 'hire_3',
        reveal: {
          title: "I am the Architect.",
          content: "AI laid the bricks, but I drew the blueprints. I understand the system deeply, but I leverage agents to ship at 10x speed."
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
    statement: "The innovative edge.",
    question: "If AI handles the execution, where does the designer's value go?",
    activeGear: 'gear-life',
    options: [
      {
        id: 'pixels', label: 'Visual Polish?', val: 'pixels', emoji: '✨', nextId: 'end',
        reveal: {
          title: "Too small.",
          content: "Visuals are a commodity. The real value is System Architecture—designing the data flows and logic that make the AI useful."
        }
      },
      {
        id: 'systems', label: 'System Architecture?', val: 'systems', emoji: '🏗️', nextId: 'end',
        reveal: {
          title: "The New Standard",
          content: "Exactly. I stop pushing pixels and start connecting systems. I design the intelligence behind the interface."
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
    activeGear: 'gear-conflicting-teams',
    options: [
      {
        id: 'nocode', label: 'Is it No-Code?', val: 'nocode', emoji: '🎨', nextId: 'explore_2',
        reveal: {
          title: "It's All-Code.",
          content: "But I didn't write it manually. I used 'Vibe Coding'—orchestrating AI agents to build a custom Next.js application that scales."
        }
      },
      {
        id: 'code', label: 'You coded this?', val: 'code', emoji: '💻', nextId: 'explore_2',
        reveal: {
          title: "I Orchestrated It.",
          content: "I define the architecture and UX; AI agents handle the syntax. It allows me to build complex systems without getting lost in the weeds."
        }
      },
      {
        id: 'ai', label: 'Interactive AI?', val: 'ai', emoji: '🤖', nextId: 'explore_2',
        reveal: {
          title: "The Secret Weapon",
          content: "Exactly. I use a multi-agent workflow to build fast. I am the System Architect; the AI is my engineering team."
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
    activeGear: 'gear-motherhood',
    options: [
      {
        id: 'tools', label: 'Better UI Tools?', val: 'tools', emoji: '🖌️', nextId: 'explore_3',
        reveal: {
          title: "Tools Empower Us",
          content: "Figma is great, but code is the final canvas. I use AI to prototype in the browser, making the 'hand-off' obsolete."
        }
      },
      {
        id: 'systems', label: 'System Orchestration?', val: 'systems', emoji: '🧠', nextId: 'explore_3',
        reveal: {
          title: "The Architect",
          content: "As AI handles the pixels, designers must become System Architects. That's the playground I'm building in."
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
    question: "How do you make an interface feel this 'alive'?",
    activeGear: 'gear-life',
    options: [
      {
        id: 'motion', label: 'Is it the motion?', val: 'motion', emoji: '🌊', nextId: 'end',
        reveal: {
          title: "Physics, not Keyframes",
          content: "It's spring physics. I treat the UI as a physical object. I tell the AI the 'mass' and 'stiffness' I want, and it writes the math."
        }
      },
      {
        id: 'details', label: 'The micro-details?', val: 'details', emoji: '✨', nextId: 'end',
        reveal: {
          title: "The Polish",
          content: "God is in the details. I use AI to iterate on the small things—transitions, timing, haptics—that make a product feel premium."
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
const MAIN_GEAR_ROTATION_MIN_SECONDS = 42
const MAIN_GEAR_ROTATION_VARIANCE_SECONDS = 18
const BG_GEAR_ROTATION_MIN_SECONDS = 96
const BG_GEAR_ROTATION_VARIANCE_SECONDS = 44


// Static SVG container — renders baseSvg ONCE and never replaces it.
// All visual changes (dimming, lighting, rotation) are handled by the
// parent's useEffect via direct DOM manipulation. No flickering or shaking.
const GearsSvgContainer = memo(function GearsSvgContainer({
  svgContent,
  containerRef,
  offset
}: {
  svgContent: string
  containerRef: React.RefObject<HTMLDivElement | null>
  offset?: { x: number; y: number }
}) {
  // Freeze the SVG HTML on first non-empty render — never let React replace it.
  const svgHtmlRef = useRef<string | null>(null)
  if (svgHtmlRef.current === null && svgContent) {
    svgHtmlRef.current = svgContent
  }

  return (
    <div
      ref={containerRef}
      className="gears-dark-theme w-full"
      style={{
        willChange: 'transform',
        transform: `translate3d(${offset?.x ?? 0}px, ${offset?.y ?? 0}px, 0)`,
      }}
      dangerouslySetInnerHTML={{ __html: svgHtmlRef.current || '' }}
    />
  )
})

/**
 * ImmersiveBrainExperience - Brain Gear Quiz & Inspector
 * Full-viewport immersive brain SVG with quiz progression and gear lighting
 */
export default function ImmersiveBrainExperience({ forceQuiz = false }: { forceQuiz?: boolean }) {
  const router = useRouter()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const brainSceneRef = useRef<HTMLDivElement | null>(null)

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

  // CINEMATIC ENTRANCE STATE
  // waiting -> entrance (brain zooms out from 3.5x to 1x) -> complete
  const [cinematicPhase, setCinematicPhase] = useState<'waiting' | 'entrance' | 'complete'>('waiting')

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

  // 3D PARALLAX — ref-based to avoid re-renders
  const parallaxRef = useRef<HTMLDivElement>(null)
  const ambientLightRef = useRef<HTMLDivElement>(null)

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
  const currentActiveGearId = currentQuestion?.activeGear ?? null

  const selectedOption = useMemo(() =>
    currentQuestion?.options.find(o => o.id === selectedOptionId),
    [currentQuestion, selectedOptionId]
  )
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const linesDrawnRef = useRef(false)

  // Initialize: Default to HERO (complete), Quiz is Opt-In
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    // Allow forcing via URL/Prop
    if (forceQuiz || window.location.search.includes('force=quiz')) {
      // Always restart from question 1 when quiz mode is explicitly forced.
      setCurrentQuestionId('start')
      setLitGears([QUIZ_QUESTIONS_DATA['start'].activeGear])
      setShowReveal(false)
      setSelectedOptionId(null)
      setQuizState('quiz')
      setIsAppReady(true)
      return
    }

    // Default: Show Hero immediately
    setQuizState('complete')

    // Check session just to determine entrance animation
    const hasSession = localStorage.getItem(ENTRY_SESSION_KEY) === 'true'
    if (hasSession) {
      setShouldSkipEntrance(true)
      setCinematicPhase('complete')
      setIsAppReady(true) // Returning visitors: show immediately
    } else {
      // First-time visitor: wait for LoadingScreen to finish before starting brain entrance
      const handleAppReady = () => {
        setIsAppReady(true)
        setCinematicPhase('entrance')
        setTimeout(() => {
          setCinematicPhase('complete')
          // Mark session so they don't see loading again
          localStorage.setItem(ENTRY_SESSION_KEY, 'true')
        }, 3500)
      }

      window.addEventListener('app-ready', handleAppReady, { once: true })

      // Fail-safe: If app-ready doesn't fire within 500ms, force ready
      const fallbackTimeout = setTimeout(handleAppReady, 500)

      return () => {
        window.removeEventListener('app-ready', handleAppReady)
        clearTimeout(fallbackTimeout)
      }
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

  // -- SVG GENERATION --
  // Base SVG cleanup (Memoized once) — NO namespacing, NO dynamic class injection.
  // Classes for gear lighting are managed by the useEffect via DOM manipulation.
  const baseSvg = useMemo(() => {
    return BRAIN_GEARS_SVG
      .replace(/width=["'][^"']*["']/g, '')
      .replace(/height=["'][^"']*["']/g, '')
      .replace(/<svg/, '<svg style="width:100%;height:auto"')
  }, [])

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

    // Give user plenty of time to read the reveal — they can skip with the Continue button
    const delay = 10000 // 10s reading time for reveal

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
      // We check for both just in case, using namespaced IDs
      let brainGearsGroup = svgRoot.querySelector<SVGGElement>(`#brain-gears-copy`)
      if (!brainGearsGroup) {
        brainGearsGroup = svgRoot.querySelector<SVGGElement>(`#brain-gears`)
      }
      if (!brainGearsGroup) return

      const setupGearRotations = () => {
        // CRITICAL: During quiz/loading mode, CSS handles visibility via .gear-lit class
        // We should NOT force opacity or run animations until quiz is complete
        // Check for 'complete' instead of 'quiz' to also handle 'loading' state
        const shouldAnimate = quizState === 'complete'

        // If not complete (loading OR quiz), keep the brain dimmed and progressively
        // light gears as answers are selected. Also ensure any previous rotations stop.
        if (!shouldAnimate) {
          const mainGearsGroup = brainGearsGroup!.querySelector<SVGGElement>(`#main-gears`)
          const litSet = new Set(litGears)
          const activeQuestionGear = currentActiveGearId

          if (mainGearsGroup) {
            GEAR_IDS.forEach((gearId) => {
              const gear = mainGearsGroup.querySelector<SVGGElement>(`#${gearId}`)
              if (!gear) return

              // CSS already provides transform-origin, transform-box, and default opacity.
              // Only override opacity and filter for lit/active gears.
              const isLit = litSet.has(gearId)
              const isActive = activeQuestionGear === gearId

              if (isLit) {
                gear.style.setProperty('opacity', '1', 'important')
                gear.style.filter = 'drop-shadow(0 0 10px var(--overlay-teal-bright-70))'
              } else if (isActive) {
                gear.style.setProperty('opacity', '0.52', 'important')
                gear.style.filter = 'drop-shadow(0 0 6px var(--overlay-sky-45))'
              } else {
                gear.style.removeProperty('opacity')
                gear.style.filter = 'none'
              }

              // Lit gears rotate slowly during quiz for visual feedback
              const existingAnims = gear.getAnimations()
              if (isLit && existingAnims.length === 0) {
                const isClockwise = Math.random() > 0.5
                gear.animate([
                  { transform: 'rotate(0deg)' },
                  { transform: `rotate(${isClockwise ? '360deg' : '-360deg'})` }
                ], {
                  duration: 60000,
                  iterations: Infinity
                })
              } else if (!isLit) {
                existingAnims.forEach((anim) => anim.cancel())
                gear.style.transform = 'rotate(0deg)'
              }
            })
          }

          const bgGears = Array.from(brainGearsGroup!.querySelectorAll<SVGGElement>(`[id*="bg-gear-"]`))
          bgGears.forEach((gear) => {
            const isLit = litSet.has(gear.id)

            if (isLit) {
              gear.style.setProperty('opacity', '0.9', 'important')
              gear.style.filter = 'drop-shadow(0 0 8px var(--overlay-teal-45))'
            } else {
              gear.style.removeProperty('opacity')
              gear.style.filter = 'none'
            }

            const existingAnims = gear.getAnimations()
            if (isLit && existingAnims.length === 0) {
              const isClockwise = Math.random() > 0.5
              gear.animate([
                { transform: 'rotate(0deg)' },
                { transform: `rotate(${isClockwise ? '360deg' : '-360deg'})` }
              ], {
                duration: 90000,
                iterations: Infinity
              })
            } else if (!isLit) {
              existingAnims.forEach((anim) => anim.cancel())
              gear.style.transform = 'rotate(0deg)'
            }
          })

          // Hide lines-background during loading/quiz
          const linesBackground = brainGearsGroup!.querySelector<SVGGElement>(`#lines-background`)
          if (linesBackground) linesBackground.style.display = 'none'
          const linesBackgroundCopy = brainGearsGroup!.querySelector<SVGGElement>(`#lines-background-copy`)
          if (linesBackgroundCopy) linesBackgroundCopy.style.display = 'none'

          return
        }

        // Quiz is complete - now run full animation setup
        const fadeInDuration = shouldSkipEntrance ? 0 : 1.2

        // New structure: gears are direct children of #main-gears with namespaced IDs
        const mainGearsGroup = brainGearsGroup!.querySelector<SVGGElement>(`#main-gears`)
        if (!mainGearsGroup) return

        GEAR_IDS.forEach((gearId) => {
          // The gear group IS the gear itself now (not a container with gear-base inside)
          const gear = mainGearsGroup.querySelector<SVGGElement>(`#${gearId}`)
          if (!gear) return

          // CRITICAL: Set opacity immediately to prevent flicker when brain-entry-container is removed.
          // Without this, gears flash from lit state (opacity 1) → CSS base (opacity 0) → animate back to 1
          gear.style.setProperty('opacity', '1', 'important')
          // Remove quiz-phase glow — glow should only appear on hover in complete state
          gear.style.filter = 'none'

          const isClockwise = Math.random() > 0.5
          const mainRotationDuration = MAIN_GEAR_ROTATION_MIN_SECONDS + Math.random() * MAIN_GEAR_ROTATION_VARIANCE_SECONDS // main gears rotate at a calmer speed (42-60s / turn)
          const fadeInRotationAmount = (360 / mainRotationDuration) * fadeInDuration * (isClockwise ? 1 : -1)
          const rotationAmountValue = isClockwise ? '360deg' : '-360deg'

          gear.style.setProperty('--fade-in-rotation', `${fadeInRotationAmount}deg`)
          gear.style.setProperty('--rotation-duration', `${mainRotationDuration}s`)
          gear.style.setProperty('--rotation-amount', rotationAmountValue)

          gear.animate([
            { transform: 'rotate(0deg)' },
            { transform: `rotate(${rotationAmountValue})` }
          ], {
            duration: mainRotationDuration * 1000,
            iterations: Infinity
          })

          gear.style.transformOrigin = 'center'
          gear.style.transformBox = 'fill-box'
        })

        const bgGears = Array.from(brainGearsGroup!.querySelectorAll<SVGGElement>(`[id*="bg-gear-"]`))
        bgGears.forEach((gear) => {
          // CRITICAL: Set opacity immediately to prevent flicker (same as main gears)
          gear.style.setProperty('opacity', '1', 'important')
          gear.style.filter = 'none'

          const isClockwise = Math.random() > 0.5
          const bgRotationDuration = BG_GEAR_ROTATION_MIN_SECONDS + Math.random() * BG_GEAR_ROTATION_VARIANCE_SECONDS // background gears rotate slower (96-140s / turn)
          const fadeInRotationAmount = (360 / bgRotationDuration) * fadeInDuration * (isClockwise ? 1 : -1)
          const bgRotationAmountValue = isClockwise ? '360deg' : '-360deg'

          gear.style.setProperty('--fade-in-rotation', `${fadeInRotationAmount}deg`)
          gear.style.setProperty('--rotation-duration', `${bgRotationDuration}s`)
          gear.style.setProperty('--rotation-amount', bgRotationAmountValue)

          // Background gears rotate
          gear.animate([
            { transform: 'rotate(0deg)' },
            { transform: `rotate(${bgRotationAmountValue})` }
          ], {
            duration: bgRotationDuration * 1000,
            iterations: Infinity
          })
        })
      }

      // transform-origin and transform-box are now handled by CSS.
      // See .gears-dark-theme rules in globals.css.


      const setupLineDrawing = () => {
        const linesBackground = brainGearsGroup!.querySelector<SVGGElement>(`#lines-background`)
        if (!linesBackground) return

        // CRITICAL: Reset display and opacity from quiz mode
        linesBackground.style.display = ''
        linesBackground.style.opacity = '1'

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
        const mainGearsGroup = brainGearsGroup!.querySelector<SVGGElement>(`#main-gears`)
        if (!mainGearsGroup) return () => { }

        const resetOverlayVisual = (gearNode: SVGGElement) => {
          const overlay = gearNode.querySelector<SVGCircleElement>('.gear-hover-overlay')
          if (!overlay) return
          overlay.setAttribute('stroke', 'none')
          overlay.setAttribute('stroke-width', '0')
          overlay.setAttribute('fill', 'transparent')
          overlay.style.filter = 'none'
        }

        const clearGearHoverVisual = (gearNode: SVGGElement) => {
          gearNode.classList.remove('gear-main--active')
          gearNode.style.removeProperty('--gear-accent')
          gearNode.style.filter = 'none'
          resetOverlayVisual(gearNode)
        }

        const applyGearHoverVisual = (gearNode: SVGGElement, accentColor: string) => {
          gearNode.classList.add('gear-main--active')
          gearNode.style.setProperty('--gear-accent', accentColor)
          gearNode.style.filter = `drop-shadow(0 0 10px ${accentColor}90) drop-shadow(0 0 24px ${accentColor}50)`
          // No stroke ring — just glow
        }

        const clearAllActiveGears = (exceptId?: string) => {
          const allActiveGears = brainGearsGroup!.querySelectorAll<SVGGElement>('.gear-main--active')
          allActiveGears.forEach((activeGear) => {
            if (exceptId && activeGear.id === exceptId) return
            clearGearHoverVisual(activeGear)
          })
        }

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

            clearAllActiveGears(gearId)
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

              applyGearHoverVisual(gearGroup, gearData.accentColor)

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
            clearGearHoverVisual(gearGroup)
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
              clearAllActiveGears()
              applyGearHoverVisual(gearGroup, gearData.accentColor)
            } else {
              // Desktop: Toggle behavior (fallback for click)
              const isCurrentlyActive = gearGroup.classList.contains('gear-main--active')

              clearAllActiveGears()

              if (!isCurrentlyActive) {
                applyGearHoverVisual(gearGroup, gearData.accentColor)
                setActiveGear(gearData)
                setHasInteracted(true)
              } else {
                clearGearHoverVisual(gearGroup)
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

      setupGearRotations()

      // Only run line animation if quiz is complete, and only once
      if (quizState === 'complete' && !linesDrawnRef.current) {
        linesDrawnRef.current = true
        setupLineDrawing()
      } else if (quizState !== 'complete') {
        // Ensure lines are completely hidden during quiz
        linesDrawnRef.current = false
        const linesBg = brainGearsGroup!.querySelector<SVGGElement>(`#lines-background`)
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
  }, [router, isAppReady, shouldSkipEntrance, quizState, litGears, currentQuestionId, currentActiveGearId, baseSvg])

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
              ; (gear as HTMLElement).style.filter = 'none'
            const activeOverlay = gear.querySelector<SVGCircleElement>('.gear-hover-overlay')
            if (activeOverlay) {
              activeOverlay.setAttribute('stroke', 'none')
              activeOverlay.setAttribute('stroke-width', '0')
              activeOverlay.setAttribute('fill', 'transparent')
              activeOverlay.style.filter = 'none'
            }
          })
        }
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [activeGear])

  // Hide header during immersive brain (quiz + post-quiz complete with progress)
  useEffect(() => {
    const isImmersive = quizState === 'quiz' || (quizState === 'complete' && litGears.length > 0)
    if (isImmersive) {
      const style = document.createElement('style')
      style.id = 'hide-header-style'
      style.innerHTML = 'header { display: none !important; }'
      document.head.appendChild(style)
      return () => {
        const el = document.getElementById('hide-header-style')
        if (el) el.remove()
      }
    }
  }, [quizState, litGears.length])

  // Neural Mainframe: track brain hover for glitch trigger
  const [brainHovered, setBrainHovered] = useState(false)
  const hasQuizProgress = litGears.length > 0
  const showImmersiveCompleteState = quizState === 'complete' && hasQuizProgress
  const showImmersiveBrain = quizState === 'quiz' || showImmersiveCompleteState
  const showStartPrompt = !showImmersiveBrain && !forceQuiz



  // 3D PARALLAX — mouse tracking via direct DOM manipulation (no re-renders)
  useEffect(() => {
    if (!showImmersiveBrain && !forceQuiz) return
    const el = parallaxRef.current
    const lightEl = ambientLightRef.current
    if (!el) return

    let rafId: number
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const midX = window.innerWidth / 2
      const midY = window.innerHeight / 2
      // Normalize to -1..1
      targetX = (e.clientX - midX) / midX
      targetY = (e.clientY - midY) / midY
    }

    const tick = () => {
      // Smooth lerp (easing = 0.06 for buttery feel)
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06

      const rotateY = currentX * 2.5  // max ±2.5 degrees
      const rotateX = -currentY * 2   // max ±2 degrees (inverted for natural feel)

      el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

      // Shift ambient light position slightly with mouse
      if (lightEl) {
        const lightX = 50 + currentX * 8  // shift 8% max
        const lightY = 45 + currentY * 6  // shift 6% max
        lightEl.style.background = `radial-gradient(ellipse 55% 50% at ${lightX}% ${lightY}%, rgba(11, 162, 181, 0.07) 0%, rgba(11, 162, 181, 0.03) 30%, transparent 70%)`
      }

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
      if (el) el.style.transform = ''
    }
  }, [showImmersiveBrain, forceQuiz])

  return (
    <>
      {/* Brain content — fills the CinematicTimeline slide container */}
      <div className="absolute inset-0 flex flex-col overflow-hidden">

        {/* === 3D DEPTH ENVIRONMENT (post-quiz only) === */}
        {showImmersiveCompleteState && (
          <>
            {/* Overhead ambient light — soft teal glow from above */}
            <div
              ref={ambientLightRef}
              className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-[2000ms]"
              style={{
                background: 'radial-gradient(ellipse 65% 45% at 50% 25%, rgba(11, 162, 181, 0.10) 0%, rgba(11, 162, 181, 0.04) 40%, transparent 70%)',
              }}
            />

            {/* Ground plane — visible studio floor with clear horizon */}
            <div
              className="absolute inset-0 pointer-events-none z-[9] transition-opacity duration-[2000ms]"
              style={{
                background: `
                  linear-gradient(to bottom,
                    transparent 0%,
                    transparent 35%,
                    rgba(18, 24, 33, 0.45) 48%,
                    rgba(28, 36, 50, 0.7) 58%,
                    rgba(38, 48, 65, 0.75) 68%,
                    rgba(45, 55, 72, 0.65) 78%,
                    rgba(38, 48, 65, 0.5) 90%,
                    rgba(30, 38, 52, 0.35) 100%
                  )
                `,
              }}
            />

            {/* Specular floor highlight — light reflection on the surface */}
            <div
              className="absolute pointer-events-none z-[10]"
              style={{
                left: '50%',
                bottom: '14%',
                transform: 'translateX(-50%)',
                width: '45%',
                height: '18%',
                background: 'radial-gradient(ellipse 100% 60% at 50% 30%, rgba(120, 145, 175, 0.08) 0%, transparent 70%)',
              }}
            />

            {/* Floor shadow — large soft contact shadow beneath the brain */}
            <div
              className="absolute pointer-events-none z-[11]"
              style={{
                left: '50%',
                bottom: '14%',
                transform: 'translateX(-50%)',
                width: '55%',
                height: '4%',
                background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.35) 40%, transparent 70%)',
                filter: 'blur(28px)',
              }}
            />
          </>
        )}

        {/* Subtle grid background */}
        {quizState !== 'quiz' && (
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(var(--overlay-white-08) 1px, transparent 1px),
                linear-gradient(90deg, var(--overlay-white-08) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)',
            }}
          />
        )}



        {/* === BRAIN LAYER === */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className={`${spacing.containerFull} relative flex-1 flex flex-col items-center justify-center`}>
            {/* Desktop wrapper to handle hover for both Brain and CTA safely */}
            <div
              ref={brainSceneRef}
              className={`w-full flex-1 flex flex-col items-center justify-center relative ${showImmersiveBrain ? 'pt-0 pb-0' : 'pt-8 pb-16'}`}
              onMouseEnter={() => setBrainHovered(true)}
              onMouseLeave={() => setBrainHovered(false)}
            >

              {/* Centered Gears - THE HERO (with 3D parallax wrapper) */}
              <div
                ref={parallaxRef}
                className={`relative w-full mx-auto flex items-center justify-center transition-[max-width,max-height,margin,padding,filter] duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${quizState === 'quiz'
                  ? 'max-w-[360px] sm:max-w-[460px] md:max-w-[620px] lg:max-w-[760px] xl:max-w-[840px] max-h-[62vh] sm:max-h-[70vh] lg:max-h-[82vh] mt-0 brain-entry-container'
                  : showImmersiveCompleteState
                    ? 'max-w-[520px] sm:max-w-[640px] md:max-w-[860px] lg:max-w-[1040px] xl:max-w-[1160px] max-h-[74vh] sm:max-h-[80vh] lg:max-h-[88vh] mt-0'
                    : 'max-w-[150px] sm:max-w-[170px] md:max-w-[250px] lg:max-w-[290px] xl:max-w-[320px] max-h-[30vh] sm:max-h-[35vh] lg:max-h-[40vh] mt-0'
                  }`}
                style={{
                  transformOrigin: 'center center',
                  willChange: 'transform',
                  filter: showImmersiveCompleteState
                    ? 'drop-shadow(0 40px 60px rgba(0, 0, 0, 0.5)) drop-shadow(0 15px 25px rgba(0, 0, 0, 0.3))'
                    : 'none',
                }}
              >
                <GearsSvgContainer
                  svgContent={baseSvg}
                  containerRef={containerRef}
                />

                {/* === QUIZ CARD OVERLAY === */}
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
                                <div className="mt-3 flex items-center gap-3">
                                  <motion.div
                                    className="flex-1 h-1 bg-emerald-500/30 rounded-full overflow-hidden"
                                  >
                                    <motion.div
                                      className="h-full bg-emerald-500"
                                      initial={{ width: "0%" }}
                                      animate={{ width: "100%" }}
                                      transition={{ duration: 10, ease: "linear" }}
                                    />
                                  </motion.div>
                                  <button
                                    onClick={handleContinue}
                                    className="text-emerald-400/70 hover:text-emerald-400 text-xs font-medium tracking-wide uppercase flex items-center gap-1 transition-colors duration-200 bg-transparent border-none cursor-pointer shrink-0"
                                  >
                                    Continue
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Center CTA — "Explore My Mind" button positioned naturally below the brain */}
                <AnimatePresence mode="wait">
                  {!activeGear && quizState !== 'quiz' && showStartPrompt && (
                    <motion.div
                      className="relative flex flex-col items-center justify-center z-10 pointer-events-none mt-4 sm:mt-8 w-[320px]"
                      initial={{ opacity: 0, filter: 'blur(12px)' }}
                      animate={{
                        opacity: cinematicPhase === 'complete' || shouldSkipEntrance ? 1 : 0,
                        filter: cinematicPhase === 'complete' || shouldSkipEntrance ? 'blur(0px)' : 'blur(12px)',
                      }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
                    >
                      <div className="text-center px-4 w-full">
                        <button
                          onClick={startQuiz}
                          className={`group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 
                            rounded-full font-medium tracking-wide text-sm sm:text-base cursor-pointer pointer-events-auto
                            transition-all duration-500
                            ${brainHovered
                              ? 'bg-white/[0.12] backdrop-blur-md border border-white/[0.25] text-white shadow-[0_0_50px_var(--overlay-teal-core-30)] scale-100 translate-y-0'
                              : 'bg-transparent border border-white/0 text-white/50 scale-95 hover:text-white/80'}`}
                        >
                          <Brain className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 ${brainHovered ? 'opacity-100 scale-110' : 'opacity-50'}`} />
                          <span>Explore My Mind</span>
                          <Sparkles className={`w-3.5 h-3.5 transition-all duration-500 -ml-1 ${brainHovered ? 'opacity-60' : 'opacity-0 -translate-x-2'}`} />
                        </button>
                        {quizState === 'complete' && (
                          <p className={`mt-5 text-slate-500 text-[11px] sm:text-xs font-mono uppercase tracking-[0.15em] transition-all duration-500 ${brainHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                            <span className="hidden lg:inline">Hover on the gears to discover more</span>
                            <span className="lg:hidden">Tap on the gears to discover more</span>
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div> {/* Closing tag for the main brain div */}

              <AnimatePresence mode="wait">
                {!activeGear && showImmersiveCompleteState && (
                  <motion.div
                    key="immersive-hover-hint"
                    className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                    initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mx-auto w-[min(94vw,38rem)] px-4 text-center">
                      <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-cyan-300/80 sm:text-xs">
                        Hover To Reveal
                      </p>
                      <p className="mt-2 text-sm text-white/80 sm:text-base">
                        What&apos;s going on in my brain.
                      </p>
                      <p className="mt-1 text-[11px] text-white/45 sm:hidden">
                        Tap the gears on mobile
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div> {/* END desktop wrapper */}

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
                      className="h-px bg-slate-600 shadow-[0_0_8px_var(--overlay-white-50)]"
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

                      {/* PERSONALITY INSIGHT MODE */}
                      <div className="block text-left group">
                        <div className="flex flex-col h-full justify-between gap-4">
                          {/* Insight Content */}
                          <div className="space-y-2 select-text cursor-auto">
                            <p className="text-white/90 text-[14px] leading-relaxed font-medium">
                              {activeGear.thought}
                            </p>
                          </div>


                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
      {/* === END BRAIN LAYER === */}

      {/* Scroll indicator */}
      {!forceQuiz && !showImmersiveBrain && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[11px] font-mono uppercase tracking-[0.2em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-5 h-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      )}

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
