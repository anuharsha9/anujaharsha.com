import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: {
    absolute: 'Senior Product Designer | Enterprise UX | Code Prototyping | Anuja Harsha',
  },
  description:
    'Learn about Anuja Harsha Nimmagadda, Principal UX Designer with 13+ years of experience in enterprise design, legacy modernization, and AI/ML UX. Discover the journey, philosophy, and approach behind transforming complex systems into intuitive experiences.',
  keywords: [
    'Anuja Harsha Nimmagadda',
    'Principal UX Designer',
    'Enterprise UX',
    'Design Philosophy',
    'Systems Thinking',
    'UX Designer Background',
    'Design Career',
  ],
  openGraph: {
    title: 'About Anuja Harsha Nimmagadda | Principal UX Designer',
    description:
      'Principal UX Designer with 13+ years of experience transforming complex enterprise systems into intuitive experiences. Learn about the journey, philosophy, and approach.',
    url: `${siteUrl}/me/`,
    type: 'profile',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Anuja Harsha Nimmagadda - Principal UX Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Anuja Harsha Nimmagadda | Principal UX Designer',
    description:
      'Principal UX Designer with 13+ years of experience transforming complex enterprise systems into intuitive experiences.',
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
