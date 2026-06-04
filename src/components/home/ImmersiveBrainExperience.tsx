'use client'

import { motion, AnimatePresence, animate } from 'framer-motion'
import { useEffect, useRef, useState, useMemo, memo, useCallback } from 'react'
import { useTransition } from '@/components/transitions/TransitionContext'
import GearBottomSheet from '@/components/home/GearBottomSheet'
import { GEAR_INSPECTOR, GearInspectorItem } from '@/data/gear-inspector'
import { spacing } from '@/lib/design-system'
import { BRAIN_GEARS_SVG } from '@/data/brain-gears-svg'
import { ArrowRight, Sparkles, Brain, Check } from 'lucide-react'
import dynamic from 'next/dynamic'

const ThreeBrainGears = dynamic(() => import('./ThreeBrainGears'), { ssr: false })

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
    question: "Are you hiring, or just browsing?",
    activeGear: 'gear-scattered-workflows',
    options: [
      {
        id: 'hiring', label: 'I\'m hiring a designer', val: 'hiring', emoji: '🤝', nextId: 'hire_1',
        reveal: {
          title: "Let's Talk Business.",
          content: "Great — I've spent 13 years solving enterprise problems. Let me show you how I think."
        }
      },
      {
        id: 'browsing', label: 'Just browsing for inspiration', val: 'browsing', emoji: '🔭', nextId: 'explore_1',
        reveal: {
          title: "Welcome, Explorer.",
          content: "Pull up a chair. Let me show you what 13 years of obsessive craft looks like under the hood."
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
    statement: "Thriving in ambiguity.",
    question: "I just got dropped into a project — no brief, conflicting priorities, 6 weeks. What do you think I'm supposed to do first?",
    activeGear: 'gear-conflicting-teams',
    options: [
      {
        id: 'listen', label: 'Talk to everyone involved', val: 'listen', emoji: '🎧', nextId: 'hire_2',
        reveal: {
          title: "Listen First, Always.",
          content: "13 years taught me that the brief is never the real problem. I spend the first week just listening — to stakeholders, to customers, to the engineers who've been living with the system. The real priorities surface when people feel heard."
        }
      },
      {
        id: 'define', label: 'Define the problem myself', val: 'define', emoji: '✏️', nextId: 'hire_2',
        reveal: {
          title: "Create Clarity, Don't Wait For It.",
          content: "Ambiguity is where senior designers earn their keep. I write the brief nobody wrote, circulate it, and let people react. It's easier to align a team around something tangible — even if it's wrong — than to wait for perfect clarity that never comes."
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
    statement: "Reader of rooms.",
    question: "A key stakeholder keeps changing direction and my team is frustrated. What do you think I should do?",
    activeGear: 'gear-motherhood',
    options: [
      {
        id: 'empathy', label: 'Understand what\'s driving it', val: 'empathy', emoji: '💬', nextId: 'hire_3',
        reveal: {
          title: "Empathy Before Confrontation.",
          content: "They're not indecisive — they're scared. After 13 years I've learned that changing direction usually means someone's under pressure they can't articulate. I go private, ask what's really driving the shifts, and help them find their actual constraint."
        }
      },
      {
        id: 'shield', label: 'Protect the team from the noise', val: 'shield', emoji: '🛡️', nextId: 'hire_3',
        reveal: {
          title: "The Human Shield.",
          content: "Absolutely. I absorb the chaos so the team can build. But I don't just shield — I translate. I take the shifting signals, find the pattern, and give the team a stable target. That's the job nobody writes in the job description, but it's the one that ships products."
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
    statement: "Measuring what matters.",
    question: "My VP asks: 'How do we know design is actually working?' What do you think I'm expected to say?",
    activeGear: 'gear-life',
    options: [
      {
        id: 'outcomes', label: 'Customer outcomes, not output', val: 'outcomes', emoji: '📈', nextId: 'end',
        reveal: {
          title: "Impact Over Artifacts.",
          content: "I stopped counting screens years ago. I track: Are customers staying? Are support costs dropping? Are engineers shipping faster because the specs are clearer? Design's value is measured by the problems that stop happening."
        }
      },
      {
        id: 'contrast', label: 'Show them the before and after', val: 'contrast', emoji: '🪞', nextId: 'end',
        reveal: {
          title: "Make the Invisible Visible.",
          content: "Leadership can't feel the difference — you have to show them. I document the chaos we inherited and the clarity we created. Not in a pitch deck — in side-by-side comparisons that make it undeniable. The story sells itself when the contrast is real."
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
    statement: "Curiosity & depth.",
    question: "I'm handed a brief that says 'redesign the settings page.' What do you think I'm supposed to do with that?",
    activeGear: 'gear-conflicting-teams',
    options: [
      {
        id: 'dig', label: 'Question the task itself', val: 'dig', emoji: '🔍', nextId: 'explore_2',
        reveal: {
          title: "The Task is Never the Task.",
          content: "Why are people in the settings page? What broke that sent them there? Most 'redesign X' requests are symptoms. The real problem is three levels deeper — and solving it usually means the settings page becomes unnecessary."
        }
      },
      {
        id: 'ship', label: 'Ship it and move on', val: 'ship', emoji: '⚡', nextId: 'explore_2',
        reveal: {
          title: "Sometimes, Yes. But Rarely.",
          content: "I can ship fast when speed matters. But I'll always do a 30-minute investigation first. In 13 years, that small investment has saved me from building the wrong thing more times than I can count. Curiosity isn't slow — it's efficient."
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
    statement: "The obsession.",
    question: "We shipped. It works. But I'm still thinking about it at 11pm. Why do you think that is?",
    activeGear: 'gear-motherhood',
    options: [
      {
        id: 'feel', label: 'Because something feels off', val: 'feel', emoji: '🌙', nextId: 'explore_3',
        reveal: {
          title: "I Can't Unsee It.",
          content: "There's a gap between 'works' and 'feels inevitable.' I live in that gap. It's the animation that's 100ms too slow. The label that makes you think for half a second. Users feel it even when they can't name it — and so do I."
        }
      },
      {
        id: 'great', label: 'Because you want it to be great', val: 'great', emoji: '✨', nextId: 'explore_3',
        reveal: {
          title: "Good Enough Never Was.",
          content: "My bar isn't perfection — it's 'would I be proud to show this to someone I respect?' After 13 years, I've learned that this obsession compounds. 50 tiny improvements become the reason someone says 'this product just feels different.'"
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
    statement: "Collaboration under tension.",
    question: "An engineer tells me my design will take 3 sprints. I have 1. What do you think I'm supposed to do?",
    activeGear: 'gear-life',
    options: [
      {
        id: 'together', label: 'Find the 80/20 together', val: 'together', emoji: '🤝', nextId: 'end',
        reveal: {
          title: "We're on the Same Team.",
          content: "I sit with them, not across from them. I ask 'what's expensive?' and we usually find that 80% of the experience can ship in 20% of the effort. The remaining 20% goes to v2. That conversation builds trust that lasts beyond the sprint."
        }
      },
      {
        id: 'prototype', label: 'Prototype it to prove it\'s possible', val: 'prototype', emoji: '🛠️', nextId: 'end',
        reveal: {
          title: "Bridge the Gap.",
          content: "Sometimes the best argument is a working thing. I've built functional prototypes to show engineers that the 'complex' interaction is actually 40 lines of code. Not to prove them wrong — to remove the uncertainty."
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
  const { navigateTo } = useTransition()

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

        const durationPerLine = 12000
        const initialDelay = 500

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
                  } else {
                    path.style.opacity = '0.4'
                    path.setAttribute('opacity', '0.4')
                    path.style.transition = 'opacity 2s ease'
                  }
                } catch {
                  // Fallback if browser doesn't support getTotalLength
                  path.style.opacity = '0.4'
                  path.setAttribute('opacity', '0.4')
                  path.style.transition = 'opacity 2s ease'
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
              navigateTo(gearData.link)
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
  }, [isAppReady, shouldSkipEntrance, quizState, litGears, currentQuestionId, currentActiveGearId, baseSvg, navigateTo])

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
      <div className={`absolute inset-0 flex flex-col ${quizState === 'quiz' ? 'overflow-visible' : 'overflow-hidden'}`}>

        {/* === 3D DEPTH ENVIRONMENT (post-quiz only) === */}
        {showImmersiveCompleteState && (
          <>
            {/* Cyclorama studio background — lights warming up */}
            <div
              ref={ambientLightRef}
              className="absolute inset-0 pointer-events-none z-[8] studio-lights-on"
              style={{
                background: `
                  radial-gradient(ellipse 85% 55% at 50% 100%, rgba(55, 68, 88, 0.95) 0%, rgba(38, 48, 65, 0.55) 40%, transparent 70%),
                  radial-gradient(ellipse 60% 35% at 50% 10%, rgba(11, 162, 181, 0.14) 0%, transparent 70%),
                  linear-gradient(to bottom, 
                    rgba(8, 12, 20, 1) 0%, 
                    rgba(12, 18, 28, 1) 28%,
                    rgba(20, 28, 42, 1) 52%,
                    rgba(32, 42, 58, 1) 68%,
                    rgba(42, 55, 72, 1) 80%,
                    rgba(38, 50, 68, 1) 90%,
                    rgba(32, 42, 58, 1) 100%
                  )
                `,
              }}
            />

            {/* Contact shadow — fades in after the lights */}
            <div
              className="absolute pointer-events-none z-[11] studio-shadow-on"
              style={{
                left: '50%',
                bottom: '10%',
                transform: 'translateX(-50%)',
                width: '42%',
                height: '1.5%',
                background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 15%, rgba(0, 0, 0, 0.4) 35%, rgba(0, 0, 0, 0.15) 55%, rgba(0, 0, 0, 0.04) 70%, transparent 82%)',
                filter: 'blur(10px)',
              }}
            />
          </>
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
                className={`relative w-full mx-auto flex items-center justify-center transition-[max-width,max-height,margin,padding] duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${quizState === 'quiz' || showImmersiveCompleteState
                  ? 'max-w-[520px] sm:max-w-[640px] md:max-w-[860px] lg:max-w-[1040px] xl:max-w-[1160px] max-h-[74vh] sm:max-h-[80vh] lg:max-h-[88vh] mt-0 ' + (quizState === 'quiz' ? 'brain-entry-container' : 'brain-floating')
                  : 'max-w-[150px] sm:max-w-[170px] md:max-w-[250px] lg:max-w-[290px] xl:max-w-[320px] max-h-[30vh] sm:max-h-[35vh] lg:max-h-[40vh] mt-0'
                  }`}
                style={{
                  transformOrigin: 'center center',
                  willChange: 'transform',
                }}
              >
                {/* Beautiful gradient shadow background to make the brain appear floating */}
                <div
                  className="absolute pointer-events-none transition-opacity duration-1000 ease-in-out"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%',
                    height: '120%',
                    opacity: showImmersiveCompleteState ? 1 : 0,
                    background: 'radial-gradient(ellipse 65% 45% at 50% 40%, rgba(11, 162, 181, 0.12) 0%, rgba(11, 162, 181, 0.04) 40%, transparent 70%)',
                    zIndex: 0
                  }}
                />

                <div 
                  className="w-full relative transition-[filter] duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-10 pointer-events-auto"
                  style={{
                    filter: showImmersiveCompleteState
                      ? 'drop-shadow(0 40px 60px rgba(0, 0, 0, 0.5)) drop-shadow(0 15px 25px rgba(0, 0, 0, 0.3)) drop-shadow(0 -5px 15px rgba(255, 255, 255, 0.05))'
                      : 'none',
                  }}
                >
                  <GearsSvgContainer
                    svgContent={baseSvg}
                    containerRef={containerRef}
                  />
                </div>

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
                      <div className="text-white bg-black/50 backdrop-blur-xl border border-white/15 p-5 md:p-6 rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.5),0_0_1px_rgba(255,255,255,0.1)] max-w-[420px] w-[90vw] relative overflow-hidden">

                        {/* Teal accent top border */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-teal)] to-transparent opacity-60" />

                        <motion.div
                          key={`statement-${currentQuestionId}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="mb-5 text-center"
                        >
                          <h3 className="text-lg md:text-xl font-light text-zinc-100 leading-snug tracking-tight">
                            {currentQuestion.question}
                          </h3>
                        </motion.div>

                        <div className="space-y-3">
                          <AnimatePresence mode="wait">
                            {!showReveal ? (
                              <motion.div
                                key={`options-${currentQuestionId}`}
                                className={`grid grid-cols-1 md:grid-cols-2 gap-2.5 ${showReveal ? 'pointer-events-none' : ''}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: 0.2 }}
                              >
                                {currentQuestion.options.map((option) => (
                                  <button
                                    key={option.id}
                                    onClick={() => handleAnswer(option.id)}
                                    className={`text-left p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] 
                                           border border-white/[0.08] hover:border-[var(--accent-teal)]/30 transition-all duration-300
                                           flex items-center gap-3 group h-full hover:shadow-[0_0_20px_rgba(11,162,181,0.08)] ${currentQuestion.options.length === 3 ? 'md:last:col-span-2 md:last:w-1/2 md:last:mx-auto' : ''}`}
                                  >
                                    <span className="text-base group-hover:scale-110 transition-transform duration-300">{option.emoji}</span>
                                    <span className="text-xs md:text-sm text-zinc-100 font-light">{option.label}</span>
                                    <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300 text-[var(--accent-teal)]" />
                                  </button>
                                ))}
                              </motion.div>
                            ) : (
                              <motion.div
                                key="reveal"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl mt-2"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="p-2 bg-emerald-500/20 rounded-xl shrink-0 mt-0.5">
                                    <Check className="w-5 h-5 text-emerald-400" />
                                  </div>
                                  <div>
                                    <h4 className="text-emerald-400 font-medium mb-1 text-sm md:text-base tracking-tight">
                                      {selectedOption?.reveal.title}
                                    </h4>
                                    <p className="text-zinc-100 text-xs md:text-sm leading-relaxed font-light">
                                      {selectedOption?.reveal.content}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-5 flex items-center gap-4">
                                  <motion.div
                                    className="flex-1 h-1 bg-emerald-500/20 rounded-full overflow-hidden"
                                  >
                                    <motion.div
                                      className="h-full bg-emerald-500/80"
                                      initial={{ width: "0%" }}
                                      animate={{ width: "100%" }}
                                      transition={{ duration: 10, ease: "linear" }}
                                    />
                                  </motion.div>
                                  <button
                                    onClick={handleContinue}
                                    aria-label="Continue to next question"
                                    className="text-emerald-400/80 hover:text-emerald-300 text-xs sm:text-sm font-medium tracking-wider uppercase flex items-center gap-1.5 transition-colors duration-200 bg-transparent border-none cursor-pointer shrink-0"
                                  >
                                    Continue
                                    <ArrowRight className="w-3.5 h-3.5" />
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
                              : 'bg-transparent border border-white/0 text-zinc-500 scale-95 hover:text-zinc-200'}`}
                        >
                          <Brain className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 ${brainHovered ? 'opacity-100 scale-110' : 'opacity-50'}`} />
                          <span>Explore My Mind</span>
                          <Sparkles className={`w-3.5 h-3.5 transition-all duration-500 -ml-1 ${brainHovered ? 'opacity-60' : 'opacity-0 -translate-x-2'}`} />
                        </button>
                        {quizState === 'complete' && (
                          <p className={`mt-5 text-zinc-500 text-[11px] sm:text-xs font-mono uppercase tracking-[0.15em] transition-all duration-500 ${brainHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
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
                      <p className="mt-2 text-sm text-zinc-200 sm:text-base">
                        What&apos;s going on in my brain.
                      </p>
                      <p className="mt-1 text-[11px] text-zinc-500 sm:hidden">
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
                  className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.92, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* The Cinematic Popover Card */}
                  <div
                    className="pointer-events-auto p-6 w-[260px] xs:w-[300px] min-h-[100px] flex flex-col justify-center rounded-2xl backdrop-blur-2xl bg-[#031016]/40 shadow-[0_0_40px_-5px_rgba(45,212,191,0.15),inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden transition-all duration-300"
                    data-gear-card
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
                    {/* Glassmorphic inner border */}
                    <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none mix-blend-overlay" />
                    
                    {/* Clean Minimal Accent line on the left side to elegantly ground the content */}
                    <div 
                      className="absolute top-4 bottom-4 left-0 w-[3px] rounded-r-full opacity-80"
                      style={{
                        backgroundColor: activeGear.accentColor,
                        boxShadow: `0 0 10px ${activeGear.accentColor}`
                      }}
                    />

                    {/* DISMISS BUTTON */}
                    <button
                      aria-label="Close gear detail"
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setActiveGear(null)
                      }}
                      className="absolute top-3 right-3 p-1.5 text-zinc-400/70 hover:text-white transition-colors z-50 rounded-full hover:bg-white/10"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>

                    {/* PERSONALITY INSIGHT TEXT */}
                    <div className="block text-left relative z-10">
                      <div className="flex flex-col h-full justify-between gap-4">
                        <div className="space-y-2 select-text cursor-auto">
                          <p className="text-zinc-200 text-[14.5px] leading-relaxed font-light tracking-wide drop-shadow-sm">
                            {activeGear.thought}
                          </p>
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
          <span className="text-zinc-600 text-[11px] font-mono uppercase tracking-[0.2em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-5 h-5 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
