'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

/* ─── Interlocking gear SVG ─── */
function GearSVG({ size, teeth = 8 }: { size: number; teeth?: number }) {
  const r = size / 2
  const innerR = r * 0.55
  const toothH = r * 0.22
  const toothW = (2 * Math.PI * r) / (teeth * 3)

  let path = ''
  for (let i = 0; i < teeth; i++) {
    const angle = (i / teeth) * Math.PI * 2
    const nextAngle = ((i + 0.5) / teeth) * Math.PI * 2
    const midAngle = (angle + nextAngle) / 2

    // Outer tooth points
    const x1 = r + (r - toothH) * Math.cos(angle - toothW / r)
    const y1 = r + (r - toothH) * Math.sin(angle - toothW / r)
    const x2 = r + r * Math.cos(angle - toothW / r / 2)
    const y2 = r + r * Math.sin(angle - toothW / r / 2)
    const x3 = r + r * Math.cos(angle + toothW / r / 2)
    const y3 = r + r * Math.sin(angle + toothW / r / 2)
    const x4 = r + (r - toothH) * Math.cos(angle + toothW / r)
    const y4 = r + (r - toothH) * Math.sin(angle + toothW / r)

    if (i === 0) path += `M ${x1} ${y1} `
    path += `L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} `

    // Valley to next tooth
    const vx = r + (r - toothH) * Math.cos(midAngle)
    const vy = r + (r - toothH) * Math.sin(midAngle)
    path += `A ${r - toothH} ${r - toothH} 0 0 1 ${vx} ${vy} `

    const nx = r + (r - toothH) * Math.cos(nextAngle - toothW / r)
    const ny = r + (r - toothH) * Math.sin(nextAngle - toothW / r)
    path += `A ${r - toothH} ${r - toothH} 0 0 1 ${nx} ${ny} `
  }
  path += 'Z'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        opacity={0.8}
      />
      <circle
        cx={r}
        cy={r}
        r={innerR}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        opacity={0.6}
      />
      <circle
        cx={r}
        cy={r}
        r={r * 0.15}
        fill="currentColor"
        opacity={0.4}
      />
    </svg>
  )
}

/* ─── Floating particles ─── */
function Particles({ count = 30, progress }: { count?: number; progress: number }) {
  // Generate random values only on the client to avoid SSR hydration mismatch
  const [particles, setParticles] = useState<Array<{
    id: number; x: number; y: number; size: number;
    speed: number; delay: number; opacity: number;
  }>>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.1,
      }))
    )
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: progress > 80 ? 'rgba(47, 198, 213, 0.6)' : `rgba(255, 255, 255, ${p.opacity})`,
            animation: `float-particle ${p.speed}s ease-in-out ${p.delay}s infinite`,
            transition: 'background-color 0.5s ease',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Scan line effect ─── */
function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)',
      }}
    />
  )
}

