import type { Metadata } from 'next'
import { reportcasterCaseStudy } from '@/data/reportcaster'
import RCCaseStudyView from '@/components/case-study-experiment/RCCaseStudyView'
import StructuredData from '@/components/structured-data/StructuredData'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: 'Customers Were Leaving. 40 Years Without Updates.',
  description:
    'The platform\'s enterprise scheduler was losing customers after 40+ years without updates. I modernized a 40-year-old system from scratch — 5 subsystems into 1 hub, powering 15M+ users.',
  keywords: [
    'ReportCaster',
    'Legacy Modernization',
    'Legacy System Modernization',
    'Enterprise UX',
    'Enterprise Scheduler Redesign',
    'System Redesign',
    'Data Workflow Modernization',
    'UX Case Study',
    'Senior Product Designer',    'Complex Systems Design',
    'Cross-functional Leadership',
    'Systems Thinking',
    'Code Prototyping',
    'Enterprise Software Design',
    'Anuja Harsha',
    'Anuja Harsha Nimmagadda',
  ],
  openGraph: {
    title: 'Customers Were Leaving. 40 Years Without Updates. | Anuja Harsha',
    description:
      'The platform\'s enterprise scheduler was losing customers. I modernized a 40-year-old system — 5 subsystems into 1 hub, powering 15M+ users.',
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
      'Enterprise scheduler losing customers. I modernized a 40-year-old system — 5 subsystems into 1 hub.',
    images: ['/images/case-study/ReportCaster/rc-cover.png'],
  },
  alternates: {
    canonical: `${siteUrl}/work/reportcaster/`,
  },
}

export default function ReportCasterPage() {
  return (
    <>
      {/* Case-study JSON-LD (Article + CreativeWork) — prerendered into the
          static HTML so AI crawlers + search engines read this as a structured
          case study by Anuja, not just prose. */}
      <StructuredData type="caseStudy" data={reportcasterCaseStudy} />
      <RCCaseStudyView data={reportcasterCaseStudy} />
    </>
  )
}
