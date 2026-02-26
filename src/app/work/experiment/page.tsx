'use client'

import CaseStudyPage from '@/components/case-study-v2/CaseStudyPage'
import { reportcasterCaseStudy } from '@/data/reportcaster'

/*  ─────────────────────────────────────────────
    Experiment page — proves the v2 architecture
    
    Uses the real RC data + per-case-study overrides
    to render the Quick Overview through the new
    data-driven pipeline.
    ───────────────────────────────────────────── */

export default function ExperimentPage() {
    return (
        <CaseStudyPage
            data={reportcasterCaseStudy}
            quickOverviewOverrides={{
                title: 'ReportCaster',
                subtitle: 'Enterprise scheduling system modernization',
                narrative:
                    'Volunteered one week in. Mapped the entire system solo with zero documentation. Led a 20-person team to ship a brand-new integrated product.',
                star: {
                    situation: '40-year-old scheduler losing customers. 5 fragmented subsystems, zero documentation, 20M+ weekly jobs at stake.',
                    task: 'Modernize the system. Retain the customers. Document what had never been documented.',
                    action: 'Mapped all five subsystems from scratch. Explored three architectural directions before finding the breakthrough. Aligned a ~20-person cross-functional team.',
                    result: 'Shipped a brand-new integrated Hub — not a UI refresh. 4 clicks → 2. Customers retained.',
                },
                achievements: [
                    { metric: '4 → 2 clicks', context: 'Schedule creation streamlined' },
                    { metric: '2 → 1 click', context: 'Explorer access simplified' },
                    { metric: '3 pivots', context: 'Before finding the right architecture' },
                ],
            }}
        />
    )
}
