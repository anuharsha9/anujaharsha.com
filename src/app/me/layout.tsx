import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: {
    absolute: 'About Anuja Harsha | Senior Product Designer',
  },
  description:
    'Senior Product Designer with 13+ years of experience untangling complex enterprise systems. Discover the journey, philosophy, and approach behind transforming legacy workflows into intuitive experiences.',
  keywords: [
    'Anuja Harsha Nimmagadda',
    'Senior Product Designer',
    'Enterprise UX',
    'Design Philosophy',
    'Systems Thinking',
    'UX Designer Background',
    'Design Career',
  ],
  openGraph: {
    title: 'About Anuja Harsha Nimmagadda | Senior Product Designer',
    description:
      'Senior Product Designer with 13+ years of experience transforming complex enterprise systems into intuitive experiences. Learn about the journey, philosophy, and approach.',
    url: `${siteUrl}/me/`,
    type: 'profile',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Anuja Harsha Nimmagadda - Senior Product Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Anuja Harsha Nimmagadda | Senior Product Designer',
    description:
      'Senior Product Designer with 13+ years of experience transforming complex enterprise systems into intuitive experiences.',
    images: ['/images/og-image.png'],
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
