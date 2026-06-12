'use client'

import React from 'react'
import ImageComparisonSlider from '@/components/ui/ImageComparisonSlider'

interface ImpactDiffProps {
 beforeImage: string
 afterImage: string
 beforeLabel?: string
 afterLabel?: string
 isLightBackground?: boolean
 className?: string
 beforeTitle?: string
 afterTitle?: string
 beforeAlt?: string
 afterAlt?: string
}

export default function ImpactDiff({
 beforeImage,
 afterImage,
 beforeLabel = 'Before',
 afterLabel = 'After',
 isLightBackground = false, // Kept for prop compatibility, though unused
 className = '',
 beforeTitle = 'legacy_view', // Default titles for browser bar
 afterTitle = 'modern_view',
 beforeAlt = 'Before',
 afterAlt = 'After'
}: ImpactDiffProps) {
 return (
 <div className={`w-full select-none ${className}`}>
 <ImageComparisonSlider
 beforeImage={beforeImage}
 afterImage={afterImage}
 beforeLabel={beforeLabel}
 afterLabel={afterLabel}
 beforeTitle={beforeTitle}
 afterTitle={afterTitle}
 beforeAlt={beforeAlt}
 afterAlt={afterAlt}
 aspectRatio="aspect-video" // Use aspect-video for consistency
 />
 </div>
 )
}
