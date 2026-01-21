'use client'

import React from 'react'
import { CAREER_DATA } from '@/data/career-data'
import EraBlock from './EraBlock'

export default function EnergyStack() {
    return (
        <div className="relative">
            {/* Container Background - subtle separation */}
            <div className="absolute inset-0 bg-[#020617] opacity-50 pointer-events-none" />

            {CAREER_DATA.map((era, index) => (
                <EraBlock key={era.id} era={era} index={index} />
            ))}
        </div>
    )
}
