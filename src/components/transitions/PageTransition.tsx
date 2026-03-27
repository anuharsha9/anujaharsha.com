'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { useTransition } from './TransitionContext'

interface PageTransitionProps { children: ReactNode }

/**
 * PageTransition — "Tidal Wash" v8: Natural Ocean Feel
 *
 * v7 had traveling waves but they felt mechanical. v8 fixes this with:
 *
 *   - GERSTNER TROCHOID WAVES: proper circular particle motion producing
 *     sharp crests and wide, flat troughs — the hallmark of ocean waves
 *   - WAVE GROUPS (sets): amplitude envelopes that make 3-5 waves bigger,
 *     then 3-5 smaller — like real "seventh wave" phenomenon  
 *   - VARIABLE PROPAGATION: each train moves at a distinct visible speed
 *   - TURBULENT SHORE BREAK: high-frequency chaos at the leading edge
 *   - ORGANIC SWAY: the entire surface undulates with long-period sway
 *
 * 80-20 rule: wave crest stops at ~20% from viewport top.
 */

// ── NOISE FUNCTIONS ─────────────────────────────────────────
function hash(n: number): number {
  const s = Math.sin(n * 127.1 + n * 311.7) * 43758.5453
  return s - Math.floor(s)
}

function smoothNoise(x: number): number {
  const i = Math.floor(x)
  const f = x - i
  const u = f * f * (3 - 2 * f) // Hermite smoothstep
  return hash(i) * (1 - u) + hash(i + 1) * u
}

function noise2D(x: number, y: number): number {
  const i = Math.floor(x)
  const j = Math.floor(y)
  const fx = x - i
  const fy = y - j
  const ux = fx * fx * (3 - 2 * fx)
  const uy = fy * fy * (3 - 2 * fy)
  const a = hash(i + j * 57.0)
  const b = hash(i + 1 + j * 57.0)
  const c = hash(i + (j + 1) * 57.0)
  const d = hash(i + 1 + (j + 1) * 57.0)
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}

function fbm(x: number, octaves = 4): number {
  let val = 0, amp = 0.5, freq = 1
  for (let i = 0; i < octaves; i++) {
    val += amp * (smoothNoise(x * freq) * 2 - 1)
    freq *= 2.17
    amp *= 0.45
  }
  return val
}

function fbm2D(x: number, y: number, octaves = 3): number {
  let val = 0, amp = 0.5, freq = 1
  for (let i = 0; i < octaves; i++) {
    val += amp * (noise2D(x * freq, y * freq) * 2 - 1)
    freq *= 2.3
    amp *= 0.4
  }
  return val
}

// ── GERSTNER WAVE ───────────────────────────────────────────
// True Gerstner/trochoid wave: produces sharp crests + wide troughs
// Way more natural than sine waves
interface WaveTrain {
  wavelength: number   // pixels per full cycle
  amplitude: number    // crest height in pixels  
  speed: number        // phase velocity (px/s)
  steepness: number    // Q factor: 0=sine, ~0.8=sharp crests
  angle: number        // cross-swell angular offset
}

// Multiple wave trains that interfere to create complex ocean surface
// Key insight: use irrational speed ratios so patterns never repeat
const WAVE_TRAINS: WaveTrain[] = [
  // Primary swell — long, powerful, fast
  { wavelength: 380, amplitude: 1.0, speed: 90,  steepness: 0.55, angle: 0.0 },
  // Secondary swell — crosses at slight angle  
  { wavelength: 220, amplitude: 0.6, speed: 68,  steepness: 0.45, angle: 0.12 },
  // Wind chop — shorter, choppier
  { wavelength: 110, amplitude: 0.35, speed: 45, steepness: 0.60, angle: -0.15 },
  // Capillary ripple — tiny fast detail
  { wavelength: 55,  amplitude: 0.15, speed: 30, steepness: 0.30, angle: 0.08 },
]

/**
 * Gerstner wave displacement — the KEY to natural ocean look.
 * Instead of pure sine, it produces trochoid curves:
 * - Sharp peaked crests (water piles up)
 * - Wide flat troughs (water spreads out)
 * - The steepness parameter controls how extreme this is
 */
