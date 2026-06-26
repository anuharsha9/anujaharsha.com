import type { Metadata } from 'next'
import DSMLCaseStudyView from '@/components/case-study-experiment/DSMLCaseStudyView'
import { iqPluginCaseStudy } from '@/data/iq-plugin'
import StructuredData from '@/components/structured-data/StructuredData'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: 'We Built the Intelligence. Nobody Knew It Existed.',
  description:
    'Three powerful AI capabilities buried across three menus. I unified NLQ, Insights, and ML into one discoverable DSML Hub — driving a 25% adoption boost. A case study in platform vision and making AI features visible.',
  keywords: [
    'Platform Unification',
    'DSML Hub',
    'Data Science Adoption',
    'NLQ UX Design',
    'Enterprise BI',
    'AI-Native Design',
    'Multi-Persona Design',
    'Progressive Disclosure',
    'UX Case Study',
    'Senior Product Designer',    'Enterprise UX',
    'Complex Systems Design',
    'Anuja Harsha',
    'Anuja Harsha Nimmagadda',
  ],
  openGraph: {
    title: 'We Built the Intelligence. Nobody Knew It Existed. | Anuja Harsha',
    description:
      'Three AI capabilities buried across menus. I unified them into one Hub — 25% adoption boost.',
    url: `${siteUrl}/work/iq-plugin/`,
    type: 'article',
    images: [
      {
        url: '/images/case-study/iq-plugin/iq-cover.png',
        width: 1200,
        height: 630,
        alt: 'Data Science Adoption Case Study - DSML UX Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We Built the Intelligence. Nobody Knew It Existed.',
    description:
      'Three AI capabilities buried across menus. I unified them into one Hub — 25% adoption boost.',
    images: ['/images/case-study/iq-plugin/iq-cover.png'],
  },
  alternates: {
    canonical: `${siteUrl}/work/iq-plugin/`,
  },
}

export default function IQPluginPage() {
  return (
    <>
      <StructuredData type="caseStudy" data={iqPluginCaseStudy} />
      <DSMLCaseStudyView data={iqPluginCaseStudy} />
    </>
  )
}
