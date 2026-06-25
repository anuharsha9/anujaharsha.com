import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: {
    absolute: 'About Anuja Harsha | Staff Product Designer — AI-Native, Open to Work',
  },
  description:
    'Staff Product Designer with 13+ years making complex enterprise systems usable. The journey, philosophy, and craft behind modernizing legacy workflows into intuitive, high-impact products. Open to work.',
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
    title: 'About Anuja Harsha Nimmagadda | Staff Product Designer — Open to Work',
    description:
      'Staff Product Designer with 13+ years turning complex enterprise systems into products people adopt. AI-native design, code prototyping. Open to work.',
    url: `${siteUrl}/me/`,
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Anuja Harsha Nimmagadda | Staff Product Designer — Open to Work',
    description:
      'Staff Product Designer. 13+ years making complex enterprise software usable. AI-native design, code prototyping. Open to work.',
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
