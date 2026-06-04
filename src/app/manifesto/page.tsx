'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react'
import { useManifestoTimeline, SCENES, TOTAL_DURATION } from '@/hooks/useManifestoTimeline'
import { useManifestoAudio } from '@/hooks/useManifestoAudio'
import { Scene3Unified } from '@/components/manifesto/Scene3Unified'
import { Scene4Stitch } from '@/components/manifesto/Scene4Stitch'

// ═══════════════════════════════════════════════════════════════════════════
// Shared easing — matches RCTrailer & HeroLanding
// ═══════════════════════════════════════════════════════════════════════════

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const easeCinematic = [0.05, 0.7, 0.1, 1] as [number, number, number, number]

// ═══════════════════════════════════════════════════════════════════════════
// Word-by-word kinetic text (adapted from RCTrailer)
// ═══════════════════════════════════════════════════════════════════════════

function KineticLine({
  children,
  className = '',
  delay = 0,
  emphasisWords = [] as string[],
  emphasisClass = 'text-[var(--accent-teal-bright)]',
}: {
  children: string
  className?: string
  delay?: number
  emphasisWords?: string[]
  emphasisClass?: string
}) {
  const words = children.split(' ')
  return (
    <span className={`inline-flex flex-wrap items-baseline justify-center gap-x-[0.32em] ${className}`}>
      {words.map((word, i) => {
        const clean = word.replace(/[.,!?'"'—]/g, '').toLowerCase()
        const isEmphasis = emphasisWords.some(w => clean === w.toLowerCase())
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 32, filter: 'blur(10px)', scale: 0.92 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.07,
              ease,
            }}
            className={isEmphasis ? emphasisClass : ''}
          >
            {word}
          </motion.span>
        )
      })}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Character-level slam text (adapted from RCTrailer)
// ═══════════════════════════════════════════════════════════════════════════

function SlamText({ children, className = '' }: { children: string; className?: string }) {
  const chars = children.split('')
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 80, scale: 1.6, filter: 'blur(16px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.35,
            delay: i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Typing effect for terminal
// ═══════════════════════════════════════════════════════════════════════════

function TypingText({ text, speed = 40, delay = 0, className = '' }: {
  text: string
  speed?: number
  delay?: number
  className?: string
}) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <span className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="animate-pulse text-[var(--accent-teal-bright)]">▊</span>
      )}
    </span>
  )
}


// ═══════════════════════════════════════════════════════════════════════════
// Scene 1: The Datadog Terminal Hook (0s – 15s)
// ═══════════════════════════════════════════════════════════════════════════

function Scene1Terminal({ progress }: { progress: number }) {
  // Phase 1 (0-0.66): Terminal typing (~10 seconds)
  // Phase 2 (0.66-0.73): Terminal collapses into glass card (~1 second)
  // Phase 3 (0.73-1): Hero text entrance (~4 seconds)
  const phase = progress < 0.66 ? 1 : progress < 0.73 ? 2 : 3

  const terminalLines = [
    '$ ssh deploy@enterprise-legacy.prod',
    'Connected to legacy-monolith.internal (40yr uptime)',
    '> SELECT complexity FROM systems WHERE age > "decades"',
    '> 5 disconnected tools. Zero documentation.',
    '> 20,000,000 automated jobs at risk.',
    '> STATUS: Someone needs to untangle this.',
    '',
    '> Initializing redesign protocol...',
  ]

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {phase <= 2 && (
          <motion.div
            key="terminal"
            className="w-full max-w-3xl mx-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: phase === 2 ? 0.85 : 1,
              y: phase === 2 ? -40 : 0,
            }}
            exit={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease }}
          >
            <div
              className="rounded-xl border overflow-hidden"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
                background: phase === 2
                  ? 'rgba(255,255,255,0.03)'
                  : 'rgba(0,0,0,0.8)',
                backdropFilter: phase === 2 ? 'blur(20px)' : 'none',
                transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                  enterprise-legacy.prod
                </span>
              </div>
              {/* Terminal body */}
              <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed">
                {terminalLines.map((line, i) => (
                  <div key={i} className="min-h-[1.5em]">
                    <TypingText
                      text={line}
                      speed={45}
                      delay={i * 1200}
                      className={
                        line.startsWith('$') || line.startsWith('>')
                          ? 'text-[var(--accent-teal-bright)]'
                          : 'text-zinc-500'
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div
            key="hero-text"
            className="text-center px-6 max-w-4xl"
            initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: easeCinematic }}
          >
            <motion.span
              className="text-[var(--accent-teal)] font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.4em] mb-6 block"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.05, ease: easeCinematic }}
            >
              Senior Product Designer
            </motion.span>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-[-0.02em] mb-6"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.15, ease: easeCinematic }}
            >
              <span className="text-[var(--text-heading)]">Hi, I&apos;m </span>
              <span className="bg-[linear-gradient(118deg,var(--text-heading)_0%,var(--accent-teal-bright)_45%,var(--accent-teal)_100%)] bg-clip-text text-transparent">
                Anuja
              </span>
            </motion.h1>
            <motion.p
              className="text-base md:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-light"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.25, ease: easeCinematic }}
            >
              Enterprise UX Expert · 13 Years · Legacy Modernization & AI-Native Design
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════
// Scene 2: Core Philosophy - The Monolith (15s – 25s)
// ═══════════════════════════════════════════════════════════════════════════

