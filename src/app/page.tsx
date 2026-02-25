import type { Metadata } from 'next'

import TalkSection from '@/components/home/TalkSection'
import ScrollGear from '@/components/ui/ScrollGear'
import HeroLanding from '@/components/home/HeroLanding'
import ChairPhilosophy from '@/components/home/ChairPhilosophy'
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
    <div className="bg-[#010204] relative">
      {/* Neural Mainframe — faint scanline overlay */}
      <div className="scanline-overlay" aria-hidden="true" />

      {/* Global Cinematic Background — Fixed to viewport for continuity */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(7,139,156,0.08),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
      </div>



      {/* 
        HERO SECTION
        Brain scales down, text and case studies fade in.
      */}
      <HeroLanding />

      {/* 
        CHAIR PHILOSOPHY
        Text fades in sequentially as the user scrolls.
      */}
      <ChairPhilosophy />

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

