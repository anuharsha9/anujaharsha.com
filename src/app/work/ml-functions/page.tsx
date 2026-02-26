import type { Metadata } from 'next'
import CaseStudyPage from '@/components/case-study-v2/CaseStudyPage'
import { mlFunctionsCaseStudy } from '@/data/ml-functions'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: 'Democratizing Machine Learning for Everyone',
  description:
    'How I transformed an engineer-driven ML model training workflow into a guided, step-by-step experience. A case study in AI/ML UX, making machine learning accessible to non-technical users without sacrificing power.',
  keywords: [
    'ML Functions',
    'AI/ML UX',
    'Machine Learning UX',
    'Data Science UX',
    'Enterprise AI',
    'UX Case Study',
    'ML Workflow Design',
    'AI-Native Design',
    'Senior Product Designer',
    'Code Prototyping',
    'Anuja Harsha',
  ],
  openGraph: {
    title: 'ML Functions: Making Enterprise ML Training Usable | Anuja Harsha',
    description:
      'How I transformed an engineer-driven ML workflow into a guided experience for non-experts. A case study in AI/ML UX.',
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
    title: 'ML Functions: Making Enterprise ML Training Usable',
    description:
      'How I transformed an engineer-driven ML workflow into a guided experience for non-experts.',
    images: ['/images/case-study/ml-functions/ml-functions-cover.png'],
  },
  alternates: {
    canonical: `${siteUrl}/work/ml-functions/`,
  },
}

export default function MLFunctionsPage() {
  return <CaseStudyPage data={mlFunctionsCaseStudy} defaultViewMode="presentation" />
}

