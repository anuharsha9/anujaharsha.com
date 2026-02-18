'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * NeuralAwakening — Background circuit connector lines
 * 
 * Draws animated circuit-board-style paths (strictly horizontal + vertical)
 * across the viewport, starting exactly from each screen edge and drawing inward.
 * Mimics the brain SVG's #lines-background style.
 * 
 * - Color: var(--accent-teal) from design system tokens
 * - Strictly right-angle paths (H and V segments only)
 * - Paths start at the exact viewport edge
 * - Animation: line-draw-path (~24s per line, same as brain SVG)
 */

interface ConnectorPath {
    id: number
    d: string
    delay: number
    duration: number
}

interface JunctionCircle {
    id: number
    cx: number
    cy: number
    r: number
    delay: number
}

// Seeded pseudo-random for consistent renders
function createRng(seed: number) {
    let s = seed
    return () => {
        s = (s * 16807 + 0) % 2147483647
        return s / 2147483647
    }
}

/**
 * Generate right-angle connector paths that start exactly from viewport edges.
 * Each path alternates between horizontal and vertical segments only.
 */
function generateConnectorPaths(
    count: number,
    width: number,
    height: number
): { paths: ConnectorPath[]; circles: JunctionCircle[] } {
    const rand = createRng(42)
    const paths: ConnectorPath[] = []
    const circles: JunctionCircle[] = []
    let circleId = 0

    // Distribute paths across all 4 edges
    const perEdge = Math.ceil(count / 4)

    for (let i = 0; i < count; i++) {
        const edges = [0, 1, 3]  // top, right, left — skip bottom to keep CTAs clear
        const edge = edges[i % 3]
        let x: number, y: number
        let firstDirection: 'h' | 'v'  // first segment direction

        // Start EXACTLY at the viewport edge
        switch (edge) {
            case 0: // top edge — start at y=0, random x
                x = width * 0.1 + rand() * width * 0.8
                y = 0
                firstDirection = 'v'  // first move downward
                break
            case 1: // right edge — start at x=max, random y
                x = width
                y = height * 0.1 + rand() * height * 0.8
                firstDirection = 'h'  // first move leftward
                break
            case 2: // bottom edge — start at y=max, random x
                x = width * 0.1 + rand() * width * 0.8
                y = height
                firstDirection = 'v'  // first move upward
                break
            default: // left edge — start at x=0, random y
                x = 0
                y = height * 0.1 + rand() * height * 0.8
                firstDirection = 'h'  // first move rightward
                break
        }

        // Starting circle at the edge
        circles.push({
            id: circleId++,
            cx: x,
            cy: y,
            r: 2 + rand() * 2.5,
            delay: i * 800 + 3000 + rand() * 4000,
        })

        let d = `M ${x.toFixed(1)} ${y.toFixed(1)}`

        // Build 3-6 strictly right-angle segments
        const segments = 3 + Math.floor(rand() * 4)
        let currentDir = firstDirection

        // Central exclusion zone — brain SVG area (generous padding around center)
        const exLeft = width * 0.25
        const exRight = width * 0.75
        const exTop = height * 0.20
        const exBottom = height * 0.80

        // Direction toward center (but clamped before reaching it)
        const towardCenterX = (width / 2 - x) > 0 ? 1 : -1
        const towardCenterY = (height / 2 - y) > 0 ? 1 : -1

        for (let s = 0; s < segments; s++) {
            const segLen = 40 + rand() * 120  // 40–160px per segment

            if (currentDir === 'h') {
                const dir = s === 0 ? towardCenterX : (rand() > 0.3 ? towardCenterX : -towardCenterX)
                let newX = x + segLen * dir
                newX = Math.max(0, Math.min(width, newX))
                // Clamp at exclusion zone boundary
                if (y > exTop && y < exBottom) {
                    if (x <= exLeft && newX > exLeft) newX = exLeft
                    if (x >= exRight && newX < exRight) newX = exRight
                }
                x = newX
                d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
                currentDir = 'v'
            } else {
                const dir = s === 0 ? towardCenterY : (rand() > 0.3 ? towardCenterY : -towardCenterY)
                let newY = y + segLen * dir
                newY = Math.max(0, Math.min(height, newY))
                // Clamp at exclusion zone boundary
                if (x > exLeft && x < exRight) {
                    if (y <= exTop && newY > exTop) newY = exTop
                    if (y >= exBottom && newY < exBottom) newY = exBottom
                }
                y = newY
                d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
                currentDir = 'h'
            }
        }

        // Ending circle
        circles.push({
            id: circleId++,
            cx: x,
            cy: y,
            r: 2 + rand() * 2.5,
            delay: i * 800 + 12000 + rand() * 6000,
        })

        paths.push({
            id: i,
            d,
            delay: i * 800 + 3000 + rand() * 3000,
            duration: 20000 + rand() * 8000,  // 20–28s (matches brain SVG's 24s)
        })
    }

    return { paths, circles }
}

