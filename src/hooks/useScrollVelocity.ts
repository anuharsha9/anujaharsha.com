'use client'

import { useScroll, useSpring, useTransform, useVelocity, MotionValue } from 'framer-motion'

/**
 * useScrollVelocity — physics-based scroll velocity hook
 * 
 * Returns spring-smoothed values derived from scroll velocity
 * for creating organic, momentum-driven motion effects.
 * 
 * Usage:
 *   const { scrollVelocity, skewY, scaleX } = useScrollVelocity()
 *   <m.div style={{ skewY, scaleX }} />
 */
export function useScrollVelocity(options?: {
    /**  Max skew in degrees (default: 3) */
    maxSkew?: number
    /**  Scale range on velocity (default: 0.02) */
    scaleIntensity?: number
    /**  Spring stiffness (default: 300) */
    stiffness?: number
    /**  Spring damping (default: 30) */
    damping?: number
}) {
    const {
        maxSkew = 3,
        scaleIntensity = 0.02,
        stiffness = 300,
        damping = 30,
    } = options ?? {}

    const { scrollY } = useScroll()
    const rawVelocity = useVelocity(scrollY)

    // Smooth the velocity with spring physics
    const smoothVelocity = useSpring(rawVelocity, {
        stiffness,
        damping,
        mass: 0.5,
        restDelta: 0.001,
    })

    // Skew: slight tilt in scroll direction (feels like momentum)
    const skewY = useTransform(smoothVelocity, [-3000, 0, 3000], [-maxSkew, 0, maxSkew])

    // ScaleX: slight horizontal stretch on fast scroll (elastic feel)
    const scaleX = useTransform(
        smoothVelocity,
        [-3000, 0, 3000],
        [1 + scaleIntensity, 1, 1 + scaleIntensity]
    )

    // Normalized velocity (0-1 range, direction-agnostic)
    const velocityFactor = useTransform(smoothVelocity, [-2000, 0, 2000], [1, 0, 1])

    return {
        scrollVelocity: smoothVelocity,
        skewY,
        scaleX,
        velocityFactor,
        rawVelocity,
    }
}

/**
 * useParallax — multi-depth parallax driven by a scroll progress MotionValue
 * 
 * Returns Y-offset values for different "depth" layers:
 *   near = items close to camera (move fast)
 *   mid  = items at middle depth
 *   far  = items far away (move slow, opposite direction)
 */
export function useParallax(scrollYProgress: MotionValue<number>, intensity = 1) {
    const near = useTransform(scrollYProgress, [0, 1], [0, -120 * intensity])
    const mid = useTransform(scrollYProgress, [0, 1], [0, -60 * intensity])
    const far = useTransform(scrollYProgress, [0, 1], [40 * intensity, -40 * intensity])

    // Spring-smoothed variants for organic feel
    const nearSpring = useSpring(near, { stiffness: 100, damping: 20, mass: 0.5 })
    const midSpring = useSpring(mid, { stiffness: 120, damping: 25, mass: 0.3 })
    const farSpring = useSpring(far, { stiffness: 80, damping: 30, mass: 0.8 })

    return { near: nearSpring, mid: midSpring, far: farSpring }
}
