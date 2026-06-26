'use client'

/**
 * MLCaseStudyView — Client component that wires ML data into the reusable CinematicCaseStudy shell.
 */

import dynamic from 'next/dynamic'
import { CaseStudyData } from '@/types/caseStudy'
import CinematicCaseStudy, { type HeroStat, type ActSection } from '@/components/case-study-experiment/CinematicCaseStudy'
import SectionSkeleton from '@/components/ui/SectionSkeleton'
import QuickImpactOverview from '@/components/case-study/QuickImpactOverview'

const MLSkeleton = () => <SectionSkeleton height="200vh" text="LOADING CASE STUDY CONTENT" />
const MLFullContent = dynamic(() => import('@/components/case-study-experiment/MLFullContent'), { ssr: true, loading: MLSkeleton })

import MLTrailer from '@/components/home/MLTrailer'

/* ─── ML Hero Stats ─── */
const ML_HERO_STATS: HeroStat[] = [
 { label: 'Challenge', value: '~6 → 2', description: 'Clicks to start training' },
 { label: 'Result', value: '4/4 SMEs', description: 'Blazed through without help' },
 { label: 'Timeline', value: '', description: 'Design to production' },
]

/* ─── ML Act Sections ─── */
const ML_ACT_SECTIONS: ActSection[] = [
 { id: 'act-1-hook', label: 'I', title: 'The Side Project' },
 { id: 'act-2-investigation', label: 'II', title: 'One Path' },
 { id: 'act-3-architecture', label: 'III', title: 'The Entry Point' },
 { id: 'act-4-craft', label: 'IV', title: 'The Complex Screen' },
 { id: 'act-5-team', label: 'V', title: 'The Fight' },
 { id: 'act-6-outcome', label: 'VI', title: 'Validation' },
]


export default function MLCaseStudyView({ data }: { data: CaseStudyData }) {
 const stats = ML_HERO_STATS.map(s =>
 s.label === 'Timeline' ? { ...s, value: data.timeframe || '2+ Years' } : s
 )

 return (
 <CinematicCaseStudy
 data={data}
 theme="ml"
 heroStats={stats}
 heroBackground={<MLTrailer />}
 actSections={ML_ACT_SECTIONS}
 >
 <QuickImpactOverview data={data} />
 <MLFullContent data={data} />
 </CinematicCaseStudy>
 )
}