export default function NeuralAwakening() {
    const svgRef = useRef<SVGSVGElement>(null)
    const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
    const [isReady, setIsReady] = useState(false)
    const dataRef = useRef<{ paths: ConnectorPath[]; circles: JunctionCircle[] }>({
        paths: [],
        circles: [],
    })

    // Measure viewport
    useEffect(() => {
        if (typeof window === 'undefined') return
        const update = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight })
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    // Generate path data
    useEffect(() => {
        dataRef.current = generateConnectorPaths(12, dimensions.width, dimensions.height)
        setIsReady(true)
    }, [dimensions])

    // Animate with stroke-dasharray draw-on (same as brain SVG lines-background)
    useEffect(() => {
        if (!isReady || !svgRef.current) return

        const paths = svgRef.current.querySelectorAll<SVGPathElement>('.neural-line')
        paths.forEach((path) => {
            try {
                const pathLength = path.getTotalLength()
                if (pathLength > 0 && isFinite(pathLength)) {
                    path.style.setProperty('--path-length', String(pathLength))
                    path.setAttribute('stroke-dasharray', String(pathLength))
                    path.setAttribute('stroke-dashoffset', String(pathLength))
                    path.style.opacity = '0'
                    path.setAttribute('opacity', '0')

                    const duration = path.dataset.duration || '24000'
                    const delay = path.dataset.delay || '0'

                    // Same line-draw-path animation from globals.css
                    path.style.animation = `line-draw-path ${duration}ms ease-out ${delay}ms forwards`
                }
            } catch {
                // Silent fail
            }
        })

        // Animate junction circles
        const circles = svgRef.current.querySelectorAll<SVGCircleElement>('.neural-circle')
        circles.forEach((circle) => {
            const delay = circle.dataset.delay || '0'
            circle.style.animation = `neural-circle-fade 2000ms ease-out ${delay}ms forwards`
        })
    }, [isReady])

    if (!isReady) return null

    const { paths, circles } = dataRef.current

    return (
        <div
            className="fixed top-0 left-0 z-0 pointer-events-none"
            style={{ width: '100vw', height: '100vh', opacity: 0.5 }}
            aria-hidden="true"
        >
            <svg
                ref={svgRef}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                preserveAspectRatio="none"
                style={{ width: '100vw', height: '100vh', overflow: 'visible', display: 'block' }}
            >
                {/* Right-angle connector paths — teal accent, matching brain SVG style */}
                {paths.map((p) => (
                    <path
                        key={`line-${p.id}`}
                        className="neural-line"
                        d={p.d}
                        fill="none"
                        stroke="var(--accent-teal)"
                        strokeWidth={1}
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        opacity={0}
                        data-duration={Math.round(p.duration)}
                        data-delay={Math.round(p.delay)}
                    />
                ))}

                {/* Junction circles at path endpoints */}
                {circles.map((c) => (
                    <circle
                        key={`circle-${c.id}`}
                        className="neural-circle"
                        cx={c.cx}
                        cy={c.cy}
                        r={c.r}
                        fill="none"
                        stroke="var(--accent-teal)"
                        strokeWidth={1}
                        opacity={0}
                        data-delay={Math.round(c.delay)}
                    />
                ))}
            </svg>
        </div>
    )
}
