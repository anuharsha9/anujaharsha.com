import type { Metadata } from 'next'
import CaseStudyLayout from '@/components/case-study/CaseStudyLayout'
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
  return <CaseStudyLayout data={reportcasterCaseStudy} />
}

