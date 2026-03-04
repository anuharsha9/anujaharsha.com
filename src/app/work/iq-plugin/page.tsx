import type { Metadata } from 'next'
import DSMLCaseStudyView from '@/components/case-study-experiment/DSMLCaseStudyView'
import { iqPluginCaseStudy } from '@/data/iq-plugin'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: 'Driving Data Science Adoption in Enterprise BI',
  description:
    'How I unified NLQ, Insights, and ML capabilities into one discoverable DSML Hub — driving a 25% adoption boost. A case study in platform vision, multi-persona design, and progressive disclosure.',
  keywords: [
    'Data Science Adoption',
    'DSML UX',
    'NLQ',
    'Insights',
    'WebFOCUS',
    'Enterprise BI',
    'Multi-Persona Design',
    'Progressive Disclosure',
    'UX Case Study',
    'AI-Native Design',
    'Senior Product Designer',
    'Enterprise UX',
    'Anuja Harsha',
  ],
  openGraph: {
    title: 'Driving Data Science Adoption in Enterprise BI | Anuja Harsha',
    description:
      'How I unified NLQ, Insights, and ML into one discoverable DSML Hub — driving 25% adoption boost.',
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
    title: 'Driving Data Science Adoption in Enterprise BI',
    description:
      'How I unified NLQ, Insights, and ML into one discoverable DSML Hub — driving 25% adoption boost.',
    images: ['/images/case-study/iq-plugin/iq-cover.png'],
  },
  alternates: {
    canonical: `${siteUrl}/work/iq-plugin/`,
  },
}

export default function IQPluginPage() {
  return <DSMLCaseStudyView data={iqPluginCaseStudy} />
}
