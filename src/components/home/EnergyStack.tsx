'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CAREER_DATA } from '@/data/career-data'
import ImmersiveEraBlock from './ImmersiveEraBlock'
import MilestoneConnector from './MilestoneConnector'

function TimelineSpine() {
    const { scrollYProgress } = useScroll()

    // Fade in after hero, subtle throughout timeline, fade out at bottom
    const spineOpacity = useTransform(
        scrollYProgress,
        [0, 0.05, 0.1, 0.85, 0.95, 1],
        [0, 0.12, 0.18, 0.18, 0.08, 0]
    )

    return (
        <motion.div
            className="fixed left-1/2 top-0 bottom-0 w-px -ml-[0.5px] pointer-events-none z-[1]"
            style={{ opacity: spineOpacity }}
        >
            {/* Main spine line */}
            <div className="w-px h-full bg-gradient-to-b from-transparent via-[var(--accent-teal)] to-transparent" />

            {/* Pulsing glow behind the line */}
            <div className="absolute inset-0 w-[3px] -ml-px bg-gradient-to-b from-transparent via-[var(--accent-teal)] to-transparent blur-md opacity-50 animate-pulse" />
        </motion.div>
    )
}

export default function EnergyStack() {
    return (
        <div className="relative">
            {/* Persistent Timeline Spine — fixed to viewport center */}
            <TimelineSpine />

            {/* Immersive Timeline - Each era is centered and scroll-triggered */}
            {CAREER_DATA.map((era, index) => (
                <React.Fragment key={era.id}>
                    <ImmersiveEraBlock
                        era={era}
                        index={index}
                        isLast={index === CAREER_DATA.length - 1}
                    />

                    {/* Render Connector Milestones between eras */}
                    {era.milestones && era.milestones.length > 0 && (
                        <MilestoneConnector milestones={era.milestones} />
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}