function gerstnerY(phase: number, steepness: number): number {
  // Trochoid: y = -cos(phase) with sharpening
  // Higher harmonics sharpen the crest
  const c = Math.cos(phase)
  const s = Math.sin(phase)
  // Base wave + crest sharpening through second harmonic
  return -c + steepness * (s * s - 0.5) + steepness * 0.3 * Math.sin(phase * 2 + 0.5)
}

// ── WAVE CURTAIN CONFIG ─────────────────────────────────────
interface WaveCurtain {
  baseYOffset: number
  opacity: number
  amplitude: number    // overall height multiplier in px
  lag: number          // coverage offset
  trainScale: number[] // per-train emphasis
  foamIntensity: number
  groupPhase: number   // offset for wave group envelope
}

// 3 curtains: leading foam → main body → deep trailing swell
const WAVE_CURTAINS: WaveCurtain[] = [
  // Leading wave — choppy, frothy, arrives first
  {
    baseYOffset: -20, opacity: 0.14, amplitude: 55, lag: -0.05,
    trainScale: [0.7, 1.0, 1.6, 2.0], // emphasize short chop
    foamIntensity: 1.5, groupPhase: 0.0,
  },
  // Primary wave — dominant visual mass
  {
    baseYOffset: 0, opacity: 0.20, amplitude: 65, lag: 0,
    trainScale: [1.0, 0.8, 0.5, 0.3],
    foamIntensity: 0.7, groupPhase: 0.4,
  },
  // Trailing swell — smooth, deep, arrives last
  {
    baseYOffset: 25, opacity: 0.08, amplitude: 45, lag: 0.07,
    trainScale: [1.3, 0.5, 0.2, 0.1], // dominated by primary swell
    foamIntensity: 0.2, groupPhase: 0.9,
  },
]

