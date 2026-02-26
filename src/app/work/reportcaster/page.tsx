import type { Metadata } from 'next'
import CaseStudyPage from '@/components/case-study-v2/CaseStudyPage'
import { reportcasterCaseStudy } from '@/data/reportcaster'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: 'Customers Were Leaving. 40 Years Without Updates.',
  description:
    'The platform\'s enterprise scheduler was losing customers after 40+ years without updates. I modernized a 50-year-old system from scratch — 5 subsystems into 1 hub, powering 20M+ weekly jobs.',
  keywords: [
    'ReportCaster',
    'Enterprise UX',
    'Legacy Modernization',
    'Scheduling Software',
    'Enterprise Design',
    'UX Case Study',
    'System Redesign',
  ],
  openGraph: {
    title: 'Customers Were Leaving. 40 Years Without Updates. | Anuja Harsha',
    description:
      'The platform\'s enterprise scheduler was losing customers. I modernized a 50-year-old system — 5 subsystems into 1 hub, powering 20M+ weekly jobs.',
    url: `${siteUrl}/work/reportcaster/`,
    type: 'article',
    images: [
      {
        url: '/images/case-study/ReportCaster/rc-cover.png',
        width: 1200,
        height: 630,
        alt: 'ReportCaster Case Study - Enterprise Scheduler Redesign',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customers Were Leaving. 40 Years Without Updates.',
    description:
      'Enterprise scheduler losing customers. I modernized a 50-year-old system — 5 subsystems into 1 hub.',
    images: ['/images/case-study/ReportCaster/rc-cover.png'],
  },
  alternates: {
    canonical: `${siteUrl}/work/reportcaster/`,
  },
}

export default function ReportCasterPage() {
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
