'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Download, ZoomIn, FileText } from 'lucide-react'
import ComponentHeading from '@/components/ui/ComponentHeading'
import ImageLightbox from './ImageLightbox'
import { Artifact } from '@/data/reportcaster-artifacts'

interface ProcessArtifactViewerProps {
    artifacts: Artifact[]
    pdfUrl?: string
    title?: string
    description?: string
}

export default function ProcessArtifactViewer({
    artifacts,
    pdfUrl,
    title = "The Raw Sketchbook",
    description = "Before pixels, there was paper. I believe thinking happens away from the screen. Here is a glimpse into the 100+ pages of notes, logic maps, and questions that built this system."
}: ProcessArtifactViewerProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    // Show only first 6 items in the grid to save space, but lightbox navigates all
    const displayArtifacts = artifacts.slice(0, 6)

    const openLightbox = (index: number) => {
        setCurrentIndex(index)
        setLightboxOpen(true)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
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
        <div className="space-y-12 py-8">
            {/* Header - Centered & Clean */}
            <div className="flex flex-col gap-6 border-b border-white/[0.06] pb-8">
                <ComponentHeading
                    align="center"
                    tag="ARCHIVE EVIDENCE"
                    title={title}
                    description={description}
                    color="teal"
                    className="mb-0 w-full max-w-3xl mx-auto"
                />

                {/* PDF Download Action - sleek pill */}
                {pdfUrl && (
                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-6 py-3 bg-white/[0.08] text-white rounded-full hover:bg-white/[0.12] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex-shrink-0 border border-white/[0.06]"
                    >
                        <FileText className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                        <span className="text-sm font-medium">View Original PDF</span>
                        <Download className="w-3 h-3 text-white/40 group-hover:text-white/70 ml-1 transition-transform group-hover:translate-y-0.5" />
                    </a>
                )}
            </div>

            {/* Artifact Grid - Clean Gallery */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {displayArtifacts.map((artifact, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="group cursor-pointer space-y-3"
                        onClick={() => openLightbox(index)}
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:border-white/[0.12]">

                            <Image
                                src={artifact.src}
                                alt={artifact.alt}
                                fill
                                className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${artifact.needsRotation ? '-rotate-90 scale-[1.35]' : ''} ${artifact.needsScale ? 'scale-[1.10]' : ''}`}
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />

                            {/* Overlay on Hover - Subtle */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="bg-white/10 backdrop-blur-md rounded-full p-3 shadow-sm transform scale-90 group-hover:scale-100 transition-all duration-300 border border-white/20">
                                    <ZoomIn className="w-5 h-5 text-white" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>

                        {/* Caption - Clean Sans */}
                        <div className="px-1">
                            <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider truncate">
                                {artifact.alt}
                            </p>
                        </div>
                    </motion.div>
                ))}

                {/* "More" Card Indicator - Minimal */}
                {artifacts.length > 6 && (
                    <div className="flex items-center justify-center p-6 text-center border border-dashed border-white/[0.08] rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group">
                        <div className="space-y-2">
                            <span className="inline-block p-3 rounded-full bg-white/[0.05] shadow-sm mb-1 group-hover:scale-110 transition-transform border border-white/[0.06]">
                                <span className="font-light text-2xl text-[var(--text-heading)]">+{artifacts.length - 6}</span>
                            </span>
                            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">more pages</p>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Lightbox */}
            <ImageLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                imageSrc={artifacts[currentIndex].src}
                imageAlt={artifacts[currentIndex].alt}
                imageCaption={artifacts[currentIndex].caption}
                images={artifacts} // Use full list for navigation
                currentIndex={currentIndex}
                onNavigate={setCurrentIndex}
            />
        </div>
    )
}