const BLOCKS = [
  { id: 0, type: 'noise', start: { l: 0, t: 0, w: 33.33, h: 33.33 }, label: 'ID_394' },
  { id: 1, type: 'essential', start: { l: 33.33, t: 0, w: 33.33, h: 33.33 }, end: { l: 0, t: 50, w: 50, h: 25 }, label: 'Users' },
  { id: 2, type: 'noise', start: { l: 66.66, t: 0, w: 33.33, h: 33.33 }, label: 'Legacy' },
  { id: 3, type: 'essential', start: { l: 0, t: 33.33, w: 33.33, h: 33.33 }, end: { l: 50, t: 50, w: 50, h: 25 }, label: 'Analytics' },
  { id: 4, type: 'essential', start: { l: 33.33, t: 33.33, w: 33.33, h: 33.33 }, end: { l: 0, t: 0, w: 100, h: 50 }, label: 'Dashboard Overview' },
  { id: 5, type: 'essential', start: { l: 66.66, t: 33.33, w: 33.33, h: 33.33 }, end: { l: 0, t: 75, w: 50, h: 25 }, label: 'Settings' },
  { id: 6, type: 'noise', start: { l: 0, t: 66.66, w: 33.33, h: 33.33 }, label: 'SYS_01' },
  { id: 7, type: 'essential', start: { l: 33.33, t: 66.66, w: 33.33, h: 33.33 }, end: { l: 50, t: 75, w: 50, h: 25 }, label: 'Security' },
  { id: 8, type: 'noise', start: { l: 66.66, t: 66.66, w: 33.33, h: 33.33 }, label: 'NULL' },
]

const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  const t = Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)))
  // Ease in-out quad
  const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  return outMin + (outMax - outMin) * easeT
}

