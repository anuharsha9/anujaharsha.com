'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, ArrowRight, MessageSquare, Lightbulb, Layout, Quote, Layers } from 'lucide-react'
import { useLightbox } from '@/contexts/LightboxContext'
import ComponentHeading from '@/components/ui/ComponentHeading'

// --- DATA: MERGED FEATURE LIST ---
const features = [
    {
        id: 'nlq',
        title: 'Natural Language Query (NLQ)',
        description: 'Ask questions in plain English, get instant visualizations. I designed the complete workflow—from empty states to error handling to results display. Users ask questions in natural language, and the system intelligently maps them to the correct data visualization.',
        icon: MessageSquare,
        iconColor: 'bg-blue-500',
        status: 'SHIPPING_NOW',
        demoLink: 'https://www.youtube.com/watch?v=LDaGvuS4K5Y',
        demoLabel: 'Watch Public Demo',
        screens: [
            {
                imageSrc: '/images/case-study/iq-plugin/NLQ _ Empty State Illustration.png',
                altText: 'NLQ Empty State',
                label: 'EMPTY_STATE',
            },
            {
                imageSrc: '/images/case-study/iq-plugin/NLQ _ Suggested Questions.png',
                altText: 'NLQ Suggested Questions',
                label: 'SUGGESTIONS',
            },
            {
                imageSrc: '/images/case-study/iq-plugin/NLQ _ Results View.png',
                altText: 'NLQ Results',
                label: 'RESULTS_VIEW',
            },
            {
                imageSrc: '/images/case-study/iq-plugin/NLQ _ Empty State Illustration - Error Screen with Back Button.png',
                altText: 'NLQ Error State',
                label: 'ERROR_HANDLING',
            },
        ],
    },
    {
        id: 'insights',
        title: 'Automated Insights',
        description: 'One-click statistical analysis with auto-generated insights. I owned the full visual system—including the custom color palette for data visualization. This feature automatically detects patterns, anomalies, and trends in any dataset.',
        icon: Lightbulb,
        iconColor: 'bg-amber-500',
        status: 'SHIPPING_NOW',
        demoLink: 'https://www.youtube.com/watch?v=ggcv8b7EKXo',
        demoLabel: 'Watch Public Demo',
        screens: [
            {
                imageSrc: '/images/case-study/iq-plugin/Insights in HUB - Empty state.png',
                altText: 'Insights Empty State',
                label: 'EMPTY_STATE',
            },
            {
                imageSrc: '/images/case-study/iq-plugin/Insights - Results - Tile View 1.png',
                altText: 'Insights Results Tile View',
                label: 'TILE_VIEW',
            },
            {
                imageSrc: '/images/case-study/iq-plugin/Insights in HUB - Results view.png',
                altText: 'Insights Results in Hub',
                label: 'RESULTS_VIEW',
            },
            {
                imageSrc: '/images/case-study/iq-plugin/Insights Color Palette 1.png',
                altText: 'Insights Color Palette',
                label: 'COLOR_SYSTEM',
            },
        ],
    },
    {
        id: 'ml',
        title: 'Machine Learning (Predict Data)',
        description: 'Complete ML workflow redesign — model training, comparison, and explainability. While NLQ and Insights are shipping now, ML is scoped for 2026. This module allows users to train and run models directly within the unified platform.',
        icon: Layers,
        iconColor: 'bg-emerald-500',
        status: 'SHIPPING_2026',
        demoLink: '/work/ml-functions',
        demoLabel: 'View ML Case Study',
        isInternalLink: true,
        screens: [
            {
                imageSrc: '/images/case-study/ml-functions/1. Predict Data - Train Models - Empty State.png',
                altText: 'ML Empty State',
                label: 'EMPTY_STATE',
            },
            {
                imageSrc: '/images/case-study/ml-functions/4. Train Model Workflow - Step 1 - Select Problem Type.png',
                altText: 'Select Problem Type',
                label: 'TRAINING_FLOW',
            },
            {
                imageSrc: '/images/case-study/ml-functions/8. Train Model Workflow - Compare Models.png',
                altText: 'Compare Models',
                label: 'MODEL_COMPARE',
            },
            {
                imageSrc: '/images/case-study/ml-functions/17. Optimize Model Popup.png',
                altText: 'Optimize Model',
                label: 'OPTIMIZATION',
            },
        ],
    },
]

interface IQWorkflowsAndFoundationProps {
    isLightBackground?: boolean
}

