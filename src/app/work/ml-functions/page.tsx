import type { Metadata } from 'next'
import MLCaseStudyView from '@/components/case-study-experiment/MLCaseStudyView'
import { mlFunctionsCaseStudy } from '@/data/ml-functions'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: 'Making ML Accessible Without Sacrificing Power',
  description:
    'Enterprise ML was engineer-only — I turned it into a guided workflow anyone could use. From zero ML knowledge to owning the full UX revamp. A case study in AI/ML UX, complexity reduction, and cross-functional ownership.',
  keywords: [
    'ML Functions',
    'AI Workflow Design',
    'ML Workflow Design',
    'Machine Learning UX',
    'AI/ML UX',
    'Data Science UX',
    'Enterprise AI Design',
    'AI-Native Design',
    'UX Case Study',
    'Senior Product Designer',
    'Design Technologist',
    'Complex Systems Design',
    'Code Prototyping',
    'Anuja Harsha',
    'Anuja Harsha Nimmagadda',
  ],
  openGraph: {
    title: 'Making ML Accessible Without Sacrificing Power | Anuja Harsha',
    description:
      'Enterprise ML was engineer-only — I designed a guided workflow anyone could use. From side project to full ownership.',
    url: `${siteUrl}/work/ml-functions/`,
    type: 'article',
    images: [
      {
        url: '/images/case-study/ml-functions/ml-functions-cover.png',
        width: 1200,
        height: 630,
        alt: 'ML Functions Case Study - AI/ML UX Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Making ML Accessible Without Sacrificing Power',
    description:
      'Enterprise ML was engineer-only — I designed a guided workflow anyone could use.',
    images: ['/images/case-study/ml-functions/ml-functions-cover.png'],
  },
  alternates: {
    canonical: `${siteUrl}/work/ml-functions/`,
  },
}

export default function MLFunctionsPage() {
  return <MLCaseStudyView data={mlFunctionsCaseStudy} />
}