function Scene2Philosophy({ progress }: { progress: number }) {
  const t = Math.max(0, Math.min(1, (progress - 0.3) / 0.3))
  const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
      <motion.div
        className="text-center mb-12 md:mb-16 z-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <KineticLine emphasisWords={['compartmentalizing', 'reorganizing', 'friction.']} emphasisClass="text-[var(--accent-teal-bright)] font-medium">
          From 50-year monoliths to AI-powered plugins.
        </KineticLine>
        <motion.p
          className="mt-6 text-sm sm:text-base md:text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.15 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          I don&apos;t just redesign. My specialty is compartmentalizing and reorganizing systems to make your workflow feel effortless. Not everything needs a redesign. The goal is always to solve the problem with the least friction.
        </motion.p>
      </motion.div>

      <div className="relative w-full max-w-[400px] sm:max-w-[500px] aspect-square mx-auto">
        {BLOCKS.map((block) => {
          const left = block.type === 'essential' ? mapRange(progress, 0.3, 0.6, block.start.l, block.end!.l) : block.start.l
          const top = block.type === 'essential' ? mapRange(progress, 0.3, 0.6, block.start.t, block.end!.t) : block.start.t
          const width = block.type === 'essential' ? mapRange(progress, 0.3, 0.6, block.start.w, block.end!.w) : block.start.w
          const height = block.type === 'essential' ? mapRange(progress, 0.3, 0.6, block.start.h, block.end!.h) : block.start.h

          const isNoise = block.type === 'noise'
          const xFly = isNoise ? (block.id % 3 === 0 ? -1 : 1) * (easeT * 100) : 0
          const yFly = isNoise ? (block.id < 3 ? -1 : 1) * (easeT * 100) : 0
          const opacity = isNoise ? 1 - easeT : 1
          const scale = isNoise ? 1 - easeT * 0.5 : 1

          const padding = mapRange(progress, 0.3, 0.6, 1, 8)
          const radius = mapRange(progress, 0.3, 0.6, 0, 16)
          
          const bgR = 30 + (255 - 30) * easeT
          const bgG = 30 + (255 - 30) * easeT
          const bgB = 30 + (255 - 30) * easeT
          const bgA = 1 - 0.97 * easeT
          
          const borderR = 50 + (255 - 50) * easeT
          const borderG = 50 + (255 - 50) * easeT
          const borderB = 50 + (255 - 50) * easeT
          const borderA = 1 - 0.9 * easeT

          return (
            <div
              key={block.id}
              className="absolute transition-none"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${width}%`,
                height: `${height}%`,
                padding: `${padding}px`,
                opacity: opacity,
                transform: `translate(${xFly}px, ${yFly}px) scale(${scale})`,
                zIndex: isNoise ? 0 : 10,
              }}
            >
              <div
                className="w-full h-full flex items-center justify-center overflow-hidden relative"
                style={{
                  borderRadius: `${radius}px`,
                  background: `rgba(${bgR}, ${bgG}, ${bgB}, ${bgA})`,
                  border: `1px solid rgba(${borderR}, ${borderG}, ${borderB}, ${borderA})`,
                  backdropFilter: easeT > 0.5 ? 'blur(12px)' : 'none',
                }}
              >
                <span 
                  className="absolute font-mono text-[8px] sm:text-[10px] text-zinc-500 uppercase tracking-widest whitespace-nowrap"
                  style={{ opacity: 1 - easeT }}
                >
                  {block.label}
                </span>

                {block.type === 'essential' && (
                  <div 
                    className="absolute inset-0 flex flex-col p-4 gap-2"
                    style={{ opacity: easeT }}
                  >
                    <div className="w-1/3 h-2 rounded-full bg-white/20" />
                    {block.id === 4 && (
                      <div className="w-full flex-1 rounded-md bg-gradient-to-tr from-[var(--accent-teal)] to-transparent opacity-20" />
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Scene 3: The Blueprint (Before & After) (30s – 45s)
// ═══════════════════════════════════════════════════════════════════════════

function Scene3Blueprint({ progress }: { progress: number }) {
  // Phase 1 (0-0.4): Tangled Mess
  // Phase 2 (0.4-1): Clean Flow
  const phase = progress < 0.4 ? 1 : 2

  const TANGLED_NODES = [
    { x: 20, y: 20 }, { x: 70, y: 15 }, { x: 80, y: 70 }, { x: 15, y: 80 }, { x: 50, y: 45 }, { x: 30, y: 60 }
  ]
  const TANGLED_EDGES = [
    [0,1], [0,3], [0,4], [1,2], [1,4], [2,3], [2,4], [3,4], [4,5], [0,5], [2,5]
  ]

  const CLEAN_NODES = [
    { x: 15, y: 50, label: 'User' },
    { x: 50, y: 50, label: 'API' },
    { x: 85, y: 50, label: 'Database' }
  ]
  const CLEAN_EDGES = [[0, 1], [1, 2]]

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
      <motion.div
        className="text-center mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease }}
      >
        <KineticLine
          className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-300 tracking-tight"
          emphasisWords={['re-architecting', 'intuitive', 'flows']}
          emphasisClass="text-[var(--accent-teal-bright)] font-medium"
        >
          Before I ever touch Figma, I map the logic.
        </KineticLine>
      </motion.div>

      <div className="relative w-full max-w-[600px] aspect-[2/1] border border-white/5 rounded-2xl bg-black/20 overflow-hidden backdrop-blur-md">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <AnimatePresence>
            {phase === 1 ? (
              <motion.g
                key="tangled"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {TANGLED_EDGES.map(([a, b], i) => (
                  <motion.path
                    key={i}
                    d={`M ${TANGLED_NODES[a].x} ${TANGLED_NODES[a].y} Q 50 50 ${TANGLED_NODES[b].x} ${TANGLED_NODES[b].y}`}
                    stroke="rgba(244, 63, 94, 0.4)"
                    strokeWidth="0.5"
                    fill="none"
                    strokeDasharray="2 2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: i * 0.1 }}
                  />
                ))}
                {TANGLED_NODES.map((n, i) => (
                  <circle key={i} cx={n.x} cy={n.y} r="2" fill="rgba(244, 63, 94, 0.8)" />
                ))}
              </motion.g>
            ) : (
              <motion.g
                key="clean"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {CLEAN_EDGES.map(([a, b], i) => (
                  <motion.line
                    key={i}
                    x1={CLEAN_NODES[a].x + 5}
                    y1={CLEAN_NODES[a].y}
                    x2={CLEAN_NODES[b].x - 5}
                    y2={CLEAN_NODES[b].y}
                    stroke="var(--accent-teal-bright)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.3 }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        <AnimatePresence>
          {phase === 2 && CLEAN_NODES.map((n, i) => (
            <motion.div
              key={n.label}
              className="absolute w-14 h-14 rounded-xl border border-[var(--accent-teal-bright)] bg-[var(--accent-teal)]/20 backdrop-blur-md flex items-center justify-center text-[10px] font-mono text-white shadow-[0_0_20px_rgba(0,210,211,0.2)]"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.2 }}
            >
              {n.label}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.p
        className="mt-8 text-xs font-mono uppercase tracking-[0.2em]"
        style={{ color: phase === 1 ? 'rgba(244, 63, 94, 0.8)' : 'var(--accent-teal-bright)' }}
      >
        {phase === 1 ? '50-Step Legacy Nightmare' : '3-Step Intuitive Flow'}
      </motion.p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Scene 4: Digital Archaeology & Interactive Telemetry (45s – 65s)
// ═══════════════════════════════════════════════════════════════════════════

const DATA_NODES = [
  { id: 'SYS_A', x: 15, y: 20, rgb: '244, 63, 94' },
  { id: 'SYS_B', x: 82, y: 15, rgb: '249, 115, 22' },
  { id: 'SYS_C', x: 88, y: 75, rgb: '6, 182, 212' },
  { id: 'SYS_D', x: 12, y: 78, rgb: '16, 185, 129' },
  { id: 'SYS_E', x: 50, y: 50, rgb: '168, 85, 247' },
]

const NODE_LINES = [
  [0, 1], [0, 3], [0, 4], [1, 2], [1, 4], [2, 3], [2, 4], [3, 4],
]

function Scene4Archaeology({
  progress,
  onSliderComplete,
}: {
  progress: number
  onSliderComplete: () => void
}) {
  const [sliderValue, setSliderValue] = useState(0)
  const [sliderCompleted, setSliderCompleted] = useState(false)
  const [clicksCount, setClicksCount] = useState(5.0)
  const [timeReduction, setTimeReduction] = useState(0)
  const completedRef = useRef(false)

  // Untangle factor: 0 = tangled, 1 = straight
  const untangle = sliderValue / 100

  // When slider hits 100%, trigger metrics countdown
  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    setSliderValue(val)

    if (val >= 100 && !completedRef.current) {
      completedRef.current = true
      setSliderCompleted(true)
      onSliderComplete()
    }
  }, [onSliderComplete])

  // Metrics countdown after slider completion
  useEffect(() => {
    if (!sliderCompleted) return

    const clickInterval = setInterval(() => {
      setClicksCount(prev => {
        const next = prev - 0.1 // Faster decrements
        if (next <= 2.0) {
          clearInterval(clickInterval)
          return 2.0
        }
        return next
      })
    }, 10) // 10ms instead of 30ms

    const timeInterval = setInterval(() => {
      setTimeReduction(prev => {
        const next = prev - 2 // Faster decrements
        if (next <= -60) {
          clearInterval(timeInterval)
          return -60
        }
        return next
      })
    }, 10) // 10ms instead of 30ms

    return () => {
      clearInterval(clickInterval)
      clearInterval(timeInterval)
    }
  }, [sliderCompleted])

  // Interpolate node positions: tangled → straight line
  const getNodePosition = (node: typeof DATA_NODES[0], factor: number) => {
    const straightX = 10 + (DATA_NODES.indexOf(node) / (DATA_NODES.length - 1)) * 80
    const straightY = 50
    return {
      x: node.x + (straightX - node.x) * factor,
      y: node.y + (straightY - node.y) * factor,
    }
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
      {/* Header text */}
      <motion.div
        className="text-center mb-6 md:mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
      >
        <KineticLine
          className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-300 tracking-tight leading-snug"
          emphasisWords={['digital', 'archaeology', 'confidence']}
          emphasisClass="text-[var(--accent-teal-bright)] font-medium"
          delay={0.3}
        >
          I treat legacy systems like digital archaeology. I uncover the intent and rebuild with confidence.
        </KineticLine>
      </motion.div>

      {/* Node visualization */}
      <motion.div
        className="relative w-72 h-44 sm:w-80 sm:h-48 md:w-[32rem] md:h-64 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* SVG connections */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {NODE_LINES.map(([a, b], idx) => {
            const posA = getNodePosition(DATA_NODES[a], untangle)
            const posB = getNodePosition(DATA_NODES[b], untangle)
            return (
              <motion.line
                key={idx}
                x1={posA.x}
                y1={posA.y}
                x2={posB.x}
                y2={posB.y}
                stroke={`rgba(${DATA_NODES[a].rgb}, ${0.3 + untangle * 0.4})`}
                strokeWidth={0.4 + untangle * 0.3}
                strokeDasharray={untangle > 0.9 ? 'none' : '2 2'}
                transition={{ duration: 0.1 }}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {DATA_NODES.map((node) => {
          const pos = getNodePosition(node, untangle)
          return (
            <motion.div
              key={node.id}
              className="absolute flex items-center justify-center rounded-lg border text-[8px] sm:text-[10px] font-mono uppercase tracking-widest"
              style={{
                width: 56,
                height: 36,
                borderColor: `rgba(${node.rgb}, 0.7)`,
                background: `rgba(${node.rgb}, 0.15)`,
                boxShadow: `0 0 ${20 + untangle * 20}px rgba(${node.rgb}, ${0.2 + untangle * 0.3})`,
                color: `rgba(${node.rgb}, 0.9)`,
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + DATA_NODES.indexOf(node) * 0.1, duration: 0.5, ease }}
            >
              {node.id}
            </motion.div>
          )
        })}
      </motion.div>

      {/* Refactor Slider */}
      <motion.div
        className="w-full max-w-md relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease }}
      >
        <AnimatePresence>
          {!sliderCompleted && (
            <motion.div
              className="absolute -top-8 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                opacity: { duration: 0.4 },
                y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
              }}
            >
              <span className="text-xs font-mono text-[var(--accent-teal-bright)] tracking-widest uppercase bg-[var(--accent-teal)]/20 px-3 py-1 rounded-full border border-[var(--accent-teal)]/40 shadow-[0_0_15px_rgba(0,210,211,0.2)]">
                Drag to untangle ➔
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative mt-2">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="manifesto-slider w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--accent-teal-bright) ${sliderValue}%, rgba(255,255,255,0.08) ${sliderValue}%)`,
            }}
          />
          <div className="flex justify-between mt-2 text-[10px] font-mono text-zinc-600">
            <span>TANGLED</span>
            <span className={sliderValue >= 100 ? 'text-[var(--semantic-emerald)]' : ''}>
              {sliderValue}%
            </span>
            <span>CLEAN</span>
          </div>
        </div>
      </motion.div>

      {/* Metrics — appear after slider hits 100% */}
      <AnimatePresence>
        {sliderCompleted && (
          <motion.div
            className="flex items-center gap-8 sm:gap-12 mt-8"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-mono">
                {clicksCount.toFixed(2)}
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mt-1">
                Avg. Clicks
              </div>
            </div>
            <div className="w-px h-12 bg-zinc-700/50" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--semantic-emerald)] font-mono">
                {timeReduction.toFixed(0)}%
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] mt-1">
                Task Time
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════
// Scene 5: The Technical Edge (65s – 80s)
// ═══════════════════════════════════════════════════════════════════════════

const COMPONENTS = [
  { label: 'Button', content: '▶ Loading…', color: 'var(--semantic-cyan)' },
  { label: 'Toggle', content: '● ON', color: 'var(--semantic-emerald)' },
  { label: 'Tabs', content: '◻ ◼ ◻', color: 'var(--semantic-orange)' },
  { label: 'Progress', content: '◔ 73%', color: 'var(--semantic-purple)' },
  { label: 'Metadata', content: 'key: val', color: 'var(--accent-teal-bright)' },
  { label: 'Search', content: '🔍 |', color: 'var(--semantic-cyan)' },
  { label: 'Status', content: '● Live', color: 'var(--semantic-emerald)' },
  { label: 'Slider', content: '○──────●', color: 'var(--semantic-orange)' },
  { label: 'Tag', content: '✦ Design', color: 'var(--semantic-purple)' },
  { label: 'Check', content: '☑ Selected', color: 'var(--accent-teal-bright)' },
  { label: 'Chart', content: '▁▃▅▇▅▃', color: 'var(--semantic-cyan)' },
  { label: 'Avatar', content: '👤 AH', color: 'var(--semantic-emerald)' },
]

function Scene5TechEdge({ progress }: { progress: number }) {
  // Phase 1 (0-0.4): Show UI Card
  // Phase 2 (0.4-0.9): Laser sweeps across, revealing code
  // Phase 3 (0.9-1): Code is fully revealed
  const phase = progress < 0.4 ? 1 : progress < 0.9 ? 2 : 3

  // Maps 0.4 to 0.9 progress into a 0 to 1 scan percentage
  const scanPercentage = phase === 1 ? 0 : phase === 3 ? 100 : ((progress - 0.4) / 0.5) * 100

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
      {/* Header */}
      <motion.div
        className="text-center mb-10 md:mb-12"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <KineticLine
          className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-300 tracking-tight"
          emphasisWords={['code', 'prototyping', 'production-ready']}
          emphasisClass="text-[var(--accent-teal-bright)] font-medium"
        >
          I speak both design and code — prototyping to production-ready.
        </KineticLine>
      </motion.div>

      {/* Morphing Container */}
      <div className="relative w-full max-w-[500px] h-[300px] sm:h-[350px]">
        {/* Layer 1: The Code (Background) */}
        <div className="absolute inset-0 rounded-2xl bg-zinc-950 border border-white/10 p-6 overflow-hidden flex flex-col shadow-2xl">
          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-zinc-800" />
            <div className="w-3 h-3 rounded-full bg-zinc-800" />
            <div className="w-3 h-3 rounded-full bg-zinc-800" />
          </div>
          <pre className="text-[10px] sm:text-xs font-mono leading-loose text-zinc-400">
            <code>
              <span className="text-pink-400">export function</span> <span className="text-yellow-200">RevenueCard</span>() {'{\n'}
              {'  '}<span className="text-pink-400">return</span> (\n
              {'    '}&lt;<span className="text-blue-400">Card</span> <span className="text-emerald-300">className</span>=<span className="text-orange-300">&quot;glassmorphic&quot;</span>&gt;{'\n'}
              {'      '}&lt;<span className="text-blue-400">Header</span>&gt;{'\n'}
              {'        '}&lt;<span className="text-blue-400">Title</span>&gt;<span className="text-white">Q3 Revenue</span>&lt;/<span className="text-blue-400">Title</span>&gt;{'\n'}
              {'        '}&lt;<span className="text-blue-400">Badge</span> <span className="text-emerald-300">variant</span>=<span className="text-orange-300">&quot;success&quot;</span>&gt;<span className="text-white">+14%</span>&lt;/<span className="text-blue-400">Badge</span>&gt;{'\n'}
              {'      '}&lt;/<span className="text-blue-400">Header</span>&gt;{'\n'}
              {'      '}&lt;<span className="text-blue-400">ChartContainer</span>&gt;{'\n'}
              {'        '}&lt;<span className="text-blue-400">AreaChart</span> <span className="text-emerald-300">data</span>=<span className="text-orange-300">{`{metrics}`}</span> /&gt;\n
              {'      '}&lt;/<span className="text-blue-400">ChartContainer</span>&gt;\n
              {'    '}&lt;/<span className="text-blue-400">Card</span>&gt;\n
              {'  '})\n
              {'}'}
            </code>
          </pre>
        </div>

        {/* Layer 2: The Design (Foreground, clipped) */}
        <div 
          className="absolute inset-0 rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden flex flex-col p-6 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
            backdropFilter: 'blur(20px)',
            // The clip path creates the "wipe" effect from left to right.
            // As scanPercentage goes 0 -> 100, the clip-path shrinks from 100% width to 0%.
            clipPath: `inset(0 ${scanPercentage}% 0 0)`,
          }}
        >
          <motion.div
            className="text-2xl sm:text-3xl font-light text-zinc-300 leading-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-zinc-500 block text-sm mb-4 uppercase tracking-widest font-mono">The Audit</span>
            When you untangle <span className="text-[var(--semantic-cyan)] font-medium">50 years</span> of tech debt...
          </motion.div>
          {/* UI Representation */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="text-zinc-400 text-sm mb-1">Q3 Revenue</div>
              <div className="text-3xl font-bold text-white tracking-tight">$2.4M</div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium">
              +14%
            </div>
          </div>

          <div className="flex-1 w-full flex items-end gap-2 px-2">
            {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
              <div 
                key={i} 
                className="flex-1 rounded-t-sm"
                style={{ 
                  height: `${height}%`,
                  background: 'linear-gradient(to top, var(--accent-teal), var(--accent-teal-bright))',
                  opacity: 0.8
                }} 
              />
            ))}
          </div>
        </div>

        {/* The Laser Scanner Line */}
        {phase === 2 && (
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-[var(--accent-teal-bright)] shadow-[0_0_20px_4px_var(--accent-teal)]"
            style={{ left: `${100 - scanPercentage}%` }}
          />
        )}
      </div>

      {/* Bottom label */}
      <motion.p
        className="mt-12 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em]"
        style={{ color: phase >= 2 ? 'var(--accent-teal-bright)' : 'var(--text-dim)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {phase < 2 ? 'The Design' : 'The Code'}
      </motion.p>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════
// Scene 6: The Closer (80s – 90s)
// ═══════════════════════════════════════════════════════════════════════════

function Scene6Closer({ progress }: { progress: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
      <motion.div
        key="tagline"
        className="text-center max-w-3xl flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: easeCinematic }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, var(--text-heading) 0%, var(--accent-teal-bright) 50%, var(--semantic-cyan) 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-sweep 3s ease infinite',
            }}
          >
            anujaharsha.com
          </span>
        </h2>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-light mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: easeCinematic }}
        >
          Let&apos;s untangle the architecture.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: easeCinematic }}
        >
          <Link
            href="/case-study/reportcaster"
            className="px-8 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            View Case Study
          </Link>
          <Link
            href="/#lets-talk"
            className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-medium tracking-wide hover:bg-white/10 transition-colors"
          >
            Let&apos;s Connect
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════
// Floating Playback Bar
// ═══════════════════════════════════════════════════════════════════════════

