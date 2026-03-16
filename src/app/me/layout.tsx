import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: {
    absolute: 'About Anuja Harsha | Senior Product Designer — AI-Native, Open to Work',
  },
  description:
    'Senior Product Designer & Complexity Architect with 13+ years transforming enterprise systems. Discover the journey, philosophy, and AI-Native approach behind transforming legacy workflows into intuitive, high-impact products. Open to work.',
  keywords: [
    'Anuja Harsha Nimmagadda',
    'Anuja Harsha',
    'Senior Product Designer',
    'Staff Product Designer',
    'Enterprise UX',
    'Design Philosophy',
    'Systems Thinking',
    'AI-Native Design',
    'Vibe Coding',
    'Code Prototyping',
    'Engineering Empathy',
    'Open to Work',
    'Product Designer Portfolio',
  ],
  openGraph: {
    title: 'About Anuja Harsha Nimmagadda | Senior Product Designer — Open to Work',
    description:
      'Complexity Architect with 13+ years transforming enterprise systems into high-impact products. AI-Native design, vibe coding, code prototyping. Open to work.',
    url: `${siteUrl}/me/`,
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Anuja Harsha Nimmagadda | Senior Product Designer — Open to Work',
    description:
      'Complexity Architect. 13+ years transforming enterprise chaos into clarity. AI-Native design, vibe coding, code prototyping. Open to work.',
  },
  alternates: {
    canonical: `${siteUrl}/me/`,
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
