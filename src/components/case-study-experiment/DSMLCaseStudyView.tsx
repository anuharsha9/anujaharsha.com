'use client'

/**
 * DSMLCaseStudyView — Client component that wires DSML/IQ Plugin data
 * into the reusable CinematicCaseStudy shell.
 */

import dynamic from 'next/dynamic'
import { CaseStudyData } from '@/types/caseStudy'
import CinematicCaseStudy, { type HeroStat, type ActSection } from '@/components/case-study-experiment/CinematicCaseStudy'
import SectionSkeleton from '@/components/ui/SectionSkeleton'
import QuickImpactOverview from '@/components/case-study/QuickImpactOverview'

const DSMLSkeleton = () => <SectionSkeleton height="200vh" text="LOADING CASE STUDY CONTENT" />
const DSMLFullContent = dynamic(() => import('@/components/case-study-experiment/DSMLFullContent'), { ssr: true, loading: DSMLSkeleton })

import DSMLTrailer from '@/components/home/DSMLTrailer'

/* ─── DSML Hero Stats ─── */
const DSML_HERO_STATS: HeroStat[] = [
 { label: 'Problem', value: 'Low Adoption', description: 'Three AI features, invisible' },
 { label: 'Solution', value: '3 → 1 Hub', description: 'Unified discovery surface' },
 { label: 'Timeline', value: '', description: 'Architecture to production' },
]

/* ─── DSML Act Sections ─── */
const DSML_ACT_SECTIONS: ActSection[] = [
 { id: 'act-1-hook', label: 'I', title: 'The Hook' },
 { id: 'act-2-investigation', label: 'II', title: 'Investigation' },
 { id: 'act-3-architecture', label: 'III', title: 'Architecture' },
 { id: 'act-4-craft', label: 'IV', title: 'Craft' },
 { id: 'act-5-team', label: 'V', title: 'Team' },
 { id: 'act-6-outcome', label: 'VI', title: 'Outcome' },
]


export default function DSMLCaseStudyView({ data }: { data: CaseStudyData }) {
 const stats = DSML_HERO_STATS.map(s =>
 s.label === 'Timeline' ? { ...s, value: data.timeframe || '1+ Year' } : s
 )

 return (
 <CinematicCaseStudy
 data={data}
 theme="dsml"
 heroStats={stats}
 heroBackground={<DSMLTrailer />}
 actSections={DSML_ACT_SECTIONS}
 >
 <QuickImpactOverview data={data} />
 <DSMLFullContent data={data} />
 </CinematicCaseStudy>
 )
}
