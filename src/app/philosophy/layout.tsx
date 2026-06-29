import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: {
    absolute: 'Design Philosophy — Anuja Harsha Nimmagadda | Staff Product Designer',
  },
  description:
    'How I think, design, and work — in my own words. I make complex technical systems obvious, as obvious as knowing to sit in a chair, without dumbing them down. The chair test, the 5 affordance laws, and the pattern behind everything I build.',
  keywords: [
    'Design Philosophy',
    'Product Design Principles',
    'Chair Test',
    'Affordance Laws',
    'Enterprise UX',
    'AI-Native Design',
    'Systems Thinking',
    'Anuja Harsha Nimmagadda',
  ],
  openGraph: {
    title: 'Design Philosophy — Anuja Harsha Nimmagadda',
    description:
      'How I think, design, and work — in my own words. Make complex systems obvious without dumbing them down.',
    url: `${siteUrl}/philosophy/`,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Philosophy — Anuja Harsha Nimmagadda',
    description: 'Make complex technical systems obvious — without dumbing them down. My design philosophy, in my own words.',
  },
  alternates: {
    canonical: `${siteUrl}/philosophy/`,
  },
}

export default function PhilosophyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
