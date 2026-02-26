'use client'

import React from 'react'
import { motion } from 'framer-motion'

/**
 * Page transition: Cinematic focus pull.
 * 
 * Content starts blurred, slightly scaled up, and faded — then sharpens
 * into focus like pulling focus on a cinema lens. A thin horizontal light
 * sweep adds the wireframe/scanner aesthetic of the rest of the portfolio.
 */

const ease = [0.22, 1, 0.36, 1] as const

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div className="min-h-screen w-full relative">



            {/* ── Content — cinematic focus pull ── */}
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 1.015,
                    filter: 'blur(12px) brightness(0.7)',
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px) brightness(1)',
                }}
                transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease,
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}