function PlaybackBar({
  currentTime,
  isPlaying,
  isMuted,
  isFinished,
  sceneIndex,
  onTogglePlay,
  onToggleMute,
  onSeek,
  onReset,
}: {
  currentTime: number
  isPlaying: boolean
  isMuted: boolean
  isFinished: boolean
  sceneIndex: number
  onTogglePlay: () => void
  onToggleMute: () => void
  onSeek: (time: number) => void
  onReset: () => void
}) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3 rounded-full"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease }}
      >
      {/* Play / Pause (Left aligned) */}
      <button
        onClick={isFinished ? onReset : onTogglePlay}
        className="relative z-10 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        aria-label={isFinished ? 'Replay' : isPlaying ? 'Pause' : 'Play'}
      >
        {isFinished ? (
          <RotateCcw className="w-5 h-5 text-white" />
        ) : isPlaying ? (
          <Pause className="w-5 h-5 text-white fill-white" />
        ) : (
          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
        )}
      </button>

      {/* Apple TV Style Segmented Scrubber (Center) */}
      <div className="relative w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-1.5 flex items-center">
        {/* Visual Track */}
        <div className="absolute inset-0 flex gap-1 sm:gap-1.5">
          {SCENES.map((scene, i) => {
            const widthPct = ((scene.end - scene.start) / TOTAL_DURATION) * 100
            
            let fillPct = 0
            if (currentTime >= scene.end) {
              fillPct = 100
            } else if (currentTime > scene.start) {
              fillPct = ((currentTime - scene.start) / (scene.end - scene.start)) * 100
            }

            // Optional hover effect or active state
            const isActive = sceneIndex === i
            
            return (
              <div
                key={scene.id}
                className="h-full rounded-full bg-white/10 overflow-hidden relative"
                style={{ width: `${widthPct}%` }}
              >
                <div 
                  className="absolute inset-y-0 left-0 bg-[var(--accent-teal-bright)] rounded-full"
                  style={{ width: `${fillPct}%` }}
                />
              </div>
            )
          })}
        </div>

        {/* Invisible Range Input for Scrubbing */}
        <input
          type="range"
          min="0"
          max={TOTAL_DURATION}
          step="0.1"
          value={currentTime}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Seek timeline"
        />
      </div>

      {/* Sound toggle (Right aligned) */}
      <button
        onClick={onToggleMute}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/15 transition-colors"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-zinc-500" />
        ) : (
          <Volume2 className="w-4 h-4 text-zinc-300" />
        )}
      </button>
      </motion.div>
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════════════════
// Main Page Component
// ═══════════════════════════════════════════════════════════════════════════

