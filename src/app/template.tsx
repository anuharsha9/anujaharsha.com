'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div className="min-h-screen w-full">
            {/* The Curtain Layer - Slide UP to reveal content */}
            <motion.div
                className="fixed inset-0 z-[100] bg-[var(--bg-primary)] pointer-events-none"
                initial={{ scaleY: 1, transformOrigin: 'top' }}
                animate={{
                    scaleY: 0,
                    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }, // Power3.easeInOut
                }}
            />

            {/* Content Layer - Subtle scale/opacity for depth */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.3 }, // Wait for curtain to start lifting
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}
