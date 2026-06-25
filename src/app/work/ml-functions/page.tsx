import type { Metadata } from 'next'
import MLCaseStudyView from '@/components/case-study-experiment/MLCaseStudyView'
import { mlFunctionsCaseStudy } from '@/data/ml-functions'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: 'Nobody Could Use Our ML Engine.',
  description:
    'A multi-million dollar ML engine with zero adoption. I turned 15 clicks through data flow canvases into a 4-step guided workflow. 4/4 SMEs completed it without help.',
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
    'Senior Product Designer',    'Complex Systems Design',
    'Code Prototyping',
    'Anuja Harsha',
    'Anuja Harsha Nimmagadda',
  ],
  openGraph: {
    title: 'Nobody Could Use Our ML Engine. | Anuja Harsha',
    description:
      'A multi-million dollar ML engine with zero adoption — turned into a 4-step guided workflow. 4/4 SMEs completed without help.',
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
    title: 'Nobody Could Use Our ML Engine.',
    description:
      'Zero adoption ML engine → 4-step guided workflow. 4/4 SMEs completed without help.',
    images: ['/images/case-study/ml-functions/ml-functions-cover.png'],
  },
  alternates: {
    canonical: `${siteUrl}/work/ml-functions/`,
  },
}

export default function MLFunctionsPage() {
  return <MLCaseStudyView data={mlFunctionsCaseStudy} />
}

