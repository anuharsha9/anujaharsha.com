'use client'

/**
 * CraftShowcase — Clean auto-playing carousel for design artifacts.
 * Shows a title + auto-playing image sequence. No heavy tabs, no verbose text.
 */

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'
import AutoSequenceDataViewer from './AutoSequenceDataViewer'
import type { CraftShowcaseData } from '@/types/craftShowcase'

interface CraftShowcaseProps {
    data: CraftShowcaseData
}

export default function CraftShowcase({ data }: CraftShowcaseProps) {
    // Flatten all tab images into a single sequence, labeling each with its tab
    const allImages = data.tabs.flatMap(tab =>
        tab.images.map((img, i) => ({
            src: img.src,
            alt: img.alt,
            caption: tab.images.length > 1
                ? `${tab.label} — ${img.caption || img.alt}`
                : tab.label,
        }))
    )

    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Section Header — title only */}
            <ComponentHeading
                variant="block"
                align="center"
                tag={data.sectionTag}
                title={data.sectionTitle}
                color="teal"
                className="mb-2"
            />

            {/* Auto-playing carousel */}
            <AutoSequenceDataViewer
                images={allImages}
                autoPlay={true}
                autoPlayInterval={3500}
            />
        </motion.div>
    )
}
