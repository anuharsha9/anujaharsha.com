'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ChairPhilosophy() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'] // From bottom of viewport to top
    })

    // Adjusted fade-ins to happen more naturally as the user scrolls, but finish early to hold the phrase
    const text1Opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1])
    const text2Opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1])
    const text3Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1])
    const text4Opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])

    const text1Y = useTransform(scrollYProgress, [0.05, 0.15], [40, 0])
    const text2Y = useTransform(scrollYProgress, [0.15, 0.25], [40, 0])
    const text3Y = useTransform(scrollYProgress, [0.35, 0.45], [40, 0])
    const text4Y = useTransform(scrollYProgress, [0.5, 0.6], [40, 0])

    // Scale it down to avoid dead space, but hold at the end
    return (
        <section ref={containerRef} className="relative w-full bg-black/40 h-[220vh]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center space-y-8 md:space-y-12">
                    <motion.h3
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/50"
                        style={{ opacity: text1Opacity, y: text1Y }}
                    >
                        &quot;When you look at a chair...
                    </motion.h3>
                    <motion.h3
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/70"
                        style={{ opacity: text2Opacity, y: text2Y }}
                    >
                        ...the only thing that comes to mind is to sit on it.
                    </motion.h3>
                    <motion.h3
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/90"
                        style={{ opacity: text3Opacity, y: text3Y }}
                    >
                        Good UX should feel exactly like that.
                    </motion.h3>
                    <motion.h3
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-300 to-slate-500 mt-8"
                        style={{ opacity: text4Opacity, y: text4Y }}
                    >
                        Invisible.&quot;
                    </motion.h3>
                </div>
            </div>
        </section>
    )
}
