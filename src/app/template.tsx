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
            {/* ── Light sweep — horizontal scanner line ── */}
            <motion.div
                className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease }}
            >
                {/* Horizontal glow line that sweeps down */}
                <motion.div
                    className="absolute left-0 right-0 h-[2px]"
                    style={{
                        background: 'linear-gradient(90deg, transparent, var(--accent-teal), transparent)',
                        boxShadow: '0 0 30px 8px var(--overlay-cyan-electric-15), 0 0 60px 16px var(--overlay-cyan-neon-26)',
                    }}
                    initial={{ top: '0%', opacity: 0 }}
                    animate={{
                        top: '100%',
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                        times: [0, 0.1, 0.7, 1],
                    }}
                />
            </motion.div>

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
