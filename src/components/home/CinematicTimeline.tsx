'use client'

import React from 'react'
import CinematicEraBlock from './CinematicEraBlock'
import { CAREER_DATA } from '@/data/career-data'
import WhisperNarration from './WhisperNarration'
import DesignEngineerContent from './DesignEngineerContent'

export default function CinematicTimeline() {
    return (
        <div id="cinematic-timeline" className="relative w-full bg-[var(--bg-hero-deep)]">

            {/* ZONE 1: INTRO (Design Engineer) */}
            <CinematicEraBlock
                customYear="2026"
                customTitle="Design Engineer"
                customSubtitle="Builder. Not Just a Designer."
                customDescription="I solve problems code-first. Bridging the gap between a sketch and a shipped product."
                customContent={<DesignEngineerContent />}
                backgroundVideo="/videos/design-engineer-bg.mp4"
            />

            {/* Whisper: Philosophy -> Proof */}
            <WhisperNarration text="13 years. One mission." />

            {/* ZONE 2: CSG (The Architect Era) */}
            <CinematicEraBlock
                era={CAREER_DATA[0]}
                customYear="2022"
            />

            {/* ZONE 3: CONSULTANT (The Builder Era) */}
            <CinematicEraBlock
                era={CAREER_DATA[1]}
                customYear="2017"
            />

            {/* ZONE 4: AGENCY (The Learner Era) */}
            <CinematicEraBlock
                era={CAREER_DATA[2]}
                customYear="2012"
            />

            {/* ZONE 5: ORIGIN (The Foundation) */}
            <CinematicEraBlock
                era={CAREER_DATA[3]}
                customYear="1994"
            />

        </div>
    )
}
