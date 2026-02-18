import type { Metadata } from 'next'

import TalkSection from '@/components/home/TalkSection'
import ScrollGear from '@/components/ui/ScrollGear'
import CinematicTimeline from '@/components/CinematicTimeline'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: 'Anuja Harsha Nimmagadda | Senior Product Designer',
  description:
    'Senior Product Designer specializing in untangling complex enterprise systems. 13+ years transforming legacy workflows into intuitive experiences at scale.',
  openGraph: {
    title: 'Anuja Harsha Nimmagadda | Senior Product Designer',
    description:
      'Senior Product Designer specializing in untangling complex enterprise systems. 13+ years transforming legacy workflows into intuitive experiences at scale.',
    url: siteUrl,
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
    title: 'Anuja Harsha Nimmagadda | Senior Product Designer',
    description:
      'Senior Product Designer specializing in untangling complex enterprise systems. 13+ years transforming legacy workflows into intuitive experiences at scale.',
    images: ['/images/og-image.png'],
  },
}

export default function Home() {
  return (
    <div className="bg-[#020617] relative overflow-clip">
      {/* Neural Mainframe — faint scanline overlay */}
      <div className="scanline-overlay" aria-hidden="true" />



      {/* 
        THE CINEMATIC TIMELINE
        Scrollytelling with Apple-style typography, glassmorphism cards,
        and animated cyan line. id="work-overview" is inside the component.
      */}
      <CinematicTimeline />

      <TalkSection />
      <ScrollGear />
    </div>
  )
}

