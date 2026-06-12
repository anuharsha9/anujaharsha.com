'use client'

/**
 * RCCaseStudyView — Client component that wires RC data into the reusable CinematicCaseStudy shell.
 */

import dynamic from 'next/dynamic'
import { CaseStudyData } from '@/types/caseStudy'
import CinematicCaseStudy, { type HeroStat, type ActSection } from '@/components/case-study-experiment/CinematicCaseStudy'
import SectionSkeleton from '@/components/ui/SectionSkeleton'

const RCSkeleton = () => <SectionSkeleton height="200vh" text="LOADING CASE STUDY CONTENT" />
const RCFullContent = dynamic(() => import('@/components/case-study-experiment/RCFullContent'), { ssr: true, loading: RCSkeleton })

import RCTrailer from '@/components/home/RCTrailer'


/* ─── RC Hero Stats ─── */
const RC_HERO_STATS: HeroStat[] = [
 { label: 'Scale', value: '20M+ Jobs', description: 'Weekly schedules processed' },
 { label: 'Transformation', value: '5 → 1 Hub', description: 'Subsystems unified' },
 { label: 'Timeline', value: '', description: 'Research to production' },
]

/* ─── RC Act Sections ─── */
const RC_ACT_SECTIONS: ActSection[] = [
 { id: 'act-i', label: 'I', title: 'The Beginning' },
 { id: 'act-ii', label: 'II', title: 'Research' },
 { id: 'act-iii', label: 'III', title: 'Discovery' },
 { id: 'act-iv', label: 'IV', title: 'Architecture' },
 { id: 'act-v', label: 'V', title: 'Team' },
 { id: 'act-vi', label: 'VI', title: 'Outcome' },
 { id: 'act-reflection', label: '✦', title: 'Reflection' },
]


export default function RCCaseStudyView({ data }: { data: CaseStudyData }) {
 // Fill in the timeframe from data
 const stats = RC_HERO_STATS.map(s =>
 s.label === 'Timeline' ? { ...s, value: data.timeframe || '2+ Years' } : s
 )

 return (
 <CinematicCaseStudy
 data={data}
 theme="rc"
 heroStats={stats}
 heroBackground={<RCTrailer />}
 actSections={RC_ACT_SECTIONS}
 >
 <RCFullContent data={data} />
 </CinematicCaseStudy>
 )
}
