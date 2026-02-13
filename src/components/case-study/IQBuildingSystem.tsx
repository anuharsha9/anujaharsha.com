'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import { useLightbox } from '@/contexts/LightboxContext'

interface IQBuildingSystemProps {
    isLightBackground?: boolean
}

export default function IQBuildingSystem({ isLightBackground = true }: IQBuildingSystemProps) {
    const { openLightbox } = useLightbox()

    const artifacts = [
        {
            src: '/images/case-study/iq-plugin/IQ Structure flowchart.png',
            alt: 'IQ Plugin System Architecture Flowchart',
            caption: 'Complete flowchart mapping user journeys across NLQ, Insights, and Predict Data.',
            width: 1400, // Approximate dims for proper ratio
            height: 600
        },
        {
            src: '/images/case-study/iq-plugin/Structure Layout in HUB 1.png',
            alt: 'IQ Plugin Structure in WebFOCUS Hub',
            caption: 'How IQ Plugin fits within the existing WebFOCUS Hub architecture.',
            width: 800,
            height: 600
        },
        {
            src: '/images/case-study/iq-plugin/IQ Dataset Selection Workflow 2.png',
            alt: 'Unified Dataset Selection Workflow',
            caption: 'The unified dataset selection pattern used across all features.',
            width: 800,
            height: 600
        },
        {
            src: '/images/case-study/iq-plugin/IQ Wireframes.png',
            alt: 'IQ Plugin Early Wireframes',
            caption: 'Early wireframe explorations testing navigation patterns.',
            width: 800,
            height: 600
        },
        {
            src: '/images/case-study/iq-plugin/Mockups for IQ Plugin Reponsive UI 1.png',
            alt: 'IQ Plugin Responsive UI Mockups',
            caption: 'Mobile-first responsive layouts for Enterprise BI.',
            width: 800,
            height: 600
        },
    ]

    const renderItem = (index: number, gridAreaClass: string) => {
        const artifact = artifacts[index]
        if (!artifact) return null

        return (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group flex flex-col gap-3 ${gridAreaClass}`}
            >
                {/* Image Container - No Box, Natural Size */}
                <div
                    className="relative w-full cursor-zoom-in overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                    onClick={() => openLightbox(artifact.src, artifact.alt)}
                >
                    <Image
                        src={artifact.src}
                        alt={artifact.alt}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        className="transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                    />

                    {/* Subtle Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-300" />
                </div>

                {/* Minimal Caption */}
                <div className="flex flex-col gap-1 px-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-violet)] font-semibold">
                        {`// ${artifact.alt.toUpperCase().substring(0, 20)}...`}
                    </span>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
                        {artifact.caption}
                    </p>
                </div>
            </motion.div>
        )
    }

    return (
        <div className={`w-full ${isLightBackground ? '' : ''} py-8`}>
            <div className="max-w-[1440px] mx-auto">

                <ComponentHeading
                    tag="// SYSTEM_ARCHITECTURE"
                    title="Building the System"
                    description="From flowcharts to responsive mockups—the structural foundation that makes three complex features feel like one unified experience."
                    color="text-[var(--accent-violet)]"
                    align="center"
                    className="mb-12 md:mb-16"
                />

                {/* Clean Grid Layout - Natural Sizes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-7xl mx-auto px-4 perspective-[2000px]">

                    {/* Top Row: System Architecture Flow (Index 0) - Full Width */}
                    {renderItem(0, "md:col-span-2")}

                    {/* Middle Row: Hub Structure (1) & Dataset Workflow (2) */}
                    {renderItem(1, "md:col-span-1")}
                    {renderItem(2, "md:col-span-1")}

                    {/* Bottom Row: Wireframes (3) & Mockups (4) */}
                    {renderItem(3, "md:col-span-1")}
                    {renderItem(4, "md:col-span-1")}

                </div>
            </div>
        </div>
    )
}