// Sub-component for Feature Detailed Section
interface FeatureCardProps {
    id: string
    title: string
    description: string
    icon: React.ElementType
    iconColor: string
    status: string
    screens: {
        imageSrc: string
        altText: string
        label: string
    }[]
    demoLink?: string
    demoLabel?: string
    isInternalLink?: boolean
}

const FeatureSection = ({ title, description, icon: Icon, iconColor, status, screens, demoLink, demoLabel, isInternalLink }: FeatureCardProps) => {
    const { openLightbox } = useLightbox()

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }

    return (
        <motion.div
            variants={itemVariants}
            className="space-y-8"
        >
            {/* Text Content - No Box */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColor} text-white shadow-md shrink-0`}>
                            <Icon size={20} />
                        </div>
                        <h3 className="font-sans text-2xl text-[var(--text-heading)] font-medium">{title}</h3>
                    </div>
                    <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-md bg-white/[0.05] ${status === 'SHIPPING_NOW' ? 'text-emerald-600' : 'text-blue-600'} self-start sm:self-center mt-1 sm:mt-0`}>
                        {status.replace('_', ' ')}
                    </span>
                </div>

                <p className="text-[var(--text-body)] leading-relaxed max-w-2xl">{description}</p>

                {demoLink && (
                    <div className="pt-1">
                        {isInternalLink ? (
                            <Link
                                href={demoLink}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                <span className="uppercase tracking-wide">{demoLabel}</span>
                                <ArrowRight size={14} />
                            </Link>
                        ) : (
                            <Link
                                href={demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-teal)] hover:text-[var(--accent-teal-700)] transition-colors"
                            >
                                <ExternalLink size={14} />
                                <span className="uppercase tracking-wide">{demoLabel}</span>
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {/* Screens - Clean Grid of Rounded Images */}
            <div className="grid grid-cols-2 gap-4">
                {screens.map((screen, index) => (
                    <div key={index} className="space-y-2 group cursor-pointer" onClick={() => openLightbox(screen.imageSrc, screen.altText)}>
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-white/[0.06] group-hover:shadow-md transition-all duration-300 bg-white/[0.03]">
                            <Image
                                src={screen.imageSrc}
                                alt={screen.altText}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                        <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest pl-1">
                            {'//'} {screen.label}
                        </p>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default function IQWorkflowsAndFoundation({ isLightBackground = false }: IQWorkflowsAndFoundationProps) {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }

    return (
        <div className="w-full py-16 md:py-24 bg-transparent">
            <motion.div
                className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >

                {/* Main Section Header */}
                <motion.div variants={itemVariants}>
                    <ComponentHeading
                        variant="block"
                        tag="FOUNDATION"
                        title="Three Workflows. One Foundation."
                        description="Before connecting them, I built each workflow independently. NLQ and Insights are shipping now. ML launches in 2026."
                        color="teal"
                        className="mb-20 md:mb-24"
                    />
                </motion.div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {features.map((feature, index) => (
                        <FeatureSection
                            key={index}
                            {...feature}
                        />
                    ))}
                </div>

                {/* Pattern Parity Footer - No Box */}
                <motion.div
                    variants={itemVariants}
                    className="max-w-4xl mx-auto mt-24 px-6"
                >
                    <div className="flex flex-col md:flex-row gap-6 items-start border-t border-white/[0.06] pt-8">
                        <div className="shrink-0">
                            <div className="w-12 h-12 rounded-full bg-white/[0.03] flex items-center justify-center text-[var(--accent-teal)]">
                                <Layout size={20} />
                            </div>
                        </div>
                        <div>
                            <span className="font-mono text-xs uppercase tracking-widest block mb-3 text-[var(--text-muted)]">
                                {'// PATTERN_PARITY'}
                            </span>
                            <p className="text-[var(--text-body)] leading-relaxed text-lg font-light">
                                <Quote className="inline-block w-4 h-4 text-slate-300 mr-2 -mt-2 rotate-180" />
                                Same empty state patterns. Same data selection flow. Same error handling.
                                When I built NLQ and Insights, I designed them as a <span className="font-medium text-[var(--text-heading)]">system</span>—knowing
                                they&apos;d eventually live together. IQ Plugin is the result.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Unification Bridge */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 text-center max-w-2xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm">
                        <span className="font-mono text-[var(--accent-teal)] uppercase tracking-wider">
                            {`>`} THEN_I_UNIFIED_THEM:
                        </span>
                        <span className="font-sans text-[var(--text-heading)] text-lg border-b border-white/[0.06] pb-0.5">
                            IQ Plugin brings all 3 home.
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