export default function ManifestoPage() {
  const timeline = useManifestoTimeline()
  const [isMuted, setIsMuted] = useState(true) // Start muted (autoplay policy)

  // Audio sync
  useManifestoAudio({
    currentTime: timeline.currentTime,
    isPlaying: timeline.isPlaying,
    isMuted,
  })

  // Handle Scene 2 slider completion → resume timeline
  const handleSliderComplete = useCallback(() => {
    // Give the success animation 1.5s to play out before transitioning
    setTimeout(() => {
      timeline.seekToScene(2) // Jump to Scene 3
      timeline.autoResume()
    }, 1500)
  }, [timeline])

  // Auto-pause when entering Scene 2 (The Audit)
  const prevSceneRef = useRef(timeline.sceneIndex)
  useEffect(() => {
    if (timeline.sceneIndex === 1 && prevSceneRef.current !== 1) {
      // Entering Scene 2 — auto-pause for slider interaction almost instantly
      setTimeout(() => {
        timeline.autoPause()
      }, 800) // Give 800ms for the scene to animate in before pausing (was 2000)
    }
    prevSceneRef.current = timeline.sceneIndex
  }, [timeline.sceneIndex, timeline])

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-transparent">
      {/* Dark overlay on the existing FixedBackground */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'black',
          opacity: timeline.sceneId === 'scene1' && timeline.sceneProgress < 0.5 ? 0.95 : 0.75,
        }}
      />

      {/* Back to Portfolio */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8, ease }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-zinc-400 uppercase tracking-widest transition-all duration-300 hover:text-white hover:bg-white/10"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <ArrowLeft className="w-3 h-3" />
          Portfolio
        </Link>
      </motion.div>

      {/* ── Scene Renderer ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-[2]">
        <AnimatePresence mode="wait">
          {timeline.sceneId === 'scene1' && (
            <motion.div
              key="scene1"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(12px)' }}
              transition={{ duration: 0.8, ease }}
            >
              <Scene1Terminal progress={timeline.sceneProgress} />
            </motion.div>
          )}

          {timeline.sceneId === 'scene2' && (
            <motion.div
              key="scene2"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(12px)' }}
              transition={{ duration: 0.8, ease }}
            >
              <Scene4Archaeology
                progress={timeline.sceneProgress}
                onSliderComplete={handleSliderComplete}
              />
            </motion.div>
          )}

          {timeline.sceneId === 'scene3' && (
            <motion.div
              key="scene3"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(12px)' }}
              transition={{ duration: 0.8, ease }}
            >
              <Scene3Unified progress={timeline.sceneProgress} />
            </motion.div>
          )}

          {timeline.sceneId === 'scene4' && (
            <motion.div
              key="scene4"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(12px)' }}
              transition={{ duration: 0.8, ease }}
            >
              <Scene4Stitch progress={timeline.sceneProgress} />
            </motion.div>
          )}

          {timeline.sceneId === 'scene5' && (
            <motion.div
              key="scene5"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(12px)' }}
              transition={{ duration: 0.8, ease }}
            >
              <Scene2Philosophy progress={timeline.sceneProgress} />
            </motion.div>
          )}

          {timeline.sceneId === 'scene6' && (
            <motion.div
              key="scene6"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: easeCinematic }}
            >
              <Scene6Closer progress={timeline.sceneProgress} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Playback Control Bar ─────────────────────────────────── */}
      <PlaybackBar
        currentTime={timeline.currentTime}
        isPlaying={timeline.isPlaying}
        isMuted={isMuted}
        isFinished={timeline.isFinished}
        sceneIndex={timeline.sceneIndex}
        onTogglePlay={() => {
          timeline.togglePlay()
        }}
        onToggleMute={() => setIsMuted(m => !m)}
        onSeek={(time) => timeline.seek(time)}
        onReset={() => {
          timeline.reset()
          setTimeout(() => timeline.play(), 100)
        }}
      />

      {/* ── Slider custom styles ─────────────────────────────────── */}
      <style jsx global>{`
        /* Manifesto slider thumb */
        .manifesto-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--accent-teal-bright);
          border: 2px solid rgba(255,255,255,0.3);
          box-shadow: 0 0 15px rgba(20, 184, 166, 0.5);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .manifesto-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 25px rgba(20, 184, 166, 0.7);
        }
        .manifesto-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--accent-teal-bright);
          border: 2px solid rgba(255,255,255,0.3);
          box-shadow: 0 0 15px rgba(20, 184, 166, 0.5);
          cursor: pointer;
        }

        /* Scrubber thumb (smaller) */
        .manifesto-scrubber::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          border: none;
          box-shadow: 0 0 8px rgba(255,255,255,0.3);
          cursor: pointer;
        }
        .manifesto-scrubber::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          border: none;
          cursor: pointer;
        }

        /* Gradient sweep animation for Scene 5 */
        @keyframes gradient-sweep {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
