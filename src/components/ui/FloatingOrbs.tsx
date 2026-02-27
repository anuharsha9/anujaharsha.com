'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * FloatingOrbs — ambient depth particles that drift across the page
 * 
 * Creates a sense of physicality and depth. Orbs move at different speeds
 * based on their "depth" layer, creating convincing parallax.
 * 
 * GPU-composited: uses only transform + opacity for 60fps.
 * Fixed position so they move across the full page.
 */

interface Orb {
    id: number
    x: string       // CSS position %
    y: string        // CSS position %
    size: number     // px diameter
    depth: number    // 0.2 (far) → 1.0 (near) — controls parallax speed
    hue: number      // color hue
    delay: number    // float animation offset
}

function generateOrbs(count: number, seed: number = 42): Orb[] {
    const orbs: Orb[] = []
    let s = seed
    const rand = () => {
        s = (s * 16807 + 0) % 2147483647
        return s / 2147483647
    }

    for (let i = 0; i < count; i++) {
        orbs.push({
            id: i,
            x: `${5 + rand() * 90}%`,
            y: `${5 + rand() * 90}%`,
            size: 2 + rand() * 4,
            depth: 0.2 + rand() * 0.8,
            hue: 170 + rand() * 30, // teal range
            delay: rand() * 10,
        })
    }
    return orbs
}

const ORBS = generateOrbs(8) // Tasteful — not too many

export default function FloatingOrbs() {
    const { scrollYProgress } = useScroll()

    return (
        <div
            className="fixed inset-0 pointer-events-none overflow-hidden z-[1]"
            aria-hidden="true"
        >
            {ORBS.map((orb) => (
                <OrbElement key={orb.id} orb={orb} scrollYProgress={scrollYProgress} />
            ))}
        </div>
    )
}

function OrbElement({
    orb,
    scrollYProgress,
}: {
    orb: Orb
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
    // Parallax: deeper orbs move less
    const parallaxRange = 300 * orb.depth
    const y = useTransform(scrollYProgress, [0, 1], [parallaxRange, -parallaxRange])

    // Spring-smooth for organic drift
    const ySpring = useSpring(y, {
        stiffness: 30 + orb.depth * 60,
        damping: 15 + orb.depth * 10,
        mass: 0.8,
    })

    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                left: orb.x,
                top: orb.y,
                width: orb.size,
                height: orb.size,
                y: ySpring,
                background: `radial-gradient(circle, hsla(${orb.hue}, 50%, 55%, 0.35), transparent)`,
                boxShadow: `0 0 ${orb.size * 3}px hsla(${orb.hue}, 50%, 45%, 0.12)`,
            }}
            // Gentle independent floating
            animate={{
                x: [0, orb.depth * 12, 0, -orb.depth * 8, 0],
                scale: [1, 1.08, 0.96, 1.04, 1],
                opacity: [0.25, 0.35, 0.2, 0.3, 0.25],
            }}
            transition={{
                duration: 14 + orb.delay,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: orb.delay,
            }}
        />
    )
}
