'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function UnifiedTimelineLayout({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 20%", "end 80%"]
    })

    // Height grows from 0 to 100% as we scroll through the container
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <div ref={containerRef} className="relative">
            {/* 
                THE UNITY SPINE 
                Positioned absolutely to span the entire height of this wrapper.
                It mimics the layout constraints (max-w, mx-auto, px) of the children.
            */}
            <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-0">
                <div className="max-w-[1440px] h-full mx-auto px-4 sm:px-6 md:px-8 relative">
                    {/* The Track (Faint) - Full Height */}
                    <div className="absolute left-4 md:left-[30px] top-[8.5rem] bottom-0 w-1 bg-white/5 rounded-full hidden md:block" />

                    {/* The Drawing Spine — Subtle, refined */}
                    <motion.div
                        style={{ height }}
                        className="absolute left-4 md:left-[30px] top-[8.5rem] w-1 bg-slate-600 rounded-full origin-top hidden md:block"
                    />
                </div>
            </div>

            {/* Content (DesignEngineerBlock + EnergyStack) */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}
