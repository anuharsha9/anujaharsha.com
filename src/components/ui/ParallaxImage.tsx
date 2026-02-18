'use client'

import React, { useRef } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

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
    alt,
    ...props
}: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null)

    // Entrance trigger — once per image, starts when 15% visible
    const isInView = useInView(ref, { once: true, margin: "-15% 0px -5% 0px" })

    // Scroll-linked Parallax (Apple-style momentum)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    })

    // Subtle zoom-out: starts slightly zoomed, settles to 1x
    const imageScale = useTransform(smoothProgress, [0, 1], [1.08, 1.0])

    // Y-axis parallax for depth
    const imageY = useTransform(smoothProgress, [0, 1], ["-3%", "3%"])

    return (
        <motion.div
            ref={ref}
            className={`relative overflow-hidden group/image ${containerClassName || ''}`}
            onClick={onClick}
            // Premium scroll reveal: clip-path wipe from bottom, with subtle scale & deblur
            initial={false}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                clipPath: 'inset(0% 0% 0% 0%)',
            } : {
                opacity: 0,
                y: 30,
                scale: 0.97,
                filter: 'blur(4px)',
                clipPath: 'inset(0% 0% 8% 0%)',
            }}
            transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                clipPath: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                filter: { duration: 0.6, delay: 0.1 },
                opacity: { duration: 0.5 },
            }}
        >
            <motion.div
                className="w-full h-full relative"
                style={enableParallax ? { scale: imageScale, y: imageY } : undefined}
            >
                <Image
                    alt={alt || ''}
                    {...props}
                    className={`transition-opacity duration-500 ${className || ''}`}
                />
            </motion.div>

            {/* Subtle hover overlay for clickable images */}
            {onClick && (
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/5 transition-colors duration-500 pointer-events-none" />
            )}
        </motion.div>
    )
}
