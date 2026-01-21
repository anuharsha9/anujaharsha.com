'use client'

import { motion, AnimatePresence, useScroll, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState, useMemo, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import VideoModal from '@/components/video/VideoModal'
import GearBottomSheet from '@/components/home/GearBottomSheet'
import { GEAR_INSPECTOR, GearInspectorItem } from '@/data/gear-inspector'
import { getTheme, spacing } from '@/lib/design-system'
import Magnetic from '@/components/ui/Magnetic'
import { BRAIN_GEARS_SVG } from '@/data/brain-gears-svg'

// Counter Component for animated numbers
function Counter({ value, duration = 2 }: { value: number, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const isInView = useRef(false)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    // Delay animation slightly to sync with entrance
    const controls = animate(0, value, {
      duration,
      delay: 1.8, // Wait for hero to settle
      onUpdate(v) {
        node.textContent = Math.floor(v).toLocaleString()
      },
      ease: [0.22, 1, 0.36, 1]
    })

    return () => controls.stop()
  }, [value, duration])

  return <span ref={nodeRef}>0</span>
}

const GEAR_IDS = Object.keys(GEAR_INSPECTOR)


// Memoized SVG container to prevent re-renders when activeGear state changes
const GearsSvgContainer = memo(function GearsSvgContainer({
  svgContent,
  containerRef
}: {
  svgContent: string
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <motion.div
      ref={containerRef}
      className="gears-dark-theme w-full"
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
})

/**
 * HeroSplit - "Gear Inspector" Experience
 * Hover on gears to peek inside my brain - each gear reveals actual work
 */
export default function HeroSplit() {
  const router = useRouter()
  const t = getTheme(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [activeGear, setActiveGear] = useState<GearInspectorItem | null>(null)
  const [activeCoords, setActiveCoords] = useState<{ x: number, y: number, side: 'left' | 'right' } | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isCardHovered, setIsCardHovered] = useState(false)
  const [showMobileSheet, setShowMobileSheet] = useState(false)
  const [mobileGear, setMobileGear] = useState<GearInspectorItem | null>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [svgContent, setSvgContent] = useState<string>('')

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const gearsY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3])

  // Load SVG inline so Turbopack (no SVGR) can manipulate DOM
  // Strip width/height so SVG scales to container (like SVGR did)
  useEffect(() => {
    // Process the hardcoded SVG constant
    // Remove width/height attributes (handle both single and double quotes)
    let processed = BRAIN_GEARS_SVG
      .replace(/width=["'][^"']*["']/g, '')
      .replace(/height=["'][^"']*["']/g, '')

    // Add width/height 100% to the SVG element for proper scaling
    processed = processed.replace(
      /<svg/,
      '<svg style="width:100%;height:auto"'
    )
    setSvgContent(processed)
  }, [])

  useEffect(() => {
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
        const fadeInDuration = 2.0
        const slowDownTime = 2.0
        const mainGearSlowDownPercent = 0.30

        // New structure: gears are direct children of #main-gears with IDs like gear-life, gear-career-ambition
        const mainGearsGroup = brainGearsGroup.querySelector<SVGGElement>('#main-gears')
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
          gear.style.setProperty('animation', `gear-fade-in-main ${fadeInDuration}s linear forwards, gear-rotate-continuous ${slowRotationSpeed}s linear infinite ${slowDownTime}s`, 'important')
          gear.style.transformOrigin = 'center'
          gear.style.transformBox = 'fill-box'

          // After fade-in completes, set opacity directly to prevent any hover state issues
          setTimeout(() => {
            gear.style.setProperty('opacity', '1', 'important')
          }, (fadeInDuration + 0.2) * 1000)
        })

        const bgGears = Array.from(brainGearsGroup.querySelectorAll<SVGGElement>('[id^="bg-gear-"]'))
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
          gear.style.setProperty('animation', `gear-fade-in-bg ${fadeInDuration}s linear forwards, gear-rotate-bg-slow ${slowBgRotationSpeed}s linear infinite ${slowDownTime}s`, 'important')
        })
      }

      const setTransformOrigins = () => {
        // Main gears under #main-gears
        const mainGearsGroup = brainGearsGroup.querySelector<SVGGElement>('#main-gears')
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
        const bgGears = brainGearsGroup.querySelectorAll<SVGGElement>('[id^="bg-gear-"]')
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
        const linesBackground = brainGearsGroup.querySelector<SVGGElement>('#lines-background')
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
        const mainGearsGroup = brainGearsGroup.querySelector<SVGGElement>('#main-gears')
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

            const allActiveGears = brainGearsGroup.querySelectorAll<SVGGElement>('.gear-main--active')
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
              const activeGears = Array.from(brainGearsGroup.querySelectorAll<SVGGElement>('.gear-main--active'))
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
              const allActiveGears = brainGearsGroup.querySelectorAll<SVGGElement>('.gear-main--active')
              allActiveGears.forEach((ag) => {
                ag.classList.remove('gear-main--active')
                ag.style.removeProperty('--gear-accent')
              })
              gearGroup.classList.add('gear-main--active')
              gearGroup.style.setProperty('--gear-accent', gearData.accentColor)
            } else {
              // Desktop: Toggle behavior (fallback for click)
              const isCurrentlyActive = gearGroup.classList.contains('gear-main--active')

              const allActiveGears = brainGearsGroup.querySelectorAll<SVGGElement>('.gear-main--active')
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
      setupLineDrawing()
      const hoverCleanup = setupHoverListeners()

      cleanup = () => {
        if (hoverCleanup) hoverCleanup()
      }
    }

    setup()

    return () => {
      if (cleanup) cleanup()
    }
  }, [router])

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

  return (
    <>
      <section
        ref={heroRef}
        id="hero"
        className="bg-slate-950 relative min-h-screen flex flex-col overflow-hidden"
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow effect behind gears - with parallax */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ y: glowY }}
        >
          <motion.div
            className="w-[750px] h-[750px] bg-[var(--accent-teal)]/10 rounded-full blur-[150px]"
            style={{ scale: glowScale }}
          />
        </motion.div>


        {/* Main Content Container - Centered Layout */}
        <div className={`${spacing.containerFull} relative z-10 flex-1 flex flex-col items-center justify-center`}>
          <div className="w-full flex flex-col items-center justify-center py-4 lg:py-10">

            {/* Centered Gears - THE HERO - with subtle parallax */}
            <motion.div
              className="relative w-[320px] xs:w-[380px] sm:w-[480px] md:w-[580px] lg:w-[680px] xl:w-[740px] 2xl:w-[900px] max-w-full mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: gearsY }}
            >
              <GearsSvgContainer svgContent={svgContent} containerRef={containerRef} />

              {/* Center hint - shown when no gear is active */}
              <AnimatePresence mode="wait">
                {!activeGear && (
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
                          <span className="text-slate-500">to explore my portfolio</span>
                        </span>
                        <span className="lg:hidden">
                          Tap on the rotating gears<br />
                          <span className="text-slate-500">to explore my portfolio</span>
                        </span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* GEAR INSPECTOR - Proximity Popover */}
              <AnimatePresence mode="wait">
                {activeGear && activeCoords && (
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
              className={`flex flex-col items-center text-center space-y-4 sm:space-y-5 mt-8 sm:mt-12 lg:mt-12 px-4`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Main Headline */}
              <h1 className={`font-serif text-white leading-[1.1] tracking-tight text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl max-w-6xl`}>
                Architecting Enterprise UX through <span className="text-[var(--accent-teal)]">ambiguity.</span>
              </h1>

              {/* Professional Title */}
              <p className="text-[var(--accent-teal)] font-mono text-xs xs:text-sm sm:text-base md:text-lg tracking-wide leading-relaxed md:whitespace-nowrap">
                Senior Product Designer · Enterprise UX · Code Prototyping
              </p>



            </motion.div>


          </div>
        </div>

        <motion.div
          className="w-full border-t border-slate-800 bg-[#020617]/80 backdrop-blur-md z-20 relative mt-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        >
          {/* Scroll Indicator Removed to prevent overlap with CTAs */}

          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-2 lg:grid-cols-5 divide-x-0 lg:divide-x divide-slate-800">
              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center py-6 px-4 group hover:bg-white/[0.02] transition-colors border-r border-b lg:border-0 border-slate-800">
                <div className="text-[var(--accent-teal)] font-mono text-lg sm:text-xl lg:text-2xl font-bold tracking-tight mb-1.5">
                  <Counter value={50} />+
                </div>
                <div className="text-slate-600 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-center font-bold">
                  Projects Shipped
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center py-6 px-4 group hover:bg-white/[0.02] transition-colors border-b lg:border-0 border-slate-800">
                <div className="text-[var(--accent-teal)] font-mono text-lg sm:text-xl lg:text-2xl font-bold tracking-tight mb-1.5">
                  <Counter value={25} />M+
                </div>
                <div className="text-slate-600 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-center font-bold">
                  Users on WebFOCUS
                </div>
              </div>

              {/* Center CTAs */}
              <div className="col-span-2 lg:col-span-1 flex flex-col items-center justify-center p-2 lg:p-0 border-b lg:border-0 border-slate-800 bg-white/[0.02]">
                <div className="flex flex-row lg:flex-col gap-2 w-full h-full">
                  <a
                    href="#work-overview"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 lg:py-0 rounded-lg lg:rounded-none bg-[var(--accent-teal-800)] text-white text-sm font-bold hover:bg-[var(--accent-teal-700)] transition-all duration-300 shadow-[0_0_15px_rgba(7,139,156,0.2)] hover:shadow-[0_0_25px_rgba(7,139,156,0.4)] whitespace-nowrap border-r-0 lg:border-b border-transparent"
                    onClick={(e) => {
                      e.preventDefault()
                      const section = document.getElementById('work-overview')
                      if (section) {
                        section.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    <span>See Work</span>
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>

                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="flex-1 group inline-flex items-center justify-center gap-2 px-4 py-3 lg:py-0 rounded-lg lg:rounded-none border-2 lg:border-0 border-slate-700 lg:border-t lg:border-slate-800 text-slate-300 text-sm font-bold hover:bg-[var(--accent-teal)]/10 hover:text-white transition-all duration-300 whitespace-nowrap"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-teal)] opacity-75"></span>
                      <span className="relative inline-flex items-center justify-center rounded-full h-2.5 w-2.5 bg-[var(--accent-teal)]"></span>
                    </span>
                    <span>Watch Intro</span>
                  </button>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center py-6 px-4 group hover:bg-white/[0.02] transition-colors border-r lg:border-0 border-slate-800">
                <div className="text-[var(--accent-teal)] font-mono text-lg sm:text-xl lg:text-2xl font-bold tracking-tight mb-1.5">
                  Fortune 500
                </div>
                <div className="text-slate-600 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-center font-bold">
                  Enterprise Clients
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center justify-center py-6 px-4 group hover:bg-white/[0.02] transition-colors">
                <div className="text-[var(--accent-teal)] font-mono text-lg sm:text-xl lg:text-2xl font-bold tracking-tight mb-1.5">
                  Best-in-Class
                </div>
                <div className="text-slate-600 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-center font-bold">
                  2025 Dresner Award
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoSrc="/videos/portfolio-teaser.mp4"
      />

      {/* Mobile Bottom Sheet for Gear Inspector */}
      <GearBottomSheet
        gear={mobileGear}
        isOpen={showMobileSheet}
        onClose={() => {
          setShowMobileSheet(false)
          // Clear the active gear highlight after a short delay
          setTimeout(() => {
            const container = containerRef.current
            if (container) {
              const allActiveGears = container.querySelectorAll<SVGGElement>('.gear-main--active')
              allActiveGears.forEach((ag) => {
                ag.classList.remove('gear-main--active')
                ag.style.removeProperty('--gear-accent')
              })
            }
          }, 300)
        }}
      />
    </>
  )
}