export default function PageTransition({ children }: PageTransitionProps) {
  const { phase, progress } = useTransition()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tealRef = useRef({ r: 7, g: 139, b: 156 })
  const sizeRef = useRef({ w: 0, h: 0 })
  const rafRef = useRef(0)
  const startTimeRef = useRef(0)
  const coverageRef = useRef(0)
  const phaseRef = useRef<string>('idle')
  const lastFrameRef = useRef(0)

  const isActive = phase !== 'idle'
  const MAX_COVERAGE = 0.80

  useEffect(() => {
    phaseRef.current = phase
    if (phase === 'submerge') coverageRef.current = progress * MAX_COVERAGE
    else if (phase === 'hold') coverageRef.current = MAX_COVERAGE
    else if (phase === 'emerge') coverageRef.current = MAX_COVERAGE * (1 - progress)
    else coverageRef.current = 0
  }, [phase, progress])

  // Content wash effect — blur & fade happens underneath
  const contentOpacity =
    phase === 'submerge'
      ? Math.max(0, 1 - progress * 1.3)
      : phase === 'hold' ? 0
      : phase === 'emerge'
        ? Math.min(1, progress * 1.2)
      : 1

  const contentBlur =
    phase === 'submerge'
      ? progress * 10
      : phase === 'hold' ? 10
      : phase === 'emerge'
        ? (1 - progress) * 10
      : 0

  const FRAME_INTERVAL = 33 // ~30fps

  useEffect(() => {
    if (!isActive) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const rootStyle = getComputedStyle(document.documentElement)
    const tealRgb = rootStyle.getPropertyValue('--accent-teal-rgb').trim()
    if (tealRgb) {
      const parts = tealRgb.split(',').map(s => parseInt(s.trim(), 10))
      if (parts.length === 3 && parts.every(n => !isNaN(n))) {
        tealRef.current = { r: parts[0], g: parts[1], b: parts[2] }
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { w: window.innerWidth, h: window.innerHeight }
    }
    resize()
    window.addEventListener('resize', resize)
    startTimeRef.current = performance.now()

    const step = 3 // px between edge samples

    // ── COMPUTE WAVE SURFACE AT POSITION X ──────────────────
    const computeSurface = (
      x: number, time: number, curtain: WaveCurtain,
      energyScale: number
    ): number => {
      let y = 0

      // WAVE GROUP ENVELOPE — amplitude waxes and wanes
      // Creates "sets" of 4-6 bigger waves followed by calmer lulls
      // Two overlapping envelopes at irrational ratio = never repeating
      const groupEnv = 0.7
        + 0.2 * Math.sin(time * 0.25 + curtain.groupPhase)
        + 0.1 * Math.sin(time * 0.25 * 1.618 + curtain.groupPhase * 2.3)

      // SUM TRAVELING WAVE TRAINS
      for (let i = 0; i < WAVE_TRAINS.length; i++) {
        const train = WAVE_TRAINS[i]
        const scale = curtain.trainScale[i]

        // Wave number
        const k = (2 * Math.PI) / train.wavelength

        // TRUE TRAVELING WAVE PHASE
        // phase = k*x - ω*t where ω = 2π * speed / wavelength
        // The minus sign makes waves travel RIGHT (positive x direction)
        const xAngled = x + x * train.angle
        const omega = (2 * Math.PI * train.speed) / train.wavelength
        const phi = k * xAngled - omega * time

        // Gerstner wave height
        const waveY = gerstnerY(phi, train.steepness)
        y += waveY * train.amplitude * scale
      }

      // ORGANIC NOISE — slow-drifting large-scale undulation
      const noiseVal = fbm(x * 0.003 + time * 0.06, 3)
      y += noiseVal * 12

      // FOAM TURBULENCE — high-frequency chaos at the surface
      const foamVal = fbm2D(x * 0.02 + time * 0.3, time * 0.8, 2)
      y += foamVal * curtain.foamIntensity * 6 * Math.max(0, y / 2) // only on crests

      // Apply group envelope + energy scaling
      y *= groupEnv * energyScale

      return y * curtain.amplitude / 40 // normalize; curtain.amplitude is in px
    }

    const animate = (now: number) => {
      if (now - lastFrameRef.current < FRAME_INTERVAL) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameRef.current = now

      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) { rafRef.current = requestAnimationFrame(animate); return }

      const time = (now - startTimeRef.current) / 1000
      const coverage = coverageRef.current
      const { r, g, b } = tealRef.current

      ctx.clearRect(0, 0, w, h)

      const currentPhase = phaseRef.current

      // ENERGY SCALE — waves build during surge, calm during retreat
      let energyScale = 1.0
      if (currentPhase === 'submerge') {
        // Waves get progressively choppier as they surge up
        energyScale = 0.6 + 0.5 * Math.min(coverage / MAX_COVERAGE, 1)
      } else if (currentPhase === 'emerge') {
        // Waves lose energy as water drains — gravity wins
        energyScale = 0.4 + 0.6 * Math.max(coverage / MAX_COVERAGE, 0)
      }

      // DEEP SWAY — entire ocean surface heaves up and down slowly
      const sway = Math.sin(time * 0.15) * 8 + Math.sin(time * 0.11) * 5
        + Math.sin(time * 0.07) * 3

      // Compute all curtain edges
      const allEdges: { edges: number[]; curtain: WaveCurtain; layerCoverage: number }[] =
        WAVE_CURTAINS.map((curtain) => {
          const layerCoverage = Math.max(0, Math.min(MAX_COVERAGE, coverage + curtain.lag))

          // Base crest Y position: travels from below viewport to 20% from top
          const crestBaseY = h + 60
            - (layerCoverage / MAX_COVERAGE) * (h + 60 - h * 0.18)
            + curtain.baseYOffset + sway

          const edges: number[] = []
          for (let x = 0; x <= w; x += step) {
            const waveY = computeSurface(x, time, curtain, energyScale)
            edges.push(crestBaseY + waveY)
          }
          return { edges, curtain, layerCoverage }
        })

      allEdges.sort((a, b) => a.layerCoverage - b.layerCoverage)

      // ── PASS 1: Dark water mass (Bézier-smoothed fill) ─────
      for (const { edges } of allEdges) {
        ctx.beginPath()
        ctx.moveTo(-10, h + 10)
        ctx.lineTo(w + 10, h + 10)

        // Smooth Bézier path from right to left along crest
        if (edges.length > 2) {
          ctx.lineTo((edges.length - 1) * step, edges[edges.length - 1])
          for (let i = edges.length - 2; i >= 1; i--) {
            const cpx = (i + 1) * step
            const cpy = edges[i + 1]
            const endx = (i * step + cpx) / 2
            const endy = (edges[i] + edges[i + 1]) / 2
            ctx.quadraticCurveTo(cpx, cpy, endx, endy)
          }
          ctx.lineTo(0, edges[0])
        } else {
          for (let i = edges.length - 1; i >= 0; i--) {
            ctx.lineTo(i * step, edges[i])
          }
        }

        ctx.lineTo(-10, edges[0])
        ctx.closePath()
        ctx.fillStyle = 'rgb(1, 2, 4)'
        ctx.fill()
      }

      // ── PASS 2: Shimmer rays (track wave crests) ───────────
      ctx.globalCompositeOperation = 'lighter'
      const rayWidth = 20
      const rayLength = 120

      for (const { curtain, edges, layerCoverage } of allEdges) {
        if (layerCoverage < 0.02) continue

        for (let rx = 0; rx < w; rx += rayWidth) {
          const edgeIdx = Math.min(Math.floor(rx / step), edges.length - 1)
          const edgeY = edges[edgeIdx]

          // Ray intensity follows the traveling wave — creates shimmer
          const rayPhase = (2 * Math.PI / 180) * rx - time * 1.2
          const rayInt = 0.5
            + 0.3 * Math.sin(rayPhase)
            + 0.2 * Math.sin(rayPhase * 1.7 + time * 0.4)

          const rayOp = curtain.opacity * rayInt
            * (0.6 + 0.4 * Math.sin(time * 0.35 + rx * 0.01))

          const grad = ctx.createLinearGradient(rx, edgeY - 10, rx, edgeY + rayLength)
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
          grad.addColorStop(0.05, `rgba(${r}, ${g}, ${b}, ${rayOp * 0.4})`)
          grad.addColorStop(0.1, `rgba(${r}, ${g}, ${b}, ${rayOp})`)
          grad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${rayOp * 0.5})`)
          grad.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${rayOp * 0.15})`)
          grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

          ctx.fillStyle = grad
          ctx.fillRect(rx, edgeY - 10, rayWidth, rayLength + 10)
        }
      }
      ctx.globalCompositeOperation = 'source-over'

      // ── PASS 3: Crest rope strokes (teal glow) ────────────
      for (const { edges, curtain } of allEdges) {
        ctx.beginPath()
        ctx.moveTo(0, edges[0])
        for (let i = 1; i < edges.length - 1; i++) {
          const cpx = i * step
          const cpy = edges[i]
          const endx = (i * step + (i + 1) * step) / 2
          const endy = (edges[i] + edges[i + 1]) / 2
          ctx.quadraticCurveTo(cpx, cpy, endx, endy)
        }
        ctx.lineTo((edges.length - 1) * step, edges[edges.length - 1])

        // Outer glow
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${curtain.opacity * 0.4})`
        ctx.lineWidth = 6
        ctx.stroke()
        // Bright core
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${curtain.opacity * 1.2})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [isActive])

  return (
    <>
      {isActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-[9997] pointer-events-none"
          style={{ width: '100vw', height: '100vh' }}
          aria-hidden="true"
        />
      )}
      <div style={{
        opacity: contentOpacity,
        filter: contentBlur > 0.1 ? `blur(${contentBlur}px)` : 'none',
        willChange: phase !== 'idle' ? 'opacity, filter' : 'auto',
        transition: phase === 'idle' ? 'opacity 0.3s ease, filter 0.3s ease' : 'none',
      }}>
        {children}
      </div>
    </>
  )
}
