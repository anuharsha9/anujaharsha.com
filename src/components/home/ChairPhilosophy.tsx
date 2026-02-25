'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ChairPhilosophy() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'] // From bottom of viewport to top
    })

    // Sequential fade ins for each line
    const text1Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0])
    const text2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.8, 0.9], [0, 1, 1, 0])
    const text3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0])
    const text4Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.85, 0.95], [0, 1, 1, 0])

    const text1Y = useTransform(scrollYProgress, [0.1, 0.2], [40, 0])
    const text2Y = useTransform(scrollYProgress, [0.3, 0.4], [40, 0])
    const text3Y = useTransform(scrollYProgress, [0.5, 0.6], [40, 0])
    const text4Y = useTransform(scrollYProgress, [0.7, 0.8], [40, 0])

    return (
        <section ref={containerRef} className="relative w-full bg-black/40 h-[300vh]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center space-y-8 md:space-y-12">
                    <motion.h3
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white/50"
                        style={{ opacity: text1Opacity, y: text1Y }}
                    >
                        &quot;When you look at a chair...
                    </motion.h3>
                    <motion.h3
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white/70"
                        style={{ opacity: text2Opacity, y: text2Y }}
                    >
                        ...the only thing that comes to mind is to sit on it.
                    </motion.h3>
                    <motion.h3
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white/90"
                        style={{ opacity: text3Opacity, y: text3Y }}
                    >
                        Good UX should feel exactly like that.
                    </motion.h3>
                    <motion.h3
                        className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-300 to-slate-500 mt-8"
                        style={{ opacity: text4Opacity, y: text4Y }}
                    >
                        Invisible.&quot;
                    </motion.h3>
                </div>
            </div>
        </section>
    )
}
