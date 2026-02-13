'use client'

import React, { useRef } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface ParallaxImageProps extends Omit<ImageProps, 'className'> {
    className?: string
    containerClassName?: string
    enableParallax?: boolean
}

export default function ParallaxImage({
    className,
    containerClassName,
    enableParallax = true,
    onClick,
    ...props
}: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null)

    // Scroll-linked Parallax Zoom (Apple/iPhone Style)
    // 1. Use a larger offset to start earlier and end later
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // 2. Add Physics (Mass/Spring) to the scroll value
    // This creates the "momentum" feel where the animation lags slightly behind the scroll
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    })

    // 3. Deeper Transformations
    // Zoom out effect: Starts at 1.15x (zoomed in), settles to 1.0x (normal)
    const imageScale = useTransform(smoothProgress, [0, 1], [1.15, 1.0])

    // Y-Axis Parallax: Moves the image slightly opposite to scroll direction
    const imageY = useTransform(smoothProgress, [0, 1], ["-5%", "5%"])

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden group/image ${containerClassName || ''}`}
            onClick={onClick}
        >
            <motion.div
                className="w-full h-full relative"
                style={enableParallax ? { scale: imageScale, y: imageY } : undefined}
            >
                <Image
                    {...props}
                    className={`transition-opacity duration-500 ${className || ''}`}
                />
            </motion.div>

            {/* Optional Overlay for interaction feedback */}
            {onClick && (
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 pointer-events-none" />
            )}
        </div>
    )
}