export default function LoadingScreen() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('BOOTING SYSTEM')
  const [glitchActive, setGlitchActive] = useState(false)
  const [flashActive, setFlashActive] = useState(false)
  const animationRef = useRef<number | null>(null)
  const fadeTimeoutRef = useRef<number | null>(null)
  const hideTimeoutRef = useRef<number | null>(null)
  const glitchIntervalRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  const LOADING_DURATION = 1800

  useEffect(() => {
    const dispatchReady = () => {
      window.dispatchEvent(new Event('app-ready'))
    }

    const clearScheduledWork = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current)
        fadeTimeoutRef.current = null
      }
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current)
        hideTimeoutRef.current = null
      }
      if (glitchIntervalRef.current) {
        window.clearInterval(glitchIntervalRef.current)
        glitchIntervalRef.current = null
      }
    }

    clearScheduledWork()

    if (pathname !== '/') {
      setIsVisible(false)
      dispatchReady()
      return
    }

    // Skip loading screen for returning visitors
    const hasSession = localStorage.getItem('portfolio_entry_completed') === 'true'
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (hasSession || prefersReducedMotion) {
      setIsVisible(false)
      dispatchReady()
      return
    }

    setIsVisible(true)
    setIsFading(false)
    setProgress(0)
    setStatusText('BOOTING SYSTEM')
    setFlashActive(false)
    startTimeRef.current = performance.now()

    // Glitch effect interval
    glitchIntervalRef.current = window.setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 100 + Math.random() * 150)
    }, 800 + Math.random() * 2000)

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current
      const rawProgress = Math.min(elapsed / LOADING_DURATION, 1)

      // Dramatic multi-phase easing: slow start, fast middle, dramatic end
      let easedProgress: number
      if (rawProgress < 0.2) {
        easedProgress = rawProgress * 0.5 // Slow boot
      } else if (rawProgress < 0.7) {
        easedProgress = 0.1 + (rawProgress - 0.2) * 1.4 // Fast load
      } else {
        easedProgress = 0.8 + (rawProgress - 0.7) * 0.667 // Dramatic finish
      }
      const currentProgress = Math.min(Math.round(easedProgress * 100), 100)

      setProgress(currentProgress)

      // Update status text at milestones with dramatic messages
      if (currentProgress < 15) {
        setStatusText('BOOTING SYSTEM')
      } else if (currentProgress < 30) {
        setStatusText('INITIALIZING NEURAL MAP')
      } else if (currentProgress < 50) {
        setStatusText('LOADING GEAR ARCHITECTURE')
      } else if (currentProgress < 70) {
        setStatusText('CALIBRATING DESIGN SYSTEMS')
      } else if (currentProgress < 85) {
        setStatusText('ACTIVATING PORTFOLIO CORE')
      } else if (currentProgress < 95) {
        setStatusText('SYNCING EXPERIENCE LAYER')
      } else {
        setStatusText('▸ SYSTEM ONLINE')
      }

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animateProgress)
      } else {
        // Flash at 100%
        setFlashActive(true)
        setTimeout(() => setFlashActive(false), 200)

        fadeTimeoutRef.current = window.setTimeout(() => {
          if (glitchIntervalRef.current) {
            window.clearInterval(glitchIntervalRef.current)
          }
          setIsFading(true)
          hideTimeoutRef.current = window.setTimeout(() => {
            setIsVisible(false)
            dispatchReady()
          }, 500)
        }, 300)
      }
    }

    animationRef.current = requestAnimationFrame(animateProgress)

    return () => {
      clearScheduledWork()
    }
  }, [pathname])

  if (!isVisible) return null

  const accentTeal = 'rgba(47, 198, 213, 1)'
  const isPoweringUp = progress > 85

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgb(10, 14, 20) 0%, rgb(4, 4, 8) 100%)',
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(47,198,213,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(47,198,213,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `perspective(1000px) rotateX(${45 - progress * 0.3}deg)`,
          transformOrigin: 'center bottom',
          transition: 'transform 0.3s ease',
        }}
      />

      {/* Floating particles */}
      <Particles progress={progress} />

      {/* Scan lines */}
      <ScanLines />

      {/* Flash overlay */}
      {flashActive && (
        <div
          className="absolute inset-0 z-50"
          style={{
            background: `radial-gradient(circle at center, ${accentTeal}, transparent 70%)`,
            opacity: 0.3,
            animation: 'flash-burst 0.3s ease-out forwards',
          }}
        />
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-10">
        {/* Gear cluster */}
        <div className="relative w-40 h-40 md:w-52 md:h-52">
          {/* Large main gear */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              color: isPoweringUp ? accentTeal : 'rgba(255,255,255,0.25)',
              transition: 'color 0.5s ease',
              animation: 'gear-spin 4s linear infinite',
              filter: isPoweringUp ? `drop-shadow(0 0 20px ${accentTeal})` : 'none',
            }}
          >
            <GearSVG size={140} teeth={12} />
          </div>

          {/* Medium gear (top-right, counter-rotating) */}
          <div
            className="absolute -top-4 -right-4 md:-top-6 md:-right-6"
            style={{
              color: isPoweringUp ? 'rgba(47,198,213,0.7)' : 'rgba(255,255,255,0.15)',
              transition: 'color 0.5s ease',
              animation: 'gear-spin-reverse 3s linear infinite',
              filter: isPoweringUp ? `drop-shadow(0 0 12px rgba(47,198,213,0.4))` : 'none',
            }}
          >
            <GearSVG size={60} teeth={8} />
          </div>

          {/* Small gear (bottom-left, fast spin) */}
          <div
            className="absolute -bottom-2 -left-3 md:-bottom-3 md:-left-4"
            style={{
              color: isPoweringUp ? 'rgba(47,198,213,0.6)' : 'rgba(255,255,255,0.12)',
              transition: 'color 0.5s ease',
              animation: 'gear-spin 2s linear infinite',
              filter: isPoweringUp ? `drop-shadow(0 0 8px rgba(47,198,213,0.3))` : 'none',
            }}
          >
            <GearSVG size={40} teeth={6} />
          </div>

          {/* Center pulse */}
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: isPoweringUp ? accentTeal : 'rgba(255,255,255,0.2)',
                boxShadow: isPoweringUp
                  ? `0 0 30px ${accentTeal}, 0 0 60px rgba(47,198,213,0.3)`
                  : '0 0 10px rgba(255,255,255,0.1)',
                transition: 'all 0.5s ease',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Status section */}
        <div className="flex flex-col items-center gap-5 w-72 md:w-80">
          {/* Status text with glitch */}
          <div className="relative overflow-hidden">
            <p
              className="text-xs md:text-sm font-mono tracking-[0.25em] uppercase text-center"
              style={{
                color: isPoweringUp ? accentTeal : 'rgba(148, 163, 184, 0.7)',
                transition: 'color 0.3s ease',
                transform: glitchActive ? `translateX(${Math.random() * 4 - 2}px)` : 'none',
                textShadow: glitchActive
                  ? `2px 0 rgba(47,198,213,0.5), -2px 0 rgba(168,85,247,0.5)`
                  : isPoweringUp ? `0 0 10px rgba(47,198,213,0.3)` : 'none',
              }}
            >
              {statusText}
            </p>
          </div>

          {/* Progress bar — dramatic */}
          <div className="w-full relative">
            {/* Track */}
            <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden relative">
              {/* Fill */}
              <div
                className="h-full rounded-full relative"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, rgba(47,198,213,0.4) 0%, ${accentTeal} 100%)`,
                  transition: 'width 0.1s ease-out',
                  boxShadow: isPoweringUp
                    ? `0 0 15px ${accentTeal}, 0 0 30px rgba(47,198,213,0.3)`
                    : `0 0 8px rgba(47,198,213,0.3)`,
                }}
              />

              {/* Sweep animation on bar */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                  animation: 'bar-sweep 2s ease-in-out infinite',
                }}
              />
            </div>

            {/* Edge markers */}
            <div className="flex justify-between mt-2">
              <span className="text-[9px] font-mono text-zinc-800 tracking-wider">0x00</span>
              <span className="text-[9px] font-mono text-zinc-800 tracking-wider">0xFF</span>
            </div>
          </div>

          {/* Percentage — large dramatic counter */}
          <div className="relative">
            <span
              className="text-4xl md:text-5xl font-mono font-light tabular-nums tracking-tighter"
              style={{
                color: isPoweringUp ? accentTeal : 'rgba(255,255,255,0.15)',
                transition: 'color 0.3s ease',
                textShadow: isPoweringUp ? `0 0 40px rgba(47,198,213,0.4)` : 'none',
              }}
            >
              {String(progress).padStart(3, '0')}
            </span>
            <span
              className="text-lg md:text-xl font-mono"
              style={{
                color: isPoweringUp ? 'rgba(47,198,213,0.6)' : 'rgba(255,255,255,0.08)',
                transition: 'color 0.3s ease',
              }}
            >
              %
            </span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.3em] text-zinc-800 uppercase">
        SYS.BOOT
      </div>
      <div className="absolute top-6 right-6 font-mono text-[9px] tracking-[0.3em] text-zinc-800 uppercase">
        v2.0.{progress}
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[9px] tracking-[0.3em] text-zinc-800 uppercase">
        GEAR_ARCH
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.3em] text-zinc-800 uppercase">
        {statusText.replace('▸ ', '')}
      </div>
    </div>
  )
}
