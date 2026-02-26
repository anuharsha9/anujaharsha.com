'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'
import { useLightbox } from '@/contexts/LightboxContext'

interface IQIdeaLabProps {
    isLightBackground?: boolean
}

export default function IQIdeaLab({ isLightBackground = true }: IQIdeaLabProps) {
    const { openLightbox } = useLightbox()

    // Defined locally to curate specific items (Removing Flowchart that is in Building System)
    const artifacts = [
        {
            src: '/images/case-study/iq-plugin/hand-drawn-sketches.png',
            alt: 'Rapid Board Ideation',
            caption: 'Messy, rapid whiteboard sessions mapping out the NLP-to-Insight logic.',
            span: 'md:col-span-2' // Full Width
        },
        {
            src: '/images/case-study/iq-plugin/Structure Layout in HUB 1.png',
            alt: 'Hub Integration Spec',
            caption: 'Defining how the plugin lives inside the existing WebFOCUS Hub ecosystem.',
            span: 'md:col-span-1' // Half Width
        },
        {
            src: '/images/case-study/iq-plugin/IQ Wireframes.png',
            alt: 'Low-Fidelity Wireframes',
            caption: 'First-pass structural wireframes focusing on navigation and panel states.',
            span: 'md:col-span-1' // Half Width
        },
        {
            src: '/images/case-study/iq-plugin/Early concept - 1.png',
            alt: 'Initial Concept Mockup',
            caption: 'High-fidelity exploration of the visual language and interaction model.',
            span: 'md:col-span-2' // Full Width
        }
    ]

    const renderItem = (index: number) => {
        const artifact = artifacts[index]
        if (!artifact) return null

        return (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group flex flex-col gap-3 ${artifact.span}`}
            >
                {/* Image Container - No Box, Natural Size, No Clipping */}
                <div
                    className="relative w-full cursor-zoom-in"
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
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Minimal Caption */}
                <div className="flex flex-col gap-1 px-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-teal)] font-semibold">
                        {`// ${artifact.alt.toUpperCase()}`}
                    </span>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-lg">
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
                    tag="EXPERIENCE LAB"
                    title="The Idea Lab"
                    description="3 products in 1 plugin. From napkin sketches to high-fidelity wireframes, mapping out how Natural Language, Insights, and Analysis would coexist."
                    color="teal"
                    className="mb-12 md:mb-16"
                />

                {/* Clean Bento Grid Layout - 2 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 max-w-7xl mx-auto px-4 perspective-[2000px]">

                    {artifacts.map((_, index) => renderItem(index))}

                </div>
            </div>
        </div>
    )
}
